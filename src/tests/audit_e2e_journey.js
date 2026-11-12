/**
 * KAIROS 2027 — AUDIT: COMPLETE END-TO-END USER JOURNEY LIFECYCLE
 * 
 * Verifies the 15-step complete participant and operational lifecycle:
 * Step 1: Student visits website (Homepage /)
 * Step 2: Student early-interest registration (/api/v1/register)
 * Step 3: Student account registration (/api/auth/register)
 * Step 4: Email verification with cryptographic token (/api/auth/verify)
 * Step 5: Secure student login & session issuance (/api/auth/login)
 * Step 6: Team creation with 300-word abstract & track selection (/api/v1/team)
 * Step 7: Leader dispatches teammate invitation (/api/v1/team/invite)
 * Step 8: Teammate registers, verifies, and joins squad (/api/v1/team)
 * Step 9: Abstract inspection & member roster confirmation
 * Step 10: Organizer review & remarks (/api/admin/teams)
 * Step 11: Team shortlisted for On-Campus cohort (/api/admin/teams)
 * Step 12: Team submits Round 1 qualifier deliverables (/api/v1/qualifier/submit)
 * Step 13: Technical Judge evaluates squad across 4-criterion rubric (/api/v1/judging/submit-score)
 * Step 14: Live leaderboard reflects real scores, Z-scores & rankings (/api/v1/leaderboard)
 * Step 15: Telemetry confirms transactional email dispatches at every milestone
 * Step 16: Participant check-in on-campus via desk scanner (/api/admin/checkin)
 */

const http = require('http');

