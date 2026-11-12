import { NextRequest, NextResponse } from 'next/server';
import { getCurrentStudentSession } from '@/lib/student_auth';
import { db } from '@/lib/db';
import { generateDigitalPass } from '@/lib/pass';

export async function GET(req: NextRequest) {
  const session = await getCurrentStudentSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Authentication required. Please log in to generate your builder pass.', code: 'UNAUTHORIZED' },
      { status: 401 }
    );
  }

  const student = db.getStudentByEmail(session.email);
  if (!student) {
    return NextResponse.json(
      { success: false, error: 'Student record not found.', code: 'STUDENT_NOT_FOUND' },
      { status: 404 }
    );
  }

  const team = db.getStudentTeam(student.email);
  const waitlist = db.getStudentWaitlist(student.email);

  const host = req.headers.get('host') || 'localhost:8000';
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const originUrl = `${protocol}://${host}`;

  const pass = generateDigitalPass(student, team, waitlist, originUrl);

  return NextResponse.json({
    success: true,
    pass
  });
}
