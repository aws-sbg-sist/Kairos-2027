# KAIROS 2027 — Antigravity Master Build Prompt

> **Mission:** Design, build, test, and document a production-minded KAIROS 2027 hackathon website that feels like a world-class international event—cinematic, futuristic, prestigious, beautifully minimal, and visually unforgettable—without sacrificing speed, clarity, accessibility, maintainability, or security.
>
> **Work mode:** Operate as an autonomous award-winning creative director, brand designer, motion designer, 3D web artist, UX researcher, senior full-stack engineer, security-minded architect, QA engineer, and technical writer. Make strong decisions and iterate. Do not stop after a concept, mockup, or attractive hero section: deliver a complete working implementation.

## 1. Start by understanding the project

This is a **fresh build** in Google Antigravity using Gemini. Use the existing workspace; do not assume a website or repository already exists. Before coding:

1. Inspect the entire project/workspace structure, package manager, installed tools, available image-generation tools, Git status (if applicable), and any existing instructions.
2. Find and inspect the original KAIROS 2027 proposal PDF if it is present. Read all pages, including tables and graphics. Use it as the content source for event details, tracks, judging, schedule, organizing team, sponsorship structure, and rules.
3. Inspect the supplied assets folder carefully. The organiser will place the **original transparent KAIROS logo, official AWS Student Builder Group logo, and SIST logo** in the site's assets directory. Search likely locations such as `sites/assets`, `site/assets`, `assets`, and `public/assets`; use the actual paths discovered. Do not assume filenames, recreate official logos, distort them, or replace them with text approximations.
4. Study the design and content approach of https://www.awssbg-srmist.in/ as a reference for a strong student-builder community identity, clear hierarchy, purposeful sections, community/project storytelling, and confident calls to action. **Use it as inspiration, not a template to copy.** KAIROS should have its own stronger, event-specific identity.
5. Create a concise implementation plan and visual direction, then proceed without waiting for approval unless a genuine blocker prevents safe progress. Do not ask me to repeat information already in this prompt.

If an asset or confirmed content item is absent, continue with a polished, editable, clearly labelled fallback. Do not fabricate event facts, sponsor names, logos, judges, speakers, mentors, testimonials, partnerships, past editions, or outcomes.

## 2. Event identity and source-of-truth facts

**Event name:** KAIROS 2027 | Grand Edition  
**Event type:** National Technical Hackathon  
**Organiser:** AWS Student Builder Group (AWS SBG) — SIST Chapter  
**Academic unit:** Department of Computer Science & Engineering, School of Computing  
**Institution:** Sathyabama Institute of Science and Technology, Chennai, India  
**Venue:** Sathyabama Indoor Stadium  
**Event dates:** 22–24 January 2027  
**Competition clock:** 11:30 AM IST, Friday 22 January 2027 to 11:30 AM IST, Sunday 24 January 2027 — exactly 48 hours  
**Registration fee:** ₹0 / free, according to the proposal  
**Intended scale:** Up to 75 teams, 4–6 students per team; approximately 400 contestants is a planning figure, not a guaranteed attendance number  
**Organising cadre:** Up to 100 volunteers/organisers was proposed, subject to the final roster  
**Current public-registration phase:** Early interest / waitlist first. Full registration will be activated later. The full registration, team, and participant-dashboard architecture should be designed so it can be enabled without rebuilding the website.

The organiser has stated that KAIROS 2027 is approved and that the event may be presented as an approved event. **However, sponsor placements, sponsor agreements, prize amounts, named judges/mentors/speakers, and other unprovided announcements are not confirmed for public display.** Do not announce them as facts. Make configurable content statuses available in the admin system.

### Five technical tracks

Use these names and descriptions faithfully; display them in an attractive, scannable way:

1. **Agentic AI and Generative Workflows** — multi-agent systems, retrieval-augmented generation, multimodal applications, and practical safeguards.
2. **Cloud-Native Distributed Systems** — event-driven services, reliability, real-time systems, and resource-efficient deployment.
3. **Web3, Cryptography and Decentralized Security** — cryptographic applications, smart-contract security, and decentralized identity.
4. **FinTech and Digital Trust** — fraud detection, transaction systems, reconciliation, and privacy-conscious financial tools.
5. **Open Enterprise Applications and Sustainable Smart Cities** — energy, water, agriculture, healthcare, industry, and related public-interest applications.

