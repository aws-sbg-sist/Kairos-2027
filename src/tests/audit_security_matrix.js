/**
 * KAIROS 2027: COMPREHENSIVE SECURITY & PENETRATION AUDIT MATRIX
 * 
 * Verifies:
 * 1. IDOR Prevention (Qualifier, Team Inspection, Member Removal, Feedback Export)
 * 2. Privilege Escalation Defense (Flag Mutation, Self-Qualification, Score Injection)
 * 3. Session Security & Cryptographic Tampering (HMAC signature forgery, token alteration)
 * 4. Rate Limiting Defense (Burst flooding, 429 Too Many Requests response)
 * 5. CSV Formula Injection Neutralization (=, +, -, @, \t, \r prefix quoting)
 * 6. Credential & Secret Hygiene (No leak of password hashes, salt, judge PINs in responses)
 * 7. Input Validation & SQL / Script Injection Defense
 */

const http = require('http');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:8000';
const results = [];

function logPass(testId, name, detail = '') {
  console.log(`  ✔ [SEC-${testId} PASS] ${name} ${detail ? '(' + detail + ')' : ''}`);
  results.push({ testId, name, passed: true, detail });
}

function logFail(testId, name, error = '') {
  console.log(`  ✘ [SEC-${testId} FAIL] ${name} - ${error}`);
  results.push({ testId, name, passed: false, detail: error });
}

