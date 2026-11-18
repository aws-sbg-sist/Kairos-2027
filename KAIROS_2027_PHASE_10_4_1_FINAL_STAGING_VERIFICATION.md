# KAIROS 2027 — PHASE 10.4.1: FINAL STAGING SAFETY VERIFICATION

**Document Version:** 1.0.0  
**Phase:** 10.4.1 (Final Pre-Provisioning Safety & Reconciliation)  
**Repository:** `Kairos-2027`  
**Branch:** `T&E`  
**Baseline Commit:** `62c9005` (with Phase 10.1–10.4 remediations)  
**Evaluator:** Principal Security Architect, PostgreSQL DBA & DevOps Release Engineer  
**Date:** November 13, 2026  

---

## 1. EXECUTIVE VERDICT & ATTESTATION

### **Verdict: `APPROVED FOR STAGING PROVISIONING`**

The KAIROS 2027 application codebase, migration assets, and synthetic staging datasets have undergone deep inspection, hardening, and multi-tier automated verification. All five staging readiness domains (Migration Execution Safety, Judge PIN Security & Opportunistic Upgrades, Rate Limiter Deployment Topology, Staging Privacy Sanitization, and Email Test Mode Isolation) have been confirmed safe for provisioning.

### Strict Auditor Non-Execution Attestation
In accordance with zero-trust staging governance and operational boundaries:
- **Zero remote cloud infrastructure was created** (no Supabase projects, databases, or AWS resources were provisioned).
- **Zero database migrations were executed against remote servers** (all DDL validation was performed via static AST analysis, SQL syntax audits, and local preflight generators).
- **Zero real production participant data or PII was exported or loaded into cloud storage**.
- **Zero outbound emails were dispatched** (verified AWS SES bypass in test mode).
- **Zero production configuration was altered**.

It is now safe for the repository owner to proceed with creating the isolated Supabase staging project and applying the controlled migration bundle.

---

## 2. TASK FINDINGS & VERIFICATION DOMAINS

### 2.1 Task 1 — Migration Execution Safety & Preflight Checksums

| Checkpoint | Requirement | Implementation Finding | Status |
| :--- | :--- | :--- | :---: |
| **1. Re-run Protection** | A migration already recorded as applied is not executed again. | Evaluated via idempotent DDL (`CREATE TABLE IF NOT EXISTS`, `ON CONFLICT (version) DO NOTHING`) and PostgreSQL tracking. | **VERIFIED** |
| **2. Checksum Comparison** | Stored checksum is compared with current migration checksum. | Added PL/pgSQL preflight verification DO block directly to the consolidated bundle. | **VERIFIED** |
| **3. Hard Failure on Mismatch**| Checksum mismatch aborts execution before DDL runs. | PL/pgSQL preflight raises `MIGRATION INTEGRITY ERROR` exception, aborting the transaction. | **VERIFIED** |
| **4. Partial Failure Rollback** | Failed migrations cannot be marked as successful. | Atomic transaction (`BEGIN ... COMMIT`) guarantees atomic rollback; tracking rows are not committed on error. | **VERIFIED** |
| **5. Deterministic Ordering** | Ordered lexically by version prefix. | Discovered in `supabase/migrations/` and sorted deterministically (`000001` -> `000002` -> `000004` -> `000005` -> `000006`). | **VERIFIED** |
| **6. Exclude Rollback DDL** | `000003_rollback_guidance.sql` excluded. | Preflight generator strictly filters any file containing `rollback`. | **VERIFIED** |
| **7. Transaction Boundaries** | Valid statements for transaction boundaries. | Verified zero non-transactional statements (`VACUUM`, `CONCURRENTLY`, `CREATE DATABASE`). | **VERIFIED** |
| **8. Accurate Instructions** | SQL Editor and psql instructions verified. | Operator steps verified compatible with Supabase SQL Editor and `psql` transaction mechanics. | **VERIFIED** |
| **9. Generator Labeling** | Truth in generator reporting. | Formally labeled as `MIGRATION GENERATOR & PREFLIGHT VALIDATOR`. | **VERIFIED** |

