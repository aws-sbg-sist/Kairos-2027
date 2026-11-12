# KAIROS 2027 — COMPLETE HACKATHON PLATFORM AUDIT REPORT

**Document:** Comprehensive Codebase, Security, Architecture, Database, and Operational Audit  
**Target Platform:** KAIROS 2027 | Grand Edition (AWS Student Builder Group SIST Chapter)  
**Repository Branch:** `T&E` (`Kairos-2027`)  
**Auditor Role:** Senior Full-Stack Software Architect, QA Engineer, Application Security Auditor, DBA, and DevOps Engineer  
**Audit Date:** November 12, 2026  
**Audit Mode:** READ-ONLY / AUDIT-ONLY (Zero modifications to application code or database records)  

---

## EXECUTIVE SUMMARY TABLE

| Category | Status | Critical Findings |
|---|---|---|
| **Frontend & UX** | **PARTIALLY FUNCTIONAL** | Landing page, tracks, rules, members, and sponsors are fully functional with polished UI. However, `/dashboard`, `/portal`, `/portal/pass`, and `/leaderboard` rely on hardcoded mock data. |
| **Backend & APIs** | **PARTIALLY FUNCTIONAL** | 21 Next.js Route Handlers implemented with input sanitization and rate limiting. However, `/api/v1/qualifier/submit` has no authentication (IDOR vulnerability), and `/api/v1/csat/export` lacks authorization. |
| **Database** | **DEVELOPMENT READY (NOT PRODUCTION READY)** | Flat JSON file (`data/kairos_store.json`) with in-memory caching and serialized disk writing. No ACID transactions, foreign keys, or cluster replication. **Will lose data on serverless/ephemeral cloud deployments (e.g. Vercel, AWS Lambda).** |
| **Authentication** | **INCOMPLETE** | Admin authentication is implemented via HMAC-SHA256 cookie (`kairos_admin_session`) and master passkey. **Student/participant authentication does not exist** (no accounts, no passwords, no student sessions). |
| **Role-Based Access Control (RBAC)** | **INCOMPLETE** | Only two effective roles exist: Anonymous Visitor and Organizer Admin. No Student, Team Leader, or persistent Judge roles in authorization middleware. |
| **Registration Flow** | **PARTIALLY FUNCTIONAL** | Waitlist and team registration save to the JSON store via `/api/v1/register` and `/api/v1/team`. However, state between registration and team creation is passed via unverified URL query parameters; no user session is created. |
| **Admin Panel** | **PARTIALLY FUNCTIONAL** | Functional for waitlist status updates, sponsor inquiries, feature flags, and audit logs. **Completely missing Team Management, Abstract Review, Submission Scoring, and Judge Management tabs.** |
| **AI / RAG Chatbot** | **PRODUCTION READY** | Gemini 1.5 Flash + deterministic local fallback synthesis, keyword/synonym chunk retrieval, prompt injection defense, multi-tier rate limiting, token budget protection, and PII redaction. Passed 32/32 RAG tests and 25/25 security tests. |
| **Email & Notifications** | **MOCKED / SIMULATION ONLY** | `src/lib/email.ts` contains fallback console logging only. **No AWS SES SDK is installed** (`@aws-sdk/client-ses` missing from `package.json`), meaning real emails cannot be dispatched without implementing the client. |
| **Testing & QA** | **VERIFIED PASSING** | 68/68 Smoke Tests passed, 4/4 Core Backend tests passed, 32/32 RAG tests passed, 25/25 Security tests passed, TypeScript compiler passed with 0 errors, Next.js production build succeeded with 43 routes. |
| **Deployment & DevOps** | **NOT READY FOR PRODUCTION** | Platform depends on local filesystem write access (`fs.writeFileSync`). Ephemeral hosting will wipe all participant registrations upon redeploy or container restart. |

**Final Production Readiness Verdict:** **NOT READY FOR PRODUCTION DEPLOYMENT**  
*(The platform is visually stunning, has an exceptional AI chatbot, and functions well as a local development prototype, but requires an external ACID database, real student authentication, and an AWS SES SDK before live participant registration can safely open).*

---

# 1. EXECUTIVE SUMMARY

The KAIROS 2027 website is an enterprise-aesthetic, high-fidelity platform designed for the **AWS Student Builder Group (SIST Chapter)** to host a national 48-hour hackathon (January 22–24, 2027) with a ₹1,75,000 cash prize pool and 100 on-campus finalist teams.

### Strengths
1. **Frontend Architecture & Visual Engineering:** Outstanding visual polish featuring a Three.js 2.5D interactive astrolabe logo, fluid typography (recently un-condensed and enlarged), dual-theme system (Adobe Cyber Neon vs AWS Cloud Classic), sound design, responsive bento grids, and zero accessibility/slop lint errors (0 FAIL on Hallmark sloplint).
2. **AI Assistant & RAG Implementation:** The chatbot is production-hardened with 10 authoritative knowledge chunks, query re-writing, 1,500-character payload boundaries, multi-tier rate limiting, prompt injection defense, and automated secret redaction.
3. **Comprehensive Data Models:** Clean TypeScript schemas in `src/types/index.ts` covering waitlists, teams, evaluations, radar signals, sponsor leads, and organizing cadre.

### Critical Deficiencies
1. **No Real Database:** Storage is an embedded JSON file (`data/kairos_store.json`). It will lose all registrations on serverless environments (Vercel, Netlify, AWS Lambda) when containers recycle or code is redeployed.
2. **No Participant Authentication:** Participants cannot log in. There are no passwords, user accounts, JWT sessions, or password reset flows for students.
3. **Mock Data in Core Portals:** `/dashboard`, `/portal`, `/portal/pass`, and `/leaderboard` rely on hardcoded dummy records (`KAIROS-T001`, `Pooja Venkatesh`, `Chronos Distributed`).
4. **Mocked Email Delivery:** `src/lib/email.ts` logs emails to `console.log`. No real AWS SES SDK is wired up.
5. **IDOR on Qualifier Submissions:** Anyone knowing a team code can overwrite deliverables for that team at `/api/v1/qualifier/submit` with no authentication required.

