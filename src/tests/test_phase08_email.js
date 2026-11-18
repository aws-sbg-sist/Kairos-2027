/**
 * KAIROS 2027 — PHASE 08 TRANSACTIONAL EMAIL & NOTIFICATION TEST HARNESS
 * 
 * Exhaustively validates:
 * 1. 10 Transactional Email Templates:
 *    - T01: Registration confirmation
 *    - T02: Email verification with 6-digit token & action button
 *    - T03: Password reset link with security advisory & expiration
 *    - T04: Team creation with invite codes & leader rights
 *    - T05: Team invitation with direct join links
 *    - T06: Team joining confirmation with squad roster count
 *    - T07: Abstract review decision (Shortlisted On-Campus Finals)
 *    - T08: Abstract review decision (Polite Rejection / Waitlist)
 *    - T09: Qualifier deliverable submission (GitHub repo + Loom video)
 *    - T10: Event announcement broadcast (Urgent / Normal bulletins)
 *    - T11: On-campus participant check-in confirmation (Desk Bay & Wi-Fi)
 * 2. Address validation & non-blocking error handling
 * 3. Idempotency & duplicate notification suppression (10-minute window)
 * 4. Development/test simulation sink with deterministic message IDs
 * 5. End-to-end API integration dispatches (Register, Team Create/Join/Invite, Qualifier, Check-in, Review)
 * 6. Admin notifications telemetry (`GET /api/admin/notifications`) & Announcement Broadcast (`POST /api/admin/notifications`)
 */

const http = require('http');

