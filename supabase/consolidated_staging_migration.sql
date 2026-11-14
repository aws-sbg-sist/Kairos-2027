/*
================================================================================
   KAIROS 2027 — CONSOLIDATED STAGING POSTGRESQL MIGRATION BUNDLE
   Generated on: 2026-11-13T18:30:19.363Z
   Target: Supabase PostgreSQL (Staging / Production)
   Execution Mode: Single Atomic Transaction (BEGIN ... COMMIT)
================================================================================
   Execution order:
     1. 20261112000001_initial_kairos_schema.sql (SHA-256: 1cff193a2290e1357a9e5b4e42645ef804d12139a1421fee5d42f54a61c61928)
     2. 20261112000002_row_level_security_policies.sql (SHA-256: 740a9c0707da89373145f8a9ddac7328f040f300142e749fcf4477f4e57f9473)
     3. 20261112000004_student_auth.sql (SHA-256: 91b5a3f32c8fe37b1a1eaac1709de0f259aa44f5cbbbfd79793e3d412cd2a226)
     4. 20261112000005_rbac_schema.sql (SHA-256: 6afadb717be428ecb322df96b059d7de6e218849311e19d12f22624a87d4c5e6)
     5. 20261112000006_teams_admin_and_notifications.sql (SHA-256: f2372761d5b9b9633698a89afe3b6a1e87a5864a7d7548992c3a824080540e53)
================================================================================
*/

BEGIN;

-- ============================================================================
-- SCHEMA MIGRATION TRACKING TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public._schema_migrations (
  version VARCHAR(255) PRIMARY KEY,
  checksum VARCHAR(64) NOT NULL,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public._schema_migrations ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = '_schema_migrations' AND policyname = 'service_role_all_schema_migrations'
  ) THEN
    CREATE POLICY "service_role_all_schema_migrations" ON public._schema_migrations FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ============================================================================
-- FRESH-DATABASE GUARD & PREFLIGHT CHECKSUM VERIFICATION (OPTION B)
-- ============================================================================
DO $$
DECLARE
  v_rec RECORD;
  v_expected_checksum TEXT;
  v_applied_count INT := 0;
BEGIN
  -- 1. Fresh-database guard: abort if any forward migration was already recorded
  SELECT COUNT(*) INTO v_applied_count 
  FROM public._schema_migrations 
  WHERE version IN (
    '20261112000001_initial_kairos_schema.sql',
    '20261112000002_row_level_security_policies.sql',
    '20261112000004_student_auth.sql',
    '20261112000005_rbac_schema.sql',
    '20261112000006_teams_admin_and_notifications.sql'
  );

  IF v_applied_count > 0 THEN
    RAISE EXCEPTION 'FRESH-DATABASE PROVISIONING GUARD: Detected % forward migration(s) already recorded in public._schema_migrations. This consolidated staging bundle is strictly fresh-database-only. Incremental migrations must be applied individually. Aborting execution.', v_applied_count;
  END IF;

  -- 2. Verify checksum of any other existing records in _schema_migrations to prevent tampering
  FOR v_rec IN SELECT version, checksum FROM public._schema_migrations LOOP
    v_expected_checksum := CASE v_rec.version
      WHEN '20261112000001_initial_kairos_schema.sql' THEN '1cff193a2290e1357a9e5b4e42645ef804d12139a1421fee5d42f54a61c61928'
      WHEN '20261112000002_row_level_security_policies.sql' THEN '740a9c0707da89373145f8a9ddac7328f040f300142e749fcf4477f4e57f9473'
      WHEN '20261112000004_student_auth.sql' THEN '91b5a3f32c8fe37b1a1eaac1709de0f259aa44f5cbbbfd79793e3d412cd2a226'
      WHEN '20261112000005_rbac_schema.sql' THEN '6afadb717be428ecb322df96b059d7de6e218849311e19d12f22624a87d4c5e6'
      WHEN '20261112000006_teams_admin_and_notifications.sql' THEN 'f2372761d5b9b9633698a89afe3b6a1e87a5864a7d7548992c3a824080540e53'
      ELSE NULL
    END;

    IF v_expected_checksum IS NOT NULL AND v_rec.checksum <> v_expected_checksum THEN
      RAISE EXCEPTION 'MIGRATION INTEGRITY ERROR: Checksum mismatch for migration "%". Stored DB Checksum: %, Expected Checksum: %. Transaction aborted.',
        v_rec.version, v_rec.checksum, v_expected_checksum;
    END IF;
  END LOOP;