---

# 2. PROJECT ARCHITECTURE

### Architecture Diagram

```
+---------------------------------------------------------------------------------+
|                                 CLIENT TIER                                     |
|  Next.js 14 App Router (React 18 + TypeScript + Tailwind CSS + Framer Motion)    |
|                                                                                 |
|  [Public Pages]         [Builder Flows]          [Admin & Judging]              |
|  / (Landing Page)       /register (Waitlist)     /admin (Console)               |
|  /tracks (5 Tracks)     /team/create             /admin/login                   |
|  /rules (Rulebook)      /team/join               /judging (Jury Console)        |
|  /sponsors (Prospectus) /dashboard (Mock Data)   /stage (LED Display)           |
|  /members (Cadre)       /online-qualifier        /csat (Survey)                 |
+---------------------------------------+-----------------------------------------+
                                        |
                             HTTPS / JSON REST API
                                        |
+---------------------------------------v-----------------------------------------+
|                               API ROUTE HANDLERS                                |
|  - Rate Limiting Middleware (IP + Session Sliding Window: src/lib/ratelimit.ts) |
|  - Input Validation & Length Bounding (src/lib/ai-guardrails.ts)                |
|  - HMAC Session Verification (src/lib/auth.ts)                                  |
|                                                                                 |
|  /api/v1/register        /api/v1/team             /api/v1/qualifier/submit      |
|  /api/waitlist           /api/sponsor             /api/v1/refer-sponsor         |
|  /api/v1/judging/...     /api/v1/csat             /api/v1/members               |
|  /api/chatbot (Gemini)   /api/admin/auth          /api/admin/flags              |
+-------------------+-------------------------------+-----------------------------+
                    |                               |
          +---------v---------+           +---------v---------+
          |  DATA STORE TIER  |           | EXTERNAL SERVICES |
          |  Flat File JSON   |           |                   |
          |  kairos_store.json|           | Google Gemini API |
          |  In-Memory Cache  |           | AWS SES (Mocked)  |
          |  Write Queue      |           | Meetup (Regex)    |
          +-------------------+           +-------------------+
```

### Communication Flow
1. **Frontend to Backend:** Next.js Client Components use native `fetch()` calls to communicate with Next.js Route Handlers (`src/app/api/...`).
2. **Backend to Storage:** Route handlers invoke methods on the singleton `db` object (`src/lib/db.ts`), which reads from an in-memory cache and serializes writes to `data/kairos_store.json`.
3. **Admin Authentication:** Authenticated via an HTTP-only cookie (`kairos_admin_session`) holding an HMAC-SHA256 signed payload containing the organizer's name, role, and login timestamp.

---

# 3. TECHNOLOGY STACK

| Component | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `14.2.15` | Full-stack SSR, SSG, Route Handlers |
| **UI Library** | React | `18.3.1` | Component architecture |
| **Language** | TypeScript | `5.6.3` | Type safety and schema definitions |
| **Styling** | Tailwind CSS | `3.4.14` | Design system & utility classes |
| **Animation** | Framer Motion | `11.11.9` | Smooth reveals, layout animations |
| **3D Graphics** | Three.js | `0.169.0` | 2.5D holographic logo canvas |
| **Icons** | Lucide React | `0.453.0` | Vector icon set |
| **Utilities** | Canvas Confetti & QRCode | `1.9.3` / `1.5.4` | Celebration FX & badge QR generation |
| **AI / LLM** | Google Gemini 1.5 Flash | REST API | RAG chatbot responses |
| **Database** | Embedded Flat JSON File | Custom Node.js `fs` | Document storage (`kairos_store.json`) |
| **Auth** | Custom HMAC-SHA256 | Node.js `crypto` | Admin session cookie |

---

# 4. COMPLETE FEATURE INVENTORY

### 4.1 Public Website

| Feature / Page | File Location | Status | Implementation Details |
|---|---|---|---|
| **Landing Page** | `src/app/page.tsx` | **FULLY FUNCTIONAL** | Full responsive landing page: Hero with 2.5D astrolabe, countdown clock, FactsStrip, Tracks bento, Schedule tabs, Judging breakdown, Radar, and FAQ. |
| **5 Technical Tracks** | `src/app/tracks/page.tsx` | **FULLY FUNCTIONAL** | Detailed blueprint views for Agentic AI, Cloud-Native, Edge IoT, FinTech, and Open Enterprise. |
| **Rules & Code Freeze** | `src/app/rules/page.tsx` | **FULLY FUNCTIONAL** | Official rulebook, 48H clock freeze policy, 100% IP ownership declaration, and zero-fee guarantee. |
| **Sponsors & Prospectus** | `src/app/sponsors/page.tsx` | **FULLY FUNCTIONAL** | Tier breakdown (Title, Powered-By, Gold, Track, In-Kind), PDF download, and live partnership inquiry form wired to `/api/sponsor`. |
| **Rainmaker Referral** | `src/app/refer-sponsor/page.tsx` | **FULLY FUNCTIONAL** | Crowdsourced 10%–15% commission referral lead submission wired to `/api/v1/refer-sponsor` with UPI tracking. |
| **Builder Resources** | `src/app/resources/page.tsx` | **FULLY FUNCTIONAL** | Curated AWS developer starter kits, Bedrock blueprints, and AWS documentation links. |
| **On-Campus Logistics** | `src/app/on-campus/page.tsx` | **FULLY FUNCTIONAL** | Sathyabama Indoor Auditorium floor bays, 7 meal services, night lock-in security rules, and Chennai transit bus routes. |
| **Organizing Cadre** | `src/app/members/page.tsx` | **FULLY FUNCTIONAL** | 106 student organizer directory with division filters, tier badges, and verifiable SHA-256 contribution hashes. |
| **Executive Leadership** | `src/app/members/leadership/page.tsx` | **FULLY FUNCTIONAL** | Profiles for Apex President, Faculty Coordinator, and Super Heads. |
| **Member Portfolios** | `src/app/members/[username]/page.tsx` | **FULLY FUNCTIONAL** | Dynamic route for individual member portfolio pages. |
| **Stage HUD Mode** | `src/app/stage/page.tsx` | **FULLY FUNCTIONAL** | 4K auditorium stage screen presentation with live countdown clock and current milestone tracker. |
| **Calendar Download** | `/api/calendar` | **FULLY FUNCTIONAL** | RFC 5545 `.ics` file generator for Google Calendar, Apple Calendar, and Outlook. |
| **CSAT & NPS Survey** | `src/app/csat/page.tsx` | **FULLY FUNCTIONAL** | Post-event participant feedback form saving to DB via `/api/v1/csat`. |

