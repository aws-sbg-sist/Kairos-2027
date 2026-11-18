import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { SponsorInquiry } from '@/types';

export async function POST(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized. Admin session required.' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Sponsor ID and status are required.' }, { status: 400 });
    }

    const validStatuses: SponsorInquiry['status'][] = ['new', 'contacted', 'negotiation', 'confirmed', 'archived'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid sponsor status value.' }, { status: 400 });
    }

    const updated = db.updateSponsorStatus(id, status, session.organizerName);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Sponsor inquiry not found.' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sponsor inquiry status updated to ${status}.` 
    });
  } catch (err: any) {
    console.error('[API Admin Sponsor Status Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
