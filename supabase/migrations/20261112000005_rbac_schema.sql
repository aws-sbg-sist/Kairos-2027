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
