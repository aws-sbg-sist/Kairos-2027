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
  const secret = process.env.ADMIN_MASTER_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_MASTER_SECRET environment variable is mandatory in production');
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
