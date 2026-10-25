import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentAdminSession } from '@/lib/auth';

export async function GET() {
  const flags = db.getFeatureFlags();
  return NextResponse.json({ success: true, flags });
}

export async function POST(req: NextRequest) {
  const session = await getCurrentAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updates = await req.json();
    const newFlags = db.setFeatureFlags(updates, session.organizerName);
    return NextResponse.json({ success: true, flags: newFlags });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Failed to update feature flags' }, { status: 500 });
  }
}
