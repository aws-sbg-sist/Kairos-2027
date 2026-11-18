/**
 * KAIROS 2027 — PHASE 04 REGISTRATION & TEAM MANAGEMENT TEST SUITE
 * 
 * Exhaustive automated verification of:
 * 1. Registration form to database & persistent profile updates
 * 2. Duplicate registration prevention & status tracking
 * 3. Feature flag enforcement (registrationOpen & registrationDeadline)
 * 4. Team creation, unique codes, leader assignment, and track validation
 * 5. Multi-team membership prevention (zero accidental dual-team enrollment)
 * 6. Team joining, invite code verification, and max 6 builder cap
 * 7. Team details & abstract editing (Leader-only RBAC)
 * 8. Member removal (Leader authority & voluntary exit, leader removal protection)
 * 9. Leadership transfer mechanics & role re-assignment
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8000';
const ADMIN_PASSKEY = '9f8c3e1a7b4d0e6f2a5b8c1d3e7f9a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d1e3f';

function request(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const headers = { ...(options.headers || {}) };
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

async function loginSuperAdmin() {
  const payload = JSON.stringify({ passkey: ADMIN_PASSKEY, organizerName: 'Thenappan T' });
  const res = await request('/api/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    body: payload,
  });
  return extractCookie(res, 'kairos_admin_session');
}

async function runRegistrationTeamTestSuite() {
  console.log('================================================================');
  console.log(' KAIROS 2027 — PHASE 04 REGISTRATION & TEAM MANAGEMENT SUITE   ');
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
  const superAdminCookie = await loginSuperAdmin();

  // Ensure flags start in open state
  await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: superAdminCookie },
    body: JSON.stringify({ registrationOpen: true, registrationDeadline: '2027-01-06T23:59:59+05:30' }),
  });

  // --------------------------------------------------------------------------
  // SECTION 1: REGISTRATION & PERSISTENT PROFILES
  // --------------------------------------------------------------------------
  console.log('--- 1. REGISTRATION & PERSISTENT STUDENT PROFILES ---');

  const regStudentEmail = `reg.builder.${timestamp}@sathyabama.ac.in`;
  const regStudentCookie = await registerAndLoginStudent(regStudentEmail, 'Varun Nair');

  const regPayload = JSON.stringify({
    fullName: 'Varun Nair',
    email: regStudentEmail,
    phone: '+91 98401 22334',
    institution: 'Sathyabama Institute of Science and Technology',
    collegeRegNo: '44119988',
    department: 'Computer Science and Engineering',
    yearOfStudy: '3rd Year',
    preferredTrack: 'track-cloud-native',
    githubUrl: 'https://github.com/varun-nair-cloud',
    linkedinUrl: 'https://linkedin.com/in/varun-nair',
    meetupProfileUrl: 'https://meetup.com/members/varun-nair',
    awsBuilderCenterUrl: 'https://community.aws/@varun',
    tShirtSize: 'XL'
  });

  const r1 = await request('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: regStudentCookie },
    body: regPayload
  });
  assert(r1.statusCode === 201, 'T1: Valid registration via POST /api/v1/register returns HTTP 201 Created');
  assert(r1.data?.entry?.status === 'pending', 'T1: Registration waitlist status tracked correctly as pending');

  // Verify persistent profile was synchronized
  const r2 = await request('/api/v1/student/me', { headers: { Cookie: regStudentCookie } });
  assert(r2.statusCode === 200, 'T2: Authenticated student profile retrieves updated data');
  assert(r2.data?.student?.phone === '+91 98401 22334', 'T2: Persistent profile saved telephone');
  assert(r2.data?.student?.tshirtSize === 'XL', 'T2: Persistent profile saved tshirtSize');
  assert(r2.data?.student?.department === 'Computer Science and Engineering', 'T2: Persistent profile saved department');

  // Duplicate registration rejection
  const r3 = await request('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: regPayload
  });
  assert(r3.statusCode === 409, 'T3: Duplicate registration attempt returns HTTP 409 Conflict');
  assert(r3.data?.code === 'EMAIL_ALREADY_REGISTERED', 'T3: Rejection code is EMAIL_ALREADY_REGISTERED');

  // Invalid email rejection
  const r4 = await request('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'Invalid Email User', email: 'not-an-email-format' })
  });
  assert(r4.statusCode === 400, 'T4: Malformed email rejected with HTTP 400 Bad Request');

  // Missing required fields
  const r5 = await request('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'No Email User' })
  });
  assert(r5.statusCode === 400, 'T5: Missing mandatory fields rejected with HTTP 400 Bad Request');

  // --------------------------------------------------------------------------
  // SECTION 2: FEATURE FLAGS ENFORCEMENT
  // --------------------------------------------------------------------------
  console.log('\n--- 2. FEATURE FLAGS ENFORCEMENT (OPEN/CLOSED & DEADLINE) ---');

  // Close registration
  await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: superAdminCookie },
    body: JSON.stringify({ registrationOpen: false }),
  });

  const f1 = await request('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'Late Builder', email: `late.${timestamp}@test.edu` })
  });
  assert(f1.statusCode === 403, 'T6: Registration rejected when registrationOpen is false (HTTP 403)');
  assert(f1.data?.code === 'REGISTRATION_CLOSED', 'T6: Rejection code is REGISTRATION_CLOSED');

  const f2 = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamName: 'Late Squad', trackId: 'track-cloud-native', abstractTitle: 'Title', abstractText: 'Abstract', leaderName: 'Late', leaderEmail: 'late@test.edu' })
  });
  assert(f2.statusCode === 403, 'T7: Team creation rejected when registrationOpen is false (HTTP 403)');

  // Re-open with past deadline
  await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: superAdminCookie },
    body: JSON.stringify({ registrationOpen: true, registrationDeadline: '2026-01-01T00:00:00Z' }),
  });

  const f3 = await request('/api/v1/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'Expired Deadline Builder', email: `expired.${timestamp}@test.edu` })
  });
  assert(f3.statusCode === 403, 'T8: Registration rejected when deadline is in the past (HTTP 403)');
  assert(f3.data?.code === 'REGISTRATION_DEADLINE_EXCEEDED', 'T8: Error code is REGISTRATION_DEADLINE_EXCEEDED');

  // Restore normal open flags
  await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: superAdminCookie },
    body: JSON.stringify({ registrationOpen: true, registrationDeadline: '2027-01-06T23:59:59+05:30' }),
  });

  // --------------------------------------------------------------------------
  // SECTION 3: TEAM CREATION LIFECYCLE
  // --------------------------------------------------------------------------
  console.log('\n--- 3. TEAM CREATION & VALIDATION ---');

  const leaderEmail = `leader.${timestamp}@sathyabama.ac.in`;
  const leaderCookie = await registerAndLoginStudent(leaderEmail, 'Karthik Subramanian');

  const teamCreationPayload = {
    teamName: `NeuralMesh Alpha ${timestamp}`,
    trackId: 'track-agentic-ai',
    abstractTitle: 'Autonomous Edge Swarms for Real-time Decentralized Consensus',
    abstractText: 'A distributed multi-agent swarm architecture utilizing AWS Step Functions, Bedrock Titan models, and zero-knowledge telemetry streams to coordinate autonomous IoT nodes in disconnected edge environments.',
    cloudArchitectureBlueprint: 'https://aws.amazon.com/architecture/neural-mesh',
    githubUrl: 'https://github.com/kairos2027/neural-mesh-alpha',
    lead: {
      fullName: 'Karthik Subramanian',
      email: leaderEmail,
      phone: '+91 99401 11223',
      registerNo: '44118877',
      college: 'SIST Chennai',
      meetupProfileUrl: 'https://meetup.com/members/karthik-subramanian',
      awsBuilderCenterUrl: 'https://community.aws/@karthik',
      meetupVerified: true
    }
  };

  const tc1 = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify(teamCreationPayload)
  });
  assert(tc1.statusCode === 201, 'T10: Valid team creation returns HTTP 201 Created');
  assert(tc1.data?.team?.teamCode?.startsWith('KAIROS-T'), 'T11: Team receives unique formatted teamCode (e.g. KAIROS-T004)');
  assert(tc1.data?.team?.inviteCode?.startsWith('KAIROS-'), 'T11: Team receives secure invitation code');
  assert(tc1.data?.team?.members?.length === 1, 'T12: Team starts with exactly 1 member (the Leader)');
  assert(tc1.data?.team?.members?.[0]?.role === 'Leader', 'T12: Creator is confirmed with role Leader');
  assert(tc1.data?.team?.members?.[0]?.confirmed === true, 'T12: Leader has confirmed: true');

  const createdTeamCode = tc1.data?.team?.teamCode;
  const createdInviteCode = tc1.data?.team?.inviteCode;

  // Invalid track rejection
  const tc2 = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...teamCreationPayload,
      lead: { ...teamCreationPayload.lead, email: `other.${timestamp}@test.edu` },
      trackId: 'invalid-nonexistent-track-xyz'
    })
  });
  assert(tc2.statusCode === 400, 'T13: Non-existent track ID rejected with HTTP 400');

  // Abstract word count limit check (> 300 words)
  const longAbstract = 'word '.repeat(350);
  const tc3 = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...teamCreationPayload,
      lead: { ...teamCreationPayload.lead, email: `long.${timestamp}@test.edu` },
      abstractText: longAbstract
    })
  });
  assert(tc3.statusCode === 400, 'T14: Abstract exceeding 300 words rejected with HTTP 400');

  // Multi-team prevention: Leader cannot create second team
  const tc4 = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify({
      ...teamCreationPayload,
      teamName: 'Second Illegal Squad'
    })
  });
  assert(tc4.statusCode === 409, 'T15: Student already in a team cannot create a second team (HTTP 409 Conflict)');
  assert(tc4.data?.code === 'MULTI_TEAM_FORBIDDEN', 'T15: Error code is MULTI_TEAM_FORBIDDEN');

  // --------------------------------------------------------------------------
  // SECTION 4: TEAM JOINING & INVITATION VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n--- 4. TEAM JOINING & MULTI-TEAM RESTRICTIONS ---');

  // Join with invalid team code
  const tj1 = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamCode: 'NON-EXISTENT-CODE-999',
      member: { fullName: 'Member 1', email: `m1.${timestamp}@test.edu`, role: 'Backend' }
    })
  });
  assert(tj1.statusCode === 400, 'T16: Joining non-existent team returns HTTP 400');

  // Member 1 joins successfully
  const m1Email = `member1.${timestamp}@sathyabama.ac.in`;
  const m1Cookie = await registerAndLoginStudent(m1Email, 'Priya Dharshini');

  const tj2 = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: m1Cookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      member: {
        fullName: 'Priya Dharshini',
        email: m1Email,
        phone: '+91 98402 33445',
        college: 'SIST',
        registerNo: '44117766',
        role: 'Backend',
        meetupProfileUrl: 'https://meetup.com/members/priya-dharshini',
        awsBuilderCenterUrl: 'https://community.aws/@priya',
        tShirtSize: 'M'
      }
    })
  });
  assert(tj2.statusCode === 200, 'T17: Member 1 joins existing squad successfully (HTTP 200)');
  assert(tj2.data?.team?.members?.length === 2, 'T17: Team roster now contains 2 confirmed builders');

  // Duplicate join on same team
  const tj3 = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: m1Cookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      member: { fullName: 'Priya Dharshini', email: m1Email, role: 'Backend' }
    })
  });
  assert(tj3.statusCode === 400, 'T18: Duplicate member join on same team rejected (HTTP 400)');
  assert(tj3.data?.code === 'DUPLICATE_MEMBERSHIP', 'T18: Error code is DUPLICATE_MEMBERSHIP');

  // Member 1 attempting to join a DIFFERENT team (Multi-team prevention)
  const tj4 = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: m1Cookie },
    body: JSON.stringify({
      teamCode: 'team-k75-01', // Different existing team
      member: { fullName: 'Priya Dharshini', email: m1Email, role: 'Backend' }
    })
  });
  assert(tj4.statusCode === 409, 'T19: Student already in Team A cannot join Team B (HTTP 409 Conflict)');
  assert(tj4.data?.code === 'MULTI_TEAM_FORBIDDEN', 'T19: Error code is MULTI_TEAM_FORBIDDEN');

  // Add members until reaching 6 members cap
  console.log('  ... Adding members 2, 3, 4, 5 to reach 6 builder cap');
  for (let i = 2; i <= 5; i++) {
    const email = `builder${i}.${timestamp}@sathyabama.ac.in`;
    await request('/api/v1/team', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamCode: createdTeamCode,
        member: { fullName: `Builder ${i}`, email, role: 'AI / Cloud' }
      })
    });
  }

  // 7th builder attempts to join full team
  const m7Email = `builder7.${timestamp}@sathyabama.ac.in`;
  const tj5 = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      member: { fullName: 'Builder 7', email: m7Email, role: 'Frontend' }
    })
  });
  assert(tj5.statusCode === 400, 'T20: 7th builder join rejected when squad has reached max 6 builders');
  assert(tj5.data?.error?.includes('roster is full'), 'T20: Error cites team roster capacity reached');

  // --------------------------------------------------------------------------
  // SECTION 5: TEAM MANAGEMENT, EDITING, REMOVAL & LEADERSHIP TRANSFER
  // --------------------------------------------------------------------------
  console.log('\n--- 5. TEAM MANAGEMENT: EDITING, REMOVAL & LEADERSHIP TRANSFER ---');

  // Member 1 (non-leader) attempts to edit team details
  const tm1 = await request('/api/v1/team', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: m1Cookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      problemTitle: 'Hacked Title by Member'
    })
  });
  assert(tm1.statusCode === 403, 'T21: Non-leader member rejected from editing team details (HTTP 403)');
  assert(tm1.data?.code === 'FORBIDDEN_LEADER_ONLY', 'T21: Error code is FORBIDDEN_LEADER_ONLY');

  // Verified Leader edits team details
  const tm2 = await request('/api/v1/team', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      problemTitle: 'NeuralMesh V2: Decentralized Zero-Knowledge Edge Mesh',
      problemAbstract: 'Updated production-grade architecture utilizing AWS Nitro Enclaves and DynamoDB Global Tables for distributed resilience.'
    })
  });
  assert(tm2.statusCode === 200, 'T22: Team Leader successfully updates team abstract and title (HTTP 200)');
  assert(tm2.data?.team?.problemTitle?.includes('NeuralMesh V2'), 'T22: Problem title updated in persistent store');

  // Non-leader attempts to remove Member 2
  const tm3 = await request('/api/v1/team/members', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: m1Cookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      memberEmail: `builder2.${timestamp}@sathyabama.ac.in`
    })
  });
  assert(tm3.statusCode === 403, 'T23: Non-leader member cannot remove other teammates (HTTP 403)');

  // Leader removes Member 2
  const builder2Email = `builder2.${timestamp}@sathyabama.ac.in`;
  const tm4 = await request('/api/v1/team/members', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      memberEmail: builder2Email
    })
  });
  assert(tm4.statusCode === 200, 'T24: Team Leader successfully removes a squad member (HTTP 200)');
  assert(!tm4.data?.team?.members?.some((m) => m.email === builder2Email), 'T24: Member 2 removed from roster');

  // Leader attempts to remove THEMSELVES directly
  const tm5 = await request('/api/v1/team/members', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      memberEmail: leaderEmail
    })
  });
  assert(tm5.statusCode === 400, 'T25: Directly removing the Team Leader is prohibited (HTTP 400)');
  assert(tm5.data?.error?.includes('Cannot remove the Team Leader'), 'T25: Error cites mandatory leadership transfer before exit');

  // Non-leader attempts to transfer leadership
  const tm6 = await request('/api/v1/team/transfer-leadership', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: m1Cookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      newLeaderEmail: m1Email
    })
  });
  assert(tm6.statusCode === 403, 'T26: Non-leader rejected from transferring leadership (HTTP 403)');

  // Leader transfers leadership to Member 1 (Priya Dharshini)
  const tm7 = await request('/api/v1/team/transfer-leadership', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      newLeaderEmail: m1Email
    })
  });
  assert(tm7.statusCode === 200, 'T27: Team Leader successfully transfers leadership to Member 1 (HTTP 200)');
  assert(tm7.data?.team?.leaderEmail === m1Email, 'T27: Team leaderEmail updated to Member 1');

  // Former leader is now Backend; Member 1 is now Leader
  const newLeaderMember = tm7.data?.team?.members?.find((m) => m.email === m1Email);
  const oldLeaderMember = tm7.data?.team?.members?.find((m) => m.email === leaderEmail);
  assert(newLeaderMember?.role === 'Leader', 'T28: New leader has role Leader');
  assert(oldLeaderMember?.role === 'Backend', 'T28: Former leader transitioned to technical role Backend');

  // Verified new leader can now perform leader operations (e.g. edit team)
  const tm8 = await request('/api/v1/team', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: m1Cookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      problemTitle: 'NeuralMesh V3: Led by Priya Dharshini'
    })
  });
  assert(tm8.statusCode === 200, 'T28: New Team Leader verified with active RBAC leader rights');

  // Former leader voluntarily leaves the squad
  const tm9 = await request('/api/v1/team/members', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify({
      teamCode: createdTeamCode,
      memberEmail: leaderEmail
    })
  });
  assert(tm9.statusCode === 200, 'T29: Former leader successfully leaves team voluntarily (HTTP 200)');

  // Once departed, former leader is permitted to create a new squad without multi-team conflict
  const tm10 = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: leaderCookie },
    body: JSON.stringify({
      teamName: `Karthik Solo Squad ${timestamp}`,
      trackId: 'track-fintech-trust',
      problemTitle: 'Decentralized Attestation Engine',
      problemAbstract: 'Provable cryptographic zero-knowledge proof validator on AWS Nitro Enclaves.',
      leaderName: 'Karthik Subramanian',
      leaderEmail: leaderEmail
    })
  });
  assert(tm10.statusCode === 201, 'T29: Departed builder is now free to create a new squad without conflict');

  // --------------------------------------------------------------------------
  // FINAL SCORECARD
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`PHASE 04 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runRegistrationTeamTestSuite().catch((err) => {
  console.error('Fatal test execution error:', err);
  process.exit(1);
});
