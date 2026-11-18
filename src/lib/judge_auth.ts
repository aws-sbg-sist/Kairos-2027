import crypto from 'crypto';
import { cookies } from 'next/headers';
import { Judge } from '@/types';

export const JUDGE_COOKIE_NAME = 'kairos_judge_session';

export interface JudgeSession {
  judgeId: string;
  fullName: string;
  organization: string;
  designation: string;
  trackSpecialization?: string;
  assignedHall?: string;
  authenticatedAt: number;
}

function getMasterSecret(): string {
  const secret = process.env.ADMIN_MASTER_SECRET || process.env.SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_MASTER_SECRET (or SESSION_SECRET) environment variable is mandatory in production');
    }
    return 'kairos-local-development-secret-key-do-not-use-in-prod';
  }
  return secret;
}

export function createJudgeToken(judge: Judge): string {
  const secret = getMasterSecret();
  const payload = JSON.stringify({
    judgeId: judge.id,
    fullName: judge.fullName,
    organization: judge.organization,
    designation: judge.designation,
    trackSpecialization: judge.trackSpecialization,
    assignedHall: judge.assignedHall,
    authenticatedAt: Date.now()
  });
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}::${hmac}`).toString('base64');
}

export function verifyJudgeToken(token: string): JudgeSession | null {
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const [payload, signature] = raw.split('::');
    if (!payload || !signature) return null;

    const secret = getMasterSecret();
    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const session: JudgeSession = JSON.parse(payload);
    // 7 days session validity
    if (Date.now() - session.authenticatedAt > 7 * 24 * 60 * 60 * 1000) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function getCurrentJudgeSession(): Promise<JudgeSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(JUDGE_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyJudgeToken(token);
  } catch {
    return null;
  }
}

export function getJudgeSessionFromRequest(req: { cookies?: any; headers?: any }): JudgeSession | null {
  try {
    // 1. Check cookies
    let token: string | undefined;
    if (typeof req.cookies?.get === 'function') {
      token = req.cookies.get(JUDGE_COOKIE_NAME)?.value;
    } else if (req.cookies && typeof req.cookies[JUDGE_COOKIE_NAME] === 'string') {
      token = req.cookies[JUDGE_COOKIE_NAME];
    }

    // 2. Check Authorization or x-judge-token header
    if (!token && req.headers) {
      const authHeader = typeof req.headers.get === 'function' 
        ? req.headers.get('authorization') || req.headers.get('x-judge-token')
        : req.headers['authorization'] || req.headers['x-judge-token'];
      
      if (authHeader) {
        if (authHeader.startsWith('Bearer ')) {
          token = authHeader.substring(7).trim();
        } else {
          token = authHeader.trim();
        }
      }
    }

    if (!token) return null;
    return verifyJudgeToken(token);
  } catch {
    return null;
  }
}

/**
 * Hashes a 6-digit judge access PIN using salted PBKDF2-SHA512 with 100,000 iterations.
 * Format returned: `<32_hex_salt>:<128_hex_key>`
 */
export function hashJudgePin(pin: string): string {
  if (!pin || typeof pin !== 'string') {
    throw new Error('Judge PIN must be provided as a string');
  }
  const clean = pin.trim();
  if (!/^\d{6}$/.test(clean)) {
    throw new Error('Judge PIN must be exactly 6 numeric digits');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(clean, salt, 100_000, 64, 'sha512').toString('hex');
  return `${salt}:${derivedKey}`;
}

/**
 * Validates a judge PIN against a stored value with constant-time equality.
 * Supports:
 *  1. Salted PBKDF2-SHA512 hashes (<salt>:<derivedKey>)
 *  2. Controlled migration fallback for legacy 6-digit plaintext PINs using constant-time comparison
 */
export function verifyJudgePinMatch(inputPin: string, storedPinOrHash: string): boolean {
  try {
    if (!inputPin || !storedPinOrHash || typeof inputPin !== 'string' || typeof storedPinOrHash !== 'string') {
      return false;
    }
    const cleanInput = inputPin.trim();
    // Validate format: strictly 6 numeric digits
    if (!/^\d{6}$/.test(cleanInput)) {
      return false;
    }

    const cleanStored = storedPinOrHash.trim();

    // 1. Salted PBKDF2-SHA512 hash format check (<32-char-salt>:<128-char-key>)
    if (cleanStored.includes(':')) {
      const parts = cleanStored.split(':');
      if (parts.length !== 2) return false;
      const [salt, key] = parts;
      if (salt.length !== 32 || key.length !== 128) return false;

      const derivedKey = crypto.pbkdf2Sync(cleanInput, salt, 100_000, 64, 'sha512').toString('hex');
      const keyBuffer = Buffer.from(key, 'hex');
      const derivedBuffer = Buffer.from(derivedKey, 'hex');
      if (keyBuffer.length !== derivedBuffer.length) return false;
      return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
    }

    // 2. Controlled legacy plaintext fallback (strictly 6 digits)
    // Can be globally disabled in production via KAIROS_DISABLE_LEGACY_JUDGE_PINS=true
    if (process.env.KAIROS_DISABLE_LEGACY_JUDGE_PINS === 'true') {
      return false;
    }

    if (!/^\d{6}$/.test(cleanStored)) {
      return false;
    }

    // Hash both with SHA-256 to produce fixed 32-byte buffers and compare in constant time
    const inputDigest = crypto.createHash('sha256').update(cleanInput).digest();
    const storedDigest = crypto.createHash('sha256').update(cleanStored).digest();
    return crypto.timingSafeEqual(inputDigest, storedDigest);
  } catch {
    return false;
  }
}
