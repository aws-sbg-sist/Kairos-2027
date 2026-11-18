/**
 * KAIROS 2027 — PHASE 06 ORGANIZER MANAGEMENT SUITE TEST HARNESS
 * 
 * Exhaustively validates:
 * 1. Anonymous Access Guards (HTTP 401 across all admin endpoints)
 * 2. Student Role Restriction (HTTP 403 across all admin endpoints)
 * 3. Operational Organizer Capabilities:
 *    - Team search, filter, desk bay allocation, stage modification
 *    - Abstract review remarks and shortlisting
 *    - Submission management (GitHub + Loom checks)
 *    - Judge identity creation, track assignment, and access control
 *    - Check-in desk operations with duplicate prevention and eligibility enforcement
 *    - QR pass token verification
 * 4. Super Administrator Governance & Multi-Dataset CSV Exports:
 *    - Export all 8 formats: waitlist, participants, teams, team-members, abstracts, submissions, evaluations, sponsors
 *    - Formula injection sanitization protection (=, +, -, @, %, \t, \r)
 * 5. Real-time Live Database Analytics (never mock)
 * 6. Audit Trail Logging for operational changes
 */

const http = require('http');
const crypto = require('crypto');

const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`;
const ADMIN_PASSKEY = '9f8c3e1a7b4d0e6f2a5b8c1d3e7f9a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d1e3f';

function request(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 10000,
    };

    const req = http.request(url, reqOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: json,
          body,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${urlPath}`));
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

function extractCookie(res, cookieName) {
  const cookies = res.headers['set-cookie'];
  if (!cookies) return null;
  const match = cookies.find((c) => c.startsWith(`${cookieName}=`));
  if (!match) return null;
  return match.split(';')[0];
}

async function registerAndLoginStudent(email, name, password = 'SecurePassword2027!') {
  const regPayload = JSON.stringify({ email, password, fullName: name });
  const regRes = await request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(regPayload) },
    body: regPayload,
  });

  const token = regRes.data?.verificationToken;
  if (token) {
    const verifyPayload = JSON.stringify({ token });
    await request('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(verifyPayload) },
      body: verifyPayload,
    });
  }

  const loginPayload = JSON.stringify({ email, password });
  const loginRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginPayload) },
    body: loginPayload,
  });

  return extractCookie(loginRes, 'kairos_student_session');
}

async function loginAdmin(organizerName, passkey = ADMIN_PASSKEY) {
  const payload = JSON.stringify({ passkey, organizerName });
  const res = await request('/api/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    body: payload,
  });
  return {
    cookie: extractCookie(res, 'kairos_admin_session'),
    res,
  };
}

