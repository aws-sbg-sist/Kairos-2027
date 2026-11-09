import crypto from 'crypto';
import { cookies } from 'next/headers';

function getMasterSecret(): string {
  const secret = process.env.ADMIN_MASTER_SECRET;
  if (!secret) {
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

export function createAdminToken(organizerName: string, organizerRole: string): string {
  const secret = getMasterSecret();
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
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const [payload, signature] = raw.split('::');
    if (!payload || !signature) return null;

    const secret = getMasterSecret();
    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const session: AdminSession = JSON.parse(payload);
    // 7-day session validity
    if (Date.now() - session.authenticatedAt > 7 * 24 * 60 * 60 * 1000) {
      return null;
    }

    return session;
  } catch (err) {
    return null;
  }
}

export function verifyAdminPasskey(passkey: string): boolean {
  if (!passkey) return false;
  const secret = getMasterSecret();
  const buffA = Buffer.from(passkey.trim());
  const buffB = Buffer.from(secret.trim());
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