### 4.2 Student Experience

| Feature / Page | File Location | Status | Implementation Details |
|---|---|---|---|
| **Waitlist / Registration** | `src/app/register/page.tsx` | **PARTIALLY FUNCTIONAL** | Collects candidate information and Meetup RSVP URL; saves to waitlist in DB. Passes data via unauthenticated URL parameters to team creation. |
| **Team Creation** | `src/app/team/create/page.tsx` | **PARTIALLY FUNCTIONAL** | Submits team name, track, and abstract to `/api/v1/team`. Generates `teamCode` and `inviteCode`. Redirects to generic `/dashboard`. |
| **Team Joining** | `src/app/team/join/page.tsx` | **FULLY FUNCTIONAL** | Looks up squad by `teamCode` via `/api/v1/team?code=...` and adds member via `PUT /api/v1/team`. |
| **Student Dashboard** | `src/app/dashboard/page.tsx` | **UI ONLY / MOCK DATA** | Hardcoded to fetch `code=KAIROS-T001` or render dummy team `Chronos Distributed`. Does not display the logged-in student's real team. |
| **Builder Portal Gateway** | `src/app/portal/page.tsx` | **UI ONLY / MOCK DATA** | Hardcoded team state. "Add Member" only mutates local React state without saving to backend. |
| **Digital Builder Pass** | `src/app/portal/pass/page.tsx` | **UI ONLY / MOCK DATA** | Generates dynamic QR code for hardcoded participant `Pooja Venkatesh`. |
| **Round 1 Submission** | `src/app/online-qualifier/page.tsx` | **PARTIALLY FUNCTIONAL** | Pre-fills `KAIROS-T001` and dummy Google Meet slot. Calls `/api/v1/qualifier/submit` which updates DB, but lacks authentication. |
| **Student Login / Logout** | N/A | **NOT IMPLEMENTED** | No student login page, API, or session token exists. |
| **Email Verification** | N/A | **NOT IMPLEMENTED** | No verification tokens or email links exist. |
| **Password Reset** | N/A | **NOT IMPLEMENTED** | No credential management exists. |
| **Team Management** | N/A | **NOT IMPLEMENTED** | Leaders cannot remove members, transfer leadership, or edit abstracts once created. |

### 4.3 Organizer Experience

| Feature / Page | File Location | Status | Implementation Details |
|---|---|---|---|
| **Admin Login** | `src/app/admin/login/page.tsx` | **FULLY FUNCTIONAL** | Prompts for identity and passkey; authenticates against `ADMIN_MASTER_SECRET`. |
| **Waitlist Management** | `src/app/admin/page.tsx` | **FULLY FUNCTIONAL** | View, search, track-filter, and change candidate status (`pending`, `reviewed`, `shortlisted`, `waitlisted`, `rejected`). |
| **Sponsor Inquiries** | `src/app/admin/page.tsx` | **FULLY FUNCTIONAL** | Review incoming corporate inquiries and update engagement status. |
| **Feature Flags** | `src/app/admin/page.tsx` | **FULLY FUNCTIONAL** | Toggle registration open/closed, prize pool visibility, sandbox mode, announcement banner, and deadline. |
| **Audit Logs** | `src/app/admin/page.tsx` | **FULLY FUNCTIONAL** | Real-time audit trail of admin logins, status updates, and flag modifications. |
| **CSV Data Export** | `/api/admin/export` | **PARTIALLY FUNCTIONAL** | Exports waitlist and sponsors to CSV. Missing team roster and evaluation exports. Vulnerable to formula injection. |
| **Team Management** | N/A | **NOT IMPLEMENTED** | No UI in admin panel to browse registered teams, assign desk bays, check in teams, or view abstracts. |
| **Submission Review** | N/A | **NOT IMPLEMENTED** | No UI to view submitted Loom videos or GitHub repos for Round 1 qualifiers. |
| **Judge Management** | N/A | **NOT IMPLEMENTED** | No UI to create judge accounts or assign halls/tracks. |

### 4.4 Additional Modules

