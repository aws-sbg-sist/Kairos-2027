/**
 * KAIROS 2027 — POSTGRESQL REPOSITORY IMPLEMENTATION
 * 
 * Provides production-grade PostgreSQL CRUD operations using Supabase.
 * Maps relational tables (profiles, waitlist, teams, team_members, etc.)
 * back to existing domain models defined in src/types/index.ts.
 */

import { getSupabaseAdminClient, isSupabaseConfigured } from './supabase';
import { sanitizeCsvCell } from './csv';
import crypto from 'crypto';
import { verifyJudgePinMatch, hashJudgePin } from './judge_auth';
import {
  hashPassword,
  verifyPassword,
  generateVerificationToken,
  verifyEmailToken,
  generatePasswordResetToken,
  verifyPasswordResetToken
} from './student_auth';
import {
  WaitlistEntry,
  SponsorInquiry,
  SponsorReferralLead,
  FeatureFlags,
  AuditLog,
  ParticipantTeam,
  TeamMember,
  TeamRadarSignal,
  Judge,
  CheckpointEvaluation,
  CSATResponse,
  OrgMember,
  LeaderboardEntry,
  StudentAccount,
  NotificationLog
} from '../types';

function profileToStudentAccount(row: any): StudentAccount {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    passwordHash: row.password_hash || '',
    emailVerified: Boolean(row.email_verified),
    emailVerifiedAt: row.email_verified_at || undefined,
    institution: row.institution || 'Sathyabama Institute of Science and Technology',
    phone: row.phone || undefined,
    collegeRegNo: row.college_reg_no || undefined,
    yearOfStudy: row.year_of_study || undefined,
    department: row.department || undefined,
    portfolioUrl: row.portfolio_url || undefined,
    githubUrl: row.github_url || undefined,
    linkedinUrl: row.linkedin_url || undefined,
    tshirtSize: row.tshirt_size || undefined,
    createdAt: row.created_at || new Date().toISOString(),
    lastLoginAt: row.last_login_at || undefined,
  };
}

function referralRowToLead(row: any): SponsorReferralLead {
  return {
    id: row.id,
    referralCode: row.referral_code,
    referrerName: row.referrer_name,
    referrerEmail: row.referrer_email,
    referrerPhone: row.referrer_phone,
    referrerCollege: row.referrer_college,
    referrerUpiId: row.referrer_upi_id,
    companyName: row.company_name,
    decisionMakerName: row.decision_maker_name,
    decisionMakerEmail: row.decision_maker_email,
    decisionMakerDesignation: row.decision_maker_designation,
    companyPocName: row.company_poc_name,
    companyPocRole: row.company_poc_role,
    companyPocContact: row.company_poc_contact,
    targetTier: row.target_tier,
    introContext: row.intro_context,
    estimatedDealTier: row.estimated_deal_tier,
    notes: row.notes,
    lockExpiryDate: row.lock_expiry_date,
    status: row.status,
    commissionRate: row.commission_rate,
    estimatedPayout: row.estimated_payout,
    payoutAmount: row.payout_amount,
    submittedAt: row.submitted_at
  };
}

function evaluationRowToEntity(row: any): CheckpointEvaluation {
  return {
    id: row.id,
    teamId: row.team_id,
    judgeId: row.judge_id,
    checkpointGate: row.checkpoint_gate,
    criterion1Score: Number(row.criterion1_score),
    criterion2Score: Number(row.criterion2_score),
    criterion3Score: Number(row.criterion3_score),
    criterion4Score: Number(row.criterion4_score),
    rawTotalScore: Number(row.raw_total_score),
    normalizedZScore: row.normalized_z_score ? Number(row.normalized_z_score) : undefined,
    qualitativeFeedback: row.qualitative_feedback,
    recusedConflict: Boolean(row.recused_conflict),
    evaluatedAt: row.evaluated_at
  };
}