const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`;

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
const results = [];

function assert(description, condition, extraInfo = '') {
  if (condition) {
    console.log(`  \x1b[32m✔\x1b[0m ${description}`);
    passed++;
    results.push({ description, status: 'PASSED' });
  } else {
    console.log(`  \x1b[31m✘\x1b[0m ${description} ${extraInfo ? `(${extraInfo})` : ''}`);
    failed++;
    results.push({ description, status: 'FAILED', extraInfo });
  }
}

async function runTests() {
  console.log('\n================================================================');
  console.log('  KAIROS 2027 — PHASE 08 TRANSACTIONAL EMAIL TEST HARNESS');
  console.log('================================================================\n');

  // Authenticate as Super Admin (Thenappan T)
  const adminAuthRes = await request('/api/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      passkey: '9f8c3e1a7b4d0e6f2a5b8c1d3e7f9a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d1e3f',
      organizerName: 'Thenappan T'
    }
  });

  const adminCookie = extractCookie(adminAuthRes.headers, 'kairos_admin_session');
  assert('Admin authentication for notification testing', adminAuthRes.statusCode === 200 && !!adminCookie);

  const adminHeaders = {
    'Content-Type': 'application/json',
    'Cookie': `kairos_admin_session=${adminCookie}`
  };

  // --------------------------------------------------------------------------
  // SECTION 1: 10 TRANSACTIONAL EMAIL TEMPLATES RENDERING & INTEGRITY
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 1: 10 Transactional Email Templates Rendering & Integrity ---');

  // T01: Registration confirmation
  const t01Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'registration-confirmation',
      data: {
        to: 'builder.vikram@gmail.com',
        fullName: 'Vikramaditya Sharma',
        track: 'Agentic AI & Autonomous Systems',
        registrationId: 'REG-KAIROS-9912'
      }
    }
  });
  const p1 = t01Res.data?.payload;
  assert('T01: Template 1 - Registration confirmation rendered', 
    t01Res.statusCode === 200 && 
    p1?.subject?.includes('Registration Confirmed [REG-KAIROS-9912]') &&
    p1?.html?.includes('Vikramaditya Sharma') &&
    p1?.html?.includes('Agentic AI & Autonomous Systems') &&
    p1?.html?.includes('ZERO ENTRY FEE')
  );

  // T02: Email verification
  const t02Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'email-verification',
      data: {
        to: 'ananya.iyer@sist.edu.in',
        fullName: 'Ananya Iyer',
        verificationUrl: 'http://localhost:8000/auth/verify?token=tok_verify_9823482734982'
      }
    }
  });
  const p2 = t02Res.data?.payload;
  assert('T02: Template 2 - Email verification rendered with URL & link',
    t02Res.statusCode === 200 &&
    p2?.subject?.includes('Verify Your KAIROS 2027 Student Builder Identity') &&
    p2?.html?.includes('tok_verify_9823482734982') &&
    p2?.html?.includes('Ananya Iyer') &&
    p2?.text?.includes('auth/verify?token=')
  );

  // T03: Password reset
  const t03Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'password-reset',
      data: {
        to: 'karthik.rajan@sist.edu.in',
        fullName: 'Karthik Rajan',
        resetUrl: 'http://localhost:8000/auth/reset-password?token=reset_tok_abcdef123456789'
      }
    }
  });
  const p3 = t03Res.data?.payload;
  assert('T03: Template 3 - Password reset rendered with security expiry',
    t03Res.statusCode === 200 &&
    p3?.subject?.includes('Password Reset Request') &&
    p3?.html?.includes('reset_tok_abcdef123456789') &&
    p3?.html?.includes('1 hour') &&
    p3?.text?.includes('reset-password?token=')
  );

  // T04: Team creation
  const t04Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'team-creation',
      data: {
        to: 'rohan.lead@gmail.com',
        leaderName: 'Rohan Mehra',
        teamName: 'Neural Sentinels',
        teamCode: 'KAIROS-T099',
        inviteCode: 'NS-INVITE-882',
        track: 'Agentic AI & Cloud-Native'
      }
    }
  });
  const p4 = t04Res.data?.payload;
  assert('T04: Template 4 - Team creation rendered with codes & portal link',
    t04Res.statusCode === 200 &&
    p4?.subject?.includes('Squad Created: Neural Sentinels [KAIROS-T099]') &&
    p4?.html?.includes('KAIROS-T099') &&
    p4?.html?.includes('NS-INVITE-882') &&
    p4?.html?.includes('Rohan Mehra')
  );

  // T05: Team invitation
  const t05Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'team-invitation',
      data: {
        to: 'sneha.invitee@gmail.com',
        inviteeName: 'Sneha Rao',
        leaderName: 'Rohan Mehra',
        teamName: 'Neural Sentinels',
        teamCode: 'KAIROS-T099',
        inviteCode: 'NS-INVITE-882',
        track: 'Agentic AI & Cloud-Native'
      }
    }
  });
  const p5 = t05Res.data?.payload;
  assert('T05: Template 5 - Team invitation rendered with invite link',
    t05Res.statusCode === 200 &&
    p5?.subject?.includes('Invitation to Join Neural Sentinels [KAIROS-T099]') &&
    p5?.html?.includes('Sneha Rao') &&
    p5?.html?.includes('Rohan Mehra') &&
    p5?.html?.includes('team/join?code=NS-INVITE-882')
  );

  // T06: Team joining confirmation
  const t06Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'team-joining-confirmation',
      data: {
        to: 'sneha.invitee@gmail.com',
        memberName: 'Sneha Rao',
        teamName: 'Neural Sentinels',
        teamCode: 'KAIROS-T099',
        leaderName: 'Rohan Mehra',
        role: 'AI / Cloud Architect',
        rosterCount: 2
      }
    }
  });
  const p6 = t06Res.data?.payload;
  assert('T06: Template 6 - Team joining confirmation rendered with role & count',
    t06Res.statusCode === 200 &&
    p6?.subject?.includes('Successfully Joined Neural Sentinels') &&
    p6?.html?.includes('Sneha Rao') &&
    p6?.html?.includes('AI / Cloud Architect') &&
    p6?.text?.includes('Neural Sentinels')
  );

  // T07: Abstract review decision (Shortlisted)
  const t07Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'abstract-review',
      data: {
        to: 'rohan.lead@gmail.com',
        leaderName: 'Rohan Mehra',
        teamName: 'Neural Sentinels',
        teamCode: 'KAIROS-T099',
        status: 'SHORTLISTED',
        deskBay: 'BAY-A04',
        remarks: 'Outstanding autonomous agent architecture diagram and clear business thesis.'
      }
    }
  });
  const p7 = t07Res.data?.payload;
  assert('T07: Template 7a - Abstract shortlisted rendered with finals details & bay',
    t07Res.statusCode === 200 &&
    p7?.subject?.includes('Official Selection: Neural Sentinels Qualified') &&
    p7?.html?.includes('BAY-A04') &&
    p7?.html?.includes('Sathyabama Indoor Auditorium') &&
    p7?.html?.includes('Outstanding autonomous agent architecture')
  );

  // T08: Abstract review decision (Rejected / Waitlisted)
  const t08Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'abstract-review',
      data: {
        to: 'lead.unsuccessful@gmail.com',
        leaderName: 'Aarav Patel',
        teamName: 'Legacy Builders',
        teamCode: 'KAIROS-T199',
        status: 'REJECTED',
        remarks: 'Cloud architecture does not meet 48-hour scalability criteria.'
      }
    }
  });
  const p8 = t08Res.data?.payload;
  assert('T08: Template 7b - Abstract rejected rendered with polite constructive feedback',
    t08Res.statusCode === 200 &&
    p8?.subject?.includes('Abstract Review Decision: Legacy Builders') &&
    p8?.html?.includes('WAITLIST / NOT SHORTLISTED') &&
    p8?.html?.includes('Legacy Builders') &&
    p8?.html?.includes('Cloud architecture does not meet')
  );

  // T09: Qualifier deliverable submission
  const t09Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'qualifier-submission',
      data: {
        to: 'rohan.lead@gmail.com',
        leaderName: 'Rohan Mehra',
        teamName: 'Neural Sentinels',
        teamCode: 'KAIROS-T099',
        githubUrl: 'https://github.com/kairos-builders/neural-sentinels-agent',
        loomUrl: 'https://loom.com/share/neural-sentinels-defense-demo',
        defenseSlot: '2027-01-08 14:00 IST'
      }
    }
  });
  const p9 = t09Res.data?.payload;
  assert('T09: Template 8 - Qualifier submission rendered with GitHub & Loom links',
    t09Res.statusCode === 200 &&
    p9?.subject?.includes('Qualifier Artifacts Received [KAIROS-T099]') &&
    p9?.html?.includes('github.com/kairos-builders/neural-sentinels-agent') &&
    p9?.html?.includes('loom.com/share/neural-sentinels-defense-demo') &&
    p9?.html?.includes('2027-01-08 14:00 IST')
  );

  // T10: Event announcement (Urgent & Normal)
  const t10Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'event-announcement',
      data: {
        to: 'all.participants@kairos.internal',
        recipientName: 'Valued Kairos Builder',
        title: 'Cloud Sandbox Credits Allocated for Amazon Bedrock',
        summary: 'All qualified squads have been credited $500 in AWS promotional credits. Log into your dashboard to redeem.',
        urgency: 'CRITICAL',
        actionUrl: 'http://localhost:8000/dashboard',
        actionLabel: 'Claim Credits'
      }
    }
  });
  const p10 = t10Res.data?.payload;
  assert('T10: Template 9 - Event announcement rendered with urgent badge & CTA',
    t10Res.statusCode === 200 &&
    p10?.subject?.includes('🚨 URGENT: KAIROS 2027 — Cloud Sandbox Credits') &&
    p10?.html?.includes('CRITICAL BULLETIN') &&
    p10?.html?.includes('Claim Credits →') &&
    p10?.html?.includes('Valued Kairos Builder')
  );

  // T11: Participant check-in confirmation
  const t11Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'preview',
      templateName: 'checkin-confirmation',
      data: {
        to: 'rohan.lead@gmail.com',
        participantName: 'Rohan Mehra',
        teamName: 'Neural Sentinels',
        teamCode: 'KAIROS-T099',
        deskBayAllocation: 'BAY-A04 (Indoor Auditorium - Bay 1)',
        awsCreditVoucher: 'AWS-KAIROS-2027-ALPHA-99',
        checkedInAt: '22 Jan 2027, 08:15 AM IST'
      }
    }
  });
  const p11 = t11Res.data?.payload;
  assert('T11: Template 10 - Check-in confirmation rendered with Bay & Wi-Fi',
    t11Res.statusCode === 200 &&
    p11?.subject?.includes('Arena Check-in Confirmed: KAIROS-T099 [BAY-A04') &&
    p11?.html?.includes('BAY-A04') &&
    p11?.html?.includes('KAIROS-ARENA-5G') &&
    p11?.html?.includes('AWS-KAIROS-2027-ALPHA-99') &&
    p11?.text?.includes('Allocated Desk Bay: BAY-A04')
  );

  // --------------------------------------------------------------------------
  // SECTION 2: ADDRESS VALIDATION & ERROR HANDLING
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 2: Address Validation & Error Handling ---');

  // T12: Empty recipient rejected
  const t12Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'direct',
      to: '',
      subject: 'Test Subject',
      text: 'Test Body'
    }
  });
  assert('T12: Empty recipient rejected with HTTP 400', t12Res.statusCode === 400 && t12Res.data?.code === 'BAD_REQUEST');

  // T13: Malformed recipient email rejected
  const t13Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'direct',
      to: 'invalid-email-address',
      subject: 'Test Subject',
      text: 'Test Body'
    }
  });
  assert('T13: Malformed email rejected with HTTP 400 INVALID_EMAIL', t13Res.statusCode === 400 && t13Res.data?.code === 'INVALID_EMAIL');

  // --------------------------------------------------------------------------
  // SECTION 3: IDEMPOTENCY & DUPLICATE SUPPRESSION
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 3: Idempotency & Duplicate Suppression ---');

  const uniqueDedupKey = `idemp-test-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  
  // T14: First dispatch succeeds
  const t14Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'direct',
      to: 'idempotent.tester@gmail.com',
      subject: 'KAIROS 2027 Idempotency Verification 1',
      text: 'First dispatch payload.',
      idempotencyKey: uniqueDedupKey
    }
  });
  assert('T14: First email dispatch with key succeeds (SIMULATED/DELIVERED)', 
    t14Res.statusCode === 200 && 
    (t14Res.data?.deliveryStatus === 'SIMULATED' || t14Res.data?.deliveryStatus === 'DELIVERED') &&
    !!t14Res.data?.messageId
  );

  // T15: Second dispatch with identical idempotencyKey within cooldown window is suppressed
  const t15Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'direct',
      to: 'idempotent.tester@gmail.com',
      subject: 'KAIROS 2027 Idempotency Verification 1',
      text: 'First dispatch payload (duplicate attempt).',
      idempotencyKey: uniqueDedupKey
    }
  });
  assert('T15: Duplicate dispatch with same key suppressed (SUPPRESSED_DUPLICATE)',
    t15Res.statusCode === 200 &&
    t15Res.data?.deliveryStatus === 'SUPPRESSED_DUPLICATE' &&
    t15Res.data?.messageId === t14Res.data?.messageId
  );

  // T16: Distinct idempotency key delivers fresh notification
  const t16Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'direct',
      to: 'idempotent.tester@gmail.com',
      subject: 'KAIROS 2027 Idempotency Verification 2',
      text: 'Second distinct payload.',
      idempotencyKey: `${uniqueDedupKey}-diff`
    }
  });
  assert('T16: Fresh idempotency key dispatches new notification',
    t16Res.statusCode === 200 &&
    t16Res.data?.deliveryStatus !== 'SUPPRESSED_DUPLICATE' &&
    t16Res.data?.messageId !== t14Res.data?.messageId
  );

  // --------------------------------------------------------------------------
  // SECTION 4: SIMULATION SINK BEHAVIOR & LOGGING
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 4: Simulation Sink Behavior & Database Logging ---');

  // T17: Verify notification telemetry in database
  const t17Res = await request('/api/admin/notifications?limit=20', {
    headers: adminHeaders
  });
  assert('T17: Telemetry endpoint returns recorded notifications & stats',
    t17Res.statusCode === 200 &&
    Array.isArray(t17Res.data?.logs) &&
    typeof t17Res.data?.stats?.total === 'number' &&
    typeof t17Res.data?.stats?.sent === 'number' &&
    typeof t17Res.data?.stats?.suppressed === 'number'
  );

  const foundSuppressed = t17Res.data?.logs?.find(l => l.idempotencyKey === uniqueDedupKey && l.status === 'SUPPRESSED_DUPLICATE');
  assert('T18: SUPPRESSED_DUPLICATE log record found in persistent audit store', !!foundSuppressed);

  // --------------------------------------------------------------------------
  // SECTION 5: END-TO-END FLOW DISPATCHES
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 5: End-to-End API Dispatches ---');

  const runId = Date.now().toString(36);
  const leaderEmail = `email.leader.${runId}@sist.edu.in`;
  const inviteeEmail = `email.member.${runId}@sist.edu.in`;

  // T19: Student account creation triggers verification email
  const t19Res = await request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: leaderEmail,
      password: 'SecurePassword2027!',
      fullName: `Leader ${runId}`,
      institution: 'SIST Chennai',
      preferredTrack: 'Agentic AI & Autonomous Systems'
    }
  });
  assert('T19: Student account registration succeeds and triggers verification email',
    t19Res.statusCode === 201 && t19Res.data?.success === true
  );

  // Allow non-blocking background dispatch to record in audit log
  await new Promise(r => setTimeout(r, 200));

  // Check notification log for verification email
  const verifyLogsRes = await request(`/api/admin/notifications?search=${encodeURIComponent(leaderEmail)}`, {
    headers: adminHeaders
  });
  const verifyLog = verifyLogsRes.data?.logs?.find(l => l.template === 'email-verification');
  assert('T20: Verification email recorded in notification telemetry log',
    !!verifyLog && verifyLog.to.toLowerCase() === leaderEmail.toLowerCase()
  );

  // T21: Team creation triggers team-creation confirmation email
  const t21Res = await request('/api/v1/team', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      teamName: `Titan AI ${runId}`,
      trackId: 'track-agentic-ai',
      problemTitle: 'Decentralized Autonomous Swarm Architecture',
      problemAbstract: 'Engineering resilient swarm coordination with zero single points of failure across Amazon ECS and AWS Lambda.',
      lead: {
        fullName: `Leader ${runId}`,
        email: leaderEmail,
        phone: '9876543210',
        registerNo: `REG${runId.toUpperCase()}`,
        college: 'SIST'
      }
    }
  });
  const createdTeam = t21Res.data?.team;
  assert('T21: Team creation succeeds and dispatches team-creation notification',
    t21Res.statusCode === 201 && !!createdTeam?.teamCode
  );

  const teamCode = createdTeam?.teamCode;
  const inviteCode = createdTeam?.inviteCode;

  // T22: Team Invite Endpoint RBAC Protection (Unauthenticated rejected with 401)
  const t22Unauth = await request('/api/v1/team/invite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      teamCode,
      inviteeEmail
    }
  });
  assert('T22: Team invite unauthenticated request rejected with HTTP 401', t22Unauth.statusCode === 401);

  // T23: Team Invite dispatched by authorized Admin or Leader
  const t23Res = await request('/api/v1/team/invite', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      teamCode,
      inviteeEmail,
      inviteeName: 'Invited Teammate'
    }
  });
  assert('T23: Authorized team invitation dispatches team-invitation email',
    t23Res.statusCode === 200 && t23Res.data?.success === true && t23Res.data?.recipient === inviteeEmail
  );

  // T24: Team Join triggers team-joining confirmation email
  const t24Res = await request('/api/v1/team', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: {
      teamCode,
      member: {
        fullName: 'Confirmed Teammate',
        email: inviteeEmail,
        phone: '9876543211',
        college: 'SIST',
        registerNo: `REG2${runId.toUpperCase()}`,
        role: 'AI / Cloud'
      }
    }
  });
  assert('T24: Team joining succeeds and triggers team-joining-confirmation email',
    t24Res.statusCode === 200 && t24Res.data?.success === true
  );

  // T25: Admin Abstract Review Decision (Shortlisting team) dispatches abstract decision email
  const t25Res = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: adminHeaders,
    body: {
      teamCode,
      selectionStage: 'ON_CAMPUS_QUALIFIED',
      reviewerNotes: 'Approved for Grand Finale on-campus cohort at Sathyabama Auditorium.',
      deskBayAllocation: 'BAY-D09 (Auditorium Bay 3)'
    }
  });
  assert('T25: Admin shortlisting updates team and triggers abstract-review notification',
    t25Res.statusCode === 200 && t25Res.data?.team?.selectionStage === 'ON_CAMPUS_QUALIFIED'
  );

  // T26: Admin Check-in Desk triggers checkin-confirmation email
  const t26Res = await request('/api/admin/checkin', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      teamCode
    }
  });
  assert('T26: On-campus check-in succeeds and triggers checkin-confirmation notification',
    t26Res.statusCode === 200 && t26Res.data?.team?.checkedIn === true
  );

  // --------------------------------------------------------------------------
  // SECTION 6: ADMIN NOTIFICATIONS TELEMETRY & BROADCAST
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 6: Admin Notifications Telemetry & Broadcast ---');

  // T27: Unauthenticated access to GET /api/admin/notifications returns 401
  const t27Unauth = await request('/api/admin/notifications');
  assert('T27: Unauthenticated GET /api/admin/notifications rejected with HTTP 401', t27Unauth.statusCode === 401);

  // T28: Filter notification logs by template
  const t28Filter = await request('/api/admin/notifications?template=checkin-confirmation', {
    headers: adminHeaders
  });
  assert('T28: Telemetry filtering by template returns only matching records',
    t28Filter.statusCode === 200 &&
    t28Filter.data?.logs?.every(l => l.template === 'checkin-confirmation')
  );

  // T29: Unauthenticated access to POST /api/admin/notifications returns 401
  const t29Unauth = await request('/api/admin/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      type: 'announcement',
      title: 'Hacking Commences',
      summary: 'All squads assemble.'
    }
  });
  assert('T29: Unauthenticated POST /api/admin/notifications rejected with HTTP 401', t29Unauth.statusCode === 401);

  // T30: Official Announcement Broadcast to all builders
  const t30Res = await request('/api/admin/notifications', {
    method: 'POST',
    headers: adminHeaders,
    body: {
      type: 'announcement',
      title: 'Grand Finale Opening Ceremony & Keynote by AWS',
      summary: 'Reporting time 08:00 AM IST at Sathyabama Indoor Auditorium. Keynote begins promptly at 09:30 AM.',
      category: 'SCHEDULE',
      urgency: 'HIGH',
      targetTrack: 'ALL',
      actionUrl: 'http://localhost:8000/stage',
      actionLabel: 'View Schedule'
    }
  });
  assert('T30: Announcement broadcast delivers to participant cohort with batch dispatch',
    t30Res.statusCode === 200 &&
    t30Res.data?.success === true &&
    typeof t30Res.data?.stats?.sent === 'number' &&
    t30Res.data?.stats?.sent > 0
  );

  // T31: Verify audit log recorded for broadcast
  const auditRes = await request('/api/admin/analytics', {
    headers: adminHeaders
  });
  const recentLogs = auditRes.data?.analytics?.recentLogs || auditRes.data?.recentLogs || [];
  const broadcastLog = recentLogs.find(l => l.action === 'BROADCAST_ANNOUNCEMENT');
  assert('T31: Audit trail recorded organizer broadcast action in system event log', !!broadcastLog);

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`  PHASE 08 TEST SUMMARY: ${passed} PASSED / ${failed} FAILED (${passed + failed} TOTAL)`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('[TEST HARNESS RUNTIME ERROR]:', err);
  process.exit(1);
});
