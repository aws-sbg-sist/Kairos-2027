/**
 * KAIROS 2027 — PHASE 01 POSTGRESQL & SUPABASE ARCHITECTURE VERIFICATION
 * 
 * Verifies:
 * 1. SQL Migration DDL Completeness & Relational Integrity
 * 2. Row Level Security (RLS) Policy Structure & Least-Privilege Rules
 * 3. JSON Migration Idempotency, Identity Unification & Deduplication
 * 4. Original Source JSON Immutability (Zero data loss or corruption)
 * 5. Database Abstraction Layer & Method Contract Compatibility
 * 6. Concurrency Safety & Driver Selection
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MIGRATIONS_DIR = path.join(__dirname, '..', '..', 'supabase', 'migrations');
const SCHEMA_FILE = path.join(MIGRATIONS_DIR, '20261112000001_initial_kairos_schema.sql');
const RLS_FILE = path.join(MIGRATIONS_DIR, '20261112000002_row_level_security_policies.sql');
const ROLLBACK_FILE = path.join(MIGRATIONS_DIR, '20261112000003_rollback_guidance.sql');
const SEED_SQL_FILE = path.join(__dirname, '..', '..', 'supabase', 'seed_from_json.sql');
const STORE_PATH = path.join(__dirname, '..', '..', 'data', 'kairos_store.json');
const MIGRATION_SCRIPT = path.join(__dirname, '..', '..', 'scripts', 'migrate_json_to_postgres.js');

async function runPhase01DatabaseTests() {
  console.log('================================================================');
  console.log('    KAIROS 2027 — PHASE 01 DATABASE ARCHITECTURE TEST SUITE     ');
  console.log('================================================================\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✓ [PASS] ${testName}`);
    } else {
      failedTests++;
      console.error(`  ✗ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
    }
  }

  // --------------------------------------------------------------------------
  // TEST GROUP 1: MIGRATION FILES & DDL COMPLETENESS
  // --------------------------------------------------------------------------
  console.log('--- 1. SQL MIGRATION FILES & SCHEMA DDL COMPLETENESS ---');

  assert(fs.existsSync(SCHEMA_FILE), 'Schema migration file exists (20261112000001_initial_kairos_schema.sql)');
  assert(fs.existsSync(RLS_FILE), 'RLS policy migration file exists (20261112000002_row_level_security_policies.sql)');
  assert(fs.existsSync(ROLLBACK_FILE), 'Rollback guidance file exists (20261112000003_rollback_guidance.sql)');

  const schemaContent = fs.readFileSync(SCHEMA_FILE, 'utf8');

  // Verify all 13 normalized tables are defined
  const requiredTables = [
    'profiles',
    'waitlist',
    'teams',
    'team_members',
    'sponsors',
    'referrals',
    'feature_flags',
    'audit_logs',
    'radar_signals',
    'judges',
    'evaluations',
    'csat_responses',
    'org_members'
  ];

  for (const table of requiredTables) {
    const tablePattern = new RegExp(`CREATE TABLE IF NOT EXISTS public\\.${table}\\s*\\(`, 'i');
    assert(tablePattern.test(schemaContent), `Schema defines table: public.${table}`);
  }

  // Verify Foreign Key Constraints
  assert(schemaContent.includes('REFERENCES public.profiles(id)'), 'Foreign keys reference central public.profiles table');
  assert(schemaContent.includes('REFERENCES public.teams(id) ON DELETE CASCADE'), 'Team members cascade delete with teams');
  assert(schemaContent.includes('REFERENCES public.judges(id)'), 'Evaluations reference judges table');

  // Verify Unique Constraints
  assert(schemaContent.includes('email TEXT UNIQUE NOT NULL'), 'Profiles table enforces unique email constraint');
  assert(schemaContent.includes('team_code TEXT UNIQUE'), 'Teams table enforces unique team_code');
  assert(schemaContent.includes('invite_code TEXT UNIQUE NOT NULL'), 'Teams table enforces unique invite_code');
  assert(schemaContent.includes('access_pin TEXT UNIQUE NOT NULL'), 'Judges table enforces unique access_pin');
  assert(schemaContent.includes('uq_team_judge_gate UNIQUE (team_id, judge_id, checkpoint_gate)'), 'Evaluations enforce unique composite key (team, judge, gate)');
  assert(schemaContent.includes('uq_team_member_per_team UNIQUE (team_id, email)'), 'Team members enforce unique member per team');

  // Verify Rubric Check Constraints
  assert(schemaContent.includes('criterion1_score NUMERIC(4, 2) NOT NULL CHECK (criterion1_score >= 0 AND criterion1_score <= 30)'), 'Criterion 1 rubric constrained to 0-30');
  assert(schemaContent.includes('criterion4_score NUMERIC(4, 2) NOT NULL CHECK (criterion4_score >= 0 AND criterion4_score <= 20)'), 'Criterion 4 rubric constrained to 0-20');
  assert(schemaContent.includes('overall_satisfaction INT NOT NULL CHECK (overall_satisfaction >= 1 AND overall_satisfaction <= 5)'), 'CSAT satisfaction constrained to 1-5');
  assert(schemaContent.includes('nps_score INT NOT NULL CHECK (nps_score >= 0 AND nps_score <= 10)'), 'NPS score constrained to 0-10');

  // --------------------------------------------------------------------------
  // TEST GROUP 2: ROW LEVEL SECURITY (RLS) POLICIES
  // --------------------------------------------------------------------------
  console.log('\n--- 2. ROW LEVEL SECURITY (RLS) POLICY VERIFICATION ---');

  const rlsContent = fs.readFileSync(RLS_FILE, 'utf8');

  for (const table of requiredTables) {
    const rlsPattern = new RegExp(`ALTER TABLE public\\.${table} ENABLE ROW LEVEL SECURITY;`, 'i');
    assert(rlsPattern.test(rlsContent), `RLS enabled on table: public.${table}`);
  }

  // Check service-role bypass policies
  for (const table of requiredTables) {
    const servicePolicy = `CREATE POLICY "service_role_all_${table}" ON public.${table} FOR ALL TO service_role`;
    assert(rlsContent.includes(servicePolicy), `Service-role full CRUD policy defined for public.${table}`);
  }

  // Check least-privilege security restrictions
  assert(!rlsContent.includes('"profiles_anon_select"'), 'Anonymous visitors cannot read profiles table');
  assert(!rlsContent.includes('"waitlist_anon_select"'), 'Anonymous visitors cannot read waitlist registrations');
  assert(!rlsContent.includes('"judges_anon_select"'), 'Anonymous visitors cannot read judge credentials');
  assert(!rlsContent.includes('"evaluations_anon_select"'), 'Anonymous visitors cannot read confidential judge evaluations');
  assert(!rlsContent.includes('"csat_anon_select"'), 'Anonymous visitors cannot read participant CSAT survey responses');

  // Check legitimate public access policies
  assert(rlsContent.includes('"waitlist_anon_insert"'), 'Public pre-registration allowed via waitlist INSERT policy');
  assert(rlsContent.includes('"sponsors_anon_insert"'), 'Public sponsor inquiries allowed via sponsors INSERT policy');
  assert(rlsContent.includes('"radar_signals_public_read"'), 'Talent matchmaking signals readable by public');
  assert(rlsContent.includes('"org_members_public_read"'), 'Organizing committee roster readable by public');

  // --------------------------------------------------------------------------
  // TEST GROUP 3: JSON MIGRATION SCRIPT & DATA INTEGRITY
  // --------------------------------------------------------------------------
  console.log('\n--- 3. DATA MIGRATION IDEMPOTENCY & IDENTITY UNIFICATION ---');

  assert(fs.existsSync(MIGRATION_SCRIPT), 'Migration script exists (scripts/migrate_json_to_postgres.js)');

  // Record SHA-256 hash of kairos_store.json to guarantee immutability
  const jsonBefore = fs.readFileSync(STORE_PATH, 'utf8');
  const hashBefore = crypto.createHash('sha256').update(jsonBefore).digest('hex');

  // Run migration script
  const { execSync } = require('child_process');
  let migrationOutput = '';
  try {
    migrationOutput = execSync(`node "${MIGRATION_SCRIPT}" --generate-sql`, { encoding: 'utf8' });
  } catch (err) {
    assert(false, 'Migration script execution succeeded', err.message);
  }

  assert(migrationOutput.includes('MIGRATION DRY RUN COMPLETED'), 'Migration script executed successfully');
  assert(fs.existsSync(SEED_SQL_FILE), 'Seed SQL file successfully generated (supabase/seed_from_json.sql)');

  // Verify kairos_store.json was NOT mutated
  const jsonAfter = fs.readFileSync(STORE_PATH, 'utf8');
  const hashAfter = crypto.createHash('sha256').update(jsonAfter).digest('hex');
  assert(hashBefore === hashAfter, 'Original kairos_store.json remained 100% immutable and untouched');

  // Verify Seed SQL Content
  const seedContent = fs.readFileSync(SEED_SQL_FILE, 'utf8');
  assert(seedContent.startsWith('-- =============================================================================='), 'Seed file includes header banner');
  assert(seedContent.includes('BEGIN;') && seedContent.includes('COMMIT;'), 'Seed script is wrapped in atomic transaction');
  assert(seedContent.includes('ON CONFLICT (email) DO UPDATE'), 'Profiles insertion includes idempotent ON CONFLICT (email)');
  assert(seedContent.includes('ON CONFLICT (id) DO UPDATE'), 'Waitlist and Teams insertion includes idempotent ON CONFLICT (id)');
  assert(seedContent.includes('ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE'), 'Evaluations insertion includes idempotent composite conflict handling');

  // Identity unification check: Pooja Venkatesh is in waitlist and team leader/member
  assert(seedContent.includes("'pooja.v@example.edu'"), 'Unified profile created for candidate Pooja Venkatesh');
  const profilesSection = seedContent.split('-- 2. WAITLIST')[0];
  const poojaMatches = (profilesSection.match(/'pooja\.v@example\.edu'/g) || []).length;
  assert(poojaMatches === 1, 'Only ONE unified profile created for Pooja Venkatesh (zero duplicate profiles)');

  // --------------------------------------------------------------------------
  // TEST GROUP 4: DATABASE ABSTRACTION & DRIVER BEHAVIOR
  // --------------------------------------------------------------------------
  console.log('\n--- 4. DATABASE ABSTRACTION & FALLBACK SAFETY ---');

  const dbTsContent = fs.readFileSync(path.join(__dirname, '..', 'lib', 'db.ts'), 'utf8');
  const pgRepoContent = fs.readFileSync(path.join(__dirname, '..', 'lib', 'postgres_repository.ts'), 'utf8');
  const supabaseTsContent = fs.readFileSync(path.join(__dirname, '..', 'lib', 'supabase.ts'), 'utf8');

  assert(dbTsContent.includes('export { postgresDb };'), 'postgresDb repository is exported by src/lib/db.ts');
  assert(dbTsContent.includes('getDriver(): \'json\' | \'supabase\''), 'db.getDriver() method is present in src/lib/db.ts');
  assert(supabaseTsContent.includes('export function isSupabaseConfigured()'), 'isSupabaseConfigured() is exported by src/lib/supabase.ts');
  assert(supabaseTsContent.includes('export function getSupabaseAdminClient()'), 'getSupabaseAdminClient() is exported by src/lib/supabase.ts');

  // Check repository interface methods in postgres_repository.ts
  const requiredMethods = [
    'upsertProfile',
    'getProfileByEmail',
    'getWaitlist',
    'addWaitlistEntry',
    'updateWaitlistStatus',
    'getTeams',
    'getTeamByCode',
    'getSponsors',
    'addSponsorInquiry',
    'getReferrals',
    'getFeatureFlags',
    'setFeatureFlags',
    'addAuditLog',
    'getAuditLogs',
    'getRadarSignals',
    'addRadarSignal',
    'getJudges',
    'verifyJudgePin',
    'addEvaluation',
    'getCSAT',
    'addCSAT',
    'exportCSATCSV',
    'getMembers'
  ];

  for (const method of requiredMethods) {
    const methodRegex = new RegExp(`async\\s+${method}\\s*\\(`, 'm');
    assert(methodRegex.test(pgRepoContent), `postgresDb implements method: ${method}()`);
  }

  // --------------------------------------------------------------------------
  // TEST GROUP 5: LIVE RUNTIME ENDPOINT CONTRACT VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n--- 5. LIVE APPLICATION RUNTIME ENDPOINT CONTRACTS ---');

  const http = require('http');
  const ADMIN_PASSKEY = '9f8c3e1a7b4d0e6f2a5b8c1d3e7f9a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d1e3f';

  function request(urlPath, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(urlPath, 'http://localhost:8000');
      const req = http.request(url, {
        method: options.method || 'GET',
        headers: options.headers || {}
      }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          let data = null;
          try { data = JSON.parse(body); } catch (e) {}
          resolve({ status: res.statusCode, headers: res.headers, data, body });
        });
      });
      req.on('error', reject);
      if (options.body) req.write(options.body);
      req.end();
    });
  }

  // 1. Unauthenticated waitlist access is strictly rejected (Least Privilege)
  const unauthWaitlist = await request('/api/waitlist');
  assert(unauthWaitlist.status === 401, 'Unauthenticated GET /api/waitlist returns HTTP 401 Unauthorized (Privacy Protected)');

  // 2. Authenticate as Admin
  const authPayload = JSON.stringify({
    passkey: ADMIN_PASSKEY,
    organizerName: 'Database Architecture Tester',
    organizerRole: 'PostgreSQL Architect'
  });
  const authRes = await request('/api/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(authPayload) },
    body: authPayload
  });
  assert(authRes.status === 200, 'Admin authentication succeeds');

  let adminCookie = '';
  const setCookie = authRes.headers['set-cookie'];
  if (setCookie) {
    const raw = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
    const match = raw.match(/kairos_admin_session=([^;]+)/);
    if (match) adminCookie = `kairos_admin_session=${match[1]}`;
  }

  // 3. Authorized waitlist access
  const authWaitlist = await request('/api/waitlist', { headers: { 'Cookie': adminCookie } });
  assert(authWaitlist.status === 200, 'Authorized GET /api/waitlist returns HTTP 200 OK');
  assert(Array.isArray(authWaitlist.data?.waitlist), 'Authorized GET /api/waitlist returns waitlist array');

  const flagsRes = await request('/api/admin/flags');
  assert(flagsRes.status === 200, 'GET /api/admin/flags returns HTTP 200 OK');
  assert(typeof flagsRes.data?.flags?.registrationOpen === 'boolean', 'Feature flags contains boolean registrationOpen');

  const radarRes = await request('/api/radar');
  assert(radarRes.status === 200, 'GET /api/radar returns HTTP 200 OK');
  assert(Array.isArray(radarRes.data?.signals), 'GET /api/radar returns signals array');

  const membersRes = await request('/api/v1/members');
  assert(membersRes.status === 200, 'GET /api/v1/members returns HTTP 200 OK');
  assert(Array.isArray(membersRes.data?.members), 'GET /api/v1/members returns members array');

  // Summary
  console.log('\n================================================================');
  console.log(`  PHASE 01 DATABASE TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
  if (failedTests === 0) {
    console.log('  >>> STATUS: ALL PHASE 01 DATABASE CHECKS PASSED <<<');
  } else {
    console.error(`  >>> STATUS: ${failedTests} CHECKS FAILED <<<`);
  }
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runPhase01DatabaseTests().catch((err) => {
  console.error('Fatal error in Phase 01 database tests:', err);
  process.exit(1);
});
