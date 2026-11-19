-- KAIROS 2027 — signed GitHub push telemetry

CREATE TABLE IF NOT EXISTS public.github_commit_events (
    id TEXT PRIMARY KEY,
    delivery_id TEXT NOT NULL,
    team_id TEXT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    team_code TEXT NOT NULL,
    repository TEXT NOT NULL,
    branch TEXT NOT NULL,
    sha TEXT NOT NULL,
    short_sha TEXT NOT NULL,
    message TEXT NOT NULL,
    author_name TEXT NOT NULL,
    committed_at TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    after_freeze BOOLEAN NOT NULL DEFAULT FALSE,
    url TEXT,
    CONSTRAINT github_commit_events_delivery_sha_unique UNIQUE (delivery_id, sha)
);

CREATE INDEX IF NOT EXISTS idx_github_commit_events_team
    ON public.github_commit_events (team_id, committed_at DESC);
CREATE INDEX IF NOT EXISTS idx_github_commit_events_committed_at
    ON public.github_commit_events (committed_at DESC);
CREATE INDEX IF NOT EXISTS idx_github_commit_events_after_freeze
    ON public.github_commit_events (after_freeze)
    WHERE after_freeze = TRUE;

ALTER TABLE public.github_commit_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all_github_commit_events" ON public.github_commit_events;
CREATE POLICY "service_role_all_github_commit_events"
    ON public.github_commit_events
    FOR ALL
    TO service_role
    USING (TRUE)
    WITH CHECK (TRUE);

COMMENT ON TABLE public.github_commit_events IS
    'Sanitized, HMAC-verified GitHub push metadata for KAIROS finalist repositories.';