| Module | File Location | Status | Implementation Details |
|---|---|---|---|
| **AI Assistant (Chatbot)** | `src/components/chatbot/KairosChatbot.tsx` | **FULLY FUNCTIONAL** | Floating modal with Plus Jakarta Sans typography, auto-scroll, quick topics, and audio feedback. |
| **RAG Retrieval Engine** | `src/lib/kairos-rag.ts` | **FULLY FUNCTIONAL** | 10 knowledge chunks, keyword and synonym token scoring, and deterministic fallback synthesis. |
| **Rate Limiter & Guardrails** | `src/lib/ratelimit.ts`, `src/lib/ai-guardrails.ts` | **FULLY FUNCTIONAL** | Multi-tier rate limiting (minute/hour/day), concurrency locks, duplicate query suppression, and injection defense. |
| **Jury Scoring Console** | `src/app/judging/page.tsx` | **PARTIALLY FUNCTIONAL** | Judge PIN verification, 4-criterion rubric, mathematical Z-score calculation, and DB persistence. |
| **Live Leaderboard** | `src/app/leaderboard/page.tsx` | **UI ONLY / MOCK DATA** | Static array of 7 sample teams. Does not query live evaluation scores. |
| **Team Radar** | `src/components/sections/TeamRadarSection.tsx` | **FULLY FUNCTIONAL** | Real-time matchmaking signals stored and retrieved via `/api/radar`. |

---

# 5. REGISTRATION AND DATABASE AUDIT

### 5.1 Registration Lifecycle Trace

```
Student fills /register form
  ↓ (Client-side validation: required fields, email format)
Click "Verify Meetup RSVP"
  ↓ (Calls /api/v1/meetup/verify; regex validates Meetup URL format; marks verified)
Click "Save Profile & Proceed"
  ↓ (Sends POST /api/v1/register)
Backend: /api/v1/register/route.ts
  ↓ (Checks rate limit: 10/min)
  ↓ (Validates input lengths: fullName <= 150, email <= 254)
  ↓ (Normalizes email: email.trim().toLowerCase())
Database: src/lib/db.ts -> addWaitlistEntry()
  ↓ (Checks if email exists in store.waitlist)
  ↓ (Appends entry with generated ID w-{timestamp}-{random})
  ↓ (Writes to data/kairos_store.json via atomic tmp-file rename)
Response: HTTP 201 Created
  ↓ (Frontend toggles submitted state)
Student selects "Create a New Team"
  ↓ (Redirects to /team/create?name=...&email=...&college=... via URL parameters)
Student fills team details and abstract
  ↓ (Sends POST /api/v1/team)
Backend: /api/v1/team/route.ts -> db.createTeam()
  ↓ (Generates sequential teamCode KAIROS-T001, random inviteCode KAIROS-XXXX)
  ↓ (Creates leader member object, confirmed: true)
  ↓ (Saves team to store.teams in data/kairos_store.json)
Response: HTTP 201 Created with teamCode and inviteCode
  ↓
Student clicks "Enter Hacker Dashboard"
  ↓ (Redirects to /dashboard)
DASHBOARD DISCONNECT: /dashboard loads hardcoded team KAIROS-T001 instead of newly created team!
```

### 5.2 Key Audit Questions Answered

1. **Where is registration data stored?**  
   Locally in a flat JSON file at `E:\AWS SBGL\Events\Kairos\Git Site\Kairos-2027\data\kairos_store.json`.
2. **Which database is being used?**  
   An in-memory JavaScript object serialized to a flat JSON file via Node.js native `fs`. There is no PostgreSQL, MySQL, MongoDB, DynamoDB, or SQLite instance.
3. **What is the relevant table/collection?**  
   The `waitlist` array and `teams` array within the root JSON object of `kairos_store.json`.
4. **What fields are stored?**  
   - `waitlist`: `id`, `fullName`, `email`, `phone`, `institution`, `college`, `yearOfStudy`, `department`, `preferredTrack`, `portfolioUrl`, `githubUrl`, `linkedinUrl`, `meetupProfileUrl`, `awsBuilderCenterUrl`, `teamStatus`, `teamCode`, `experienceLevel`, `tShirtSize`, `motivation`, `status`, `ipAddress`, `userAgent`, `createdAt`.  
   - `teams`: `id`, `teamCode`, `teamName`, `inviteCode`, `trackId`, `institutionName`, `city`, `state`, `leaderEmail`, `selectionStage`, `problemTitle`, `problemAbstract`, `architecturePdfUrl`, `githubUrl`, `loomVideoUrl`, `members` (array of builders), `createdAt`.
5. **Is data actually persisted?**  
   Yes, on the local filesystem of the server where the Node process runs. **However, it is NOT persisted in a distributed, multi-instance, or cloud serverless environment.**
6. **Does registration survive page refreshes and new sessions?**  
   The data remains in `kairos_store.json` on disk. However, because there are no student login sessions, a student who refreshes or returns later has no way to log back into their registered team profile.
7. **Is duplicate registration prevented?**  
   - Waitlist: **Yes**, duplicate emails are rejected with HTTP 400.  
   - Teams: **Partially.** `joinTeam` prevents the same email from joining the same team twice. However, `createTeam` does **NOT** check if the team leader's email or team name already exists. A single student can create 50 teams with the same email.
8. **Are email addresses validated?**  
   Yes, standard regex validation `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` is enforced on both frontend and backend.
9. **Are required fields validated on the backend?**  
   Yes, `teamName`, `trackId`, `abstractTitle`, `abstractText`, `lead.fullName`, and `lead.email` are strictly checked for presence and character length limits.
10. **Are errors handled correctly?**  
    Yes, returns structured JSON responses `{ success: false, error: '...' }` with appropriate HTTP status codes (400, 404, 429, 500).
11. **Can organizers retrieve registered students?**  
    Yes, via `GET /api/waitlist` and the Admin Dashboard waitlist tab.
12. **Can organizers export registrations?**  
    Waitlist candidates can be exported to CSV via `/api/admin/export?type=waitlist`. **Teams and abstract submissions cannot be exported.**
