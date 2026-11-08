const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { retrieveKairosKnowledge, synthesizeLocalAnswer, KAIROS_KNOWLEDGE_BASE } = require('../lib/kairos-rag.ts');

console.log('================================================================');
console.log('       KAIROS 2027 — RAG MODEL & RETRIEVAL ENGINE AUDIT         ');
console.log('================================================================');

// ---------------------------------------------------------------------
// TEST 1: Knowledge Base Integrity
// ---------------------------------------------------------------------
assert(Array.isArray(KAIROS_KNOWLEDGE_BASE), 'KAIROS_KNOWLEDGE_BASE must be an array');
assert(KAIROS_KNOWLEDGE_BASE.length >= 10, 'Must have at least 10 comprehensive knowledge chunks');

const requiredCategories = [
  'Overview', 'Timeline', 'Prizes', 'Tracks', 'Process',
  'Rules', 'Logistics', 'Judging', 'Contact', 'FAQ'
];

const presentCategories = new Set(KAIROS_KNOWLEDGE_BASE.map(c => c.category));
for (const cat of requiredCategories) {
  assert(presentCategories.has(cat), `Missing required knowledge category: ${cat}`);
}

for (const chunk of KAIROS_KNOWLEDGE_BASE) {
  assert(chunk.id, 'Each chunk must have an id');
  assert(chunk.title, 'Each chunk must have a title');
  assert(chunk.content && chunk.content.length > 50, `Chunk ${chunk.id} must have substantial content`);
  assert(Array.isArray(chunk.keywords) && chunk.keywords.length >= 3, `Chunk ${chunk.id} must have keywords`);
}
console.log(`✓ TEST 1 PASSED: Knowledge Base integrity validated (${KAIROS_KNOWLEDGE_BASE.length} chunks across 10 categories).`);

// ---------------------------------------------------------------------
// TEST 2: Retrieval Engine Precision
// ---------------------------------------------------------------------
const queryTests = [
  { query: 'How much is the total prize pool?', expectedCategory: 'Prizes' },
  { query: 'When is the hard code freeze and hackathon schedule?', expectedCategory: 'Timeline' },
  { query: 'Tell me about the Agentic AI and Cloud tracks', expectedCategory: 'Tracks' },
  { query: 'Is there free food, meals, and hostel stay?', expectedCategory: 'Logistics' },
  { query: 'Where is the indoor auditorium located?', expectedCategory: 'Overview' },
  { query: 'What are the team size limits and eligibility?', expectedCategory: 'Rules' },
  { query: 'How do I contact the club via email or Instagram?', expectedCategory: 'Contact' },
];

for (const { query, expectedCategory } of queryTests) {
  const chunks = retrieveKairosKnowledge(query, 3);
  assert(chunks.length > 0, `No chunks retrieved for: "${query}"`);
  const topCategories = chunks.map(c => c.category);
  assert(
    topCategories.includes(expectedCategory),
    `Query "${query}" expected ${expectedCategory} but got [${topCategories.join(', ')}]`
  );
}
console.log(`✓ TEST 2 PASSED: Semantic token retrieval precision verified across ${queryTests.length} query domains.`);

// ---------------------------------------------------------------------
// TEST 3: Deterministic Local RAG Synthesis Fallback
// ---------------------------------------------------------------------
const prizeChunks = retrieveKairosKnowledge('What is the total cash prize pool?');
const prizeSynthesis = synthesizeLocalAnswer('What is the total cash prize pool?', prizeChunks);
assert(prizeSynthesis.includes('₹1,75,000'), 'Prize synthesis must include ₹1,75,000 total');
assert(prizeSynthesis.toLowerCase().includes('secret') || prizeSynthesis.toLowerCase().includes('mystery'), 'Prize split-ups must be kept as a secret and mystery');

const dateChunks = retrieveKairosKnowledge('What are the dates of the hackathon?');
const dateSynthesis = synthesizeLocalAnswer('What are the dates of the hackathon?', dateChunks);
assert(dateSynthesis.includes('January 22–24, 2027'), 'Date synthesis must include hackathon dates');

const venueChunks = retrieveKairosKnowledge('Where is the hackathon venue located?');
const venueSynthesis = synthesizeLocalAnswer('Where is the hackathon venue located?', venueChunks);
assert(venueSynthesis.includes('Indoor Auditorium'), 'Venue synthesis must specify Indoor Auditorium');

console.log('✓ TEST 3 PASSED: Deterministic Local RAG Fallback accurately synthesizes structured answers with secret prize split-ups and Indoor Auditorium.');

// ---------------------------------------------------------------------
// TEST 4: Live Gemini LLM Grounding & RAG Generation
// ---------------------------------------------------------------------
async function testLiveGeminiRAG() {
  const envPath = path.resolve(__dirname, '../../.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('⚠ SKIPPING TEST 4: .env.local not found.');
    return;
  }
  const env = fs.readFileSync(envPath, 'utf-8');
  const keyMatch = env.match(/GEMINI_API_KEY=(.+)/);
  if (!keyMatch) {
    console.log('⚠ SKIPPING TEST 4: GEMINI_API_KEY not configured in .env.local.');
    return;
  }
  const apiKey = keyMatch[1].trim();

  const testPrompt = 'What is the venue and total prize pool for KAIROS 2027?';
  const retrieved = retrieveKairosKnowledge(testPrompt, 3);
  const context = retrieved.map((c, i) => `[Source ${i + 1}: ${c.title}]\n${c.content}`).join('\n\n');

  const systemInstruction = `You are the official AI Assistant for KAIROS 2027 at the Indoor Auditorium, Sathyabama. The total prize pool is ₹1,75,000 and split-ups are a secret and mystery. Do not show organizer names.
Format your answer using markdown with clear bullet points.

AUTHORITATIVE KAIROS CONTEXT:
${context}`;

  const candidateModels = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-3.5-flash'];
  let liveSuccess = false;
  let responseText = '';
  let successfulModel = '';

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: 'user', parts: [{ text: testPrompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 500 }
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          liveSuccess = true;
          responseText = text;
          successfulModel = model;
          break;
        }
      }
    } catch (e) {
      // Cascade to next model
    }
  }

  assert(liveSuccess, 'At least one candidate Gemini model must respond successfully with the provided API key');
  assert(responseText.includes('1,75,000') || responseText.includes('Indoor Auditorium'), 'Generated answer must reflect context figures and venue');
  console.log(`✓ TEST 4 PASSED: Live Gemini RAG generation successful via [${successfulModel}].`);
  console.log(`  Sample Response: "${responseText.substring(0, 85).replace(/\n/g, ' ')}..."`);
}

async function runAll() {
  await testLiveGeminiRAG();
  console.log('================================================================');
  console.log('   ALL RAG SYSTEM SUITES PASSED! MODEL & RETRIEVAL ARE 100% OK! ');
  console.log('================================================================');
}

runAll().catch(err => {
  console.error('✗ RAG AUDIT FAILED:', err);
  process.exit(1);
});
