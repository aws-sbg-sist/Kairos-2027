/**
 * KAIROS 2027 — PHASE 05 STUDENT DASHBOARD & DIGITAL PASS TEST SUITE
 * 
 * Exhaustive automated verification of:
 * 1. Unauthenticated route gating (HTTP 401 on /api/v1/student/me & /api/v1/pass/me)
 * 2. Real authenticated student profile retrieval (zero mock data)
 * 3. Multi-account isolation:
 *    - Account A (Team Leader) sees only their squad & details
 *    - Account B (Squad Member) sees only their profile with shared squad
 *    - Account C (Solo Builder) sees only their profile with team: null & waitlist
 * 4. Real digital pass generation:
 *    - Valid access code format (KAIROS-PASS-XXXX)
 *    - Opaque token generation with ZERO raw personal PII in QR payload
 * 5. Server-side pass verification endpoint (/api/v1/pass/verify):
 *    - Successful verification of valid tokens
 *    - Rejection of tampered tokens (HTTP 400)
 *    - Rejection of forged signatures (HTTP 400)
 *    - Correct check-in eligibility derivation from database
 * 6. Real evaluation gates integration (zero fake hardcoded 24.5/25 scores)
 * 7. Live event announcements endpoint (/api/v1/announcements)
 * 8. Live frontend page rendering (/dashboard, /portal, /portal/pass)
 */

const http = require('http');

const BASE_URL = 'http://localhost:8000';
const JUDGE_PIN = '9944'; // Pre-seeded Judge 1 PIN

function request(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const headers = { 
      'x-kairos-test-suite': 'true',
      ...(options.headers || {}) 
    };
    if (options.body && !headers['Content-Length']) {
      headers['Content-Length'] = Buffer.byteLength(options.body);
    }
    const reqOptions = {
      method: options.method || 'GET',
      headers,
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
    headers: { 'Content-Type': 'application/json' },
    body: regPayload,
  });

  const token = regRes.data?.verificationToken;
  if (token) {
    const verifyPayload = JSON.stringify({ token });
    await request('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: verifyPayload,
    });
  }

  const loginPayload = JSON.stringify({ email, password });
  const loginRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: loginPayload,
  });

  return extractCookie(loginRes, 'kairos_student_session');
}

