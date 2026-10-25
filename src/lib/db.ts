import fs from 'fs';
import path from 'path';
import { 
  WaitlistEntry, 
  SponsorInquiry, 
  FeatureFlags, 
  AuditLog, 
  ParticipantTeam, 
  TeamRadarSignal, 
  SponsorReferralLead, 
  Judge, 
  CheckpointEvaluation, 
  CSATResponse, 
  OrgMember 
} from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const JSON_FILE = path.join(DATA_DIR, 'kairos_store.json');

interface StoreSchema {
  waitlist: WaitlistEntry[];
  sponsors: SponsorInquiry[];
  referrals: SponsorReferralLead[];
  featureFlags: FeatureFlags;
  auditLogs: AuditLog[];
  teams: ParticipantTeam[];
  radarSignals: TeamRadarSignal[];
  judges: Judge[];
  evaluations: CheckpointEvaluation[];
  csat: CSATResponse[];
  members: OrgMember[];
}

const DEFAULT_MEMBERS: OrgMember[] = [
  {
    id: 'mem-thenappan',
    username: 'thenappan-t',
    fullName: 'Thenappan T',
    roleTitle: 'President & Student Builder Group Leader (SBGL)',
    registerNo: '44110855',
    tier: 'APEX_PRESIDENT',
    isHigherManagement: true,
    division: 'Executive Directorate',
    displayOrder: 1,
    photoUrl: '/assets/members/thenappan_t.webp',
    bio: 'Apex student leader directing macro-systems, institutional administration, and strategic industry partnerships for India\'s premier zero-fee hackathon.',
    builderPhilosophyQuote: 'When financial barriers are dropped to zero, authentic engineering brilliance takes the stage.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Certified Solutions Architect – Associate', 'AWS Student Builder Group Leader'],
    awsBuilderCenterUrl: 'https://community.aws/@thenappan',
    linkedinUrl: 'https://linkedin.com/in/thenappan-t',
    githubUrl: 'https://github.com/thenappan-t',
    portfolioUrl: 'https://thenappan.dev',
    badges: ['Apex Architect 2026-27', 'Kairos Grand Director', 'AWS Community Pioneer'],
    contributions: [
      {
        category: 'Macro Leadership & Governance',
        title: 'Institutional Sanction & ₹0 Free Merit Hackathon Framework',
        description: 'Secured full institutional backing, campus facilities, and enforced zero fees for all students nationwide.',
        impact: '100% Free Access for 600 Hackers',
        badgeTier: 'DIAMOND',
        verificationHash: '0x8f2d4e7b1a9c3e5f6a8b0d2c4e6f8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f'
      },
      {
        category: 'AWS Community Alignment',
        title: 'Dual-Registration & Meetup Protocol Integration',
        description: 'Architected Meetup.com and AWS Builder Center verification workflows per official AWS SBGL handbook.',
        impact: '100% AWS SBG Global Standard Compliance',
        badgeTier: 'DIAMOND',
        verificationHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
      }
    ]
  },
  {
    id: 'mem-ashok-kumar',
    username: 'dr-k-ashok-kumar',
    fullName: 'Dr. K. Ashok Kumar',
    roleTitle: 'Faculty Coordinator',
    tier: 'FACULTY_ADVISOR',
    isHigherManagement: true,
    division: 'Departmental Advisory',
    displayOrder: 2,
    photoUrl: '/assets/members/faculty_ashok.webp',
    bio: 'Faculty Mentor guiding cloud curriculum, technical academic oversight, and institutional resource governance.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    awsCertifications: ['AWS Academy Accredited Educator'],
    badges: ['Distinguished Faculty Patron'],
    contributions: [
      {
        category: 'Academic Governance',
        title: 'Academic Oversight & Hackathon Curriculum Endorsement',
        description: 'Facilitated university permissions, laboratory access, and evaluated track blueprints.',
        impact: 'Academic Accreditation & Lab Access',
        badgeTier: 'PLATINUM',
        verificationHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d'
      }
    ]
  },
  {
    id: 'mem-balapriya',
    username: 'dr-balapriya-s',
    fullName: 'Dr. Balapriya .S',
    roleTitle: 'Faculty Coordinator',
    tier: 'FACULTY_ADVISOR',
    isHigherManagement: true,
    division: 'Departmental Advisory',
    displayOrder: 3,
    photoUrl: '/assets/members/faculty_balapriya.webp',
    bio: 'Faculty Mentor specializing in intelligent computing systems, student innovation, and research incubation.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    awsCertifications: ['AWS Academy Cloud Foundations'],
    badges: ['Research Mentor Patron'],
    contributions: [
      {
        category: 'Research & Incubation',
        title: 'Project Mentorship & Patent Potential Identification',
        description: 'Reviewing finalist submissions for post-hackathon university incubation and intellectual property filing.',
        impact: 'IP & Venture Incubation Pathway',
        badgeTier: 'PLATINUM',
        verificationHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f'
      }
    ]
  },
  {
    id: 'mem-nikki',
    username: 'nangaiyar-m',
    fullName: 'Nangaiyar M (Nikki)',
    roleTitle: 'Chief Partnership & Finance Officer (CPFO)',
    registerNo: '44612059',
    tier: 'SUPER_HEAD',
    isHigherManagement: true,
    division: 'Division 1: Capital & Corporate Relations',
    displayOrder: 4,
    photoUrl: '/assets/members/nangaiyar_m.webp',
    bio: 'Directing corporate partnerships, sponsor outreach, ₹3.5L operational treasury, and the crowdsourced rainmaker referral fund.',
    builderPhilosophyQuote: 'Every rupee secured from enterprise sponsors directly fuels a student builder\'s dreams.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Cloud Practitioner'],
    badges: ['Master Rainmaker', 'Sponsorship Titan'],
    contributions: [
      {
        category: 'Capital Outreach',
        title: 'Sponsorship Prospectus & Rainmaker Referral Hub',
        description: 'Engineered multi-tier corporate partnership prospectus and crowdsourced student referral model.',
        impact: '₹3.5L Working Capital Pipeline',
        badgeTier: 'DIAMOND',
        verificationHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b'
      }
    ]
  },
  {
    id: 'mem-shanmugapriyan',
    username: 'shanmugapriyan',
    fullName: 'Shanmugapriyan',
    roleTitle: 'Chief Technology & Infrastructure Officer (CTO)',
    registerNo: '44110756',
    tier: 'SUPER_HEAD',
    isHigherManagement: true,
    division: 'Division 2: Cloud Systems & Tech Infra',
    displayOrder: 5,
    photoUrl: '/assets/members/shanmugapriyan.webp',
    bio: 'Leading portal architecture, 1Gbps arena network topology, GitHub commit webhook telemetry, and automated Z-score scoring pipeline.',
    builderPhilosophyQuote: 'Build resilient systems that withstand scale, silence excuses, and prove excellence in real-time.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Certified Developer – Associate'],
    badges: ['Cloud Architect Legend', 'Telemetry Master'],
    contributions: [
      {
        category: 'Cloud Engineering',
        title: 'Dual-Phase Evaluation Bay & Z-Score Scoring Pipeline',
        description: 'Constructed real-time scoring engine that normalizes judge variances mathematically.',
        impact: '100% Fair Automated Scoring for 100 Teams',
        badgeTier: 'DIAMOND',
        verificationHash: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d'
      }
    ]
  },
  {
    id: 'mem-viswanathan',
    username: 'viswanathan-ashok',
    fullName: 'Viswanathan Ashok',
    roleTitle: 'Chief Operating Officer (COO)',
    registerNo: '44110907',
    tier: 'SUPER_HEAD',
    isHigherManagement: true,
    division: 'Division 3: Ground Operations & Venue Logistics',
    displayOrder: 6,
    photoUrl: '/assets/members/viswanathan_ashok.webp',
    bio: 'Spearheading on-ground logistics across Sathyabama Central Library, 100-team bay allocation, and Sathyabama transit bus fleet operations.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Cloud Practitioner'],
    badges: ['Operations Maestro'],
    contributions: [
      {
        category: 'Ground Logistics',
        title: 'Central Library Hacking Bay & Transit Fleet Mesh',
        description: 'Orchestrated chartered university buses and 100 team power/seating drops.',
        impact: 'Zero-downtime physical infrastructure',
        badgeTier: 'GOLD',
        verificationHash: '0x2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f'
      }
    ]
  },
  {
    id: 'mem-hemavarshine',
    username: 'hemavarshine-s',
    fullName: 'Hemavarshine S',
    roleTitle: 'Chief Experience Officer (CXO)',
    registerNo: '44110263',
    tier: 'SUPER_HEAD',
    isHigherManagement: true,
    division: 'Division 4: Builder Experience & Hospitality',
    displayOrder: 7,
    photoUrl: '/assets/members/hemavarshine_s.webp',
    bio: 'Overseeing builder hospitality, 7 complimentary hot meals, midnight fuel boosters, and 48-hour participant wellbeing.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Cloud Practitioner'],
    badges: ['Hospitality Guardian'],
    contributions: [
      {
        category: 'Hospitality',
        title: '7-Service Nutrition & Midnight Fuel Protocol',
        description: 'Designed continuous hot meals, midnight coffee runs, and comfortable rest amenities.',
        impact: '48H builder focus and well-being',
        badgeTier: 'GOLD',
        verificationHash: '0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b'
      }
    ]
  },
  {
    id: 'mem-rikish',
    username: 'rikish-b',
    fullName: 'Rikish B',
    roleTitle: 'Chief Creative & Media Officer (CCMO - Co-Lead)',
    registerNo: '44110664',
    tier: 'SUPER_HEAD',
    isHigherManagement: true,
    division: 'Division 5: Creative Direction & Stage Media',
    displayOrder: 8,
    photoUrl: '/assets/members/rikish_b.webp',
    bio: 'Leading visual design, 20x10ft 4K LED stage screen presentations, cyber streetwear merch kits, and brand compliance.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Certified Solutions Architect'],
    badges: ['Design Visionary'],
    contributions: [
      {
        category: 'Creative Design',
        title: 'AWS SBGL Brand Identity & Cyber Streetwear Collection',
        description: 'Created visual assets, smart NFC badge branding, and auditorium visual identity.',
        impact: 'Global-tier Hackathon Aesthetics',
        badgeTier: 'GOLD',
        verificationHash: '0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d'
      }
    ]
  },
  {
    id: 'mem-caroline',
    username: 'caroline-mary-mcpherson',
    fullName: 'Caroline Mary McPherson',
    roleTitle: 'Chief Creative & Media Officer (CCMO - Co-Lead)',
    registerNo: '44110124',
    tier: 'SUPER_HEAD',
    isHigherManagement: true,
    division: 'Division 5: Public Relations & Social Broadcasting',
    displayOrder: 9,
    photoUrl: '/assets/members/caroline_m.webp',
    bio: 'Directing public relations, press releases, social media broadcasting (@awsdevelopers tagging), and community outreach.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Cloud Practitioner'],
    badges: ['Media Maestro'],
    contributions: [
      {
        category: 'Public Relations',
        title: 'National Social Outreach & Corporate Broadcast Engine',
        description: 'Managed omnichannel announcements reaching over 100,000 engineering students.',
        impact: '2,000+ Verified Applicant Reach',
        badgeTier: 'GOLD',
        verificationHash: '0x8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f'
      }
    ]
  }
];

