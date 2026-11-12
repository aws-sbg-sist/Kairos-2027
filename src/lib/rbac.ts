/**
 * KAIROS 2027 — CENTRALIZED ROLE-BASED ACCESS CONTROL (RBAC)
 * 
 * Provides server-enforced authorization rules, permission matrix, and
 * identity guards across all 5 system roles:
 * - STUDENT: Participant view of own profile, team, and event schedule.
 * - TEAM_LEADER: All student permissions + team management and deliverable submissions.
 * - JUDGE: Scoped evaluation access restricted to assigned tracks/checkpoints.
 * - ORGANIZER: Operational access to registrations, teams, and inquiries.
 * - SUPER_ADMIN: Global root governance (feature flags, exports, organizers, audit logs).
 * 
 * STRICT IDENTITY RULE:
 * - Authorization data is derived exclusively from verified server-side sessions.
 * - Role claims supplied by client headers or request bodies are strictly ignored.
 */

import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { getCurrentAdminSession, AdminSession } from './auth';
import { getCurrentStudentSession, StudentSession } from './student_auth';
import { getCurrentJudgeSession, JudgeSession } from './judge_auth';
import { db } from './db';
import { ParticipantTeam, Judge } from '@/types';

export type KairosRole = 
  | 'STUDENT' 
  | 'TEAM_LEADER' 
  | 'JUDGE' 
  | 'ORGANIZER' 
  | 'SUPER_ADMIN' 
  | 'ANONYMOUS';

export type KairosPermission =
  // Student Permissions
  | 'profile:read_own'
  | 'profile:update_own'
  | 'team:view_own'
  | 'event:view_public'
  // Team Leader Permissions
  | 'team:manage_details'
  | 'team:invite_members'
  | 'team:submit_artifacts'
  // Judge Permissions
  | 'judging:view_assigned'
  | 'judging:submit_evaluation'
  // Organizer Permissions
  | 'waitlist:read'
  | 'waitlist:update_status'
  | 'sponsors:read'
  | 'referrals:read'
  | 'teams:read_all'
  | 'teams:manage'
  | 'abstracts:review'
  | 'judges:manage'
  | 'checkin:manage'
  | 'submissions:manage'
  | 'audit:log'
  | 'notifications:read'
  | 'notifications:broadcast'
  // Super Admin Permissions
  | 'waitlist:export'
  | 'sponsors:export'
  | 'csat:read'
  | 'csat:export'
  | 'flags:update'
  | 'organizers:manage'
  | 'audit:read'
  | 'system:admin';

// ------------------------------------------------------------------------------
// 1. CENTRAL PERMISSION MATRIX
// ------------------------------------------------------------------------------
export const ROLE_PERMISSIONS: Record<KairosRole, Set<KairosPermission>> = {
  ANONYMOUS: new Set<KairosPermission>([
    'event:view_public'
  ]),

  STUDENT: new Set<KairosPermission>([
    'profile:read_own',
    'profile:update_own',
    'team:view_own',
    'event:view_public'
  ]),

  TEAM_LEADER: new Set<KairosPermission>([
    'profile:read_own',
    'profile:update_own',
    'team:view_own',
    'event:view_public',
    'team:manage_details',
    'team:invite_members',
    'team:submit_artifacts'
  ]),

  JUDGE: new Set<KairosPermission>([
    'judging:view_assigned',
    'judging:submit_evaluation',
    'event:view_public'
  ]),

  ORGANIZER: new Set<KairosPermission>([
    'waitlist:read',
    'waitlist:update_status',
    'sponsors:read',
    'referrals:read',
    'teams:read_all',
    'teams:manage',
    'abstracts:review',
    'judges:manage',
    'checkin:manage',
    'submissions:manage',
    'audit:log',
    'notifications:read',
    'notifications:broadcast',
    'event:view_public'
  ]),

  SUPER_ADMIN: new Set<KairosPermission>([
    'profile:read_own',
    'profile:update_own',
    'team:view_own',
    'event:view_public',
    'team:manage_details',
    'team:invite_members',
    'team:submit_artifacts',
    'judging:view_assigned',
    'judging:submit_evaluation',
    'waitlist:read',
    'waitlist:update_status',
    'waitlist:export',
    'sponsors:read',
    'sponsors:export',
    'referrals:read',
    'teams:read_all',
    'teams:manage',
    'abstracts:review',
    'judges:manage',
    'checkin:manage',
    'submissions:manage',
    'csat:read',
    'csat:export',
    'flags:update',
    'organizers:manage',
    'audit:log',
    'audit:read',
    'notifications:read',
    'notifications:broadcast',
    'system:admin'
  ])
};

export function hasPermission(role: KairosRole, permission: KairosPermission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.has(permission) : false;
}

// ------------------------------------------------------------------------------
// 2. SERVER-SIDE ROLE DERIVATION (Zero Client Trust)
// ------------------------------------------------------------------------------
export interface AuthContext {
  role: KairosRole;
  studentSession: StudentSession | null;
  adminSession: AdminSession | null;
  judgeSession?: JudgeSession | null;
  email: string | null;
  isLeaderOfTeam?: string; // teamCode if leader
}

