-- ==============================================================================
-- KAIROS 2027: AUTOMATED DATA SEED FROM FLAT JSON STORE
-- Generated: 2026-11-12T10:28:50.332Z
-- Target: Supabase PostgreSQL (Idempotent ON CONFLICT Upserts)
-- ==============================================================================

BEGIN;

-- 1. PROFILES
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, created_at)
VALUES ('prof-e4150b989184dd23', 'aarav.sharma@example.edu', 'Aarav Sharma', NULL, 'IIT Madras', NULL, '3rd Year', 'Computer Science & Engineering', 'https://github.com/aarav', NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '2026-10-24T10:15:00.000Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, created_at)
VALUES ('prof-4f5ec056ed16eb76', 'pooja.v@example.edu', 'Pooja Venkatesh', NULL, 'Sathyabama Institute of Science and Technology', NULL, '4th Year', 'School of Computing', 'https://github.com/pooja-v', NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '2026-10-24T14:30:00.000Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, created_at)
VALUES ('prof-a554da56f65e8f97', 'builder.1794479318479@sathyabama.ac.in', 'Ananya Sathyabama Builder', NULL, 'Sathyabama Institute of Science and Technology', NULL, 'Undergraduate', 'Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '2026-11-12T10:28:40.294Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, created_at)
VALUES ('prof-715418675ff78b8f', 'rohan.g@example.edu', 'Rohan Gupta', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '2026-11-12T10:28:50.332Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, created_at)
VALUES ('prof-b8e0c531efc1e58f', 'swetha.k@example.edu', 'Swetha K', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '2026-11-12T10:28:50.332Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, created_at)
VALUES ('prof-278d739700f96ca6', 'aditya.n@example.edu', 'Aditya Nair', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '2026-11-12T10:28:50.332Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, created_at)
VALUES ('prof-309272e9f24a5917', 'rohan.d@student.sathyabama.ac.in', 'Rohan Deshmukh', '+91 98401 23456', 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '2026-11-12T10:28:50.332Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  updated_at = timezone('utc'::text, now());

-- 2. WAITLIST
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('demo-w1', 'prof-e4150b989184dd23', 'Aarav Sharma', 'aarav.sharma@example.edu', NULL, 'IIT Madras', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Workflows', 'https://github.com/aarav', 'Building autonomous distributed agent systems for verifiable research synthesis.', 'seeking_team', NULL, NULL, NULL, 'pending', '2026-10-24T10:15:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('demo-w2', 'prof-4f5ec056ed16eb76', 'Pooja Venkatesh', 'pooja.v@example.edu', NULL, 'Sathyabama Institute of Science and Technology', '4th Year', 'School of Computing', 'Cloud-Native Distributed Systems', 'https://github.com/pooja-v', 'Exploring high-throughput distributed transaction settlement with event-driven consensus.', 'seeking_team', NULL, NULL, NULL, 'shortlisted', '2026-10-24T14:30:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794479320294-7f5br', 'prof-a554da56f65e8f97', 'Ananya Sathyabama Builder', 'builder.1794479318479@sathyabama.ac.in', NULL, 'Sathyabama Institute of Science and Technology', 'Undergraduate', 'Engineering', 'Agentic AI & Generative Workflows', '', 'Building autonomous consensus agents', 'seeking_team', NULL, NULL, NULL, 'pending', '2026-11-12T10:28:40.294Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());

-- 3. TEAMS
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-k75-01', NULL, 'Chronos Distributed', 'KAIROS-7721', 'cloud-native', NULL, NULL, NULL, 'prof-4f5ec056ed16eb76', 'pooja.v@example.edu', 'ROUND_0_APPLICANT', 'shortlisted', 'Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry', 'A fault-tolerant stream processing engine handling 100k events/sec with distributed consensus and zero data loss.', 'https://github.com/kairos2027/chronos-stream', NULL, '2026-10-25T08:00:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-k100-01', 'KAIROS-TEAMK10001', 'Contender Squad team-k100-01', 'INV-TEAM-K100-01', 'cloud-native', NULL, NULL, NULL, NULL, 'placeholder-leader@kairos2027.local', 'ON_CAMPUS_QUALIFIED', 'evaluated', NULL, NULL, NULL, NULL, '2026-11-12T10:28:50.332Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-k100-02', 'KAIROS-TEAMK10002', 'Contender Squad team-k100-02', 'INV-TEAM-K100-02', 'cloud-native', NULL, NULL, NULL, NULL, 'placeholder-leader@kairos2027.local', 'ON_CAMPUS_QUALIFIED', 'evaluated', NULL, NULL, NULL, NULL, '2026-11-12T10:28:50.332Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());

-- 4. TEAM MEMBERS
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m1', 'team-k75-01', 'prof-4f5ec056ed16eb76', 'Pooja Venkatesh', 'pooja.v@example.edu', NULL, NULL, 'Leader', 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m2', 'team-k75-01', 'prof-715418675ff78b8f', 'Rohan Gupta', 'rohan.g@example.edu', NULL, NULL, 'Backend', 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m3', 'team-k75-01', 'prof-b8e0c531efc1e58f', 'Swetha K', 'swetha.k@example.edu', NULL, NULL, 'AI / Cloud', 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m4', 'team-k75-01', 'prof-278d739700f96ca6', 'Aditya Nair', 'aditya.n@example.edu', NULL, NULL, 'UI/UX', 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;

-- 5. SPONSORS
INSERT INTO public.sponsors (id, company_name, contact_person, contact_email, contact_phone, interested_tier, custom_requirements, status, created_at)
VALUES ('sp-1', 'Aether Cloud Systems', 'Karan Mehra', 'partnerships@aethercloud.io', '+91 98765 43210', 'powered_by', 'Interested in hosting a 10-minute technical masterclass on distributed vector indexing.', 'contacted', '2026-10-23T11:00:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());

-- 6. REFERRALS
INSERT INTO public.referrals (id, referral_code, referrer_profile_id, referrer_name, referrer_email, referrer_phone, referrer_college, referrer_upi_id, company_name, decision_maker_name, decision_maker_email, decision_maker_designation, company_poc_name, company_poc_role, company_poc_contact, target_tier, intro_context, lock_expiry_date, status, commission_rate, estimated_payout, payout_amount, submitted_at)
VALUES ('ref-1', 'RAIN-REF-1', 'prof-309272e9f24a5917', 'Rohan Deshmukh', 'rohan.d@student.sathyabama.ac.in', '+91 98401 23456', 'Sathyabama Institute of Science and Technology', NULL, 'NovaCloud AI Technologies', NULL, NULL, NULL, 'Sanjay Varma', 'VP Engineering & Talent Acquisition', 'sanjay.varma@novacloud.ai', 'Co-Powered By Partner (₹1,00,000)', 'NovaCloud is expanding their Chennai engineering campus and looking to recruit 15 cloud/AI interns.', '2026-11-26T08:50:08.426Z', 'DISCOVERY_SCHEDULED', '12%', '₹12,000 Pure Cash', NULL, '2026-10-24T12:00:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());

-- 7. FEATURE FLAGS
INSERT INTO public.feature_flags (id, registration_open, prize_pool_confirmed, demo_sandbox_mode, announcement_banner, registration_deadline, updated_at, updated_by)
VALUES ('global', TRUE, FALSE, TRUE, 'KAIROS 2027 Early-Interest Waitlist is now live! Reserve your team priority.', '2027-01-06T23:59:59+05:30', timezone('utc'::text, now()), 'JSON Migration Seed')
ON CONFLICT (id) DO UPDATE SET
  registration_open = EXCLUDED.registration_open,
  prize_pool_confirmed = EXCLUDED.prize_pool_confirmed,
  demo_sandbox_mode = EXCLUDED.demo_sandbox_mode,
  announcement_banner = EXCLUDED.announcement_banner,
  registration_deadline = EXCLUDED.registration_deadline,
  updated_at = timezone('utc'::text, now());

-- 8. AUDIT LOGS
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479322403-ihvf', '2026-11-12T10:28:42.403Z', 'Ananya Sathyabama Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.1794479318479@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479322217-f240', '2026-11-12T10:28:42.217Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [builder.1794479318479@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479321202-0k89', '2026-11-12T10:28:41.202Z', 'Ananya Sathyabama Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.1794479318479@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479321016-po5l', '2026-11-12T10:28:41.016Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [builder.1794479318479@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1792936952854', '2026-10-25T14:02:32.854Z', 'Rikish B', 'ADMIN_LOGIN', 'Logged in successfully as Head of Design & Branding')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1792936939202', '2026-10-25T14:02:19.202Z', 'Nangaiyar M', 'ADMIN_LOGIN', 'Logged in successfully as Head of Sponsorship & Finance')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1792936877123', '2026-10-25T14:01:17.123Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1792936425142', '2026-10-25T13:53:45.142Z', 'Failed Login Attempt', 'AUTH_FAILURE', 'Invalid passkey attempted for identity [Thenappan T]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1792934893046', '2026-10-25T13:28:13.046Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Changed candidate [Pooja Venkatesh] status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1792934842921', '2026-10-25T13:27:22.921Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Head of Safety, Hospitality & Governance')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1', '2026-10-25T09:00:00.000Z', 'System Bootstrap', 'INIT_STORE', 'Initialized KAIROS 2027 persistent store with verified organizer roster and proposed tiers.')
ON CONFLICT (id) DO NOTHING;

-- 9. RADAR SIGNALS
INSERT INTO public.radar_signals (id, builder_name, role, track_id, skills, college, seeking, contact_url, created_at)
VALUES ('sig-1', 'Vikram Sundaram', 'AI / ML Specialist', 'agentic-ai', ARRAY['LangGraph', 'Amazon Bedrock', 'FastAPI', 'OpenSearch Vector Search']::text[], 'Sathyabama Institute of Science and Technology', 'Looking for a solid Frontend/Web engineer and DevOps builder to form a team for multi-agent autonomous consensus.', 'https://github.com/vikram-sundaram', '2026-10-25T07:30:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.radar_signals (id, builder_name, role, track_id, skills, college, seeking, contact_url, created_at)
VALUES ('sig-2', 'Ananya Deshmukh', 'Systems & DevOps', 'cloud-native', ARRAY['Rust', 'AWS ECS', 'Kubernetes', 'Amazon EventBridge']::text[], 'IIT Madras', 'Distributed systems engineer looking for a backend architect and UI builder to tackle sub-millisecond event streaming.', 'https://github.com/ananya-desh', '2026-10-25T08:15:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.radar_signals (id, builder_name, role, track_id, skills, college, seeking, contact_url, created_at)
VALUES ('sig-3', 'Rohan Iyer', 'Web3 & Security', 'fintech-trust', ARRAY['AWS KMS', 'Zero-Knowledge Proofs', 'Cognito', 'Aurora Serverless']::text[], 'Anna University, CEG', 'Security researcher seeking frontend engineer (Next.js/Tailwind) for verifiable decentralized credential escrow.', 'https://github.com/rohan-iyer', '2026-10-25T09:00:00.000Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.radar_signals (id, builder_name, role, track_id, skills, college, seeking, contact_url, created_at)
VALUES ('sig-4', 'Sneha Patel', 'UI/UX & Frontend', 'open-enterprise', ARRAY['Next.js 14', 'Three.js', 'Tailwind CSS', 'Amazon Textract']::text[], 'Sathyabama Institute of Science and Technology', 'Frontend & motion designer looking for Python/FastAPI builders to craft a high-fidelity institutional healthcare triage app.', 'https://github.com/sneha-patel', '2026-10-25T09:45:00.000Z')
ON CONFLICT (id) DO NOTHING;

-- 10. JUDGES
INSERT INTO public.judges (id, access_pin, full_name, organization, designation, track_specialization, assigned_hall, is_active, created_at)
VALUES ('judge-1', '202701', 'Vikrant Roy', 'Amazon Web Services', 'Principal Solutions Architect', 'Agentic AI & Cloud-Native', 'Indoor Auditorium - Main Stage', TRUE, timezone('utc'::text, now()))
ON CONFLICT (id) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.judges (id, access_pin, full_name, organization, designation, track_specialization, assigned_hall, is_active, created_at)
VALUES ('judge-2', '202702', 'Aishwarya Subramanian', 'Peak Capital Partners', 'General Partner & Tech Investor', 'FinTech & Open Innovation', 'Indoor Auditorium - Bay 1', TRUE, timezone('utc'::text, now()))
ON CONFLICT (id) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.judges (id, access_pin, full_name, organization, designation, track_specialization, assigned_hall, is_active, created_at)
VALUES ('judge-3', '202703', 'Dr. Rajesh Kannan', 'Center for Distributed Computing', 'Distinguished Professor & Systems Architect', 'Distributed Systems & Edge IoT', 'Indoor Auditorium - Bay 2', TRUE, timezone('utc'::text, now()))
ON CONFLICT (id) DO UPDATE SET
  is_active = EXCLUDED.is_active;

-- 11. EVALUATIONS
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1', 'team-k100-01', 'judge-1', 1, 28, 24, 24, 19, 95, 1.45, 'Exceptional event-mesh resilience on AWS EventBridge. IAM policies are neatly isolated.', FALSE, '2027-01-22T17:30:00.000Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-2', 'team-k100-02', 'judge-1', 1, 29, 25, 24, 19, 97, 1.72, 'Brilliant Bedrock multi-agent orchestration. Hallucination guardrails are tightly implemented.', FALSE, '2027-01-22T18:00:00.000Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;

-- 12. CSAT RESPONSES
INSERT INTO public.csat_responses (id, team_member_id, overall_satisfaction, nps_score, cloud_services_used, pursuing_aws_certification, event_feedback, testimonial_quote, submitted_at)
VALUES ('csat-1', NULL, 5, 10, ARRAY['Amazon Bedrock', 'AWS Lambda', 'Amazon DynamoDB', 'Amazon OpenSearch']::text[], 'YES', 'The zero-fee model, seamless Wi-Fi, and live mentorship by AWS Solutions Architects made this the best hackathon in the country.', 'KAIROS 2027 showed us what real cloud engineering at scale feels like.', '2027-01-24T16:00:00.000Z')
ON CONFLICT (id) DO NOTHING;

-- 13. ORG MEMBERS
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-thenappan', 'thenappan-t', 'Thenappan T', 'President & Student Builder Group Leader (SBGL)', '44110855', 'APEX_PRESIDENT', TRUE, 'Executive Directorate', 1, '/assets/members/thenappan_t.webp', 'Apex student leader directing macro-systems, institutional administration, and strategic industry partnerships for India''s premier zero-fee hackathon.', 'When financial barriers are dropped to zero, authentic engineering brilliance takes the stage.', 'Department of Computer Science & Engineering, SIST', 2027, ARRAY['AWS Certified Solutions Architect – Associate', 'AWS Student Builder Group Leader']::text[], 'https://community.aws/@thenappan', 'https://linkedin.com/in/thenappan-t', 'https://github.com/thenappan-t', 'https://thenappan.dev', ARRAY['Apex Architect 2026-27', 'Kairos Grand Director', 'AWS Community Pioneer']::text[], ARRAY['[object Object]', '[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-ashok-kumar', 'dr-k-ashok-kumar', 'Dr. K. Ashok Kumar', 'Faculty Coordinator', NULL, 'FACULTY_ADVISOR', TRUE, 'Departmental Advisory', 2, '/assets/members/faculty_ashok.webp', 'Faculty Mentor guiding cloud curriculum, technical academic oversight, and institutional resource governance.', NULL, 'Department of Computer Science & Engineering, SIST', NULL, ARRAY['AWS Academy Accredited Educator']::text[], NULL, NULL, NULL, NULL, ARRAY['Distinguished Faculty Patron']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-balapriya', 'dr-balapriya-s', 'Dr. Balapriya .S', 'Faculty Coordinator', NULL, 'FACULTY_ADVISOR', TRUE, 'Departmental Advisory', 3, '/assets/members/faculty_balapriya.webp', 'Faculty Mentor specializing in intelligent computing systems, student innovation, and research incubation.', NULL, 'Department of Computer Science & Engineering, SIST', NULL, ARRAY['AWS Academy Cloud Foundations']::text[], NULL, NULL, NULL, NULL, ARRAY['Research Mentor Patron']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-nikki', 'nangaiyar-m', 'Nangaiyar M (Nikki)', 'Chief Partnership & Finance Officer (CPFO)', '44612059', 'SUPER_HEAD', TRUE, 'Division 1: Capital & Corporate Relations', 4, '/assets/members/nangaiyar_m.webp', 'Directing corporate partnerships, sponsor outreach, ₹3.5L operational treasury, and the crowdsourced rainmaker referral fund.', 'Every rupee secured from enterprise sponsors directly fuels a student builder''s dreams.', 'Department of Computer Science & Engineering, SIST', 2027, ARRAY['AWS Cloud Practitioner']::text[], NULL, NULL, NULL, NULL, ARRAY['Master Rainmaker', 'Sponsorship Titan']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-shanmugapriyan', 'shanmugapriyan', 'Shanmugapriyan', 'Chief Technology & Infrastructure Officer (CTO)', '44110756', 'SUPER_HEAD', TRUE, 'Division 2: Cloud Systems & Tech Infra', 5, '/assets/members/shanmugapriyan.webp', 'Leading portal architecture, 1Gbps arena network topology, GitHub commit webhook telemetry, and automated Z-score scoring pipeline.', 'Build resilient systems that withstand scale, silence excuses, and prove excellence in real-time.', 'Department of Computer Science & Engineering, SIST', 2027, ARRAY['AWS Certified Developer – Associate']::text[], NULL, NULL, NULL, NULL, ARRAY['Cloud Architect Legend', 'Telemetry Master']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-viswanathan', 'viswanathan-ashok', 'Viswanathan Ashok', 'Chief Operating Officer (COO)', '44110907', 'SUPER_HEAD', TRUE, 'Division 3: Ground Operations & Venue Logistics', 6, '/assets/members/viswanathan_ashok.webp', 'Spearheading on-ground logistics across Sathyabama Indoor Auditorium, 100-team bay allocation, and Sathyabama transit bus fleet operations.', NULL, 'Department of Computer Science & Engineering, SIST', 2027, ARRAY['AWS Cloud Practitioner']::text[], NULL, NULL, NULL, NULL, ARRAY['Operations Maestro']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-hemavarshine', 'hemavarshine-s', 'Hemavarshine S', 'Chief Experience Officer (CXO)', '44110263', 'SUPER_HEAD', TRUE, 'Division 4: Builder Experience & Hospitality', 7, '/assets/members/hemavarshine_s.webp', 'Overseeing builder hospitality, 7 complimentary hot meals, midnight fuel boosters, and 48-hour participant wellbeing.', NULL, 'Department of Computer Science & Engineering, SIST', 2027, ARRAY['AWS Cloud Practitioner']::text[], NULL, NULL, NULL, NULL, ARRAY['Hospitality Guardian']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-rikish', 'rikish-b', 'Rikish B', 'Chief Creative & Media Officer (CCMO - Co-Lead)', '44110664', 'SUPER_HEAD', TRUE, 'Division 5: Creative Direction & Stage Media', 8, '/assets/members/rikish_b.webp', 'Leading visual design, 20x10ft 4K LED stage screen presentations, cyber streetwear merch kits, and brand compliance.', NULL, 'Department of Computer Science & Engineering, SIST', 2027, ARRAY['AWS Certified Solutions Architect']::text[], NULL, NULL, NULL, NULL, ARRAY['Design Visionary']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;
INSERT INTO public.org_members (id, username, full_name, role_title, register_no, tier, is_higher_management, division, display_order, photo_url, bio, builder_philosophy_quote, academic_department, graduation_year, aws_certifications, aws_builder_center_url, linkedin_url, github_url, portfolio_url, badges, contributions, created_at)
VALUES ('mem-caroline', 'caroline-mary-mcpherson', 'Caroline Mary McPherson', 'Chief Creative & Media Officer (CCMO - Co-Lead)', '44110124', 'SUPER_HEAD', TRUE, 'Division 5: Public Relations & Social Broadcasting', 9, '/assets/members/caroline_m.webp', 'Directing public relations, press releases, social media broadcasting (@awsdevelopers tagging), and community outreach.', NULL, 'Department of Computer Science & Engineering, SIST', 2027, ARRAY['AWS Cloud Practitioner']::text[], NULL, NULL, NULL, NULL, ARRAY['Media Maestro']::text[], ARRAY['[object Object]']::text[], timezone('utc'::text, now()))
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role_title = EXCLUDED.role_title,
  display_order = EXCLUDED.display_order,
  bio = EXCLUDED.bio,
  contributions = EXCLUDED.contributions;

COMMIT;
