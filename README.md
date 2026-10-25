# KAIROS 2027 | Grand Edition — National Technical Hackathon

> **Where Innovation Meets Its Moment.**  
> 48 Hours. 75 Elite Teams. The National Arena for Emerging Builders.  
> **Dates:** 22–24 January 2027 · **Venue:** Sathyabama Indoor Stadium, Chennai, India  
> **Organized by:** AWS Student Builder Group (AWS SBG) — SIST Chapter  
> **Academic Unit:** Department of Computer Science & Engineering, School of Computing  
> **Institution:** Sathyabama Institute of Science and Technology, Chennai  

---

## 1. Executive Summary & Core Facts

| Metric / Dimension | Value / Specification |
| :--- | :--- |
| **Event Name** | KAIROS 2027 (Grand Edition) |
| **Duration & Clock** | **Exactly 48.0 Hours** (11:30 AM IST Fri 22 Jan – 11:30 AM IST Sun 24 Jan 2027) |
| **Venue** | Sathyabama Indoor Stadium, Chennai, India |
| **Scale** | Up to 75 teams (4–6 builders per team, ~400 on-campus contestants) |
| **Registration Fee** | **₹0 / 100% Free Merit Admission** |
| **Meals Provided** | 7 Scheduled Principal Meals & Continuous Refreshment Stations |
| **Organizing Cadre** | Up to 100 Volunteers & 8 Core Committee Leads |
| **Five Technical Tracks** | 1. Agentic AI & Generative Workflows<br/>2. Cloud-Native Distributed Systems<br/>3. Web3, Cryptography & Decentralized Security<br/>4. FinTech & Digital Trust<br/>5. Open Enterprise Applications & Sustainable Smart Cities |
| **Judging Rubric** | 100-Point Transparent Scale: Architecture (30 pts), Originality (25 pts), Prototype & UX (25 pts), Pitch Defense (20 pts) |
| **Public Status** | **Early-Interest Waitlist is Active**. Full registration is gated and will unlock for Phase 2. |

---

## 2. Tech Stack & Engineering Architecture

- **Framework:** Next.js 14 App Router with TypeScript.
- **Styling & Tokens:** Tailwind CSS with custom obsidian/violet/cyan cosmic design tokens and glassmorphism.
- **Hero Signature:** Hybrid High-Fidelity 3D: Bespoke Three.js canvas featuring an interactive glass hourglass with falling cosmic sand particles, an orbital planetary ring, and celestial starfield responding to pointer movement, paired with an animated SVG fallback for mobile and reduced-motion users.
- **Data Persistence:** Local persistent atomic store in `data/kairos_store.json`, seamlessly adaptable to Amazon DynamoDB or AWS RDS PostgreSQL for cloud deployments.
- **Security & RBAC:** Cryptographically signed HMAC session cookies for the 8 official committee leads. Zero public exposure of private student numbers, phone numbers, or secrets.
- **Transactional Email:** AWS SES integration with truthful local development simulation fallback.
- **Downloads:** Dynamic RFC 5545 `.ics` calendar generation, customized sponsorship prospectus scope generator, and official PDF downloads.

---

## 3. Quick Start & Local Development

### Prerequisites
- Node.js 18+ (tested on Node.js v24.13.0)
- npm or pnpm

### Installation

```bash
# Clone or navigate to the workspace
cd e:/Kairos

# Install dependencies
npm install

# Run backend test suite
node src/tests/validate_backend.js

# Launch development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the KAIROS 2027 landing page.

---

## 4. Key Routes & User Flows

| Route | Purpose & Description | Access Level |
| :--- | :--- | :--- |
| `/` | **Master Single-Page Marketing Experience:** All 13 sections (Hero, Facts, Mission, Tracks, Schedule, Judging, Awards, Roadmap, Sponsorship, Committee, FAQs, Footer). | Public |
| `/admin` | **Organizer Control Suite:** Real-time metrics, Waitlist CRM (search/filter/CSV export), Sponsor Inquiries CRM, and live Feature Flags. | Protected (Requires Passkey) |
| `/admin/login` | **Organizer Identity Sign-In:** Roster-based login with master passkey authentication and HMAC cookie issuance. | Public |
| `/portal` | **Participant Dashboard (Gated):** Team roster creation (4–6 members), join codes, project abstract readiness, and bay allocation. | Gated / Demo Preview |
| `/portal/pass` | **Stadium Security Pass:** Digital badge with live QR code generation (via `qrcode`) for arena check-in. | Public / Participant |
| `/api/calendar` | **Dynamic Calendar File:** RFC 5545 `.ics` file download calibrated in `Asia/Kolkata` (IST). | Public |
| `/api/admin/export` | **CSV Data Exporter:** One-click CSV export of waitlist entries or sponsor inquiries. | Admin Only |

---

## 5. Organizing Committee & Admin Access

### Default Development Passkey
```env
ADMIN_MASTER_SECRET=kairos2027-sist-admin
```

To sign in as an organizer:
1. Navigate to `/admin/login`.
2. Select your authorized identity from the official proposal roster:
   - **Thenappan T** (President & Student Builder Group Leader)
   - **Nangaiyar M** (Head of Sponsorship & Finance)
   - **Shanmugapriyan** (Head of Technical & Infrastructure)
   - **Viswanathan Ashok** (Head of Operations & Logistics)
   - **Rikish B** (Head of Design & Branding)
   - **Caroline Mary McPherson** (Head of Media & Public Relations)
   - **Hemavarshine S** (Head of Safety, Hospitality & Governance)
3. Enter the passkey and click **Sign In as Organizer**.
4. Every administrative action, flag update, and data export is signed and logged in the audit trail.

---

## 6. Official Publication Compliance Rules

1. **Awards & Cash Prize Pool:**  
   The proposed ₹1,75,000 cash pool is kept in draft status by default. The public Awards section displays a compliant *"Prize details will be announced soon"* notice alongside the prestigious award categories. Once institutional approval is executed, the administrator can toggle **Publish Confirmed Prize Amounts** in `/admin` to reveal the exact prize amounts instantly without rebuilding the site.
2. **Sponsorship Tiers:**  
   All packages (Title ₹2L, Co-Sponsor ₹1L, Gold ₹50k, Track ₹25k) are clearly labelled **Proposed / Subject to Written Agreement**.
3. **Judges & Mentors:**  
   No unconfirmed names or stock photos are used. The section displays an elegant announcement state for the upcoming jury reveal.

---

## 7. AWS Deployment & $100 Credit Budget

For full instructions on deploying to **AWS Amplify Hosting**, setting up **Amazon DynamoDB**, configuring **Amazon SES**, and enabling automated **AWS Budget Alerts** to stay safely within the $100 credit limit, see [AWS_DEPLOYMENT_GUIDE.md](file:///e:/Kairos/AWS_DEPLOYMENT_GUIDE.md).

---

## 8. Official Attribution & Disclaimers

> **AWS SBG Disclaimer:** KAIROS 2027 is organized by the AWS Student Builder Group at Sathyabama Institute of Science and Technology (SIST). References to the student builder group do not imply that Amazon Web Services, Inc. is a corporate financial sponsor or underwriter of this event.
