import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { sendTransactionalEmail, buildRegistrationConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  // Rate limit: 10 registrations per minute per IP
  const rateLimitResult = checkRateLimit(req, { limit: 10, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  // 1. Enforce Registration Open / Closed & Deadline Feature Flags
  const flags = db.getFeatureFlags();
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

  try {
    const body = await req.json();
    const { 
      fullName, 
      email, 
      phone, 
      college, 
      institution,
      department,
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

    const normEmail = email.trim().toLowerCase();
    const instName = institution?.trim() || college?.trim() || 'SIST';

    // Input length validation
    if (
      fullName.length > 150 ||
      email.length > 254 ||
      (phone && phone.length > 50) ||
      (instName && instName.length > 200) ||
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
    if (!emailRegex.test(normEmail)) {
      return NextResponse.json({ success: false, error: 'Invalid email address.' }, { status: 400 });
    }

    // 2. Prevent Duplicate Registration
    const existingWaitlist = db.getStudentWaitlist(normEmail);
    if (existingWaitlist) {
      return NextResponse.json({
        success: false,
        error: 'This email is already registered on the KAIROS 2027 priority waitlist.',
        code: 'EMAIL_ALREADY_REGISTERED'
      }, { status: 409 });
    }

    // 3. Persistent Student Profile Synchronization
    const session = await getCurrentStudentSession();
    if (session && session.email.toLowerCase() === normEmail) {
      db.updateStudentProfile(session.studentId, {
        fullName: fullName.trim(),
        phone: phone?.trim(),
        institution: instName,
        department: department || 'School of Computing',
        yearOfStudy: yearOfStudy || '3rd Year',
        githubUrl: githubUrl?.trim(),
        linkedinUrl: linkedinUrl?.trim(),
        tshirtSize: tShirtSize || 'L'
      });
    } else {
      const existingStudent = db.getStudentByEmail(normEmail);
      if (existingStudent) {
        db.updateStudentProfile(existingStudent.id, {
          fullName: fullName.trim(),
          phone: phone?.trim(),
          institution: instName,
          department: department || 'School of Computing',
          yearOfStudy: yearOfStudy || '3rd Year',
          githubUrl: githubUrl?.trim(),
          linkedinUrl: linkedinUrl?.trim(),
          tshirtSize: tShirtSize || 'L'
        });
      }
    }

    // 4. Record Waitlist Entry with Correct Status Tracking
    const result = db.addWaitlistEntry({
      fullName: fullName.trim(),
      email: normEmail,
      phone: phone?.trim() || '',
      institution: instName,
      college: instName,
      department: department || 'Computer Science & Engineering',
      yearOfStudy: yearOfStudy || '3rd Year',
      githubUrl: githubUrl?.trim() || '',
      linkedinUrl: linkedinUrl?.trim() || '',
      preferredTrack: preferredTrack || 'Agentic AI & Generative Intelligence',
      teamStatus: teamStatus || 'looking_for_team',
      teamCode: teamCode?.trim().toUpperCase(),
      meetupProfileUrl: meetupProfileUrl?.trim() || '',
      awsBuilderCenterUrl: awsBuilderCenterUrl?.trim() || '',
      experienceLevel: experienceLevel || 'Intermediate',
      tShirtSize: tShirtSize || 'L',
      status: 'pending'
    });

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
      message: 'Registration recorded successfully! 100% Free — Zero Entry Fee.',
      registrationId: result.entry?.id,
      entry: result.entry
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Register Error]:', err);
    return NextResponse.json({ success: false, error: 'Failed to record registration.' }, { status: 500 });
  }
}
