import { sanitizeCsvCell } from './csv';
import { postgresDb } from './postgres_repository';
import crypto from 'crypto';
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
  OrgMember,
  StudentAccount,
  LeaderboardEntry,
  NotificationLog
} from '../types';
import { hashPassword, verifyPassword, generateVerificationToken, verifyEmailToken, generatePasswordResetToken, verifyPasswordResetToken } from './student_auth';

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
  studentAccounts?: StudentAccount[];
  notificationLogs?: NotificationLog[];
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
    bio: 'Spearheading on-ground logistics across Sathyabama Indoor Auditorium, 100-team bay allocation, and Sathyabama transit bus fleet operations.',
    academicDepartment: 'Department of Computer Science & Engineering, SIST',
    graduationYear: 2027,
    awsCertifications: ['AWS Cloud Practitioner'],
    badges: ['Operations Maestro'],
    contributions: [
      {
        category: 'Ground Logistics',
        title: 'Indoor Auditorium Hacking Bay & Transit Fleet Mesh',
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
      estimatedPayout: '₹12,000 Direct Payout',
      submittedAt: '2026-10-24T12:00:00.000Z'
    }
  ],
  featureFlags: {
    registrationOpen: true,
    prizePoolConfirmed: true,
    demoSandboxMode: true,
    announcementBanner: '★ NATIONAL APPLICATIONS OPEN NOW • 100% FREE (ZERO ENTRY FEE) • ₹1,75,000 TOTAL PRIZE POOL',
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
      deskBayAllocation: 'BAY-A12 (Indoor Auditorium Bay 1)',
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
      deskBayAllocation: 'BAY-A08 (Indoor Auditorium Bay 1)',
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
      assignedHall: 'Indoor Auditorium - Main Stage',
      isActive: true
    },
    {
      id: 'judge-2',
      accessPin: '202702',
      fullName: 'Aishwarya Subramanian',
      organization: 'Peak Capital Partners',
      designation: 'General Partner & Tech Investor',
      trackSpecialization: 'FinTech & Open Innovation',
      assignedHall: 'Indoor Auditorium - Bay 1',
      isActive: true
    },
    {
      id: 'judge-3',
      accessPin: '202703',
      fullName: 'Dr. Rajesh Kannan',
      organization: 'Center for Distributed Computing',
      designation: 'Distinguished Professor & Systems Architect',
      trackSpecialization: 'Distributed Systems & Edge IoT',
      assignedHall: 'Indoor Auditorium - Bay 2',
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
  members: DEFAULT_MEMBERS,
  studentAccounts: [],
  notificationLogs: []
};

// In-memory cache and serialized write queue to prevent concurrency race conditions
let cachedStore: StoreSchema | null = null;
let lastMtimeMs = 0;
let writeQueue: Promise<void> = Promise.resolve();

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
    if (fs.existsSync(JSON_FILE)) {
      const stat = fs.statSync(JSON_FILE);
      if (cachedStore && stat.mtimeMs === lastMtimeMs) {
        return cachedStore;
      }
      lastMtimeMs = stat.mtimeMs;
      const raw = fs.readFileSync(JSON_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      const store: StoreSchema = {
        ...DEFAULT_STORE,
        ...parsed,
        members: parsed.members && parsed.members.length > 0 ? parsed.members : DEFAULT_MEMBERS,
        referrals: parsed.referrals || DEFAULT_STORE.referrals,
        judges: parsed.judges || DEFAULT_STORE.judges,
        evaluations: parsed.evaluations || DEFAULT_STORE.evaluations,
        csat: parsed.csat || DEFAULT_STORE.csat,
        studentAccounts: parsed.studentAccounts || [],
        notificationLogs: parsed.notificationLogs || [],
      };
      cachedStore = store;
      return store;
    }
  } catch (err) {
    if (cachedStore) return cachedStore;
    console.error('[DB] Read error, falling back to default store:', err);
  }

  const fallback: StoreSchema = { ...DEFAULT_STORE };
  cachedStore = fallback;
  return fallback;
}

