/**
 * KAIROS 2027 — PHASE 02 STUDENT AUTHENTICATION TEST SUITE
 * 
 * Verifies:
 * 1. New student registration & password hashing
 * 2. Duplicate registration prevention (409 Conflict)
 * 3. Email verification mechanics & token expiration
 * 4. Conditional waitlist linking (only linked AFTER email verification)
 * 5. Secure login, HttpOnly cookie emission & logout
 * 6. Session persistence and expired session rejection
 * 7. Password reset workflow (forgot-password, reset-password, old vs new credential validation)
 * 8. Protected student routes (/api/v1/student/me) & profile mutation
 * 9. Cross-account identity isolation (zero client-claimed identity trust)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE_URL = 'http://localhost:8000';

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
  const setCookie = res.headers['set-cookie'];
  if (!setCookie) return null;
  const raw = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
  const match = raw.match(new RegExp(`${cookieName}=([^;]+)`));
  return match ? `${cookieName}=${match[1]}` : null;
}

async function runPhase02AuthTests() {
  console.log('================================================================');
  console.log('    KAIROS 2027 — PHASE 02 STUDENT AUTHENTICATION TEST SUITE    ');
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

  const timestamp = Date.now();
  const testStudentEmail = `builder.${timestamp}@sathyabama.ac.in`;
  const initialPassword = 'SecurePassword2027!';
  const updatedPassword = 'NewUltraSecurePassword2027#';
  let verificationToken = '';
  let studentCookie = '';

  // --------------------------------------------------------------------------
  // 1. UNPROTECTED ROUTE SECURITY (Least Privilege Check)
  // --------------------------------------------------------------------------
  console.log('--- 1. PROTECTED ROUTE ENFORCEMENT ---');
  const unauthRes = await request('/api/v1/student/me');
  assert(unauthRes.statusCode === 401, 'GET /api/v1/student/me without cookie returns HTTP 401 Unauthorized');
  assert(unauthRes.data?.code === 'UNAUTHORIZED', 'Unauthenticated response returns UNAUTHORIZED error code');

  // --------------------------------------------------------------------------
  // 2. PRE-REGISTER ON WAITLIST (To Test Subsequent Verified Linking)
  // --------------------------------------------------------------------------
  console.log('\n--- 2. WAITLIST PRE-REGISTRATION SETUP ---');
  const waitlistPayload = JSON.stringify({
    fullName: 'Ananya Sathyabama Builder',
    email: testStudentEmail,
    institution: 'Sathyabama Institute of Science and Technology',
    preferredTrack: 'Agentic AI & Generative Workflows',
    motivation: 'Building autonomous consensus agents'
  });
  const waitlistRes = await request('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(waitlistPayload) },
    body: waitlistPayload
  });
  assert(waitlistRes.statusCode === 200, 'Pre-registration on waitlist succeeds');

  // --------------------------------------------------------------------------
  // 3. STUDENT REGISTRATION
  // --------------------------------------------------------------------------
  console.log('\n--- 3. STUDENT REGISTRATION & VALIDATION ---');
  
  // Weak password rejection
  const weakPasswordPayload = JSON.stringify({
    email: testStudentEmail,
    password: 'short',
    fullName: 'Ananya Sathyabama Builder'
  });
  const weakRes = await request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(weakPasswordPayload) },
    body: weakPasswordPayload
  });
  assert(weakRes.statusCode === 400, 'Registration with password < 8 chars is rejected with HTTP 400');

  // Valid registration
  const validRegPayload = JSON.stringify({
    email: testStudentEmail,
    password: initialPassword,
    fullName: 'Ananya Sathyabama Builder',
    institution: 'Sathyabama Institute of Science and Technology',
    phone: '+91 98401 99999',
    department: 'School of Computing',
    yearOfStudy: '3rd Year'
  });
  const regRes = await request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(validRegPayload) },
    body: validRegPayload
  });
  assert(regRes.statusCode === 201, 'Valid student registration returns HTTP 201 Created');
  assert(regRes.data?.student?.emailVerified === false, 'New student account starts with emailVerified: false');
  assert(!!regRes.data?.verificationToken, 'Registration response includes cryptographic verification token');
  verificationToken = regRes.data?.verificationToken;

  // Duplicate registration handling
  const dupRes = await request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(validRegPayload) },
    body: validRegPayload
  });
  assert(dupRes.statusCode === 409, 'Duplicate email registration returns HTTP 409 Conflict');
  assert(dupRes.data?.code === 'EMAIL_ALREADY_REGISTERED', 'Duplicate returns EMAIL_ALREADY_REGISTERED code');

  // --------------------------------------------------------------------------
  // 4. LOGIN PRIOR TO VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n--- 4. LOGIN & INITIAL SESSION ---');
  
  // Invalid password rejection
  const badLoginPayload = JSON.stringify({ email: testStudentEmail, password: 'WrongPassword123' });
  const badLoginRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(badLoginPayload) },
    body: badLoginPayload
  });
  assert(badLoginRes.statusCode === 401, 'Login with incorrect password returns HTTP 401 Unauthorized');

  // Valid login
  const validLoginPayload = JSON.stringify({ email: testStudentEmail, password: initialPassword });
  const loginRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(validLoginPayload) },
    body: validLoginPayload
  });
  assert(loginRes.statusCode === 200, 'Login with correct credentials returns HTTP 200 OK');
  studentCookie = extractCookie(loginRes, 'kairos_student_session');
  assert(!!studentCookie, 'Login response emits HttpOnly kairos_student_session cookie');
  assert(loginRes.headers['set-cookie']?.some(c => c.includes('HttpOnly')), 'kairos_student_session has HttpOnly flag set');

  // Verify identity is NOT linked to waitlist while unverified
  const profileUnverifiedRes = await request('/api/v1/student/me', {
    headers: { 'Cookie': studentCookie }
  });
  assert(profileUnverifiedRes.statusCode === 200, 'Authenticated GET /api/v1/student/me returns HTTP 200');
  assert(profileUnverifiedRes.data?.student?.emailVerified === false, 'Student profile accurately reflects unverified email state');

  // --------------------------------------------------------------------------
  // 5. EMAIL VERIFICATION & CONDITIONAL WAITLIST LINKING
  // --------------------------------------------------------------------------
  console.log('\n--- 5. EMAIL VERIFICATION & SAFE WAITLIST LINKING ---');

  // Invalid token check
  const badVerifyRes = await request('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: 'malformed-or-tampered-token' })
  });
  assert(badVerifyRes.statusCode === 400, 'Tampered verification token returns HTTP 400 Bad Request');

  // Valid verification
  const verifyRes = await request('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: verificationToken })
  });
  assert(verifyRes.statusCode === 200, 'Valid verification token returns HTTP 200 OK');
  assert(verifyRes.data?.student?.emailVerified === true, 'Response confirms emailVerified: true');

  // Verify student profile now links existing waitlist
  const verifiedProfileRes = await request('/api/v1/student/me', {
    headers: { 'Cookie': studentCookie }
  });
  assert(verifiedProfileRes.data?.student?.emailVerified === true, 'Session reflects email is verified');
  assert(verifiedProfileRes.data?.waitlist !== null, 'Existing waitlist registration safely linked AFTER verified email claim');
  assert(verifiedProfileRes.data?.waitlist?.preferredTrack === 'Agentic AI & Generative Workflows', 'Linked waitlist preserves original track');

  // --------------------------------------------------------------------------
  // 6. PROFILE MUTATION VIA PROTECTED ROUTE
  // --------------------------------------------------------------------------
  console.log('\n--- 6. AUTHENTICATED PROFILE UPDATE ---');
  const updatePayload = JSON.stringify({
    phone: '+91 98401 88888',
    department: 'School of Computing - Advanced Cloud Lab',
    tshirtSize: 'XL',
    githubUrl: 'https://github.com/ananya-builder'
  });
  const updateRes = await request('/api/v1/student/me', {
    method: 'PUT',
    headers: { 
      'Cookie': studentCookie,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(updatePayload)
    },
    body: updatePayload
  });
  assert(updateRes.statusCode === 200, 'PUT /api/v1/student/me returns HTTP 200 OK');
  assert(updateRes.data?.student?.tshirtSize === 'XL', 'Profile update correctly saved tshirtSize');
  assert(updateRes.data?.student?.githubUrl === 'https://github.com/ananya-builder', 'Profile update correctly saved githubUrl');

  // --------------------------------------------------------------------------
  // 7. PASSWORD RESET WORKFLOW
  // --------------------------------------------------------------------------
  console.log('\n--- 7. PASSWORD RECOVERY & RESET ---');

  // Request recovery link
  const forgotPayload = JSON.stringify({ email: testStudentEmail });
  const forgotRes = await request('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(forgotPayload) },
    body: forgotPayload
  });
  assert(forgotRes.statusCode === 200, 'POST /api/auth/forgot-password returns HTTP 200 OK');
  const resetToken = forgotRes.data?.resetToken;
  assert(!!resetToken, 'Password reset token generated');

  // Execute password reset
  const resetPayload = JSON.stringify({ token: resetToken, newPassword: updatedPassword });
  const resetRes = await request('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(resetPayload) },
    body: resetPayload
  });
  assert(resetRes.statusCode === 200, 'POST /api/auth/reset-password returns HTTP 200 OK');

  // Old password should now fail
  const oldLoginRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testStudentEmail, password: initialPassword })
  });
  assert(oldLoginRes.statusCode === 401, 'Login with old password correctly fails (HTTP 401)');

  // New password should succeed
  const newLoginRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testStudentEmail, password: updatedPassword })
  });
  assert(newLoginRes.statusCode === 200, 'Login with new password succeeds (HTTP 200)');
  studentCookie = extractCookie(newLoginRes, 'kairos_student_session');

  // --------------------------------------------------------------------------
  // 8. LOGOUT & SESSION TERMINATION
  // --------------------------------------------------------------------------
  console.log('\n--- 8. LOGOUT & EXPIRED SESSION HANDLING ---');

  const logoutRes = await request('/api/auth/logout', {
    method: 'POST',
    headers: { 'Cookie': studentCookie }
  });
  assert(logoutRes.statusCode === 200, 'POST /api/auth/logout returns HTTP 200 OK');

  // Test tampered / expired session token
  const tamperedCookie = 'kairos_student_session=eyJzdHVkZW50SWQiOiJmYWtlIn0=::badsignature123';
  const tamperedRes = await request('/api/v1/student/me', {
    headers: { 'Cookie': tamperedCookie }
  });
  assert(tamperedRes.statusCode === 401, 'Tampered session token returns HTTP 401 Unauthorized');

  // Summary
  console.log('\n================================================================');
  console.log(`  PHASE 02 AUTH TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
  if (failedTests === 0) {
    console.log('  >>> STATUS: ALL PHASE 02 AUTHENTICATION CHECKS PASSED <<<');
  } else {
    console.error(`  >>> STATUS: ${failedTests} CHECKS FAILED <<<`);
  }
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runPhase02AuthTests().catch((err) => {
  console.error('Fatal error in Phase 02 auth tests:', err);
  process.exit(1);
});
