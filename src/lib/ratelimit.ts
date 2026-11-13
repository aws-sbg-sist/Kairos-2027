import { NextRequest, NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory sliding window rate limiter with strict size caps to protect 512MB RAM containers
const MAX_RATE_LIMIT_KEYS = 1000;
const rateLimitMap = new Map<string, RateLimitRecord>();

function pruneRateLimitMap(now: number) {
  rateLimitMap.forEach((record, key) => {
    if (now > record.resetAt) {
      rateLimitMap.delete(key);
    }
  });

  // If map still exceeds safety threshold under traffic spike, evict oldest half
  if (rateLimitMap.size > MAX_RATE_LIMIT_KEYS) {
    const keysToDelete = Array.from(rateLimitMap.keys()).slice(0, Math.floor(MAX_RATE_LIMIT_KEYS / 2));
    for (const k of keysToDelete) {
      rateLimitMap.delete(k);
    }
  }
}

// Cleanup stale entries every 60 seconds
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    pruneRateLimitMap(Date.now());
  }, 60 * 1000).unref?.();
}

export interface RateLimitOptions {
  limit?: number;       // Max requests within window
  windowMs?: number;    // Window duration in ms
  identifier?: string;  // Custom identifier (e.g. user ID or email)
}

export function checkRateLimit(
  req: NextRequest | Request,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetAt: number; limit: number } {
  const limit = options.limit ?? 15;
  const windowMs = options.windowMs ?? 60_000; // 1 minute default

  // Extract client IP address
  let clientIp = '127.0.0.1';
  if ('headers' in req) {
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
      clientIp = forwarded.split(',')[0].trim();
    } else {
      clientIp = req.headers.get('x-real-ip') || '127.0.0.1';
    }
  }

  const key = options.identifier ? `${clientIp}:${options.identifier}` : clientIp;
  const now = Date.now();
  if (rateLimitMap.size >= MAX_RATE_LIMIT_KEYS) {
    pruneRateLimitMap(now);
  }
  const existing = rateLimitMap.get(key);

  if (!existing || now > existing.resetAt) {
    const resetAt = now + windowMs;
    rateLimitMap.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt, limit };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt, limit };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt, limit };
}

export function createRateLimitResponse(resetAt: number, limit: number): NextResponse {
  const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return NextResponse.json(
    {
      success: false,
      error: `Too many requests. Rate limit exceeded. Please try again in ${retryAfterSeconds} seconds.`
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(resetAt),
      }
    }
  );
}
