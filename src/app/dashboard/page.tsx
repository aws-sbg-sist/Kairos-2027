'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Sparkles,
  Github
} from 'lucide-react';
import { ParticipantTeam, WaitlistEntry, CheckpointEvaluation } from '@/types';

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
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [team, setTeam] = useState<ParticipantTeam | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry | null>(null);
  const [evaluations, setEvaluations] = useState<CheckpointEvaluation[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);

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
          desc: 'Abstract under initial technical review. Ensure your team has 4–6 verified members.',
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
                <span>Register as Student Builder (Free)</span>
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

            <div className="flex items-center gap-3">
              <Link
                href="/portal/pass"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center gap-2 transition-colors shadow-sm"
              >
                <QrCode className="w-4 h-4 text-purple-300" />
                <span>Smart Digital Pass</span>
              </Link>
              <Link
                href="/online-qualifier"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-purple-900 text-slate-950 hover:bg-purple-600 transition-colors shadow-md flex items-center gap-1.5"
              >
                <Video className="w-4 h-4" />
                <span>Round 1 Qualifier Bay</span>
              </Link>
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
                    KAIROS 2027 requires squads of 4 to 6 builders. Create your team or join with an invite code.
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
                <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white font-display">
                        Verified Squad Roster ({team.members?.length || 0} / 6 Builders)
                      </h3>
                    </div>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {team.members?.map((m: any, i: number) => (
                      <div key={m.id || m.email || i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{m.name}</h4>
                            {m.role === 'Leader' && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-purple-950/60 text-purple-400">
                                LEAD
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-purple-300 font-mono">{m.role || 'Builder'} • {m.college || 'SIST'}</p>
                          <p className="text-[11px] text-slate-400 font-mono truncate">{m.email}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${m.confirmed || m.meetupRsvpVerified ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                            {m.confirmed || m.meetupRsvpVerified ? 'RSVP Verified' : 'Confirmed'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Problem Abstract Card */}
                  {team.problemTitle && (
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20 space-y-2 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                          SUBMITTED ROUND 0 DELIVERABLE
                        </span>
                        {team.githubUrl && (
                          <a
                            href={team.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-mono"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
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
