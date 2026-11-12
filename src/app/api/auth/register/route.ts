import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import { sendTransactionalEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  // Rate limit: 5 registration requests per minute per IP
  const rateLimit = checkRateLimit(req, { limit: 5, windowMs: 60_000 });
  if (!rateLimit.allowed) {
    return createRateLimitResponse(rateLimit.resetAt, rateLimit.limit);
  }

  try {
    const body = await req.json();
    const { email, password, fullName, institution, phone, department, yearOfStudy, tshirtSize } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: 'Full name, email address, and a secure password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const result = db.registerStudent({
      email,
      password,
      fullName,
      institution: institution || 'Sathyabama Institute of Science and Technology',
      phone,
      department,
      yearOfStudy,
      tshirtSize
    });

    if (!result.success) {
      if (result.error === 'EMAIL_ALREADY_REGISTERED') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'An account with this email address already exists. Please sign in or use password recovery.',
            code: 'EMAIL_ALREADY_REGISTERED'
          },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to create student account.' },
        { status: 500 }
      );
    }

    // Attempt to send verification email (truthful local simulation or live AWS SES)
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/auth/verify?token=${result.verificationToken}`;
    try {
      await sendTransactionalEmail({
        to: email.trim().toLowerCase(),
        subject: 'Verify Your KAIROS 2027 Builder Identity',
        html: `
          <h2>Welcome to KAIROS 2027, ${fullName}!</h2>
          <p>Please click the button below to verify your student email address and activate your builder pass:</p>
          <p><a href="${verificationUrl}" style="background-color: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email Address</a></p>
          <p>Or paste this URL in your browser: ${verificationUrl}</p>
        `,
        text: `Welcome to KAIROS 2027, ${fullName}!\n\nVerify your email address here: ${verificationUrl}`
      });
    } catch (emailErr) {
      console.warn('[Register Email Warning]:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Account successfully created! Please check your email to verify your identity.',
      verificationToken: result.verificationToken, // included for local development & testing convenience
      student: {
        id: result.account?.id,
        email: result.account?.email,
        fullName: result.account?.fullName,
        institution: result.account?.institution,
        emailVerified: result.account?.emailVerified
      }
    }, { status: 201 });
  } catch (err: any) {
    console.error('[API Register Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Registration service encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}
