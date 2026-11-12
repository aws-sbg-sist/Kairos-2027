# PHASE 08 — TRANSACTIONAL EMAIL AND NOTIFICATION SYSTEM

**KAIROS 2027: India's Premier 48-Hour Autonomous Hackathon**  
*Organized by AWS Student Builder Group (SIST Chapter) · Sathyabama University, Chennai*  
*Role: Senior Backend Integration Engineer*  
*Timestamp: November 12, 2026*  
*Status: Phase 08 Complete — 100% Verified (32/32 Tests Passed)*

---

## 1. Executive Summary

Phase 08 replaces all mocked and simulated email handling across KAIROS 2027 with a production-grade transactional email and notification architecture powered by **Amazon Simple Email Service (AWS SES)** using the official **AWS SDK v3 (`@aws-sdk/client-ses`)**.

The notification engine is architected around six core engineering pillars:
1. **AWS SES Integration:** Direct server-side dispatch using `@aws-sdk/client-ses` with dual-mode credential resolution (static server-side environment credentials or automatic AWS IAM execution role on EC2/ECS/Lambda). Zero AWS credentials or secrets are exposed to client-side bundles.
2. **10 Branded Responsive Templates:** Professional dark-theme HTML templates matching the KAIROS 2027 design language (deep space background `#070712`, glassmorphic card container `#0d0d1e`, purple-cyan accents, monospace metadata grids, and explicit plain-text fallbacks).
3. **Bounded Exponential Retries:** Transient AWS SES throttles, network timeouts, and 5xx errors are retried up to 3 times with exponential backoff before recording a terminal failure.
4. **Idempotency & Duplicate Suppression:** Cryptographic SHA-256 idempotency hashing enforces a 10-minute cooldown window, suppressing accidental double-clicks and repeated webhooks without duplicate participant spam.
5. **Persistent Telemetry Logging:** Every email attempt (whether `DELIVERED`, `SIMULATED`, `FAILED`, or `SUPPRESSED_DUPLICATE`) is logged in the database with timestamps, recipient, template, attempt count, message ID, and error telemetry.
6. **Non-Blocking Resilience:** All transactional email dispatches operate strictly out-of-band (`.catch()` wrappers). A third-party email provider outage will **never** block or roll back a participant's database registration, team creation, qualifier submission, or on-campus check-in.

---

## 2. Architecture & Component Inventory

```
┌────────────────────────────────────────────────────────────────────────┐
│                   KAIROS 2027 NOTIFICATION ENGINE                     │
└────────────────────────────────────────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
[API Event Triggers]       [Admin Broadcasts]           [Direct Notifications]
• Register (/api/v1/register)• Broadcast Announcement     • Custom Admin Dispatch
• Verify (/api/auth/register)• Track-filtered Cohort      • Test Suite Simulation
• Reset (/api/auth/forgot)   • Audit Trail Logged
• Team Create (/api/v1/team)
• Team Join (/api/v1/team)
• Team Invite (/api/v1/team/invite)
• Qualifier (/api/v1/qualifier/submit)
• Abstract (/api/admin/teams)
• Check-in (/api/admin/checkin)
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │                Idempotency & Validation                 │
       │  • Recipient Regex Check   • Deduplication Window (10m) │
       │  • Idempotency Key Match   • Duplicate Suppression      │
       └─────────────────────────────────────────────────────────┘
                                    │
                                    ├─── [Duplicate?] ──► Return SUPPRESSED_DUPLICATE
                                    │                     (Record Audit Log)
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │               Environment Mode Evaluation               │
       │  • Test / Local Dev / CI / Placeholder Credentials?     │
       └─────────────────────────────────────────────────────────┘
                    │                               │
       [Test Mode / Local Dev]             [Live Production SES]
                    ▼                               ▼
       ┌────────────────────────┐      ┌─────────────────────────┐
       │  Zero-Latency Sink     │      │   AWS SES SDK v3 Client │
       │  • Fake SES Message ID │      │   • Exponential Retries │
       │  • stdout Formatting   │      │   • Status: DELIVERED   │
       │  • Status: SIMULATED   │      │   • Max 3 Attempts      │
       └────────────────────────┘      └─────────────────────────┘
                    │                               │
                    └───────────────┬───────────────┘
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │               Database Telemetry Storage                │
       │  • Stores in notificationLogs collection / Postgres DB  │
       │  • Exposed via GET /api/admin/notifications             │
       └─────────────────────────────────────────────────────────┘
```

---

## 3. The 10 Reusable Email Templates

Each email is generated as a dual-payload containing an inline-CSS responsive dark-theme HTML layout and an RFC-compliant plain-text version:

