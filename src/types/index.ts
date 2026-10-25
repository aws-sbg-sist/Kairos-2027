export interface WaitlistEntry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  institution: string;
  college?: string;
  yearOfStudy: string;
  department: string;
  preferredTrack: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  meetupProfileUrl?: string;
  meetupMemberId?: string;
  meetupRsvpVerified?: boolean;
  awsBuilderCenterUrl?: string;
  teamStatus?: string;
  teamCode?: string;
  experienceLevel?: string;
  tShirtSize?: string;
  motivation?: string;
  status?: 'pending' | 'reviewed' | 'shortlisted' | 'waitlisted' | 'rejected';
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface TeamRadarSignal {
  id: string;
  builderName: string;
  role: 'AI / ML Specialist' | 'Fullstack Engineer' | 'Systems & DevOps' | 'Web3 & Security' | 'UI/UX & Frontend';
  trackId: string;
  skills: string[];
  college: string;
  seeking: string;
  contactUrl: string;
  createdAt: string;
}

export interface SponsorInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone?: string;
  interestedTier: 'title' | 'powered_by' | 'gold' | 'track' | 'in_kind' | 'custom';
  customRequirements?: string;
  status: 'new' | 'contacted' | 'negotiation' | 'confirmed' | 'archived';
  createdAt: string;
}

export interface SponsorReferralLead {
  id: string;
  referralCode?: string; // e.g. 'RAIN-8921'
  referrerName?: string;
  referrerEmail?: string;
  referrerPhone?: string;
  referrerCollege?: string;
  referrerUpiId?: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  studentCollege?: string;
  companyName: string;
  decisionMakerName?: string;
  decisionMakerEmail?: string;
  decisionMakerDesignation?: string;
  estimatedDealTier?: string;
  notes?: string;
  companyPocName?: string;
  companyPocRole?: string;
  companyPocContact?: string;
  targetTier?: string;
  introContext?: string;
  lockExpiryDate: string; // 21 days from submission
  status: 'LEAD_SUBMITTED' | 'DISCOVERY_SCHEDULED' | 'PROPOSAL_PITCHED' | 'DEAL_CLOSED' | 'PAYOUT_CLEARED' | 'PENDING_REVIEW' | 'IN_DISCUSSIONS' | 'CONTRACT_SIGNED' | 'PAID_OUT';
  commissionRate?: string;
  estimatedPayout?: string;
  payoutAmount?: number;
  submittedAt: string;
}

export interface FeatureFlags {
  registrationOpen: boolean;
  prizePoolConfirmed: boolean;
  demoSandboxMode: boolean;
  announcementBanner: string;
  registrationDeadline: string;
}

export interface OrganizerAccount {
  id: string;
  name: string;
  role: string;
  department: string;
  registerNo?: string;
  email: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  organizerName: string;
  action: string;
  details: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  collegeRegNo?: string;
  role: 'Leader' | 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX';
  college: string;
  meetupProfileUrl?: string;
  meetupMemberId?: string;
  meetupRsvpVerified?: boolean;
  awsBuilderCenterUrl?: string;
  tshirtSize?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  hoodieSize?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  busRoute?: string;
  confirmed: boolean;
}

export interface ParticipantTeam {
  id: string;
  teamCode?: string; // e.g. 'KAIROS-T042'
  teamName: string;
  inviteCode: string;
  trackId: string;
  institutionName?: string;
  city?: string;
  state?: string;
  leaderEmail: string;
  selectionStage?: 'ROUND_0_APPLICANT' | 'ONLINE_SEMI_FINALIST' | 'ON_CAMPUS_QUALIFIED' | 'DISQUALIFIED';
  status?: string;
  members: TeamMember[];
  problemTitle?: string;
  problemAbstract?: string;
  projectTitle?: string;
  projectAbstract?: string;
  architecturePdfUrl?: string;
  githubUrl?: string;
  commitWebhookSecret?: string;
  
  // Round 1 Online Qualifier
  loomVideoUrl?: string;
  onlineQualifierScore?: number;
  onlineDefenseSlot?: string;
  onlineMeetRoomId?: string;

  // Round 2 On-Campus
  deskBayAllocation?: string;
  checkedIn?: boolean;
  checkedInAt?: string;
  
  // AWS Credits
  awsCreditVoucher?: string;
  createdAt: string;
}

export interface Judge {
  id: string;
  accessPin: string;
  fullName: string;
  organization: string;
  designation: string;
  trackSpecialization?: string;
  assignedHall?: string;
  isActive: boolean;
}

export interface CheckpointEvaluation {
  id: string;
  teamId: string;
  judgeId: string;
  checkpointGate: 0 | 1 | 2 | 3; // 0: Online Qual, 1: Arch, 2: Code, 3: Grand Demo
  criterion1Score: number; // Max 30
  criterion2Score: number; // Max 25
  criterion3Score: number; // Max 25
  criterion4Score: number; // Max 20
  rawTotalScore: number;
  normalizedZScore?: number;
  qualitativeFeedback?: string;
  recusedConflict?: boolean;
  evaluatedAt: string;
}

export interface CSATResponse {
  id: string;
  teamMemberId?: string;
  overallSatisfaction: number; // 1 to 5
  npsScore: number; // 0 to 10
  cloudServicesUsed: string[];
  pursuingAwsCertification: 'YES' | 'NO' | 'ALREADY_CERTIFIED';
  eventFeedback: string;
  testimonialQuote?: string;
  submittedAt: string;
}

export interface OrgMember {
  id: string;
  username: string; // URL slug
  fullName: string;
  roleTitle: string;
  registerNo?: string;
  tier: 'APEX_PRESIDENT' | 'SUPER_HEAD' | 'SUB_HEAD' | 'CORE_LEAD' | 'CREW_VOLUNTEER' | 'FACULTY_ADVISOR';
  isHigherManagement: boolean;
  division: string;
  displayOrder: number;
  photoUrl: string;
  bio: string;
  builderPhilosophyQuote?: string;
  academicDepartment: string;
  graduationYear?: number;
  awsCertifications: string[];
  awsBuilderCenterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  badges: string[];
  contributions: {
    category: string;
    title: string;
    description: string;
    impact: string;
    badgeTier: 'DIAMOND' | 'PLATINUM' | 'GOLD' | 'SILVER';
    verificationHash: string;
  }[];
}
