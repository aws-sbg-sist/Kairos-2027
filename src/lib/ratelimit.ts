import type { NextRequest, NextResponse as NextResponseType } from 'next/server';
import { createRequire } from 'module';

const requireHelper = createRequire(import.meta.url);
const { NextResponse } = requireHelper('next/server');
import crypto from 'crypto';

/**
 * PRODUCTION-GRADE MULTI-TIER RATE LIMITER & BOT DETECTION
 * Designed for public high-traffic hackathon portals.
 * Protects against DDoS, scraping, API cost runaway, and distributed bot floods.
 */

export interface RateLimitConfig {
  perMinute: number;
  perHour: number;
  perDay: number;
  maxMessageLength: number;
  maxOutputTokens: number;
  dailyTokenBudget: number;
}

// Configurable limits with environment variable fallback
export function getRateLimitConfig(): RateLimitConfig {
  return {
    perMinute: parseInt(process.env.CHAT_RATE_LIMIT_PER_MINUTE || '10', 10),
    perHour: parseInt(process.env.CHAT_RATE_LIMIT_PER_HOUR || '40', 10),
    perDay: parseInt(process.env.CHAT_RATE_LIMIT_PER_DAY || '100', 10),
    maxMessageLength: parseInt(process.env.CHAT_MAX_MESSAGE_LENGTH || '1500', 10),
    maxOutputTokens: parseInt(process.env.CHAT_MAX_OUTPUT_TOKENS || '500', 10),
    dailyTokenBudget: parseInt(process.env.CHAT_DAILY_TOKEN_BUDGET || '500000', 10),
  };
}

interface WindowBucket {
  count: number;
  resetAt: number;
}

interface SessionRecord {
  minuteBucket: WindowBucket;
  hourBucket: WindowBucket;
  dayBucket: WindowBucket;
  inFlight: boolean;
  lastMessageHash?: string;
  lastMessageAt?: number;
  estimatedTokensToday: number;
}

interface IpAbuseRecord {
  minuteBucket: WindowBucket;
  flagged: boolean;
}

// In-Memory Storage Maps
const sessionStore = new Map<string, SessionRecord>();
const ipStore = new Map<string, IpAbuseRecord>();
const duplicateCache = new Map<string, number>(); // hash -> expiresAt

// Telemetry counters for administrator dashboard
export const chatbotTelemetry = {
  totalRequests: 0,
  allowedRequests: 0,
  rateLimitedRequests: 0,
  duplicateBlocked: 0,
  injectionsDeflected: 0,
  estimatedTokensConsumedToday: 0,
  dailyBudgetExhaustedCount: 0,
  hourlyHistory: new Map<string, number>(), // "YYYY-MM-DD-HH" -> count
  lastResetDay: new Date().toISOString().slice(0, 10),
  maintenanceMode: false,
};

// Automatic cleanup every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();

    // Clean session store
    sessionStore.forEach((record, key) => {
      if (now > record.dayBucket.resetAt && !record.inFlight) {
        sessionStore.delete(key);
      }
    });

    // Clean IP abuse store
    ipStore.forEach((record, ip) => {
      if (now > record.minuteBucket.resetAt) {
        ipStore.delete(ip);
      }
    });

    // Clean duplicate cache
    duplicateCache.forEach((expiresAt, hash) => {
      if (now > expiresAt) {
        duplicateCache.delete(hash);
      }
    });

    // Reset daily token counter if day has passed
    const currentDay = new Date().toISOString().slice(0, 10);
    if (currentDay !== chatbotTelemetry.lastResetDay) {
      chatbotTelemetry.estimatedTokensConsumedToday = 0;
      chatbotTelemetry.lastResetDay = currentDay;
    }
  }, 5 * 60 * 1000).unref?.();
}

/**
 * Safely extract normalized client IP (avoids blindly trusting arbitrary X-Forwarded-For)
 */