### Judging criteria from the proposal

- Technical architecture, reliability and scalability — **30 points**
- Originality and quality of problem-solving — **25 points**
- Working prototype and user experience — **25 points**
- Practical value and pitch defense — **20 points**
- **Total: 100 points**

### Proposed event timetable

Treat the competition start/end as the primary 48-hour anchors. The proposal includes the following program blocks; show exact times in IST and make the timeline responsive. Clearly distinguish the live/actual event countdown from any decorative or simulated experience.

- **Thursday, 21 Jan:** venue setup / checks, with access requested from 10:00 AM.
- **Friday, 22 Jan:** 8:00–9:30 AM registration and team allocation; 9:30–11:00 AM inaugural programme; 11:00–11:30 AM rules/problem briefing; 11:30 AM competition begins; 3:00–5:00 PM first mentor consultations; later meals and controlled night access.
- **Saturday, 23 Jan:** morning rest/hygiene window; 10:00 AM–12:30 PM mentor consultations; 3:00–6:00 PM working-prototype checkpoint; development continues overnight with voluntary rest rotations.
- **Sunday, 24 Jan:** 10:30 AM one-hour submission warning; 11:30 AM code freeze and competition ends; 11:30 AM–12:15 PM submission checks / confirmation of up to 20 live-demo teams; 12:15–3:35 PM final demos planned for up to 20 teams, ten minutes per slot including transitions; 3:35–4:00 PM jury deliberation; 4:00–5:00 PM awards/valedictory programme; 5:00–8:00 PM departures and venue handover.

The event experience should communicate healthy rest rotations, participant welfare, safe movement, accessible support, and a well-run competition. Do not glorify sleep deprivation or imply that participants must stay awake for 48 hours.

### Awards and budget publication rule

The proposal contains a **proposed** ₹1,75,000 cash prize pool and itemised budget information. The organiser has specifically asked to **wait for confirmation before publishing prize amounts**. Therefore:

- Build a premium Awards / Prizes section that communicates recognition, competitive standards, and award categories only when approved for release.
- Until the organiser marks prize details as `confirmed` in the admin/content settings, show a tasteful “Prize details will be announced soon” message and never show an unconfirmed prize pool or individual amounts.
- Keep amounts as unpublished draft/admin content if necessary. Never hard-code provisional amounts into public marketing copy, metadata, social previews, schema markup, or downloadable public documents.

### Sponsor status and sponsorship opportunities

All sponsor placements are currently prospective. Do not invent or imply existing sponsors. Make a compelling sponsorship section with a sponsor-interest form, a downloadable sponsorship prospectus PDF, a dedicated email/contact CTA, and editable proposed packages based on the proposal: title sponsor, co-sponsor, and track/associate partners. Any package amount copied from the proposal must be labelled **proposed / subject to discussion and written agreement** until the organiser confirms it. Suggest potential benefits in a draft editable package matrix, but do not promise exclusive rights, hiring access, data access, logo placement, speaking time, or other deliverables without clearly marking them as proposed and subject to approval. Do not expose participant personal information to sponsors by default.

### People, partners, history and proof

No judges, mentors, speakers, sponsor partners, testimonials, previous editions, or past-projects have been confirmed/provided yet. Design the interface for these sections, but render graceful, attractive states such as “Announcements coming soon” until an authorised administrator publishes real entries. Do not use fake names, fake headshots, fake sponsor logos, fake testimonials, invented metrics, or invented previous-edition galleries. If the gallery cannot be populated with real content, convert it to a forward-looking “What builders can explore” section using original abstract graphics and the five tracks, with copy that does not claim past outcomes.

## 3. Creative direction: make it feel like a million-dollar event

Create a distinctive visual language around **time, potential, precision, and building what comes next**. The existing KAIROS hourglass logo is the anchor; design a coherent visual system around it rather than decorating the site with arbitrary effects.

### Look and feel

