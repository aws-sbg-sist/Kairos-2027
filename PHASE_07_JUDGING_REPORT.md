# PHASE 07 — KAIROS JUDGING AND LIVE LEADERBOARD ARCHITECTURAL REPORT

**Platform:** KAIROS 2027 (India's Premier Autonomous Hackathon)  
**Role:** Senior Hackathon Evaluation Platform Engineer  
**Date:** November 12, 2026  
**Status:** **PHASE 07 COMPLETED & VERIFIED (36/36 Phase 07 Tests Passed, 370/370 All-Suites Regression Passed)**

---

## 1. Executive Summary

Phase 07 transforms the KAIROS 2027 evaluation infrastructure from prototype mock scoring into a production-grade, mathematically normalized, tamper-evident hackathon evaluation platform. 

All static mock arrays—including the hardcoded 7-team `sampleRankings` on the leaderboard and client-side hardcoded PIN checks in the scoring terminal—have been completely eliminated. They are replaced by authenticated judge sessions, track-specialized assignment filtering, four-criterion rubric validation, Gaussian Z-score normalization ($Z = \frac{X - \mu}{\sigma}$), duplicate submission prevention (HTTP 409 Conflict), audit trail logging with score edit histories, and a real-time live leaderboard supporting track filtering, mathematical tie-handling, and stage deliberation controls.

---

## 2. Key Architecture & Implemented Capabilities

### A. Authenticated Judge Identities & Session Governance
- **Access PIN Verification:** Judges authenticate using confidential 6-digit access PINs validated against the active tournament datastore (`db.verifyJudgePin()`). Constant-time comparison defends against timing side-channel attacks.
- **HMAC-SHA256 Signed Sessions:** On successful PIN validation, the server issues a cryptographically signed session token (`createJudgeToken()`) containing judge metadata (`judgeId`, `fullName`, `organization`, `trackSpecialization`, `assignedHall`, `authenticatedAt`).
- **Cookie Security:** The session token is transmitted via an `HttpOnly`, `SameSite=Lax`, `Secure` cookie (`kairos_judge_session`) with a 7-day validity period.
- **Terminal Lock (Logout):** Judges can lock their terminal via `DELETE /api/v1/judging/auth`, clearing session cookies and recording `JUDGE_LOGOUT` in the immutable audit log.

### B. Track Specialization & Assigned Team Filtering
- **Assignment Engine:** Judges are assigned to specific technical tracks matching their industry expertise:
  1. `judge-1`: Vikrant Roy (AWS Solutions Architecture) -> `Agentic AI & Cloud-Native`
  2. `judge-2`: Aishwarya Subramanian (Peak Capital Partners) -> `FinTech & Open Innovation`
  3. `judge-3`: Dr. Rajesh Kannan (Center for Distributed Computing) -> `Distributed Systems & Edge IoT`
- **Dynamic Team Visibility:** `GET /api/v1/judging/teams` dynamically filters teams matching the authenticated judge's track specialization. Each team payload includes submission review context: project abstract, GitHub repository link, Loom demo video URL, desk bay allocation, and past evaluations.
- **Track Assignment Enforcement (Fairness Guard):** If a judge attempts to score a team outside their track specialization, the backend rejects the submission with `HTTP 403 Forbidden` (`code: 'TRACK_ASSIGNMENT_MISMATCH'`), preventing cross-track bias or unauthorized interference.

### C. 100-Point Scoring Rubric & Validation
The evaluation engine enforces the official 4-criterion 100-point rubric:
- **Criterion 1 (0–30 pts):** Technical Architecture, Reliability & Scalability
- **Criterion 2 (0–25 pts):** Originality & Quality of Problem-Solving
- **Criterion 3 (0–25 pts):** Working Prototype & User Experience
- **Criterion 4 (0–20 pts):** Practical Value & Pitch Defense
- **Input Bounds:** Out-of-bounds scores, negative numbers, or invalid checkpoint gates (must be Gate 1, 2, or 3) are rejected with `HTTP 400 Bad Request`.
- **Qualitative Feedback:** Enforces a 2,000-character ceiling to prevent database payload bloat.
- **Conflict of Interest Recusal:** Evaluators can flag a conflict of interest (`recusal: true`). The system logs the recusal in `audit_logs` without penalizing the team or recording skewed zero-points.

### D. Gaussian Z-Score Normalization Engine
To neutralize grading variance between lenient and strict evaluators, each score undergoes Gaussian normalization:
$$Z = \frac{X - \mu}{\sigma}$$
Where:
- $X$ = Raw cumulative total score awarded by the evaluator ($0 \le X \le 100$)
- $\mu$ = Mean of all scores awarded by that evaluator across their evaluated cohort
- $\sigma$ = Standard deviation of the evaluator's scoring distribution ($\sigma \ge 1.0$)

Normalized Z-scores (e.g., `+1.85σ`, `-0.42σ`) are displayed on the live leaderboard and jury review dashboards.

### E. Duplicate Evaluation Prevention & Score Calibration
- **Duplicate Lockout:** A judge cannot accidentally submit duplicate evaluations for the same `(team, gate)` tuple. Unintentional re-submissions are blocked with `HTTP 409 Conflict`.
- **Calibration / Edit Mode:** When calibration is required following live table-side demos, judges must supply `isEdit: true` along with an explicit `editReason` (e.g., *"Score calibration after live architecture defense"*).
- **Tamper-Evident History:** Edits preserve an audit trail:
  - Evaluation records retain an `editHistory` array: `[{ previousScore, updatedScore, timestamp, reason }]`.
  - The tournament `audit_logs` record `UPDATE_EVALUATION` with editor identity, old score, new score, and rationale.

### F. Real-Time Live Leaderboard
- **Total Elimination of Mock Data:** Removed the static 7-team array (`sampleRankings`). The leaderboard now queries live evaluations via `GET /api/v1/leaderboard`.
- **Standings Computation:**
  - Aggregates Checkpoint 1, Checkpoint 2, and Checkpoint 3 scores.
  - Computes cumulative raw totals and average normalized Z-scores.
  - Integrates GitHub commit velocity telemetry from verified repository webhooks.
- **Mathematical Tie-Handling:** When two or more teams achieve identical raw scores and average Z-scores, they share the same rank (e.g., `#1`, `#2`, `#2`, `#4`), preventing arbitrary tie favoritism.
- **Track Filtering:** Filter by all tracks or specific tracks (`agentic-ai`, `cloud-native`, `fintech-trust`, `edge-iot`, `open-enterprise`).
- **Stage Deliberation Controls:** Respects `featureFlags.leaderboardPublished`. When unpublished during jury deliberation, live standings are withheld with a confidential deliberation banner, preventing score leaks before the grand auditorium reveal.

---

## 3. Endpoints & Interfaces Summary

| Endpoint | Method | RBAC Auth Required | Description |
| :--- | :---: | :---: | :--- |
| `/api/v1/judging/auth` | `POST` | Public (PIN Gate) | Authenticates judge PIN, issues signed `kairos_judge_session` cookie |
| `/api/v1/judging/auth` | `GET` | Judge Session | Returns current judge profile and assigned teams |
| `/api/v1/judging/auth` | `DELETE` | Judge Session | Clears session cookie, locks evaluation terminal |
| `/api/v1/judging/teams` | `GET` | Judge Session / PIN | Lists assigned teams matching judge track specialization |
| `/api/v1/judging/submit-score` | `POST` | Judge Session / PIN | Validates rubric, prevents duplicates (409), computes Z-score, supports edits |
| `/api/v1/leaderboard` | `GET` | Public | Live standings with tie-handling, track filtering, and publication gating |

---

## 4. Automated Test Suite Results

The Phase 07 test harness (`src/tests/test_phase07_judging.js`) executes 36 automated end-to-end tests validating the full judging and leaderboard lifecycle:

```
================================================================
⚡ KAIROS 2027: PHASE 07 JUDGING & LEADERBOARD TEST SUITE
================================================================

--- 1. Judge Authentication & Session Management ---
  ✓ T01: Unauthenticated request to /api/v1/judging/teams returns 401
  ✓ T02: Empty PIN rejected with HTTP 400
  ✓ T03: Non-existent PIN rejected with HTTP 401
  ✓ T04: Judge 1 (Vikrant Roy) successfully authenticated with PIN 202701 and issued session cookie
  ✓ T05: Judge 2 (Aishwarya Subramanian) authenticated with PIN 202702
  ✓ T06: Judge 3 (Dr. Rajesh Kannan) authenticated with PIN 202703
  ✓ T07: Judge session verified and persisted via HMAC-SHA256 cookie
  ✓ T08: DELETE /api/v1/judging/auth clears session cookie and logs terminal lock

--- 2. Judge Track Assignments & Assigned Teams ---
  ✓ T09: Judge 1 assigned only AI & Cloud teams according to track specialization
  ✓ T10: Judge 2 assigned only FinTech & Open Innovation teams
  ✓ T11: Judge 3 assigned only Distributed Systems & Edge IoT teams
  ✓ T12: Assigned team records contain complete submission review context and evaluations array

--- 3. Track Assignment Enforcement & Fairness Controls ---
  ✓ T13: Cross-track evaluation blocked with HTTP 403 TRACK_ASSIGNMENT_MISMATCH
  ✓ T14: Unauthenticated score submission without credentials rejected (HTTP 400/401)

--- 4. 100-Point Scoring Rubric Bounds & Validation ---
  ✓ T15: Criterion 1 score > 30 rejected with HTTP 400
  ✓ T16: Criterion 2 score > 25 rejected with HTTP 400
  ✓ T17: Criterion 3 score > 25 rejected with HTTP 400
  ✓ T18: Criterion 4 score > 20 rejected with HTTP 400
  ✓ T19: Negative rubric score rejected with HTTP 400
  ✓ T20: Invalid checkpoint gate (Gate 4) rejected with HTTP 400
  ✓ T21: Qualitative feedback exceeding 2000 characters rejected with HTTP 400

--- 5. Conflict of Interest Recusal ---
  ✓ T22: Conflict of interest recusal accepted and logged without penalizing team

--- 6. Evaluation Persistence & Gaussian Z-Scores ---
  ✓ T23: Judge 1 records Checkpoint 1 evaluation for KAIROS-T001 (Raw Score: 93/100)
  ✓ T24: Judge 1 records Checkpoint 1 evaluation for KAIROS-T002 (Raw Score: 81/100) with calibrated Z-scores
  ✓ T25: Judge 2 records Checkpoint 1 evaluation for KAIROS-T004 in FinTech (Raw Score: 89/100)
  ✓ T26: Judge 3 records Checkpoint 1 evaluation for KAIROS-T003 in Edge IoT (Raw Score: 85/100)

--- 7. Duplicate Evaluation Prevention ---
  ✓ T27: Duplicate evaluation attempt rejected with HTTP 409 Conflict

--- 8. Score Calibration & Editing with Audit Trail ---
  ✓ T28: Score calibration update succeeded with HTTP 200 and updated score 96/100
  ✓ T29: Evaluation editHistory accurately tracked previous score (93) and updated score (96)

--- 9. Real-Time Leaderboard Standings & Tie-Handling ---
  ✓ T30: Live leaderboard returns valid standings computed from actual database records
  ✓ T31: KAIROS-T001 holds Rank #1 on live leaderboard with 96.0 raw score
  ✓ T32: Leaderboard entries feature Gaussian Z-Score formatting and Git telemetry
  ✓ T33: Leaderboard track filtering isolates Agentic AI track accurately
  ✓ T34: Leaderboard track filtering isolates Autonomous Edge IoT track accurately

--- 10. Event Publication Settings & Deliberation Mode ---
  ✓ T36: Leaderboard unpublished mode withholds live scores during jury deliberation
  ✓ T37: Leaderboard successfully re-published and live standings restored for auditorium reveal

================================================================
TOTAL TESTS: 36
PASSED: 36
FAILED: 0
================================================================
```

### Regression Verification Suite Summary
Across all development phases, zero regressions were introduced:
- **Phase 07 (Judging & Leaderboard):** 36 / 36 passed (100%)
- **Phase 06 (Organizer Operations):** 91 / 91 passed (100%)
- **Phase 05 (Student Dashboard & Pass):** 60 / 60 passed (100%)
- **Phase 04 (Registration & Team):** 51 / 51 passed (100%)
- **Phase 03 (RBAC Security):** 64 / 64 passed (100%)
- **Smoke & UI Route Test Suite:** 68 / 68 passed (100%)
- **TypeScript Static Verification (`npx tsc --noEmit`):** 0 errors, 0 warnings.

---

## 5. Modified & Created Artifacts

1. `src/types/index.ts`
   - Added `leaderboardPublished?: boolean` to `FeatureFlags`.
   - Added `updatedAt`, `updatedBy`, and `editHistory` to `CheckpointEvaluation`.
   - Added `LeaderboardEntry` interface.
2. `src/lib/judge_auth.ts`
   - Judge token creation, signature verification, and session retrieval.
3. `src/lib/rbac.ts`
   - Integrated judge session resolution into `resolveAuthContext()`.
   - Enhanced track specialization matching in `verifyJudgeAuthorization()`.
4. `src/lib/db.ts`
   - Added `getEvaluationByJudgeAndTeam()`, `saveEvaluation()`, `getAssignedTeamsForJudge()`, `getLeaderboardStandings()`.
   - Implemented file modification timestamp detection in `readStore()` for instantaneous cache coherence.
5. `src/lib/postgres_repository.ts`
   - Added symmetrical judging and leaderboard methods for PostgreSQL Supabase backend.
6. `src/app/api/v1/judging/auth/route.ts`
   - Judge PIN login, session query, and logout terminal lock.
7. `src/app/api/v1/judging/teams/route.ts`
   - Assigned team roster with submission review artifacts.
8. `src/app/api/v1/judging/submit-score/route.ts`
   - 100-point rubric validation, duplicate prevention (409), edit mode with audit trail, and recusal support.
9. `src/app/api/v1/leaderboard/route.ts`
   - Live standings computation, track filtering, and publication gating.
10. `src/app/judging/page.tsx`
    - Refactored into a full-featured digital jury evaluation console with PIN gate, team selector, submission review panel, and calibration mode.
11. `src/app/leaderboard/page.tsx`
    - Removed `sampleRankings`; hooked up real-time live standings, tie handling, track filter, and stage deliberation state.
12. `src/tests/test_phase07_judging.js`
    - 36-test automated evaluation test suite.
