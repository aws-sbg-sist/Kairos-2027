import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { EVENT_CONFIG } from '@/lib/config';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';
import {
  normalizeGitHubRepository,
  sanitizeCommitMessage,
  verifyGitHubWebhookSignature,
} from '@/lib/github-webhook';
import { GitHubCommitEvent } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface GitHubPushCommit {
  id?: string;
  message?: string;
  timestamp?: string;
  url?: string;
  distinct?: boolean;
  author?: { name?: string };
}

interface GitHubWebhookPayload {
  ref?: string;
  repository?: { full_name?: string; html_url?: string };
  commits?: GitHubPushCommit[];
  head_commit?: GitHubPushCommit | null;
  zen?: string;
}

function velocityLabel(commitCount: number): string {
  if (commitCount >= 10) return 'High Velocity';
  if (commitCount >= 4) return 'Sustained Velocity';
  if (commitCount > 0) return 'Active';
  return 'No Telemetry';
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  if (Buffer.byteLength(rawBody, 'utf8') > 2 * 1024 * 1024) {
    return NextResponse.json({ success: false, error: 'Webhook payload exceeds 2 MB.' }, { status: 413 });
  }

  let payload: GitHubWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as GitHubWebhookPayload;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const repository = normalizeGitHubRepository(payload.repository?.full_name || payload.repository?.html_url || '');
  const teams = await db.getTeams();
  const team = teams.find(
    (candidate) => candidate.githubUrl && normalizeGitHubRepository(candidate.githubUrl) === repository
  );
  if (!team || !repository) {
    return NextResponse.json({ success: false, error: 'Repository is not registered to a KAIROS team.' }, { status: 404 });
  }

  const secret = team.commitWebhookSecret || process.env.GITHUB_WEBHOOK_SECRET || '';
  const signature = req.headers.get('x-hub-signature-256') || '';
  if (!secret) {
    return NextResponse.json({ success: false, error: 'Webhook ingestion is not configured.' }, { status: 503 });
  }
  if (!verifyGitHubWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ success: false, error: 'Invalid webhook signature.' }, { status: 401 });
  }

  const eventName = req.headers.get('x-github-event') || '';
  if (eventName === 'ping') {
    return NextResponse.json({ success: true, event: 'ping', repository });
  }
  if (eventName !== 'push') {
    return NextResponse.json({ success: true, ignored: true, event: eventName || 'unknown' });
  }

  const deliveryId = req.headers.get('x-github-delivery') || '';
  if (!deliveryId || deliveryId.length > 100) {
    return NextResponse.json({ success: false, error: 'Missing or invalid GitHub delivery ID.' }, { status: 400 });
  }

  const branch = (payload.ref || '').replace(/^refs\/heads\//, '').slice(0, 200) || 'unknown';
  const freezeAt = new Date(process.env.GITHUB_COMMIT_FREEZE_AT || EVENT_CONFIG.dates.codeFreezeDate).getTime();
  const rawCommits = Array.isArray(payload.commits) ? payload.commits.slice(0, 100) : [];
  const receivedAt = new Date().toISOString();

  const events: GitHubCommitEvent[] = rawCommits
    .filter((commit) => commit.distinct !== false && typeof commit.id === 'string' && /^[a-f0-9]{7,64}$/i.test(commit.id))
    .map((commit) => {
      const committedAt = commit.timestamp && Number.isFinite(new Date(commit.timestamp).getTime())
        ? new Date(commit.timestamp).toISOString()
        : receivedAt;
      return {
        id: `${deliveryId}:${commit.id}`,
        deliveryId,
        teamId: team.id,
        teamCode: team.teamCode || team.id,
        repository,
        branch,
        sha: commit.id!,
        shortSha: commit.id!.slice(0, 7),
        message: sanitizeCommitMessage(commit.message),
        authorName: typeof commit.author?.name === 'string' ? commit.author.name.slice(0, 120) : 'GitHub contributor',
        committedAt,
        receivedAt,
        afterFreeze: Number.isFinite(freezeAt) && new Date(committedAt).getTime() > freezeAt,
        url: typeof commit.url === 'string' && commit.url.startsWith('https://github.com/') ? commit.url : undefined,
      };
    });

  const result = await db.addCommitEvents(events);
  await db.addAuditLog(
    'GitHub Telemetry',
    'GITHUB_PUSH_RECEIVED',
    `${team.teamCode || team.id}: ${result.inserted} commit(s) recorded from ${repository}@${branch}; ${result.duplicates} duplicate(s).`
  );

  return NextResponse.json({
    success: true,
    teamCode: team.teamCode,
    repository,
    branch,
    inserted: result.inserted,
    duplicates: result.duplicates,
    afterFreeze: events.filter((event) => event.afterFreeze).length,
  });
}

export async function GET(req: NextRequest) {
  const rateLimitResult = checkRateLimit(req, { limit: 120, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  const events = await db.getCommitEvents();
  const teams = await db.getTeams();
  const teamStats = teams.map((team) => {
    const teamEvents = events.filter((event) => event.teamId === team.id);
    return {
      teamId: team.id,
      teamCode: team.teamCode,
      commitCount: teamEvents.length,
      afterFreezeCount: teamEvents.filter((event) => event.afterFreeze).length,
      lastCommitAt: teamEvents[0]?.committedAt || null,
      velocity: velocityLabel(teamEvents.length),
    };
  });

  return NextResponse.json({
    success: true,
    source: events.length > 0 ? 'github-webhook' : 'awaiting-webhooks',
    totalCommits: events.length,
    teamStats,
    recentCommits: events.slice(0, 20).map((event) => ({
      teamCode: event.teamCode,
      repository: event.repository,
      branch: event.branch,
      shortSha: event.shortSha,
      message: event.message,
      committedAt: event.committedAt,
      afterFreeze: event.afterFreeze,
      url: event.url,
    })),
  });
}
