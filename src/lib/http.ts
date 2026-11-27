import { NextRequest, NextResponse } from 'next/server';

export async function safeParseJson<T = Record<string, any>>(
  req: NextRequest
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {
        ok: false,
        response: NextResponse.json(
          { success: false, error: 'Request body must be a JSON object.', code: 'INVALID_JSON' },
          { status: 400 }
        ),
      };
    }
    return { ok: true, data: parsed as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: 'Malformed JSON request body.', code: 'INVALID_JSON' },
        { status: 400 }
      ),
    };
  }
}

export function isValidHttpUrl(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.startsWith('/uploads/submissions/')) {
    return !trimmed.includes('..');
  }
  try {
    const url = new URL(trimmed);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}