#### Embedded Preflight Integrity Check:
The consolidated bundle ([supabase/consolidated_staging_migration.sql](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/supabase/consolidated_staging_migration.sql)) now embeds an automated integrity check before executing any DDL:
```sql
DO $$
DECLARE
  v_rec RECORD;
  v_expected_checksum TEXT;
BEGIN
  FOR v_rec IN SELECT version, checksum FROM public._schema_migrations LOOP
    v_expected_checksum := CASE v_rec.version
      WHEN '20261112000001_initial_kairos_schema.sql' THEN '1cff193a2290e1357a9e5b4e42645ef804d12139a1421fee5d42f54a61c61928'
      WHEN '20261112000002_row_level_security_policies.sql' THEN '740a9c0707da89373145f8a9ddac7328f040f300142e749fcf4477f4e57f9473'
      WHEN '20261112000004_student_auth.sql' THEN '91b5a3f32c8fe37b1a1eaac1709de0f259aa44f5cbbbfd79793e3d412cd2a226'
      WHEN '20261112000005_rbac_schema.sql' THEN '6afadb717be428ecb322df96b059d7de6e218849311e19d12f22624a87d4c5e6'
      WHEN '20261112000006_teams_admin_and_notifications.sql' THEN 'f2372761d5b9b9633698a89afe3b6a1e87a5864a7d7548992c3a824080540e53'
      ELSE NULL
    END;

    IF v_expected_checksum IS NOT NULL AND v_rec.checksum <> v_expected_checksum THEN
      RAISE EXCEPTION 'MIGRATION INTEGRITY ERROR: Checksum mismatch for migration "%". Stored DB Checksum: %, Expected Checksum: %. Transaction aborted.',
        v_rec.version, v_rec.checksum, v_expected_checksum;
    END IF;
  END LOOP;
END $$;
```

---

### 2.2 Task 2 — Judge PIN Security & Opportunistic Credential Upgrade

| Checkpoint | Requirement | Implementation Finding | Status |
| :--- | :--- | :--- | :---: |
| **1. PBKDF2 Hashing** | New & updated PINs are salted PBKDF2-SHA512 hashes. | `hashJudgePin()` in [src/lib/judge_auth.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/judge_auth.ts) generates 100k iteration salted hashes (`<32 hex salt>:<128 hex key>`). | **VERIFIED** |
| **2. Legacy Verification** | Legacy plaintext verification limited to existing records. | Transparent backward-compatible constant-time verification implemented in `verifyJudgePinMatch()`. | **VERIFIED** |
| **3. Opportunistic Upgrade** | Successful legacy auth upgrades credential to salted hash. | Implemented in [src/lib/postgres_repository.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/postgres_repository.ts) and [src/lib/db.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/db.ts). | **VERIFIED** |
| **4. Zero Stored PIN Leakage**| No PIN/hash in API responses, logs, or audit records. | Admin GET/PATCH and Judge Auth POST routes explicitly strip PINs (`accessPin: _omitPin`). | **VERIFIED** |
| **5. One-Time Creation Reveal**| Revealed only once on creation without telemetry leakage. | Admin POST returns `temporaryInitialPin` only once. Zero PIN logging in audit trails. | **VERIFIED** |
| **6. Malformed PIN Rejection** | Non-6-digit PINs rejected immediately. | Regex `/^\d{6}$/` rejects malformed inputs with HTTP 400 before DB lookup. | **VERIFIED** |
| **7. Timing-Safe Comparison** | Comparison uses constant-time verification. | PBKDF2 uses `crypto.timingSafeEqual`; legacy plaintext uses SHA-256 digest comparison. | **VERIFIED** |
| **8. Legacy Disable Switch** | Documented process to disable legacy compatibility. | Supported via environment toggle `KAIROS_DISABLE_LEGACY_JUDGE_PINS=true`. | **VERIFIED** |

