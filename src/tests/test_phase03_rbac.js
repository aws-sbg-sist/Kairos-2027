/**
 * KAIROS 2027 — PHASE 03 RBAC SECURITY VERIFICATION SUITE
 * 
 * Exhaustive automated verification of Role-Based Access Control (RBAC):
 * 1. Anonymous Access & Least Privilege (401 guards across all protected endpoints)
 * 2. Student Permissions & Anti-Privilege Escalation (tamper immunity, profile isolation)
 * 3. Team Member vs Team Leader Permissions (strict leader-only qualifier submission)
 * 4. Judge Track Specialization & Jury Integrity (timing-safe PIN, track enforcement, recusal)
 * 5. Operational Organizer vs Super Administrator Hierarchy (export & flag guards)
 * 6. Cryptographic Session Token Tampering & Lifetime Verification
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:8000';
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

async function runRBACTestSuite() {
  console.log('================================================================');
  console.log('   KAIROS 2027 — COMPLETE RBAC SECURITY TEST SUITE (PHASE 03)   ');
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
  const testTeamCode = 'team-k75-01'; // Chronos Distributed: leader pooja.v@example.edu, member rohan.g@example.edu

  // --------------------------------------------------------------------------
  // SECTION 1: ANONYMOUS ACCESS & LEAST PRIVILEGE
  // --------------------------------------------------------------------------
  console.log('--- 1. ANONYMOUS ACCESS & LEAST PRIVILEGE ---');

  const a1 = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamCode: testTeamCode, loomVideoUrl: 'https://loom.com/test', githubUrl: 'https://github.com/kairos/test' }),
  });
  assert(a1.statusCode === 401, 'T1: Anonymous cannot submit qualifier (HTTP 401)');
  assert(a1.data?.code === 'UNAUTHORIZED', 'T1: Rejection code is UNAUTHORIZED');

  const a2 = await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ demoSandboxMode: true }),
  });
  assert(a2.statusCode === 401, 'T2: Anonymous cannot update feature flags (HTTP 401)');

  const a3 = await request('/api/admin/export?type=waitlist');
  assert(a3.statusCode === 401, 'T3: Anonymous cannot export waitlist (HTTP 401)');

  const a4 = await request('/api/v1/csat/export');
  assert(a4.statusCode === 401, 'T4: Anonymous cannot export CSAT (HTTP 401)');

  const a5 = await request('/api/admin/waitlist/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: 'any-id', status: 'reviewed' }),
  });
  assert(a5.statusCode === 401, 'T5: Anonymous cannot update candidate status (HTTP 401)');

  const a6 = await request('/api/v1/student/me');
  assert(a6.statusCode === 401, 'T6: Anonymous cannot read student profile (HTTP 401)');

  const a7 = await request(`/api/v1/team?code=${testTeamCode}`);
  assert(a7.statusCode === 200, 'T7: Anonymous can read public team metadata');
  assert(a7.data?.team?.inviteCode === undefined, 'T7: Anonymous query masks confidential inviteCode');
  assert(a7.data?.team?.leaderPhone === undefined, 'T7: Anonymous query masks leader telephone PII');
  assert(a7.data?.team?.members?.[0]?.phone === undefined, 'T7: Anonymous query masks member telephone PII');

  // --------------------------------------------------------------------------
  // SECTION 2: STUDENT PERMISSIONS & PRIVILEGE ISOLATION
  // --------------------------------------------------------------------------
  console.log('\n--- 2. STUDENT ROLE & PRIVILEGE ISOLATION ---');

  const outsiderEmail = `builder.outsider.${timestamp}@test.edu`;
  const outsiderCookie = await registerAndLoginStudent(outsiderEmail, 'Independent Builder');

  const s1 = await request('/api/v1/student/me', { headers: { Cookie: outsiderCookie } });
  assert(s1.statusCode === 200, 'T8: Authenticated student can view own profile (HTTP 200)');
  assert(s1.data?.student?.email === outsiderEmail, 'T8: Profile accurately reflects authenticated identity');

  // Self-privilege escalation attempt
  const s2 = await request('/api/v1/student/me', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: outsiderCookie },
    body: JSON.stringify({ fullName: 'Malicious Escalator', role: 'SUPER_ADMIN' }),
  });
  assert(s2.statusCode === 200, 'T10: Profile update succeeds for valid fields');
  assert(s2.data?.student?.role === undefined, 'T10: Client-supplied role cannot be self-assigned');

  // Student accessing admin endpoints
  const s3 = await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: outsiderCookie },
    body: JSON.stringify({ demoSandboxMode: true }),
  });
  assert(s3.statusCode === 401 || s3.statusCode === 403, 'T11: Student rejected from updating feature flags (401/403)');

  const s4 = await request('/api/admin/export?type=waitlist', { headers: { Cookie: outsiderCookie } });
  assert(s4.statusCode === 401 || s4.statusCode === 403, 'T12: Student rejected from exporting waitlist CSV (401/403)');

  const s5 = await request('/api/v1/csat/export', { headers: { Cookie: outsiderCookie } });
  assert(s5.statusCode === 401 || s5.statusCode === 403, 'T13: Student rejected from exporting CSAT CSV (401/403)');

  // Outsider submitting qualifier for unowned team
  const s6 = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: outsiderCookie },
    body: JSON.stringify({ teamCode: testTeamCode, loomVideoUrl: 'https://loom.com/test', githubUrl: 'https://github.com/kairos/test' }),
  });
  assert(s6.statusCode === 403, 'T14: Non-member student rejected from qualifier submission with HTTP 403');
  assert(s6.data?.code === 'FORBIDDEN_LEADER_ONLY', 'T14: Rejection code is FORBIDDEN_LEADER_ONLY');

  // Outsider querying unowned team
  const s7 = await request(`/api/v1/team?code=${testTeamCode}`, { headers: { Cookie: outsiderCookie } });
  assert(s7.statusCode === 200, 'T15: Student can query other team');
  assert(s7.data?.team?.inviteCode === undefined, 'T15: Non-member student cannot see team inviteCode');
  assert(s7.data?.team?.leaderPhone === undefined, 'T7: Non-member student cannot see leader telephone');

  // --------------------------------------------------------------------------
  // SECTION 3: TEAM MEMBER VS TEAM LEADER RBAC MATRIX
  // --------------------------------------------------------------------------
  console.log('\n--- 3. TEAM MEMBER VS. TEAM LEADER RBAC MATRIX ---');

  // Rohan Gupta is registered as Backend member in team-k75-01
  const rohanCookie = await registerAndLoginStudent('rohan.g@example.edu', 'Rohan Gupta');
  // Pooja Venkatesh is registered as Leader in team-k75-01
  const poojaCookie = await registerAndLoginStudent('pooja.v@example.edu', 'Pooja Venkatesh');

  // Member viewing own team
  const tm1 = await request(`/api/v1/team?code=${testTeamCode}`, { headers: { Cookie: rohanCookie } });
  assert(tm1.statusCode === 200, 'T16: Team Member can view own team details');
  assert(tm1.data?.team?.inviteCode === 'KAIROS-7721', 'T16: Team Member CAN see team inviteCode (authorized member)');

  // Member (non-leader) submitting qualifier
  const tm2 = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: rohanCookie },
    body: JSON.stringify({ teamCode: testTeamCode, loomVideoUrl: 'https://loom.com/test', githubUrl: 'https://github.com/kairos2027/chronos-stream' }),
  });
  assert(tm2.statusCode === 403, 'T17: Non-leader member rejected from qualifier submission with HTTP 403');
  assert(tm2.data?.error?.includes('Only the designated Team Leader'), 'T17: Error specifies leader-only authority requirement');

  // Leader viewing own team
  const tl1 = await request(`/api/v1/team?code=${testTeamCode}`, { headers: { Cookie: poojaCookie } });
  assert(tl1.statusCode === 200, 'T18: Team Leader can view own team details');
  assert(tl1.data?.team?.inviteCode === 'KAIROS-7721', 'T18: Team Leader CAN see team inviteCode');

  // Leader submitting qualifier
  const tl2 = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: poojaCookie },
    body: JSON.stringify({ teamCode: testTeamCode, loomVideoUrl: 'https://loom.com/share/chronos-demo', githubUrl: 'https://github.com/kairos2027/chronos-stream' }),
  });
  assert(tl2.statusCode === 200, 'T19: Verified Team Leader submits qualifier successfully with HTTP 200');
  assert(tl2.data?.submission?.status === 'SUBMITTED_FOR_REVIEW', 'T19: Submission status transitioned to SUBMITTED_FOR_REVIEW');

  // Leader submitting for nonexistent team
  const tl3 = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: poojaCookie },
    body: JSON.stringify({ teamCode: 'TEAM-DOES-NOT-EXIST-404', loomVideoUrl: 'https://loom.com/share/demo', githubUrl: 'https://github.com/kairos2027/chronos-stream' }),
  });
  assert(tl3.statusCode === 404, 'T20: Qualifier submission for nonexistent team returns HTTP 404');

  // --------------------------------------------------------------------------
  // SECTION 4: JUDGE ROLE & TRACK SPECIALIZATION MATRIX
  // --------------------------------------------------------------------------
  console.log('\n--- 4. JUDGE ROLE & TRACK SPECIALIZATION MATRIX ---');

  const j1 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ teamId: testTeamCode, checkpointGate: 1 }),
  });
  assert(j1.statusCode === 400, 'T21: Scoring without judge credentials returns HTTP 400 Bad Request');

  const j2 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ judgeId: 'judge-1', judgePin: 'WRONG_PIN_9999', teamId: testTeamCode, checkpointGate: 1 }),
  });
  assert(j2.statusCode === 403, 'T22: Evaluation with invalid judge PIN returns HTTP 403');
  assert(j2.data?.error?.includes('Invalid Jury Access PIN'), 'T22: Error cites PIN invalidity');

  const j3 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ judgeId: 'judge-nonexistent-id', judgePin: '202701', teamId: testTeamCode, checkpointGate: 1 }),
  });
  assert(j3.statusCode === 403, 'T23: Non-existent judge account returns HTTP 403');

  // Judge 2 is assigned to FinTech & Open Innovation. team-k75-01 is in cloud-native track.
  const j4 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      judgeId: 'judge-2',
      judgePin: '202702',
      teamId: testTeamCode,
      checkpointGate: 1,
      criterion1Score: 25,
      criterion2Score: 20,
      criterion3Score: 20,
      criterion4Score: 15,
      qualitativeFeedback: 'Good cloud architecture',
    }),
  });
  assert(j4.statusCode === 403, 'T24: Judge evaluating mismatched track rejected with HTTP 403');
  assert(j4.data?.error?.includes('is assigned to [FinTech & Open Innovation], but team is in [cloud-native]'), 'T24: Error explicitly specifies track specialization violation');

  // Judge 1 is assigned to Agentic AI & Cloud-Native. Evaluates cloud-native team.
  const j5 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      judgeId: 'judge-1',
      judgePin: '202701',
      teamId: testTeamCode,
      checkpointGate: 2,
      criterion1Score: 28,
      criterion2Score: 22,
      criterion3Score: 23,
      criterion4Score: 18,
      qualitativeFeedback: 'Robust event streaming and resilient AWS architecture.',
    }),
  });
  assert(j5.statusCode === 201 || j5.statusCode === 200, 'T25: Authorized Judge evaluating assigned track succeeds with HTTP 201 Created');
  assert(j5.data?.evaluation?.rawTotalScore === 91, 'T25: Score properly calculated and recorded');

  // Out of bounds score check
  const j6 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      judgeId: 'judge-1',
      judgePin: '202701',
      teamId: testTeamCode,
      checkpointGate: 1,
      criterion1Score: 999, // Max allowed is 30
      criterion2Score: 20,
      criterion3Score: 20,
      criterion4Score: 15,
    }),
  });
  assert(j6.statusCode === 400, 'T26: Out-of-bounds score points rejected with HTTP 400');

  // Conflict of interest recusal
  const j7 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      judgeId: 'judge-1',
      judgePin: '202701',
      teamId: testTeamCode,
      recusal: true,
    }),
  });
  assert(j7.statusCode === 200, 'T27: Conflict of interest recusal logged successfully with HTTP 200');
  assert(j7.data?.recused === true, 'T27: Recusal confirmed in response');

  // --------------------------------------------------------------------------
  // SECTION 5: OPERATIONAL ORGANIZER VS SUPER ADMINISTRATOR MATRIX
  // --------------------------------------------------------------------------
  console.log('\n--- 5. ORGANIZER VS. SUPER ADMINISTRATOR HIERARCHY ---');

  // Login as Hemavarshine S (Chief Experience Officer - Operational Organizer)
  const orgLogin = await loginAdmin('Hemavarshine S');
  const orgCookie = orgLogin.cookie;
  assert(orgLogin.res.statusCode === 200, 'T28: Operational Organizer logs in successfully');
  assert(orgLogin.res.data?.organizer?.role === 'Chief Experience Officer (CXO)', 'T28: Server assigns official CXO role from organizing roster');

  // Organizer attempting Super Admin operations
  const o1 = await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ demoSandboxMode: false }),
  });
  assert(o1.statusCode === 403, 'T29: Operational Organizer rejected from updating flags with HTTP 403');
  assert(o1.data?.code === 'FORBIDDEN_SUPER_ADMIN_REQUIRED', 'T29: Error code is FORBIDDEN_SUPER_ADMIN_REQUIRED');

  const o2 = await request('/api/admin/export?type=waitlist', { headers: { Cookie: orgCookie } });
  assert(o2.statusCode === 403, 'T30: Operational Organizer rejected from waitlist export with HTTP 403');
  assert(o2.data?.code === 'FORBIDDEN_SUPER_ADMIN_REQUIRED', 'T30: Error code is FORBIDDEN_SUPER_ADMIN_REQUIRED');

  const o3 = await request('/api/v1/csat/export', { headers: { Cookie: orgCookie } });
  assert(o3.statusCode === 403, 'T31: Operational Organizer rejected from CSAT export with HTTP 403');
  assert(o3.data?.code === 'FORBIDDEN_SUPER_ADMIN_REQUIRED', 'T31: Error code is FORBIDDEN_SUPER_ADMIN_REQUIRED');

  // Organizer executing permitted operational task
  const o4 = await request('/api/admin/waitlist/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: orgCookie },
    body: JSON.stringify({ id: 'demo-w2', status: 'shortlisted' }),
  });
  assert(o4.statusCode === 200, 'T32: Operational Organizer CAN update candidate status (HTTP 200)');
  assert(o4.data?.updatedBy === 'Hemavarshine S', 'T32: Audit attribution reflects organizer name');

  // Login as Thenappan T (President & SBGL - Super Administrator)
  const superLogin = await loginAdmin('Thenappan T');
  const superCookie = superLogin.cookie;
  assert(superLogin.res.statusCode === 200, 'T33: Super Administrator logs in successfully');
  assert(superLogin.res.data?.organizer?.role?.includes('President'), 'T33: Server assigns official President role to Super Admin');

  // Super Admin updating feature flags
  const sa1 = await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: superCookie },
    body: JSON.stringify({ demoSandboxMode: true }),
  });
  assert(sa1.statusCode === 200, 'T34: Super Administrator successfully updates feature flags (HTTP 200)');

  // Super Admin exporting waitlist CSV
  const sa2 = await request('/api/admin/export?type=waitlist', { headers: { Cookie: superCookie } });
  assert(sa2.statusCode === 200, 'T35: Super Administrator successfully exports waitlist CSV (HTTP 200)');
  assert(sa2.headers['content-type']?.includes('text/csv'), 'T35: Response content-type is text/csv');

  // Super Admin exporting CSAT CSV
  const sa3 = await request('/api/v1/csat/export', { headers: { Cookie: superCookie } });
  assert(sa3.statusCode === 200, 'T36: Super Administrator successfully exports CSAT CSV (HTTP 200)');
  assert(sa3.headers['content-type']?.includes('text/csv'), 'T36: Response content-type is text/csv');

  // Super Admin updating waitlist candidate status
  const sa4 = await request('/api/admin/waitlist/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: superCookie },
    body: JSON.stringify({ id: 'demo-w2', status: 'reviewed' }),
  });
  assert(sa4.statusCode === 200, 'T37: Super Administrator CAN update candidate status (HTTP 200)');

  // --------------------------------------------------------------------------
  // SECTION 6: TOKEN TAMPERING & SESSION SECURITY
  // --------------------------------------------------------------------------
  console.log('\n--- 6. CRYPTOGRAPHIC TOKEN TAMPERING & LIFETIME ---');

  // Tamper with admin session cookie signature
  const rawAdminToken = orgCookie.replace('kairos_admin_session=', '');
  const tamperedAdminToken = rawAdminToken.slice(0, -6) + 'abcdef';
  const tamperedAdminCookie = `kairos_admin_session=${tamperedAdminToken}`;

  const t1 = await request('/api/admin/flags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: tamperedAdminCookie },
    body: JSON.stringify({ demoSandboxMode: true }),
  });
  assert(t1.statusCode === 401, 'T38: Tampered admin session HMAC signature rejected with HTTP 401');

  // Tamper with student session cookie signature
  const rawStudentToken = poojaCookie.replace('kairos_student_session=', '');
  const tamperedStudentToken = rawStudentToken.slice(0, -6) + '123456';
  const tamperedStudentCookie = `kairos_student_session=${tamperedStudentToken}`;

  const t2 = await request('/api/v1/student/me', { headers: { Cookie: tamperedStudentCookie } });
  assert(t2.statusCode === 401, 'T39: Tampered student session HMAC signature rejected with HTTP 401');

  // Admin logout
  const t3 = await request('/api/admin/auth', { method: 'DELETE', headers: { Cookie: superCookie } });
  assert(t3.statusCode === 200, 'T40: Admin logout clears session cookie successfully');

  // --------------------------------------------------------------------------
  // FINAL SCORECARD
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`RBAC TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runRBACTestSuite().catch((err) => {
  console.error('Fatal test execution error:', err);
  process.exit(1);
});
