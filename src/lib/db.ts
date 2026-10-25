import fs from 'fs';
import path from 'path';
import { WaitlistEntry, SponsorInquiry, FeatureFlags, AuditLog, ParticipantTeam, TeamRadarSignal } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const JSON_FILE = path.join(DATA_DIR, 'kairos_store.json');

interface StoreSchema {
  waitlist: WaitlistEntry[];
  sponsors: SponsorInquiry[];
  featureFlags: FeatureFlags;
  auditLogs: AuditLog[];
  teams: ParticipantTeam[];
  radarSignals?: TeamRadarSignal[];
}

const DEFAULT_STORE: StoreSchema = {
  waitlist: [
    {
      id: 'demo-w1',
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      institution: 'IIT Madras',
      yearOfStudy: '3rd Year',
      department: 'Computer Science & Engineering',
      preferredTrack: 'Agentic AI & Generative Workflows',
      portfolioUrl: 'https://github.com/aarav',
      motivation: 'Building autonomous distributed agent systems for verifiable research synthesis.',
      createdAt: '2026-10-24T10:15:00.000Z'
    },
    {
      id: 'demo-w2',
      fullName: 'Pooja Venkatesh',
      email: 'pooja.v@example.edu',
      institution: 'Sathyabama Institute of Science and Technology',
      yearOfStudy: '4th Year',
      department: 'School of Computing',
      preferredTrack: 'Cloud-Native Distributed Systems',
      portfolioUrl: 'https://github.com/pooja-v',
      motivation: 'Exploring high-throughput distributed transaction settlement with event-driven consensus.',
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
      customRequirements: 'Interested in hosting a 10-minute technical masterclass on distributed vector indexing.',
      status: 'contacted',
      createdAt: '2026-10-23T11:00:00.000Z'
    }
  ],
  featureFlags: {
    registrationOpen: false, // Strict public gating as agreed
    prizePoolConfirmed: false, // Strict unconfirmed rule until admin toggle
    demoSandboxMode: true, // Sandbox preview toggle for organizers
    announcementBanner: 'KAIROS 2027 Early-Interest Waitlist is now live! Reserve your team priority.',
    registrationDeadline: '2027-01-06T23:59:59+05:30'
  },
  auditLogs: [
    {
      id: 'log-1',
      timestamp: '2026-10-25T09:00:00.000Z',
      organizerName: 'System Bootstrap',
      action: 'INIT_STORE',
      details: 'Initialized KAIROS 2027 persistent store with verified organizer roster and proposed tiers.'
    }
  ],
  teams: [
    {
      id: 'team-k75-01',
      teamName: 'Chronos Distributed',
      inviteCode: 'KAIROS-7721',
      trackId: 'cloud-native',
      leaderEmail: 'pooja.v@example.edu',
      status: 'shortlisted',
      members: [
        { id: 'm1', name: 'Pooja Venkatesh', email: 'pooja.v@example.edu', role: 'Leader', college: 'SIST', confirmed: true },
        { id: 'm2', name: 'Rohan Gupta', email: 'rohan.g@example.edu', role: 'Backend', college: 'SIST', confirmed: true },
        { id: 'm3', name: 'Swetha K', email: 'swetha.k@example.edu', role: 'AI / Cloud', college: 'SIST', confirmed: true },
        { id: 'm4', name: 'Aditya Nair', email: 'aditya.n@example.edu', role: 'UI/UX', college: 'SIST', confirmed: true }
      ],
      projectTitle: 'Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry',
      projectAbstract: 'A fault-tolerant stream processing engine handling 100k events/sec with distributed consensus and zero data loss.',
      githubUrl: 'https://github.com/kairos2027/chronos-stream',
      createdAt: '2026-10-25T08:00:00.000Z'
    }
  ],
  radarSignals: [
    {
      id: 'sig-1',
      builderName: 'Vikram Sundaram',
      role: 'AI / ML Specialist',
      trackId: 'agentic-ai',
      skills: ['LangGraph', 'Llama 3.3', 'FastAPI', 'Vector Search'],
      college: 'Sathyabama Institute of Science and Technology',
      seeking: 'Looking for a solid Frontend/Web engineer and DevOps builder to form a 4-person team for multi-agent autonomous consensus.',
      contactUrl: 'https://github.com/vikram-sundaram',
      createdAt: '2026-10-25T07:30:00.000Z'
    },
    {
      id: 'sig-2',
      builderName: 'Ananya Deshmukh',
      role: 'Systems & DevOps',
      trackId: 'cloud-native',
      skills: ['Rust', 'gRPC', 'Kubernetes', 'Apache Kafka'],
      college: 'IIT Madras',
      seeking: 'Distributed systems engineer looking for a backend architect and UI builder to tackle sub-millisecond event streaming.',
      contactUrl: 'https://github.com/ananya-desh',
      createdAt: '2026-10-25T08:15:00.000Z'
    },
    {
      id: 'sig-3',
      builderName: 'Rohan Iyer',
      role: 'Web3 & Security',
      trackId: 'web3-security',
      skills: ['Solidity', 'Foundry', 'Zero-Knowledge Proofs', 'EVM'],
      college: 'Anna University, CEG',
      seeking: 'Smart contract security researcher seeking frontend engineer (Next.js/Wagmi) for verifiable decentralized credential escrow.',
      contactUrl: 'https://github.com/rohan-iyer',
      createdAt: '2026-10-25T09:00:00.000Z'
    },
    {
      id: 'sig-4',
      builderName: 'Sneha Patel',
      role: 'UI/UX & Frontend',
      trackId: 'fintech-trust',
      skills: ['React', 'Three.js', 'Tailwind', 'Design Systems'],
      college: 'Sathyabama Institute of Science and Technology',
      seeking: 'Frontend & motion designer looking for Python/FastAPI builders to craft a high-fidelity fraud surveillance dashboard.',
      contactUrl: 'https://github.com/sneha-patel',
      createdAt: '2026-10-25T09:45:00.000Z'
    }
  ]
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
    return JSON.parse(raw);
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
      return { success: false, error: 'This email address is already on the KAIROS 2027 early-interest list!' };
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

  updateSponsorStatus(id: string, status: SponsorInquiry['status'], organizer: string): boolean {
    const store = readStore();
    const item = store.sponsors.find(s => s.id === id);
    if (!item) return false;
    item.status = status;
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      organizerName: organizer,
      action: 'UPDATE_SPONSOR_STATUS',
      details: `Changed sponsor [${item.companyName}] status to ${status}`
    });
    writeStore(store);
    return true;
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

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    const store = readStore();
    return store.auditLogs.slice(0, 50);
  },

  addAuditLog(organizer: string, action: string, details: string) {
    const store = readStore();
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      organizerName: organizer,
      action,
      details
    });
    writeStore(store);
  },

  // Teams (Participant Portal)
  getTeams(): ParticipantTeam[] {
    const store = readStore();
    return store.teams;
  },

  getTeamByCode(code: string): ParticipantTeam | undefined {
    const store = readStore();
    return store.teams.find(t => t.inviteCode.toUpperCase() === code.trim().toUpperCase());
  },

  createTeam(teamData: Omit<ParticipantTeam, 'id' | 'inviteCode' | 'status' | 'createdAt'>): ParticipantTeam {
    const store = readStore();
    const newTeam: ParticipantTeam = {
      ...teamData,
      id: `team-${Date.now()}`,
      inviteCode: `KAIROS-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    store.teams.push(newTeam);
    writeStore(store);
    return newTeam;
  },

  // Waitlist Status Update
  updateWaitlistStatus(id: string, status: NonNullable<WaitlistEntry['status']>, organizer: string): boolean {
    const store = readStore();
    const entry = store.waitlist.find(w => w.id === id);
    if (!entry) return false;
    entry.status = status;
    store.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      organizerName: organizer,
      action: 'UPDATE_WAITLIST_STATUS',
      details: `Changed candidate [${entry.fullName}] status to ${status}`
    });
    writeStore(store);
    return true;
  },

  // Team Radar Signals
  getRadarSignals(): TeamRadarSignal[] {
    const store = readStore();
    const signals = store.radarSignals || DEFAULT_STORE.radarSignals || [];
    return [...signals].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  addRadarSignal(signal: Omit<TeamRadarSignal, 'id' | 'createdAt'>): TeamRadarSignal {
    const store = readStore();
    if (!store.radarSignals) {
      store.radarSignals = [...(DEFAULT_STORE.radarSignals || [])];
    }
    const newSignal: TeamRadarSignal = {
      ...signal,
      id: `sig-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    store.radarSignals.unshift(newSignal);
    writeStore(store);
    return newSignal;
  },

  // Real-time Analytics Metrics
  getMetrics() {
    const store = readStore();
    const waitlist = store.waitlist;
    const sponsors = store.sponsors;
    const radar = store.radarSignals || DEFAULT_STORE.radarSignals || [];

    const tracksDistribution: Record<string, number> = {};
    const statusCounts: Record<string, number> = {
      pending: 0,
      reviewed: 0,
      shortlisted: 0,
      waitlisted: 0,
      rejected: 0,
    };
    const institutions = new Set<string>();

    waitlist.forEach(w => {
      tracksDistribution[w.preferredTrack] = (tracksDistribution[w.preferredTrack] || 0) + 1;
      const st = w.status || 'pending';
      statusCounts[st] = (statusCounts[st] || 0) + 1;
      if (w.institution) institutions.add(w.institution.trim().toLowerCase());
    });

    return {
      totalWaitlist: waitlist.length,
      totalSponsors: sponsors.length,
      totalRadarSignals: radar.length,
      uniqueColleges: institutions.size,
      tracksDistribution,
      statusCounts,
    };
  }
};
