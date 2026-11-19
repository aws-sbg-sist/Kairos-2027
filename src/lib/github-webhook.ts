import crypto from 'crypto';

export function normalizeGitHubRepository(value: string): string {
  const trimmed = value.trim().replace(/\.git$/i, '').replace(/\/$/, '');
  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname.toLowerCase() !== 'github.com') return '';
    return parsed.pathname.replace(/^\//, '').toLowerCase();
  } catch {
    return trimmed.replace(/^github\.com\//i, '').replace(/^\//, '').toLowerCase();
  }
}

export function verifyGitHubWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  if (!signature.startsWith('sha256=') || !secret) return false;
  const received = Buffer.from(signature.slice('sha256='.length), 'hex');
  const expected = Buffer.from(
    crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex'),
    'hex'
  );
  return received.length === expected.length && crypto.timingSafeEqual(received, expected);
}

export function sanitizeCommitMessage(message: unknown): string {
  if (typeof message !== 'string') return 'Commit received';
  return message.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240) || 'Commit received';
}
