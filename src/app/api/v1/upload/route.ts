import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { getCurrentAdminSession } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getDbDriver } from '@/lib/db';
import { getSupabaseAdminClient } from '@/lib/supabase';

export const runtime = 'nodejs';

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

const ALLOWED_TYPES: Record<string, { exts: string[]; checkMagic: (buf: Buffer) => boolean }> = {
  'application/pdf': {
    exts: ['pdf'],
    checkMagic: (buf) => buf.length >= 5 && buf.subarray(0, 5).toString('ascii') === '%PDF-',
  },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    exts: ['pptx'],
    checkMagic: (buf) => buf.length >= 2 && buf[0] === 0x50 && buf[1] === 0x4b, // PK zip signature
  },
  'application/vnd.ms-powerpoint': {
    exts: ['ppt'],
    checkMagic: (buf) =>
      buf.length >= 4 &&
      buf[0] === 0xd0 &&
      buf[1] === 0xcf &&
      buf[2] === 0x11 &&
      buf[3] === 0xe0,
  },
};

function resolveExtensionAndValidate(fileName: string, mimeType: string, buf: Buffer): string | null {
  const ext = (fileName.split('.').pop() || '').toLowerCase().trim();
  const normalizedMime = mimeType.toLowerCase().trim();

  if (normalizedMime && ALLOWED_TYPES[normalizedMime]) {
    const spec = ALLOWED_TYPES[normalizedMime];
    if (spec.exts.includes(ext) && spec.checkMagic(buf)) {
      return ext;
    }
  }

  // Fallback by extension + strict magic byte verification (handles browsers with application/octet-stream)
  if (ext === 'pdf' && ALLOWED_TYPES['application/pdf'].checkMagic(buf)) return 'pdf';
  if (ext === 'pptx' && ALLOWED_TYPES['application/vnd.openxmlformats-officedocument.presentationml.presentation'].checkMagic(buf)) return 'pptx';
  if (ext === 'ppt' && ALLOWED_TYPES['application/vnd.ms-powerpoint'].checkMagic(buf)) return 'ppt';

  return null;
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 15, windowMs: 60_000, identifier: 'participant_upload' });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  try {
    const studentSession = await getCurrentStudentSession();
    const adminSession = await getCurrentAdminSession();

    if (!studentSession && !adminSession) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required. Please register or sign in to upload deliverables.',
          code: 'UNAUTHORIZED',
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const artifactTypeRaw = String(formData.get('artifactType') || 'pitch_deck').replace(/[^a-zA-Z0-9_-]/g, '');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'A valid PDF or PPTX deliverable file is required.' },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json({ success: false, error: 'Uploaded file is empty.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: 'File exceeds the 15 MB upload limit. Use an external link for larger decks.' },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const validExt = resolveExtensionAndValidate(file.name, file.type, buffer);
    if (!validExt) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unsupported or corrupted file format. Only valid PDF (.pdf) or PowerPoint (.pptx / .ppt) files are accepted.',
        },
        { status: 400 }
      );
    }

    const actorKey = crypto
      .createHash('sha256')
      .update((studentSession?.email || adminSession?.organizerName || 'organizer').toLowerCase())
      .digest('hex')
      .slice(0, 12);
    const uniqueSuffix = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const safeFilename = `${artifactTypeRaw}-${uniqueSuffix}.${validExt}`;

    const contentTypeMap: Record<string, string> = {
      pdf: 'application/pdf',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ppt: 'application/vnd.ms-powerpoint',
    };

    if (getDbDriver() === 'supabase') {
      const supabase = getSupabaseAdminClient();
      if (!supabase) {
        return NextResponse.json({ success: false, error: 'Cloud storage client unavailable.' }, { status: 503 });
      }

      let targetBucket = 'submissions';
      const { error: bucketCheckErr } = await supabase.storage.getBucket(targetBucket);
      if (bucketCheckErr) {
        const { error: createErr } = await supabase.storage.createBucket(targetBucket, {
          public: true,
          fileSizeLimit: MAX_FILE_SIZE_BYTES,
        });
        if (createErr) {
          targetBucket = 'assets';
        }
      }

      const objectPath = targetBucket === 'assets'
        ? `submissions/${actorKey}/${safeFilename}`
        : `${actorKey}/${safeFilename}`;

      const { error: uploadErr } = await supabase.storage.from(targetBucket).upload(objectPath, buffer, {
        contentType: contentTypeMap[validExt],
        upsert: false,
      });

      if (uploadErr) {
        return NextResponse.json(
          { success: false, error: `Cloud storage upload failed: ${uploadErr.message}` },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage.from(targetBucket).getPublicUrl(objectPath);
      return NextResponse.json(
        {
          success: true,
          url: urlData.publicUrl,
          fileName: file.name,
          sizeBytes: file.size,
          bucket: targetBucket,
          storagePath: objectPath,
        },
        { status: 201 }
      );
    }

    // Local JSON development/test fallback
    const localDir = path.join(process.cwd(), 'public', 'uploads', 'submissions', actorKey);
    fs.mkdirSync(localDir, { recursive: true });
    const fullPath = path.join(localDir, safeFilename);
    fs.writeFileSync(fullPath, buffer);

    return NextResponse.json(
      {
        success: true,
        url: `/uploads/submissions/${actorKey}/${safeFilename}`,
        fileName: file.name,
        sizeBytes: file.size,
        bucket: 'local',
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[API Upload Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process file upload.' },
      { status: 500 }
    );
  }
}
