'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Users, QrCode, ShieldCheck, ArrowLeft, CheckCircle2,
  AlertCircle, Copy, Check, ExternalLink, Github, Globe,
  LogOut, Mail, Building, User, Sparkles, PlusCircle, ArrowRight
} from 'lucide-react';
import { ParticipantTeam, WaitlistEntry } from '@/types';

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
  emailVerifiedAt?: string;
}

export default function ParticipantPortalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [team, setTeam] = useState<ParticipantTeam | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/v1/student/me');
      if (res.status === 401) {
        setStudent(null);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.success && data.student) {
        setStudent(data.student);
        setTeam(data.team || null);
        setWaitlist(data.waitlist || null);
      }
    } catch (err) {
      console.error('Failed to load student identity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyInvite = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-3 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4" />
        <span className="text-xs font-mono text-slate-400">Loading verified builder session...</span>
      </div>
    );
  }

  // 2. Unauthenticated Protected View
  if (!student) {
    return (
      <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md bg-slate-900/80 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl text-center z-10 shadow-2xl">
          <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          
          <h1 className="text-xl font-display font-black text-white mb-2">
            Builder Portal Authentication Required
          </h1>
          <p className="text-xs text-slate-300 mb-6">
            Please sign in to access your digital builder credentials, manage your hackathon squad, and inspect evaluation gates.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
            >
              <span>Sign In as Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-slate-700 hover:border-slate-600 text-slate-300 text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Create New Builder Account (Free)</span>
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-400">
              ← Return to Main Stage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Student Portal View
  return (
    <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col">
      
      {/* Portal Top Bar */}
      <header className="border-b border-purple-500/20 bg-slate-950/80 px-6 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              title="Return to Main Stage"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="font-display font-bold text-lg text-white">
                Builder Console
              </span>
              <span className="text-[10px] font-mono text-purple-400 block">
                KAIROS 2027 · SATHYABAMA INDOOR AUDITORIUM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>Dashboard</span>
            </Link>

            <Link
              href="/portal/pass"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Digital QR Pass</span>
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-300 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 transition-colors flex items-center gap-1.5"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-6">
        
        {/* Verification Alert Banner if Unverified */}
        {!student.emailVerified && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-300 block">
                Action Required: Please Verify Your Builder Email Address
              </span>
              <p className="text-xs text-amber-200/80">
                We sent a cryptographic verification email to <span className="font-mono font-semibold text-white">{student.email}</span>. Click the link in your inbox to unlock squad creation and qualifier submissions.
              </p>
            </div>
          </div>
        )}

        {/* Builder Identity Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-purple-500/30 space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/15">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-display font-black text-2xl shadow-lg shadow-purple-600/30">
                {student.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    {student.fullName}
                  </h2>
                  {student.emailVerified ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>UNVERIFIED</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-mono text-slate-400">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    {student.email}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-purple-400" />
                    {student.institution}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile ID Token Chip */}
            <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-purple-500/20 text-right">
              <span className="text-[10px] font-mono text-slate-500 block">BUILDER IDENTIFIER</span>
              <span className="text-xs font-mono font-bold text-purple-300">{student.id}</span>
            </div>
          </div>

          {/* Linked Waitlist Banner */}
          {waitlist && (
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block">
                  LINKED PRE-REGISTRATION (ROUND 0)
                </span>
                <span className="text-xs font-semibold text-white">
                  Track: {waitlist.preferredTrack}
                </span>
                <span className="text-xs text-slate-400 block">
                  Status: <span className="capitalize text-purple-300">{waitlist.status || 'Active'}</span> · Registered on {new Date(waitlist.createdAt).toLocaleDateString()}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-600/30 text-purple-200 border border-purple-500/40 w-fit">
                PRIORITY SECURED
              </span>
            </div>
          )}

          {/* Squad / Team Status Section */}
          <div className="space-y-4 pt-2">
            {team ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20">
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold block">
                      OFFICIAL SQUAD
                    </span>
                    <h3 className="text-xl font-display font-black text-white">
                      {team.teamName}
                    </h3>
                    <span className="text-xs text-slate-300 font-medium">
                      Code: <span className="font-mono text-purple-300">{team.teamCode || team.id}</span> · Track: {team.trackId}
                    </span>
                  </div>

                  {/* Invite Code Box */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/20 flex items-center gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">Join Code</span>
                      <span className="text-base font-mono font-bold text-purple-300 tracking-wider">
                        {team.inviteCode}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyInvite(team.inviteCode)}
                      className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-800 text-purple-200 transition-colors"
                      title="Copy Invite Code"
                    >
                      {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-400" />
                    <span>Squad Roster ({team.members?.length || 1}/6 Builders)</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(team.members || []).map((m: any) => (
                      <div
                        key={m.id || m.email}
                        className="p-3.5 rounded-xl bg-slate-950/50 border border-purple-500/15 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-white text-xs block">{m.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono block">{m.email}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-500/30 text-purple-300">
                          {m.role || 'Member'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Abstract */}
                {(team.problemTitle || (team as any).projectTitle) && (
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-purple-500/15 space-y-2">
                    <span className="text-xs font-bold text-purple-300 block">
                      {team.problemTitle || (team as any).projectTitle}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {team.problemAbstract || (team as any).projectAbstract}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-purple-500/20 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    You Are Not in a Hackathon Squad Yet
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    KAIROS 2027 requires teams of 4 to 6 builders. Form a new squad as Leader or join an existing team with an invite code.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/team/create"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create a Squad</span>
                  </Link>

                  <Link
                    href="/team/join"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-purple-500/30 hover:border-purple-500 text-slate-300 text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Join Existing Squad</span>
                  </Link>

                  <Link
                    href="/#radar"
                    className="px-4 py-2 rounded-xl bg-white/5 border border-slate-700 hover:border-slate-600 text-slate-400 text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Find Teammates on Radar</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stadium Desk & Arena Allocation Card */}
        <div className="p-6 rounded-3xl glass-panel border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-purple-400 font-bold">VENUE CHECK-IN READY</span>
            <h4 className="text-lg font-bold text-white">Sathyabama Indoor Auditorium · Chennai</h4>
            <p className="text-xs text-slate-400">
              Allocated 6 power outlets, surge suppressor board, and dual-band high-density Wi-Fi SSID.
            </p>
          </div>
          <Link
            href="/portal/pass"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 shadow-md flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Digital Pass</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
