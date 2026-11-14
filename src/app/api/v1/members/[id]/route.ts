import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const rateLimitResult = checkRateLimit(req, { limit: 60, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Member ID or username is required.' }, { status: 400 });
  }

  let member = await db.getMemberByUsername(id);
  if (!member) {
    const all = await db.getMembers();
    member = all.find(m => m.id === id);
  }

  if (!member) {
    return NextResponse.json({ success: false, error: 'Member not found in organizing cadre.' }, { status: 404 });
  }

  const session = await getCurrentAdminSession();
  const sanitizedMember = session
    ? member
    : (({ registerNo, ...rest }) => rest)(member);

  return NextResponse.json({ success: true, member: sanitizedMember });
}
