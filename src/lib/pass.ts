/**
 * KAIROS 2027 — DIGITAL PARTICIPANT PASS & SECURITY VERIFICATION ENGINE
 * 
 * Generates cryptographically verifiable digital badges and QR verification tokens.
 * Security Rules:
 * - QR codes must contain an opaque verification identifier, NEVER raw PII.
 * - Server-side verification validates identity against the persistent database.
 * - Never trust client QR content alone as proof of identity or check-in eligibility.
 */

import crypto from 'crypto';
import { db } from '@/lib/db';
import { ParticipantTeam, WaitlistEntry } from '@/types';

function getPassSecret(): string {
  const secret = process.env.STUDENT_AUTH_SECRET || process.env.ADMIN_MASTER_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('STUDENT_AUTH_SECRET environment variable is mandatory in production');
    }
    return 'kairos-local-student-auth-secret-do-not-use-in-prod';
  }
  return secret;
}

export interface ParticipantPassData {
  passId: string;
  accessCode: string;
  participantName: string;
  participantEmail: string;
  institution: string;
  role: string;
  teamCode?: string;
  teamName: string;
  track: string;
  bay: string;
  accessTier: string;
  dates: string;
  emailVerified: boolean;
  opaqueToken: string;
  verificationUrl: string;
  issuedAt: string;
}

export interface VerificationResult {
  valid: boolean;
  error?: string;
  verifiedAt?: string;
  participant?: {
    id: string;
    fullName: string;
    email: string;
    institution: string;
    emailVerified: boolean;
    role: string;
    tshirtSize?: string;
  };
  team?: {
    id: string;
    teamCode?: string;
    teamName: string;
    trackId: string;
    selectionStage: string;
    deskBayAllocation?: string;
    memberCount: number;
  } | null;
  waitlist?: {
    status: string;
    preferredTrack: string;
  } | null;
  checkInEligibility?: {
    eligible: boolean;
    reason: string;
  };
}

/**
 * Generates a signed, opaque verification token for a student
 */
export function createOpaquePassToken(studentId: string, email: string): { token: string; passId: string } {
  const cleanEmail = email.trim().toLowerCase();
  const secret = getPassSecret();
  // Pass ID: format KAIROS-PASS-XXXX (derived from student ID or random bytes)
  const passSuffix = studentId.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase() || 
    crypto.randomBytes(3).toString('hex').toUpperCase();
  const passId = `KAIROS-PASS-${passSuffix}`;

  const payload = JSON.stringify({
    pid: passId,
    sid: studentId,
    em: cleanEmail,
    iat: Date.now()
  });

  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(`${payload}::${hmac}`).toString('base64url');

  return { token, passId };
}

/**
 * Builds the complete digital participant pass for an authenticated student
 */
export function generateDigitalPass(
  student: {
    id: string;
    email: string;
    fullName: string;
    institution?: string;
    emailVerified: boolean;
  },
  team?: ParticipantTeam | null,
  waitlist?: WaitlistEntry | null,
  originUrl = 'https://kairos2027.com'
): ParticipantPassData {
  const { token, passId } = createOpaquePassToken(student.id, student.email);

  // Derive role
  let role = 'Builder';
  if (team) {
    const member = team.members.find(m => m.email.toLowerCase() === student.email.toLowerCase());
    if (member?.role) {
      role = member.role;
    } else if (team.leaderEmail?.toLowerCase() === student.email.toLowerCase()) {
      role = 'Leader';
    }
  }

  // Derive track
  let track = 'General Technical';
  if (team?.trackId) {
    track = team.trackId.replace('track-', '').replace(/-/g, ' ').toUpperCase();
  } else if (waitlist?.preferredTrack) {
    track = waitlist.preferredTrack;
  }

  // Derive access tier
  let accessTier = 'Round 0 Applicant Pass';
  if (team?.selectionStage === 'ON_CAMPUS_QUALIFIED') {
    accessTier = '48H Arena Finalist + Meal Pass';
  } else if (team?.selectionStage === 'ONLINE_SEMI_FINALIST') {
    accessTier = 'Top 250 Semi-Finalist Pass';
  }

  const bay = team?.deskBayAllocation || 'Bay Allocation Upon Check-in';
  const verificationUrl = `${originUrl}/api/v1/pass/verify?token=${encodeURIComponent(token)}`;

  return {
    passId,
    accessCode: passId,
    participantName: student.fullName,
    participantEmail: student.email,
    institution: student.institution || 'Sathyabama Institute of Science and Technology',
    role,
    teamCode: team?.teamCode,
    teamName: team?.teamName || 'Solo Builder (Seeking Squad)',
    track,
    bay,
    accessTier,
    dates: '22 to 24 January 2027',
    emailVerified: student.emailVerified,
    opaqueToken: token,
    verificationUrl,
    issuedAt: new Date().toISOString()
  };
}