- **Overall:** world-class international hackathon; cinematic futuristic visuals fused with premium minimalism.
- **Theme:** dark, refined, legible.
- **Palette:** midnight/near-black foundations, deep violet as the core accent, clean white/off-white typography, and restrained electric-blue light. Define CSS variables/design tokens and a consistent system of surfaces, borders, gradients, shadows, and focus states. Purple is a highlight, not a blanket fill.
- **Typography:** pair a premium, highly readable sans-serif for body/UI with a distinctive display face for the KAIROS wordmark/headlines. Use legal, reliable web fonts and sensible fallbacks; avoid excessively sci-fi fonts that hurt readability.
- **Brand assets:** use the provided transparent KAIROS logo and official AWS SBG/SIST marks from the assets directory. Preserve aspect ratio, clear space, resolution, and approved appearance. Keep AWS SBG and institution branding subtle but credible. Do not imply Amazon/AWS sponsorship of the event beyond the organiser identity.
- **Imagery:** use real supplied assets first, then original code-generated visuals, bespoke SVG/canvas work, or carefully art-directed locally stored generated assets if the available tools support them. No cheesy AI-looking stock imagery, generic robots, anonymous hooded hackers, floating code walls, random purple blobs, or fake event photos. Do not depend on paid external image/API services.
- **Distinctive motif:** hourglass geometry, particles suggesting suspended time, precise orbit/trajectory lines, restrained energy trails, and beautifully composed light. Make it feel original, not a generic cyberpunk landing page.

### Headline and copy

Invent a stronger, distinctive headline than the existing proposal tagline. Explore a concept such as **“Make Time Matter.”** or **“48 Hours to Build What Comes Next.”** Choose the best line after evaluating originality, clarity, memorability, and fit. Do not blindly use these examples if a better line emerges.

Writing voice: prestigious, confident, concise, professional, technically literate, inspiring without hype. Avoid empty phrases such as “revolutionary,” “unleash your potential,” “game-changing,” and inflated claims unsupported by facts. The page should make the event feel ambitious through art direction and specificity, not exaggerated copy.

### Hero experience

Build an extraordinary opening viewport featuring:

- A large, carefully composed KAIROS wordmark / original logo.
- A bespoke animated hourglass or hourglass-inspired visual, with atmospheric violet light and restrained electric-blue details.
- A powerful, original headline and one concise explanation of the 48-hour national hackathon.
- Clear primary CTA: **Join the Early-Interest List** (or equivalent) while full registration is closed.
- Secondary CTA: **Explore the Tracks** or **View the Event Timeline**.
- A clear date/location status row: **22–24 January 2027 · Sathyabama Institute of Science and Technology · Chennai**.
- A visible but unobtrusive event countdown when appropriate.

Avoid cramming too many badges, stats, or buttons into the hero. The first screen must look stunning at desktop widths and still feel deliberately composed on mobile.

### Motion and sound

Use Motion / Framer Motion for purposeful page transitions, staggered reveals, section entrances, progress indicators, magnetic CTA buttons, and refined hover states. Use React Three Fiber only if it materially improves a specific visual and can maintain a stable frame rate; prefer CSS, SVG, shaders, and lightweight canvas when they achieve the same effect more robustly.

Include selective custom cursor effects, a subtle glowing trail, parallax, smooth scrolling, and interactive 3D only where they feel coherent. On touch devices, replace hover/cursor-only interactions with equally understandable touch interactions. Do not hijack scrolling, trap the pointer, prevent normal navigation, or make core information dependent on animation.

- Include a **short, skippable** cinematic hourglass introduction, shown at most when appropriate, with a prominent skip control and no blocking of essential navigation. Persist dismissal only where appropriate and privacy-safe.
- Audio is optional, starts **off by default**, and requires explicit user action. Provide an obvious mute/on control; never autoplay sound. Respect browser autoplay restrictions.
- Honor `prefers-reduced-motion`. Offer a graceful static fallback for heavy visuals, low-power devices, WebGL failure, and small screens.
- Keep the motion system cohesive: every effect should support time, depth, hierarchy, feedback, or storytelling. Do not add animation merely to demonstrate technical ability.

## 4. Information architecture: one spectacular landing page

