import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  // Rate limit: 10 registrations per minute per IP
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { 
      fullName, 
      email, 
      phone, 
      college, 
      yearOfStudy, 
      githubUrl, 
      linkedinUrl, 
      preferredTrack, 
      teamStatus, 
      teamCode, 
      meetupProfileUrl, 
      awsBuilderCenterUrl,
      experienceLevel,
      tShirtSize 
    } = body;

    if (!fullName || !email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Full name and email are mandatory fields.' 
      }, { status: 400 });
    }

    // Input length validation
    if (
      fullName.length > 150 ||
      email.length > 254 ||
      (phone && phone.length > 50) ||
      (college && college.length > 200) ||
      (githubUrl && githubUrl.length > 300) ||
      (linkedinUrl && linkedinUrl.length > 300) ||
      (teamCode && teamCode.length > 50) ||
      (meetupProfileUrl && meetupProfileUrl.length > 300) ||
      (awsBuilderCenterUrl && awsBuilderCenterUrl.length > 300)
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more fields exceed maximum allowed character length.'
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    const result = db.addWaitlistEntry({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      institution: college?.trim() || 'SIST',
      college: college?.trim() || 'SIST',
      department: 'Computer Science & Engineering',
      yearOfStudy: yearOfStudy || '3rd Year',
      githubUrl: githubUrl?.trim() || '',
      linkedinUrl: linkedinUrl?.trim() || '',
      preferredTrack: preferredTrack || 'Agentic AI & Generative Intelligence',
      teamStatus: teamStatus || 'looking_for_team',
      teamCode: teamCode?.trim().toUpperCase(),
      meetupProfileUrl: meetupProfileUrl?.trim() || '',
      awsBuilderCenterUrl: awsBuilderCenterUrl?.trim() || '',
      experienceLevel: experienceLevel || 'Intermediate',
      tShirtSize: tShirtSize || 'L'
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Registration failed' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Registration recorded successfully! 100% Free — Zero Entry Fee.',
      registrationId: result.entry?.id,
      entry: result.entry
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Register Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record registration.' }, { status: 500 });
  }
}
