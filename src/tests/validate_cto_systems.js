const assert = require('assert');
const crypto = require('crypto');
const {
  calculatePopulationZScores,
  recalculateJudgeCheckpointScores,
} = require('../lib/scoring.ts');
const {
  normalizeGitHubRepository,
  sanitizeCommitMessage,
  verifyGitHubWebhookSignature,
} = require('../lib/github-webhook.ts');

console.log('====================================================');
console.log('   RUNNING CTO SCORING & TELEMETRY VALIDATION');
console.log('====================================================');

const normalized = calculatePopulationZScores([60, 70, 80]);
assert.deepStrictEqual(normalized, [-1.2247, 0, 1.2247]);
assert.deepStrictEqual(calculatePopulationZScores([90]), [0]);
assert.deepStrictEqual(calculatePopulationZScores([75, 75]), [0, 0]);
console.log('✓ TEST 1 PASSED: Population Z-scores and zero-variance behavior verified.');

const evaluations = [
  { judgeId: 'judge-1', checkpointGate: 1, rawTotalScore: 60 },
  { judgeId: 'judge-1', checkpointGate: 1, rawTotalScore: 80 },
  { judgeId: 'judge-1', checkpointGate: 2, rawTotalScore: 10, normalizedZScore: 99 },
];
recalculateJudgeCheckpointScores(evaluations, 'judge-1', 1);
assert.strictEqual(evaluations[0].normalizedZScore, -1);
assert.strictEqual(evaluations[1].normalizedZScore, 1);
assert.strictEqual(evaluations[2].normalizedZScore, 99, 'Other checkpoints must not be mixed into normalization');
console.log('✓ TEST 2 PASSED: Judge scores are normalized within the same checkpoint only.');

assert.strictEqual(normalizeGitHubRepository('https://github.com/AWS-SBG-SIST/Kairos-2027.git'), 'aws-sbg-sist/kairos-2027');
assert.strictEqual(normalizeGitHubRepository('https://gitlab.com/example/repo'), '');
assert.strictEqual(sanitizeCommitMessage('feat: add telemetry\n\nwith details'), 'feat: add telemetry with details');
console.log('✓ TEST 3 PASSED: Repository and commit payload normalization verified.');

const secret = 'unit-test-webhook-secret';
const body = JSON.stringify({ repository: { full_name: 'aws-sbg-sist/Kairos-2027' } });
const signature = `sha256=${crypto.createHmac('sha256', secret).update(body).digest('hex')}`;
assert.strictEqual(verifyGitHubWebhookSignature(body, signature, secret), true);
assert.strictEqual(verifyGitHubWebhookSignature(`${body}x`, signature, secret), false);
console.log('✓ TEST 4 PASSED: GitHub HMAC SHA-256 signature verification verified.');

console.log('====================================================');
console.log('   ALL 4 CTO SYSTEM VALIDATION SUITES PASSED! [OK]');
console.log('====================================================');
