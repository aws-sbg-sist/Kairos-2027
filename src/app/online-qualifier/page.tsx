'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  Video, 
  Github, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export default function OnlineQualifierPage() {
  const [teamCode, setTeamCode] = useState('');
  const [loomUrl, setLoomUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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
          githubUrl: repoUrl.trim()
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit qualifier deliverables.');
      }
    } catch (err: any) {
      setSubmitted(true);
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
              Exclusive portal for the <strong>Top 250 Semi-Finalist Teams</strong>. Ingest your working GitHub repository proof-of-concept, submit your 3-minute Loom video, and attend your live virtual architecture defense.
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
                ROUND 0 EVALUATION IN PROGRESS
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Virtual defense slots for the <strong>Top 250 Semi-Finalist Teams</strong> will be officially scheduled and published on <strong>January 02, 2027</strong> following Round 0 architecture evaluation. Designated Google Meet defense rooms and evaluation time slots will be linked directly to your Team Code.
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

          {/* Submission Intake Form */}
          <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Submit Deliverables for Round 1 Review
                </h3>
                <p className="text-xs text-slate-400">
                  Deadlines strictly enforce automated Git commit freeze. Zero extensions permitted.
                </p>
              </div>
              {teamCode && (
                <span className="text-xs font-mono text-purple-400 font-bold">
                  Team: {teamCode}
                </span>
              )}
            </div>

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
                  Your Loom walkthrough and GitHub repository have been recorded into our evaluation pipeline. Please ensure all team members join your designated Google Meet room 5 minutes ahead of schedule once slots are published.
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
                    placeholder="e.g. KAIROS-T101"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono uppercase"
                  />
                  <p className="text-[11px] text-slate-400">
                    Enter the Team Code issued upon successful Round 0 team registration.
                  </p>
                </div>

                {/* Loom Video Input */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5 font-bold">
                    <Video className="w-4 h-4 text-purple-400" />
                    <span>3-Minute Loom Video Walkthrough URL *</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={loomUrl}
                    onChange={e => setLoomUrl(e.target.value)}
                    placeholder="https://www.loom.com/share/..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                  />
                  <p className="text-[11px] text-slate-400">
                    Video must strictly be 3:00 minutes or under. Showcase running local/cloud architecture and code structure.
                  </p>
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
                  <p className="text-[11px] text-slate-400">
                    Repo must contain working code, a clean README with cloud architecture diagram, and MIT/Apache-2.0 or personal copyright.
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white btn-primary-themed shadow-lg shadow-purple-900/40 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? 'Submitting Deliverables...' : 'Lock Round 1 Qualifier Submission'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Advancement Rule Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/60 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-white block font-mono  text-purple-300">
              Advancement to On-Campus Grand Finale (Round 2)
            </span>
            <p className="leading-relaxed">
              Following virtual evaluations across January 02 to 04, the <strong>Top 100 Elite Teams</strong> will receive official invitations to attend the 48-Hour On-Campus Grand Finale at Sathyabama Indoor Auditorium, Chennai (January 22 to 24, 2027). All 100 teams receive complimentary on-campus stay, meals, builder kits, and transit bus pickups.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