async function runDashboardTestSuite() {
  console.log('================================================================');
  console.log('  KAIROS 2027 — PHASE 05 STUDENT DASHBOARD & PASS TEST SUITE    ');
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
  // SECTION 1: UNAUTHENTICATED ENDPOINT GATING
  // --------------------------------------------------------------------------
  console.log('--- 1. UNAUTHENTICATED ENDPOINT ACCESS GATING ---');

  const unauthMe = await request('/api/v1/student/me');
  assert(unauthMe.statusCode === 401, 'T1: GET /api/v1/student/me without session returns HTTP 401 Unauthorized');
  assert(unauthMe.data?.code === 'UNAUTHORIZED', 'T1: Error code is UNAUTHORIZED');

  const unauthPass = await request('/api/v1/pass/me');
  assert(unauthPass.statusCode === 401, 'T2: GET /api/v1/pass/me without session returns HTTP 401 Unauthorized');
  assert(unauthPass.data?.code === 'UNAUTHORIZED', 'T2: Pass error code is UNAUTHORIZED');

  // --------------------------------------------------------------------------
  // SECTION 2: MULTI-ACCOUNT ISOLATION (LEADER, MEMBER, SOLO BUILDER)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. MULTI-ACCOUNT CREATION & DATA ISOLATION ---');

  // Student 1: Team Leader
  const s1Email = `arjun.raman.${timestamp}@sathyabama.ac.in`;
  const s1Cookie = await registerAndLoginStudent(s1Email, 'Arjun Ramanathan');

  const teamCreationRes = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: s1Cookie },
    body: JSON.stringify({
      teamName: `Titan Mesh ${timestamp}`,
      trackId: 'track-agentic-ai',
      abstractTitle: 'Self-Organizing Drone Swarms using Amazon Bedrock',
      abstractText: 'A decentralized swarm routing protocol built on AWS IoT Greengrass and Amazon Bedrock Titan models to negotiate dynamic mesh pathways.',
      githubUrl: 'https://github.com/kairos2027/titan-mesh',
      lead: {
        fullName: 'Arjun Ramanathan',
        email: s1Email,
        phone: '+91 99401 55667',
        college: 'SIST Chennai',
        registerNo: '44112233'
      }
    })
  });
  assert(teamCreationRes.statusCode === 201, 'T3: Team Leader creates squad successfully (HTTP 201)');
  const teamCode = teamCreationRes.data?.team?.teamCode;
  const inviteCode = teamCreationRes.data?.team?.inviteCode;
  const teamId = teamCreationRes.data?.team?.id;

  // Student 2: Squad Member
  const s2Email = `meera.krish.${timestamp}@sathyabama.ac.in`;
  const s2Cookie = await registerAndLoginStudent(s2Email, 'Meera Krishnan');

  const joinRes = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: s2Cookie },
    body: JSON.stringify({
      teamCode: teamCode,
      member: {
        fullName: 'Meera Krishnan',
        email: s2Email,
        phone: '+91 98402 77889',
        college: 'SIST',
        registerNo: '44113344',
        role: 'AI / Cloud'
      }
    })
  });
  assert(joinRes.statusCode === 200, 'T4: Second student joins squad successfully (HTTP 200)');

  // Student 3: Solo / Waitlisted Builder (No team)
  const s3Email = `ravi.chandran.${timestamp}@sathyabama.ac.in`;
  const s3Cookie = await registerAndLoginStudent(s3Email, 'Ravi Chandran');

  await request('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: s3Cookie },
    body: JSON.stringify({
      fullName: 'Ravi Chandran',
      email: s3Email,
      phone: '+91 97403 99001',
      institution: 'SIST',
      preferredTrack: 'track-quantum',
      teamStatus: 'seeking_team'
    })
  });

  // Verify Student 1 (Leader)
  const s1Me = await request('/api/v1/student/me', { headers: { Cookie: s1Cookie } });
  assert(s1Me.statusCode === 200, 'T5: Student 1 profile returns HTTP 200');
  assert(s1Me.data?.student?.email === s1Email, 'T5: Student 1 sees their own email');
  assert(s1Me.data?.student?.fullName === 'Arjun Ramanathan', 'T5: Student 1 sees their own name');
  assert(s1Me.data?.team?.teamCode === teamCode, 'T6: Student 1 retrieves their real squad');
  assert(s1Me.data?.team?.leaderEmail === s1Email, 'T6: Student 1 is identified as squad Leader');
  assert(s1Me.data?.team?.members?.length === 2, 'T6: Squad roster contains exactly 2 members');
  assert(s1Me.data?.team?.members?.[0]?.role === 'Leader', 'T6: Leader role is clearly demarcated');

  // Verify Student 2 (Member)
  const s2Me = await request('/api/v1/student/me', { headers: { Cookie: s2Cookie } });
  assert(s2Me.statusCode === 200, 'T7: Student 2 profile returns HTTP 200');
  assert(s2Me.data?.student?.email === s2Email, 'T7: Student 2 sees their own email');
  assert(s2Me.data?.student?.fullName === 'Meera Krishnan', 'T7: Student 2 sees their own name (not Student 1)');
  assert(s2Me.data?.team?.teamCode === teamCode, 'T8: Student 2 shares the same teamCode');
  assert(s2Me.data?.team?.teamName === `Titan Mesh ${timestamp}`, 'T8: Student 2 sees real teamName');

  // Verify Student 3 (Solo Builder without team)
  const s3Me = await request('/api/v1/student/me', { headers: { Cookie: s3Cookie } });
  assert(s3Me.statusCode === 200, 'T9: Student 3 profile returns HTTP 200');
  assert(s3Me.data?.student?.email === s3Email, 'T9: Student 3 sees their own email');
  assert(s3Me.data?.team === null, 'T10: Student 3 team is null (clean empty state, zero dummy team)');
  assert(s3Me.data?.waitlist?.preferredTrack === 'track-quantum', 'T10: Student 3 sees their own linked waitlist track');

  // --------------------------------------------------------------------------
  // SECTION 3: DIGITAL PARTICIPANT PASS & OPAQUE QR VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n--- 3. DIGITAL PARTICIPANT PASS & OPAQUE QR TOKENS ---');

  // Pass for Leader
  const pass1Res = await request('/api/v1/pass/me', { headers: { Cookie: s1Cookie } });
  assert(pass1Res.statusCode === 200, 'T11: GET /api/v1/pass/me returns HTTP 200 for Student 1');
  const pass1 = pass1Res.data?.pass;
  assert(pass1?.participantName === 'Arjun Ramanathan', 'T12: Pass contains real participant name');
  assert(pass1?.role === 'Leader', 'T12: Pass reflects role: Leader');
  assert(pass1?.teamName === `Titan Mesh ${timestamp}`, 'T12: Pass reflects real teamName');
  assert(pass1?.accessCode?.startsWith('KAIROS-PASS-'), 'T13: Pass has standard accessCode (KAIROS-PASS-XXXX)');
  assert(typeof pass1?.opaqueToken === 'string' && pass1?.opaqueToken.length > 20, 'T13: Pass generates non-empty opaqueToken');

  // Security Verification: QR must NEVER contain raw sensitive PII
  const tokenString = pass1.opaqueToken;
  assert(!tokenString.includes(s1Email), 'T14: SECURITY: Opaque token does NOT leak raw email address');
  assert(!tokenString.includes('99401'), 'T14: SECURITY: Opaque token does NOT leak raw phone number');
  assert(!tokenString.includes('Arjun Ramanathan'), 'T14: SECURITY: Opaque token does NOT leak raw student name');

  // Pass for Solo Builder
  const pass3Res = await request('/api/v1/pass/me', { headers: { Cookie: s3Cookie } });
  assert(pass3Res.statusCode === 200, 'T15: GET /api/v1/pass/me returns HTTP 200 for Student 3');
  const pass3 = pass3Res.data?.pass;
  assert(pass3?.participantName === 'Ravi Chandran', 'T15: Solo pass reflects Ravi Chandran');
  assert(pass3?.role === 'Builder', 'T15: Solo pass role is Builder');
  assert(pass3?.teamName === 'Solo Builder (Seeking Squad)', 'T15: Team shows Solo Builder state');

  // --------------------------------------------------------------------------
  // SECTION 4: SERVER-SIDE PASS VERIFICATION ENDPOINT
  // --------------------------------------------------------------------------
  console.log('\n--- 4. SERVER-SIDE PASS VERIFICATION ENDPOINT (/api/v1/pass/verify) ---');

  // Valid Token GET Verification
  const verify1 = await request(`/api/v1/pass/verify?token=${encodeURIComponent(pass1.opaqueToken)}`);
  assert(verify1.statusCode === 200, 'T16: Valid pass token GET verification returns HTTP 200');
  assert(verify1.data?.valid === true, 'T16: Server validates token signature as true');
  assert(verify1.data?.participant?.fullName === 'Arjun Ramanathan', 'T17: Server derives real participant name from DB');
  assert(verify1.data?.team?.teamName === `Titan Mesh ${timestamp}`, 'T17: Server derives real team from DB');
  assert(verify1.data?.checkInEligibility?.eligible === true, 'T18: Check-in eligibility confirmed');

  // Valid Token POST Verification
  const verify2 = await request('/api/v1/pass/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: pass3.opaqueToken })
  });
  assert(verify2.statusCode === 200, 'T19: Valid solo pass token POST verification returns HTTP 200');
  assert(verify2.data?.valid === true, 'T19: Server validates solo token as true');
  assert(verify2.data?.participant?.fullName === 'Ravi Chandran', 'T19: Server derives Ravi Chandran');
  assert(verify2.data?.team === null, 'T19: Server confirms team is null');

  // Tampered Token Rejection
  const tamperedToken = pass1.opaqueToken.substring(0, pass1.opaqueToken.length - 6) + 'XXXXXX';
  const verifyTampered = await request(`/api/v1/pass/verify?token=${encodeURIComponent(tamperedToken)}`);
  assert(verifyTampered.statusCode === 400, 'T20: Tampered token is rejected with HTTP 400 Bad Request');
  assert(verifyTampered.data?.valid === false, 'T20: Server responds valid: false');
  assert(Boolean(verifyTampered.data?.error), 'T20: Server responds with error message');

  // Empty Token Rejection
  const verifyEmpty = await request('/api/v1/pass/verify?token=');
  assert(verifyEmpty.statusCode === 400, 'T21: Empty verification token rejected with HTTP 400');

  // --------------------------------------------------------------------------
  // SECTION 5: REAL EVALUATION GATES (ZERO FAKE SCORES)
  // --------------------------------------------------------------------------
  console.log('\n--- 5. REAL EVALUATION GATES (ZERO FAKE HARDCODED SCORES) ---');

  // Fresh team has 0 evaluations
  assert(s1Me.data?.evaluations?.length === 0, 'T22: Fresh team starts with 0 evaluations (zero fake 24.5 scores)');

  // Judge submits real Gate 1 score
  const evalPayload = JSON.stringify({
    judgeId: 'judge-1',
    judgePin: '202701',
    teamId: teamCode,
    checkpointGate: 1,
    criterion1Score: 26,
    criterion2Score: 23,
    criterion3Score: 22,
    criterion4Score: 18,
    qualitativeFeedback: 'Exceptional autonomous agent consensus. Real-time telemetry is robust.'
  });

  const judgeScoreRes = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: evalPayload
  });
  assert(judgeScoreRes.statusCode === 201, 'T23: Authorized judge scores team on Gate 1 (HTTP 201 Created)');

  // Query student profile again to verify real evaluation gate is reflected
  const s1MeUpdated = await request('/api/v1/student/me', { headers: { Cookie: s1Cookie } });
  assert(s1MeUpdated.data?.evaluations?.length === 1, 'T24: Student 1 now receives real Gate 1 evaluation record');
  const gate1 = s1MeUpdated.data?.evaluations?.[0];
  assert(gate1?.checkpointGate === 1, 'T24: Gate evaluated is Gate 1');
  assert(gate1?.rawTotalScore === 89, 'T25: Real evaluation raw total score is 89 / 100');
  assert(gate1?.qualitativeFeedback === 'Exceptional autonomous agent consensus. Real-time telemetry is robust.', 'T25: Real judge feedback retrieved');

  // --------------------------------------------------------------------------
  // SECTION 6: EVENT ANNOUNCEMENTS & FRONTEND PAGES
  // --------------------------------------------------------------------------
  console.log('\n--- 6. EVENT ANNOUNCEMENTS & FRONTEND PAGE RENDERING ---');

  const annRes = await request('/api/v1/announcements');
  assert(annRes.statusCode === 200, 'T26: GET /api/v1/announcements returns HTTP 200 OK');
  assert(Array.isArray(annRes.data?.announcements), 'T26: Announcements returned as an array');
  assert(annRes.data?.announcements?.length >= 3, 'T26: Contains multiple official event notices');

  const pageDashboard = await request('/dashboard');
  assert(pageDashboard.statusCode === 200, 'T27: GET /dashboard page renders HTTP 200 OK');

  const pagePortal = await request('/portal');
  assert(pagePortal.statusCode === 200, 'T28: GET /portal page renders HTTP 200 OK');

  const pagePass = await request('/portal/pass');
  assert(pagePass.statusCode === 200, 'T29: GET /portal/pass page renders HTTP 200 OK');

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`PHASE 05 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runDashboardTestSuite().catch((err) => {
  console.error('Fatal error running Phase 05 test suite:', err);
  process.exit(1);
});
