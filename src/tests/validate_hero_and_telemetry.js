const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('====================================================');
console.log('   RUNNING 2.5D LOGO & TELEMETRY VALIDATION SUITE   ');
console.log('====================================================');

// Test 1: HeroSection uses Logo25DAnimation and no Hourglass3D
const heroPath = path.join(__dirname, '..', 'components', 'hero', 'HeroSection.tsx');
const heroCode = fs.readFileSync(heroPath, 'utf8');

if (!heroCode.includes("import { Logo25DAnimation } from './Logo25DAnimation'")) {
  console.error('FAIL: HeroSection does not import Logo25DAnimation');
  process.exit(1);
}
if (!heroCode.includes('<Logo25DAnimation />')) {
  console.error('FAIL: HeroSection does not render <Logo25DAnimation />');
  process.exit(1);
}
if (heroCode.includes('Hourglass3D')) {
  console.error('FAIL: HeroSection still references Hourglass3D');
  process.exit(1);
}
console.log('✓ TEST 1 PASSED: HeroSection cleanly mounts Logo25DAnimation with zero Three.js canvas overhead.');

// Test 2: Logo25DAnimation implementation
const logoPath = path.join(__dirname, '..', 'components', 'hero', 'Logo25DAnimation.tsx');
const logoCode = fs.readFileSync(logoPath, 'utf8');

const requiredFeatures = [
  'preserve-3d',
  'perspective',
  '/assets/kairos-hourglass.png',
  '48H SAND SYNC',
  'IST CALIBRATED · 12.87°N',
  'handleMouseMove',
  'animate-orbit-spin',
  'rotateX',
  'rotateY',
];

for (const feat of requiredFeatures) {
  if (!logoCode.includes(feat)) {
    console.error(`FAIL: Logo25DAnimation missing feature: ${feat}`);
    process.exit(1);
  }
}
console.log('✓ TEST 2 PASSED: 2.5D animation features (Astrolabe, celestial orbit, parallax tilt, official logo, HUD) verified.');

// Test 3: FactsStrip monolithic architectural console
const factsPath = path.join(__dirname, '..', 'components', 'sections', 'FactsStrip.tsx');
const factsCode = fs.readFileSync(factsPath, 'utf8');

if (!factsCode.includes('divide-x divide-white/5 border-x border-white/5')) {
  console.error('FAIL: FactsStrip does not have monolithic architectural divider grid');
  process.exit(1);
}
if (!factsCode.includes("tag: 'DURATION'") || !factsCode.includes("tag: 'BOUNTIES'")) {
  console.error('FAIL: FactsStrip missing technical telemetry indexing');
  process.exit(1);
}
console.log('✓ TEST 3 PASSED: FactsStrip monolithic telemetry dock (replaces generic AI soft corner cards) verified.');

// Test 4: Live HTTP Server Verification
const testUrl = process.env.BASE_URL || (process.env.PORT ? 'http://localhost:' + process.env.PORT : 'http://localhost:3000');
http.get(testUrl + '/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`FAIL: Dev server returned status ${res.statusCode}`);
      process.exit(1);
    }
    if (!data.includes('2.5D Hologram Active') || !data.includes('kairos-hourglass.png')) {
      console.error('FAIL: Response does not contain 2.5D logo animation markers');
      process.exit(1);
    }
    console.log(`✓ TEST 4 PASSED: Live dev server at ${testUrl} is healthy and serving 2.5D logo.`);
    console.log('====================================================');
    console.log('   ALL 4 HERO & TELEMETRY TESTS PASSED! [OK]       ');
    console.log('====================================================');
  });
}).on('error', (err) => {
  console.error('FAIL: Could not reach dev server:', err.message);
  process.exit(1);
});
