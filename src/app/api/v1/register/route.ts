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
    const fullName = body.fullName;
    const email = body.email;
    const phone = body.phone || '';
    const college = body.college || body.institution || 'SIST';
    const yearOfStudy = body.yearOfStudy || '3rd Year';
    const department = body.department || 'Computer Science & Engineering';
    const collegeRegNo = body.collegeRegNo || '';
    const city = body.city || 'Chennai';
    const state = body.state || 'Tamil Nadu';
    const githubUrl = body.githubUrl || (body.githubUsername ? `https://github.com/${body.githubUsername.replace(/^@/, '')}` : '');
    const linkedinUrl = body.linkedinUrl || '';
    const preferredTrack = body.preferredTrack || 'Agentic AI & Generative Intelligence';
    const teamStatus = body.teamStatus || 'looking_for_team';
    const teamCode = body.teamCode;
    const meetupProfileUrl = body.meetupProfileUrl || '';
    const awsBuilderCenterUrl = body.awsBuilderCenterUrl || '';
    const experienceLevel = body.experienceLevel || 'Intermediate';
    const tShirtSize = body.tShirtSize || body.tshirtSize || 'L';

    if (!fullName || !email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Full name and email are mandatory fields.' 
      }, { status: 400 });
    }

    // Input length validation
    if (
      String(fullName).length > 150 ||
      String(email).length > 254 ||
      (phone && String(phone).length > 50) ||
      (college && String(college).length > 200) ||
      (githubUrl && String(githubUrl).length > 300) ||
      (linkedinUrl && String(linkedinUrl).length > 300) ||
      (teamCode && String(teamCode).length > 50) ||
      (meetupProfileUrl && String(meetupProfileUrl).length > 300) ||
      (awsBuilderCenterUrl && String(awsBuilderCenterUrl).length > 300)
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
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      institution: String(college).trim(),
      college: String(college).trim(),
      department: String(department).trim(),
      yearOfStudy: String(yearOfStudy).trim(),
      githubUrl: String(githubUrl).trim(),
      linkedinUrl: String(linkedinUrl).trim(),
      preferredTrack: String(preferredTrack).trim(),
      teamStatus: String(teamStatus).trim(),
      teamCode: teamCode ? String(teamCode).trim().toUpperCase() : undefined,
      meetupProfileUrl: String(meetupProfileUrl).trim(),
      awsBuilderCenterUrl: String(awsBuilderCenterUrl).trim(),
      experienceLevel: String(experienceLevel).trim(),
      tShirtSize: String(tShirtSize).trim()
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
