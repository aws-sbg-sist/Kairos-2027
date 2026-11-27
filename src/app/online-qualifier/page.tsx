'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { DeckUploader } from '@/components/forms/DeckUploader';
import {
  Video,
  Github,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Lock,
  Clock
} from 'lucide-react';

const DEFENSE_SLOTS = [
  { label: 'Sat, Jan 02, 2027 · 10:30 AM IST', value: '2027-01-02T10:30:00+05:30' },
  { label: 'Sat, Jan 02, 2027 · 03:00 PM IST', value: '2027-01-02T15:00:00+05:30' },
  { label: 'Sun, Jan 03, 2027 · 11:30 AM IST', value: '2027-01-03T11:30:00+05:30' },
  { label: 'Sun, Jan 03, 2027 · 04:00 PM IST', value: '2027-01-03T16:00:00+05:30' },
  { label: 'Mon, Jan 04, 2027 · 11:00 AM IST', value: '2027-01-04T11:00:00+05:30' },
];

export default function OnlineQualifierPage() {
  const [authLoading, setAuthLoading] = useState(true);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);
  const [isLeader, setIsLeader] = useState(true);

  const [teamCode, setTeamCode] = useState('');
  const [loomUrl, setLoomUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [architecturePdfUrl, setArchitecturePdfUrl] = useState('');
  const [architectureSummary, setArchitectureSummary] = useState('');
  const [defenseSlotRequested, setDefenseSlotRequested] = useState(DEFENSE_SLOTS[2].value);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/v1/student/me')
      .then(res => (res.status === 401 ? null : res.json()))
      .then(data => {
        if (data?.success && data.student) {
          setSignedInEmail(data.student.email);
          if (data.team) {
            const t = data.team;
            setTeamCode(t.teamCode || t.id || '');
            setLoomUrl(t.loomVideoUrl || '');
            setRepoUrl(t.githubUrl || '');
            setArchitecturePdfUrl(t.architecturePdfUrl || '');
            setArchitectureSummary(t.architectureSummary || t.projectAbstract || '');
            if (t.defenseSlotRequested || t.onlineDefenseSlot) {
              setDefenseSlotRequested(t.defenseSlotRequested || t.onlineDefenseSlot);
            }
            const normMe = data.student.email.toLowerCase();
            const leaderFlag =
              t.leaderEmail?.toLowerCase() === normMe ||
              (t.members || []).some((m: any) => m.email?.toLowerCase() === normMe && m.role === 'Leader');
            setIsLeader(Boolean(leaderFlag));
          }
        }
      })
      .catch(() => {
        // Handle gracefully; unauthenticated users see sign-in notice
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamCode.trim()) {
      setError('Please provide your assigned Team Code.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/v1/qualifier/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode: teamCode.trim().toUpperCase(),
          loomVideoUrl: loomUrl.trim(),
          githubUrl: repoUrl.trim(),
          architecturePdfUrl: architecturePdfUrl.trim() || undefined,
          architectureSummary: architectureSummary.trim() || undefined,
          defenseSlotRequested,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit qualifier deliverables.');
      }
    } catch {
      setError('Network error while submitting qualifier deliverables. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-sky-300 bg-sky-950/40 border border-sky-500/30">
              <Calendar className="w-3.5 h-3.5" />
              <span>Round 1 Online Technical Qualifier • Jan 02 to 04, 2027</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Round 1: Virtual <span className="gradient-text-kairos">Evaluation Bay</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Exclusive portal for the <strong>Top 250 Semi-Finalist Teams</strong>. Upload your updated architecture deck, GitHub repository proof-of-concept, and 3-minute Loom video walkthrough.
            </p>
          </div>

          {/* Virtual Defense Scheduling Notice */}
          <div className="p-6 sm:p-8 rounded-3xl bg-aws-squidInk border border-purple-500/40 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Round 1 Google Meet Virtual Defense Scheduling
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                ROUND 0 / ROUND 1 SUBMISSION PORTAL
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Virtual defense slots for the <strong>Top 250 Semi-Finalist Teams</strong> take place on <strong>January 02–04, 2027</strong>. Only the designated <strong>Team Leader</strong> may lock official Round 1 deliverables.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">EVALUATION DATES</span>
                <span className="text-white font-bold block mt-0.5">Jan 02 – Jan 04, 2027</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">DEFENSE FORMAT</span>
                <span className="text-purple-300 font-bold block mt-0.5">4 Min Demo + 3 Min Q&amp;A</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">EVALUATION PANEL</span>
                <span className="text-sky-300 font-bold block mt-0.5">AWS Principal Architects</span>
              </div>
            </div>
          </div>

          {/* Auth / Leader Gate or Submission Form */}
          {authLoading ? (
            <div className="p-10 rounded-3xl bg-aws-card border border-slate-700/60 text-center text-xs font-mono text-slate-400">
              Checking Team Leader credentials...
            </div>
          ) : !signedInEmail ? (
            <div className="p-8 rounded-3xl bg-aws-card border border-purple-500/40 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 mx-auto flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">Team Leader Sign-In Required</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Sign in with your builder account before uploading decks or locking Round 1 deliverables.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
                >
                  Sign In to Submit →
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Register Account
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Submit Deliverables for Round 1 Review
                  </h3>
                  <p className="text-xs text-slate-400">
                    Signed in as <span className="font-mono text-slate-200">{signedInEmail}</span>
                  </p>
                </div>
                {teamCode && (
                  <span className="text-xs font-mono text-purple-400 font-bold">
                    Team: {teamCode}
                  </span>
                )}
              </div>

              {!isLeader && (
                <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Only your Team Leader can lock official Round 1 qualifier submissions. Ask your Team Leader to submit from their account.</span>
                </div>
              )}

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Round 1 Deliverables Submitted</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your Loom walkthrough, architecture deck, and GitHub repository have been recorded into the organizer &amp; jury pipeline.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-colors inline-block"
                    >
                      Back to Dashboard
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Team Code Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>Your Team Code *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={teamCode}
                      onChange={e => setTeamCode(e.target.value.toUpperCase())}
                      placeholder="e.g. KAIROS-T001"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono uppercase"
                    />
                  </div>

                  {/* Hybrid Pitch Deck / Architecture File Uploader */}
                  <DeckUploader
                    label="Pitch Deck / Cloud Architecture Diagram (.pdf or .pptx, Optional if submitted in R0)"
                    artifactType="architecture_pdf"
                    value={architecturePdfUrl}
                    onChange={setArchitecturePdfUrl}
                  />

                  {/* Loom Video Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold">
                      <Video className="w-4 h-4 text-purple-400" />
                      <span>3-Minute Loom / Demo Video URL *</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={loomUrl}
                      onChange={e => setLoomUrl(e.target.value)}
                      placeholder="https://www.loom.com/share/..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                    />
                  </div>

                  {/* GitHub Repo Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold">
                      <Github className="w-4 h-4 text-white" />
                      <span>Public GitHub Repository Link *</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={repoUrl}
                      onChange={e => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/organization/repo"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                    />
                  </div>

                  {/* Preferred Virtual Defense Slot */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold">
                      <Clock className="w-4 h-4 text-sky-400" />
                      <span>Preferred Virtual Defense Slot</span>
                    </label>
                    <select
                      value={defenseSlotRequested}
                      onChange={e => setDefenseSlotRequested(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                    >
                      {DEFENSE_SLOTS.map(slot => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Architecture Notes / AWS Services Summary */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      AWS Cloud Architecture Summary (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={architectureSummary}
                      onChange={e => setArchitectureSummary(e.target.value)}
                      placeholder="Key AWS services employed (Bedrock, ECS, Lambda, DynamoDB, API Gateway), latency/cost trade-offs..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm leading-relaxed"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={submitting || !isLeader}
                      className="w-full py-3.5 rounded-xl font-bold text-sm text-white btn-primary-themed shadow-lg shadow-purple-900/40 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <span>{submitting ? 'Submitting Deliverables...' : 'Lock Round 1 Qualifier Submission'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Advancement Rule Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/60 text-xs text-slate-300 space-y-2">
            <span className="font-bold block font-mono text-purple-300">
              Advancement to On-Campus Grand Finale (Round 2)
            </span>
            <p className="leading-relaxed">
              Following virtual evaluations across January 02 to 04, the <strong>Top 100 Elite Teams</strong> will receive official invitations to attend the 48-Hour On-Campus Grand Finale at Sathyabama Indoor Auditorium, Chennai (January 22 to 24, 2027).
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
