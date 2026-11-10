import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

function safePinEquals(inputPin: string, targetPin: string): boolean {
  const a = Buffer.from(inputPin.trim(), 'utf8');
  const b = Buffer.from(targetPin.trim(), 'utf8');
  if (a.length === 0 || a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const rawPin = typeof body?.pin === 'string' ? body.pin.trim() : '';

    if (!rawPin || rawPin.length > 20) {
      return NextResponse.json(
        { success: false, error: 'A valid evaluator Access PIN is required.' },
        { status: 400 }
      );
    }

    const activeJudges = db.getJudges().filter((j) => j.isActive);
    const matched = activeJudges.find((j) => safePinEquals(rawPin, j.accessPin));

    if (!matched) {
      db.addAuditLog('Judging Console', 'AUTH_FAILURE', 'Invalid evaluator Access PIN attempt.');
      return NextResponse.json(
        { success: false, error: 'Invalid evaluator Access PIN. Check your Judge Welcome Kit.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      judge: {
        id: matched.id,
        name: matched.fullName,
        organization: matched.organization,
        designation: matched.designation,
        assignedHall: matched.assignedHall || 'Main Judging Bay',
        trackSpecialization: matched.trackSpecialization,
      },
    });
  } catch (err) {
    console.error('[API Judging Auth Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Evaluator authentication failed.' },
      { status: 500 }
    );
  }
}

