import { NextRequest, NextResponse } from 'next/server';
import { getDbDriver, postgresDb } from '@/lib/db';
import { getSupabaseAdminClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const timestamp = new Date().toISOString();

  try {
    const driver = getDbDriver();

    if (driver === 'supabase') {
      if (!postgresDb.isAvailable()) {
        return NextResponse.json(
          {
            status: 'unhealthy',
            database: 'unavailable',
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
            database: 'unconfigured',
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
            database: 'unreachable',
            timestamp
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          status: 'healthy',
          database: 'connected',
          timestamp
        },
        { status: 200 }
      );
    }

    // Local JSON development mode (prohibited in production by getDbDriver())
    return NextResponse.json(
      {
        status: 'healthy',
        database: 'connected',
        driver: 'local_json',
        timestamp
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('[HEALTH CHECK] Unhandled database health failure:', err?.message || 'Unknown error');
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'error',
        timestamp
      },
      { status: 503 }
    );
  }
}
