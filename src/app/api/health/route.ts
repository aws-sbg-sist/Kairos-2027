import { NextRequest, NextResponse } from 'next/server';
import { getDbDriver, postgresDb } from '@/lib/db';
import { getSupabaseAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const timestamp = new Date().toISOString();
  const mem = process.memoryUsage();
  const memoryInfo = {
    rssMB: Math.round(mem.rss / 1024 / 1024),
    heapUsedMB: Math.round(mem.heapUsed / 1024 / 1024),
    heapTotalMB: Math.round(mem.heapTotal / 1024 / 1024),
  };

  try {
    const driver = getDbDriver();

    if (driver === 'supabase') {
      if (!postgresDb.isAvailable()) {
        return NextResponse.json(
          {
            status: 'unhealthy',
            service: 'kairos-2027',
            database: 'unavailable',
            uptimeSeconds: Math.round(process.uptime()),
            memory: memoryInfo,
            timestamp
          },
          { status: 503 }
        );
      }

      const client = getSupabaseAdminClient();
      if (!client) {
        return NextResponse.json(
          {
            status: 'unhealthy',
            service: 'kairos-2027',
            database: 'unconfigured',
            uptimeSeconds: Math.round(process.uptime()),
            memory: memoryInfo,
            timestamp
          },
          { status: 503 }
        );
      }

      // Execute a lightweight query to verify active PostgreSQL connection
      const { error } = await client.from('feature_flags').select('id').limit(1);
      if (error) {
        console.error('[HEALTH CHECK] Supabase connection probe failed:', error.message);
        return NextResponse.json(
          {
            status: 'unhealthy',
            service: 'kairos-2027',
            database: 'unreachable',
            uptimeSeconds: Math.round(process.uptime()),
            memory: memoryInfo,
            timestamp
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          status: 'healthy',
          service: 'kairos-2027',
          database: 'connected',
          uptimeSeconds: Math.round(process.uptime()),
          memory: memoryInfo,
          timestamp
        },
        { status: 200 }
      );
    }

    // Local JSON development mode (prohibited in production by getDbDriver())
    return NextResponse.json(
      {
        status: 'healthy',
        service: 'kairos-2027',
        database: 'connected',
        driver: 'local_json',
        uptimeSeconds: Math.round(process.uptime()),
        memory: memoryInfo,
        timestamp
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[HEALTH CHECK] Unhandled database health failure:', err?.message || 'Unknown error');
    return NextResponse.json(
      {
        status: 'unhealthy',
        service: 'kairos-2027',
        database: 'error',
        uptimeSeconds: Math.round(process.uptime()),
        memory: memoryInfo,
        timestamp
      },
      { status: 503 }
    );
  }
}