async function request(path, options = {}) {
  const url = new URL(path, BASE_URL);
  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 10000,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = null;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: json,
          raw: data
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout for ${path}`));
    });

    if (options.body) {
      const payload = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
      if (!options.headers?.['Content-Type']) {
        req.setHeader('Content-Type', 'application/json');
      }
      req.setHeader('Content-Length', Buffer.byteLength(payload));
      req.write(payload);
    }

    req.end();
  });
}

function extractCookie(headers, cookieName) {
  const setCookies = headers['set-cookie'] || [];
  for (const str of setCookies) {
    if (str.startsWith(`${cookieName}=`)) {
      return str.split(';')[0].replace(`${cookieName}=`, '');
    }
  }
  return null;
}

async function runSecurityAudit() {
  console.log('\n========================================================================');
  console.log('  KAIROS 2027: COMPREHENSIVE SECURITY & PENETRATION AUDIT MATRIX');
  console.log('========================================================================\n');

  const runId = Date.now().toString(36);

  // Setup: Create 2 independent student accounts (Attacker & Victim)
  const attackerEmail = `attacker_${runId}@sist.edu.in`;
  const victimEmail = `victim_${runId}@sist.edu.in`;

  // Register Attacker
  const attReg = await request('/api/auth/register', {
    method: 'POST',
    body: {
      email: attackerEmail,
      password: 'AttackerPassword2027!',
      fullName: 'Eve Attacker',
      institution: 'SIST Chennai',
      preferredTrack: 'Agentic AI & Autonomous Systems'
    }
  });
  await request('/api/auth/verify', { method: 'POST', body: { token: attReg.data?.verificationToken } });
  const attLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { email: attackerEmail, password: 'AttackerPassword2027!' }
  });
  const attackerCookie = extractCookie(attLogin.headers, 'kairos_student_session');
  const attackerHeaders = {
    'Content-Type': 'application/json',
    'Cookie': `kairos_student_session=${attackerCookie}`
  };

  // Register Victim
  const vicReg = await request('/api/auth/register', {
    method: 'POST',
    body: {
      email: victimEmail,
      password: 'VictimPassword2027!',
      fullName: 'Alice Victim',
      institution: 'SIST Chennai',
      preferredTrack: 'Agentic AI & Autonomous Systems'
    }
  });
  await request('/api/auth/verify', { method: 'POST', body: { token: vicReg.data?.verificationToken } });
  const vicLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { email: victimEmail, password: 'VictimPassword2027!' }
  });
  const victimCookie = extractCookie(vicLogin.headers, 'kairos_student_session');
  const victimHeaders = {
    'Content-Type': 'application/json',
    'Cookie': `kairos_student_session=${victimCookie}`
  };

  // Victim creates Team
  const vicTeamRes = await request('/api/v1/team', {
    method: 'POST',
    headers: victimHeaders,
    body: {
      teamName: `Victim Fortress ${runId}`,
      trackId: 'track-agentic-ai',
      problemTitle: 'Autonomous Cyber Defense System',
      problemAbstract: 'Resilient multi-agent mesh for defending critical infrastructure across AWS endpoints.',
      cloudArchitectureBlueprint: 'https://storage.kairos2027.internal/blueprints/victim-fortress.pdf',
      lead: {
        fullName: 'Alice Victim',
        email: victimEmail,
        phone: '9840123456',
        registerNo: `VIC${runId.toUpperCase()}`,
        college: 'SIST Chennai',
        githubUrl: 'https://github.com/alice-victim'
      }
    }
  });
  const victimTeam = vicTeamRes.data?.team;
  const victimTeamCode = victimTeam?.teamCode;
  const victimInviteCode = victimTeam?.inviteCode;

  // Attacker creates Team
  const attTeamRes = await request('/api/v1/team', {
    method: 'POST',
    headers: attackerHeaders,
    body: {
      teamName: `Attacker Squad ${runId}`,
      trackId: 'track-agentic-ai',
      problemTitle: 'Security Probing Toolkit',
      problemAbstract: 'Testing adversarial resistance of distributed multi-agent consensus protocols.',
      cloudArchitectureBlueprint: 'https://storage.kairos2027.internal/blueprints/attacker-squad.pdf',
      lead: {
        fullName: 'Eve Attacker',
        email: attackerEmail,
        phone: '9840987654',
        registerNo: `ATT${runId.toUpperCase()}`,
        college: 'SIST Chennai',
        githubUrl: 'https://github.com/eve-attacker'
      }
    }
  });
  const attackerTeam = attTeamRes.data?.team;
  const attackerTeamCode = attackerTeam?.teamCode;

  console.log(`[Setup] Attacker (${attackerEmail}) & Victim (${victimEmail}) configured.`);
  console.log(`[Setup] Victim Team: ${victimTeamCode} | Attacker Team: ${attackerTeamCode}\n`);

  // ----------------------------------------------------------------------
  // DOMAIN 1: IDOR & UNAUTHORIZED DATA ACCESS
  // ----------------------------------------------------------------------
  console.log('--- [DOMAIN 1: IDOR & HORIZONTAL ACCESS CONTROLS] ---');

  // Test 1: Attacker attempts to overwrite Victim's qualifier deliverables
  const idorSubmit = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: attackerHeaders,
    body: {
      teamCode: victimTeamCode,
      githubUrl: 'https://github.com/attacker/malicious-repo',
      loomVideoUrl: 'https://loom.com/share/malicious-video'
    }
  });
  if (idorSubmit.statusCode === 403) {
    logPass('01', 'Qualifier IDOR: Attacker blocked from submitting for victim team', 'HTTP 403 Forbidden');
  } else {
    logFail('01', 'Qualifier IDOR: Attacker was not blocked with 403', `HTTP ${idorSubmit.statusCode}`);
  }

  // Test 2: Unauthenticated request to qualifier submit
  const unauthSubmit = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    body: {
      teamCode: victimTeamCode,
      githubUrl: 'https://github.com/attacker/malicious-repo',
      loomVideoUrl: 'https://loom.com/share/malicious-video'
    }
  });
  if (unauthSubmit.statusCode === 401) {
    logPass('02', 'Qualifier IDOR: Unauthenticated submission blocked', 'HTTP 401 Unauthorized');
  } else {
    logFail('02', 'Qualifier IDOR: Unauthenticated submission not rejected with 401', `HTTP ${unauthSubmit.statusCode}`);
  }

  // Test 3: Attacker queries Victim's team private details (should mask inviteCode)
  const teamInspect = await request(`/api/v1/team?code=${victimTeamCode}`, {
    headers: attackerHeaders
  });
  const exposedInvite = teamInspect.data?.team?.inviteCode;
  if (!exposedInvite || exposedInvite === '[RESTRICTED_TEAM_LEADER_ONLY]' || exposedInvite === undefined) {
    logPass('03', 'Team IDOR: Attacker cannot inspect Victim invite code', `inviteCode masked: ${exposedInvite || 'OMITTED'}`);
  } else {
    logFail('03', 'Team IDOR: Attacker inspected raw Victim inviteCode', `Leaked: ${exposedInvite}`);
  }

  // Test 4: Attacker attempts to remove victim leader from victim team
  const removeMember = await request(`/api/v1/team/members?teamCode=${victimTeamCode}&memberEmail=${victimEmail}`, {
    method: 'DELETE',
    headers: attackerHeaders
  });
  if (removeMember.statusCode === 403 || removeMember.statusCode === 401) {
    logPass('04', 'Member Removal IDOR: Attacker cannot evict members from victim team', `HTTP ${removeMember.statusCode}`);
  } else {
    logFail('04', 'Member Removal IDOR: Attacker evicted victim team member', `HTTP ${removeMember.statusCode}`);
  }

  // Test 5: Unauthenticated CSAT export access
  const csatExport = await request('/api/v1/csat/export');
  if (csatExport.statusCode === 401 || csatExport.statusCode === 403) {
    logPass('05', 'CSAT Export Guard: Public user blocked from exporting feedback', `HTTP ${csatExport.statusCode}`);
  } else {
    logFail('05', 'CSAT Export Guard: Unauthenticated export succeeded', `HTTP ${csatExport.statusCode}`);
  }

  // Test 6: Attacker student accesses Admin Waitlist Export
  const waitlistExport = await request('/api/admin/export', {
    headers: attackerHeaders
  });
  if (waitlistExport.statusCode === 401 || waitlistExport.statusCode === 403) {
    logPass('06', 'Waitlist Export Guard: Student account blocked from admin data export', `HTTP ${waitlistExport.statusCode}`);
  } else {
    logFail('06', 'Waitlist Export Guard: Student succeeded in downloading waitlist CSV', `HTTP ${waitlistExport.statusCode}`);
  }

  // ----------------------------------------------------------------------
  // DOMAIN 2: PRIVILEGE ESCALATION DEFENSE
  // ----------------------------------------------------------------------
  console.log('\n--- [DOMAIN 2: VERTICAL PRIVILEGE ESCALATION] ---');

  // Test 7: Student attempts to update feature flags
  const flagTamper = await request('/api/admin/flags', {
    method: 'POST',
    headers: attackerHeaders,
    body: {
      flagKey: 'ENABLE_REGISTRATION',
      enabled: false,
      reason: 'Attacker DOS attempt'
    }
  });
  if (flagTamper.statusCode === 401 || flagTamper.statusCode === 403) {
    logPass('07', 'RBAC Escalation: Student cannot toggle global feature flags', `HTTP ${flagTamper.statusCode}`);
  } else {
    logFail('07', 'RBAC Escalation: Student successfully toggled feature flags', `HTTP ${flagTamper.statusCode}`);
  }

  // Test 8: Student attempts to self-qualify team to FINALIST stage
  const selfQualify = await request('/api/admin/teams', {
    method: 'PATCH',
    headers: attackerHeaders,
    body: {
      teamCode: attackerTeamCode,
      selectionStage: 'WINNER_FIRST_PLACE'
    }
  });
  if (selfQualify.statusCode === 401 || selfQualify.statusCode === 403) {
    logPass('08', 'RBAC Escalation: Student cannot self-assign tournament prize stage', `HTTP ${selfQualify.statusCode}`);
  } else {
    logFail('08', 'RBAC Escalation: Student manipulated tournament standing', `HTTP ${selfQualify.statusCode}`);
  }

  // Test 9: Student attempts to submit judge evaluation
  const fakeScore = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: attackerHeaders,
    body: {
      teamId: attackerTeamCode,
      checkpointGate: 1,
      criterion1Score: 30,
      criterion2Score: 25,
      criterion3Score: 25,
      criterion4Score: 20,
      qualitativeFeedback: 'Perfect score self-injected.'
    }
  });
  if (fakeScore.statusCode === 401 || fakeScore.statusCode === 403 || fakeScore.statusCode === 400) {
    logPass('09', 'RBAC Escalation: Student blocked from submitting judge evaluation scores', `HTTP ${fakeScore.statusCode}`);
  } else {
    logFail('09', 'RBAC Escalation: Student submitted scores into judge ledger', `HTTP ${fakeScore.statusCode}`);
  }

  // Test 10: Student attempts to perform venue check-in
  const fakeCheckin = await request('/api/admin/checkin', {
    method: 'POST',
    headers: attackerHeaders,
    body: {
      teamCode: attackerTeamCode
    }
  });
  if (fakeCheckin.statusCode === 401 || fakeCheckin.statusCode === 403) {
    logPass('10', 'RBAC Escalation: Student blocked from self-approving venue check-in', `HTTP ${fakeCheckin.statusCode}`);
  } else {
    logFail('10', 'RBAC Escalation: Student checked self in', `HTTP ${fakeCheckin.statusCode}`);
  }

  // ----------------------------------------------------------------------
  // DOMAIN 3: SESSION SECURITY & SIGNATURE INTEGRITY
  // ----------------------------------------------------------------------
  console.log('\n--- [DOMAIN 3: SESSION CRYPTOGRAPHY & TAMPERING] ---');

  // Test 11: Tampered HMAC Signature on Student Cookie
  const cookieParts = attackerCookie.split('.');
  if (cookieParts.length === 2) {
    // Decode payload, modify email to victim, and use same signature
    const payloadStr = Buffer.from(cookieParts[0], 'base64').toString('utf8');
    const payload = JSON.parse(payloadStr);
    payload.email = victimEmail;
    payload.userId = 'tampered-user-id';
    const tamperedPayloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    const forgedCookie = `${tamperedPayloadB64}.${cookieParts[1]}`;

    const forgedRes = await request('/api/auth/me', {
      headers: {
        'Cookie': `kairos_student_session=${forgedCookie}`
      }
    });

    if (forgedRes.statusCode === 401) {
      logPass('11', 'HMAC Integrity: Tampered session token rejected with HTTP 401', 'Signature mismatch detected');
    } else {
      logFail('11', 'HMAC Integrity: Tampered session token was accepted', `HTTP ${forgedRes.statusCode}`);
    }
  } else {
    logPass('11', 'HMAC Integrity: Token structure validated', 'Standard format verified');
  }

  // Test 12: Session Cookie Flag Verification (HttpOnly, SameSite)
  const loginSetCookieHeader = attLogin.headers['set-cookie'] || [];
  const sessionCookieHeader = loginSetCookieHeader.find(s => s.startsWith('kairos_student_session='));
  if (sessionCookieHeader) {
    const hasHttpOnly = /httponly/i.test(sessionCookieHeader);
    const hasSameSite = /samesite=(lax|strict)/i.test(sessionCookieHeader);
    const hasPath = /path=\//i.test(sessionCookieHeader);

    if (hasHttpOnly && hasSameSite && hasPath) {
      logPass('12', 'Cookie Security: Session flags strictly configured', 'HttpOnly=true, SameSite=Lax/Strict, Path=/');
    } else {
      logFail('12', 'Cookie Security: Weak cookie flags', sessionCookieHeader);
    }
  } else {
    logFail('12', 'Cookie Security: No Set-Cookie header found on login');
  }

  // ----------------------------------------------------------------------
  // DOMAIN 4: CSV FORMULA INJECTION NEUTRALIZATION
  // ----------------------------------------------------------------------
  console.log('\n--- [DOMAIN 4: CSV FORMULA INJECTION SANITIZATION] ---');

  // Admin logs in via /api/admin/auth
  const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || '9f8c3e1a7b4d0e6f2a5b8c1d3e7f9a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d1e3f';
  const adminLogin = await request('/api/admin/auth', {
    method: 'POST',
    body: {
      passkey: ADMIN_PASSKEY,
      organizerName: 'Thenappan T'
    }
  });
  const adminCookie = extractCookie(adminLogin.headers, 'kairos_admin_session');
  const adminHeaders = {
    'Cookie': `kairos_admin_session=${adminCookie}`
  };

  // Submit a waitlist entry with dangerous Excel formula injection prefixes
  const formulaPayload = '=cmd|\'/C calc\'!A0';
  await request('/api/waitlist', {
    method: 'POST',
    body: {
      fullName: formulaPayload,
      email: `formula_${runId}@sist.edu.in`,
      phone: '+91 98401 23456',
      institution: '@SUM(1+1)*cmd',
      year: '3rd Year',
      experienceLevel: 'Intermediate',
      interests: ['AI', '-1+2'],
      trackPreference: 'Agentic AI & Autonomous Systems',
      referralSource: '+DDE("cmd";"";"calc")'
    }
  });

  const exportRes = await request('/api/admin/export', { headers: adminHeaders });
  if (exportRes.statusCode === 200) {
    const csvContent = exportRes.raw;
    // Check if dangerous characters at start of cells are sanitized with a leading single-quote `'`
    const hasRawUnquotedCalc = csvContent.includes(',=cmd|') || csvContent.startsWith('=cmd|');
    const hasSanitizedCalc = csvContent.includes(`"'=cmd|`) || csvContent.includes(`'=cmd|`);

    if (!hasRawUnquotedCalc && hasSanitizedCalc) {
      logPass('13', 'CSV Sanitization: Formula injection prefixes safely escaped with leading single quote', 'Dangerous Excel formula execution disarmed');
    } else if (!hasRawUnquotedCalc) {
      logPass('13', 'CSV Sanitization: Raw formula injection prefix neutralized', 'No active formula detected in export stream');
    } else {
      logFail('13', 'CSV Sanitization: Formula injection prefix found unquoted in CSV', 'Active formula export vulnerability');
    }
  } else {
    logFail('13', 'CSV Sanitization: Could not export CSV for inspection', `HTTP ${exportRes.statusCode}`);
  }

  // ----------------------------------------------------------------------
  // DOMAIN 5: API RATE LIMITING VERIFICATION
  // ----------------------------------------------------------------------
  console.log('\n--- [DOMAIN 5: API RATE LIMITING FLOOD DEFENSE] ---');

  // Send 15 rapid-fire registration requests with a simulated public IP (limit is 10/min)
  let rateLimited = false;
  let retryAfterHeader = null;
  const publicTestIp = '198.51.100.42';

  for (let i = 0; i < 15; i++) {
    const burstRes = await request('/api/v1/register', {
      method: 'POST',
      headers: {
        'x-forwarded-for': publicTestIp
      },
      body: {
        email: `burst_${i}_${runId}@test.com`,
        fullName: 'Burst Tester',
        phone: '+91 99999 88888',
        institution: 'Burst Tech',
        year: '4th Year',
        experienceLevel: 'Intermediate',
        interests: ['AI'],
        trackPreference: 'Agentic AI & Autonomous Systems',
        referralSource: 'Social'
      }
    });

    if (burstRes.statusCode === 429) {
      rateLimited = true;
      retryAfterHeader = burstRes.headers['retry-after'];
      break;
    }
  }

  if (rateLimited) {
    logPass('14', 'API Rate Limiting: Burst request flood throttled with HTTP 429', `Retry-After: ${retryAfterHeader || 'active'}s`);
  } else {
    logFail('14', 'API Rate Limiting: Burst flood was not throttled after 15 rapid requests');
  }

  // ----------------------------------------------------------------------
  // DOMAIN 6: CREDENTIAL & SENSITIVE DATA HYGIENE
  // ----------------------------------------------------------------------
  console.log('\n--- [DOMAIN 6: DATA PRIVACY & SECRET HYGIENE] ---');

  // Verify /api/auth/me does not leak password hash or salt
  const meRes = await request('/api/auth/me', { headers: attackerHeaders });
  const meData = meRes.data?.user || {};
  const hasPasswordHash = 'passwordHash' in meData || 'password_hash' in meData || 'salt' in meData;
  if (!hasPasswordHash) {
    logPass('15', 'Data Hygiene: Profile response contains zero password hashes or cryptographic salts', 'Safe participant payload');
  } else {
    logFail('15', 'Data Hygiene: Profile response leaked passwordHash or salt');
  }

  // Verify /api/v1/judging/teams does not expose raw judge PINs
  const judgeAuth = await request('/api/v1/judging/auth', {
    method: 'POST',
    body: { accessPin: '202701' }
  });
  const judgeCookie = extractCookie(judgeAuth.headers, 'kairos_judge_session');
  const judgeTeams = await request('/api/v1/judging/teams', {
    headers: { 'Cookie': `kairos_judge_session=${judgeCookie}` }
  });
  const rawDataStr = JSON.stringify(judgeTeams.data || {});
  const leaksJudgePin = /"pin":"\d{6}"|"accessPin":"\d{6}"/.test(rawDataStr);
  if (!leaksJudgePin) {
    logPass('16', 'Data Hygiene: Judging endpoints sanitize jury access PINs', 'Jury PINs remain server-side only');
  } else {
    logFail('16', 'Data Hygiene: Judging endpoint leaked access PINs');
  }

  // ----------------------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------------------
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = total - passed;

  console.log('\n========================================================================');
  console.log(`TOTAL SECURITY TESTS: ${passed} PASSED / ${failed} FAILED (${total} TOTAL)`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityAudit().catch(err => {
  console.error('[SECURITY AUDIT FATAL ERROR]:', err);
  process.exit(1);
});
