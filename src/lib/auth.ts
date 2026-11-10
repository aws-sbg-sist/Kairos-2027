import crypto from 'crypto';
import { cookies } from 'next/headers';

function getMasterSecret(): string | null {
  const secret = process.env.ADMIN_MASTER_SECRET?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return null;
    }
    return 'kairos2027-sist-admin';
  }
  return secret;
}

const COOKIE_NAME = 'kairos_admin_session';

export interface AdminSession {
  organizerName: string;
  organizerRole: string;
  authenticatedAt: number;
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getMasterSecret());
}

export function createAdminToken(organizerName: string, organizerRole: string): string {
  const secret = getMasterSecret();
  if (!secret) {
    throw new Error('ADMIN_MASTER_SECRET is not configured in production environment.');
  }
  const payload = JSON.stringify({
    organizerName,
    organizerRole,
    authenticatedAt: Date.now()
  });
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}::${hmac}`).toString('base64');
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    const secret = getMasterSecret();
    if (!secret) return null;

    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const sep = raw.lastIndexOf('::');
    if (sep <= 0) return null;
    const payload = raw.slice(0, sep);
    const signature = raw.slice(sep + 2);
    if (!payload || !signature) return null;

    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const sigBuf = Buffer.from(signature, 'utf8');
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    if (sigBuf.length !== expectedBuf.length) {
      return null;
    }
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const session: AdminSession = JSON.parse(payload);
    // 7-day session validity
    if (Date.now() - session.authenticatedAt > 7 * 24 * 60 * 60 * 1000) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function verifyAdminPasskey(passkey: string): boolean {
  if (!passkey) return false;
  const secret = getMasterSecret();
  if (!secret) return false;
  const buffA = Buffer.from(passkey.trim(), 'utf8');
  const buffB = Buffer.from(secret.trim(), 'utf8');
  if (buffA.length !== buffB.length) return false;
  return crypto.timingSafeEqual(buffA, buffB);
}

export async function getCurrentAdminSession(): Promise<AdminSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
