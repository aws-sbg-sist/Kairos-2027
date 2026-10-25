import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';
import { WaitlistEntry } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized organizer session' }, { status: 401 });
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

    const success = db.updateWaitlistStatus(id, status, session.organizerName);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Candidate not found in waitlist' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status, updatedBy: session.organizerName });
  } catch (error) {
    console.error('Error updating waitlist candidate status:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
