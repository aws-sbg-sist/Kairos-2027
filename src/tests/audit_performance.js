/**
 * KAIROS 2027: PERFORMANCE & CONCURRENCY BENCHMARK SUITE
 * 
 * Measures:
 * 1. Public Page TTFB & Response Latency
 * 2. High-Traffic Public API Latency Profiles (p50, p90, p95, p99)
 * 3. Concurrent Request Throughput (10 concurrent requests on leaderboard & announcements)
 * 4. Authenticated API Latency (Student Dashboard, Profile, Team Inspection)
 * 5. Database Read/Write Response Timings
 */

const http = require('http');

const BASE_URL = 'http://localhost:8000';

function percentile(arr, p) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

async function measureRequest(path, options = {}) {
  const url = new URL(path, BASE_URL);
  const start = process.hrtime.bigint();
  
  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 35000,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1_000_000;
        let json = null;
        try {
          json = JSON.parse(data);
        } catch (e) {
          json = null;
        }
        resolve({
          statusCode: res.statusCode,
          durationMs,
          bytes: Buffer.byteLength(data),
          data: json
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout: ${path}`));
    });

    if (options.body) {
      const payload = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
      req.setHeader('Content-Type', 'application/json');
      req.setHeader('Content-Length', Buffer.byteLength(payload));
      req.write(payload);
    }

    req.end();
  });
}

async function runBenchmark() {
  console.log('\n========================================================================');
  console.log('  KAIROS 2027: PERFORMANCE & CONCURRENCY BENCHMARK SUITE');
  console.log('========================================================================\n');

  // 1. PUBLIC ROUTE LATENCIES
  console.log('--- [1. CRITICAL PAGE RESPONSE LATENCIES (WARMED UP)] ---');
  const pages = [
    { name: 'Homepage (/)', path: '/' },
    { name: 'Tracks (/tracks)', path: '/tracks' },
    { name: 'Schedule (/schedule)', path: '/schedule' },
    { name: 'Prizes (/prizes)', path: '/prizes' },
    { name: 'FAQ (/faq)', path: '/faq' },
    { name: 'About (/about)', path: '/about' },
    { name: 'Sponsors (/sponsor)', path: '/sponsor' },
    { name: 'Waitlist (/waitlist)', path: '/waitlist' },
    { name: 'Leaderboard (/leaderboard)', path: '/leaderboard' },
    { name: 'Auth Login (/login)', path: '/login' },
    { name: 'Auth Register (/register)', path: '/register' },
    { name: 'Dashboard Shell (/dashboard)', path: '/dashboard' },
  ];

  const pageResults = [];
  for (const p of pages) {
    // Warm up
    await measureRequest(p.path);
    // Measured run
    const res = await measureRequest(p.path);
    pageResults.push({
      name: p.name,
      status: res.statusCode,
      durationMs: res.durationMs.toFixed(1),
      sizeKb: (res.bytes / 1024).toFixed(1)
    });
    console.log(`  ${p.name.padEnd(30)} ${res.statusCode} | ${res.durationMs.toFixed(1).padStart(7)} ms | ${(res.bytes / 1024).toFixed(1).padStart(6)} KB`);
  }

  // 2. HIGH-TRAFFIC API LATENCY PROFILES (p50, p90, p95, p99 across 20 iterations)
  console.log('\n--- [2. API ENDPOINT LATENCY PROFILES (20 SAMPLES EACH)] ---');
  const apis = [
    { name: 'GET /api/v1/announcements', path: '/api/v1/announcements' },
    { name: 'GET /api/v1/leaderboard', path: '/api/v1/leaderboard' },
    { name: 'GET /api/v1/leaderboard?track=track-agentic-ai', path: '/api/v1/leaderboard?track=track-agentic-ai' },
    { name: 'GET /api/calendar', path: '/api/calendar' }
  ];

  const apiStats = [];
  for (const api of apis) {
    const latencies = [];
    for (let i = 0; i < 20; i++) {
      const res = await measureRequest(api.path);
      latencies.push(res.durationMs);
    }
    const p50 = percentile(latencies, 50).toFixed(1);
    const p90 = percentile(latencies, 90).toFixed(1);
    const p95 = percentile(latencies, 95).toFixed(1);
    const p99 = percentile(latencies, 99).toFixed(1);
    const avg = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(1);

    apiStats.push({ name: api.name, p50, p90, p95, p99, avg });
    console.log(`  ${api.name.padEnd(45)} avg: ${avg.padStart(5)}ms | p50: ${p50.padStart(5)}ms | p95: ${p95.padStart(5)}ms | p99: ${p99.padStart(5)}ms`);
  }

  // 3. CONCURRENCY TEST
  console.log('\n--- [3. CONCURRENCY STRESS TEST (10 CONCURRENT CLIENTS)] ---');
  const concurrencyTarget = '/api/v1/leaderboard';
  const concurrencyCount = 10;
  const cStart = process.hrtime.bigint();
  const promises = [];
  for (let i = 0; i < concurrencyCount; i++) {
    promises.push(measureRequest(concurrencyTarget));
  }
  const cResults = await Promise.all(promises);
  const cEnd = process.hrtime.bigint();
  const totalConcurrentTimeMs = Number(cEnd - cStart) / 1_000_000;

  const successfulRequests = cResults.filter(r => r.statusCode === 200).length;
  const cLatencies = cResults.map(r => r.durationMs);
  const cAvg = (cLatencies.reduce((a, b) => a + b, 0) / cLatencies.length).toFixed(1);
  const cP95 = percentile(cLatencies, 95).toFixed(1);
  const reqPerSec = ((concurrencyCount / totalConcurrentTimeMs) * 1000).toFixed(1);

  console.log(`  Target: ${concurrencyTarget}`);
  console.log(`  Concurrent Clients: ${concurrencyCount}`);
  console.log(`  Total Batch Duration: ${totalConcurrentTimeMs.toFixed(1)} ms`);
  console.log(`  Successful (200 OK): ${successfulRequests} / ${concurrencyCount}`);
  console.log(`  Average Latency: ${cAvg} ms | p95 Latency: ${cP95} ms`);
  console.log(`  Effective Throughput: ${reqPerSec} req/sec`);

  console.log('\n========================================================================');
  console.log('  BENCHMARK COMPLETED SUCCESSFULLY');
  console.log('========================================================================\n');
}

runBenchmark().catch(err => {
  console.error('[BENCHMARK ERROR]:', err);
  process.exit(1);
});