The marketing experience is a **single-page website** with a refined sticky navigation and anchor-based sections. Do not turn it into a generic multi-page marketing site. Separate functional routes are allowed where genuinely required for authentication, admin, participant dashboard, registration, legal/privacy pages, and system states.

Implement the following sections in an intentional narrative sequence; refine the order to support conversion:

1. Cinematic intro/hero and CTA.
2. A compact event facts strip: dates, 48-hour duration, Chennai, free participation (as supported by the proposal), team size, and approved registration status.
3. Why KAIROS / event mission: build real solutions under time constraints; communicate technical ambition, collaboration, and practical impact without claiming outcomes that have not happened.
4. Five technical tracks as elegant interactive cards or a deliberately composed grid, each with title, concise description, distinctive abstract visual/icon, and track details.
5. The 48-hour experience: a beautiful timeline from registration and kickoff through mentorship, prototype checkpoint, code freeze, demos, jury, and awards.
6. Awards and recognition with the publication rule above.
7. Evaluation and judging criteria with the correct 30/25/25/20 weighting.
8. Participant pathway: early-interest phase now, then application, team formation, screening/waitlist, confirmation, event, submission, and demos. Clearly label future phases as pending activation where relevant.
9. Participant support: FAQs, eligibility, team size, free fee, travel/campus directions, accommodation details only when verified, safety/rest information, rules, contact/support.
10. Sponsor/partner section designed for conversion, with proposed tiers, benefits draft, prospectus download, and sponsor interest form.
11. Mentors, judges, speakers, organisers and community section. Use confirmed real data only; until then, display curated, intentional announcement states rather than empty or fake cards. Include the real organising team only if names/roles are taken from the supplied proposal or provided assets and the organiser intends them to be public.
12. Past projects/gallery section only if real assets become available; otherwise create a clearly forward-looking builder inspiration section as described above.
13. Strong final CTA and premium footer with relevant contact details, official marks, accessibility/terms/privacy links, and organiser identity.

Use anchors with sensible active-section indication, a mobile navigation drawer that is accessible and easy to close, and a back-to-top affordance when useful. The navigation must remain clear even when the cinematic visuals are active.

## 5. Countdown and 48-hour event experience

Build real date-based timers using `Asia/Kolkata` / IST and a single shared event configuration. Test boundary cases, zero states, refreshes and timezone rendering.

- **Event countdown:** actual time until the event start. Once the event begins, change its message/state appropriately; once the event ends, show “The 48-hour build is complete” or the next real phase rather than a negative timer.
- **Registration countdown:** only appear if the administrator configures a real registration deadline and marks it public. Otherwise keep it hidden.
- **48-hour experience:** create a beautifully animated timeline/progress experience that changes state based on real event clock/configuration. If the user explicitly wants a simulated experience during pre-event marketing, visually label it as a **preview/demo** so it cannot be mistaken for live event status. Do not fake live submissions, attendee counts, team activity, or leaderboard scores.
- Ensure date logic is centralised, testable and editable, not duplicated across components.

## 6. Early interest, full registration and participant experience

The present public conversion action is an **early-interest/waitlist form**. Make this form functional and production-minded; do not merely create an attractive form that discards submissions.

### Early-interest form

- Collect only fields that are needed at this stage; use a minimal, privacy-conscious set such as name, email, college/institution, and optional interest/track choice.
- Validate client and server side, normalise input, handle duplicates gracefully, protect against spam/abuse, show clear loading/success/error states, and store consent records where needed.
- Provide a confirmation email only when email delivery is configured. Never claim an email was sent when delivery failed or is not configured. Provide a useful fallback state and admin visibility.
- Do not request sensitive data unnecessarily. Publish a readable privacy notice describing purpose, storage, access and contact.

### Build the future system now, but keep it gated

Design and implement a phase-aware registration architecture with admin-controlled feature/status flags. Until activation, keep full registration and team creation inaccessible to the public while making the early-interest pathway obvious. When authorised, the system should support:

