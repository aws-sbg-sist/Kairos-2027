import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function GET(req: NextRequest) {
  // Rate limiting to prevent hammering
  const rateLimitResult = checkRateLimit(req, { limit: 60, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const { searchParams } = new URL(req.url);
    const track = searchParams.get('track') || undefined;

    const result = db.getLeaderboardStandings(track);

    const response = NextResponse.json({
      success: true,
      published: result.published,
      message: result.message,
      track: track || 'all',
      totalRanked: result.standings.length,
      standings: result.standings,
      timestamp: new Date().toISOString()
    });

    // Ensure real-time accuracy without stale browser caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (err: any) {
    console.error('[API Leaderboard GET Error]:', err);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to compute live tournament leaderboard standings.' 
    }, { status: 500 });
  }
}
