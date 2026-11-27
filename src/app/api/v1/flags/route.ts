import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const flags = await db.getFeatureFlags();
    return NextResponse.json({ success: true, flags });
  } catch (err) {
    return NextResponse.json({
      success: true,
      flags: {
        registrationOpen: true,
        prizePoolConfirmed: true,
        demoSandboxMode: true,
        announcementBanner: 'NATIONAL APPLICATIONS OPEN NOW • ₹1,75,000 TOTAL PRIZE POOL • SATHYABAMA CHENNAI',
        registrationDeadline: '2027-01-06T23:59:59+05:30',
        leaderboardPublished: true
      }
    });
  }
}
