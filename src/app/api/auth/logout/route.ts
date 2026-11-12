import { NextResponse } from 'next/server';
import { STUDENT_COOKIE_NAME } from '@/lib/student_auth';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully.'
  });

  // Clear student session cookie
  response.cookies.delete(STUDENT_COOKIE_NAME);

  return response;
}
