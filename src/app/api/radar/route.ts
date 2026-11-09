import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TeamRadarSignal } from '@/types';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

const VALID_ROLES: TeamRadarSignal['role'][] = [
  'AI / ML Specialist',
  'Fullstack Engineer',
  'Systems & DevOps',
  'Web3 & Security',
  'UI/UX & Frontend'
];

export async function GET(req: NextRequest) {
  try {
    const signals = db.getRadarSignals();
    return NextResponse.json({ success: true, signals });
  } catch (error) {
    console.error('Error fetching radar signals:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch radar signals' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { builderName, role, trackId, skills, college, seeking, contactUrl } = body;

    if (!builderName || !role || !trackId || !seeking || !contactUrl) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required fields (Name, Role, Track, Seeking details, Contact URL).' },
        { status: 400 }
      );
    }

    // Role validation
    const normalizedRole = VALID_ROLES.find(r => r.toLowerCase() === String(role).trim().toLowerCase());
    if (!normalizedRole) {
      return NextResponse.json(
        { success: false, error: `Invalid role selected. Must be one of: ${VALID_ROLES.join(', ')}` },
        { status: 400 }
      );
    }

    // Contact URL security validation (prevent javascript: or bad protocol schemes)
    const cleanContactUrl = String(contactUrl).trim();
    if (!/^https?:\/\//i.test(cleanContactUrl) && !/^mailto:/i.test(cleanContactUrl)) {
      return NextResponse.json(
        { success: false, error: 'Contact URL must begin with https://, http://, or mailto:' },
        { status: 400 }
      );
    }

    // Input length validation
    if (
      String(builderName).length > 100 ||
      String(trackId).length > 50 ||
      String(college || '').length > 150 ||
      String(seeking).length > 1000 ||
      cleanContactUrl.length > 300
    ) {
      return NextResponse.json(
        { success: false, error: 'One or more fields exceed maximum allowed character length.' },
        { status: 400 }
      );
    }

    const cleanSkills = Array.isArray(skills) 
      ? skills.map(s => String(s).trim()).filter(Boolean).slice(0, 10)
      : String(skills || '').split(',').map(s => s.trim()).filter(Boolean).slice(0, 10);

    const newSignal = db.addRadarSignal({
      builderName: String(builderName).trim(),
      role: normalizedRole,
      trackId: String(trackId).trim(),
      skills: cleanSkills.length > 0 ? cleanSkills : ['Builder'],
      college: String(college || 'Sathyabama Institute of Science and Technology').trim(),
      seeking: String(seeking).trim(),
      contactUrl: cleanContactUrl,
    });

    return NextResponse.json({ success: true, signal: newSignal });
  } catch (error) {
    console.error('Error submitting radar signal:', error);
    return NextResponse.json({ success: false, error: 'Failed to broadcast beacon' }, { status: 500 });
  }
}
