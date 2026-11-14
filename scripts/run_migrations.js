/**
 * KAIROS 2027 — CONTROLLED POSTGRESQL MIGRATION GENERATOR & PREFLIGHT VALIDATOR
 * 
 * Safely discovers, orders, validates checksums, and compiles database migrations
 * for execution via Supabase SQL Editor or direct psql connection.
 * 
 * Safety Guarantees:
 *  1. Strictly excludes disaster recovery documentation (20261112000003_rollback_guidance.sql).
 *  2. Computes SHA-256 cryptographic checksums for all migration files.
 *  3. Enforces public._schema_migrations audit table with RLS.
 *  4. Atomicity: Wraps compiled migrations inside a single BEGIN ... COMMIT block.
 *  5. Idempotent: Uses ON CONFLICT (version) DO NOTHING to safely prevent duplicate execution.
 *  6. Transparent Labeling: Clearly acts as a generator and validator, not an unverified executor.
 * 
 * Usage:
 *   node scripts/run_migrations.js [--generate-bundle] [--verify]
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'supabase', 'migrations');
const BUNDLE_OUT = path.join(__dirname, '..', 'supabase', 'consolidated_staging_migration.sql');

function computeChecksum(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}

function runMigrationPreflight(options = {}) {
  console.log('================================================================');
  console.log(' KAIROS 2027: MIGRATION GENERATOR & PREFLIGHT VALIDATOR        ');
  console.log('================================================================');

  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.error('Fatal: Migrations directory not found at', MIGRATIONS_DIR);
    process.exit(1);
  }

  const allFiles = fs.readdirSync(MIGRATIONS_DIR).filter(f => f.endsWith('.sql')).sort();
  console.log(`\nDiscovered ${allFiles.length} migration files in supabase/migrations/:`);

  const forwardMigrations = [];
  const excludedFiles = [];

  for (const file of allFiles) {
    const fullPath = path.join(MIGRATIONS_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    const checksum = computeChecksum(content);

    // Identify rollback guidance or disaster recovery files
    if (file.includes('rollback')) {
      excludedFiles.push({ file, reason: 'Rollback guidance / documentation only (contains destructive comments)', checksum });
    } else {
      forwardMigrations.push({ file, fullPath, content, checksum });
    }
  }

  console.log('\n--- 1. EXCLUDED MIGRATION FILES (SAFETY SHIELD) ---');
  if (excludedFiles.length === 0) {
    console.log('  None');
  } else {
    for (const ex of excludedFiles) {
      console.log(`  [EXCLUDED] ${ex.file}`);
      console.log(`             Reason: ${ex.reason}`);
      console.log(`             SHA-256: ${ex.checksum}`);
    }
  }

  console.log('\n--- 2. FORWARD MIGRATION EXECUTION PLAN ---');
  forwardMigrations.forEach((m, idx) => {
    console.log(`  Step ${idx + 1}: ${m.file} (${(m.content.length / 1024).toFixed(1)} KB, SHA-256: ${m.checksum.substring(0, 16)}...)`);
  });

  // Build the consolidated idempotent SQL bundle
  console.log('\n--- 3. COMPILING CONSOLIDATED ATOMIC MIGRATION BUNDLE ---');

  const bundleLines = [];
  bundleLines.push('/*');
  bundleLines.push('================================================================================');
  bundleLines.push('   KAIROS 2027 — CONSOLIDATED STAGING POSTGRESQL MIGRATION BUNDLE');
  bundleLines.push('   Generated on: ' + new Date().toISOString());
  bundleLines.push('   Target: Supabase PostgreSQL (Staging / Production)');
  bundleLines.push('   Execution Mode: Single Atomic Transaction (BEGIN ... COMMIT)');
  bundleLines.push('================================================================================');
  bundleLines.push('   Execution order:');
  forwardMigrations.forEach((m, idx) => {
    bundleLines.push(`     ${idx + 1}. ${m.file} (SHA-256: ${m.checksum})`);
  });
  bundleLines.push('================================================================================');
  bundleLines.push('*/\n');

  bundleLines.push('BEGIN;\n');

  // 1. Create the schema tracking table
  bundleLines.push('-- ============================================================================');
  bundleLines.push('-- SCHEMA MIGRATION TRACKING TABLE');
  bundleLines.push('-- ============================================================================');
  bundleLines.push(`CREATE TABLE IF NOT EXISTS public._schema_migrations (
  version VARCHAR(255) PRIMARY KEY,
  checksum VARCHAR(64) NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);\n`);
  bundleLines.push(`ALTER TABLE public._schema_migrations ENABLE ROW LEVEL SECURITY;\n`);
  bundleLines.push(`DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = '_schema_migrations' AND policyname = 'service_role_all_schema_migrations'
  ) THEN
    CREATE POLICY "service_role_all_schema_migrations" ON public._schema_migrations FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;\n`);

  // 1.1 Fresh-Database Guard & Preflight Checksum Verification (Option B)
  bundleLines.push('-- ============================================================================');
  bundleLines.push('-- FRESH-DATABASE GUARD & PREFLIGHT CHECKSUM VERIFICATION (OPTION B)');
  bundleLines.push('-- ============================================================================');
  bundleLines.push(`DO $$
DECLARE
  v_rec RECORD;
  v_expected_checksum TEXT;
  v_applied_count INT := 0;
BEGIN
  -- 1. Fresh-database guard: abort if any forward migration was already recorded
  SELECT COUNT(*) INTO v_applied_count 
  FROM public._schema_migrations 
  WHERE version IN (`);

  const versionList = forwardMigrations.map(m => `'${m.file}'`).join(',\n    ');
  bundleLines.push(`    ${versionList}\n  );`);

  bundleLines.push(`
  IF v_applied_count > 0 THEN
    RAISE EXCEPTION 'FRESH-DATABASE PROVISIONING GUARD: Detected % forward migration(s) already recorded in public._schema_migrations. This consolidated staging bundle is strictly fresh-database-only. Incremental migrations must be applied individually. Aborting execution.', v_applied_count;
  END IF;

  -- 2. Verify checksum of any other existing records in _schema_migrations to prevent tampering
  FOR v_rec IN SELECT version, checksum FROM public._schema_migrations LOOP
    v_expected_checksum := CASE v_rec.version`);
  for (const m of forwardMigrations) {
    bundleLines.push(`      WHEN '${m.file}' THEN '${m.checksum}'`);
  }
  bundleLines.push(`      ELSE NULL
    END;

    IF v_expected_checksum IS NOT NULL AND v_rec.checksum <> v_expected_checksum THEN
      RAISE EXCEPTION 'MIGRATION INTEGRITY ERROR: Checksum mismatch for migration "%". Stored DB Checksum: %, Expected Checksum: %. Transaction aborted.',
        v_rec.version, v_rec.checksum, v_expected_checksum;
    END IF;
  END LOOP;
END $$;\n`);

  // 2. Append each migration with tracking record insertion
  for (const m of forwardMigrations) {
    bundleLines.push(`-- ============================================================================`);
    bundleLines.push(`-- MIGRATION: ${m.file}`);
    bundleLines.push(`-- ============================================================================`);
    bundleLines.push(m.content.trim());
    bundleLines.push('\n');
    bundleLines.push(`-- Record migration in tracking table (Idempotent: prevents duplicate records)`);
    bundleLines.push(`INSERT INTO public._schema_migrations (version, checksum)
VALUES ('${m.file}', '${m.checksum}')
ON CONFLICT (version) DO NOTHING;\n`);
  }

  bundleLines.push('COMMIT;\n');

  const bundleContent = bundleLines.join('\n');
  fs.writeFileSync(BUNDLE_OUT, bundleContent, 'utf8');

  console.log(`  ✓ Successfully wrote atomic migration bundle:`);
  console.log(`    ${BUNDLE_OUT}`);
  console.log(`    Size: ${(bundleContent.length / 1024).toFixed(1)} KB`);
  console.log(`    Total Forward Migrations Included: ${forwardMigrations.length}`);
  console.log(`    Total Destructive Files Excluded:  ${excludedFiles.length}`);

  console.log('\n================================================================');
  console.log('    MIGRATION BUNDLE PREFLIGHT COMPLETED SUCCESSFULLY           ');
  console.log('================================================================\n');

  return {
    forwardMigrations,
    excludedFiles,
    bundlePath: BUNDLE_OUT,
    checksums: forwardMigrations.map(m => ({ file: m.file, checksum: m.checksum }))
  };
}

if (require.main === module) {
  runMigrationPreflight();
}

module.exports = { runMigrationPreflight, computeChecksum };
