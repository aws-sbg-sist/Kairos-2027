import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const flags = await db.getFeatureFlags();
    return NextResponse.json({ success: true, flags });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve system flags' },
      { status: 500 }
    );
  }
}