export function extractClientIp(req: NextRequest | Request): string {
  if ('headers' in req) {
    // Cloudflare connecting IP takes highest precedence if deployed behind Cloudflare
    const cfIp = req.headers.get('cf-connecting-ip');
    if (cfIp) return cfIp.trim();

    // Standard X-Forwarded-For: take the leftmost valid IP address
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
      const parts = forwarded.split(',');
      const candidate = parts[0].trim();
      // Basic IPv4 / IPv6 validation
      if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(candidate) || candidate.includes(':')) {
        return candidate;
      }
    }

    const realIp = req.headers.get('x-real-ip');
    if (realIp && realIp.trim()) return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Extract or generate secure session identifier
 */
export function getOrCreateSessionId(req: NextRequest): { sessionId: string; isNew: boolean } {
  // Check for header or cookie
  const headerSession = req.headers.get('x-kairos-session')?.trim();
  if (headerSession && headerSession.length >= 8 && /^[a-zA-Z0-9_-]+$/.test(headerSession)) {
    return { sessionId: headerSession, isNew: false };
  }

  const cookieSession = req.cookies.get('kairos_chat_session')?.value?.trim();
  if (cookieSession && cookieSession.length >= 8 && /^[a-zA-Z0-9_-]+$/.test(cookieSession)) {
    return { sessionId: cookieSession, isNew: false };
  }

  // Generate new secure random session ID
  const newId = `ksess_${crypto.randomBytes(16).toString('hex')}`;
  return { sessionId: newId, isNew: true };
}

export interface RateLimitCheckResult {
  allowed: boolean;
  status: number;
  reason?: 'MINUTE_LIMIT' | 'HOUR_LIMIT' | 'DAY_LIMIT' | 'IP_ABUSE' | 'CONCURRENT_REQUEST' | 'DUPLICATE_REQUEST' | 'BUDGET_EXHAUSTED' | 'MAINTENANCE_MODE';
  error?: string;
  retryAfterSeconds: number;
  remainingMinute: number;
  remainingHour: number;
  remainingDay: number;
  sessionId: string;
  isNewSession: boolean;
}

/**
 * Comprehensive production rate limiting & abuse check
 */
