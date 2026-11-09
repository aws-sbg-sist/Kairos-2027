# KAIROS 2027 — Comprehensive Technical & Product Baseline Audit

> **Document Version:** 2.0 (Post-Elevation Baseline)  
> **Target Environment:** Local Production Daemon (`http://localhost:3000`)  
> **Auditing Organization:** Antigravity Principal Engineering & Product Design Team  

---

## 1. Executive Summary & Product Intelligence

**KAIROS 2027** is the flagship national 48-hour continuous technical hackathon hosted by the AWS Student Builder Group SIST at Sathyabama Institute of Science and Technology, Chennai, on **January 22–24, 2027**. 

### Core Product Objectives & Value Proposition
- **Target Audience:** 400–600 elite undergraduate and graduate developers, system architects, and AI engineers across India (100 teams of 4–6 builders).
- **Merit-First Admission:** **₹0 Entry Fee (100% Free)**. All meals, accommodation, hardware prototype bays, builder streetwear crates, and $100 AWS Promotional Credit vouchers are fully subsidized.
- **Bounty Pool:** **₹1,75,000 Total Cash Prize Pool** with ₹25,000 cash bounties per technical track, plus ₹50,000 in grand podium awards.
- **Two-Tier Screening Funnel:**
  1. *Stage 0 / Round 1:* Online Qualifier (Top 250 Semi-Finalist Squads submit Loom architecture walkthroughs and GitHub repos).
  2. *Stage 2 Finale:* Top 100 squads summoned to Sathyabama Central Library for the 48-hour physical sprint.
- **Algorithmic Fairness:** Uses standard deviation Gaussian Z-score normalization ($Z = \frac{X - \mu}{\sigma}$) to completely neutralize evaluator grading variance across 5 tracks and 3 distinct checkpoint audits.

---

## 2. Complete Technology Stack & Route Inventory

### Technology Stack
- **Framework:** Next.js 14.2.35 (React 18.3.1, TypeScript 5.6.3)
- **Styling & Design Tokens:** Tailwind CSS 3.4.14 with custom hardware tokens (`.double-bezel`, `.hud-frame`, `.reticle-frame`)
- **Typography:** Outfit (Display/Headings), Inter (Body UI), JetBrains Mono (Telemetry/Code)
- **Animations & Micro-interactions:** Framer Motion 11.11.9, Emil Kowalski spring tokens (`active:scale-[0.97]`)
- **Sound Engine:** Synthesized Web Audio API (`src/lib/audio.ts` & `src/lib/sound.ts`) — 0 byte external audio assets
- **Haptic Engine:** Web Vibration API (`src/lib/haptics.ts`) with 7 distinct tactile feedback profiles
- **Confetti System:** Canvas Confetti (`canvas-confetti` 1.9.3) with Neon Cyber, Gold Milestone, and School Pride cannons
- **Testing & QA:** Playwright MCP (headless browser validation), custom automated test suites (89 tests)

### Complete Route Inventory (43 Total Compiled Routes)

#### A. Core Participant & Public Application Pages (22 Routes)
1. `/` — Monolithic Hero Landing, 2.5D Astrolabe HUD, 48H Hack Clock, Mission Pillars, Facts Strip
2. `/tracks` — 5 Technical Tracks Architecture Bento, AWS Primitives, Rubric Weights, Challenge Abstracts
3. `/rules` — Hackathon Code of Conduct, Academic Integrity, IP Ownership, Evaluation Bylaws
4. `/sponsors` — Corporate Tier-1 Sponsorship Deck, AWS Cloud Partnership, Prospectus Downloader
5. `/refer-sponsor` — Rainmaker Corporate Sponsor Referral Portal (Interactive Deal Size Slider: ₹25k–₹2L, 10–15% cash payout)
6. `/resources` — AWS Cloud Architecture Whitepapers, GitHub SDK Starter Templates, Bedrock Quickstarts
7. `/dashboard` — Builder Central Command: Live Checkpoint Progress Telemetry (CP1/CP2/CP3), Roster Switcher, AWS Voucher Allocation
8. `/on-campus` — On-Campus Finalist Venue Floorplans, Wi-Fi 6E Mesh Status, Sathyabama Chartered Bus Fleet Hubs, Night Lock-in Safety
9. `/online-qualifier` — Round 1 Qualifier Submission Bay (GitHub repository validation, Loom video walkthrough)
10. `/portal` — Builder Credential & Digital Gateway
11. `/portal/pass` — Scannable Holographic Smart NFC Badge Pass with lanyard simulation and print dialog
12. `/register` — 100% Free Team Registration Portal with Meetup RSVP verification and T-shirt sizing
13. `/team/create` — Create Squad with unique team invite codes
14. `/team/join` — Join Squad via team invite code verification
15. `/leaderboard` — Real-Time Live Normalized Leaderboard (Double-Bezel table, Gaussian Z-scores, commit telemetry)
16. `/stage` — 20×10ft 4K Auditorium Stage Display Mode for Keynote LED screen
17. `/members` — Organizing Committee Members & Volunteers Roster
18. `/members/leadership` — Student Leadership & Executive Core Team
19. `/members/[username]` — Dynamic Individual Member Profile Dossiers
20. `/judging` — PIN-Protected Jury Evaluation Console for Checkpoints 1, 2, and 3
21. `/csat` — Participant Satisfaction Feedback Survey
22. `/admin/login` & `/admin` — Organizer Security Admin Console

