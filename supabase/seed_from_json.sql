-- ==============================================================================
-- KAIROS 2027: AUTOMATED DATA SEED FROM FLAT JSON STORE
-- Generated: 2026-11-13T16:40:10.693Z
-- Target: Supabase PostgreSQL (Idempotent ON CONFLICT Upserts)
-- ==============================================================================

BEGIN;

-- 1. PROFILES
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-865807860dee8760', 'outsider.student@example.edu', 'Outsider Student', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '18efb0f45a3b3c8bdc103c649034874e:1f69c0c3e3a6d735182b893da8990fbc559d16f7949e6247927b4ac62262e4bd62be31592675434ef45ceb723f51a21383b457014b17aa441b46411cfe6161bc', FALSE, NULL, NULL, NULL, NULL, '2026-11-12T10:37:21.041Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-e619d2dff05fa446', 'outsider101@example.edu', 'Outsider Test', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'a87a458bf7c3368a57c2a62609193e74:85535085db406934d389141c2eb880529b921725ba16234cf0feab5813a89db459bcf3ef8cde3eb86a99eb691d9e64ba88e1865dfab72fd337fa7d8434b84667', TRUE, '2026-11-12T10:37:42.177Z', '2026-11-12T10:37:42.650Z', NULL, NULL, '2026-11-12T10:37:41.915Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-715418675ff78b8f', 'rohan.g@example.edu', 'Rohan Gupta', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'db4621a0e8e6f89344143b5537f7c0cd:5c1e70d0126a38321ec37487075836a86c3be40cafb9e0f194f4b3578a7eb3ee4c514922336bf11134fc72cf25549dae71ab6ed90f14a766525bb4073fa52a8b', TRUE, '2026-11-12T10:37:43.073Z', '2026-11-12T12:11:18.638Z', NULL, NULL, '2026-11-12T10:37:43.001Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-4f5ec056ed16eb76', 'pooja.v@example.edu', 'Pooja Venkatesh', NULL, 'Sathyabama Institute of Science and Technology', NULL, '4th Year', 'School of Computing', 'https://github.com/pooja-v', NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'cfadef769ee8a50fd356d8fc9dc2a5b0:3fb7f94295e7820585dc08b431a7b0cee5a8e340f543693917786c50ba3109ccf35befb044091ef9e54056b486a7727e105dd96e1ed380b12bc0faaf950336a7', TRUE, '2026-11-12T10:37:43.695Z', '2026-11-12T12:11:20.402Z', NULL, NULL, '2026-11-12T10:37:43.634Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-28e66ae1e7108868', 'builder.outsider.1794479973997@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'ab8255b7365a17454ec5dba75638b59a:271564d0d0fca7e02c7807917a7b8321e7bef4ddc88a6829c37a8232011572fc0013a2732d792d529d5c4d25be13e11d83391be6fe39207a95bfb98df9a6e686', TRUE, '2026-11-12T10:39:35.572Z', '2026-11-12T10:39:35.734Z', NULL, NULL, '2026-11-12T10:39:35.378Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-79afbf9887984722', 'builder.1794479985606@sathyabama.ac.in', 'Ananya Sathyabama Builder', '+91 98401 88888', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'School of Computing - Advanced Cloud Lab', '', 'https://github.com/ananya-builder', NULL, NULL, NULL, FALSE, NULL, 'XL', NULL, '1bd9811756e78993781155def19a7ee4:e851d9ea527b5d9062c1301eae510514d2337474b3aecc979784674fcef5ba7833271f1738b7b98679cf6702ee6b290c853ab5413171514c74cb934fd908acbc', TRUE, '2026-11-12T10:39:46.767Z', '2026-11-12T10:39:48.196Z', NULL, NULL, '2026-11-12T10:39:46.173Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-656e37b22dd8f248', 'reg.builder.1794480606458@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, '5d1b36383b5e9aa5a00f33fada7a5df1:4e6aeadd60a196201b817db40b1b9ece54665f638e9547a40870db183a0c046e49bf26dc5d75456e13bf8bf0fa66d8568c9fca639991d5e92ac323d7aefd7b87', TRUE, '2026-11-12T10:50:09.009Z', '2026-11-12T10:50:09.445Z', NULL, NULL, '2026-11-12T10:50:08.739Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-ab62f5a90d59527d', 'leader.1794480606458@sathyabama.ac.in', 'Karthik Subramanian', '+91 99401 11223', 'Sathyabama Institute of Science and Technology', '44118877', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/karthik-subramanian', NULL, TRUE, 'https://community.aws/@karthik', NULL, NULL, 'dfdf8ded92f4d7f0e082c96389929c2f:00125a3a6092c7c867d079dddccea9244f4e6aca5cba6d546a3f3509f65c88533e8ce0569ee5a936c07efdd473313d3a3fa7a7dbe3e98aad0433771dba240111', TRUE, '2026-11-12T10:50:11.589Z', '2026-11-12T10:50:11.854Z', NULL, NULL, '2026-11-12T10:50:11.527Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-b91491feab8f91af', 'builder.outsider.1794480706641@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '0d22a374e360f8fc78101477f4382903:f900656552696b7d74cec67196553afa689152b095ae799a821378b600b212ba624cc024877607b82e03242c82be554e44cc630d92f249bfb9869a52fb9c7f6a', TRUE, '2026-11-12T10:51:49.674Z', '2026-11-12T10:51:49.909Z', NULL, NULL, '2026-11-12T10:51:49.188Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-0e04e2c29deb6793', 'reg.builder.1794480847598@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, '3f368ef5a9a83bd7acf891e04e72a860:0ad9777def37ca8d5a0731d950749bc5fe3291058109670aaafef8647df8351770803611c8dd5c711d6471f0d4dece9635723ceb0fb593fb01fefd9d3c49c0aa', TRUE, '2026-11-12T10:54:09.650Z', '2026-11-12T10:54:10.146Z', NULL, NULL, '2026-11-12T10:54:09.182Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-02f23bbef9caa9e0', 'leader.1794480847598@sathyabama.ac.in', 'Karthik Subramanian', '', 'Sathyabama Institute of Science and Technology', '', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '93058098ca4231e8adff97b6bf3f811b:ff9a53955f8743935779f285ec43e3c14de76ba439bc9e8733de8dd31f921441f8e7b22ab274d548bb2c287cdac951a197b8b777b9602a788aefac841d835ea4', TRUE, '2026-11-12T10:54:12.338Z', '2026-11-12T10:54:12.549Z', NULL, NULL, '2026-11-12T10:54:12.225Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-e23efe0214591b78', 'member1.1794480847598@sathyabama.ac.in', 'Priya Dharshini', '+91 98402 33445', 'Sathyabama Institute of Science and Technology', '44117766', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, 'c874d029f81a1de9de13a34019c7eae9:9ad8b92da000f518220588a73d15219dd6f2aa25dbabea236cab4d6b8e8d61d797d37551c34e57256b5e73b1081a7b39f2270b1cb4c433f10e7f9bcd5256aacf', TRUE, '2026-11-12T10:54:13.104Z', '2026-11-12T10:54:13.304Z', NULL, NULL, '2026-11-12T10:54:13.039Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-0cf9c782131cb33a', 'builder.outsider.1794480860327@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'ea07b8e2e90d4a0f1580ae23918c282d:df47124cbc4066160a187c896d0d2ccf96ed0e2d9fbe8f164f47747baf930c701f544573d5c2e211fa89df0c4a88a4ae12be7b036b539cf0f5383e6bb77bc949', TRUE, '2026-11-12T10:54:22.208Z', '2026-11-12T10:54:22.395Z', NULL, NULL, '2026-11-12T10:54:22.143Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-450a6cdace83804f', 'builder.1794480869457@sathyabama.ac.in', 'Ananya Sathyabama Builder', '+91 98401 88888', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'School of Computing - Advanced Cloud Lab', '', 'https://github.com/ananya-builder', NULL, NULL, NULL, FALSE, NULL, 'XL', NULL, '4e980928c2607862586d65cca1a03b5a:b381c893ab795f8245a6e7027b2f1ac8d459f21f49507f230cbf4df99d69c3692a7a746016a2ccf756ccfebdb8ddb4709687b50e56387a55bd16e50275d1edd4', TRUE, '2026-11-12T10:54:30.847Z', '2026-11-12T10:54:32.110Z', NULL, NULL, '2026-11-12T10:54:30.151Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-3c661135315e61a5', 'reg.builder.1794480958468@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, '25585f96d575611abc4c7d2f8060fb37:e8327a4fc5bb8ca7335debf18fb973b2ef1097e134bbd11d36a0b295d3fbd810b9a6dd4f644864fbc206c8d6e50be7e525cc311122534a05989ecbe991063264', TRUE, '2026-11-12T10:55:59.024Z', '2026-11-12T10:55:59.218Z', NULL, NULL, '2026-11-12T10:55:58.939Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-ddf1e7258bfaec7c', 'leader.1794480958468@sathyabama.ac.in', 'Karthik Subramanian', '', 'Sathyabama Institute of Science and Technology', '', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '3280e7f9a4347ecdabf6c82df9ca2906:ce7fd9d9b4c9adcbd273e55c9293706b7db818b8fcd0d5376de0f39dffb852126f91e6ad303c8454166ad9aaa35cdcbff84fc2efede565d1feb297238d56152e', TRUE, '2026-11-12T10:56:02.978Z', '2026-11-12T10:56:03.184Z', NULL, NULL, '2026-11-12T10:56:02.903Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cdb341015f9376a6', 'member1.1794480958468@sathyabama.ac.in', 'Priya Dharshini', '+91 98402 33445', 'Sathyabama Institute of Science and Technology', '44117766', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, '8a0c1c20381864faffc2a4406db4ecee:ed6707f99ffbc110d3ac1cf8e64f09e41611ab9b1a2734f66fccabbe5afb0721007cb2bc51a1bdda3aea9c4cc926f77536db2fde90a4f612a91c403a9a1bf2f4', TRUE, '2026-11-12T10:56:05.283Z', '2026-11-12T10:56:05.531Z', NULL, NULL, '2026-11-12T10:56:05.173Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-59819c90d377c5e6', 'arjun.raman.1794481647677@sathyabama.ac.in', 'Arjun Ramanathan', '+91 99401 55667', 'Sathyabama Institute of Science and Technology', '44112233', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '208b79770cd4d1d0e1e035e2f2b67f71:c8e8499bff790edd0d249a922839a96ca1d606623cb66242c7712888d3755a188702e113fd606d198ade95253cbdc8d00533a085deb8092a914bcb5aa73f8b34', TRUE, '2026-11-12T11:07:29.767Z', '2026-11-12T11:07:30.314Z', NULL, NULL, '2026-11-12T11:07:29.309Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-2b6f11772ceecd48', 'meera.krish.1794481647677@sathyabama.ac.in', 'Meera Krishnan', '+91 98402 77889', 'Sathyabama Institute of Science and Technology', '44113344', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', 'L', NULL, '87dfe6d68611225b0d131b7d704023ae:8111adf25c8344c238a12c519fc8962db39b122e216785d2010128835c5267099d057af71caa78c4ab40a59b9114d21c48940568655e52e7a81175b68da20fc5', TRUE, '2026-11-12T11:07:31.733Z', '2026-11-12T11:07:31.968Z', NULL, NULL, '2026-11-12T11:07:31.635Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-c56021cd5c6e55fb', 'ravi.chandran.1794481647677@sathyabama.ac.in', 'Ravi Chandran', '+91 97403 99001', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, '', '', '', NULL, FALSE, '', 'L', NULL, '5cf1553f5626d73e782a1c00c7cbddc0:352c23f2289c3511f805dc377b1586a098a5d16e0c7bdd230c6b312106e7b44070e50dd60a0a9ffe89673a8e48f838fd2084986b96b1befdc5bb46fdd71dd87c', TRUE, '2026-11-12T11:07:32.363Z', '2026-11-12T11:07:32.581Z', NULL, NULL, '2026-11-12T11:07:32.281Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-02595ac2bea7b1ca', 'student.p6.1794482464273@example.edu', 'Student Builder P6', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '073b0a2859f0935691e26108fe970f42:f78828602260383d720d06f510c169274679252f6ebaa7463ea75d06c6e376cec36e94f1a4b9dad6a97a40d62933300b71205220e6c6674d17764981487500d8', TRUE, '2026-11-12T11:21:09.381Z', '2026-11-12T11:21:09.782Z', NULL, NULL, '2026-11-12T11:21:09.108Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-48c8b43037f51805', 'lead.p6.1794482464273@example.edu', 'Team Leader P6', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'b6bf2210732b3757d99116b5d43f8b5e:09f668bc3a07fe8e0658bc86f41556a10ecd7c7434d0d8da1eb6e3a36271c742788a5a11619754509ff2d3fd74e279daac68bb03a8bc3daad927bc750915852c', TRUE, '2026-11-12T11:21:11.208Z', '2026-11-12T11:21:11.431Z', NULL, NULL, '2026-11-12T11:21:11.096Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-d69094dfcbe28642', 'student.p6.1794482545766@example.edu', 'Student Builder P6', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '75d2d3a68ba37b1ed79a64f5bd79e332:ee63b85d0d9f196de9cb4a3279c23ad0674ff9ecb7d18e0e3b6252d927ace4ec3f49f722855a08c69596339fdd592e29cf85708f0c4b3b19b10b58a6ff07e44a', TRUE, '2026-11-12T11:22:27.183Z', '2026-11-12T11:22:27.419Z', NULL, NULL, '2026-11-12T11:22:27.058Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-dbfb4610a59a6fbd', 'lead.p6.1794482545766@example.edu', 'Team Leader P6', '+91 99401 11223', 'Sathyabama Institute of Science and Technology', '44118877', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, '3490a00505adb2b2116490de4739904e:fedf082e1275210919741183b8c5b92bdd7cb5635faa24186363cf0f52da9ad311b43c5c1cb17992ee58cf5b2f9101c2d75a68db5bed59541ea7aeede716e27e', TRUE, '2026-11-12T11:22:29.899Z', '2026-11-12T11:22:30.103Z', NULL, NULL, '2026-11-12T11:22:29.809Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-174539bfa2ab05ae', 'student.p6.1794482569558@example.edu', 'Student Builder P6', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '37eb3cf9fe88aa97e04faa61dcffad16:50e30555320e13c19504ea29a04d24d9f9f686333d1c2bb691bb7624308279603c04097d7284d3f47ac9d2ca1abb02d2149e77a66996ec150192600e39724b09', TRUE, '2026-11-12T11:22:51.193Z', '2026-11-12T11:22:51.417Z', NULL, NULL, '2026-11-12T11:22:51.098Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-3e056a8312672c66', 'lead.p6.1794482569558@example.edu', 'Team Leader P6', '+91 99401 11223', 'Sathyabama Institute of Science and Technology', '44118877', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, 'e25758cb8065893a035f7339dfea1a17:466cfc1db99bce0e6217d0c38fa9915a9e4510d0917765e5c6512144c505fd84f52f4a6e2d8c1527cd46ba2861b1a1098c934c17f3a59129ecf6e7a08390570c', TRUE, '2026-11-12T11:22:52.694Z', '2026-11-12T11:22:52.911Z', NULL, NULL, '2026-11-12T11:22:52.596Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-5c1d20133de8d932', 'dq.lead.1794482569558@example.edu', 'DQ Leader', '+91 99999 88888', 'Sathyabama Institute of Science and Technology', '44119999', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, 'f923ffff80ad598a8ca54fd7df3ff3c0:046f1350d5a0771a635c1d6cafa90868ddaee0e412c398770941ae988885be841953575170098907e60b8ca26384649f7162c961e7e93642664e6bff6c46faf0', TRUE, '2026-11-12T11:22:54.764Z', '2026-11-12T11:22:55.113Z', NULL, NULL, '2026-11-12T11:22:54.666Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6c8259f4e845301c', 'fi.lead.1794482569558@example.edu', 'Formula Tester', '+91 99999 77777', 'Sathyabama Institute of Science and Technology', '44117777', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, 'd5d68bb4343f850e4e47d17424aee39b:c260be6d4bb9474c1d8486d0e02028f7a9629e8e99b02140f08ae6273b24d5890bc84246ecd25d0bc203390bad527c657babee0e579fe6f24028e5bf615d431b', TRUE, '2026-11-12T11:22:57.658Z', '2026-11-12T11:22:57.950Z', NULL, NULL, '2026-11-12T11:22:57.550Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-e0affc4d91f8e090', 'arjun.raman.1794482584063@sathyabama.ac.in', 'Arjun Ramanathan', '+91 99401 55667', 'Sathyabama Institute of Science and Technology', '44112233', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, 'beaa9072049da773297f3b18cfa510dc:fd0e896fcb67cfc79bf5da84a7482d99e6deffe576fba80f42f3460ebe8cb667b229da12135b7bff5b6094b637d83aa1c457b03fe71bc0f956ea76660636740b', TRUE, '2026-11-12T11:23:07.505Z', '2026-11-12T11:23:07.847Z', NULL, NULL, '2026-11-12T11:23:07.368Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-3896e404542ad86f', 'meera.krish.1794482584063@sathyabama.ac.in', 'Meera Krishnan', '+91 98402 77889', 'Sathyabama Institute of Science and Technology', '44113344', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', 'L', NULL, '5e8504f51d2683b549682f4f406c5f93:e3fcfd0a3d4a4b5041e6b226bee8e992c4eca7c97127a5a9c721b29b224a40f2c21cb974cc2f8259edd6f857c5fbb90373ffe8f899dde6f8a2d0f0e7dcdc3a59', TRUE, '2026-11-12T11:23:08.589Z', '2026-11-12T11:23:09.035Z', NULL, NULL, '2026-11-12T11:23:08.429Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-ef09afaabe2772ca', 'ravi.chandran.1794482584063@sathyabama.ac.in', 'Ravi Chandran', '+91 97403 99001', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, '', '', '', NULL, FALSE, '', 'L', NULL, '725b37545d647fe8dd1dac4ccf4fd977:6a48e9e6d64fea2e56a4967af8e8bcc446ed871565ff41650136832694735af47be09261c8eb3f808e12105626dddf8241afe1c9617fd27932811c118ab87061', TRUE, '2026-11-12T11:23:09.538Z', '2026-11-12T11:23:09.776Z', NULL, NULL, '2026-11-12T11:23:09.453Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-0ef9234e445cc96b', 'reg.builder.1794482611880@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, '8592104e1935662d7bf1b57edde22584:c34463298088981221588a6fa298b8bd75cbdf41c5bed390b7dff974fb43b64352f02e0a0276b2067109a2dd5980123954aa4f587952bea2d417d788b824110f', TRUE, '2026-11-12T11:23:32.535Z', '2026-11-12T11:23:32.786Z', NULL, NULL, '2026-11-12T11:23:32.421Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-fee0ccbfac5207c5', 'leader.1794482611880@sathyabama.ac.in', 'Karthik Subramanian', '', 'Sathyabama Institute of Science and Technology', '', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '35d28464998a3d997284da69c7f702bb:e51bc8652f78e1937243491508544d443cb36fb0c32f64aade48da6b33894c7e05405997e21fd2d6f30959d8f1d39a0a2c287a9bd95d6be95c3a62e4bb5b6a02', TRUE, '2026-11-12T11:23:34.624Z', '2026-11-12T11:23:34.902Z', NULL, NULL, '2026-11-12T11:23:34.491Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-3d6673c59b558922', 'member1.1794482611880@sathyabama.ac.in', 'Priya Dharshini', '+91 98402 33445', 'Sathyabama Institute of Science and Technology', '44117766', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, '0761f04e2a2d0213181ea1592af761ab:1e0a31c5befb4b45e6a83c83629b0964336fe7d0e6332477f952afac64d1b5a5b31ce55111eba63881bc3dc323e7174053869e389e00fed50f642f6cbb8077ee', TRUE, '2026-11-12T11:23:35.806Z', '2026-11-12T11:23:36.634Z', NULL, NULL, '2026-11-12T11:23:35.720Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-178cb5b1c367827c', 'builder.outsider.1794482625896@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '0870dbf97952c0365b4793f8384ac23e:b9756a0c8ae775e306503f9f94a9f664a6d4595e305ab6ef175ec58ea299394793ab7b36bfac847a6593e6f6766a87ace52893beb7c34c124639a53960c078b1', TRUE, '2026-11-12T11:23:49.792Z', '2026-11-12T11:23:50.090Z', NULL, NULL, '2026-11-12T11:23:49.694Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-833b9dfa1776f708', 'student.p6.1794482700408@example.edu', 'Student Builder P6', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'cac95d255765dcd4157a2f81ebd111eb:135eee7d4fb4a58583aa727f99ca62d696d8434f893456f326c09d0fb10a77214637e883031d74e4aba1be96de4bbc564b1d040c579f9d24577ea8ec2eb01526', TRUE, '2026-11-12T11:25:13.374Z', '2026-11-12T11:25:15.668Z', NULL, NULL, '2026-11-12T11:25:11.793Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-9ef6efd984f0c3c7', 'lead.p6.1794482700408@example.edu', 'Team Leader P6', '+91 99401 11223', 'Sathyabama Institute of Science and Technology', '44118877', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, '22514621f15345240ed949e0d9980db1:221dfed25edc54f4034687991618a07f8657936c1e099de082889e5ee620fe16cbb93e58ad07bac8f7aaa8a750d4c1ea045df225768c4a6434f154af03db2bba', TRUE, '2026-11-12T11:25:21.951Z', '2026-11-12T11:25:22.223Z', NULL, NULL, '2026-11-12T11:25:21.824Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-15ad5ff9eca02b8e', 'dq.lead.1794482700408@example.edu', 'DQ Leader', '+91 99999 88888', 'Sathyabama Institute of Science and Technology', '44119999', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, '1b21836f890c1f4315e4865a25da4e6b:65cf7f7efd07d0c7a759cf961fa76a186f0bece75d2354ce368c824712528890b1e5e64df58e95538768f5923b72fdb6c3d5342bea578d23d402e2b6a54fce92', TRUE, '2026-11-12T11:25:26.653Z', '2026-11-12T11:25:26.938Z', NULL, NULL, '2026-11-12T11:25:26.516Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6a299ef47f54a152', 'fi.lead.1794482700408@example.edu', 'Formula Tester', '+91 99999 77777', 'Sathyabama Institute of Science and Technology', '44117777', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, 'bbddf00da826ba1f57376dd5c5f9ea31:60557bde3007e04f0c79102b8ee6428bd2b9cbae76cd083516f886f93b8f6ce0365907cc7f753d880d8f912b5d177e1e7b134f9118f64d247aeff72e2d10e587', TRUE, '2026-11-12T11:25:32.020Z', '2026-11-12T11:25:32.323Z', NULL, NULL, '2026-11-12T11:25:31.894Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cb0664261b2ab34d', 'student.p6.1794483786255@example.edu', 'Student Builder P6', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '7ef1ea592f519ddbd7f9fc051aece672:eb2c3c397178ed963bbfd7103a706ad66050d27785489f130924afd5b3020a07593f33028cb4139a23662b1cec68a2cf5b6b1f0c48aa6de7ae6b082c7e798fdc', TRUE, '2026-11-12T11:43:10.989Z', '2026-11-12T11:43:11.953Z', NULL, NULL, '2026-11-12T11:43:10.533Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-68d9889536cbfa09', 'lead.p6.1794483786255@example.edu', 'Team Leader P6', '+91 99401 11223', 'Sathyabama Institute of Science and Technology', '44118877', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, '6c763a4fc12acde6898e19e25d64b17d:03a87e89bf4b0be70fb46c949a96ea055c1caaf50a88d13007711e2d3d2930128b8a2230642fcfe38c217b465686cb565f18ce8c14e93d5eb46f489d1b139ec7', TRUE, '2026-11-12T11:43:13.815Z', '2026-11-12T11:43:14.096Z', NULL, NULL, '2026-11-12T11:43:13.686Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-70e03125a8370c09', 'dq.lead.1794483786255@example.edu', 'DQ Leader', '+91 99999 88888', 'Sathyabama Institute of Science and Technology', '44119999', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, 'f680f2daa5b2db140e0a113cd24b0d59:ac699cff1921f93208231b288aa5f9817e470bfd19f6bdbdf4a1e2fe6c1200cf30a3a6abee28f967213a6a08922782a121ecbc3cd65a0db93473d095e25ee757', TRUE, '2026-11-12T11:43:17.358Z', '2026-11-12T11:43:17.627Z', NULL, NULL, '2026-11-12T11:43:17.220Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-7cdadc7229ca3911', 'fi.lead.1794483786255@example.edu', 'Formula Tester', '+91 99999 77777', 'Sathyabama Institute of Science and Technology', '44117777', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, '66c4154e24d506d4b8279bf0ad374e17:18856ff00acbfc05654da1cb6f9c5a202591508ad9b64469dde4556c5eab25c90031be9b78c1695ead287f9947d8be22d7b0d8e4fc37f31a2c99685015cdba97', TRUE, '2026-11-12T11:43:23.089Z', '2026-11-12T11:43:23.326Z', NULL, NULL, '2026-11-12T11:43:22.950Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-1dc0fc9067349dcd', 'arjun.raman.1794483809177@sathyabama.ac.in', 'Arjun Ramanathan', '+91 99401 55667', 'Sathyabama Institute of Science and Technology', '44112233', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '620ca6fc1df9af89fde07a8faa6e1809:b2606451e05775b55029f0b646698ec30d8af5b1540adebfb75b46b1e209b09d4059732663ab4c86359030c9744deec6535eab09f8cf27fabdc5da93eb20e3ed', TRUE, '2026-11-12T11:43:31.024Z', '2026-11-12T11:43:31.290Z', NULL, NULL, '2026-11-12T11:43:30.883Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-302082cd97ee57a4', 'meera.krish.1794483809177@sathyabama.ac.in', 'Meera Krishnan', '+91 98402 77889', 'Sathyabama Institute of Science and Technology', '44113344', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', 'L', NULL, 'a68eafeb8d7e7807bbed924b424e5e68:4ab604a9d4a92e9dc0924bb74b567a6df5b3bb1da719477d01b072c376df491f818858817d44fe129948d3a5307784de39a003c103ca6eff57474f4cf56319c9', TRUE, '2026-11-12T11:43:31.825Z', '2026-11-12T11:43:32.058Z', NULL, NULL, '2026-11-12T11:43:31.699Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6a1ba72b18affeab', 'ravi.chandran.1794483809177@sathyabama.ac.in', 'Ravi Chandran', '+91 97403 99001', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, '', '', '', NULL, FALSE, '', 'L', NULL, '7f599b222e340137189571b64c09358c:44ede67b009fa0149e5e4e1839a41b9b07db80eee43c3b57e05cff2edb69d7753f1d4eb8f9f9f2e3f060e74205d36b25ea007f8eeda87693ddd9a05575380acc', TRUE, '2026-11-12T11:43:32.568Z', '2026-11-12T11:43:32.846Z', NULL, NULL, '2026-11-12T11:43:32.444Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-4fdffe8102ef7fc9', 'reg.builder.1794483832299@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, '1fc07e454500e80f8843037bf80cd205:aa5b9d3bd359c940591c2132c9a7dca4bef08a186c66b6d4847019cfab3fda5834aa2422a954870052217ad667067bc8f5d3ba21f7c4a6342939395c749df28c', TRUE, '2026-11-12T11:43:53.109Z', '2026-11-12T11:43:53.426Z', NULL, NULL, '2026-11-12T11:43:52.977Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-658768dfe9398e38', 'leader.1794483832299@sathyabama.ac.in', 'Karthik Subramanian', '', 'Sathyabama Institute of Science and Technology', '', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '7b1aed4b94c6eb552fac29bb8ec99d39:d26eaeee4e66f3f0f72972726c936878e96de1b9e8ddac83e478c15bdaac5598b9dbf726e9904026bad0d284ab3c06af00f9857877bce2dd27b7326e625f5750', TRUE, '2026-11-12T11:43:55.663Z', '2026-11-12T11:43:55.928Z', NULL, NULL, '2026-11-12T11:43:55.537Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-ce3571db5fad0948', 'member1.1794483832299@sathyabama.ac.in', 'Priya Dharshini', '+91 98402 33445', 'Sathyabama Institute of Science and Technology', '44117766', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, '16a89d49c0394a2b05d19e35301de994:eaef6d0f6dd0f55cbb231fd465dad0923de5d6282c5ab574c0b045a2d44d2fac100a68dbc8a957dac907d578df1d1446d256f7ef46e5d2f6dcd2ab97784ab173', TRUE, '2026-11-12T11:43:57.041Z', '2026-11-12T11:43:57.315Z', NULL, NULL, '2026-11-12T11:43:56.909Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cb599292595d1ebf', 'builder.outsider.1794483847959@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'b302ce70d0ec952748c6353ee60baf3d:6c273035e7338c37b1d6b011e1d69535c20f06869801b4a14444492c4e72a343a46122ca98d667cc5b765e3c8aaa4ed2fcdefe406f1d15caf0d1d885435913fe', TRUE, '2026-11-12T11:44:12.640Z', '2026-11-12T11:44:12.914Z', NULL, NULL, '2026-11-12T11:44:12.499Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-542696203e5116f7', 'builder.outsider.1794483896401@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '89eac02cb21d60aa5f51ad5f1f2be491:b49748866fad4d49f3b0c44bfd2be5b26aafe6c83bcb9ee97e0a59b827c78495c77cc0d29993c0704d54f3a1af5d043aaf83003f4761e22d1449a95e0ef590ea', TRUE, '2026-11-12T11:44:58.136Z', '2026-11-12T11:44:58.434Z', NULL, NULL, '2026-11-12T11:44:57.966Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-176eb300ab73eb21', 'email.leader.mwdi1tle@sist.edu.in', 'Leader mwdi1tle', '9876543210', 'SIST Chennai', 'REGMWDI1TLE', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '98a0e5e0857a8677b6143d264f01c61f:71c539e3719eb24d6b3607d31bdfe32cad3ff70be330555e1281ed5d7fa6adc99a3b27c3648793c49d5b48948d475a8b42a2f026bb10e4ef2000503c36e7f4ae', FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:03:46.229Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-459660b3fde988c5', 'email.leader.mwdi6uqj@sist.edu.in', 'Leader mwdi6uqj', '9876543210', 'SIST Chennai', 'REGMWDI6UQJ', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '3faa8ae9f69bc3300d36a1271bb43f83:7367bacafa3f449491d9224754873c64d02c828131dd25d56fe5c3f9c21951b421687e9ed482f66efd59c485075550708759d45d8d5c4406a79101c477b9e6be', FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:07:39.298Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6023da92008a4ba8', 'email.leader.mwdi7knz@sist.edu.in', 'Leader mwdi7knz', '9876543210', 'SIST Chennai', 'REGMWDI7KNZ', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '4fba347b6ac5aeda6313d870f3f1b94f:99ce24ea50a77ab44914e56d37b33dc8b1b4f4dcfac9cc2c9f0f67d6831f3df531cf417916aaf3983e63eb1d225c64e89dbd8372670e245481c4ce17cb93d59b', FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:08:11.933Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-fd57ee80d93be269', 'student.p6.1794485321265@example.edu', 'Student Builder P6', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'f07b9654a04c41f16a1a98354189af72:faf4ed0f250783c74ec8831fa55b7a93f6db488e42ea6d4bd548b1788a7aa5423e761db8de0fafc8be013923fc6fa01d5282adf2803d8ba61a317b33ac415b42', TRUE, '2026-11-12T12:08:46.756Z', '2026-11-12T12:08:47.845Z', NULL, NULL, '2026-11-12T12:08:45.385Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-9c7fed66fbe8f17e', 'lead.p6.1794485321265@example.edu', 'Team Leader P6', '+91 99401 11223', 'Sathyabama Institute of Science and Technology', '44118877', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, '16702dc18b6a98a3611d9c3539814ad7:7937742329658ca4f6dc7a3dcaecbce68577b8a3804ef8ff8e66a55ed4acbd22a631f357cf678c5643194e942f58f25b3849d123b8134479c0bfb3c52668527b', TRUE, '2026-11-12T12:08:51.183Z', '2026-11-12T12:08:51.900Z', NULL, NULL, '2026-11-12T12:08:50.825Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-03b35c7a6dd26a01', 'dq.lead.1794485321265@example.edu', 'DQ Leader', '+91 99999 88888', 'Sathyabama Institute of Science and Technology', '44119999', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, '30db18f7353a5e2f2880c6981451dcd8:fb7748995110aeff690d23edbeddbe8cd9f2960b194b006c327b4d33ee60c21bc6557c9f5e928d49d1e4e23ad8fd3eaa68daadf24167dfb3d9c58b43e61240a3', TRUE, '2026-11-12T12:08:56.083Z', '2026-11-12T12:08:56.826Z', NULL, NULL, '2026-11-12T12:08:55.686Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-ed6739134ea9fe81', 'fi.lead.1794485321265@example.edu', 'Formula Tester', '+91 99999 77777', 'Sathyabama Institute of Science and Technology', '44117777', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, '8dd25a7da916a41513c5b7628378a601:054c5175b70254e58716106e0b31f2319e9bcfa65f33f485141b32770302dfe3cd06d351adf5a1a719d291acafde1fe653e6b51f83636d52877ee01c75db5880', TRUE, '2026-11-12T12:09:07.592Z', '2026-11-12T12:09:07.868Z', NULL, NULL, '2026-11-12T12:09:07.331Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-0835a52218af42e0', 'arjun.raman.1794485361490@sathyabama.ac.in', 'Arjun Ramanathan', '+91 99401 55667', 'Sathyabama Institute of Science and Technology', '44112233', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '527df62f40dc3dae8dd1449cb513ab75:8ee66ac8458e57eab66cc4b39884d158d99a76134279a2b62bfe142c280f38fb0b6f9cc555605b0dec0038f297fd91ec937e89d34601918fa56e0395faaae3d1', TRUE, '2026-11-12T12:09:24.618Z', '2026-11-12T12:09:24.871Z', NULL, NULL, '2026-11-12T12:09:24.449Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-e5e4578b866b0e70', 'meera.krish.1794485361490@sathyabama.ac.in', 'Meera Krishnan', '+91 98402 77889', 'Sathyabama Institute of Science and Technology', '44113344', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', 'L', NULL, '664e3ebf05ef69694252340a0334c8a6:8d617dac1f6ea5b3d04eb1dbd03f1c95cc816c3b8d9e65fc6b0b8f0513fc3fa9b250ac323acccdc71e015c370d965527feb71d9c7bee312cf311931a890ba22a', TRUE, '2026-11-12T12:09:25.634Z', '2026-11-12T12:09:25.906Z', NULL, NULL, '2026-11-12T12:09:25.500Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-08a3ffd7726bc890', 'ravi.chandran.1794485361490@sathyabama.ac.in', 'Ravi Chandran', '+91 97403 99001', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, '', '', '', NULL, FALSE, '', 'L', NULL, '3e4c20315ad4c757ec8d2eaf57340972:c756beefc1cd59e98c557874bcfcfd4eeefe921264c8ce1176f71460fae1ec54b3705e2ed2a0b5d7e5b58e331e2c445c02f82df6d311aa2d3c7e5d7de2f60450', TRUE, '2026-11-12T12:09:26.532Z', '2026-11-12T12:09:26.807Z', NULL, NULL, '2026-11-12T12:09:26.387Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-4710c1266247d631', 'reg.builder.1794485408809@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, '9f1d73674b06713b76209395bfc7de99:b7b30385299fa8cca37474795d71afb184a92e3a9aab068dec349b1c114bd93d3b09906fbed8cb2296a50c5bee3be5c0409622ca80a623da067a919d2b287883', TRUE, '2026-11-12T12:10:09.850Z', '2026-11-12T12:10:10.121Z', NULL, NULL, '2026-11-12T12:10:09.669Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-2191374f8a163340', 'leader.1794485408809@sathyabama.ac.in', 'Karthik Subramanian', '', 'Sathyabama Institute of Science and Technology', '', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '5ad7fe7247e10fe62fe50ffc3bcd4a0d:c4bec14599bfc236985bafb2b30e1343187dac2d4d6f1b253715c89c75f2d9aa383ec8a6c1a6df280477910cb027bc612927921b26489d0fcae19ef8eab86b5d', TRUE, '2026-11-12T12:10:12.391Z', '2026-11-12T12:10:12.662Z', NULL, NULL, '2026-11-12T12:10:12.236Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-f438ca5721e51ad5', 'member1.1794485408809@sathyabama.ac.in', 'Priya Dharshini', '+91 98402 33445', 'Sathyabama Institute of Science and Technology', '44117766', NULL, NULL, NULL, NULL, NULL, 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, 'b80728a64cafc4bb9d19d5018929a90c:348306551b6a3542fb21a82d94ca84b89ef26d299712a90ad0fb0dab365cb71ab759efe9e41e65c523f83176922c571157afb1ef1beb19f66bca9e8561379551', TRUE, '2026-11-12T12:10:14.542Z', '2026-11-12T12:10:14.807Z', NULL, NULL, '2026-11-12T12:10:14.396Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-66ae00447538c8d7', 'builder.outsider.1794485428152@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, 'a26e6922553f6a31762ed894ae46cfb8:05b29b3cb2a4fa4fd2eeca1b0fa65829b0332d152fa14e4e8ccd441108288906a76c74377c6f1ccd0e651a267c1077d0ae678f156b73b43b18c66c1eacdb533e', TRUE, '2026-11-12T12:10:36.266Z', '2026-11-12T12:10:36.780Z', NULL, NULL, '2026-11-12T12:10:36.012Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-7c04eeb3ce39ab9e', 'builder.outsider.1794485474412@test.edu', 'Malicious Escalator', NULL, 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '42913e7304b4ff8af03a6da42c9209c2:a07ca7ff0b6cd2e62cbea84b39d6f5ed0e3744b196e152022df36dc0990ce89a9b0799d0a4389dd641e12ed8e700bc88cdead90691b60c6822a755b9e6d34757', TRUE, '2026-11-12T12:11:16.476Z', '2026-11-12T12:11:16.905Z', NULL, NULL, '2026-11-12T12:11:16.300Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-dc0f549cf50c34ba', 'email.leader.mwdic9oe@sist.edu.in', 'Leader mwdic9oe', '9876543210', 'SIST Chennai', 'REGMWDIC9OE', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '9099a8802c8a57b713584829a6c82003:e18485454fb700dc51e496f996123d2f740e45a3e006245fa38ee2c76376d16c9a15a5c59ae6c906da166a5d09589e9ff1a7bb4ab3b8497c68b0edd73b8d988a', FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:11:51.457Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6e97d5937ab08e40', 'audit.leader.mwdihko2@sist.edu.in', 'Dr. Vikramaditya mwdihko2', '9840123456', 'Sathyabama University', 'REGMWDIHKO2', 'Final Year B.Tech CSE', 'Computer Science & Cloud Engineering', NULL, '', '', '', NULL, TRUE, '', 'L', NULL, '4cde6435ec49a0fdb290265f1bb66bad:ef70b2cfbd083a0c8cb3a4eb2cd2cce043dc803402614b66efe2cd99b141cf8f3bb6545b2e69b3ff1694a7918aaac4fd7604f6b022251cae1602a4a7e6f794ad', TRUE, '2026-11-12T12:16:03.925Z', '2026-11-12T12:16:05.514Z', NULL, NULL, '2026-11-12T12:16:03.225Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-a8aa67a16c5fd45e', 'audit.member.mwdihko2@sist.edu.in', 'Ananya Systems Architect', '9840987654', 'SIST Chennai', 'REG-M-MWDIHKO2', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', 'L', NULL, 'cbc1c40beafe2661fdd5a92316b03c2f:9a8ea87d6ef2df881d924b1b78fcdbaa38e331f3cb52cff2e57cc7619a8d5b7357826c4ce7e94e9b6b9c4776abb4e371fffca1740c370632525c2f1b82ad023c', TRUE, '2026-11-12T12:16:08.717Z', '2026-11-12T12:16:09.069Z', NULL, NULL, '2026-11-12T12:16:08.556Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-3dfe02a2369910d0', 'audit.leader.mwdijj7i@sist.edu.in', 'Dr. Vikramaditya mwdijj7i', '9840123456', 'Sathyabama University', 'REGMWDIJJ7I', 'Final Year B.Tech CSE', 'Computer Science & Cloud Engineering', NULL, '', '', '', NULL, TRUE, '', 'L', NULL, '57642d2bf74d6ce6498398c9dd8108de:d469de70ec28d4b43238ae9c77b3566b2b26418cb4d8baf566da5674f085a04398eb5c22b9877e473e5b930f57b23518234e2bc18cd7d088b95ce658535bed33', TRUE, '2026-11-12T12:17:32.198Z', '2026-11-12T12:17:32.781Z', NULL, NULL, '2026-11-12T12:17:31.843Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-79271bdc47599875', 'audit.member.mwdijj7i@sist.edu.in', 'Ananya Systems Architect', '9840987654', 'SIST Chennai', 'REG-M-MWDIJJ7I', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', 'L', NULL, 'cda184bf4bac15f768ccd15d65d9a1db:f847ae3086f1bdf9336a99a7ea9f52b519a851f0fd5703675e131b78f48a76143d3f7d0f92fc7d348a7f527491cc8cc20a801686b77167f7a0a0686d809b89fa', TRUE, '2026-11-12T12:17:34.403Z', '2026-11-12T12:17:34.973Z', NULL, NULL, '2026-11-12T12:17:34.174Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-faab8e6532f668a2', 'audit.leader.mwdik4hz@sist.edu.in', 'Dr. Vikramaditya mwdik4hz', '9840123456', 'Sathyabama University', 'REGMWDIK4HZ', 'Final Year B.Tech CSE', 'Computer Science & Cloud Engineering', NULL, '', '', '', NULL, TRUE, '', 'L', NULL, '61088ddadd95ee6977358df895ef249d:153a148027a821cd2d3c9aee8fe0606a29eeb6999f8cda0be81dfe99e1a21b1eb26c207aa617f5806f432ee0f493a63d711f9c7a17ed44cf274e7f8c284cef0d', TRUE, '2026-11-12T12:17:58.192Z', '2026-11-12T12:17:58.563Z', NULL, NULL, '2026-11-12T12:17:58.020Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-c5a97b3b2a731dbe', 'audit.member.mwdik4hz@sist.edu.in', 'Ananya Systems Architect', '9840987654', 'SIST Chennai', 'REG-M-MWDIK4HZ', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', 'L', NULL, '1339210b6eda252225010a8aec8c09df:0a2b30f61b85a49cc37c34350fe6ab68da05c68c4a6c705ffd1f40bacd34fc78425e9973aa9e953782cce88c2d3c043b41c2f5508cd19a743edab575b800098b', TRUE, '2026-11-12T12:17:59.489Z', '2026-11-12T12:17:59.828Z', NULL, NULL, '2026-11-12T12:17:59.330Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-25bb5d19be60f883', 'attacker_mwdikx7l@sist.edu.in', 'Eve Attacker', NULL, 'SIST Chennai', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '138d7ef19720ee58816d2dbb02c27e42:f3ab4cd4b759df397ed8ff2dddca7af361ad634df3dfde17b85f5bab09479f43a0e36a531a6fd2643db111ae5e400c64d7028f8fa84a131ec5c0f121a6ffac2e', TRUE, '2026-11-12T12:18:34.860Z', '2026-11-12T12:18:35.155Z', NULL, NULL, '2026-11-12T12:18:34.704Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-4327eccdfb3dfffe', 'victim_mwdikx7l@sist.edu.in', 'Alice Victim', NULL, 'SIST Chennai', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, '5b3edd2d79c65c9ba4ccf413ec42ee27:4312c6c228b3f917bb6186000be324e6ec6c2c994154a83120f9a8b604f37b2b4e3f122241fefa866ad00e11aa26c401b4bf9e76305deb76bb744eacd58c428e', TRUE, '2026-11-12T12:18:35.608Z', '2026-11-12T12:18:35.893Z', NULL, NULL, '2026-11-12T12:18:35.451Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-072efd1d88ae06d1', 'attacker_mwdin1vf@sist.edu.in', 'Eve Attacker', '9840987654', 'SIST Chennai', 'ATTMWDIN1VF', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, 'fc90ae18602a46bdd161555d8fe74067:1dd43b73c7001ab64896b24bc0935b21cf99c6c7b47211215baed766e29a73e1ecde3aa08474591fd632b4dd91f29520343ef0cfe31e0e0ee90d95ea294703c8', TRUE, '2026-11-12T12:20:14.265Z', '2026-11-12T12:20:14.574Z', NULL, NULL, '2026-11-12T12:20:14.110Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cbcaccd7e5390c87', 'victim_mwdin1vf@sist.edu.in', 'Alice Victim', '9840123456', 'SIST Chennai', 'VICMWDIN1VF', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '9fbc47413ab2154b955ab1e1fe3b63d9:e7ff9dfab11dec0b9b853846b735036694f1a27467d2851809c4242990dd940c4dff651a271b0d8c9950c0fd1472bd69663be568280eaa9c351b0f3ed44a5394', TRUE, '2026-11-12T12:20:15.132Z', '2026-11-12T12:20:15.396Z', NULL, NULL, '2026-11-12T12:20:14.985Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-47f70046498e2b79', 'attacker_mwdioehv@sist.edu.in', 'Eve Attacker', '9840987654', 'SIST Chennai', 'ATTMWDIOEHV', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '546e021bd99288b334f2f7998c341cda:3aad0dca8c0445816e6ecd278184568830d9297537ed9002dea7f9dca10ceb1a0205b18c48391b81fa3c932ba42e9a73b56a9acd1ea8063cc5dec160437bd908', TRUE, '2026-11-12T12:21:17.459Z', '2026-11-12T12:21:17.991Z', NULL, NULL, '2026-11-12T12:21:17.248Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-459f6b7990d5ed32', 'victim_mwdioehv@sist.edu.in', 'Alice Victim', '9840123456', 'SIST Chennai', 'VICMWDIOEHV', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '62f27930e40bd231280f2e3077d55594:9867519ac600af4beffa62a564b677bceee86809f04f358eaf169fe36303aa6574ac51fa6bb027ef8646df96f84fb1310a305aaeb1d45e3dd4d2bd1eaf2c2231', TRUE, '2026-11-12T12:21:18.481Z', '2026-11-12T12:21:18.800Z', NULL, NULL, '2026-11-12T12:21:18.315Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-d05d9bcf147fbb13', 'email.leader.mwditu9t@sist.edu.in', 'Leader mwditu9t', '9876543210', 'SIST Chennai', 'REGMWDITU9T', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, '363e0d35b76d30326abc5c7578d9bdcf:0ea3805c838bef29d14e33d6e1a275070668467018680dcd2c4e6f46df85c43ebb57b3cb3a20caec5dd3ea30c4838c9c10f7afa193c5ff5018e3bc9b0a23543a', FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:25:31.758Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-4bd9b23e6f425bac', 'burst_9_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:32.261Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6ce5940fa9fd5c42', 'burst_8_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:32.114Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-d1d76c96e3343aef', 'burst_7_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:31.968Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-89f19eaaf8fe23fa', 'burst_6_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:31.777Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-b10bfd3e55be2d3e', 'burst_5_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:31.612Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-07b6b1b66a0ceb03', 'burst_4_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:31.436Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-c64be9f852e53032', 'burst_3_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:31.243Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cf20e8e0e40b545d', 'burst_2_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:31.033Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-9127a18cf6c601bc', 'burst_1_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:30.809Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6804d2557d8a7d96', 'burst_0_mwdin1vf@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:20:30.614Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-a48bb7d8bcfc6f4d', 'burst_14_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:48.475Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-5931d522788cda19', 'burst_13_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:48.225Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-b1f0fad7312e3537', 'burst_12_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:48.001Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-946ca3e37e4c0c2b', 'burst_11_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:47.862Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-c5b3a85abe11f25b', 'burst_10_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:47.701Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-06e34c12ae087ef7', 'burst_9_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:47.528Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-fead435f32819833', 'burst_8_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:47.230Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-ac04cdd7063e5cda', 'burst_7_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:47.052Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-7e6ed2f6433ee6b8', 'burst_6_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:46.866Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-18059966eb99b3c5', 'burst_5_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:46.707Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-418b7ddd3b4d8158', 'burst_4_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:46.499Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-01b8bd6994b6948e', 'burst_3_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:46.313Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-b37dbecd6cc99e05', 'burst_2_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:46.135Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-8be08e8e6b95b1de', 'burst_1_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:45.985Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6b1d9c8303638b56', 'burst_0_mwdikx7l@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:18:45.828Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-a85c39428650cba3', 'reg.builder.1794480730596@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T10:52:10.985Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-f172c5a701dd958a', 'reg.builder.1794480668277@sathyabama.ac.in', 'Varun Nair', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/varun-nair-cloud', 'https://linkedin.com/in/varun-nair', 'https://meetup.com/members/varun-nair', NULL, FALSE, 'https://community.aws/@varun', 'XL', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T10:51:08.743Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-e4150b989184dd23', 'aarav.sharma@example.edu', 'Aarav Sharma', NULL, 'IIT Madras', NULL, '3rd Year', 'Computer Science & Engineering', 'https://github.com/aarav', NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-10-24T10:15:00.000Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cb7c64a1f237eb46', 'burst_0_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:22.101Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-2d8a50a0db1914b5', 'burst_1_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:22.342Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-09a72de4ba4a6ec6', 'burst_2_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:22.509Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-4b0efb7b84061b83', 'burst_3_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:22.668Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-ae7bace945b2005a', 'burst_4_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:22.848Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-f0b2e29b9836f183', 'burst_5_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:23.011Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-38ea73b0a8cc6c14', 'burst_6_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:23.772Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-6d5d6cf157a9d62e', 'burst_7_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:23.991Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cebb6292b60699e4', 'burst_8_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:24.184Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-c9b62dd3f0c09fac', 'burst_9_mwdioehv@test.com', 'Burst Tester', '+91 99999 88888', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, NULL, NULL, NULL, NULL, FALSE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-12T12:21:24.379Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-b8e0c531efc1e58f', 'swetha.k@example.edu', 'Swetha K', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-278d739700f96ca6', 'aditya.n@example.edu', 'Aditya Nair', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-08f124bcf13b8629', 'debuglead@example.com', 'Debug Squad 99 Leader', '', 'SIST', '', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-cf6c580f638e3139', 'memberone@example.com', 'Member One', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-2be3d1a1f79e9c1d', 'leader.1794480730596@sathyabama.ac.in', 'Karthik Solo Squad 1794480730596 Leader', '', 'SIST', '', NULL, NULL, NULL, NULL, NULL, '', NULL, TRUE, '', NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-266d8d7bd57f69ef', 'builder3.1794480847598@sathyabama.ac.in', 'Builder 3', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-5b72b17cc00b41c3', 'builder4.1794480847598@sathyabama.ac.in', 'Builder 4', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-203fcef7501c16cf', 'builder5.1794480847598@sathyabama.ac.in', 'Builder 5', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-4219cf2efa2e1066', 'builder3.1794480958468@sathyabama.ac.in', 'Builder 3', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-b5412dec9f939007', 'builder4.1794480958468@sathyabama.ac.in', 'Builder 4', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-e9c86feda3712c43', 'builder5.1794480958468@sathyabama.ac.in', 'Builder 5', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-8fe5d90e8d3c787e', 'builder3.1794482611880@sathyabama.ac.in', 'Builder 3', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-5be5126b609cb1d5', 'builder4.1794482611880@sathyabama.ac.in', 'Builder 4', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-d2f95f22aea9e408', 'builder5.1794482611880@sathyabama.ac.in', 'Builder 5', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-9a932b5042cadfd0', 'builder3.1794483832299@sathyabama.ac.in', 'Builder 3', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-14478d82134829b7', 'builder4.1794483832299@sathyabama.ac.in', 'Builder 4', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-fad7082950253007', 'builder5.1794483832299@sathyabama.ac.in', 'Builder 5', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-7ce461d90ea3f328', 'email.member.mwdi1tle@sist.edu.in', 'Confirmed Teammate', '9876543211', 'SIST', 'REG2MWDI1TLE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-27ee3098170f10bb', 'email.member.mwdi6uqj@sist.edu.in', 'Confirmed Teammate', '9876543211', 'SIST', 'REG2MWDI6UQJ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-b73c3c8d7d114b15', 'email.member.mwdi7knz@sist.edu.in', 'Confirmed Teammate', '9876543211', 'SIST', 'REG2MWDI7KNZ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-1111141b3fabd1ef', 'builder3.1794485408809@sathyabama.ac.in', 'Builder 3', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-a9442b228d5b3e36', 'builder4.1794485408809@sathyabama.ac.in', 'Builder 4', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-be62771ed7fd6089', 'builder5.1794485408809@sathyabama.ac.in', 'Builder 5', NULL, 'SIST', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-224d6b284f10180b', 'email.member.mwdic9oe@sist.edu.in', 'Confirmed Teammate', '9876543211', 'SIST', 'REG2MWDIC9OE', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-481ac92d5cc624d0', 'email.member.mwditu9t@sist.edu.in', 'Confirmed Teammate', '9876543211', 'SIST', 'REG2MWDITU9T', NULL, NULL, NULL, NULL, NULL, NULL, NULL, TRUE, NULL, 'L', NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, password_reset_token, password_reset_expires_at, created_at)
VALUES ('prof-309272e9f24a5917', 'rohan.d@student.sathyabama.ac.in', 'Rohan Deshmukh', '+91 98401 23456', 'Sathyabama Institute of Science and Technology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, FALSE, NULL, NULL, NULL, NULL, '2026-11-13T16:40:10.692Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
  institution = EXCLUDED.institution,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  email_verified_at = COALESCE(EXCLUDED.email_verified_at, public.profiles.email_verified_at),
  last_login_at = COALESCE(EXCLUDED.last_login_at, public.profiles.last_login_at),
  updated_at = timezone('utc'::text, now());

-- 2. WAITLIST
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486032261-iww1s', 'prof-4bd9b23e6f425bac', 'Burst Tester', 'burst_9_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:32.261Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486032114-kajhq', 'prof-6ce5940fa9fd5c42', 'Burst Tester', 'burst_8_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:32.114Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486031968-ijuut', 'prof-d1d76c96e3343aef', 'Burst Tester', 'burst_7_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:31.968Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486031777-1pox9', 'prof-89f19eaaf8fe23fa', 'Burst Tester', 'burst_6_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:31.777Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486031612-v4fls', 'prof-b10bfd3e55be2d3e', 'Burst Tester', 'burst_5_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:31.612Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486031436-684nj', 'prof-07b6b1b66a0ceb03', 'Burst Tester', 'burst_4_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:31.436Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486031243-rdi0f', 'prof-c64be9f852e53032', 'Burst Tester', 'burst_3_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:31.243Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486031033-ahcmp', 'prof-cf20e8e0e40b545d', 'Burst Tester', 'burst_2_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:31.033Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486030809-m417h', 'prof-9127a18cf6c601bc', 'Burst Tester', 'burst_1_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:30.809Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486030614-0mqom', 'prof-6804d2557d8a7d96', 'Burst Tester', 'burst_0_mwdin1vf@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:20:30.614Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485928475-ccbhp', 'prof-a48bb7d8bcfc6f4d', 'Burst Tester', 'burst_14_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:48.475Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485928225-dqsp5', 'prof-5931d522788cda19', 'Burst Tester', 'burst_13_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:48.225Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485928001-ehuv6', 'prof-b1f0fad7312e3537', 'Burst Tester', 'burst_12_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:48.001Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485927862-6uwvo', 'prof-946ca3e37e4c0c2b', 'Burst Tester', 'burst_11_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:47.862Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485927701-6f1y1', 'prof-c5b3a85abe11f25b', 'Burst Tester', 'burst_10_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:47.701Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485927528-noh57', 'prof-06e34c12ae087ef7', 'Burst Tester', 'burst_9_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:47.528Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485927230-0l6ia', 'prof-fead435f32819833', 'Burst Tester', 'burst_8_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:47.230Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485927052-6ccqz', 'prof-ac04cdd7063e5cda', 'Burst Tester', 'burst_7_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:47.052Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485926866-m53a9', 'prof-7e6ed2f6433ee6b8', 'Burst Tester', 'burst_6_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:46.866Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485926707-2fxs1', 'prof-18059966eb99b3c5', 'Burst Tester', 'burst_5_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:46.707Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485926499-rhlcl', 'prof-418b7ddd3b4d8158', 'Burst Tester', 'burst_4_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:46.499Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485926313-9azpn', 'prof-01b8bd6994b6948e', 'Burst Tester', 'burst_3_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:46.313Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485926135-e2l40', 'prof-b37dbecd6cc99e05', 'Burst Tester', 'burst_2_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:46.135Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485925985-xnseq', 'prof-8be08e8e6b95b1de', 'Burst Tester', 'burst_1_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:45.985Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485925828-l6qh1', 'prof-6b1d9c8303638b56', 'Burst Tester', 'burst_0_mwdikx7l@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:18:45.828Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485877734-9d8jz', 'prof-faab8e6532f668a2', 'Dr. Vikramaditya mwdik4hz', 'audit.leader.mwdik4hz@sist.edu.in', '', 'Sathyabama Institute of Science and Technology', 'Final Year B.Tech CSE', 'Computer Science & Cloud Engineering', 'Agentic AI & Autonomous Systems', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:17:57.734Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485851201-fuz0e', 'prof-3dfe02a2369910d0', 'Dr. Vikramaditya mwdijj7i', 'audit.leader.mwdijj7i@sist.edu.in', '', 'Sathyabama Institute of Science and Technology', 'Final Year B.Tech CSE', 'Computer Science & Cloud Engineering', 'Agentic AI & Autonomous Systems', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:17:31.202Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485762242-jwtaq', 'prof-6e97d5937ab08e40', 'Dr. Vikramaditya mwdihko2', 'audit.leader.mwdihko2@sist.edu.in', '', 'Sathyabama Institute of Science and Technology', 'Final Year B.Tech CSE', 'Computer Science & Cloud Engineering', 'Agentic AI & Autonomous Systems', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:16:02.242Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485410291-mf8sr', 'prof-4710c1266247d631', 'Varun Nair', 'reg.builder.1794485408809@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T12:10:10.291Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794485368736-tmung', 'prof-08a3ffd7726bc890', 'Ravi Chandran', 'ravi.chandran.1794485361490@sathyabama.ac.in', '+91 97403 99001', 'SIST', '3rd Year', 'Computer Science & Engineering', 'track-quantum', NULL, NULL, 'seeking_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:09:28.736Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794483833587-7981c', 'prof-4fdffe8102ef7fc9', 'Varun Nair', 'reg.builder.1794483832299@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T11:43:53.587Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794483814048-s8z1t', 'prof-6a1ba72b18affeab', 'Ravi Chandran', 'ravi.chandran.1794483809177@sathyabama.ac.in', '+91 97403 99001', 'SIST', '3rd Year', 'Computer Science & Engineering', 'track-quantum', NULL, NULL, 'seeking_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T11:43:34.048Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794482612902-jndtb', 'prof-0ef9234e445cc96b', 'Varun Nair', 'reg.builder.1794482611880@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T11:23:32.902Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794482590185-4s5sd', 'prof-ef09afaabe2772ca', 'Ravi Chandran', 'ravi.chandran.1794482584063@sathyabama.ac.in', '+91 97403 99001', 'SIST', '3rd Year', 'Computer Science & Engineering', 'track-quantum', NULL, NULL, 'seeking_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T11:23:10.185Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794481652888-dqkxi', 'prof-c56021cd5c6e55fb', 'Ravi Chandran', 'ravi.chandran.1794481647677@sathyabama.ac.in', '+91 97403 99001', 'SIST', '3rd Year', 'Computer Science & Engineering', 'track-quantum', NULL, NULL, 'seeking_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T11:07:32.888Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794480960434-rc1gh', 'prof-3c661135315e61a5', 'Varun Nair', 'reg.builder.1794480958468@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T10:56:00.434Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794480869903-9my84', 'prof-450a6cdace83804f', 'Ananya Sathyabama Builder', 'builder.1794480869457@sathyabama.ac.in', NULL, 'Sathyabama Institute of Science and Technology', 'Undergraduate', 'Engineering', 'Agentic AI & Generative Workflows', '', 'Building autonomous consensus agents', 'seeking_team', NULL, NULL, NULL, 'pending', '2026-11-12T10:54:29.903Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794480850463-o8z46', 'prof-0e04e2c29deb6793', 'Varun Nair', 'reg.builder.1794480847598@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T10:54:10.463Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794480730985-e3um4', 'prof-a85c39428650cba3', 'Varun Nair', 'reg.builder.1794480730596@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T10:52:10.985Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794480668743-hl9j7', 'prof-f172c5a701dd958a', 'Varun Nair', 'reg.builder.1794480668277@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T10:51:08.743Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794480609788-81kp4', 'prof-656e37b22dd8f248', 'Varun Nair', 'reg.builder.1794480606458@sathyabama.ac.in', '+91 98401 22334', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'XL', 'pending', '2026-11-12T10:50:09.788Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794479985925-qbzk9', 'prof-79afbf9887984722', 'Ananya Sathyabama Builder', 'builder.1794479985606@sathyabama.ac.in', NULL, 'Sathyabama Institute of Science and Technology', 'Undergraduate', 'Engineering', 'Agentic AI & Generative Workflows', '', 'Building autonomous consensus agents', 'seeking_team', NULL, NULL, NULL, 'pending', '2026-11-12T10:39:45.925Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('demo-w2', 'prof-4f5ec056ed16eb76', 'Pooja Venkatesh', 'pooja.v@example.edu', NULL, 'Sathyabama Institute of Science and Technology', '4th Year', 'School of Computing', 'Cloud-Native Distributed Systems', 'https://github.com/pooja-v', 'Exploring high-throughput distributed transaction settlement with event-driven consensus.', 'seeking_team', NULL, NULL, NULL, 'reviewed', '2026-10-24T14:30:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('demo-w1', 'prof-e4150b989184dd23', 'Aarav Sharma', 'aarav.sharma@example.edu', NULL, 'IIT Madras', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Workflows', 'https://github.com/aarav', 'Building autonomous distributed agent systems for verifiable research synthesis.', 'seeking_team', NULL, NULL, NULL, 'pending', '2026-10-24T10:15:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486082101-b410v', 'prof-cb7c64a1f237eb46', 'Burst Tester', 'burst_0_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:22.101Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486082342-ocwyq', 'prof-2d8a50a0db1914b5', 'Burst Tester', 'burst_1_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:22.342Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486082509-eut0h', 'prof-09a72de4ba4a6ec6', 'Burst Tester', 'burst_2_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:22.509Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486082668-jpnq3', 'prof-4b0efb7b84061b83', 'Burst Tester', 'burst_3_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:22.668Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486082848-yuljg', 'prof-ae7bace945b2005a', 'Burst Tester', 'burst_4_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:22.848Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486083011-felcs', 'prof-f0b2e29b9836f183', 'Burst Tester', 'burst_5_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:23.011Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486083772-ffeol', 'prof-38ea73b0a8cc6c14', 'Burst Tester', 'burst_6_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:23.772Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486083991-4g5h1', 'prof-6d5d6cf157a9d62e', 'Burst Tester', 'burst_7_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:23.991Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486084184-c7tkt', 'prof-cebb6292b60699e4', 'Burst Tester', 'burst_8_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:24.184Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, portfolio_url, motivation, team_status, team_code, experience_level, tshirt_size, status, created_at)
VALUES ('w-1794486084379-h5fb4', 'prof-c9b62dd3f0c09fac', 'Burst Tester', 'burst_9_mwdioehv@test.com', '+91 99999 88888', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', NULL, NULL, 'looking_for_team', NULL, 'Intermediate', 'L', 'pending', '2026-11-12T12:21:24.379Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = timezone('utc'::text, now());

-- 3. TEAMS
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-k75-01', 'KAIROS-T001', 'Chronos Distributed', 'KAIROS-7721', 'cloud-native', NULL, NULL, NULL, 'prof-4f5ec056ed16eb76', 'pooja.v@example.edu', 'ROUND_0_APPLICANT', 'shortlisted', 'Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry', 'A fault-tolerant stream processing engine handling 100k events/sec with distributed consensus and zero data loss.', 'https://github.com/kairos2027/chronos-stream', 'https://loom.com/share/chronos-demo', '2026-10-25T08:00:00.000Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794480611914', 'KAIROS-T002', 'NeuralMesh Alpha 1794480606458', 'KAIROS-6752', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-ab62f5a90d59527d', 'leader.1794480606458@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-mesh-alpha', NULL, '2026-11-12T10:50:11.914Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794480659586', 'KAIROS-T003', 'Debug Squad 99', 'KAIROS-6159', 'edge-iot', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-08f124bcf13b8629', 'debuglead@example.com', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/example/repo', NULL, '2026-11-12T10:50:59.586Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794480733739', 'KAIROS-T004', 'Karthik Solo Squad 1794480730596', 'KAIROS-1041', 'track-fintech-trust', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-2be3d1a1f79e9c1d', 'leader.1794480730596@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, '', NULL, '2026-11-12T10:52:13.739Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794480852617', 'KAIROS-T005', 'NeuralMesh Alpha 1794480847598', 'KAIROS-9289', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-e23efe0214591b78', 'member1.1794480847598@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-mesh-alpha', NULL, '2026-11-12T10:54:12.617Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794480855359', 'KAIROS-T006', 'Karthik Solo Squad 1794480847598', 'KAIROS-4410', 'track-fintech-trust', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-02f23bbef9caa9e0', 'leader.1794480847598@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, '', NULL, '2026-11-12T10:54:15.359Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794480963251', 'KAIROS-T007', 'NeuralMesh Alpha 1794480958468', 'KAIROS-7352', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-cdb341015f9376a6', 'member1.1794480958468@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-mesh-alpha', NULL, '2026-11-12T10:56:03.251Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794480969400', 'KAIROS-T008', 'Karthik Solo Squad 1794480958468', 'KAIROS-8231', 'track-fintech-trust', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-ddf1e7258bfaec7c', 'leader.1794480958468@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, '', NULL, '2026-11-12T10:56:09.400Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794481651425', 'KAIROS-T009', 'Titan Mesh 1794481647677', 'KAIROS-7542', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-59819c90d377c5e6', 'arjun.raman.1794481647677@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/titan-mesh', NULL, '2026-11-12T11:07:31.425Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482550824', 'KAIROS-T010', 'Neural Apex 1794482545766', 'KAIROS-3159', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-dbfb4610a59a6fbd', 'lead.p6.1794482545766@example.edu', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-apex', NULL, '2026-11-12T11:22:30.824Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482573041', 'KAIROS-T011', 'Neural Apex 1794482569558', 'KAIROS-7867', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-3e056a8312672c66', 'lead.p6.1794482569558@example.edu', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-apex', NULL, '2026-11-12T11:22:53.041Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482575225', 'KAIROS-T012', 'Disqualified Team 1794482569558', 'KAIROS-4402', 'open-enterprise', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-5c1d20133de8d932', 'dq.lead.1794482569558@example.edu', 'DISQUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-dq', NULL, '2026-11-12T11:22:55.225Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482578068', 'KAIROS-T013', 'FI Test Team 1794482569558', 'KAIROS-1425', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-6c8259f4e845301c', 'fi.lead.1794482569558@example.edu', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-fi', NULL, '2026-11-12T11:22:58.068Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482588008', 'KAIROS-T014', 'Titan Mesh 1794482584063', 'KAIROS-3285', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-e0affc4d91f8e090', 'arjun.raman.1794482584063@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/titan-mesh', NULL, '2026-11-12T11:23:08.008Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482615012', 'KAIROS-T015', 'NeuralMesh Alpha 1794482611880', 'KAIROS-1047', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-3d6673c59b558922', 'member1.1794482611880@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-mesh-alpha', NULL, '2026-11-12T11:23:35.012Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482620756', 'KAIROS-T016', 'Karthik Solo Squad 1794482611880', 'KAIROS-6842', 'track-fintech-trust', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-fee0ccbfac5207c5', 'leader.1794482611880@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, '', NULL, '2026-11-12T11:23:40.756Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482723793', 'KAIROS-T017', 'Neural Apex 1794482700408', 'KAIROS-5029', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-9ef6efd984f0c3c7', 'lead.p6.1794482700408@example.edu', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-apex', NULL, '2026-11-12T11:25:23.793Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482727062', 'KAIROS-T018', 'Disqualified Team 1794482700408', 'KAIROS-6395', 'edge-iot', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-15ad5ff9eca02b8e', 'dq.lead.1794482700408@example.edu', 'DISQUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-dq', NULL, '2026-11-12T11:25:27.062Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794482732545', 'KAIROS-T019', 'FI Test Team 1794482700408', 'KAIROS-5684', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-6a299ef47f54a152', 'fi.lead.1794482700408@example.edu', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-fi', NULL, '2026-11-12T11:25:32.545Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794483795022', 'KAIROS-T020', 'Neural Apex 1794483786255', 'KAIROS-6533', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-68d9889536cbfa09', 'lead.p6.1794483786255@example.edu', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-apex', NULL, '2026-11-12T11:43:15.022Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794483797762', 'KAIROS-T021', 'Disqualified Team 1794483786255', 'KAIROS-4520', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-70e03125a8370c09', 'dq.lead.1794483786255@example.edu', 'DISQUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-dq', NULL, '2026-11-12T11:43:17.762Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794483803458', 'KAIROS-T022', 'FI Test Team 1794483786255', 'KAIROS-4973', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-7cdadc7229ca3911', 'fi.lead.1794483786255@example.edu', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-fi', NULL, '2026-11-12T11:43:23.458Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794483811434', 'KAIROS-T023', 'Titan Mesh 1794483809177', 'KAIROS-4866', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-1dc0fc9067349dcd', 'arjun.raman.1794483809177@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/titan-mesh', NULL, '2026-11-12T11:43:31.434Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794483836074', 'KAIROS-T024', 'NeuralMesh Alpha 1794483832299', 'KAIROS-4661', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-ce3571db5fad0948', 'member1.1794483832299@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-mesh-alpha', NULL, '2026-11-12T11:43:56.074Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794483841653', 'KAIROS-T025', 'Karthik Solo Squad 1794483832299', 'KAIROS-1832', 'track-fintech-trust', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-658768dfe9398e38', 'leader.1794483832299@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, '', NULL, '2026-11-12T11:44:01.653Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485027877', 'KAIROS-T026', 'Titan AI mwdi1tle', 'KAIROS-9773', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-176eb300ab73eb21', 'email.leader.mwdi1tle@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, '', NULL, '2026-11-12T12:03:47.877Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485260105', 'KAIROS-T027', 'Titan AI mwdi6uqj', 'KAIROS-9385', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-459660b3fde988c5', 'email.leader.mwdi6uqj@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, '', NULL, '2026-11-12T12:07:40.105Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485292413', 'KAIROS-T028', 'Titan AI mwdi7knz', 'KAIROS-4953', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-6023da92008a4ba8', 'email.leader.mwdi7knz@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, '', NULL, '2026-11-12T12:08:12.413Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485332153', 'KAIROS-T029', 'Neural Apex 1794485321265', 'KAIROS-2652', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-9c7fed66fbe8f17e', 'lead.p6.1794485321265@example.edu', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-apex', NULL, '2026-11-12T12:08:52.153Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485337016', 'KAIROS-T030', 'Disqualified Team 1794485321265', 'KAIROS-3863', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-03b35c7a6dd26a01', 'dq.lead.1794485321265@example.edu', 'DISQUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-dq', NULL, '2026-11-12T12:08:57.016Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485348064', 'KAIROS-T031', 'FI Test Team 1794485321265', 'KAIROS-7461', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-ed6739134ea9fe81', 'fi.lead.1794485321265@example.edu', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/test-fi', NULL, '2026-11-12T12:09:08.064Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485365032', 'KAIROS-T032', 'Titan Mesh 1794485361490', 'KAIROS-2893', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-0835a52218af42e0', 'arjun.raman.1794485361490@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/titan-mesh', NULL, '2026-11-12T12:09:25.032Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485412819', 'KAIROS-T033', 'NeuralMesh Alpha 1794485408809', 'KAIROS-3704', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-f438ca5721e51ad5', 'member1.1794485408809@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/kairos2027/neural-mesh-alpha', NULL, '2026-11-12T12:10:12.819Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485420684', 'KAIROS-T034', 'Karthik Solo Squad 1794485408809', 'KAIROS-6143', 'track-fintech-trust', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-2191374f8a163340', 'leader.1794485408809@sathyabama.ac.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, '', NULL, '2026-11-12T12:10:20.684Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485512012', 'KAIROS-T035', 'Titan AI mwdic9oe', 'KAIROS-1637', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-dc0f549cf50c34ba', 'email.leader.mwdic9oe@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, '', NULL, '2026-11-12T12:11:52.012Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485766399', 'KAIROS-T036', 'Apex Autonomous Swarm mwdihko2', 'KAIROS-9501', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-6e97d5937ab08e40', 'audit.leader.mwdihko2@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos-builders/apex-swarm-mwdihko2', 'https://loom.com/share/apex-swarm-defense-mwdihko2', '2026-11-12T12:16:06.399Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485853210', 'KAIROS-T037', 'Apex Autonomous Swarm mwdijj7i', 'KAIROS-1273', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-3dfe02a2369910d0', 'audit.leader.mwdijj7i@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos-builders/apex-swarm-mwdijj7i', 'https://loom.com/share/apex-swarm-defense-mwdijj7i', '2026-11-12T12:17:33.210Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794485878759', 'KAIROS-T038', 'Apex Autonomous Swarm mwdik4hz', 'KAIROS-9492', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-faab8e6532f668a2', 'audit.leader.mwdik4hz@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, 'https://github.com/kairos-builders/apex-swarm-mwdik4hz', 'https://loom.com/share/apex-swarm-defense-mwdik4hz', '2026-11-12T12:17:58.759Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794486015544', 'KAIROS-T039', 'Victim Fortress mwdin1vf', 'KAIROS-4313', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-cbcaccd7e5390c87', 'victim_mwdin1vf@sist.edu.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/alice-victim', NULL, '2026-11-12T12:20:15.544Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794486015693', 'KAIROS-T040', 'Attacker Squad mwdin1vf', 'KAIROS-8139', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-072efd1d88ae06d1', 'attacker_mwdin1vf@sist.edu.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/eve-attacker', NULL, '2026-11-12T12:20:15.693Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794486078991', 'KAIROS-T041', 'Victim Fortress mwdioehv', 'KAIROS-9795', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-459f6b7990d5ed32', 'victim_mwdioehv@sist.edu.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/alice-victim', NULL, '2026-11-12T12:21:18.991Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794486079164', 'KAIROS-T042', 'Attacker Squad mwdioehv', 'KAIROS-3713', 'track-agentic-ai', 'SIST Chennai', 'Chennai', 'Tamil Nadu', 'prof-47f70046498e2b79', 'attacker_mwdioehv@sist.edu.in', 'ROUND_0_APPLICANT', 'pending', NULL, NULL, 'https://github.com/eve-attacker', NULL, '2026-11-12T12:21:19.164Z')
ON CONFLICT (id) DO UPDATE SET
  team_name = EXCLUDED.team_name,
  selection_stage = EXCLUDED.selection_stage,
  project_title = EXCLUDED.project_title,
  project_abstract = EXCLUDED.project_abstract,
  github_url = EXCLUDED.github_url,
  loom_video_url = EXCLUDED.loom_video_url,
  updated_at = timezone('utc'::text, now());
INSERT INTO public.teams (id, team_code, team_name, invite_code, track_id, institution_name, city, state, leader_profile_id, leader_email, selection_stage, status, project_title, project_abstract, github_url, loom_video_url, created_at)
VALUES ('team-1794486332890', 'KAIROS-T043', 'Titan AI mwditu9t', 'KAIROS-8658', 'track-agentic-ai', 'SIST', 'Chennai', 'Tamil Nadu', 'prof-d05d9bcf147fbb13', 'email.leader.mwditu9t@sist.edu.in', 'ON_CAMPUS_QUALIFIED', 'pending', NULL, NULL, '', NULL, '2026-11-12T12:25:32.890Z')
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
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794480611914', 'team-1794480611914', 'prof-ab62f5a90d59527d', 'Karthik Subramanian', 'leader.1794480606458@sathyabama.ac.in', '+91 99401 11223', '44118877', 'Leader', 'SIST Chennai', 'https://meetup.com/members/karthik-subramanian', NULL, TRUE, 'https://community.aws/@karthik', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794480659586', 'team-1794480659586', 'prof-08f124bcf13b8629', 'Debug Lead', 'debuglead@example.com', '', '', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480659678', 'team-1794480659586', 'prof-cf6c580f638e3139', 'Member One', 'memberone@example.com', '', '', 'Backend', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794480733739', 'team-1794480733739', 'prof-2be3d1a1f79e9c1d', 'Karthik Subramanian', 'leader.1794480730596@sathyabama.ac.in', '', '', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480853369', 'team-1794480852617', 'prof-e23efe0214591b78', 'Priya Dharshini', 'member1.1794480847598@sathyabama.ac.in', '+91 98402 33445', '44117766', 'Leader', 'SIST', 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480853671', 'team-1794480852617', 'prof-266d8d7bd57f69ef', 'Builder 3', 'builder3.1794480847598@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480853737', 'team-1794480852617', 'prof-5b72b17cc00b41c3', 'Builder 4', 'builder4.1794480847598@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480853808', 'team-1794480852617', 'prof-203fcef7501c16cf', 'Builder 5', 'builder5.1794480847598@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794480855359', 'team-1794480855359', 'prof-02f23bbef9caa9e0', 'Karthik Subramanian', 'leader.1794480847598@sathyabama.ac.in', '', '', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480965607', 'team-1794480963251', 'prof-cdb341015f9376a6', 'Priya Dharshini', 'member1.1794480958468@sathyabama.ac.in', '+91 98402 33445', '44117766', 'Leader', 'SIST', 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480965993', 'team-1794480963251', 'prof-4219cf2efa2e1066', 'Builder 3', 'builder3.1794480958468@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480966119', 'team-1794480963251', 'prof-b5412dec9f939007', 'Builder 4', 'builder4.1794480958468@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794480966223', 'team-1794480963251', 'prof-e9c86feda3712c43', 'Builder 5', 'builder5.1794480958468@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794480969400', 'team-1794480969400', 'prof-ddf1e7258bfaec7c', 'Karthik Subramanian', 'leader.1794480958468@sathyabama.ac.in', '', '', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794481651425', 'team-1794481651425', 'prof-59819c90d377c5e6', 'Arjun Ramanathan', 'arjun.raman.1794481647677@sathyabama.ac.in', '+91 99401 55667', '44112233', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794481652050', 'team-1794481651425', 'prof-2b6f11772ceecd48', 'Meera Krishnan', 'meera.krish.1794481647677@sathyabama.ac.in', '+91 98402 77889', '44113344', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482550824', 'team-1794482550824', 'prof-dbfb4610a59a6fbd', 'Team Leader P6', 'lead.p6.1794482545766@example.edu', '+91 99401 11223', '44118877', 'Leader', 'SIST Chennai', 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482573041', 'team-1794482573041', 'prof-3e056a8312672c66', 'Team Leader P6', 'lead.p6.1794482569558@example.edu', '+91 99401 11223', '44118877', 'Leader', 'SIST Chennai', 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482575225', 'team-1794482575225', 'prof-5c1d20133de8d932', 'DQ Leader', 'dq.lead.1794482569558@example.edu', '+91 99999 88888', '44119999', 'Leader', 'SIST', 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482578068', 'team-1794482578068', 'prof-6c8259f4e845301c', 'Formula Tester', 'fi.lead.1794482569558@example.edu', '+91 99999 77777', '44117777', 'Leader', 'SIST', 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482588008', 'team-1794482588008', 'prof-e0affc4d91f8e090', 'Arjun Ramanathan', 'arjun.raman.1794482584063@sathyabama.ac.in', '+91 99401 55667', '44112233', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794482589171', 'team-1794482588008', 'prof-3896e404542ad86f', 'Meera Krishnan', 'meera.krish.1794482584063@sathyabama.ac.in', '+91 98402 77889', '44113344', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794482616786', 'team-1794482615012', 'prof-3d6673c59b558922', 'Priya Dharshini', 'member1.1794482611880@sathyabama.ac.in', '+91 98402 33445', '44117766', 'Leader', 'SIST', 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794482617226', 'team-1794482615012', 'prof-8fe5d90e8d3c787e', 'Builder 3', 'builder3.1794482611880@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794482617321', 'team-1794482615012', 'prof-5be5126b609cb1d5', 'Builder 4', 'builder4.1794482611880@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794482617413', 'team-1794482615012', 'prof-d2f95f22aea9e408', 'Builder 5', 'builder5.1794482611880@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482620756', 'team-1794482620756', 'prof-fee0ccbfac5207c5', 'Karthik Subramanian', 'leader.1794482611880@sathyabama.ac.in', '', '', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482723793', 'team-1794482723793', 'prof-9ef6efd984f0c3c7', 'Team Leader P6', 'lead.p6.1794482700408@example.edu', '+91 99401 11223', '44118877', 'Leader', 'SIST Chennai', 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482727062', 'team-1794482727062', 'prof-15ad5ff9eca02b8e', 'DQ Leader', 'dq.lead.1794482700408@example.edu', '+91 99999 88888', '44119999', 'Leader', 'SIST', 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794482732545', 'team-1794482732545', 'prof-6a299ef47f54a152', 'Formula Tester', 'fi.lead.1794482700408@example.edu', '+91 99999 77777', '44117777', 'Leader', 'SIST', 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794483795022', 'team-1794483795022', 'prof-68d9889536cbfa09', 'Team Leader P6', 'lead.p6.1794483786255@example.edu', '+91 99401 11223', '44118877', 'Leader', 'SIST Chennai', 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794483797762', 'team-1794483797762', 'prof-70e03125a8370c09', 'DQ Leader', 'dq.lead.1794483786255@example.edu', '+91 99999 88888', '44119999', 'Leader', 'SIST', 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794483803458', 'team-1794483803458', 'prof-7cdadc7229ca3911', 'Formula Tester', 'fi.lead.1794483786255@example.edu', '+91 99999 77777', '44117777', 'Leader', 'SIST', 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794483811434', 'team-1794483811434', 'prof-1dc0fc9067349dcd', 'Arjun Ramanathan', 'arjun.raman.1794483809177@sathyabama.ac.in', '+91 99401 55667', '44112233', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794483812174', 'team-1794483811434', 'prof-302082cd97ee57a4', 'Meera Krishnan', 'meera.krish.1794483809177@sathyabama.ac.in', '+91 98402 77889', '44113344', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794483837441', 'team-1794483836074', 'prof-ce3571db5fad0948', 'Priya Dharshini', 'member1.1794483832299@sathyabama.ac.in', '+91 98402 33445', '44117766', 'Leader', 'SIST', 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794483837929', 'team-1794483836074', 'prof-9a932b5042cadfd0', 'Builder 3', 'builder3.1794483832299@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794483838051', 'team-1794483836074', 'prof-14478d82134829b7', 'Builder 4', 'builder4.1794483832299@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794483838216', 'team-1794483836074', 'prof-fad7082950253007', 'Builder 5', 'builder5.1794483832299@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794483841653', 'team-1794483841653', 'prof-658768dfe9398e38', 'Karthik Subramanian', 'leader.1794483832299@sathyabama.ac.in', '', '', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485027877', 'team-1794485027877', 'prof-176eb300ab73eb21', 'Leader mwdi1tle', 'email.leader.mwdi1tle@sist.edu.in', '9876543210', 'REGMWDI1TLE', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485030895', 'team-1794485027877', 'prof-7ce461d90ea3f328', 'Confirmed Teammate', 'email.member.mwdi1tle@sist.edu.in', '9876543211', 'REG2MWDI1TLE', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485260105', 'team-1794485260105', 'prof-459660b3fde988c5', 'Leader mwdi6uqj', 'email.leader.mwdi6uqj@sist.edu.in', '9876543210', 'REGMWDI6UQJ', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485261380', 'team-1794485260105', 'prof-27ee3098170f10bb', 'Confirmed Teammate', 'email.member.mwdi6uqj@sist.edu.in', '9876543211', 'REG2MWDI6UQJ', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485292413', 'team-1794485292413', 'prof-6023da92008a4ba8', 'Leader mwdi7knz', 'email.leader.mwdi7knz@sist.edu.in', '9876543210', 'REGMWDI7KNZ', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485293499', 'team-1794485292413', 'prof-b73c3c8d7d114b15', 'Confirmed Teammate', 'email.member.mwdi7knz@sist.edu.in', '9876543211', 'REG2MWDI7KNZ', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485332153', 'team-1794485332153', 'prof-9c7fed66fbe8f17e', 'Team Leader P6', 'lead.p6.1794485321265@example.edu', '+91 99401 11223', '44118877', 'Leader', 'SIST Chennai', 'https://meetup.com/members/leader-p6', NULL, TRUE, 'https://community.aws/@leaderp6', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485337016', 'team-1794485337016', 'prof-03b35c7a6dd26a01', 'DQ Leader', 'dq.lead.1794485321265@example.edu', '+91 99999 88888', '44119999', 'Leader', 'SIST', 'https://meetup.com/members/dq-leader', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485348064', 'team-1794485348064', 'prof-ed6739134ea9fe81', 'Formula Tester', 'fi.lead.1794485321265@example.edu', '+91 99999 77777', '44117777', 'Leader', 'SIST', 'https://meetup.com/members/fi-tester', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485365032', 'team-1794485365032', 'prof-0835a52218af42e0', 'Arjun Ramanathan', 'arjun.raman.1794485361490@sathyabama.ac.in', '+91 99401 55667', '44112233', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485366043', 'team-1794485365032', 'prof-e5e4578b866b0e70', 'Meera Krishnan', 'meera.krish.1794485361490@sathyabama.ac.in', '+91 98402 77889', '44113344', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485414961', 'team-1794485412819', 'prof-f438ca5721e51ad5', 'Priya Dharshini', 'member1.1794485408809@sathyabama.ac.in', '+91 98402 33445', '44117766', 'Leader', 'SIST', 'https://meetup.com/members/priya-dharshini', NULL, TRUE, 'https://community.aws/@priya', 'M', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485415590', 'team-1794485412819', 'prof-1111141b3fabd1ef', 'Builder 3', 'builder3.1794485408809@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485415735', 'team-1794485412819', 'prof-a9442b228d5b3e36', 'Builder 4', 'builder4.1794485408809@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485415869', 'team-1794485412819', 'prof-be62771ed7fd6089', 'Builder 5', 'builder5.1794485408809@sathyabama.ac.in', '', '', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485420684', 'team-1794485420684', 'prof-2191374f8a163340', 'Karthik Subramanian', 'leader.1794485408809@sathyabama.ac.in', '', '', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485512012', 'team-1794485512012', 'prof-dc0f549cf50c34ba', 'Leader mwdic9oe', 'email.leader.mwdic9oe@sist.edu.in', '9876543210', 'REGMWDIC9OE', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485514721', 'team-1794485512012', 'prof-224d6b284f10180b', 'Confirmed Teammate', 'email.member.mwdic9oe@sist.edu.in', '9876543211', 'REG2MWDIC9OE', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485766399', 'team-1794485766399', 'prof-6e97d5937ab08e40', 'Dr. Vikramaditya mwdihko2', 'audit.leader.mwdihko2@sist.edu.in', '9840123456', 'REGMWDIHKO2', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485769316', 'team-1794485766399', 'prof-a8aa67a16c5fd45e', 'Ananya Systems Architect', 'audit.member.mwdihko2@sist.edu.in', '9840987654', 'REG-M-MWDIHKO2', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485853210', 'team-1794485853210', 'prof-3dfe02a2369910d0', 'Dr. Vikramaditya mwdijj7i', 'audit.leader.mwdijj7i@sist.edu.in', '9840123456', 'REGMWDIJJ7I', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485855277', 'team-1794485853210', 'prof-79271bdc47599875', 'Ananya Systems Architect', 'audit.member.mwdijj7i@sist.edu.in', '9840987654', 'REG-M-MWDIJJ7I', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794485878759', 'team-1794485878759', 'prof-faab8e6532f668a2', 'Dr. Vikramaditya mwdik4hz', 'audit.leader.mwdik4hz@sist.edu.in', '9840123456', 'REGMWDIK4HZ', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794485880163', 'team-1794485878759', 'prof-c5a97b3b2a731dbe', 'Ananya Systems Architect', 'audit.member.mwdik4hz@sist.edu.in', '9840987654', 'REG-M-MWDIK4HZ', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794486015544', 'team-1794486015544', 'prof-cbcaccd7e5390c87', 'Alice Victim', 'victim_mwdin1vf@sist.edu.in', '9840123456', 'VICMWDIN1VF', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794486015693', 'team-1794486015693', 'prof-072efd1d88ae06d1', 'Eve Attacker', 'attacker_mwdin1vf@sist.edu.in', '9840987654', 'ATTMWDIN1VF', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794486078991', 'team-1794486078991', 'prof-459f6b7990d5ed32', 'Alice Victim', 'victim_mwdioehv@sist.edu.in', '9840123456', 'VICMWDIOEHV', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794486079164', 'team-1794486079164', 'prof-47f70046498e2b79', 'Eve Attacker', 'attacker_mwdioehv@sist.edu.in', '9840987654', 'ATTMWDIOEHV', 'Leader', 'SIST Chennai', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-lead-1794486332890', 'team-1794486332890', 'prof-d05d9bcf147fbb13', 'Leader mwditu9t', 'email.leader.mwditu9t@sist.edu.in', '9876543210', 'REGMWDITU9T', 'Leader', 'SIST', '', NULL, TRUE, '', NULL, NULL, NULL, TRUE, timezone('utc'::text, now()))
ON CONFLICT (team_id, email) DO UPDATE SET
  role = EXCLUDED.role,
  confirmed = EXCLUDED.confirmed;
INSERT INTO public.team_members (id, team_id, profile_id, name, email, phone, college_reg_no, role, college, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, bus_route, confirmed, created_at)
VALUES ('m-1794486334193', 'team-1794486332890', 'prof-481ac92d5cc624d0', 'Confirmed Teammate', 'email.member.mwditu9t@sist.edu.in', '9876543211', 'REG2MWDITU9T', 'AI / Cloud', 'SIST', '', NULL, TRUE, '', 'L', NULL, NULL, TRUE, timezone('utc'::text, now()))
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
VALUES ('log-1794486337846-jqzp', '2026-11-12T12:25:37.846Z', 'Thenappan T', 'BROADCAST_ANNOUNCEMENT', 'Broadcast "Grand Finale Opening Ceremony & Keynote by AWS" (SCHEDULE, HIGH) to 74/74 builders across track ALL')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486336645-qncg', '2026-11-12T12:25:36.645Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T043 (Titan AI mwditu9t) at desk bay [BAY-D09 (Auditorium Bay 3)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486335979-lvb2', '2026-11-12T12:25:35.979Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T043] updated by Thenappan T: selectionStage, deskBayAllocation, reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486325980-tmft', '2026-11-12T12:25:25.980Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486300915-4a4o', '2026-11-12T12:25:00.915Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486084988-gr1z', '2026-11-12T12:21:24.988Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486081402-htmy', '2026-11-12T12:21:21.402Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486078801-ft9r', '2026-11-12T12:21:18.801Z', 'Alice Victim', 'STUDENT_LOGIN', 'Student logged in successfully [victim_mwdioehv@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486077993-u5kk', '2026-11-12T12:21:17.993Z', 'Eve Attacker', 'STUDENT_LOGIN', 'Student logged in successfully [attacker_mwdioehv@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486037961-6e3q', '2026-11-12T12:20:37.961Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486026723-n0ud', '2026-11-12T12:20:26.723Z', 'Failed Login Attempt', 'AUTH_FAILURE', 'Invalid passkey attempted for identity [Thenappan T]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486015397-l30l', '2026-11-12T12:20:15.397Z', 'Alice Victim', 'STUDENT_LOGIN', 'Student logged in successfully [victim_mwdin1vf@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794486014576-76yo', '2026-11-12T12:20:14.576Z', 'Eve Attacker', 'STUDENT_LOGIN', 'Student logged in successfully [attacker_mwdin1vf@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485928846-mbxu', '2026-11-12T12:18:48.846Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485915894-r36e', '2026-11-12T12:18:35.894Z', 'Alice Victim', 'STUDENT_LOGIN', 'Student logged in successfully [victim_mwdikx7l@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485915156-3k75', '2026-11-12T12:18:35.156Z', 'Eve Attacker', 'STUDENT_LOGIN', 'Student logged in successfully [attacker_mwdikx7l@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485883837-5ayz', '2026-11-12T12:18:03.837Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T038 (Apex Autonomous Swarm mwdik4hz) at desk bay [BAY-A01 (Main Auditorium Stage Wing)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485881252-qfyb', '2026-11-12T12:18:01.252Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T038]: 96/100 (Normalized Z-score: 0.8273)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485881117-sgbt', '2026-11-12T12:18:01.117Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485880783-a5ue', '2026-11-12T12:18:00.783Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T038] updated by Thenappan T: selectionStage, deskBayAllocation, awsCreditVoucher (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485880634-wy8r', '2026-11-12T12:18:00.634Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T038] updated by Thenappan T: reviewerNotes, reviewedBy, reviewedAt (Stage: ROUND_0_APPLICANT)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485880486-p5nz', '2026-11-12T12:18:00.486Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485879829-e4c9', '2026-11-12T12:17:59.829Z', 'Ananya Systems Architect', 'STUDENT_LOGIN', 'Student logged in successfully [audit.member.mwdik4hz@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485878563-a83b', '2026-11-12T12:17:58.563Z', 'Dr. Vikramaditya mwdik4hz', 'STUDENT_LOGIN', 'Student logged in successfully [audit.leader.mwdik4hz@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485857851-8e2f', '2026-11-12T12:17:37.851Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T037 (Apex Autonomous Swarm mwdijj7i) at desk bay [BAY-A01 (Main Auditorium Stage Wing)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485856772-hosi', '2026-11-12T12:17:36.772Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T037]: 96/100 (Normalized Z-score: 0.9755)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485856582-qezs', '2026-11-12T12:17:36.582Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485856139-md8c', '2026-11-12T12:17:36.139Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T037] updated by Thenappan T: selectionStage, deskBayAllocation, awsCreditVoucher (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485855978-iuct', '2026-11-12T12:17:35.978Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T037] updated by Thenappan T: reviewerNotes, reviewedBy, reviewedAt (Stage: ROUND_0_APPLICANT)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485855762-k3q5', '2026-11-12T12:17:35.762Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485854974-d6gp', '2026-11-12T12:17:34.974Z', 'Ananya Systems Architect', 'STUDENT_LOGIN', 'Student logged in successfully [audit.member.mwdijj7i@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485852783-nmtk', '2026-11-12T12:17:32.783Z', 'Dr. Vikramaditya mwdijj7i', 'STUDENT_LOGIN', 'Student logged in successfully [audit.leader.mwdijj7i@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485781726-5lj5', '2026-11-12T12:16:21.726Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T036 (Apex Autonomous Swarm mwdihko2) at desk bay [BAY-A01 (Main Auditorium Stage Wing)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485772924-7bam', '2026-11-12T12:16:12.924Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T036] updated by Thenappan T: selectionStage, deskBayAllocation, awsCreditVoucher (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485772721-cxkm', '2026-11-12T12:16:12.721Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T036] updated by Thenappan T: reviewerNotes, reviewedBy, reviewedAt (Stage: ROUND_0_APPLICANT)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485771061-7qer', '2026-11-12T12:16:11.061Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485769070-w9v6', '2026-11-12T12:16:09.070Z', 'Ananya Systems Architect', 'STUDENT_LOGIN', 'Student logged in successfully [audit.member.mwdihko2@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485765516-inv9', '2026-11-12T12:16:05.516Z', 'Dr. Vikramaditya mwdihko2', 'STUDENT_LOGIN', 'Student logged in successfully [audit.leader.mwdihko2@sist.edu.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485519480-0ezs', '2026-11-12T12:11:59.480Z', 'Thenappan T', 'BROADCAST_ANNOUNCEMENT', 'Broadcast "Grand Finale Opening Ceremony & Keynote by AWS" (SCHEDULE, HIGH) to 60/62 builders across track ALL')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485518678-3i6w', '2026-11-12T12:11:58.678Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T035 (Titan AI mwdic9oe) at desk bay [BAY-D09 (Auditorium Bay 3)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485516516-wo1w', '2026-11-12T12:11:56.516Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T035] updated by Thenappan T: selectionStage, deskBayAllocation, reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485502217-ydjs', '2026-11-12T12:11:42.217Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485490353-ge2c', '2026-11-12T12:11:30.353Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485489617', '2026-11-12T12:11:29.617Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485489416-k23z', '2026-11-12T12:11:29.416Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485489059-m497', '2026-11-12T12:11:29.059Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485487814-ogmb', '2026-11-12T12:11:27.814Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485487549-hs1l', '2026-11-12T12:11:27.549Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001].')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485486851-7d8s', '2026-11-12T12:11:26.851Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 2 evaluation for team [KAIROS-T001]: 91/100 (Normalized Z-score: 0.3239)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485480407-ew8a', '2026-11-12T12:11:20.407Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485478639-00qp', '2026-11-12T12:11:18.639Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485476909-mnk5', '2026-11-12T12:11:16.909Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794485474412@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485445430-nhak', '2026-11-12T12:10:45.430Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485444547', '2026-11-12T12:10:44.547Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485444341-wfhc', '2026-11-12T12:10:44.341Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485444165-e1dl', '2026-11-12T12:10:44.165Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485443113-qfco', '2026-11-12T12:10:43.113Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485442685-3abq', '2026-11-12T12:10:42.685Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001].')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485440003-i23i', '2026-11-12T12:10:40.003Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485439029-57bm', '2026-11-12T12:10:39.029Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485436781-tzu8', '2026-11-12T12:10:36.781Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794485428152@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485414808-e5v3', '2026-11-12T12:10:14.808Z', 'Priya Dharshini', 'STUDENT_LOGIN', 'Student logged in successfully [member1.1794485408809@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485412663-cx0n', '2026-11-12T12:10:12.663Z', 'Karthik Subramanian', 'STUDENT_LOGIN', 'Student logged in successfully [leader.1794485408809@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485411948', '2026-11-12T12:10:11.948Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485411611', '2026-11-12T12:10:11.611Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485411105', '2026-11-12T12:10:11.105Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485410122-hg1c', '2026-11-12T12:10:10.122Z', 'Varun Nair', 'STUDENT_LOGIN', 'Student logged in successfully [reg.builder.1794485408809@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485409278', '2026-11-12T12:10:09.278Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485409102-jl70', '2026-11-12T12:10:09.102Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485371269-a5ky', '2026-11-12T12:09:31.269Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T032]: 89/100 (Normalized Z-score: 0.0544)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485366808-jr8k', '2026-11-12T12:09:26.808Z', 'Ravi Chandran', 'STUDENT_LOGIN', 'Student logged in successfully [ravi.chandran.1794485361490@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485365907-oomd', '2026-11-12T12:09:25.907Z', 'Meera Krishnan', 'STUDENT_LOGIN', 'Student logged in successfully [meera.krish.1794485361490@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485364872-yt5l', '2026-11-12T12:09:24.872Z', 'Arjun Ramanathan', 'STUDENT_LOGIN', 'Student logged in successfully [arjun.raman.1794485361490@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485347871-9av1', '2026-11-12T12:09:07.871Z', 'Formula Tester', 'STUDENT_LOGIN', 'Student logged in successfully [fi.lead.1794485321265@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485344965-nt0l', '2026-11-12T12:09:04.965Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485340113-oafy', '2026-11-12T12:09:00.113Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T029 (Neural Apex 1794485321265) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485339771-pwly', '2026-11-12T12:08:59.771Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T029] updated by Hemavarshine S: checkedIn (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485337278-kyrv', '2026-11-12T12:08:57.278Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T030] updated by Hemavarshine S: selectionStage (Stage: DISQUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485336827-m1gq', '2026-11-12T12:08:56.827Z', 'DQ Leader', 'STUDENT_LOGIN', 'Student logged in successfully [dq.lead.1794485321265@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485334567-98r7', '2026-11-12T12:08:54.567Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T029 (Neural Apex 1794485321265) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485334217-1b0n', '2026-11-12T12:08:54.217Z', 'Hemavarshine S', 'DELETE_JUDGE', 'Removed judge [Dr. Vikram Raman 1794485321265] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485334048-aqe0', '2026-11-12T12:08:54.048Z', 'Hemavarshine S', 'UPDATE_JUDGE', 'Updated judge [Dr. Vikram Raman 1794485321265] status (Active: false) by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485333811-5b9h', '2026-11-12T12:08:53.811Z', 'Hemavarshine S', 'CREATE_JUDGE', 'Added new judge Dr. Vikram Raman 1794485321265 (Intel Distributed Systems Lab) specializing in AI & Machine Learning Systems by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485333377-iz03', '2026-11-12T12:08:53.377Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T029] updated by Hemavarshine S: reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485333148-w7e3', '2026-11-12T12:08:53.148Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T029] updated by Hemavarshine S: deskBayAllocation (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485332909-kpbg', '2026-11-12T12:08:52.909Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T029] updated by Hemavarshine S: selectionStage (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485331901-1ifx', '2026-11-12T12:08:51.901Z', 'Team Leader P6', 'STUDENT_LOGIN', 'Student logged in successfully [lead.p6.1794485321265@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485330441-vewj', '2026-11-12T12:08:50.441Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485330304', '2026-11-12T12:08:50.304Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485330100-23n7', '2026-11-12T12:08:50.100Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485327847-k2wc', '2026-11-12T12:08:47.847Z', 'Student Builder P6', 'STUDENT_LOGIN', 'Student logged in successfully [student.p6.1794485321265@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485313317', '2026-11-12T12:08:33.317Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485312935', '2026-11-12T12:08:32.935Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485311480-46wk', '2026-11-12T12:08:31.480Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485309770-5hte', '2026-11-12T12:08:29.770Z', 'Vikrant Roy', 'UPDATE_EVALUATION', 'Judge updated Gate 1 evaluation for team [KAIROS-T001]: 93 -> 96 (Recalibrated score after table-side architecture defense and AWS EventBridge demo)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485309307-fx4g', '2026-11-12T12:08:29.307Z', 'Dr. Rajesh Kannan', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T003]: 85/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485309118-b7u6', '2026-11-12T12:08:29.118Z', 'Aishwarya Subramanian', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T004]: 89/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485308961-cnlr', '2026-11-12T12:08:28.961Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T002]: 81/100 (Normalized Z-score: -1)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485308731-b69m', '2026-11-12T12:08:28.731Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T001]: 93/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485308468-mbmw', '2026-11-12T12:08:28.468Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001] for Gate 1.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485303636-mdxu', '2026-11-12T12:08:23.636Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485303499-wq8t', '2026-11-12T12:08:23.499Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485303166-04ee', '2026-11-12T12:08:23.167Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485302966-am2s', '2026-11-12T12:08:22.966Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485302809-7u4n', '2026-11-12T12:08:22.809Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485294913-sifp', '2026-11-12T12:08:14.913Z', 'Thenappan T', 'BROADCAST_ANNOUNCEMENT', 'Broadcast "Grand Finale Opening Ceremony & Keynote by AWS" (SCHEDULE, HIGH) to 2/50 builders across track ALL')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485294015-jo14', '2026-11-12T12:08:14.015Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T028 (Titan AI mwdi7knz) at desk bay [BAY-D09 (Auditorium Bay 3)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485293692-vw1q', '2026-11-12T12:08:13.692Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T028] updated by Thenappan T: selectionStage, deskBayAllocation, reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485288846-1s8h', '2026-11-12T12:08:08.846Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485264939-4afx', '2026-11-12T12:07:44.939Z', 'Thenappan T', 'BROADCAST_ANNOUNCEMENT', 'Broadcast "Grand Finale Opening Ceremony & Keynote by AWS" (SCHEDULE, HIGH) to 48/48 builders across track ALL')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485263714-496e', '2026-11-12T12:07:43.714Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T027 (Titan AI mwdi6uqj) at desk bay [BAY-D09 (Auditorium Bay 3)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485262413-sxv6', '2026-11-12T12:07:42.414Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T027] updated by Thenappan T: selectionStage, deskBayAllocation, reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485255183-bxll', '2026-11-12T12:07:35.183Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485184465-9bvg', '2026-11-12T12:06:24.465Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485166635-1q34', '2026-11-12T12:06:06.635Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485159452-zaz0', '2026-11-12T12:05:59.452Z', 'Thenappan T', 'BROADCAST_ANNOUNCEMENT', 'Broadcast "Grand Finale Opening" (SCHEDULE, HIGH) to 46/46 builders across track ALL')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485159217-lb42', '2026-11-12T12:05:59.217Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485147902-ksfg', '2026-11-12T12:05:47.902Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485119328-aql9', '2026-11-12T12:05:19.328Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485036540-cal3', '2026-11-12T12:03:56.540Z', 'Thenappan T', 'BROADCAST_ANNOUNCEMENT', 'Broadcast "Grand Finale Opening Ceremony & Keynote by AWS" (SCHEDULE, HIGH) to 0/46 builders across track ALL')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485032838-y7jl', '2026-11-12T12:03:52.838Z', 'Thenappan T', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T026 (Titan AI mwdi1tle) at desk bay [BAY-D09 (Auditorium Bay 3)] by Thenappan T')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485032183-bfb8', '2026-11-12T12:03:52.183Z', 'Thenappan T', 'UPDATE_TEAM', 'Team [KAIROS-T026] updated by Thenappan T: selectionStage, deskBayAllocation, reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794485017741-019n', '2026-11-12T12:03:37.741Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483996985', '2026-11-12T11:46:36.986Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483996720', '2026-11-12T11:46:36.720Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483996550-h0z4', '2026-11-12T11:46:36.550Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483995988-56bq', '2026-11-12T11:46:35.988Z', 'Vikrant Roy', 'UPDATE_EVALUATION', 'Judge updated Gate 1 evaluation for team [KAIROS-T001]: 93 -> 96 (Recalibrated score after table-side architecture defense and AWS EventBridge demo)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483995699-wrkg', '2026-11-12T11:46:35.699Z', 'Dr. Rajesh Kannan', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T003]: 85/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483995543-p33p', '2026-11-12T11:46:35.543Z', 'Aishwarya Subramanian', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T004]: 89/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483995404-tzqf', '2026-11-12T11:46:35.404Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T002]: 81/100 (Normalized Z-score: -1)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483995284-tal5', '2026-11-12T11:46:35.284Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T001]: 93/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483995154-eo8q', '2026-11-12T11:46:35.154Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001] for Gate 1.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483993120-ml04', '2026-11-12T11:46:33.120Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483992984-3pqq', '2026-11-12T11:46:32.985Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483992718-83wc', '2026-11-12T11:46:32.718Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483992548-c261', '2026-11-12T11:46:32.548Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483992385-v25c', '2026-11-12T11:46:32.385Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483979704', '2026-11-12T11:46:19.704Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483979428', '2026-11-12T11:46:19.428Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483977905-nooy', '2026-11-12T11:46:17.905Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483974112-k0fc', '2026-11-12T11:46:14.112Z', 'Vikrant Roy', 'UPDATE_EVALUATION', 'Judge updated Gate 1 evaluation for team [KAIROS-T001]: 93 -> 96 (Recalibrated score after table-side architecture defense and AWS EventBridge demo)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483973842-x3im', '2026-11-12T11:46:13.842Z', 'Dr. Rajesh Kannan', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T003]: 85/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483973696-erbm', '2026-11-12T11:46:13.696Z', 'Aishwarya Subramanian', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T004]: 89/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483973556-7zbj', '2026-11-12T11:46:13.556Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T002]: 81/100 (Normalized Z-score: -1)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483973416-w7a5', '2026-11-12T11:46:13.416Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T001]: 93/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483973269-t4bn', '2026-11-12T11:46:13.269Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001] for Gate 1.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483971609-1uwk', '2026-11-12T11:46:11.609Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483971473-uor7', '2026-11-12T11:46:11.473Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483971133-qli7', '2026-11-12T11:46:11.133Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483970836-cqmy', '2026-11-12T11:46:10.836Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483970714-pgjp', '2026-11-12T11:46:10.714Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483903338-qljk', '2026-11-12T11:45:03.338Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483902902', '2026-11-12T11:45:02.902Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483902739-9euc', '2026-11-12T11:45:02.739Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483902613-ey39', '2026-11-12T11:45:02.613Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483902077-mvf4', '2026-11-12T11:45:02.077Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483901923-yb4q', '2026-11-12T11:45:01.924Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001].')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483901659-4kt7', '2026-11-12T11:45:01.659Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T001]: 91/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483900287-fylp', '2026-11-12T11:45:00.287Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483899851-m7w7', '2026-11-12T11:44:59.851Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483898435-82e3', '2026-11-12T11:44:58.435Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794483896401@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483857733-a8jz', '2026-11-12T11:44:17.733Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483857306', '2026-11-12T11:44:17.306Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483857134-ia33', '2026-11-12T11:44:17.134Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483856938-blre', '2026-11-12T11:44:16.938Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483856451-g386', '2026-11-12T11:44:16.451Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483854674-g34l', '2026-11-12T11:44:14.674Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483854261-jhhj', '2026-11-12T11:44:14.261Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483852915-4if6', '2026-11-12T11:44:12.915Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794483847959@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483837316-3pt0', '2026-11-12T11:43:57.316Z', 'Priya Dharshini', 'STUDENT_LOGIN', 'Student logged in successfully [member1.1794483832299@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483835929-fjkc', '2026-11-12T11:43:55.929Z', 'Karthik Subramanian', 'STUDENT_LOGIN', 'Student logged in successfully [leader.1794483832299@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483835224', '2026-11-12T11:43:55.224Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483834968', '2026-11-12T11:43:54.968Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483834516', '2026-11-12T11:43:54.516Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483833427-fjdn', '2026-11-12T11:43:53.427Z', 'Varun Nair', 'STUDENT_LOGIN', 'Student logged in successfully [reg.builder.1794483832299@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483832663', '2026-11-12T11:43:52.663Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483832493-avv5', '2026-11-12T11:43:52.494Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483815874-ixwu', '2026-11-12T11:43:35.874Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T023]: 89/100 (Normalized Z-score: 0.0544)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483812847-em04', '2026-11-12T11:43:32.847Z', 'Ravi Chandran', 'STUDENT_LOGIN', 'Student logged in successfully [ravi.chandran.1794483809177@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483812059-fbd9', '2026-11-12T11:43:32.059Z', 'Meera Krishnan', 'STUDENT_LOGIN', 'Student logged in successfully [meera.krish.1794483809177@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483811291-ujwj', '2026-11-12T11:43:31.291Z', 'Arjun Ramanathan', 'STUDENT_LOGIN', 'Student logged in successfully [arjun.raman.1794483809177@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483803327-0yki', '2026-11-12T11:43:23.327Z', 'Formula Tester', 'STUDENT_LOGIN', 'Student logged in successfully [fi.lead.1794483786255@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483801409-6har', '2026-11-12T11:43:21.409Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483800122-6vwz', '2026-11-12T11:43:20.121Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T020 (Neural Apex 1794483786255) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483799887-4p88', '2026-11-12T11:43:19.887Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T020] updated by Hemavarshine S: checkedIn (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483797904-uvv4', '2026-11-12T11:43:17.904Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T021] updated by Hemavarshine S: selectionStage (Stage: DISQUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483797628-qnr5', '2026-11-12T11:43:17.628Z', 'DQ Leader', 'STUDENT_LOGIN', 'Student logged in successfully [dq.lead.1794483786255@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483796731-coic', '2026-11-12T11:43:16.731Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T020 (Neural Apex 1794483786255) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483796461-y83z', '2026-11-12T11:43:16.462Z', 'Hemavarshine S', 'DELETE_JUDGE', 'Removed judge [Dr. Vikram Raman 1794483786255] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483796326-hhmv', '2026-11-12T11:43:16.326Z', 'Hemavarshine S', 'UPDATE_JUDGE', 'Updated judge [Dr. Vikram Raman 1794483786255] status (Active: false) by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483796199-ymkl', '2026-11-12T11:43:16.199Z', 'Hemavarshine S', 'CREATE_JUDGE', 'Added new judge Dr. Vikram Raman 1794483786255 (Intel Distributed Systems Lab) specializing in AI & Machine Learning Systems by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483795881-v5lr', '2026-11-12T11:43:15.881Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T020] updated by Hemavarshine S: reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483795699-ann0', '2026-11-12T11:43:15.699Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T020] updated by Hemavarshine S: deskBayAllocation (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483795545-vftl', '2026-11-12T11:43:15.545Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T020] updated by Hemavarshine S: selectionStage (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483794096-492u', '2026-11-12T11:43:14.096Z', 'Team Leader P6', 'STUDENT_LOGIN', 'Student logged in successfully [lead.p6.1794483786255@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483793380-7zt9', '2026-11-12T11:43:13.380Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483793246', '2026-11-12T11:43:13.246Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483793119-un1h', '2026-11-12T11:43:13.119Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483791954-xz6c', '2026-11-12T11:43:11.954Z', 'Student Builder P6', 'STUDENT_LOGIN', 'Student logged in successfully [student.p6.1794483786255@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483780300', '2026-11-12T11:43:00.300Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483779994', '2026-11-12T11:42:59.994Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483779837-yo3w', '2026-11-12T11:42:59.837Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483779339-tc8j', '2026-11-12T11:42:59.339Z', 'Vikrant Roy', 'UPDATE_EVALUATION', 'Judge updated Gate 1 evaluation for team [KAIROS-T001]: 93 -> 96 (Recalibrated score after table-side architecture defense and AWS EventBridge demo)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483779115-29iq', '2026-11-12T11:42:59.115Z', 'Dr. Rajesh Kannan', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T003]: 85/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483779002-bxqn', '2026-11-12T11:42:59.002Z', 'Aishwarya Subramanian', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T004]: 89/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483778846-i03m', '2026-11-12T11:42:58.846Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T002]: 81/100 (Normalized Z-score: -1)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483778695-jk2o', '2026-11-12T11:42:58.695Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T001]: 93/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483778564-x4wr', '2026-11-12T11:42:58.565Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001] for Gate 1.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483776771-52lf', '2026-11-12T11:42:56.771Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483776643-www1', '2026-11-12T11:42:56.643Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483776379-v152', '2026-11-12T11:42:56.379Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483776260-o4rg', '2026-11-12T11:42:56.260Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483776142-wttv', '2026-11-12T11:42:56.142Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483716197', '2026-11-12T11:41:56.197Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483715860', '2026-11-12T11:41:55.860Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483715711-z66h', '2026-11-12T11:41:55.711Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483714812-er2f', '2026-11-12T11:41:54.812Z', 'Vikrant Roy', 'UPDATE_EVALUATION', 'Judge updated Gate 1 evaluation for team [KAIROS-T001]: 96 -> 96 (Recalibrated score after table-side architecture defense and AWS EventBridge demo)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483713443-iata', '2026-11-12T11:41:53.443Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001] for Gate 1.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483710727-z9fb', '2026-11-12T11:41:50.727Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483710535-6ehd', '2026-11-12T11:41:50.535Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483710191-3e95', '2026-11-12T11:41:50.191Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483710044-p26e', '2026-11-12T11:41:50.044Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483709873-nvfl', '2026-11-12T11:41:49.873Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483692806', '2026-11-12T11:41:32.806Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483692413', '2026-11-12T11:41:32.413Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"leaderboardPublished":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483692292-l4e4', '2026-11-12T11:41:32.292Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483691326-6tps', '2026-11-12T11:41:31.326Z', 'Vikrant Roy', 'UPDATE_EVALUATION', 'Judge updated Gate 1 evaluation for team [KAIROS-T001]: 96 -> 96 (Recalibrated score after table-side architecture defense and AWS EventBridge demo)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483689646-35fp', '2026-11-12T11:41:29.646Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001] for Gate 1.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483687571-2ivg', '2026-11-12T11:41:27.571Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483687439-ww4w', '2026-11-12T11:41:27.439Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483687164-7yk4', '2026-11-12T11:41:27.164Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483686963-8khx', '2026-11-12T11:41:26.963Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483686801-uqdg', '2026-11-12T11:41:26.801Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483662481-s8tc', '2026-11-12T11:41:02.481Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483657127-0zbe', '2026-11-12T11:40:57.127Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483637125-e3sd', '2026-11-12T11:40:37.125Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483635283-o9m6', '2026-11-12T11:40:35.283Z', 'Vikrant Roy', 'UPDATE_EVALUATION', 'Judge updated Gate 1 evaluation for team [KAIROS-T001]: 93 -> 96 (Recalibrated score after table-side architecture defense and AWS EventBridge demo)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483634945-jus7', '2026-11-12T11:40:34.945Z', 'Dr. Rajesh Kannan', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T003]: 85/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483634733-mdj4', '2026-11-12T11:40:34.733Z', 'Aishwarya Subramanian', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T004]: 89/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483634530-yexz', '2026-11-12T11:40:34.530Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T002]: 81/100 (Normalized Z-score: -1)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483634358-ada7', '2026-11-12T11:40:34.358Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T001]: 93/100 (Normalized Z-score: 0)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483634187-7cts', '2026-11-12T11:40:34.187Z', 'Vikrant Roy', 'RECUSE_EVALUATION', 'Judge Vikrant Roy declared conflict of interest and recused from evaluating team [KAIROS-T001] for Gate 1.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483631628-hmc2', '2026-11-12T11:40:31.628Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483631494-2fqm', '2026-11-12T11:40:31.494Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483631213-erqh', '2026-11-12T11:40:31.213Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483631074-rrba', '2026-11-12T11:40:31.074Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483630940-cxpc', '2026-11-12T11:40:30.940Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483482445-9y28', '2026-11-12T11:38:02.445Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483480512-07j3', '2026-11-12T11:38:00.512Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T002]: 81/100 (Normalized Z-score: -1.8717)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483478888-3js0', '2026-11-12T11:37:58.888Z', 'Vikrant Roy', 'SUBMIT_EVALUATION', 'Recorded Gate 1 evaluation for team [KAIROS-T007]: 80/100 (Normalized Z-score: -2.6162)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483477666-3axj', '2026-11-12T11:37:57.666Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483477534-ijuc', '2026-11-12T11:37:57.534Z', 'Vikrant Roy', 'JUDGE_LOGOUT', 'Judge Vikrant Roy locked evaluation terminal.')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483477265-b2hq', '2026-11-12T11:37:57.265Z', 'Dr. Rajesh Kannan', 'JUDGE_LOGIN', 'Judge Dr. Rajesh Kannan (Center for Distributed Computing) authenticated for track [Distributed Systems & Edge IoT]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483477150-c2kf', '2026-11-12T11:37:57.150Z', 'Aishwarya Subramanian', 'JUDGE_LOGIN', 'Judge Aishwarya Subramanian (Peak Capital Partners) authenticated for track [FinTech & Open Innovation]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794483477035-iqr2', '2026-11-12T11:37:57.035Z', 'Vikrant Roy', 'JUDGE_LOGIN', 'Judge Vikrant Roy (Amazon Web Services) authenticated for track [Agentic AI & Cloud-Native]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482732324-x08w', '2026-11-12T11:25:32.324Z', 'Formula Tester', 'STUDENT_LOGIN', 'Student logged in successfully [fi.lead.1794482700408@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482730387-wzvl', '2026-11-12T11:25:30.387Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482729823-glx8', '2026-11-12T11:25:29.823Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T017 (Neural Apex 1794482700408) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482729698-8rax', '2026-11-12T11:25:29.698Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T017] updated by Hemavarshine S: checkedIn (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482727180-4yb7', '2026-11-12T11:25:27.180Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T018] updated by Hemavarshine S: selectionStage (Stage: DISQUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482726939-wvb2', '2026-11-12T11:25:26.939Z', 'DQ Leader', 'STUDENT_LOGIN', 'Student logged in successfully [dq.lead.1794482700408@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482726136-3vb4', '2026-11-12T11:25:26.136Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T017 (Neural Apex 1794482700408) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482725869-hk0c', '2026-11-12T11:25:25.869Z', 'Hemavarshine S', 'DELETE_JUDGE', 'Removed judge [Dr. Vikram Raman 1794482700408] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482725725-4ge1', '2026-11-12T11:25:25.725Z', 'Hemavarshine S', 'UPDATE_JUDGE', 'Updated judge [Dr. Vikram Raman 1794482700408] status (Active: false) by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482725535-wgin', '2026-11-12T11:25:25.535Z', 'Hemavarshine S', 'CREATE_JUDGE', 'Added new judge Dr. Vikram Raman 1794482700408 (Intel Distributed Systems Lab) specializing in AI & Machine Learning Systems by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482725133-cl0r', '2026-11-12T11:25:25.133Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T017] updated by Hemavarshine S: reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482724577-5rao', '2026-11-12T11:25:24.577Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T017] updated by Hemavarshine S: deskBayAllocation (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482724444-8c1j', '2026-11-12T11:25:24.444Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T017] updated by Hemavarshine S: selectionStage (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482722223-bqlo', '2026-11-12T11:25:22.223Z', 'Team Leader P6', 'STUDENT_LOGIN', 'Student logged in successfully [lead.p6.1794482700408@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482721527-uort', '2026-11-12T11:25:21.527Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482721389', '2026-11-12T11:25:21.389Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482720260-f76g', '2026-11-12T11:25:20.260Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482715669-rhmd', '2026-11-12T11:25:15.669Z', 'Student Builder P6', 'STUDENT_LOGIN', 'Student logged in successfully [student.p6.1794482700408@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482634172-pp1r', '2026-11-12T11:23:54.172Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482633742', '2026-11-12T11:23:53.742Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482633557-28mo', '2026-11-12T11:23:53.557Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482633275-1s3u', '2026-11-12T11:23:53.275Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482632841-wjnc', '2026-11-12T11:23:52.841Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482631515-r9d2', '2026-11-12T11:23:51.515Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482631107-z3wt', '2026-11-12T11:23:51.107Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482630090-cybo', '2026-11-12T11:23:50.090Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794482625896@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482616635-d7qe', '2026-11-12T11:23:36.635Z', 'Priya Dharshini', 'STUDENT_LOGIN', 'Student logged in successfully [member1.1794482611880@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482614903-uhwy', '2026-11-12T11:23:34.903Z', 'Karthik Subramanian', 'STUDENT_LOGIN', 'Student logged in successfully [leader.1794482611880@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482614170', '2026-11-12T11:23:34.170Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482613893', '2026-11-12T11:23:33.893Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482613514', '2026-11-12T11:23:33.514Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482612786-hq6n', '2026-11-12T11:23:32.786Z', 'Varun Nair', 'STUDENT_LOGIN', 'Student logged in successfully [reg.builder.1794482611880@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482612159', '2026-11-12T11:23:32.159Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482612054-r7ax', '2026-11-12T11:23:32.054Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482589776-fhty', '2026-11-12T11:23:09.776Z', 'Ravi Chandran', 'STUDENT_LOGIN', 'Student logged in successfully [ravi.chandran.1794482584063@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482589035-n5k7', '2026-11-12T11:23:09.035Z', 'Meera Krishnan', 'STUDENT_LOGIN', 'Student logged in successfully [meera.krish.1794482584063@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482587848-usmg', '2026-11-12T11:23:07.848Z', 'Arjun Ramanathan', 'STUDENT_LOGIN', 'Student logged in successfully [arjun.raman.1794482584063@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482577950-mhkq', '2026-11-12T11:22:57.951Z', 'Formula Tester', 'STUDENT_LOGIN', 'Student logged in successfully [fi.lead.1794482569558@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482576518-8u5p', '2026-11-12T11:22:56.518Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482576104-i1fx', '2026-11-12T11:22:56.104Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T011 (Neural Apex 1794482569558) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482576006-vir3', '2026-11-12T11:22:56.006Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T011] updated by Hemavarshine S: checkedIn (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482575356-uxvg', '2026-11-12T11:22:55.356Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T012] updated by Hemavarshine S: selectionStage (Stage: DISQUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482575114-adyg', '2026-11-12T11:22:55.114Z', 'DQ Leader', 'STUDENT_LOGIN', 'Student logged in successfully [dq.lead.1794482569558@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482574314-zi26', '2026-11-12T11:22:54.314Z', 'Hemavarshine S', 'CHECK_IN_TEAM', 'Checked in team KAIROS-T011 (Neural Apex 1794482569558) at desk bay [BAY-C09] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482574016-mizb', '2026-11-12T11:22:54.016Z', 'Hemavarshine S', 'DELETE_JUDGE', 'Removed judge [Dr. Vikram Raman 1794482569558] by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482573921-nq5u', '2026-11-12T11:22:53.921Z', 'Hemavarshine S', 'UPDATE_JUDGE', 'Updated judge [Dr. Vikram Raman 1794482569558] status (Active: false) by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482573834-wxmo', '2026-11-12T11:22:53.834Z', 'Hemavarshine S', 'CREATE_JUDGE', 'Added new judge Dr. Vikram Raman 1794482569558 (Intel Distributed Systems Lab) specializing in AI & Machine Learning Systems by Hemavarshine S')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482573670-hy04', '2026-11-12T11:22:53.670Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T011] updated by Hemavarshine S: reviewerNotes, reviewedBy, reviewedAt (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482573551-1z2c', '2026-11-12T11:22:53.551Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T011] updated by Hemavarshine S: deskBayAllocation (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482573458-gvfs', '2026-11-12T11:22:53.458Z', 'Hemavarshine S', 'UPDATE_TEAM', 'Team [KAIROS-T011] updated by Hemavarshine S: selectionStage (Stage: ON_CAMPUS_QUALIFIED)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482572911-hgce', '2026-11-12T11:22:52.911Z', 'Team Leader P6', 'STUDENT_LOGIN', 'Student logged in successfully [lead.p6.1794482569558@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482572371-k6sy', '2026-11-12T11:22:52.371Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482572293', '2026-11-12T11:22:52.293Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482572200-sdr0', '2026-11-12T11:22:52.200Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482571417-3jvj', '2026-11-12T11:22:51.417Z', 'Student Builder P6', 'STUDENT_LOGIN', 'Student logged in successfully [student.p6.1794482569558@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482550104-l6nu', '2026-11-12T11:22:30.104Z', 'Team Leader P6', 'STUDENT_LOGIN', 'Student logged in successfully [lead.p6.1794482545766@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482549557-4yv8', '2026-11-12T11:22:29.557Z', 'Failed Login Attempt', 'AUTH_FAILURE', 'Invalid passkey attempted for identity [Hemavarshine S]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482548153-b9qt', '2026-11-12T11:22:28.153Z', 'Failed Login Attempt', 'AUTH_FAILURE', 'Invalid passkey attempted for identity [Thenappan T]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482547420-8jpa', '2026-11-12T11:22:27.420Z', 'Student Builder P6', 'STUDENT_LOGIN', 'Student logged in successfully [student.p6.1794482545766@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482471431-f1mk', '2026-11-12T11:21:11.431Z', 'Team Leader P6', 'STUDENT_LOGIN', 'Student logged in successfully [lead.p6.1794482464273@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482470796-9w5f', '2026-11-12T11:21:10.796Z', 'Failed Login Attempt', 'AUTH_FAILURE', 'Invalid passkey attempted for identity [Nangaiyar M (Nikki)]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794482469783-j6p1', '2026-11-12T11:21:09.783Z', 'Student Builder P6', 'STUDENT_LOGIN', 'Student logged in successfully [student.p6.1794482464273@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794481652581-m18s', '2026-11-12T11:07:32.581Z', 'Ravi Chandran', 'STUDENT_LOGIN', 'Student logged in successfully [ravi.chandran.1794481647677@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794481651969-2a1m', '2026-11-12T11:07:31.969Z', 'Meera Krishnan', 'STUDENT_LOGIN', 'Student logged in successfully [meera.krish.1794481647677@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794481650315-jnu0', '2026-11-12T11:07:30.315Z', 'Arjun Ramanathan', 'STUDENT_LOGIN', 'Student logged in successfully [arjun.raman.1794481647677@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480965531-jpkv', '2026-11-12T10:56:05.531Z', 'Priya Dharshini', 'STUDENT_LOGIN', 'Student logged in successfully [member1.1794480958468@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480963185-lwyr', '2026-11-12T10:56:03.185Z', 'Karthik Subramanian', 'STUDENT_LOGIN', 'Student logged in successfully [leader.1794480958468@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480962700', '2026-11-12T10:56:02.700Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480962544', '2026-11-12T10:56:02.544Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480961684', '2026-11-12T10:56:01.684Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480959219-1nn4', '2026-11-12T10:55:59.219Z', 'Varun Nair', 'STUDENT_LOGIN', 'Student logged in successfully [reg.builder.1794480958468@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480958700', '2026-11-12T10:55:58.700Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480958595-ruxp', '2026-11-12T10:55:58.595Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480883171-7hi2', '2026-11-12T10:54:43.171Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480877245-g3hb', '2026-11-12T10:54:37.245Z', 'Database Architecture Tester', 'ADMIN_LOGIN', 'Logged in successfully as Organizer Lead')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480872110-92ee', '2026-11-12T10:54:32.110Z', 'Ananya Sathyabama Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.1794480869457@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480871933-nuq3', '2026-11-12T10:54:31.933Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [builder.1794480869457@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480870649-r8rg', '2026-11-12T10:54:30.649Z', 'Ananya Sathyabama Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.1794480869457@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480870462-ojtb', '2026-11-12T10:54:30.462Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [builder.1794480869457@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480865165-ddy9', '2026-11-12T10:54:25.165Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480864992', '2026-11-12T10:54:24.992Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480864938-6tnk', '2026-11-12T10:54:24.939Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480864876-5yvl', '2026-11-12T10:54:24.876Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480864549-x273', '2026-11-12T10:54:24.549Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480863379-jack', '2026-11-12T10:54:23.379Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480863137-yml6', '2026-11-12T10:54:23.137Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480862395-luv6', '2026-11-12T10:54:22.395Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794480860327@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480853304-1pmx', '2026-11-12T10:54:13.304Z', 'Priya Dharshini', 'STUDENT_LOGIN', 'Student logged in successfully [member1.1794480847598@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480852550-e2rp', '2026-11-12T10:54:12.550Z', 'Karthik Subramanian', 'STUDENT_LOGIN', 'Student logged in successfully [leader.1794480847598@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480851937', '2026-11-12T10:54:11.937Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480851796', '2026-11-12T10:54:11.796Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480851055', '2026-11-12T10:54:11.055Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480850147-qcm8', '2026-11-12T10:54:10.147Z', 'Varun Nair', 'STUDENT_LOGIN', 'Student logged in successfully [reg.builder.1794480847598@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480848500', '2026-11-12T10:54:08.500Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480848268-56oc', '2026-11-12T10:54:08.268Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480731531', '2026-11-12T10:52:11.531Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480731418', '2026-11-12T10:52:11.418Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480731259', '2026-11-12T10:52:11.259Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480730920-j5fu', '2026-11-12T10:52:10.920Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [reg.builder.1794480730596@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480730775', '2026-11-12T10:52:10.775Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480730709-gpyu', '2026-11-12T10:52:10.709Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480712610-juyi', '2026-11-12T10:51:52.610Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480712350', '2026-11-12T10:51:52.350Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480712293-hmq0', '2026-11-12T10:51:52.293Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480712235-llmj', '2026-11-12T10:51:52.235Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480711966-o3mg', '2026-11-12T10:51:51.966Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480710899-2als', '2026-11-12T10:51:50.899Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480710585-3i13', '2026-11-12T10:51:50.585Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480709909-s6fs', '2026-11-12T10:51:49.909Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794480706641@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480669462', '2026-11-12T10:51:09.462Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480669211', '2026-11-12T10:51:09.211Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480669040', '2026-11-12T10:51:09.040Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480668681-havg', '2026-11-12T10:51:08.681Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [reg.builder.1794480668277@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480668518', '2026-11-12T10:51:08.518Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480668376-62ds', '2026-11-12T10:51:08.376Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480612299-5ims', '2026-11-12T10:50:12.299Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [member1.1794480606458@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480611855-bvmb', '2026-11-12T10:50:11.855Z', 'Karthik Subramanian', 'STUDENT_LOGIN', 'Student logged in successfully [leader.1794480606458@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480611291', '2026-11-12T10:50:11.291Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480611135', '2026-11-12T10:50:11.135Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2026-01-01T00:00:00Z"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480610523', '2026-11-12T10:50:10.523Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":false}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480609445-bmgk', '2026-11-12T10:50:09.445Z', 'Varun Nair', 'STUDENT_LOGIN', 'Student logged in successfully [reg.builder.1794480606458@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480608259', '2026-11-12T10:50:08.259Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"registrationOpen":true,"registrationDeadline":"2027-01-06T23:59:59+05:30"}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480607445-mlrm', '2026-11-12T10:50:07.445Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480031163-fa9f', '2026-11-12T10:40:31.163Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794480014633-s9x1', '2026-11-12T10:40:14.633Z', 'Security Containment Tester', 'ADMIN_LOGIN', 'Logged in successfully as Organizer Lead')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479994872-muap', '2026-11-12T10:39:54.872Z', 'Database Architecture Tester', 'ADMIN_LOGIN', 'Logged in successfully as Organizer Lead')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479988197-g7x4', '2026-11-12T10:39:48.197Z', 'Ananya Sathyabama Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.1794479985606@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479987977-hqnt', '2026-11-12T10:39:47.977Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [builder.1794479985606@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479986587-s9gs', '2026-11-12T10:39:46.587Z', 'Ananya Sathyabama Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.1794479985606@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479986389-l1e0', '2026-11-12T10:39:46.389Z', 'Anonymous Caller', 'STUDENT_AUTH_FAILURE', 'Failed login attempt for [builder.1794479985606@sathyabama.ac.in]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479978074-0z27', '2026-11-12T10:39:38.074Z', 'Thenappan T', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479977907', '2026-11-12T10:39:37.907Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479977832-2dfw', '2026-11-12T10:39:37.832Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479977770-r83e', '2026-11-12T10:39:37.770Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to shortlisted')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479977546-jm87', '2026-11-12T10:39:37.546Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479976612-5kdy', '2026-11-12T10:39:36.612Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479976395-oq9z', '2026-11-12T10:39:36.395Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479975734-ppyv', '2026-11-12T10:39:35.734Z', 'Independent Builder', 'STUDENT_LOGIN', 'Student logged in successfully [builder.outsider.1794479973997@test.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479943314-9kp1', '2026-11-12T10:39:03.314Z', 'Hemavarshine S', 'UPDATE_WAITLIST_STATUS', 'Updated candidate Pooja Venkatesh (pooja.v@example.edu) status to reviewed')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479943060-wcpp', '2026-11-12T10:39:03.060Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479935262-txqo', '2026-11-12T10:38:55.262Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479927846-lzx1', '2026-11-12T10:38:47.846Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479927775-00cx', '2026-11-12T10:38:47.775Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479916293-gdap', '2026-11-12T10:38:36.293Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479885925-zrxs', '2026-11-12T10:38:05.925Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479863963-x4gh', '2026-11-12T10:37:43.963Z', 'Pooja Venkatesh', 'STUDENT_LOGIN', 'Student logged in successfully [pooja.v@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479863417-a9s7', '2026-11-12T10:37:43.417Z', 'Rohan Gupta', 'STUDENT_LOGIN', 'Student logged in successfully [rohan.g@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479862651-j3qw', '2026-11-12T10:37:42.651Z', 'Outsider Test', 'STUDENT_LOGIN', 'Student logged in successfully [outsider101@example.edu]')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479819563', '2026-11-12T10:36:59.563Z', 'Thenappan T', 'UPDATE_FLAGS', 'Updated feature flags: {"demoSandboxMode":true}')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479819487-u47r', '2026-11-12T10:36:59.487Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479813886-bbzv', '2026-11-12T10:36:53.886Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479807857-t2g1', '2026-11-12T10:36:47.857Z', 'Hemavarshine S', 'ADMIN_LOGIN', 'Logged in successfully as Chief Experience Officer (CXO)')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.audit_logs (id, timestamp, organizer_name, action, details)
VALUES ('log-1794479802844-9287', '2026-11-12T10:36:42.844Z', 'Thenappan T', 'ADMIN_LOGIN', 'Logged in successfully as President & Student Builder Group Leader (SBGL)')
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
VALUES ('eval-1794485308731-qs9b', 'team-k75-01', 'judge-1', 1, 29, 25, 24, 18, 96, 1, '', FALSE, '2026-11-12T12:08:28.731Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485308961-yzze', 'team-1794480611914', 'judge-1', 1, 24, 21, 20, 16, 81, -1, 'Solid multi-agent framework, need to tighten tool call execution error handling.', FALSE, '2026-11-12T12:08:28.961Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485309118-wle7', 'team-1794480733739', 'judge-2', 1, 27, 23, 22, 17, 89, 0, 'Strong cryptographic verification proofs demonstrated.', FALSE, '2026-11-12T12:08:29.118Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485309307-vc5o', 'team-1794480659586', 'judge-3', 1, 26, 22, 21, 16, 85, 0, 'Resilient MQTT telemetry pipelines on edge hardware.', FALSE, '2026-11-12T12:08:29.307Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485371269-wcw4', 'team-1794485365032', 'judge-1', 1, 26, 23, 22, 18, 89, 0.0544, 'Exceptional autonomous agent consensus. Real-time telemetry is robust.', FALSE, '2026-11-12T12:09:31.269Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485486851-ail6', 'team-k75-01', 'judge-1', 2, 28, 22, 23, 18, 91, 0.3239, 'Robust event streaming and resilient AWS architecture.', FALSE, '2026-11-12T12:11:26.851Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485856772-g26o', 'team-1794485853210', 'judge-1', 1, 29, 24, 24, 19, 96, 0.9755, 'Extraordinary multi-region consensus model. Serverless architecture demonstrates pristine idempotency.', FALSE, '2026-11-12T12:17:36.772Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO UPDATE SET
  criterion1_score = EXCLUDED.criterion1_score,
  criterion2_score = EXCLUDED.criterion2_score,
  criterion3_score = EXCLUDED.criterion3_score,
  criterion4_score = EXCLUDED.criterion4_score,
  raw_total_score = EXCLUDED.raw_total_score,
  normalized_z_score = EXCLUDED.normalized_z_score,
  qualitative_feedback = EXCLUDED.qualitative_feedback;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485881252-38y1', 'team-1794485878759', 'judge-1', 1, 29, 24, 24, 19, 96, 0.8273, 'Extraordinary multi-region consensus model. Serverless architecture demonstrates pristine idempotency.', FALSE, '2026-11-12T12:18:01.252Z')
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

-- 14. NOTIFICATION LOGS
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337826-g5gd8', 'email.member.mwditu9t@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337825-f35zcm', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwditu9t@sist.edu.in', NULL, '2026-11-12T12:25:37.827Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337823-l38u1', 'email.leader.mwditu9t@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337822-25wd08', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwditu9t@sist.edu.in', NULL, '2026-11-12T12:25:37.823Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337821-qgvfj', 'attacker_mwdioehv@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337820-07gu01', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:attacker_mwdioehv@sist.edu.in', NULL, '2026-11-12T12:25:37.821Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337817-6xlkr', 'victim_mwdioehv@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337816-d3bsgp', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:victim_mwdioehv@sist.edu.in', NULL, '2026-11-12T12:25:37.817Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337796-7i2dg', 'attacker_mwdin1vf@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337795-hp0981', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:attacker_mwdin1vf@sist.edu.in', NULL, '2026-11-12T12:25:37.796Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337794-80qzr', 'victim_mwdin1vf@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337793-6xa9em', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:victim_mwdin1vf@sist.edu.in', NULL, '2026-11-12T12:25:37.794Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337790-gmmqt', 'audit.member.mwdik4hz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337789-dgdjpp', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:audit.member.mwdik4hz@sist.edu.in', NULL, '2026-11-12T12:25:37.790Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337788-v1x5p', 'audit.leader.mwdik4hz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337787-x9qtej', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:audit.leader.mwdik4hz@sist.edu.in', NULL, '2026-11-12T12:25:37.788Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337785-7h7fu', 'audit.member.mwdijj7i@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337785-yztlcs', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:audit.member.mwdijj7i@sist.edu.in', NULL, '2026-11-12T12:25:37.785Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337783-gccd9', 'audit.leader.mwdijj7i@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337782-qimvch', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:audit.leader.mwdijj7i@sist.edu.in', NULL, '2026-11-12T12:25:37.784Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337780-kk4yp', 'audit.member.mwdihko2@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337780-jkn5ik', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:audit.member.mwdihko2@sist.edu.in', NULL, '2026-11-12T12:25:37.780Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337779-0ok9h', 'audit.leader.mwdihko2@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337778-3a9xwp', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:audit.leader.mwdihko2@sist.edu.in', NULL, '2026-11-12T12:25:37.779Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337776-zjjqd', 'email.member.mwdic9oe@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337775-xxtiav', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:25:37.776Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337773-5fp1g', 'email.leader.mwdic9oe@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337772-hleimu', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:25:37.773Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337758-x2g6y', 'leader.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337757-9og3cw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.758Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337755-x3fg2', 'builder5.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337754-p2gy0v', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.755Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337754-xzim0', 'builder4.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337753-1fzvys', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.754Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337752-7q1pr', 'builder3.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337752-xwf7l8', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.752Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337751-cf1lj', 'member1.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337751-z0iwsx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.751Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337749-tca56', 'meera.krish.1794485361490@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337748-dwj8pt', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.749Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337747-bndv1', 'arjun.raman.1794485361490@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337746-f7ksex', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.747Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337745-7m4xg', 'fi.lead.1794485321265@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337744-d0os2p', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794485321265@example.edu', NULL, '2026-11-12T12:25:37.745Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337743-o2yv3', 'dq.lead.1794485321265@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337742-ep90lo', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794485321265@example.edu', NULL, '2026-11-12T12:25:37.743Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337741-tcv72', 'lead.p6.1794485321265@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337740-bda4qd', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794485321265@example.edu', NULL, '2026-11-12T12:25:37.741Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337723-i1p62', 'email.member.mwdi7knz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337722-lxjxxt', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:25:37.723Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337721-zr5f1', 'email.leader.mwdi7knz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337720-9p2c2i', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:25:37.721Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337719-bbrs7', 'email.member.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337718-8j3nj9', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:25:37.719Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337718-q5ddw', 'email.leader.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337717-o3c7ha', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:25:37.718Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337715-deh6j', 'email.member.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337714-mmsax4', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:25:37.715Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337712-icj8o', 'email.leader.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337712-qfrqmz', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:25:37.712Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337710-yq8oe', 'leader.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337710-9367x6', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.710Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337708-ugha9', 'builder5.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337708-y6faad', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.708Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337707-qqqrz', 'builder4.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337706-yxco3d', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.707Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337704-tdqiz', 'builder3.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337703-s4dn24', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.704Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337692-n83g2', 'member1.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337691-itfz5a', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.692Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337690-ifd0o', 'meera.krish.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337690-joynxj', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.690Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337688-8row7', 'arjun.raman.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337688-no193l', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.688Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337687-5osmi', 'fi.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337686-s6p4ac', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794483786255@example.edu', NULL, '2026-11-12T12:25:37.687Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337685-css2j', 'dq.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337684-y6w0oa', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794483786255@example.edu', NULL, '2026-11-12T12:25:37.685Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337682-p1oci', 'lead.p6.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337681-hw8kz3', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794483786255@example.edu', NULL, '2026-11-12T12:25:37.682Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337679-p6avo', 'fi.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337679-kkew5d', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482700408@example.edu', NULL, '2026-11-12T12:25:37.680Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337676-puoj6', 'dq.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337673-fzvzey', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482700408@example.edu', NULL, '2026-11-12T12:25:37.676Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337672-2o0d5', 'lead.p6.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337671-hr4dgj', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482700408@example.edu', NULL, '2026-11-12T12:25:37.672Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337670-ef3gx', 'leader.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337669-7rzazh', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.670Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337660-gbmqk', 'builder5.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337660-7vdd3o', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.660Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337659-9t39z', 'builder4.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337659-0vz0jt', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.659Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337658-0bp9d', 'builder3.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337657-38yqor', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.658Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337656-a4ull', 'member1.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337656-sh3h3b', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.656Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337655-zbg5i', 'meera.krish.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337655-bvv9h7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.655Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337654-92cil', 'arjun.raman.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337653-buzkrc', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.654Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337653-ugti3', 'fi.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337652-kvwtiz', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482569558@example.edu', NULL, '2026-11-12T12:25:37.653Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337651-echml', 'dq.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337651-uzl8pw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482569558@example.edu', NULL, '2026-11-12T12:25:37.651Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337650-lli7x', 'lead.p6.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337649-3dj66h', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482569558@example.edu', NULL, '2026-11-12T12:25:37.650Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337648-y01kt', 'lead.p6.1794482545766@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337648-9j0ejf', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482545766@example.edu', NULL, '2026-11-12T12:25:37.648Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337636-7fsgg', 'meera.krish.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337635-g4aeme', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.636Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337634-elrex', 'arjun.raman.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337633-wu8qur', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.634Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337631-jmwvx', 'leader.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337631-squxxf', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.631Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337630-9dw98', 'builder5.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337629-pfkilr', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.630Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337628-bpyv9', 'builder4.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337628-ktgapq', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.628Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337626-ia16c', 'builder3.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337624-0akluo', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.626Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337622-wkwhz', 'member1.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337621-3eekmb', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.622Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337620-fb0zd', 'leader.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337620-1e1ozw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.620Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337619-zzkra', 'builder5.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337618-rinn3m', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.619Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337617-opi9j', 'builder4.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337616-ackzkt', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.617Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337603-uorgv', 'builder3.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337602-xn8k94', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.603Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337601-80j7e', 'member1.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337600-2whhr7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.601Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337599-fkuys', 'leader.1794480730596@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337598-co12vv', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480730596@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.599Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337596-yb1be', 'memberone@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337596-vblnzw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:memberone@example.com', NULL, '2026-11-12T12:25:37.596Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337595-jq6t3', 'debuglead@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337594-xfuist', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:debuglead@example.com', NULL, '2026-11-12T12:25:37.595Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337593-efuqy', 'leader.1794480606458@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337593-1dd0fv', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480606458@sathyabama.ac.in', NULL, '2026-11-12T12:25:37.593Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337590-7glym', 'aditya.n@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337590-arao3d', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:aditya.n@example.edu', NULL, '2026-11-12T12:25:37.591Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337588-kdvnv', 'swetha.k@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337587-13ouad', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:swetha.k@example.edu', NULL, '2026-11-12T12:25:37.588Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337585-89mlb', 'rohan.g@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337584-dr51rc', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:rohan.g@example.edu', NULL, '2026-11-12T12:25:37.585Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486337583-88xn5', 'pooja.v@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794486337582-n40f8m', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:pooja.v@example.edu', NULL, '2026-11-12T12:25:37.583Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486336649-nnpn1', 'email.leader.mwditu9t@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T043 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794486336649-hn5snp', 1, 'checkin-confirm:KAIROS-T043:email.leader.mwditu9t@sist.edu.in', NULL, '2026-11-12T12:25:36.649Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486335982-r7eca', 'email.leader.mwditu9t@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Titan AI mwditu9t Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794486335981-0f084w', 1, 'abstract-decision:KAIROS-T043:SHORTLISTED', NULL, '2026-11-12T12:25:35.982Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486334195-ew8n1', 'email.member.mwditu9t@sist.edu.in', 'KAIROS 2027 — Successfully Joined Titan AI mwditu9t', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794486334194-xdn6ju', 1, 'join-confirm:KAIROS-T043:email.member.mwditu9t@sist.edu.in', NULL, '2026-11-12T12:25:34.195Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486333765-86cxd', 'email.member.mwditu9t@sist.edu.in', 'KAIROS 2027 — Invitation to Join Titan AI mwditu9t [KAIROS-T043]', 'team-invitation', 'SIMULATED', 'ses-sim-1794486333764-rln5rl', 1, 'team-invite:KAIROS-T043:email.member.mwditu9t@sist.edu.in', NULL, '2026-11-12T12:25:33.765Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486332893-2aezl', 'email.leader.mwditu9t@sist.edu.in', 'KAIROS 2027 — Squad Created: Titan AI mwditu9t [KAIROS-T043]', 'team-creation', 'SIMULATED', 'ses-sim-1794486332892-co3p33', 1, 'team-create:KAIROS-T043', NULL, '2026-11-12T12:25:32.893Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486331761-v2b92', 'email.leader.mwditu9t@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794486331760-sbq8ls', 1, 'email-verify:email.leader.mwditu9t@sist.edu.in', NULL, '2026-11-12T12:25:31.761Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486330241-c1077', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794486330240-fip4fx', 1, 'idemp-test-1794486329441-29zf-diff', NULL, '2026-11-12T12:25:30.241Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486329949-wa6kb', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794486329667-99vngr', 1, 'idemp-test-1794486329441-29zf', NULL, '2026-11-12T12:25:29.949Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486329668-gelt9', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794486329667-99vngr', 1, 'idemp-test-1794486329441-29zf', NULL, '2026-11-12T12:25:29.668Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486084380-toz54', 'burst_9_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486084379-h5fb4]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486084379-hmvdoa', 1, 'reg-confirm:burst_9_mwdioehv@test.com:w-1794486084379-h5fb4', NULL, '2026-11-12T12:21:24.380Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486084188-xwn66', 'burst_8_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486084184-c7tkt]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486084187-8yjmjp', 1, 'reg-confirm:burst_8_mwdioehv@test.com:w-1794486084184-c7tkt', NULL, '2026-11-12T12:21:24.188Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486083993-d7jgt', 'burst_7_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486083991-4g5h1]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486083992-tf6k2q', 1, 'reg-confirm:burst_7_mwdioehv@test.com:w-1794486083991-4g5h1', NULL, '2026-11-12T12:21:23.993Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486083775-e921s', 'burst_6_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486083772-ffeol]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486083774-azdj3p', 1, 'reg-confirm:burst_6_mwdioehv@test.com:w-1794486083772-ffeol', NULL, '2026-11-12T12:21:23.775Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486083014-ofsf1', 'burst_5_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486083011-felcs]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486083014-wku3cu', 1, 'reg-confirm:burst_5_mwdioehv@test.com:w-1794486083011-felcs', NULL, '2026-11-12T12:21:23.014Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486082849-t20ze', 'burst_4_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082848-yuljg]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486082848-70v4en', 1, 'reg-confirm:burst_4_mwdioehv@test.com:w-1794486082848-yuljg', NULL, '2026-11-12T12:21:22.849Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486082670-pqgjt', 'burst_3_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082668-jpnq3]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486082669-uzzhf1', 1, 'reg-confirm:burst_3_mwdioehv@test.com:w-1794486082668-jpnq3', NULL, '2026-11-12T12:21:22.670Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486082510-tf41q', 'burst_2_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082509-eut0h]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486082510-qb5fey', 1, 'reg-confirm:burst_2_mwdioehv@test.com:w-1794486082509-eut0h', NULL, '2026-11-12T12:21:22.510Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486082346-y806k', 'burst_1_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082342-ocwyq]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486082345-tktkvk', 1, 'reg-confirm:burst_1_mwdioehv@test.com:w-1794486082342-ocwyq', NULL, '2026-11-12T12:21:22.346Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486082103-x4yjk', 'burst_0_mwdioehv@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082101-b410v]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486082102-ddjvew', 1, 'reg-confirm:burst_0_mwdioehv@test.com:w-1794486082101-b410v', NULL, '2026-11-12T12:21:22.103Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486079167-a48aa', 'attacker_mwdioehv@sist.edu.in', 'KAIROS 2027 — Squad Created: Attacker Squad mwdioehv [KAIROS-T042]', 'team-creation', 'SIMULATED', 'ses-sim-1794486079167-hukssl', 1, 'team-create:KAIROS-T042', NULL, '2026-11-12T12:21:19.167Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486078993-tp34s', 'victim_mwdioehv@sist.edu.in', 'KAIROS 2027 — Squad Created: Victim Fortress mwdioehv [KAIROS-T041]', 'team-creation', 'SIMULATED', 'ses-sim-1794486078992-ar41m9', 1, 'team-create:KAIROS-T041', NULL, '2026-11-12T12:21:18.993Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486078316-a4qfi', 'victim_mwdioehv@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794486078316-rhbntd', 1, 'email-verify:victim_mwdioehv@sist.edu.in', NULL, '2026-11-12T12:21:18.316Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486077250-72ur3', 'attacker_mwdioehv@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794486077250-mdalkl', 1, 'email-verify:attacker_mwdioehv@sist.edu.in', NULL, '2026-11-12T12:21:17.250Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486032264-fj5qa', 'burst_9_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486032261-iww1s]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486032264-510qir', 1, 'reg-confirm:burst_9_mwdin1vf@test.com:w-1794486032261-iww1s', NULL, '2026-11-12T12:20:32.264Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486032116-t2pz2', 'burst_8_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486032114-kajhq]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486032115-f5q2k2', 1, 'reg-confirm:burst_8_mwdin1vf@test.com:w-1794486032114-kajhq', NULL, '2026-11-12T12:20:32.116Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486031969-ku9ju', 'burst_7_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031968-ijuut]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486031969-ryt9lv', 1, 'reg-confirm:burst_7_mwdin1vf@test.com:w-1794486031968-ijuut', NULL, '2026-11-12T12:20:31.969Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486031781-43igs', 'burst_6_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031777-1pox9]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486031780-r7c3l6', 1, 'reg-confirm:burst_6_mwdin1vf@test.com:w-1794486031777-1pox9', NULL, '2026-11-12T12:20:31.781Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486031613-3d08f', 'burst_5_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031612-v4fls]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486031613-1ye8fj', 1, 'reg-confirm:burst_5_mwdin1vf@test.com:w-1794486031612-v4fls', NULL, '2026-11-12T12:20:31.613Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486031441-lymxk', 'burst_4_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031436-684nj]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486031440-2ffrme', 1, 'reg-confirm:burst_4_mwdin1vf@test.com:w-1794486031436-684nj', NULL, '2026-11-12T12:20:31.441Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486031245-b3k3s', 'burst_3_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031243-rdi0f]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486031244-71l8ey', 1, 'reg-confirm:burst_3_mwdin1vf@test.com:w-1794486031243-rdi0f', NULL, '2026-11-12T12:20:31.245Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486031035-mh8yj', 'burst_2_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031033-ahcmp]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486031034-yzzwai', 1, 'reg-confirm:burst_2_mwdin1vf@test.com:w-1794486031033-ahcmp', NULL, '2026-11-12T12:20:31.035Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486030813-tlzof', 'burst_1_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486030809-m417h]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486030812-h25y2t', 1, 'reg-confirm:burst_1_mwdin1vf@test.com:w-1794486030809-m417h', NULL, '2026-11-12T12:20:30.813Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486030616-9ekuk', 'burst_0_mwdin1vf@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486030614-0mqom]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794486030615-0vqw2l', 1, 'reg-confirm:burst_0_mwdin1vf@test.com:w-1794486030614-0mqom', NULL, '2026-11-12T12:20:30.616Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486015694-xibvh', 'attacker_mwdin1vf@sist.edu.in', 'KAIROS 2027 — Squad Created: Attacker Squad mwdin1vf [KAIROS-T040]', 'team-creation', 'SIMULATED', 'ses-sim-1794486015694-zk0z4r', 1, 'team-create:KAIROS-T040', NULL, '2026-11-12T12:20:15.694Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486015545-w5uls', 'victim_mwdin1vf@sist.edu.in', 'KAIROS 2027 — Squad Created: Victim Fortress mwdin1vf [KAIROS-T039]', 'team-creation', 'SIMULATED', 'ses-sim-1794486015545-6ccu19', 1, 'team-create:KAIROS-T039', NULL, '2026-11-12T12:20:15.545Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486014987-5sk8n', 'victim_mwdin1vf@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794486014986-ivo8d0', 1, 'email-verify:victim_mwdin1vf@sist.edu.in', NULL, '2026-11-12T12:20:14.987Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794486014112-eh42s', 'attacker_mwdin1vf@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794486014111-ugwxyl', 1, 'email-verify:attacker_mwdin1vf@sist.edu.in', NULL, '2026-11-12T12:20:14.112Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485928477-tpgha', 'burst_14_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485928475-ccbhp]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485928476-oztebb', 1, 'reg-confirm:burst_14_mwdikx7l@test.com:w-1794485928475-ccbhp', NULL, '2026-11-12T12:18:48.477Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485928226-u6r42', 'burst_13_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485928225-dqsp5]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485928225-0gkuep', 1, 'reg-confirm:burst_13_mwdikx7l@test.com:w-1794485928225-dqsp5', NULL, '2026-11-12T12:18:48.226Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485928005-8hd72', 'burst_12_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485928001-ehuv6]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485928004-58vatf', 1, 'reg-confirm:burst_12_mwdikx7l@test.com:w-1794485928001-ehuv6', NULL, '2026-11-12T12:18:48.005Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485927866-pfjg2', 'burst_11_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927862-6uwvo]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485927865-eys9t2', 1, 'reg-confirm:burst_11_mwdikx7l@test.com:w-1794485927862-6uwvo', NULL, '2026-11-12T12:18:47.866Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485927702-tkg82', 'burst_10_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927701-6f1y1]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485927702-bz0d0t', 1, 'reg-confirm:burst_10_mwdikx7l@test.com:w-1794485927701-6f1y1', NULL, '2026-11-12T12:18:47.702Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485927530-6i0sz', 'burst_9_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927528-noh57]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485927529-2j7yj5', 1, 'reg-confirm:burst_9_mwdikx7l@test.com:w-1794485927528-noh57', NULL, '2026-11-12T12:18:47.530Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485927236-j7so2', 'burst_8_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927230-0l6ia]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485927236-q8wftm', 1, 'reg-confirm:burst_8_mwdikx7l@test.com:w-1794485927230-0l6ia', NULL, '2026-11-12T12:18:47.236Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485927053-ifpnt', 'burst_7_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927052-6ccqz]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485927052-zw1xuj', 1, 'reg-confirm:burst_7_mwdikx7l@test.com:w-1794485927052-6ccqz', NULL, '2026-11-12T12:18:47.053Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485926870-iii6d', 'burst_6_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926866-m53a9]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485926869-ps2d1m', 1, 'reg-confirm:burst_6_mwdikx7l@test.com:w-1794485926866-m53a9', NULL, '2026-11-12T12:18:46.870Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485926711-4fp06', 'burst_5_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926707-2fxs1]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485926711-qzarqm', 1, 'reg-confirm:burst_5_mwdikx7l@test.com:w-1794485926707-2fxs1', NULL, '2026-11-12T12:18:46.711Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485926502-fpf0w', 'burst_4_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926499-rhlcl]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485926502-jx5pmt', 1, 'reg-confirm:burst_4_mwdikx7l@test.com:w-1794485926499-rhlcl', NULL, '2026-11-12T12:18:46.502Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485926314-a6u74', 'burst_3_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926313-9azpn]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485926314-gfgbjj', 1, 'reg-confirm:burst_3_mwdikx7l@test.com:w-1794485926313-9azpn', NULL, '2026-11-12T12:18:46.314Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485926138-8f92h', 'burst_2_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926135-e2l40]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485926138-d3nmmp', 1, 'reg-confirm:burst_2_mwdikx7l@test.com:w-1794485926135-e2l40', NULL, '2026-11-12T12:18:46.138Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485925988-7epqt', 'burst_1_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485925985-xnseq]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485925987-e3pf44', 1, 'reg-confirm:burst_1_mwdikx7l@test.com:w-1794485925985-xnseq', NULL, '2026-11-12T12:18:45.988Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485925830-6ruwl', 'burst_0_mwdikx7l@test.com', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485925828-l6qh1]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485925829-e1e7uv', 1, 'reg-confirm:burst_0_mwdikx7l@test.com:w-1794485925828-l6qh1', NULL, '2026-11-12T12:18:45.830Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485915455-btyyk', 'victim_mwdikx7l@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485915454-ybvz99', 1, 'email-verify:victim_mwdikx7l@sist.edu.in', NULL, '2026-11-12T12:18:35.455Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485914705-bpyh2', 'attacker_mwdikx7l@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485914705-k8zfjh', 1, 'email-verify:attacker_mwdikx7l@sist.edu.in', NULL, '2026-11-12T12:18:34.705Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485883840-19pz9', 'audit.leader.mwdik4hz@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T038 [BAY-A01 (Main Auditorium Stage Wing)]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794485883839-73sww4', 1, 'checkin-confirm:KAIROS-T038:audit.leader.mwdik4hz@sist.edu.in', NULL, '2026-11-12T12:18:03.840Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485880956-rfxdo', 'audit.leader.mwdik4hz@sist.edu.in', 'KAIROS 2027 — Qualifier Artifacts Received [KAIROS-T038]', 'qualifier-submission-confirmation', 'SIMULATED', 'ses-sim-1794485880955-17ywhb', 1, 'qualifier-submit:KAIROS-T038', NULL, '2026-11-12T12:18:00.956Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485880784-eb0pa', 'audit.leader.mwdik4hz@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Apex Autonomous Swarm mwdik4hz Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485880784-998mwr', 1, 'abstract-decision:KAIROS-T038:SHORTLISTED', NULL, '2026-11-12T12:18:00.784Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485880168-rfzzo', 'audit.member.mwdik4hz@sist.edu.in', 'KAIROS 2027 — Successfully Joined Apex Autonomous Swarm mwdik4hz', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485880167-h9m9tv', 1, 'join-confirm:KAIROS-T038:audit.member.mwdik4hz@sist.edu.in', NULL, '2026-11-12T12:18:00.168Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485879331-v0vij', 'audit.member.mwdik4hz@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485879331-y0xqou', 1, 'email-verify:audit.member.mwdik4hz@sist.edu.in', NULL, '2026-11-12T12:17:59.331Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485878996-xqrp0', 'audit.member.mwdik4hz@sist.edu.in', 'KAIROS 2027 — Invitation to Join Apex Autonomous Swarm mwdik4hz [KAIROS-T038]', 'team-invitation', 'SIMULATED', 'ses-sim-1794485878995-2mv6wt', 1, 'team-invite:KAIROS-T038:audit.member.mwdik4hz@sist.edu.in', NULL, '2026-11-12T12:17:58.996Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485878763-c0qyt', 'audit.leader.mwdik4hz@sist.edu.in', 'KAIROS 2027 — Squad Created: Apex Autonomous Swarm mwdik4hz [KAIROS-T038]', 'team-creation', 'SIMULATED', 'ses-sim-1794485878762-w7jutf', 1, 'team-create:KAIROS-T038', NULL, '2026-11-12T12:17:58.763Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485878022-gfep8', 'audit.leader.mwdik4hz@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485878021-0v8dh0', 1, 'email-verify:audit.leader.mwdik4hz@sist.edu.in', NULL, '2026-11-12T12:17:58.022Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485877735-ffnu8', 'audit.leader.mwdik4hz@sist.edu.in', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485877734-9d8jz]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485877734-63aod6', 1, 'reg-confirm:audit.leader.mwdik4hz@sist.edu.in:w-1794485877734-9d8jz', NULL, '2026-11-12T12:17:57.735Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485857855-56njm', 'audit.leader.mwdijj7i@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T037 [BAY-A01 (Main Auditorium Stage Wing)]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794485857854-r03j0r', 1, 'checkin-confirm:KAIROS-T037:audit.leader.mwdijj7i@sist.edu.in', NULL, '2026-11-12T12:17:37.855Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485856372-gmy06', 'audit.leader.mwdijj7i@sist.edu.in', 'KAIROS 2027 — Qualifier Artifacts Received [KAIROS-T037]', 'qualifier-submission-confirmation', 'SIMULATED', 'ses-sim-1794485856372-ir6k29', 1, 'qualifier-submit:KAIROS-T037', NULL, '2026-11-12T12:17:36.372Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485856142-bgzn7', 'audit.leader.mwdijj7i@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Apex Autonomous Swarm mwdijj7i Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485856141-be8rio', 1, 'abstract-decision:KAIROS-T037:SHORTLISTED', NULL, '2026-11-12T12:17:36.142Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485855279-5sxyc', 'audit.member.mwdijj7i@sist.edu.in', 'KAIROS 2027 — Successfully Joined Apex Autonomous Swarm mwdijj7i', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485855278-6qksbx', 1, 'join-confirm:KAIROS-T037:audit.member.mwdijj7i@sist.edu.in', NULL, '2026-11-12T12:17:35.279Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485854176-dts1v', 'audit.member.mwdijj7i@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485854175-ns6gwm', 1, 'email-verify:audit.member.mwdijj7i@sist.edu.in', NULL, '2026-11-12T12:17:34.176Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485853569-7lwig', 'audit.member.mwdijj7i@sist.edu.in', 'KAIROS 2027 — Invitation to Join Apex Autonomous Swarm mwdijj7i [KAIROS-T037]', 'team-invitation', 'SIMULATED', 'ses-sim-1794485853568-v1eka7', 1, 'team-invite:KAIROS-T037:audit.member.mwdijj7i@sist.edu.in', NULL, '2026-11-12T12:17:33.569Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485853213-14gup', 'audit.leader.mwdijj7i@sist.edu.in', 'KAIROS 2027 — Squad Created: Apex Autonomous Swarm mwdijj7i [KAIROS-T037]', 'team-creation', 'SIMULATED', 'ses-sim-1794485853212-t8s8lz', 1, 'team-create:KAIROS-T037', NULL, '2026-11-12T12:17:33.213Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485851846-fz734', 'audit.leader.mwdijj7i@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485851845-r77zis', 1, 'email-verify:audit.leader.mwdijj7i@sist.edu.in', NULL, '2026-11-12T12:17:31.846Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485851207-u3q4m', 'audit.leader.mwdijj7i@sist.edu.in', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485851201-fuz0e]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485851205-6756hx', 1, 'reg-confirm:audit.leader.mwdijj7i@sist.edu.in:w-1794485851201-fuz0e', NULL, '2026-11-12T12:17:31.207Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485781732-v75cu', 'audit.leader.mwdihko2@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T036 [BAY-A01 (Main Auditorium Stage Wing)]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794485781730-gxkvrr', 1, 'checkin-confirm:KAIROS-T036:audit.leader.mwdihko2@sist.edu.in', NULL, '2026-11-12T12:16:21.732Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485774944-ibtlr', 'audit.leader.mwdihko2@sist.edu.in', 'KAIROS 2027 — Qualifier Artifacts Received [KAIROS-T036]', 'qualifier-submission-confirmation', 'SIMULATED', 'ses-sim-1794485774943-dbmxta', 1, 'qualifier-submit:KAIROS-T036', NULL, '2026-11-12T12:16:14.944Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485772926-f0xfd', 'audit.leader.mwdihko2@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Apex Autonomous Swarm mwdihko2 Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485772926-0snq1u', 1, 'abstract-decision:KAIROS-T036:SHORTLISTED', NULL, '2026-11-12T12:16:12.926Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485769318-0p43x', 'audit.member.mwdihko2@sist.edu.in', 'KAIROS 2027 — Successfully Joined Apex Autonomous Swarm mwdihko2', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485769317-g6f1hb', 1, 'join-confirm:KAIROS-T036:audit.member.mwdihko2@sist.edu.in', NULL, '2026-11-12T12:16:09.318Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485768557-k0oli', 'audit.member.mwdihko2@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485768556-n4maay', 1, 'email-verify:audit.member.mwdihko2@sist.edu.in', NULL, '2026-11-12T12:16:08.557Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485768155-tk135', 'audit.member.mwdihko2@sist.edu.in', 'KAIROS 2027 — Invitation to Join Apex Autonomous Swarm mwdihko2 [KAIROS-T036]', 'team-invitation', 'SIMULATED', 'ses-sim-1794485768154-gam7cm', 1, 'team-invite:KAIROS-T036:audit.member.mwdihko2@sist.edu.in', NULL, '2026-11-12T12:16:08.155Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485766402-oo6kw', 'audit.leader.mwdihko2@sist.edu.in', 'KAIROS 2027 — Squad Created: Apex Autonomous Swarm mwdihko2 [KAIROS-T036]', 'team-creation', 'SIMULATED', 'ses-sim-1794485766401-hwlpod', 1, 'team-create:KAIROS-T036', NULL, '2026-11-12T12:16:06.402Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485763228-rhfmr', 'audit.leader.mwdihko2@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485763227-ifxk1l', 1, 'email-verify:audit.leader.mwdihko2@sist.edu.in', NULL, '2026-11-12T12:16:03.228Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485762249-lk1qu', 'audit.leader.mwdihko2@sist.edu.in', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485762242-jwtaq]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485762248-h84pnc', 1, 'reg-confirm:audit.leader.mwdihko2@sist.edu.in:w-1794485762242-jwtaq', NULL, '2026-11-12T12:16:02.249Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519473-pljmz', 'email.member.mwdic9oe@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519472-yq4frz', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:11:59.473Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519472-yq0ie', 'email.leader.mwdic9oe@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519471-6jn1jt', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:11:59.472Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519465-cwi8h', 'leader.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519465-wyur1u', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.465Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519464-6xssk', 'builder5.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519464-6enbnw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.464Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519463-0ff9s', 'builder4.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519463-pnetc7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.463Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519462-ja7zy', 'builder3.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519462-xvjrgx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.462Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519461-htt27', 'member1.1794485408809@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519461-kx19kd', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.461Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519461-q37ic', 'meera.krish.1794485361490@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519460-129ipa', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.461Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519460-w5nv3', 'arjun.raman.1794485361490@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519459-832yd6', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.460Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519458-cpwgp', 'fi.lead.1794485321265@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519458-1el8xm', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794485321265@example.edu', NULL, '2026-11-12T12:11:59.458Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519457-p93kf', 'dq.lead.1794485321265@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519456-c66fei', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794485321265@example.edu', NULL, '2026-11-12T12:11:59.457Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519452-239y3', 'lead.p6.1794485321265@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519452-vaoquy', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794485321265@example.edu', NULL, '2026-11-12T12:11:59.452Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519444-vnwsw', 'email.member.mwdi7knz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485294904-bpxnu3', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:11:59.444Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519443-3jye0', 'email.leader.mwdi7knz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485294903-adva0s', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:11:59.443Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519442-qa1la', 'email.member.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519442-a2kjkq', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:11:59.442Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519441-uty31', 'email.leader.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519441-em4vca', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:11:59.441Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519440-9wu5m', 'email.member.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519439-htao4d', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:11:59.440Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519438-4iqfi', 'email.leader.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519438-ro4d59', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:11:59.438Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519437-mh3ro', 'leader.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519437-9fkzq5', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.437Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519436-6jec3', 'builder5.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519436-t9m2m2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.436Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519435-yiqb0', 'builder4.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519435-or803a', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.435Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519434-4ahcb', 'builder3.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519433-hb0wsj', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.434Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519426-w9koe', 'member1.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519426-2dhkn2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.426Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519425-iqi8y', 'meera.krish.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519424-y40vwn', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.425Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519423-e52d6', 'arjun.raman.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519423-r827i1', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.423Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519422-x72to', 'fi.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519422-qd3q7b', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794483786255@example.edu', NULL, '2026-11-12T12:11:59.422Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519421-bfqdq', 'dq.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519421-pnj9b5', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794483786255@example.edu', NULL, '2026-11-12T12:11:59.421Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519420-l4uzh', 'lead.p6.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519420-w0gqdc', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794483786255@example.edu', NULL, '2026-11-12T12:11:59.420Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519419-zdpbc', 'fi.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519419-zsnqyu', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482700408@example.edu', NULL, '2026-11-12T12:11:59.419Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519418-nwgjf', 'dq.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519418-5xuo6g', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482700408@example.edu', NULL, '2026-11-12T12:11:59.418Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519417-vmb4e', 'lead.p6.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519417-5hgwaq', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482700408@example.edu', NULL, '2026-11-12T12:11:59.417Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519416-aek9d', 'leader.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519415-6nsr7c', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.416Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519406-9xsby', 'builder5.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519406-i66gch', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.406Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519405-6exr6', 'builder4.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519405-8uvh8p', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.405Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519404-13n9d', 'builder3.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519404-kl9zqo', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.404Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519403-i39kh', 'member1.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519403-x5od6r', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.403Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519402-zlxn1', 'meera.krish.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519402-v88224', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.402Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519401-68lds', 'arjun.raman.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519401-apwr22', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.401Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519400-3cbfc', 'fi.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519400-kumfii', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482569558@example.edu', NULL, '2026-11-12T12:11:59.400Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519399-wa49h', 'dq.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519399-yx65ee', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482569558@example.edu', NULL, '2026-11-12T12:11:59.399Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519398-rufo6', 'lead.p6.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519398-ysz4od', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482569558@example.edu', NULL, '2026-11-12T12:11:59.398Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519397-9qdsq', 'lead.p6.1794482545766@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519396-ekkecc', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482545766@example.edu', NULL, '2026-11-12T12:11:59.397Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519389-9uejf', 'meera.krish.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519388-fjdzp9', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.389Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519388-sp0be', 'arjun.raman.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519387-i3lr5a', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.388Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519387-d7nvd', 'leader.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519386-q3whvc', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.387Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519386-j0jrp', 'builder5.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519385-t8t2cl', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.386Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519385-5rnm9', 'builder4.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519384-r5jtzw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.385Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519383-ak5q1', 'builder3.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519383-vjf0ci', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.383Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519382-4ayj9', 'member1.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519382-vsmg6l', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.382Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519381-6l1xb', 'leader.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519381-jii7gd', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.381Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519380-pab28', 'builder5.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519380-tadxif', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.380Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519379-gp4wv', 'builder4.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519379-su8bnm', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.379Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519371-m4rj9', 'builder3.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519371-30zxo3', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.371Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519370-lscok', 'member1.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519370-7vpa5o', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.370Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519369-zs9x0', 'leader.1794480730596@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519369-jdss4z', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480730596@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.369Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519368-zmeu8', 'memberone@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519368-svlg67', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:memberone@example.com', NULL, '2026-11-12T12:11:59.368Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519367-pj2sv', 'debuglead@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519367-oblrs2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:debuglead@example.com', NULL, '2026-11-12T12:11:59.367Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519366-6xwjp', 'leader.1794480606458@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519366-yupwz8', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480606458@sathyabama.ac.in', NULL, '2026-11-12T12:11:59.366Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519365-v5em8', 'aditya.n@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519365-p1i7s9', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:aditya.n@example.edu', NULL, '2026-11-12T12:11:59.365Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519364-cnvmr', 'swetha.k@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519364-spr6id', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:swetha.k@example.edu', NULL, '2026-11-12T12:11:59.364Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519363-hndi4', 'rohan.g@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519363-inermg', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:rohan.g@example.edu', NULL, '2026-11-12T12:11:59.363Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485519362-1c4q8', 'pooja.v@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485519361-j8b2nx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:pooja.v@example.edu', NULL, '2026-11-12T12:11:59.362Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485518682-b6xft', 'email.leader.mwdic9oe@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T035 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794485518681-34tkbe', 1, 'checkin-confirm:KAIROS-T035:email.leader.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:11:58.682Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485516522-befzc', 'email.leader.mwdic9oe@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdic9oe Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485516521-9gser2', 1, 'abstract-decision:KAIROS-T035:SHORTLISTED', NULL, '2026-11-12T12:11:56.522Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485514722-1cqnv', 'email.member.mwdic9oe@sist.edu.in', 'KAIROS 2027 — Successfully Joined Titan AI mwdic9oe', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485514722-0ixv2k', 1, 'join-confirm:KAIROS-T035:email.member.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:11:54.722Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485514516-y03bx', 'email.member.mwdic9oe@sist.edu.in', 'KAIROS 2027 — Invitation to Join Titan AI mwdic9oe [KAIROS-T035]', 'team-invitation', 'SIMULATED', 'ses-sim-1794485514515-1l4v3d', 1, 'team-invite:KAIROS-T035:email.member.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:11:54.516Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485512014-13sja', 'email.leader.mwdic9oe@sist.edu.in', 'KAIROS 2027 — Squad Created: Titan AI mwdic9oe [KAIROS-T035]', 'team-creation', 'SIMULATED', 'ses-sim-1794485512013-i476y0', 1, 'team-create:KAIROS-T035', NULL, '2026-11-12T12:11:52.014Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485511460-xt3m7', 'email.leader.mwdic9oe@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485511458-olj3bb', 1, 'email-verify:email.leader.mwdic9oe@sist.edu.in', NULL, '2026-11-12T12:11:51.460Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485510382-t0xyn', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794485510381-uy0bvy', 1, 'idemp-test-1794485509272-q935-diff', NULL, '2026-11-12T12:11:50.382Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485510094-f8qdg', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485509824-ffbf98', 1, 'idemp-test-1794485509272-q935', NULL, '2026-11-12T12:11:50.094Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485509825-o1pry', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794485509824-ffbf98', 1, 'idemp-test-1794485509272-q935', NULL, '2026-11-12T12:11:49.825Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485476302-v8frp', 'builder.outsider.1794485474412@test.edu', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485476301-hqh7wt', 1, 'email-verify:builder.outsider.1794485474412@test.edu', NULL, '2026-11-12T12:11:16.302Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485436015-w5c0b', 'builder.outsider.1794485428152@test.edu', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485436014-3hocxa', 1, 'email-verify:builder.outsider.1794485428152@test.edu', NULL, '2026-11-12T12:10:36.015Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485420688-hxr8r', 'leader.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Squad Created: Karthik Solo Squad 1794485408809 [KAIROS-T034]', 'team-creation', 'SIMULATED', 'ses-sim-1794485420687-ru0dxl', 1, 'team-create:KAIROS-T034', NULL, '2026-11-12T12:10:20.688Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485415870-5ltr1', 'builder5.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485415870-ux456a', 1, 'join-confirm:KAIROS-T033:builder5.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:15.870Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485415738-ta5h3', 'builder4.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485415737-d18npl', 1, 'join-confirm:KAIROS-T033:builder4.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:15.738Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485415592-p9kw1', 'builder3.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485415591-ejb4y4', 1, 'join-confirm:KAIROS-T033:builder3.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:15.592Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485415439-xnvlz', 'builder2.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485415438-wsyfe6', 1, 'join-confirm:KAIROS-T033:builder2.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:15.439Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485414964-apml7', 'member1.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485414964-vv3sus', 1, 'join-confirm:KAIROS-T033:member1.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:14.964Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485414398-hwnia', 'member1.1794485408809@sathyabama.ac.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485414397-03xwog', 1, 'email-verify:member1.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:14.398Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485412820-q7gbb', 'leader.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Squad Created: NeuralMesh Alpha 1794485408809 [KAIROS-T033]', 'team-creation', 'SIMULATED', 'ses-sim-1794485412820-pf9dwc', 1, 'team-create:KAIROS-T033', NULL, '2026-11-12T12:10:12.820Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485412237-czfll', 'leader.1794485408809@sathyabama.ac.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485412237-vj4jgz', 1, 'email-verify:leader.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:12.237Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485410293-kma3y', 'reg.builder.1794485408809@sathyabama.ac.in', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485410291-mf8sr]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485410292-sygiws', 1, 'reg-confirm:reg.builder.1794485408809@sathyabama.ac.in:w-1794485410291-mf8sr', NULL, '2026-11-12T12:10:10.293Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485409672-y3l5c', 'reg.builder.1794485408809@sathyabama.ac.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485409671-zzlenl', 1, 'email-verify:reg.builder.1794485408809@sathyabama.ac.in', NULL, '2026-11-12T12:10:09.672Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485368738-we2sb', 'ravi.chandran.1794485361490@sathyabama.ac.in', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485368736-tmung]', 'registration-confirmation', 'SIMULATED', 'ses-sim-1794485368737-3c7l1y', 1, 'reg-confirm:ravi.chandran.1794485361490@sathyabama.ac.in:w-1794485368736-tmung', NULL, '2026-11-12T12:09:28.738Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485366390-lxebi', 'ravi.chandran.1794485361490@sathyabama.ac.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485366389-wpavie', 1, 'email-verify:ravi.chandran.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:09:26.390Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485366046-doif8', 'meera.krish.1794485361490@sathyabama.ac.in', 'KAIROS 2027 — Successfully Joined Titan Mesh 1794485361490', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485366046-o3oxio', 1, 'join-confirm:KAIROS-T032:meera.krish.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:09:26.046Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485365502-1mow7', 'meera.krish.1794485361490@sathyabama.ac.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485365501-qqpblm', 1, 'email-verify:meera.krish.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:09:25.502Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485365033-sgrxh', 'arjun.raman.1794485361490@sathyabama.ac.in', 'KAIROS 2027 — Squad Created: Titan Mesh 1794485361490 [KAIROS-T032]', 'team-creation', 'SIMULATED', 'ses-sim-1794485365033-abo0cb', 1, 'team-create:KAIROS-T032', NULL, '2026-11-12T12:09:25.033Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485364452-x91f8', 'arjun.raman.1794485361490@sathyabama.ac.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485364451-sf7l4q', 1, 'email-verify:arjun.raman.1794485361490@sathyabama.ac.in', NULL, '2026-11-12T12:09:24.452Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485348065-6cp3i', 'fi.lead.1794485321265@example.edu', 'KAIROS 2027 — Squad Created: FI Test Team 1794485321265 [KAIROS-T031]', 'team-creation', 'SIMULATED', 'ses-sim-1794485348064-kihcwy', 1, 'team-create:KAIROS-T031', NULL, '2026-11-12T12:09:08.065Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485347334-rsqeo', 'fi.lead.1794485321265@example.edu', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485347333-2ey9wl', 1, 'email-verify:fi.lead.1794485321265@example.edu', NULL, '2026-11-12T12:09:07.334Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485340117-xlapd', 'lead.p6.1794485321265@example.edu', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T029 [BAY-C09]', 'checkin-confirmation', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485334568-tjz6bc', 1, 'checkin-confirm:KAIROS-T029:lead.p6.1794485321265@example.edu', NULL, '2026-11-12T12:09:00.117Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485337281-s3rnj', 'dq.lead.1794485321265@example.edu', 'KAIROS 2027 — Abstract Review Decision: Disqualified Team 1794485321265', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485337280-a0wehw', 1, 'abstract-decision:KAIROS-T030:REJECTED', NULL, '2026-11-12T12:08:57.281Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485337019-0347f', 'dq.lead.1794485321265@example.edu', 'KAIROS 2027 — Squad Created: Disqualified Team 1794485321265 [KAIROS-T030]', 'team-creation', 'SIMULATED', 'ses-sim-1794485337018-247dd5', 1, 'team-create:KAIROS-T030', NULL, '2026-11-12T12:08:57.019Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485335694-ayd5e', 'dq.lead.1794485321265@example.edu', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485335693-yf8p82', 1, 'email-verify:dq.lead.1794485321265@example.edu', NULL, '2026-11-12T12:08:55.694Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485334569-6hb6d', 'lead.p6.1794485321265@example.edu', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T029 [BAY-C09]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794485334568-tjz6bc', 1, 'checkin-confirm:KAIROS-T029:lead.p6.1794485321265@example.edu', NULL, '2026-11-12T12:08:54.569Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485332913-pg38s', 'lead.p6.1794485321265@example.edu', '🎉 KAIROS 2027 — Official Selection: Neural Apex 1794485321265 Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485332912-qw998o', 1, 'abstract-decision:KAIROS-T029:SHORTLISTED', NULL, '2026-11-12T12:08:52.913Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485332156-h66j3', 'lead.p6.1794485321265@example.edu', 'KAIROS 2027 — Squad Created: Neural Apex 1794485321265 [KAIROS-T029]', 'team-creation', 'SIMULATED', 'ses-sim-1794485332155-6p6q19', 1, 'team-create:KAIROS-T029', NULL, '2026-11-12T12:08:52.156Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485330829-f0sll', 'lead.p6.1794485321265@example.edu', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485330828-5fvzri', 1, 'email-verify:lead.p6.1794485321265@example.edu', NULL, '2026-11-12T12:08:50.829Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485325391-g0jif', 'student.p6.1794485321265@example.edu', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485325389-qf71n2', 1, 'email-verify:student.p6.1794485321265@example.edu', NULL, '2026-11-12T12:08:45.391Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294905-beniy', 'email.member.mwdi7knz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485294904-bpxnu3', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:08:14.905Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294903-g1del', 'email.leader.mwdi7knz@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485294903-adva0s', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:08:14.903Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294902-5hhwc', 'email.member.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264933-bv38bx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:08:14.902Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294901-sqlp5', 'email.leader.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264932-kl002z', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:08:14.901Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294900-ozwmq', 'email.member.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264931-28vsvx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:08:14.900Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294899-bkcz8', 'email.leader.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264929-37iqhx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:08:14.899Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294898-e4qgv', 'leader.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264928-pmhv9c', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.898Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294897-6o8tv', 'builder5.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264927-99cey8', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.897Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294896-1evfx', 'builder4.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264926-bnmbly', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.896Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294894-cu92a', 'builder3.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264924-2obmh7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.894Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294886-kl8jx', 'member1.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264918-lu7b08', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.886Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294885-4lmfo', 'meera.krish.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264917-xctth7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.885Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294884-ivwr7', 'arjun.raman.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264916-q0on5l', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.884Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294882-d41ls', 'fi.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264915-y82zeq', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794483786255@example.edu', NULL, '2026-11-12T12:08:14.882Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294881-35eyt', 'dq.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264914-duvfmz', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794483786255@example.edu', NULL, '2026-11-12T12:08:14.881Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294880-naumy', 'lead.p6.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264913-fksa8k', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794483786255@example.edu', NULL, '2026-11-12T12:08:14.880Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294879-i265m', 'fi.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264913-hqard2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482700408@example.edu', NULL, '2026-11-12T12:08:14.879Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294878-z2ci0', 'dq.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264912-oxsy6b', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482700408@example.edu', NULL, '2026-11-12T12:08:14.878Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294877-8ehof', 'lead.p6.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264911-lhx4l1', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482700408@example.edu', NULL, '2026-11-12T12:08:14.877Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294876-8dp5r', 'leader.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264909-rxu8gm', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.876Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294866-ohdgj', 'builder5.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264901-wwy9gu', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.867Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294865-ehewm', 'builder4.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264900-hspkvu', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.865Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294863-twoar', 'builder3.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264899-9n0y2s', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.863Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294862-z3x0s', 'member1.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264898-vlupmg', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.862Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294861-z1dcc', 'meera.krish.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264897-rtt5m9', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.861Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294859-e4n51', 'arjun.raman.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264896-tz5e1e', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.859Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294858-cka10', 'fi.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264896-ag4kpe', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482569558@example.edu', NULL, '2026-11-12T12:08:14.858Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294856-zxehj', 'dq.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264895-3mxogx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482569558@example.edu', NULL, '2026-11-12T12:08:14.856Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294855-6b5bw', 'lead.p6.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264894-qjawhr', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482569558@example.edu', NULL, '2026-11-12T12:08:14.855Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294854-h8kkz', 'lead.p6.1794482545766@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264893-ljfvof', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482545766@example.edu', NULL, '2026-11-12T12:08:14.854Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294846-4oxsm', 'meera.krish.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264888-negz2c', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.846Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294845-faeis', 'arjun.raman.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264887-1leufd', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.845Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294844-7bf54', 'leader.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264886-4mwbvk', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.844Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294843-dp02g', 'builder5.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264885-sivrr5', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.843Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294842-1sces', 'builder4.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264883-i5a7c2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.842Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294841-awee7', 'builder3.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264882-untp60', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.841Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294839-wlvae', 'member1.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264881-jea4rd', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.839Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294837-q6jut', 'leader.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264880-lvg4lz', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.837Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294836-yuy3m', 'builder5.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264879-yqqo17', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.836Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294834-1lswh', 'builder4.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264877-00auxj', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.834Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294827-ul98p', 'builder3.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264872-6ndds2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.827Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294825-bfos8', 'member1.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264871-vod5cw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.825Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294824-dc02w', 'leader.1794480730596@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264870-nngg08', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480730596@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.824Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294822-bjupz', 'memberone@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264868-vw8psa', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:memberone@example.com', NULL, '2026-11-12T12:08:14.822Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294820-f23v4', 'debuglead@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264866-7466d7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:debuglead@example.com', NULL, '2026-11-12T12:08:14.820Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294818-kieyk', 'leader.1794480606458@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264865-h7za2j', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480606458@sathyabama.ac.in', NULL, '2026-11-12T12:08:14.818Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294817-erqga', 'aditya.n@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264863-kjzyh2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:aditya.n@example.edu', NULL, '2026-11-12T12:08:14.817Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294816-zmsh8', 'swetha.k@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264861-88iryh', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:swetha.k@example.edu', NULL, '2026-11-12T12:08:14.816Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294815-oi6k6', 'rohan.g@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264859-yd9sx1', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:rohan.g@example.edu', NULL, '2026-11-12T12:08:14.815Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294813-kcc9p', 'pooja.v@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485264857-c98z8n', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:pooja.v@example.edu', NULL, '2026-11-12T12:08:14.814Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485294018-nz9c1', 'email.leader.mwdi7knz@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T028 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794485294017-troefk', 1, 'checkin-confirm:KAIROS-T028:email.leader.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:08:14.018Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485293694-pnmo8', 'email.leader.mwdi7knz@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdi7knz Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485293693-y3dsvp', 1, 'abstract-decision:KAIROS-T028:SHORTLISTED', NULL, '2026-11-12T12:08:13.694Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485293500-8ex03', 'email.member.mwdi7knz@sist.edu.in', 'KAIROS 2027 — Successfully Joined Titan AI mwdi7knz', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485293500-hw7272', 1, 'join-confirm:KAIROS-T028:email.member.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:08:13.500Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485293278-e9hd3', 'email.member.mwdi7knz@sist.edu.in', 'KAIROS 2027 — Invitation to Join Titan AI mwdi7knz [KAIROS-T028]', 'team-invitation', 'SIMULATED', 'ses-sim-1794485293278-6qi47p', 1, 'team-invite:KAIROS-T028:email.member.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:08:13.278Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485292414-ddme6', 'email.leader.mwdi7knz@sist.edu.in', 'KAIROS 2027 — Squad Created: Titan AI mwdi7knz [KAIROS-T028]', 'team-creation', 'SIMULATED', 'ses-sim-1794485292414-qhcxk3', 1, 'team-create:KAIROS-T028', NULL, '2026-11-12T12:08:12.414Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485291934-xygzo', 'email.leader.mwdi7knz@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485291933-5aki4b', 1, 'email-verify:email.leader.mwdi7knz@sist.edu.in', NULL, '2026-11-12T12:08:11.934Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485291465-woj8v', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794485291464-bi6y9s', 1, 'idemp-test-1794485290845-fj86-diff', NULL, '2026-11-12T12:08:11.465Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485291251-aueo6', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485290985-k70btv', 1, 'idemp-test-1794485290845-fj86', NULL, '2026-11-12T12:08:11.251Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485290986-ljdjm', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794485290985-k70btv', 1, 'idemp-test-1794485290845-fj86', NULL, '2026-11-12T12:08:10.986Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264933-3bpvq', 'email.member.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264933-bv38bx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:07:44.933Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264932-y9tf5', 'email.leader.mwdi6uqj@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264932-kl002z', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:07:44.932Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264931-64eg2', 'email.member.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264931-28vsvx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:07:44.931Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264930-bi7b0', 'email.leader.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264929-37iqhx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:07:44.930Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264929-kfsth', 'leader.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264928-pmhv9c', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.929Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264927-xgbjq', 'builder5.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264927-99cey8', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.927Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264926-eevjp', 'builder4.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264926-bnmbly', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.926Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264925-g9a35', 'builder3.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264924-2obmh7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.925Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264918-7xeds', 'member1.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264918-lu7b08', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.918Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264917-ig8go', 'meera.krish.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264917-xctth7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.917Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264916-mzr1o', 'arjun.raman.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264916-q0on5l', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.916Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264915-nnmw2', 'fi.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264915-y82zeq', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794483786255@example.edu', NULL, '2026-11-12T12:07:44.915Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264915-mj0xv', 'dq.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264914-duvfmz', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794483786255@example.edu', NULL, '2026-11-12T12:07:44.915Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264914-3bsnp', 'lead.p6.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264913-fksa8k', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794483786255@example.edu', NULL, '2026-11-12T12:07:44.914Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264913-jtoh3', 'fi.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264913-hqard2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482700408@example.edu', NULL, '2026-11-12T12:07:44.913Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264912-grtik', 'dq.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264912-oxsy6b', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482700408@example.edu', NULL, '2026-11-12T12:07:44.912Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264911-273yi', 'lead.p6.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264911-lhx4l1', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482700408@example.edu', NULL, '2026-11-12T12:07:44.911Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264910-rfa7o', 'leader.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264909-rxu8gm', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.910Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264902-jgt7s', 'builder5.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264901-wwy9gu', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.902Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264900-em3gj', 'builder4.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264900-hspkvu', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.900Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264899-qka3v', 'builder3.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264899-9n0y2s', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.899Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264898-qn4lp', 'member1.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264898-vlupmg', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.898Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264898-tar6e', 'meera.krish.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264897-rtt5m9', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.898Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264897-5w5w7', 'arjun.raman.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264896-tz5e1e', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.897Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264896-jqz1v', 'fi.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264896-ag4kpe', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482569558@example.edu', NULL, '2026-11-12T12:07:44.896Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264895-vbhqo', 'dq.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264895-3mxogx', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482569558@example.edu', NULL, '2026-11-12T12:07:44.895Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264894-rx0gt', 'lead.p6.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264894-qjawhr', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482569558@example.edu', NULL, '2026-11-12T12:07:44.894Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264893-nbev4', 'lead.p6.1794482545766@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264893-ljfvof', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482545766@example.edu', NULL, '2026-11-12T12:07:44.893Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264888-xmlrc', 'meera.krish.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264888-negz2c', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.888Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264887-odbyt', 'arjun.raman.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264887-1leufd', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.887Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264887-o9aow', 'leader.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264886-4mwbvk', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.887Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264885-hhnwo', 'builder5.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264885-sivrr5', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.885Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264884-x9ehx', 'builder4.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264883-i5a7c2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.884Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264882-bwewq', 'builder3.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264882-untp60', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.882Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264881-1sr5l', 'member1.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264881-jea4rd', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.881Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264880-9bsyb', 'leader.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264880-lvg4lz', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.880Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264879-jpg9i', 'builder5.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264879-yqqo17', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.879Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264878-0l9dh', 'builder4.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264877-00auxj', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.878Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264873-fnd59', 'builder3.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264872-6ndds2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.873Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264872-n6bn7', 'member1.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264871-vod5cw', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.872Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264870-1os78', 'leader.1794480730596@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264870-nngg08', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480730596@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.870Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264869-94d6i', 'memberone@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264868-vw8psa', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:memberone@example.com', NULL, '2026-11-12T12:07:44.869Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264867-0yv9y', 'debuglead@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264866-7466d7', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:debuglead@example.com', NULL, '2026-11-12T12:07:44.867Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264865-udxgw', 'leader.1794480606458@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264865-h7za2j', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480606458@sathyabama.ac.in', NULL, '2026-11-12T12:07:44.865Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264864-smq9g', 'aditya.n@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264863-kjzyh2', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:aditya.n@example.edu', NULL, '2026-11-12T12:07:44.864Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264862-bxs02', 'swetha.k@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264861-88iryh', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:swetha.k@example.edu', NULL, '2026-11-12T12:07:44.862Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264860-bdan1', 'rohan.g@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264859-yd9sx1', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:rohan.g@example.edu', NULL, '2026-11-12T12:07:44.860Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485264858-feqmh', 'pooja.v@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', 'ses-sim-1794485264857-c98z8n', 1, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:pooja.v@example.edu', NULL, '2026-11-12T12:07:44.858Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485263719-fe7fd', 'email.leader.mwdi6uqj@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T027 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', 'ses-sim-1794485263717-5iymj6', 1, 'checkin-confirm:KAIROS-T027:email.leader.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:07:43.719Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485262420-i91nz', 'email.leader.mwdi6uqj@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdi6uqj Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', 'ses-sim-1794485262418-jo1q10', 1, 'abstract-decision:KAIROS-T027:SHORTLISTED', NULL, '2026-11-12T12:07:42.420Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485261381-3pdgh', 'email.member.mwdi6uqj@sist.edu.in', 'KAIROS 2027 — Successfully Joined Titan AI mwdi6uqj', 'team-joining-confirmation', 'SIMULATED', 'ses-sim-1794485261380-qggcdi', 1, 'join-confirm:KAIROS-T027:email.member.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:07:41.381Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485261191-0i8cb', 'email.member.mwdi6uqj@sist.edu.in', 'KAIROS 2027 — Invitation to Join Titan AI mwdi6uqj [KAIROS-T027]', 'team-invitation', 'SIMULATED', 'ses-sim-1794485261191-vnoigi', 1, 'team-invite:KAIROS-T027:email.member.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:07:41.191Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485260109-jp5uh', 'email.leader.mwdi6uqj@sist.edu.in', 'KAIROS 2027 — Squad Created: Titan AI mwdi6uqj [KAIROS-T027]', 'team-creation', 'SIMULATED', 'ses-sim-1794485260108-4b8wfu', 1, 'team-create:KAIROS-T027', NULL, '2026-11-12T12:07:40.109Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485259301-oakqb', 'email.leader.mwdi6uqj@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', 'ses-sim-1794485259300-v413fz', 1, 'email-verify:email.leader.mwdi6uqj@sist.edu.in', NULL, '2026-11-12T12:07:39.301Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485257742-r3vdu', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794485257741-z7oote', 1, 'idemp-test-1794485257205-9q3x-diff', NULL, '2026-11-12T12:07:37.742Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485257472-ofzjc', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SUPPRESSED_DUPLICATE', 'ses-sim-1794485257334-1eisgt', 1, 'idemp-test-1794485257205-9q3x', NULL, '2026-11-12T12:07:37.472Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485257334-8caz2', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794485257334-1eisgt', 1, 'idemp-test-1794485257205-9q3x', NULL, '2026-11-12T12:07:37.334Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159448-42d0t', 'email.member.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159447-ctfk2d', 1, 'announcement:Grand Finale Opening:email.member.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:05:59.448Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159447-7ka8z', 'email.leader.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159446-jwr1ht', 1, 'announcement:Grand Finale Opening:email.leader.mwdi1tle@sist.edu.in', NULL, '2026-11-12T12:05:59.447Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159446-cbj03', 'leader.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159445-574fnu', 1, 'announcement:Grand Finale Opening:leader.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.446Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159445-igy49', 'builder5.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159444-3393u2', 1, 'announcement:Grand Finale Opening:builder5.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.445Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159444-xlxkb', 'builder4.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159443-wy7gtp', 1, 'announcement:Grand Finale Opening:builder4.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.444Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159443-lgojj', 'builder3.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159442-vwvvx3', 1, 'announcement:Grand Finale Opening:builder3.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.443Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159437-8wxl3', 'member1.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159437-rvmbzq', 1, 'announcement:Grand Finale Opening:member1.1794483832299@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.437Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159436-5hykc', 'meera.krish.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159436-8mqbes', 1, 'announcement:Grand Finale Opening:meera.krish.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.436Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159435-rwgyg', 'arjun.raman.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159435-y9aov5', 1, 'announcement:Grand Finale Opening:arjun.raman.1794483809177@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.435Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159434-s4nkf', 'fi.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159433-mr8sch', 1, 'announcement:Grand Finale Opening:fi.lead.1794483786255@example.edu', NULL, '2026-11-12T12:05:59.434Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159433-f3o9i', 'dq.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159432-wey2a6', 1, 'announcement:Grand Finale Opening:dq.lead.1794483786255@example.edu', NULL, '2026-11-12T12:05:59.433Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159431-i73t8', 'lead.p6.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159431-yy2qq2', 1, 'announcement:Grand Finale Opening:lead.p6.1794483786255@example.edu', NULL, '2026-11-12T12:05:59.431Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159430-b41cy', 'fi.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159430-hityrl', 1, 'announcement:Grand Finale Opening:fi.lead.1794482700408@example.edu', NULL, '2026-11-12T12:05:59.430Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159429-65p88', 'dq.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159429-3rou6k', 1, 'announcement:Grand Finale Opening:dq.lead.1794482700408@example.edu', NULL, '2026-11-12T12:05:59.429Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159428-x3y22', 'lead.p6.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159428-rbighu', 1, 'announcement:Grand Finale Opening:lead.p6.1794482700408@example.edu', NULL, '2026-11-12T12:05:59.428Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159427-zxmxp', 'leader.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159426-f4j4em', 1, 'announcement:Grand Finale Opening:leader.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.427Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159421-149t7', 'builder5.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159421-hhroth', 1, 'announcement:Grand Finale Opening:builder5.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.421Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159420-qvvi3', 'builder4.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159419-l2e69q', 1, 'announcement:Grand Finale Opening:builder4.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.420Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159419-q5jmz', 'builder3.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159418-nue22w', 1, 'announcement:Grand Finale Opening:builder3.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.419Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159417-l2llu', 'member1.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159417-j3ato5', 1, 'announcement:Grand Finale Opening:member1.1794482611880@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.417Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159416-y1lm5', 'meera.krish.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159416-f1yxcq', 1, 'announcement:Grand Finale Opening:meera.krish.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.416Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159415-spn81', 'arjun.raman.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159414-2w04mf', 1, 'announcement:Grand Finale Opening:arjun.raman.1794482584063@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.415Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159414-9q8zd', 'fi.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159414-ob4vwa', 1, 'announcement:Grand Finale Opening:fi.lead.1794482569558@example.edu', NULL, '2026-11-12T12:05:59.414Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159413-x9thm', 'dq.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159413-6kwuuf', 1, 'announcement:Grand Finale Opening:dq.lead.1794482569558@example.edu', NULL, '2026-11-12T12:05:59.413Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159412-h3j5p', 'lead.p6.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159412-vm1si3', 1, 'announcement:Grand Finale Opening:lead.p6.1794482569558@example.edu', NULL, '2026-11-12T12:05:59.412Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159411-aqaoc', 'lead.p6.1794482545766@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159411-9xuh72', 1, 'announcement:Grand Finale Opening:lead.p6.1794482545766@example.edu', NULL, '2026-11-12T12:05:59.411Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159407-08ajj', 'meera.krish.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159406-euuz41', 1, 'announcement:Grand Finale Opening:meera.krish.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.407Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159405-hcu9r', 'arjun.raman.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159405-emd0mm', 1, 'announcement:Grand Finale Opening:arjun.raman.1794481647677@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.405Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159404-1bfoo', 'leader.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159404-abkd8v', 1, 'announcement:Grand Finale Opening:leader.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.404Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159403-wsmtr', 'builder5.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159403-7sfwvw', 1, 'announcement:Grand Finale Opening:builder5.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.403Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159402-5aw8t', 'builder4.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159402-u1go5t', 1, 'announcement:Grand Finale Opening:builder4.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.402Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159401-3rrrq', 'builder3.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159401-10xswb', 1, 'announcement:Grand Finale Opening:builder3.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.401Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159400-g128n', 'member1.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159400-ykes6n', 1, 'announcement:Grand Finale Opening:member1.1794480958468@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.400Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159399-a3vgb', 'leader.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159399-akl6i4', 1, 'announcement:Grand Finale Opening:leader.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.399Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159398-5tvaz', 'builder5.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159398-jw319f', 1, 'announcement:Grand Finale Opening:builder5.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.398Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159397-qx1e4', 'builder4.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159397-iyffhm', 1, 'announcement:Grand Finale Opening:builder4.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.397Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159394-cfl21', 'builder3.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159394-lr3vjq', 1, 'announcement:Grand Finale Opening:builder3.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.394Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159393-7q4hb', 'member1.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159393-w9bdqv', 1, 'announcement:Grand Finale Opening:member1.1794480847598@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.393Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159393-7m4dw', 'leader.1794480730596@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159392-rs6n0n', 1, 'announcement:Grand Finale Opening:leader.1794480730596@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.393Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159392-xzhv7', 'memberone@example.com', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159392-6df0os', 1, 'announcement:Grand Finale Opening:memberone@example.com', NULL, '2026-11-12T12:05:59.392Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159391-8y2sp', 'debuglead@example.com', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159391-n3h4ju', 1, 'announcement:Grand Finale Opening:debuglead@example.com', NULL, '2026-11-12T12:05:59.391Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159391-8rzds', 'leader.1794480606458@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159391-c4cc87', 1, 'announcement:Grand Finale Opening:leader.1794480606458@sathyabama.ac.in', NULL, '2026-11-12T12:05:59.391Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159390-z5wqr', 'aditya.n@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159390-qny4yu', 1, 'announcement:Grand Finale Opening:aditya.n@example.edu', NULL, '2026-11-12T12:05:59.390Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159388-ijtg6', 'swetha.k@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159388-u2llo8', 1, 'announcement:Grand Finale Opening:swetha.k@example.edu', NULL, '2026-11-12T12:05:59.388Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159387-d7097', 'rohan.g@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159387-k5v6w6', 1, 'announcement:Grand Finale Opening:rohan.g@example.edu', NULL, '2026-11-12T12:05:59.387Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485159386-qebnp', 'pooja.v@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', 'ses-sim-1794485159386-ez4rhv', 1, 'announcement:Grand Finale Opening:pooja.v@example.edu', NULL, '2026-11-12T12:05:59.386Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485148086-3uqna', 'test@example.com', 'test subject', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', 'ses-sim-1794485148086-1g6h9c', 1, 'CUSTOM_ADMIN_MESSAGE:test@example.com:dGVzdCBzdWJqZWN0', NULL, '2026-11-12T12:05:48.086Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485119958-eftom', 'test@example.com', 'test subject', 'CUSTOM_ADMIN_MESSAGE', 'FAILED', NULL, 3, 'CUSTOM_ADMIN_MESSAGE:test@example.com:dGVzdCBzdWJqZWN0', 'The security token included in the request is invalid.', '2026-11-12T12:05:19.958Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036535-6e2wb', 'email.leader.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.leader.mwdi1tle@sist.edu.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.535Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036522-pj1lu', 'email.member.mwdi1tle@sist.edu.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:email.member.mwdi1tle@sist.edu.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.522Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036502-gxiqo', 'leader.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794483832299@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.502Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036478-2e1yj', 'builder4.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794483832299@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.478Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036437-svm9q', 'builder5.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794483832299@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.438Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036416-knrek', 'builder3.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794483832299@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.416Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036212-v9880', 'member1.1794483832299@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794483832299@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.212Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036201-gah7x', 'meera.krish.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794483809177@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.201Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036192-ga1io', 'arjun.raman.1794483809177@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794483809177@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.192Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036186-ka293', 'fi.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794483786255@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.186Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036176-tbcg1', 'dq.lead.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794483786255@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.176Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036169-3m5bw', 'lead.p6.1794483786255@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794483786255@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.169Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036162-pybdi', 'fi.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482700408@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.162Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036155-r2dye', 'dq.lead.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482700408@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.155Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036149-ilrkr', 'lead.p6.1794482700408@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482700408@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.149Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485036139-sj2xu', 'leader.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794482611880@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:56.139Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035976-03cj4', 'lead.p6.1794482545766@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482545766@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.976Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035971-5x8zg', 'builder5.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794482611880@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.971Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035966-tlq0a', 'builder4.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794482611880@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.966Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035960-6c0v2', 'builder3.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794482611880@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.960Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035917-5cvz9', 'member1.1794482611880@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794482611880@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.917Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035904-wnztt', 'meera.krish.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794482584063@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.904Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035897-phjhc', 'arjun.raman.1794482584063@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794482584063@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.897Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035891-fk343', 'fi.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:fi.lead.1794482569558@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.891Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035884-ic2d7', 'dq.lead.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:dq.lead.1794482569558@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.884Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035872-qqzmf', 'lead.p6.1794482569558@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:lead.p6.1794482569558@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.872Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035653-dy5g9', 'builder4.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480847598@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.653Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035615-ckw61', 'meera.krish.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:meera.krish.1794481647677@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.615Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035608-dh089', 'arjun.raman.1794481647677@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:arjun.raman.1794481647677@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.608Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035568-rip15', 'leader.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480958468@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.568Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035561-slv9m', 'builder5.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480958468@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.561Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035555-ai6g7', 'builder4.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder4.1794480958468@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.555Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035547-fay0j', 'builder3.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480958468@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.547Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035539-kngo4', 'member1.1794480958468@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480958468@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.539Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035532-0unuh', 'leader.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480847598@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.532Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035524-qhl6e', 'builder5.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder5.1794480847598@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.524Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485035062-cbcqo', 'aditya.n@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:aditya.n@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:55.062Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485034622-ggimg', 'swetha.k@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:swetha.k@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:54.622Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485034612-o0vgq', 'memberone@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:memberone@example.com', 'The security token included in the request is invalid.', '2026-11-12T12:03:54.612Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485034545-npxal', 'leader.1794480606458@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480606458@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:54.546Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485034072-fibt8', 'debuglead@example.com', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:debuglead@example.com', 'The security token included in the request is invalid.', '2026-11-12T12:03:54.072Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485034025-eizos', 'member1.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:member1.1794480847598@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:54.025Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485033910-xf5eb', 'builder3.1794480847598@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder3.1794480847598@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:53.910Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485033902-5k6n5', 'rohan.g@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:rohan.g@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:53.903Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485033852-8b7f1', 'leader.1794480730596@sathyabama.ac.in', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:leader.1794480730596@sathyabama.ac.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:53.852Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485033720-ibdpa', 'pooja.v@example.edu', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'FAILED', NULL, 3, 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:pooja.v@example.edu', 'The security token included in the request is invalid.', '2026-11-12T12:03:53.720Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485033210-grxr2', 'email.leader.mwdi1tle@sist.edu.in', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T026 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'FAILED', NULL, 3, 'checkin-confirm:KAIROS-T026:email.leader.mwdi1tle@sist.edu.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:53.210Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485032507-90mpe', 'email.leader.mwdi1tle@sist.edu.in', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdi1tle Qualified for On-Campus Finals!', 'abstract-review-decision', 'FAILED', NULL, 3, 'abstract-decision:KAIROS-T026:SHORTLISTED', 'The security token included in the request is invalid.', '2026-11-12T12:03:52.507Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485031115-2g7za', 'email.member.mwdi1tle@sist.edu.in', 'KAIROS 2027 — Successfully Joined Titan AI mwdi1tle', 'team-joining-confirmation', 'FAILED', NULL, 3, 'join-confirm:KAIROS-T026:email.member.mwdi1tle@sist.edu.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:51.115Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485030770-2ntje', 'email.leader.mwdi1tle@sist.edu.in', 'KAIROS 2027 — Squad Created: Titan AI mwdi1tle [KAIROS-T026]', 'team-creation', 'FAILED', NULL, 3, 'team-create:KAIROS-T026', 'The security token included in the request is invalid.', '2026-11-12T12:03:50.770Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485030750-e88mh', 'email.member.mwdi1tle@sist.edu.in', 'KAIROS 2027 — Invitation to Join Titan AI mwdi1tle [KAIROS-T026]', 'team-invitation', 'FAILED', NULL, 3, 'team-invite:KAIROS-T026:email.member.mwdi1tle@sist.edu.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:50.750Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485026743-6it8p', 'email.leader.mwdi1tle@sist.edu.in', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'FAILED', NULL, 3, 'email-verify:email.leader.mwdi1tle@sist.edu.in', 'The security token included in the request is invalid.', '2026-11-12T12:03:46.743Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485022999-25oy4', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'FAILED', NULL, 3, 'idemp-test-1794485020156-elsf-diff', 'The security token included in the request is invalid.', '2026-11-12T12:03:42.999Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485021230-r4cbb', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'FAILED', NULL, 3, 'idemp-test-1794485020156-elsf', 'The security token included in the request is invalid.', '2026-11-12T12:03:41.230Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;
INSERT INTO public.notification_logs (id, to_email, subject, template, status, message_id, attempts, idempotency_key, error_message, created_at)
VALUES ('notif-1794485020937-8n8kw', 'idempotent.tester@gmail.com', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'FAILED', NULL, 3, 'idemp-test-1794485020156-elsf', 'The security token included in the request is invalid.', '2026-11-12T12:03:40.937Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  attempts = EXCLUDED.attempts,
  error_message = EXCLUDED.error_message;

COMMIT;
