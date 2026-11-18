-- ==============================================================================
-- KAIROS 2027: SUPABASE POSTGRESQL ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 20261112000002_row_level_security_policies.sql
-- Description: Strict least-privilege security policies protecting participant,
--              judge, financial, and evaluation data.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. ENABLE RLS ON ALL TABLES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radar_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.csat_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_members ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. SERVICE ROLE / ADMIN BYPASS POLICIES
-- Backend server routes running with the service_role key have full CRUD access.
-- ------------------------------------------------------------------------------
CREATE POLICY "service_role_all_profiles" ON public.profiles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_waitlist" ON public.waitlist FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_teams" ON public.teams FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_team_members" ON public.team_members FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_sponsors" ON public.sponsors FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_referrals" ON public.referrals FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_feature_flags" ON public.feature_flags FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_audit_logs" ON public.audit_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_radar_signals" ON public.radar_signals FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_judges" ON public.judges FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_evaluations" ON public.evaluations FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_csat_responses" ON public.csat_responses FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_org_members" ON public.org_members FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 3. PROFILES POLICIES
-- Anonymous: No access
-- Authenticated: Can select and update their own profile only
-- ------------------------------------------------------------------------------
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated
    USING (auth.uid()::text = id OR auth.jwt() ->> 'email' = email);

CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
    USING (auth.uid()::text = id OR auth.jwt() ->> 'email' = email)
    WITH CHECK (auth.uid()::text = id OR auth.jwt() ->> 'email' = email);

-- ------------------------------------------------------------------------------
-- 4. WAITLIST POLICIES
-- Anonymous / Authenticated: Can INSERT a new registration
-- Viewing waitlist registrations is strictly restricted to service_role / admin
-- ------------------------------------------------------------------------------
CREATE POLICY "waitlist_anon_insert" ON public.waitlist FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "waitlist_select_own" ON public.waitlist FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'email' = email);

-- ------------------------------------------------------------------------------
-- 5. TEAMS & TEAM MEMBERS POLICIES
-- Anonymous: Can select public presentation info for qualified teams
-- Authenticated: Can select full team details if they are a member
-- ------------------------------------------------------------------------------
CREATE POLICY "teams_public_select_qualified" ON public.teams FOR SELECT TO anon, authenticated
    USING (selection_stage IN ('ONLINE_SEMI_FINALIST', 'ON_CAMPUS_QUALIFIED'));

CREATE POLICY "teams_select_own" ON public.teams FOR SELECT TO authenticated
    USING (
        leader_email = (auth.jwt() ->> 'email') OR
        id IN (SELECT team_id FROM public.team_members WHERE email = (auth.jwt() ->> 'email'))
    );

CREATE POLICY "teams_update_leader" ON public.teams FOR UPDATE TO authenticated
    USING (leader_email = (auth.jwt() ->> 'email'))
    WITH CHECK (leader_email = (auth.jwt() ->> 'email'));

CREATE POLICY "team_members_select_own_team" ON public.team_members FOR SELECT TO authenticated
    USING (
        team_id IN (SELECT id FROM public.teams WHERE leader_email = (auth.jwt() ->> 'email')) OR
        team_id IN (SELECT team_id FROM public.team_members WHERE email = (auth.jwt() ->> 'email'))
    );

-- ------------------------------------------------------------------------------
-- 6. SPONSORS POLICIES
-- Anonymous: Can submit sponsor inquiry (INSERT)
-- Reading sponsor leads is restricted to service_role / admin
-- ------------------------------------------------------------------------------
CREATE POLICY "sponsors_anon_insert" ON public.sponsors FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 7. REFERRALS (RAINMAKER) POLICIES
-- Anonymous: Can submit referral lead (INSERT)
-- Authenticated: Can view their own submitted referral leads
-- ------------------------------------------------------------------------------
CREATE POLICY "referrals_anon_insert" ON public.referrals FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "referrals_select_own" ON public.referrals FOR SELECT TO authenticated
    USING (referrer_email = (auth.jwt() ->> 'email'));

-- ------------------------------------------------------------------------------
-- 8. FEATURE FLAGS POLICIES
-- Public: Anyone can read operational feature flags
-- Write: Restricted to service_role / admin
-- ------------------------------------------------------------------------------
CREATE POLICY "feature_flags_public_read" ON public.feature_flags FOR SELECT TO anon, authenticated
    USING (true);

-- ------------------------------------------------------------------------------
-- 9. AUDIT LOGS POLICIES
-- Completely hidden from anonymous and regular authenticated users
-- Only service_role / admin has access (governed by policy above)
-- ------------------------------------------------------------------------------
-- (No public or authenticated policies added - strict default DENY)

-- ------------------------------------------------------------------------------
-- 10. RADAR SIGNALS POLICIES
-- Public: Anyone can read active builder beacons and post a beacon
-- ------------------------------------------------------------------------------
CREATE POLICY "radar_signals_public_read" ON public.radar_signals FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "radar_signals_public_insert" ON public.radar_signals FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 11. JUDGES & EVALUATIONS POLICIES
-- Completely hidden from anonymous users.
-- Rubric scores, evaluations, and judge feedback are confidential
-- ------------------------------------------------------------------------------
CREATE POLICY "judges_authenticated_select" ON public.judges FOR SELECT TO authenticated
    USING (is_active = true);

-- ------------------------------------------------------------------------------
-- 12. CSAT RESPONSES POLICIES
-- Anonymous: Can submit survey feedback (INSERT)
-- Reading feedback is strictly restricted to service_role / admin (contains private sentiment)
-- ------------------------------------------------------------------------------
CREATE POLICY "csat_anon_insert" ON public.csat_responses FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 13. ORG MEMBERS POLICIES
-- Public: Anyone can view the organizing committee roster and credentials
-- ------------------------------------------------------------------------------
CREATE POLICY "org_members_public_read" ON public.org_members FOR SELECT TO anon, authenticated
    USING (true);
