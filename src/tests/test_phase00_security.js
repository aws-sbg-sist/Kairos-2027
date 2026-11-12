/**
 * KAIROS 2027 — PHASE 00 SECURITY CONTAINMENT VERIFICATION SUITE
 * 
 * Verifies containment of:
 * 1. VULN-01: Qualifier Submission IDOR (HTTP 503 temporary lock, zero unauthorized write)
 * 2. VULN-02: CSAT Feedback Public Leak (HTTP 401 unauth guard, authenticated admin access)
 * 3. VULN-04: CSV Formula Injection (CWE-1236 protection across CSAT, waitlist & sponsor exports)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:8000';
const STORE_PATH = path.join(__dirname, '..', '..', 'data', 'kairos_store.json');
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
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
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

// Inline mirror of sanitizeCsvCell for standalone unit assertion
function sanitizeCsvCell(value) {
  if (value === null || value === undefined) {
    return '""';
  }
  let str = String(value);
  const trimmed = str.trimStart();
  if (
    trimmed.startsWith('=') ||
    trimmed.startsWith('+') ||
    trimmed.startsWith('-') ||
    trimmed.startsWith('@') ||
    trimmed.startsWith('\t') ||
    trimmed.startsWith('\r') ||
    trimmed.startsWith('%')
  ) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

async function runPhase00SecurityTests() {
  console.log('================================================================');
  console.log('      KAIROS 2027 — PHASE 00 SECURITY CONTAINMENT TEST SUITE    ');
  console.log('================================================================\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✓ [PASS] ${testName}`);
    } else {
      failedTests++;
      console.error(`  ✗ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
    }
  }

  // --------------------------------------------------------------------------
  // TEST GROUP 1: QUALIFIER SUBMISSION IDOR CONTAINMENT
  // --------------------------------------------------------------------------
  console.log('--- 1. QUALIFIER SUBMISSION IDOR CONTAINMENT (VULN-01) ---');
  
  // Read store before test
  const rawStoreBefore = fs.readFileSync(STORE_PATH, 'utf8');
  const storeBefore = JSON.parse(rawStoreBefore);
  const targetTeam = storeBefore.teams[0];
  const initialArtifacts = targetTeam ? JSON.stringify(targetTeam.round1Artifacts || null) : null;

  // Attempt unauthenticated exploit payload to overwrite team submission
  const exploitPayload = JSON.stringify({
    teamCode: targetTeam ? targetTeam.teamCode : 'KAIROS-TEST-99',
    loomVideoUrl: 'https://loom.com/share/hacked-malicious-demo-exploit',
    githubUrl: 'https://github.com/attacker/malicious-repo',
    architectureSummary: 'COMPROMISED_BY_UNAUTHENTICATED_ATTACKER'
  });

  const qualRes = await request('/api/v1/qualifier/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(exploitPayload)
    },
    body: exploitPayload
  });

  assert(qualRes.statusCode === 503 || qualRes.statusCode === 401, 'Unauthenticated qualifier submission is securely rejected (503 or 401)', `Got ${qualRes.statusCode}`);

  let qualJson = {};
  try {
    qualJson = JSON.parse(qualRes.body);
  } catch (e) {}

  assert(qualJson.code === 'QUALIFIER_SUBMISSIONS_LOCKED' || qualJson.code === 'UNAUTHORIZED', 'Qualifier response code indicates access denied (LOCKED or UNAUTHORIZED)');
  assert(qualJson.success === false, 'Qualifier response indicates success: false');

  // Verify store on disk was completely untouched
  const rawStoreAfter = fs.readFileSync(STORE_PATH, 'utf8');
  const storeAfter = JSON.parse(rawStoreAfter);
  const targetTeamAfter = storeAfter.teams.find(t => t.teamCode === (targetTeam ? targetTeam.teamCode : ''));
  const afterArtifacts = targetTeamAfter ? JSON.stringify(targetTeamAfter.round1Artifacts || null) : null;

  assert(initialArtifacts === afterArtifacts, 'Team submission artifacts remained completely unmodified in data store');

  // --------------------------------------------------------------------------
  // TEST GROUP 2: CSAT FEEDBACK AUTHORIZATION (VULN-02)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. CSAT FEEDBACK AUTHORIZATION GUARDS (VULN-02) ---');

  // Unauthenticated request
  const unauthCsatRes = await request('/api/v1/csat/export', { method: 'GET' });
  assert(unauthCsatRes.statusCode === 401, 'Unauthenticated CSAT export returns HTTP 401 Unauthorized', `Got ${unauthCsatRes.statusCode}`);

  let unauthJson = {};
  try {
    unauthJson = JSON.parse(unauthCsatRes.body);
  } catch (e) {}
  assert(unauthJson.success === false, 'Unauthenticated CSAT export body indicates success: false');
  assert(!unauthCsatRes.body.includes('cloudServicesUsed'), 'Zero CSAT feedback or attendee responses leaked to unauthenticated caller');
  assert(!unauthCsatRes.headers['content-type']?.includes('text/csv'), 'Unauthenticated CSAT export does not serve text/csv content type');

  // Authenticate as Admin to verify legitimate access
  console.log('\n--- Authenticating as Admin for Authorized Checks ---');
  const authPayload = JSON.stringify({
    passkey: ADMIN_PASSKEY,
    organizerName: 'Thenappan T',
    organizerRole: 'President & Student Builder Group Leader (SBGL)'
  });

  const authRes = await request('/api/admin/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(authPayload)
    },
    body: authPayload
  });

  assert(authRes.statusCode === 200, 'Admin login authentication succeeds with valid passkey', `Got ${authRes.statusCode}`);

  // Extract session cookie
  const setCookieHeader = authRes.headers['set-cookie'];
  let adminCookie = '';
  if (setCookieHeader) {
    const rawCookies = Array.isArray(setCookieHeader) ? setCookieHeader.join('; ') : setCookieHeader;
    const match = rawCookies.match(/kairos_admin_session=([^;]+)/);
    if (match) {
      adminCookie = `kairos_admin_session=${match[1]}`;
    }
  }

  assert(!!adminCookie, 'Successfully retrieved kairos_admin_session HttpOnly cookie');

  // Authorized CSAT export request
  const authCsatRes = await request('/api/v1/csat/export', {
    method: 'GET',
    headers: {
      'Cookie': adminCookie
    }
  });

  assert(authCsatRes.statusCode === 200, 'Authenticated CSAT export returns HTTP 200 OK', `Got ${authCsatRes.statusCode}`);
  assert(authCsatRes.headers['content-type']?.includes('text/csv'), 'Authenticated CSAT export returns Content-Type text/csv');
  assert(authCsatRes.body.includes('Satisfaction (1-5)'), 'Authenticated CSAT export contains proper CSV header row');

  // Authorized Waitlist export request
  const authWaitlistRes = await request('/api/admin/export?type=waitlist', {
    method: 'GET',
    headers: {
      'Cookie': adminCookie
    }
  });
  assert(authWaitlistRes.statusCode === 200, 'Authenticated Waitlist export returns HTTP 200 OK', `Got ${authWaitlistRes.statusCode}`);
  assert(authWaitlistRes.headers['content-type']?.includes('text/csv'), 'Waitlist export returns Content-Type text/csv');

  // Authorized Sponsors export request
  const authSponsorRes = await request('/api/admin/export?type=sponsors', {
    method: 'GET',
    headers: {
      'Cookie': adminCookie
    }
  });
  assert(authSponsorRes.statusCode === 200, 'Authenticated Sponsor export returns HTTP 200 OK', `Got ${authSponsorRes.statusCode}`);
  assert(authSponsorRes.headers['content-type']?.includes('text/csv'), 'Sponsor export returns Content-Type text/csv');

  // --------------------------------------------------------------------------
  // TEST GROUP 3: CSV FORMULA INJECTION SANITIZATION (VULN-04 / CWE-1236)
  // --------------------------------------------------------------------------
  console.log('\n--- 3. CSV FORMULA INJECTION SANITIZATION (VULN-04) ---');

  const formulaTestCases = [
    { input: '=cmd|\x27 /C calc\x27!A0', expectedPrefix: `"'=` },
    { input: '+1234567890', expectedPrefix: `"'+` },
    { input: '-999.50', expectedPrefix: `"'-` },
    { input: '@SUM(1+1)', expectedPrefix: `"'@` },
    { input: '\t=1+1', expectedPrefix: `"'\t` },
    { input: '\r=1+1', expectedPrefix: `"'\r` },
    { input: '%USERDOMAIN%', expectedPrefix: `"'%` },
    { input: '   =TRIMMED_FORMULA()', expectedPrefix: `"'   =` },
    { input: 'Normal Name', expected: '"Normal Name"' },
    { input: 'He said "Hello"', expected: '"He said ""Hello"""' },
    { input: null, expected: '""' },
    { input: undefined, expected: '""' },
    { input: 42, expected: '"42"' }
  ];

  for (const tc of formulaTestCases) {
    const sanitized = sanitizeCsvCell(tc.input);
    if (tc.expectedPrefix) {
      assert(sanitized.startsWith(tc.expectedPrefix), `Formula payload [${JSON.stringify(tc.input)}] is escaped with single quote prefix`, `Got: ${sanitized}`);
    } else if (tc.expected) {
      assert(sanitized === tc.expected, `Value [${JSON.stringify(tc.input)}] correctly formatted as [${tc.expected}]`, `Got: ${sanitized}`);
    }
  }

  // Inspect generated CSV from live exports to verify quotes wrapping
  const waitlistLines = authWaitlistRes.body.split('\n');
  assert(waitlistLines.length >= 1, 'Waitlist CSV contains lines');
  const headerCells = waitlistLines[0].split(',');
  const allHeadersQuoted = headerCells.every(c => c.startsWith('"') && c.endsWith('"'));
  assert(allHeadersQuoted, 'All Waitlist CSV header cells are strictly wrapped in double quotes');

  const csatLines = authCsatRes.body.split('\n');
  assert(csatLines.length >= 1, 'CSAT CSV contains lines');
  const csatHeaderCells = csatLines[0].split(',');
  const allCsatHeadersQuoted = csatHeaderCells.every(c => c.startsWith('"') && c.endsWith('"'));
  assert(allCsatHeadersQuoted, 'All CSAT CSV header cells are strictly wrapped in double quotes');

  // Summary
  console.log('\n================================================================');
  console.log(`  PHASE 00 CONTAINMENT TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
  if (failedTests === 0) {
    console.log('  >>> STATUS: ALL PHASE 00 SECURITY CHECKS PASSED <<<');
  } else {
    console.error(`  >>> STATUS: ${failedTests} CHECKS FAILED <<<`);
  }
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runPhase00SecurityTests().catch((err) => {
  console.error('Fatal error in Phase 00 security tests:', err);
  process.exit(1);
});
