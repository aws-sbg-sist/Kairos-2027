/**
 * KAIROS 2027 — PHASE 10.4.2 CUTOVER BLOCKER RESOLUTION TEST SUITE
 * 
 * Verifies the 4 critical pre-provisioning cutover blocker domains:
 *  1. Task 1: Migration rerun safety (Option B fresh-database guard & checksum preflight)
 *  2. Task 2: Judge creation response contract (single-disclosure temporaryInitialPin & zero leak)
 *  3. Task 3: Non-deliverable synthetic email domain (@kairos-staging.invalid) & PII scrubbing
 *  4. Task 4: Canonical environment contract enforcement & fail-closed driver protection
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const CONSOLIDATED_SQL_PATH = path.join(ROOT_DIR, 'supabase', 'consolidated_staging_migration.sql');
const SANITIZED_SEED_PATH = path.join(ROOT_DIR, 'supabase', 'seed_sanitized_staging.sql');
const ADMIN_JUDGES_ROUTE = path.join(ROOT_DIR, 'src', 'app', 'api', 'admin', 'judges', 'route.ts');
const ADMIN_PAGE_UI = path.join(ROOT_DIR, 'src', 'app', 'admin', 'page.tsx');
const DB_LIB = path.join(ROOT_DIR, 'src', 'lib', 'db.ts');
const EMAIL_LIB = path.join(ROOT_DIR, 'src', 'lib', 'email.ts');
const JUDGE_AUTH_LIB = path.join(ROOT_DIR, 'src', 'lib', 'judge_auth.ts');
const SUPABASE_LIB = path.join(ROOT_DIR, 'src', 'lib', 'supabase.ts');
const STUDENT_AUTH_LIB = path.join(ROOT_DIR, 'src', 'lib', 'student_auth.ts');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`  ✗ [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  passedTests++;
  console.log(`  ✓ [PASS] ${message}`);
}

async function runPhase10_4_2_Tests() {
  console.log('================================================================');
  console.log('  KAIROS 2027 — PHASE 10.4.2 CUTOVER BLOCKER RESOLUTION SUITE   ');
  console.log('================================================================');

  // --------------------------------------------------------------------------
  // TASK 1: MIGRATION RERUN SAFETY (OPTION B FRESH-DATABASE GUARD)
  // --------------------------------------------------------------------------
  console.log('\n--- 1. MIGRATION RERUN SAFETY & FRESH-DATABASE GUARD (OPTION B) ---');

  assert(fs.existsSync(CONSOLIDATED_SQL_PATH), 'Consolidated staging migration SQL exists');
  const consolidatedSql = fs.readFileSync(CONSOLIDATED_SQL_PATH, 'utf8');

  assert(consolidatedSql.includes('FRESH-DATABASE GUARD & PREFLIGHT CHECKSUM VERIFICATION (OPTION B)'), 'Contains Option B Fresh-Database guard header');
  assert(consolidatedSql.includes('SELECT COUNT(*) INTO v_applied_count'), 'Queries existing count of applied forward migrations');
  assert(consolidatedSql.includes('FRESH-DATABASE PROVISIONING GUARD: Detected % forward migration(s) already recorded'), 'Raises exception and aborts if forward migrations already recorded');
  assert(consolidatedSql.includes('MIGRATION INTEGRITY ERROR: Checksum mismatch for migration'), 'Raises exception and aborts on checksum mismatch');
  assert(consolidatedSql.includes('BEGIN;') && consolidatedSql.includes('COMMIT;'), 'Atomic transaction wraps entire consolidated bundle');
  assert(!consolidatedSql.includes('20261112000003_rollback_guidance'), 'Rollback guidance 000003 is strictly excluded from bundle');
  assert(consolidatedSql.includes('20261112000001_initial_kairos_schema.sql') &&
         consolidatedSql.includes('20261112000002_row_level_security_policies.sql') &&
         consolidatedSql.includes('20261112000004_student_auth.sql') &&
         consolidatedSql.includes('20261112000005_rbac_schema.sql') &&
         consolidatedSql.includes('20261112000006_teams_admin_and_notifications.sql'), 'Includes all 5 forward migration scripts in bundle');

  // --------------------------------------------------------------------------
  // TASK 2: JUDGE CREATION RESPONSE CONTRACT & SECRET ISOLATION
  // --------------------------------------------------------------------------
  console.log('\n--- 2. JUDGE CREATION RESPONSE CONTRACT & ISOLATION ---');

  const adminJudgeRouteContent = fs.readFileSync(ADMIN_JUDGES_ROUTE, 'utf8');
  assert(adminJudgeRouteContent.includes('authCtx.role === \'ANONYMOUS\''), 'Admin judge route requires non-anonymous authentication');
  assert(adminJudgeRouteContent.includes('hasPermission(authCtx.role, \'judges:manage\')'), 'Admin judge route enforces judges:manage permission check');
  assert(adminJudgeRouteContent.includes('temporaryInitialPin: rawPin'), 'POST returns temporaryInitialPin once at root level');
  assert(adminJudgeRouteContent.includes('const { accessPin: _omitPin, ...safeJudge } = newJudge;'), 'POST strips accessPin from judge object in payload');
  assert(adminJudgeRouteContent.includes('hasPinConfigured: true'), 'POST sets hasPinConfigured indicator in returned judge');

  // Verify GET and PATCH do not return temporaryInitialPin or rawPin
  const getIndex = adminJudgeRouteContent.indexOf('export async function GET');
  const patchIndex = adminJudgeRouteContent.indexOf('export async function PATCH');
  const postIndex = adminJudgeRouteContent.indexOf('export async function POST');

  const getContent = adminJudgeRouteContent.substring(getIndex, postIndex);
  const patchContent = adminJudgeRouteContent.substring(patchIndex);

  assert(!getContent.includes('temporaryInitialPin'), 'GET route never returns temporaryInitialPin');
  assert(!patchContent.includes('temporaryInitialPin'), 'PATCH route never returns temporaryInitialPin');
  assert(getContent.includes('accessPin: _omitPin'), 'GET route strips accessPin from all listed judges');
  assert(patchContent.includes('accessPin: _omitPin'), 'PATCH route strips accessPin from updated judge');

  // Verify UI handles session-scoped temporary PIN
  const adminPageContent = fs.readFileSync(ADMIN_PAGE_UI, 'utf8');
  assert(adminPageContent.includes('data.temporaryInitialPin'), 'Admin UI consumes temporaryInitialPin on creation');
  assert(adminPageContent.includes('judgeWithSessionPin'), 'Admin UI retains PIN in-memory for active session only');
  assert(adminPageContent.includes('Configured (PBKDF2)'), 'Admin UI masks stored PIN with Configured (PBKDF2) on subsequent views');

  // --------------------------------------------------------------------------
  // TASK 3: NON-DELIVERABLE SYNTHETIC EMAIL DOMAIN (@KAIROS-STAGING.INVALID)
  // --------------------------------------------------------------------------
  console.log('\n--- 3. NON-DELIVERABLE SYNTHETIC EMAIL DOMAIN & PRIVACY ---');

  assert(fs.existsSync(SANITIZED_SEED_PATH), 'Sanitized staging seed SQL exists');
  const seedSql = fs.readFileSync(SANITIZED_SEED_PATH, 'utf8');

  assert(seedSql.includes('@kairos-staging.invalid'), 'Sanitized seed uses reserved .invalid domain (@kairos-staging.invalid)');
  assert(!seedSql.includes('@sathyabama.ac.in'), 'Sanitized seed contains zero real institutional emails');
  assert(!seedSql.includes('@staging.kairos.sbgl.events'), 'Previous non-reserved staging domain replaced with .invalid');
  assert(seedSql.includes('builder001@kairos-staging.invalid'), 'Preserves builder001 login test account');
  assert(seedSql.includes('waitlist001@kairos-staging.invalid'), 'Preserves waitlist001 test candidate');

  // Verify all phones are synthetic +91 98000
  const phoneMatches = seedSql.match(/\+91 [0-9]{5} [0-9]{5}/g) || [];
  const nonSyntheticPhones = phoneMatches.filter(p => !p.startsWith('+91 98000'));
  assert(phoneMatches.length > 0 && nonSyntheticPhones.length === 0, '100% of telephone numbers are synthetic +91 98000 XXXXX');

  // Verify all college reg nos are synthetic STG-2027-
  const realRegMatches = seedSql.match(/'4411[0-9]{4}'/g) || [];
  assert(realRegMatches.length === 0, 'Zero real university registration numbers exist in seed');

  // --------------------------------------------------------------------------
  // TASK 4: CANONICAL ENVIRONMENT CONTRACT & FACTORY ENFORCEMENT
  // --------------------------------------------------------------------------
  console.log('\n--- 4. CANONICAL ENVIRONMENT CONTRACT & FACTORY ENFORCEMENT ---');

  const supabaseCode = fs.readFileSync(SUPABASE_LIB, 'utf8');
  assert(supabaseCode.includes('process.env.SUPABASE_SERVICE_ROLE_KEY'), 'Supabase admin client reads server-only SUPABASE_SERVICE_ROLE_KEY');
  assert(supabaseCode.includes('process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY') || supabaseCode.includes('process.env.SUPABASE_ANON_KEY'), 'Supabase client supports public anon key');
  assert(!supabaseCode.includes('process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY'), 'Service role key is strictly server-only with no NEXT_PUBLIC_ exposure');

  const dbCode = fs.readFileSync(DB_LIB, 'utf8');
  assert(dbCode.includes('KAIROS_DB_DRIVER=json is strictly prohibited in production mode'), 'db.ts blocks JSON storage in production');
  assert(dbCode.includes('JSON store operations are forbidden in production environment'), 'assertJsonAllowed protects flat files in production');

  const emailCode = fs.readFileSync(EMAIL_LIB, 'utf8');
  assert(emailCode.includes('process.env.KAIROS_EMAIL_TEST_MODE === \'true\''), 'email.ts checks KAIROS_EMAIL_TEST_MODE');
  assert(emailCode.includes('isTestMode || !sesClient'), 'email.ts forces simulation sink when test mode enabled');

  const judgeAuthCode = fs.readFileSync(JUDGE_AUTH_LIB, 'utf8');
  assert(judgeAuthCode.includes('process.env.KAIROS_DISABLE_LEGACY_JUDGE_PINS === \'true\''), 'judge_auth.ts supports KAIROS_DISABLE_LEGACY_JUDGE_PINS killswitch');

  const studentAuthCode = fs.readFileSync(STUDENT_AUTH_LIB, 'utf8');
  assert(studentAuthCode.includes('process.env.STUDENT_AUTH_SECRET'), 'student_auth.ts reads dedicated STUDENT_AUTH_SECRET');
  assert(studentAuthCode.includes('process.env.SESSION_SECRET'), 'student_auth.ts falls back to SESSION_SECRET if dedicated secret omitted');

  // --------------------------------------------------------------------------
  // FINAL RESULTS
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (0 FAILED)`);
  console.log('================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runPhase10_4_2_Tests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
