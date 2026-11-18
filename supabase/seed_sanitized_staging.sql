/*
================================================================================
   KAIROS 2027 — ANONYMIZED STAGING SEED DATASET (OPTION A)
   Generated on: 2026-11-13T18:27:39.268Z
   Environment: Staging (Completely Sanitized - Zero Production PII)
   Default Password for all Student Accounts: StagingTest2027!
================================================================================
*/

BEGIN;

-- 1. SANITIZED PROFILES
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-865807860dee8760', 'builder001@kairos-staging.invalid', 'Staging Builder 1', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-1', 'https://linkedin.com/in/staging-builder-1', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'false', NULL, NULL, '2026-11-13T18:27:39.262Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-e619d2dff05fa446', 'builder002@kairos-staging.invalid', 'Staging Builder 2', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-2', 'https://linkedin.com/in/staging-builder-2', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-715418675ff78b8f', 'builder003@kairos-staging.invalid', 'Staging Builder 3', NULL, 'Sathyabama Institute of Science and Technology', 'STG-2027-003', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-3', 'https://linkedin.com/in/staging-builder-3', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-4f5ec056ed16eb76', 'builder004@kairos-staging.invalid', 'Staging Builder 4', NULL, 'Sathyabama Institute of Science and Technology', 'STG-2027-004', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-4', 'https://linkedin.com/in/staging-builder-4', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-28e66ae1e7108868', 'builder005@kairos-staging.invalid', 'Staging Builder 5', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-5', 'https://linkedin.com/in/staging-builder-5', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-79afbf9887984722', 'builder006@kairos-staging.invalid', 'Staging Builder 6', '+91 98000 00006', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'School of Computing - Advanced Cloud Lab', NULL, 'https://github.com/staging-builder-6', 'https://linkedin.com/in/staging-builder-6', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-656e37b22dd8f248', 'builder007@kairos-staging.invalid', 'Staging Builder 7', '+91 98000 00007', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-7', 'https://linkedin.com/in/staging-builder-7', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-ab62f5a90d59527d', 'builder008@kairos-staging.invalid', 'Staging Builder 8', '+91 98000 00008', 'Sathyabama Institute of Science and Technology', 'STG-2027-008', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-8', 'https://linkedin.com/in/staging-builder-8', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-b91491feab8f91af', 'builder009@kairos-staging.invalid', 'Staging Builder 9', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-9', 'https://linkedin.com/in/staging-builder-9', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-0e04e2c29deb6793', 'builder010@kairos-staging.invalid', 'Staging Builder 10', '+91 98000 00010', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-10', 'https://linkedin.com/in/staging-builder-10', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-02f23bbef9caa9e0', 'builder011@kairos-staging.invalid', 'Staging Builder 11', NULL, 'Sathyabama Institute of Science and Technology', 'STG-2027-011', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-11', 'https://linkedin.com/in/staging-builder-11', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-e23efe0214591b78', 'builder012@kairos-staging.invalid', 'Staging Builder 12', '+91 98000 00012', 'Sathyabama Institute of Science and Technology', 'STG-2027-012', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-12', 'https://linkedin.com/in/staging-builder-12', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-0cf9c782131cb33a', 'builder013@kairos-staging.invalid', 'Staging Builder 13', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-13', 'https://linkedin.com/in/staging-builder-13', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-450a6cdace83804f', 'builder014@kairos-staging.invalid', 'Staging Builder 14', '+91 98000 00014', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'School of Computing - Advanced Cloud Lab', NULL, 'https://github.com/staging-builder-14', 'https://linkedin.com/in/staging-builder-14', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3c661135315e61a5', 'builder015@kairos-staging.invalid', 'Staging Builder 15', '+91 98000 00015', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-15', 'https://linkedin.com/in/staging-builder-15', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-ddf1e7258bfaec7c', 'builder016@kairos-staging.invalid', 'Staging Builder 16', NULL, 'Sathyabama Institute of Science and Technology', 'STG-2027-016', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-16', 'https://linkedin.com/in/staging-builder-16', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-cdb341015f9376a6', 'builder017@kairos-staging.invalid', 'Staging Builder 17', '+91 98000 00017', 'Sathyabama Institute of Science and Technology', 'STG-2027-017', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-17', 'https://linkedin.com/in/staging-builder-17', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-59819c90d377c5e6', 'builder018@kairos-staging.invalid', 'Staging Builder 18', '+91 98000 00018', 'Sathyabama Institute of Science and Technology', 'STG-2027-018', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-18', 'https://linkedin.com/in/staging-builder-18', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-2b6f11772ceecd48', 'builder019@kairos-staging.invalid', 'Staging Builder 19', '+91 98000 00019', 'Sathyabama Institute of Science and Technology', 'STG-2027-019', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-19', 'https://linkedin.com/in/staging-builder-19', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-c56021cd5c6e55fb', 'builder020@kairos-staging.invalid', 'Staging Builder 20', '+91 98000 00020', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, 'https://github.com/staging-builder-20', 'https://linkedin.com/in/staging-builder-20', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-02595ac2bea7b1ca', 'builder021@kairos-staging.invalid', 'Staging Builder 21', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-21', 'https://linkedin.com/in/staging-builder-21', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-48c8b43037f51805', 'builder022@kairos-staging.invalid', 'Staging Builder 22', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-22', 'https://linkedin.com/in/staging-builder-22', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-d69094dfcbe28642', 'builder023@kairos-staging.invalid', 'Staging Builder 23', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-23', 'https://linkedin.com/in/staging-builder-23', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-dbfb4610a59a6fbd', 'builder024@kairos-staging.invalid', 'Staging Builder 24', '+91 98000 00024', 'Sathyabama Institute of Science and Technology', 'STG-2027-024', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-24', 'https://linkedin.com/in/staging-builder-24', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-174539bfa2ab05ae', 'builder025@kairos-staging.invalid', 'Staging Builder 25', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-25', 'https://linkedin.com/in/staging-builder-25', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3e056a8312672c66', 'builder026@kairos-staging.invalid', 'Staging Builder 26', '+91 98000 00026', 'Sathyabama Institute of Science and Technology', 'STG-2027-026', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-26', 'https://linkedin.com/in/staging-builder-26', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-5c1d20133de8d932', 'builder027@kairos-staging.invalid', 'Staging Builder 27', '+91 98000 00027', 'Sathyabama Institute of Science and Technology', 'STG-2027-027', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-27', 'https://linkedin.com/in/staging-builder-27', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6c8259f4e845301c', 'builder028@kairos-staging.invalid', 'Staging Builder 28', '+91 98000 00028', 'Sathyabama Institute of Science and Technology', 'STG-2027-028', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-28', 'https://linkedin.com/in/staging-builder-28', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-e0affc4d91f8e090', 'builder029@kairos-staging.invalid', 'Staging Builder 29', '+91 98000 00029', 'Sathyabama Institute of Science and Technology', 'STG-2027-029', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-29', 'https://linkedin.com/in/staging-builder-29', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3896e404542ad86f', 'builder030@kairos-staging.invalid', 'Staging Builder 30', '+91 98000 00030', 'Sathyabama Institute of Science and Technology', 'STG-2027-030', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-30', 'https://linkedin.com/in/staging-builder-30', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-ef09afaabe2772ca', 'builder031@kairos-staging.invalid', 'Staging Builder 31', '+91 98000 00031', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, 'https://github.com/staging-builder-31', 'https://linkedin.com/in/staging-builder-31', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-0ef9234e445cc96b', 'builder032@kairos-staging.invalid', 'Staging Builder 32', '+91 98000 00032', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-32', 'https://linkedin.com/in/staging-builder-32', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-fee0ccbfac5207c5', 'builder033@kairos-staging.invalid', 'Staging Builder 33', NULL, 'Sathyabama Institute of Science and Technology', 'STG-2027-033', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-33', 'https://linkedin.com/in/staging-builder-33', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3d6673c59b558922', 'builder034@kairos-staging.invalid', 'Staging Builder 34', '+91 98000 00034', 'Sathyabama Institute of Science and Technology', 'STG-2027-034', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-34', 'https://linkedin.com/in/staging-builder-34', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-178cb5b1c367827c', 'builder035@kairos-staging.invalid', 'Staging Builder 35', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-35', 'https://linkedin.com/in/staging-builder-35', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-833b9dfa1776f708', 'builder036@kairos-staging.invalid', 'Staging Builder 36', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-36', 'https://linkedin.com/in/staging-builder-36', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-9ef6efd984f0c3c7', 'builder037@kairos-staging.invalid', 'Staging Builder 37', '+91 98000 00037', 'Sathyabama Institute of Science and Technology', 'STG-2027-037', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-37', 'https://linkedin.com/in/staging-builder-37', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-15ad5ff9eca02b8e', 'builder038@kairos-staging.invalid', 'Staging Builder 38', '+91 98000 00038', 'Sathyabama Institute of Science and Technology', 'STG-2027-038', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-38', 'https://linkedin.com/in/staging-builder-38', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6a299ef47f54a152', 'builder039@kairos-staging.invalid', 'Staging Builder 39', '+91 98000 00039', 'Sathyabama Institute of Science and Technology', 'STG-2027-039', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-39', 'https://linkedin.com/in/staging-builder-39', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-cb0664261b2ab34d', 'builder040@kairos-staging.invalid', 'Staging Builder 40', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-40', 'https://linkedin.com/in/staging-builder-40', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-68d9889536cbfa09', 'builder041@kairos-staging.invalid', 'Staging Builder 41', '+91 98000 00041', 'Sathyabama Institute of Science and Technology', 'STG-2027-041', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-41', 'https://linkedin.com/in/staging-builder-41', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-70e03125a8370c09', 'builder042@kairos-staging.invalid', 'Staging Builder 42', '+91 98000 00042', 'Sathyabama Institute of Science and Technology', 'STG-2027-042', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-42', 'https://linkedin.com/in/staging-builder-42', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-7cdadc7229ca3911', 'builder043@kairos-staging.invalid', 'Staging Builder 43', '+91 98000 00043', 'Sathyabama Institute of Science and Technology', 'STG-2027-043', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-43', 'https://linkedin.com/in/staging-builder-43', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.264Z', NULL, '2026-11-13T18:27:39.264Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-1dc0fc9067349dcd', 'builder044@kairos-staging.invalid', 'Staging Builder 44', '+91 98000 00044', 'Sathyabama Institute of Science and Technology', 'STG-2027-044', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-44', 'https://linkedin.com/in/staging-builder-44', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-302082cd97ee57a4', 'builder045@kairos-staging.invalid', 'Staging Builder 45', '+91 98000 00045', 'Sathyabama Institute of Science and Technology', 'STG-2027-045', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-45', 'https://linkedin.com/in/staging-builder-45', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6a1ba72b18affeab', 'builder046@kairos-staging.invalid', 'Staging Builder 46', '+91 98000 00046', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, 'https://github.com/staging-builder-46', 'https://linkedin.com/in/staging-builder-46', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-4fdffe8102ef7fc9', 'builder047@kairos-staging.invalid', 'Staging Builder 47', '+91 98000 00047', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-47', 'https://linkedin.com/in/staging-builder-47', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-658768dfe9398e38', 'builder048@kairos-staging.invalid', 'Staging Builder 48', NULL, 'Sathyabama Institute of Science and Technology', 'STG-2027-048', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-48', 'https://linkedin.com/in/staging-builder-48', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-ce3571db5fad0948', 'builder049@kairos-staging.invalid', 'Staging Builder 49', '+91 98000 00049', 'Sathyabama Institute of Science and Technology', 'STG-2027-049', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-49', 'https://linkedin.com/in/staging-builder-49', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-cb599292595d1ebf', 'builder050@kairos-staging.invalid', 'Staging Builder 50', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-50', 'https://linkedin.com/in/staging-builder-50', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-542696203e5116f7', 'builder051@kairos-staging.invalid', 'Staging Builder 51', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-51', 'https://linkedin.com/in/staging-builder-51', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-176eb300ab73eb21', 'builder052@kairos-staging.invalid', 'Staging Builder 52', '+91 98000 00052', 'SIST Chennai', 'STG-2027-052', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-52', 'https://linkedin.com/in/staging-builder-52', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'false', NULL, NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-459660b3fde988c5', 'builder053@kairos-staging.invalid', 'Staging Builder 53', '+91 98000 00053', 'SIST Chennai', 'STG-2027-053', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-53', 'https://linkedin.com/in/staging-builder-53', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'false', NULL, NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6023da92008a4ba8', 'builder054@kairos-staging.invalid', 'Staging Builder 54', '+91 98000 00054', 'SIST Chennai', 'STG-2027-054', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-54', 'https://linkedin.com/in/staging-builder-54', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'false', NULL, NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-fd57ee80d93be269', 'builder055@kairos-staging.invalid', 'Staging Builder 55', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-55', 'https://linkedin.com/in/staging-builder-55', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-9c7fed66fbe8f17e', 'builder056@kairos-staging.invalid', 'Staging Builder 56', '+91 98000 00056', 'Sathyabama Institute of Science and Technology', 'STG-2027-056', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-56', 'https://linkedin.com/in/staging-builder-56', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-03b35c7a6dd26a01', 'builder057@kairos-staging.invalid', 'Staging Builder 57', '+91 98000 00057', 'Sathyabama Institute of Science and Technology', 'STG-2027-057', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-57', 'https://linkedin.com/in/staging-builder-57', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-ed6739134ea9fe81', 'builder058@kairos-staging.invalid', 'Staging Builder 58', '+91 98000 00058', 'Sathyabama Institute of Science and Technology', 'STG-2027-058', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-58', 'https://linkedin.com/in/staging-builder-58', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-0835a52218af42e0', 'builder059@kairos-staging.invalid', 'Staging Builder 59', '+91 98000 00059', 'Sathyabama Institute of Science and Technology', 'STG-2027-059', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-59', 'https://linkedin.com/in/staging-builder-59', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-e5e4578b866b0e70', 'builder060@kairos-staging.invalid', 'Staging Builder 60', '+91 98000 00060', 'Sathyabama Institute of Science and Technology', 'STG-2027-060', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-60', 'https://linkedin.com/in/staging-builder-60', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-08a3ffd7726bc890', 'builder061@kairos-staging.invalid', 'Staging Builder 61', '+91 98000 00061', 'SIST', NULL, '3rd Year', 'School of Computing', NULL, 'https://github.com/staging-builder-61', 'https://linkedin.com/in/staging-builder-61', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-4710c1266247d631', 'builder062@kairos-staging.invalid', 'Staging Builder 62', '+91 98000 00062', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-62', 'https://linkedin.com/in/staging-builder-62', NULL, NULL, 'false', NULL, 'XL', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-2191374f8a163340', 'builder063@kairos-staging.invalid', 'Staging Builder 63', NULL, 'Sathyabama Institute of Science and Technology', 'STG-2027-063', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-63', 'https://linkedin.com/in/staging-builder-63', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-f438ca5721e51ad5', 'builder064@kairos-staging.invalid', 'Staging Builder 64', '+91 98000 00064', 'Sathyabama Institute of Science and Technology', 'STG-2027-064', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-64', 'https://linkedin.com/in/staging-builder-64', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-66ae00447538c8d7', 'builder065@kairos-staging.invalid', 'Staging Builder 65', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-65', 'https://linkedin.com/in/staging-builder-65', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-7c04eeb3ce39ab9e', 'builder066@kairos-staging.invalid', 'Staging Builder 66', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-66', 'https://linkedin.com/in/staging-builder-66', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-dc0f549cf50c34ba', 'builder067@kairos-staging.invalid', 'Staging Builder 67', '+91 98000 00067', 'SIST Chennai', 'STG-2027-067', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-67', 'https://linkedin.com/in/staging-builder-67', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'false', NULL, NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6e97d5937ab08e40', 'builder068@kairos-staging.invalid', 'Staging Builder 68', '+91 98000 00068', 'Sathyabama University', 'STG-2027-068', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-68', 'https://linkedin.com/in/staging-builder-68', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-a8aa67a16c5fd45e', 'builder069@kairos-staging.invalid', 'Staging Builder 69', '+91 98000 00069', 'SIST Chennai', 'STG-2027-069', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-69', 'https://linkedin.com/in/staging-builder-69', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3dfe02a2369910d0', 'builder070@kairos-staging.invalid', 'Staging Builder 70', '+91 98000 00070', 'Sathyabama University', 'STG-2027-070', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-70', 'https://linkedin.com/in/staging-builder-70', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-79271bdc47599875', 'builder071@kairos-staging.invalid', 'Staging Builder 71', '+91 98000 00071', 'SIST Chennai', 'STG-2027-071', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-71', 'https://linkedin.com/in/staging-builder-71', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-faab8e6532f668a2', 'builder072@kairos-staging.invalid', 'Staging Builder 72', '+91 98000 00072', 'Sathyabama University', 'STG-2027-072', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-72', 'https://linkedin.com/in/staging-builder-72', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-c5a97b3b2a731dbe', 'builder073@kairos-staging.invalid', 'Staging Builder 73', '+91 98000 00073', 'SIST Chennai', 'STG-2027-073', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-73', 'https://linkedin.com/in/staging-builder-73', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-25bb5d19be60f883', 'builder074@kairos-staging.invalid', 'Staging Builder 74', NULL, 'SIST Chennai', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-74', 'https://linkedin.com/in/staging-builder-74', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-4327eccdfb3dfffe', 'builder075@kairos-staging.invalid', 'Staging Builder 75', NULL, 'SIST Chennai', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-75', 'https://linkedin.com/in/staging-builder-75', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-072efd1d88ae06d1', 'builder076@kairos-staging.invalid', 'Staging Builder 76', '+91 98000 00076', 'SIST Chennai', 'STG-2027-076', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-76', 'https://linkedin.com/in/staging-builder-76', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-cbcaccd7e5390c87', 'builder077@kairos-staging.invalid', 'Staging Builder 77', '+91 98000 00077', 'SIST Chennai', 'STG-2027-077', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-77', 'https://linkedin.com/in/staging-builder-77', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-47f70046498e2b79', 'builder078@kairos-staging.invalid', 'Staging Builder 78', '+91 98000 00078', 'SIST Chennai', 'STG-2027-078', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-78', 'https://linkedin.com/in/staging-builder-78', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-459f6b7990d5ed32', 'builder079@kairos-staging.invalid', 'Staging Builder 79', '+91 98000 00079', 'SIST Chennai', 'STG-2027-079', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-79', 'https://linkedin.com/in/staging-builder-79', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'true', '2026-11-13T18:27:39.266Z', NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-d05d9bcf147fbb13', 'builder080@kairos-staging.invalid', 'Staging Builder 80', '+91 98000 00080', 'SIST Chennai', 'STG-2027-080', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-80', 'https://linkedin.com/in/staging-builder-80', NULL, NULL, 'false', NULL, 'L', NULL, 'eabbc9ae156d3c749334d921b6c43403:fb8410e0b3234706a125426001bfbc85d785a6dc99d99969633ab96f3bd06727aaa93244f45e759c1337d6f7679fd61badf7581db4eae3ec2db8d533d0fb5337', 'false', NULL, NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-a1689c6a488b3a86', 'waitlist001@kairos-staging.invalid', 'Staging Candidate 1', '+91 98000 00081', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-81', 'https://linkedin.com/in/staging-builder-81', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-177fe7f295399e6c', 'waitlist002@kairos-staging.invalid', 'Staging Candidate 2', '+91 98000 00082', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-82', 'https://linkedin.com/in/staging-builder-82', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.266Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-4864048e467edb1e', 'waitlist003@kairos-staging.invalid', 'Staging Candidate 3', '+91 98000 00083', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-83', 'https://linkedin.com/in/staging-builder-83', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3e01859de3bf7437', 'waitlist004@kairos-staging.invalid', 'Staging Candidate 4', '+91 98000 00084', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-84', 'https://linkedin.com/in/staging-builder-84', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-66626426c9f8f236', 'waitlist005@kairos-staging.invalid', 'Staging Candidate 5', '+91 98000 00085', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-85', 'https://linkedin.com/in/staging-builder-85', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-ccb256d6f38056aa', 'waitlist006@kairos-staging.invalid', 'Staging Candidate 6', '+91 98000 00086', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-86', 'https://linkedin.com/in/staging-builder-86', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-832aca14c77fb4be', 'waitlist007@kairos-staging.invalid', 'Staging Candidate 7', '+91 98000 00087', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-87', 'https://linkedin.com/in/staging-builder-87', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-18b57c64f418d16a', 'waitlist008@kairos-staging.invalid', 'Staging Candidate 8', '+91 98000 00088', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-88', 'https://linkedin.com/in/staging-builder-88', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6b10f1edc578870f', 'waitlist009@kairos-staging.invalid', 'Staging Candidate 9', '+91 98000 00089', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-89', 'https://linkedin.com/in/staging-builder-89', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-2f6f9183289b2e59', 'waitlist010@kairos-staging.invalid', 'Staging Candidate 10', '+91 98000 00090', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-90', 'https://linkedin.com/in/staging-builder-90', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-d2bfb867c2a076cf', 'waitlist011@kairos-staging.invalid', 'Staging Candidate 11', '+91 98000 00091', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-91', 'https://linkedin.com/in/staging-builder-91', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-ca463599c27aaab9', 'waitlist012@kairos-staging.invalid', 'Staging Candidate 12', '+91 98000 00092', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-92', 'https://linkedin.com/in/staging-builder-92', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-8f4b22526685250a', 'waitlist013@kairos-staging.invalid', 'Staging Candidate 13', '+91 98000 00093', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-93', 'https://linkedin.com/in/staging-builder-93', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-55a8aaad14c30bee', 'waitlist014@kairos-staging.invalid', 'Staging Candidate 14', '+91 98000 00094', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-94', 'https://linkedin.com/in/staging-builder-94', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-94c8e34bd87a5903', 'waitlist015@kairos-staging.invalid', 'Staging Candidate 15', '+91 98000 00095', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-95', 'https://linkedin.com/in/staging-builder-95', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-d25e00ece91b4cba', 'waitlist016@kairos-staging.invalid', 'Staging Candidate 16', '+91 98000 00096', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-96', 'https://linkedin.com/in/staging-builder-96', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-450313647ea5c0fd', 'waitlist017@kairos-staging.invalid', 'Staging Candidate 17', '+91 98000 00097', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-97', 'https://linkedin.com/in/staging-builder-97', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3e0fe460e5268c45', 'waitlist018@kairos-staging.invalid', 'Staging Candidate 18', '+91 98000 00098', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-98', 'https://linkedin.com/in/staging-builder-98', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-2653eddd568b3813', 'waitlist019@kairos-staging.invalid', 'Staging Candidate 19', '+91 98000 00099', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-99', 'https://linkedin.com/in/staging-builder-99', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-1423dcfe399fc1ea', 'waitlist020@kairos-staging.invalid', 'Staging Candidate 20', '+91 98000 00100', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-100', 'https://linkedin.com/in/staging-builder-100', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-4192a4d77b03b6af', 'waitlist021@kairos-staging.invalid', 'Staging Candidate 21', '+91 98000 00101', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-101', 'https://linkedin.com/in/staging-builder-101', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-af7c3d8e4998af19', 'waitlist022@kairos-staging.invalid', 'Staging Candidate 22', '+91 98000 00102', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-102', 'https://linkedin.com/in/staging-builder-102', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6ae9d4213a1ac60a', 'waitlist023@kairos-staging.invalid', 'Staging Candidate 23', '+91 98000 00103', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-103', 'https://linkedin.com/in/staging-builder-103', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-10261e8bb63e7fb5', 'waitlist024@kairos-staging.invalid', 'Staging Candidate 24', '+91 98000 00104', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-104', 'https://linkedin.com/in/staging-builder-104', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-854417cdf94cdea0', 'waitlist025@kairos-staging.invalid', 'Staging Candidate 25', '+91 98000 00105', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-105', 'https://linkedin.com/in/staging-builder-105', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-0e3f82683ef85e2c', 'waitlist026@kairos-staging.invalid', 'Staging Candidate 26', '+91 98000 00106', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-106', 'https://linkedin.com/in/staging-builder-106', NULL, NULL, 'false', NULL, 'XL', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-733b16445b883fca', 'waitlist027@kairos-staging.invalid', 'Staging Candidate 27', '+91 98000 00107', 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-107', 'https://linkedin.com/in/staging-builder-107', NULL, NULL, 'false', NULL, 'XL', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-a6009d0a0068d12d', 'waitlist028@kairos-staging.invalid', 'Staging Candidate 28', NULL, 'IIT Madras', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-108', 'https://linkedin.com/in/staging-builder-108', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-7e50904bf59f9d3e', 'waitlist029@kairos-staging.invalid', 'Staging Candidate 29', '+91 98000 00109', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-109', 'https://linkedin.com/in/staging-builder-109', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-5dfca36df6692d92', 'waitlist030@kairos-staging.invalid', 'Staging Candidate 30', '+91 98000 00110', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-110', 'https://linkedin.com/in/staging-builder-110', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-42110fe75e7fce4e', 'waitlist031@kairos-staging.invalid', 'Staging Candidate 31', '+91 98000 00111', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-111', 'https://linkedin.com/in/staging-builder-111', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-e3d49f529e37b7c1', 'waitlist032@kairos-staging.invalid', 'Staging Candidate 32', '+91 98000 00112', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-112', 'https://linkedin.com/in/staging-builder-112', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-7522cde56930e815', 'waitlist033@kairos-staging.invalid', 'Staging Candidate 33', '+91 98000 00113', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-113', 'https://linkedin.com/in/staging-builder-113', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6b385555d3b3dcbc', 'waitlist034@kairos-staging.invalid', 'Staging Candidate 34', '+91 98000 00114', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-114', 'https://linkedin.com/in/staging-builder-114', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-d0365ddf9c1947ae', 'waitlist035@kairos-staging.invalid', 'Staging Candidate 35', '+91 98000 00115', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-115', 'https://linkedin.com/in/staging-builder-115', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-16dfa57598dc22b1', 'waitlist036@kairos-staging.invalid', 'Staging Candidate 36', '+91 98000 00116', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-116', 'https://linkedin.com/in/staging-builder-116', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-8c33bfe06f7e9cf5', 'waitlist037@kairos-staging.invalid', 'Staging Candidate 37', '+91 98000 00117', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-117', 'https://linkedin.com/in/staging-builder-117', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-d98661a72734a0ae', 'waitlist038@kairos-staging.invalid', 'Staging Candidate 38', '+91 98000 00118', 'Burst Tech', NULL, '3rd Year', 'Computer Science & Engineering', NULL, 'https://github.com/staging-builder-118', 'https://linkedin.com/in/staging-builder-118', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-8ce43f1970dcf530', 'builder081@kairos-staging.invalid', 'Staging Builder 81', NULL, 'SIST', 'STG-2027-119', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-119', 'https://linkedin.com/in/staging-builder-119', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-b1272894f11b4b9c', 'builder082@kairos-staging.invalid', 'Staging Builder 82', NULL, 'SIST', 'STG-2027-120', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-120', 'https://linkedin.com/in/staging-builder-120', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-256ee4ff8d4747df', 'builder083@kairos-staging.invalid', 'Staging Builder 83', NULL, 'SIST', 'STG-2027-121', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-121', 'https://linkedin.com/in/staging-builder-121', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-e726b5358149d78c', 'builder084@kairos-staging.invalid', 'Staging Builder 84', NULL, 'SIST', 'STG-2027-122', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-122', 'https://linkedin.com/in/staging-builder-122', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-6da7be3f7ffc61c7', 'builder085@kairos-staging.invalid', 'Staging Builder 85', NULL, 'SIST', 'STG-2027-123', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-123', 'https://linkedin.com/in/staging-builder-123', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-147002461b499379', 'builder086@kairos-staging.invalid', 'Staging Builder 86', NULL, 'SIST', 'STG-2027-124', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-124', 'https://linkedin.com/in/staging-builder-124', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-c079721cd05117ba', 'builder087@kairos-staging.invalid', 'Staging Builder 87', NULL, 'SIST', 'STG-2027-125', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-125', 'https://linkedin.com/in/staging-builder-125', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-5f72f7797e0f2026', 'builder088@kairos-staging.invalid', 'Staging Builder 88', NULL, 'SIST', 'STG-2027-126', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-126', 'https://linkedin.com/in/staging-builder-126', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-73e710208be80236', 'builder089@kairos-staging.invalid', 'Staging Builder 89', NULL, 'SIST', 'STG-2027-127', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-127', 'https://linkedin.com/in/staging-builder-127', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-cf9e27529a974a83', 'builder090@kairos-staging.invalid', 'Staging Builder 90', NULL, 'SIST', 'STG-2027-128', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-128', 'https://linkedin.com/in/staging-builder-128', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-9eff24a16aae71b0', 'builder091@kairos-staging.invalid', 'Staging Builder 91', NULL, 'SIST', 'STG-2027-129', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-129', 'https://linkedin.com/in/staging-builder-129', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-46fdfcae0c1a6c4a', 'builder092@kairos-staging.invalid', 'Staging Builder 92', NULL, 'SIST', 'STG-2027-130', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-130', 'https://linkedin.com/in/staging-builder-130', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-5d11bc44b4adcdbe', 'builder093@kairos-staging.invalid', 'Staging Builder 93', NULL, 'SIST', 'STG-2027-131', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-131', 'https://linkedin.com/in/staging-builder-131', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-8006d47dc0ef5a4e', 'builder094@kairos-staging.invalid', 'Staging Builder 94', NULL, 'SIST', 'STG-2027-132', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-132', 'https://linkedin.com/in/staging-builder-132', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.267Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-e2f356238b4a86b7', 'builder095@kairos-staging.invalid', 'Staging Builder 95', NULL, 'SIST', 'STG-2027-133', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-133', 'https://linkedin.com/in/staging-builder-133', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-b9747732a91d2689', 'builder096@kairos-staging.invalid', 'Staging Builder 96', NULL, 'SIST', 'STG-2027-134', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-134', 'https://linkedin.com/in/staging-builder-134', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-56507b14d6b2e191', 'builder097@kairos-staging.invalid', 'Staging Builder 97', NULL, 'SIST', 'STG-2027-135', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-135', 'https://linkedin.com/in/staging-builder-135', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-f8be44dfc02c2468', 'builder098@kairos-staging.invalid', 'Staging Builder 98', '+91 98000 00136', 'SIST', 'STG-2027-136', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-136', 'https://linkedin.com/in/staging-builder-136', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-793d374fb59fb411', 'builder099@kairos-staging.invalid', 'Staging Builder 99', '+91 98000 00137', 'SIST', 'STG-2027-137', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-137', 'https://linkedin.com/in/staging-builder-137', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-3b5927f01aece581', 'builder100@kairos-staging.invalid', 'Staging Builder 100', '+91 98000 00138', 'SIST', 'STG-2027-138', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-138', 'https://linkedin.com/in/staging-builder-138', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-d110ac8635cbf52f', 'builder101@kairos-staging.invalid', 'Staging Builder 101', NULL, 'SIST', 'STG-2027-139', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-139', 'https://linkedin.com/in/staging-builder-139', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-be34720ca4e6d1bd', 'builder102@kairos-staging.invalid', 'Staging Builder 102', NULL, 'SIST', 'STG-2027-140', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-140', 'https://linkedin.com/in/staging-builder-140', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-2caa6d96d7cf1cf2', 'builder103@kairos-staging.invalid', 'Staging Builder 103', NULL, 'SIST', 'STG-2027-141', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-141', 'https://linkedin.com/in/staging-builder-141', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-59405f9760bae5d2', 'builder104@kairos-staging.invalid', 'Staging Builder 104', '+91 98000 00142', 'SIST', 'STG-2027-142', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-142', 'https://linkedin.com/in/staging-builder-142', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-f1751260630934ab', 'builder105@kairos-staging.invalid', 'Staging Builder 105', '+91 98000 00143', 'SIST', 'STG-2027-143', '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-143', 'https://linkedin.com/in/staging-builder-143', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());
INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES ('prof-4114f0c4d7f673b6', 'builder106@kairos-staging.invalid', 'Staging Builder 106', NULL, 'Sathyabama Institute of Science and Technology', NULL, '3rd Year', 'Computer Science and Engineering', NULL, 'https://github.com/staging-builder-144', 'https://linkedin.com/in/staging-builder-144', NULL, NULL, 'false', NULL, 'L', NULL, NULL, 'false', NULL, NULL, '2026-11-13T18:27:39.268Z')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());

