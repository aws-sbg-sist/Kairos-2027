# KAIROS 2027 | Grand Edition — National Flagship 48-Hour Technical Hackathon

> **Where Architecture Meets Execution.**  
> **Duration:** 48 Hours Continuous · **Cohort:** 100 Elite National Squads (400–600 Builders)  
> **Dates:** 22–24 January 2027 · **Venue:** Sathyabama Central Library Arena Complex, Chennai, India  
> **Organized by:** AWS Student Builder Group (AWS SBG) — SIST Chapter  
> **Academic Unit:** Department of Computer Science & Engineering, School of Computing  
> **Institution:** Sathyabama Institute of Science and Technology, Chennai  

---

## 1. Executive Summary & Core Facts

| Metric / Dimension | Specification |
| :--- | :--- |
| **Event Name** | KAIROS 2027 (Grand Edition) |
| **Duration & Clock** | **Exactly 48.0 Hours** (22 Jan 09:30 AM IST – 24 Jan 05:00 PM IST) |
| **Venue** | Sathyabama Central Library Complex (Hacking Bays LH1, LH2 & LH3), Chennai |
| **National Scale** | 100 Shortlisted Teams (4–6 builders per squad, 400–600 on-campus hackers) |
| **Registration Fee** | **₹0 / 100% Free Merit Admission** (Zero Hidden Fees) |
| **Cash Prize Pool** | **₹1,75,000 Total Cash Bounties** (₹25,000 per track + ₹50,000 Grand Podium) |
| **Subsidized Support** | Meals, Accommodation, Heavyweight Streetwear Crate & $100 AWS Credit Vouchers |
| **Two-Tier Screening** | Stage 1 Online Qualifier (Top 250) → Stage 2 On-Campus Grand Finale (Top 100) |
| **Algorithmic Fairness** | Gaussian Z-Score Normalization ($Z = \frac{X - \mu}{\sigma}$) across 3 Evaluation Checkpoints |

---

## 2. Tech Stack & Engineering Architecture

- **Framework:** Next.js 14.2.35 App Router with React 18.3.1 and TypeScript 5.6.3.
- **Design Archetype:** **Cybernetic Aerospace / Hardware Monolith** — deep OLED obsidian void (`#07090E`), concentric Double-Bezel enclosures (`.double-bezel`), machined HUD frames, and precision laser hairlines.
- **Hero Signature:** Bespoke **2.5D CSS/SVG Astrolabe** (`Logo25DAnimation.tsx`) operating inside a targeting reticle with real-time IST clock synchronization and sweeping horizontal laser beam (zero Three.js WebGL canvas overhead).
- **Sensory Immersion:**
  - **Zero-Lag Synthesized Audio:** Web Audio API oscillator synthesizer (`src/lib/audio.ts` & `src/lib/sound.ts`) with zero external audio assets.
  - **Universal Mobile Haptics:** Web Vibration API engine (`src/lib/haptics.ts`) providing 7 distinct tactile feedback profiles (8ms selection ticks to 48ms mechanical punches).
  - **Celebration Confetti:** Multi-tier `canvas-confetti` cannons (Cyber Neon, Golden Coins, and School Pride).
- **Security & Cryptography:**
  - HMAC SHA-256 signed session tokens for committee access.
  - Constant-time PIN verification via `crypto.timingSafeEqual` against timing attacks.
  - Token-bucket rate limiting on public broadcast endpoints.
  - Hardened HTTP security headers (`HSTS`, `nosniff`, `SAMEORIGIN`, `X-XSS-Protection`).

---

## 3. Quick Start & Local Development

### Prerequisites
- Node.js 18+ (tested on Node.js v24.13.0)
- npm or pnpm

### 1. Installation
```bash
# Clone or navigate to the workspace
cd "e:/Kairos Website"

# Install dependencies
npm install
```

### 2. Production Build Verification
```bash
# Compile and optimize all 43 Next.js routes
npm run build
```

### 3. Run Automated Validation & Smoke Suites (89 Tests)
```bash
# 1. Core Backend & 48H Clock Validation (4/4)
node src/tests/validate_backend.js

# 2. Dynamic Theme & Tokens Validation (6/6)
node src/tests/validate_theme_system.js

# 3. Security, RAG Chatbot & Defense Validation (7/7)
node src/tests/validate_fixes_and_chatbot.js

# 4. 2.5D Hero & Monolithic Telemetry Validation (4/4)
node src/tests/validate_hero_and_telemetry.js

# 5. Comprehensive Smoke & Button Test Suite (68/68)
node src/tests/smoke_test_suite.js
```

