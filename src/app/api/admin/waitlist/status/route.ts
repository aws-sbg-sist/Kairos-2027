import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';
import { WaitlistEntry } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Organizer session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'waitlist:update_status')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Organizer permissions required to update candidate status.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Missing entry ID or status' }, { status: 400 });
    }

    const validStatuses: Array<NonNullable<WaitlistEntry['status']>> = ['pending', 'reviewed', 'shortlisted', 'waitlisted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid candidate status' }, { status: 400 });
    }

    const updaterName = authCtx.adminSession?.organizerName || 'Organizer';
    const success = await db.updateWaitlistStatus(id, status, updaterName);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Candidate not found in waitlist' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status, updatedBy: updaterName });
  } catch (error) {
    console.error('Error updating waitlist candidate status:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
