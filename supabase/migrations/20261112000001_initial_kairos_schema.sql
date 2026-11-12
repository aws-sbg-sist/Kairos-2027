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
