import crypto from 'crypto';
import { cookies } from 'next/headers';

function getMasterSecret(): string {
  const secret = process.env.ADMIN_MASTER_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_MASTER_SECRET environment variable is mandatory in production');
    }
    // Development-only deterministic secret with prominent warning
    console.warn('[SECURITY WARNING] ADMIN_MASTER_SECRET is not set in development. Using dev-only fallback.');
    return 'kairos-local-development-secret-key-do-not-use-in-prod';
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

/**
 * Sanitizes a cell value to prevent CSV / Spreadsheet Formula Injection (CWE-1236).
 * Prepends a single quote (') if the value begins with formula triggers:
 * '=', '+', '-', '@', '\t', '\r', '%' or similar characters.
 * Properly escapes internal quotation marks and wraps in quotes.
 */
export function sanitizeCsvCell(value: any): string {
  if (value === null || value === undefined) {
    return '""';
  }
  let str = String(value);
  // Detect if trimmed value begins with any spreadsheet formula indicator
  const trimmed = str.trimStart();
  if (
    trimmed.startsWith('=') ||
    trimmed.startsWith('+') ||
    trimmed.startsWith('-') ||
    trimmed.startsWith('@') ||
    trimmed.startsWith('\t') ||
    trimmed.startsWith('\r') ||
    trimmed.startsWith('%')
  ) {
    str = `'${str}`;
  }
  // Standard CSV escaping: escape quotes and wrap in double quotes
  return `"${str.replace(/"/g, '""')}"`;
}