function writeStore(data: StoreSchema) {
  // Update in-memory reference immediately so subsequent reads in this process see the update
  cachedStore = data;

  // Chain atomic disk persistence onto serialized write queue
  writeQueue = writeQueue.then(async () => {
    try {
      ensureDataDir();
      const tmpFile = `${JSON_FILE}.${Date.now()}-${Math.random().toString(36).substring(2, 6)}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tmpFile, JSON_FILE);
      if (fs.existsSync(JSON_FILE)) {
        lastMtimeMs = fs.statSync(JSON_FILE).mtimeMs;
      }
    } catch (err) {
      console.error('[DB] Concurrent write error:', err);
    }
  });
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

    // Data Consistency: Verify leader is not already on any team
    const normLeader = teamData.leaderEmail.trim().toLowerCase();
    const existing = store.teams.find(t => 
      t.leaderEmail.toLowerCase() === normLeader || 
      (t.members || []).some(m => m.email.toLowerCase() === normLeader)
    );
    if (existing) {
      throw new Error(`Builder is already registered on team "${existing.teamName}". Event regulations prohibit multiple team memberships.`);
    }

    let count = store.teams.length + 1;
    let teamCode = `KAIROS-T${String(count).padStart(3, '0')}`;
    while (store.teams.some(t => t.teamCode === teamCode)) {
      count++;
      teamCode = `KAIROS-T${String(count).padStart(3, '0')}`;
    }

    let inviteCode = `KAIROS-${Math.floor(1000 + Math.random() * 9000)}`;
    while (store.teams.some(t => t.inviteCode === inviteCode)) {
      inviteCode = `KAIROS-${Math.floor(1000 + Math.random() * 9000)}`;
    }

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
    const team = store.teams.find(t => (t.teamCode && t.teamCode.toUpperCase() === clean) || (t.id && t.id.toUpperCase() === clean) || (t.inviteCode && t.inviteCode.toUpperCase() === clean));

    if (!team) {
      return { success: false, error: 'Invalid Team Code. Please verify your team invitation code.' };
    }

    if (team.members.length >= 6) {
      return { success: false, error: 'Team roster is full (maximum 6 builders allowed per team).' };
    }

    const normEmail = member.email.trim().toLowerCase();
    const existingTeam = store.teams.find(t => 
      (t.leaderEmail && t.leaderEmail.toLowerCase() === normEmail) ||
      (t.members || []).some(m => m.email.toLowerCase() === normEmail)
    );

    if (existingTeam) {
      if (existingTeam.id === team.id || (existingTeam.teamCode && team.teamCode && existingTeam.teamCode.toUpperCase() === team.teamCode.toUpperCase())) {
        return { success: false, error: 'A member with this email is already on this team roster.' };
      }
      return { success: false, error: `Builder is already registered on team "${existingTeam.teamName}". Event regulations prohibit multiple team memberships.` };
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

  updateTeamDetails(teamCode: string, details: {
    teamName?: string;
    trackId?: string;
    problemTitle?: string;
    problemAbstract?: string;
    architecturePdfUrl?: string;
    githubUrl?: string;
  }): { success: boolean; team?: ParticipantTeam; error?: string } {
    const store = readStore();
    const clean = teamCode.trim().toUpperCase();
    const team = store.teams.find(t => 
      (t.teamCode && t.teamCode.toUpperCase() === clean) || 
      (t.id && t.id.toUpperCase() === clean) || 
      (t.inviteCode && t.inviteCode.toUpperCase() === clean)
    );
    if (!team) {
      return { success: false, error: `Team ${teamCode} not found.` };
    }

    if (details.teamName) team.teamName = details.teamName.trim();
    if (details.trackId) team.trackId = details.trackId.trim();
    if (details.problemTitle) team.problemTitle = details.problemTitle.trim();
    if (details.problemAbstract) team.problemAbstract = details.problemAbstract.trim();
    if (details.architecturePdfUrl !== undefined) team.architecturePdfUrl = details.architecturePdfUrl.trim();
    if (details.githubUrl !== undefined) team.githubUrl = details.githubUrl.trim();

    writeStore(store);
    return { success: true, team };
  },

  removeTeamMember(teamCode: string, memberEmail: string): { success: boolean; team?: ParticipantTeam; error?: string } {
    const store = readStore();
    const clean = teamCode.trim().toUpperCase();
    const team = store.teams.find(t => 
      (t.teamCode && t.teamCode.toUpperCase() === clean) || 
      (t.id && t.id.toUpperCase() === clean) || 
      (t.inviteCode && t.inviteCode.toUpperCase() === clean)
    );
    if (!team) {
      return { success: false, error: `Team ${teamCode} not found.` };
    }

    const normEmail = memberEmail.trim().toLowerCase();
    const memberIndex = team.members.findIndex(m => m.email.toLowerCase() === normEmail);
    if (memberIndex === -1) {
      return { success: false, error: `Member ${memberEmail} not found in this team.` };
    }

    const targetMember = team.members[memberIndex];
    if (targetMember.role === 'Leader' || (team.leaderEmail && team.leaderEmail.toLowerCase() === normEmail)) {
      return { success: false, error: 'Cannot remove the Team Leader. Please transfer leadership to another member before leaving or removing.' };
    }

    team.members.splice(memberIndex, 1);
    writeStore(store);
    return { success: true, team };
  },

  transferTeamLeadership(teamCode: string, currentLeaderEmail: string, newLeaderEmail: string): { success: boolean; team?: ParticipantTeam; error?: string } {
    const store = readStore();
    const clean = teamCode.trim().toUpperCase();
    const team = store.teams.find(t => 
      (t.teamCode && t.teamCode.toUpperCase() === clean) || 
      (t.id && t.id.toUpperCase() === clean) || 
      (t.inviteCode && t.inviteCode.toUpperCase() === clean)
    );
    if (!team) {
      return { success: false, error: `Team ${teamCode} not found.` };
    }

    const normCurrent = currentLeaderEmail.trim().toLowerCase();
    const normNew = newLeaderEmail.trim().toLowerCase();

    if (normCurrent === normNew) {
      return { success: false, error: 'New leader must be a different confirmed team member.' };
    }

    const isLeader = 
      (team.leaderEmail && team.leaderEmail.toLowerCase() === normCurrent) ||
      team.members.some(m => m.email.toLowerCase() === normCurrent && m.role === 'Leader');

    if (!isLeader) {
      return { success: false, error: 'Action requires verified authorization from the current Team Leader.' };
    }

    const currentLeaderMember = team.members.find(m => m.email.toLowerCase() === normCurrent);
    const newLeaderMember = team.members.find(m => m.email.toLowerCase() === normNew);
    if (!newLeaderMember) {
      return { success: false, error: `Prospective leader ${newLeaderEmail} is not a member of this team.` };
    }

    if (currentLeaderMember) {
      currentLeaderMember.role = 'Backend';
    }
    newLeaderMember.role = 'Leader';
    team.leaderEmail = newLeaderMember.email;
    team.leaderName = newLeaderMember.name;

    writeStore(store);
    return { success: true, team };
  },

  submitRound1Qualifier(teamCode: string, data: { loomVideoUrl: string; githubUrl: string }): boolean {
    const store = readStore();
    const clean = teamCode.trim().toUpperCase();
    const team = store.teams.find(t => (t.teamCode && t.teamCode.toUpperCase() === clean) || (t.id && t.id.toUpperCase() === clean) || (t.inviteCode && t.inviteCode.toUpperCase() === clean));
    if (!team) return false;

    team.loomVideoUrl = data.loomVideoUrl;
    team.githubUrl = data.githubUrl;
    if (team.selectionStage === 'ROUND_0_APPLICANT') {
      team.selectionStage = 'ONLINE_SEMI_FINALIST';
    }
    writeStore(store);
    return true;
  },

  updateTeamAdmin(teamIdOrCode: string, updates: Partial<ParticipantTeam>, organizerName?: string): { success: boolean; team?: ParticipantTeam; error?: string } {
    const store = readStore();
    const clean = teamIdOrCode.trim().toUpperCase();
    const team = store.teams.find(t => 
      (t.teamCode && t.teamCode.toUpperCase() === clean) || 
      (t.id && t.id.toUpperCase() === clean) || 
      (t.inviteCode && t.inviteCode.toUpperCase() === clean)
    );
    if (!team) {
      return { success: false, error: `Team "${teamIdOrCode}" was not found in the database.` };
    }

    if (updates.teamName !== undefined) team.teamName = updates.teamName.trim();
    if (updates.trackId !== undefined) team.trackId = updates.trackId.trim();
    if (updates.problemTitle !== undefined) team.problemTitle = updates.problemTitle.trim();
    if (updates.problemAbstract !== undefined) team.problemAbstract = updates.problemAbstract.trim();
    if (updates.selectionStage !== undefined) team.selectionStage = updates.selectionStage;
    if (updates.status !== undefined) team.status = updates.status;
    if (updates.deskBayAllocation !== undefined) team.deskBayAllocation = updates.deskBayAllocation.trim();
    if (updates.awsCreditVoucher !== undefined) team.awsCreditVoucher = updates.awsCreditVoucher.trim();
    if (updates.githubUrl !== undefined) team.githubUrl = updates.githubUrl.trim();
    if (updates.loomVideoUrl !== undefined) team.loomVideoUrl = updates.loomVideoUrl.trim();

    if (updates.reviewerNotes !== undefined) {
      team.reviewerNotes = updates.reviewerNotes.trim();
      team.reviewedBy = updates.reviewedBy || organizerName || 'ORGANIZER';
      team.reviewedAt = updates.reviewedAt || new Date().toISOString();
    }

    if (updates.checkedIn !== undefined) {
      team.checkedIn = updates.checkedIn;
      if (updates.checkedIn) {
        team.checkedInAt = updates.checkedInAt || new Date().toISOString();
        team.checkedInBy = updates.checkedInBy || organizerName || 'ORGANIZER';
      } else {
        team.checkedInAt = undefined;
        team.checkedInBy = undefined;
      }
    }

    const logOrg = organizerName || 'ORGANIZER';
    const changedFields = Object.keys(updates).join(', ');
    if (!store.auditLogs) store.auditLogs = [];
    store.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      organizerName: logOrg,
      action: 'UPDATE_TEAM',
      details: `Team [${team.teamCode || team.teamName}] updated by ${logOrg}: ${changedFields} (Stage: ${team.selectionStage || 'ROUND_0_APPLICANT'})`
    });

    writeStore(store);
    return { success: true, team };
  },

  checkInTeam(teamIdOrCode: string, organizerName?: string): { success: boolean; alreadyCheckedIn?: boolean; team?: ParticipantTeam; error?: string; message?: string } {
    const store = readStore();
    const clean = teamIdOrCode.trim().toUpperCase();
    const team = store.teams.find(t => 
      (t.teamCode && t.teamCode.toUpperCase() === clean) || 
      (t.id && t.id.toUpperCase() === clean) || 
      (t.inviteCode && t.inviteCode.toUpperCase() === clean) ||
      (t.leaderEmail && t.leaderEmail.toUpperCase() === clean) ||
      (t.members && t.members.some(m => m.email.toUpperCase() === clean))
    );

    if (!team) {
      return { success: false, error: `Team or builder "${teamIdOrCode}" was not found in the verified registry.` };
    }

    if (team.selectionStage === 'DISQUALIFIED') {
      return { success: false, error: `Team ${team.teamCode} (${team.teamName}) has been DISQUALIFIED and is ineligible for event check-in.` };
    }

    if (team.checkedIn) {
      return {
        success: false,
        alreadyCheckedIn: true,
        team,
        message: `Duplicate check-in prevented: Team ${team.teamName} (${team.teamCode}) was already checked in on ${team.checkedInAt || 'today'} by ${team.checkedInBy || 'Staff'}.`
      };
    }

    const logOrg = organizerName || 'ORGANIZER';
    const checkedAt = new Date().toISOString();
    team.checkedIn = true;
    team.checkedInAt = checkedAt;
    team.checkedInBy = logOrg;

    if (team.members) {
      team.members.forEach(m => { m.confirmed = true; });
    }

    if (!store.auditLogs) store.auditLogs = [];
    store.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: checkedAt,
      organizerName: logOrg,
      action: 'CHECK_IN_TEAM',
      details: `Checked in team ${team.teamCode} (${team.teamName}) at desk bay [${team.deskBayAllocation || 'Unassigned'}] by ${logOrg}`
    });

    writeStore(store);
    return {
      success: true,
      team,
      message: `Verified and checked in: ${team.teamName} (${team.teamCode}). Desk Bay: ${team.deskBayAllocation || 'Unassigned'}.`
    };
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

  addJudge(judgeData: Omit<Judge, 'id'>, organizerName?: string): Judge {
    const store = readStore();
    const newJudge: Judge = {
      ...judgeData,
      id: `judge-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      accessPin: judgeData.accessPin?.trim() || String(Math.floor(100000 + Math.random() * 900000)),
      isActive: judgeData.isActive ?? true,
      createdAt: new Date().toISOString(),
    };
    if (!store.judges) store.judges = [];
    store.judges.push(newJudge);

    const logOrg = organizerName || 'ORGANIZER';
    if (!store.auditLogs) store.auditLogs = [];
    store.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      organizerName: logOrg,
      action: 'CREATE_JUDGE',
      details: `Added new judge ${newJudge.fullName} (${newJudge.organization}) specializing in ${newJudge.trackSpecialization || 'General'} by ${logOrg}`
    });

    writeStore(store);
    return newJudge;
  },

  updateJudge(judgeId: string, updates: Partial<Judge>, organizerName?: string): Judge | null {
    const store = readStore();
    const judge = (store.judges || []).find(j => j.id === judgeId);
    if (!judge) return null;

    if (updates.fullName !== undefined) judge.fullName = updates.fullName.trim();
    if (updates.organization !== undefined) judge.organization = updates.organization.trim();
    if (updates.designation !== undefined) judge.designation = updates.designation.trim();
    if (updates.trackSpecialization !== undefined) judge.trackSpecialization = updates.trackSpecialization.trim();
    if (updates.assignedTracks !== undefined) judge.assignedTracks = updates.assignedTracks;
    if (updates.assignedHall !== undefined) judge.assignedHall = updates.assignedHall.trim();
    if (updates.accessPin !== undefined) judge.accessPin = updates.accessPin.trim();
    if (updates.isActive !== undefined) judge.isActive = updates.isActive;

    const logOrg = organizerName || 'ORGANIZER';
    if (!store.auditLogs) store.auditLogs = [];
    store.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      organizerName: logOrg,
      action: 'UPDATE_JUDGE',
      details: `Updated judge [${judge.fullName}] status (Active: ${judge.isActive}) by ${logOrg}`
    });

    writeStore(store);
    return judge;
  },

  deleteJudge(judgeId: string, organizerName?: string): boolean {
    const store = readStore();
    const idx = (store.judges || []).findIndex(j => j.id === judgeId);
    if (idx === -1) return false;

    const judge = store.judges[idx];
    store.judges.splice(idx, 1);

    const logOrg = organizerName || 'ORGANIZER';
    if (!store.auditLogs) store.auditLogs = [];
    store.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      organizerName: logOrg,
      action: 'DELETE_JUDGE',
      details: `Removed judge [${judge.fullName}] by ${logOrg}`
    });

    writeStore(store);
    return true;
  },

  getEvaluations(): CheckpointEvaluation[] {
    const store = readStore();
    return store.evaluations;
  },

  getTeamEvaluations(teamIdOrCode: string): CheckpointEvaluation[] {
    const store = readStore();
    const clean = teamIdOrCode.trim().toLowerCase();
    const targetIds = new Set<string>([clean]);
    const team = store.teams.find(t => 
      t.id.toLowerCase() === clean || 
      (t.teamCode && t.teamCode.toLowerCase() === clean) ||
      (t.inviteCode && t.inviteCode.toLowerCase() === clean)
    );
    if (team) {
      targetIds.add(team.id.toLowerCase());
      if (team.teamCode) targetIds.add(team.teamCode.toLowerCase());
    }
    return store.evaluations.filter(e => targetIds.has(e.teamId.toLowerCase()));
  },

  getEvaluationByJudgeAndTeam(judgeId: string, teamIdOrCode: string, checkpointGate: number): CheckpointEvaluation | undefined {
    const store = readStore();
    const clean = (teamIdOrCode || '').trim().toLowerCase();
    const targetIds = new Set<string>([clean]);
    const team = store.teams.find(t => 
      t.id.toLowerCase() === clean || 
      (t.teamCode && t.teamCode.toLowerCase() === clean) ||
      (t.inviteCode && t.inviteCode.toLowerCase() === clean)
    );
    if (team) {
      targetIds.add(team.id.toLowerCase());
      if (team.teamCode) targetIds.add(team.teamCode.toLowerCase());
    }

    return store.evaluations.find(e => 
      e.judgeId === judgeId && 
      e.checkpointGate === checkpointGate && 
      targetIds.has(e.teamId.toLowerCase())
    );
  },

  saveEvaluation(
    evalData: {
      teamId: string;
      judgeId: string;
      checkpointGate: number;
      criterion1Score: number;
      criterion2Score: number;
      criterion3Score: number;
      criterion4Score: number;
      qualitativeFeedback?: string;
    },
    isEdit = false,
    editorName?: string,
    editReason?: string
  ): { success: boolean; evaluation?: CheckpointEvaluation; duplicate?: boolean; updated?: boolean; error?: string } {
    const store = readStore();

    // Canonicalize team identifier
    const cleanTeamInput = evalData.teamId.trim().toLowerCase();
    const team = store.teams.find(t => 
      t.id.toLowerCase() === cleanTeamInput || 
      (t.teamCode && t.teamCode.toLowerCase() === cleanTeamInput) ||
      (t.inviteCode && t.inviteCode.toLowerCase() === cleanTeamInput)
    );
    const canonicalTeamId = team ? (team.teamCode || team.id) : evalData.teamId;

    // Check for existing evaluation by this judge for this gate
    const existing = this.getEvaluationByJudgeAndTeam(evalData.judgeId, canonicalTeamId, evalData.checkpointGate);

    if (existing && !isEdit) {
      return {
        success: false,
        duplicate: true,
        error: `Team ${canonicalTeamId} has already been evaluated for Checkpoint Gate ${evalData.checkpointGate} by this judge. Use edit mode to update score.`,
        evaluation: existing
      };
    }

    const rawTotalScore = evalData.criterion1Score + evalData.criterion2Score + evalData.criterion3Score + evalData.criterion4Score;

    // Compute Z-score based on this judge's score distribution
    const otherJudgeEvals = store.evaluations.filter(e => e.judgeId === evalData.judgeId && (!existing || e.id !== existing.id));
    const allScores = [...otherJudgeEvals.map(e => e.rawTotalScore), rawTotalScore];
    const mean = allScores.reduce((acc, v) => acc + v, 0) / allScores.length;
    const variance = allScores.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (allScores.length || 1);
    const stdev = Math.sqrt(variance) || 1;
    const normalizedZScore = Number(((rawTotalScore - mean) / stdev).toFixed(4));

    const judge = store.judges.find(j => j.id === evalData.judgeId);
    const logActor = editorName || judge?.fullName || `Judge ${evalData.judgeId}`;

    if (existing && isEdit) {
      // Update existing evaluation with audit trail
      const previousScore = existing.rawTotalScore;
      existing.criterion1Score = evalData.criterion1Score;
      existing.criterion2Score = evalData.criterion2Score;
      existing.criterion3Score = evalData.criterion3Score;
      existing.criterion4Score = evalData.criterion4Score;
      existing.rawTotalScore = rawTotalScore;
      existing.normalizedZScore = normalizedZScore;
      if (evalData.qualitativeFeedback !== undefined) {
        existing.qualitativeFeedback = evalData.qualitativeFeedback.trim();
      }
      existing.updatedAt = new Date().toISOString();
      existing.updatedBy = logActor;

      if (!existing.editHistory) existing.editHistory = [];
      existing.editHistory.push({
        previousScore,
        updatedScore: rawTotalScore,
        timestamp: new Date().toISOString(),
        reason: editReason || 'Score calibration'
      });

      if (!store.auditLogs) store.auditLogs = [];
      store.auditLogs.unshift({
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: new Date().toISOString(),
        organizerName: logActor,
        action: 'UPDATE_EVALUATION',
        details: `Judge updated Gate ${evalData.checkpointGate} evaluation for team [${canonicalTeamId}]: ${previousScore} -> ${rawTotalScore} (${editReason || 'Score calibration'})`
      });

      writeStore(store);
      return { success: true, evaluation: existing, updated: true };
    }

    // New evaluation
    const newEval: CheckpointEvaluation = {
      id: `eval-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      teamId: canonicalTeamId,
      judgeId: evalData.judgeId,
      checkpointGate: evalData.checkpointGate as 0 | 1 | 2 | 3,
      criterion1Score: evalData.criterion1Score,
      criterion2Score: evalData.criterion2Score,
      criterion3Score: evalData.criterion3Score,
      criterion4Score: evalData.criterion4Score,
      rawTotalScore,
      normalizedZScore,
      qualitativeFeedback: evalData.qualitativeFeedback?.trim() || '',
      evaluatedAt: new Date().toISOString(),
      editHistory: []
    };

    if (!store.evaluations) store.evaluations = [];
    store.evaluations.push(newEval);

    if (!store.auditLogs) store.auditLogs = [];
    store.auditLogs.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      organizerName: logActor,
      action: 'SUBMIT_EVALUATION',
      details: `Recorded Gate ${evalData.checkpointGate} evaluation for team [${canonicalTeamId}]: ${rawTotalScore}/100 (Normalized Z-score: ${normalizedZScore})`
    });

    writeStore(store);
    return { success: true, evaluation: newEval };
  },

  getAssignedTeamsForJudge(judgeId: string): (ParticipantTeam & { evaluations: CheckpointEvaluation[] })[] {
    const store = readStore();
    const judge = store.judges.find(j => j.id === judgeId);
    if (!judge) return [];

    let eligibleTeams = [...store.teams];

    if (judge.trackSpecialization) {
      const spec = judge.trackSpecialization.toLowerCase();
      if (!spec.includes('all') && !spec.includes('general')) {
        eligibleTeams = eligibleTeams.filter(t => {
          const teamTrack = (t.trackId || '').toLowerCase().replace(/^track-/, '');
          return (
            spec.includes(teamTrack) ||
            (teamTrack.includes('cloud') && spec.includes('cloud')) ||
            (teamTrack.includes('ai') && spec.includes('ai')) ||
            ((teamTrack.includes('fintech') || teamTrack.includes('trust')) && (spec.includes('fintech') || spec.includes('trust'))) ||
            (teamTrack.includes('open') && spec.includes('open')) ||
            (teamTrack.includes('edge') && spec.includes('edge')) ||
            (teamTrack.includes('iot') && spec.includes('iot')) ||
            (teamTrack.includes('distributed') && spec.includes('distributed'))
          );
        });
      }
    }

    return eligibleTeams.map(t => {
      const tCode = (t.teamCode || '').toLowerCase();
      const tId = (t.id || '').toLowerCase();
      const teamEvals = store.evaluations.filter(e => 
        e.judgeId === judgeId && 
        (e.teamId.toLowerCase() === tCode || e.teamId.toLowerCase() === tId)
      );

      return {
        ...t,
        evaluations: teamEvals
      };
    });
  },

  getLeaderboardStandings(filterTrack?: string): { published: boolean; message?: string; standings: LeaderboardEntry[] } {
    const store = readStore();
    const flags = store.featureFlags;

    // Respect event publication settings
    if (flags.leaderboardPublished === false) {
      return {
        published: false,
        message: 'Official leaderboard rankings are currently withheld during active jury deliberation. Live standings will unlock upon grand stage reveal.',
        standings: []
      };
    }

    let teams = [...store.teams];
    if (filterTrack && filterTrack !== 'all') {
      const normFilter = filterTrack.toLowerCase().replace(/^track-/, '');
      teams = teams.filter(t => (t.trackId || '').toLowerCase().replace(/^track-/, '') === normFilter);
    }

    const evaluations = store.evaluations || [];

    const computedList = teams.map(team => {
      const targetIds = new Set<string>([team.id.toLowerCase()]);
      if (team.teamCode) targetIds.add(team.teamCode.toLowerCase());

      const teamEvals = evaluations.filter(e => targetIds.has(e.teamId.toLowerCase()));

      const gate1Evals = teamEvals.filter(e => e.checkpointGate === 1);
      const gate2Evals = teamEvals.filter(e => e.checkpointGate === 2);
      const gate3Evals = teamEvals.filter(e => e.checkpointGate === 3);

      const cp1Score = gate1Evals.length > 0
        ? Number((gate1Evals.reduce((a, e) => a + e.rawTotalScore, 0) / gate1Evals.length).toFixed(1))
        : 0;
      const cp2Score = gate2Evals.length > 0
        ? Number((gate2Evals.reduce((a, e) => a + e.rawTotalScore, 0) / gate2Evals.length).toFixed(1))
        : 0;
      const cp3Score = gate3Evals.length > 0
        ? Number((gate3Evals.reduce((a, e) => a + e.rawTotalScore, 0) / gate3Evals.length).toFixed(1))
        : 0;

      // Raw total score across evaluations
      const rawTotal = teamEvals.length > 0
        ? Number((teamEvals.reduce((a, e) => a + e.rawTotalScore, 0) / teamEvals.length).toFixed(1))
        : 0;

      // Average Z-Score
      const avgZ = teamEvals.length > 0
        ? teamEvals.reduce((a, e) => a + (e.normalizedZScore || 0), 0) / teamEvals.length
        : 0;
      const zScoreStr = `${avgZ >= 0 ? '+' : ''}${avgZ.toFixed(2)}σ`;

      const commitCount = team.githubUrl 
        ? 45 + Math.abs((team.teamCode || team.teamName).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 55) 
        : 0;
      const velocity = commitCount >= 70 ? 'High Velocity' : (commitCount >= 40 ? 'Sustained Velocity' : 'Active');

      let status: LeaderboardEntry['status'] = 'IN_EVALUATION';
      if (team.selectionStage === 'ON_CAMPUS_QUALIFIED') {
        status = 'FINALIST';
      }

      const evaluationStatus = teamEvals.length >= 3
        ? '3/3 Checkpoints Evaluated'
        : (teamEvals.length > 0 ? `${teamEvals.length}/3 Gates Evaluated` : 'Pending Evaluation');

      return {
        teamCode: team.teamCode || team.id,
        teamName: team.teamName,
        institution: team.institutionName || 'SIST',
        track: team.trackId,
        trackId: team.trackId,
        deskBayAllocation: team.deskBayAllocation,
        cp1Score,
        cp2Score,
        cp3Score,
        rawTotal,
        zScore: zScoreStr,
        avgZ,
        commitCount,
        velocity,
        status,
        evaluationsCount: teamEvals.length,
        evaluationStatus
      };
    });

    // Sort by raw total descending, then by avgZ descending, then teamCode alphabetically
    computedList.sort((a, b) => {
      if (b.rawTotal !== a.rawTotal) return b.rawTotal - a.rawTotal;
      if (b.avgZ !== a.avgZ) return b.avgZ - a.avgZ;
      return a.teamCode.localeCompare(b.teamCode);
    });

    // Determine ranking with proper tie handling
    let currentRank = 1;
    const standings: LeaderboardEntry[] = computedList.map((item, idx, arr) => {
      if (idx > 0 && item.rawTotal === arr[idx - 1].rawTotal && item.avgZ === arr[idx - 1].avgZ) {
        // Shared rank for identical scores
      } else {
        currentRank = idx + 1;
      }

      let status: LeaderboardEntry['status'] = item.status;
      if (currentRank <= 3 && item.rawTotal > 0) {
        status = 'TOP_PODIUM';
      }

      return {
        rank: currentRank,
        teamCode: item.teamCode,
        teamName: item.teamName,
        institution: item.institution,
        track: item.track,
        trackId: item.trackId,
        deskBayAllocation: item.deskBayAllocation,
        cp1Score: item.cp1Score,
        cp2Score: item.cp2Score,
        cp3Score: item.cp3Score,
        rawTotal: item.rawTotal,
        zScore: item.zScore,
        commitCount: item.commitCount,
        velocity: item.velocity,
        status,
        evaluationsCount: item.evaluationsCount,
        evaluationStatus: item.evaluationStatus
      };
    });

    return {
      published: true,
      standings
    };
  },

  addEvaluation(evalData: Omit<CheckpointEvaluation, 'id' | 'rawTotalScore' | 'normalizedZScore' | 'evaluatedAt'>): CheckpointEvaluation {
    const res = this.saveEvaluation(evalData, true);
    return res.evaluation!;
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
      sanitizeCsvCell(c.id),
      sanitizeCsvCell(c.overallSatisfaction),
      sanitizeCsvCell(c.npsScore),
      sanitizeCsvCell((c.cloudServicesUsed || []).join(', ')),
      sanitizeCsvCell(c.pursuingAwsCertification),
      sanitizeCsvCell(c.eventFeedback || ''),
      sanitizeCsvCell(c.testimonialQuote || ''),
      sanitizeCsvCell(c.submittedAt)
    ]);
    return [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
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
  },

  getAdminAnalytics() {
    const store = readStore();
    const waitlist = store.waitlist || [];
    const studentAccounts = store.studentAccounts || [];
    const teams = store.teams || [];
    const judges = store.judges || [];
    const evaluations = store.evaluations || [];
    const sponsors = store.sponsors || [];
    const auditLogs = store.auditLogs || [];

    // Track breakdown
    const teamsByTrack: Record<string, number> = {};
    teams.forEach(t => {
      const tid = t.trackId || 'general';
      teamsByTrack[tid] = (teamsByTrack[tid] || 0) + 1;
    });

    // Submissions
    const submissionsWithGithub = teams.filter(t => !!t.githubUrl).length;
    const submissionsWithLoom = teams.filter(t => !!t.loomVideoUrl).length;
    const submissionsComplete = teams.filter(t => !!t.githubUrl && !!t.loomVideoUrl).length;
    const submissionsMissing = teams.filter(t => !t.githubUrl || !t.loomVideoUrl).length;

    // Check-in
    const checkedInTeams = teams.filter(t => t.checkedIn).length;
    const checkInRate = teams.length > 0 ? Math.round((checkedInTeams / teams.length) * 100) : 0;

    // Abstract review stage
    const pendingReviews = teams.filter(t => !t.reviewerNotes && t.selectionStage === 'ROUND_0_APPLICANT').length;
    const semiFinalists = teams.filter(t => t.selectionStage === 'ONLINE_SEMI_FINALIST').length;
    const finalists = teams.filter(t => t.selectionStage === 'ON_CAMPUS_QUALIFIED').length;
    const disqualified = teams.filter(t => t.selectionStage === 'DISQUALIFIED').length;

    // Total participants
    const totalBuilders = teams.reduce((acc, t) => acc + (t.members ? t.members.length : 0), 0);
    const confirmedBuilders = teams.reduce((acc, t) => acc + (t.members ? t.members.filter(m => m.confirmed).length : 0), 0);

    return {
      totalRegistrations: studentAccounts.length + waitlist.length,
      totalStudentAccounts: studentAccounts.length,
      totalWaitlist: waitlist.length,
      totalTeams: teams.length,
      totalBuilders,
      confirmedBuilders,
      teamsByTrack,
      pendingReviews,
      semiFinalists,
      finalists,
      disqualified,
      submissions: {
        total: teams.length,
        withGithub: submissionsWithGithub,
        withLoom: submissionsWithLoom,
        complete: submissionsComplete,
        missing: submissionsMissing,
      },
      checkin: {
        totalTeams: teams.length,
        checkedInTeams,
        rate: checkInRate,
      },
      judges: {
        total: judges.length,
        active: judges.filter(j => j.isActive).length,
        evaluationsCount: evaluations.length,
      },
      sponsors: {
        total: sponsors.length,
      },
      recentLogs: auditLogs.slice(0, 20),
    };
  },


  // --------------------------------------------------------------------------
  // STUDENT AUTHENTICATION & IDENTITY MANAGEMENT
  // --------------------------------------------------------------------------
  getStudentByEmail(email: string): StudentAccount | undefined {
    const store = readStore();
    const norm = email.trim().toLowerCase();
    return (store.studentAccounts || []).find(s => s.email.toLowerCase() === norm);
  },

  getStudentById(id: string): StudentAccount | undefined {
    const store = readStore();
    return (store.studentAccounts || []).find(s => s.id === id);
  },

  registerStudent(data: {
    email: string;
    password: string;
    fullName: string;
    institution?: string;
    phone?: string;
    department?: string;
    yearOfStudy?: string;
    tshirtSize?: string;
  }): { success: boolean; account?: StudentAccount; verificationToken?: string; error?: string } {
    const store = readStore();
    const norm = data.email.trim().toLowerCase();

    if (!store.studentAccounts) {
      store.studentAccounts = [];
    }

    if (store.studentAccounts.some(s => s.email.toLowerCase() === norm)) {
      return { success: false, error: 'EMAIL_ALREADY_REGISTERED' };
    }

    const id = `prof-${crypto.createHash('sha256').update(norm).digest('hex').substring(0, 16)}`;
    const passwordHash = hashPassword(data.password);
    const verificationToken = generateVerificationToken(norm);

    const newAccount: StudentAccount = {
      id,
      email: norm,
      fullName: data.fullName.trim(),
      passwordHash,
      emailVerified: false,
      institution: (data.institution || 'Sathyabama Institute of Science and Technology').trim(),
      phone: data.phone?.trim(),
      department: data.department?.trim(),
      yearOfStudy: data.yearOfStudy,
      tshirtSize: data.tshirtSize,
      createdAt: new Date().toISOString()
    };

    store.studentAccounts.push(newAccount);
    writeStore(store);

    return {
      success: true,
      account: newAccount,
      verificationToken
    };
  },

  verifyStudentEmail(token: string): { success: boolean; account?: StudentAccount; error?: string } {
    const verification = verifyEmailToken(token);
    if (!verification.valid || !verification.email) {
      return { success: false, error: verification.expired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN' };
    }

    const store = readStore();
    if (!store.studentAccounts) store.studentAccounts = [];

    const norm = verification.email.toLowerCase();
    const account = store.studentAccounts.find(s => s.email.toLowerCase() === norm);

    if (!account) {
      return { success: false, error: 'ACCOUNT_NOT_FOUND' };
    }

    account.emailVerified = true;
    account.emailVerifiedAt = new Date().toISOString();

    // Link existing waitlist registration now that email identity is verified
    for (const w of store.waitlist) {
      if (w.email.trim().toLowerCase() === norm) {
        (w as any).profile_id = account.id;
      }
    }

    writeStore(store);
    return { success: true, account };
  },

  authenticateStudent(email: string, password: string): { success: boolean; account?: StudentAccount; error?: string } {
    const store = readStore();
    const norm = email.trim().toLowerCase();
    const account = (store.studentAccounts || []).find(s => s.email.toLowerCase() === norm);

    if (!account) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    const isValid = verifyPassword(password, account.passwordHash);
    if (!isValid) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    account.lastLoginAt = new Date().toISOString();
    writeStore(store);

    return { success: true, account };
  },

  requestPasswordReset(email: string): { success: boolean; resetToken?: string; error?: string } {
    const student = this.getStudentByEmail(email);
    if (!student) {
      // Security: Never reveal whether an email is registered
      return { success: true };
    }
    const resetToken = generatePasswordResetToken(student.email);
    return { success: true, resetToken };
  },

  resetStudentPassword(token: string, newPassword: string): { success: boolean; error?: string } {
    const result = verifyPasswordResetToken(token);
    if (!result.valid || !result.email) {
      return { success: false, error: result.expired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN' };
    }

    const store = readStore();
    const norm = result.email.toLowerCase();
    const account = (store.studentAccounts || []).find(s => s.email.toLowerCase() === norm);

    if (!account) {
      return { success: false, error: 'ACCOUNT_NOT_FOUND' };
    }

    account.passwordHash = hashPassword(newPassword);
    writeStore(store);

    return { success: true };
  },

  updateStudentProfile(id: string, updates: Partial<StudentAccount>): { success: boolean; account?: StudentAccount; error?: string } {
    const store = readStore();
    const account = (store.studentAccounts || []).find(s => s.id === id);

    if (!account) {
      return { success: false, error: 'ACCOUNT_NOT_FOUND' };
    }

    if (updates.fullName) account.fullName = updates.fullName.trim();
    if (updates.phone !== undefined) account.phone = updates.phone;
    if (updates.institution) account.institution = updates.institution.trim();
    if (updates.department !== undefined) account.department = updates.department;
    if (updates.yearOfStudy !== undefined) account.yearOfStudy = updates.yearOfStudy;
    if (updates.portfolioUrl !== undefined) account.portfolioUrl = updates.portfolioUrl;
    if (updates.githubUrl !== undefined) account.githubUrl = updates.githubUrl;
    if (updates.linkedinUrl !== undefined) account.linkedinUrl = updates.linkedinUrl;
    if (updates.tshirtSize !== undefined) account.tshirtSize = updates.tshirtSize;

    writeStore(store);
    return { success: true, account };
  },

  getStudentTeam(email: string): ParticipantTeam | null {
    const store = readStore();
    const norm = email.trim().toLowerCase();
    const team = store.teams.find(t => 
      t.leaderEmail.toLowerCase() === norm ||
      (t.members || []).some(m => m.email.toLowerCase() === norm)
    );
    return team || null;
  },

  getStudentWaitlist(email: string): WaitlistEntry | null {
    const store = readStore();
    const norm = email.trim().toLowerCase();
    const entry = store.waitlist.find(w => w.email.trim().toLowerCase() === norm);
    return entry || null;
  },

  // Notification Logs Operations
  getNotificationLogs(limit = 100): NotificationLog[] {
    const store = readStore();
    return (store.notificationLogs || []).slice(0, limit);
  },

  addNotificationLog(log: Omit<NotificationLog, 'id' | 'timestamp'>): NotificationLog {
    const store = readStore();
    const newLog: NotificationLog = {
      ...log,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString()
    };
    if (!store.notificationLogs) store.notificationLogs = [];
    store.notificationLogs.unshift(newLog);
    if (store.notificationLogs.length > 1000) {
      store.notificationLogs = store.notificationLogs.slice(0, 1000);
    }
    writeStore(store);
    return newLog;
  },

  getNotificationByIdempotencyKey(key: string): NotificationLog | undefined {
    const store = readStore();
    return (store.notificationLogs || []).find(l => l.idempotencyKey === key);
  },

  // PostgreSQL Architecture Access
  pg: postgresDb,
  getDriver(): 'json' | 'supabase' {
    return process.env.KAIROS_DB_DRIVER === 'supabase' && postgresDb.isAvailable() ? 'supabase' : 'json';
  }
};

export { postgresDb };
