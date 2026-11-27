import { NextRequest, NextResponse } from 'next/server';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { db } from '@/lib/db';
import { isValidHttpUrl, safeParseJson } from '@/lib/http';

export async function GET() {
  const session = await getCurrentStudentSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Authentication required. Please log in to view your builder identity.', code: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }

  const account = await db.getStudentByEmail(session.email);
  if (!account) {
    return NextResponse.json(
      { success: false, error: 'Student identity profile not found.', code: 'PROFILE_NOT_FOUND' },
      { status: 404 }
    );
  }

  // Derive associated team and waitlist records
  const team = await db.getStudentTeam(account.email);
  const waitlist = await db.getStudentWaitlist(account.email);
  const evaluations = team ? await db.getTeamEvaluations(team.id) : [];

  return NextResponse.json({
    success: true,
    student: {
      id: account.id,
      email: account.email,
      fullName: account.fullName,
      phone: account.phone,
      institution: account.institution,
      department: account.department,
      yearOfStudy: account.yearOfStudy,
      portfolioUrl: account.portfolioUrl,
      githubUrl: account.githubUrl,
      linkedinUrl: account.linkedinUrl,
      tshirtSize: account.tshirtSize,
      emailVerified: account.emailVerified,
      emailVerifiedAt: account.emailVerifiedAt,
      createdAt: account.createdAt,
      lastLoginAt: account.lastLoginAt
    },
    team,
    waitlist,
    evaluations
  });
}

export async function PUT(req: NextRequest) {
  const session = await getCurrentStudentSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Authentication required to update profile.', code: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const { fullName, phone, institution, department, yearOfStudy, portfolioUrl, githubUrl, linkedinUrl, tshirtSize } = parsed.data;

    if (
      (fullName !== undefined && (typeof fullName !== 'string' || fullName.trim().length === 0 || fullName.length > 150)) ||
      (phone !== undefined && (typeof phone !== 'string' || phone.length > 50)) ||
      (institution !== undefined && (typeof institution !== 'string' || institution.length > 200)) ||
      (department !== undefined && (typeof department !== 'string' || department.length > 150)) ||
      (yearOfStudy !== undefined && (typeof yearOfStudy !== 'string' || yearOfStudy.length > 50)) ||
      (tshirtSize !== undefined && (typeof tshirtSize !== 'string' || tshirtSize.length > 10)) ||
      (portfolioUrl && !isValidHttpUrl(String(portfolioUrl))) ||
      (githubUrl && !isValidHttpUrl(String(githubUrl))) ||
      (linkedinUrl && !isValidHttpUrl(String(linkedinUrl)))
    ) {
      return NextResponse.json(
        { success: false, error: 'One or more profile fields are invalid or exceed maximum length.' },
        { status: 400 }
      );
    }

    if (
      fullName === undefined &&
      phone === undefined &&
      institution === undefined &&
      department === undefined &&
      yearOfStudy === undefined &&
      portfolioUrl === undefined &&
      githubUrl === undefined &&
      linkedinUrl === undefined &&
      tshirtSize === undefined
    ) {
      return NextResponse.json(
        { success: false, error: 'Provide at least one profile field to update.' },
        { status: 400 }
      );
    }

    const result = await db.updateStudentProfile(session.studentId, {
      fullName,
      phone,
      institution,
      department,
      yearOfStudy,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      tshirtSize
    });

    if (!result.success || !result.account) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to update student profile.' },
        { status: 400 }
      );
    }

    const updated = result.account;
    return NextResponse.json({
      success: true,
      message: 'Builder profile successfully updated!',
      student: {
        id: updated.id,
        email: updated.email,
        fullName: updated.fullName,
        phone: updated.phone,
        institution: updated.institution,
        department: updated.department,
        yearOfStudy: updated.yearOfStudy,
        portfolioUrl: updated.portfolioUrl,
        githubUrl: updated.githubUrl,
        linkedinUrl: updated.linkedinUrl,
        tshirtSize: updated.tshirtSize,
        emailVerified: updated.emailVerified
      }
    });
  } catch (err: any) {
    console.error('[API Student Profile Update Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update student profile.' },
      { status: 500 }
    );
  }
}