export function evaluateChatbotRateLimit(
  req: NextRequest,
  messageText: string,
  isAuthenticated: boolean = false
): RateLimitCheckResult {
  const now = Date.now();
  chatbotTelemetry.totalRequests++;

  // Record hourly history
  const hourKey = new Date().toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
  chatbotTelemetry.hourlyHistory.set(hourKey, (chatbotTelemetry.hourlyHistory.get(hourKey) || 0) + 1);

  // 1. Maintenance Mode Check
  if (chatbotTelemetry.maintenanceMode) {
    return {
      allowed: false,
      status: 503,
      reason: 'MAINTENANCE_MODE',
      error: 'The AI Assistant is currently undergoing scheduled maintenance. Please check back shortly.',
      retryAfterSeconds: 300,
      remainingMinute: 0,
      remainingHour: 0,
      remainingDay: 0,
      sessionId: '',
      isNewSession: false
    };
  }

  const config = getRateLimitConfig();
  const { sessionId, isNew } = getOrCreateSessionId(req);
  const clientIp = extractClientIp(req);

  // Scaled limits for authenticated participants if applicable
  const limitMultiplier = isAuthenticated ? 2 : 1;
  const minuteLimit = config.perMinute * limitMultiplier;
  const hourLimit = config.perHour * limitMultiplier;
  const dayLimit = config.perDay * limitMultiplier;

  // 2. Daily Token Budget Check
  if (chatbotTelemetry.estimatedTokensConsumedToday >= config.dailyTokenBudget) {
    chatbotTelemetry.dailyBudgetExhaustedCount++;
    return {
      allowed: false,
      status: 503,
      reason: 'BUDGET_EXHAUSTED',
      error: 'The live AI Assistant has reached its aggregate daily community token quota. You can still check all rules and schedules on the website!',
      retryAfterSeconds: 3600,
      remainingMinute: 0,
      remainingHour: 0,
      remainingDay: 0,
      sessionId,
      isNewSession: isNew
    };
  }

  // 3. Secondary IP Abuse Detection (Protects against distributed session-spoofing bot floods)
  const ipRecord = ipStore.get(clientIp);
  if (!ipRecord || now > ipRecord.minuteBucket.resetAt) {
    ipStore.set(clientIp, {
      minuteBucket: { count: 1, resetAt: now + 60_000 },
      flagged: false
    });
  } else {
    ipRecord.minuteBucket.count++;
    // If a single IP makes >80 requests/min across multiple sessions, trigger secondary IP throttling
    if (ipRecord.minuteBucket.count > minuteLimit * 8) {
      chatbotTelemetry.rateLimitedRequests++;
      const retryAfter = Math.max(1, Math.ceil((ipRecord.minuteBucket.resetAt - now) / 1000));
      return {
        allowed: false,
        status: 429,
        reason: 'IP_ABUSE',
        error: `High traffic detected from your network. Please wait ${retryAfter} seconds before trying again.`,
        retryAfterSeconds: retryAfter,
        remainingMinute: 0,
        remainingHour: 0,
        remainingDay: 0,
        sessionId,
        isNewSession: isNew
      };
    }
  }

  // 4. Retrieve or initialize Session Record
  let session = sessionStore.get(sessionId);
  if (!session) {
    session = {
      minuteBucket: { count: 0, resetAt: now + 60_000 },
      hourBucket: { count: 0, resetAt: now + 3600_000 },
      dayBucket: { count: 0, resetAt: now + 86400_000 },
      inFlight: false,
      estimatedTokensToday: 0
    };
    sessionStore.set(sessionId, session);
  }

  // Reset expired buckets
  if (now > session.minuteBucket.resetAt) {
    session.minuteBucket = { count: 0, resetAt: now + 60_000 };
  }
  if (now > session.hourBucket.resetAt) {
    session.hourBucket = { count: 0, resetAt: now + 3600_000 };
  }
  if (now > session.dayBucket.resetAt) {
    session.dayBucket = { count: 0, resetAt: now + 86400_000 };
    session.estimatedTokensToday = 0;
  }

  // 5. Concurrency Lock: Prevent multiple overlapping LLM calls for the same session
  if (session.inFlight) {
    chatbotTelemetry.rateLimitedRequests++;
    return {
      allowed: false,
      status: 429,
      reason: 'CONCURRENT_REQUEST',
      error: 'Please wait for your previous message to finish generating before sending another.',
      retryAfterSeconds: 3,
      remainingMinute: Math.max(0, minuteLimit - session.minuteBucket.count),
      remainingHour: Math.max(0, hourLimit - session.hourBucket.count),
      remainingDay: Math.max(0, dayLimit - session.dayBucket.count),
      sessionId,
      isNewSession: isNew
    };
  }

  // 6. Rapid Duplicate Request Suppression (Within 5 seconds)
  const queryHash = crypto
    .createHash('sha256')
    .update(`${sessionId}:${messageText.trim().toLowerCase()}`)
    .digest('hex');

  const duplicateExpiresAt = duplicateCache.get(queryHash);
  if (duplicateExpiresAt && now < duplicateExpiresAt) {
    chatbotTelemetry.duplicateBlocked++;
    return {
      allowed: false,
      status: 429,
      reason: 'DUPLICATE_REQUEST',
      error: 'You sent an identical question a moment ago. Please wait a few seconds before resending.',
      retryAfterSeconds: Math.max(1, Math.ceil((duplicateExpiresAt - now) / 1000)),
      remainingMinute: Math.max(0, minuteLimit - session.minuteBucket.count),
      remainingHour: Math.max(0, hourLimit - session.hourBucket.count),
      remainingDay: Math.max(0, dayLimit - session.dayBucket.count),
      sessionId,
      isNewSession: isNew
    };
  }

  // 7. Multi-Tier Window Limits Check
  // A. Minute Limit
  if (session.minuteBucket.count >= minuteLimit) {
    chatbotTelemetry.rateLimitedRequests++;
    const retryAfter = Math.max(1, Math.ceil((session.minuteBucket.resetAt - now) / 1000));
    return {
      allowed: false,
      status: 429,
      reason: 'MINUTE_LIMIT',
      error: `You've reached the current chat rate limit. Please wait ${retryAfter} seconds before sending another message.`,
      retryAfterSeconds: retryAfter,
      remainingMinute: 0,
      remainingHour: Math.max(0, hourLimit - session.hourBucket.count),
      remainingDay: Math.max(0, dayLimit - session.dayBucket.count),
      sessionId,
      isNewSession: isNew
    };
  }

  // B. Hour Limit
  if (session.hourBucket.count >= hourLimit) {
    chatbotTelemetry.rateLimitedRequests++;
    const retryAfter = Math.max(1, Math.ceil((session.hourBucket.resetAt - now) / 1000));
    return {
      allowed: false,
      status: 429,
      reason: 'HOUR_LIMIT',
      error: `You've reached the hourly chat usage limit (${hourLimit} requests/hr). Please wait a while before continuing.`,
      retryAfterSeconds: retryAfter,
      remainingMinute: 0,
      remainingHour: 0,
      remainingDay: Math.max(0, dayLimit - session.dayBucket.count),
      sessionId,
      isNewSession: isNew
    };
  }

  // C. Day Limit
  if (session.dayBucket.count >= dayLimit) {
    chatbotTelemetry.rateLimitedRequests++;
    const retryAfter = Math.max(1, Math.ceil((session.dayBucket.resetAt - now) / 1000));
    return {
      allowed: false,
      status: 429,
      reason: 'DAY_LIMIT',
      error: `You've reached the daily chat limit (${dayLimit} requests/day). If you have further questions, please email the club at sistawscc@gmail.com!`,
      retryAfterSeconds: retryAfter,
      remainingMinute: 0,
      remainingHour: 0,
      remainingDay: 0,
      sessionId,
      isNewSession: isNew
    };
  }

  // Increment counters atomically
  session.minuteBucket.count++;
  session.hourBucket.count++;
  session.dayBucket.count++;
  session.inFlight = true;

  // Set duplicate suppression window (5 seconds)
  duplicateCache.set(queryHash, now + 5000);

  chatbotTelemetry.allowedRequests++;

  return {
    allowed: true,
    status: 200,
    retryAfterSeconds: 0,
    remainingMinute: minuteLimit - session.minuteBucket.count,
    remainingHour: hourLimit - session.hourBucket.count,
    remainingDay: dayLimit - session.dayBucket.count,
    sessionId,
    isNewSession: isNew
  };
}