- Email/password accounts; **no Google sign-in**.
- Email verification and secure password reset.
- Team creation, invite links/codes, join requests, four-to-six-member team rules, team leader, member management, application editing and submission.
- Application status, screening, shortlist/waitlist, acceptance/decline, announcements and participant dashboard.
- Event details, timeline, deadlines, submission instructions/links and support information.
- Downloadable application/confirmation PDF where relevant, QR-based participant check-in, and digital participant passes when full registration is enabled.
- Admin-configurable fields, phases and deadlines. Do not expose incomplete future workflows as live public functionality.

Use transactional email for verification/confirmations only if a suitable provider is properly configured and cost-reviewed. Do not rely on a paid third-party API. Store secrets server-side only.

## 7. Secure admin and organiser dashboard

Create a separate, protected admin area for approximately eight core AWS SBG organisers. Public visitors must never be able to reach admin data or actions by guessing URLs or editing client state.

Admin features should include:

- Secure, invitation/allowlist-controlled admin access; no public self-service admin registration.
- Roles/permissions appropriate to the small core team (for example super-admin, content editor, applications reviewer, operations/communications). Keep permissions understandable and least-privileged.
- Manage interest-list entries; search, filter, export CSV where justified, and mark follow-up/status. Do not export personal data to sponsors by default.
- Manage event content, dates, registration phase, public/hidden/pending/confirmed status, track details, FAQs, announcements, schedule, awards, sponsorship packages, contacts, speaker/judge/mentor entries, and gallery items.
- Enable/disable full registration, configure registration deadlines, and publish awards/prize values only after explicit administrator confirmation.
- Manage future participant applications and teams, reviewers, shortlist/waitlist statuses, check-in QR/pass generation and audit history as those features are activated.
- A dashboard overview with meaningful counts from actual stored data, not fabricated numbers.
- Clear empty, success, error, permission-denied and loading states.

Security is non-negotiable: server-side authorisation on every privileged operation; secure cookie/session configuration; CSRF protections where appropriate; rate limiting; server-side validation; output escaping; safe file uploads if enabled; least-privilege database access; secrets in environment variables; no secret keys in frontend bundles or Git; no hard-coded default administrator password; secure admin bootstrap documented without exposing credentials. Maintain appropriate audit logs for sensitive admin actions. Provide retention/deletion and export controls suitable for a small event.

## 8. Technical architecture and cost constraints

Preferred frontend direction:

- Next.js with TypeScript.
- Tailwind CSS with a coherent design-token system.
- Motion / Framer Motion for UI motion.
- React Three Fiber only where justified and performant.
- Reusable, typed components and clear separation of marketing UI, data/content, server logic, authentication, and admin features.

Choose the backend and deployment architecture after evaluating requirements, current official documentation, security, maintainability, and real cost. The organiser plans to use **approximately US$100 in AWS credits** and wants free or near-free operation where practical. Prefer AWS where it makes sense, but do not blindly select an expensive architecture merely to use AWS. Evaluate current supported options—potentially AWS Amplify Hosting for Next.js, Cognito or an appropriately supported authentication option, DynamoDB or another cost-appropriate database, S3 for controlled file storage, and SES or another no-extra-cost/low-cost email arrangement—against a simpler architecture. Validate current service support, regional availability, quotas, pricing, credit eligibility and limits using official documentation at implementation time.

Constraints:

- No paid external APIs for AI, image generation, maps or other core functionality.
- Use a free, locally bundled map solution or a reliable ordinary map link/embed with clear cost/privacy evaluation; do not introduce paid map APIs. If a map provider requires keys or usage charges, do not make the site depend on it.
- Create an AWS cost model for development, staging and production. Explain assumptions and any likely cost risks. Add an AWS Budget and billing alerts if permissions permit; otherwise give exact manual setup instructions. A budget alert is not a spending cap.
- Never create paid cloud resources, buy domains, use paid services, or deploy to a real account without the user's explicit approval and credentials.
- Separate local development configuration from production configuration. Include `.env.example` with placeholders only; never include real secrets.
- Keep the architecture as simple as possible while meeting actual requirements. Prefer managed/serverless services where the pricing and limits are appropriate.
- Confirm region, service compatibility and Next.js version against current official docs rather than relying on stale assumptions.
- Do not add a complex microservice architecture for a student hackathon website.