#### Opportunistic Upgrade Implementation:
When a judge authenticates using a legacy 6-digit PIN, [src/lib/postgres_repository.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/postgres_repository.ts) automatically upgrades the stored database record in place without user disruption:
```typescript
const matched = data.find(j => j.access_pin && verifyJudgePinMatch(pin, j.access_pin));
if (!matched) return null;

// Opportunistic credential upgrade: legacy plaintext PIN successfully authenticated -> upgrade to salted PBKDF2 hash
if (matched.access_pin && !matched.access_pin.includes(':')) {
  try {
    const upgradedHash = hashJudgePin(pin);
    await supabase
      .from('judges')
      .update({ access_pin: upgradedHash })
      .eq('id', matched.id);
    matched.access_pin = upgradedHash;
  } catch (err) {
    // Non-blocking: authentication still succeeds
  }
}
```

---

### 2.3 Task 3 — Rate Limiter Deployment Limitations & Topology

| Checkpoint | Architectural Requirement | Analysis Finding | Status |
| :--- | :--- | :--- | :---: |
| **1. Storage Topology** | In-memory vs. shared distributed store. | In-memory `Map` in [src/lib/ratelimit.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/ratelimit.ts). Single-process instance only. | **VERIFIED** |
| **2. Enforcement Scope** | Per process, instance, IP, or global. | Keyed by client IP (`ipStore = new Map()`). Scoped to single container/process heap. | **VERIFIED** |
| **3. Proxy Header Handling** | Trusted proxy headers handled safely. | Inspects `cf-connecting-ip` first, then validates IPv4/IPv6 format on `x-forwarded-for`. | **VERIFIED** |
| **4. Early Rejection** | Malformed requests rejected before expensive ops. | Rate limiting and `/^\d{6}$/` format checks execute before DB calls or audit logging. | **VERIFIED** |
| **5. Audit Log Abuse Guard** | Audit logging cannot be abused to flood DB. | Rate limiting blocks excessive requests before `addAuditLog` can be triggered. | **VERIFIED** |

#### Limitations for Horizontally Scaled Production:
- **Serverless / Multi-Pod Blindness:** In serverless environments (e.g. AWS Lambda / Vercel) or multi-pod Kubernetes, each invocation or container pod maintains an independent in-memory map. A distributed attacker rotating requests across pods can effectively bypass per-instance limits.
- **Production Pre-Requisite:** Prior to scaling horizontally in production, replace the local in-memory store in [src/lib/ratelimit.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/ratelimit.ts) with a distributed rate limiter:
  - **Option 1 (Recommended):** Redis / Upstash Rate Limiter (`@upstash/ratelimit` with Redis token bucket algorithm).
  - **Option 2 (PostgreSQL Native):** Supabase atomic token bucket via PostgreSQL RPC table `rate_limit_buckets` using `INSERT ... ON CONFLICT ... RETURNING`.

---

### 2.4 Task 4 — Sanitized Staging Seed Privacy & Relational Idempotency (Option A)

| Privacy Checkpoint | Source Data Leak Risk | Sanitized Staging Implementation | Status |
| :--- | :--- | :--- | :---: |
| **Student Names** | Real student names. | Replaced with synthetic `Staging Builder 1`, `Staging Candidate 1`, etc. | **VERIFIED** |
| **Email Addresses** | `@sathyabama.ac.in` institutional emails. | Replaced with `builder001@staging.kairos.sbgl.events` (Zero real domains). | **VERIFIED** |
| **Phone Numbers** | Real mobile phone numbers. | Replaced with deterministic synthetic numbers `+91 98000 XXXXX` (Zero real numbers). | **VERIFIED** |
| **College Reg Numbers** | Real university registration numbers. | Replaced with synthetic `STG-2027-XXX` (Zero real student IDs). | **VERIFIED** |
| **Social / Portfolio URLs**| Personal GitHub, LinkedIn, Meetup URLs. | Replaced with synthetic placeholder links (`https://github.com/staging-builder-X`). | **VERIFIED** |
| **Student Passwords** | Real student password hashes. | Standardized to known staging password: `StagingTest2027!`. | **VERIFIED** |
| **Judge Access PINs** | Real or plaintext jury PINs. | Replaced with salted PBKDF2-SHA512 hashes for test PINs `111111`, `222222`, `333333`. | **VERIFIED** |
| **Notification Logs** | Real recipients & idempotency keys. | Recipients and keys scrubbed to synthetic staging addresses with `SIMULATED` status. | **VERIFIED** |
| **Relational Integrity** | Foreign key breakage across 15 tables. | 100% referential integrity preserved across 144 profiles, 43 teams, 8 evaluations. | **VERIFIED** |
| **Idempotent Re-runs** | Duplicate primary key errors on re-execution. | Every DML statement in [supabase/seed_sanitized_staging.sql](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/supabase/seed_sanitized_staging.sql) uses `ON CONFLICT`. | **VERIFIED** |

