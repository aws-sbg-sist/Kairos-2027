# KAIROS 2027 — Technical Architecture & Engineering Specification

> **Framework:** Next.js 14.2.35 (React 18.3.1, TypeScript 5.6.3)  
> **Architecture Pattern:** Hybrid Server/Client Next.js App Router  
> **Deployment Target:** Local Production Daemon (`http://localhost:3000`)  

---

## 1. System Topology & Architectural Overview

The KAIROS 2027 platform is engineered as a high-performance, single-repository full-stack web application powered by Next.js 14. It combines pre-rendered static marketing and resource pages with real-time serverless API endpoints and responsive client-side state engines.

```
                      [User Browser Request]
                                │
                                ▼
                       [Next.js App Router]
                     (Security Headers Layer)
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
 [Static & SSR Pages]                          [Serverless API Routes]
  • / (Hero, Telemetry, Radar)                  • /api/radar (Beacon Mesh)
  • /tracks (Blueprint Bento)                   • /api/chatbot (RAG Knowledge)
  • /leaderboard (Z-Scores)                     • /api/calendar (iCal Generator)
  • /dashboard (Telemetry Bays)                 • /api/v1/register (Free Entry)
  • /on-campus (Venue Floorplans)               • /api/v1/judging/submit-score
  • /portal/pass (NFC Badge)                    • /api/v1/refer-sponsor
        │                                               │
        ▼                                               ▼
 [Client Sensory & UI Engine]                  [Core Business Logic]
  • Web Audio Oscillator Engine                 • In-Memory Store (`src/lib/db.ts`)
  • Web Vibration API Haptics                   • HMAC Auth (`src/lib/auth.ts`)
  • 2.5D CSS Astrolabe Reticle                  • Token-Bucket (`src/lib/ratelimit.ts`)
  • Canvas Confetti Cannons                     • Gaussian Z-Score Engine
```

---

## 2. Directory Structure & Key Modules

```
e:\Kairos Website/
├── public/
│   ├── assets/              # Frameless transparent PNG badges, logos, and sponsor decks
│   └── docs/                # Official PDF proposal and guidelines
├── src/
│   ├── app/                 # Next.js 14 App Router (43 routes)
│   │   ├── api/             # Serverless API routes (radar, chatbot, calendar, admin)
│   │   │   └── v1/          # Public & contestant APIs (register, team, judging, csat)
│   │   ├── dashboard/       # Builder Command Central (CP1/2/3 progress telemetry)
│   │   ├── leaderboard/     # Live Normalized Leaderboard (Double-Bezel table)
│   │   ├── on-campus/       # Sathyabama Central Library floorplans & bus fleet
│   │   ├── portal/pass/     # Digital Smart NFC Pass with simulated lanyard slot
│   │   ├── refer-sponsor/   # Rainmaker ₹ referral portal with interactive slider
│   │   ├── register/        # Free registration portal with Meetup verification
│   │   ├── globals.css      # Core design tokens, double-bezel, HUD, and keyframes
│   │   ├── layout.tsx       # Root layout, theme provider, fonts, and Schema.org
│   │   ├── robots.ts        # Dynamic robots.txt metadata route
│   │   └── sitemap.ts       # Dynamic sitemap.xml metadata route
│   ├── components/
│   │   ├── animation/       # AnimatedCounter, ScrollReveal, MagneticButton
│   │   ├── chatbot/         # KairosChatbot floating RAG assistant
│   │   ├── effects/         # MagneticGlowCursor spring ambient light
│   │   ├── hero/            # HeroSection, 2.5D Astrolabe Reticle
│   │   ├── modals/          # BroadcastRadarModal, ProspectusModal, WaitlistModal
│   │   ├── navigation/      # Navbar (with 3-bar sound wave equalizers), Footer
│   │   ├── sections/        # TracksSection, ScheduleSection, TeamRadar, FactsStrip
│   │   └── theme/           # ThemeProvider, ThemeToggle
│   ├── lib/
│   │   ├── audio.ts         # Zero-lag Web Audio API oscillator synthesizer
│   │   ├── auth.ts          # HMAC SHA-256 session tokens & timingSafeEqual
│   │   ├── confetti.ts      # Multi-stage canvas-confetti particle engine
│   │   ├── config.ts        # Competition metadata, dates, tracks, prize pool
│   │   ├── db.ts            # In-memory database with stage state machines
│   │   ├── haptics.ts       # Web Vibration API tactile engine
│   │   ├── ratelimit.ts     # Token-bucket memory rate limiter
│   │   └── sound.ts         # Acoustic hook bindings and sound re-exports
│   └── tests/               # 5 automated test suites (89 tests)
├── docs/                    # Complete architectural, audit & security documentation
└── next.config.mjs          # Security headers, CSP, and Next.js configuration
```

