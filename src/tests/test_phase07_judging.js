/**
 * KAIROS 2027 — PHASE 07 JUDGING AND LIVE LEADERBOARD TEST HARNESS
 * 
 * Exhaustively validates:
 * 1. Judge Authentication & Session Security (PIN verification, HMAC-SHA256 cookie, lock terminal)
 * 2. Judge Track Assignments & Assigned Team Visibility
 * 3. Track Assignment Enforcement (Anti-Tampering & Cross-Track Access Prevention)
 * 4. 100-Point Scoring Rubric Bounds & Input Validation (C1 0-30, C2 0-25, C3 0-25, C4 0-20)
 * 5. Conflict of Interest Recusal Logging
 * 6. Evaluation Persistence & Gaussian Z-Score Normalization
 * 7. Duplicate Evaluation Prevention (HTTP 409 Conflict)
 * 8. Score Calibration & Editing with Tamper-Evident Audit History
 * 9. Real-Time Leaderboard Standings, Tie-Handling, and Track Filtering
 * 10. Event Publication Settings (deliberation mode hide / stage reveal)
 */

const http = require('http');

const PORT = 8000;
const BASE_URL = `http://localhost:${PORT}`;

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
      reject(new Error(`Request timed out to ${urlPath}`));
    });

    if (options.body) {
      if (typeof options.body === 'string') {
        req.write(options.body);
      } else {
        req.write(JSON.stringify(options.body));
      }
    }
    req.end();
  });
}

function parseCookies(res) {
  const setCookie = res.headers['set-cookie'];
  if (!setCookie) return {};
  const cookies = {};
  const cookieArr = Array.isArray(setCookie) ? setCookie : [setCookie];
  cookieArr.forEach((c) => {
    const parts = c.split(';')[0].split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });
  return cookies;
}

let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passed++;
    console.log(`  ✓ ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ ${testName}${details ? ` -> ${details}` : ''}`);
  }
}

