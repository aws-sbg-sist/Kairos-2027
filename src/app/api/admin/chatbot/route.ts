import { NextRequest, NextResponse } from 'next/server';
import {
  getTelemetrySnapshot,
  getRateLimitConfig,
  setMaintenanceMode,
  resetDailyBudgetCounter,
  resetRateLimitStoresForTesting
} from '@/lib/ratelimit';

/**
 * PRODUCTION CHATBOT ADMIN & TELEMETRY CONTROLS
 * Provides real-time metrics, budget tracking, maintenance mode toggle, and quota controls.
 */

function isAuthorizedAdmin(req: NextRequest): boolean {
  const masterKey = process.env.ADMIN_API_KEY || 'kairos-admin-master-key-2027';
  const authHeader = req.headers.get('authorization');
  const customHeader = req.headers.get('x-admin-key');

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token === masterKey) return true;
  }

  if (customHeader && customHeader.trim() === masterKey) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid admin credentials.' },
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
  if (!isAuthorizedAdmin(req)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid admin credentials.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
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

