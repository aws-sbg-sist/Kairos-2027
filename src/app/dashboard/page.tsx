'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Cloud, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Clock, 
  Award,
  Video,
  FileCode,
  QrCode,
  Copy,
  Check,
  AlertCircle,
  PlusCircle,
  Bell,
  Github,
  LogOut,
  Radio,
  Pencil,
  UserPlus,
  Trash2,
  Crown,
  FileText
} from 'lucide-react';
import { ParticipantTeam, WaitlistEntry, CheckpointEvaluation } from '@/types';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { DeckUploader } from '@/components/forms/DeckUploader';

interface StudentProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  institution: string;
  department?: string;
  yearOfStudy?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  tshirtSize?: string;
  emailVerified: boolean;
}

interface Announcement {
  id: string;
  title: string;
  category: string;
  urgency: string;
  date: string;
  summary: string;
  actionUrl?: string;
  actionLabel?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [team, setTeam] = useState<ParticipantTeam | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry | null>(null);
  const [evaluations, setEvaluations] = useState<CheckpointEvaluation[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [actionMsg, setActionMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Squad Management States (Edit, Invite, Transfer, Leave/Remove)
  const [showEditTeam, setShowEditTeam] = useState(false);
  const [savingTeam, setSavingTeam] = useState(false);
  const [editForm, setEditForm] = useState({
    teamName: '',
    trackId: TECHNICAL_TRACKS[0].id,
    problemTitle: '',
    problemAbstract: '',
    architecturePdfUrl: '',
    githubUrl: '',
  });
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [newLeaderEmail, setNewLeaderEmail] = useState('');
  const [transferring, setTransferring] = useState(false);
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch authenticated student profile and team details
    fetch('/api/v1/student/me')
      .then(res => {
        if (res.status === 401) {
          setStudent(null);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.success) {
          setStudent(data.student || null);
          setTeam(data.team || null);
          if (data.team) {
            setEditForm({
              teamName: data.team.teamName || '',
              trackId: data.team.trackId || TECHNICAL_TRACKS[0].id,
              problemTitle: data.team.problemTitle || '',
              problemAbstract: data.team.problemAbstract || '',
              architecturePdfUrl: data.team.architecturePdfUrl || '',
              githubUrl: data.team.githubUrl || '',
            });
          }
          setWaitlist(data.waitlist || null);
          setEvaluations(data.evaluations || []);
        }
      })
      .catch(err => console.error('[Dashboard Session Error]:', err))
      .finally(() => setLoading(false));

    // 2. Fetch event announcements
    fetch('/api/v1/announcements')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.announcements) {
          setAnnouncements(data.announcements);
        }
      })
      .catch(err => console.error('[Dashboard Announcements Error]:', err));
  }, []);

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  const copyInvite = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2000);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('[Logout Error]:', err);
      setLoggingOut(false);
    }
  };

  const syncTeamState = (updatedTeam: ParticipantTeam) => {
    setTeam(updatedTeam);
    setEditForm({
      teamName: updatedTeam.teamName || '',
      trackId: updatedTeam.trackId || TECHNICAL_TRACKS[0].id,
      problemTitle: updatedTeam.problemTitle || '',
      problemAbstract: updatedTeam.problemAbstract || '',
      architecturePdfUrl: updatedTeam.architecturePdfUrl || '',
      githubUrl: updatedTeam.githubUrl || '',
    });
  };

  const isTeamLeader = Boolean(
    team &&
    student &&
    (team.leaderEmail?.toLowerCase() === student.email.toLowerCase() ||
      (team.members || []).some(m => m.email?.toLowerCase() === student.email.toLowerCase() && m.role === 'Leader'))
  );

  const handleSaveTeamEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;
    setSavingTeam(true);
    setActionMsg(null);
    try {
      const res = await fetch('/api/v1/team', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode: team.teamCode || team.id,
          ...editForm,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.team) {
        syncTeamState(data.team);
        setShowEditTeam(false);
        setActionMsg({ type: 'ok', text: 'Team details and deliverables saved!' });
      } else {
        setActionMsg({ type: 'err', text: data.error || 'Failed to update team details.' });
      }
    } catch {
      setActionMsg({ type: 'err', text: 'Network error updating team details.' });
    } finally {
      setSavingTeam(false);
    }
  };

  const handleInviteTeammate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team || !inviteEmail.trim()) return;
    setInviting(true);
    setActionMsg(null);
    try {
      const res = await fetch('/api/v1/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode: team.teamCode || team.id,
          inviteeEmail: inviteEmail.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMsg({ type: 'ok', text: data.message || `Invitation sent to ${inviteEmail.trim()}` });
        setInviteEmail('');
      } else {
        setActionMsg({ type: 'err', text: data.error || 'Failed to send invite.' });
      }
    } catch {
      setActionMsg({ type: 'err', text: 'Network error sending invitation.' });
    } finally {
      setInviting(false);
    }
  };

  const handleRemoveOrLeaveMember = async (memberEmail: string) => {
    if (!team) return;
    const isSelf = student?.email.toLowerCase() === memberEmail.toLowerCase();
    if (!confirm(isSelf ? 'Are you sure you want to leave this squad?' : `Remove ${memberEmail} from your squad?`)) {
      return;
    }
    setRemovingEmail(memberEmail);
    setActionMsg(null);
    try {
      const res = await fetch('/api/v1/team/members', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode: team.teamCode || team.id,
          memberEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (isSelf) {
          setTeam(null);
          setActionMsg({ type: 'ok', text: 'You have left the squad.' });
        } else if (data.team) {
          syncTeamState(data.team);
          setActionMsg({ type: 'ok', text: data.message || 'Member removed.' });
        }
      } else {
        setActionMsg({ type: 'err', text: data.error || 'Failed to remove member.' });
      }
    } catch {
      setActionMsg({ type: 'err', text: 'Network error updating roster.' });
    } finally {
      setRemovingEmail(null);
    }
  };

  const handleTransferLeadership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team || !newLeaderEmail) return;
    if (!confirm(`Transfer Team Leader captaincy to ${newLeaderEmail}? You will become a Backend squad member.`)) {
      return;
    }
    setTransferring(true);
    setActionMsg(null);
    try {
      const res = await fetch('/api/v1/team/transfer-leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode: team.teamCode || team.id,
          newLeaderEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.team) {
        syncTeamState(data.team);
        setNewLeaderEmail('');
        setActionMsg({ type: 'ok', text: data.message || 'Leadership transferred.' });
      } else {
        setActionMsg({ type: 'err', text: data.error || 'Failed to transfer leadership.' });
      }
    } catch {
      setActionMsg({ type: 'err', text: 'Network error transferring leadership.' });
    } finally {
      setTransferring(false);
    }
  };

  const getStageBadge = (stage?: string) => {
    switch (stage) {
      case 'ON_CAMPUS_QUALIFIED':
        return {
          title: 'STAGE 2: ON-CAMPUS FINALIST (JAN 22–24)',
          desc: 'Qualified for Physical Grand Finale at Sathyabama Indoor Auditorium, Chennai.',
          badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      case 'ONLINE_SEMI_FINALIST':
        return {
          title: 'STAGE 1: ONLINE QUALIFIER QUALIFIED (JAN 02–04)',
          desc: 'Shortlisted among the Top 250 Semi-Finalists. Complete your Loom video and code defense.',
          badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
        };
      default:
        return {
          title: 'STAGE 0: ROUND 0 APPLICANT',
          desc: 'Abstract under initial technical review. Ensure your team has 3–6 verified members.',
          badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-500/40'
        };
    }
  };

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24">
          <div className="text-center space-y-4">
            <div className="w-10 h-10 border-3 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400">Loading authenticated builder dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 2. Unauthenticated Protected View
  if (!student) {
    return (
      <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-4 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="w-full max-w-md bg-slate-900/90 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl text-center z-10 shadow-2xl space-y-6">
            <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto text-purple-400">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-display font-black text-white">
                Builder Dashboard Sign In
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authentication required. Sign in with your registered student builder credentials to view your live squad roster, evaluation gates, and digital pass.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/register"
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Register as Student Builder</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-400">
                ← Return to Main Stage
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stage = getStageBadge(team?.selectionStage);

  // Gate evaluation lookups
  const gate1Eval = evaluations.find(e => e.checkpointGate === 1);
  const gate2Eval = evaluations.find(e => e.checkpointGate === 2);
  const gate3Eval = evaluations.find(e => e.checkpointGate === 3);

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-purple-400 font-bold">BUILDER CENTRAL COMMAND</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {team ? `Team Code: ${team.teamCode || team.id}` : `Builder: ${student.fullName}`}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
                {team ? team.teamName : `${student.fullName} · Builder Console`}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/portal/pass"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center gap-2 transition-colors shadow-sm"
              >
                <QrCode className="w-4 h-4 text-purple-300" />
                <span>Smart Digital Pass</span>
              </Link>
              <Link
                href="/online-qualifier"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-purple-900 text-white hover:brightness-110 transition-colors shadow-md flex items-center gap-1.5"
              >
                <Video className="w-4 h-4" />
                <span>Round 1 Qualifier Bay</span>
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-rose-300 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 transition-colors flex items-center gap-1.5"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{loggingOut ? 'Signing Out...' : 'Sign Out'}</span>
              </button>
            </div>
          </div>

          {/* Verification Alert Banner if email not verified */}
          {!student.emailVerified && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-300 block">
                  Action Required: Please Verify Your Student Email Address
                </span>
                <p className="text-xs text-amber-200/80">
                  A verification token was sent to <span className="font-mono font-semibold text-white">{student.email}</span>. Click the link in your email to unlock official qualifier submissions.
                </p>
              </div>
            </div>
          )}

          {/* Announcements Ticker / Notification */}
          {announcements.length > 0 && (
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block">
                    LATEST OFFICIAL ANNOUNCEMENT
                  </span>
                  <span className="text-xs font-bold text-white block">
                    {announcements[0].title}
                  </span>
                  <span className="text-[11px] text-slate-300">
                    {announcements[0].summary}
                  </span>
                </div>
              </div>

              {announcements[0].actionUrl && (
                <Link
                  href={announcements[0].actionUrl}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>{announcements[0].actionLabel || 'Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}

          {/* Dynamic Stage Banner */}
          {team ? (
            <div className="p-6 rounded-3xl bg-aws-squidInk border border-purple-500/40 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border ${stage.badgeClass}`}>
                    {stage.title}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {stage.desc}
                  </h3>
                  {team.deskBayAllocation ? (
                    <p className="text-xs font-mono text-purple-300 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>Allocated Bay: <strong>{team.deskBayAllocation}</strong></span>
                    </p>
                  ) : (
                    <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>Desk Bay: Assigned at physical campus registration (Jan 22, 2027)</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <Link
                    href="/on-campus"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>Venue & Bus Fleet</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-aws-squidInk border border-purple-500/40 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border bg-purple-950/60 text-purple-300 border-purple-500/40">
                    STAGE 0: SQUAD FORMATION IN PROGRESS
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    You have an active builder identity, but are not enrolled in a hackathon squad yet.
                  </h3>
                  <p className="text-xs text-slate-300">
                    KAIROS 2027 requires squads of 3 to 6 builders. Create your team or join with an invite code.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/team/create"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create a Squad</span>
                  </Link>

                  <Link
                    href="/team/join"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>Join with Code</span>
                  </Link>

                  <Link
                    href="/radar"
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Find Teammates on Radar</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (8 cols): Roster & Checkpoints */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Team Roster Card */}
              {team ? (
                <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white font-display">
                        Verified Squad Roster ({team.members?.length || 0} / 6 Builders)
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {isTeamLeader && (
                        <button
                          type="button"
                          onClick={() => setShowEditTeam(prev => !prev)}
                          className="px-3 py-1 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-xs font-semibold text-purple-200 flex items-center gap-1.5 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>{showEditTeam ? 'Close Editor' : 'Edit Team & Deck'}</span>
                        </button>
                      )}
                      {team.inviteCode && (
                        <button
                          onClick={() => copyInvite(team.inviteCode || '')}
                          className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-1.5 transition-colors"
                          title="Copy Squad Join Code"
                        >
                          {copiedInvite ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>Code: {team.inviteCode}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {actionMsg && (
                    <div className={`p-3 rounded-xl text-xs border ${
                      actionMsg.type === 'ok'
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/50 border-rose-500/40 text-rose-300'
                    }`}>
                      {actionMsg.text}
                    </div>
                  )}

                  {/* Team Leader Editor (PATCH /api/v1/team) */}
                  {isTeamLeader && showEditTeam && (
                    <form onSubmit={handleSaveTeamEdit} className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-xs font-mono font-bold text-purple-300">UPDATE SQUAD DETAILS &amp; PITCH DECK</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-slate-300">Team Name</label>
                          <input
                            type="text"
                            required
                            value={editForm.teamName}
                            onChange={e => setEditForm({ ...editForm, teamName: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-slate-300">Technical Track</label>
                          <select
                            value={editForm.trackId}
                            onChange={e => setEditForm({ ...editForm, trackId: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
                          >
                            {TECHNICAL_TRACKS.map(t => (
                              <option key={t.id} value={t.id}>{t.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-300">Project Title</label>
                        <input
                          type="text"
                          required
                          value={editForm.problemTitle}
                          onChange={e => setEditForm({ ...editForm, problemTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-300">Project Abstract (Max 300 words)</label>
                        <textarea
                          rows={3}
                          required
                          value={editForm.problemAbstract}
                          onChange={e => setEditForm({ ...editForm, problemAbstract: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>
                      <DeckUploader
                        label="Round 0 / Architecture Pitch Deck (.pdf or .pptx)"
                        artifactType="pitch_deck"
                        value={editForm.architecturePdfUrl}
                        onChange={url => setEditForm({ ...editForm, architecturePdfUrl: url })}
                      />
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-slate-300">GitHub Repository URL</label>
                        <input
                          type="url"
                          value={editForm.githubUrl}
                          onChange={e => setEditForm({ ...editForm, githubUrl: e.target.value })}
                          placeholder="https://github.com/org/repo"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowEditTeam(false)}
                          className="px-4 py-2 rounded-xl text-xs text-slate-300 bg-white/5 hover:bg-white/10"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={savingTeam}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50"
                        >
                          {savingTeam ? 'Saving...' : 'Save Team Changes'}
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {team.members?.map((m: any, i: number) => {
                      const isSelf = student.email.toLowerCase() === m.email?.toLowerCase();
                      const canRemove =
                        (isTeamLeader && m.role !== 'Leader') ||
                        (!isTeamLeader && isSelf);
                      return (
                        <div key={m.id || m.email || i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 flex items-start justify-between gap-2">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white truncate">{m.name}</h4>
                              {m.role === 'Leader' && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-purple-950/60 text-purple-400">
                                  LEAD
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-purple-300 font-mono">{m.role || 'Builder'} • {m.college || 'SIST'}</p>
                            <p className="text-[11px] text-slate-400 font-mono truncate">{m.email}</p>
                          </div>
                          <div className="text-right flex flex-col items-end gap-1.5 shrink-0">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${m.confirmed || m.meetupRsvpVerified ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                              {m.confirmed || m.meetupRsvpVerified ? 'RSVP Verified' : 'Confirmed'}
                            </span>
                            {canRemove && (
                              <button
                                type="button"
                                disabled={removingEmail === m.email}
                                onClick={() => handleRemoveOrLeaveMember(m.email)}
                                className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 hover:text-rose-300"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>{isSelf ? 'Leave Squad' : 'Remove'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Team Leader Invite & Leadership Transfer Controls */}
                  {isTeamLeader && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {(team.members?.length || 0) < 6 && (
                        <form onSubmit={handleInviteTeammate} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                          <label className="text-[11px] font-mono text-purple-300 font-bold flex items-center gap-1.5">
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Invite Teammate via Email</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              required
                              value={inviteEmail}
                              onChange={e => setInviteEmail(e.target.value)}
                              placeholder="teammate@college.edu"
                              className="flex-1 min-w-0 px-3 py-1.5 rounded-xl glass-input text-xs"
                            />
                            <button
                              type="submit"
                              disabled={inviting}
                              className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold shrink-0"
                            >
                              {inviting ? 'Sending...' : 'Invite'}
                            </button>
                          </div>
                        </form>
                      )}

                      {(team.members?.filter(m => m.role !== 'Leader').length || 0) > 0 && (
                        <form onSubmit={handleTransferLeadership} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                          <label className="text-[11px] font-mono text-amber-300 font-bold flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5" />
                            <span>Transfer Team Captaincy</span>
                          </label>
                          <div className="flex gap-2">
                            <select
                              required
                              value={newLeaderEmail}
                              onChange={e => setNewLeaderEmail(e.target.value)}
                              className="flex-1 min-w-0 px-3 py-1.5 rounded-xl glass-input text-xs bg-slate-900"
                            >
                              <option value="">Select squad member...</option>
                              {team.members
                                .filter(m => m.role !== 'Leader')
                                .map(m => (
                                  <option key={m.email} value={m.email}>
                                    {m.name} ({m.email})
                                  </option>
                                ))}
                            </select>
                            <button
                              type="submit"
                              disabled={transferring || !newLeaderEmail}
                              className="px-3 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold shrink-0 disabled:opacity-50"
                            >
                              {transferring ? '...' : 'Transfer'}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Problem Abstract & Deliverables Card */}
                  {team.problemTitle && (
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20 space-y-2.5 pt-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                          SUBMITTED DELIVERABLES &amp; ABSTRACT
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                          {team.architecturePdfUrl && (
                            <a
                              href={team.architecturePdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-sky-300 hover:text-white flex items-center gap-1 font-mono underline"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Pitch Deck / Architecture</span>
                            </a>
                          )}
                          {team.githubUrl && (
                            <a
                              href={team.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-mono underline"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Repository</span>
                            </a>
                          )}
                          {team.loomVideoUrl && (
                            <a
                              href={team.loomVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 font-mono underline"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>R1 Video</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white">{team.problemTitle}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{team.problemAbstract}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-bold text-white font-display">
                      Builder Profile & Waitlist Enrollment
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="text-sm font-bold text-white">{student.fullName}</h4>
                        <p className="text-xs text-purple-300 font-mono">{student.email} · {student.institution}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit">
                        PROFILE ACTIVE
                      </span>
                    </div>

                    {waitlist ? (
                      <div className="space-y-1 text-xs">
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">
                          LINKED PRIORITY WAITLIST
                        </span>
                        <p className="text-slate-300">
                          Preferred Track: <strong>{waitlist.preferredTrack}</strong>
                        </p>
                        <p className="text-slate-400">
                          Registration Status: <span className="capitalize text-emerald-400">{waitlist.status || 'Active'}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">
                        No waitlist registration linked. You can create a team to immediately register your squad for Round 0!
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Checkpoint Gates Progress Tracker */}
              <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-bold text-white font-display">
                      Evaluation Gates & Normalized Z-Scores
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Max 100 Pts
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Checkpoint 1 */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-300 font-bold">GATE 1</span>
                      <span className="text-slate-400">25 Pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Architecture & Cloud Feasibility</h4>
                    <p className="text-xs text-slate-400">Friday, Jan 22 (04:00 PM – 06:30 PM)</p>
                    <div className="pt-2">
                      {gate1Eval ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Score: {gate1Eval.rawTotalScore} / 100</span>
                          </div>
                          {gate1Eval.normalizedZScore !== undefined && (
                            <span className="text-[10px] font-mono text-purple-300 block">
                              Z-Score: {gate1Eval.normalizedZScore > 0 ? `+${gate1Eval.normalizedZScore}` : gate1Eval.normalizedZScore}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono">
                          <Clock className="w-4 h-4" />
                          <span>Pending Evaluation</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkpoint 2 */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-300 font-bold">GATE 2</span>
                      <span className="text-slate-400">35 Pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Code Velocity & API Integrations</h4>
                    <p className="text-xs text-slate-400">Saturday, Jan 23 (02:00 PM – 05:30 PM)</p>
                    <div className="pt-2">
                      {gate2Eval ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Score: {gate2Eval.rawTotalScore} / 100</span>
                          </div>
                          {gate2Eval.normalizedZScore !== undefined && (
                            <span className="text-[10px] font-mono text-purple-300 block">
                              Z-Score: {gate2Eval.normalizedZScore > 0 ? `+${gate2Eval.normalizedZScore}` : gate2Eval.normalizedZScore}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono">
                          <Clock className="w-4 h-4" />
                          <span>Pending Evaluation</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkpoint 3 */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-300 font-bold">GATE 3</span>
                      <span className="text-slate-400">40 Pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Grand Stage Live Demos</h4>
                    <p className="text-xs text-slate-400">Sunday, Jan 24 (09:00 AM – 12:30 PM)</p>
                    <div className="pt-2">
                      {gate3Eval ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Score: {gate3Eval.rawTotalScore} / 100</span>
                          </div>
                          {gate3Eval.normalizedZScore !== undefined && (
                            <span className="text-[10px] font-mono text-purple-300 block">
                              Z-Score: {gate3Eval.normalizedZScore > 0 ? `+${gate3Eval.normalizedZScore}` : gate3Eval.normalizedZScore}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <Clock className="w-4 h-4" />
                          <span>7-Min Live Defense</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): AWS Sandbox & Resources */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* AWS Sandbox Credits Card */}
              <div className="p-6 rounded-3xl bg-aws-squidInk border border-purple-500/40 space-y-4">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    AWS Cloud Sandbox
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complimentary promotional credit voucher allocated for deploying Bedrock models, serverless functions, and database instances.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 block">Promotional Voucher</span>
                  <div className="flex items-center justify-between font-mono font-bold text-sm text-purple-400">
                    <span>
                      {team?.awsCreditVoucher || (team?.selectionStage === 'ON_CAMPUS_QUALIFIED' ? 'AWS-KAIROS-GRANTED' : 'DISPATCHED ON STAGE 1')}
                    </span>
                    {team?.awsCreditVoucher && (
                      <button
                        onClick={() => copyVoucher(team.awsCreditVoucher || '')}
                        className="text-slate-400 hover:text-white"
                        title="Copy Voucher Code"
                      >
                        {copiedVoucher ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  <p>• Access to Amazon Bedrock (Claude 3.5 Sonnet, Titan)</p>
                  <p>• OpenSearch Serverless Vector Store</p>
                  <p>• Amazon Aurora Serverless v2</p>
                </div>
              </div>

              {/* Turnkey Student Resources */}
              <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-3">
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>AWS SBG Learning Library</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Pre-event starter kits, Bedrock code templates, and interview storytelling modules.
                </p>
                <div className="space-y-2 pt-1 text-xs">
                  <Link
                    href="/resources"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-200 block transition-colors"
                  >
                    Bedrock Foundation Model Starter Kit
                  </Link>
                  <Link
                    href="/resources"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-200 block transition-colors"
                  >
                    AWS Cloud Quest: Cloud Practitioner
                  </Link>
                  <Link
                    href="/resources"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-200 block transition-colors"
                  >
                    Storytelling for Career Readiness
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