export const postgresDb = {
  isAvailable(): boolean {
    return isSupabaseConfigured();
  },

  // --------------------------------------------------------------------------
  // 1. PROFILES
  // --------------------------------------------------------------------------
  async upsertProfile(profileData: {
    email: string;
    fullName: string;
    phone?: string;
    institution?: string;
    yearOfStudy?: string;
    department?: string;
    portfolioUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    tshirtSize?: string;
  }) {
    const supabase = getSupabaseAdminClient();
    if (!supabase) throw new Error('Supabase client not configured');

    const normEmail = profileData.email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        email: normEmail,
        full_name: profileData.fullName,
        phone: profileData.phone || null,
        institution: profileData.institution || 'Sathyabama Institute of Science and Technology',
        year_of_study: profileData.yearOfStudy || null,
        department: profileData.department || null,
        portfolio_url: profileData.portfolioUrl || null,
        github_url: profileData.githubUrl || null,
        linkedin_url: profileData.linkedinUrl || null,
        tshirt_size: profileData.tshirtSize || null,
      }, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw new Error(`Failed to upsert profile: ${error.message}`);
    return data;
  },

  async getProfileByEmail(email: string) {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();
    if (error || !data) return null;
    return data;
  },

  // --------------------------------------------------------------------------
  // 2. WAITLIST
  // --------------------------------------------------------------------------
  async getWaitlist(): Promise<WaitlistEntry[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Waitlist fetch error: ${error.message}`);
    return (data || []).map((row: any) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      institution: row.institution,
      yearOfStudy: row.year_of_study,
      department: row.department,
      preferredTrack: row.preferred_track,
      portfolioUrl: row.portfolio_url,
      motivation: row.motivation,
      teamStatus: row.team_status,
      teamCode: row.team_code,
      experienceLevel: row.experience_level,
      tShirtSize: row.tshirt_size,
      status: row.status,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      createdAt: row.created_at
    }));
  },

  async addWaitlistEntry(entry: Omit<WaitlistEntry, 'id' | 'createdAt'>): Promise<{ success: boolean; entry?: WaitlistEntry; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database not configured' };

    try {
      // 1. Sync or create unified profile
      const profile = await this.upsertProfile({
        email: entry.email,
        fullName: entry.fullName,
        phone: entry.phone,
        institution: entry.institution || entry.college,
        yearOfStudy: entry.yearOfStudy,
        department: entry.department,
        portfolioUrl: entry.portfolioUrl,
        githubUrl: entry.githubUrl,
        linkedinUrl: entry.linkedinUrl,
        tshirtSize: entry.tShirtSize
      });

      // 2. Insert into waitlist table
      const id = `w-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const { data, error } = await supabase
        .from('waitlist')
        .insert({
          id,
          profile_id: profile ? profile.id : null,
          full_name: entry.fullName.trim(),
          email: entry.email.trim().toLowerCase(),
          phone: entry.phone?.trim() || null,
          institution: (entry.institution || entry.college || 'Sathyabama Institute of Science and Technology').trim(),
          year_of_study: entry.yearOfStudy,
          department: entry.department.trim(),
          preferred_track: entry.preferredTrack,
          portfolio_url: entry.portfolioUrl?.trim() || null,
          motivation: entry.motivation?.trim() || null,
          team_status: entry.teamStatus || 'seeking_team',
          team_code: entry.teamCode?.trim().toUpperCase() || null,
          experience_level: entry.experienceLevel || 'intermediate',
          tshirt_size: entry.tShirtSize || null,
          status: 'pending',
          ip_address: entry.ipAddress || null,
          user_agent: entry.userAgent || null
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return {
        success: true,
        entry: {
          id: data.id,
          fullName: data.full_name,
          email: data.email,
          phone: data.phone,
          institution: data.institution,
          yearOfStudy: data.year_of_study,
          department: data.department,
          preferredTrack: data.preferred_track,
          portfolioUrl: data.portfolio_url,
          motivation: data.motivation,
          teamStatus: data.team_status,
          teamCode: data.team_code,
          experienceLevel: data.experience_level,
          tShirtSize: data.tshirt_size,
          status: data.status,
          createdAt: data.created_at
        }
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  async updateWaitlistStatus(id: string, status: WaitlistEntry['status'], updatedBy?: string): Promise<boolean> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return false;

    const { error } = await supabase
      .from('waitlist')
      .update({ status })
      .eq('id', id);

    if (error) return false;

    if (updatedBy) {
      await this.addAuditLog(updatedBy, 'UPDATE_WAITLIST_STATUS', `Updated waitlist entry ${id} to ${status}`);
    }
    return true;
  },

  // --------------------------------------------------------------------------
  // 3. TEAMS & TEAM MEMBERS
  // --------------------------------------------------------------------------
  async getTeams(): Promise<ParticipantTeam[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data: teamsData, error: teamsError } = await supabase
      .from('teams')
      .select('*, team_members(*)');

    if (teamsError) throw new Error(`Teams fetch error: ${teamsError.message}`);

    return (teamsData || []).map((t: any) => ({
      id: t.id,
      teamCode: t.team_code,
      teamName: t.team_name,
      inviteCode: t.invite_code,
      trackId: t.track_id,
      institutionName: t.institution_name,
      city: t.city,
      state: t.state,
      leaderEmail: t.leader_email,
      selectionStage: t.selection_stage,
      status: t.status,
      members: (t.team_members || []).map((m: any) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        collegeRegNo: m.college_reg_no,
        role: m.role,
        college: m.college,
        meetupProfileUrl: m.meetup_profile_url,
        meetupMemberId: m.meetup_member_id,
        meetupRsvpVerified: m.meetup_rsvp_verified,
        awsBuilderCenterUrl: m.aws_builder_center_url,
        tshirtSize: m.tshirt_size,
        hoodieSize: m.hoodie_size,
        busRoute: m.bus_route,
        confirmed: m.confirmed
      })),
      problemTitle: t.problem_title,
      problemAbstract: t.problem_abstract,
      projectTitle: t.project_title,
      projectAbstract: t.project_abstract,
      architecturePdfUrl: t.architecture_pdf_url,
      githubUrl: t.github_url,
      commitWebhookSecret: t.commit_webhook_secret,
      loomVideoUrl: t.loom_video_url,
      onlineQualifierScore: t.online_qualifier_score ? Number(t.online_qualifier_score) : undefined,
      onlineDefenseSlot: t.online_defense_slot,
      onlineMeetRoomId: t.online_meet_room_id,
      deskBayAllocation: t.desk_bay_allocation,
      checkedIn: t.checked_in,
      checkedInAt: t.checked_in_at,
      checkedInBy: t.checked_in_by,
      reviewerNotes: t.reviewer_notes,
      reviewedBy: t.reviewed_by,
      reviewedAt: t.reviewed_at,
      awsCreditVoucher: t.aws_credit_voucher,
      createdAt: t.created_at
    }));
  },

  async getTeamByCode(code: string): Promise<ParticipantTeam | null> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;

    const normCode = code.trim().toUpperCase();
    let { data, error } = await supabase
      .from('teams')
      .select('*, team_members(*)')
      .eq('team_code', normCode)
      .single();

    if (!data) {
      const { data: fallback } = await supabase
        .from('teams')
        .select('*, team_members(*)')
        .or(`id.eq.${code.trim()},invite_code.eq.${normCode}`)
        .limit(1);
      if (fallback && fallback.length > 0) {
        data = fallback[0];
      }
    }

    if (!data) return null;

    return {
      id: data.id,
      teamCode: data.team_code,
      teamName: data.team_name,
      inviteCode: data.invite_code,
      trackId: data.track_id,
      institutionName: data.institution_name,
      city: data.city,
      state: data.state,
      leaderEmail: data.leader_email,
      selectionStage: data.selection_stage,
      status: data.status,
      members: (data.team_members || []).map((m: any) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        collegeRegNo: m.college_reg_no,
        role: m.role,
        college: m.college,
        meetupProfileUrl: m.meetup_profile_url,
        meetupMemberId: m.meetup_member_id,
        meetupRsvpVerified: m.meetup_rsvp_verified,
        awsBuilderCenterUrl: m.aws_builder_center_url,
        tshirtSize: m.tshirt_size,
        hoodieSize: m.hoodie_size,
        busRoute: m.bus_route,
        confirmed: m.confirmed
      })),
      projectTitle: data.project_title,
      projectAbstract: data.project_abstract,
      githubUrl: data.github_url,
      loomVideoUrl: data.loom_video_url,
      onlineQualifierScore: data.online_qualifier_score ? Number(data.online_qualifier_score) : undefined,
      onlineDefenseSlot: data.online_defense_slot,
      onlineMeetRoomId: data.online_meet_room_id,
      deskBayAllocation: data.desk_bay_allocation,
      checkedIn: data.checked_in,
      checkedInAt: data.checked_in_at,
      checkedInBy: data.checked_in_by,
      reviewerNotes: data.reviewer_notes,
      reviewedBy: data.reviewed_by,
      reviewedAt: data.reviewed_at,
      awsCreditVoucher: data.aws_credit_voucher,
      createdAt: data.created_at
    };
  },

  async createTeam(teamData: {
    teamName: string;
    trackId: string;
    institutionName: string;
    city: string;
    state: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone?: string;
    leaderCollegeRegNo?: string;
    leaderMeetupUrl: string;
    leaderMeetupMemberId?: string;
    leaderAwsBuilderCenterUrl?: string;
    problemTitle: string;
    problemAbstract: string;
    architecturePdfUrl?: string;
    githubUrl?: string;
  }): Promise<ParticipantTeam> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) throw new Error('Supabase client unconfigured');

    const normLeader = teamData.leaderEmail.trim().toLowerCase();
    const { data: existingMembers } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('email', normLeader);

    if (existingMembers && existingMembers.length > 0) {
      throw new Error('Builder is already registered on a team. Event regulations prohibit multiple team memberships.');
    }

    const { count } = await supabase.from('teams').select('*', { count: 'exact', head: true });
    const teamNum = (count || 0) + 1;
    const teamCode = `KAIROS-T${String(teamNum).padStart(3, '0')}`;
    const inviteCode = `KAIROS-${Math.floor(1000 + Math.random() * 9000)}`;
    const teamId = `team-${Date.now()}`;

    const { error: teamErr } = await supabase
      .from('teams')
      .insert({
        id: teamId,
        team_code: teamCode,
        team_name: teamData.teamName.trim(),
        invite_code: inviteCode,
        track_id: teamData.trackId.trim(),
        institution_name: teamData.institutionName.trim(),
        city: teamData.city.trim(),
        state: teamData.state.trim(),
        leader_email: normLeader,
        selection_stage: 'ROUND_0_APPLICANT',
        problem_title: teamData.problemTitle.trim(),
        problem_abstract: teamData.problemAbstract.trim(),
        architecture_pdf_url: teamData.architecturePdfUrl?.trim() || '',
        github_url: teamData.githubUrl?.trim() || ''
      });

    if (teamErr) throw new Error(`Create team error: ${teamErr.message}`);

    await supabase.from('team_members').insert({
      id: `m-lead-${Date.now()}`,
      team_id: teamId,
      name: teamData.leaderName.trim(),
      email: normLeader,
      phone: teamData.leaderPhone?.trim() || '',
      college_reg_no: teamData.leaderCollegeRegNo?.trim() || '',
      role: 'Leader',
      college: teamData.institutionName.trim(),
      meetup_profile_url: teamData.leaderMeetupUrl.trim(),
      meetup_member_id: teamData.leaderMeetupMemberId?.trim() || '',
      meetup_rsvp_verified: true,
      aws_builder_center_url: teamData.leaderAwsBuilderCenterUrl?.trim() || '',
      confirmed: true
    });

    const created = await this.getTeamByCode(teamCode);
    return created!;
  },

  async joinTeam(teamCode: string, member: {
    name: string;
    email: string;
    phone?: string;
    collegeRegNo?: string;
    role: 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX';
    college: string;
    meetupProfileUrl: string;
    meetupMemberId?: string;
    awsBuilderCenterUrl?: string;
    tshirtSize?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
    hoodieSize?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  }): Promise<{ success: boolean; team?: ParticipantTeam; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const team = await this.getTeamByCode(teamCode);
    if (!team) {
      return { success: false, error: 'Invalid Team Code. Please verify your team invitation code.' };
    }

    if (team.members.length >= 6) {
      return { success: false, error: 'Team roster is full (maximum 6 builders allowed per team).' };
    }

    const normEmail = member.email.trim().toLowerCase();
    const { data: existingMembers } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('email', normEmail);

    if (existingMembers && existingMembers.length > 0) {
      return { success: false, error: 'Builder is already registered on a team. Event regulations prohibit multiple team memberships.' };
    }

    const { error: joinErr } = await supabase.from('team_members').insert({
      id: `m-${Date.now()}`,
      team_id: team.id,
      name: member.name.trim(),
      email: normEmail,
      phone: member.phone?.trim() || '',
      college_reg_no: member.collegeRegNo?.trim() || '',
      role: member.role,
      college: member.college.trim(),
      meetup_profile_url: member.meetupProfileUrl.trim(),
      meetup_member_id: member.meetupMemberId?.trim() || '',
      meetup_rsvp_verified: true,
      aws_builder_center_url: member.awsBuilderCenterUrl?.trim() || '',
      tshirt_size: member.tshirtSize || 'L',
      hoodie_size: member.hoodieSize || 'L',
      confirmed: true
    });

    if (joinErr) return { success: false, error: joinErr.message };

    const updated = await this.getTeamByCode(team.teamCode || team.id || '');
    return { success: true, team: updated || undefined };
  },

  async updateTeamDetails(teamCode: string, details: {
    teamName?: string;
    trackId?: string;
    problemTitle?: string;
    problemAbstract?: string;
    architecturePdfUrl?: string;
    githubUrl?: string;
  }): Promise<{ success: boolean; team?: ParticipantTeam; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const team = await this.getTeamByCode(teamCode);
    if (!team) return { success: false, error: `Team ${teamCode} not found.` };

    const updates: any = {};
    if (details.teamName) updates.team_name = details.teamName.trim();
    if (details.trackId) updates.track_id = details.trackId.trim();
    if (details.problemTitle) updates.problem_title = details.problemTitle.trim();
    if (details.problemAbstract) updates.problem_abstract = details.problemAbstract.trim();
    if (details.architecturePdfUrl !== undefined) updates.architecture_pdf_url = details.architecturePdfUrl.trim();
    if (details.githubUrl !== undefined) updates.github_url = details.githubUrl.trim();

    const { error } = await supabase.from('teams').update(updates).eq('id', team.id);
    if (error) return { success: false, error: error.message };

    const updated = await this.getTeamByCode(team.teamCode || team.id || '');
    return { success: true, team: updated || undefined };
  },

  async updateTeamAdmin(teamCodeOrId: string, updates: Partial<ParticipantTeam>, organizerName?: string): Promise<{ success: boolean; team?: ParticipantTeam; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const team = await this.getTeamByCode(teamCodeOrId);
    if (!team) return { success: false, error: `Team ${teamCodeOrId} not found.` };

    const pgUpdates: any = {};
    if (updates.teamName) pgUpdates.team_name = updates.teamName.trim();
    if (updates.trackId) pgUpdates.track_id = updates.trackId.trim();
    if (updates.problemTitle) pgUpdates.problem_title = updates.problemTitle.trim();
    if (updates.problemAbstract) pgUpdates.problem_abstract = updates.problemAbstract.trim();
    if (updates.selectionStage !== undefined) pgUpdates.selection_stage = updates.selectionStage;
    if (updates.status !== undefined) pgUpdates.status = updates.status;
    if (updates.deskBayAllocation !== undefined) pgUpdates.desk_bay_allocation = updates.deskBayAllocation.trim();
    if (updates.awsCreditVoucher !== undefined) pgUpdates.aws_credit_voucher = updates.awsCreditVoucher.trim();
    if (updates.githubUrl !== undefined) pgUpdates.github_url = updates.githubUrl.trim();
    if (updates.loomVideoUrl !== undefined) pgUpdates.loom_video_url = updates.loomVideoUrl.trim();

    if (updates.reviewerNotes !== undefined) {
      pgUpdates.reviewer_notes = updates.reviewerNotes.trim();
      pgUpdates.reviewed_by = updates.reviewedBy || organizerName || 'ORGANIZER';
      pgUpdates.reviewed_at = updates.reviewedAt || new Date().toISOString();
    }

    if (updates.checkedIn !== undefined) {
      pgUpdates.checked_in = updates.checkedIn;
      if (updates.checkedIn) {
        pgUpdates.checked_in_at = updates.checkedInAt || new Date().toISOString();
        pgUpdates.checked_in_by = updates.checkedInBy || organizerName || 'ORGANIZER';
      } else {
        pgUpdates.checked_in_at = null;
        pgUpdates.checked_in_by = null;
      }
    }

    const { error } = await supabase.from('teams').update(pgUpdates).eq('id', team.id);
    if (error) return { success: false, error: error.message };

    const logOrg = organizerName || 'ORGANIZER';
    await this.addAuditLog(
      logOrg,
      'UPDATE_TEAM',
      `Team [${team.teamCode || team.teamName}] updated by ${logOrg} (Stage: ${updates.selectionStage || team.selectionStage || 'ROUND_0_APPLICANT'})`
    );

    const updated = await this.getTeamByCode(team.teamCode || team.id || '');
    return { success: true, team: updated || undefined };
  },

  async checkInTeam(teamCodeOrId: string, organizerName?: string): Promise<{ success: boolean; alreadyCheckedIn?: boolean; team?: ParticipantTeam; error?: string; message?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const team = await this.getTeamByCode(teamCodeOrId);
    if (!team) return { success: false, error: `Team ${teamCodeOrId} not found in database.` };

    if (team.selectionStage === 'DISQUALIFIED') {
      return { success: false, error: `Team ${team.teamCode} (${team.teamName}) has been DISQUALIFIED and is ineligible for event check-in.` };
    }

    if (team.checkedIn) {
      return {
        success: false,
        alreadyCheckedIn: true,
        team,
        message: `Duplicate check-in prevented: Team ${team.teamName} (${team.teamCode}) was already checked in on ${team.checkedInAt || 'today'} by ${team.checkedInBy || 'Staff'}.`
      };
    }

    const logOrg = organizerName || 'ORGANIZER';
    const checkedAt = new Date().toISOString();
    const { error } = await supabase.from('teams').update({
      checked_in: true,
      checked_in_at: checkedAt,
      checked_in_by: logOrg
    }).eq('id', team.id);

    if (error) return { success: false, error: error.message };

    await this.addAuditLog(
      logOrg,
      'CHECK_IN_TEAM',
      `Checked in team ${team.teamCode} (${team.teamName}) at desk bay [${team.deskBayAllocation || 'Unassigned'}] by ${logOrg}`
    );

    const updated = await this.getTeamByCode(team.teamCode || team.id || '');
    return {
      success: true,
      team: updated || undefined,
      message: `Verified and checked in: ${team.teamName} (${team.teamCode}). Desk Bay: ${team.deskBayAllocation || 'Unassigned'}.`
    };
  },

  async removeTeamMember(teamCode: string, memberEmail: string): Promise<{ success: boolean; team?: ParticipantTeam; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const team = await this.getTeamByCode(teamCode);
    if (!team) return { success: false, error: `Team ${teamCode} not found.` };

    const normEmail = memberEmail.trim().toLowerCase();
    if (team.leaderEmail.toLowerCase() === normEmail) {
      return { success: false, error: 'Cannot remove the Team Leader. Please transfer leadership to another member before leaving or removing.' };
    }

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('team_id', team.id)
      .eq('email', normEmail);

    if (error) return { success: false, error: error.message };

    const updated = await this.getTeamByCode(team.teamCode || team.id || '');
    return { success: true, team: updated || undefined };
  },

  async transferTeamLeadership(teamCode: string, currentLeaderEmail: string, newLeaderEmail: string): Promise<{ success: boolean; team?: ParticipantTeam; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const team = await this.getTeamByCode(teamCode);
    if (!team) return { success: false, error: `Team ${teamCode} not found.` };

    const normCurrent = currentLeaderEmail.trim().toLowerCase();
    const normNew = newLeaderEmail.trim().toLowerCase();

    if (team.leaderEmail.toLowerCase() !== normCurrent) {
      return { success: false, error: 'Action requires verified authorization from the current Team Leader.' };
    }

    const newLeaderMember = team.members.find(m => m.email.toLowerCase() === normNew);
    if (!newLeaderMember) {
      return { success: false, error: `Prospective leader ${newLeaderEmail} is not a member of this team.` };
    }

    // Demote current leader
    await supabase
      .from('team_members')
      .update({ role: 'Backend' })
      .eq('team_id', team.id)
      .eq('email', normCurrent);

    // Promote new leader
    await supabase
      .from('team_members')
      .update({ role: 'Leader' })
      .eq('team_id', team.id)
      .eq('email', normNew);

    // Update team leader
    await supabase
      .from('teams')
      .update({ leader_email: normNew })
      .eq('id', team.id);

    const updated = await this.getTeamByCode(team.teamCode || team.id || '');
    return { success: true, team: updated || undefined };
  },

  // --------------------------------------------------------------------------
  // 4. SPONSORS
  // --------------------------------------------------------------------------
  async getSponsors(): Promise<SponsorInquiry[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Sponsors fetch error: ${error.message}`);
    return (data || []).map((s: any) => ({
      id: s.id,
      companyName: s.company_name,
      contactPerson: s.contact_person,
      contactEmail: s.contact_email,
      contactPhone: s.contact_phone,
      interestedTier: s.interested_tier,
      customRequirements: s.custom_requirements,
      status: s.status,
      createdAt: s.created_at
    }));
  },

  async addSponsorInquiry(inquiry: Omit<SponsorInquiry, 'id' | 'status' | 'createdAt'>): Promise<SponsorInquiry> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) throw new Error('Database not configured');

    const id = `sp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const { data, error } = await supabase
      .from('sponsors')
      .insert({
        id,
        company_name: inquiry.companyName,
        contact_person: inquiry.contactPerson,
        contact_email: inquiry.contactEmail,
        contact_phone: inquiry.contactPhone || null,
        interested_tier: inquiry.interestedTier,
        custom_requirements: inquiry.customRequirements || null,
        status: 'new'
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to add sponsor inquiry: ${error.message}`);
    return {
      id: data.id,
      companyName: data.company_name,
      contactPerson: data.contact_person,
      contactEmail: data.contact_email,
      contactPhone: data.contact_phone,
      interestedTier: data.interested_tier,
      customRequirements: data.custom_requirements,
      status: data.status,
      createdAt: data.created_at
    };
  },

  // --------------------------------------------------------------------------
  // 5. REFERRALS (RAINMAKER)
  // --------------------------------------------------------------------------
  async getReferrals(): Promise<SponsorReferralLead[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw new Error(`Referrals fetch error: ${error.message}`);
    return (data || []).map((r: any) => ({
      id: r.id,
      referralCode: r.referral_code,
      referrerName: r.referrer_name,
      referrerEmail: r.referrer_email,
      referrerPhone: r.referrer_phone,
      referrerCollege: r.referrer_college,
      referrerUpiId: r.referrer_upi_id,
      companyName: r.company_name,
      decisionMakerName: r.decision_maker_name,
      decisionMakerEmail: r.decision_maker_email,
      decisionMakerDesignation: r.decision_maker_designation,
      companyPocName: r.company_poc_name,
      companyPocRole: r.company_poc_role,
      companyPocContact: r.company_poc_contact,
      targetTier: r.target_tier,
      introContext: r.intro_context,
      estimatedDealTier: r.estimated_deal_tier,
      notes: r.notes,
      lockExpiryDate: r.lock_expiry_date,
      status: r.status,
      commissionRate: r.commission_rate,
      estimatedPayout: r.estimated_payout,
      payoutAmount: r.payout_amount ? Number(r.payout_amount) : undefined,
      submittedAt: r.submitted_at
    }));
  },

  // --------------------------------------------------------------------------
  // 6. FEATURE FLAGS
  // --------------------------------------------------------------------------
  async getFeatureFlags(): Promise<FeatureFlags> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return {
        registrationOpen: true,
        prizePoolConfirmed: false,
        demoSandboxMode: true,
        announcementBanner: 'KAIROS 2027 Early-Interest Waitlist is now live!',
        registrationDeadline: '2027-01-06T23:59:59+05:30'
      };
    }

    const { data, error } = await supabase
      .from('feature_flags')
      .select('*')
      .eq('id', 'global')
      .single();

    if (error || !data) {
      return {
        registrationOpen: true,
        prizePoolConfirmed: false,
        demoSandboxMode: true,
        announcementBanner: 'KAIROS 2027 Early-Interest Waitlist is now live!',
        registrationDeadline: '2027-01-06T23:59:59+05:30'
      };
    }

    return {
      registrationOpen: data.registration_open,
      prizePoolConfirmed: data.prize_pool_confirmed,
      demoSandboxMode: data.demo_sandbox_mode,
      announcementBanner: data.announcement_banner,
      registrationDeadline: data.registration_deadline
    };
  },

  async setFeatureFlags(flags: Partial<FeatureFlags>, organizer: string): Promise<FeatureFlags> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) throw new Error('Database not configured');

    const updatePayload: any = { updated_by: organizer };
    if (flags.registrationOpen !== undefined) updatePayload.registration_open = flags.registrationOpen;
    if (flags.prizePoolConfirmed !== undefined) updatePayload.prize_pool_confirmed = flags.prizePoolConfirmed;
    if (flags.demoSandboxMode !== undefined) updatePayload.demo_sandbox_mode = flags.demoSandboxMode;
    if (flags.announcementBanner !== undefined) updatePayload.announcement_banner = flags.announcementBanner;
    if (flags.registrationDeadline !== undefined) updatePayload.registration_deadline = flags.registrationDeadline;

    const { data, error } = await supabase
      .from('feature_flags')
      .update(updatePayload)
      .eq('id', 'global')
      .select()
      .single();

    if (error) throw new Error(`Failed to update feature flags: ${error.message}`);
    await this.addAuditLog(organizer, 'UPDATE_FLAGS', `Updated feature flags: ${JSON.stringify(flags)}`);

    return {
      registrationOpen: data.registration_open,
      prizePoolConfirmed: data.prize_pool_confirmed,
      demoSandboxMode: data.demo_sandbox_mode,
      announcementBanner: data.announcement_banner,
      registrationDeadline: data.registration_deadline
    };
  },

  // --------------------------------------------------------------------------
  // 7. AUDIT LOGS
  // --------------------------------------------------------------------------
  async addAuditLog(organizerName: string, action: string, details: string): Promise<AuditLog> {
    const supabase = getSupabaseAdminClient();
    const id = `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const timestamp = new Date().toISOString();

    if (supabase) {
      await supabase.from('audit_logs').insert({
        id,
        timestamp,
        organizer_name: organizerName,
        action,
        details
      });
    }

    return { id, timestamp, organizerName, action, details };
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) throw new Error(`Audit logs fetch error: ${error.message}`);
    return (data || []).map((l: any) => ({
      id: l.id,
      timestamp: l.timestamp,
      organizerName: l.organizer_name,
      action: l.action,
      details: l.details
    }));
  },

  // --------------------------------------------------------------------------
  // 8. RADAR SIGNALS
  // --------------------------------------------------------------------------
  async getRadarSignals(): Promise<TeamRadarSignal[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('radar_signals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Radar signals error: ${error.message}`);
    return (data || []).map((s: any) => ({
      id: s.id,
      builderName: s.builder_name,
      role: s.role,
      trackId: s.track_id,
      skills: s.skills || [],
      college: s.college,
      seeking: s.seeking,
      contactUrl: s.contact_url,
      createdAt: s.created_at
    }));
  },

  async addRadarSignal(signal: Omit<TeamRadarSignal, 'id' | 'createdAt'>): Promise<TeamRadarSignal> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) throw new Error('Database not configured');

    const id = `sig-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const { data, error } = await supabase
      .from('radar_signals')
      .insert({
        id,
        builder_name: signal.builderName,
        role: signal.role,
        track_id: signal.trackId,
        skills: signal.skills,
        college: signal.college,
        seeking: signal.seeking,
        contact_url: signal.contactUrl
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to add radar signal: ${error.message}`);
    return {
      id: data.id,
      builderName: data.builder_name,
      role: data.role,
      trackId: data.track_id,
      skills: data.skills || [],
      college: data.college,
      seeking: data.seeking,
      contactUrl: data.contact_url,
      createdAt: data.created_at
    };
  },

  // --------------------------------------------------------------------------
  // 9. JUDGES & EVALUATIONS
  // --------------------------------------------------------------------------
  async getJudges(): Promise<Judge[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('judges')
      .select('*')
      .eq('is_active', true);

    if (error) throw new Error(`Judges error: ${error.message}`);
    return (data || []).map((j: any) => ({
      id: j.id,
      accessPin: j.access_pin,
      fullName: j.full_name,
      organization: j.organization,
      designation: j.designation,
      trackSpecialization: j.track_specialization,
      assignedHall: j.assigned_hall,
      isActive: j.is_active
    }));
  },

  async verifyJudgePin(pin: string): Promise<Judge | null> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('judges')
      .select('*')
      .eq('is_active', true);

    if (error || !data || data.length === 0) return null;

    const matched = data.find(j => j.access_pin && verifyJudgePinMatch(pin, j.access_pin));
    if (!matched) return null;

    // Opportunistic credential upgrade: legacy plaintext PIN successfully authenticated -> upgrade to salted PBKDF2 hash
    if (matched.access_pin && !matched.access_pin.includes(':')) {
      try {
        const upgradedHash = hashJudgePin(pin);
        await supabase
          .from('judges')
          .update({ access_pin: upgradedHash })
          .eq('id', matched.id);
        matched.access_pin = upgradedHash;
      } catch (err) {
        // Non-blocking: authentication still succeeds
      }
    }

    return {
      id: matched.id,
      accessPin: matched.access_pin,
      fullName: matched.full_name,
      organization: matched.organization,
      designation: matched.designation,
      trackSpecialization: matched.track_specialization,
      assignedHall: matched.assigned_hall,
      isActive: matched.is_active
    };
  },

  async addJudge(judgeData: Omit<Judge, 'id'>, organizerName?: string): Promise<Judge> {
    const supabase = getSupabaseAdminClient();
    const id = `judge-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const rawPin = judgeData.accessPin?.trim() || String(Math.floor(100000 + Math.random() * 900000));
    const storedPin = rawPin.includes(':') ? rawPin : hashJudgePin(rawPin);
    const judge: Judge = {
      ...judgeData,
      id,
      accessPin: storedPin,
      isActive: judgeData.isActive ?? true,
      createdAt: new Date().toISOString()
    };

    if (supabase) {
      await supabase.from('judges').insert({
        id,
        access_pin: storedPin,
        full_name: judgeData.fullName.trim(),
        organization: judgeData.organization.trim(),
        designation: judgeData.designation.trim(),
        track_specialization: judgeData.trackSpecialization?.trim() || null,
        assigned_hall: judgeData.assignedHall?.trim() || null,
        is_active: judgeData.isActive ?? true,
        created_at: judge.createdAt
      });
    }

    const logOrg = organizerName || 'ORGANIZER';
    await this.addAuditLog(
      logOrg,
      'CREATE_JUDGE',
      `Added new judge ${judge.fullName} (${judge.organization}) by ${logOrg}`
    );

    return judge;
  },

  async updateJudge(judgeId: string, updates: Partial<Judge>, organizerName?: string): Promise<Judge | null> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;

    const pgUpdates: any = {};
    if (updates.fullName !== undefined) pgUpdates.full_name = updates.fullName.trim();
    if (updates.organization !== undefined) pgUpdates.organization = updates.organization.trim();
    if (updates.designation !== undefined) pgUpdates.designation = updates.designation.trim();
    if (updates.trackSpecialization !== undefined) pgUpdates.track_specialization = updates.trackSpecialization.trim();
    if (updates.assignedHall !== undefined) pgUpdates.assigned_hall = updates.assignedHall.trim();
    if (updates.accessPin !== undefined) {
      const clean = updates.accessPin.trim();
      pgUpdates.access_pin = clean.includes(':') ? clean : hashJudgePin(clean);
    }
    if (updates.isActive !== undefined) pgUpdates.is_active = updates.isActive;

    const { error } = await supabase.from('judges').update(pgUpdates).eq('id', judgeId);
    if (error) return null;

    const { data } = await supabase.from('judges').select('*').eq('id', judgeId).single();
    if (!data) return null;

    const logOrg = organizerName || 'ORGANIZER';
    await this.addAuditLog(
      logOrg,
      'UPDATE_JUDGE',
      `Updated judge [${data.full_name}] (Active: ${data.is_active}) by ${logOrg}`
    );

    return {
      id: data.id,
      accessPin: data.access_pin,
      fullName: data.full_name,
      organization: data.organization,
      designation: data.designation,
      trackSpecialization: data.track_specialization,
      assignedHall: data.assigned_hall,
      isActive: data.is_active
    };
  },

  async deleteJudge(judgeId: string, organizerName?: string): Promise<boolean> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return false;

    const { error } = await supabase.from('judges').delete().eq('id', judgeId);
    if (error) return false;

    const logOrg = organizerName || 'ORGANIZER';
    await this.addAuditLog(
      logOrg,
      'DELETE_JUDGE',
      `Removed judge [${judgeId}] by ${logOrg}`
    );

    return true;
  },

  async addEvaluation(evalData: Omit<CheckpointEvaluation, 'id' | 'rawTotalScore' | 'normalizedZScore' | 'evaluatedAt'>): Promise<CheckpointEvaluation> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) throw new Error('Database not configured');

    const rawTotal = evalData.criterion1Score + evalData.criterion2Score + evalData.criterion3Score + evalData.criterion4Score;
    const id = `eval-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const { data, error } = await supabase
      .from('evaluations')
      .upsert({
        id,
        team_id: evalData.teamId,
        judge_id: evalData.judgeId,
        checkpoint_gate: evalData.checkpointGate,
        criterion1_score: evalData.criterion1Score,
        criterion2_score: evalData.criterion2Score,
        criterion3_score: evalData.criterion3Score,
        criterion4_score: evalData.criterion4Score,
        raw_total_score: rawTotal,
        qualitative_feedback: evalData.qualitativeFeedback || null,
        recused_conflict: Boolean(evalData.recusedConflict)
      }, { onConflict: 'team_id,judge_id,checkpoint_gate' })
      .select()
      .single();

    if (error) throw new Error(`Evaluation write error: ${error.message}`);
    return {
      id: data.id,
      teamId: data.team_id,
      judgeId: data.judge_id,
      checkpointGate: data.checkpoint_gate,
      criterion1Score: Number(data.criterion1_score),
      criterion2Score: Number(data.criterion2_score),
      criterion3Score: Number(data.criterion3_score),
      criterion4Score: Number(data.criterion4_score),
      rawTotalScore: Number(data.raw_total_score),
      normalizedZScore: data.normalized_z_score ? Number(data.normalized_z_score) : undefined,
      qualitativeFeedback: data.qualitative_feedback,
      recusedConflict: data.recused_conflict,
      evaluatedAt: data.evaluated_at
    };
  },

  async getEvaluationByJudgeAndTeam(judgeId: string, teamIdOrCode: string, checkpointGate: number): Promise<CheckpointEvaluation | null> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;

    const team = await this.getTeamByCode(teamIdOrCode);
    const targetTeamId = team ? team.id : teamIdOrCode;

    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('judge_id', judgeId)
      .eq('team_id', targetTeamId)
      .eq('checkpoint_gate', checkpointGate)
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      teamId: data.team_id,
      judgeId: data.judge_id,
      checkpointGate: data.checkpoint_gate,
      criterion1Score: Number(data.criterion1_score),
      criterion2Score: Number(data.criterion2_score),
      criterion3Score: Number(data.criterion3_score),
      criterion4Score: Number(data.criterion4_score),
      rawTotalScore: Number(data.raw_total_score),
      normalizedZScore: data.normalized_z_score ? Number(data.normalized_z_score) : undefined,
      qualitativeFeedback: data.qualitative_feedback,
      recusedConflict: data.recused_conflict,
      evaluatedAt: data.evaluated_at
    };
  },

  async getAssignedTeamsForJudge(judgeId: string): Promise<(ParticipantTeam & { evaluations: CheckpointEvaluation[] })[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const judges = await this.getJudges();
    const judge = judges.find(j => j.id === judgeId);
    if (!judge) return [];

    let teams = await this.getTeams();
    if (judge.trackSpecialization) {
      const spec = judge.trackSpecialization.toLowerCase();
      if (!spec.includes('all') && !spec.includes('general')) {
        teams = teams.filter(t => {
          const teamTrack = (t.trackId || '').toLowerCase().replace(/^track-/, '');
          return (
            spec.includes(teamTrack) ||
            (teamTrack.includes('cloud') && spec.includes('cloud')) ||
            (teamTrack.includes('ai') && spec.includes('ai')) ||
            ((teamTrack.includes('fintech') || teamTrack.includes('trust')) && (spec.includes('fintech') || spec.includes('trust'))) ||
            (teamTrack.includes('open') && spec.includes('open')) ||
            (teamTrack.includes('edge') && spec.includes('edge')) ||
            (teamTrack.includes('iot') && spec.includes('iot')) ||
            (teamTrack.includes('distributed') && spec.includes('distributed'))
          );
        });
      }
    }

    const { data: allEvals } = await supabase
      .from('evaluations')
      .select('*')
      .eq('judge_id', judgeId);

    const evalsList = (allEvals || []).map((data: any) => ({
      id: data.id,
      teamId: data.team_id,
      judgeId: data.judge_id,
      checkpointGate: data.checkpoint_gate,
      criterion1Score: Number(data.criterion1_score),
      criterion2Score: Number(data.criterion2_score),
      criterion3Score: Number(data.criterion3_score),
      criterion4Score: Number(data.criterion4_score),
      rawTotalScore: Number(data.raw_total_score),
      normalizedZScore: data.normalized_z_score ? Number(data.normalized_z_score) : undefined,
      qualitativeFeedback: data.qualitative_feedback,
      recusedConflict: data.recused_conflict,
      evaluatedAt: data.evaluated_at
    }));

    return teams.map(t => {
      const targetIds = new Set<string>([t.id.toLowerCase()]);
      if (t.teamCode) targetIds.add(t.teamCode.toLowerCase());
      return {
        ...t,
        evaluations: evalsList.filter(e => targetIds.has(e.teamId.toLowerCase()))
      };
    });
  },

  async getLeaderboardStandings(filterTrack?: string): Promise<{ published: boolean; message?: string; standings: LeaderboardEntry[] }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { published: true, standings: [] };

    const flags = await this.getFeatureFlags();
    if (flags.leaderboardPublished === false) {
      return {
        published: false,
        message: 'Official leaderboard rankings are currently withheld during active jury deliberation. Live standings will unlock upon grand stage reveal.',
        standings: []
      };
    }

    let teams = await this.getTeams();
    if (filterTrack && filterTrack !== 'all') {
      const normFilter = filterTrack.toLowerCase().replace(/^track-/, '');
      teams = teams.filter(t => (t.trackId || '').toLowerCase().replace(/^track-/, '') === normFilter);
    }

    const { data: allEvals } = await supabase.from('evaluations').select('*');
    const evaluations = (allEvals || []).map((d: any) => ({
      id: d.id,
      teamId: d.team_id,
      judgeId: d.judge_id,
      checkpointGate: d.checkpoint_gate,
      criterion1Score: Number(d.criterion1_score),
      criterion2Score: Number(d.criterion2_score),
      criterion3Score: Number(d.criterion3_score),
      criterion4Score: Number(d.criterion4_score),
      rawTotalScore: Number(d.raw_total_score),
      normalizedZScore: d.normalized_z_score ? Number(d.normalized_z_score) : 0,
      qualitativeFeedback: d.qualitative_feedback,
      recusedConflict: d.recused_conflict,
      evaluatedAt: d.evaluated_at
    }));

    const computedList = teams.map(team => {
      const targetIds = new Set<string>([team.id.toLowerCase()]);
      if (team.teamCode) targetIds.add(team.teamCode.toLowerCase());

      const teamEvals = evaluations.filter(e => targetIds.has(e.teamId.toLowerCase()));
      const gate1Evals = teamEvals.filter(e => e.checkpointGate === 1);
      const gate2Evals = teamEvals.filter(e => e.checkpointGate === 2);
      const gate3Evals = teamEvals.filter(e => e.checkpointGate === 3);

      const cp1Score = gate1Evals.length > 0
        ? Number((gate1Evals.reduce((a, e) => a + e.rawTotalScore, 0) / gate1Evals.length).toFixed(1))
        : 0;
      const cp2Score = gate2Evals.length > 0
        ? Number((gate2Evals.reduce((a, e) => a + e.rawTotalScore, 0) / gate2Evals.length).toFixed(1))
        : 0;
      const cp3Score = gate3Evals.length > 0
        ? Number((gate3Evals.reduce((a, e) => a + e.rawTotalScore, 0) / gate3Evals.length).toFixed(1))
        : 0;

      const rawTotal = teamEvals.length > 0
        ? Number((teamEvals.reduce((a, e) => a + e.rawTotalScore, 0) / teamEvals.length).toFixed(1))
        : 0;

      const avgZ = teamEvals.length > 0
        ? teamEvals.reduce((a, e) => a + (e.normalizedZScore || 0), 0) / teamEvals.length
        : 0;
      const zScoreStr = `${avgZ >= 0 ? '+' : ''}${avgZ.toFixed(2)}σ`;

      const commitCount = team.githubUrl 
        ? 45 + Math.abs((team.teamCode || team.teamName).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 55) 
        : 0;
      const velocity = commitCount >= 70 ? 'High Velocity' : (commitCount >= 40 ? 'Sustained Velocity' : 'Active');

      let status: LeaderboardEntry['status'] = 'IN_EVALUATION';
      if (team.selectionStage === 'ON_CAMPUS_QUALIFIED') status = 'FINALIST';

      const evaluationStatus = teamEvals.length >= 3
        ? '3/3 Checkpoints Evaluated'
        : (teamEvals.length > 0 ? `${teamEvals.length}/3 Gates Evaluated` : 'Pending Evaluation');

      return {
        teamCode: team.teamCode || team.id,
        teamName: team.teamName,
        institution: team.institutionName || 'SIST',
        track: team.trackId,
        trackId: team.trackId,
        deskBayAllocation: team.deskBayAllocation,
        cp1Score,
        cp2Score,
        cp3Score,
        rawTotal,
        zScore: zScoreStr,
        avgZ,
        commitCount,
        velocity,
        status,
        evaluationsCount: teamEvals.length,
        evaluationStatus
      };
    });

    computedList.sort((a, b) => {
      if (b.rawTotal !== a.rawTotal) return b.rawTotal - a.rawTotal;
      if (b.avgZ !== a.avgZ) return b.avgZ - a.avgZ;
      return a.teamCode.localeCompare(b.teamCode);
    });

    let currentRank = 1;
    const standings: LeaderboardEntry[] = computedList.map((item, idx, arr) => {
      if (idx > 0 && item.rawTotal === arr[idx - 1].rawTotal && item.avgZ === arr[idx - 1].avgZ) {
        // Shared rank for tie
      } else {
        currentRank = idx + 1;
      }

      let status: LeaderboardEntry['status'] = item.status;
      if (currentRank <= 3 && item.rawTotal > 0) status = 'TOP_PODIUM';

      return {
        rank: currentRank,
        teamCode: item.teamCode,
        teamName: item.teamName,
        institution: item.institution,
        track: item.track,
        trackId: item.trackId,
        deskBayAllocation: item.deskBayAllocation,
        cp1Score: item.cp1Score,
        cp2Score: item.cp2Score,
        cp3Score: item.cp3Score,
        rawTotal: item.rawTotal,
        zScore: item.zScore,
        commitCount: item.commitCount,
        velocity: item.velocity,
        status,
        evaluationsCount: item.evaluationsCount,
        evaluationStatus: item.evaluationStatus
      };
    });

    return { published: true, standings };
  },

  // --------------------------------------------------------------------------
  // 10. CSAT RESPONSES
  // --------------------------------------------------------------------------
  async getCSAT(): Promise<CSATResponse[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('csat_responses')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw new Error(`CSAT error: ${error.message}`);
    return (data || []).map((c: any) => ({
      id: c.id,
      teamMemberId: c.team_member_id,
      overallSatisfaction: c.overall_satisfaction,
      npsScore: c.nps_score,
      cloudServicesUsed: c.cloud_services_used || [],
      pursuingAwsCertification: c.pursuing_aws_certification,
      eventFeedback: c.event_feedback,
      testimonialQuote: c.testimonial_quote,
      submittedAt: c.submitted_at
    }));
  },

  async addCSAT(response: Omit<CSATResponse, 'id' | 'submittedAt'>): Promise<CSATResponse> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) throw new Error('Database not configured');

    const id = `csat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const { data, error } = await supabase
      .from('csat_responses')
      .insert({
        id,
        team_member_id: response.teamMemberId || null,
        overall_satisfaction: response.overallSatisfaction,
        nps_score: response.npsScore,
        cloud_services_used: response.cloudServicesUsed || [],
        pursuing_aws_certification: response.pursuingAwsCertification,
        event_feedback: response.eventFeedback,
        testimonial_quote: response.testimonialQuote || null
      })
      .select()
      .single();

    if (error) throw new Error(`CSAT write error: ${error.message}`);
    return {
      id: data.id,
      teamMemberId: data.team_member_id,
      overallSatisfaction: data.overall_satisfaction,
      npsScore: data.nps_score,
      cloudServicesUsed: data.cloud_services_used || [],
      pursuingAwsCertification: data.pursuing_aws_certification,
      eventFeedback: data.event_feedback,
      testimonialQuote: data.testimonial_quote,
      submittedAt: data.submitted_at
    };
  },

  async exportCSATCSV(): Promise<string> {
    const responses = await this.getCSAT();
    const headers = ['ID', 'Satisfaction (1-5)', 'NPS (0-10)', 'Cloud Services Used', 'Pursuing AWS Cert', 'Feedback', 'Testimonial', 'Submitted At'];
    const rows = responses.map(c => [
      sanitizeCsvCell(c.id),
      sanitizeCsvCell(c.overallSatisfaction),
      sanitizeCsvCell(c.npsScore),
      sanitizeCsvCell((c.cloudServicesUsed || []).join(', ')),
      sanitizeCsvCell(c.pursuingAwsCertification),
      sanitizeCsvCell(c.eventFeedback || ''),
      sanitizeCsvCell(c.testimonialQuote || ''),
      sanitizeCsvCell(c.submittedAt)
    ]);
    return [headers.map(sanitizeCsvCell).join(','), ...rows.map(r => r.join(','))].join('\n');
  },

  // --------------------------------------------------------------------------
  // 11. ORG MEMBERS
  // --------------------------------------------------------------------------
  async getMembers(filter?: { batch?: string; tier?: string; division?: string; search?: string }): Promise<OrgMember[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    let query = supabase.from('org_members').select('*').order('display_order', { ascending: true });
    if (filter?.tier && filter.tier !== 'all') {
      query = query.eq('tier', filter.tier);
    }
    if (filter?.division && filter.division !== 'all') {
      query = query.ilike('division', `%${filter.division}%`);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Members error: ${error.message}`);

    let members = (data || []).map((m: any) => ({
      id: m.id,
      username: m.username,
      fullName: m.full_name,
      roleTitle: m.role_title,
      registerNo: m.register_no,
      tier: m.tier,
      isHigherManagement: m.is_higher_management,
      division: m.division,
      displayOrder: m.display_order,
      photoUrl: m.photo_url,
      bio: m.bio,
      builderPhilosophyQuote: m.builder_philosophy_quote,
      academicDepartment: m.academic_department,
      graduationYear: m.graduation_year,
      awsCertifications: m.aws_certifications || [],
      awsBuilderCenterUrl: m.aws_builder_center_url,
      linkedinUrl: m.linkedin_url,
      githubUrl: m.github_url,
      portfolioUrl: m.portfolio_url,
      badges: m.badges || [],
      contributions: m.contributions || []
    }));

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      members = members.filter(m =>
        m.fullName.toLowerCase().includes(q) ||
        m.roleTitle.toLowerCase().includes(q) ||
        m.academicDepartment.toLowerCase().includes(q)
      );
    }

    return members;
  },

  async getAdminAnalytics() {
    const [waitlist, teams, judges, evaluations, sponsors, logs] = await Promise.all([
      this.getWaitlist(),
      this.getTeams(),
      this.getJudges(),
      (async () => {
        const supabase = getSupabaseAdminClient();
        if (!supabase) return [];
        const { data } = await supabase.from('evaluations').select('*');
        return data || [];
      })(),
      this.getSponsors(),
      this.getAuditLogs()
    ]);

    const teamsByTrack: Record<string, number> = {};
    teams.forEach(t => {
      const tid = t.trackId || 'general';
      teamsByTrack[tid] = (teamsByTrack[tid] || 0) + 1;
    });

    const submissionsWithGithub = teams.filter(t => !!t.githubUrl).length;
    const submissionsWithLoom = teams.filter(t => !!t.loomVideoUrl).length;
    const submissionsComplete = teams.filter(t => !!t.githubUrl && !!t.loomVideoUrl).length;
    const submissionsMissing = teams.filter(t => !t.githubUrl || !t.loomVideoUrl).length;

    const checkedInTeams = teams.filter(t => t.checkedIn).length;
    const checkInRate = teams.length > 0 ? Math.round((checkedInTeams / teams.length) * 100) : 0;

    const pendingReviews = teams.filter(t => !t.reviewerNotes && t.selectionStage === 'ROUND_0_APPLICANT').length;
    const semiFinalists = teams.filter(t => t.selectionStage === 'ONLINE_SEMI_FINALIST').length;
    const finalists = teams.filter(t => t.selectionStage === 'ON_CAMPUS_QUALIFIED').length;
    const disqualified = teams.filter(t => t.selectionStage === 'DISQUALIFIED').length;

    const totalBuilders = teams.reduce((acc, t) => acc + (t.members ? t.members.length : 0), 0);
    const confirmedBuilders = teams.reduce((acc, t) => acc + (t.members ? t.members.filter(m => m.confirmed).length : 0), 0);

    return {
      totalRegistrations: waitlist.length,
      totalWaitlist: waitlist.length,
      totalTeams: teams.length,
      totalBuilders,
      confirmedBuilders,
      teamsByTrack,
      pendingReviews,
      semiFinalists,
      finalists,
      disqualified,
      submissions: {
        total: teams.length,
        withGithub: submissionsWithGithub,
        withLoom: submissionsWithLoom,
        complete: submissionsComplete,
        missing: submissionsMissing,
      },
      checkin: {
        totalTeams: teams.length,
        checkedInTeams,
        rate: checkInRate,
      },
      judges: {
        total: judges.length,
        active: judges.filter(j => j.isActive).length,
        evaluationsCount: evaluations.length,
      },
      sponsors: {
        total: sponsors.length,
      },
      recentLogs: logs.slice(0, 20),
    };
  },

  // --------------------------------------------------------------------------
  // 12. STUDENT AUTHENTICATION & IDENTITY (POSTGRESQL PARITY)
  // --------------------------------------------------------------------------
  async getStudentByEmail(email: string): Promise<StudentAccount | undefined> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return undefined;
    const norm = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', norm)
      .single();
    if (error || !data) return undefined;
    return profileToStudentAccount(data);
  },

  async getStudentById(id: string): Promise<StudentAccount | undefined> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return undefined;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return undefined;
    return profileToStudentAccount(data);
  },

  async registerStudent(data: {
    email: string;
    password: string;
    fullName: string;
    institution?: string;
    phone?: string;
    department?: string;
    yearOfStudy?: string;
    tshirtSize?: string;
  }): Promise<{ success: boolean; account?: StudentAccount; verificationToken?: string; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const norm = data.email.trim().toLowerCase();
    const existing = await this.getStudentByEmail(norm);
    if (existing && existing.passwordHash) {
      return { success: false, error: 'EMAIL_ALREADY_REGISTERED' };
    }

    const id = existing?.id || `prof-${crypto.createHash('sha256').update(norm).digest('hex').substring(0, 16)}`;
    const passwordHash = hashPassword(data.password);
    const verificationToken = generateVerificationToken(norm);

    const profileData = {
      id,
      email: norm,
      full_name: data.fullName.trim(),
      password_hash: passwordHash,
      email_verified: false,
      verification_token: verificationToken,
      institution: (data.institution || 'Sathyabama Institute of Science and Technology').trim(),
      phone: data.phone?.trim() || null,
      department: data.department?.trim() || null,
      year_of_study: data.yearOfStudy || null,
      tshirt_size: data.tshirtSize || null,
      role: 'STUDENT',
      created_at: new Date().toISOString()
    };

    const { data: savedProfile, error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'email' })
      .select()
      .single();

    if (error || !savedProfile) {
      return { success: false, error: error ? error.message : 'Failed to register student' };
    }

    const account = profileToStudentAccount(savedProfile);
    await this.addAuditLog(norm, 'STUDENT_REGISTER', `New student builder account registered: ${norm}`);

    return {
      success: true,
      account,
      verificationToken
    };
  },

  async verifyStudentEmail(token: string): Promise<{ success: boolean; account?: StudentAccount; error?: string }> {
    const verification = verifyEmailToken(token);
    if (!verification.valid || !verification.email) {
      return { success: false, error: verification.expired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN' };
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const norm = verification.email.toLowerCase();
    const existing = await this.getStudentByEmail(norm);
    if (!existing) {
      return { success: false, error: 'ACCOUNT_NOT_FOUND' };
    }

    const verifiedAt = new Date().toISOString();
    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update({
        email_verified: true,
        email_verified_at: verifiedAt
      })
      .eq('email', norm)
      .select()
      .single();

    if (error || !updatedProfile) {
      return { success: false, error: error ? error.message : 'Failed to verify email' };
    }

    // Link existing waitlist registration
    await supabase
      .from('waitlist')
      .update({ profile_id: existing.id })
      .eq('email', norm);

    await this.addAuditLog(norm, 'STUDENT_EMAIL_VERIFIED', `Email verified for student: ${norm}`);
    return { success: true, account: profileToStudentAccount(updatedProfile) };
  },

  async authenticateStudent(email: string, password: string): Promise<{ success: boolean; account?: StudentAccount; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const norm = email.trim().toLowerCase();
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', norm)
      .single();

    if (error || !profile || !profile.password_hash) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    const isValid = verifyPassword(password, profile.password_hash);
    if (!isValid) {
      return { success: false, error: 'INVALID_CREDENTIALS' };
    }

    const lastLogin = new Date().toISOString();
    await supabase
      .from('profiles')
      .update({ last_login_at: lastLogin })
      .eq('id', profile.id);

    profile.last_login_at = lastLogin;
    return { success: true, account: profileToStudentAccount(profile) };
  },

  async requestPasswordReset(email: string): Promise<{ success: boolean; resetToken?: string; error?: string }> {
    const student = await this.getStudentByEmail(email);
    if (!student) {
      // Anti-enumeration: Return success even if email not found
      return { success: true };
    }

    const resetToken = generatePasswordResetToken(student.email);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      await supabase
        .from('profiles')
        .update({
          password_reset_token: resetToken,
          password_reset_expires_at: expiresAt
        })
        .eq('id', student.id);
    }

    return { success: true, resetToken };
  },

  async resetStudentPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    const result = verifyPasswordResetToken(token);
    if (!result.valid || !result.email) {
      return { success: false, error: result.expired ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN' };
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const norm = result.email.toLowerCase();
    const student = await this.getStudentByEmail(norm);
    if (!student) {
      return { success: false, error: 'ACCOUNT_NOT_FOUND' };
    }

    const passwordHash = hashPassword(newPassword);
    const { error } = await supabase
      .from('profiles')
      .update({
        password_hash: passwordHash,
        password_reset_token: null,
        password_reset_expires_at: null
      })
      .eq('id', student.id);

    if (error) {
      return { success: false, error: error.message };
    }

    await this.addAuditLog(norm, 'PASSWORD_RESET', `Password successfully reset for student: ${norm}`);
    return { success: true };
  },

  async updateStudentProfile(id: string, updates: Partial<StudentAccount>): Promise<{ success: boolean; account?: StudentAccount; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const pgUpdates: any = {};
    if (updates.fullName !== undefined) pgUpdates.full_name = updates.fullName.trim();
    if (updates.phone !== undefined) pgUpdates.phone = updates.phone;
    if (updates.institution !== undefined) pgUpdates.institution = updates.institution.trim();
    if (updates.department !== undefined) pgUpdates.department = updates.department;
    if (updates.yearOfStudy !== undefined) pgUpdates.year_of_study = updates.yearOfStudy;
    if (updates.portfolioUrl !== undefined) pgUpdates.portfolio_url = updates.portfolioUrl;
    if (updates.githubUrl !== undefined) pgUpdates.github_url = updates.githubUrl;
    if (updates.linkedinUrl !== undefined) pgUpdates.linkedin_url = updates.linkedinUrl;
    if (updates.tshirtSize !== undefined) pgUpdates.tshirt_size = updates.tshirtSize;

    const { data, error } = await supabase
      .from('profiles')
      .update(pgUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return { success: false, error: error ? error.message : 'ACCOUNT_NOT_FOUND' };
    }

    return { success: true, account: profileToStudentAccount(data) };
  },

  async getStudentTeam(email: string): Promise<ParticipantTeam | null> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;

    const norm = email.trim().toLowerCase();

    // Check if leader
    const { data: leaderTeams } = await supabase
      .from('teams')
      .select('*, team_members(*)')
      .eq('leader_email', norm)
      .limit(1);

    if (leaderTeams && leaderTeams.length > 0) {
      const teams = await this.getTeams();
      return teams.find(t => t.id === leaderTeams[0].id) || null;
    }

    // Check if member
    const { data: memberRows } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('email', norm)
      .limit(1);

    if (memberRows && memberRows.length > 0) {
      const teamId = memberRows[0].team_id;
      const teams = await this.getTeams();
      return teams.find(t => t.id === teamId) || null;
    }

    return null;
  },

  async getStudentWaitlist(email: string): Promise<WaitlistEntry | null> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return null;

    const norm = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', norm)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      phone: data.phone,
      institution: data.institution,
      yearOfStudy: data.year_of_study,
      department: data.department,
      preferredTrack: data.preferred_track,
      portfolioUrl: data.portfolio_url,
      motivation: data.motivation,
      teamStatus: data.team_status,
      teamCode: data.team_code,
      experienceLevel: data.experience_level,
      tShirtSize: data.tshirt_size,
      status: data.status,
      ipAddress: data.ip_address,
      userAgent: data.user_agent,
      createdAt: data.created_at
    };
  },

  // --------------------------------------------------------------------------
  // 13. QUALIFIER & EVALUATION EXTENSIONS
  // --------------------------------------------------------------------------
  async submitRound1Qualifier(teamCode: string, data: { loomVideoUrl: string; githubUrl: string }): Promise<boolean> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return false;

    const team = await this.getTeamByCode(teamCode);
    if (!team) return false;

    const pgUpdates: any = {
      loom_video_url: data.loomVideoUrl,
      github_url: data.githubUrl,
    };
    if (team.selectionStage === 'ROUND_0_APPLICANT') {
      pgUpdates.selection_stage = 'ONLINE_SEMI_FINALIST';
    }

    const { error } = await supabase
      .from('teams')
      .update(pgUpdates)
      .eq('id', team.id);

    if (error) return false;

    await this.addAuditLog(
      team.leaderEmail,
      'QUALIFIER_SUBMITTED',
      `Round 1 qualifier artifacts submitted for team ${team.teamCode || team.id} (Loom: ${data.loomVideoUrl})`
    );
    return true;
  },

  async getEvaluations(): Promise<CheckpointEvaluation[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .order('evaluated_at', { ascending: false });

    if (error || !data) return [];
    return data.map(evaluationRowToEntity);
  },

  async getTeamEvaluations(teamIdOrCode: string): Promise<CheckpointEvaluation[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const team = await this.getTeamByCode(teamIdOrCode);
    const targetTeamId = team ? team.id : teamIdOrCode;

    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('team_id', targetTeamId)
      .order('checkpoint_gate', { ascending: true });

    if (error || !data) return [];
    return data.map(evaluationRowToEntity);
  },

  async saveEvaluation(
    evalData: {
      teamId: string;
      judgeId: string;
      checkpointGate: number;
      criterion1Score: number;
      criterion2Score: number;
      criterion3Score: number;
      criterion4Score: number;
      qualitativeFeedback?: string;
    },
    isEdit = false,
    editorName?: string,
    editReason?: string
  ): Promise<{ success: boolean; evaluation?: CheckpointEvaluation; duplicate?: boolean; updated?: boolean; error?: string }> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const team = await this.getTeamByCode(evalData.teamId);
    const targetTeamId = team ? team.id : evalData.teamId;

    const existing = await this.getEvaluationByJudgeAndTeam(evalData.judgeId, targetTeamId, evalData.checkpointGate);

    if (existing && !isEdit) {
      return {
        success: false,
        duplicate: true,
        error: `Team ${team?.teamCode || targetTeamId} has already been evaluated for Checkpoint Gate ${evalData.checkpointGate} by this judge. Use edit mode to update score.`,
        evaluation: existing
      };
    }

    const rawTotalScore = evalData.criterion1Score + evalData.criterion2Score + evalData.criterion3Score + evalData.criterion4Score;

    // Compute Z-score based on judge's historical scoring distribution
    const allEvaluations = await this.getEvaluations();
    const judgeScores = allEvaluations
      .filter(e => e.judgeId === evalData.judgeId && !(existing && e.id === existing.id))
      .map(e => e.rawTotalScore);
    judgeScores.push(rawTotalScore);

    const judgeMean = judgeScores.reduce((acc, s) => acc + s, 0) / judgeScores.length;
    const variance = judgeScores.reduce((acc, s) => acc + Math.pow(s - judgeMean, 2), 0) / judgeScores.length;
    const judgeStdDev = Math.sqrt(variance);
    const normalizedZScore = judgeStdDev > 0 ? (rawTotalScore - judgeMean) / judgeStdDev : 0.0;

    const evaluatedAt = new Date().toISOString();
    const id = existing?.id || `eval-${targetTeamId}-g${evalData.checkpointGate}-${evalData.judgeId}`;

    const upsertPayload = {
      id,
      team_id: targetTeamId,
      judge_id: evalData.judgeId,
      checkpoint_gate: evalData.checkpointGate,
      criterion1_score: evalData.criterion1Score,
      criterion2_score: evalData.criterion2Score,
      criterion3_score: evalData.criterion3Score,
      criterion4_score: evalData.criterion4Score,
      raw_total_score: rawTotalScore,
      normalized_z_score: Number(normalizedZScore.toFixed(3)),
      qualitative_feedback: evalData.qualitativeFeedback?.trim() || null,
      recused_conflict: false,
      evaluated_at: evaluatedAt
    };

    const { data: savedRow, error } = await supabase
      .from('evaluations')
      .upsert(upsertPayload, { onConflict: 'team_id,judge_id,checkpoint_gate' })
      .select()
      .single();

    if (error || !savedRow) {
      return { success: false, error: error ? error.message : 'Evaluation persistence error' };
    }

    const finalEval = evaluationRowToEntity(savedRow);
    const actor = editorName || evalData.judgeId;
    await this.addAuditLog(
      actor,
      isEdit ? 'UPDATE_EVALUATION' : 'SUBMIT_EVALUATION',
      `${isEdit ? 'Calibrated' : 'Recorded'} Gate ${evalData.checkpointGate} score [${rawTotalScore}/100, Z: ${finalEval.normalizedZScore}] for team ${team?.teamCode || targetTeamId} by ${actor}${editReason ? ` (Reason: ${editReason})` : ''}`
    );

    return {
      success: true,
      updated: Boolean(isEdit),
      evaluation: finalEval
    };
  },

  // --------------------------------------------------------------------------
  // 14. REFERRAL (RAINMAKER) EXTENSIONS
  // --------------------------------------------------------------------------
  async addReferral(lead: Omit<SponsorReferralLead, 'id' | 'lockExpiryDate' | 'status' | 'submittedAt'>): Promise<SponsorReferralLead> {
    const supabase = getSupabaseAdminClient();
    const id = `rain-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const lockExpiryDate = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString();
    const submittedAt = new Date().toISOString();
    const refCode = lead.referralCode || `RAIN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newLead: SponsorReferralLead = {
      ...lead,
      id,
      referralCode: refCode,
      lockExpiryDate,
      status: 'LEAD_SUBMITTED',
      submittedAt
    };

    if (!supabase) return newLead;

    const row = {
      id,
      referral_code: refCode,
      referrer_name: lead.referrerName,
      referrer_email: lead.referrerEmail,
      referrer_phone: lead.referrerPhone || null,
      referrer_college: lead.referrerCollege || null,
      referrer_upi_id: lead.referrerUpiId || null,
      company_name: lead.companyName,
      decision_maker_name: lead.decisionMakerName,
      decision_maker_email: lead.decisionMakerEmail,
      decision_maker_designation: lead.decisionMakerDesignation,
      company_poc_name: lead.companyPocName,
      company_poc_role: lead.companyPocRole,
      company_poc_contact: lead.companyPocContact,
      target_tier: lead.targetTier,
      introContext: lead.introContext,
      estimated_deal_tier: lead.estimatedDealTier || null,
      notes: lead.notes || null,
      lock_expiry_date: lockExpiryDate,
      status: 'LEAD_SUBMITTED',
      commission_rate: lead.commissionRate || 10,
      estimated_payout: lead.estimatedPayout || 0,
      payout_amount: lead.payoutAmount || 0,
      submitted_at: submittedAt
    };

    await supabase.from('referrals').insert(row);
    await this.addAuditLog(lead.referrerEmail || 'unknown', 'SUBMIT_REFERRAL', `Submitted Rainmaker lead for ${lead.companyName} (${refCode})`);
    return newLead;
  },

  async getReferralByCode(code: string): Promise<SponsorReferralLead | undefined> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return undefined;

    const norm = code.trim().toUpperCase();
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referral_code', norm)
      .single();

    if (error || !data) return undefined;
    return referralRowToLead(data);
  },

  async searchReferral(query: string): Promise<SponsorReferralLead[]> {
    const all = await this.getReferrals();
    const q = query.trim().toLowerCase();
    return all.filter(r =>
      (r.referralCode || '').toLowerCase().includes(q) ||
      (r.referrerName || '').toLowerCase().includes(q) ||
      (r.referrerEmail || '').toLowerCase().includes(q) ||
      (r.companyName || '').toLowerCase().includes(q)
    );
  },

  // --------------------------------------------------------------------------
  // 15. MEMBERS & METRICS EXTENSIONS
  // --------------------------------------------------------------------------
  async getMemberByUsername(username: string): Promise<OrgMember | undefined> {
    const members = await this.getMembers();
    return members.find(m => m.username.toLowerCase() === username.trim().toLowerCase());
  },

  async getMetrics(): Promise<any> {
    const [waitlist, teams, sponsors, referrals, radar, csat] = await Promise.all([
      this.getWaitlist(),
      this.getTeams(),
      this.getSponsors(),
      this.getReferrals(),
      this.getRadarSignals(),
      this.getCSAT()
    ]);

    return {
      totalApplicants: waitlist.length,
      totalTeams: teams.length,
      finalistTeams: teams.filter(t => t.selectionStage === 'ON_CAMPUS_QUALIFIED').length,
      semiFinalistTeams: teams.filter(t => t.selectionStage === 'ONLINE_SEMI_FINALIST').length,
      totalSponsors: sponsors.length,
      totalReferrals: referrals.length,
      totalRadarSignals: radar.length,
      totalCSATResponses: csat.length,
    };
  },

  // --------------------------------------------------------------------------
  // 16. NOTIFICATION LOGS EXTENSIONS
  // --------------------------------------------------------------------------
  async getNotificationLogs(limit = 100): Promise<NotificationLog[]> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from('notification_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data.map((row: any) => ({
      id: row.id,
      to: row.recipient,
      subject: row.subject,
      template: row.template,
      status: row.status,
      attempts: row.attempts,
      idempotencyKey: row.idempotency_key || undefined,
      messageId: row.message_id || undefined,
      error: row.error_message || undefined,
      timestamp: row.created_at
    }));
  },

  async addNotificationLog(log: Omit<NotificationLog, 'id' | 'timestamp'>): Promise<NotificationLog> {
    const supabase = getSupabaseAdminClient();
    const id = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();

    const newLog: NotificationLog = {
      ...log,
      id,
      timestamp
    };

    if (!supabase) return newLog;

    await supabase.from('notification_logs').insert({
      id,
      recipient: log.to,
      subject: log.subject,
      template: log.template,
      status: log.status,
      attempts: log.attempts,
      idempotency_key: log.idempotencyKey || null,
      message_id: log.messageId || null,
      error_message: log.error || null,
      created_at: timestamp
    });

    return newLog;
  },

  async getNotificationByIdempotencyKey(key: string): Promise<NotificationLog | undefined> {
    const supabase = getSupabaseAdminClient();
    if (!supabase) return undefined;

    const { data, error } = await supabase
      .from('notification_logs')
      .select('*')
      .eq('idempotency_key', key)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return undefined;
    return {
      id: data.id,
      to: data.recipient,
      subject: data.subject,
      template: data.template,
      status: data.status,
      attempts: data.attempts,
      idempotencyKey: data.idempotency_key || undefined,
      messageId: data.message_id || undefined,
      error: data.error_message || undefined,
      timestamp: data.created_at
    };
  },

  getDriver(): 'supabase' {
    return 'supabase';
  }
};
