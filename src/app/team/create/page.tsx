'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Share2, 
  FileText, 
  UploadCloud, 
  Check, 
  AlertCircle 
} from 'lucide-react';

function CreateTeamContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialLeaderName = searchParams.get('name') || '';
  const initialLeaderEmail = searchParams.get('email') || '';
  const initialCollege = searchParams.get('college') || '';
  const initialMeetup = searchParams.get('meetup') || '';
  const initialTrack = searchParams.get('track') || TECHNICAL_TRACKS[0].id;

  const [formData, setFormData] = useState({
    teamName: '',
    trackId: initialTrack,
    institutionName: initialCollege || '',
    city: '',
    state: '',
    leaderName: initialLeaderName,
    leaderEmail: initialLeaderEmail,
    leaderPhone: '',
    leaderMeetupUrl: initialMeetup,
    problemTitle: '',
    problemAbstract: '',
    architecturePdfUrl: '',
    githubUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [createdTeam, setCreatedTeam] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const wordCount = formData.problemAbstract.trim() ? formData.problemAbstract.trim().split(/\s+/).length : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount > 250) {
      setError('Abstract exceeds maximum word limit of 250 words.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCreatedTeam(data.team);
      } else {
        setError(data.error || 'Failed to create team. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Error communicating with server.');
    } finally {
      setLoading(false);
    }
  };

  const copyInviteLink = () => {
    if (!createdTeam) return;
    const link = `${window.location.origin}/team/join?code=${createdTeam.teamCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30">
              <Users className="w-3.5 h-3.5 text-aws-orange" />
              <span>Team Leader Portal • Round 0 Submission</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Create Team & <span className="gradient-text-kairos">Submit Abstract</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Register your squad name, choose an enterprise track, and submit your project abstract. Teams require 4 to 6 members to qualify.
            </p>
          </div>

          {!createdTeam ? (
            <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 mb-6">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Team Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold border-b border-white/10 pb-2">
                    1. Squad Identity & Primary Track
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Team Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.teamName}
                        onChange={e => setFormData({ ...formData, teamName: e.target.value })}
                        placeholder="e.g. Chronos Distributed"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Primary Enterprise Track *</label>
                      <select
                        value={formData.trackId}
                        onChange={e => setFormData({ ...formData, trackId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                      >
                        {TECHNICAL_TRACKS.map(t => (
                          <option key={t.id} value={t.id}>
                            Track {t.number}: {t.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-mono text-slate-300">Institution / College Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.institutionName}
                        onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                        placeholder="e.g. Sathyabama Institute of Science and Technology"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Chennai"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        placeholder="e.g. Tamil Nadu"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Leader Verification Confirmation */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold border-b border-white/10 pb-2">
                    2. Team Leader Confirmation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Leader Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.leaderName}
                        onChange={e => setFormData({ ...formData, leaderName: e.target.value })}
                        placeholder="Leader Name"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Leader Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.leaderEmail}
                        onChange={e => setFormData({ ...formData, leaderEmail: e.target.value })}
                        placeholder="leader@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-mono text-slate-300">Leader Meetup Profile URL *</label>
                      <input
                        type="url"
                        required
                        value={formData.leaderMeetupUrl}
                        onChange={e => setFormData({ ...formData, leaderMeetupUrl: e.target.value })}
                        placeholder="https://www.meetup.com/members/..."
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Round 0 Abstract & Problem Statement */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                      3. Round 0 Project Abstract
                    </h3>
                    <span className={`text-xs font-mono ${wordCount > 250 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                      {wordCount} / 250 words max
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Project / Architecture Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.problemTitle}
                      onChange={e => setFormData({ ...formData, problemTitle: e.target.value })}
                      placeholder="e.g. Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Problem Statement & Proposed Solution Abstract *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.problemAbstract}
                      onChange={e => setFormData({ ...formData, problemAbstract: e.target.value })}
                      placeholder="Describe the authentic engineering bottleneck, the AWS cloud services employed (e.g. Bedrock, ECS, IoT Core), and your expected end-to-end prototype deliverable..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Architecture PDF / Diagram URL (Optional)</label>
                      <input
                        type="url"
                        value={formData.architecturePdfUrl}
                        onChange={e => setFormData({ ...formData, architecturePdfUrl: e.target.value })}
                        placeholder="https://drive.google.com/... or Figma"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">GitHub Repository URL (Optional for R0)</label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/team-repo"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-aws-orange via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-aws-orange shadow-lg shadow-aws-orange/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{loading ? 'Creating Team...' : 'Create Team & Generate Invite Code (100% Free)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            </div>
          ) : (
            /* Success Screen with Team Code & Invite Link */
            <div className="p-8 sm:p-12 rounded-3xl bg-aws-card border-2 border-aws-orange shadow-2xl space-y-8 animate-fadeIn text-center">
              <div className="w-16 h-16 rounded-2xl bg-aws-orange text-slate-950 mx-auto flex items-center justify-center font-bold shadow-lg shadow-aws-orange/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Squad Registered • Selection Stage: ROUND 0 APPLICANT
                </span>
                <h2 className="text-3xl font-display font-black text-white">
                  Team {createdTeam.teamName} Created!
                </h2>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Share this unique Team Code with 3 to 5 teammates so they can join your official roster before the Round 0 deadline.
                </p>
              </div>

              {/* Team Code Display Box */}
              <div className="p-6 rounded-2xl bg-aws-squidInk border border-aws-orange/40 max-w-md mx-auto space-y-3">
                <span className="text-xs font-mono text-slate-400 block uppercase">Your Official Team Code</span>
                <div className="text-4xl font-mono font-black text-aws-orange tracking-widest selection:bg-white">
                  {createdTeam.teamCode}
                </div>
                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    onClick={copyInviteLink}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Link Copied!' : 'Copy Teammate Invite Link'}</span>
                  </button>
                </div>
              </div>

              {/* Roster Preview */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900 border border-slate-700/60 text-left space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Current Roster (1 / 6 builders):</span>
                  <span className="text-amber-300">Min 4 Required</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{formData.leaderName} (Team Leader)</span>
                  <span className="text-emerald-400 font-mono text-[11px]">🟢 Meetup Verified</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors shadow-md"
                >
                  Enter Hacker Dashboard →
                </Link>
                <Link
                  href={`/team/join?code=${createdTeam.teamCode}`}
                  className="px-6 py-3 rounded-xl font-semibold text-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                >
                  Test Join Page with this Code
                </Link>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CreateTeamPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aws-canvas text-white pt-32 text-center font-mono">Loading team registration...</div>}>
      <CreateTeamContent />
    </Suspense>
  );
}