-- 2. SANITIZED WAITLIST
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486032261-iww1s', 'prof-a1689c6a488b3a86', 'Staging Candidate 1', 'waitlist001@kairos-staging.invalid', '+91 98000 00081', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:32.261Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486032114-kajhq', 'prof-177fe7f295399e6c', 'Staging Candidate 2', 'waitlist002@kairos-staging.invalid', '+91 98000 00082', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:32.114Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486031968-ijuut', 'prof-4864048e467edb1e', 'Staging Candidate 3', 'waitlist003@kairos-staging.invalid', '+91 98000 00083', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:31.968Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486031777-1pox9', 'prof-3e01859de3bf7437', 'Staging Candidate 4', 'waitlist004@kairos-staging.invalid', '+91 98000 00084', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:31.777Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486031612-v4fls', 'prof-66626426c9f8f236', 'Staging Candidate 5', 'waitlist005@kairos-staging.invalid', '+91 98000 00085', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:31.612Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486031436-684nj', 'prof-ccb256d6f38056aa', 'Staging Candidate 6', 'waitlist006@kairos-staging.invalid', '+91 98000 00086', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:31.436Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486031243-rdi0f', 'prof-832aca14c77fb4be', 'Staging Candidate 7', 'waitlist007@kairos-staging.invalid', '+91 98000 00087', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:31.243Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486031033-ahcmp', 'prof-18b57c64f418d16a', 'Staging Candidate 8', 'waitlist008@kairos-staging.invalid', '+91 98000 00088', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:31.033Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486030809-m417h', 'prof-6b10f1edc578870f', 'Staging Candidate 9', 'waitlist009@kairos-staging.invalid', '+91 98000 00089', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:30.809Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486030614-0mqom', 'prof-2f6f9183289b2e59', 'Staging Candidate 10', 'waitlist010@kairos-staging.invalid', '+91 98000 00090', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:20:30.614Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485928475-ccbhp', 'prof-d2bfb867c2a076cf', 'Staging Candidate 11', 'waitlist011@kairos-staging.invalid', '+91 98000 00091', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:48.475Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485928225-dqsp5', 'prof-ca463599c27aaab9', 'Staging Candidate 12', 'waitlist012@kairos-staging.invalid', '+91 98000 00092', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:48.225Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485928001-ehuv6', 'prof-8f4b22526685250a', 'Staging Candidate 13', 'waitlist013@kairos-staging.invalid', '+91 98000 00093', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:48.001Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485927862-6uwvo', 'prof-55a8aaad14c30bee', 'Staging Candidate 14', 'waitlist014@kairos-staging.invalid', '+91 98000 00094', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:47.862Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485927701-6f1y1', 'prof-94c8e34bd87a5903', 'Staging Candidate 15', 'waitlist015@kairos-staging.invalid', '+91 98000 00095', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:47.701Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485927528-noh57', 'prof-d25e00ece91b4cba', 'Staging Candidate 16', 'waitlist016@kairos-staging.invalid', '+91 98000 00096', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:47.528Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485927230-0l6ia', 'prof-450313647ea5c0fd', 'Staging Candidate 17', 'waitlist017@kairos-staging.invalid', '+91 98000 00097', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:47.230Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485927052-6ccqz', 'prof-3e0fe460e5268c45', 'Staging Candidate 18', 'waitlist018@kairos-staging.invalid', '+91 98000 00098', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:47.052Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485926866-m53a9', 'prof-2653eddd568b3813', 'Staging Candidate 19', 'waitlist019@kairos-staging.invalid', '+91 98000 00099', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:46.866Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485926707-2fxs1', 'prof-1423dcfe399fc1ea', 'Staging Candidate 20', 'waitlist020@kairos-staging.invalid', '+91 98000 00100', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:46.707Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485926499-rhlcl', 'prof-4192a4d77b03b6af', 'Staging Candidate 21', 'waitlist021@kairos-staging.invalid', '+91 98000 00101', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:46.499Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485926313-9azpn', 'prof-af7c3d8e4998af19', 'Staging Candidate 22', 'waitlist022@kairos-staging.invalid', '+91 98000 00102', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:46.313Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485926135-e2l40', 'prof-6ae9d4213a1ac60a', 'Staging Candidate 23', 'waitlist023@kairos-staging.invalid', '+91 98000 00103', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:46.135Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485925985-xnseq', 'prof-10261e8bb63e7fb5', 'Staging Candidate 24', 'waitlist024@kairos-staging.invalid', '+91 98000 00104', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:45.985Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485925828-l6qh1', 'prof-854417cdf94cdea0', 'Staging Candidate 25', 'waitlist025@kairos-staging.invalid', '+91 98000 00105', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:18:45.828Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485877734-9d8jz', 'prof-faab8e6532f668a2', 'Staging Builder 72', 'builder072@kairos-staging.invalid', '+91 98000 00072', 'Sathyabama University', '3rd Year', 'Computer Science and Engineering', 'Agentic AI & Autonomous Systems', 'pending', '2026-11-12T12:17:57.734Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485851201-fuz0e', 'prof-3dfe02a2369910d0', 'Staging Builder 70', 'builder070@kairos-staging.invalid', '+91 98000 00070', 'Sathyabama University', '3rd Year', 'Computer Science and Engineering', 'Agentic AI & Autonomous Systems', 'pending', '2026-11-12T12:17:31.202Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485762242-jwtaq', 'prof-6e97d5937ab08e40', 'Staging Builder 68', 'builder068@kairos-staging.invalid', '+91 98000 00068', 'Sathyabama University', '3rd Year', 'Computer Science and Engineering', 'Agentic AI & Autonomous Systems', 'pending', '2026-11-12T12:16:02.242Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485410291-mf8sr', 'prof-4710c1266247d631', 'Staging Builder 62', 'builder062@kairos-staging.invalid', '+91 98000 00062', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T12:10:10.291Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794485368736-tmung', 'prof-08a3ffd7726bc890', 'Staging Builder 61', 'builder061@kairos-staging.invalid', '+91 98000 00061', 'SIST', '3rd Year', 'School of Computing', 'track-quantum', 'pending', '2026-11-12T12:09:28.736Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794483833587-7981c', 'prof-4fdffe8102ef7fc9', 'Staging Builder 47', 'builder047@kairos-staging.invalid', '+91 98000 00047', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T11:43:53.587Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794483814048-s8z1t', 'prof-6a1ba72b18affeab', 'Staging Builder 46', 'builder046@kairos-staging.invalid', '+91 98000 00046', 'SIST', '3rd Year', 'School of Computing', 'track-quantum', 'pending', '2026-11-12T11:43:34.048Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794482612902-jndtb', 'prof-0ef9234e445cc96b', 'Staging Builder 32', 'builder032@kairos-staging.invalid', '+91 98000 00032', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T11:23:32.902Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794482590185-4s5sd', 'prof-ef09afaabe2772ca', 'Staging Builder 31', 'builder031@kairos-staging.invalid', '+91 98000 00031', 'SIST', '3rd Year', 'School of Computing', 'track-quantum', 'pending', '2026-11-12T11:23:10.185Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794481652888-dqkxi', 'prof-c56021cd5c6e55fb', 'Staging Builder 20', 'builder020@kairos-staging.invalid', '+91 98000 00020', 'SIST', '3rd Year', 'School of Computing', 'track-quantum', 'pending', '2026-11-12T11:07:32.888Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794480960434-rc1gh', 'prof-3c661135315e61a5', 'Staging Builder 15', 'builder015@kairos-staging.invalid', '+91 98000 00015', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T10:56:00.434Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794480869903-9my84', 'prof-450a6cdace83804f', 'Staging Builder 14', 'builder014@kairos-staging.invalid', '+91 98000 00014', 'Sathyabama Institute of Science and Technology', '3rd Year', 'School of Computing - Advanced Cloud Lab', 'Agentic AI & Generative Workflows', 'PENDING', '2026-11-12T10:54:29.903Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794480850463-o8z46', 'prof-0e04e2c29deb6793', 'Staging Builder 10', 'builder010@kairos-staging.invalid', '+91 98000 00010', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T10:54:10.463Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794480730985-e3um4', 'prof-0e3f82683ef85e2c', 'Staging Candidate 26', 'waitlist026@kairos-staging.invalid', '+91 98000 00106', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T10:52:10.985Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794480668743-hl9j7', 'prof-733b16445b883fca', 'Staging Candidate 27', 'waitlist027@kairos-staging.invalid', '+91 98000 00107', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T10:51:08.743Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794480609788-81kp4', 'prof-656e37b22dd8f248', 'Staging Builder 7', 'builder007@kairos-staging.invalid', '+91 98000 00007', 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'track-cloud-native', 'pending', '2026-11-12T10:50:09.788Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794479985925-qbzk9', 'prof-79afbf9887984722', 'Staging Builder 6', 'builder006@kairos-staging.invalid', '+91 98000 00006', 'Sathyabama Institute of Science and Technology', '3rd Year', 'School of Computing - Advanced Cloud Lab', 'Agentic AI & Generative Workflows', 'PENDING', '2026-11-12T10:39:45.925Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('demo-w2', 'prof-4f5ec056ed16eb76', 'Staging Builder 4', 'builder004@kairos-staging.invalid', NULL, 'Sathyabama Institute of Science and Technology', '3rd Year', 'Computer Science and Engineering', 'Cloud-Native Distributed Systems', 'reviewed', '2026-10-24T14:30:00.000Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('demo-w1', 'prof-a6009d0a0068d12d', 'Staging Candidate 28', 'waitlist028@kairos-staging.invalid', NULL, 'IIT Madras', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Workflows', 'PENDING', '2026-10-24T10:15:00.000Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486082101-b410v', 'prof-7e50904bf59f9d3e', 'Staging Candidate 29', 'waitlist029@kairos-staging.invalid', '+91 98000 00109', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:22.101Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486082342-ocwyq', 'prof-5dfca36df6692d92', 'Staging Candidate 30', 'waitlist030@kairos-staging.invalid', '+91 98000 00110', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:22.342Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486082509-eut0h', 'prof-42110fe75e7fce4e', 'Staging Candidate 31', 'waitlist031@kairos-staging.invalid', '+91 98000 00111', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:22.509Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486082668-jpnq3', 'prof-e3d49f529e37b7c1', 'Staging Candidate 32', 'waitlist032@kairos-staging.invalid', '+91 98000 00112', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:22.668Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486082848-yuljg', 'prof-7522cde56930e815', 'Staging Candidate 33', 'waitlist033@kairos-staging.invalid', '+91 98000 00113', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:22.848Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486083011-felcs', 'prof-6b385555d3b3dcbc', 'Staging Candidate 34', 'waitlist034@kairos-staging.invalid', '+91 98000 00114', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:23.011Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486083772-ffeol', 'prof-d0365ddf9c1947ae', 'Staging Candidate 35', 'waitlist035@kairos-staging.invalid', '+91 98000 00115', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:23.772Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486083991-4g5h1', 'prof-16dfa57598dc22b1', 'Staging Candidate 36', 'waitlist036@kairos-staging.invalid', '+91 98000 00116', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:23.991Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486084184-c7tkt', 'prof-8c33bfe06f7e9cf5', 'Staging Candidate 37', 'waitlist037@kairos-staging.invalid', '+91 98000 00117', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:24.184Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;
INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES ('w-1794486084379-h5fb4', 'prof-d98661a72734a0ae', 'Staging Candidate 38', 'waitlist038@kairos-staging.invalid', '+91 98000 00118', 'Burst Tech', '3rd Year', 'Computer Science & Engineering', 'Agentic AI & Generative Intelligence', 'pending', '2026-11-12T12:21:24.379Z')
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;

-- 3. TEAMS & MEMBERS
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-k75-01', 'Chronos Distributed', 'KAIROS-T001', 'KAIROS-7721', 'AI', NULL, 'QUALIFIER', false, NULL, '2026-10-25T08:00:00.000Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m1', 'team-k75-01', 'prof-4f5ec056ed16eb76', 'Staging Builder 4', 'builder004@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m2', 'team-k75-01', 'prof-715418675ff78b8f', 'Staging Builder 3', 'builder003@kairos-staging.invalid', 'Backend', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m3', 'team-k75-01', 'prof-8ce43f1970dcf530', 'Staging Builder 81', 'builder081@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m4', 'team-k75-01', 'prof-b1272894f11b4b9c', 'Staging Builder 82', 'builder082@kairos-staging.invalid', 'UI/UX', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794480611914', 'NeuralMesh Alpha 1794480606458', 'KAIROS-T002', 'KAIROS-6752', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T10:50:11.914Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794480611914', 'team-1794480611914', 'prof-ab62f5a90d59527d', 'Staging Builder 8', 'builder008@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794480659586', 'Debug Squad 99', 'KAIROS-T003', 'KAIROS-6159', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T10:50:59.586Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794480659586', 'team-1794480659586', 'prof-256ee4ff8d4747df', 'Staging Builder 83', 'builder083@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480659678', 'team-1794480659586', 'prof-e726b5358149d78c', 'Staging Builder 84', 'builder084@kairos-staging.invalid', 'Backend', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794480733739', 'Karthik Solo Squad 1794480730596', 'KAIROS-T004', 'KAIROS-1041', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T10:52:13.739Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794480733739', 'team-1794480733739', 'prof-6da7be3f7ffc61c7', 'Staging Builder 85', 'builder085@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794480852617', 'NeuralMesh Alpha 1794480847598', 'KAIROS-T005', 'KAIROS-9289', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T10:54:12.617Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480853369', 'team-1794480852617', 'prof-e23efe0214591b78', 'Staging Builder 12', 'builder012@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480853671', 'team-1794480852617', 'prof-147002461b499379', 'Staging Builder 86', 'builder086@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480853737', 'team-1794480852617', 'prof-c079721cd05117ba', 'Staging Builder 87', 'builder087@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480853808', 'team-1794480852617', 'prof-5f72f7797e0f2026', 'Staging Builder 88', 'builder088@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794480855359', 'Karthik Solo Squad 1794480847598', 'KAIROS-T006', 'KAIROS-4410', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T10:54:15.359Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794480855359', 'team-1794480855359', 'prof-02f23bbef9caa9e0', 'Staging Builder 11', 'builder011@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.269Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794480963251', 'NeuralMesh Alpha 1794480958468', 'KAIROS-T007', 'KAIROS-7352', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T10:56:03.251Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480965607', 'team-1794480963251', 'prof-cdb341015f9376a6', 'Staging Builder 17', 'builder017@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480965993', 'team-1794480963251', 'prof-73e710208be80236', 'Staging Builder 89', 'builder089@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480966119', 'team-1794480963251', 'prof-cf9e27529a974a83', 'Staging Builder 90', 'builder090@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794480966223', 'team-1794480963251', 'prof-9eff24a16aae71b0', 'Staging Builder 91', 'builder091@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794480969400', 'Karthik Solo Squad 1794480958468', 'KAIROS-T008', 'KAIROS-8231', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T10:56:09.400Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794480969400', 'team-1794480969400', 'prof-ddf1e7258bfaec7c', 'Staging Builder 16', 'builder016@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794481651425', 'Titan Mesh 1794481647677', 'KAIROS-T009', 'KAIROS-7542', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:07:31.425Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794481651425', 'team-1794481651425', 'prof-59819c90d377c5e6', 'Staging Builder 18', 'builder018@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794481652050', 'team-1794481651425', 'prof-2b6f11772ceecd48', 'Staging Builder 19', 'builder019@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482550824', 'Neural Apex 1794482545766', 'KAIROS-T010', 'KAIROS-3159', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:22:30.824Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482550824', 'team-1794482550824', 'prof-dbfb4610a59a6fbd', 'Staging Builder 24', 'builder024@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482573041', 'Neural Apex 1794482569558', 'KAIROS-T011', 'KAIROS-7867', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T11:22:56.104Z', '2026-11-12T11:22:53.041Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482573041', 'team-1794482573041', 'prof-3e056a8312672c66', 'Staging Builder 26', 'builder026@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482575225', 'Disqualified Team 1794482569558', 'KAIROS-T012', 'KAIROS-4402', 'AI', NULL, 'DISQUALIFIED', false, NULL, '2026-11-12T11:22:55.225Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482575225', 'team-1794482575225', 'prof-5c1d20133de8d932', 'Staging Builder 27', 'builder027@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482578068', 'FI Test Team 1794482569558', 'KAIROS-T013', 'KAIROS-1425', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:22:58.068Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482578068', 'team-1794482578068', 'prof-6c8259f4e845301c', 'Staging Builder 28', 'builder028@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482588008', 'Titan Mesh 1794482584063', 'KAIROS-T014', 'KAIROS-3285', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:23:08.008Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482588008', 'team-1794482588008', 'prof-e0affc4d91f8e090', 'Staging Builder 29', 'builder029@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794482589171', 'team-1794482588008', 'prof-3896e404542ad86f', 'Staging Builder 30', 'builder030@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482615012', 'NeuralMesh Alpha 1794482611880', 'KAIROS-T015', 'KAIROS-1047', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:23:35.012Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794482616786', 'team-1794482615012', 'prof-3d6673c59b558922', 'Staging Builder 34', 'builder034@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794482617226', 'team-1794482615012', 'prof-46fdfcae0c1a6c4a', 'Staging Builder 92', 'builder092@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794482617321', 'team-1794482615012', 'prof-5d11bc44b4adcdbe', 'Staging Builder 93', 'builder093@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794482617413', 'team-1794482615012', 'prof-8006d47dc0ef5a4e', 'Staging Builder 94', 'builder094@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482620756', 'Karthik Solo Squad 1794482611880', 'KAIROS-T016', 'KAIROS-6842', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:23:40.756Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482620756', 'team-1794482620756', 'prof-fee0ccbfac5207c5', 'Staging Builder 33', 'builder033@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482723793', 'Neural Apex 1794482700408', 'KAIROS-T017', 'KAIROS-5029', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T11:25:29.823Z', '2026-11-12T11:25:23.793Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482723793', 'team-1794482723793', 'prof-9ef6efd984f0c3c7', 'Staging Builder 37', 'builder037@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482727062', 'Disqualified Team 1794482700408', 'KAIROS-T018', 'KAIROS-6395', 'AI', NULL, 'DISQUALIFIED', false, NULL, '2026-11-12T11:25:27.062Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482727062', 'team-1794482727062', 'prof-15ad5ff9eca02b8e', 'Staging Builder 38', 'builder038@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794482732545', 'FI Test Team 1794482700408', 'KAIROS-T019', 'KAIROS-5684', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:25:32.545Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794482732545', 'team-1794482732545', 'prof-6a299ef47f54a152', 'Staging Builder 39', 'builder039@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794483795022', 'Neural Apex 1794483786255', 'KAIROS-T020', 'KAIROS-6533', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T11:43:20.121Z', '2026-11-12T11:43:15.022Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794483795022', 'team-1794483795022', 'prof-68d9889536cbfa09', 'Staging Builder 41', 'builder041@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794483797762', 'Disqualified Team 1794483786255', 'KAIROS-T021', 'KAIROS-4520', 'AI', NULL, 'DISQUALIFIED', false, NULL, '2026-11-12T11:43:17.762Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794483797762', 'team-1794483797762', 'prof-70e03125a8370c09', 'Staging Builder 42', 'builder042@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794483803458', 'FI Test Team 1794483786255', 'KAIROS-T022', 'KAIROS-4973', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:43:23.458Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794483803458', 'team-1794483803458', 'prof-7cdadc7229ca3911', 'Staging Builder 43', 'builder043@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794483811434', 'Titan Mesh 1794483809177', 'KAIROS-T023', 'KAIROS-4866', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:43:31.434Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794483811434', 'team-1794483811434', 'prof-1dc0fc9067349dcd', 'Staging Builder 44', 'builder044@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794483812174', 'team-1794483811434', 'prof-302082cd97ee57a4', 'Staging Builder 45', 'builder045@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794483836074', 'NeuralMesh Alpha 1794483832299', 'KAIROS-T024', 'KAIROS-4661', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:43:56.074Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794483837441', 'team-1794483836074', 'prof-ce3571db5fad0948', 'Staging Builder 49', 'builder049@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794483837929', 'team-1794483836074', 'prof-e2f356238b4a86b7', 'Staging Builder 95', 'builder095@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794483838051', 'team-1794483836074', 'prof-b9747732a91d2689', 'Staging Builder 96', 'builder096@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794483838216', 'team-1794483836074', 'prof-56507b14d6b2e191', 'Staging Builder 97', 'builder097@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794483841653', 'Karthik Solo Squad 1794483832299', 'KAIROS-T025', 'KAIROS-1832', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T11:44:01.653Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794483841653', 'team-1794483841653', 'prof-658768dfe9398e38', 'Staging Builder 48', 'builder048@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485027877', 'Titan AI mwdi1tle', 'KAIROS-T026', 'KAIROS-9773', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:03:52.838Z', '2026-11-12T12:03:47.877Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485027877', 'team-1794485027877', 'prof-176eb300ab73eb21', 'Staging Builder 52', 'builder052@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485030895', 'team-1794485027877', 'prof-f8be44dfc02c2468', 'Staging Builder 98', 'builder098@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485260105', 'Titan AI mwdi6uqj', 'KAIROS-T027', 'KAIROS-9385', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:07:43.714Z', '2026-11-12T12:07:40.105Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485260105', 'team-1794485260105', 'prof-459660b3fde988c5', 'Staging Builder 53', 'builder053@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485261380', 'team-1794485260105', 'prof-793d374fb59fb411', 'Staging Builder 99', 'builder099@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485292413', 'Titan AI mwdi7knz', 'KAIROS-T028', 'KAIROS-4953', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:08:14.015Z', '2026-11-12T12:08:12.413Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485292413', 'team-1794485292413', 'prof-6023da92008a4ba8', 'Staging Builder 54', 'builder054@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485293499', 'team-1794485292413', 'prof-3b5927f01aece581', 'Staging Builder 100', 'builder100@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485332153', 'Neural Apex 1794485321265', 'KAIROS-T029', 'KAIROS-2652', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:09:00.113Z', '2026-11-12T12:08:52.153Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485332153', 'team-1794485332153', 'prof-9c7fed66fbe8f17e', 'Staging Builder 56', 'builder056@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485337016', 'Disqualified Team 1794485321265', 'KAIROS-T030', 'KAIROS-3863', 'AI', NULL, 'DISQUALIFIED', false, NULL, '2026-11-12T12:08:57.016Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485337016', 'team-1794485337016', 'prof-03b35c7a6dd26a01', 'Staging Builder 57', 'builder057@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485348064', 'FI Test Team 1794485321265', 'KAIROS-T031', 'KAIROS-7461', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:09:08.064Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485348064', 'team-1794485348064', 'prof-ed6739134ea9fe81', 'Staging Builder 58', 'builder058@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485365032', 'Titan Mesh 1794485361490', 'KAIROS-T032', 'KAIROS-2893', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:09:25.032Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485365032', 'team-1794485365032', 'prof-0835a52218af42e0', 'Staging Builder 59', 'builder059@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485366043', 'team-1794485365032', 'prof-e5e4578b866b0e70', 'Staging Builder 60', 'builder060@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485412819', 'NeuralMesh Alpha 1794485408809', 'KAIROS-T033', 'KAIROS-3704', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:10:12.819Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485414961', 'team-1794485412819', 'prof-f438ca5721e51ad5', 'Staging Builder 64', 'builder064@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485415590', 'team-1794485412819', 'prof-d110ac8635cbf52f', 'Staging Builder 101', 'builder101@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485415735', 'team-1794485412819', 'prof-be34720ca4e6d1bd', 'Staging Builder 102', 'builder102@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485415869', 'team-1794485412819', 'prof-2caa6d96d7cf1cf2', 'Staging Builder 103', 'builder103@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485420684', 'Karthik Solo Squad 1794485408809', 'KAIROS-T034', 'KAIROS-6143', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:10:20.684Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485420684', 'team-1794485420684', 'prof-2191374f8a163340', 'Staging Builder 63', 'builder063@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485512012', 'Titan AI mwdic9oe', 'KAIROS-T035', 'KAIROS-1637', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:11:58.678Z', '2026-11-12T12:11:52.012Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485512012', 'team-1794485512012', 'prof-dc0f549cf50c34ba', 'Staging Builder 67', 'builder067@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485514721', 'team-1794485512012', 'prof-59405f9760bae5d2', 'Staging Builder 104', 'builder104@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485766399', 'Apex Autonomous Swarm mwdihko2', 'KAIROS-T036', 'KAIROS-9501', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:16:21.726Z', '2026-11-12T12:16:06.399Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485766399', 'team-1794485766399', 'prof-6e97d5937ab08e40', 'Staging Builder 68', 'builder068@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485769316', 'team-1794485766399', 'prof-a8aa67a16c5fd45e', 'Staging Builder 69', 'builder069@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485853210', 'Apex Autonomous Swarm mwdijj7i', 'KAIROS-T037', 'KAIROS-1273', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:17:37.851Z', '2026-11-12T12:17:33.210Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485853210', 'team-1794485853210', 'prof-3dfe02a2369910d0', 'Staging Builder 70', 'builder070@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485855277', 'team-1794485853210', 'prof-79271bdc47599875', 'Staging Builder 71', 'builder071@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794485878759', 'Apex Autonomous Swarm mwdik4hz', 'KAIROS-T038', 'KAIROS-9492', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:18:03.837Z', '2026-11-12T12:17:58.759Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794485878759', 'team-1794485878759', 'prof-faab8e6532f668a2', 'Staging Builder 72', 'builder072@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794485880163', 'team-1794485878759', 'prof-c5a97b3b2a731dbe', 'Staging Builder 73', 'builder073@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794486015544', 'Victim Fortress mwdin1vf', 'KAIROS-T039', 'KAIROS-4313', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:20:15.544Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794486015544', 'team-1794486015544', 'prof-cbcaccd7e5390c87', 'Staging Builder 77', 'builder077@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794486015693', 'Attacker Squad mwdin1vf', 'KAIROS-T040', 'KAIROS-8139', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:20:15.693Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794486015693', 'team-1794486015693', 'prof-072efd1d88ae06d1', 'Staging Builder 76', 'builder076@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794486078991', 'Victim Fortress mwdioehv', 'KAIROS-T041', 'KAIROS-9795', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:21:18.991Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794486078991', 'team-1794486078991', 'prof-459f6b7990d5ed32', 'Staging Builder 79', 'builder079@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794486079164', 'Attacker Squad mwdioehv', 'KAIROS-T042', 'KAIROS-3713', 'AI', NULL, 'ROUND_0_APPLICANT', false, NULL, '2026-11-12T12:21:19.164Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794486079164', 'team-1794486079164', 'prof-47f70046498e2b79', 'Staging Builder 78', 'builder078@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES ('team-1794486332890', 'Titan AI mwditu9t', 'KAIROS-T043', 'KAIROS-8658', 'AI', NULL, 'ON_CAMPUS_QUALIFIED', true, '2026-11-12T12:25:36.645Z', '2026-11-12T12:25:32.890Z')
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-lead-1794486332890', 'team-1794486332890', 'prof-d05d9bcf147fbb13', 'Staging Builder 80', 'builder080@kairos-staging.invalid', 'Leader', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES ('m-1794486334193', 'team-1794486332890', 'prof-f1751260630934ab', 'Staging Builder 105', 'builder105@kairos-staging.invalid', 'AI / Cloud', '2026-11-13T18:27:39.270Z')
ON CONFLICT (id) DO NOTHING;

-- 4. SANITIZED JUDGES (SALTED PBKDF2 HASHED PINS)
INSERT INTO public.judges (id, access_pin, full_name, organization, designation, track_specialization, assigned_hall, is_active, created_at)
VALUES ('judge-1', '3fe559c8386bc84b4492f0a7e5dd4934:77c1f1578c51d998bf7d2e63451968d223eebcb5117bbef59b77f8473089df4422e2b18f8a0679e3db9d5a5d460285ecdc8d98492e7fa6793ce78f16ee0ce265', 'Staging Judge 1', 'Staging Entity 1', 'Senior Technical Jury', 'Agentic AI & Cloud-Native', 'Indoor Auditorium - Main Stage', 'true', NULL)
ON CONFLICT (id) DO UPDATE SET access_pin = EXCLUDED.access_pin;
INSERT INTO public.judges (id, access_pin, full_name, organization, designation, track_specialization, assigned_hall, is_active, created_at)
VALUES ('judge-2', '4e1d8d663b0b1acae664df5c7c5d3d68:87f46b11ece971888b7c5deb4758831bfb7be9289b89912033cafe9ec5094bbba37d882b37c2d0b119ae3b2671f0a21be38572026e4d653390bc1b278f7d74a8', 'Staging Judge 2', 'Staging Entity 2', 'Senior Technical Jury', 'FinTech & Open Innovation', 'Indoor Auditorium - Bay 1', 'true', NULL)
ON CONFLICT (id) DO UPDATE SET access_pin = EXCLUDED.access_pin;
INSERT INTO public.judges (id, access_pin, full_name, organization, designation, track_specialization, assigned_hall, is_active, created_at)
VALUES ('judge-3', '331445b91558277a41ca58301fdf461e:0faae7d33a1251fbd612d3c12b16c4ab2bca0a605dc456d6bfd826fb7bdf8202b8d4778a88a25d0a3096d6e30c8ae6f33a58f3e37a638b2188adfde5807e28bb', 'Staging Judge 3', 'Staging Entity 3', 'Senior Technical Jury', 'Distributed Systems & Edge IoT', 'Indoor Auditorium - Bay 2', 'true', NULL)
ON CONFLICT (id) DO UPDATE SET access_pin = EXCLUDED.access_pin;

-- 5. EVALUATIONS
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485308731-qs9b', 'team-k75-01', 'judge-1', '1', '29', '25', '24', '18', '96', '1', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:08:28.731Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485308961-yzze', 'team-1794480611914', 'judge-1', '1', '24', '21', '20', '16', '81', '-1', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:08:28.961Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485309118-wle7', 'team-1794480733739', 'judge-2', '1', '27', '23', '22', '17', '89', '0', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:08:29.118Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485309307-vc5o', 'team-1794480659586', 'judge-3', '1', '26', '22', '21', '16', '85', '0', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:08:29.307Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485371269-wcw4', 'team-1794485365032', 'judge-1', '1', '26', '23', '22', '18', '89', '0.0544', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:09:31.269Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485486851-ail6', 'team-k75-01', 'judge-1', '2', '28', '22', '23', '18', '91', '0.3239', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:11:26.851Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485856772-g26o', 'team-1794485853210', 'judge-1', '1', '29', '24', '24', '19', '96', '0.9755', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:17:36.772Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;
INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES ('eval-1794485881252-38y1', 'team-1794485878759', 'judge-1', '1', '29', '24', '24', '19', '96', '0.8273', 'Sanitized staging evaluation feedback.', 'false', '2026-11-12T12:18:01.252Z')
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;

-- 6. FEATURE FLAGS
INSERT INTO public.feature_flags (id, registration_open, waitlist_mode, submissions_open, results_announced, updated_at)
VALUES ('default_flags', true, false, true, false, timezone('utc'::text, now()))
ON CONFLICT (id) DO UPDATE SET registration_open = EXCLUDED.registration_open;

-- 7. SANITIZED NOTIFICATION LOGS
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337826-g5gd8', 'builder105@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder105@kairos-staging.invalid', 'ses-sim-1794486337825-f35zcm', '2026-11-12T12:25:37.827Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337823-l38u1', 'builder080@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder080@kairos-staging.invalid', 'ses-sim-1794486337822-25wd08', '2026-11-12T12:25:37.823Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337821-qgvfj', 'builder078@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder078@kairos-staging.invalid', 'ses-sim-1794486337820-07gu01', '2026-11-12T12:25:37.821Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337817-6xlkr', 'builder079@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder079@kairos-staging.invalid', 'ses-sim-1794486337816-d3bsgp', '2026-11-12T12:25:37.817Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337796-7i2dg', 'builder076@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder076@kairos-staging.invalid', 'ses-sim-1794486337795-hp0981', '2026-11-12T12:25:37.796Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337794-80qzr', 'builder077@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder077@kairos-staging.invalid', 'ses-sim-1794486337793-6xa9em', '2026-11-12T12:25:37.794Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337790-gmmqt', 'builder073@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder073@kairos-staging.invalid', 'ses-sim-1794486337789-dgdjpp', '2026-11-12T12:25:37.790Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337788-v1x5p', 'builder072@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder072@kairos-staging.invalid', 'ses-sim-1794486337787-x9qtej', '2026-11-12T12:25:37.788Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337785-7h7fu', 'builder071@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder071@kairos-staging.invalid', 'ses-sim-1794486337785-yztlcs', '2026-11-12T12:25:37.785Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337783-gccd9', 'builder070@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder070@kairos-staging.invalid', 'ses-sim-1794486337782-qimvch', '2026-11-12T12:25:37.784Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337780-kk4yp', 'builder069@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder069@kairos-staging.invalid', 'ses-sim-1794486337780-jkn5ik', '2026-11-12T12:25:37.780Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337779-0ok9h', 'builder068@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder068@kairos-staging.invalid', 'ses-sim-1794486337778-3a9xwp', '2026-11-12T12:25:37.779Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337776-zjjqd', 'builder104@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder104@kairos-staging.invalid', 'ses-sim-1794486337775-xxtiav', '2026-11-12T12:25:37.776Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337773-5fp1g', 'builder067@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder067@kairos-staging.invalid', 'ses-sim-1794486337772-hleimu', '2026-11-12T12:25:37.773Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337758-x2g6y', 'builder063@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder063@kairos-staging.invalid', 'ses-sim-1794486337757-9og3cw', '2026-11-12T12:25:37.758Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337755-x3fg2', 'builder103@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder103@kairos-staging.invalid', 'ses-sim-1794486337754-p2gy0v', '2026-11-12T12:25:37.755Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337754-xzim0', 'builder102@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder102@kairos-staging.invalid', 'ses-sim-1794486337753-1fzvys', '2026-11-12T12:25:37.754Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337752-7q1pr', 'builder101@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder101@kairos-staging.invalid', 'ses-sim-1794486337752-xwf7l8', '2026-11-12T12:25:37.752Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337751-cf1lj', 'builder064@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder064@kairos-staging.invalid', 'ses-sim-1794486337751-z0iwsx', '2026-11-12T12:25:37.751Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337749-tca56', 'builder060@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder060@kairos-staging.invalid', 'ses-sim-1794486337748-dwj8pt', '2026-11-12T12:25:37.749Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337747-bndv1', 'builder059@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder059@kairos-staging.invalid', 'ses-sim-1794486337746-f7ksex', '2026-11-12T12:25:37.747Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337745-7m4xg', 'builder058@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder058@kairos-staging.invalid', 'ses-sim-1794486337744-d0os2p', '2026-11-12T12:25:37.745Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337743-o2yv3', 'builder057@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder057@kairos-staging.invalid', 'ses-sim-1794486337742-ep90lo', '2026-11-12T12:25:37.743Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337741-tcv72', 'builder056@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder056@kairos-staging.invalid', 'ses-sim-1794486337740-bda4qd', '2026-11-12T12:25:37.741Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337723-i1p62', 'builder100@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder100@kairos-staging.invalid', 'ses-sim-1794486337722-lxjxxt', '2026-11-12T12:25:37.723Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337721-zr5f1', 'builder054@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder054@kairos-staging.invalid', 'ses-sim-1794486337720-9p2c2i', '2026-11-12T12:25:37.721Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337719-bbrs7', 'builder099@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder099@kairos-staging.invalid', 'ses-sim-1794486337718-8j3nj9', '2026-11-12T12:25:37.719Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337718-q5ddw', 'builder053@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder053@kairos-staging.invalid', 'ses-sim-1794486337717-o3c7ha', '2026-11-12T12:25:37.718Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337715-deh6j', 'builder098@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder098@kairos-staging.invalid', 'ses-sim-1794486337714-mmsax4', '2026-11-12T12:25:37.715Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337712-icj8o', 'builder052@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder052@kairos-staging.invalid', 'ses-sim-1794486337712-qfrqmz', '2026-11-12T12:25:37.712Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337710-yq8oe', 'builder048@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder048@kairos-staging.invalid', 'ses-sim-1794486337710-9367x6', '2026-11-12T12:25:37.710Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337708-ugha9', 'builder097@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder097@kairos-staging.invalid', 'ses-sim-1794486337708-y6faad', '2026-11-12T12:25:37.708Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337707-qqqrz', 'builder096@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder096@kairos-staging.invalid', 'ses-sim-1794486337706-yxco3d', '2026-11-12T12:25:37.707Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337704-tdqiz', 'builder095@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder095@kairos-staging.invalid', 'ses-sim-1794486337703-s4dn24', '2026-11-12T12:25:37.704Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337692-n83g2', 'builder049@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder049@kairos-staging.invalid', 'ses-sim-1794486337691-itfz5a', '2026-11-12T12:25:37.692Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337690-ifd0o', 'builder045@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder045@kairos-staging.invalid', 'ses-sim-1794486337690-joynxj', '2026-11-12T12:25:37.690Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337688-8row7', 'builder044@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder044@kairos-staging.invalid', 'ses-sim-1794486337688-no193l', '2026-11-12T12:25:37.688Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337687-5osmi', 'builder043@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder043@kairos-staging.invalid', 'ses-sim-1794486337686-s6p4ac', '2026-11-12T12:25:37.687Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337685-css2j', 'builder042@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder042@kairos-staging.invalid', 'ses-sim-1794486337684-y6w0oa', '2026-11-12T12:25:37.685Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337682-p1oci', 'builder041@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder041@kairos-staging.invalid', 'ses-sim-1794486337681-hw8kz3', '2026-11-12T12:25:37.682Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337679-p6avo', 'builder039@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder039@kairos-staging.invalid', 'ses-sim-1794486337679-kkew5d', '2026-11-12T12:25:37.680Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337676-puoj6', 'builder038@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder038@kairos-staging.invalid', 'ses-sim-1794486337673-fzvzey', '2026-11-12T12:25:37.676Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337672-2o0d5', 'builder037@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder037@kairos-staging.invalid', 'ses-sim-1794486337671-hr4dgj', '2026-11-12T12:25:37.672Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337670-ef3gx', 'builder033@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder033@kairos-staging.invalid', 'ses-sim-1794486337669-7rzazh', '2026-11-12T12:25:37.670Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337660-gbmqk', 'builder094@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder094@kairos-staging.invalid', 'ses-sim-1794486337660-7vdd3o', '2026-11-12T12:25:37.660Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337659-9t39z', 'builder093@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder093@kairos-staging.invalid', 'ses-sim-1794486337659-0vz0jt', '2026-11-12T12:25:37.659Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337658-0bp9d', 'builder092@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder092@kairos-staging.invalid', 'ses-sim-1794486337657-38yqor', '2026-11-12T12:25:37.658Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337656-a4ull', 'builder034@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder034@kairos-staging.invalid', 'ses-sim-1794486337656-sh3h3b', '2026-11-12T12:25:37.656Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337655-zbg5i', 'builder030@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder030@kairos-staging.invalid', 'ses-sim-1794486337655-bvv9h7', '2026-11-12T12:25:37.655Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337654-92cil', 'builder029@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder029@kairos-staging.invalid', 'ses-sim-1794486337653-buzkrc', '2026-11-12T12:25:37.654Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337653-ugti3', 'builder028@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder028@kairos-staging.invalid', 'ses-sim-1794486337652-kvwtiz', '2026-11-12T12:25:37.653Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337651-echml', 'builder027@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder027@kairos-staging.invalid', 'ses-sim-1794486337651-uzl8pw', '2026-11-12T12:25:37.651Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337650-lli7x', 'builder026@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder026@kairos-staging.invalid', 'ses-sim-1794486337649-3dj66h', '2026-11-12T12:25:37.650Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337648-y01kt', 'builder024@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder024@kairos-staging.invalid', 'ses-sim-1794486337648-9j0ejf', '2026-11-12T12:25:37.648Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337636-7fsgg', 'builder019@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder019@kairos-staging.invalid', 'ses-sim-1794486337635-g4aeme', '2026-11-12T12:25:37.636Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337634-elrex', 'builder018@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder018@kairos-staging.invalid', 'ses-sim-1794486337633-wu8qur', '2026-11-12T12:25:37.634Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337631-jmwvx', 'builder016@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder016@kairos-staging.invalid', 'ses-sim-1794486337631-squxxf', '2026-11-12T12:25:37.631Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337630-9dw98', 'builder091@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder091@kairos-staging.invalid', 'ses-sim-1794486337629-pfkilr', '2026-11-12T12:25:37.630Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337628-bpyv9', 'builder090@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder090@kairos-staging.invalid', 'ses-sim-1794486337628-ktgapq', '2026-11-12T12:25:37.628Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337626-ia16c', 'builder089@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder089@kairos-staging.invalid', 'ses-sim-1794486337624-0akluo', '2026-11-12T12:25:37.626Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337622-wkwhz', 'builder017@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder017@kairos-staging.invalid', 'ses-sim-1794486337621-3eekmb', '2026-11-12T12:25:37.622Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337620-fb0zd', 'builder011@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder011@kairos-staging.invalid', 'ses-sim-1794486337620-1e1ozw', '2026-11-12T12:25:37.620Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337619-zzkra', 'builder088@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder088@kairos-staging.invalid', 'ses-sim-1794486337618-rinn3m', '2026-11-12T12:25:37.619Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337617-opi9j', 'builder087@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder087@kairos-staging.invalid', 'ses-sim-1794486337616-ackzkt', '2026-11-12T12:25:37.617Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337603-uorgv', 'builder086@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder086@kairos-staging.invalid', 'ses-sim-1794486337602-xn8k94', '2026-11-12T12:25:37.603Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337601-80j7e', 'builder012@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder012@kairos-staging.invalid', 'ses-sim-1794486337600-2whhr7', '2026-11-12T12:25:37.601Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337599-fkuys', 'builder085@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder085@kairos-staging.invalid', 'ses-sim-1794486337598-co12vv', '2026-11-12T12:25:37.599Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337596-yb1be', 'builder084@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder084@kairos-staging.invalid', 'ses-sim-1794486337596-vblnzw', '2026-11-12T12:25:37.596Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337595-jq6t3', 'builder083@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder083@kairos-staging.invalid', 'ses-sim-1794486337594-xfuist', '2026-11-12T12:25:37.595Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337593-efuqy', 'builder008@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder008@kairos-staging.invalid', 'ses-sim-1794486337593-1dd0fv', '2026-11-12T12:25:37.593Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337590-7glym', 'builder082@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder082@kairos-staging.invalid', 'ses-sim-1794486337590-arao3d', '2026-11-12T12:25:37.591Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337588-kdvnv', 'builder081@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder081@kairos-staging.invalid', 'ses-sim-1794486337587-13ouad', '2026-11-12T12:25:37.588Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337585-89mlb', 'builder003@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder003@kairos-staging.invalid', 'ses-sim-1794486337584-dr51rc', '2026-11-12T12:25:37.585Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486337583-88xn5', 'builder004@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder004@kairos-staging.invalid', 'ses-sim-1794486337582-n40f8m', '2026-11-12T12:25:37.583Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486336649-nnpn1', 'builder080@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T043 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T043:builder080@kairos-staging.invalid', 'ses-sim-1794486336649-hn5snp', '2026-11-12T12:25:36.649Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486335982-r7eca', 'builder080@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Titan AI mwditu9t Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T043:SHORTLISTED', 'ses-sim-1794486335981-0f084w', '2026-11-12T12:25:35.982Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486334195-ew8n1', 'builder105@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Titan AI mwditu9t', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T043:builder105@kairos-staging.invalid', 'ses-sim-1794486334194-xdn6ju', '2026-11-12T12:25:34.195Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486333765-86cxd', 'builder105@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Titan AI mwditu9t [KAIROS-T043]', 'team-invitation', 'SIMULATED', '1', 'team-invite:KAIROS-T043:builder105@kairos-staging.invalid', 'ses-sim-1794486333764-rln5rl', '2026-11-12T12:25:33.765Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486332893-2aezl', 'builder080@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Titan AI mwditu9t [KAIROS-T043]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T043', 'ses-sim-1794486332892-co3p33', '2026-11-12T12:25:32.893Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486331761-v2b92', 'builder080@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder080@kairos-staging.invalid', 'ses-sim-1794486331760-sbq8ls', '2026-11-12T12:25:31.761Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486330241-c1077', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794486329441-29zf-diff', 'ses-sim-1794486330240-fip4fx', '2026-11-12T12:25:30.241Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486329949-wa6kb', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794486329441-29zf', 'ses-sim-1794486329667-99vngr', '2026-11-12T12:25:29.949Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486329668-gelt9', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794486329441-29zf', 'ses-sim-1794486329667-99vngr', '2026-11-12T12:25:29.668Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486084380-toz54', 'waitlist038@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486084379-h5fb4]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist038@kairos-staging.invalid:w-1794486084379-h5fb4', 'ses-sim-1794486084379-hmvdoa', '2026-11-12T12:21:24.380Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486084188-xwn66', 'waitlist037@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486084184-c7tkt]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist037@kairos-staging.invalid:w-1794486084184-c7tkt', 'ses-sim-1794486084187-8yjmjp', '2026-11-12T12:21:24.188Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486083993-d7jgt', 'waitlist036@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486083991-4g5h1]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist036@kairos-staging.invalid:w-1794486083991-4g5h1', 'ses-sim-1794486083992-tf6k2q', '2026-11-12T12:21:23.993Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486083775-e921s', 'waitlist035@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486083772-ffeol]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist035@kairos-staging.invalid:w-1794486083772-ffeol', 'ses-sim-1794486083774-azdj3p', '2026-11-12T12:21:23.775Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486083014-ofsf1', 'waitlist034@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486083011-felcs]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist034@kairos-staging.invalid:w-1794486083011-felcs', 'ses-sim-1794486083014-wku3cu', '2026-11-12T12:21:23.014Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486082849-t20ze', 'waitlist033@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082848-yuljg]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist033@kairos-staging.invalid:w-1794486082848-yuljg', 'ses-sim-1794486082848-70v4en', '2026-11-12T12:21:22.849Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486082670-pqgjt', 'waitlist032@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082668-jpnq3]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist032@kairos-staging.invalid:w-1794486082668-jpnq3', 'ses-sim-1794486082669-uzzhf1', '2026-11-12T12:21:22.670Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486082510-tf41q', 'waitlist031@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082509-eut0h]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist031@kairos-staging.invalid:w-1794486082509-eut0h', 'ses-sim-1794486082510-qb5fey', '2026-11-12T12:21:22.510Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486082346-y806k', 'waitlist030@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082342-ocwyq]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist030@kairos-staging.invalid:w-1794486082342-ocwyq', 'ses-sim-1794486082345-tktkvk', '2026-11-12T12:21:22.346Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486082103-x4yjk', 'waitlist029@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486082101-b410v]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist029@kairos-staging.invalid:w-1794486082101-b410v', 'ses-sim-1794486082102-ddjvew', '2026-11-12T12:21:22.103Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486079167-a48aa', 'builder078@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Attacker Squad mwdioehv [KAIROS-T042]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T042', 'ses-sim-1794486079167-hukssl', '2026-11-12T12:21:19.167Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486078993-tp34s', 'builder079@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Victim Fortress mwdioehv [KAIROS-T041]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T041', 'ses-sim-1794486078992-ar41m9', '2026-11-12T12:21:18.993Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486078316-a4qfi', 'builder079@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder079@kairos-staging.invalid', 'ses-sim-1794486078316-rhbntd', '2026-11-12T12:21:18.316Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486077250-72ur3', 'builder078@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder078@kairos-staging.invalid', 'ses-sim-1794486077250-mdalkl', '2026-11-12T12:21:17.250Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486032264-fj5qa', 'waitlist001@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486032261-iww1s]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist001@kairos-staging.invalid:w-1794486032261-iww1s', 'ses-sim-1794486032264-510qir', '2026-11-12T12:20:32.264Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486032116-t2pz2', 'waitlist002@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486032114-kajhq]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist002@kairos-staging.invalid:w-1794486032114-kajhq', 'ses-sim-1794486032115-f5q2k2', '2026-11-12T12:20:32.116Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486031969-ku9ju', 'waitlist003@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031968-ijuut]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist003@kairos-staging.invalid:w-1794486031968-ijuut', 'ses-sim-1794486031969-ryt9lv', '2026-11-12T12:20:31.969Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486031781-43igs', 'waitlist004@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031777-1pox9]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist004@kairos-staging.invalid:w-1794486031777-1pox9', 'ses-sim-1794486031780-r7c3l6', '2026-11-12T12:20:31.781Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486031613-3d08f', 'waitlist005@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031612-v4fls]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist005@kairos-staging.invalid:w-1794486031612-v4fls', 'ses-sim-1794486031613-1ye8fj', '2026-11-12T12:20:31.613Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486031441-lymxk', 'waitlist006@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031436-684nj]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist006@kairos-staging.invalid:w-1794486031436-684nj', 'ses-sim-1794486031440-2ffrme', '2026-11-12T12:20:31.441Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486031245-b3k3s', 'waitlist007@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031243-rdi0f]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist007@kairos-staging.invalid:w-1794486031243-rdi0f', 'ses-sim-1794486031244-71l8ey', '2026-11-12T12:20:31.245Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486031035-mh8yj', 'waitlist008@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486031033-ahcmp]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist008@kairos-staging.invalid:w-1794486031033-ahcmp', 'ses-sim-1794486031034-yzzwai', '2026-11-12T12:20:31.035Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486030813-tlzof', 'waitlist009@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486030809-m417h]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist009@kairos-staging.invalid:w-1794486030809-m417h', 'ses-sim-1794486030812-h25y2t', '2026-11-12T12:20:30.813Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486030616-9ekuk', 'waitlist010@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794486030614-0mqom]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist010@kairos-staging.invalid:w-1794486030614-0mqom', 'ses-sim-1794486030615-0vqw2l', '2026-11-12T12:20:30.616Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486015694-xibvh', 'builder076@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Attacker Squad mwdin1vf [KAIROS-T040]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T040', 'ses-sim-1794486015694-zk0z4r', '2026-11-12T12:20:15.694Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486015545-w5uls', 'builder077@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Victim Fortress mwdin1vf [KAIROS-T039]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T039', 'ses-sim-1794486015545-6ccu19', '2026-11-12T12:20:15.545Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486014987-5sk8n', 'builder077@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder077@kairos-staging.invalid', 'ses-sim-1794486014986-ivo8d0', '2026-11-12T12:20:14.987Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794486014112-eh42s', 'builder076@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder076@kairos-staging.invalid', 'ses-sim-1794486014111-ugwxyl', '2026-11-12T12:20:14.112Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485928477-tpgha', 'waitlist011@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485928475-ccbhp]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist011@kairos-staging.invalid:w-1794485928475-ccbhp', 'ses-sim-1794485928476-oztebb', '2026-11-12T12:18:48.477Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485928226-u6r42', 'waitlist012@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485928225-dqsp5]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist012@kairos-staging.invalid:w-1794485928225-dqsp5', 'ses-sim-1794485928225-0gkuep', '2026-11-12T12:18:48.226Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485928005-8hd72', 'waitlist013@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485928001-ehuv6]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist013@kairos-staging.invalid:w-1794485928001-ehuv6', 'ses-sim-1794485928004-58vatf', '2026-11-12T12:18:48.005Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485927866-pfjg2', 'waitlist014@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927862-6uwvo]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist014@kairos-staging.invalid:w-1794485927862-6uwvo', 'ses-sim-1794485927865-eys9t2', '2026-11-12T12:18:47.866Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485927702-tkg82', 'waitlist015@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927701-6f1y1]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist015@kairos-staging.invalid:w-1794485927701-6f1y1', 'ses-sim-1794485927702-bz0d0t', '2026-11-12T12:18:47.702Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485927530-6i0sz', 'waitlist016@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927528-noh57]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist016@kairos-staging.invalid:w-1794485927528-noh57', 'ses-sim-1794485927529-2j7yj5', '2026-11-12T12:18:47.530Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485927236-j7so2', 'waitlist017@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927230-0l6ia]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist017@kairos-staging.invalid:w-1794485927230-0l6ia', 'ses-sim-1794485927236-q8wftm', '2026-11-12T12:18:47.236Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485927053-ifpnt', 'waitlist018@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485927052-6ccqz]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist018@kairos-staging.invalid:w-1794485927052-6ccqz', 'ses-sim-1794485927052-zw1xuj', '2026-11-12T12:18:47.053Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485926870-iii6d', 'waitlist019@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926866-m53a9]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist019@kairos-staging.invalid:w-1794485926866-m53a9', 'ses-sim-1794485926869-ps2d1m', '2026-11-12T12:18:46.870Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485926711-4fp06', 'waitlist020@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926707-2fxs1]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist020@kairos-staging.invalid:w-1794485926707-2fxs1', 'ses-sim-1794485926711-qzarqm', '2026-11-12T12:18:46.711Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485926502-fpf0w', 'waitlist021@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926499-rhlcl]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist021@kairos-staging.invalid:w-1794485926499-rhlcl', 'ses-sim-1794485926502-jx5pmt', '2026-11-12T12:18:46.502Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485926314-a6u74', 'waitlist022@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926313-9azpn]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist022@kairos-staging.invalid:w-1794485926313-9azpn', 'ses-sim-1794485926314-gfgbjj', '2026-11-12T12:18:46.314Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485926138-8f92h', 'waitlist023@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485926135-e2l40]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist023@kairos-staging.invalid:w-1794485926135-e2l40', 'ses-sim-1794485926138-d3nmmp', '2026-11-12T12:18:46.138Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485925988-7epqt', 'waitlist024@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485925985-xnseq]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist024@kairos-staging.invalid:w-1794485925985-xnseq', 'ses-sim-1794485925987-e3pf44', '2026-11-12T12:18:45.988Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485925830-6ruwl', 'waitlist025@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485925828-l6qh1]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:waitlist025@kairos-staging.invalid:w-1794485925828-l6qh1', 'ses-sim-1794485925829-e1e7uv', '2026-11-12T12:18:45.830Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485915455-btyyk', 'builder075@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder075@kairos-staging.invalid', 'ses-sim-1794485915454-ybvz99', '2026-11-12T12:18:35.455Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485914705-bpyh2', 'builder074@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder074@kairos-staging.invalid', 'ses-sim-1794485914705-k8zfjh', '2026-11-12T12:18:34.705Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485883840-19pz9', 'builder072@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T038 [BAY-A01 (Main Auditorium Stage Wing)]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T038:builder072@kairos-staging.invalid', 'ses-sim-1794485883839-73sww4', '2026-11-12T12:18:03.840Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485880956-rfxdo', 'builder072@kairos-staging.invalid', 'KAIROS 2027 — Qualifier Artifacts Received [KAIROS-T038]', 'qualifier-submission-confirmation', 'SIMULATED', '1', 'qualifier-submit:KAIROS-T038', 'ses-sim-1794485880955-17ywhb', '2026-11-12T12:18:00.956Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485880784-eb0pa', 'builder072@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Apex Autonomous Swarm mwdik4hz Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T038:SHORTLISTED', 'ses-sim-1794485880784-998mwr', '2026-11-12T12:18:00.784Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485880168-rfzzo', 'builder073@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Apex Autonomous Swarm mwdik4hz', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T038:builder073@kairos-staging.invalid', 'ses-sim-1794485880167-h9m9tv', '2026-11-12T12:18:00.168Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485879331-v0vij', 'builder073@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder073@kairos-staging.invalid', 'ses-sim-1794485879331-y0xqou', '2026-11-12T12:17:59.331Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485878996-xqrp0', 'builder073@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Apex Autonomous Swarm mwdik4hz [KAIROS-T038]', 'team-invitation', 'SIMULATED', '1', 'team-invite:KAIROS-T038:builder073@kairos-staging.invalid', 'ses-sim-1794485878995-2mv6wt', '2026-11-12T12:17:58.996Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485878763-c0qyt', 'builder072@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Apex Autonomous Swarm mwdik4hz [KAIROS-T038]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T038', 'ses-sim-1794485878762-w7jutf', '2026-11-12T12:17:58.763Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485878022-gfep8', 'builder072@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder072@kairos-staging.invalid', 'ses-sim-1794485878021-0v8dh0', '2026-11-12T12:17:58.022Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485877735-ffnu8', 'builder072@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485877734-9d8jz]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:builder072@kairos-staging.invalid:w-1794485877734-9d8jz', 'ses-sim-1794485877734-63aod6', '2026-11-12T12:17:57.735Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485857855-56njm', 'builder070@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T037 [BAY-A01 (Main Auditorium Stage Wing)]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T037:builder070@kairos-staging.invalid', 'ses-sim-1794485857854-r03j0r', '2026-11-12T12:17:37.855Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485856372-gmy06', 'builder070@kairos-staging.invalid', 'KAIROS 2027 — Qualifier Artifacts Received [KAIROS-T037]', 'qualifier-submission-confirmation', 'SIMULATED', '1', 'qualifier-submit:KAIROS-T037', 'ses-sim-1794485856372-ir6k29', '2026-11-12T12:17:36.372Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485856142-bgzn7', 'builder070@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Apex Autonomous Swarm mwdijj7i Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T037:SHORTLISTED', 'ses-sim-1794485856141-be8rio', '2026-11-12T12:17:36.142Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485855279-5sxyc', 'builder071@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Apex Autonomous Swarm mwdijj7i', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T037:builder071@kairos-staging.invalid', 'ses-sim-1794485855278-6qksbx', '2026-11-12T12:17:35.279Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485854176-dts1v', 'builder071@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder071@kairos-staging.invalid', 'ses-sim-1794485854175-ns6gwm', '2026-11-12T12:17:34.176Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485853569-7lwig', 'builder071@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Apex Autonomous Swarm mwdijj7i [KAIROS-T037]', 'team-invitation', 'SIMULATED', '1', 'team-invite:KAIROS-T037:builder071@kairos-staging.invalid', 'ses-sim-1794485853568-v1eka7', '2026-11-12T12:17:33.569Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485853213-14gup', 'builder070@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Apex Autonomous Swarm mwdijj7i [KAIROS-T037]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T037', 'ses-sim-1794485853212-t8s8lz', '2026-11-12T12:17:33.213Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485851846-fz734', 'builder070@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder070@kairos-staging.invalid', 'ses-sim-1794485851845-r77zis', '2026-11-12T12:17:31.846Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485851207-u3q4m', 'builder070@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485851201-fuz0e]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:builder070@kairos-staging.invalid:w-1794485851201-fuz0e', 'ses-sim-1794485851205-6756hx', '2026-11-12T12:17:31.207Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485781732-v75cu', 'builder068@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T036 [BAY-A01 (Main Auditorium Stage Wing)]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T036:builder068@kairos-staging.invalid', 'ses-sim-1794485781730-gxkvrr', '2026-11-12T12:16:21.732Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485774944-ibtlr', 'builder068@kairos-staging.invalid', 'KAIROS 2027 — Qualifier Artifacts Received [KAIROS-T036]', 'qualifier-submission-confirmation', 'SIMULATED', '1', 'qualifier-submit:KAIROS-T036', 'ses-sim-1794485774943-dbmxta', '2026-11-12T12:16:14.944Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485772926-f0xfd', 'builder068@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Apex Autonomous Swarm mwdihko2 Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T036:SHORTLISTED', 'ses-sim-1794485772926-0snq1u', '2026-11-12T12:16:12.926Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485769318-0p43x', 'builder069@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Apex Autonomous Swarm mwdihko2', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T036:builder069@kairos-staging.invalid', 'ses-sim-1794485769317-g6f1hb', '2026-11-12T12:16:09.318Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485768557-k0oli', 'builder069@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder069@kairos-staging.invalid', 'ses-sim-1794485768556-n4maay', '2026-11-12T12:16:08.557Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485768155-tk135', 'builder069@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Apex Autonomous Swarm mwdihko2 [KAIROS-T036]', 'team-invitation', 'SIMULATED', '1', 'team-invite:KAIROS-T036:builder069@kairos-staging.invalid', 'ses-sim-1794485768154-gam7cm', '2026-11-12T12:16:08.155Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485766402-oo6kw', 'builder068@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Apex Autonomous Swarm mwdihko2 [KAIROS-T036]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T036', 'ses-sim-1794485766401-hwlpod', '2026-11-12T12:16:06.402Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485763228-rhfmr', 'builder068@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder068@kairos-staging.invalid', 'ses-sim-1794485763227-ifxk1l', '2026-11-12T12:16:03.228Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485762249-lk1qu', 'builder068@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485762242-jwtaq]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:builder068@kairos-staging.invalid:w-1794485762242-jwtaq', 'ses-sim-1794485762248-h84pnc', '2026-11-12T12:16:02.249Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519473-pljmz', 'builder104@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder104@kairos-staging.invalid', 'ses-sim-1794485519472-yq4frz', '2026-11-12T12:11:59.473Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519472-yq0ie', 'builder067@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder067@kairos-staging.invalid', 'ses-sim-1794485519471-6jn1jt', '2026-11-12T12:11:59.472Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519465-cwi8h', 'builder063@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder063@kairos-staging.invalid', 'ses-sim-1794485519465-wyur1u', '2026-11-12T12:11:59.465Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519464-6xssk', 'builder103@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder103@kairos-staging.invalid', 'ses-sim-1794485519464-6enbnw', '2026-11-12T12:11:59.464Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519463-0ff9s', 'builder102@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder102@kairos-staging.invalid', 'ses-sim-1794485519463-pnetc7', '2026-11-12T12:11:59.463Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519462-ja7zy', 'builder101@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder101@kairos-staging.invalid', 'ses-sim-1794485519462-xvjrgx', '2026-11-12T12:11:59.462Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519461-htt27', 'builder064@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder064@kairos-staging.invalid', 'ses-sim-1794485519461-kx19kd', '2026-11-12T12:11:59.461Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519461-q37ic', 'builder060@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder060@kairos-staging.invalid', 'ses-sim-1794485519460-129ipa', '2026-11-12T12:11:59.461Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519460-w5nv3', 'builder059@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder059@kairos-staging.invalid', 'ses-sim-1794485519459-832yd6', '2026-11-12T12:11:59.460Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519458-cpwgp', 'builder058@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder058@kairos-staging.invalid', 'ses-sim-1794485519458-1el8xm', '2026-11-12T12:11:59.458Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519457-p93kf', 'builder057@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder057@kairos-staging.invalid', 'ses-sim-1794485519456-c66fei', '2026-11-12T12:11:59.457Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519452-239y3', 'builder056@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder056@kairos-staging.invalid', 'ses-sim-1794485519452-vaoquy', '2026-11-12T12:11:59.452Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519444-vnwsw', 'builder100@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder100@kairos-staging.invalid', 'ses-sim-1794485294904-bpxnu3', '2026-11-12T12:11:59.444Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519443-3jye0', 'builder054@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder054@kairos-staging.invalid', 'ses-sim-1794485294903-adva0s', '2026-11-12T12:11:59.443Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519442-qa1la', 'builder099@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder099@kairos-staging.invalid', 'ses-sim-1794485519442-a2kjkq', '2026-11-12T12:11:59.442Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519441-uty31', 'builder053@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder053@kairos-staging.invalid', 'ses-sim-1794485519441-em4vca', '2026-11-12T12:11:59.441Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519440-9wu5m', 'builder098@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder098@kairos-staging.invalid', 'ses-sim-1794485519439-htao4d', '2026-11-12T12:11:59.440Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519438-4iqfi', 'builder052@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder052@kairos-staging.invalid', 'ses-sim-1794485519438-ro4d59', '2026-11-12T12:11:59.438Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519437-mh3ro', 'builder048@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder048@kairos-staging.invalid', 'ses-sim-1794485519437-9fkzq5', '2026-11-12T12:11:59.437Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519436-6jec3', 'builder097@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder097@kairos-staging.invalid', 'ses-sim-1794485519436-t9m2m2', '2026-11-12T12:11:59.436Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519435-yiqb0', 'builder096@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder096@kairos-staging.invalid', 'ses-sim-1794485519435-or803a', '2026-11-12T12:11:59.435Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519434-4ahcb', 'builder095@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder095@kairos-staging.invalid', 'ses-sim-1794485519433-hb0wsj', '2026-11-12T12:11:59.434Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519426-w9koe', 'builder049@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder049@kairos-staging.invalid', 'ses-sim-1794485519426-2dhkn2', '2026-11-12T12:11:59.426Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519425-iqi8y', 'builder045@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder045@kairos-staging.invalid', 'ses-sim-1794485519424-y40vwn', '2026-11-12T12:11:59.425Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519423-e52d6', 'builder044@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder044@kairos-staging.invalid', 'ses-sim-1794485519423-r827i1', '2026-11-12T12:11:59.423Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519422-x72to', 'builder043@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder043@kairos-staging.invalid', 'ses-sim-1794485519422-qd3q7b', '2026-11-12T12:11:59.422Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519421-bfqdq', 'builder042@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder042@kairos-staging.invalid', 'ses-sim-1794485519421-pnj9b5', '2026-11-12T12:11:59.421Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519420-l4uzh', 'builder041@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder041@kairos-staging.invalid', 'ses-sim-1794485519420-w0gqdc', '2026-11-12T12:11:59.420Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519419-zdpbc', 'builder039@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder039@kairos-staging.invalid', 'ses-sim-1794485519419-zsnqyu', '2026-11-12T12:11:59.419Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519418-nwgjf', 'builder038@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder038@kairos-staging.invalid', 'ses-sim-1794485519418-5xuo6g', '2026-11-12T12:11:59.418Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519417-vmb4e', 'builder037@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder037@kairos-staging.invalid', 'ses-sim-1794485519417-5hgwaq', '2026-11-12T12:11:59.417Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519416-aek9d', 'builder033@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder033@kairos-staging.invalid', 'ses-sim-1794485519415-6nsr7c', '2026-11-12T12:11:59.416Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519406-9xsby', 'builder094@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder094@kairos-staging.invalid', 'ses-sim-1794485519406-i66gch', '2026-11-12T12:11:59.406Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519405-6exr6', 'builder093@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder093@kairos-staging.invalid', 'ses-sim-1794485519405-8uvh8p', '2026-11-12T12:11:59.405Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519404-13n9d', 'builder092@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder092@kairos-staging.invalid', 'ses-sim-1794485519404-kl9zqo', '2026-11-12T12:11:59.404Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519403-i39kh', 'builder034@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder034@kairos-staging.invalid', 'ses-sim-1794485519403-x5od6r', '2026-11-12T12:11:59.403Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519402-zlxn1', 'builder030@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder030@kairos-staging.invalid', 'ses-sim-1794485519402-v88224', '2026-11-12T12:11:59.402Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519401-68lds', 'builder029@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder029@kairos-staging.invalid', 'ses-sim-1794485519401-apwr22', '2026-11-12T12:11:59.401Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519400-3cbfc', 'builder028@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder028@kairos-staging.invalid', 'ses-sim-1794485519400-kumfii', '2026-11-12T12:11:59.400Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519399-wa49h', 'builder027@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder027@kairos-staging.invalid', 'ses-sim-1794485519399-yx65ee', '2026-11-12T12:11:59.399Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519398-rufo6', 'builder026@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder026@kairos-staging.invalid', 'ses-sim-1794485519398-ysz4od', '2026-11-12T12:11:59.398Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519397-9qdsq', 'builder024@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder024@kairos-staging.invalid', 'ses-sim-1794485519396-ekkecc', '2026-11-12T12:11:59.397Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519389-9uejf', 'builder019@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder019@kairos-staging.invalid', 'ses-sim-1794485519388-fjdzp9', '2026-11-12T12:11:59.389Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519388-sp0be', 'builder018@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder018@kairos-staging.invalid', 'ses-sim-1794485519387-i3lr5a', '2026-11-12T12:11:59.388Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519387-d7nvd', 'builder016@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder016@kairos-staging.invalid', 'ses-sim-1794485519386-q3whvc', '2026-11-12T12:11:59.387Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519386-j0jrp', 'builder091@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder091@kairos-staging.invalid', 'ses-sim-1794485519385-t8t2cl', '2026-11-12T12:11:59.386Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519385-5rnm9', 'builder090@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder090@kairos-staging.invalid', 'ses-sim-1794485519384-r5jtzw', '2026-11-12T12:11:59.385Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519383-ak5q1', 'builder089@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder089@kairos-staging.invalid', 'ses-sim-1794485519383-vjf0ci', '2026-11-12T12:11:59.383Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519382-4ayj9', 'builder017@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder017@kairos-staging.invalid', 'ses-sim-1794485519382-vsmg6l', '2026-11-12T12:11:59.382Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519381-6l1xb', 'builder011@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder011@kairos-staging.invalid', 'ses-sim-1794485519381-jii7gd', '2026-11-12T12:11:59.381Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519380-pab28', 'builder088@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder088@kairos-staging.invalid', 'ses-sim-1794485519380-tadxif', '2026-11-12T12:11:59.380Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519379-gp4wv', 'builder087@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder087@kairos-staging.invalid', 'ses-sim-1794485519379-su8bnm', '2026-11-12T12:11:59.379Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519371-m4rj9', 'builder086@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder086@kairos-staging.invalid', 'ses-sim-1794485519371-30zxo3', '2026-11-12T12:11:59.371Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519370-lscok', 'builder012@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder012@kairos-staging.invalid', 'ses-sim-1794485519370-7vpa5o', '2026-11-12T12:11:59.370Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519369-zs9x0', 'builder085@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder085@kairos-staging.invalid', 'ses-sim-1794485519369-jdss4z', '2026-11-12T12:11:59.369Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519368-zmeu8', 'builder084@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder084@kairos-staging.invalid', 'ses-sim-1794485519368-svlg67', '2026-11-12T12:11:59.368Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519367-pj2sv', 'builder083@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder083@kairos-staging.invalid', 'ses-sim-1794485519367-oblrs2', '2026-11-12T12:11:59.367Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519366-6xwjp', 'builder008@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder008@kairos-staging.invalid', 'ses-sim-1794485519366-yupwz8', '2026-11-12T12:11:59.366Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519365-v5em8', 'builder082@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder082@kairos-staging.invalid', 'ses-sim-1794485519365-p1i7s9', '2026-11-12T12:11:59.365Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519364-cnvmr', 'builder081@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder081@kairos-staging.invalid', 'ses-sim-1794485519364-spr6id', '2026-11-12T12:11:59.364Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519363-hndi4', 'builder003@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder003@kairos-staging.invalid', 'ses-sim-1794485519363-inermg', '2026-11-12T12:11:59.363Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485519362-1c4q8', 'builder004@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder004@kairos-staging.invalid', 'ses-sim-1794485519361-j8b2nx', '2026-11-12T12:11:59.362Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485518682-b6xft', 'builder067@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T035 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T035:builder067@kairos-staging.invalid', 'ses-sim-1794485518681-34tkbe', '2026-11-12T12:11:58.682Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485516522-befzc', 'builder067@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdic9oe Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T035:SHORTLISTED', 'ses-sim-1794485516521-9gser2', '2026-11-12T12:11:56.522Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485514722-1cqnv', 'builder104@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Titan AI mwdic9oe', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T035:builder104@kairos-staging.invalid', 'ses-sim-1794485514722-0ixv2k', '2026-11-12T12:11:54.722Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485514516-y03bx', 'builder104@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Titan AI mwdic9oe [KAIROS-T035]', 'team-invitation', 'SIMULATED', '1', 'team-invite:KAIROS-T035:builder104@kairos-staging.invalid', 'ses-sim-1794485514515-1l4v3d', '2026-11-12T12:11:54.516Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485512014-13sja', 'builder067@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Titan AI mwdic9oe [KAIROS-T035]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T035', 'ses-sim-1794485512013-i476y0', '2026-11-12T12:11:52.014Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485511460-xt3m7', 'builder067@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder067@kairos-staging.invalid', 'ses-sim-1794485511458-olj3bb', '2026-11-12T12:11:51.460Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485510382-t0xyn', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485509272-q935-diff', 'ses-sim-1794485510381-uy0bvy', '2026-11-12T12:11:50.382Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485510094-f8qdg', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485509272-q935', 'ses-sim-1794485509824-ffbf98', '2026-11-12T12:11:50.094Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485509825-o1pry', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485509272-q935', 'ses-sim-1794485509824-ffbf98', '2026-11-12T12:11:49.825Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485476302-v8frp', 'builder066@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder066@kairos-staging.invalid', 'ses-sim-1794485476301-hqh7wt', '2026-11-12T12:11:16.302Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485436015-w5c0b', 'builder065@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder065@kairos-staging.invalid', 'ses-sim-1794485436014-3hocxa', '2026-11-12T12:10:36.015Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485420688-hxr8r', 'builder063@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Karthik Solo Squad 1794485408809 [KAIROS-T034]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T034', 'ses-sim-1794485420687-ru0dxl', '2026-11-12T12:10:20.688Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485415870-5ltr1', 'builder103@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T033:builder103@kairos-staging.invalid', 'ses-sim-1794485415870-ux456a', '2026-11-12T12:10:15.870Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485415738-ta5h3', 'builder102@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T033:builder102@kairos-staging.invalid', 'ses-sim-1794485415737-d18npl', '2026-11-12T12:10:15.738Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485415592-p9kw1', 'builder101@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T033:builder101@kairos-staging.invalid', 'ses-sim-1794485415591-ejb4y4', '2026-11-12T12:10:15.592Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485415439-xnvlz', 'builder108@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T033:builder108@kairos-staging.invalid', 'ses-sim-1794485415438-wsyfe6', '2026-11-12T12:10:15.439Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485414964-apml7', 'builder064@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined NeuralMesh Alpha 1794485408809', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T033:builder064@kairos-staging.invalid', 'ses-sim-1794485414964-vv3sus', '2026-11-12T12:10:14.964Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485414398-hwnia', 'builder064@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder064@kairos-staging.invalid', 'ses-sim-1794485414397-03xwog', '2026-11-12T12:10:14.398Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485412820-q7gbb', 'builder063@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: NeuralMesh Alpha 1794485408809 [KAIROS-T033]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T033', 'ses-sim-1794485412820-pf9dwc', '2026-11-12T12:10:12.820Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485412237-czfll', 'builder063@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder063@kairos-staging.invalid', 'ses-sim-1794485412237-vj4jgz', '2026-11-12T12:10:12.237Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485410293-kma3y', 'builder062@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485410291-mf8sr]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:builder062@kairos-staging.invalid:w-1794485410291-mf8sr', 'ses-sim-1794485410292-sygiws', '2026-11-12T12:10:10.293Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485409672-y3l5c', 'builder062@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder062@kairos-staging.invalid', 'ses-sim-1794485409671-zzlenl', '2026-11-12T12:10:09.672Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485368738-we2sb', 'builder061@kairos-staging.invalid', 'KAIROS 2027 — Priority Registration Confirmed [w-1794485368736-tmung]', 'registration-confirmation', 'SIMULATED', '1', 'reg-confirm:builder061@kairos-staging.invalid:w-1794485368736-tmung', 'ses-sim-1794485368737-3c7l1y', '2026-11-12T12:09:28.738Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485366390-lxebi', 'builder061@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder061@kairos-staging.invalid', 'ses-sim-1794485366389-wpavie', '2026-11-12T12:09:26.390Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485366046-doif8', 'builder060@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Titan Mesh 1794485361490', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T032:builder060@kairos-staging.invalid', 'ses-sim-1794485366046-o3oxio', '2026-11-12T12:09:26.046Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485365502-1mow7', 'builder060@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder060@kairos-staging.invalid', 'ses-sim-1794485365501-qqpblm', '2026-11-12T12:09:25.502Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485365033-sgrxh', 'builder059@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Titan Mesh 1794485361490 [KAIROS-T032]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T032', 'ses-sim-1794485365033-abo0cb', '2026-11-12T12:09:25.033Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485364452-x91f8', 'builder059@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder059@kairos-staging.invalid', 'ses-sim-1794485364451-sf7l4q', '2026-11-12T12:09:24.452Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485348065-6cp3i', 'builder058@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: FI Test Team 1794485321265 [KAIROS-T031]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T031', 'ses-sim-1794485348064-kihcwy', '2026-11-12T12:09:08.065Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485347334-rsqeo', 'builder058@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder058@kairos-staging.invalid', 'ses-sim-1794485347333-2ey9wl', '2026-11-12T12:09:07.334Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485340117-xlapd', 'builder056@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T029 [BAY-C09]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T029:builder056@kairos-staging.invalid', 'ses-sim-1794485334568-tjz6bc', '2026-11-12T12:09:00.117Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485337281-s3rnj', 'builder057@kairos-staging.invalid', 'KAIROS 2027 — Abstract Review Decision: Disqualified Team 1794485321265', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T030:REJECTED', 'ses-sim-1794485337280-a0wehw', '2026-11-12T12:08:57.281Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485337019-0347f', 'builder057@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Disqualified Team 1794485321265 [KAIROS-T030]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T030', 'ses-sim-1794485337018-247dd5', '2026-11-12T12:08:57.019Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485335694-ayd5e', 'builder057@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder057@kairos-staging.invalid', 'ses-sim-1794485335693-yf8p82', '2026-11-12T12:08:55.694Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485334569-6hb6d', 'builder056@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T029 [BAY-C09]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T029:builder056@kairos-staging.invalid', 'ses-sim-1794485334568-tjz6bc', '2026-11-12T12:08:54.569Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485332913-pg38s', 'builder056@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Neural Apex 1794485321265 Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T029:SHORTLISTED', 'ses-sim-1794485332912-qw998o', '2026-11-12T12:08:52.913Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485332156-h66j3', 'builder056@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Neural Apex 1794485321265 [KAIROS-T029]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T029', 'ses-sim-1794485332155-6p6q19', '2026-11-12T12:08:52.156Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485330829-f0sll', 'builder056@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder056@kairos-staging.invalid', 'ses-sim-1794485330828-5fvzri', '2026-11-12T12:08:50.829Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485325391-g0jif', 'builder055@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder055@kairos-staging.invalid', 'ses-sim-1794485325389-qf71n2', '2026-11-12T12:08:45.391Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294905-beniy', 'builder100@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder100@kairos-staging.invalid', 'ses-sim-1794485294904-bpxnu3', '2026-11-12T12:08:14.905Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294903-g1del', 'builder054@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder054@kairos-staging.invalid', 'ses-sim-1794485294903-adva0s', '2026-11-12T12:08:14.903Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294902-5hhwc', 'builder099@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder099@kairos-staging.invalid', 'ses-sim-1794485264933-bv38bx', '2026-11-12T12:08:14.902Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294901-sqlp5', 'builder053@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder053@kairos-staging.invalid', 'ses-sim-1794485264932-kl002z', '2026-11-12T12:08:14.901Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294900-ozwmq', 'builder098@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder098@kairos-staging.invalid', 'ses-sim-1794485264931-28vsvx', '2026-11-12T12:08:14.900Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294899-bkcz8', 'builder052@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder052@kairos-staging.invalid', 'ses-sim-1794485264929-37iqhx', '2026-11-12T12:08:14.899Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294898-e4qgv', 'builder048@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder048@kairos-staging.invalid', 'ses-sim-1794485264928-pmhv9c', '2026-11-12T12:08:14.898Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294897-6o8tv', 'builder097@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder097@kairos-staging.invalid', 'ses-sim-1794485264927-99cey8', '2026-11-12T12:08:14.897Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294896-1evfx', 'builder096@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder096@kairos-staging.invalid', 'ses-sim-1794485264926-bnmbly', '2026-11-12T12:08:14.896Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294894-cu92a', 'builder095@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder095@kairos-staging.invalid', 'ses-sim-1794485264924-2obmh7', '2026-11-12T12:08:14.894Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294886-kl8jx', 'builder049@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder049@kairos-staging.invalid', 'ses-sim-1794485264918-lu7b08', '2026-11-12T12:08:14.886Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294885-4lmfo', 'builder045@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder045@kairos-staging.invalid', 'ses-sim-1794485264917-xctth7', '2026-11-12T12:08:14.885Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294884-ivwr7', 'builder044@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder044@kairos-staging.invalid', 'ses-sim-1794485264916-q0on5l', '2026-11-12T12:08:14.884Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294882-d41ls', 'builder043@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder043@kairos-staging.invalid', 'ses-sim-1794485264915-y82zeq', '2026-11-12T12:08:14.882Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294881-35eyt', 'builder042@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder042@kairos-staging.invalid', 'ses-sim-1794485264914-duvfmz', '2026-11-12T12:08:14.881Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294880-naumy', 'builder041@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder041@kairos-staging.invalid', 'ses-sim-1794485264913-fksa8k', '2026-11-12T12:08:14.880Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294879-i265m', 'builder039@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder039@kairos-staging.invalid', 'ses-sim-1794485264913-hqard2', '2026-11-12T12:08:14.879Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294878-z2ci0', 'builder038@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder038@kairos-staging.invalid', 'ses-sim-1794485264912-oxsy6b', '2026-11-12T12:08:14.878Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294877-8ehof', 'builder037@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder037@kairos-staging.invalid', 'ses-sim-1794485264911-lhx4l1', '2026-11-12T12:08:14.877Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294876-8dp5r', 'builder033@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder033@kairos-staging.invalid', 'ses-sim-1794485264909-rxu8gm', '2026-11-12T12:08:14.876Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294866-ohdgj', 'builder094@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder094@kairos-staging.invalid', 'ses-sim-1794485264901-wwy9gu', '2026-11-12T12:08:14.867Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294865-ehewm', 'builder093@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder093@kairos-staging.invalid', 'ses-sim-1794485264900-hspkvu', '2026-11-12T12:08:14.865Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294863-twoar', 'builder092@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder092@kairos-staging.invalid', 'ses-sim-1794485264899-9n0y2s', '2026-11-12T12:08:14.863Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294862-z3x0s', 'builder034@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder034@kairos-staging.invalid', 'ses-sim-1794485264898-vlupmg', '2026-11-12T12:08:14.862Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294861-z1dcc', 'builder030@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder030@kairos-staging.invalid', 'ses-sim-1794485264897-rtt5m9', '2026-11-12T12:08:14.861Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294859-e4n51', 'builder029@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder029@kairos-staging.invalid', 'ses-sim-1794485264896-tz5e1e', '2026-11-12T12:08:14.859Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294858-cka10', 'builder028@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder028@kairos-staging.invalid', 'ses-sim-1794485264896-ag4kpe', '2026-11-12T12:08:14.858Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294856-zxehj', 'builder027@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder027@kairos-staging.invalid', 'ses-sim-1794485264895-3mxogx', '2026-11-12T12:08:14.856Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294855-6b5bw', 'builder026@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder026@kairos-staging.invalid', 'ses-sim-1794485264894-qjawhr', '2026-11-12T12:08:14.855Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294854-h8kkz', 'builder024@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder024@kairos-staging.invalid', 'ses-sim-1794485264893-ljfvof', '2026-11-12T12:08:14.854Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294846-4oxsm', 'builder019@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder019@kairos-staging.invalid', 'ses-sim-1794485264888-negz2c', '2026-11-12T12:08:14.846Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294845-faeis', 'builder018@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder018@kairos-staging.invalid', 'ses-sim-1794485264887-1leufd', '2026-11-12T12:08:14.845Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294844-7bf54', 'builder016@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder016@kairos-staging.invalid', 'ses-sim-1794485264886-4mwbvk', '2026-11-12T12:08:14.844Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294843-dp02g', 'builder091@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder091@kairos-staging.invalid', 'ses-sim-1794485264885-sivrr5', '2026-11-12T12:08:14.843Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294842-1sces', 'builder090@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder090@kairos-staging.invalid', 'ses-sim-1794485264883-i5a7c2', '2026-11-12T12:08:14.842Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294841-awee7', 'builder089@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder089@kairos-staging.invalid', 'ses-sim-1794485264882-untp60', '2026-11-12T12:08:14.841Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294839-wlvae', 'builder017@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder017@kairos-staging.invalid', 'ses-sim-1794485264881-jea4rd', '2026-11-12T12:08:14.839Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294837-q6jut', 'builder011@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder011@kairos-staging.invalid', 'ses-sim-1794485264880-lvg4lz', '2026-11-12T12:08:14.837Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294836-yuy3m', 'builder088@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder088@kairos-staging.invalid', 'ses-sim-1794485264879-yqqo17', '2026-11-12T12:08:14.836Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294834-1lswh', 'builder087@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder087@kairos-staging.invalid', 'ses-sim-1794485264877-00auxj', '2026-11-12T12:08:14.834Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294827-ul98p', 'builder086@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder086@kairos-staging.invalid', 'ses-sim-1794485264872-6ndds2', '2026-11-12T12:08:14.827Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294825-bfos8', 'builder012@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder012@kairos-staging.invalid', 'ses-sim-1794485264871-vod5cw', '2026-11-12T12:08:14.825Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294824-dc02w', 'builder085@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder085@kairos-staging.invalid', 'ses-sim-1794485264870-nngg08', '2026-11-12T12:08:14.824Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294822-bjupz', 'builder084@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder084@kairos-staging.invalid', 'ses-sim-1794485264868-vw8psa', '2026-11-12T12:08:14.822Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294820-f23v4', 'builder083@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder083@kairos-staging.invalid', 'ses-sim-1794485264866-7466d7', '2026-11-12T12:08:14.820Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294818-kieyk', 'builder008@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder008@kairos-staging.invalid', 'ses-sim-1794485264865-h7za2j', '2026-11-12T12:08:14.818Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294817-erqga', 'builder082@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder082@kairos-staging.invalid', 'ses-sim-1794485264863-kjzyh2', '2026-11-12T12:08:14.817Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294816-zmsh8', 'builder081@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder081@kairos-staging.invalid', 'ses-sim-1794485264861-88iryh', '2026-11-12T12:08:14.816Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294815-oi6k6', 'builder003@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder003@kairos-staging.invalid', 'ses-sim-1794485264859-yd9sx1', '2026-11-12T12:08:14.815Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294813-kcc9p', 'builder004@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder004@kairos-staging.invalid', 'ses-sim-1794485264857-c98z8n', '2026-11-12T12:08:14.814Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485294018-nz9c1', 'builder054@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T028 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T028:builder054@kairos-staging.invalid', 'ses-sim-1794485294017-troefk', '2026-11-12T12:08:14.018Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485293694-pnmo8', 'builder054@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdi7knz Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T028:SHORTLISTED', 'ses-sim-1794485293693-y3dsvp', '2026-11-12T12:08:13.694Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485293500-8ex03', 'builder100@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Titan AI mwdi7knz', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T028:builder100@kairos-staging.invalid', 'ses-sim-1794485293500-hw7272', '2026-11-12T12:08:13.500Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485293278-e9hd3', 'builder100@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Titan AI mwdi7knz [KAIROS-T028]', 'team-invitation', 'SIMULATED', '1', 'team-invite:KAIROS-T028:builder100@kairos-staging.invalid', 'ses-sim-1794485293278-6qi47p', '2026-11-12T12:08:13.278Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485292414-ddme6', 'builder054@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Titan AI mwdi7knz [KAIROS-T028]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T028', 'ses-sim-1794485292414-qhcxk3', '2026-11-12T12:08:12.414Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485291934-xygzo', 'builder054@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder054@kairos-staging.invalid', 'ses-sim-1794485291933-5aki4b', '2026-11-12T12:08:11.934Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485291465-woj8v', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485290845-fj86-diff', 'ses-sim-1794485291464-bi6y9s', '2026-11-12T12:08:11.465Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485291251-aueo6', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485290845-fj86', 'ses-sim-1794485290985-k70btv', '2026-11-12T12:08:11.251Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485290986-ljdjm', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485290845-fj86', 'ses-sim-1794485290985-k70btv', '2026-11-12T12:08:10.986Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264933-3bpvq', 'builder099@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder099@kairos-staging.invalid', 'ses-sim-1794485264933-bv38bx', '2026-11-12T12:07:44.933Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264932-y9tf5', 'builder053@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder053@kairos-staging.invalid', 'ses-sim-1794485264932-kl002z', '2026-11-12T12:07:44.932Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264931-64eg2', 'builder098@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder098@kairos-staging.invalid', 'ses-sim-1794485264931-28vsvx', '2026-11-12T12:07:44.931Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264930-bi7b0', 'builder052@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder052@kairos-staging.invalid', 'ses-sim-1794485264929-37iqhx', '2026-11-12T12:07:44.930Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264929-kfsth', 'builder048@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder048@kairos-staging.invalid', 'ses-sim-1794485264928-pmhv9c', '2026-11-12T12:07:44.929Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264927-xgbjq', 'builder097@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder097@kairos-staging.invalid', 'ses-sim-1794485264927-99cey8', '2026-11-12T12:07:44.927Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264926-eevjp', 'builder096@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder096@kairos-staging.invalid', 'ses-sim-1794485264926-bnmbly', '2026-11-12T12:07:44.926Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264925-g9a35', 'builder095@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder095@kairos-staging.invalid', 'ses-sim-1794485264924-2obmh7', '2026-11-12T12:07:44.925Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264918-7xeds', 'builder049@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder049@kairos-staging.invalid', 'ses-sim-1794485264918-lu7b08', '2026-11-12T12:07:44.918Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264917-ig8go', 'builder045@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder045@kairos-staging.invalid', 'ses-sim-1794485264917-xctth7', '2026-11-12T12:07:44.917Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264916-mzr1o', 'builder044@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder044@kairos-staging.invalid', 'ses-sim-1794485264916-q0on5l', '2026-11-12T12:07:44.916Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264915-nnmw2', 'builder043@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder043@kairos-staging.invalid', 'ses-sim-1794485264915-y82zeq', '2026-11-12T12:07:44.915Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264915-mj0xv', 'builder042@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder042@kairos-staging.invalid', 'ses-sim-1794485264914-duvfmz', '2026-11-12T12:07:44.915Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264914-3bsnp', 'builder041@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder041@kairos-staging.invalid', 'ses-sim-1794485264913-fksa8k', '2026-11-12T12:07:44.914Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264913-jtoh3', 'builder039@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder039@kairos-staging.invalid', 'ses-sim-1794485264913-hqard2', '2026-11-12T12:07:44.913Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264912-grtik', 'builder038@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder038@kairos-staging.invalid', 'ses-sim-1794485264912-oxsy6b', '2026-11-12T12:07:44.912Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264911-273yi', 'builder037@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder037@kairos-staging.invalid', 'ses-sim-1794485264911-lhx4l1', '2026-11-12T12:07:44.911Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264910-rfa7o', 'builder033@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder033@kairos-staging.invalid', 'ses-sim-1794485264909-rxu8gm', '2026-11-12T12:07:44.910Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264902-jgt7s', 'builder094@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder094@kairos-staging.invalid', 'ses-sim-1794485264901-wwy9gu', '2026-11-12T12:07:44.902Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264900-em3gj', 'builder093@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder093@kairos-staging.invalid', 'ses-sim-1794485264900-hspkvu', '2026-11-12T12:07:44.900Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264899-qka3v', 'builder092@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder092@kairos-staging.invalid', 'ses-sim-1794485264899-9n0y2s', '2026-11-12T12:07:44.899Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264898-qn4lp', 'builder034@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder034@kairos-staging.invalid', 'ses-sim-1794485264898-vlupmg', '2026-11-12T12:07:44.898Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264898-tar6e', 'builder030@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder030@kairos-staging.invalid', 'ses-sim-1794485264897-rtt5m9', '2026-11-12T12:07:44.898Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264897-5w5w7', 'builder029@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder029@kairos-staging.invalid', 'ses-sim-1794485264896-tz5e1e', '2026-11-12T12:07:44.897Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264896-jqz1v', 'builder028@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder028@kairos-staging.invalid', 'ses-sim-1794485264896-ag4kpe', '2026-11-12T12:07:44.896Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264895-vbhqo', 'builder027@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder027@kairos-staging.invalid', 'ses-sim-1794485264895-3mxogx', '2026-11-12T12:07:44.895Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264894-rx0gt', 'builder026@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder026@kairos-staging.invalid', 'ses-sim-1794485264894-qjawhr', '2026-11-12T12:07:44.894Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264893-nbev4', 'builder024@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder024@kairos-staging.invalid', 'ses-sim-1794485264893-ljfvof', '2026-11-12T12:07:44.893Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264888-xmlrc', 'builder019@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder019@kairos-staging.invalid', 'ses-sim-1794485264888-negz2c', '2026-11-12T12:07:44.888Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264887-odbyt', 'builder018@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder018@kairos-staging.invalid', 'ses-sim-1794485264887-1leufd', '2026-11-12T12:07:44.887Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264887-o9aow', 'builder016@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder016@kairos-staging.invalid', 'ses-sim-1794485264886-4mwbvk', '2026-11-12T12:07:44.887Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264885-hhnwo', 'builder091@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder091@kairos-staging.invalid', 'ses-sim-1794485264885-sivrr5', '2026-11-12T12:07:44.885Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264884-x9ehx', 'builder090@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder090@kairos-staging.invalid', 'ses-sim-1794485264883-i5a7c2', '2026-11-12T12:07:44.884Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264882-bwewq', 'builder089@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder089@kairos-staging.invalid', 'ses-sim-1794485264882-untp60', '2026-11-12T12:07:44.882Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264881-1sr5l', 'builder017@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder017@kairos-staging.invalid', 'ses-sim-1794485264881-jea4rd', '2026-11-12T12:07:44.881Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264880-9bsyb', 'builder011@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder011@kairos-staging.invalid', 'ses-sim-1794485264880-lvg4lz', '2026-11-12T12:07:44.880Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264879-jpg9i', 'builder088@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder088@kairos-staging.invalid', 'ses-sim-1794485264879-yqqo17', '2026-11-12T12:07:44.879Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264878-0l9dh', 'builder087@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder087@kairos-staging.invalid', 'ses-sim-1794485264877-00auxj', '2026-11-12T12:07:44.878Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264873-fnd59', 'builder086@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder086@kairos-staging.invalid', 'ses-sim-1794485264872-6ndds2', '2026-11-12T12:07:44.873Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264872-n6bn7', 'builder012@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder012@kairos-staging.invalid', 'ses-sim-1794485264871-vod5cw', '2026-11-12T12:07:44.872Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264870-1os78', 'builder085@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder085@kairos-staging.invalid', 'ses-sim-1794485264870-nngg08', '2026-11-12T12:07:44.870Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264869-94d6i', 'builder084@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder084@kairos-staging.invalid', 'ses-sim-1794485264868-vw8psa', '2026-11-12T12:07:44.869Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264867-0yv9y', 'builder083@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder083@kairos-staging.invalid', 'ses-sim-1794485264866-7466d7', '2026-11-12T12:07:44.867Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264865-udxgw', 'builder008@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder008@kairos-staging.invalid', 'ses-sim-1794485264865-h7za2j', '2026-11-12T12:07:44.865Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264864-smq9g', 'builder082@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder082@kairos-staging.invalid', 'ses-sim-1794485264863-kjzyh2', '2026-11-12T12:07:44.864Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264862-bxs02', 'builder081@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder081@kairos-staging.invalid', 'ses-sim-1794485264861-88iryh', '2026-11-12T12:07:44.862Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264860-bdan1', 'builder003@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder003@kairos-staging.invalid', 'ses-sim-1794485264859-yd9sx1', '2026-11-12T12:07:44.860Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485264858-feqmh', 'builder004@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder004@kairos-staging.invalid', 'ses-sim-1794485264857-c98z8n', '2026-11-12T12:07:44.858Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485263719-fe7fd', 'builder053@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T027 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', '1', 'checkin-confirm:KAIROS-T027:builder053@kairos-staging.invalid', 'ses-sim-1794485263717-5iymj6', '2026-11-12T12:07:43.719Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485262420-i91nz', 'builder053@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdi6uqj Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '1', 'abstract-decision:KAIROS-T027:SHORTLISTED', 'ses-sim-1794485262418-jo1q10', '2026-11-12T12:07:42.420Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485261381-3pdgh', 'builder099@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Titan AI mwdi6uqj', 'team-joining-confirmation', 'SIMULATED', '1', 'join-confirm:KAIROS-T027:builder099@kairos-staging.invalid', 'ses-sim-1794485261380-qggcdi', '2026-11-12T12:07:41.381Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485261191-0i8cb', 'builder099@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Titan AI mwdi6uqj [KAIROS-T027]', 'team-invitation', 'SIMULATED', '1', 'team-invite:KAIROS-T027:builder099@kairos-staging.invalid', 'ses-sim-1794485261191-vnoigi', '2026-11-12T12:07:41.191Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485260109-jp5uh', 'builder053@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Titan AI mwdi6uqj [KAIROS-T027]', 'team-creation', 'SIMULATED', '1', 'team-create:KAIROS-T027', 'ses-sim-1794485260108-4b8wfu', '2026-11-12T12:07:40.109Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485259301-oakqb', 'builder053@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '1', 'email-verify:builder053@kairos-staging.invalid', 'ses-sim-1794485259300-v413fz', '2026-11-12T12:07:39.301Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485257742-r3vdu', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485257205-9q3x-diff', 'ses-sim-1794485257741-z7oote', '2026-11-12T12:07:37.742Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485257472-ofzjc', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485257205-9q3x', 'ses-sim-1794485257334-1eisgt', '2026-11-12T12:07:37.472Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485257334-8caz2', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'idemp-test-1794485257205-9q3x', 'ses-sim-1794485257334-1eisgt', '2026-11-12T12:07:37.334Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159448-42d0t', 'builder098@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder098@kairos-staging.invalid', 'ses-sim-1794485159447-ctfk2d', '2026-11-12T12:05:59.448Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159447-7ka8z', 'builder052@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder052@kairos-staging.invalid', 'ses-sim-1794485159446-jwr1ht', '2026-11-12T12:05:59.447Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159446-cbj03', 'builder048@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder048@kairos-staging.invalid', 'ses-sim-1794485159445-574fnu', '2026-11-12T12:05:59.446Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159445-igy49', 'builder097@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder097@kairos-staging.invalid', 'ses-sim-1794485159444-3393u2', '2026-11-12T12:05:59.445Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159444-xlxkb', 'builder096@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder096@kairos-staging.invalid', 'ses-sim-1794485159443-wy7gtp', '2026-11-12T12:05:59.444Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159443-lgojj', 'builder095@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder095@kairos-staging.invalid', 'ses-sim-1794485159442-vwvvx3', '2026-11-12T12:05:59.443Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159437-8wxl3', 'builder049@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder049@kairos-staging.invalid', 'ses-sim-1794485159437-rvmbzq', '2026-11-12T12:05:59.437Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159436-5hykc', 'builder045@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder045@kairos-staging.invalid', 'ses-sim-1794485159436-8mqbes', '2026-11-12T12:05:59.436Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159435-rwgyg', 'builder044@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder044@kairos-staging.invalid', 'ses-sim-1794485159435-y9aov5', '2026-11-12T12:05:59.435Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159434-s4nkf', 'builder043@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder043@kairos-staging.invalid', 'ses-sim-1794485159433-mr8sch', '2026-11-12T12:05:59.434Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159433-f3o9i', 'builder042@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder042@kairos-staging.invalid', 'ses-sim-1794485159432-wey2a6', '2026-11-12T12:05:59.433Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159431-i73t8', 'builder041@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder041@kairos-staging.invalid', 'ses-sim-1794485159431-yy2qq2', '2026-11-12T12:05:59.431Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159430-b41cy', 'builder039@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder039@kairos-staging.invalid', 'ses-sim-1794485159430-hityrl', '2026-11-12T12:05:59.430Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159429-65p88', 'builder038@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder038@kairos-staging.invalid', 'ses-sim-1794485159429-3rou6k', '2026-11-12T12:05:59.429Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159428-x3y22', 'builder037@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder037@kairos-staging.invalid', 'ses-sim-1794485159428-rbighu', '2026-11-12T12:05:59.428Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159427-zxmxp', 'builder033@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder033@kairos-staging.invalid', 'ses-sim-1794485159426-f4j4em', '2026-11-12T12:05:59.427Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159421-149t7', 'builder094@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder094@kairos-staging.invalid', 'ses-sim-1794485159421-hhroth', '2026-11-12T12:05:59.421Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159420-qvvi3', 'builder093@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder093@kairos-staging.invalid', 'ses-sim-1794485159419-l2e69q', '2026-11-12T12:05:59.420Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159419-q5jmz', 'builder092@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder092@kairos-staging.invalid', 'ses-sim-1794485159418-nue22w', '2026-11-12T12:05:59.419Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159417-l2llu', 'builder034@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder034@kairos-staging.invalid', 'ses-sim-1794485159417-j3ato5', '2026-11-12T12:05:59.417Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159416-y1lm5', 'builder030@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder030@kairos-staging.invalid', 'ses-sim-1794485159416-f1yxcq', '2026-11-12T12:05:59.416Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159415-spn81', 'builder029@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder029@kairos-staging.invalid', 'ses-sim-1794485159414-2w04mf', '2026-11-12T12:05:59.415Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159414-9q8zd', 'builder028@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder028@kairos-staging.invalid', 'ses-sim-1794485159414-ob4vwa', '2026-11-12T12:05:59.414Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159413-x9thm', 'builder027@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder027@kairos-staging.invalid', 'ses-sim-1794485159413-6kwuuf', '2026-11-12T12:05:59.413Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159412-h3j5p', 'builder026@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder026@kairos-staging.invalid', 'ses-sim-1794485159412-vm1si3', '2026-11-12T12:05:59.412Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159411-aqaoc', 'builder024@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder024@kairos-staging.invalid', 'ses-sim-1794485159411-9xuh72', '2026-11-12T12:05:59.411Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159407-08ajj', 'builder019@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder019@kairos-staging.invalid', 'ses-sim-1794485159406-euuz41', '2026-11-12T12:05:59.407Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159405-hcu9r', 'builder018@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder018@kairos-staging.invalid', 'ses-sim-1794485159405-emd0mm', '2026-11-12T12:05:59.405Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159404-1bfoo', 'builder016@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder016@kairos-staging.invalid', 'ses-sim-1794485159404-abkd8v', '2026-11-12T12:05:59.404Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159403-wsmtr', 'builder091@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder091@kairos-staging.invalid', 'ses-sim-1794485159403-7sfwvw', '2026-11-12T12:05:59.403Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159402-5aw8t', 'builder090@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder090@kairos-staging.invalid', 'ses-sim-1794485159402-u1go5t', '2026-11-12T12:05:59.402Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159401-3rrrq', 'builder089@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder089@kairos-staging.invalid', 'ses-sim-1794485159401-10xswb', '2026-11-12T12:05:59.401Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159400-g128n', 'builder017@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder017@kairos-staging.invalid', 'ses-sim-1794485159400-ykes6n', '2026-11-12T12:05:59.400Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159399-a3vgb', 'builder011@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder011@kairos-staging.invalid', 'ses-sim-1794485159399-akl6i4', '2026-11-12T12:05:59.399Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159398-5tvaz', 'builder088@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder088@kairos-staging.invalid', 'ses-sim-1794485159398-jw319f', '2026-11-12T12:05:59.398Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159397-qx1e4', 'builder087@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder087@kairos-staging.invalid', 'ses-sim-1794485159397-iyffhm', '2026-11-12T12:05:59.397Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159394-cfl21', 'builder086@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder086@kairos-staging.invalid', 'ses-sim-1794485159394-lr3vjq', '2026-11-12T12:05:59.394Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159393-7q4hb', 'builder012@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder012@kairos-staging.invalid', 'ses-sim-1794485159393-w9bdqv', '2026-11-12T12:05:59.393Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159393-7m4dw', 'builder085@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder085@kairos-staging.invalid', 'ses-sim-1794485159392-rs6n0n', '2026-11-12T12:05:59.393Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159392-xzhv7', 'builder084@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder084@kairos-staging.invalid', 'ses-sim-1794485159392-6df0os', '2026-11-12T12:05:59.392Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159391-8y2sp', 'builder083@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder083@kairos-staging.invalid', 'ses-sim-1794485159391-n3h4ju', '2026-11-12T12:05:59.391Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159391-8rzds', 'builder008@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder008@kairos-staging.invalid', 'ses-sim-1794485159391-c4cc87', '2026-11-12T12:05:59.391Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159390-z5wqr', 'builder082@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder082@kairos-staging.invalid', 'ses-sim-1794485159390-qny4yu', '2026-11-12T12:05:59.390Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159388-ijtg6', 'builder081@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder081@kairos-staging.invalid', 'ses-sim-1794485159388-u2llo8', '2026-11-12T12:05:59.388Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159387-d7097', 'builder003@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder003@kairos-staging.invalid', 'ses-sim-1794485159387-k5v6w6', '2026-11-12T12:05:59.387Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485159386-qebnp', 'builder004@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening', 'event-announcement', 'SIMULATED', '1', 'announcement:Grand Finale Opening:builder004@kairos-staging.invalid', 'ses-sim-1794485159386-ez4rhv', '2026-11-12T12:05:59.386Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485148086-3uqna', 'builder109@kairos-staging.invalid', 'test subject', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '1', 'CUSTOM_ADMIN_MESSAGE:builder109@kairos-staging.invalid:dGVzdCBzdWJqZWN0', 'ses-sim-1794485148086-1g6h9c', '2026-11-12T12:05:48.086Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485119958-eftom', 'builder109@kairos-staging.invalid', 'test subject', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '3', 'CUSTOM_ADMIN_MESSAGE:builder109@kairos-staging.invalid:dGVzdCBzdWJqZWN0', NULL, '2026-11-12T12:05:19.958Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036535-6e2wb', 'builder052@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder052@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.535Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036522-pj1lu', 'builder098@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder098@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.522Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036502-gxiqo', 'builder048@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder048@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.502Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036478-2e1yj', 'builder096@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder096@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.478Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036437-svm9q', 'builder097@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder097@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.438Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036416-knrek', 'builder095@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder095@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.416Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036212-v9880', 'builder049@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder049@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.212Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036201-gah7x', 'builder045@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder045@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.201Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036192-ga1io', 'builder044@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder044@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.192Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036186-ka293', 'builder043@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder043@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.186Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036176-tbcg1', 'builder042@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder042@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.176Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036169-3m5bw', 'builder041@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder041@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.169Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036162-pybdi', 'builder039@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder039@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.162Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036155-r2dye', 'builder038@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder038@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.155Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036149-ilrkr', 'builder037@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder037@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.149Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485036139-sj2xu', 'builder033@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder033@kairos-staging.invalid', NULL, '2026-11-12T12:03:56.139Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035976-03cj4', 'builder024@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder024@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.976Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035971-5x8zg', 'builder094@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder094@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.971Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035966-tlq0a', 'builder093@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder093@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.966Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035960-6c0v2', 'builder092@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder092@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.960Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035917-5cvz9', 'builder034@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder034@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.917Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035904-wnztt', 'builder030@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder030@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.904Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035897-phjhc', 'builder029@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder029@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.897Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035891-fk343', 'builder028@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder028@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.891Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035884-ic2d7', 'builder027@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder027@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.884Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035872-qqzmf', 'builder026@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder026@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.872Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035653-dy5g9', 'builder087@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder087@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.653Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035615-ckw61', 'builder019@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder019@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.615Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035608-dh089', 'builder018@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder018@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.608Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035568-rip15', 'builder016@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder016@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.568Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035561-slv9m', 'builder091@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder091@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.561Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035555-ai6g7', 'builder090@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder090@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.555Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035547-fay0j', 'builder089@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder089@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.547Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035539-kngo4', 'builder017@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder017@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.539Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035532-0unuh', 'builder011@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder011@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.532Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035524-qhl6e', 'builder088@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder088@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.524Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485035062-cbcqo', 'builder082@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder082@kairos-staging.invalid', NULL, '2026-11-12T12:03:55.062Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485034622-ggimg', 'builder081@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder081@kairos-staging.invalid', NULL, '2026-11-12T12:03:54.622Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485034612-o0vgq', 'builder084@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder084@kairos-staging.invalid', NULL, '2026-11-12T12:03:54.612Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485034545-npxal', 'builder008@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder008@kairos-staging.invalid', NULL, '2026-11-12T12:03:54.546Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485034072-fibt8', 'builder083@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder083@kairos-staging.invalid', NULL, '2026-11-12T12:03:54.072Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485034025-eizos', 'builder012@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder012@kairos-staging.invalid', NULL, '2026-11-12T12:03:54.025Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485033910-xf5eb', 'builder086@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder086@kairos-staging.invalid', NULL, '2026-11-12T12:03:53.910Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485033902-5k6n5', 'builder003@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder003@kairos-staging.invalid', NULL, '2026-11-12T12:03:53.903Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485033852-8b7f1', 'builder085@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder085@kairos-staging.invalid', NULL, '2026-11-12T12:03:53.852Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485033720-ibdpa', 'builder004@kairos-staging.invalid', '⚡ KAIROS 2027 — Grand Finale Opening Ceremony & Keynote by AWS', 'event-announcement', 'SIMULATED', '3', 'announcement:Grand Finale Opening Ceremony & Keynote by AWS:builder004@kairos-staging.invalid', NULL, '2026-11-12T12:03:53.720Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485033210-grxr2', 'builder052@kairos-staging.invalid', 'KAIROS 2027 — Arena Check-in Confirmed: KAIROS-T026 [BAY-D09 (Auditorium Bay 3)]', 'checkin-confirmation', 'SIMULATED', '3', 'checkin-confirm:KAIROS-T026:builder052@kairos-staging.invalid', NULL, '2026-11-12T12:03:53.210Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485032507-90mpe', 'builder052@kairos-staging.invalid', '🎉 KAIROS 2027 — Official Selection: Titan AI mwdi1tle Qualified for On-Campus Finals!', 'abstract-review-decision', 'SIMULATED', '3', 'abstract-decision:KAIROS-T026:SHORTLISTED', NULL, '2026-11-12T12:03:52.507Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485031115-2g7za', 'builder098@kairos-staging.invalid', 'KAIROS 2027 — Successfully Joined Titan AI mwdi1tle', 'team-joining-confirmation', 'SIMULATED', '3', 'join-confirm:KAIROS-T026:builder098@kairos-staging.invalid', NULL, '2026-11-12T12:03:51.115Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485030770-2ntje', 'builder052@kairos-staging.invalid', 'KAIROS 2027 — Squad Created: Titan AI mwdi1tle [KAIROS-T026]', 'team-creation', 'SIMULATED', '3', 'team-create:KAIROS-T026', NULL, '2026-11-12T12:03:50.770Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485030750-e88mh', 'builder098@kairos-staging.invalid', 'KAIROS 2027 — Invitation to Join Titan AI mwdi1tle [KAIROS-T026]', 'team-invitation', 'SIMULATED', '3', 'team-invite:KAIROS-T026:builder098@kairos-staging.invalid', NULL, '2026-11-12T12:03:50.750Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485026743-6it8p', 'builder052@kairos-staging.invalid', 'Verify Your KAIROS 2027 Student Builder Identity', 'email-verification', 'SIMULATED', '3', 'email-verify:builder052@kairos-staging.invalid', NULL, '2026-11-12T12:03:46.743Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485022999-25oy4', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 2', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '3', 'idemp-test-1794485020156-elsf-diff', NULL, '2026-11-12T12:03:42.999Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485021230-r4cbb', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '3', 'idemp-test-1794485020156-elsf', NULL, '2026-11-12T12:03:41.230Z')
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES ('notif-1794485020937-8n8kw', 'builder107@kairos-staging.invalid', 'KAIROS 2027 Idempotency Verification 1', 'CUSTOM_ADMIN_MESSAGE', 'SIMULATED', '3', 'idemp-test-1794485020156-elsf', NULL, '2026-11-12T12:03:40.937Z')
ON CONFLICT (id) DO NOTHING;

COMMIT;