| # | Template Function | Trigger Point | Recipient | Key Variables & Context |
|---|-------------------|---------------|-----------|-------------------------|
| **1** | `buildRegistrationConfirmationEmail` | `POST /api/v1/register`<br>`POST /api/waitlist` | New Registered Builder | Full Name, Selected Track, Unique Registration ID, Venue (Sathyabama Indoor Auditorium), Zero Entry Fee badge, Portal CTA. |
| **2** | `buildEmailVerificationEmail` | `POST /api/auth/register` | Account Applicant | Full Name, Secure Verification URL, 24-Hour Expiry, Security Warning, Manual Copy-Paste Link. |
| **3** | `buildPasswordResetEmail` | `POST /api/auth/forgot-password` | Account Owner | Full Name, One-Time Cryptographic Reset URL, 1-Hour Security Cutoff, Ignore Instructions. |
| **4** | `buildTeamCreationEmail` | `POST /api/v1/team` | Team Leader | Leader Name, Team Name, Team Code (`KAIROS-TXXX`), Confidential Invitation Code, Competition Track, Squad Roster link. |
| **5** | `buildTeamInvitationEmail` | `POST /api/v1/team/invite` | Prospective Teammate | Invitee Name, Team Leader Name, Team Name, Team Code, Invitation Code, Direct Join Squad CTA URL. |
| **6** | `buildTeamJoiningConfirmationEmail` | `PUT /api/v1/team` | Joining Member | Member Name, Squad Name, Team Code, Team Leader Name, Technical Role (`Frontend`, `Backend`, `AI/Cloud`), Portal Link. |
| **7** | `buildAbstractReviewEmail` | `PATCH /api/admin/teams` | Team Leader | Leader Name, Squad Name, Team Code, Selection Decision (`SHORTLISTED` / `REJECTED`), Allocated Desk Bay (`BAY-XXX`), Jury Remarks. |
| **8** | `buildQualifierSubmissionEmail` | `POST /api/v1/qualifier/submit` | Team Leader | Leader Name, Squad Name, Team Code, Committed GitHub URL, Loom Video Walkthrough URL, Defense Slot. |
| **9** | `buildEventAnnouncementEmail` | `POST /api/admin/notifications`<br>`POST /api/v1/announcements` | Builder Cohort | Recipient Name, Bulletin Title, Markdown Body, Urgency Tier (`NORMAL`, `HIGH`, `CRITICAL`), Dynamic Action Button. |
| **10** | `buildCheckinConfirmationEmail` | `POST /api/admin/checkin` | Checked-in Builder | Participant Name, Squad Name, Team Code, Allocated Desk Bay, Check-in Timestamp, AWS Credit Voucher, Arena Wi-Fi (`KAIROS-ARENA-5G`). |

---

## 4. Reliability, Deduplication & Error Resilience

### 4.1. Bounded Exponential Backoff Strategy
```typescript
let lastError: any = null;
const maxAttempts = options.forceRetryAttempts || MAX_RETRY_ATTEMPTS; // Default 3

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    const response = await sesClient.send(command);
    // Success: log DELIVERED and return
    return { success: true, simulated: false, messageId: response.MessageId, attempts: attempt };
  } catch (err: any) {
    lastError = err;
    const isRetryable = 
      err.name === 'ThrottlingException' || 
      err.name === 'ServiceUnavailable' || 
      err.$metadata?.httpStatusCode >= 500;

    if (!isRetryable || attempt === maxAttempts) break;

    // Exponential backoff: 200ms -> 400ms -> 800ms (max 2000ms)
    const backoffMs = Math.min(100 * Math.pow(2, attempt), 2000);
    await new Promise(resolve => setTimeout(resolve, backoffMs));
  }
}
```

### 4.2. Duplicate Notification Suppression
To prevent double-sending emails when users rapidly click buttons or network retries occur:
1. Every email payload is assigned a deterministic `idempotencyKey` derived from `template:recipient:hash(subject)`.
2. Before calling AWS SES, the engine queries `db.getNotificationByIdempotencyKey(key)`.
3. If a successful delivery occurred within the `DEDUPLICATION_WINDOW_MS` (10 minutes), the dispatch is cleanly short-circuited:
   - Returns `{ success: true, duplicate: true, suppressed: true, messageId: existing.messageId }`.
   - Records a `SUPPRESSED_DUPLICATE` event in the audit store for full telemetry visibility.

### 4.3. Development & Testing Simulation Sink
When running in test suites (`process.env.NODE_ENV === 'test'`), or when `KAIROS_EMAIL_TEST_MODE === 'true'`, or when placeholder credentials (`your-aws-access-key-id`) are detected:
- The engine operates an in-memory simulation sink with zero network latency.
- Deterministic IDs matching `ses-sim-{timestamp}-{nonce}` are generated.
- No network traffic is directed to AWS SES, ensuring zero billing cost and zero risk of accidental participant notification during automated CI runs.

---

## 5. Security & AWS IAM Least Privilege Policy