If full dynamic functionality makes a single hosting option too costly, propose a practical staged architecture: an inexpensive, globally served marketing site plus a secure minimal backend, while keeping all data flows typed and documented. It is acceptable to recommend an alternative to AWS if that demonstrably fits the budget better, but explain the trade-off and never commit resources without approval.

Start technical verification with these official sources, then follow their current linked documentation and pricing pages: [AWS Amplify support for Next.js](https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html), [AWS Amplify Hosting overview](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html), and [AWS Budgets pricing](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/). These are starting points, not permission to assume a feature, version, or service is supported at deployment time.

## 9. Design and engineering standards

### Responsive design

Deliver an equally intentional experience on desktop, tablet and mobile—not simply a shrunk desktop layout. Test at small phones, common phones, tablets, laptops and wide desktops. Use responsive typography, sensible line lengths, safe-area handling, touch-friendly controls, mobile-first navigation, and appropriate asset sizes. Provide mobile-specific visual simplifications where heavy 3D does not serve the experience.

### Performance

Balance visual spectacle with fast, stable loading. Use server components and static rendering where appropriate, lazy-load heavy 3D sections, dynamically import client-only 3D code, use optimized local images, avoid oversized video backgrounds, reserve media dimensions to prevent layout shift, and keep animation work off the main thread when possible. Use transform/opacity animations where feasible; avoid excessive blur, giant shadows, many simultaneous particle systems, and unnecessary re-renders. Provide an attractive static fallback. Use local assets rather than unnecessary external requests.

Set and measure sensible Core Web Vitals/performance goals. Run a production build and, where available, automated Lighthouse or browser-based audits. Explain unavoidable trade-offs rather than disguising them.

### Accessibility and interaction quality

Even with cinematic design, essential information and functionality must remain usable by keyboard, screen reader, touch and reduced-motion users. Use semantic landmarks, proper headings, visible focus, adequate contrast, accessible forms, labelled controls, form error summaries, and appropriate ARIA only where native semantics are insufficient. All functionality must be available without custom cursor effects or sound. Disable or reduce non-essential animation when the user requests reduced motion.

No fake clickable buttons, dead links, placeholder alerts, nonfunctional toggles, inaccessible hover-only content, horizontal overflow, broken loading states, or menu controls that only look interactive. Every primary call to action must work.

### SEO and sharing

Implement a descriptive page title, clear meta description, canonical strategy if needed, Open Graph/Twitter metadata, favicon/app icons using provided brand assets, social share image generated from genuine event branding, semantic content, robots and sitemap where appropriate, and Event structured data only where the event details qualify and match what is actually published. Never leak draft prize amounts or unconfirmed partner/speaker details into metadata or structured data.

### Content configuration

Keep public facts, schedule, deadlines, contact details, status flags and editable copy centralised in typed content/config files or persistent CMS/admin-managed data. Avoid duplicating strings throughout components. Add content validation and safe defaults. Use IST consistently for event times.

## 10. Content, contact details and downloadable material

Use the proposal's official organising identity and verified contact details where appropriate. The proposal lists `sistawscc@gmail.com` as the event contact email; verify that this is still the desired public contact before exposing it if the organiser can supply confirmation. Do not expose personal phone numbers, student register numbers, private organiser records, or internal operational information on the public website merely because they appear in the internal proposal.

Create a polished, downloadable **KAIROS 2027 Sponsorship Prospectus PDF** (or an equivalent printable prospectus) based on known event facts and the draft package structure. Use the provided logos, a premium visual system, clear contact CTA, and careful labels for proposed package terms. Do not publish unconfirmed prize values or invent sponsor commitments. Also provide a print-friendly event schedule and a downloadable `.ics` calendar file where feasible. Make the dates/timezone explicit and verify the generated files work.

## 11. Build sequence — do not stop at the plan

Follow this sequence and continue until the deliverable is complete:

