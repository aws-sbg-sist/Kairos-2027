export interface WaitlistEntry {
  id: string;
  fullName: string;
  email: string;
  institution: string;
  yearOfStudy: string;
  department: string;
  preferredTrack: string;
  portfolioUrl?: string;
  motivation?: string;
  ipAddress?: string;
  userAgent?: string;
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
  role: 'Leader' | 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX';
  college: string;
  confirmed: boolean;
}

export interface ParticipantTeam {
  id: string;
  teamName: string;
  inviteCode: string;
  trackId: string;
  leaderEmail: string;
  status: 'draft' | 'submitted' | 'under_review' | 'shortlisted' | 'waitlist' | 'confirmed';
  members: TeamMember[];
  projectTitle?: string;
  projectAbstract?: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string;
}