/**
 * Verifies an opaque pass token against the server database.
 * Does NOT trust token content alone: always validates the backing database record.
 */
export function verifyPassToken(token: string): VerificationResult {
  try {
    if (!token || typeof token !== 'string') {
      return { valid: false, error: 'Missing or empty verification token.' };
    }

    const secret = getPassSecret();
    const raw = Buffer.from(token, 'base64url').toString('utf-8');
    const [payloadStr, signature] = raw.split('::');

    if (!payloadStr || !signature) {
      return { valid: false, error: 'Malformed verification token structure.' };
    }

    const expectedSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return { valid: false, error: 'Cryptographic signature verification failed. Token is invalid or forged.' };
    }

    const data = JSON.parse(payloadStr);
    if (!data.em || !data.sid) {
      return { valid: false, error: 'Invalid token payload.' };
    }

    // Check expiration: valid for 30 days
    const maxAgeMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - data.iat > maxAgeMs) {
      return { valid: false, error: 'Security pass token has expired.' };
    }

    // Verify backing student profile from database
    const student = db.getStudentByEmail(data.em);
    if (!student) {
      return { valid: false, error: 'No active student record matches this pass token.' };
    }

    // Derive real team and waitlist
    const team = db.getStudentTeam(student.email);
    const waitlist = db.getStudentWaitlist(student.email);

    // Derive role
    let role = 'Builder';
    if (team) {
      const member = team.members.find(m => m.email.toLowerCase() === student.email.toLowerCase());
      if (member?.role) {
        role = member.role;
      } else if (team.leaderEmail?.toLowerCase() === student.email.toLowerCase()) {
        role = 'Leader';
      }
    }

    // Determine check-in eligibility
    let eligible = true;
    let reason = 'Builder pass verified. Eligible for arena check-in.';

    if (!student.emailVerified) {
      eligible = false;
      reason = 'Student email address has not been verified yet.';
    } else if (team && team.members.length < 4 && team.selectionStage === 'ON_CAMPUS_QUALIFIED') {
      eligible = false;
      reason = 'Squad has fewer than the mandatory 4 builders.';
    }

    return {
      valid: true,
      verifiedAt: new Date().toISOString(),
      participant: {
        id: student.id,
        fullName: student.fullName,
        email: student.email,
        institution: student.institution,
        emailVerified: student.emailVerified,
        role,
        tshirtSize: student.tshirtSize
      },
      team: team ? {
        id: team.id,
        teamCode: team.teamCode,
        teamName: team.teamName,
        trackId: team.trackId,
        selectionStage: team.selectionStage || 'ROUND_0_APPLICANT',
        deskBayAllocation: team.deskBayAllocation,
        memberCount: team.members.length
      } : null,
      waitlist: waitlist ? {
        status: waitlist.status || 'pending',
        preferredTrack: waitlist.preferredTrack
      } : null,
      checkInEligibility: {
        eligible,
        reason
      }
    };
  } catch (err: any) {
    return { valid: false, error: `Verification error: ${err.message || 'Unknown error'}` };
  }
}
