/**
 * KAIROS 2027 — POSTGRESQL REPOSITORY IMPLEMENTATION
 * 
 * Provides production-grade PostgreSQL CRUD operations using Supabase.
 * Maps relational tables (profiles, waitlist, teams, team_members, etc.)
 * back to existing domain models defined in src/types/index.ts.
 */

import { getSupabaseAdminClient, isSupabaseConfigured } from './supabase';
import { sanitizeCsvCell } from './csv';
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
  OrgMember
} from '../types';

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
    const { data, error } = await supabase
      .from('teams')
      .select('*, team_members(*)')
      .eq('team_code', normCode)
      .single();

    if (error || !data) return null;

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
      .eq('access_pin', pin.trim())
      .eq('is_active', true)
      .single();

    if (error || !data) return null;
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

  async addJudge(judgeData: Omit<Judge, 'id'>, organizerName?: string): Promise<Judge> {
    const supabase = getSupabaseAdminClient();
    const id = `judge-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const accessPin = judgeData.accessPin?.trim() || String(Math.floor(100000 + Math.random() * 900000));
    const judge: Judge = {
      ...judgeData,
      id,
      accessPin,
      isActive: judgeData.isActive ?? true,
      createdAt: new Date().toISOString()
    };

    if (supabase) {
      await supabase.from('judges').insert({
        id,
        access_pin: accessPin,
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
    if (updates.accessPin !== undefined) pgUpdates.access_pin = updates.accessPin.trim();
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
  }
};