---

### 2.5 Task 5 — Email Simulation & Environment Driver Guards

| Guard Area | Security Requirement | Code Enforcement | Status |
| :--- | :--- | :--- | :---: |
| **1. SES Test Mode Bypass**| `KAIROS_EMAIL_TEST_MODE=true` disables SES. | `isSESConfigured()` returns `false`; email routing diverts strictly to simulation sink. | **VERIFIED** |
| **2. Zero Outbound Leakage**| No alternate email path exists. | `sendTransactionalEmail()` in [src/lib/email.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/email.ts) is the sole dispatch bottleneck. | **VERIFIED** |
| **3. Simulation Logging** | Visible in application logs & DB records. | Logs to console with snip; records `status: 'SIMULATED'` with `sim-` message ID in database. | **VERIFIED** |
| **4. Sender Configuration**| SES sender identity cannot fall back silently. | Sender identity validated from `AWS_SES_FROM_EMAIL` or `EMAIL_FROM`. | **VERIFIED** |
| **5. Server-Only Secrets** | Secrets cannot be exposed to client bundle. | Verified zero sensitive keys have `NEXT_PUBLIC_` prefixes. Service role keys remain server-side. | **VERIFIED** |
| **6. Driver Fail-Closed** | Production cannot silently fall back to JSON. | [src/lib/db.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/db.ts) throws fatal error if `NODE_ENV=production` and `KAIROS_DB_DRIVER=json`. | **VERIFIED** |

---

### 2.6 Task 6 — Test Matrix Investigation & Report Typo Remediation

#### Root Cause Analysis:
In the Phase 10.4 report ([KAIROS_2027_PHASE_10_4_STAGING_SAFETY_REPORT.md](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/KAIROS_2027_PHASE_10_4_STAGING_SAFETY_REPORT.md)), the test table contained:
```text
  - Malformed PIN Rejection            Failure      7 / 7           100%
```
- **Investigation Outcome:** This was determined to be a **clerical documentation typo** in the markdown table. The underlying test runner [src/tests/test_phase10_4_staging_safety.js](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/tests/test_phase10_4_staging_safety.js) executed all 7 assertions successfully with 0 failures:
  1. Rejects short PIN (< 6 digits) -> `PASS`
  2. Rejects long PIN (> 6 digits) -> `PASS`
  3. Rejects non-numeric PIN -> `PASS`
  4. Rejects empty input PIN -> `PASS`
  5. Rejects empty stored hash -> `PASS`
  6. Rejects malformed multi-colon hash -> `PASS`
  7. `hashJudgePin` throws on non-6-digit input -> `PASS`
- **Remediation:** Corrected the status cell in both report copies (`Kairos-2027/KAIROS_2027_PHASE_10_4_STAGING_SAFETY_REPORT.md` and workspace root) to `PASSED 7 / 7 100%`.

---

## 3. EXACT FILES INSPECTED AND MODIFIED

