/**
 * KAIROS 2027 — STAGING DATA PRIVACY SANITIZATION UTILITY (OPTION A)
 * 
 * Generates an isolated, fully anonymized synthetic seed SQL dataset
 * for the staging environment.
 * 
 * Privacy Protection Principles:
 *  1. Zero Real Student PII: Names, phone numbers, college registration numbers,
 *     and institutional emails are replaced with synthetic placeholders.
 *  2. Safe Deterministic Passwords: Real user password hashes are replaced with
 *     a known staging password hash ("StagingTest2027!") to enable testing.
 *  3. Protected Judge PINs: Judge access PINs are salted and hashed with PBKDF2-SHA512.
 *  4. Full Relational Integrity: Preserves 100% of foreign keys, 43 teams,
 *     8 evaluations, rubric scores, and 144 unified profile records.
 * 
 * Output:
 *  - supabase/seed_sanitized_staging.sql
 *  - data/staging_sanitization_summary.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const STORE_PATH = path.join(__dirname, '..', 'data', 'kairos_store.json');
const SANITIZED_SQL_PATH = path.join(__dirname, '..', 'supabase', 'seed_sanitized_staging.sql');
const SUMMARY_PATH = path.join(__dirname, '..', 'data', 'staging_sanitization_summary.json');

// Helper to escape SQL strings safely
function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

// Helper to create a salted PBKDF2-SHA512 hash (100k iterations)
function generatePbkdf2Hash(secret) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(secret, salt, 100_000, 64, 'sha512').toString('hex');
  return `${salt}:${derivedKey}`;
}

function runSanitization() {
  console.log('================================================================');
  console.log('   KAIROS 2027 — STAGING DATA PRIVACY SANITIZATION UTILITY      ');
  console.log('================================================================');

  if (!fs.existsSync(STORE_PATH)) {
    console.error('Fatal: Source store not found at', STORE_PATH);
    process.exit(1);
  }

  const raw = fs.readFileSync(STORE_PATH, 'utf8');
  const store = JSON.parse(raw);

  const STAGING_DEFAULT_PASSWORD_HASH = generatePbkdf2Hash('StagingTest2027!');

  // Maps to maintain relational consistency across entities
  const emailMapping = new Map(); // originalEmail -> sanitizedEmail
  const nameMapping = new Map();  // originalEmail -> sanitizedName

  let studentIdx = 1;
  let waitlistIdx = 1;

  function getSanitizedEmail(originalEmail, type = 'builder') {
    if (!originalEmail) return null;
    const norm = originalEmail.trim().toLowerCase();
    if (!emailMapping.has(norm)) {
      const idx = type === 'builder' ? studentIdx++ : waitlistIdx++;
      const sanitized = `${type}${String(idx).padStart(3, '0')}@kairos-staging.invalid`;
      emailMapping.set(norm, sanitized);
      nameMapping.set(norm, `Staging ${type === 'builder' ? 'Builder' : 'Candidate'} ${idx}`);
    }
    return emailMapping.get(norm);
  }

  function getSanitizedName(originalEmail, originalName) {
    if (!originalEmail) return originalName || 'Staging Contender';
    const norm = originalEmail.trim().toLowerCase();
    if (nameMapping.has(norm)) return nameMapping.get(norm);
    return originalName || 'Staging Contender';
  }

  // Pre-seed email mappings for studentAccounts
  for (const s of (store.studentAccounts || [])) {
    getSanitizedEmail(s.email, 'builder');
  }

  // Pre-seed email mappings for waitlist
  for (const w of (store.waitlist || [])) {
    getSanitizedEmail(w.email, 'waitlist');
  }

  // 1. Build Synthesized Profiles
  const profilesMap = new Map(); // sanitizedEmail -> profile

  function getOrCreateProfile(origEmail, defaults = {}) {
    const sanitizedEmail = getSanitizedEmail(origEmail, defaults.type || 'builder');
    if (!sanitizedEmail) return null;

    if (profilesMap.has(sanitizedEmail)) {
      const existing = profilesMap.get(sanitizedEmail);
      if (!existing.phone && defaults.phone) {
        existing.phone = `+91 98000 ${String(existing.profileNumber).padStart(5, '0')}`;
      }
      if (!existing.collegeRegNo && (defaults.collegeRegNo || defaults.college)) {
        existing.collegeRegNo = `STG-2027-${String(existing.profileNumber).padStart(3, '0')}`;
      }
      if (!existing.tshirtSize && (defaults.tshirtSize || defaults.tShirtSize)) {
        existing.tshirtSize = defaults.tshirtSize || defaults.tShirtSize;
      }
      if (defaults.passwordHash && !existing.passwordHash) {
        existing.passwordHash = STAGING_DEFAULT_PASSWORD_HASH;
      }
      if (defaults.emailVerified) {
        existing.emailVerified = true;
      }
      return existing;
    }

    const profileNumber = profilesMap.size + 1;
    const id = defaults.id || ('prof-' + crypto.createHash('sha256').update(sanitizedEmail).digest('hex').substring(0, 16));
    const newProfile = {
      id,
      profileNumber,
      email: sanitizedEmail,
      fullName: getSanitizedName(origEmail, defaults.fullName),
      phone: defaults.phone ? `+91 98000 ${String(profileNumber).padStart(5, '0')}` : null,
      institution: defaults.institution || defaults.college || 'Sathyabama Institute of Science and Technology',
      collegeRegNo: (defaults.collegeRegNo || defaults.college) ? `STG-2027-${String(profileNumber).padStart(3, '0')}` : null,
      yearOfStudy: defaults.yearOfStudy || '3rd Year',
      department: defaults.department || 'Computer Science and Engineering',
      portfolioUrl: defaults.portfolioUrl ? `https://staging-portfolio.example.com/${id}` : null,
      githubUrl: `https://github.com/staging-builder-${profileNumber}`,
      linkedinUrl: `https://linkedin.com/in/staging-builder-${profileNumber}`,
      meetupProfileUrl: defaults.meetupProfileUrl ? `https://meetup.com/members/stg-${profileNumber}` : null,
      meetupMemberId: defaults.meetupMemberId ? `stg-mem-${profileNumber}` : null,
      meetupRsvpVerified: Boolean(defaults.meetupRsvpVerified),
      awsBuilderCenterUrl: defaults.awsBuilderCenterUrl ? `https://builder.aws.com/stg-${profileNumber}` : null,
      tshirtSize: defaults.tshirtSize || defaults.tShirtSize || 'L',
      hoodieSize: defaults.hoodieSize || null,
      passwordHash: defaults.passwordHash ? STAGING_DEFAULT_PASSWORD_HASH : null,
      emailVerified: Boolean(defaults.emailVerified),
      emailVerifiedAt: defaults.emailVerifiedAt || (defaults.emailVerified ? new Date().toISOString() : null),
      lastLoginAt: defaults.lastLoginAt || null,
      passwordResetToken: null, // Clear reset tokens for staging
      passwordResetExpiresAt: null,
      createdAt: defaults.createdAt || new Date().toISOString()
    };

    profilesMap.set(sanitizedEmail, newProfile);
    return newProfile;
  }

  // Ingest students
  for (const s of (store.studentAccounts || [])) {
    getOrCreateProfile(s.email, {
      id: s.id,
      fullName: s.fullName,
      phone: s.phone,
      institution: s.institution,
      yearOfStudy: s.yearOfStudy,
      department: s.department,
      tshirtSize: s.tshirtSize,
      passwordHash: true,
      emailVerified: s.emailVerified !== false,
      type: 'builder'
    });
  }

  // Ingest waitlist
  for (const w of (store.waitlist || [])) {
    getOrCreateProfile(w.email, {
      fullName: w.fullName,
      phone: w.phone,
      institution: w.institution || w.college,
      yearOfStudy: w.yearOfStudy,
      department: w.department,
      tshirtSize: w.tShirtSize,
      emailVerified: false,
      type: 'waitlist'
    });
  }

  // Ingest team members
  for (const t of (store.teams || [])) {
    if (t.leaderEmail) {
      getOrCreateProfile(t.leaderEmail, {
        fullName: t.teamName + ' Leader',
        institution: t.institutionName,
        type: 'builder'
      });
    }
    for (const m of (t.members || [])) {
      getOrCreateProfile(m.email, {
        fullName: m.name,
        phone: m.phone,
        collegeRegNo: m.collegeRegNo,
        college: m.college,
        tshirtSize: m.tshirtSize,
        type: 'builder'
      });
    }
  }

  // Ingest referrals
  for (const r of (store.referrals || [])) {
    const refEmail = r.referrerEmail || r.studentEmail;
    if (refEmail) {
      getOrCreateProfile(refEmail, {
        fullName: r.referrerName || r.studentName,
        phone: r.referrerPhone,
        college: r.referrerCollege,
        type: 'builder'
      });
    }
  }

  console.log(`✓ Synthesized ${profilesMap.size} sanitized profiles.`);

  // 2. Generate SQL lines
  const sql = [];
  sql.push('/*');
  sql.push('================================================================================');
  sql.push('   KAIROS 2027 — ANONYMIZED STAGING SEED DATASET (OPTION A)');
  sql.push('   Generated on: ' + new Date().toISOString());
  sql.push('   Environment: Staging (Completely Sanitized - Zero Production PII)');
  sql.push('   Default Password for all Student Accounts: StagingTest2027!');
  sql.push('================================================================================');
  sql.push('*/\n');

  sql.push('BEGIN;\n');

  // Insert Profiles
  sql.push('-- 1. SANITIZED PROFILES');
  for (const p of profilesMap.values()) {
    sql.push(`INSERT INTO public.profiles (id, email, full_name, phone, institution, college_reg_no, year_of_study, department, portfolio_url, github_url, linkedin_url, meetup_profile_url, meetup_member_id, meetup_rsvp_verified, aws_builder_center_url, tshirt_size, hoodie_size, password_hash, email_verified, email_verified_at, last_login_at, created_at)
VALUES (${escapeSql(p.id)}, ${escapeSql(p.email)}, ${escapeSql(p.fullName)}, ${escapeSql(p.phone)}, ${escapeSql(p.institution)}, ${escapeSql(p.collegeRegNo)}, ${escapeSql(p.yearOfStudy)}, ${escapeSql(p.department)}, ${escapeSql(p.portfolioUrl)}, ${escapeSql(p.githubUrl)}, ${escapeSql(p.linkedinUrl)}, ${escapeSql(p.meetupProfileUrl)}, ${escapeSql(p.meetupMemberId)}, ${escapeSql(p.meetupRsvpVerified)}, ${escapeSql(p.awsBuilderCenterUrl)}, ${escapeSql(p.tshirtSize)}, ${escapeSql(p.hoodieSize)}, ${escapeSql(p.passwordHash)}, ${escapeSql(p.emailVerified)}, ${escapeSql(p.emailVerifiedAt)}, ${escapeSql(p.lastLoginAt)}, ${escapeSql(p.createdAt)})
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  password_hash = COALESCE(EXCLUDED.password_hash, public.profiles.password_hash),
  email_verified = COALESCE(EXCLUDED.email_verified, public.profiles.email_verified),
  updated_at = timezone('utc'::text, now());`);
  }
  sql.push('');

  // Insert Waitlist
  sql.push('-- 2. SANITIZED WAITLIST');
  for (const w of (store.waitlist || [])) {
    const sEmail = getSanitizedEmail(w.email, 'waitlist');
    const p = profilesMap.get(sEmail);
    sql.push(`INSERT INTO public.waitlist (id, profile_id, full_name, email, phone, institution, year_of_study, department, preferred_track, status, created_at)
VALUES (${escapeSql(w.id)}, ${escapeSql(p?.id)}, ${escapeSql(p?.fullName)}, ${escapeSql(sEmail)}, ${escapeSql(p?.phone)}, ${escapeSql(p?.institution)}, ${escapeSql(p?.yearOfStudy)}, ${escapeSql(p?.department)}, ${escapeSql(w.preferredTrack || 'AI & Cloud Infrastructure')}, ${escapeSql(w.status || 'PENDING')}, ${escapeSql(w.createdAt)})
ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status;`);
  }
  sql.push('');

  // Insert Teams & Team Members
  sql.push('-- 3. TEAMS & MEMBERS');
  for (const t of (store.teams || [])) {
    const leaderEmail = getSanitizedEmail(t.leaderEmail, 'builder');
    sql.push(`INSERT INTO public.teams (id, team_name, team_code, invite_code, track, problem_statement, selection_stage, checked_in, checked_in_at, created_at)
VALUES (${escapeSql(t.id)}, ${escapeSql(t.teamName)}, ${escapeSql(t.teamCode)}, ${escapeSql(t.inviteCode)}, ${escapeSql(t.track || 'AI')}, ${escapeSql(t.problemStatement)}, ${escapeSql(t.selectionStage || 'QUALIFIER')}, ${Boolean(t.checkedIn)}, ${escapeSql(t.checkedInAt)}, ${escapeSql(t.createdAt)})
ON CONFLICT (id) DO UPDATE SET selection_stage = EXCLUDED.selection_stage;`);

    for (const m of (t.members || [])) {
      const mEmail = getSanitizedEmail(m.email, 'builder');
      const p = profilesMap.get(mEmail);
      sql.push(`INSERT INTO public.team_members (id, team_id, profile_id, member_name, email, role, joined_at)
VALUES (${escapeSql(m.id || ('tm-' + crypto.randomUUID()))}, ${escapeSql(t.id)}, ${escapeSql(p?.id)}, ${escapeSql(p?.fullName)}, ${escapeSql(mEmail)}, ${escapeSql(m.role || 'MEMBER')}, ${escapeSql(m.joinedAt || new Date().toISOString())})
ON CONFLICT (id) DO NOTHING;`);
    }
  }
  sql.push('');

  // Insert Judges with Salted PBKDF2 Hashed PINs
  sql.push('-- 4. SANITIZED JUDGES (SALTED PBKDF2 HASHED PINS)');
  const stagingJudgePins = ['111111', '222222', '333333'];
  (store.judges || []).forEach((j, idx) => {
    const rawPin = stagingJudgePins[idx % stagingJudgePins.length];
    const hashedPin = generatePbkdf2Hash(rawPin);
    sql.push(`INSERT INTO public.judges (id, access_pin, full_name, organization, designation, track_specialization, assigned_hall, is_active, created_at)
VALUES (${escapeSql(j.id)}, ${escapeSql(hashedPin)}, ${escapeSql(`Staging Judge ${idx + 1}`)}, ${escapeSql(`Staging Entity ${idx + 1}`)}, ${escapeSql('Senior Technical Jury')}, ${escapeSql(j.trackSpecialization || 'AI')}, ${escapeSql(j.assignedHall || 'Hall A')}, ${escapeSql(j.isActive ?? true)}, ${escapeSql(j.createdAt)})
ON CONFLICT (id) DO UPDATE SET access_pin = EXCLUDED.access_pin;`);
  });
  sql.push('');

  // Insert Evaluations
  sql.push('-- 5. EVALUATIONS');
  for (const e of (store.evaluations || [])) {
    // Resolve canonical team id
    const cleanTeamId = e.teamId?.trim();
    const matchedTeam = (store.teams || []).find(t => t.id === cleanTeamId || t.teamCode === cleanTeamId);
    const targetTeamId = matchedTeam ? matchedTeam.id : e.teamId;

    sql.push(`INSERT INTO public.evaluations (id, team_id, judge_id, checkpoint_gate, criterion1_score, criterion2_score, criterion3_score, criterion4_score, raw_total_score, normalized_z_score, qualitative_feedback, recused_conflict, evaluated_at)
VALUES (${escapeSql(e.id)}, ${escapeSql(targetTeamId)}, ${escapeSql(e.judgeId)}, ${escapeSql(e.checkpointGate)}, ${escapeSql(e.criterion1Score)}, ${escapeSql(e.criterion2Score)}, ${escapeSql(e.criterion3Score)}, ${escapeSql(e.criterion4Score)}, ${escapeSql(e.rawTotalScore)}, ${escapeSql(e.normalizedZScore)}, ${escapeSql('Sanitized staging evaluation feedback.')}, ${escapeSql(Boolean(e.recusedConflict))}, ${escapeSql(e.evaluatedAt)})
ON CONFLICT (team_id, judge_id, checkpoint_gate) DO NOTHING;`);
  }
  sql.push('');

  // Insert Feature Flags
  sql.push('-- 6. FEATURE FLAGS');
  sql.push(`INSERT INTO public.feature_flags (id, registration_open, waitlist_mode, submissions_open, results_announced, updated_at)
VALUES ('default_flags', true, false, true, false, timezone('utc'::text, now()))
ON CONFLICT (id) DO UPDATE SET registration_open = EXCLUDED.registration_open;`);
  sql.push('');

  // Insert Sanitized Notification Logs
  sql.push('-- 7. SANITIZED NOTIFICATION LOGS');
  for (const n of (store.notificationLogs || [])) {
    const sEmail = getSanitizedEmail(n.to, 'builder');
    let sanitizedIdempotencyKey = n.idempotencyKey;
    if (sanitizedIdempotencyKey && sEmail) {
      sanitizedIdempotencyKey = sanitizedIdempotencyKey.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, sEmail);
    }
    sql.push(`INSERT INTO public.notification_logs (id, recipient, subject, template, status, attempts, idempotency_key, message_id, created_at)
VALUES (${escapeSql(n.id)}, ${escapeSql(sEmail)}, ${escapeSql(n.subject || 'Staging Notification')}, ${escapeSql(n.template || 'welcome')}, 'SIMULATED', ${escapeSql(n.attempts || 1)}, ${escapeSql(sanitizedIdempotencyKey)}, ${escapeSql(n.messageId)}, ${escapeSql(n.timestamp || new Date().toISOString())})
ON CONFLICT (id) DO NOTHING;`);
  }
  sql.push('');

  sql.push('COMMIT;\n');

  const finalSql = sql.join('\n');
  fs.writeFileSync(SANITIZED_SQL_PATH, finalSql, 'utf8');

  const summary = {
    generatedAt: new Date().toISOString(),
    mode: 'OPTION_A_SANITIZED_STAGING_SEED',
    totalProfilesSynthesized: profilesMap.size,
    totalTeams: (store.teams || []).length,
    totalEvaluations: (store.evaluations || []).length,
    totalNotificationLogs: (store.notificationLogs || []).length,
    anonymizedAttributes: [
      'student_full_name',
      'email_addresses',
      'telephone_numbers',
      'college_registration_numbers',
      'github_and_linkedin_urls',
      'judge_access_pins_hashed_with_pbkdf2',
      'password_hashes_standardized_to_staging_secret'
    ],
    stagingStudentCredentials: {
      emailPattern: 'builder[001-080]@kairos-staging.invalid',
      password: 'StagingTest2027!'
    },
    stagingJudgeCredentials: {
      pins: ['111111', '222222', '333333']
    },
    outputFile: SANITIZED_SQL_PATH
  };

  fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2), 'utf8');

  console.log(`✓ Successfully generated sanitized staging seed SQL:`);
  console.log(`  ${SANITIZED_SQL_PATH} (${(finalSql.length / 1024).toFixed(1)} KB)`);
  console.log(`✓ Privacy summary written to:`);
  console.log(`  ${SUMMARY_PATH}`);
  console.log('================================================================');
  console.log('         STAGING PRIVACY SANITIZATION COMPLETED                 ');
  console.log('================================================================\n');
}

if (require.main === module) {
  runSanitization();
}

module.exports = { runSanitization };
