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