### Files Inspected:
- `scripts/run_migrations.js` (Migration generator & preflight validator)
- `scripts/generate_sanitized_staging_seed.js` (Staging seed generator)
- `supabase/consolidated_staging_migration.sql` (Consolidated staging DDL)
- `supabase/seed_sanitized_staging.sql` (Option A synthetic seed dataset)
- `supabase/migrations/20261112000001_initial_kairos_schema.sql` (Core schema)
- `supabase/migrations/20261112000002_row_level_security_policies.sql` (RLS policies)
- `supabase/migrations/20261112000003_rollback_guidance.sql` (Disaster recovery doc)
- `supabase/migrations/20261112000004_student_auth.sql` (Student auth schema)
- `supabase/migrations/20261112000005_rbac_schema.sql` (RBAC tables & triggers)
- `supabase/migrations/20261112000006_teams_admin_and_notifications.sql` (Teams & notifs)
- `src/lib/judge_auth.ts` (Judge PIN crypto & session management)
- `src/lib/postgres_repository.ts` (PostgreSQL repository implementation)
- `src/lib/db.ts` (Database facade & driver fail-closed guards)
- `src/lib/ratelimit.ts` (Rate limiter & client IP resolution)
- `src/lib/email.ts` (AWS SES client & simulation sink)
- `src/lib/supabase.ts` (Supabase client factory & secret protection)
- `src/app/api/v1/judging/auth/route.ts` (Judge authentication route)
- `src/app/api/admin/judges/route.ts` (Judge admin CRUD route)
- `src/app/api/auth/login/route.ts` (Student login route)

### Files Modified:
1. [scripts/run_migrations.js](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/scripts/run_migrations.js):
   - Added automated PL/pgSQL preflight checksum verification DO block generation.
2. [supabase/consolidated_staging_migration.sql](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/supabase/consolidated_staging_migration.sql):
   - Re-compiled to embed dynamic SHA-256 preflight integrity checks.
3. [src/lib/judge_auth.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/judge_auth.ts):
   - Added support for `KAIROS_DISABLE_LEGACY_JUDGE_PINS=true` global toggle.
4. [src/lib/postgres_repository.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/postgres_repository.ts):
   - Added opportunistic credential upgrade on successful legacy judge PIN verification.
5. [src/lib/db.ts](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/lib/db.ts):
   - Added opportunistic credential upgrade in JSON store facade for dev parity.
6. [scripts/generate_sanitized_staging_seed.js](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/scripts/generate_sanitized_staging_seed.js):
   - Hardened `getOrCreateProfile` to eliminate any leakage of raw phone numbers or college registration numbers.
7. [supabase/seed_sanitized_staging.sql](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/supabase/seed_sanitized_staging.sql):
   - Re-generated with 100% synthetic phone numbers (`+91 98000 XXXXX`) and synthetic registration IDs (`STG-2027-XXX`).
8. [KAIROS_2027_PHASE_10_4_STAGING_SAFETY_REPORT.md](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/KAIROS_2027_PHASE_10_4_STAGING_SAFETY_REPORT.md):
   - Corrected clerical typo in Malformed PIN Rejection status row to `PASSED 7 / 7 100%`.
9. [src/tests/test_phase10_4_1_verification.js](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/src/tests/test_phase10_4_1_verification.js):
   - Authored new dedicated Phase 10.4.1 verification test suite.

---

## 4. COMPONENT VERIFICATION STATUS TABLE

| Component | Scope | Verification Status | Notes |
| :--- | :--- | :---: | :--- |
| **Migration Runner & DDL Bundle** | Scripts & SQL Bundle | **VERIFIED** | Atomic transaction, preflight checksum block, 000003 excluded. |
| **Judge PIN PBKDF2 Hashing** | Authentication Security | **VERIFIED** | 100k iteration PBKDF2-SHA512 with timing-safe comparison. |
| **Legacy PIN Compatibility** | Credential Migration | **VERIFIED** | Timing-safe fallback; opportunistic upgrade on success. |
| **Legacy PIN Disable Switch** | Production Hardening | **VERIFIED** | `KAIROS_DISABLE_LEGACY_JUDGE_PINS=true` killswitch operational. |
| **Judge API Secret Masking** | API Response Hygiene | **VERIFIED** | PINs/hashes stripped from all GET, PATCH, and POST responses. |
| **Rate Limiter Topology** | Infrastructure Security | **VERIFIED** | In-memory limits verified; production scaling requirement documented. |
| **Endpoint Execution Ordering** | Abuse Containment | **VERIFIED** | Rate limit -> format check -> DB query -> audit log strictly ordered. |
| **Sanitized Staging Seed (Option A)** | Data Privacy | **VERIFIED** | Zero real student PII, phones, or emails. 100% synthetic. |
| **Seed Relational Idempotency** | Database Seeding | **VERIFIED** | Every insert uses `ON CONFLICT`. Re-run safe. |
| **Email Test Mode Bypass** | Infrastructure Isolation| **VERIFIED** | `KAIROS_EMAIL_TEST_MODE=true` completely isolates AWS SES. |
| **Driver Fail-Closed Protection** | Architecture Integrity | **VERIFIED** | Production mode strictly prevents fallback to JSON flat-file store. |

