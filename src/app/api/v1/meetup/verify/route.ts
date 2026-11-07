import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

// Strict regex to validate legitimate Meetup profile or event RSVP URLs
const MEETUP_URL_REGEX = /^https?:\/\/(www\.)?meetup\.com\/([a-zA-Z0-9_-]+\/)*(members\/\d+|events\/\d+|[\w.-]+)\/?(\?.*)?$/i;
const MEETUP_HANDLE_REGEX = /^[a-zA-Z0-9_-]{3,35}$/;

export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 30, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const { searchParams } = new URL(req.url);
  const profileUrl = searchParams.get('url') || searchParams.get('profileUrl') || '';

  if (!profileUrl.trim()) {
    return NextResponse.json({ 
      verified: false, 
      error: 'Meetup profile URL or member handle parameter is required.' 
    }, { status: 400 });
  }

  const cleanInput = profileUrl.trim();
  const isValid = MEETUP_URL_REGEX.test(cleanInput) || MEETUP_HANDLE_REGEX.test(cleanInput);

  if (!isValid) {
    return NextResponse.json({
      verified: false,
      error: 'Invalid Meetup profile format. Please provide your legitimate Meetup.com profile URL (e.g., https://meetup.com/members/12345678) or username.'
    }, { status: 400 });
  }

  let cleanHandle = cleanInput;
  if (cleanHandle.includes('meetup.com/members/')) {
    cleanHandle = cleanHandle.split('meetup.com/members/')[1].split('/')[0].split('?')[0];
  } else if (cleanHandle.includes('meetup.com/')) {
    const parts = cleanHandle.split('meetup.com/')[1].split('/')[0].split('?')[0];
    cleanHandle = parts;
  }

  return NextResponse.json({
    verified: true,
    chapter: 'AWS Student Builder Group — SIST Chapter',
    event: 'KAIROS 2027 (Grand Edition)',
    meetupId: cleanHandle || 'member_recorded',
    rsvpStatus: 'AUDIT_PENDING_ON_CAMPUS',
    meetupRsvpPending: true,
    verifiedAt: new Date().toISOString(),
    message: 'Meetup membership identity recorded. Final RSVP validation will be audited against the official chapter roster during badge check-in.'
  });
}

export async function POST(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 20, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const profileUrl = body.meetup_profile_url || body.profileUrl || body.url || '';

    if (!profileUrl.trim()) {
      return NextResponse.json({ 
        verified: false, 
        error: 'Meetup profile URL is required.' 
      }, { status: 400 });
    }

    const cleanInput = profileUrl.trim();
    const isValid = MEETUP_URL_REGEX.test(cleanInput) || MEETUP_HANDLE_REGEX.test(cleanInput);

    if (!isValid) {
      return NextResponse.json({
        verified: false,
        error: 'Invalid Meetup profile format. Please provide your official Meetup.com profile URL (e.g. https://meetup.com/members/12345678).'
      }, { status: 400 });
    }

    let cleanHandle = cleanInput;
    if (cleanHandle.includes('meetup.com/members/')) {
      cleanHandle = cleanHandle.split('meetup.com/members/')[1].split('/')[0].split('?')[0];
    } else if (cleanHandle.includes('meetup.com/')) {
      cleanHandle = cleanHandle.split('meetup.com/')[1].split('/')[0].split('?')[0];
    }

    return NextResponse.json({
      verified: true,
      chapter: 'AWS Student Builder Group — SIST Chapter',
      event: 'KAIROS 2027 (Grand Edition)',
      meetupId: cleanHandle || 'member_recorded',
      rsvpStatus: 'AUDIT_PENDING_ON_CAMPUS',
      meetupRsvpPending: true,
      verifiedAt: new Date().toISOString(),
      message: 'Meetup profile recorded for chapter membership verification at on-campus entry gate.'
    });
  } catch (err: any) {
    return NextResponse.json({ verified: false, error: 'Failed to process verification request.' }, { status: 500 });
  }
}