const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`;
const ADMIN_PASSKEY = '9f8c3e1a7b4d0e6f2a5b8c1d3e7f9a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d1e3f';

function request(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: { ...(options.headers || {}) },
      timeout: 10000,
    };

    let payload = null;
    if (options.body) {
      payload = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
      reqOptions.headers['Content-Length'] = Buffer.byteLength(payload);
      if (!reqOptions.headers['Content-Type']) {
        reqOptions.headers['Content-Type'] = 'application/json';
      }
    }

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
      reject(new Error(`Request timed out to ${urlPath}`));
    });

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

function extractCookie(headers, cookieName) {
  const setCookie = headers['set-cookie'];
  if (!setCookie) return null;
  const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
  for (const c of cookies) {
    const match = c.match(new RegExp(`^${cookieName}=([^;]+)`));
    if (match) return match[1];
  }
  return null;
}

let passed = 0;
let failed = 0;
const stepTimings = [];

function assertStep(stepNum, description, condition, extraInfo = '') {
  if (condition) {
    console.log(`  \x1b[32m✔ [STEP ${stepNum} PASS]\x1b[0m ${description}`);
    passed++;
  } else {
    console.log(`  \x1b[31m✘ [STEP ${stepNum} FAIL]\x1b[0m ${description} ${extraInfo ? `— Details: ${extraInfo}` : ''}`);
    failed++;
  }
}

async function runJourneyAudit() {
  console.log('\n========================================================================');
  console.log('  KAIROS 2027: COMPLETE END-TO-END USER JOURNEY LIFECYCLE AUDIT');
  console.log('========================================================================\n');

  const runId = Date.now().toString(36);
  const leaderEmail = `audit.leader.${runId}@sist.edu.in`;
  const memberEmail = `audit.member.${runId}@sist.edu.in`;
  const teamName = `Apex Autonomous Swarm ${runId}`;

  // STEP 1: Student visits website
  const t0 = Date.now();
  const step1 = await request('/');
  stepTimings.push({ step: 1, name: 'Visit Homepage', latency: Date.now() - t0 });
  assertStep(1, 'Student visits landing page (HTTP 200 OK)', step1.statusCode === 200);

  // STEP 2: Early-interest Registration
  const t1 = Date.now();
  const step2 = await request('/api/v1/register', {
    method: 'POST',
    body: {
      fullName: `Dr. Vikramaditya ${runId}`,
      email: leaderEmail,
      institution: 'Sathyabama Institute of Science and Technology',
      preferredTrack: 'Agentic AI & Autonomous Systems',
      yearOfStudy: 'Final Year B.Tech CSE',
      department: 'Computer Science & Cloud Engineering',
      portfolioUrl: 'https://github.com/vikram-autonomous',
      motivation: 'Building multi-agent distributed cloud swarms with sub-second latency on AWS Lambda and Amazon Bedrock.'
    }
  });
  stepTimings.push({ step: 2, name: 'Early Registration', latency: Date.now() - t1 });
  assertStep(2, 'Early registration submitted and stored (HTTP 201 Created)', 
    step2.statusCode === 201 && step2.data?.success === true
  );

  // STEP 3: Account Creation
  const t2 = Date.now();
  const step3 = await request('/api/auth/register', {
    method: 'POST',
    body: {
      email: leaderEmail,
      password: 'SuperSecurePassword2027!',
      fullName: `Dr. Vikramaditya ${runId}`,
      institution: 'Sathyabama University',
      preferredTrack: 'Agentic AI & Autonomous Systems'
    }
  });
  stepTimings.push({ step: 3, name: 'Account Creation', latency: Date.now() - t2 });
  const verificationToken = step3.data?.verificationToken;
  assertStep(3, 'Student account created with verification token issued (HTTP 201 Created)',
    step3.statusCode === 201 && !!verificationToken
  );

  // STEP 4: Email Verification
  const t3 = Date.now();
  const step4 = await request('/api/auth/verify', {
    method: 'POST',
    body: { token: verificationToken }
  });
  stepTimings.push({ step: 4, name: 'Email Verification', latency: Date.now() - t3 });
  assertStep(4, 'Student email successfully verified (HTTP 200 OK)',
    step4.statusCode === 200 && step4.data?.student?.emailVerified === true
  );

  // STEP 5: Student Login & Session Verification
  const t4 = Date.now();
  const step5 = await request('/api/auth/login', {
    method: 'POST',
    body: {
      email: leaderEmail,
      password: 'SuperSecurePassword2027!'
    }
  });
  stepTimings.push({ step: 5, name: 'Student Login', latency: Date.now() - t4 });
  const leaderCookie = extractCookie(step5.headers, 'kairos_student_session');
  assertStep(5, 'Student logs in and receives signed HMAC session cookie (HTTP 200 OK)',
    step5.statusCode === 200 && !!leaderCookie
  );

  const leaderHeaders = {
    'Content-Type': 'application/json',
    'Cookie': `kairos_student_session=${leaderCookie}`
  };

  // STEP 6: Team Creation with Abstract
  const t5 = Date.now();
  const step6 = await request('/api/v1/team', {
    method: 'POST',
    headers: leaderHeaders,
    body: {
      teamName,
      trackId: 'track-agentic-ai',
      problemTitle: 'Decentralized Autonomous Fault-Tolerant Consensus Swarms',
      problemAbstract: 'This project implements an event-driven consensus engine utilizing AWS Step Functions, Amazon Bedrock Agentic Core, and Amazon DynamoDB global tables. It provides Byzantine fault tolerance across untrusted edge devices with sub-10ms heartbeat validation and automatic failover.',
      cloudArchitectureBlueprint: 'https://storage.kairos2027.internal/blueprints/apex-swarm.pdf',
      lead: {
        fullName: `Dr. Vikramaditya ${runId}`,
        email: leaderEmail,
        phone: '9840123456',
        registerNo: `REG${runId.toUpperCase()}`,
        college: 'SIST Chennai',
        githubUrl: 'https://github.com/vikram-apex'
      }
    }
  });
  stepTimings.push({ step: 6, name: 'Team Creation', latency: Date.now() - t5 });
  const createdTeam = step6.data?.team;
  const teamCode = createdTeam?.teamCode;
  const inviteCode = createdTeam?.inviteCode;
  assertStep(6, `Team created with unique code ${teamCode} and invite code ${inviteCode} (HTTP 201 Created)`,
    step6.statusCode === 201 && !!teamCode && !!inviteCode
  );

  // STEP 7: Invite Teammates
  const t6 = Date.now();
  const step7 = await request('/api/v1/team/invite', {
    method: 'POST',
    headers: leaderHeaders,
    body: {
      teamCode,
      inviteeEmail: memberEmail,
      inviteeName: 'Ananya Systems Architect'
    }
  });
  stepTimings.push({ step: 7, name: 'Team Invite Dispatch', latency: Date.now() - t6 });
  assertStep(7, `Leader invites teammate via official invitation dispatch (HTTP 200 OK)`,
    step7.statusCode === 200 && step7.data?.success === true && step7.data?.recipient === memberEmail
  );

  // STEP 8: Teammate Registers, Verifies, and Joins Team
  const t7 = Date.now();
  const mReg = await request('/api/auth/register', {
    method: 'POST',
    body: {
      email: memberEmail,
      password: 'TeammatePassword2027!',
      fullName: 'Ananya Systems Architect',
      institution: 'SIST Chennai',
      preferredTrack: 'Agentic AI & Autonomous Systems'
    }
  });
  await request('/api/auth/verify', { method: 'POST', body: { token: mReg.data?.verificationToken } });
  const mLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { email: memberEmail, password: 'TeammatePassword2027!' }
  });
  const memberCookie = extractCookie(mLogin.headers, 'kairos_student_session');

  const step8 = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Cookie': `kairos_student_session=${memberCookie}` },
    body: {
      teamCode,
      member: {
        fullName: 'Ananya Systems Architect',
        email: memberEmail,
        phone: '9840987654',
        college: 'SIST',
        registerNo: `REG-M-${runId.toUpperCase()}`,
        role: 'AI / Cloud'
      }
    }
  });
  stepTimings.push({ step: 8, name: 'Teammate Join', latency: Date.now() - t7 });
  assertStep(8, 'Teammate joins squad roster with role AI / Cloud (HTTP 200 OK)',
    step8.statusCode === 200 && step8.data?.team?.members?.length >= 2
  );

  // STEP 9: Inspect Team Abstract and Roster
  const t8 = Date.now();
  const step9 = await request(`/api/v1/team?code=${teamCode}`, { headers: leaderHeaders });
  stepTimings.push({ step: 9, name: 'Team Inspection', latency: Date.now() - t8 });
  const fetchedTeam = step9.data?.team;
  assertStep(9, 'Leader accesses full team profile with unmasked inviteCode and 2 members (HTTP 200 OK)',
    step9.statusCode === 200 &&
    fetchedTeam?.inviteCode === inviteCode &&
    fetchedTeam?.members?.length === 2 &&
    fetchedTeam?.problemTitle?.includes('Consensus Swarms')
  );

  // Authenticate Admin (Thenappan T - Super Admin / President)
  const adminAuthRes = await request('/api/admin/auth', {
    method: 'POST',
    body: { passkey: ADMIN_PASSKEY, organizerName: 'Thenappan T' }
  });
  const adminCookie = extractCookie(adminAuthRes.headers, 'kairos_admin_session');
  const adminHeaders = {
    'Content-Type': 'application/json',
    'Cookie': `kairos_admin_session=${adminCookie}`
  };

  // STEP 10: Organizer Reviews Abstract & Adds Notes
  const t9 = Date.now();
  const step10 = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: adminHeaders,
    body: {
      teamCode,
      reviewerNotes: 'Exceptional architectural rigor. Multi-agent state sync on DynamoDB global tables is highly scalable.'
    }
  });
  stepTimings.push({ step: 10, name: 'Organizer Review', latency: Date.now() - t9 });
  assertStep(10, 'Organizer reviews abstract and saves reviewer remarks (HTTP 200 OK)',
    step10.statusCode === 200 && step10.data?.team?.reviewerNotes?.includes('DynamoDB global tables')
  );

  // STEP 11: Team Gets Shortlisted for On-Campus Cohort
  const t10 = Date.now();
  const step11 = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: adminHeaders,
    body: {
      teamCode,
      selectionStage: 'ON_CAMPUS_QUALIFIED',
      deskBayAllocation: 'BAY-A01 (Main Auditorium Stage Wing)',
      awsCreditVoucher: `AWS-KAIROS-FINALS-${runId.toUpperCase()}`
    }
  });
  stepTimings.push({ step: 11, name: 'Shortlist Qualification', latency: Date.now() - t10 });
  assertStep(11, 'Team shortlisted to ON_CAMPUS_QUALIFIED with desk bay allocated (HTTP 200 OK)',
    step11.statusCode === 200 && 
    step11.data?.team?.selectionStage === 'ON_CAMPUS_QUALIFIED' &&
    step11.data?.team?.deskBayAllocation?.includes('BAY-A01')
  );

  // STEP 12: Team Submits Round 1 Qualifier Deliverables
  const t11 = Date.now();
  const step12 = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: leaderHeaders,
    body: {
      teamCode,
      githubUrl: `https://github.com/kairos-builders/apex-swarm-${runId}`,
      loomVideoUrl: `https://loom.com/share/apex-swarm-defense-${runId}`,
      defenseSlotRequested: '2027-01-08T10:00:00+05:30'
    }
  });
  stepTimings.push({ step: 12, name: 'Qualifier Deliverables Submission', latency: Date.now() - t11 });
  assertStep(12, 'Leader submits GitHub repo and Loom defense walkthrough video (HTTP 200 OK)',
    step12.statusCode === 200 && step12.data?.success === true
  );

  // STEP 13: Judge Authenticates and Evaluates Team across 4 Criteria Rubric
  const t12 = Date.now();
  // Judge 1 (Vikrant Roy - Agentic AI Specialist)
  const judgeAuth = await request('/api/v1/judging/auth', {
    method: 'POST',
    body: { accessPin: '202701' }
  });
  const judgeCookie = extractCookie(judgeAuth.headers, 'kairos_judge_session');
  const judgeHeaders = {
    'Content-Type': 'application/json',
    'Cookie': `kairos_judge_session=${judgeCookie}`
  };

  const step13 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: judgeHeaders,
    body: {
      judgeId: 'judge-1',
      teamId: teamCode,
      checkpointGate: 1,
      criterion1Score: 29, // Cloud Architecture & Well-Architected (max 30)
      criterion2Score: 24, // Technical Complexity & Execution (max 25)
      criterion3Score: 24, // Innovation & AI Capabilities (max 25)
      criterion4Score: 19, // Demo & Production Readiness (max 20)
      qualitativeFeedback: 'Extraordinary multi-region consensus model. Serverless architecture demonstrates pristine idempotency.'
    }
  });
  stepTimings.push({ step: 13, name: 'Judge Evaluation', latency: Date.now() - t12 });
  const rawTotalScore = step13.data?.evaluation?.rawTotalScore;
  assertStep(13, `Judge 1 records Checkpoint 1 evaluation: 96/100 points with calibrated Z-Score (HTTP 201 Created)`,
    step13.statusCode === 201 && rawTotalScore === 96
  );

  // STEP 14: Leaderboard Updates Standings
  const t13 = Date.now();
  const step14 = await request('/api/v1/leaderboard');
  stepTimings.push({ step: 14, name: 'Leaderboard Query', latency: Date.now() - t13 });
  const leaderboard = step14.data?.standings || step14.data?.leaderboard || [];
  const teamEntry = leaderboard.find(t => t.teamCode === teamCode);
  assertStep(14, `Live leaderboard recalculates rankings and places ${teamCode} with 96.0 points (HTTP 200 OK)`,
    step14.statusCode === 200 &&
    !!teamEntry &&
    (teamEntry.rawTotal === 96 || teamEntry.totalScore === 96) &&
    typeof teamEntry.rank === 'number'
  );

  // STEP 15: Telemetry Confirms Notification Dispatches at Every Milestone
  const t14 = Date.now();
  // Small pause to allow background email tasks to settle
  await new Promise(r => setTimeout(r, 300));
  const step15 = await request(`/api/admin/notifications?search=${encodeURIComponent(runId)}`, {
    headers: adminHeaders
  });
  stepTimings.push({ step: 15, name: 'Notification Telemetry Check', latency: Date.now() - t14 });
  const notifLogs = step15.data?.logs || [];
  const foundVerification = notifLogs.some(l => l.template === 'email-verification');
  const foundTeamCreate = notifLogs.some(l => l.template === 'team-creation');
  const foundTeamInvite = notifLogs.some(l => l.template === 'team-invitation');
  const foundTeamJoin = notifLogs.some(l => l.template === 'team-joining-confirmation');
  const foundReview = notifLogs.some(l => l.template === 'abstract-review-decision');
  const foundQualifier = notifLogs.some(l => l.template === 'qualifier-submission-confirmation');

  assertStep(15, `Persistent audit log verifies transactional notifications across all 6 milestones`,
    foundVerification && foundTeamCreate && foundTeamInvite && foundTeamJoin && foundReview && foundQualifier,
    `Logs recorded: ${notifLogs.length} events`
  );

  // STEP 16: Check-in at Venue
  const t15 = Date.now();
  const step16 = await request('/api/admin/checkin', {
    method: 'POST',
    headers: adminHeaders,
    body: { teamCode }
  });
  stepTimings.push({ step: 16, name: 'Venue Check-in', latency: Date.now() - t15 });
  assertStep(16, `Participant team checked in on-campus at registration desk (HTTP 200 OK)`,
    step16.statusCode === 200 && step16.data?.team?.checkedIn === true
  );

  // Duplicate Check-in Prevention
  const dupCheckin = await request('/api/admin/checkin', {
    method: 'POST',
    headers: adminHeaders,
    body: { teamCode }
  });
  assertStep(16.1, `Duplicate check-in attempt properly rejected with HTTP 409 Conflict`,
    dupCheckin.statusCode === 409 && dupCheckin.data?.alreadyCheckedIn === true
  );

  // SUMMARY & LATENCY TABLE
  console.log('\n------------------------------------------------------------------------');
  console.log('  LIFECYCLE STEP LATENCY PROFILE');
  console.log('------------------------------------------------------------------------');
  for (const item of stepTimings) {
    const bar = '█'.repeat(Math.min(Math.round(item.latency / 10), 30));
    console.log(`  Step ${String(item.step).padStart(2)}: ${item.name.padEnd(35)} ${String(item.latency).padStart(4)}ms ${bar}`);
  }
  console.log('------------------------------------------------------------------------');
  console.log(`\nTOTAL LIFECYCLE AUDIT: ${passed} PASSED / ${failed} FAILED (${passed + failed} TOTAL)`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runJourneyAudit().catch((err) => {
  console.error('[JOURNEY AUDIT FATAL ERROR]:', err);
  process.exit(1);
});