export async function resolveAuthContext(): Promise<AuthContext> {
  // 1. Evaluate Administrator Session first
  const admin = await getCurrentAdminSession();
  if (admin) {
    // Determine if Super Admin (President / Apex / Master Key) vs Operational Organizer
    const isSuper = 
      admin.organizerName === 'Thenappan T' || 
      admin.organizerRole.toLowerCase().includes('president') || 
      admin.organizerRole.toLowerCase().includes('apex') ||
      admin.organizerRole.toLowerCase().includes('super_admin');

    return {
      role: isSuper ? 'SUPER_ADMIN' : 'ORGANIZER',
      studentSession: null,
      adminSession: admin,
      judgeSession: null,
      email: null
    };
  }

  // 2. Evaluate Student Session
  const student = await getCurrentStudentSession();
  if (student) {
    // Check if student is a team leader
    const team = db.getStudentTeam(student.email);
    const isLeader = team && (
      team.leaderEmail.toLowerCase() === student.email.toLowerCase() ||
      (team.members || []).some(m => m.email.toLowerCase() === student.email.toLowerCase() && m.role === 'Leader')
    );

    return {
      role: isLeader ? 'TEAM_LEADER' : 'STUDENT',
      studentSession: student,
      adminSession: null,
      judgeSession: null,
      email: student.email,
      isLeaderOfTeam: isLeader && team ? team.teamCode : undefined
    };
  }

  // 3. Evaluate Judge Session
  const judge = await getCurrentJudgeSession();
  if (judge) {
    return {
      role: 'JUDGE',
      studentSession: null,
      adminSession: null,
      judgeSession: judge,
      email: null
    };
  }

  // 4. Fallback to Anonymous
  return {
    role: 'ANONYMOUS',
    studentSession: null,
    adminSession: null,
    judgeSession: null,
    email: null
  };
}

// ------------------------------------------------------------------------------
// 3. TEAM OWNERSHIP & LEADER AUTHORIZATION
// ------------------------------------------------------------------------------
export function verifyTeamLeader(studentEmail: string, teamCode: string): { 
  authorized: boolean; 
  team?: ParticipantTeam; 
  error?: string;
  statusCode: number;
} {
  if (!studentEmail) {
    return { authorized: false, error: 'Authentication required.', statusCode: 401 };
  }

  const cleanCode = (teamCode || '').trim().toUpperCase();
  const team = db.getTeamByCode(cleanCode) || db.getTeams().find(t => (t.id && t.id.toUpperCase() === cleanCode) || (t.teamCode && t.teamCode.toUpperCase() === cleanCode));
  if (!team) {
    return { authorized: false, error: `Team ${teamCode} not found.`, statusCode: 404 };
  }

  const normEmail = studentEmail.trim().toLowerCase();
  const isLeader = 
    (team.leaderEmail && team.leaderEmail.toLowerCase() === normEmail) ||
    (team.members || []).some(m => m.email.toLowerCase() === normEmail && m.role === 'Leader');

  if (!isLeader) {
    const isMember = (team.members || []).some(m => m.email.toLowerCase() === normEmail);
    if (isMember) {
      return { 
        authorized: false, 
        error: 'Forbidden: Only the designated Team Leader can perform this action.',
        statusCode: 403 
      };
    }
    return { 
      authorized: false, 
      error: 'Forbidden: You are not a member of this team.', 
      statusCode: 403 
    };
  }

  return { authorized: true, team, statusCode: 200 };
}

// ------------------------------------------------------------------------------
// 4. JUDGE CREDENTIAL & TRACK ASSIGNMENT AUTHORIZATION
// ------------------------------------------------------------------------------
export function verifyJudgeAuthorization(
  judgeId: string, 
  judgePin: string, 
  targetTeamId?: string
): { 
  authorized: boolean; 
  judge?: Judge; 
  error?: string;
  statusCode: number;
} {
  if (!judgeId || !judgePin) {
    return { authorized: false, error: 'Missing judge credentials (judgeId and access PIN).', statusCode: 400 };
  }

  const judges = db.getJudges();
  const judge = judges.find(j => j.id === judgeId && j.isActive);
  if (!judge) {
    return { authorized: false, error: 'Judge account not found or is currently inactive.', statusCode: 403 };
  }

  const pinBuffer = Buffer.from(String(judgePin).trim());
  const expectedBuffer = Buffer.from(String(judge.accessPin).trim());

  if (pinBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(pinBuffer, expectedBuffer)) {
    return { authorized: false, error: 'Invalid Jury Access PIN for this judge account.', statusCode: 403 };
  }

  // If a target team is specified, verify track specialization compatibility
  if (targetTeamId) {
    const teams = db.getTeams();
    const cleanId = (targetTeamId || '').trim().toLowerCase();
    const team = teams.find(t => 
      (t.id && t.id.toLowerCase() === cleanId) || 
      (t.teamCode && t.teamCode.toLowerCase() === cleanId) ||
      (t.inviteCode && t.inviteCode.toLowerCase() === cleanId)
    );

    if (!team) {
      return { authorized: false, error: `Team ${targetTeamId} not found.`, statusCode: 404 };
    }

    if (judge.trackSpecialization) {
      // Check if judge track specialization encompasses this team's track
      const spec = judge.trackSpecialization.toLowerCase();
      const teamTrack = team.trackId.toLowerCase().replace(/^track-/, '');
      
      const trackMatch = 
        spec.includes('all') ||
        spec.includes(teamTrack) ||
        (teamTrack.includes('cloud') && spec.includes('cloud')) ||
        (teamTrack.includes('ai') && spec.includes('ai')) ||
        ((teamTrack.includes('fintech') || teamTrack.includes('trust')) && (spec.includes('fintech') || spec.includes('trust'))) ||
        (teamTrack.includes('open') && spec.includes('open')) ||
        (teamTrack.includes('edge') && spec.includes('edge')) ||
        (teamTrack.includes('iot') && spec.includes('iot')) ||
        (teamTrack.includes('distributed') && spec.includes('distributed'));

      if (!trackMatch) {
        return { 
          authorized: false, 
          error: `Forbidden: Judge ${judge.fullName} is assigned to [${judge.trackSpecialization}], but team is in [${team.trackId}].`,
          statusCode: 403 
        };
      }
    }
  }

  return { authorized: true, judge, statusCode: 200 };
}