---

## 3. Server vs. Client Component Boundaries

Next.js 14 App Router best practices are strictly enforced to minimize client-side bundle size:

- **Server-Rendered Shells & Metadata (`layout.tsx`, `robots.ts`, `sitemap.ts`):** 
  Executed on the server with zero client JavaScript overhead. Injects search engine metadata, OpenGraph tags, and Schema.org `Hackathon` JSON-LD before HTML streams to the client.
- **Client Components (`'use client'`):**
  Isolated strictly to interactive boundaries:
  - Interactive forms and deal size sliders (`/refer-sponsor`, `/register`).
  - Web Audio and Web Vibration triggers (`Navbar.tsx`, `MagneticButton.tsx`).
  - Animated 2.5D astrolabe and targeting reticles (`Logo25DAnimation.tsx`).
  - RAG chatbot message flow (`KairosChatbot.tsx`).
  - Dynamic telemetry boards with polling or client fetches (`/leaderboard`, `/dashboard`).

---

## 4. Cryptography & Security Model

1. **HMAC SHA-256 Admin Authentication (`src/lib/auth.ts`):**
   - Organizer sessions are cryptographically signed using HMAC SHA-256.
   - Tokens encode session expiry (`SESSION_EXPIRY = 24 * 60 * 60 * 1000`) and payload digest.
   - Any tampering immediately invalidates the signature.
2. **Constant-Time Verification Against Timing Attacks:**
   - Evaluator scoring PINs and admin tokens use `crypto.timingSafeEqual` over fixed-length buffer digests.
   - Prevents microsecond-level side-channel latency attacks that could allow attackers to brute-force jury evaluation credentials.
3. **Public Payload Sanitization:**
   - In `/api/v1/team`, internal squad invite codes and participant email addresses are strictly stripped from public JSON payloads, preventing unauthorized roster takeovers.
4. **Token-Bucket Rate Limiting (`src/lib/ratelimit.ts`):**
   - Protects public submission endpoints (`/api/radar`, `/api/chatbot`, `/api/v1/register`).
   - Implements sliding window token-bucket algorithms tracking client IP addresses.

---

## 5. Mathematical Normalization Engine (Gaussian Z-Scores)

To eliminate evaluator grading variance (where one judge awards strict 70s while another awards lenient 95s), KAIROS 2027 implements an algorithmic fairness model:

$$Z = \frac{X - \mu}{\sigma}$$

Where:
- $X$: Raw score awarded to a team by judge $j$ on a 100-point rubric.
- $\mu$: Arithmetic mean of all scores awarded by judge $j$ across all assigned teams.
- $\sigma$: Standard deviation of scores awarded by judge $j$.

The resulting Z-score represents how many standard deviations above or below the evaluator's mean a squad performed. This normalizes grading scales across all 5 tracks and guarantees an objectively fair podium.

---

## 6. Zero-Lag Sensory Synthesis Architecture

Unlike typical web applications that load 2MB–10MB of external `.mp3` or `.wav` sound files over high-latency networks:
- **Zero Network Lag:** `src/lib/audio.ts` instantiates standard Web Audio API `AudioContext` and directly connects `OscillatorNode` → `GainNode` → `AudioDestinationNode`.
- **Pure Code Footprint:** The entire sound synthesizer is `<3KB` of minified JavaScript.
- **Memory Safety:** Oscillators are allocated on demand, ramped to zero amplitude exponentially (`exponentialRampToValueAtTime`), stopped, and automatically garbage-collected within 300ms.
- **Autoplay Security Compliance:** The `AudioContext` remains suspended until an explicit user pointer gesture is registered, eliminating browser security warnings.
