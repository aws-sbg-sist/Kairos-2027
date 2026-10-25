import { OrganizerAccount } from '@/types';

export const EVENT_CONFIG = {
  name: 'KAIROS 2027',
  edition: 'Grand Edition',
  tagline: 'Where Innovation Meets Its Moment.',
  subtitle: '48 Hours. 75 Elite Teams. The National Arena for Emerging Builders.',
  organizer: {
    name: 'AWS Student Builder Group (AWS SBG)',
    chapter: 'SIST Chapter',
    department: 'Department of Computer Science & Engineering, School of Computing',
    institution: 'Sathyabama Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu, India - 600119',
    contactEmail: 'sistawscc@gmail.com',
  },
  venue: {
    name: 'Sathyabama Indoor Stadium',
    campus: 'Sathyabama Institute of Science and Technology',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    mapsUrl: 'https://maps.google.com/?q=Sathyabama+Institute+of+Science+and+Technology+Indoor+Stadium+Chennai',
  },
  dates: {
    setupDate: '2027-01-21T10:00:00+05:30',
    startDate: '2027-01-22T11:30:00+05:30', // Competition Clock Starts
    endDate: '2027-01-24T11:30:00+05:30',   // 48h Code Freeze
    valedictoryDate: '2027-01-24T16:00:00+05:30',
    timezone: 'Asia/Kolkata',
    displayRange: '22–24 January 2027',
    durationHours: 48,
  },
  scale: {
    maxTeams: 75,
    teamSize: '4 to 6 Builders',
    estimatedBuilders: '300–450 Contestants',
    organizingCadre: 'Up to 100 Volunteers & Leads',
    registrationFee: '₹0 (100% Free Merit-Based Admission)',
    mealsProvided: '7 Principal Meal Services & Overnight Sustenance',
  },
  disclaimer: {
    aws: 'KAIROS 2027 is organized by the AWS Student Builder Group at Sathyabama Institute of Science and Technology (SIST). References to the student builder group do not imply that Amazon Web Services, Inc. is a corporate financial sponsor or underwriter of this event.',
    proposals: 'All sponsor packages, speaking slots, and preliminary prize allocations mentioned prior to final administrative verification are proposed and subject to formal written agreement.',
  }
};

