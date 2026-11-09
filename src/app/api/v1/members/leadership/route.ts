import { NextRequest, NextResponse } from 'next/server';
import { HIGHER_MANAGEMENT } from '@/lib/config';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 60, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const session = await getCurrentAdminSession();
  const higherManagementMembers = db.getMembers().filter(m => m.isHigherManagement);

  const sanitizedRoster = session
    ? higherManagementMembers
    : higherManagementMembers.map(m => {
        const { registerNo, ...sanitized } = m;
        return sanitized;
      });

  const sanitizedLeadership = session
    ? HIGHER_MANAGEMENT
    : {
        ...HIGHER_MANAGEMENT,
        apexLeader: {
          ...HIGHER_MANAGEMENT.apexLeader,
          registerNo: undefined,
          contact: {
            ...HIGHER_MANAGEMENT.apexLeader.contact,
            phone: undefined
          }
        },
        superHeads: HIGHER_MANAGEMENT.superHeads.map(sh => ({
          ...sh,
          registerNo: undefined
        }))
      };

  return NextResponse.json({
    success: true,
    batch: HIGHER_MANAGEMENT.batchTitle,
    leadership: sanitizedLeadership,
    roster: sanitizedRoster
  });
}
