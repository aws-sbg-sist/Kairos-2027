export type AdminTab =
  | 'analytics'
  | 'teams'
  | 'abstracts'
  | 'submissions'
  | 'judges'
  | 'checkin'
  | 'waitlist'
  | 'sponsors'
  | 'flags'
  | 'audit';

export interface AdminLead {
  id: string;
  name: string;
  role: string;
  department: string;
  pipelineName: string;
  pipelineDescription: string;
  allowedTabs: AdminTab[];
  envVarName: string;
  badgeColor: string;
}

export const ADMIN_LEADS: AdminLead[] = [
  {
    id: 'org-thenappan',
    name: 'Thenappan T',
    role: 'President & Student Builder Group Leader (SBGL)',
    department: 'Department of Computer Science & Engineering, SIST',
    pipelineName: 'Apex Directorate & Macro Governance',
    pipelineDescription: 'Complete administrative oversight across all tournament pipelines, evaluations, and infrastructure.',
    allowedTabs: ['analytics', 'teams', 'abstracts', 'submissions', 'judges', 'checkin', 'waitlist', 'sponsors', 'flags', 'audit'],
    envVarName: 'LEAD_PASSKEY_THENAPPAN',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/40'
  },
  {
    id: 'org-nikki',
    name: 'Nangaiyar M (Nikki)',
    role: 'Chief Partnership & Finance Officer (CPFO)',
    department: 'Department of Computer Science & Engineering, SIST',
    pipelineName: 'Corporate Sponsorships, Finance & Partner Grants',
    pipelineDescription: 'Enterprise partner intake, tier commitments, sponsorship deliverables, and corporate communication.',
    allowedTabs: ['sponsors', 'analytics', 'waitlist', 'audit'],
    envVarName: 'LEAD_PASSKEY_NIKKI',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40'
  },
  {
    id: 'org-shanmuga',
    name: 'Shanmugapriyan',
    role: 'Chief Technology & Infrastructure Officer (CTO)',
    department: 'Department of Computer Science & Engineering, SIST',
    pipelineName: 'Technical Architecture, Git Telemetry & Code Freeze',
    pipelineDescription: 'Round 0 problem abstracts, Round 1 code repositories, Loom screencasts, and AWS credit vouchers.',
    allowedTabs: ['teams', 'abstracts', 'submissions', 'analytics', 'flags', 'audit'],
    envVarName: 'LEAD_PASSKEY_SHANMUGA',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40'
  },
  {
    id: 'org-viswa',
    name: 'Viswanathan Ashok',
    role: 'Chief Operating Officer (COO)',
    department: 'Department of Computer Science & Engineering, SIST',
    pipelineName: 'Arena Logistics, Bay Allocation & On-Campus Check-In',
    pipelineDescription: 'Physical desk bay allocation across 100 bays, live QR/barcode check-in scanner, and venue transit.',
    allowedTabs: ['checkin', 'teams', 'analytics', 'audit'],
    envVarName: 'LEAD_PASSKEY_VISWA',
    badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-950/40'
  },
  {
    id: 'org-hemavarshine',
    name: 'Hemavarshine S',
    role: 'Chief Experience Officer (CXO)',
    department: 'Department of Computer Science & Engineering, SIST',
    pipelineName: 'Builder Experience, Squad Rosters & CSAT Analytics',
    pipelineDescription: 'Team roster verification, builder kit sizing, dietary requirements, and post-hackathon feedback.',
    allowedTabs: ['teams', 'waitlist', 'analytics', 'audit'],
    envVarName: 'LEAD_PASSKEY_HEMA',
    badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-950/40'
  },
  {
    id: 'org-rikish',
    name: 'Rikish B & Caroline Mary',
    role: 'Chief Creative & Media Officers (CCMO)',
    department: 'Department of Computer Science & Engineering, SIST',
    pipelineName: 'Media Broadcast, Auditorium Telemetry & Announcements',
    pipelineDescription: 'Live stage screen announcements, broadcast alerts, leaderboard displays, and social media coverage.',
    allowedTabs: ['flags', 'analytics', 'teams', 'audit'],
    envVarName: 'LEAD_PASSKEY_MEDIA',
    badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-950/40'
  },
  {
    id: 'org-faculty',
    name: 'Faculty Advisory (Dr. K. Ashok Kumar & Dr. Balapriya S)',
    role: 'Faculty Coordinator & Institutional Governance',
    department: 'Department of Computer Science & Engineering, SIST',
    pipelineName: 'Institutional Compliance, Academic Sanction & Audit',
    pipelineDescription: 'Official institutional review, compliance logging, department reporting, and university administrative filings.',
    allowedTabs: ['analytics', 'teams', 'judges', 'sponsors', 'audit'],
    envVarName: 'LEAD_PASSKEY_FACULTY',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40'
  }
];

export function canAccessTab(allowedTabs: AdminTab[], tab: AdminTab): boolean {
  return allowedTabs.includes(tab);
}
