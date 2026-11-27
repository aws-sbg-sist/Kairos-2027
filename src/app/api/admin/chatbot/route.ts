import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  getTelemetrySnapshot,
  getRateLimitConfig,
  setMaintenanceMode,
  resetDailyBudgetCounter,
  resetRateLimitStoresForTesting
} from '@/lib/ratelimit';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';
import { safeParseJson } from '@/lib/http';

/**
 * PRODUCTION CHATBOT ADMIN & TELEMETRY CONTROLS
 * Provides real-time metrics, budget tracking, maintenance mode toggle, and quota controls.
 */

async function isAuthorizedAdmin(req: NextRequest): Promise<boolean> {
  // 1. Standard Super Admin RBAC session
  const authCtx = await resolveAuthContext();
  if (hasPermission(authCtx.role, 'system:admin')) {
    return true;
  }

  // 2. Optional explicit machine-to-machine ADMIN_API_KEY (never hardcoded)
  const masterKey = process.env.ADMIN_API_KEY?.trim();
  if (!masterKey) return false;

  const authHeader = req.headers.get('authorization');
  const customHeader = req.headers.get('x-admin-key');
  const candidate = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : customHeader?.trim();

  if (!candidate) return false;

  const bufA = Buffer.from(candidate, 'utf8');
  const bufB = Buffer.from(masterKey, 'utf8');
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorizedAdmin(req))) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Super Admin session or valid ADMIN_API_KEY required.' },
      { status: 401 }
    );
  }

  const telemetry = getTelemetrySnapshot();
  const config = getRateLimitConfig();

  return NextResponse.json({
    success: true,
    telemetry,
    config,
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorizedAdmin(req))) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Super Admin session or valid ADMIN_API_KEY required.' },
      { status: 401 }
    );
  }

  const parsed = await safeParseJson(req);
  if (!parsed.ok) return parsed.response;

  try {
    const body = parsed.data;
    const action = body?.action;

    switch (action) {
      case 'toggle_maintenance': {
        const enabled = Boolean(body.enabled);
        setMaintenanceMode(enabled);
        return NextResponse.json({
          success: true,
          message: `Maintenance mode ${enabled ? 'ENABLED' : 'DISABLED'}.`,
          telemetry: getTelemetrySnapshot()
        });
      }

      case 'reset_budget': {
        resetDailyBudgetCounter();
        return NextResponse.json({
          success: true,
          message: 'Daily token consumption counter has been reset to 0.',
          telemetry: getTelemetrySnapshot()
        });
      }

      case 'reset_telemetry': {
        resetRateLimitStoresForTesting();
        return NextResponse.json({
          success: true,
          message: 'All chatbot rate limit stores and telemetry counters have been reset.',
          telemetry: getTelemetrySnapshot()
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: `Unknown action: '${action}'. Supported actions: 'toggle_maintenance', 'reset_budget', 'reset_telemetry'.`
          },
          { status: 400 }
        );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Malformed JSON or request error.' },
      { status: 400 }
    );
  }
}