#### B. Dynamic Serverless API Routes (15 Routes)
1. `/api/radar` — GET/POST Team Radar Beacon signals with token-bucket rate limiting
2. `/api/chatbot` — RAG Context-Aware Knowledge Retrieval Assistant
3. `/api/calendar` — Dynamic iCalendar `.ics` file generation in Asia/Kolkata timezone
4. `/api/v1/register` — Free Team Registration with duplicate prevention
5. `/api/v1/team` — Query and manage squad rosters and invite codes
6. `/api/v1/meetup` — Verify Meetup RSVP status for required team membership
7. `/api/v1/refer-sponsor` — Submit sponsor referral leads with commission calculation
8. `/api/v1/qualifier/submit` — Submit Loom video URL and repository for Stage 1 evaluation
9. `/api/v1/judging/submit-score` — Submit rubric evaluations and compute Gaussian Z-scores
10. `/api/v1/members` & `/api/v1/members/[id]` — Fetch committee members
11. `/api/v1/members/leadership` — Fetch executive leadership roster
12. `/api/v1/csat` & `/api/v1/csat/export` — Collect and export CSAT telemetry
13. `/api/admin/auth` — Organizer session verification with HMAC SHA-256 tokens
14. `/api/admin/flags` — Real-time feature toggle management
15. `/api/admin/waitlist/status` & `/api/admin/sponsor/status` — Operational status update pipelines

---

## 3. Findings & Defect Classification Matrix

| Finding ID | Severity | Category | Description | Remediation Status |
| :--- | :---: | :--- | :--- | :--- |
| **DEF-001** | **Critical** | Rendering | Three.js WebGL canvas crash on low-end GPUs and headless environments. | **Resolved:** Replaced with zero-overhead CSS/SVG 2.5D Astrolabe (`Logo25DAnimation.tsx`). |
| **DEF-002** | **Critical** | Audio/UX | Web Audio API unprompted instantiation triggering browser autoplay security blocks. | **Resolved:** Bound audio context creation strictly to interactive user pointer gestures. |
| **DEF-003** | **High** | Security | Timing attack vulnerability on evaluator PIN verification. | **Resolved:** Implemented `crypto.timingSafeEqual` in jury authentication. |
| **DEF-004** | **High** | Security | Public team API leaking internal invite codes in public payloads. | **Resolved:** Sanitized API response objects to strip invite credentials unless authenticated. |
| **DEF-005** | **Medium** | Visual/UX | Flat, generic card borders lacking tactile depth and hierarchy. | **Resolved:** Engineered concentric Double-Bezel (`.double-bezel`) enclosures and `.hud-frame` borders. |
| **DEF-006** | **Medium** | Accessibility | Buttons lacking responsive press physics and tactile vibration feedback. | **Resolved:** Added Emil Kowalski spring tokens (`active:scale-[0.97]`) and Web Vibration API haptics. |
| **DEF-007** | **Low** | SEO | Missing `robots.ts` and `sitemap.ts` dynamic route definitions. | **Resolved:** Implemented standard Next.js metadata routes covering all 18 primary URLs. |
| **DEF-008** | **Enhancement** | Visual | Static audio button in navbar lacking visual indication of acoustic playback. | **Resolved:** Integrated dynamic 3-bar animated soundwave equalizer bars in the header. |
| **DEF-009** | **Critical** | Access Control | Team join logic accepted public `teamCode` allowing unauthorized squad takeovers. | **Resolved:** Refactored `db.joinTeam()` to strictly require secret `inviteCode`. |
| **DEF-010** | **High** | Information Disclosure | `GET /api/v1/judging/submit-score` returned raw judge evaluation notes publicly. | **Resolved:** Restricted evaluation details strictly to authenticated admin sessions. |

---

## 4. Engineering Priorities for Ongoing Transformation

1. **Maintain Zero-Defect Compile Gate:** Enforce strict TypeScript checking on all 43 routes (`npm run build` must compile with 0 errors).
2. **Preserve Invariants:**
   - HeroSection must mount `Logo25DAnimation` and have 0 reference to `Hourglass3D` (enforced by `validate_hero_and_telemetry.js`).
   - All 68 button targets and actions in `smoke_test_suite.js` must remain 100% operational.
3. **Continuous Performance Budget:** Zero external MP3/WAV audio files (all sound synthesized via Web Audio oscillators), images optimized with modern Next.js `Image` components.
4. **Accessible Inclusivity:** Full keyboard navigation support, high-contrast text ratios exceeding WCAG 2.2 AA (minimum 4.5:1), and reduced-motion compliance.