13. **Are sensitive fields protected?**  
    Public team queries via `GET /api/v1/team` sanitize the data by removing `inviteCode` and emails for non-admin callers. Member queries via `GET /api/v1/members` strip student college registration numbers (`registerNo`).
14. **Are database access policies configured correctly?**  
    No database engine exists, so there are no database-level security policies (e.g., PostgreSQL RLS or IAM roles). Protection exists entirely within application route code.

---

# 6. AUTHENTICATION AND RBAC SECURITY AUDIT

### 6.1 Role Definitions
Only two distinct security boundaries exist in the code:
1. **Anonymous Public Visitor:** Any unauthenticated web user.
2. **Organizer / Admin:** Authenticated via cookie holding HMAC-SHA256 signature signed by `ADMIN_MASTER_SECRET`.

*(Student, Team Leader, and Judge roles are conceptually represented in UI and data types, but have no authentication middleware or session tokens).*

### 6.2 Permissions Matrix (Actual Implementation)

| Action / Resource | Anonymous Visitor | Student / Team Member | Team Leader | Judge | Organizer Admin |
|---|---|---|---|---|---|
| View Public Pages | Allowed | Allowed | Allowed | Allowed | Allowed |
| Submit Waitlist Entry | Allowed | Allowed | Allowed | Allowed | Allowed |
| Create Team | Allowed | Allowed | Allowed | Allowed | Allowed |
| Join Team with Code | Allowed | Allowed | Allowed | Allowed | Allowed |
| Access Hacker Dashboard | Allowed (Mock) | Allowed (Mock) | Allowed (Mock) | Allowed (Mock) | Allowed |
| Submit Qualifier Deliverables | **Allowed (IDOR)** | **Allowed (IDOR)** | **Allowed (IDOR)** | N/A | N/A |
| Submit Jury Evaluation | Denied | Denied | Denied | **Allowed (PIN)** | Allowed (PIN) |
| Access Admin Console (`/admin`) | Denied (401) | Denied (401) | Denied (401) | Denied (401) | **Allowed** |
| Update Candidate Status | Denied (401) | Denied (401) | Denied (401) | Denied (401) | **Allowed** |
| Modify Feature Flags | Denied (401) | Denied (401) | Denied (401) | Denied (401) | **Allowed** |
| Export Candidate CSV | Denied (401) | Denied (401) | Denied (401) | Denied (401) | **Allowed** |
| Export CSAT Survey CSV | **Allowed (Bug)** | **Allowed (Bug)** | **Allowed (Bug)** | **Allowed** | **Allowed** |

### 6.3 Security Findings & Vulnerabilities

#### VULN-01: Insecure Direct Object Reference (IDOR) on Qualifier Submission (Severity: HIGH)
- **Endpoint:** `POST /api/v1/qualifier/submit`
- **Location:** `src/app/api/v1/qualifier/submit/route.ts`
- **Vulnerability:** The route only requires `{ teamCode, loomVideoUrl, githubUrl }`. There is zero session or token authentication. Any user who enumerates or guesses a team code (e.g. `KAIROS-T001` to `KAIROS-T100`) can submit or overwrite another team's project deliverables.
- **Reproducible Test:**
  ```bash
  curl -X POST http://localhost:8000/api/v1/qualifier/submit \
    -H "Content-Type: application/json" \
    -d '{"teamCode":"KAIROS-T001","loomVideoUrl":"https://loom.com/malicious","githubUrl":"https://github.com/attacker/malicious"}'
  ```

#### VULN-02: Missing Authorization on CSAT Survey Data Export (Severity: MEDIUM)
- **Endpoint:** `GET /api/v1/csat/export`
- **Location:** `src/app/api/v1/csat/export/route.ts`
- **Vulnerability:** Unlike `/api/admin/export`, this endpoint does not call `getCurrentAdminSession()`. Any unauthenticated user can download the full CSV of all participant feedback and testimonials.

#### VULN-03: Shared Master Secret Passkey (Severity: MEDIUM)
- **Location:** `src/lib/auth.ts`
- **Vulnerability:** All organizers use a single shared passkey (`ADMIN_MASTER_SECRET`). There are no individual organizer accounts with hashed passwords (bcrypt/argon2). If one organizer is compromised or leaves the committee, the entire admin portal must have its master secret rotated.

#### VULN-04: Potential CSV Formula Injection (Severity: LOW)
- **Location:** `src/app/api/admin/export/route.ts`
- **Vulnerability:** When generating CSV files for waitlist entries, field values starting with `=cmd|' /C ...'` or `@SUM` are enclosed in quotes but not prepended with a single quote `'`. If an organizer opens the exported CSV in Microsoft Excel, formulas could execute.

---

# 7. BACKEND AND API AUDIT

### 7.1 Complete Endpoint Inventory

