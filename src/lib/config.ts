import { OrganizerAccount } from '@/types';

export const EVENT_CONFIG = {
  name: 'KAIROS 2027',
  edition: 'Grand Edition',
  tagline: 'Where Architecture Meets Execution.',
  subtitle: '48 Hours of Non-Stop Cloud Engineering, Real-Time Architecture Reviews, and High-Stakes Cash Bounties.',
  notificationBar: '★ NATIONAL APPLICATIONS OPEN NOW • 100% FREE (ZERO ENTRY FEE) • ₹1,75,000 PURE CASH PRIZE POOL',
  organizer: {
    name: 'AWS Student Builder Group (AWS SBG)',
    chapter: 'AWS Student Builder Group — SIST Chapter',
    department: 'Department of Computer Science & Engineering, School of Computing',
    institution: 'Sathyabama Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu, India - 600119',
    contactEmail: 'sistawscc@gmail.com',
    leadOrganizer: 'Thenappan T (Register No: 44110855), President & Student Builder Group Leader (SBGL)',
    meetupUrl: 'https://meetup.com/aws-student-builder-group-sist',
    assetGeneratorUrl: 'https://aws-version-3--assets-generator.netlify.app/',
    targetDomain: 'https://kairos.sathyabama.ac.in',
  },
  venue: {
    name: 'Central Library & Campus Bays',
    campus: 'Sathyabama Institute of Science and Technology',
    address: 'Jeppiaar Nagar, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu - 600119',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    mapsUrl: 'https://maps.google.com/?q=Sathyabama+Institute+of+Science+and+Technology+Chennai',
  },
  dates: {
    // Round 0 Applications
    round0Deadline: '2026-12-28T23:59:59+05:30',
    // Round 1 Online Qualifier
    qualifierStartDate: '2027-01-02T10:00:00+05:30',
    qualifierEndDate: '2027-01-04T18:00:00+05:30',
    qualifierDisplay: 'January 02–04, 2027 (Online Technical Qualifier)',
    // Round 2 On-Campus Grand Finale
    checkInDate: '2027-01-22T09:30:00+05:30',
    startDate: '2027-01-22T12:15:00+05:30', // 48-Hour Sprint Commences
    codeFreezeDate: '2027-01-24T08:30:00+05:30', // Hard Code Freeze
    endDate: '2027-01-24T17:00:00+05:30', // Bus Dispersal
    valedictoryDate: '2027-01-24T14:30:00+05:30',
    timezone: 'Asia/Kolkata',
    displayRange: 'January 22–24, 2027 (On-Campus Grand Finale)',
    durationHours: 48,
  },
  scale: {
    maxTeams: 100,
    teamSize: '4 to 6 Builders',
    estimatedBuilders: '400–600 Contestants',
    onlineApplications: '2,000+ Online Applications',
    onlineSemiFinalists: '250 Online Semi-Finalists (Top 250 Teams)',
    onCampusFinalists: '100 Elite On-Campus Teams',
    organizingCadre: '106 Student Organizers, Leads & Volunteers',
    registrationFee: '₹0 (100% Free — Zero Entry Fee for All Students)',
    cashPrizePool: '₹1,75,000 Pure Cash',
    totalPrizesWithCredits: '₹1,75,000 Pure Cash + $50,000+ AWS Cloud Promotional Credits',
    mealsProvided: '100% Complimentary Meals, Midnight Sustenance, Swag & Campus Stay',
    travelSupport: 'Chartered Sathyabama Bus Fleet across Chennai Hubs + Campus EV Buggies',
  },
  disclaimer: {
    aws: 'AWS Student Builder Group Sathyabama is an independent student organization supported by the AWS Student Builder Groups program. Amazon Web Services, AWS, and the AWS logo are trademarks of Amazon.com, Inc. or its affiliates.',
    proposals: 'All sponsor packages, speaking slots, and corporate engagements follow official AWS Student Builder Group Leader guidelines and institutional agreements.',
    ip: 'Participants retain 100% ownership of their code, blueprints, and intellectual property. Zero equity or IP claims are made by the organizers, college, or sponsors.',
  },
  hashtags: [
    '#AWSsbgl',
    '#StudentsAtAWS',
    '#StudentsBuildAWS',
    '#AWSStudentBuilderGroupLeader',
    '#StudentsBuildOn',
    '#WomenInStudentBuilderGroups'
  ],
  socialHandles: {
    x: '@awssbg_sist',
    xTag: '@awsdevelopers',
    linkedin: 'AWS Developers',
    instagram: '@awssbg_sist',
    meetup: 'https://meetup.com/aws-student-builder-group-sist',
  }
};

