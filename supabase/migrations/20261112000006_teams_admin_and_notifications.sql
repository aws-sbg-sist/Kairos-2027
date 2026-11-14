-- ==============================================================================
-- KAIROS 2027: TEAMS ADMIN EXTENSION & NOTIFICATION LOGS SCHEMA
-- Migration: 20261112000006_teams_admin_and_notifications.sql
-- Description: Adds missing administrative review & check-in columns to public.teams
--              and creates the persistent notification_logs table with RLS.
-- ==============================================================================

-- 1. Extend public.teams with administrative review and venue check-in telemetry
ALTER TABLE public.teams 
    ADD COLUMN IF NOT EXISTS reviewer_notes TEXT,
    ADD COLUMN IF NOT EXISTS reviewed_by TEXT,
    ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS checked_in_by TEXT;

CREATE INDEX IF NOT EXISTS idx_teams_checked_in ON public.teams (checked_in);
CREATE INDEX IF NOT EXISTS idx_teams_selection_stage ON public.teams (selection_stage);

-- 2. Create public.notification_logs for AWS SES transactional audit telemetry
CREATE TABLE IF NOT EXISTS public.notification_logs (
    id TEXT PRIMARY KEY DEFAULT ('notif-' || gen_random_uuid()::text),
    recipient TEXT NOT NULL,
    subject TEXT NOT NULL,
    template TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('DELIVERED', 'SIMULATED', 'SUPPRESSED_DUPLICATE', 'FAILED')),
    attempts INTEGER NOT NULL DEFAULT 1,
    idempotency_key TEXT,
    message_id TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for notification lookup & deduplication
CREATE INDEX IF NOT EXISTS idx_notification_logs_recipient ON public.notification_logs (recipient);
CREATE INDEX IF NOT EXISTS idx_notification_logs_idempotency_key ON public.notification_logs (idempotency_key);
CREATE INDEX IF NOT EXISTS idx_notification_logs_created_at ON public.notification_logs (created_at DESC);

-- 3. Row Level Security for notification_logs
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all_notification_logs" ON public.notification_logs 
    FOR ALL TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Authenticated users can view notifications sent to their own email address
CREATE POLICY "notification_logs_select_own" ON public.notification_logs 
    FOR SELECT TO authenticated 
    USING (recipient = (auth.jwt() ->> 'email'));

-- 4. Ensure RLS is enabled on role_permissions (from Migration 000005)
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all_role_permissions" ON public.role_permissions 
    FOR ALL TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Public read access on role_permissions for authenticated and anonymous users
CREATE POLICY "role_permissions_public_read" ON public.role_permissions 
    FOR SELECT TO anon, authenticated 
    USING (true);