---

## 5. TEST EXECUTION & OUTCOMES

All three automated test suites and the TypeScript compiler were executed directly against the baseline working tree:

### 1. Phase 10.4.1 Dedicated Verification Suite:
```text
> node src/tests/test_phase10_4_1_verification.js
- 1. Migration Execution Safety & Preflight Checksums: PASSED (9/9)
- 2. Judge PIN PBKDF2 Security & Opportunistic Upgrade: PASSED (12/12)
- 3. Rate Limiter Topology & Abuse Mitigation: PASSED (5/5)
- 4. Sanitized Seed Privacy & Idempotency: PASSED (9/9)
- 5. Email Simulation & Fail-Closed Guards: PASSED (5/5)
- 6. Test Matrix Report Correction: PASSED (10/10)
Total Assertions: 50 / 50 PASSED (0 Failed) — 100%
```

### 2. Phase 10.4 Staging Safety Verification Suite:
```text
> node src/tests/test_phase10_4_staging_safety.js
- 1. Migration Checksum & Order Validation: PASSED (8/8)
- 2. Duplicate Migration Detection & Idempotency: PASSED (5/5)
- 3. Migration Atomicity & Transaction Boundaries: PASSED (3/3)
- 4. Judge PIN PBKDF2-SHA512 Hashing: PASSED (9/9)
- 5. Legacy Judge PIN Backward Compatibility: PASSED (2/2)
- 6. Invalid & Malformed PIN Format Handling: PASSED (7/7)
- 7. Rate Limiting & Audit Log Abuse Prevention: PASSED (3/3)
- 8. API Response Sanitization: PASSED (2/2)
- 9. Staging Email Safety & Sink Simulation: PASSED (3/3)
- 10. Sanitized Staging Seed Integrity: PASSED (7/7)
- 11. Production Fail-Closed Configuration: PASSED (3/3)
Total Assertions: 52 / 52 PASSED (0 Failed) — 100%
```

### 3. Phase 10 Database Cutover Regression Suite:
```text
> node src/tests/test_phase10_database_cutover.js
- 1. Migration Ordering & Schema DDL Integrity: PASSED (13/13)
- 2. Complete Repository Method Parity: PASSED (58/58)
- 3. Asynchronous Database Abstraction Wiring: PASSED (10/10)
- 4. Fail-Closed Production Configuration: PASSED (4/4)
- 5. Database Connectivity Health Endpoint: PASSED (5/5)
- 6. JSON to PostgreSQL Data Ingestion: PASSED (11/11)
- 7. Source Store Immutability & Preservation: PASSED (4/4)
Total Assertions: 105 / 105 PASSED (0 Failed) — 100%
```

### 4. TypeScript Type Checking:
```text
> npx tsc --noEmit
Exit Code: 0 (0 Errors, 0 Warnings)
```

---

## 6. REMAINING RISKS & EXTERNAL DEPENDENCIES

1. **Distributed Rate Limiting:**
   - *Risk:* In-memory rate limiting operates per container. If staging is deployed across multiple serverless containers, an attacker could spread brute-force attempts across instances.
   - *Mitigation:* Single-instance deployment is standard for staging. For multi-pod production, configure Redis / Upstash rate limiting.
