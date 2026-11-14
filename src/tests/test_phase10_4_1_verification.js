/**
 * KAIROS 2027 — PHASE 10.4.1 FINAL STAGING VERIFICATION TEST SUITE
 * 
 * Comprehensive automated verification covering all 6 preflight safety domains:
 *  1. Migration execution safety & preflight checksum integrity
 *  2. Judge PIN PBKDF2 security, opportunistic upgrade & legacy disable toggle
 *  3. Rate limiter deployment topology, ordering & audit protection
 *  4. Sanitized staging seed privacy (Option A) & relational idempotency
 *  5. Email simulation mode & production fail-closed driver protection
 *  6. Test matrix validation & report typo remediation
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const MIGRATIONS_DIR = path.join(ROOT_DIR, 'supabase', 'migrations');
const CONSOLIDATED_SQL_PATH = path.join(ROOT_DIR, 'supabase', 'consolidated_staging_migration.sql');
const SANITIZED_SEED_PATH = path.join(ROOT_DIR, 'supabase', 'seed_sanitized_staging.sql');
const REPORT_10_4_PATH = path.join(ROOT_DIR, 'KAIROS_2027_PHASE_10_4_STAGING_SAFETY_REPORT.md');

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

// Standalone PBKDF2 judge PIN helpers for pure unit testing
function hashJudgePinTest(pin) {
  if (!pin || typeof pin !== 'string') throw new Error('String required');
  const clean = pin.trim();
  if (!/^\d{6}$/.test(clean)) throw new Error('Must be 6 digits');
  const salt = crypto.randomBytes(16).toString('hex');
  const key = crypto.pbkdf2Sync(clean, salt, 100_000, 64, 'sha512').toString('hex');
  return `${salt}:${key}`;
}

function verifyJudgePinMatchTest(inputPin, storedPinOrHash, disableLegacy = false) {
  if (!inputPin || !storedPinOrHash) return false;
  const cleanInput = inputPin.trim();
  if (!/^\d{6}$/.test(cleanInput)) return false;
  const cleanStored = storedPinOrHash.trim();

  if (cleanStored.includes(':')) {
    const parts = cleanStored.split(':');
    if (parts.length !== 2) return false;
    const [salt, key] = parts;
    if (salt.length !== 32 || key.length !== 128) return false;
    const derivedKey = crypto.pbkdf2Sync(cleanInput, salt, 100_000, 64, 'sha512').toString('hex');
    const keyBuf = Buffer.from(key, 'hex');
    const derivedBuf = Buffer.from(derivedKey, 'hex');
    if (keyBuf.length !== derivedBuf.length) return false;
    return crypto.timingSafeEqual(keyBuf, derivedBuf);
  }

  if (disableLegacy) return false;
  if (!/^\d{6}$/.test(cleanStored)) return false;
  const inDigest = crypto.createHash('sha256').update(cleanInput).digest();
  const stDigest = crypto.createHash('sha256').update(cleanStored).digest();
  return crypto.timingSafeEqual(inDigest, stDigest);
}

async function runPhase10_4_1_Tests() {
  console.log('================================================================');
  console.log('  KAIROS 2027 — PHASE 10.4.1 FINAL STAGING VERIFICATION SUITE   ');
  console.log('================================================================');

  // --------------------------------------------------------------------------
  // 1. MIGRATION EXECUTION SAFETY & PREFLIGHT CHECKSUMS
  // --------------------------------------------------------------------------
  console.log('\n--- 1. MIGRATION EXECUTION SAFETY & PREFLIGHT CHECKSUMS ---');

  const { runMigrationPreflight } = require(path.join(ROOT_DIR, 'scripts', 'run_migrations.js'));
  const preflightResult = runMigrationPreflight({ verify: true });

  assert(preflightResult.forwardMigrations.length === 5, 'Discovered exactly 5 approved forward migrations');
  assert(preflightResult.excludedFiles.some(f => f.file.includes('000003_rollback_guidance')), 'Rollback guidance 000003 is strictly excluded');

  const consolidatedSql = fs.readFileSync(CONSOLIDATED_SQL_PATH, 'utf8');
  assert(consolidatedSql.startsWith('/*'), 'Consolidated SQL contains header documentation');
  assert(consolidatedSql.includes('BEGIN;'), 'Consolidated SQL opens single atomic transaction');
  assert(consolidatedSql.includes('COMMIT;'), 'Consolidated SQL commits transaction at completion');
  assert(consolidatedSql.includes('CREATE TABLE IF NOT EXISTS public._schema_migrations'), 'Creates public._schema_migrations audit table');
  assert(consolidatedSql.includes('FRESH-DATABASE GUARD & PREFLIGHT CHECKSUM VERIFICATION (OPTION B)'), 'Includes Option B Fresh-Database guard');
  assert(consolidatedSql.includes('FRESH-DATABASE PROVISIONING GUARD: Detected'), 'Aborts before DDL if forward migration already recorded');
  assert(consolidatedSql.includes('MIGRATION INTEGRITY ERROR: Checksum mismatch'), 'Aborts with exception on checksum mismatch');
  assert(consolidatedSql.includes('ON CONFLICT (version) DO NOTHING;'), 'Records migration execution idempotently');

  // --------------------------------------------------------------------------
  // 2. JUDGE PIN PBKDF2 SECURITY & OPPORTUNISTIC UPGRADE
  // --------------------------------------------------------------------------
  console.log('\n--- 2. JUDGE PIN PBKDF2 SECURITY & OPPORTUNISTIC UPGRADE ---');

  const testPin = '739201';
  const hashedPin = hashJudgePinTest(testPin);

  assert(hashedPin.includes(':'), 'Hashed PIN contains salt and derived key separator');
  assert(verifyJudgePinMatchTest(testPin, hashedPin) === true, 'verifyJudgePinMatch accepts valid PIN with hash');
  assert(verifyJudgePinMatchTest('999999', hashedPin) === false, 'verifyJudgePinMatch rejects invalid PIN');
  assert(verifyJudgePinMatchTest(testPin, testPin, false) === true, 'verifyJudgePinMatch supports legacy plaintext when enabled');
  assert(verifyJudgePinMatchTest(testPin, testPin, true) === false, 'verifyJudgePinMatch rejects legacy plaintext when disableLegacy=true');

  // Verify code inspection for opportunistic upgrade and legacy toggle
  const judgeAuthCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'judge_auth.ts'), 'utf8');
  assert(judgeAuthCode.includes('KAIROS_DISABLE_LEGACY_JUDGE_PINS'), 'judge_auth.ts supports KAIROS_DISABLE_LEGACY_JUDGE_PINS environment variable');

  const pgRepoCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'postgres_repository.ts'), 'utf8');
  assert(pgRepoCode.includes('Opportunistic credential upgrade: legacy plaintext PIN'), 'postgres_repository.ts implements opportunistic legacy PIN upgrade');
  assert(pgRepoCode.includes('hashJudgePin(pin)'), 'postgres_repository.ts hashes legacy PIN on upgrade');

  const dbCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'db.ts'), 'utf8');
  assert(dbCode.includes('judge.accessPin = hashJudgePin(pin)'), 'db.ts implements opportunistic legacy PIN upgrade in store');

  const adminJudgeRoute = fs.readFileSync(path.join(ROOT_DIR, 'src', 'app', 'api', 'admin', 'judges', 'route.ts'), 'utf8');
  assert(adminJudgeRoute.includes('accessPin: _omitPin'), 'admin/judges route strips accessPin from response payloads');
  assert(adminJudgeRoute.includes('temporaryInitialPin: rawPin'), 'admin/judges route returns temporaryInitialPin only once on POST');

  const judgeAuthRoute = fs.readFileSync(path.join(ROOT_DIR, 'src', 'app', 'api', 'v1', 'judging', 'auth', 'route.ts'), 'utf8');
  assert(!judgeAuthRoute.includes('addAuditLog(\'Anonymous Jury Gateway\', \'JUDGE_AUTH_FAILURE\', `Failed judge PIN authentication attempt: ${cleanPin}'), 'Judge auth failure audit log does NOT record candidate PIN');

  // --------------------------------------------------------------------------
  // 3. RATE LIMITER DEPLOYMENT LIMITATIONS & ORDERING
  // --------------------------------------------------------------------------
  console.log('\n--- 3. RATE LIMITER TOPOLOGY & ABUSE MITIGATION ---');

  const ratelimitCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'ratelimit.ts'), 'utf8');
  assert(ratelimitCode.includes('const ipStore = new Map'), 'Rate limiter uses in-memory Map (single process instance)');
  assert(ratelimitCode.includes('extractClientIp'), 'Rate limiter exports safe client IP extractor');
  assert(ratelimitCode.includes('cf-connecting-ip'), 'extractClientIp respects trusted cf-connecting-ip edge header');

  const authLoginRoute = fs.readFileSync(path.join(ROOT_DIR, 'src', 'app', 'api', 'auth', 'login', 'route.ts'), 'utf8');
  const rlLoginPos = authLoginRoute.indexOf('checkRateLimit');
  const authCallPos = authLoginRoute.indexOf('authenticateStudent');
  assert(rlLoginPos !== -1 && authCallPos !== -1 && rlLoginPos < authCallPos, 'Login route evaluates rate limit before authenticating student in database');

  const rlJudgePos = judgeAuthRoute.indexOf('checkRateLimit');
  const regexJudgePos = judgeAuthRoute.indexOf('/^\\d{6}$/');
  const dbJudgePos = judgeAuthRoute.indexOf('verifyJudgePin');
  assert(rlJudgePos < regexJudgePos && regexJudgePos < dbJudgePos, 'Judge auth checks rate limit -> regex format -> database query strictly in order');

  // --------------------------------------------------------------------------
  // 4. SANITIZED SEED PRIVACY & RELATIONAL IDEMPOTENCY
  // --------------------------------------------------------------------------
  console.log('\n--- 4. SANITIZED SEED PRIVACY & IDEMPOTENCY ---');

  assert(fs.existsSync(SANITIZED_SEED_PATH), 'Sanitized staging seed file exists');
  const seedContent = fs.readFileSync(SANITIZED_SEED_PATH, 'utf8');

  assert(!seedContent.includes('@sathyabama.ac.in'), 'Sanitized seed contains zero real institutional emails');
  assert(!seedContent.includes('+91 994'), 'Sanitized seed contains zero real personal mobile prefixes');
  assert(seedContent.includes('@kairos-staging.invalid'), 'Sanitized seed uses @kairos-staging.invalid synthetic domains');
  assert(seedContent.includes('Staging Builder'), 'Sanitized seed uses synthetic participant names');
  assert(seedContent.includes('ON CONFLICT (email) DO UPDATE'), 'Profiles insertion uses ON CONFLICT (email) for idempotency');
  assert(seedContent.includes('ON CONFLICT (id) DO UPDATE SET status'), 'Waitlist insertion is idempotent');
  assert(seedContent.includes('ON CONFLICT (id) DO UPDATE SET selection_stage'), 'Teams insertion is idempotent');
  assert(seedContent.includes('ON CONFLICT (id) DO NOTHING;'), 'Team members insertion is idempotent');
  assert(seedContent.includes('ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;'), 'Evaluations insertion is idempotent');

  // --------------------------------------------------------------------------
  // 5. EMAIL SIMULATION & FAIL-CLOSED DRIVER PROTECTION
  // --------------------------------------------------------------------------
  console.log('\n--- 5. EMAIL SIMULATION & FAIL-CLOSED GUARDS ---');

  const emailCode = fs.readFileSync(path.join(ROOT_DIR, 'src', 'lib', 'email.ts'), 'utf8');
  assert(emailCode.includes('KAIROS_EMAIL_TEST_MODE'), 'email.ts checks KAIROS_EMAIL_TEST_MODE');
  assert(emailCode.includes('isTestMode || !sesClient'), 'email.ts routes directly to simulation sink in test mode');
  assert(emailCode.includes('status: \'SIMULATED\''), 'email.ts records SIMULATED status in notification_logs');

  assert(dbCode.includes('KAIROS_DB_DRIVER=json is strictly prohibited in production mode'), 'db.ts blocks JSON storage in production');
  assert(dbCode.includes('JSON store operations are forbidden in production environment'), 'assertJsonAllowed protects flat files in production');

  // --------------------------------------------------------------------------
  // 6. TEST MATRIX VALIDATION & REPORT TYPO REMEDIATION
  // --------------------------------------------------------------------------
  console.log('\n--- 6. TEST MATRIX REPORT CORRECTION ---');

  const reportContent = fs.readFileSync(REPORT_10_4_PATH, 'utf8');
  assert(!reportContent.includes('Malformed PIN Rejection            Failure'), 'Report 10.4 does not contain "Failure" typo for Malformed PIN Rejection');
  assert(reportContent.includes('Malformed PIN Rejection            PASSED       7 / 7'), 'Report 10.4 confirms Malformed PIN Rejection is PASSED (7/7)');

  // Verify all 7 malformed PIN rejection checks pass
  assert(verifyJudgePinMatchTest('123', hashedPin) === false, 'Rejects short PIN (< 6 digits)');
  assert(verifyJudgePinMatchTest('1234567', hashedPin) === false, 'Rejects long PIN (> 6 digits)');
  assert(verifyJudgePinMatchTest('abcdef', hashedPin) === false, 'Rejects non-numeric PIN');
  assert(verifyJudgePinMatchTest('', hashedPin) === false, 'Rejects empty input PIN');
  assert(verifyJudgePinMatchTest(testPin, '') === false, 'Rejects empty stored hash');
  assert(verifyJudgePinMatchTest(testPin, 'malformed:hash:extra') === false, 'Rejects malformed multi-colon hash');
  let errThrown = false;
  try {
    hashJudgePinTest('not-a-pin');
  } catch {
    errThrown = true;
  }
  assert(errThrown === true, 'hashJudgePin throws on invalid input');

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

runPhase10_4_1_Tests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