/**
 * Release concurrency lock & record estimated token consumption
 */
export function recordRequestCompletion(
  sessionId: string,
  estimatedInputTokens: number,
  estimatedOutputTokens: number
): void {
  const session = sessionStore.get(sessionId);
  if (session) {
    session.inFlight = false;
    const totalTokens = estimatedInputTokens + estimatedOutputTokens;
    session.estimatedTokensToday += totalTokens;
    chatbotTelemetry.estimatedTokensConsumedToday += totalTokens;
  }
}

/**
 * Release concurrency in-flight lock without altering token counts (e.g. on deflection or early return)
 */
export function releaseSessionLock(sessionId: string): void {
  const session = sessionStore.get(sessionId);
  if (session) {
    session.inFlight = false;
  }
}

/**
 * Retrieve a JSON-serializable snapshot of telemetry metrics
 */
export function getTelemetrySnapshot() {
  const config = getRateLimitConfig();
  const hourlyObj: Record<string, number> = {};
  chatbotTelemetry.hourlyHistory.forEach((v, k) => {
    hourlyObj[k] = v;
  });

  return {
    totalRequests: chatbotTelemetry.totalRequests,
    allowedRequests: chatbotTelemetry.allowedRequests,
    rateLimitedRequests: chatbotTelemetry.rateLimitedRequests,
    duplicateBlocked: chatbotTelemetry.duplicateBlocked,
    injectionsDeflected: chatbotTelemetry.injectionsDeflected,
    estimatedTokensConsumedToday: chatbotTelemetry.estimatedTokensConsumedToday,
    dailyBudgetExhaustedCount: chatbotTelemetry.dailyBudgetExhaustedCount,
    dailyTokenBudget: config.dailyTokenBudget,
    budgetUtilizationPercent: Number(
      ((chatbotTelemetry.estimatedTokensConsumedToday / config.dailyTokenBudget) * 100).toFixed(2)
    ),
    maintenanceMode: chatbotTelemetry.maintenanceMode,
    lastResetDay: chatbotTelemetry.lastResetDay,
    activeSessionsCount: sessionStore.size,
    hourlyHistory: hourlyObj,
  };
}

