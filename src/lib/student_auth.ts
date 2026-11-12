/**
 * KAIROS 2027 — STUDENT AUTHENTICATION & IDENTITY SYSTEM
 * 
 * Provides production-grade password hashing (PBKDF2-SHA512), cryptographic
 * session tokens (HMAC-SHA256), email verification tokens, and password
 * recovery mechanics.
 * 
 * Complies with strict identity rules:
 * - Never trust frontend email/ID claims; derive identity from signed server session.
 * - Secure HttpOnly cookies (zero localStorage token leakage).
 * - Timing-safe comparisons to defeat side-channel timing attacks.
 */

import crypto from 'crypto';
import { cookies } from 'next/headers';

const STUDENT_COOKIE_NAME = 'kairos_student_session';

function getAuthSecret(): string {
  const secret = process.env.STUDENT_AUTH_SECRET || process.env.ADMIN_MASTER_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('STUDENT_AUTH_SECRET environment variable is mandatory in production');
    }
    return 'kairos-local-student-auth-secret-do-not-use-in-prod';
  }
  return secret;
}

export interface StudentSession {
  studentId: string;
  email: string;
  fullName: string;
  institution: string;
  emailVerified: boolean;
  authenticatedAt: number;
}

// ------------------------------------------------------------------------------
// 1. SECURE PASSWORD HASHING (PBKDF2-SHA512, 100k Iterations)
// ------------------------------------------------------------------------------
export function hashPassword(password: string): string {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    if (!password || !storedHash) return false;
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;

    const derivedKey = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedBuffer = Buffer.from(derivedKey, 'hex');

    if (keyBuffer.length !== derivedBuffer.length) return false;
    return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
  } catch (err) {
    return false;
  }
}

// ------------------------------------------------------------------------------
// 2. CRYPTOGRAPHIC SESSION TOKENS (HMAC-SHA256, 7-Day Validity)
// ------------------------------------------------------------------------------
export function createStudentToken(payload: Omit<StudentSession, 'authenticatedAt'>): string {
  const secret = getAuthSecret();
  const session: StudentSession = {
    ...payload,
    authenticatedAt: Date.now()
  };
  const rawPayload = JSON.stringify(session);
  const hmac = crypto.createHmac('sha256', secret).update(rawPayload).digest('hex');
  return Buffer.from(`${rawPayload}::${hmac}`).toString('base64');
}

export function verifyStudentToken(token: string): StudentSession | null {
  try {
    if (!token) return null;
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const [rawPayload, signature] = raw.split('::');
    if (!rawPayload || !signature) return null;

    const secret = getAuthSecret();
    const expectedSig = crypto.createHmac('sha256', secret).update(rawPayload).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const session: StudentSession = JSON.parse(rawPayload);
    // 7-day session validity window
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - session.authenticatedAt > maxAgeMs) {
      return null;
    }

    return session;
  } catch (err) {
    return null;
  }
}

export async function getCurrentStudentSession(): Promise<StudentSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(STUDENT_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyStudentToken(token);
}

// ------------------------------------------------------------------------------
// 3. EMAIL VERIFICATION TOKENS (24-Hour Expiry)
// ------------------------------------------------------------------------------
export function generateVerificationToken(email: string): string {
  const secret = getAuthSecret();
  const payload = JSON.stringify({
    email: email.trim().toLowerCase(),
    type: 'VERIFY_EMAIL',
    exp: Date.now() + 24 * 60 * 60 * 1000
  });
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}::${hmac}`).toString('base64');
}

export function verifyEmailToken(token: string): { valid: boolean; email?: string; expired?: boolean } {
  try {
    if (!token) return { valid: false };
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const [payloadStr, signature] = raw.split('::');
    if (!payloadStr || !signature) return { valid: false };

    const secret = getAuthSecret();
    const expectedSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return { valid: false };
    }

    const data = JSON.parse(payloadStr);
    if (data.type !== 'VERIFY_EMAIL') return { valid: false };
    if (Date.now() > data.exp) {
      return { valid: false, email: data.email, expired: true };
    }

    return { valid: true, email: data.email };
  } catch (err) {
    return { valid: false };
  }
}

// ------------------------------------------------------------------------------
// 4. PASSWORD RESET TOKENS (1-Hour Expiry)
// ------------------------------------------------------------------------------
export function generatePasswordResetToken(email: string): string {
  const secret = getAuthSecret();
  const payload = JSON.stringify({
    email: email.trim().toLowerCase(),
    type: 'RESET_PASSWORD',
    exp: Date.now() + 60 * 60 * 1000 // 1 hour
  });
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}::${hmac}`).toString('base64');
}

export function verifyPasswordResetToken(token: string): { valid: boolean; email?: string; expired?: boolean } {
  try {
    if (!token) return { valid: false };
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const [payloadStr, signature] = raw.split('::');
    if (!payloadStr || !signature) return { valid: false };

    const secret = getAuthSecret();
    const expectedSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return { valid: false };
    }

    const data = JSON.parse(payloadStr);
    if (data.type !== 'RESET_PASSWORD') return { valid: false };
    if (Date.now() > data.exp) {
      return { valid: false, email: data.email, expired: true };
    }

    return { valid: true, email: data.email };
  } catch (err) {
    return { valid: false };
  }
}

export { STUDENT_COOKIE_NAME };