END $$;

-- ============================================================================
-- MIGRATION: 20261112000001_initial_kairos_schema.sql
-- ============================================================================
-- ==============================================================================
-- KAIROS 2027: SUPABASE POSTGRESQL INITIAL SCHEMA MIGRATION
-- Migration: 20261112000001_initial_kairos_schema.sql
-- Description: Production schema replacing flat JSON store (kairos_store.json)
-- ==============================================================================

-- Enable essential cryptographic and UUID extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. PROFILES (Normalized Identity Core)
-- ------------------------------------------------------------------------------
-- Centralizes participant and organizer identities, eliminating redundant
-- email/name duplication across waitlist, teams, referrals, and CSAT records.
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    institution TEXT NOT NULL DEFAULT 'Sathyabama Institute of Science and Technology',
    college_reg_no TEXT,
    year_of_study TEXT,
    department TEXT,
    portfolio_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    meetup_profile_url TEXT,
    meetup_member_id TEXT,
    meetup_rsvp_verified BOOLEAN NOT NULL DEFAULT false,
    aws_builder_center_url TEXT,
    tshirt_size TEXT CHECK (tshirt_size IN ('S', 'M', 'L', 'XL', 'XXL', '3XL', NULL)),
    hoodie_size TEXT CHECK (hoodie_size IN ('S', 'M', 'L', 'XL', 'XXL', '3XL', NULL)),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON public.profiles (institution);

-- ------------------------------------------------------------------------------
-- 2. WAITLIST (Participant Pre-Registration & Round 0 Intake)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.waitlist (
    id TEXT PRIMARY KEY DEFAULT ('w-' || gen_random_uuid()::text),
    profile_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    institution TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    department TEXT NOT NULL,
    preferred_track TEXT NOT NULL,
    portfolio_url TEXT,
    motivation TEXT,
    team_status TEXT DEFAULT 'seeking_team',
    team_code TEXT,
    experience_level TEXT DEFAULT 'intermediate',
    tshirt_size TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'waitlisted', 'rejected')),
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist (status);
CREATE INDEX IF NOT EXISTS idx_waitlist_track ON public.waitlist (preferred_track);
CREATE INDEX IF NOT EXISTS idx_waitlist_profile_id ON public.waitlist (profile_id);