/**
 * Set maintenance mode status
 */
export function setMaintenanceMode(enabled: boolean): void {
  chatbotTelemetry.maintenanceMode = enabled;
}

/**
 * Reset daily budget counter
 */
export function resetDailyBudgetCounter(): void {
  chatbotTelemetry.estimatedTokensConsumedToday = 0;
  chatbotTelemetry.dailyBudgetExhaustedCount = 0;
}

/**
 * Clean all stores and counters for test isolation
 */
export function resetRateLimitStoresForTesting(): void {
  sessionStore.clear();
  ipStore.clear();
  duplicateCache.clear();
  chatbotTelemetry.totalRequests = 0;
  chatbotTelemetry.allowedRequests = 0;
  chatbotTelemetry.rateLimitedRequests = 0;
  chatbotTelemetry.duplicateBlocked = 0;
  chatbotTelemetry.injectionsDeflected = 0;
  chatbotTelemetry.estimatedTokensConsumedToday = 0;
  chatbotTelemetry.dailyBudgetExhaustedCount = 0;
  chatbotTelemetry.hourlyHistory.clear();
  chatbotTelemetry.maintenanceMode = false;
}

/**
 * Construct secure standard Rate Limit HTTP Response
 */
export function createDetailedRateLimitResponse(result: RateLimitCheckResult): NextResponseType {
  const response = NextResponse.json(
    {
      success: false,
      error: result.error,
      reason: result.reason,
      retryAfter: result.retryAfterSeconds,
      limits: {
        remainingMinute: result.remainingMinute,
        remainingHour: result.remainingHour,
        remainingDay: result.remainingDay,
      }
    },
    {
      status: result.status,
      headers: {
        'Retry-After': String(result.retryAfterSeconds),
        'X-RateLimit-Remaining-Minute': String(result.remainingMinute),
        'X-RateLimit-Remaining-Hour': String(result.remainingHour),
        'X-RateLimit-Remaining-Day': String(result.remainingDay),
      }
    }
  );

  // Set session cookie if new
  if (result.isNewSession && result.sessionId) {
    response.cookies.set('kairos_chat_session', result.sessionId, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }

  return response;
}

// Backward compatibility helper for existing code/tests
export function checkRateLimit(
  req: NextRequest | Request,
  options: { limit?: number; windowMs?: number; identifier?: string } = {}
) {
  const limit = options.limit ?? 15;
  const windowMs = options.windowMs ?? 60_000;
  const clientIp = extractClientIp(req);
  const key = options.identifier ? `${clientIp}:${options.identifier}` : clientIp;
  const now = Date.now();

  const ipRecord = ipStore.get(key);
  if (!ipRecord || now > ipRecord.minuteBucket.resetAt) {
    ipStore.set(key, {
      minuteBucket: { count: 1, resetAt: now + windowMs },
      flagged: false
    });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs, limit };
  }

  if (ipRecord.minuteBucket.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: ipRecord.minuteBucket.resetAt, limit };
  }

  ipRecord.minuteBucket.count++;
  return { allowed: true, remaining: limit - ipRecord.minuteBucket.count, resetAt: ipRecord.minuteBucket.resetAt, limit };
}

export function createRateLimitResponse(resetAt: number, limit: number): NextResponseType {
  const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return NextResponse.json(
    {
      success: false,
      error: `Too many requests. Please wait ${retryAfterSeconds} seconds before sending another message.`
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