const DEFAULT_STORE: StoreSchema = {
  waitlist: [
    {
      id: 'demo-w1',
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      institution: 'IIT Madras',
      yearOfStudy: '3rd Year',
      department: 'Computer Science & Engineering',
      preferredTrack: 'Agentic AI & Generative Intelligence',
      meetupProfileUrl: 'https://www.meetup.com/members/48192831/',
      meetupMemberId: '48192831',
      meetupRsvpVerified: true,
      awsBuilderCenterUrl: 'https://community.aws/@aarav',
      portfolioUrl: 'https://github.com/aarav',
      motivation: 'Building autonomous distributed agent systems for verifiable research synthesis using Bedrock and Claude 3.5.',
      createdAt: '2026-10-24T10:15:00.000Z'
    },
    {
      id: 'demo-w2',
      fullName: 'Pooja Venkatesh',
      email: 'pooja.v@example.edu',
      institution: 'Sathyabama Institute of Science and Technology',
      yearOfStudy: '4th Year',
      department: 'School of Computing',
      preferredTrack: 'Cloud-Native, High-Throughput & Distributed Systems',
      meetupProfileUrl: 'https://www.meetup.com/members/59201948/',
      meetupMemberId: '59201948',
      meetupRsvpVerified: true,
      awsBuilderCenterUrl: 'https://community.aws/@pooja-v',
      portfolioUrl: 'https://github.com/pooja-v',
      motivation: 'Exploring high-throughput distributed transaction settlement with event-driven consensus on ECS and DynamoDB.',
      createdAt: '2026-10-24T14:30:00.000Z'
    }
  ],
  sponsors: [
    {
      id: 'sp-1',
      companyName: 'Aether Cloud Systems',
      contactPerson: 'Karan Mehra',
      contactEmail: 'partnerships@aethercloud.io',
      contactPhone: '+91 98765 43210',
      interestedTier: 'powered_by',
      customRequirements: 'Interested in hosting a 10-minute technical masterclass on distributed vector indexing on Bedrock and OpenSearch.',
      status: 'contacted',
      createdAt: '2026-10-23T11:00:00.000Z'
    }
  ],
  referrals: [
    {
      id: 'ref-1',
      studentName: 'Rohan Deshmukh',
      studentEmail: 'rohan.d@student.sathyabama.ac.in',
      studentPhone: '+91 98401 23456',
      studentCollege: 'Sathyabama Institute of Science and Technology',
      companyName: 'NovaCloud AI Technologies',
      companyPocName: 'Sanjay Varma',
      companyPocRole: 'VP Engineering & Talent Acquisition',
      companyPocContact: 'sanjay.varma@novacloud.ai',
      targetTier: 'Co-Powered By Partner (₹1,00,000)',
      introContext: 'NovaCloud is expanding their Chennai engineering campus and looking to recruit 15 cloud/AI interns.',
      lockExpiryDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'DISCOVERY_SCHEDULED',
      commissionRate: '12%',
      estimatedPayout: '₹12,000 Pure Cash',
      submittedAt: '2026-10-24T12:00:00.000Z'
    }
  ],
  featureFlags: {
    registrationOpen: true,
    prizePoolConfirmed: true,
    demoSandboxMode: true,
    announcementBanner: '★ NATIONAL APPLICATIONS OPEN NOW • 100% FREE (ZERO ENTRY FEE) • ₹1,75,000 PURE CASH PRIZE POOL',
    registrationDeadline: '2026-12-28T23:59:59+05:30'
  },
  auditLogs: [
    {
      id: 'log-1',
      timestamp: '2026-10-25T09:00:00.000Z',
      organizerName: 'System Bootstrap',
      action: 'INIT_STORE',
      details: 'Initialized KAIROS 2027 store with 100-team dual-phase pipeline and AWS SBGL guidelines.'
    }
  ],
  teams: [
    {
      id: 'team-k100-01',
      teamCode: 'KAIROS-T001',
      teamName: 'Chronos Distributed',
      inviteCode: 'KAIROS-7721',
      trackId: 'cloud-native',
      institutionName: 'Sathyabama Institute of Science and Technology',
      city: 'Chennai',
      state: 'Tamil Nadu',
      leaderEmail: 'pooja.v@example.edu',
      selectionStage: 'ON_CAMPUS_QUALIFIED',
      problemTitle: 'Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry',
      problemAbstract: 'A fault-tolerant stream processing engine handling 100k events/sec with distributed consensus, AWS EventBridge, and zero data loss.',
      githubUrl: 'https://github.com/kairos2027/chronos-stream',
      loomVideoUrl: 'https://www.loom.com/share/demo-chronos-stream-2027',
      onlineQualifierScore: 94.5,
      onlineDefenseSlot: '2027-01-03T11:00:00+05:30',
      onlineMeetRoomId: 'Virtual-Meet-02',
      deskBayAllocation: 'BAY-A12 (Central Library LH1)',
      checkedIn: true,
      awsCreditVoucher: 'AWS-KAIROS-100-CHRONOS',
      members: [
        { id: 'm1', name: 'Pooja Venkatesh', email: 'pooja.v@example.edu', role: 'Leader', college: 'SIST', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/59201948/', tshirtSize: 'M', hoodieSize: 'M', confirmed: true },
        { id: 'm2', name: 'Rohan Gupta', email: 'rohan.g@example.edu', role: 'Backend', college: 'SIST', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/59201949/', tshirtSize: 'L', hoodieSize: 'L', confirmed: true },
        { id: 'm3', name: 'Swetha K', email: 'swetha.k@example.edu', role: 'AI / Cloud', college: 'SIST', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/59201950/', tshirtSize: 'S', hoodieSize: 'S', confirmed: true },
        { id: 'm4', name: 'Aditya Nair', email: 'aditya.n@example.edu', role: 'UI/UX', college: 'SIST', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/59201951/', tshirtSize: 'XL', hoodieSize: 'XL', confirmed: true }
      ],
      createdAt: '2026-10-25T08:00:00.000Z'
    },
    {
      id: 'team-k100-02',
      teamCode: 'KAIROS-T002',
      teamName: 'Aegis Swarm',
      inviteCode: 'KAIROS-8832',
      trackId: 'agentic-ai',
      institutionName: 'IIT Madras',
      city: 'Chennai',
      state: 'Tamil Nadu',
      leaderEmail: 'aarav.sharma@example.edu',
      selectionStage: 'ON_CAMPUS_QUALIFIED',
      problemTitle: 'Aegis Agent: Autonomous Multi-Agent DevSecOps Remediation',
      problemAbstract: 'Coordinated autonomous agents running on Amazon Bedrock (Claude 3.5 Sonnet) that discover and autonomously repair cloud IAM vulnerabilities.',
      githubUrl: 'https://github.com/aegis-swarm/aegis-core',
      loomVideoUrl: 'https://www.loom.com/share/demo-aegis-swarm-2027',
      onlineQualifierScore: 96.0,
      onlineDefenseSlot: '2027-01-03T14:30:00+05:30',
      onlineMeetRoomId: 'Virtual-Meet-01',
      deskBayAllocation: 'BAY-A08 (Central Library LH1)',
      checkedIn: true,
      awsCreditVoucher: 'AWS-KAIROS-100-AEGIS',
      members: [
        { id: 'm5', name: 'Aarav Sharma', email: 'aarav.sharma@example.edu', role: 'Leader', college: 'IIT Madras', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/48192831/', tshirtSize: 'L', hoodieSize: 'L', confirmed: true },
        { id: 'm6', name: 'Kavya Raman', email: 'kavya.r@example.edu', role: 'AI / Cloud', college: 'IIT Madras', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/48192832/', tshirtSize: 'M', hoodieSize: 'M', confirmed: true },
        { id: 'm7', name: 'Gautam Pillai', email: 'gautam.p@example.edu', role: 'Backend', college: 'IIT Madras', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/48192833/', tshirtSize: 'XL', hoodieSize: 'XL', confirmed: true },
        { id: 'm8', name: 'Meera Iyer', email: 'meera.i@example.edu', role: 'Frontend', college: 'IIT Madras', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/48192834/', tshirtSize: 'S', hoodieSize: 'S', confirmed: true }
      ],
      createdAt: '2026-10-25T08:30:00.000Z'
    },
    {
      id: 'team-k100-03',
      teamCode: 'KAIROS-T003',
      teamName: 'VoltEdge Smart Grid',
      inviteCode: 'KAIROS-4412',
      trackId: 'edge-iot',
      institutionName: 'NIT Tiruchirappalli',
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      leaderEmail: 'karthik.s@nitt.edu',
      selectionStage: 'ONLINE_SEMI_FINALIST',
      problemTitle: 'VoltEdge: Renewable Microgrid Load Balancer with IoT Core',
      problemAbstract: 'Decentralized IoT microcontroller telemetry streaming solar battery metrics to AWS IoT Core and Timestream to balance local microgrids.',
      githubUrl: 'https://github.com/voltedge/smart-grid',
      loomVideoUrl: 'https://www.loom.com/share/demo-voltedge-2027',
      onlineQualifierScore: 89.0,
      onlineDefenseSlot: '2027-01-04T10:00:00+05:30',
      onlineMeetRoomId: 'Virtual-Meet-04',
      awsCreditVoucher: 'AWS-KAIROS-50-VOLT',
      members: [
        { id: 'm9', name: 'Karthik S', email: 'karthik.s@nitt.edu', role: 'Leader', college: 'NITT', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/61298410/', tshirtSize: 'M', hoodieSize: 'M', confirmed: true },
        { id: 'm10', name: 'Deepak V', email: 'deepak.v@nitt.edu', role: 'Backend', college: 'NITT', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/61298411/', tshirtSize: 'L', hoodieSize: 'L', confirmed: true },
        { id: 'm11', name: 'Siddharth M', email: 'sid.m@nitt.edu', role: 'AI / Cloud', college: 'NITT', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/61298412/', tshirtSize: 'L', hoodieSize: 'L', confirmed: true },
        { id: 'm12', name: 'Ananya Rao', email: 'ananya.r@nitt.edu', role: 'Frontend', college: 'NITT', meetupRsvpVerified: true, meetupProfileUrl: 'https://www.meetup.com/members/61298413/', tshirtSize: 'S', hoodieSize: 'S', confirmed: true }
      ],
      createdAt: '2026-10-25T09:00:00.000Z'
    }
  ],
  radarSignals: [
    {
      id: 'sig-1',
      builderName: 'Vikram Sundaram',
      role: 'AI / ML Specialist',
      trackId: 'agentic-ai',
      skills: ['LangGraph', 'Amazon Bedrock', 'FastAPI', 'OpenSearch Vector Search'],
      college: 'Sathyabama Institute of Science and Technology',
      seeking: 'Looking for a solid Frontend/Web engineer and DevOps builder to form a team for multi-agent autonomous consensus.',
      contactUrl: 'https://github.com/vikram-sundaram',
      createdAt: '2026-10-25T07:30:00.000Z'
    },
    {
      id: 'sig-2',
      builderName: 'Ananya Deshmukh',
      role: 'Systems & DevOps',
      trackId: 'cloud-native',
      skills: ['Rust', 'AWS ECS', 'Kubernetes', 'Amazon EventBridge'],
      college: 'IIT Madras',
      seeking: 'Distributed systems engineer looking for a backend architect and UI builder to tackle sub-millisecond event streaming.',
      contactUrl: 'https://github.com/ananya-desh',
      createdAt: '2026-10-25T08:15:00.000Z'
    },
    {
      id: 'sig-3',
      builderName: 'Rohan Iyer',
      role: 'Web3 & Security',
      trackId: 'fintech-trust',
      skills: ['AWS KMS', 'Zero-Knowledge Proofs', 'Cognito', 'Aurora Serverless'],
      college: 'Anna University, CEG',
      seeking: 'Security researcher seeking frontend engineer (Next.js/Tailwind) for verifiable decentralized credential escrow.',
      contactUrl: 'https://github.com/rohan-iyer',
      createdAt: '2026-10-25T09:00:00.000Z'
    },
    {
      id: 'sig-4',
      builderName: 'Sneha Patel',
      role: 'UI/UX & Frontend',
      trackId: 'open-enterprise',
      skills: ['Next.js 14', 'Three.js', 'Tailwind CSS', 'Amazon Textract'],
      college: 'Sathyabama Institute of Science and Technology',
      seeking: 'Frontend & motion designer looking for Python/FastAPI builders to craft a high-fidelity institutional healthcare triage app.',
      contactUrl: 'https://github.com/sneha-patel',
      createdAt: '2026-10-25T09:45:00.000Z'
    }
  ],
  judges: [
    {
      id: 'judge-1',
      accessPin: '202701',
      fullName: 'Vikrant Roy',
      organization: 'Amazon Web Services',
      designation: 'Principal Solutions Architect',
      trackSpecialization: 'Agentic AI & Cloud-Native',
      assignedHall: 'Central Library Auditorium',
      isActive: true
    },
    {
      id: 'judge-2',
      accessPin: '202702',
      fullName: 'Aishwarya Subramanian',
      organization: 'Peak Capital Partners',
      designation: 'General Partner & Tech Investor',
      trackSpecialization: 'FinTech & Open Innovation',
      assignedHall: 'Central Library LH1',
      isActive: true
    },
    {
      id: 'judge-3',
      accessPin: '202703',
      fullName: 'Dr. Rajesh Kannan',
      organization: 'Center for Distributed Computing',
      designation: 'Distinguished Professor & Systems Architect',
      trackSpecialization: 'Distributed Systems & Edge IoT',
      assignedHall: 'Central Library LH2',
      isActive: true
    }
  ],
  evaluations: [
    {
      id: 'eval-1',
      teamId: 'team-k100-01',
      judgeId: 'judge-1',
      checkpointGate: 1,
      criterion1Score: 28, // Arch (out of 30)
      criterion2Score: 24, // Originality (out of 25)
      criterion3Score: 24, // Prototype (out of 25)
      criterion4Score: 19, // Pitch (out of 20)
      rawTotalScore: 95,
      normalizedZScore: 1.45,
      qualitativeFeedback: 'Exceptional event-mesh resilience on AWS EventBridge. IAM policies are neatly isolated.',
      evaluatedAt: '2027-01-22T17:30:00.000Z'
    },
    {
      id: 'eval-2',
      teamId: 'team-k100-02',
      judgeId: 'judge-1',
      checkpointGate: 1,
      criterion1Score: 29,
      criterion2Score: 25,
      criterion3Score: 24,
      criterion4Score: 19,
      rawTotalScore: 97,
      normalizedZScore: 1.72,
      qualitativeFeedback: 'Brilliant Bedrock multi-agent orchestration. Hallucination guardrails are tightly implemented.',
      evaluatedAt: '2027-01-22T18:00:00.000Z'
    }
  ],
  csat: [
    {
      id: 'csat-1',
      overallSatisfaction: 5,
      npsScore: 10,
      cloudServicesUsed: ['Amazon Bedrock', 'AWS Lambda', 'Amazon DynamoDB', 'Amazon OpenSearch'],
      pursuingAwsCertification: 'YES',
      eventFeedback: 'The zero-fee model, seamless Wi-Fi, and live mentorship by AWS Solutions Architects made this the best hackathon in the country.',
      testimonialQuote: 'KAIROS 2027 showed us what real cloud engineering at scale feels like.',
      submittedAt: '2027-01-24T16:00:00.000Z'
    }
  ],
  members: DEFAULT_MEMBERS
};

// Safe thread-safe file persistence
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(JSON_FILE)) {
    fs.writeFileSync(JSON_FILE, JSON.stringify(DEFAULT_STORE, null, 2), 'utf-8');
  }
}

function readStore(): StoreSchema {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(JSON_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STORE,
      ...parsed,
      members: parsed.members && parsed.members.length > 0 ? parsed.members : DEFAULT_MEMBERS,
      referrals: parsed.referrals || DEFAULT_STORE.referrals,
      judges: parsed.judges || DEFAULT_STORE.judges,
      evaluations: parsed.evaluations || DEFAULT_STORE.evaluations,
      csat: parsed.csat || DEFAULT_STORE.csat,
    };
  } catch (err) {
    console.error('[DB] Read error, falling back to default store:', err);
    return DEFAULT_STORE;
  }
}

function writeStore(data: StoreSchema) {
  try {
    ensureDataDir();
    const tmpFile = `${JSON_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, JSON_FILE);
  } catch (err) {
    console.error('[DB] Write error:', err);
  }
}

export const db = {
  // Waitlist Operations
  getWaitlist(): WaitlistEntry[] {
    const store = readStore();
    return store.waitlist.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addWaitlistEntry(entry: Omit<WaitlistEntry, 'id' | 'createdAt'>): { success: boolean; entry?: WaitlistEntry; error?: string } {
    const store = readStore();
    const normalizedEmail = entry.email.trim().toLowerCase();
    
    const existing = store.waitlist.find(w => w.email.trim().toLowerCase() === normalizedEmail);
    if (existing) {
      return { success: false, error: 'This email address is already on the KAIROS 2027 registration list!' };
    }

    const newEntry: WaitlistEntry = {
      ...entry,
      id: `w-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    };

    store.waitlist.push(newEntry);
    writeStore(store);
    return { success: true, entry: newEntry };
  },

  updateWaitlistStatus(id: string, status: WaitlistEntry['status'], updatedBy?: string): boolean {
    const store = readStore();
    const entry = store.waitlist.find(w => w.id === id);
    if (!entry) return false;
    entry.status = status;
    if (updatedBy) {
      if (!store.auditLogs) store.auditLogs = [];
      store.auditLogs.unshift({
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        organizerName: updatedBy,
        action: 'UPDATE_WAITLIST_STATUS',
        details: `Updated candidate ${entry.fullName} (${entry.email}) status to ${status}`
      });
    }
    writeStore(store);
    return true;
  },

  // Teams Operations
  getTeams(): ParticipantTeam[] {
    const store = readStore();
    return store.teams;
  },

  getTeamByCode(code: string): ParticipantTeam | undefined {
    const store = readStore();
    const clean = code.trim().toUpperCase();
    return store.teams.find(t => (t.teamCode && t.teamCode.toUpperCase() === clean) || t.inviteCode.toUpperCase() === clean);
  },

  createTeam(teamData: {
    teamName: string;
    trackId: string;
    institutionName: string;
    city: string;
    state: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone?: string;
    leaderCollegeRegNo?: string;
    leaderMeetupUrl: string;
    leaderMeetupMemberId?: string;
    leaderAwsBuilderCenterUrl?: string;
    problemTitle: string;
    problemAbstract: string;
    architecturePdfUrl?: string;
    githubUrl?: string;
  }): ParticipantTeam {
    const store = readStore();
    const count = store.teams.length + 1;
    const teamCode = `KAIROS-T${String(count).padStart(3, '0')}`;
    const inviteCode = `KAIROS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTeam: ParticipantTeam = {
      id: `team-${Date.now()}`,
      teamCode,
      teamName: teamData.teamName,
      inviteCode,
      trackId: teamData.trackId,
      institutionName: teamData.institutionName,
      city: teamData.city,
      state: teamData.state,
      leaderEmail: teamData.leaderEmail,
      selectionStage: 'ROUND_0_APPLICANT',
      problemTitle: teamData.problemTitle,
      problemAbstract: teamData.problemAbstract,
      architecturePdfUrl: teamData.architecturePdfUrl,
      githubUrl: teamData.githubUrl,
      members: [
        {
          id: `m-lead-${Date.now()}`,
          name: teamData.leaderName,
          email: teamData.leaderEmail,
          phone: teamData.leaderPhone,
          collegeRegNo: teamData.leaderCollegeRegNo,
          role: 'Leader',
          college: teamData.institutionName,
          meetupProfileUrl: teamData.leaderMeetupUrl,
          meetupMemberId: teamData.leaderMeetupMemberId,
          meetupRsvpVerified: true,
          awsBuilderCenterUrl: teamData.leaderAwsBuilderCenterUrl,
          confirmed: true,
        }
      ],
      createdAt: new Date().toISOString(),
    };

    store.teams.push(newTeam);
    writeStore(store);
    return newTeam;
  },

  joinTeam(teamCode: string, member: {
    name: string;
    email: string;
    phone?: string;
    collegeRegNo?: string;
    role: 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX';
    college: string;
    meetupProfileUrl: string;
    meetupMemberId?: string;
    awsBuilderCenterUrl?: string;
    tshirtSize?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
    hoodieSize?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  }): { success: boolean; team?: ParticipantTeam; error?: string } {
    const store = readStore();
    const clean = teamCode.trim().toUpperCase();
    const team = store.teams.find(t => (t.teamCode && t.teamCode.toUpperCase() === clean) || t.inviteCode.toUpperCase() === clean);

    if (!team) {
      return { success: false, error: 'Invalid Team Code. Please verify your team invitation code.' };
    }

    if (team.members.length >= 6) {
      return { success: false, error: 'Team roster is full (maximum 6 builders allowed per team).' };
    }

    const emailExists = team.members.some(m => m.email.toLowerCase() === member.email.toLowerCase());
    if (emailExists) {
      return { success: false, error: 'A member with this email is already on the team roster.' };
    }

    team.members.push({
      id: `m-${Date.now()}`,
      name: member.name,
      email: member.email,
      phone: member.phone,
      collegeRegNo: member.collegeRegNo,
      role: member.role,
      college: member.college,
      meetupProfileUrl: member.meetupProfileUrl,
      meetupMemberId: member.meetupMemberId,
      meetupRsvpVerified: true,
      awsBuilderCenterUrl: member.awsBuilderCenterUrl,
      tshirtSize: member.tshirtSize,
      hoodieSize: member.hoodieSize,
      confirmed: true,
    });

    writeStore(store);
    return { success: true, team };
  },

  submitRound1Qualifier(teamCode: string, data: { loomVideoUrl: string; githubUrl: string }): boolean {
    const store = readStore();
    const clean = teamCode.trim().toUpperCase();
    const team = store.teams.find(t => (t.teamCode && t.teamCode.toUpperCase() === clean) || t.inviteCode.toUpperCase() === clean);
    if (!team) return false;

    team.loomVideoUrl = data.loomVideoUrl;
    team.githubUrl = data.githubUrl;
    if (team.selectionStage === 'ROUND_0_APPLICANT') {
      team.selectionStage = 'ONLINE_SEMI_FINALIST';
    }
    writeStore(store);
    return true;
  },

  // Sponsor Referrals (Rainmaker Hub)
  getReferrals(): SponsorReferralLead[] {
    const store = readStore();
    return store.referrals.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  },

  addReferral(lead: Omit<SponsorReferralLead, 'id' | 'lockExpiryDate' | 'status' | 'submittedAt'>): SponsorReferralLead {
    const store = readStore();
    const expiry = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString();
    const randCode = `RAIN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: SponsorReferralLead = {
      ...lead,
      id: `ref-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      referralCode: randCode,
      lockExpiryDate: expiry,
      status: 'PENDING_REVIEW',
      submittedAt: new Date().toISOString(),
    };
    store.referrals.unshift(newLead);
    writeStore(store);
    return newLead;
  },

  getReferralByCode(code: string): SponsorReferralLead | undefined {
    const store = readStore();
    const clean = code.trim().toUpperCase();
    return store.referrals.find(r => 
      r.referralCode?.toUpperCase() === clean || 
      r.id.toUpperCase() === clean ||
      r.companyName.toUpperCase() === clean
    );
  },

  searchReferral(query: string): SponsorReferralLead[] {
    const store = readStore();
    const q = query.trim().toLowerCase();
    return store.referrals.filter(r => 
      (r.studentEmail && r.studentEmail.toLowerCase().includes(q)) || 
      (r.referrerEmail && r.referrerEmail.toLowerCase().includes(q)) ||
      (r.studentPhone && r.studentPhone.includes(q)) || 
      r.companyName.toLowerCase().includes(q)
    );
  },

  // Judging & Z-Score Evaluation
  getJudges(): Judge[] {
    const store = readStore();
    return store.judges;
  },

  verifyJudgePin(pin: string): Judge | undefined {
    const store = readStore();
    return store.judges.find(j => j.accessPin === pin.trim() && j.isActive);
  },

  getEvaluations(): CheckpointEvaluation[] {
    const store = readStore();
    return store.evaluations;
  },

  addEvaluation(evalData: Omit<CheckpointEvaluation, 'id' | 'rawTotalScore' | 'normalizedZScore' | 'evaluatedAt'>): CheckpointEvaluation {
    const store = readStore();
    const rawTotalScore = evalData.criterion1Score + evalData.criterion2Score + evalData.criterion3Score + evalData.criterion4Score;
    
    // Existing evaluations for this judge to compute mean and stdev for Z-score
    const judgeEvals = store.evaluations.filter(e => e.judgeId === evalData.judgeId);
    const allScores = [...judgeEvals.map(e => e.rawTotalScore), rawTotalScore];
    const mean = allScores.reduce((acc, v) => acc + v, 0) / allScores.length;
    const variance = allScores.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (allScores.length || 1);
    const stdev = Math.sqrt(variance) || 1;
    const normalizedZScore = Number(((rawTotalScore - mean) / stdev).toFixed(4));

    const newEval: CheckpointEvaluation = {
      ...evalData,
      id: `eval-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      rawTotalScore,
      normalizedZScore,
      evaluatedAt: new Date().toISOString(),
    };

    store.evaluations.push(newEval);
    writeStore(store);
    return newEval;
  },

  // CSAT Survey
  getCSAT(): CSATResponse[] {
    const store = readStore();
    return store.csat;
  },

  addCSAT(response: Omit<CSATResponse, 'id' | 'submittedAt'>): CSATResponse {
    const store = readStore();
    const newCSAT: CSATResponse = {
      ...response,
      id: `csat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString(),
    };
    store.csat.push(newCSAT);
    writeStore(store);
    return newCSAT;
  },

  exportCSATCSV(): string {
    const store = readStore();
    const headers = ['ID', 'Satisfaction (1-5)', 'NPS (0-10)', 'Cloud Services Used', 'Pursuing AWS Cert', 'Feedback', 'Testimonial', 'Submitted At'];
    const rows = store.csat.map(c => [
      c.id,
      c.overallSatisfaction,
      c.npsScore,
      `"${c.cloudServicesUsed.join(', ')}"`,
      c.pursuingAwsCertification,
      `"${(c.eventFeedback || '').replace(/"/g, '""')}"`,
      `"${(c.testimonialQuote || '').replace(/"/g, '""')}"`,
      c.submittedAt
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  },

  // Members & Leadership
  getMembers(filter?: { batch?: string; tier?: string; division?: string; search?: string }): OrgMember[] {
    const store = readStore();
    let members = [...store.members];

    if (filter?.tier && filter.tier !== 'all') {
      members = members.filter(m => m.tier === filter.tier);
    }
    if (filter?.division && filter.division !== 'all') {
      members = members.filter(m => m.division.toLowerCase().includes(filter.division!.toLowerCase()));
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      members = members.filter(m => 
        m.fullName.toLowerCase().includes(q) || 
        m.roleTitle.toLowerCase().includes(q) ||
        m.division.toLowerCase().includes(q)
      );
    }

    return members.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getMemberByUsername(username: string): OrgMember | undefined {
    const store = readStore();
    return store.members.find(m => m.username.toLowerCase() === username.trim().toLowerCase());
  },

  // Sponsor Inquiries
  getSponsors(): SponsorInquiry[] {
    const store = readStore();
    return store.sponsors.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addSponsorInquiry(inquiry: Omit<SponsorInquiry, 'id' | 'status' | 'createdAt'>): SponsorInquiry {
    const store = readStore();
    const newInquiry: SponsorInquiry = {
      ...inquiry,
      id: `sp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    store.sponsors.push(newInquiry);
    writeStore(store);
    return newInquiry;
  },

  // Feature Flags
  getFeatureFlags(): FeatureFlags {
    const store = readStore();
    return store.featureFlags;
  },

  setFeatureFlags(flags: Partial<FeatureFlags>, organizer: string): FeatureFlags {
    const store = readStore();
    store.featureFlags = { ...store.featureFlags, ...flags };
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      organizerName: organizer,
      action: 'UPDATE_FLAGS',
      details: `Updated feature flags: ${JSON.stringify(flags)}`
    });
    writeStore(store);
    return store.featureFlags;
  },

  addAuditLog(organizerName: string, action: string, details: string): AuditLog {
    const store = readStore();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      organizerName,
      action,
      details
    };
    if (!store.auditLogs) store.auditLogs = [];
    store.auditLogs.unshift(newLog);
    writeStore(store);
    return newLog;
  },

  getAuditLogs(): AuditLog[] {
    const store = readStore();
    return store.auditLogs || [];
  },

  // Radar Signals
  getRadarSignals(): TeamRadarSignal[] {
    const store = readStore();
    return [...store.radarSignals].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addRadarSignal(signal: Omit<TeamRadarSignal, 'id' | 'createdAt'>): TeamRadarSignal {
    const store = readStore();
    const newSignal: TeamRadarSignal = {
      ...signal,
      id: `sig-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    store.radarSignals.unshift(newSignal);
    writeStore(store);
    return newSignal;
  },

  // Metrics
  getMetrics() {
    const store = readStore();
    const waitlist = store.waitlist;
    const sponsors = store.sponsors;
    const teams = store.teams;
    const radar = store.radarSignals;

    return {
      totalApplicants: waitlist.length,
      totalTeams: teams.length,
      finalistTeams: teams.filter(t => t.selectionStage === 'ON_CAMPUS_QUALIFIED').length,
      semiFinalistTeams: teams.filter(t => t.selectionStage === 'ONLINE_SEMI_FINALIST').length,
      totalSponsors: sponsors.length,
      totalReferrals: store.referrals.length,
      totalRadarSignals: radar.length,
      totalCSATResponses: store.csat.length,
    };
  }
};