1. **Audit:** inspect workspace, assets, available proposal, tools, and reference site. Record findings briefly.
2. **Design system:** establish palette, typography, spacing, components, icon style, motion principles, breakpoints and design tokens.
3. **Experience architecture:** outline the single-page narrative, key interactions, conversion paths, registration phases, data model, admin roles and hosting strategy.
4. **Implement the full marketing experience:** all required sections, hero, mobile navigation, timeline, track cards, forms, footer, states and assets.
5. **Implement real functionality:** persist interest submissions, admin login/permissions, content/status management, email configuration, future registration gates, data exports and downloadable documents, to the extent the available local environment permits.
6. **Add the distinctive visual signature:** hourglass animation, atmospheric lighting, meaningful parallax, hover/focus motion, intro, cursor effects on compatible desktop, and optional audio controls. Ensure each has a fallback.
7. **Test and audit:** run lint/type checks, tests, production build, link/form checks, responsive/browser review, keyboard/accessibility checks, permission tests, and security review. Fix actual failures before completion.
8. **Iterate visually:** inspect every major section at desktop and mobile sizes. Compare it against the stated art direction. Improve weak hierarchy, awkward spacing, inconsistent motion, low-contrast text, generic components, mobile composition and performance bottlenecks. Repeat until the site feels cohesive and exceptional.
9. **Document:** create a complete README with setup, scripts, architecture, environment variables, database/service setup, admin bootstrap, email setup, content workflow, feature flags, testing, deployment, rollback, cost management and troubleshooting.

Do not merely list recommendations for me to implement. Make the changes in the workspace. If something truly cannot be completed without credentials or an external approval, build the remaining functionality locally, explain the blocker precisely, and provide an actionable setup step without pretending it was completed.

## 12. Required testing checklist

Before declaring the work finished, verify as much as possible of the following and report actual results:

- App installs and starts from a clean checkout using documented commands.
- Lint, type-check, unit/integration tests (where configured), and production build pass.
- No console errors, hydration warnings, broken assets, 404s, dead links, or horizontal overflow in tested layouts.
- Main navigation works by mouse, keyboard and touch; anchor targets aren't hidden under the sticky header.
- Intro can be skipped; sound never autoplays; audio controls work; reduced-motion and WebGL fallback paths remain usable.
- Countdown uses the correct IST boundaries and handles before-start, live, end and post-event states.
- Interest form validates inputs, persists data to the intended backend, handles duplicates, and shows truthful success/error states.
- Public users cannot access admin routes or private records. Server-side permission checks are tested, not just hidden UI.
- Public content hides draft awards, unconfirmed prize amounts, unconfirmed sponsors, unconfirmed speakers/judges/mentors and unpublished application data.
- Registration feature flags actually gate full registration, team management and participant dashboards.
- Downloadable PDF and calendar files open and reflect the currently authorised data.
- No secrets, private phone numbers, student register numbers, or unnecessary personal information are included in public assets or version control.
- Mobile, tablet and desktop layouts are visually reviewed; a static fallback exists for high-end visual effects.
- SEO metadata and share cards contain no unverified claims.
- AWS resource, pricing and cost-alert assumptions are documented, with no unapproved paid services provisioned.

## 13. Deliverables

At the end, provide:

1. A complete working website in the current workspace.
2. The single-page marketing experience plus the required secure admin/authentication routes and gated participant functionality.
3. A coherent, reusable design system and high-quality responsive components.
4. Working early-interest collection and sponsor-interest workflow, with clear configuration for email delivery.
5. The downloadable sponsorship prospectus, printable event schedule, and calendar file if feasible in the environment.
6. A secure, documented AWS-oriented deployment architecture and cost-control instructions.
7. `.env.example`, schema/migrations or infrastructure configuration as appropriate, and seed/bootstrap instructions that do not contain real secrets.
8. Automated tests for key logic and permissions wherever feasible.
9. A detailed `README.md` and concise administrator guide for the organiser who will maintain the site.
10. A final implementation report: what works, what was tested, what remains dependent on credentials/approval, how to run locally, and the estimated cost risks.

## Final instruction

Be ambitious, original, and meticulous. The end result must not resemble a generic hackathon template. Make it feel like a premium international event with an unmistakable KAIROS identity. **Visual excellence is the signature; truthful content, working functionality, speed, security, and maintainability are the foundation.** Do not fabricate success, do not stop at the first attractive iteration, and do not sacrifice the experience to gratuitous effects. Make strong choices, build the full solution, test it, and keep refining until it is genuinely exceptional.