export const TECHNICAL_TRACKS = [
  {
    id: 'agentic-ai',
    number: '01',
    title: 'Agentic AI & Generative Intelligence',
    bounty: 'Dedicated Track Winner Bounty: ₹7,000 Cash',
    bountyAmount: '₹7,000',
    shortDescription: 'Architect autonomous multi-agent swarms, self-healing developer pipelines, and production generative AI workflows powered by Amazon Bedrock and Claude.',
    longDescription: 'Go beyond single prompt-response interfaces. Construct coordinated autonomous agent squads that interact with external tools, APIs, and real-time data environments to automate end-to-end multi-step reasoning while maintaining verifiable truthfulness and deterministic bounds.',
    themes: [
      'Multi-agent collaborative workflows & task routing',
      'Production-grade hybrid RAG with reranking & provenance',
      'Autonomous self-healing DevOps & CI/CD agents',
      'Multimodal intelligence (vision, spatial audio, and sensory streams)'
    ],
    recommendedStacks: ['Amazon Bedrock', 'AWS Lambda', 'Amazon OpenSearch', 'LangChain / LlamaIndex', 'Claude 3.5 Sonnet', 'FastAPI'],
    iconName: 'Cpu'
  },
  {
    id: 'cloud-native',
    number: '02',
    title: 'Cloud-Native, High-Throughput & Distributed Systems',
    bounty: 'Dedicated Track Winner Bounty: ₹7,000 Cash',
    bountyAmount: '₹7,000',
    shortDescription: 'Build hyper-scale event-driven architectures, resilient distributed ledgers, and zero-downtime microservices capable of sustaining millions of concurrent events.',
    longDescription: 'Architect resilient backend systems built to withstand extreme traffic, network partitions, and cascading failures. Focus on serverless durability, low-latency stream processing, distributed transaction orchestration, and observable telemetry.',
    themes: [
      'Ultra-low-latency event architectures (EventBridge, SQS, Kafka)',
      'High-concurrency distributed state management & idempotency',
      'Edge compute orchestration & microVM runtimes (Firecracker)',
      'Full-stack OpenTelemetry observability, SLO tracking & distributed tracing'
    ],
    recommendedStacks: ['Amazon ECS / EKS', 'Amazon DynamoDB', 'Amazon EventBridge', 'AWS Fargate', 'Go / Rust', 'PostgreSQL'],
    iconName: 'Server'
  },
  {
    id: 'edge-iot',
    number: '03',
    title: 'Autonomous Edge IoT & Sustainable Green Energy',
    bounty: 'Dedicated Track Winner Bounty: ₹7,000 Cash',
    bountyAmount: '₹7,000',
    shortDescription: 'Deploy hardware microcontrollers, intelligent sensor networks, and edge inference systems optimizing renewable energy distribution and smart mobility.',
    longDescription: 'Solve urgent physical-world challenges through resilient software engineering and IoT telemetry integration. Tackle resource distribution, renewable energy microgrid balancing, environmental monitoring, and intelligent community utilities.',
    themes: [
      'Smart grid balancing & renewable energy demand response',
      'Real-time municipal resource monitoring (water, waste, transit)',
      'Decentralized precision agricultural logistics & soil telemetry',
      'Autonomous edge inference on microcontrollers (ESP32/Raspberry Pi)'
    ],
    recommendedStacks: ['AWS IoT Core', 'AWS Greengrass', 'Amazon Timestream', 'ESP32 / Raspberry Pi', 'MQTT', 'TimescaleDB'],
    iconName: 'Leaf'
  },
  {
    id: 'fintech-trust',
    number: '04',
    title: 'Next-Gen FinTech, Trust & Cryptographic Security',
    bounty: 'Dedicated Track Winner Bounty: ₹7,000 Cash',
    bountyAmount: '₹7,000',
    shortDescription: 'Engineer low-latency settlement systems, real-time algorithmic fraud prevention, and zero-knowledge identity architectures.',
    longDescription: 'Re-engineer digital financial rails with mathematical integrity. Build high-volume transaction verification, instant anomaly and synthetic identity fraud detection, and automated audit trails while upholding privacy and regulatory compliance.',
    themes: [
      'Sub-millisecond fraud pattern recognition using graph neural networks',
      'Automated double-entry reconciliation & ledger consistency',
      'Privacy-preserving financial KYC through zero-knowledge proofs & DID',
      'Cross-border digital settlement protocols with FX hedging'
    ],
    recommendedStacks: ['AWS KMS', 'Amazon Cognito', 'AWS GuardDuty', 'Amazon Aurora Serverless', 'Python / Polars', 'Redis'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'open-enterprise',
    number: '05',
    title: 'Open Enterprise & Campus Life Innovation',
    bounty: 'Dedicated Track Winner Bounty: ₹7,000 Cash',
    bountyAmount: '₹7,000',
    shortDescription: 'Tackle pressing institutional and societal bottlenecks across healthcare diagnostics, agricultural supply chains, and automated university operations.',
    longDescription: 'Engineer high-impact institutional and social systems. Transform enterprise workflows, automate campus student experiences, modernize medical diagnostics triage, and build accessible tools for underserved demographics.',
    themes: [
      'Institutional document automation & intelligent OCR pipelines',
      'Automated healthcare triage & clinical report synthesis',
      'Intelligent student lifecycle & university logistics automation',
      'Accessible multilingual civic tech platforms'
    ],
    recommendedStacks: ['Amazon S3', 'Amazon Textract', 'Amazon SageMaker', 'API Gateway', 'Next.js', 'PyTorch'],
    iconName: 'Layers'
  }
];

export const PRIZE_POOL_CARDS = [
  {
    position: '1st Place — Overall Grand Champion',
    cashPrize: '₹60,000 Pure Cash',
    perks: [
      'Grand Kairos Acrylic & Brass Champion Trophy',
      'VC Angel Incubation Fast-Track Pitching',
      '$5,000 in AWS Cloud Promotional Credits',
      'Direct Tier-1 Tech Interview Fast-Track',
      'Streetwear Swag Kit & Gold Certificates'
    ],
    highlight: true,
    badge: 'National Grand Champion'
  },
  {
    position: '2nd Place — First Runner-Up',
    cashPrize: '₹35,000 Pure Cash',
    perks: [
      '1st Runner-Up Acrylic Trophy',
      '$2,500 in AWS Cloud Promotional Credits',
      'Priority Interview Opportunities with Enterprise Sponsors',
      'Streetwear Swag Kit & Silver Certificates'
    ],
    highlight: false,
    badge: 'First Runner-Up'
  },
  {
    position: '3rd Place — Second Runner-Up',
    cashPrize: '₹20,000 Pure Cash',
    perks: [
      '2nd Runner-Up Acrylic Trophy',
      '$1,000 in AWS Cloud Promotional Credits',
      'Streetwear Swag Kit & Bronze Certificates'
    ],
    highlight: false,
    badge: 'Second Runner-Up'
  },
  {
    position: '5 Enterprise Track Category Winners',
    cashPrize: '₹7,000 Each (Total ₹35,000 Pure Cash)',
    perks: [
      'Dedicated Enterprise Track Winner Mementos',
      'Direct API Partner Swag Crates & Bounties',
      'Fast-track Evaluation for Sponsor Accelerator Programs'
    ],
    highlight: false,
    badge: '5 Dedicated Tracks'
  },
  {
    position: 'Special Category Bounties',
    cashPrize: '₹25,000 Pure Cash Total',
    perks: [
      'Best All-Women Team: ₹10,000 Pure Cash',
      'Best Freshman / Rookie Team: ₹7,500 Pure Cash',
      'Most Scalable AWS Architecture: ₹7,500 Pure Cash'
    ],
    highlight: false,
    badge: 'Special Citations'
  }
];

export const JUDGING_CRITERIA = [
  {
    category: 'Technical Architecture, Reliability & Scalability',
    points: 30,
    percentage: '30%',
    description: 'System modularity, cloud architecture selection (Bedrock, ECS, Lambda, Aurora), clean code practices, security considerations, IAM hardening, error resilience, and enterprise scale readiness.'
  },
  {
    category: 'Originality & Quality of Problem-Solving',
    points: 25,
    percentage: '25%',
    description: 'Depth of domain understanding, freshness of perspective, non-trivial engineering insights, and avoidance of shallow prompt wrappers or trivial clone projects.'
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
    description: 'Viability in real-world deployment, clarity of the 48-hour presentation, technical rigor in answering tough jury questions, and collaborative team defense.'
  }
];

export const DUAL_PHASE_PIPELINE = [
  {
    step: 'Phase 0',
    title: 'Free Round 0 Abstract & Cloud Blueprint',
    dates: 'Now – 28 Dec 2026',
    scale: '2,000+ National Teams',
    description: 'Teams of 4–6 register for 100% free with their Meetup RSVP and AWS Builder Center profile. Submit project abstract and cloud architecture blueprint.',
    badge: '100% Free Registration',
    status: 'ACTIVE_NOW'
  },
  {
    step: 'Round 1',
    title: 'Online Technical Qualifier (Semi-Finals)',
    dates: '02 – 04 Jan 2027',
    scale: 'Top 250 Semi-Finalist Teams',
    description: 'Top 250 shortlisted teams submit a working GitHub repository POC and a 3-minute Loom demo. Live 7-minute virtual defense with AWS Solutions Architects.',
    badge: 'Top 250 Virtual Review',
    status: 'UPCOMING'
  },
  {
    step: 'Round 2',
    title: 'On-Campus 48-Hour Grand Finale',
    dates: '22 – 24 Jan 2027',
    scale: 'Top 100 Elite National Teams',
    description: 'The Top 100 teams assemble at Sathyabama Central Library, Chennai for 48 hours of continuous hacking, 3 evaluation checkpoints, and ₹1,75,000 pure cash bounties.',
    badge: 'Top 100 Physical Stage',
    status: 'UPCOMING'
  }
];

export const EVENT_SCHEDULE = [
  {
    day: 1,
    dayName: 'Day 1: Friday, January 22, 2027',
    title: 'Kickoff, Architecture & The Starting Bell',
    tag: 'GENESIS & SPRINT',
    events: [
      {
        time: '09:30 AM – 10:45 AM',
        title: 'Grand Red-Carpet Check-In & Builder Kit Distribution',
        desc: 'Report to Campus Foyer at Sathyabama Institute of Science and Technology. Photo ID verification, receive free builder kit (T-shirt, smart NFC badge, stickers), hack bay allocation & high-speed Wi-Fi onboarding.',
        category: 'CHECK-IN'
      },
      {
        time: '10:45 AM – 12:00 PM',
        title: 'Grand Inauguration & Keynote Plenary',
        desc: 'Welcome & institutional address by University Leadership. 20-minute Keynote Address by Title Sponsor Executive (AWS) (11:15 AM). 10-minute Technical Briefing by Co-Powered Partner (11:35 AM). Official release of the 5 Grand Enterprise Innovation Tracks & Rules.',
        category: 'CEREMONY'
      },
      {
        time: '12:00 PM – 12:15 PM',
        title: 'Team Relocation to Hacking Bays',
        desc: 'Move to designated team bay with spike-protected power drops. Connect workstations, peripheral devices, and test cloud environments.',
        category: 'SETUP'
      },
      {
        time: '12:15 PM',
        title: '🚀 CLOCK STARTS: 48-HOUR SPRINT COMMENCES',
        desc: 'Official GitHub repository initialization with Kairos webhook listener. The 48-hour continuous countdown begins!',
        category: 'HACK LIVE',
        highlight: true
      },
      {
        time: '01:00 PM – 02:30 PM',
        title: 'Complimentary Builder Lunch Buffet',
        desc: 'Wholesome hot lunch served at campus dining halls. 24/7 Filter Coffee & Tea bar opens.',
        category: 'MEALS'
      },
      {
        time: '04:00 PM – 06:30 PM',
        title: '🔍 CHECKPOINT 1: Architecture & Cloud Feasibility Gate',
        desc: 'Table-side review with Senior AWS Solutions Architects & Industry Evaluators. Architecture blueprint, cloud service selection, and IAM security check (25 Pts).',
        category: 'EVALUATION',
        highlight: true
      },
      {
        time: '08:30 PM – 10:00 PM',
        title: 'Complimentary Builder Dinner Buffet',
        desc: 'Energizing hot dinner served via segregated dining corridors.',
        category: 'MEALS'
      },
      {
        time: '10:00 PM',
        title: '🔒 Campus Night Lock-In Activated',
        desc: 'Campus perimeter doors secured for total builder safety. 24/7 Campus EV shuttles operating continuous loops across rest facilities and hostels.',
        category: 'SECURITY'
      }
    ]
  },
  {
    day: 2,
    dayName: 'Day 2: Saturday, January 23, 2027',
    title: 'Deep Sprint, Velocity & Cloud Mastery',
    tag: 'CODE VELOCITY',
    events: [
      {
        time: '07:30 AM – 09:00 AM',
        title: 'Breakfast & Refreshments',
        desc: 'Energizing hot breakfast and continuous filter coffee to start Day 2.',
        category: 'MEALS'
      },
      {
        time: '09:30 AM – 11:30 AM',
        title: 'AWS Cloud Architecture Walkabout',
        desc: 'AWS Solutions Architects walk through hacking bays offering optional tips on model latency, database caching, and cloud deployment efficiency.',
        category: 'TECH CLINIC'
      },
      {
        time: '01:00 PM – 02:30 PM',
        title: 'Executive Lunch Buffet',
        desc: 'High-protein lunch buffet served to keep builders fueled.',
        category: 'MEALS'
      },
      {
        time: '02:00 PM – 05:30 PM',
        title: '⚡ CHECKPOINT 2: Code Velocity, API Integration & Authenticity Gate',
        desc: 'Table-side review by Startup CTOs & Staff Engineers. Live testing of running frontend/backend endpoints, database schemas, and external APIs. Automated commit history verification (35 Pts).',
        category: 'EVALUATION',
        highlight: true
      },
      {
        time: '08:30 PM – 10:00 PM',
        title: 'Dinner Buffet & Refreshments',
        desc: 'Nourishing hot dinner buffet.',
        category: 'MEALS'
      },
      {
        time: '10:00 PM',
        title: '🔒 Night Lock-In Enforced',
        desc: 'Night access protocols in place; quiet rest zones available.',
        category: 'SECURITY'
      },
      {
        time: '01:30 AM',
        title: 'Night Fuel Booster',
        desc: 'Midnight hot coffee/tea and energy snack drops across all hacking halls.',
        category: 'ENERGY DROP'
      },
      {
        time: '02:30 AM – 06:30 AM',
        title: 'The Final Sprint ("Kairos Hours")',
        desc: 'Polish UI/UX, containerize builds, run end-to-end integration tests, and finalize pitch decks.',
        category: 'SPRINT',
        highlight: true
      }
    ]
  },
  {
    day: 3,
    dayName: 'Day 3: Sunday, January 24, 2027',
    title: 'Demos, Valedictory & Celebrations',
    tag: 'GRAND FINALE',
    events: [
      {
        time: '07:30 AM – 08:30 AM',
        title: 'Breakfast & Refreshments',
        desc: 'Quick-service hot breakfast and coffee before the final submission.',
        category: 'MEALS'
      },
      {
        time: '08:30 AM',
        title: '🛑 HARD CODE FREEZE & GITHUB SUBMISSION LOCK',
        desc: 'Automated GitHub commit freeze via Kairos webhook listener. Final submission of working demo video link and pitch deck. Zero extensions.',
        category: 'DEADLINE',
        highlight: true
      },
      {
        time: '09:00 AM – 12:30 PM',
        title: '🏆 CHECKPOINT 3: Grand Finale Live Demonstrations',
        desc: 'Concurrent stage & bay jury evaluations. 7-minute live presentation: 4 minutes working demo + 3 minutes grilling by VC Partners, CTOs, and AWS Leaders (40 Pts). Real-time algorithmic Z-score normalization.',
        category: 'EVALUATION',
        highlight: true
      },
      {
        time: '12:30 PM – 01:30 PM',
        title: 'Grand Celebration Luncheon',
        desc: 'Festive celebration lunch buffet for all builders, organizers, and jury members.',
        category: 'MEALS'
      },
      {
        time: '01:30 PM – 02:15 PM',
        title: 'Grand Jury Deliberation & Final Shortlisting',
        desc: 'Evaluator committee convenes to finalize winners and track bounties.',
        category: 'DELIBERATION'
      },
      {
        time: '02:30 PM – 04:30 PM',
        title: '🎆 Grand Valedictory, Award Ceremony & Finale',
        desc: 'Addresses by Keynote VIPs and University Leadership. Presentation of Track Bounties & Special Innovation Awards. Grand Winner Announcement: 2nd Runner Up, 1st Runner Up, and Grand Champion (National Trophy & Awards Conferral).',
        category: 'CEREMONY',
        highlight: true
      },
      {
        time: '05:00 PM',
        title: 'Formal Campus Dispersal via Sathyabama Bus Fleet',
        desc: 'Complimentary return transit buses depart campus for Chennai Central, Tambaram, Airport, and CMBT Koyambedu.',
        category: 'DEPARTURE'
      }
    ]
  }
];

export const PROPOSED_SPONSOR_TIERS = [
  {
    id: 'title',
    name: 'Title Presenting Partner',
    amount: '₹2,00,000',
    referralPayout: '₹20,000 – ₹30,000 Pure Cash',
    commissionRate: '10% – 15%',
    statusBadge: 'Premier Flagship',
    description: 'Prime headline association. Maximum brand prominence across every digital, stage, and physical touchpoint.',
    highlights: [
      'Naming rights: "KAIROS 2027 Presented by [Your Brand]"',
      'Prime 20-minute keynote address at inaugural plenary (11:15 AM)',
      'Exclusive 10x10 ft demo booth in Central Library foyer',
      'Prime branding on chest of 106 organizer shirts & all 600 builder lanyards',
      '2 Grand Jury seats for final stage evaluation & awards conferral',
      'Access to opt-in developer database (2,000+ national applicants)',
      '4 Dedicated social media spotlights tagged to @awsdevelopers'
    ],
    recommendedFor: 'Leading Cloud, AI, and Tech Enterprises establishing top-of-mind leadership.'
  },
  {
    id: 'powered_by',
    name: 'Co-Powered By Partner',
    amount: '₹1,00,000',
    referralPayout: '₹10,000 – ₹12,000 Pure Cash',
    commissionRate: '10% – 12%',
    statusBadge: 'Platform Partner',
    description: 'Premier technology platform visibility. Showcase tools and drive direct API/SDK adoption.',
    highlights: [
      'Co-branding: "KAIROS 2027 Powered by [Your Brand]"',
      '10-minute technical masterclass on main stage (11:35 AM)',
      'Dedicated 6x6 ft booth in innovation foyer',
      '1 Grand Jury seat for final stage evaluation',
      'Prominent branding on stage backdrop & lanyards',
      'Co-branded technical track or dedicated bounty challenge',
      'Access to opt-in resumes of Top 250 semi-finalist builders'
    ],
    recommendedFor: 'Developer tool, platform, and infrastructure companies targeting rapid builder adoption.'
  },
  {
    id: 'gold',
    name: 'Associate / Gold Partner',
    amount: '₹50,000',
    referralPayout: '₹5,000 Pure Cash',
    commissionRate: '10%',
    statusBadge: 'Ecosystem Partner',
    description: 'Strong presence and recruitment access at a highly accessible investment level.',
    highlights: [
      '5-minute address to contestants during briefing',
      'Dedicated company bounty track with customized criteria',
      'Physical standee placement across venue corridor & entrance',
      '1 Track evaluator slot during Saturday checkpoints',
      'Logo feature on stage backdrop and website sponsor strip',
      'Access to opt-in resumes of Top 100 finalist builders'
    ],
    recommendedFor: 'Growing tech startups, scale-ups, and specialized recruitment partners.'
  },
  {
    id: 'track',
    name: 'Track & Bounty Partner',
    amount: '₹25,000',
    referralPayout: '₹2,500 Pure Cash',
    commissionRate: '10%',
    statusBadge: 'Track Sponsor',
    description: 'Associate your brand directly with one of our five core engineering tracks.',
    highlights: [
      'Official naming sponsor of 1 specific technical track',
      'Direct challenge definition aligned with your API or product',
      'Recognition during inaugural briefing and track awards',
      'Logo on track banners, digital screen cards, and website',
      'Access to opt-in resumes of finalists competing in that track'
    ],
    recommendedFor: 'Domain-focused tools, API providers, and specialized developer communities.'
  },
  {
    id: 'in_kind',
    name: 'In-Kind F&B / Fuel Partner',
    amount: 'Energy Drinks / Snacks / Cloud Credits',
    referralPayout: '₹3,000 – ₹5,000 Pure Cash',
    commissionRate: 'Fixed Bounty',
    statusBadge: 'Fuel Partner',
    description: 'Provide developer cloud credits, software licenses, snacks, or energy beverages.',
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

export const SPONSOR_TIERS = PROPOSED_SPONSOR_TIERS;

export const ORGANIZING_ROSTER: OrganizerAccount[] = [
  {
    id: 'org-thenappan',
    name: 'Thenappan T',
    role: 'President & Student Builder Group Leader (SBGL)',
    department: 'Department of Computer Science & Engineering, SIST',
    registerNo: '44110855',
    email: 'sistawscc@gmail.com'
  },
  {
    id: 'org-nikki',
    name: 'Nangaiyar M (Nikki)',
    role: 'Chief Partnership & Finance Officer (CPFO)',
    department: 'Department of Computer Science & Engineering, SIST',
    registerNo: '44612059',
    email: 'sistawscc@gmail.com'
  },
  {
    id: 'org-shanmuga',
    name: 'Shanmugapriyan',
    role: 'Chief Technology & Infrastructure Officer (CTO)',
    department: 'Department of Computer Science & Engineering, SIST',
    registerNo: '44110756',
    email: 'sistawscc@gmail.com'
  },
  {
    id: 'org-viswa',
    name: 'Viswanathan Ashok',
    role: 'Chief Operating Officer (COO)',
    department: 'Department of Computer Science & Engineering, SIST',
    registerNo: '44110907',
    email: 'sistawscc@gmail.com'
  },
  {
    id: 'org-hemavarshine',
    name: 'Hemavarshine S',
    role: 'Chief Experience Officer (CXO)',
    department: 'Department of Computer Science & Engineering, SIST',
    registerNo: '44110263',
    email: 'sistawscc@gmail.com'
  },
  {
    id: 'org-rikish',
    name: 'Rikish B & Caroline Mary',
    role: 'Chief Creative & Media Officers (CCMO)',
    department: 'Department of Computer Science & Engineering, SIST',
    registerNo: '44110664 / 44110124',
    email: 'sistawscc@gmail.com'
  }
];

export const SPONSOR_REFERRAL_TIERS = [
  {
    tier: 'Title Presenting Partner',
    dealSize: '₹2,00,000',
    commissionPercentage: '10% – 15%',
    cashPayout: '₹20,000 – ₹30,000 Pure Cash',
    perks: [
      'National Corporate Rainmaker Trophy on stage',
      'VIP Main-Stage All-Access Pass to Kairos 2027',
      'Official Letter of Recommendation from President Thenappan T'
    ]
  },
  {
    tier: 'Co-Powered By Partner',
    dealSize: '₹1,00,000',
    commissionPercentage: '10% – 12%',
    cashPayout: '₹10,000 – ₹12,000 Pure Cash',
    perks: [
      'VIP Jury Lounge Access',
      'Official Letter of Recommendation',
      'Exclusive Cyber Streetwear Hoodie'
    ]
  },
  {
    tier: 'Associate / Gold Partner',
    dealSize: '₹50,000',
    commissionPercentage: '10%',
    cashPayout: '₹5,000 Pure Cash',
    perks: [
      'Exclusive Merch Kit',
      'Verified Recommendation Certificate'
    ]
  },
  {
    tier: 'Track & Bounty Partner',
    dealSize: '₹25,000',
    commissionPercentage: '10%',
    cashPayout: '₹2,500 Pure Cash',
    perks: [
      'Official Partner Certificate',
      'Kairos Swag Pack'
    ]
  },
  {
    tier: 'In-Kind F&B / Fuel Deals',
    dealSize: 'Red Bull / Energy / Snacks',
    commissionPercentage: 'Fixed Bounty',
    cashPayout: '₹3,000 – ₹5,000 Pure Cash',
    perks: [
      'Special Swag Drop',
      'Official Event Recognition'
    ]
  }
];

export const HIGHER_MANAGEMENT = {
  batch: '2026-2027',
  batchTitle: 'Batch of 2026–2027 (The Grand Edition)',
  apexLeader: {
    name: 'Thenappan T',
    registerNo: '44110855',
    role: 'President & Student Builder Group Leader (SBGL)',
    chapter: 'AWS Student Builder Group — SIST Chapter',
    photo: '/assets/members/thenappan_t.webp',
    mandate: 'Directing macro-systems, institutional administration, and external partnerships for India\'s premier zero-fee hackathon.',
    quote: 'When financial barriers are dropped to zero, authentic engineering brilliance takes the stage.',
    credentials: [
      'AWS Certified Solutions Architect – Associate',
      'AWS Student Builder Group Leader'
    ],
    contact: {
      email: 'sistawscc@gmail.com',
      phone: '+91 6381801640',
      linkedin: 'https://linkedin.com/in/thenappan-t',
      instagram: 'https://instagram.com/awssbg_sist'
    }
  },
  facultyCoordinators: [
    {
      name: 'Dr. K. Ashok Kumar',
      role: 'Faculty Coordinator',
      department: 'Department of Computer Science & Engineering, SIST'
    },
    {
      name: 'Dr. Balapriya .S',
      role: 'Faculty Coordinator',
      department: 'Department of Computer Science & Engineering, SIST'
    }
  ],
  institutionalDeans: {
    deanComputing: 'Dr. L. Lakshmanan, Dean — School of Computing & HoD CSE',
    viceChancellor: 'Dr. T. Sasipraba, Vice Chancellor'
  },
  superHeads: [
    {
      code: 'SUPER_HEAD_1',
      title: 'Chief Partnership & Finance Officer (CPFO)',
      leadName: 'Nangaiyar M (Nikki)',
      registerNo: '44612059',
      division: 'Division 1: Capital, Sponsorships & Corporate Relations',
      mandate: 'Leading corporate outreach, ₹3.5L capital management, sponsor closing, and student referral commission execution.'
    },
    {
      code: 'SUPER_HEAD_2',
      title: 'Chief Technology & Infrastructure Officer (CTO)',
      leadName: 'Shanmugapriyan',
      registerNo: '44110756',
      division: 'Division 2: Cloud Systems & Technical Infrastructure',
      mandate: 'Architecting the portal, 1Gbps high-density arena Wi-Fi mesh, GitHub commit webhook telemetry, and automated Z-score scoring pipeline.'
    },
    {
      code: 'SUPER_HEAD_3',
      title: 'Chief Operating Officer (COO)',
      leadName: 'Viswanathan Ashok',
      registerNo: '44110907',
      division: 'Division 3: Ground Operations, Venue & Transit Logistics',
      mandate: 'Overseeing venue allocations in Central Library, 100-team bay setups, and Sathyabama transit bus fleet operations.'
    },
    {
      code: 'SUPER_HEAD_4',
      title: 'Chief Experience Officer (CXO)',
      leadName: 'Hemavarshine S',
      registerNo: '44110263',
      division: 'Division 4: Builder Experience, Hospitality & Dining',
      mandate: 'Directing 7 complimentary meal services, midnight energy booster drops, and builder welfare throughout 48 hours.'
    },
    {
      code: 'SUPER_HEAD_5',
      title: 'Chief Creative & Media Officer (CCMO)',
      leadName: 'Rikish B & Caroline Mary McPherson',
      registerNo: '44110664 / 44110124',
      division: 'Division 5: Creative Direction, Branding & Media Relations',
      mandate: 'Official AWS SBGL brand compliance, 20x10ft 4K LED stage visuals, video production, and social broadcasting.'
    },
    {
      code: 'SUPER_HEAD_6',
      title: 'Chief Safety & Governance Officer (CSO)',
      leadName: 'Student Governance Cadre',
      registerNo: '44110855-SEC',
      division: 'Division 6: Safety, Medical Response & Institutional Compliance',
      mandate: 'Enforcing 10 PM night lock-in protocols, segregated rest zones, 24/7 on-campus medical supervision, and 100% student IP protection.'
    }
  ]
};

export const AWS_RESOURCE_LIBRARY = [
  {
    id: 'cloud-quest',
    title: 'AWS Cloud Quest: Cloud Practitioner Tournament',
    badge: 'Hands-on Gamified Tournament',
    category: 'Cloud Architecture & Fundamentals',
    description: '12 free hands-on assignments with interactive architecture diagrams, quizzes, and live competitive tournament mode. Ideal pre-event training for Round 1 Online Qualifier participants.',
    features: ['12 Hands-on Cloud Labs', 'Live Interactive Tournament', 'Solutions Architecture Quizzes', 'Earn Digital Badges'],
    source: 'AWS SBG Leader Library / Skill Builder',
    externalUrl: 'https://aws.amazon.com/training/digital/aws-cloud-quest/'
  },
  {
    id: 'career-storytelling',
    title: 'Storytelling for Career Readiness',
    badge: 'Interview & Pitch Masterclass',
    category: 'Career & Pitch Acceleration',
    description: '2-hour interactive module helping students articulate cloud hackathon projects in technical job interviews, portfolio presentations, and VC pitches.',
    features: ['STAR Framework for Cloud Architecture', 'Articulating Tradeoffs to Staff Engineers', 'Downloadable Interview Slide Decks', 'Portfolio Case-Study Templates'],
    source: 'AWS SBG Leader Event Toolkit',
    downloadable: true
  },
  {
    id: 'kiro-game',
    title: 'Build a Game with Kiro',
    badge: 'Turnkey Serverless Prototype',
    category: 'Serverless Prototyping',
    description: 'Turnkey GitHub repository and workshop deck for rapid serverless game prototyping on AWS using Lambda, API Gateway, DynamoDB, and WebSockets.',
    features: ['Serverless WebSocket Architecture', 'Stateful Multiplayer Synchronization', 'Fast Deploy CDK Scripts', 'Frontend Canvas Assets'],
    source: 'AWS SBG Leader Library',
    repoUrl: 'https://github.com/aws-samples'
  },
  {
    id: 'open-source-101',
    title: 'Open Source 101 on AWS',
    badge: 'Core Architectural Patterns',
    category: 'Open Source Engineering',
    description: 'Core architectural patterns for contributing to open-source software, cloud container deployments, license compliance, and CI/CD pipelines.',
    features: ['GitHub Actions to AWS Deployments', 'Container Hardening Best Practices', 'Semantic Versioning & Releases', 'Community RFCs & Governance'],
    source: 'AWS SBG Leader Event Toolkit'
  },
  {
    id: 'bedrock-starter',
    title: 'AWS Bedrock Foundation Model Starter Kits',
    badge: 'Python & TypeScript Starters',
    category: 'Generative AI & Agentic Swarms',
    description: 'Custom starter repositories connecting to Claude 3.5 Sonnet, Amazon Titan, and Llama 3 on AWS Bedrock with hybrid vector embeddings on OpenSearch Serverless.',
    features: ['Claude 3.5 Sonnet Multi-Turn Streaming', 'Amazon OpenSearch Serverless Vector DB', 'LangChain & LlamaIndex Integrations', 'Deterministic Hallucination Guardrails'],
    source: 'AWS SBGL SIST Cloud Engineering Team',
    downloadable: true
  }
];

export const FAQS = [
  {
    q: 'Is there any entry fee or payment required?',
    a: 'NO. KAIROS 2027 is 100% FREE. There are ZERO registration fees, ZERO qualifier fees, and ZERO attendance fees. All meals, on-campus stay, builder tees, smart badges, bus transit, and AWS credits are completely complimentary.'
  },
  {
    q: 'What is the Online Technical Qualifier (Round 1)?',
    a: 'To ensure only teams with peak-quality ideas and verified coding capabilities reach our on-campus stage, the Top 250 semi-finalist teams will participate in a virtual qualifier from January 02–04, 2027. Teams submit a working GitHub repository proof-of-concept, a 3-minute Loom video demo, and defend their architecture live via Google Meet with AWS Solutions Architects. The Top 100 teams advance to the physical finale.'
  },
  {
    q: 'What are the grand finale dates and venue?',
    a: 'The on-campus grand finale runs from Friday, January 22 to Sunday, January 24, 2027 at Sathyabama Institute of Science and Technology, Chennai.'
  },
  {
    q: 'Why is Meetup RSVP verification required during registration?',
    a: 'As an official AWS Student Builder Group event, Kairos 2027 follows the AWS SBG Leader guidelines which mandate that community attendance is tracked on Meetup.com. Joining our official SIST Meetup chapter and RSVPing is 100% free and takes under 60 seconds.'
  },
  {
    q: 'Who owns the intellectual property (IP)?',
    a: 'You own 100% of your code and intellectual property. Zero equity or claims are made by the organizers, college, or sponsors.'
  },
  {
    q: 'Will travel support and bus transit be provided?',
    a: 'Yes. We operate chartered Sathyabama University buses across major Chennai transit hubs (Central Railway Station, Tambaram, Airport, CMBT Koyambedu) for inbound pickup on Friday morning and outbound drop-off on Sunday evening, as well as on-campus EV buggies, all free of cost.'
  },
  {
    q: 'What food, meals, and refreshments are provided?',
    a: 'Seven principal meal services are provided on-campus (Friday lunch & dinner; Saturday breakfast, lunch & dinner; Sunday breakfast & lunch), alongside evening high-teas, midnight energy snacks, continuous filter coffee, and electrolyte dispensaries.'
  },
  {
    q: 'What can we build, and are pre-built projects allowed?',
    a: 'All project code must be authored during the 48-hour competition window starting at 12:15 PM IST on Friday, 22 January 2027. Open-source libraries, frameworks, APIs, and public foundation models are fully permitted. Pre-written proprietary codebases or finished projects are strictly prohibited and verified via our automated Git commit telemetry.'
  },
  {
    q: 'What hardware and equipment should our team bring?',
    a: 'Each participant should bring their own laptop, chargers, valid student identification cards, and personal hygiene essentials. For the Edge IoT & Green Energy track, teams may bring microcontrollers and sensors. Surge-protected power drops, 1Gbps dual-band Wi-Fi, and smart badges will be provisioned by the organizers.'
  },
  {
    q: 'How does the sponsorship referral program work?',
    a: 'Through our Crowdsourced Rainmaker Referral Hub (/refer-sponsor), any student nationwide can refer a corporate brand or startup. You receive a guaranteed 10% to 15% pure cash commission (e.g., ₹20,000–₹30,000 on a ₹2L Title Deal) transferred directly into your bank account within 48–72 hours of fund clearance.'
  },
  {
    q: 'How are winners evaluated and normalized across judges?',
    a: 'Evaluation is based on a transparent 100-point rubric across 3 checkpoints: Technical Architecture (30 pts), Originality (25 pts), Working Prototype & UX (25 pts), and Pitch Defense (20 pts). Scores from our 25+ industry judges are normalized in real-time using mathematical Z-scores to eliminate lenient or harsh grading bias.'
  },
  {
    q: 'What AWS Cloud credits and sandboxes are provided?',
    a: 'All shortlisted finalist teams receive AWS Promotional Credit vouchers ($50 to $100 per team) in their hacker dashboard to deploy live workloads on AWS Bedrock, ECS, Lambda, and Aurora without spending a single rupee.'
  }
];
