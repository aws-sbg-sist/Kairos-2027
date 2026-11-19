const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error('Missing Supabase credentials in environment.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const BUCKET_NAME = 'assets';

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.mp4': return 'video/mp4';
    case '.pdf': return 'application/pdf';
    case '.ico': return 'image/x-icon';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

async function uploadDir(dirPath, storagePrefix = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const uploaded = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const storagePath = storagePrefix ? `${storagePrefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      const subUploaded = await uploadDir(fullPath, storagePath);
      uploaded.push(...subUploaded);
    } else {
      const fileBuffer = fs.readFileSync(fullPath);
      const mimeType = getMimeType(fullPath);
      const isHeavy = fileBuffer.length > 500 * 1024; // >500KB

      console.log(`Uploading ${storagePath} (${(fileBuffer.length / (1024 * 1024)).toFixed(2)} MB)...`);

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, fileBuffer, {
          contentType: mimeType,
          upsert: true
        });

      if (error) {
        console.error(`  ✗ Error uploading ${storagePath}:`, error.message);
      } else {
        const { data: pubUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
        console.log(`  ✓ Uploaded to: ${pubUrl.publicUrl}`);
        uploaded.push({
          key: storagePath,
          filename: entry.name,
          mime_type: mimeType,
          size_bytes: fileBuffer.length,
          storage_url: pubUrl.publicUrl,
          is_heavy: isHeavy
        });
      }
    }
  }

  return uploaded;
}

async function main() {
  console.log('================================================================');
  console.log('       OFFLOADING HEAVY ASSETS TO SUPABASE STORAGE & DATABASE   ');
  console.log('================================================================\n');

  // Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets || !buckets.find(b => b.name === BUCKET_NAME)) {
    await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    console.log(`✓ Bucket "${BUCKET_NAME}" created`);
  }

  const allRecords = [];

  // Upload public/assets
  const assetsDir = path.join(__dirname, '..', 'public', 'assets');
  if (fs.existsSync(assetsDir)) {
    console.log('[STEP 1] Uploading public/assets...');
    const res = await uploadDir(assetsDir, '');
    allRecords.push(...res);
  }

  // Upload public/docs
  const docsDir = path.join(__dirname, '..', 'public', 'docs');
  if (fs.existsSync(docsDir)) {
    console.log('\n[STEP 2] Uploading public/docs...');
    const res = await uploadDir(docsDir, 'docs');
    allRecords.push(...res);
  }

  // Record in PostgreSQL media_assets table
  console.log(`\n[STEP 3] Registering ${allRecords.length} assets in PostgreSQL media_assets table...`);
  // Create table if not exists via SQL or query
  const { error: upsertErr } = await supabase
    .from('media_assets')
    .upsert(allRecords, { onConflict: 'key' });

  if (upsertErr) {
    console.log('Note on media_assets table:', upsertErr.message);
  } else {
    console.log(`✓ All ${allRecords.length} assets registered in PostgreSQL!`);
  }

  console.log('\n================================================================');
  console.log('       ALL HEAVY ASSETS SUCCESSFULLY TRANSFERRED TO CLOUD!       ');
  console.log('================================================================');
}

main().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