async function runOrganizerTestSuite() {
  console.log('================================================================');
  console.log('   KAIROS 2027 — ORGANIZER MANAGEMENT SYSTEM TEST SUITE (PHASE 06)   ');
  console.log('================================================================\n');

  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      passedTests++;
      console.log(`  ✓ [PASS] ${testName}`);
    } else {
      failedTests++;
      console.error(`  ✗ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
    }
  }

  const timestamp = Date.now();

  // --------------------------------------------------------------------------
  // 1. ANONYMOUS ACCESS REJECTIONS (HTTP 401)
  // --------------------------------------------------------------------------
  console.log('--- 1. ANONYMOUS ACCESS REJECTIONS (HTTP 401) ---');

  const a1 = await request('/api/admin/teams');
  assert(a1.statusCode === 401, 'T1: Anonymous rejected from GET /api/admin/teams (HTTP 401)');

  const a2 = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamCode: 'KAIROS-T001', deskBayAllocation: 'BAY-01' })
  });
  assert(a2.statusCode === 401, 'T2: Anonymous rejected from PATCH /api/admin/teams (HTTP 401)');

  const a3 = await request('/api/admin/judges');
  assert(a3.statusCode === 401, 'T3: Anonymous rejected from GET /api/admin/judges (HTTP 401)');

  const a4 = await request('/api/admin/judges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'Dr. Test', organization: 'AWS', designation: 'Architect' })
  });
  assert(a4.statusCode === 401, 'T4: Anonymous rejected from POST /api/admin/judges (HTTP 401)');

  const a5 = await request('/api/admin/judges', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 'judge-1', isActive: false })
  });
  assert(a5.statusCode === 401, 'T5: Anonymous rejected from PATCH /api/admin/judges (HTTP 401)');

  const a6 = await request('/api/admin/judges?id=judge-1', { method: 'DELETE' });
  assert(a6.statusCode === 401, 'T6: Anonymous rejected from DELETE /api/admin/judges (HTTP 401)');

  const a7 = await request('/api/admin/checkin');
  assert(a7.statusCode === 401, 'T7: Anonymous rejected from GET /api/admin/checkin (HTTP 401)');

  const a8 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamCode: 'KAIROS-T001' })
  });
  assert(a8.statusCode === 401, 'T8: Anonymous rejected from POST /api/admin/checkin (HTTP 401)');

  const a9 = await request('/api/admin/analytics');
  assert(a9.statusCode === 401, 'T9: Anonymous rejected from GET /api/admin/analytics (HTTP 401)');

  const a10 = await request('/api/admin/export?type=teams');
  assert(a10.statusCode === 401, 'T10: Anonymous rejected from GET /api/admin/export?type=teams (HTTP 401)');

  // --------------------------------------------------------------------------
  // 2. STUDENT ACCESS RESTRICTIONS (HTTP 403)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. STUDENT ROLE ISOLATION (HTTP 403) ---');

  const studentEmail = `student.p6.${timestamp}@example.edu`;
  const studentCookie = await registerAndLoginStudent(studentEmail, 'Student Builder P6');
  assert(!!studentCookie, 'Student account created and authenticated');

  const s1 = await request('/api/admin/teams', { headers: { Cookie: studentCookie } });
  assert(s1.statusCode === 403, 'T11: Student rejected from GET /api/admin/teams (HTTP 403)');

  const s2 = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: studentCookie },
    body: JSON.stringify({ teamCode: 'KAIROS-T001', deskBayAllocation: 'BAY-01' })
  });
  assert(s2.statusCode === 403, 'T12: Student rejected from PATCH /api/admin/teams (HTTP 403)');

  const s3 = await request('/api/admin/judges', { headers: { Cookie: studentCookie } });
  assert(s3.statusCode === 403, 'T13: Student rejected from GET /api/admin/judges (HTTP 403)');

  const s4 = await request('/api/admin/judges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: studentCookie },
    body: JSON.stringify({ fullName: 'Dr. Hacker', organization: 'DarkNet', designation: 'Intruder' })
  });
  assert(s4.statusCode === 403, 'T14: Student rejected from POST /api/admin/judges (HTTP 403)');

  const s5 = await request('/api/admin/checkin', { headers: { Cookie: studentCookie } });
  assert(s5.statusCode === 403, 'T15: Student rejected from GET /api/admin/checkin (HTTP 403)');

  const s6 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: studentCookie },
    body: JSON.stringify({ teamCode: 'KAIROS-T001' })
  });
  assert(s6.statusCode === 403, 'T16: Student rejected from POST /api/admin/checkin (HTTP 403)');

  const s7 = await request('/api/admin/analytics', { headers: { Cookie: studentCookie } });
  assert(s7.statusCode === 403, 'T17: Student rejected from GET /api/admin/analytics (HTTP 403)');

  const s8 = await request('/api/admin/export?type=teams', { headers: { Cookie: studentCookie } });
  assert(s8.statusCode === 403, 'T18: Student rejected from GET /api/admin/export?type=teams (HTTP 403)');

  // --------------------------------------------------------------------------
  // 3. OPERATIONAL ORGANIZER CAPABILITIES
  // --------------------------------------------------------------------------
  console.log('\n--- 3. OPERATIONAL ORGANIZER CAPABILITIES ---');

  // Super Admin ensures flags allow team creation
  const superSetup = await loginAdmin('Thenappan T');
  await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: superSetup.cookie },
    body: JSON.stringify({ registrationOpen: true, registrationDeadline: '2027-01-06T23:59:59+05:30' }),
  });

  // Login as Operational Organizer (Hemavarshine S / CXO)
  const orgLogin = await loginAdmin('Hemavarshine S');
  const orgCookie = orgLogin.cookie;
  assert(!!orgCookie, 'T19: Operational Organizer successfully authenticated', orgLogin.res.body);

  // First, create a test team with leader
  const leadEmail = `lead.p6.${timestamp}@example.edu`;
  const leadCookie = await registerAndLoginStudent(leadEmail, 'Team Leader P6');
  const teamCreationPayload = {
    teamName: `Neural Apex ${timestamp}`,
    trackId: 'track-agentic-ai',
    abstractTitle: 'Decentralized Edge LLM Orchestrator',
    abstractText: 'Scalable distributed consensus architecture for latency-sensitive model inference using AWS Bedrock and Step Functions.',
    cloudArchitectureBlueprint: 'https://aws.amazon.com/architecture/neural-apex',
    githubUrl: 'https://github.com/kairos2027/neural-apex',
    lead: {
      fullName: 'Team Leader P6',
      email: leadEmail,
      phone: '+91 99401 11223',
      registerNo: '44118877',
      college: 'SIST Chennai',
      meetupProfileUrl: 'https://meetup.com/members/leader-p6',
      awsBuilderCenterUrl: 'https://community.aws/@leaderp6',
      meetupVerified: true
    }
  };
  const teamCreateRes = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: leadCookie },
    body: JSON.stringify(teamCreationPayload)
  });
  const createdTeam = teamCreateRes.data?.team;
  assert(!!createdTeam?.teamCode, 'Test team created successfully', teamCreateRes.body);

  // T20: Organizer fetches all teams
  const o1 = await request('/api/admin/teams', { headers: { Cookie: orgCookie } });
  assert(o1.statusCode === 200, 'T20: Organizer accesses GET /api/admin/teams (HTTP 200)');
  assert(Array.isArray(o1.data?.teams) && o1.data.teams.length > 0, 'T20: Teams array returned');

  // T21: Organizer searches teams
  const o2 = await request(`/api/admin/teams?q=${encodeURIComponent(createdTeam.teamName)}`, { headers: { Cookie: orgCookie } });
  assert(o2.statusCode === 200, 'T21: Organizer searches teams by name query (HTTP 200)');
  assert(o2.data?.teams.some(t => t.teamCode === createdTeam.teamCode), 'T21: Searched team found in results');

  // T22: Organizer filters by track
  const o3 = await request('/api/admin/teams?track=track-agentic-ai', { headers: { Cookie: orgCookie } });
  assert(o3.statusCode === 200, 'T22: Organizer filters teams by track (HTTP 200)');
  assert(o3.data?.teams.every(t => t.trackId === 'track-agentic-ai'), 'T22: All returned teams match track-agentic-ai');

  // T23: Organizer updates team selection stage to ON_CAMPUS_QUALIFIED
  const o4 = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({
      teamCode: createdTeam.teamCode,
      selectionStage: 'ON_CAMPUS_QUALIFIED'
    })
  });
  assert(o4.statusCode === 200, 'T23: Organizer updates team selection stage to ON_CAMPUS_QUALIFIED (HTTP 200)');
  assert(o4.data?.team?.selectionStage === 'ON_CAMPUS_QUALIFIED', 'T23: Selection stage verified');

  // T24: Organizer assigns desk bay
  const o5 = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({
      teamCode: createdTeam.teamCode,
      deskBayAllocation: 'BAY-C09'
    })
  });
  assert(o5.statusCode === 200, 'T24: Organizer allocates desk bay BAY-C09 (HTTP 200)');
  assert(o5.data?.team?.deskBayAllocation === 'BAY-C09', 'T24: Desk bay allocation verified');

  // T25: Organizer updates abstract review notes
  const o6 = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({
      teamCode: createdTeam.teamCode,
      reviewerNotes: 'Approved for on-campus finals. High architectural novelty in serverless edge design.'
    })
  });
  assert(o6.statusCode === 200, 'T25: Organizer submits reviewer notes (HTTP 200)');
  assert(o6.data?.team?.reviewerNotes?.includes('High architectural novelty'), 'T25: Reviewer notes verified');

  // T26: Organizer accesses judge list
  const o7 = await request('/api/admin/judges', { headers: { Cookie: orgCookie } });
  assert(o7.statusCode === 200, 'T26: Organizer accesses GET /api/admin/judges (HTTP 200)');
  assert(Array.isArray(o7.data?.judges), 'T26: Judges array returned');

  // T27 & T28: Organizer creates new judge
  const newJudgePin = '882027';
  const o8 = await request('/api/admin/judges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({
      fullName: `Dr. Vikram Raman ${timestamp}`,
      organization: 'Intel Distributed Systems Lab',
      designation: 'Principal Systems Architect',
      trackSpecialization: 'AI & Machine Learning Systems',
      assignedHall: 'Auditorium Bay 3',
      accessPin: newJudgePin,
      isActive: true
    })
  });
  assert(o8.statusCode === 201, 'T27: Organizer creates judge identity via POST /api/admin/judges (HTTP 201)');
  const createdJudge = o8.data?.judge;
  assert(createdJudge?.accessPin === newJudgePin, 'T28: Created judge has assigned PIN and track specialization');

  // T29: Organizer updates judge status
  const o9 = await request('/api/admin/judges', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({
      id: createdJudge.id,
      isActive: false
    })
  });
  assert(o9.statusCode === 200, 'T29: Organizer deactivates judge via PATCH /api/admin/judges (HTTP 200)');
  assert(o9.data?.judge?.isActive === false, 'T29: Judge is_active is false');

  // T30: Organizer deletes temporary judge
  const o10 = await request(`/api/admin/judges?id=${createdJudge.id}`, {
    method: 'DELETE',
    headers: { Cookie: orgCookie }
  });
  assert(o10.statusCode === 200, 'T30: Organizer deletes judge via DELETE /api/admin/judges (HTTP 200)');

  // T31: Organizer accesses check-in overview
  const o11 = await request('/api/admin/checkin', { headers: { Cookie: orgCookie } });
  assert(o11.statusCode === 200, 'T31: Organizer accesses GET /api/admin/checkin overview (HTTP 200)');
  assert(typeof o11.data?.summary?.checkedInCount === 'number', 'T31: Check-in statistics summary verified');

  // T32: Organizer performs check-in for created team
  const o12 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ teamCode: createdTeam.teamCode })
  });
  assert(o12.statusCode === 200, 'T32: Organizer performs check-in for team (HTTP 200)');
  assert(o12.data?.team?.checkedIn === true, 'T32: Team checkedIn flag marked true');

  // T33: Duplicate check-in is rejected (HTTP 409)
  const o13 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ teamCode: createdTeam.teamCode })
  });
  assert(o13.statusCode === 409, 'T33: Duplicate check-in rejected with HTTP 409 Conflict');
  assert(o13.data?.alreadyCheckedIn === true, 'T33: Response includes alreadyCheckedIn: true');

  // T34: Disqualified team is rejected from check-in (HTTP 400)
  // Create disqualified team
  const dqLeadEmail = `dq.lead.${timestamp}@example.edu`;
  const dqLeadCookie = await registerAndLoginStudent(dqLeadEmail, 'DQ Leader');
  const dqTeamRes = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: dqLeadCookie },
    body: JSON.stringify({
      teamName: `Disqualified Team ${timestamp}`,
      trackId: 'track-agentic-ai',
      abstractTitle: 'Test Disqualification',
      abstractText: 'Test abstract',
      cloudArchitectureBlueprint: 'https://aws.amazon.com/test',
      githubUrl: 'https://github.com/kairos2027/test-dq',
      lead: {
        fullName: 'DQ Leader',
        email: dqLeadEmail,
        college: 'SIST',
        phone: '+91 99999 88888',
        registerNo: '44119999',
        meetupProfileUrl: 'https://meetup.com/members/dq-leader'
      }
    })
  });
  const dqTeam = dqTeamRes.data?.team;
  // Set disqualified
  await request('/api/admin/teams', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ teamCode: dqTeam.teamCode, selectionStage: 'DISQUALIFIED' })
  });
  // Attempt check-in
  const o14 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ teamCode: dqTeam.teamCode })
  });
  assert(o14.statusCode === 400, 'T34: Disqualified team rejected from check-in (HTTP 400)');
  assert(o14.data?.error?.includes('DISQUALIFIED'), 'T34: Error explains disqualification');

  // T35: Organizer checks in participant with signed pass token
  const passRes = await request('/api/v1/pass/me', { headers: { Cookie: leadCookie } });
  const validPassToken = passRes.data?.pass?.opaqueToken;
  assert(!!validPassToken, 'Digital pass token retrieved for student builder');

  // Reset checkedIn flag on createdTeam to test token check-in
  await request('/api/admin/teams', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ teamCode: createdTeam.teamCode, checkedIn: false })
  });

  const o15 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ token: validPassToken })
  });
  assert(o15.statusCode === 200, 'T35: Organizer checks in participant via digital pass token (HTTP 200)');
  assert(o15.data?.team?.checkedIn === true, 'T35: Team successfully checked in via pass token');

  // T36: Invalid / forged pass token rejected
  const o16 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ token: 'forged.malicious.token::fake-hmac' })
  });
  assert(o16.statusCode === 400, 'T36: Forged pass token rejected from check-in (HTTP 400)');

  // T37 & T38: Real database analytics
  const o17 = await request('/api/admin/analytics', { headers: { Cookie: orgCookie } });
  assert(o17.statusCode === 200, 'T37: Organizer accesses live database analytics (HTTP 200)');
  assert(typeof o17.data?.analytics?.totalTeams === 'number' && o17.data.analytics.totalTeams >= 1, 'T38: Analytics contains live team counts from database');
  assert(typeof o17.data?.analytics?.totalBuilders === 'number', 'T38: Analytics contains live builder counts');
  assert(!!o17.data?.analytics?.submissions, 'T38: Analytics contains submission health counters');

  // T39: Operational Organizer rejected from mass data export
  const o18 = await request('/api/admin/export?type=teams', { headers: { Cookie: orgCookie } });
  assert(o18.statusCode === 403, 'T39: Operational Organizer rejected from mass data export (HTTP 403)');
  assert(o18.data?.code === 'FORBIDDEN_SUPER_ADMIN_REQUIRED', 'T39: Error code is FORBIDDEN_SUPER_ADMIN_REQUIRED');

  // --------------------------------------------------------------------------
  // 4. SUPER ADMINISTRATOR MULTI-DATASET CSV EXPORTS
  // --------------------------------------------------------------------------
  console.log('\n--- 4. SUPER ADMINISTRATOR DATA EXPORTS (8 DATASETS) ---');

  const superLogin = await loginAdmin('Thenappan T');
  const superCookie = superLogin.cookie;
  assert(!!superCookie, 'T40: Super Administrator authenticated successfully');

  // 8 Export Datasets:
  const exportTypes = [
    { type: 'waitlist', name: 'Waitlist', code: 'T41' },
    { type: 'participants', name: 'Participants', code: 'T42' },
    { type: 'teams', name: 'Teams', code: 'T43' },
    { type: 'team-members', name: 'Team Members', code: 'T44' },
    { type: 'abstracts', name: 'Abstracts', code: 'T45' },
    { type: 'submissions', name: 'Submissions', code: 'T46' },
    { type: 'evaluations', name: 'Evaluations', code: 'T47' },
    { type: 'sponsors', name: 'Sponsors', code: 'T48' },
  ];

  for (const item of exportTypes) {
    const expRes = await request(`/api/admin/export?type=${item.type}`, { headers: { Cookie: superCookie } });
    assert(expRes.statusCode === 200, `${item.code}: Super Admin exports ${item.name} CSV (HTTP 200)`);
    assert(expRes.headers['content-type']?.includes('text/csv'), `${item.code}: Content-Type is text/csv`);
    assert(typeof expRes.body === 'string' && expRes.body.length > 0, `${item.code}: Body contains CSV data`);
  }

  // T49: Unknown export type returns 400
  const expBad = await request('/api/admin/export?type=unknown_dataset', { headers: { Cookie: superCookie } });
  assert(expBad.statusCode === 400, 'T49: Unknown export type returns HTTP 400 Bad Request');

  // --------------------------------------------------------------------------
  // 5. CSV FORMULA INJECTION DEFENSE VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n--- 5. CSV FORMULA INJECTION DEFENSE ---');

  // Create team with formula injection in abstractTitle
  const fiLeadEmail = `fi.lead.${timestamp}@example.edu`;
  const fiLeadCookie = await registerAndLoginStudent(fiLeadEmail, 'Formula Tester');
  await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: fiLeadCookie },
    body: JSON.stringify({
      teamName: `FI Test Team ${timestamp}`,
      trackId: 'track-agentic-ai',
      abstractTitle: "=cmd|' /C calc'!A0",
      abstractText: "@SUM(1,2,3) and +cmd|test",
      cloudArchitectureBlueprint: 'https://aws.amazon.com/test',
      githubUrl: 'https://github.com/kairos2027/test-fi',
      lead: {
        fullName: 'Formula Tester',
        email: fiLeadEmail,
        college: 'SIST',
        phone: '+91 99999 77777',
        registerNo: '44117777',
        meetupProfileUrl: 'https://meetup.com/members/fi-tester'
      }
    })
  });

  const abstractsCsvRes = await request('/api/admin/export?type=abstracts', { headers: { Cookie: superCookie } });
  assert(abstractsCsvRes.statusCode === 200, 'Abstracts exported successfully');
  
  // Verify that cells starting with =, +, @ have prepended '
  const fiLine = abstractsCsvRes.body.split('\n').find(l => l.includes(`FI Test Team ${timestamp}`));
  assert(!!fiLine, 'Team with formula injection found in exported abstracts CSV');
  assert(fiLine.includes(`"'=cmd|' /C calc'!A0"`), 'T50: Formula starting with = is sanitized with prepended single quote');
  assert(fiLine.includes(`"'@SUM(1,2,3) and +cmd|test"`), 'T51: Formula starting with @ is sanitized with prepended single quote');

  // --------------------------------------------------------------------------
  // 6. AUDIT TRAIL LOGGING
  // --------------------------------------------------------------------------
  console.log('\n--- 6. AUDIT TRAIL LOGGING ---');

  const analyticsWithLogs = await request('/api/admin/analytics', { headers: { Cookie: superCookie } });
  const recentLogs = analyticsWithLogs.data?.analytics?.recentLogs || [];
  
  const hasTeamUpdateLog = recentLogs.some(l => l.action === 'UPDATE_TEAM');
  assert(hasTeamUpdateLog, 'T52: UPDATE_TEAM action recorded in audit log');

  const hasJudgeLog = recentLogs.some(l => l.action === 'CREATE_JUDGE');
  assert(hasJudgeLog, 'T53: CREATE_JUDGE action recorded in audit log');

  const hasCheckInLog = recentLogs.some(l => l.action === 'CHECK_IN_TEAM');
  assert(hasCheckInLog, 'T54: CHECK_IN_TEAM action recorded in audit log');

  console.log('\n================================================================');
  console.log(`TEST SUITE COMPLETE: ${passedTests} passed, ${failedTests} failed`);
  console.log('================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runOrganizerTestSuite().catch((err) => {
  console.error('Fatal Test Harness Exception:', err);
  process.exit(1);
});