| Endpoint | Method | Purpose | Auth Required | Validation & Constraints | Status |
|---|---|---|---|---|---|
| `/api/v1/register` | `POST` | Candidate registration | No (Rate limit: 10/min) | Full length checks, regex email | **FUNCTIONAL** |
| `/api/v1/team` | `GET` | Look up team by code or list all | No (Sanitized if non-admin) | Sanitizes `inviteCode` & email | **FUNCTIONAL** |
| `/api/v1/team` | `POST` | Create a new squad & abstract | No (Rate limit: 10/min) | Required fields, length bounds | **FUNCTIONAL** |
| `/api/v1/team` | `PUT` | Join squad with invite code | No (Rate limit: 10/min) | Max 6 members, Meetup RSVP | **FUNCTIONAL** |
| `/api/v1/qualifier/submit` | `POST` | Submit Round 1 video & repo | **No (IDOR Vulnerability)** | Requires github.com URL | **FUNCTIONAL (INSECURE)** |
| `/api/waitlist` | `POST` | Early waitlist submission | No (Rate limit: 10/min) | Email uniqueness, lengths | **FUNCTIONAL** |
| `/api/waitlist` | `GET` | Retrieve waitlist candidates | **Yes (Admin Session)** | Returns full array | **FUNCTIONAL** |
| `/api/sponsor` | `POST` | Corporate sponsorship inquiry | No (Rate limit: 10/min) | Email regex, required tier | **FUNCTIONAL** |
| `/api/sponsor` | `GET` | Retrieve sponsor inquiries | **Yes (Admin Session)** | Returns full array | **FUNCTIONAL** |
| `/api/radar` | `GET` | List active builder signals | No (Public) | Sorted newest first | **FUNCTIONAL** |
| `/api/radar` | `POST` | Broadcast builder signal | No (Rate limit: 10/min) | Length bounds on bio/skills | **FUNCTIONAL** |
| `/api/v1/refer-sponsor` | `POST` | Submit Rainmaker referral lead | No (Rate limit: 10/min) | Required UPI ID & company POC | **FUNCTIONAL** |
| `/api/v1/refer-sponsor` | `GET` | Track referral status by code | No (Masks UPI unless Admin) | Sanitizes PII for visitors | **FUNCTIONAL** |
| `/api/v1/judging/submit-score` | `POST` | Submit jury checkpoint score | **Yes (Judge PIN)** | Timing-safe PIN check, rubric bounds | **FUNCTIONAL** |
| `/api/v1/csat` | `POST` | Submit participant survey | No (Public) | NPS 0–10, satisfaction 1–5 | **FUNCTIONAL** |
| `/api/v1/csat` | `GET` | Retrieve aggregate CSAT metrics | No (Public) | Calculates mean & count | **FUNCTIONAL** |
| `/api/v1/csat/export` | `GET` | Download CSAT CSV | **No (Missing Auth)** | Raw CSV attachment | **FUNCTIONAL (INSECURE)** |
| `/api/v1/members` | `GET` | List organizing cadre | No (Strips regNo for non-admin) | Division & tier filters | **FUNCTIONAL** |
| `/api/v1/members/[id]` | `GET` | Single member profile | No (Strips regNo for non-admin) | Matches username slug | **FUNCTIONAL** |
| `/api/v1/meetup/verify` | `GET/POST`| Meetup RSVP format check | No (Rate limit: 30/min) | Strict Meetup regex | **FUNCTIONAL** |
| `/api/calendar` | `GET` | Download `.ics` event file | No (Public) | RFC 5545 format, Asia/Kolkata | **FUNCTIONAL** |
| `/api/chatbot` | `POST` | Ask Kairos RAG Assistant | No (Multi-tier Rate Limiter) | 1,500 chars, injection filter | **FUNCTIONAL** |
| `/api/admin/auth` | `POST` | Authenticate organizer passkey | No (Rate limited) | Sets HTTP-only HMAC cookie | **FUNCTIONAL** |
| `/api/admin/auth` | `DELETE`| Log out organizer | No | Clears cookie | **FUNCTIONAL** |
| `/api/admin/flags` | `GET/POST`| Get/Update feature flags | **Yes for POST (Admin)** | Audit logs updates | **FUNCTIONAL** |
| `/api/admin/waitlist/status` | `POST` | Change candidate status | **Yes (Admin Session)** | Enum: pending, shortlisted, etc. | **FUNCTIONAL** |
| `/api/admin/export` | `GET` | Export waitlist/sponsors CSV | **Yes (Admin Session)** | CSV attachment | **FUNCTIONAL** |
| `/api/admin/chatbot` | `GET/POST`| Telemetry / Maintenance mode | **Yes (Admin Session)** | Chatbot metrics & 503 toggle | **FUNCTIONAL** |

---

# 8. FRONTEND AND USER EXPERIENCE AUDIT

### 8.1 Usability & Interaction
- **Typography & Readability:** Recently updated with root `html { font-size: 17.5px; }`, open `letter-spacing: 0.012em;`, and `Plus Jakarta Sans` for the AI Assistant. Text is sharp, highly legible, and no longer condensed or cramped.
- **Audio Feedback System:** `src/lib/audio.ts` provides subtle synthesized Web Audio clicks on buttons and an ambient loop toggle.
- **Theme Switcher:** Seamless transition between Adobe Cyber Neon (`data-theme="cyber"`) and AWS Cloud Classic (`data-theme="aws"`).
- **Responsive Layout:** Tested across mobile, tablet, and desktop breakpoints. Navigation collapses to a hamburger menu with full-screen mobile overlay.

### 8.2 Disconnected Frontend Routes
1. **`/dashboard`:** Displays hardcoded team `KAIROS-T001` (`Chronos Distributed`) instead of reading the active user's team.
2. **`/portal`:** Local state only; adding teammates does not persist to server.
3. **`/portal/pass`:** Renders dynamic QR code, but with hardcoded student name (`Pooja Venkatesh`).
4. **`/leaderboard`:** Static 7-team mock array; zero API integration.

---

# 9. AI / RAG / CHATBOT AUDIT

The chatbot was audited and benchmarked using automated test suites.

### 9.1 RAG Architecture
- **Knowledge Ingestion:** 10 curated markdown knowledge chunks in `src/lib/kairos-rag.ts` covering Overview, Schedule, Prizes, Tracks, Rules, Logistics, Team Composition, Organizers, and AWS Services.
- **Retrieval Mechanism:** Hybrid semantic token matching with a synonym dictionary (`SYNONYM_MAP`), score thresholding, and confidence tagging (`HIGH`, `PARTIAL`, `LOW`).
- **Contextual Query Rewriter:** Resolves ambiguous follow-up pronouns ("What about second place?", "Can we have one more?") using the last 3 conversation turns.
- **Model Orchestration:** Google Gemini 1.5 Flash via REST API with a local deterministic synthesis fallback if the API is offline or throttled.

