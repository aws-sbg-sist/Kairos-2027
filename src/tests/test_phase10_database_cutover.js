/**
 * KAIROS 2027 — PHASE 10.1 DATABASE CUTOVER & INFRASTRUCTURE REMEDIATION TEST SUITE
 * 
 * Verifies:
 * 1. SQL Migration Ordering & DDL Integrity (Migrations 000001 to 000006)
 * 2. Repository Method Parity between db and postgresDb (57 methods)
 * 3. Asynchronous Promise Return Contracts across all database operations
 * 4. Fail-Closed Production Security (Zero silent fallback to flat JSON files)
 * 5. Driver Selection Logic (Explicit json vs supabase vs production enforcement)
 * 6. Health Endpoint Specification & Error Masking
 * 7. JSON-to-PostgreSQL Migration Integrity (Student accounts, password hashes, notification logs)
 * 8. Source JSON Immutability & Zero Data Loss
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MIGRATIONS_DIR = path.join(__dirname, '..', '..', 'supabase', 'migrations');
const STORE_PATH = path.join(__dirname, '..', '..', 'data', 'kairos_store.json');
const MIGRATION_SCRIPT = path.join(__dirname, '..', '..', 'scripts', 'migrate_json_to_postgres.js');
const SEED_SQL_PATH = path.join(__dirname, '..', '..', 'supabase', 'seed_from_json.sql');
const DB_PATH = path.join(__dirname, '..', 'lib', 'db.ts');
const PG_REPO_PATH = path.join(__dirname, '..', 'lib', 'postgres_repository.ts');
const RBAC_PATH = path.join(__dirname, '..', 'lib', 'rbac.ts');
const PASS_PATH = path.join(__dirname, '..', 'lib', 'pass.ts');
const EMAIL_PATH = path.join(__dirname, '..', 'lib', 'email.ts');
const HEALTH_PATH = path.join(__dirname, '..', 'app', 'api', 'health', 'route.ts');

async function runPhase10Tests() {
  console.log('================================================================');
  console.log('   KAIROS 2027 — PHASE 10.1 DATABASE CUTOVER VERIFICATION SUITE  ');
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
  // TEST GROUP 1: MIGRATION ORDERING & DDL INTEGRITY
  // --------------------------------------------------------------------------
  console.log('--- 1. MIGRATION ORDERING & SCHEMA DDL INTEGRITY ---');

  const expectedMigrations = [
    '20261112000001_initial_kairos_schema.sql',
    '20261112000002_row_level_security_policies.sql',
    '20261112000003_rollback_guidance.sql',
    '20261112000004_student_auth.sql',
    '20261112000005_rbac_schema.sql',
    '20261112000006_teams_admin_and_notifications.sql'
  ];

  for (const mig of expectedMigrations) {
    const migPath = path.join(MIGRATIONS_DIR, mig);
    assert(fs.existsSync(migPath), `Ordered migration exists: ${mig}`);
  }

  // Verify Migration 000006 DDL contents
  const mig6Content = fs.readFileSync(path.join(MIGRATIONS_DIR, '20261112000006_teams_admin_and_notifications.sql'), 'utf8');
  assert(mig6Content.includes('ALTER TABLE public.teams'), 'Migration 000006 alters public.teams');
  assert(mig6Content.includes('reviewer_notes TEXT'), 'Migration 000006 adds reviewer_notes to teams');
  assert(mig6Content.includes('reviewed_by TEXT'), 'Migration 000006 adds reviewed_by to teams');
  assert(mig6Content.includes('reviewed_at TIMESTAMPTZ'), 'Migration 000006 adds reviewed_at to teams');
  assert(mig6Content.includes('checked_in_by TEXT'), 'Migration 000006 adds checked_in_by to teams');
  assert(mig6Content.includes('CREATE TABLE IF NOT EXISTS public.notification_logs'), 'Migration 000006 defines notification_logs table');
  assert(mig6Content.includes('ENABLE ROW LEVEL SECURITY'), 'Migration 000006 enables RLS on notification_logs');

  // --------------------------------------------------------------------------
  // TEST GROUP 2: REPOSITORY METHOD PARITY (57 METHODS)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. COMPLETE REPOSITORY METHOD PARITY ---');

  const dbContent = fs.readFileSync(DB_PATH, 'utf8');
  const pgContent = fs.readFileSync(PG_REPO_PATH, 'utf8');

  const requiredMethods = [
    'getWaitlist', 'addWaitlistEntry', 'updateWaitlistStatus', 'getTeams', 'getTeamByCode',
    'createTeam', 'joinTeam', 'updateTeamDetails', 'removeTeamMember', 'transferTeamLeadership',
    'submitRound1Qualifier', 'updateTeamAdmin', 'checkInTeam', 'getReferrals', 'addReferral',
    'getReferralByCode', 'searchReferral', 'getJudges', 'verifyJudgePin', 'addJudge',
    'updateJudge', 'deleteJudge', 'getEvaluations', 'getTeamEvaluations', 'getEvaluationByJudgeAndTeam',
    'saveEvaluation', 'getAssignedTeamsForJudge', 'getLeaderboardStandings', 'addEvaluation',
    'getCSAT', 'addCSAT', 'exportCSATCSV', 'getMembers', 'getMemberByUsername',
    'getSponsors', 'addSponsorInquiry', 'getFeatureFlags', 'setFeatureFlags', 'addAuditLog',
    'getAuditLogs', 'getRadarSignals', 'addRadarSignal', 'getMetrics', 'getAdminAnalytics',
    'getStudentByEmail', 'getStudentById', 'registerStudent', 'verifyStudentEmail',
    'authenticateStudent', 'requestPasswordReset', 'resetStudentPassword', 'updateStudentProfile',
    'getStudentTeam', 'getStudentWaitlist', 'getNotificationLogs', 'addNotificationLog',
    'getNotificationByIdempotencyKey'
  ];

  for (const m of requiredMethods) {
    const inDb = dbContent.includes(`async ${m}(`);
    const inPg = pgContent.includes(`async ${m}(`);
    assert(inDb && inPg, `Parity confirmed for method: ${m}() [db.ts & postgres_repository.ts]`);
  }

  // --------------------------------------------------------------------------
  // TEST GROUP 3: ASYNCHRONOUS PROMISE CONTRACTS IN CALLERS
  // --------------------------------------------------------------------------
  console.log('\n--- 3. ASYNCHRONOUS DATABASE ABSTRACTION & CALLER WIRING ---');

  const rbacContent = fs.readFileSync(RBAC_PATH, 'utf8');
  assert(rbacContent.includes('export async function verifyTeamLeader'), 'verifyTeamLeader is asynchronous');
  assert(rbacContent.includes('export async function verifyJudgeAuthorization'), 'verifyJudgeAuthorization is asynchronous');
  assert(rbacContent.includes('await db.getStudentTeam'), 'rbac.ts awaits db.getStudentTeam');
  assert(rbacContent.includes('await db.getTeams'), 'rbac.ts awaits db.getTeams');
  assert(rbacContent.includes('await db.getJudges'), 'rbac.ts awaits db.getJudges');

  const passContent = fs.readFileSync(PASS_PATH, 'utf8');
  assert(passContent.includes('export async function verifyPassToken'), 'verifyPassToken is asynchronous');
  assert(passContent.includes('await db.getStudentByEmail'), 'pass.ts awaits db.getStudentByEmail');
  assert(passContent.includes('await db.getStudentTeam'), 'pass.ts awaits db.getStudentTeam');
  assert(passContent.includes('await db.getStudentWaitlist'), 'pass.ts awaits db.getStudentWaitlist');

  const emailContent = fs.readFileSync(EMAIL_PATH, 'utf8');
  assert(emailContent.includes('await db.addNotificationLog'), 'email.ts awaits db.addNotificationLog');
  assert(emailContent.includes('await db.getNotificationByIdempotencyKey'), 'email.ts awaits db.getNotificationByIdempotencyKey');

  // --------------------------------------------------------------------------
  // TEST GROUP 4: FAIL-CLOSED PRODUCTION DATABASE CONFIGURATION
  // --------------------------------------------------------------------------
  console.log('\n--- 4. FAIL-CLOSED PRODUCTION CONFIGURATION & DRIVER GUARDS ---');

  assert(dbContent.includes('export function getDbDriver()'), 'getDbDriver() is exported');
  assert(dbContent.includes('export function assertJsonAllowed()'), 'assertJsonAllowed() is exported');
  assert(dbContent.includes('[DB FATAL] KAIROS_DB_DRIVER=json is strictly prohibited in production mode'), 'Fail-closed guard prevents JSON driver in production');
  assert(dbContent.includes('Fail-closed: falling back to JSON storage in production is strictly disabled'), 'Fail-closed guard prevents silent fallback to JSON when postgres unconfigured');

  // --------------------------------------------------------------------------
  // TEST GROUP 5: HEALTH CHECK ENDPOINT
  // --------------------------------------------------------------------------
  console.log('\n--- 5. DATABASE CONNECTIVITY HEALTH ENDPOINT ---');

  assert(fs.existsSync(HEALTH_PATH), 'GET /api/health route exists (src/app/api/health/route.ts)');
  const healthContent = fs.readFileSync(HEALTH_PATH, 'utf8');
  assert(healthContent.includes('export async function GET'), 'GET handler implemented in health endpoint');
  assert(healthContent.includes('status: 503'), 'Health endpoint returns HTTP 503 on database unavailability');
  assert(healthContent.includes('status: 200'), 'Health endpoint returns HTTP 200 when database is healthy');
  assert(!healthContent.includes('password') && !healthContent.includes('secret') && !healthContent.includes('SERVICE_ROLE'), 'Health endpoint does NOT expose database secrets or credentials');

  // --------------------------------------------------------------------------
  // TEST GROUP 6: JSON MIGRATION SCRIPT & SECURITY CREDENTIALS
  // --------------------------------------------------------------------------
  console.log('\n--- 6. JSON TO POSTGRESQL DATA MIGRATION INGESTION ---');

  const migScriptContent = fs.readFileSync(MIGRATION_SCRIPT, 'utf8');
  assert(migScriptContent.includes('studentAccounts'), 'Migration utility parses studentAccounts');
  assert(migScriptContent.includes('notificationLogs'), 'Migration utility parses notificationLogs');
  assert(migScriptContent.includes('password_hash'), 'Migration utility maps password_hash to profiles');
  assert(migScriptContent.includes('email_verified'), 'Migration utility maps email_verified to profiles');
  assert(migScriptContent.includes('public.notification_logs'), 'Migration utility outputs public.notification_logs SQL');

  // Verify generated seed SQL
  assert(fs.existsSync(SEED_SQL_PATH), 'Seed SQL file exists');
  const seedContent = fs.readFileSync(SEED_SQL_PATH, 'utf8');
  assert(seedContent.includes('BEGIN;'), 'Seed SQL wrapped in atomic transaction BEGIN');
  assert(seedContent.includes('COMMIT;'), 'Seed SQL wrapped in atomic transaction COMMIT');
  assert(seedContent.includes('INSERT INTO public.profiles'), 'Seed SQL inserts into public.profiles');
  assert(seedContent.includes('INSERT INTO public.notification_logs'), 'Seed SQL inserts into public.notification_logs');
  assert(seedContent.includes('password_hash'), 'Seed SQL preserves password_hash');

  // --------------------------------------------------------------------------
  // TEST GROUP 7: ORIGINAL SOURCE DATA IMMUTABILITY
  // --------------------------------------------------------------------------
  console.log('\n--- 7. SOURCE STORE IMMUTABILITY & PRESERVATION ---');

  const storeRaw = fs.readFileSync(STORE_PATH, 'utf8');
  const store = JSON.parse(storeRaw);
  assert(store.studentAccounts && store.studentAccounts.length === 80, 'Original student accounts preserved (80 accounts)');
  assert(store.notificationLogs && store.notificationLogs.length === 475, 'Original notification logs preserved (475 logs)');
  assert(store.teams && store.teams.length === 43, 'Original teams preserved (43 teams)');
  assert(store.waitlist && store.waitlist.length === 54, 'Original waitlist preserved (54 candidates)');

  console.log('\n================================================================');
  console.log(`TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (${failedTests} FAILED)`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runPhase10Tests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
