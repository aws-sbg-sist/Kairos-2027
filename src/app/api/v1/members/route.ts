import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 60, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const { searchParams } = new URL(req.url);
  const tier = searchParams.get('tier') || undefined;
  const division = searchParams.get('division') || undefined;
  const search = searchParams.get('search') || undefined;
  const batch = searchParams.get('batch') || undefined;

  const session = await getCurrentAdminSession();
  const members = await db.getMembers({ tier, division, search, batch });

  // Protect student PII: strip registerNo unless requested by an authenticated admin
  const sanitizedMembers = session
    ? members
    : members.map(m => {
        const { registerNo, ...sanitized } = m;
        return sanitized;
      });

  return NextResponse.json({
    success: true,
    totalCadre: 106,
    returnedCount: sanitizedMembers.length,
    members: sanitizedMembers
  });
}