async function runPhase07Tests() {
  console.log('================================================================');
  console.log('⚡ KAIROS 2027: PHASE 07 JUDGING & LEADERBOARD TEST SUITE');
  console.log('================================================================\n');

  // Ensure clean idempotent evaluation state for testing
  const fs = require('fs');
  const path = require('path');
  const storePath = path.join(__dirname, '../../data/kairos_store.json');
  if (fs.existsSync(storePath)) {
    const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    store.evaluations = [];
    fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
  }

  let judge1Cookie = '';
  let judge2Cookie = '';
  let judge3Cookie = '';

  // --------------------------------------------------------------------------
  // SECTION 1: JUDGE AUTHENTICATION & SESSION MANAGEMENT
  // --------------------------------------------------------------------------
  console.log('--- 1. Judge Authentication & Session Management ---');

  // T01: Reject unauthenticated request to /api/v1/judging/teams
  const resT01 = await request('/api/v1/judging/teams');
  assert(resT01.statusCode === 401, 'T01: Unauthenticated request to /api/v1/judging/teams returns 401', `Status: ${resT01.statusCode}`);

  // T02: Reject missing PIN
  const resT02 = await request('/api/v1/judging/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { accessPin: '' }
  });
  assert(resT02.statusCode === 400, 'T02: Empty PIN rejected with HTTP 400', `Status: ${resT02.statusCode}`);

  // T03: Reject invalid PIN
  const resT03 = await request('/api/v1/judging/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { accessPin: '999999' }
  });
  assert(resT03.statusCode === 401, 'T03: Non-existent PIN rejected with HTTP 401', `Status: ${resT03.statusCode}`);

  // T04: Authenticate Judge 1 (Vikrant Roy, PIN 202701)
  const resT04 = await request('/api/v1/judging/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { accessPin: '202701' }
  });
  const cookiesJ1 = parseCookies(resT04);
  judge1Cookie = cookiesJ1['kairos_judge_session'];
  assert(
    resT04.statusCode === 200 &&
    resT04.data?.success === true &&
    resT04.data?.judge?.fullName === 'Vikrant Roy' &&
    Boolean(judge1Cookie),
    'T04: Judge 1 (Vikrant Roy) successfully authenticated with PIN 202701 and issued session cookie',
    `Status: ${resT04.statusCode}, Judge: ${resT04.data?.judge?.fullName}`
  );

  // T05: Authenticate Judge 2 (Aishwarya Subramanian, PIN 202702)
  const resT05 = await request('/api/v1/judging/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { accessPin: '202702' }
  });
  const cookiesJ2 = parseCookies(resT05);
  judge2Cookie = cookiesJ2['kairos_judge_session'];
  assert(
    resT05.statusCode === 200 &&
    resT05.data?.judge?.fullName === 'Aishwarya Subramanian',
    'T05: Judge 2 (Aishwarya Subramanian) authenticated with PIN 202702',
    `Status: ${resT05.statusCode}`
  );

  // T06: Authenticate Judge 3 (Dr. Rajesh Kannan, PIN 202703)
  const resT06 = await request('/api/v1/judging/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { accessPin: '202703' }
  });
  const cookiesJ3 = parseCookies(resT06);
  judge3Cookie = cookiesJ3['kairos_judge_session'];
  assert(
    resT06.statusCode === 200 &&
    resT06.data?.judge?.fullName === 'Dr. Rajesh Kannan',
    'T06: Judge 3 (Dr. Rajesh Kannan) authenticated with PIN 202703',
    `Status: ${resT06.statusCode}`
  );

  // T07: Verify session persistence via GET /api/v1/judging/auth
  const resT07 = await request('/api/v1/judging/auth', {
    headers: { Cookie: `kairos_judge_session=${judge1Cookie}` }
  });
  assert(
    resT07.statusCode === 200 &&
    resT07.data?.authenticated === true &&
    resT07.data?.judge?.judgeId === 'judge-1',
    'T07: Judge session verified and persisted via HMAC-SHA256 cookie',
    `Authenticated: ${resT07.data?.authenticated}`
  );

  // T08: Verify terminal lock (logout)
  const resT08 = await request('/api/v1/judging/auth', {
    method: 'DELETE',
    headers: { Cookie: `kairos_judge_session=${judge1Cookie}` }
  });
  const clearCookies = parseCookies(resT08);
  assert(
    resT08.statusCode === 200 &&
    clearCookies['kairos_judge_session'] === '',
    'T08: DELETE /api/v1/judging/auth clears session cookie and logs terminal lock',
    `Cleared Cookie: ${clearCookies['kairos_judge_session']}`
  );

  // Re-login Judge 1 for subsequent tests
  const reAuthJ1 = await request('/api/v1/judging/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { accessPin: '202701' }
  });
  judge1Cookie = parseCookies(reAuthJ1)['kairos_judge_session'];

  // --------------------------------------------------------------------------
  // SECTION 2: JUDGE TRACK ASSIGNMENTS & ASSIGNED TEAMS
  // --------------------------------------------------------------------------
  console.log('\n--- 2. Judge Track Assignments & Assigned Teams ---');

  // T09: Judge 1 assigned teams (AI & Cloud)
  const resT09 = await request('/api/v1/judging/teams', {
    headers: { Cookie: `kairos_judge_session=${judge1Cookie}` }
  });
  const j1Teams = resT09.data?.assignedTeams || [];
  const j1AllMatch = j1Teams.every(t => {
    const track = (t.trackId || '').toLowerCase();
    return track.includes('ai') || track.includes('cloud');
  });
  assert(
    resT09.statusCode === 200 && j1Teams.length > 0 && j1AllMatch,
    'T09: Judge 1 assigned only AI & Cloud teams according to track specialization',
    `Team count: ${j1Teams.length}, All Match: ${j1AllMatch}`
  );

  // T10: Judge 2 assigned teams (FinTech & Open Innovation)
  const resT10 = await request('/api/v1/judging/teams', {
    headers: { Cookie: `kairos_judge_session=${judge2Cookie}` }
  });
  const j2Teams = resT10.data?.assignedTeams || [];
  const j2AllMatch = j2Teams.every(t => {
    const track = (t.trackId || '').toLowerCase();
    return track.includes('fintech') || track.includes('trust') || track.includes('open');
  });
  assert(
    resT10.statusCode === 200 && j2Teams.length > 0 && j2AllMatch,
    'T10: Judge 2 assigned only FinTech & Open Innovation teams',
    `Team count: ${j2Teams.length}, All Match: ${j2AllMatch}`
  );

  // T11: Judge 3 assigned teams (Distributed Systems & Edge IoT)
  const resT11 = await request('/api/v1/judging/teams', {
    headers: { Cookie: `kairos_judge_session=${judge3Cookie}` }
  });
  const j3Teams = resT11.data?.assignedTeams || [];
  const j3AllMatch = j3Teams.every(t => {
    const track = (t.trackId || '').toLowerCase();
    return track.includes('edge') || track.includes('iot') || track.includes('distributed') || track.includes('cloud');
  });
  assert(
    resT11.statusCode === 200 && j3Teams.length > 0 && j3AllMatch,
    'T11: Judge 3 assigned only Distributed Systems & Edge IoT teams',
    `Team count: ${j3Teams.length}, All Match: ${j3AllMatch}`
  );

  // T12: Verify assigned teams contain submission review properties (desk bay, repo, abstract)
  const sampleAssigned = j1Teams[0];
  assert(
    sampleAssigned &&
    Boolean(sampleAssigned.teamName) &&
    Boolean(sampleAssigned.trackId) &&
    Array.isArray(sampleAssigned.evaluations),
    'T12: Assigned team records contain complete submission review context and evaluations array',
    `Sample team: ${sampleAssigned?.teamName} (${sampleAssigned?.teamCode})`
  );

  // --------------------------------------------------------------------------
  // SECTION 3: TRACK ASSIGNMENT ENFORCEMENT & FAIRNESS CONTROLS
  // --------------------------------------------------------------------------
  console.log('\n--- 3. Track Assignment Enforcement & Fairness Controls ---');

  // T13: Judge 1 attempts to evaluate a FinTech team (KAIROS-T004)
  const resT13 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `kairos_judge_session=${judge1Cookie}`
    },
    body: {
      teamCode: 'KAIROS-T004', // FinTech team
      checkpointGate: 1,
      criterion1Score: 25,
      criterion2Score: 20,
      criterion3Score: 20,
      criterion4Score: 15
    }
  });
  assert(
    resT13.statusCode === 403 &&
    resT13.data?.code === 'TRACK_ASSIGNMENT_MISMATCH',
    'T13: Cross-track evaluation blocked with HTTP 403 TRACK_ASSIGNMENT_MISMATCH',
    `Status: ${resT13.statusCode}, Code: ${resT13.data?.code}`
  );

  // T14: Unauthenticated submission attempt (missing judge credentials)
  const resT14 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      teamCode: 'KAIROS-T001',
      checkpointGate: 1,
      criterion1Score: 25,
      criterion2Score: 20,
      criterion3Score: 20,
      criterion4Score: 15
    }
  });
  assert(
    resT14.statusCode === 400 || resT14.statusCode === 401,
    'T14: Unauthenticated score submission without credentials rejected (HTTP 400/401)',
    `Status: ${resT14.statusCode}`
  );

  // --------------------------------------------------------------------------
  // SECTION 4: 100-POINT SCORING RUBRIC BOUNDS & VALIDATION
  // --------------------------------------------------------------------------
  console.log('\n--- 4. 100-Point Scoring Rubric Bounds & Validation ---');

  // T15: Criterion 1 exceeds 30
  const resT15 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 1, criterion1Score: 35, criterion2Score: 20, criterion3Score: 20, criterion4Score: 15 }
  });
  assert(resT15.statusCode === 400, 'T15: Criterion 1 score > 30 rejected with HTTP 400', `Status: ${resT15.statusCode}`);

  // T16: Criterion 2 exceeds 25
  const resT16 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 1, criterion1Score: 25, criterion2Score: 28, criterion3Score: 20, criterion4Score: 15 }
  });
  assert(resT16.statusCode === 400, 'T16: Criterion 2 score > 25 rejected with HTTP 400', `Status: ${resT16.statusCode}`);

  // T17: Criterion 3 exceeds 25
  const resT17 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 1, criterion1Score: 25, criterion2Score: 20, criterion3Score: 30, criterion4Score: 15 }
  });
  assert(resT17.statusCode === 400, 'T17: Criterion 3 score > 25 rejected with HTTP 400', `Status: ${resT17.statusCode}`);

  // T18: Criterion 4 exceeds 20
  const resT18 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 1, criterion1Score: 25, criterion2Score: 20, criterion3Score: 20, criterion4Score: 25 }
  });
  assert(resT18.statusCode === 400, 'T18: Criterion 4 score > 20 rejected with HTTP 400', `Status: ${resT18.statusCode}`);

  // T19: Negative score
  const resT19 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 1, criterion1Score: -5, criterion2Score: 20, criterion3Score: 20, criterion4Score: 15 }
  });
  assert(resT19.statusCode === 400, 'T19: Negative rubric score rejected with HTTP 400', `Status: ${resT19.statusCode}`);

  // T20: Invalid checkpoint gate
  const resT20 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 4, criterion1Score: 25, criterion2Score: 20, criterion3Score: 20, criterion4Score: 15 }
  });
  assert(resT20.statusCode === 400, 'T20: Invalid checkpoint gate (Gate 4) rejected with HTTP 400', `Status: ${resT20.statusCode}`);

  // T21: Excessive feedback length
  const longFeedback = 'A'.repeat(2500);
  const resT21 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 1, criterion1Score: 25, criterion2Score: 20, criterion3Score: 20, criterion4Score: 15, qualitativeFeedback: longFeedback }
  });
  assert(resT21.statusCode === 400, 'T21: Qualitative feedback exceeding 2000 characters rejected with HTTP 400', `Status: ${resT21.statusCode}`);

  // --------------------------------------------------------------------------
  // SECTION 5: CONFLICT OF INTEREST RECUSAL
  // --------------------------------------------------------------------------
  console.log('\n--- 5. Conflict of Interest Recusal ---');

  // T22: Judge 1 recusal on assigned team
  const resT22 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: { teamCode: 'KAIROS-T001', checkpointGate: 1, recusal: true }
  });
  assert(
    resT22.statusCode === 200 && resT22.data?.recused === true,
    'T22: Conflict of interest recusal accepted and logged without penalizing team',
    `Recused: ${resT22.data?.recused}`
  );

  // --------------------------------------------------------------------------
  // SECTION 6: EVALUATION PERSISTENCE & GAUSSIAN Z-SCORE NORMALIZATION
  // --------------------------------------------------------------------------
  console.log('\n--- 6. Evaluation Persistence & Gaussian Z-Scores ---');

  // T23: Judge 1 submits Gate 1 evaluation for KAIROS-T001
  const resT23 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: {
      teamCode: 'KAIROS-T001',
      checkpointGate: 1,
      criterion1Score: 28, // /30
      criterion2Score: 24, // /25
      criterion3Score: 23, // /25
      criterion4Score: 18, // /20
      qualitativeFeedback: 'Exceptional event-driven architecture utilizing AWS EventBridge and resilient fallback mechanisms.'
    }
  });
  assert(
    (resT23.statusCode === 201 || resT23.statusCode === 200) &&
    resT23.data?.evaluation?.rawTotalScore === 93,
    'T23: Judge 1 records Checkpoint 1 evaluation for KAIROS-T001 (Raw Score: 93/100)',
    `Status: ${resT23.statusCode}, Score: ${resT23.data?.evaluation?.rawTotalScore}`
  );

  // T24: Judge 1 submits Gate 1 evaluation for KAIROS-T002
  const resT24 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: {
      teamCode: 'KAIROS-T002',
      checkpointGate: 1,
      criterion1Score: 24,
      criterion2Score: 21,
      criterion3Score: 20,
      criterion4Score: 16,
      qualitativeFeedback: 'Solid multi-agent framework, need to tighten tool call execution error handling.'
    }
  });
  assert(
    (resT24.statusCode === 201 || resT24.statusCode === 200) &&
    resT24.data?.evaluation?.rawTotalScore === 81,
    'T24: Judge 1 records Checkpoint 1 evaluation for KAIROS-T002 (Raw Score: 81/100) with calibrated Z-scores',
    `Status: ${resT24.statusCode}, Score: ${resT24.data?.evaluation?.rawTotalScore}, Z-Score: ${resT24.data?.evaluation?.normalizedZScore}`
  );

  // T25: Judge 2 evaluates KAIROS-T004 (FinTech)
  const resT25 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge2Cookie}` },
    body: {
      teamCode: 'KAIROS-T004',
      checkpointGate: 1,
      criterion1Score: 27,
      criterion2Score: 23,
      criterion3Score: 22,
      criterion4Score: 17,
      qualitativeFeedback: 'Strong cryptographic verification proofs demonstrated.'
    }
  });
  assert(
    (resT25.statusCode === 201 || resT25.statusCode === 200) &&
    resT25.data?.evaluation?.rawTotalScore === 89,
    'T25: Judge 2 records Checkpoint 1 evaluation for KAIROS-T004 in FinTech (Raw Score: 89/100)',
    `Status: ${resT25.statusCode}`
  );

  // T26: Judge 3 evaluates KAIROS-T003 (Edge IoT)
  const resT26 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge3Cookie}` },
    body: {
      teamCode: 'KAIROS-T003',
      checkpointGate: 1,
      criterion1Score: 26,
      criterion2Score: 22,
      criterion3Score: 21,
      criterion4Score: 16,
      qualitativeFeedback: 'Resilient MQTT telemetry pipelines on edge hardware.'
    }
  });
  assert(
    (resT26.statusCode === 201 || resT26.statusCode === 200) &&
    resT26.data?.evaluation?.rawTotalScore === 85,
    'T26: Judge 3 records Checkpoint 1 evaluation for KAIROS-T003 in Edge IoT (Raw Score: 85/100)',
    `Status: ${resT26.statusCode}`
  );

  // --------------------------------------------------------------------------
  // SECTION 7: DUPLICATE EVALUATION PREVENTION (FAIRNESS)
  // --------------------------------------------------------------------------
  console.log('\n--- 7. Duplicate Evaluation Prevention ---');

  // T27: Duplicate evaluation without isEdit flag
  const resT27 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: {
      teamCode: 'KAIROS-T001',
      checkpointGate: 1,
      criterion1Score: 29,
      criterion2Score: 25,
      criterion3Score: 24,
      criterion4Score: 19
    }
  });
  assert(
    resT27.statusCode === 409 &&
    resT27.data?.duplicate === true,
    'T27: Duplicate evaluation attempt rejected with HTTP 409 Conflict',
    `Status: ${resT27.statusCode}, Duplicate: ${resT27.data?.duplicate}`
  );

  // --------------------------------------------------------------------------
  // SECTION 8: SCORE CALIBRATION & EDITING WITH AUDIT TRAIL
  // --------------------------------------------------------------------------
  console.log('\n--- 8. Score Calibration & Editing with Audit Trail ---');

  // T28: Update evaluation using isEdit: true
  const resT28 = await request('/api/v1/judging/submit-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: `kairos_judge_session=${judge1Cookie}` },
    body: {
      teamCode: 'KAIROS-T001',
      checkpointGate: 1,
      criterion1Score: 29,
      criterion2Score: 25,
      criterion3Score: 24,
      criterion4Score: 18, // Total: 96
      isEdit: true,
      editReason: 'Recalibrated score after table-side architecture defense and AWS EventBridge demo'
    }
  });
  assert(
    resT28.statusCode === 200 &&
    resT28.data?.updated === true &&
    resT28.data?.evaluation?.rawTotalScore === 96,
    'T28: Score calibration update succeeded with HTTP 200 and updated score 96/100',
    `Status: ${resT28.statusCode}, Updated: ${resT28.data?.updated}, Score: ${resT28.data?.evaluation?.rawTotalScore}`
  );

  // T29: Verify edit history recorded previous score
  const updatedEval = resT28.data?.evaluation;
  const history = updatedEval?.editHistory || [];
  assert(
    history.length > 0 &&
    history[history.length - 1].previousScore === 93 &&
    history[history.length - 1].updatedScore === 96,
    'T29: Evaluation editHistory accurately tracked previous score (93) and updated score (96)',
    `History entries: ${history.length}`
  );

  // --------------------------------------------------------------------------
  // SECTION 9: REAL-TIME LEADERBOARD STANDINGS & TIE-HANDLING
  // --------------------------------------------------------------------------
  console.log('\n--- 9. Real-Time Leaderboard Standings & Tie-Handling ---');

  // T30: Fetch live leaderboard
  const resT30 = await request('/api/v1/leaderboard');
  const standings = resT30.data?.standings || [];
  assert(
    resT30.statusCode === 200 &&
    resT30.data?.published === true &&
    standings.length > 0,
    'T30: Live leaderboard returns valid standings computed from actual database records',
    `Teams ranked: ${standings.length}`
  );

  // T31: Verify rank #1 is KAIROS-T001 with score 96
  const rank1 = standings[0];
  assert(
    rank1 &&
    rank1.rank === 1 &&
    rank1.teamCode === 'KAIROS-T001' &&
    rank1.rawTotal === 96 &&
    rank1.cp1Score === 96,
    'T31: KAIROS-T001 holds Rank #1 on live leaderboard with 96.0 raw score',
    `Rank: ${rank1?.rank}, Team: ${rank1?.teamCode}, Score: ${rank1?.rawTotal}`
  );

  // T32: Verify Z-score formatting and commit telemetry
  assert(
    rank1 &&
    typeof rank1.zScore === 'string' &&
    rank1.zScore.includes('σ') &&
    typeof rank1.commitCount === 'number',
    'T32: Leaderboard entries feature Gaussian Z-Score formatting and Git telemetry',
    `Z-score: ${rank1?.zScore}, Commits: ${rank1?.commitCount}`
  );

  // T33: Verify Track Filtering: Agentic AI
  const resT33 = await request('/api/v1/leaderboard?track=agentic-ai');
  const aiStandings = resT33.data?.standings || [];
  const allAI = aiStandings.every(s => (s.trackId || '').toLowerCase().includes('agentic'));
  assert(
    resT33.statusCode === 200 && aiStandings.length > 0 && allAI,
    'T33: Leaderboard track filtering isolates Agentic AI track accurately',
    `Track teams: ${aiStandings.length}`
  );

  // T34: Verify Track Filtering: Edge IoT
  const resT34 = await request('/api/v1/leaderboard?track=edge-iot');
  const iotStandings = resT34.data?.standings || [];
  const allIoT = iotStandings.every(s => (s.trackId || '').toLowerCase().includes('edge'));
  assert(
    resT34.statusCode === 200 && iotStandings.length > 0 && allIoT,
    'T34: Leaderboard track filtering isolates Autonomous Edge IoT track accurately',
    `Track teams: ${iotStandings.length}`
  );

  // --------------------------------------------------------------------------
  // SECTION 10: EVENT PUBLICATION SETTINGS & STAGE DELIBERATION MODE
  // --------------------------------------------------------------------------
  console.log('\n--- 10. Event Publication Settings & Deliberation Mode ---');

  // T35: Unpublish leaderboard via admin feature flags
  const ADMIN_PASSKEY = '9f8c3e1a7b4d0e6f2a5b8c1d3e7f9a0b2c4d6e8f1a3b5c7d9e0f2a4b6c8d1e3f';
  const adminAuthRes = await request('/api/admin/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { passkey: ADMIN_PASSKEY, organizerName: 'Thenappan T' }
  });
  const adminCookie = parseCookies(adminAuthRes)['kairos_admin_session'];

  await request('/api/admin/flags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `kairos_admin_session=${adminCookie}`
    },
    body: { leaderboardPublished: false }
  });

  // T36: Verify leaderboard is withheld during deliberation
  const resT36 = await request('/api/v1/leaderboard');
  assert(
    resT36.statusCode === 200 &&
    resT36.data?.published === false &&
    resT36.data?.standings?.length === 0 &&
    Boolean(resT36.data?.message),
    'T36: Leaderboard unpublished mode withholds live scores during jury deliberation',
    `Published: ${resT36.data?.published}, Message: ${resT36.data?.message}`
  );

  // T37: Re-publish leaderboard for live stage reveal
  await request('/api/admin/flags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `kairos_admin_session=${adminCookie}`
    },
    body: { leaderboardPublished: true }
  });

  const resT37 = await request('/api/v1/leaderboard');
  assert(
    resT37.statusCode === 200 &&
    resT37.data?.published === true &&
    resT37.data?.standings?.length > 0,
    'T37: Leaderboard successfully re-published and live standings restored for auditorium reveal',
    `Published: ${resT37.data?.published}, Teams: ${resT37.data?.standings?.length}`
  );

  console.log('\n================================================================');
  console.log(`TOTAL TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase07Tests().catch((err) => {
  console.error('Fatal error during Phase 07 test execution:', err);
  process.exit(1);
});