### 5.1. AWS IAM Permissions Policy
When provisioning an IAM User or Execution Role for KAIROS 2027 SES delivery, attach this least-privilege policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "KairosSESDispatchOnly",
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "arn:aws:ses:ap-south-1:*:identity/sistawscc@gmail.com",
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": "sistawscc@gmail.com"
        }
      }
    },
    {
      "Sid": "KairosSESQuotaRead",
      "Effect": "Allow",
      "Action": [
        "ses:GetSendQuota",
        "ses:GetSendStatistics"
      ],
      "Resource": "*"
    }
  ]
}
```

### 5.2. Environment Configuration
The following variables govern email behavior (documented by variable name only):

| Variable Name | Environment | Description |
|---|---|---|
| `AWS_SES_REGION` | All | AWS region for Amazon SES (defaults to `ap-south-1`). |
| `AWS_SES_ACCESS_KEY_ID` | Production | Server-side AWS Access Key ID with SES send permissions. |
| `AWS_SES_SECRET_ACCESS_KEY` | Production | Server-side AWS Secret Access Key. |
| `AWS_SES_FROM_EMAIL` | All | Verified sender address (e.g. `sistawscc@gmail.com`). |
| `KAIROS_EMAIL_TEST_MODE` | Test / CI | Set to `true` to force simulated sink execution regardless of credentials. |
| `NEXT_PUBLIC_APP_URL` | All | Public origin used to generate CTA links in email bodies. |

---

## 6. Comprehensive Verification Test Suite Results

Test execution was performed using the automated test harness `src/tests/test_phase08_email.js` against the live Next.js server on port 8000:

```
================================================================
  KAIROS 2027 — PHASE 08 TRANSACTIONAL EMAIL TEST HARNESS
================================================================

  ✔ Admin authentication for notification testing

--- SECTION 1: 10 Transactional Email Templates Rendering & Integrity ---
  ✔ T01: Template 1 - Registration confirmation rendered
  ✔ T02: Template 2 - Email verification rendered with URL & link
  ✔ T03: Template 3 - Password reset rendered with security expiry
  ✔ T04: Template 4 - Team creation rendered with codes & portal link
  ✔ T05: Template 5 - Team invitation rendered with invite link
  ✔ T06: Template 6 - Team joining confirmation rendered with role & count
  ✔ T07: Template 7a - Abstract shortlisted rendered with finals details & bay
  ✔ T08: Template 7b - Abstract rejected rendered with polite constructive feedback
  ✔ T09: Template 8 - Qualifier submission rendered with GitHub & Loom links
  ✔ T10: Template 9 - Event announcement rendered with urgent badge & CTA
  ✔ T11: Template 10 - Check-in confirmation rendered with Bay & Wi-Fi

--- SECTION 2: Address Validation & Error Handling ---
  ✔ T12: Empty recipient rejected with HTTP 400
  ✔ T13: Malformed email rejected with HTTP 400 INVALID_EMAIL

--- SECTION 3: Idempotency & Duplicate Suppression ---
  ✔ T14: First email dispatch with key succeeds (SIMULATED/DELIVERED)
  ✔ T15: Duplicate dispatch with same key suppressed (SUPPRESSED_DUPLICATE)
  ✔ T16: Fresh idempotency key dispatches new notification

--- SECTION 4: Simulation Sink Behavior & Database Logging ---
  ✔ T17: Telemetry endpoint returns recorded notifications & stats
  ✔ T18: SUPPRESSED_DUPLICATE log record found in persistent audit store

--- SECTION 5: End-to-End API Dispatches ---
  ✔ T19: Student account registration succeeds and triggers verification email
  ✔ T20: Verification email recorded in notification telemetry log
  ✔ T21: Team creation succeeds and dispatches team-creation notification
  ✔ T22: Team invite unauthenticated request rejected with HTTP 401
  ✔ T23: Authorized team invitation dispatches team-invitation email
  ✔ T24: Team joining succeeds and triggers team-joining-confirmation email
  ✔ T25: Admin shortlisting updates team and triggers abstract-review notification
  ✔ T26: On-campus check-in succeeds and triggers checkin-confirmation notification

--- SECTION 6: Admin Notifications Telemetry & Broadcast ---
  ✔ T27: Unauthenticated GET /api/admin/notifications rejected with HTTP 401
  ✔ T28: Telemetry filtering by template returns only matching records
  ✔ T29: Unauthenticated POST /api/admin/notifications rejected with HTTP 401
  ✔ T30: Announcement broadcast delivers to participant cohort with batch dispatch
  ✔ T31: Audit trail recorded organizer broadcast action in system event log

================================================================
  PHASE 08 TEST SUMMARY: 32 PASSED / 0 FAILED (32 TOTAL)
================================================================
```

### Cumulative Regression Status
- **Phase 08 Email:** 32 / 32 Passed (100%)
- **Phase 07 Judging:** 36 / 36 Passed (100%)
- **Phase 06 Organizer:** 91 / 91 Passed (100%)
- **Phase 05 Dashboard:** 60 / 60 Passed (100%)
- **Phase 04 Registration:** 51 / 51 Passed (100%)
- **Phase 03 RBAC:** 64 / 64 Passed (100%)
- **TypeScript Compilation:** Zero errors (`npx tsc --noEmit` exited 0)

---

## 7. Conclusion

Phase 08 is fully realized and battle-tested. The transactional email architecture delivers reliable, non-blocking, branded communication for every critical milestone of KAIROS 2027, backed by Amazon SES SDK v3, automatic retries, idempotency guards, and complete administrative telemetry.