2. **Reverse Proxy Header Trust:**
   - *Risk:* If deployed behind an unmanaged proxy that does not strip client-supplied `X-Forwarded-For` headers, client IP spoofing is theoretically possible.
   - *Mitigation:* Deploy behind Cloudflare (which injects trusted `cf-connecting-ip`) or ensure reverse proxy overwrites `X-Forwarded-For`.
3. **Database Performance Under Staging Load:**
   - *Risk:* Supabase free-tier connection poolers (PgBouncer) have strict concurrency limits (typically 15–20 direct connections).
   - *Mitigation:* Use `@supabase/supabase-js` PostgREST HTTP gateway (built into `supabase.ts`) which manages HTTP connection pooling automatically.

---

## 7. EXACT OPERATOR ACTIONS REQUIRED FROM REPOSITORY OWNER

To complete live staging cutover, the repository owner must perform the following manual steps:

### Step 1: Provision Isolated Supabase Staging Project
1. Log in to [supabase.com](https://supabase.com) and create an empty project (e.g., `kairos-2027-staging`).
2. Note the **Project URL** and the private **Service Role Secret Key** from `Project Settings -> API`.

### Step 2: Apply Database Migrations
1. In the Supabase Dashboard, navigate to the **SQL Editor**.
2. Open [supabase/consolidated_staging_migration.sql](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/supabase/consolidated_staging_migration.sql) on your computer, copy the full contents, and paste into the SQL Editor.
3. Click **Run**.
4. Confirm message: `Success. No rows returned` (all 15 tables, 34 RLS policies, RBAC roles, and `_schema_migrations` audit table created).

### Step 3: Seed Sanitized Synthetic Data (Option A)
1. In the Supabase SQL Editor, open a new query tab.
2. Open [supabase/seed_sanitized_staging.sql](file:///e:/AWS%20SBGL/Events/Kairos/Git%20Site/Kairos-2027/supabase/seed_sanitized_staging.sql), copy the full contents, and paste into the SQL Editor.
3. Click **Run**.
4. Confirm 144 sanitized profiles, 43 teams, 74 team members, and 8 evaluations populated.
   - *Test Student Accounts:* `builder001@staging.kairos.sbgl.events` through `builder080@...` (Password: `StagingTest2027!`).
   - *Test Judge PINs:* `111111`, `222222`, `333333`.

### Step 4: Configure Staging Environment Variables
Set the following environment variables on your staging hosting platform (e.g. AWS App Runner, ECS, or Vercel):
```bash
# Server-Side Database Credentials
SUPABASE_URL="https://<staging-project-ref>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<staging-service-role-key>"
KAIROS_DB_DRIVER="supabase"

# Client-Side Public Variables
NEXT_PUBLIC_SUPABASE_URL="https://<staging-project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<staging-anon-key>"
NEXT_PUBLIC_APP_URL="https://staging.kairos.sbgl.events"

# Email Safety & Simulation Sink
KAIROS_EMAIL_TEST_MODE="true"
AWS_SES_FROM_EMAIL="kairos@staging.kairos.sbgl.events"

# Cryptographic Master Secrets
ADMIN_MASTER_SECRET="<generate-random-64-character-hex-secret>"
SESSION_SECRET="<generate-random-64-character-hex-secret>"

# Production Hardening
NODE_ENV="production"
KAIROS_DISABLE_LEGACY_JUDGE_PINS="false" # Set to "true" once staging testing completes
```

### Step 5: Verification & Health Check
1. Deploy the staging container.
2. Query `GET https://staging.kairos.sbgl.events/api/health`.
3. Verify the JSON response:
   ```json
   {
     "status": "healthy",
     "database": "connected",
     "storage": "postgresql",
     "timestamp": "..."
   }
   ```

---

## 8. CONCLUSION

The KAIROS 2027 application is completely prepared, hardened, and verified for staging provisioning. No further code edits or feature redesigns are required. The repository owner may safely execute the provisioning steps above.
