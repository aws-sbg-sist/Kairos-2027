import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';
import { SponsorInquiry } from '@/types';
import { safeParseJson } from '@/lib/http';

export async function POST(req: NextRequest) {
  const authCtx = await resolveAuthContext();
  if (authCtx.role === 'ANONYMOUS') {
    return NextResponse.json({ success: false, error: 'Unauthorized. Admin session required.' }, { status: 401 });
  }

  if (!hasPermission(authCtx.role, 'sponsors:manage')) {
    return NextResponse.json({ success: false, error: 'Forbidden: Insufficient privileges to update sponsors.' }, { status: 403 });
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const { id, status } = parsed.data;

    if (!id || !status || typeof id !== 'string') {
      return NextResponse.json({ success: false, error: 'Sponsor ID and status are required.' }, { status: 400 });
    }

    const validStatuses: SponsorInquiry['status'][] = ['new', 'contacted', 'negotiation', 'confirmed', 'archived'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid sponsor status value.' }, { status: 400 });
    }

    const organizerName = authCtx.adminSession?.organizerName || 'Organizer';
    const updated = await db.updateSponsorStatus(id, status, organizerName);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Sponsor inquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sponsor inquiry status updated to ${status}.`,
      sponsor: updated
    });
  } catch (err: any) {
    console.error('[API Admin Sponsor Status Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