export const TECHNICAL_TRACKS = [
  {
    id: 'agentic-ai',
    number: '01',
    title: 'Agentic AI & Generative Workflows',
    shortDescription: 'Multi-agent systems, autonomous reasoning, retrieval-augmented generation (RAG), and multimodal pipelines with robust safety guardrails.',
    longDescription: 'Go beyond single prompt-response interfaces. Construct coordinated autonomous agent squads that interact with external tools, APIs, and real-time data environments to automate end-to-end multi-step reasoning while maintaining verifiable truthfulness and deterministic bounds.',
    themes: [
      'Multi-agent collaborative workflows & task routing',
      'Production-grade hybrid RAG with reranking & provenance',
      'Multimodal intelligence (vision, spatial audio, and sensory streams)',
      'Deterministic safety, evaluation benchmarks & output guardrails'
    ],
    recommendedStacks: ['LangChain / LangGraph', 'CrewAI', 'LlamaIndex', 'AWS Bedrock', 'Hugging Face', 'FastAPI'],
    iconName: 'Cpu'
  },
  {
    id: 'cloud-native',
    number: '02',
    title: 'Cloud-Native Distributed Systems',
    shortDescription: 'High-throughput event-driven microservices, fault-tolerant consensus, real-time streaming, and resource-efficient auto-scaling.',
    longDescription: 'Architect resilient backend systems built to withstand extreme traffic, network partitions, and cascading failures. Focus on serverless durability, low-latency stream processing, distributed transaction orchestration, and observable telemetry.',
    themes: [
      'Ultra-low-latency event architectures (Kafka, SQS, EventBridge)',
      'High-concurrency distributed state management & idempotency',
      'Edge compute orchestration & microVM runtimes (Firecracker)',
      'Full-stack OpenTelemetry observability, SLO tracking & tracing'
    ],
    recommendedStacks: ['Go', 'Rust', 'Docker / K8s', 'AWS Lambda / ECS', 'PostgreSQL / DynamoDB', 'gRPC'],
    iconName: 'Server'
  },
  {
    id: 'web3-security',
    number: '03',
    title: 'Web3, Cryptography & Decentralized Security',
    shortDescription: 'Zero-knowledge proofs, decentralized identity (DID), smart contract security verification, and resilient cryptosystems.',
    longDescription: 'Develop cryptographic primitives and decentralized applications that solve authentic integrity, provenance, and privacy challenges. Emphasize formal contract verification, zero-knowledge verification proofs, and post-quantum cryptographic readiness.',
    themes: [
      'Zero-Knowledge Proof applications (zk-SNARKs / zk-STARKs)',
      'Self-sovereign verifiable credentials & decentralized identity',
      'Automated smart contract vulnerability analysis & fuzzing',
      'Decentralized storage with verifiable availability proofs'
    ],
    recommendedStacks: ['Solidity / Foundry', 'Circom', 'Rust (Anchor / Solana)', 'IPFS / Arweave', 'Viem / Ethers'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'fintech-trust',
    number: '04',
    title: 'FinTech & Digital Trust',
    shortDescription: 'Real-time anti-fraud intelligence, automated reconciliation engines, privacy-conscious transactional systems, and verifiable credit models.',
    longDescription: 'Re-engineer digital financial rails with mathematical integrity. Build high-volume transaction verification, instant anomaly and synthetic identity fraud detection, and automated audit trails while upholding privacy and regulatory compliance.',
    themes: [
      'Sub-millisecond fraud pattern recognition using graph neural networks',
      'Automated double-entry reconciliation & ledger consistency',
      'Privacy-preserving financial KYC through homomorphic computation',
      'Cross-border digital settlement protocols with FX hedging'
    ],
    recommendedStacks: ['Python / Polars', 'FastAPI', 'Redis', 'PostgreSQL', 'Stripe / Sandbox APIs', 'Next.js'],
    iconName: 'TrendingUp'
  },
  {
    id: 'sustainable-cities',
    number: '05',
    title: 'Open Enterprise & Sustainable Smart Cities',
    shortDescription: 'Urban mobility, energy grid optimization, precision agriculture, environmental monitoring, and next-gen public-interest software.',
    longDescription: 'Solve urgent physical-world challenges through resilient software engineering and IoT telemetry integration. Tackle resource distribution, sustainable circular economics, disaster prediction, and intelligent community utilities.',
    themes: [
      'Smart grid balancing & renewable energy demand response',
      'Real-time municipal resource monitoring (water, waste, transit)',
      'Decentralized precision agricultural logistics & soil telemetry',
      'Public health surveillance & environmental sensor analysis'
    ],
    recommendedStacks: ['IoT Telemetry / MQTT', 'Time-series DB (Timescale)', 'Mapbox / OpenStreetMap', 'Next.js', 'PyTorch'],
    iconName: 'Leaf'
  }
];

export const JUDGING_CRITERIA = [
  {
    category: 'Technical Architecture, Reliability & Scalability',
    points: 30,
    percentage: '30%',
    description: 'System modularity, clean code practices, security considerations, appropriate database/cloud selection, error resilience, and capacity to handle enterprise scale.'
  },
  {
    category: 'Originality & Quality of Problem-Solving',
    points: 25,
    percentage: '25%',
    description: 'Depth of domain understanding, freshness of perspective, non-trivial engineering insights, and avoidance of shallow AI wrappers or trivial clone projects.'
  },
  {
    category: 'Working Prototype & User Experience',
    points: 25,
    percentage: '25%',
    description: 'A genuine, functional live implementation demonstrated during checkpoints and stage finals; intuitive interface, responsive polish, and frictionless workflows.'
  },
  {
    category: 'Practical Value & Pitch Defense',
    points: 20,
    percentage: '20%',
    description: 'Viability in real-world deployment, clarity of the 48-hour presentation, technical rigor in answering tough jury questions, and team collaboration.'
  }
];

export const EVENT_SCHEDULE = [
  {
    day: 'Day 0 · Thursday, 21 Jan 2027',
    label: 'Setup & System Rehearsal',
    badge: 'Operations & Logistics',
    events: [
      { time: '10:00 AM – 02:00 PM', title: 'Venue Handover & Arena Inspection', desc: 'Sathyabama Indoor Stadium floor plan setup, power routing, cable ramps & surge-protection checks.' },
      { time: '02:00 PM – 04:30 PM', title: 'Network & 1Gbps Bandwidth Stress Test', desc: 'Deployment of 18–20 dual-band access points with IT cell, latency verification across 450 concurrent device slots.' },
      { time: '04:30 PM – 06:00 PM', title: 'Stage, AV & Check-in Desk Dry Run', desc: 'Main LED wall calibration, audio console soundcheck, scanner testing for participant badges.' }
    ]
  },
  {
    day: 'Day 1 · Friday, 22 Jan 2027',
    label: 'Kickoff & The 48-Hour Clock Starts',
    badge: 'Competition Begins',
    events: [
      { time: '08:00 AM – 09:30 AM', title: 'Participant Badge Verification & Team Seating', desc: 'On-ground identity checks, welcome kits, arena desk allocation, and safety briefings.' },
      { time: '09:30 AM – 11:00 AM', title: 'Grand Inaugural Ceremony', desc: 'Addresses by University dignitaries, CSE School of Computing leadership, and student builder keynote.' },
      { time: '11:00 AM – 11:30 AM', title: 'Problem Statement Briefing & Rules Release', desc: 'Release of special sponsor bounties, track criteria, repository creation rules, and commit standards.' },
      { time: '11:30 AM', title: '48-Hour Competition Clock Starts!', desc: 'Hacking officially commences across all 5 technical tracks in the stadium arena.', highlight: true },
      { time: '01:00 PM – 02:15 PM', title: 'Staggered Lunch Service', desc: 'Principal meal service 1 catered in dining halls with vegan/vegetarian selections.' },
      { time: '03:00 PM – 05:00 PM', title: 'Mentor Round 1: Architecture Consultations', desc: 'Domain mentors rotate across assigned team bays for architectural guidance and feasibility validation.' },
      { time: '05:00 PM – 05:30 PM', title: 'Evening High Tea & Refreshments', desc: 'Coffee, tea, and quick energy refreshments delivered to arena team bays.' },
      { time: '08:00 PM – 09:30 PM', title: 'Staggered Dinner Service', desc: 'Principal meal service 2.' },
      { time: '09:30 PM Onward', title: 'Controlled Night Operations & Rest Window', desc: 'Supervised stadium environment, quiet rest facility access, voluntary team sleep rotations.' }
    ]
  },
  {
    day: 'Day 2 · Saturday, 23 Jan 2027',
    label: 'Deep Build & Working Checkpoint',
    badge: 'Midway Checkpoint',
    events: [
      { time: '06:00 AM – 08:30 AM', title: 'Hygiene Window & Hot Breakfast', desc: 'Principal meal service 3 and campus restroom/refresh facilities access.' },
      { time: '10:00 AM – 12:30 PM', title: 'Mentor Round 2: Implementation Sprint Reviews', desc: 'Targeted code reviews, API integration troubleshooting, and optimization checks.' },
      { time: '01:00 PM – 02:15 PM', title: 'Staggered Lunch Service', desc: 'Principal meal service 4.' },
      { time: '03:00 PM – 06:00 PM', title: 'Mandatory Working-Prototype Checkpoint', desc: 'Live evaluation of code repository commits and runnable local prototypes across all 75 teams.', highlight: true },
      { time: '05:00 PM – 05:30 PM', title: 'Evening Refreshments & Energy Stations', desc: 'Snacks, electrolytes, and hot beverages.' },
      { time: '08:00 PM – 09:30 PM', title: 'Dinner Service', desc: 'Principal meal service 5.' },
      { time: 'Overnight', title: 'Overnight Polish & Pitch Rehearsals', desc: 'Fine-tuning UI/UX, preparing slides, recording fallback demonstration screencasts.' }
    ]
  },
  {
    day: 'Day 3 · Sunday, 24 Jan 2027',
    label: 'Code Freeze, Grand Demos & Awards',
    badge: 'The Finale',
    events: [
      { time: '06:00 AM – 08:30 AM', title: 'Breakfast & Final Commit Prep', desc: 'Principal meal service 6.' },
      { time: '10:30 AM', title: 'One-Hour Submission Warning', desc: 'Submission portal countdown and metadata readiness checks.' },
      { time: '11:30 AM', title: 'CODE FREEZE — 48-Hour Clock Expires', desc: 'All git repositories locked, final commits stamped, competition ended.', highlight: true },
      { time: '11:30 AM – 12:15 PM', title: 'Submission Verification & Top 20 Finalist Announcement', desc: 'Jury checks repository hashes and confirms the 20 teams advancing to live stage defense.' },
      { time: '12:15 PM – 03:35 PM', title: 'Top 20 Final Stage Demonstrations', desc: '10-minute live demo and jury cross-examination slots per team on the main stage (LED wall).', highlight: true },
      { time: '03:35 PM – 04:00 PM', title: 'Grand Jury Deliberation & Scoring Consolidation', desc: 'Confidential jury panel scoring and category awards assignment.' },
      { time: '04:00 PM – 05:00 PM', title: 'Valedictory Ceremony & Awards Presentation', desc: 'Announcement of National Champions, category trophies, track awards, and closing addresses.', highlight: true },
      { time: '05:00 PM – 08:00 PM', title: 'Delegate Departures & Venue Handover', desc: 'Team certificates distribution, travel logistics, and stadium clearance.' }
    ]
  }
];

export const PROPOSED_SPONSOR_TIERS = [
  {
    id: 'title',
    name: 'Title Partner',
    amount: '₹2,00,000',
    statusBadge: 'Proposed Tier',
    description: 'Prime headline association. Maximum brand prominence across every digital, stage, and physical touchpoint.',
    highlights: [
      'Naming rights: "KAIROS 2027 Presented by [Your Brand]"',
      'Prime 20-minute keynote address at inaugural ceremony',
      'Exclusive 10x10 ft demo booth in prime stadium foyer',
      'Prime branding on chest of 100 organizer shirts & all 450 lanyards',
      '2 Grand Jury evaluator seats for final stage scoring',
      'Custom Track or Company Bounty naming privileges',
      'Access to opt-in developer database (2,000+ national applicants)',
      '4 Dedicated social media spotlights + video reel feature'
    ],
    recommendedFor: 'Leading Cloud, AI, and Tech Enterprises establishing top-of-mind leadership.'
  },
  {
    id: 'powered_by',
    name: 'Powered By Partner',
    amount: '₹1,00,000',
    statusBadge: 'Proposed Tier',
    description: 'Premier technology platform visibility. Showcase tools and drive direct API/SDK adoption.',
    highlights: [
      'Co-branding: "KAIROS 2027 Powered by [Your Brand]"',
      '10-minute technical masterclass on main stage',
      'Dedicated 6x6 ft table kiosk in stadium innovation zone',
      '1 Grand Jury seat for final stage evaluation',
      'Prominent branding on stage backdrop & lanyards',
      'Co-branded technical track or dedicated bounty challenge',
      'Access to opt-in resumes of Top 250 semi-finalist builders',
      '2 Dedicated social media spotlight announcements'
    ],
    recommendedFor: 'Developer tool, platform, and infrastructure companies targeting rapid builder adoption.'
  },
  {
    id: 'gold',
    name: 'Gold Partner',
    amount: '₹50,000',
    statusBadge: 'Proposed Tier',
    description: 'Strong presence and recruitment access at a highly accessible investment level.',
    highlights: [
      '5-minute address to contestants during briefing',
      'Dedicated company bounty track with customized criteria',
      'Physical standee placement across stadium corridor & entrance',
      '1 Track evaluator slot during Saturday checkpoints',
      'Logo feature on stage backdrop and website sponsor strip',
      'Access to opt-in resumes of Top 100 finalist builders',
      'Company swag & stickers included in 450 participant kits'
    ],
    recommendedFor: 'Growing tech startups, scale-ups, and specialized recruitment partners.'
  },
  {
    id: 'track',
    name: 'Track / Bounty Partner',
    amount: '₹25,000',
    statusBadge: 'Proposed Tier',
    description: 'Associate your brand with one of our five core engineering tracks.',
    highlights: [
      'Official naming sponsor of 1 specific technical track',
      'Direct challenge definition aligned with your API or product',
      'Recognition during inaugural briefing and track awards',
      'Logo on track banners, digital screen cards, and website',
      'Access to opt-in resumes of finalists competing in that track',
      'Common swag table distribution'
    ],
    recommendedFor: 'Domain-focused tools, API providers, and specialized developer communities.'
  },
  {
    id: 'in_kind',
    name: 'In-Kind & Tool Partner',
    amount: 'Custom Value',
    statusBadge: 'Custom Scope',
    description: 'Provide developer cloud credits, software licenses, hardware kits, snacks, or beverages.',
    highlights: [
      'Official Tool, Cloud, or Refreshment Partner designation',
      'Distribution of free trial credits or developer tools to all builders',
      'Logo placement on website partners grid and event digital screens',
      'Collaborative social media welcome post',
      'Product sampling or activation opportunity on-ground'
    ],
    recommendedFor: 'SaaS tools, cloud providers, hardware labs, and beverage/energy brands.'
  }
];

export const PROPOSED_AWARD_CATEGORIES = [
  { name: 'Grand National Champion', proposedAmount: '₹60,000', desc: 'Highest cumulative score across all 4 judging criteria and final stage defense.' },
  { name: 'First Runner-Up', proposedAmount: '₹35,000', desc: 'Second highest overall national score.' },
  { name: 'Second Runner-Up', proposedAmount: '₹20,000', desc: 'Third highest overall national score.' },
  { name: 'Five Track Excellence Awards', proposedAmount: '5 × ₹7,000 (₹35,000)', desc: 'Top-ranked engineering team in each of the 5 technical tracks.' },
  { name: 'Best All-Women Developer Team', proposedAmount: '₹10,000', desc: 'Special recognition championing women in software engineering and systems.' },
  { name: 'Best Freshman / Debutant Team', proposedAmount: '₹7,500', desc: 'Top performing first-time hackathon team demonstrating extraordinary ambition.' },
  { name: 'Most Scalable Cloud Architecture', proposedAmount: '₹7,500', desc: 'Special award for mastery in distributed systems, resilience, and cloud efficiency.' }
];

export const ORGANIZING_ROSTER: OrganizerAccount[] = [
  { id: 'lead-1', name: 'Thenappan T', role: 'President & Student Builder Group Leader', department: 'CSE', registerNo: '44110855', email: 'sistawscc@gmail.com' },
  { id: 'lead-2', name: 'Nangaiyar M', role: 'Head of Sponsorship & Finance', department: 'CSE', registerNo: '44612059', email: 'sistawscc@gmail.com' },
  { id: 'lead-3', name: 'Shanmugapriyan', role: 'Head of Technical & Infrastructure', department: 'CSE', registerNo: '44110756', email: 'sistawscc@gmail.com' },
  { id: 'lead-4', name: 'Viswanathan Ashok', role: 'Head of Operations & Logistics', department: 'CSE', registerNo: '44110907', email: 'sistawscc@gmail.com' },
  { id: 'lead-5', name: 'Rikish B', role: 'Head of Design & Branding', department: 'CSE', registerNo: '44110664', email: 'sistawscc@gmail.com' },
  { id: 'lead-6', name: 'Caroline Mary McPherson', role: 'Head of Media & Public Relations', department: 'CSE', registerNo: '44110124', email: 'sistawscc@gmail.com' },
  { id: 'lead-7', name: 'Hemavarshine S', role: 'Head of Safety, Hospitality & Governance', department: 'CSE', registerNo: '44110263', email: 'sistawscc@gmail.com' }
];

export const FACULTY_LEADERSHIP = [
  { name: 'Dr. K. Ashok Kumar', role: 'Faculty Coordinator', department: 'Department of Computer Science & Engineering' },
  { name: 'Dr. Balapriya S', role: 'Faculty Coordinator', department: 'Department of Computer Science & Engineering' },
  { name: 'Dr. L. Lakshmanan', role: 'Dean, School of Computing & HoD CSE', department: 'School of Computing' }
];

export const FAQS = [
  {
    q: 'What is the registration fee for KAIROS 2027?',
    a: 'Registration is ₹0 (100% free). All shortlisted teams participate with zero admission or entrance charges, which includes 48-hour indoor arena access, technical mentorship, 7 scheduled principal meals, and official participant kits.'
  },
  {
    q: 'How does the team formation and selection process work?',
    a: 'Teams must consist of 4 to 6 college students. Registration starts with the Early-Interest Waitlist. Once national applications open, teams submit an abstract and architecture overview. Our technical committee reviews submissions to shortlist up to 75 finalist teams invited to build in person at the Sathyabama Indoor Stadium.'
  },
  {
    q: 'Do participants need to stay awake for the entire 48 hours?',
    a: 'No. Builder welfare, health, and safe rest rotations are an integral part of KAIROS. Teams are actively encouraged to implement staggered rest rotations. Supervised quiet-rest facilities, clean hygiene amenities, and continuous hydration stations are provided throughout the weekend.'
  },
  {
    q: 'What food, meals, and refreshments are provided?',
    a: 'Seven principal meal services are provided on-campus (Friday lunch & dinner; Saturday breakfast, lunch & dinner; Sunday breakfast & lunch), alongside evening teas, midnight energy snacks, coffee, and mineral water dispensaries.'
  },
  {
    q: 'What can we build, and are pre-built projects allowed?',
    a: 'All project code must be authored during the 48-hour competition window starting at 11:30 AM IST on Friday, 22 January 2027. Open-source libraries, frameworks, APIs, and public foundation models are fully permitted. Pre-written proprietary codebases or finished projects are strictly prohibited and will be disqualified during our mandatory checkpoint reviews.'
  },
  {
    q: 'Where will the event be hosted, and how do we reach the venue?',
    a: 'KAIROS 2027 takes place at the Sathyabama Indoor Stadium, located inside the Sathyabama Institute of Science and Technology campus on Rajiv Gandhi Salai (OMR), Jeppiaar Nagar, Chennai - 600119. It is well-connected via Chennai suburban transit and OMR expressways.'
  },
  {
    q: 'What hardware and equipment should our team bring?',
    a: 'Each participant should bring their own laptop, chargers, any specialized hardware (such as microcontrollers or sensors if competing in the IoT/Smart Cities track), student identification cards, and personal hygiene essentials. High-speed power strips, surge protection, and high-density 1Gbps Wi-Fi will be provisioned by the organizers.'
  },
  {
    q: 'How are the winners evaluated and awarded?',
    a: 'Evaluation is based on a transparent 100-point rubric: Technical Architecture (30 pts), Originality (25 pts), Working Prototype & UX (25 pts), and Pitch Defense (20 pts). The Top 20 teams based on Friday and Saturday checkpoint scores advance to Sunday afternoon live stage demonstrations before our Grand Jury.'
  }
];