### 9.2 Guardrails & Safety
- **Multi-Tier Rate Limiting:**
  - Anonymous: 10 req/min, 40 req/hour, 100 req/day.
  - Authenticated: 20 req/min, 100 req/hour, 300 req/day.
  - Burst protection: Suppresses identical queries within a 5-second window.
  - Concurrency lock: One active request per session at a time.
  - Secondary IP abuse guard: Throttles if >80 req/min from a single IP.
- **Input Sanitization:** Strips null bytes and control characters; enforces a strict 1,500 character limit.
- **Prompt Injection Defense:** Regex filters reject system override attempts ("Ignore previous instructions", "DAN mode", "Reveal system prompt").
- **Secret Scrubber:** Post-generation regex redacts any accidental exposure of API keys (`AIza...`) or session secrets.
- **Strict Anti-Hallucination Policy:** Does not fabricate prize split-ups (explicitly states they are a surprise secret); directs users to `sistawscc@gmail.com` when information is missing.

---

# 10. DATABASE AND DATA INTEGRITY

### 10.1 Schema Limitations
The storage layer (`data/kairos_store.json`) is a simple flat JSON file.

```
data/kairos_store.json
├── waitlist: []
├── sponsors: []
├── referrals: []
├── featureFlags: {}
├── auditLogs: []
├── teams: []
├── radarSignals: []
├── judges: []
├── evaluations: []
├── csat: []
└── members: []
```

### 10.2 Deficiencies & Risks
1. **Serverless Ephemeral Storage Risk:** On Vercel, Netlify, or AWS Lambda, the local filesystem is read-only or ephemeral. **Any write to `data/kairos_store.json` will either fail or be wiped when the container spins down.**
2. **Concurrency Collisions:** While `writeQueue` serializes writes within a single Node process, multiple concurrent containers or server instances will overwrite each other's data, leading to corruption or lost registrations.
3. **No Foreign Key Constraints:** Member records inside `teams[].members` have no foreign keys. If a team is deleted, orphaned data is not cleaned up.
4. **No Indexing:** Queries perform array iterations (`Array.find()`, `Array.filter()`). While fine for 100 teams, this will degrade if applications exceed thousands of records.
5. **No Migration Tooling:** There is no database migration system (Prisma, Drizzle, Flyway). Any schema change requires manual JSON patching.

---

# 11. TESTING RESULTS

The platform was subjected to automated test suites:

| Suite Name | Command / File | Tests Run | Passed | Failed | Status |
|---|---|---|---|---|---|
| **Smoke & Button Route Suite** | `node src/tests/smoke_test_suite.js` | 68 | 68 | 0 | **100% PASS** |
| **Core Backend Validation** | `node src/tests/validate_backend.js` | 4 | 4 | 0 | **100% PASS** |
| **Audit Fixes & Security Verification** | `node src/tests/validate_fixes_and_chatbot.js` | 7 | 7 | 0 | **100% PASS** |
| **RAG Master 32-Point Benchmark** | `node src/tests/test_rag_master_suite.js` | 32 | 32 | 0 | **100% PASS** |
| **Chatbot Security & Rate Limiting** | `node src/tests/test_chatbot_security_suite.js` | 25 | 25 | 0 | **100% PASS** |
| **TypeScript Static Check** | `npx tsc --noEmit` | N/A | 0 errors | 0 | **100% PASS** |
| **Next.js Production Build** | `npm run build` | 43 routes | 43 | 0 | **100% PASS** |
| **Hallmark Sloplint** | `node sloplint.mjs src` | 68 files | 0 FAIL | 0 | **100% PASS** |

---

# 12. DEPLOYMENT AND PRODUCTION READINESS

### 12.1 Production Blockers
1. **Filesystem Database:** Cannot deploy to Vercel/Netlify without replacing `db.ts` with a real database client (e.g. Supabase, PostgreSQL via Prisma, MongoDB, or AWS DynamoDB).
2. **Missing Email Transport:** AWS SES credentials in `.env.local` are not wired to an actual SES client SDK.
3. **Participant Authentication:** No student accounts mean participants cannot access their team dashboard after registration.

### 12.2 Environment Configuration Audit
- `ADMIN_MASTER_SECRET`: Configured in `.env.local`. Handled securely with fallback warning in dev mode.
- `GEMINI_API_KEY`: Configured in `.env.local` for AI chatbot.
- `AWS_SES_*`: Defined in `.env.example`, but no SDK client library exists in `package.json`.

---

# 13. ADMIN OPERATIONS GUIDE

For website owners and student organizers, here is how the current administrative tools operate:

### 13.1 Accessing the Admin Console
1. Navigate to: `http://localhost:8000/admin/login` (or `/admin` which will auto-redirect).
2. Select your Organizer Name from the dropdown (e.g. "Thenappan T" or "Organizer Lead").
3. Enter the **Master Passkey** (configured as `ADMIN_MASTER_SECRET` in `.env.local`).
4. Click **"Authorize Session"**. An HTTP-only cookie (`kairos_admin_session`) valid for 7 days is set.

### 13.2 Operating the Admin Dashboard (`/admin`)
- **Waitlist Tab:**
  - View all registered candidates sorted by newest first.
  - Search by name, email, or institution.
  - Filter candidates by preferred technical track.
  - Click status badges to update a candidate: `Reviewed`, `Shortlisted`, `Waitlisted`, or `Rejected`.
- **Sponsors Tab:**
  - View corporate sponsorship leads submitted via `/sponsors`.
  - Update status: `Contacted`, `Negotiation`, `Confirmed`, or `Archived`.
