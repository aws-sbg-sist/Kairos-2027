import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { sendTransactionalEmail, buildRegistrationConfirmationEmail } from '@/lib/email';
import { isValidHttpUrl, safeParseJson } from '@/lib/http';

export async function POST(req: NextRequest) {
  // Rate limit: 10 registrations per minute per IP
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  // 1. Enforce Registration Open / Closed & Deadline Feature Flags
  const flags = await db.getFeatureFlags();
  if (!flags.registrationOpen) {
    return NextResponse.json({
      success: false,
      error: 'Registration is currently closed by the organizing committee.',
      code: 'REGISTRATION_CLOSED'
    }, { status: 403 });
  }

  if (flags.registrationDeadline) {
    const deadline = new Date(flags.registrationDeadline).getTime();
    if (!isNaN(deadline) && Date.now() > deadline) {
      return NextResponse.json({
        success: false,
        error: 'The registration deadline has passed. Early-interest registrations are closed.',
        code: 'REGISTRATION_DEADLINE_EXCEEDED'
      }, { status: 403 });
    }
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const body = parsed.data;
    const { 
      fullName, 
      email, 
      phone, 
      college, 
      institution,
      collegeRegNo,
      department,
      yearOfStudy, 
      githubUrl,
      githubUsername,
      linkedinUrl, 
      preferredTrack, 
      teamStatus, 
      teamCode, 
      meetupProfileUrl,
      meetupVerified,
      awsBuilderCenterUrl,
      experienceLevel,
      tShirtSize 
    } = body;

    if (!fullName || !email || typeof fullName !== 'string' || typeof email !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'Full name and email are mandatory fields.' 
      }, { status: 400 });
    }

    const normEmail = email.trim().toLowerCase();
    const instName = (typeof institution === 'string' && institution.trim()) || (typeof college === 'string' && college.trim()) || 'SIST';
    const resolvedGithubUrl = (typeof githubUrl === 'string' && githubUrl.trim())
      ? githubUrl.trim()
      : (typeof githubUsername === 'string' && githubUsername.trim()
          ? (githubUsername.trim().startsWith('http') ? githubUsername.trim() : `https://github.com/${githubUsername.trim().replace(/^@/, '')}`)
          : '');

    // Input length & URL validation
    if (
      fullName.length > 150 ||
      email.length > 254 ||
      (phone && String(phone).length > 50) ||
      (collegeRegNo && String(collegeRegNo).length > 50) ||
      instName.length > 200 ||
      resolvedGithubUrl.length > 300 ||
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

    if (
      (resolvedGithubUrl && !isValidHttpUrl(resolvedGithubUrl)) ||
      (linkedinUrl && !isValidHttpUrl(String(linkedinUrl))) ||
      (meetupProfileUrl && !isValidHttpUrl(String(meetupProfileUrl))) ||
      (awsBuilderCenterUrl && !isValidHttpUrl(String(awsBuilderCenterUrl)))
    ) {
      return NextResponse.json({
        success: false,
        error: 'One or more profile links must be valid http:// or https:// URLs.'
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normEmail)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    // 2. Prevent Duplicate Registration
    const existingWaitlist = await db.getStudentWaitlist(normEmail);
    if (existingWaitlist) {
      return NextResponse.json({
        success: false,
        error: 'This email is already registered on the KAIROS 2027 waitlist & registration list.',
        code: 'EMAIL_ALREADY_REGISTERED'
      }, { status: 409 });
    }

    // 3. Record Waitlist Entry & Sync Unified Profile (upsertProfile runs atomically inside addWaitlistEntry)
    const result = await db.addWaitlistEntry({
      fullName: fullName.trim(),
      email: normEmail,
      phone: phone ? String(phone).trim() : '',
      institution: instName,
      college: instName,
      collegeRegNo: collegeRegNo ? String(collegeRegNo).trim() : undefined,
      department: (typeof department === 'string' && department.trim()) || 'Computer Science & Engineering',
      yearOfStudy: (typeof yearOfStudy === 'string' && yearOfStudy.trim()) || '3rd Year',
      githubUrl: resolvedGithubUrl,
      linkedinUrl: linkedinUrl ? String(linkedinUrl).trim() : '',
      preferredTrack: (typeof preferredTrack === 'string' && preferredTrack.trim()) || 'Agentic AI & Generative Intelligence',
      teamStatus: (typeof teamStatus === 'string' && teamStatus.trim()) || 'looking_for_team',
      teamCode: teamCode ? String(teamCode).trim().toUpperCase() : undefined,
      meetupProfileUrl: meetupProfileUrl ? String(meetupProfileUrl).trim() : '',
      meetupRsvpVerified: Boolean(meetupVerified ?? Boolean(meetupProfileUrl)),
      awsBuilderCenterUrl: awsBuilderCenterUrl ? String(awsBuilderCenterUrl).trim() : '',
      experienceLevel: (typeof experienceLevel === 'string' && experienceLevel.trim()) || 'Intermediate',
      tShirtSize: (typeof tShirtSize === 'string' && tShirtSize.trim()) || 'L',
      status: 'pending'
    } as any);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Registration failed',
        code: 'REGISTRATION_FAILED'
      }, { status: 409 });
    }

    // Non-blocking confirmation notification dispatch
    try {
      sendTransactionalEmail(buildRegistrationConfirmationEmail({
        to: normEmail,
        fullName: fullName.trim(),
        track: preferredTrack || 'Agentic AI & Generative Intelligence',
        registrationId: result.entry?.id
      })).catch(err => console.warn('[Register Notification Warning]:', err));
    } catch (e) {
      console.warn('[Register Notification Warning]:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Registration recorded successfully! Details will be updated to your team dashboard.',
      registrationId: result.entry?.id,
      entry: result.entry
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Register Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record registration.' }, { status: 500 });
  }
}
