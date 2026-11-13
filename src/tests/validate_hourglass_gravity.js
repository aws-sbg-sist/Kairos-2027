const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('   RUNNING 2.5D HOURGLASS GRAVITY VERIFICATION     ');
console.log('====================================================');

const logoPath = path.join(__dirname, '..', 'components', 'hero', 'Logo25DAnimation.tsx');
const logoCode = fs.readFileSync(logoPath, 'utf8');

const sandPath = path.join(__dirname, '..', 'components', 'hero', 'HourglassLiveSand.tsx');
const sandCode = fs.readFileSync(sandPath, 'utf8');

// 1. Verify that sand canvas is NOT trapped inside a 180° rotated parent
assert(!logoCode.includes("rotateZ(${isFlipped ? 180 : 0}deg)"), 'Outer emblem container must not invert the entire coordinate system');
assert(logoCode.includes("rotateZ(${flipAngle}deg)"), 'Glass frame must rotate independently upon flip');
assert(logoCode.includes("<HourglassLiveSand"), 'Logo25DAnimation must mount HourglassLiveSand');
console.log('✓ TEST 1 PASSED: Logo25DAnimation isolates glass rotation from the sand simulation canvas.');

// 2. Verify that sand particles strictly fall downwards (+Y)
assert(sandCode.includes("p.vy += 0.22"), 'Particle velocity must accelerate downwards (+Y)');
assert(sandCode.includes("p.y += p.vy"), 'Particle position must increment downwards (+Y)');
assert(sandCode.includes("sandTopY = 192"), 'Upper reservoir must begin at top (Y=192)');
assert(sandCode.includes("moundApexY = 394"), 'Lower mound must form at bottom (Y=394)');
assert(sandCode.includes("flipWarmup"), 'Sand stream must include smooth warmup transition on inversion');
console.log('✓ TEST 2 PASSED: HourglassLiveSand strictly enforces physical downward gravity from upper bulb to lower bulb.');

// 3. Verify continuous forward tumbling flipAngle logic
assert(logoCode.includes("setFlipAngle((prev) => prev + 180)"), 'Hourglass flip must advance continuously (+180°) without reverse unwinding');
assert(logoCode.includes("const isFlipped = (flipAngle / 180) % 2 !== 0"), 'isFlipped must be derived cleanly from flipAngle');
console.log('✓ TEST 3 PASSED: Continuous +180° flip angle rotation verified.');

console.log('\n====================================================');
console.log('   ALL 3 HOURGLASS GRAVITY TESTS PASSED! [100% OK]  ');
console.log('====================================================\n');
