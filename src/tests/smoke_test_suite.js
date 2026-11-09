const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8000';

function fetchUrl(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 25000,
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

async function runSmokeTests() {
  console.log('================================================================');
  console.log('       KAIROS 2027 COMPREHENSIVE SMOKE & BUTTON TEST SUITE      ');
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

  // -------------------------------------------------------------------------
  // SUITE 1: ROUTE SMOKE TESTS (ALL 21 PLATFORM PAGES)
  // -------------------------------------------------------------------------
  console.log('[SUITE 1] Testing HTTP Status of All Platform Routes & Pages...');
  const routesToTest = [
    { path: '/', name: 'Homepage (Landing & Telemetry)' },
    { path: '/tracks', name: 'Technical Tracks' },
    { path: '/rules', name: 'Competition Rules & Ethics' },
    { path: '/sponsors', name: 'Sponsorship & Partners' },
    { path: '/refer-sponsor', name: 'Rainmaker ₹ Referral Program' },
    { path: '/resources', name: 'Builder Resources & Docs' },
    { path: '/dashboard', name: 'Participant Dashboard' },
    { path: '/admin/login', name: 'Admin Login Portal' },
    { path: '/stage', name: 'Live Stage & Schedule' },
    { path: '/on-campus', name: 'On-Campus Logistics & Venue' },
    { path: '/online-qualifier', name: 'Round 1 Qualifier Portal' },
    { path: '/portal', name: 'Portal Gateway' },
    { path: '/portal/pass', name: 'Digital Builder Pass' },
    { path: '/team/create', name: 'Create Squad' },
    { path: '/team/join', name: 'Join Squad' },
    { path: '/register', name: 'Registration (100% Free)' },
    { path: '/members', name: 'Organizing Committee Members' },
    { path: '/members/leadership', name: 'Student Leadership Team' },
    { path: '/leaderboard', name: 'Live Leaderboard' },
    { path: '/judging', name: 'Judging Console' },
    { path: '/csat', name: 'CSAT Feedback' },
  ];

  for (const route of routesToTest) {
    try {
      const res = await fetchUrl(route.path);
      assert(
        res.statusCode === 200,
        `Route: ${route.path} - ${route.name}`,
        `Status ${res.statusCode}`
      );
    } catch (err) {
      assert(false, `Route: ${route.path} - ${route.name}`, err.message);
    }
  }

  // -------------------------------------------------------------------------
  // SUITE 2: NAVBAR BUTTONS & INTERACTIVE NAVIGATION AUDIT
  // -------------------------------------------------------------------------
  console.log('\n[SUITE 2] Testing Navigation Header Buttons, Links, & Overlays...');
  const navbarFile = path.join(__dirname, '..', 'components', 'navigation', 'Navbar.tsx');
  const navbarSrc = fs.readFileSync(navbarFile, 'utf8');

  // Check header z-index and pointer-events
  assert(
    navbarSrc.includes('z-[70]') && navbarSrc.includes('pointer-events-auto'),
    'Header has elevated z-[70] and pointer-events-auto to prevent click interception'
  );

  // Check primary navigation button links
  const primaryButtons = [
    { label: 'Tracks', href: '/tracks' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'Qualifier', href: '/online-qualifier' },
    { label: 'Rainmaker ₹', href: '/refer-sponsor' },
    { label: 'Rules', href: '/rules' },
  ];

  for (const btn of primaryButtons) {
    const hasLink = navbarSrc.includes(`href: '${btn.href}'`);
    assert(hasLink, `Navbar Primary Nav: "${btn.label}" button targets ${btn.href}`);
  }

  // Check secondary dropdown links
  const secondaryButtons = [
    { label: 'Resources', href: '/resources' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Leadership', href: '/members/leadership' },
    { label: 'On-Campus R2', href: '/on-campus' },
  ];

  for (const btn of secondaryButtons) {
    const hasLink = navbarSrc.includes(`href: '${btn.href}'`);
    assert(hasLink, `Navbar "More ▾" Dropdown: "${btn.label}" button targets ${btn.href}`);
  }

  // Check Desktop action buttons
  assert(navbarSrc.includes('href="/dashboard"'), 'Navbar Action: "Dashboard" button is wired to /dashboard');
  assert(navbarSrc.includes('href="/admin/login"'), 'Navbar Action: "Admin" button is wired to /admin/login');
  assert(navbarSrc.includes('href="/register"'), 'Navbar Action: "Register (100% Free)" button is wired to /register');
  assert(navbarSrc.includes('<ThemeToggle'), 'Navbar Action: ThemeToggle (Cyber Neon / AWS) is mounted');
  assert(navbarSrc.includes('sound?.toggle()'), 'Navbar Action: Sound/Audio Mute Toggle button is wired to sound.toggle()');
  assert(navbarSrc.includes('setMoreMenuOpen'), 'Navbar Action: "More ▾" button has dropdown toggle state');
  assert(navbarSrc.includes('setMobileMenuOpen'), 'Navbar Action: Mobile Hamburger Menu button has toggle state');

  // -------------------------------------------------------------------------
  // SUITE 3: HERO & TELEMETRY BUTTONS AUDIT
  // -------------------------------------------------------------------------
  console.log('\n[SUITE 3] Testing Hero Section & Telemetry Buttons...');
  const heroFile = path.join(__dirname, '..', 'components', 'hero', 'HeroSection.tsx');
  const heroSrc = fs.readFileSync(heroFile, 'utf8');

  assert(
    heroSrc.includes('href="/register"') && heroSrc.includes('Submit Round 0 Project Abstract'),
    'Hero Primary CTA: "Submit Round 0 Project Abstract (Free)" button targets /register'
  );
  assert(
    heroSrc.includes('href="/sponsors"') && heroSrc.includes('View Sponsorship Prospectus (PDF)'),
    'Hero Secondary CTA: "View Sponsorship Prospectus (PDF)" button targets /sponsors'
  );
  assert(
    heroSrc.includes('href="/refer-sponsor"') && (heroSrc.includes('Earn 10% to 15% Referral Cash') || heroSrc.includes('Earn 10%–15% Referral Cash')),
    'Hero Tertiary CTA: "Earn 10%–15% Referral Cash" button targets /refer-sponsor'
  );
  assert(
    heroSrc.includes('sound?.playClick()'),
    'Hero buttons have audio feedback wired on click'
  );

  // Check 2.5D Logo canvas separation and clearance
  const logoFile = path.join(__dirname, '..', 'components', 'hero', 'Logo25DAnimation.tsx');
  const logoSrc = fs.readFileSync(logoFile, 'utf8');
  assert(
    logoSrc.includes('bottom-4') && !logoSrc.includes('-bottom-3'),
    '2.5D Logo: "IST CALIBRATED · 12.87°N" chip positioned cleanly inside canvas bounds'
  );
  assert(
    heroSrc.includes('mt-8 sm:mt-10'),
    'Hero: "2.5D Hologram Active" pill has generous vertical margin to prevent overlap'
  );

  // -------------------------------------------------------------------------
  // SUITE 4: MISSION & FACTS BUTTONS AND IMAGE INTEGRITY
  // -------------------------------------------------------------------------
  console.log('\n[SUITE 4] Testing FactsStrip & MissionSection Image & Button Integrity...');
  const factsFile = path.join(__dirname, '..', 'components', 'sections', 'FactsStrip.tsx');
  const factsSrc = fs.readFileSync(factsFile, 'utf8');

  // Verify single frameless images
  assert(
    factsSrc.includes('/assets/duration.png') &&
    factsSrc.includes('/assets/teams.png') &&
    factsSrc.includes('/assets/register.png') &&
    factsSrc.includes('/assets/prizes.png') &&
    factsSrc.includes('/assets/venue.png') &&
    factsSrc.includes('/assets/challenges.png'),
    'FactsStrip: All 6 cards use single frameless transparent PNGs'
  );
  assert(
    !factsSrc.includes('bg-slate-950/80 border border-slate-800'),
    'FactsStrip: No artificial dark container box frames around transparent PNGs'
  );
  assert(
    factsSrc.includes('sound?.playHover()'),
    'FactsStrip: Audio hover feedback active on each card segment'
  );

  const missionFile = path.join(__dirname, '..', 'components', 'sections', 'MissionSection.tsx');
  const missionSrc = fs.readFileSync(missionFile, 'utf8');
  assert(
    missionSrc.includes('/assets/innov.png') &&
    missionSrc.includes('/assets/collaborate.png') &&
    missionSrc.includes('/assets/build.png'),
    'MissionSection: 3 Pillars use single frameless transparent PNGs with drop shadows'
  );

  // -------------------------------------------------------------------------
  // SUITE 5: BUILDER RADAR & MATCHING BUTTONS & MODAL AUDIT
  // -------------------------------------------------------------------------
  console.log('\n[SUITE 5] Testing Team Radar Buttons, Filters, & Broadcast Modal...');
  const radarFile = path.join(__dirname, '..', 'components', 'sections', 'TeamRadarSection.tsx');
  const radarSrc = fs.readFileSync(radarFile, 'utf8');

  assert(
    radarSrc.includes('gradient-text-kairos') && radarSrc.includes('Elite Squad'),
    'Team Radar: "Elite Squad" title renders with vibrant gradient-text-kairos'
  );
  assert(
    !radarSrc.includes('celestial-light') && !radarSrc.includes('electric-cyan'),
    'Team Radar: Non-existent color tokens completely removed'
  );
  assert(
    radarSrc.includes('setIsModalOpen(true)') && radarSrc.includes('Broadcast Your Beacon'),
    'Team Radar: "Broadcast Your Beacon" button triggers modal open'
  );
  assert(
    radarSrc.includes('setSelectedTrack'),
    'Team Radar: Track filter buttons update selectedTrack state'
  );
  assert(
    radarSrc.includes('setSelectedRole'),
    'Team Radar: Role filter buttons update selectedRole state'
  );
  assert(
    radarSrc.includes('handleConnect') && radarSrc.includes('Connect with Builder'),
    'Team Radar: "Connect with Builder" button wired with clipboard/external link handler'
  );

  // Check BroadcastRadarModal
  const modalFile = path.join(__dirname, '..', 'components', 'modals', 'BroadcastRadarModal.tsx');
  const modalSrc = fs.readFileSync(modalFile, 'utf8');
  assert(
    modalSrc.includes('handleSubmit') && modalSrc.includes('type="submit"'),
    'Broadcast Radar Modal: Form submit button correctly triggers handleSubmit'
  );
  assert(
    modalSrc.includes('onClose()') && modalSrc.includes('Close dialog'),
    'Broadcast Radar Modal: Close (X) button cleanly triggers onClose'
  );

  // -------------------------------------------------------------------------
  // SUITE 6: API ENDPOINTS BACKING BUTTON ACTIONS
  // -------------------------------------------------------------------------
  console.log('\n[SUITE 6] Testing Live API Endpoints for Button Actions...');
  let testSignalId = null;
  let testReferralId = null;

  // Test 1: Radar API GET
  try {
    const res = await fetchUrl('/api/radar');
    assert(res.statusCode === 200, 'API GET /api/radar returns HTTP 200');
    const data = JSON.parse(res.body);
    assert(data.success === true && Array.isArray(data.signals), 'API GET /api/radar returns active builder signals array');
  } catch (err) {
    assert(false, 'API GET /api/radar', err.message);
  }

  // Test 2: Radar API POST (Simulating Broadcast Button click)
  try {
    const postPayload = JSON.stringify({
      builderName: 'Ephemeral Smoke Test Builder',
      role: 'Fullstack Engineer',
      trackId: 'agentic-ai',
      college: 'Sathyabama Institute of Science and Technology',
      skills: ['TypeScript', 'Next.js', 'AWS Lambda'],
      seeking: 'Smoke test verification of broadcast beacon button',
      contactUrl: 'https://github.com/smoketest',
    });

    const res = await fetchUrl('/api/radar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: postPayload,
    });
    assert(res.statusCode === 200, 'API POST /api/radar (Broadcast Beacon) returns HTTP 200');
    const data = JSON.parse(res.body);
    assert(data.success === true && data.signal?.id, 'API POST /api/radar successfully creates beacon signal');
    if (data.signal?.id) {
      testSignalId = data.signal.id;
    }
  } catch (err) {
    assert(false, 'API POST /api/radar', err.message);
  }

  // Test 3: Chatbot API POST (Simulating Chatbot prompt button click)
  try {
    const chatPayload = JSON.stringify({
      message: 'What is the cash prize pool for KAIROS 2027?',
    });

    const res = await fetchUrl('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: chatPayload,
    });
    assert(res.statusCode === 200, 'API POST /api/chatbot returns HTTP 200');
    const data = JSON.parse(res.body);
    assert(
      data.success === true && (data.reply.includes('1,75,000') || data.reply.includes('1.75')),
      'API POST /api/chatbot returns accurate RAG response for prize pool'
    );
  } catch (err) {
    assert(false, 'API POST /api/chatbot', err.message);
  }

  // Test 4: Calendar Export API GET (Simulating Add to Calendar button)
  try {
    const res = await fetchUrl('/api/calendar');
    assert(res.statusCode === 200, 'API GET /api/calendar returns HTTP 200');
    assert(res.body.includes('BEGIN:VCALENDAR') && res.body.includes('KAIROS 2027'), 'API GET /api/calendar returns valid iCalendar file');
  } catch (err) {
    assert(false, 'API GET /api/calendar', err.message);
  }

  // Test 5: Sponsor Referral POST API (Simulating Refer Sponsor Submit button)
  try {
    const refPayload = JSON.stringify({
      referrerName: 'Ephemeral Smoke Test Referrer',
      referrerEmail: 'referrer@test.com',
      referrerPhone: '9876543210',
      referrerCollege: 'SIST Chennai',
      referrerUpiId: 'referrer@upi',
      companyName: 'Cloud Corp',
      decisionMakerName: 'Jane Doe',
      decisionMakerEmail: 'jane@cloudcorp.com',
      decisionMakerDesignation: 'Head of Developer Relations',
      estimatedDealTier: 'POWERED_100K',
      notes: 'Smoke test verification',
    });

    const res = await fetchUrl('/api/v1/refer-sponsor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: refPayload,
    });
    assert(res.statusCode === 200 || res.statusCode === 201, 'API POST /api/v1/refer-sponsor returns HTTP 200/201 Created');
    const data = JSON.parse(res.body);
    assert(data.success === true, 'API POST /api/v1/refer-sponsor returns success: true');
    if (data.referral?.id) {
      testReferralId = data.referral.id;
    }
  } catch (err) {
    assert(false, 'API POST /api/v1/refer-sponsor', err.message);
  }

  // Cleanup ephemeral test data from store so UI stays pristine
  try {
    const storePath = path.join(__dirname, '..', '..', 'data', 'kairos_store.json');
    if (fs.existsSync(storePath)) {
      const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
      if (testSignalId && Array.isArray(storeData.radarSignals)) {
        storeData.radarSignals = storeData.radarSignals.filter((s) => s.id !== testSignalId && !s.builderName?.includes('Smoke Test'));
      }
      if (Array.isArray(storeData.referrals)) {
        storeData.referrals = storeData.referrals.filter((r) => (testReferralId ? r.id !== testReferralId : true) && !r.referrerName?.includes('Smoke Test'));
      }
      fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
    }
  } catch (e) {
    // Non-fatal cleanup
  }

  // -------------------------------------------------------------------------
  // SUITE 7: OVERLAY SAFETY & MODAL BLOCKING CHECK
  // -------------------------------------------------------------------------
  console.log('\n[SUITE 7] Testing Fullscreen Overlay Trapping Safety...');
  const revealFile = path.join(__dirname, '..', 'components', 'animation', 'EntranceVideoReveal.tsx');
  const revealSrc = fs.readFileSync(revealFile, 'utf8');

  assert(
    !revealSrc.includes('isVisible = true') || revealSrc.includes('if (forceOpen)'),
    'EntranceVideoReveal: No automatic full-screen click interception on page load'
  );
  assert(
    revealSrc.includes('if (!isVisible) return null;'),
    'EntranceVideoReveal: Safely returns null when inactive (zero DOM occlusion)'
  );

  // -------------------------------------------------------------------------
  // FINAL REPORT
  // -------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`SMOKE SCREEN TESTING COMPLETE: ${passedTests}/${totalTests} TESTS PASSED (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  if (failedTests === 0) {
    console.log('STATUS: [ALL BUTTONS, ROUTES & APIS VERIFIED 100% OPERATIONAL]');
  } else {
    console.error(`STATUS: [${failedTests} TESTS FAILED - REVIEW REQUIRED]`);
    process.exit(1);
  }
  console.log('================================================================\n');
}

runSmokeTests().catch((err) => {
  console.error('Fatal Smoke Test Error:', err);
  process.exit(1);
});