### 4. Start Local Production Daemon
```bash
# Launch optimized Next.js server on port 3000
node node_modules/next/dist/bin/next start -p 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Key Application Routes & User Flows

| Route | Purpose & Description |
| :--- | :--- |
| `/` | **Hero Control Deck:** 2.5D Astrolabe, 48H Hack Clock, 3-Cell Telemetry Dock, Facts Strip. |
| `/tracks` | **Architectural Bento:** 5 Technical Tracks, AWS Primitives, Rubric Weights, ₹25,000 Track Bounties. |
| `/leaderboard` | **Live Normalized Board:** Concentric Double-Bezel table, Gaussian Z-scores, commit telemetry. |
| `/dashboard` | **Builder Central Command:** Checkpoint 1, 2, 3 progress bars, team roster switcher, AWS vouchers. |
| `/on-campus` | **Venue & Transit Guide:** Sathyabama Central Library floorplans, chartered bus fleet schedules. |
| `/online-qualifier` | **Stage 1 Qualifier Bay:** GitHub repo and Loom video walkthrough submission. |
| `/refer-sponsor` | **Rainmaker ₹ Portal:** Interactive deal slider with real-time 10–15% referral cash calculation. |
| `/register` | **100% Free Entry:** Team registration portal with Meetup RSVP verification and streetwear sizing. |
| `/portal/pass` | **Smart NFC Badge:** Digital credential with scannable QR code and simulated lanyard slot. |
| `/stage` | **Auditorium Display:** 20×10ft 4K stage display mode for main arena keynote LED screens. |
| `/rules` | **Bylaws & Ethics:** Code of conduct, academic integrity, and evaluation guidelines. |
| `/sponsors` | **Partnership Deck:** Corporate sponsor tiers and official prospectus download. |

---

## 5. Engineering Documentation Library

Complete technical specifications and audit reports are documented in `docs/`:

1. [docs/INITIAL_AUDIT.md](file:///e:/Kairos%20Website/docs/INITIAL_AUDIT.md) — Comprehensive technical and product baseline audit.
2. [docs/TRANSFORMATION_PLAN.md](file:///e:/Kairos%20Website/docs/TRANSFORMATION_PLAN.md) — Strategic roadmap, architectural decisions, and invariants.
3. [docs/SKILL_DISCOVERY.md](file:///e:/Kairos%20Website/docs/SKILL_DISCOVERY.md) — Discovery across all 3,747 installed skills and orchestration matrix.
4. [docs/AGENT_REPORTS.md](file:///e:/Kairos%20Website/docs/AGENT_REPORTS.md) — Individual findings and deliverables from all 12 specialist agent roles.
5. [docs/ARCHITECTURE.md](file:///e:/Kairos%20Website/docs/ARCHITECTURE.md) — Next.js App Router topology, server/client boundaries, and data flows.
6. [docs/DESIGN_SYSTEM.md](file:///e:/Kairos%20Website/docs/DESIGN_SYSTEM.md) — Visual tokens, double-bezel enclosures, typography, and motion curves.
7. [docs/SECURITY_AUDIT.md](file:///e:/Kairos%20Website/docs/SECURITY_AUDIT.md) — Threat modeling, OWASP Top 10 remediation, and constant-time crypto.
8. [docs/PERFORMANCE_REPORT.md](file:///e:/Kairos%20Website/docs/PERFORMANCE_REPORT.md) — Core Web Vitals, bundle size traces, and zero-lag audio benchmarks.
9. [docs/TESTING_REPORT.md](file:///e:/Kairos%20Website/docs/TESTING_REPORT.md) — Verification across all 89 automated tests and Playwright browser snapshots.

---

## 6. Official Attribution & Disclaimers

> **AWS SBG Disclaimer:** KAIROS 2027 is organized by the AWS Student Builder Group at Sathyabama Institute of Science and Technology (SIST). References to the student builder group do not imply that Amazon Web Services, Inc. is a corporate financial sponsor or underwriter of this event.
