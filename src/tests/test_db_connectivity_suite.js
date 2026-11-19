const { createClient } = require('@supabase/supabase-js');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse .env.local manually to ensure exact variables
const envPath = path.join(__dirname, '..', '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

async function runConnectivityAssurance() {
  console.log('================================================================');
  console.log('       KAIROS 2027 — SUPABASE POSTGRESQL CONNECTIVITY ASSURANCE ');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, testName, details = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`  ✓ [PASS] ${testName}${details ? ' (' + details + ')' : ''}`);
      return true;
    } else {
      console.log(`  ✗ [FAIL] ${testName}${details ? ' - ' + details : ''}`);
      return false;
    }
  }

  // --------------------------------------------------------------------------
  // TEST SECTION 1: ENVIRONMENT & DRIVER INTEGRITY
  // --------------------------------------------------------------------------
  console.log('[PHASE 1] Validating Database Environment Variables & Driver...');
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  const driver = process.env.KAIROS_DB_DRIVER || process.env.DB_DRIVER;

  assert(Boolean(supabaseUrl && supabaseUrl.startsWith('https://')), 'Supabase URL Configured', supabaseUrl);
  assert(Boolean(secretKey && secretKey.startsWith('sb_secret_')), 'Privileged Service Role / Secret Key Configured', 'Key prefix: ' + (secretKey ? secretKey.substring(0, 12) + '...' : 'none'));
  assert(Boolean(anonKey && (anonKey.startsWith('sb_publishable_') || anonKey.startsWith('ey'))), 'Publishable / Anon Key Configured', 'Key prefix: ' + (anonKey ? anonKey.substring(0, 15) + '...' : 'none'));
  assert(driver === 'supabase', 'Database Driver Configured to Supabase', `KAIROS_DB_DRIVER=${driver}`);

  // --------------------------------------------------------------------------
  // TEST SECTION 2: DIRECT TCP/IP POSTGRESQL ENGINE HANDSHAKE
  // --------------------------------------------------------------------------
  console.log('\n[PHASE 2] Direct PostgreSQL Protocol Handshake (Port 5432)...');
  try {
    const pyOutput = execSync(`uv run --with psycopg[binary] python -c "import psycopg; conn=psycopg.connect('postgresql://postgres:${process.env.SUPABASE_DB_PASSWORD || 'sistawscc2027'}@db.nwdpzcaxmfvcobnfwdwa.supabase.co:5432/postgres', connect_timeout=5); cur=conn.cursor(); cur.execute('SELECT version(), current_database(), current_user, inet_server_addr();'); ver,db,usr,ip=cur.fetchone(); cur.execute('SELECT count(*) FROM pg_stat_activity;'); conns=cur.fetchone()[0]; print(','.join([str(db), str(usr), str(ip), str(conns), str(ver)[:35]]))"`, { encoding: 'utf8' }).trim();

    const [dbName, dbUser, dbIp, activeConns, pgVer] = pyOutput.split(',');
    assert(dbName === 'postgres', 'Connected to Database', `DB: ${dbName}, User: ${dbUser}`);
    assert(Boolean(dbIp && dbIp.includes(':')), 'Server IP Resolved & Verified', `Direct IPv6: ${dbIp}`);
    assert(Boolean(activeConns && Number(activeConns) > 0), 'Active Database Connection Pool Verified', `Active connections: ${activeConns}`);
    assert(Boolean(pgVer && pgVer.includes('PostgreSQL')), 'PostgreSQL Engine Version Verified', pgVer);
  } catch (err) {
    assert(false, 'Direct PostgreSQL Handshake', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST SECTION 3: SUPABASE POSTGREST CLIENT API QUERY
  // --------------------------------------------------------------------------
  console.log('\n[PHASE 3] Supabase PostgREST Layer Query Verification...');
  const supabase = createClient(supabaseUrl, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const startTime = Date.now();
  const tables = [
    { name: 'feature_flags', minCount: 1 },
    { name: 'org_members', minCount: 9 },
    { name: 'judges', minCount: 3 },
    { name: 'profiles', minCount: 50 },
    { name: 'teams', minCount: 40 },
    { name: 'team_members', minCount: 50 },
    { name: 'waitlist', minCount: 50 },
    { name: 'sponsors', minCount: 1 },
    { name: 'referrals', minCount: 1 },
    { name: 'radar_signals', minCount: 4 },
    { name: 'evaluations', minCount: 5 },
    { name: 'csat_responses', minCount: 1 },
    { name: 'audit_logs', minCount: 100 },
    { name: 'notification_logs', minCount: 100 }
  ];

  for (const t of tables) {
    const { count, error } = await supabase.from(t.name).select('*', { count: 'exact', head: true });
    assert(!error && count >= t.minCount, `Table: ${t.name}`, `Records: ${count}`);
  }
  const latency = Date.now() - startTime;
  console.log(`  ℹ Total 14 Table Scan Latency: ${latency}ms (avg ${(latency / tables.length).toFixed(1)}ms per table)`);

  // --------------------------------------------------------------------------
  // TEST SECTION 4: FULL CRUD (CREATE, READ, UPDATE, DELETE) CANARY CYCLE
  // --------------------------------------------------------------------------
  console.log('\n[PHASE 4] Executing Live CRUD Transaction Cycle (Audit Log Canary)...');
  const canaryId = `canary-verify-${Date.now()}`;
  const initialPayload = {
    id: canaryId,
    timestamp: new Date().toISOString(),
    organizer_name: 'Connectivity Assurance Test',
    action: 'CONNECTIVITY_CANARY_CHECK',
    details: 'Verifying atomic insert capability to Supabase PostgreSQL'
  };

  // 1. CREATE
  const { error: insertErr } = await supabase.from('audit_logs').insert(initialPayload);
  assert(!insertErr, 'CRUD 1/4: Insert Canary Record', insertErr ? insertErr.message : `ID: ${canaryId}`);

  // 2. READ
  const { data: readData, error: readErr } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('id', canaryId)
    .single();
  assert(!readErr && readData && readData.action === initialPayload.action, 'CRUD 2/4: Read Canary Record', `Action: ${readData ? readData.action : 'null'}`);

  // 3. UPDATE
  const updatedDetails = 'Canary update verified at ' + new Date().toISOString();
  const { error: updateErr } = await supabase
    .from('audit_logs')
    .update({ details: updatedDetails })
    .eq('id', canaryId);
  const { data: verifyUpdate } = await supabase
    .from('audit_logs')
    .select('details')
    .eq('id', canaryId)
    .single();
  assert(!updateErr && verifyUpdate && verifyUpdate.details === updatedDetails, 'CRUD 3/4: Update Canary Record', 'Details updated atomically');

  // 4. DELETE
  const { error: deleteErr } = await supabase
    .from('audit_logs')
    .delete()
    .eq('id', canaryId);
  const { data: postDeleteData } = await supabase
    .from('audit_logs')
    .select('id')
    .eq('id', canaryId);
  assert(!deleteErr && (!postDeleteData || postDeleteData.length === 0), 'CRUD 4/4: Delete Canary Record', 'Zero residual artifacts remaining');

  // --------------------------------------------------------------------------
  // TEST SECTION 5: LOCAL APPLICATION HEALTH ENDPOINT
  // --------------------------------------------------------------------------
  console.log('\n[PHASE 5] Local Application Next.js Health Endpoint Verification...');
  try {
    const healthData = await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:8000/api/health', { timeout: 5000 }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
          } catch (e) {
            resolve({ statusCode: res.statusCode, body });
          }
        });
      });
      req.on('error', reject);
    });

    assert(healthData.statusCode === 200, 'Health Endpoint HTTP Status 200', `Status: ${healthData.statusCode}`);
    assert(healthData.body.status === 'healthy', 'Health Service Status Healthy', `Service: ${healthData.body.status}`);
    assert(healthData.body.database === 'connected', 'Database Connectivity Status Connected', `Database: ${healthData.body.database}`);
  } catch (err) {
    assert(false, 'Local Application Health Check', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST SECTION 6: PUBLIC CLOUDFLARE TUNNEL ENDPOINT
  // --------------------------------------------------------------------------
  console.log('\n[PHASE 6] Public Cloudflare Tunnel Health Verification...');
  try {
    const tunnelData = await new Promise((resolve, reject) => {
      const req = https.get('https://stability-far-shopzilla-load.trycloudflare.com/api/health', { timeout: 8000 }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
          } catch (e) {
            resolve({ statusCode: res.statusCode, body });
          }
        });
      });
      req.on('error', reject);
    });

    assert(tunnelData.statusCode === 200, 'Public Tunnel HTTP Status 200', `Status: ${tunnelData.statusCode}`);
    assert(tunnelData.body.database === 'connected', 'Public Tunnel Database Connected', `DB: ${tunnelData.body.database}`);
  } catch (err) {
    assert(false, 'Public Cloudflare Tunnel Health Check', err.message);
  }

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`   CONNECTIVITY VERIFICATION: ${passed}/${total} TESTS PASSED (${((passed / total) * 100).toFixed(1)}%)`);
  if (passed === total) {
    console.log('   STATUS: [DATABASE CONNECTIVITY 100% OPERATIONAL & VERIFIED]');
  } else {
    console.log('   STATUS: [WARNING: SOME CONNECTIVITY CHECKS FAILED]');
  }
  console.log('================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runConnectivityAssurance().catch(err => {
  console.error('Fatal Connectivity Test Error:', err);
  process.exit(1);
});
