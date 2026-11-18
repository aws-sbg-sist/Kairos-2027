-- ==============================================================================
-- KAIROS 2027: POSTGRESQL ROLLBACK & RECOVERY GUIDANCE
-- Migration: 20261112000003_rollback_guidance.sql
-- Description: Standard operating procedures for safe, controlled rollback
--              and disaster recovery of the Supabase PostgreSQL database.
-- ==============================================================================

/*
================================================================================
ROLLBACK POLICY & SAFETY DIRECTIVES:
================================================================================
1. DO NOT run DROP SCHEMA public CASCADE in a production environment.
2. In production, always perform an atomic logical backup (pg_dump) prior to any
   schema modification.
3. If a rollback is required, follow the tiered procedures below.
*/

-- ------------------------------------------------------------------------------
-- TIER 1: ROLLBACK ROW LEVEL SECURITY POLICIES ONLY
-- Use this if an RLS policy unintentionally restricts legitimate traffic.
-- ------------------------------------------------------------------------------
/*
DROP POLICY IF EXISTS "service_role_all_profiles" ON public.profiles;
DROP POLICY IF EXISTS "service_role_all_waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "service_role_all_teams" ON public.teams;
DROP POLICY IF EXISTS "service_role_all_team_members" ON public.team_members;
DROP POLICY IF EXISTS "service_role_all_sponsors" ON public.sponsors;
DROP POLICY IF EXISTS "service_role_all_referrals" ON public.referrals;
DROP POLICY IF EXISTS "service_role_all_feature_flags" ON public.feature_flags;
DROP POLICY IF EXISTS "service_role_all_audit_logs" ON public.audit_logs;
DROP POLICY IF EXISTS "service_role_all_radar_signals" ON public.radar_signals;
DROP POLICY IF EXISTS "service_role_all_judges" ON public.judges;
DROP POLICY IF EXISTS "service_role_all_evaluations" ON public.evaluations;
DROP POLICY IF EXISTS "service_role_all_csat_responses" ON public.csat_responses;
DROP POLICY IF EXISTS "service_role_all_org_members" ON public.org_members;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "waitlist_anon_insert" ON public.waitlist;
DROP POLICY IF EXISTS "waitlist_select_own" ON public.waitlist;
DROP POLICY IF EXISTS "teams_public_select_qualified" ON public.teams;
DROP POLICY IF EXISTS "teams_select_own" ON public.teams;
DROP POLICY IF EXISTS "teams_update_leader" ON public.teams;
DROP POLICY IF EXISTS "team_members_select_own_team" ON public.team_members;
DROP POLICY IF EXISTS "sponsors_anon_insert" ON public.sponsors;
DROP POLICY IF EXISTS "referrals_anon_insert" ON public.referrals;
DROP POLICY IF EXISTS "referrals_select_own" ON public.referrals;
DROP POLICY IF EXISTS "feature_flags_public_read" ON public.feature_flags;
DROP POLICY IF EXISTS "radar_signals_public_read" ON public.radar_signals;
DROP POLICY IF EXISTS "radar_signals_public_insert" ON public.radar_signals;
DROP POLICY IF EXISTS "judges_authenticated_select" ON public.judges;
DROP POLICY IF EXISTS "csat_anon_insert" ON public.csat_responses;
DROP POLICY IF EXISTS "org_members_public_read" ON public.org_members;
*/

-- ------------------------------------------------------------------------------
-- TIER 2: COMPLETE TABLE TEARDOWN (NON-PRODUCTION / LOCAL DEV RE-INIT ONLY)
-- Reverses 20261112000001_initial_kairos_schema.sql in reverse dependency order.
-- ------------------------------------------------------------------------------
/*
DROP TABLE IF EXISTS public.org_members CASCADE;
DROP TABLE IF EXISTS public.csat_responses CASCADE;
DROP TABLE IF EXISTS public.evaluations CASCADE;
DROP TABLE IF EXISTS public.judges CASCADE;
DROP TABLE IF EXISTS public.radar_signals CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.feature_flags CASCADE;
DROP TABLE IF EXISTS public.referrals CASCADE;
DROP TABLE IF EXISTS public.sponsors CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.waitlist CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP FUNCTION IF EXISTS public.handle_updated_at CASCADE;
*/

-- ------------------------------------------------------------------------------
-- TIER 3: DISASTER RECOVERY & JSON FAILOVER
-- If PostgreSQL becomes unavailable or credentials fail, the application 
-- gracefully falls back to the deterministic JSON store (data/kairos_store.json)
-- by unsetting KAIROS_DB_DRIVER or setting KAIROS_DB_DRIVER=json in .env.local.
-- ------------------------------------------------------------------------------