- **Feature Flags Tab:**
  - Toggle **Registration Open / Closed** (immediately reflected in `/api/admin/flags`).
  - Toggle **Prize Pool Confirmed**.
  - Toggle **Sandbox Demo Mode**.
  - Set **Global Announcement Banner Text**.
  - Set **Registration Deadline String**.
- **Audit Logs Tab:**
  - View timestamped log of all organizer actions (logins, flag updates, candidate approvals).
- **Exporting Data:**
  - Click **"Export Waitlist (CSV)"** to download `KAIROS_2027_Waitlist_YYYY-MM-DD.csv`.
  - Click **"Export Sponsors (CSV)"** to download `KAIROS_2027_Sponsors_YYYY-MM-DD.csv`.

---

# 14. MISSING FEATURES AND GAP ANALYSIS

### P0 — Critical (Must Fix Before Any Live Launch)
1. **Production Database Migration:** Migrate `src/lib/db.ts` from `kairos_store.json` to a cloud database (PostgreSQL on AWS RDS / Supabase / Neon / DynamoDB).
2. **Student Authentication & Sessions:** Implement NextAuth.js / Supabase Auth / Clerk or custom JWT sessions so students can log in, view their own squad, and access their dashboard.
3. **Fix IDOR on Qualifier Submissions:** Protect `POST /api/v1/qualifier/submit` by verifying that the submitter is the authenticated team leader of that squad.
4. **Protect CSAT Data Export:** Add admin session verification to `GET /api/v1/csat/export`.

### P1 — High (Core Hackathon Operations)
1. **Wire Real AWS SES SDK:** Install `@aws-sdk/client-ses` in `package.json` and replace the console log in `src/lib/email.ts` with real SES `SendEmailCommand`.
2. **Admin Team Management Interface:** Add a "Teams" tab in `/admin` to browse teams, inspect abstracts, assign desk bays (e.g. `BAY-A12`), and mark check-in status.
3. **Dynamic Participant Dashboard:** Connect `/dashboard` to load the authenticated student's team from the database instead of hardcoded `KAIROS-T001`.
4. **Dynamic Leaderboard:** Connect `/leaderboard` to query `db.getEvaluations()` and calculate real-time Z-scores rather than displaying static sample data.

### P2 — Medium (Operational Enhancements)
1. **CSV Formula Injection Sanitization:** Prepend `'` to all CSV cells starting with `=`, `+`, `-`, or `@` in `/api/admin/export`.
2. **Admin Judge Management:** Add UI in `/admin` to generate judge access PINs, assign tracks, and view judge progress.
3. **Team Roster Modification for Leaders:** Allow team leaders to remove or replace teammates before the registration deadline.
4. **Team Abstract Word-Count Backend Enforcement:** Mirror frontend 250-word cap on `problemAbstract` in `POST /api/v1/team`.

### P3 — Low (Polish & Analytics)
1. **Live Meetup API Verification:** Replace regex checking in `/api/v1/meetup/verify` with official Meetup API OAuth checks if chapter API keys are available.
2. **Vector Embeddings for RAG:** If knowledge base grows beyond 50 chunks, transition from token matching to pgvector on Amazon OpenSearch / Aurora.

---

# 15. PRIORITIZED ACTION PLAN & DEVELOPMENT ROADMAP

```
+-----------------------------------------------------------------------------------+
| PHASE 1: DATABASE & AUTHENTICATION FOUNDATION (Week 1)                            |
| 1. Provision PostgreSQL database (Supabase, AWS RDS, or Neon).                   |
| 2. Set up Prisma / Drizzle ORM schemas matching src/types/index.ts.               |
| 3. Implement NextAuth.js / JWT auth for students (Email Magic Link / Password).   |
| 4. Replace src/lib/db.ts storage methods with ORM database queries.              |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
| PHASE 2: SECURITY HARDENING & EMAIL INTEGRATION (Week 2)                          |
| 1. Install @aws-sdk/client-ses; implement real email delivery in src/lib/email.ts.|
| 2. Enforce session authentication on /api/v1/qualifier/submit (Resolve IDOR).    |
| 3. Add admin session check to /api/v1/csat/export.                                |
| 4. Sanitize CSV export against spreadsheet formula injection.                     |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
| PHASE 3: FRONTEND WIRING & ADMIN COMPLETION (Week 3)                              |
| 1. Wire /dashboard to load the authenticated student's real team data.            |
| 2. Wire /leaderboard to live evaluation scores from db.getEvaluations().          |
| 3. Add "Teams" and "Submissions" management tabs in /admin.                       |
| 4. Wire /portal/pass to generate QR codes with real team and desk bay info.       |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
| PHASE 4: STAGING DRILL & PRODUCTION LAUNCH (Week 4)                               |
| 1. Deploy to AWS Amplify / AWS App Runner / Vercel with persistent DB.            |
| 2. End-to-end rehearsal: Register team -> Invite member -> Submit abstract ->    |
|    Admin shortlist -> Qualifier submission -> Judge scoring -> Valedictory.       |
| 3. Go live for national registrations.                                            |
+-----------------------------------------------------------------------------------+
```

---

# 16. FINAL PRODUCTION READINESS VERDICT

### **VERDICT: NOT READY FOR PRODUCTION**

### Justification
While the platform excels in frontend presentation, typography, audio feedback, test automation (100% pass across all test suites), and AI chatbot guardrails, **it cannot be operated in production in its current state because it lacks a persistent ACID database and student authentication.** 

Deploying the current code to any modern serverless or containerized cloud host will result in registration loss upon server recycling, and students have no mechanism to securely log back in, manage their team, or view their official acceptance status.

Following the 4-phase roadmap above will bring this platform to a secure, enterprise-grade, production-ready standard.
