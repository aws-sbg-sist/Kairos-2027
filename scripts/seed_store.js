const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, '..', 'data', 'kairos_store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

store.teams = [
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
];

fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8');
console.log('Seeded 3 teams into kairos_store.json successfully.');