-- ------------------------------------------------------------------------------
-- 3. TEAMS (Hackathon Squads & Submissions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.teams (
    id TEXT PRIMARY KEY DEFAULT ('team-' || gen_random_uuid()::text),
    team_code TEXT UNIQUE,
    team_name TEXT NOT NULL,
    invite_code TEXT UNIQUE NOT NULL,
    track_id TEXT NOT NULL,
    institution_name TEXT DEFAULT 'Sathyabama Institute of Science and Technology',
    city TEXT DEFAULT 'Chennai',
    state TEXT DEFAULT 'Tamil Nadu',
    leader_profile_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    leader_email TEXT NOT NULL,
    selection_stage TEXT NOT NULL DEFAULT 'ROUND_0_APPLICANT' CHECK (selection_stage IN ('ROUND_0_APPLICANT', 'ONLINE_SEMI_FINALIST', 'ON_CAMPUS_QUALIFIED', 'DISQUALIFIED')),
    status TEXT NOT NULL DEFAULT 'pending',
    problem_title TEXT,
    problem_abstract TEXT,
    project_title TEXT,
    project_abstract TEXT,
    architecture_pdf_url TEXT,
    github_url TEXT,
    commit_webhook_secret TEXT DEFAULT encode(gen_random_bytes(16), 'hex'),
    
    -- Round 1 Online Qualifier
    loom_video_url TEXT,
    online_qualifier_score NUMERIC(5, 2),
    online_defense_slot TIMESTAMPTZ,
    online_meet_room_id TEXT,

    -- Round 2 On-Campus Logistics
    desk_bay_allocation TEXT,
    checked_in BOOLEAN NOT NULL DEFAULT false,
    checked_in_at TIMESTAMPTZ,

    -- AWS Credits Voucher
    aws_credit_voucher TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_teams_team_code ON public.teams (team_code);
CREATE INDEX IF NOT EXISTS idx_teams_invite_code ON public.teams (invite_code);
CREATE INDEX IF NOT EXISTS idx_teams_track_id ON public.teams (track_id);
CREATE INDEX IF NOT EXISTS idx_teams_selection_stage ON public.teams (selection_stage);

-- ------------------------------------------------------------------------------
-- 4. TEAM MEMBERS (Join Table & Roster)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY DEFAULT ('tm-' || gen_random_uuid()::text),
    team_id TEXT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    profile_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    college_reg_no TEXT,
    role TEXT NOT NULL CHECK (role IN ('Leader', 'Frontend', 'Backend', 'AI / Cloud', 'UI/UX')),
    college TEXT NOT NULL,
    meetup_profile_url TEXT,
    meetup_member_id TEXT,
    meetup_rsvp_verified BOOLEAN NOT NULL DEFAULT false,
    aws_builder_center_url TEXT,
    tshirt_size TEXT CHECK (tshirt_size IN ('S', 'M', 'L', 'XL', 'XXL', NULL)),
    hoodie_size TEXT CHECK (hoodie_size IN ('S', 'M', 'L', 'XL', 'XXL', NULL)),
    bus_route TEXT,
    confirmed BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_team_member_per_team UNIQUE (team_id, email)
);

CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON public.team_members (team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_profile_id ON public.team_members (profile_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON public.team_members (email);

-- ------------------------------------------------------------------------------
-- 5. SPONSORS (Partner Inquiries & Pipeline)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sponsors (
    id TEXT PRIMARY KEY DEFAULT ('sp-' || gen_random_uuid()::text),
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    interested_tier TEXT NOT NULL CHECK (interested_tier IN ('title', 'powered_by', 'gold', 'track', 'in_kind', 'custom')),
    custom_requirements TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'negotiation', 'confirmed', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_sponsors_status ON public.sponsors (status);
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON public.sponsors (interested_tier);

-- ------------------------------------------------------------------------------
-- 6. REFERRALS (Rainmaker Cash Incentive Program)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.referrals (
    id TEXT PRIMARY KEY DEFAULT ('ref-' || gen_random_uuid()::text),
    referral_code TEXT UNIQUE NOT NULL,
    referrer_profile_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    referrer_name TEXT NOT NULL,
    referrer_email TEXT NOT NULL,
    referrer_phone TEXT,
    referrer_college TEXT,
    referrer_upi_id TEXT,
    company_name TEXT NOT NULL,
    decision_maker_name TEXT,
    decision_maker_email TEXT,
    decision_maker_designation TEXT,
    company_poc_name TEXT,
    company_poc_role TEXT,
    company_poc_contact TEXT,
    target_tier TEXT DEFAULT 'Track Partner (₹50,000)',
    intro_context TEXT,
    estimated_deal_tier TEXT,
    notes TEXT,
    lock_expiry_date TIMESTAMPTZ NOT NULL DEFAULT (timezone('utc'::text, now()) + interval '21 days'),
    status TEXT NOT NULL DEFAULT 'LEAD_SUBMITTED' CHECK (status IN (
        'LEAD_SUBMITTED', 'DISCOVERY_SCHEDULED', 'PROPOSAL_PITCHED', 
        'DEAL_CLOSED', 'PAYOUT_CLEARED', 'PENDING_REVIEW', 
        'IN_DISCUSSIONS', 'CONTRACT_SIGNED', 'PAID_OUT'
    )),
    commission_rate TEXT DEFAULT '10%',
    estimated_payout TEXT,
    payout_amount NUMERIC(10, 2),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals (referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON public.referrals (status);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_email ON public.referrals (referrer_email);

-- ------------------------------------------------------------------------------
-- 7. FEATURE FLAGS (Operational Controls & Kill Switches)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.feature_flags (
    id TEXT PRIMARY KEY DEFAULT 'global',
    registration_open BOOLEAN NOT NULL DEFAULT true,
    prize_pool_confirmed BOOLEAN NOT NULL DEFAULT false,
    demo_sandbox_mode BOOLEAN NOT NULL DEFAULT true,
    announcement_banner TEXT NOT NULL DEFAULT 'KAIROS 2027 Early-Interest Waitlist is now live! Reserve your team priority.',
    registration_deadline TIMESTAMPTZ NOT NULL DEFAULT '2027-01-06T23:59:59+05:30',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_by TEXT DEFAULT 'System Bootstrap'
);

-- ------------------------------------------------------------------------------
-- 8. AUDIT LOGS (Immutable Administrative Log Trail)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id TEXT PRIMARY KEY DEFAULT ('log-' || extract(epoch from now())::bigint || '-' || substring(gen_random_uuid()::text from 1 for 4)),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    organizer_name TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON public.audit_logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs (action);

-- ------------------------------------------------------------------------------
-- 9. RADAR SIGNALS (Builder Beacon Matchmaking Board)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.radar_signals (
    id TEXT PRIMARY KEY DEFAULT ('sig-' || extract(epoch from now())::bigint || '-' || substring(gen_random_uuid()::text from 1 for 4)),
    profile_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    builder_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('AI / ML Specialist', 'Fullstack Engineer', 'Systems & DevOps', 'Web3 & Security', 'UI/UX & Frontend')),
    track_id TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    college TEXT NOT NULL,
    seeking TEXT NOT NULL,
    contact_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_radar_signals_track ON public.radar_signals (track_id);
CREATE INDEX IF NOT EXISTS idx_radar_signals_role ON public.radar_signals (role);
CREATE INDEX IF NOT EXISTS idx_radar_signals_created_at ON public.radar_signals (created_at DESC);

-- ------------------------------------------------------------------------------
-- 10. JUDGES (Evaluation Panelists & Passkey Credentials)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.judges (
    id TEXT PRIMARY KEY DEFAULT ('judge-' || gen_random_uuid()::text),
    access_pin TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    organization TEXT NOT NULL,
    designation TEXT NOT NULL,
    track_specialization TEXT,
    assigned_hall TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_judges_access_pin ON public.judges (access_pin);

-- ------------------------------------------------------------------------------
-- 11. EVALUATIONS (Rubrics, Gate Scores & Normalization)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.evaluations (
    id TEXT PRIMARY KEY DEFAULT ('eval-' || gen_random_uuid()::text),
    team_id TEXT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    judge_id TEXT NOT NULL REFERENCES public.judges(id) ON DELETE RESTRICT,
    checkpoint_gate INT NOT NULL CHECK (checkpoint_gate IN (0, 1, 2, 3)),
    criterion1_score NUMERIC(4, 2) NOT NULL CHECK (criterion1_score >= 0 AND criterion1_score <= 30),
    criterion2_score NUMERIC(4, 2) NOT NULL CHECK (criterion2_score >= 0 AND criterion2_score <= 25),
    criterion3_score NUMERIC(4, 2) NOT NULL CHECK (criterion3_score >= 0 AND criterion3_score <= 25),
    criterion4_score NUMERIC(4, 2) NOT NULL CHECK (criterion4_score >= 0 AND criterion4_score <= 20),
    raw_total_score NUMERIC(5, 2) NOT NULL,
    normalized_z_score NUMERIC(5, 3),
    qualitative_feedback TEXT,
    recused_conflict BOOLEAN NOT NULL DEFAULT false,
    evaluated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_team_judge_gate UNIQUE (team_id, judge_id, checkpoint_gate)
);

CREATE INDEX IF NOT EXISTS idx_evaluations_team ON public.evaluations (team_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_judge ON public.evaluations (judge_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_gate ON public.evaluations (checkpoint_gate);

-- ------------------------------------------------------------------------------
-- 12. CSAT RESPONSES (Attendee Post-Event Surveys)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.csat_responses (
    id TEXT PRIMARY KEY DEFAULT ('csat-' || gen_random_uuid()::text),
    profile_id TEXT REFERENCES public.profiles(id) ON DELETE SET NULL,
    team_member_id TEXT,
    overall_satisfaction INT NOT NULL CHECK (overall_satisfaction >= 1 AND overall_satisfaction <= 5),
    nps_score INT NOT NULL CHECK (nps_score >= 0 AND nps_score <= 10),
    cloud_services_used TEXT[] NOT NULL DEFAULT '{}',
    pursuing_aws_certification TEXT NOT NULL CHECK (pursuing_aws_certification IN ('YES', 'NO', 'ALREADY_CERTIFIED')),
    event_feedback TEXT NOT NULL,
    testimonial_quote TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_csat_submitted_at ON public.csat_responses (submitted_at DESC);

-- ------------------------------------------------------------------------------
-- 13. ORG MEMBERS (Student Leadership Committee Directory)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.org_members (
    id TEXT PRIMARY KEY DEFAULT ('mem-' || gen_random_uuid()::text),
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    register_no TEXT,
    tier TEXT NOT NULL CHECK (tier IN ('APEX_PRESIDENT', 'SUPER_HEAD', 'SUB_HEAD', 'CORE_LEAD', 'CREW_VOLUNTEER', 'FACULTY_ADVISOR')),
    is_higher_management BOOLEAN NOT NULL DEFAULT false,
    division TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    photo_url TEXT NOT NULL,
    bio TEXT NOT NULL,
    builder_philosophy_quote TEXT,
    academic_department TEXT NOT NULL,
    graduation_year INT,
    aws_certifications TEXT[] DEFAULT '{}',
    aws_builder_center_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    badges TEXT[] DEFAULT '{}',
    contributions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_org_members_tier ON public.org_members (tier);
CREATE INDEX IF NOT EXISTS idx_org_members_display_order ON public.org_members (display_order ASC);

-- ------------------------------------------------------------------------------
-- AUTOMATED UPDATED_AT TRIGGER FUNCTION
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_waitlist_updated_at ON public.waitlist;
CREATE TRIGGER set_waitlist_updated_at BEFORE UPDATE ON public.waitlist FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_teams_updated_at ON public.teams;
CREATE TRIGGER set_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_sponsors_updated_at ON public.sponsors;
CREATE TRIGGER set_sponsors_updated_at BEFORE UPDATE ON public.sponsors FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_referrals_updated_at ON public.referrals;
CREATE TRIGGER set_referrals_updated_at BEFORE UPDATE ON public.referrals FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_feature_flags_updated_at ON public.feature_flags;
CREATE TRIGGER set_feature_flags_updated_at BEFORE UPDATE ON public.feature_flags FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- Record migration in tracking table (Idempotent: prevents duplicate records)
INSERT INTO public._schema_migrations (version, checksum)
VALUES ('20261112000001_initial_kairos_schema.sql', '1cff193a2290e1357a9e5b4e42645ef804d12139a1421fee5d42f54a61c61928')
ON CONFLICT (version) DO NOTHING;

-- ============================================================================
-- MIGRATION: 20261112000002_row_level_security_policies.sql
-- ============================================================================
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


-- Record migration in tracking table (Idempotent: prevents duplicate records)
INSERT INTO public._schema_migrations (version, checksum)
VALUES ('20261112000002_row_level_security_policies.sql', '740a9c0707da89373145f8a9ddac7328f040f300142e749fcf4477f4e57f9473')
ON CONFLICT (version) DO NOTHING;

-- ============================================================================
-- MIGRATION: 20261112000004_student_auth.sql
-- ============================================================================
-- ==============================================================================
-- KAIROS 2027: STUDENT AUTHENTICATION SCHEMA EXTENSION
-- Migration: 20261112000004_student_auth.sql
-- Description: Adds password hash, email verification status, and login
--              telemetry to public.profiles.
-- ==============================================================================

-- 1. Extend profiles with authentication credentials & verification metadata
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS password_hash TEXT,
    ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS password_reset_token TEXT,
    ADD COLUMN IF NOT EXISTS password_reset_expires_at TIMESTAMPTZ;

-- 2. Add partial indexes for auth queries
CREATE INDEX IF NOT EXISTS idx_profiles_email_verified ON public.profiles (email_verified);
CREATE INDEX IF NOT EXISTS idx_profiles_reset_token ON public.profiles (password_reset_token) WHERE password_reset_token IS NOT NULL;

-- 3. Row Level Security Update
-- Ensure password_hash is never selectable by regular authenticated users querying other profiles
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
    id,
    email,
    full_name,
    institution,
    department,
    year_of_study,
    portfolio_url,
    github_url,
    linkedin_url,
    tshirt_size,
    email_verified,
    created_at
FROM public.profiles;

-- Grant select on public_profiles view to authenticated and anon users
GRANT SELECT ON public.public_profiles TO anon, authenticated;


-- Record migration in tracking table (Idempotent: prevents duplicate records)
INSERT INTO public._schema_migrations (version, checksum)
VALUES ('20261112000004_student_auth.sql', '91b5a3f32c8fe37b1a1eaac1709de0f259aa44f5cbbbfd79793e3d412cd2a226')
ON CONFLICT (version) DO NOTHING;

-- ============================================================================
-- MIGRATION: 20261112000005_rbac_schema.sql
-- ============================================================================
-- ==============================================================================
-- KAIROS 2027: ROLE-BASED ACCESS CONTROL (RBAC) SCHEMA
-- Migration: 20261112000005_rbac_schema.sql
-- Description: Centralized roles, granular permissions, and authorization matrix.
-- ==============================================================================

-- 1. Extend profiles with explicit database role
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'STUDENT' 
    CHECK (role IN ('STUDENT', 'TEAM_LEADER', 'JUDGE', 'ORGANIZER', 'SUPER_ADMIN'));

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);

-- 2. Role Permissions Definition Table
CREATE TABLE IF NOT EXISTS public.role_permissions (
    role TEXT NOT NULL CHECK (role IN ('STUDENT', 'TEAM_LEADER', 'JUDGE', 'ORGANIZER', 'SUPER_ADMIN')),
    permission TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (role, permission)
);

-- 3. Seed Default RBAC Authorization Matrix
INSERT INTO public.role_permissions (role, permission, description) VALUES
    -- Student
    ('STUDENT', 'profile:read_own', 'View own profile and credentials'),
    ('STUDENT', 'profile:update_own', 'Update own student profile details'),
    ('STUDENT', 'team:view_own', 'View roster and status of own team'),
    ('STUDENT', 'event:view_public', 'Access permitted schedule and stage telemetry'),

    -- Team Leader (All Student permissions + Team Management & Deliverable Submission)
    ('TEAM_LEADER', 'profile:read_own', 'View own profile and credentials'),
    ('TEAM_LEADER', 'profile:update_own', 'Update own student profile details'),
    ('TEAM_LEADER', 'team:view_own', 'View roster and status of own team'),
    ('TEAM_LEADER', 'team:manage_details', 'Update project title, abstract, and repository URLs'),
    ('TEAM_LEADER', 'team:invite_members', 'Generate and share team invite code to recruit members'),
    ('TEAM_LEADER', 'team:submit_artifacts', 'Submit Round 1 video demo, architecture diagram, and repository'),
    ('TEAM_LEADER', 'event:view_public', 'Access permitted schedule and stage telemetry'),

    -- Judge (Scoped strictly to assigned tracks / evaluations)
    ('JUDGE', 'judging:view_assigned', 'View assigned semi-finalist submissions and architectures'),
    ('JUDGE', 'judging:submit_evaluation', 'Submit checkpoint rubric scores and qualitative feedback'),
    ('JUDGE', 'event:view_public', 'Access permitted schedule and stage telemetry'),

    -- Organizer (Scoped to operational event workflows)
    ('ORGANIZER', 'waitlist:read', 'Inspect participant waitlist registrations'),
    ('ORGANIZER', 'waitlist:update_status', 'Review and update applicant selection stages'),
    ('ORGANIZER', 'sponsors:read', 'Review sponsor inquiries and track partnerships'),
    ('ORGANIZER', 'referrals:read', 'Track Rainmaker referral leads and verification status'),
    ('ORGANIZER', 'teams:read_all', 'View all registered hackathon teams and rosters'),
    ('ORGANIZER', 'audit:log', 'Record administrative audit trail entries'),

    -- Super Administrator (Full Administrative Governance)
    ('SUPER_ADMIN', 'profile:read_own', 'View own profile'),
    ('SUPER_ADMIN', 'profile:update_own', 'Update own profile'),
    ('SUPER_ADMIN', 'team:view_own', 'View own team'),
    ('SUPER_ADMIN', 'team:manage_details', 'Manage team details'),
    ('SUPER_ADMIN', 'team:invite_members', 'Invite team members'),
    ('SUPER_ADMIN', 'team:submit_artifacts', 'Submit team artifacts'),
    ('SUPER_ADMIN', 'judging:view_assigned', 'Inspect any judging rubric'),
    ('SUPER_ADMIN', 'judging:submit_evaluation', 'Submit or override evaluation'),
    ('SUPER_ADMIN', 'waitlist:read', 'Read all waitlist records'),
    ('SUPER_ADMIN', 'waitlist:update_status', 'Update any waitlist status'),
    ('SUPER_ADMIN', 'waitlist:export', 'Export sanitized waitlist spreadsheet'),
    ('SUPER_ADMIN', 'sponsors:read', 'Read all sponsors'),
    ('SUPER_ADMIN', 'sponsors:export', 'Export sanitized sponsor inquiries spreadsheet'),
    ('SUPER_ADMIN', 'csat:read', 'Read attendee feedback and NPS ratings'),
    ('SUPER_ADMIN', 'csat:export', 'Export sanitized CSAT survey responses'),
    ('SUPER_ADMIN', 'flags:update', 'Toggle system feature flags and registration deadlines'),
    ('SUPER_ADMIN', 'organizers:manage', 'Manage organizer credentials and roles'),
    ('SUPER_ADMIN', 'audit:read', 'Inspect immutable audit logs'),
    ('SUPER_ADMIN', 'system:admin', 'Root administrative functions')
ON CONFLICT (role, permission) DO NOTHING;

-- 4. Centralized PostgreSQL Authorization Function for RLS
CREATE OR REPLACE FUNCTION public.has_permission(check_role TEXT, required_permission TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.role_permissions 
        WHERE role = check_role AND permission = required_permission
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Record migration in tracking table (Idempotent: prevents duplicate records)
INSERT INTO public._schema_migrations (version, checksum)
VALUES ('20261112000005_rbac_schema.sql', '6afadb717be428ecb322df96b059d7de6e218849311e19d12f22624a87d4c5e6')
ON CONFLICT (version) DO NOTHING;

-- ============================================================================
-- MIGRATION: 20261112000006_teams_admin_and_notifications.sql
-- ============================================================================
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


-- Record migration in tracking table (Idempotent: prevents duplicate records)
INSERT INTO public._schema_migrations (version, checksum)
VALUES ('20261112000006_teams_admin_and_notifications.sql', 'f2372761d5b9b9633698a89afe3b6a1e87a5864a7d7548992c3a824080540e53')
ON CONFLICT (version) DO NOTHING;

COMMIT;
