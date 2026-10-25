'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Search, 
  Shirt
} from 'lucide-react';

function JoinTeamContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCode = searchParams.get('code') || '';
  const initialName = searchParams.get('name') || '';
  const initialEmail = searchParams.get('email') || '';
  const initialCollege = searchParams.get('college') || '';
  const initialMeetup = searchParams.get('meetup') || '';

  const [teamCode, setTeamCode] = useState(initialCode);
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    phone: '',
    collegeRegNo: '',
    college: initialCollege,
    role: 'Frontend' as 'Frontend' | 'Backend' | 'AI / Cloud' | 'UI/UX',
    meetupProfileUrl: initialMeetup,
    tshirtSize: 'L' as 'S' | 'M' | 'L' | 'XL' | 'XXL',
    hoodieSize: 'L' as 'S' | 'M' | 'L' | 'XL' | 'XXL',
  });

  const [targetTeam, setTargetTeam] = useState<any>(null);
  const [searching, setSearching] = useState(false);
  const [joining, setJoining] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch team details if code is provided
  useEffect(() => {
    if (initialCode) {
      handleLookupTeam(initialCode);
    }
  }, [initialCode]);

  const handleLookupTeam = async (codeToSearch?: string) => {
    const code = (codeToSearch || teamCode).trim();
    if (!code) {
      setError('Please enter a valid Team Code.');
      return;
    }

    setSearching(true);
    setError('');

    try {
      const res = await fetch(`/api/v1/team?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (res.ok && data.team) {
        setTargetTeam(data.team);
      } else {
        setError(data.error || 'Team not found. Verify the Team Code with your team leader.');
        setTargetTeam(null);
      }
    } catch (err) {
      setError('Unable to reach server. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetTeam) {
      setError('Please search and verify your target team first.');
      return;
    }

    setJoining(true);
    setError('');

    try {
      const res = await fetch('/api/v1/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode: targetTeam.teamCode,
          member: formData
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setJoinedSuccess(true);
      } else {
        setError(data.error || 'Failed to join team.');
      }
    } catch (err: any) {
      setError(err.message || 'Error communicating with server.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30">
              <Users className="w-3.5 h-3.5 text-aws-orange" />
              <span>Teammate Verification & Roster Confirmation</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Join an Existing <span className="gradient-text-kairos">Squad</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
              Enter your squad's unique Team Code, submit your profile, and claim your place on the official roster (100% free).
            </p>
          </div>

          {!joinedSuccess ? (
            <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-8">
              
              {/* Step A: Team Code Lookup */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                  1. Enter Team Code (Provided by Team Lead)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={teamCode}
                    onChange={e => setTeamCode(e.target.value.toUpperCase())}
                    placeholder="e.g. KAIROS-T001"
                    className="flex-grow px-4 py-3 rounded-xl glass-input font-mono font-bold text-base sm:text-lg tracking-wider text-aws-orange uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => handleLookupTeam()}
                    disabled={searching}
                    className="px-6 py-3 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    <span>{searching ? 'Looking up...' : 'Verify Team'}</span>
                  </button>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 mt-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Target Team Card Found */}
              {targetTeam && (
                <div className="p-5 rounded-2xl bg-aws-squidInk border border-aws-orange/40 space-y-3 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-aws-orange text-slate-950">
                      {targetTeam.teamCode}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      Roster: {targetTeam.members.length} / 6 Builders
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Team: {targetTeam.teamName}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    <strong>Abstract:</strong> {targetTeam.problemTitle}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-xs font-mono text-amber-300">
                    <span>Leader: {targetTeam.leaderEmail}</span>
                  </div>
                </div>
              )}

              {/* Step B: Member Registration Form */}
              {targetTeam && (
                <form onSubmit={handleJoinSubmit} className="space-y-6 pt-4 border-t border-white/10 animate-fadeIn">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                    2. Confirm Your Member Details & Free Swag Sizing
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">College Register / Roll Number *</label>
                      <input
                        type="text"
                        required
                        value={formData.collegeRegNo}
                        onChange={e => setFormData({ ...formData, collegeRegNo: e.target.value })}
                        placeholder="e.g. 44110901"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Primary Squad Role *</label>
                      <select
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                      >
                        <option value="Frontend">Frontend / UI Engineer</option>
                        <option value="Backend">Backend & Distributed Systems</option>
                        <option value="AI / Cloud">AI & Cloud Architecture</option>
                        <option value="UI/UX">UI/UX & Product Design</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Meetup Profile URL *</label>
                      <input
                        type="url"
                        required
                        value={formData.meetupProfileUrl}
                        onChange={e => setFormData({ ...formData, meetupProfileUrl: e.target.value })}
                        placeholder="https://www.meetup.com/members/..."
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                      />
                    </div>

                    {/* Complimentary Swag Sizing */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                        <Shirt className="w-3 h-3 text-aws-orange" />
                        <span>Builder T-Shirt Size (Free)</span>
                      </label>
                      <select
                        value={formData.tshirtSize}
                        onChange={e => setFormData({ ...formData, tshirtSize: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                      >
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                        <option value="XXL">Double Extra Large (XXL)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                        <Shirt className="w-3 h-3 text-purple-400" />
                        <span>Finalist Hoodie Size (Free)</span>
                      </label>
                      <select
                        value={formData.hoodieSize}
                        onChange={e => setFormData({ ...formData, hoodieSize: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                      >
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                        <option value="XXL">Double Extra Large (XXL)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={joining}
                    className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-aws-orange via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-aws-orange shadow-lg shadow-aws-orange/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{joining ? 'Joining Team Roster...' : `Join ${targetTeam.teamName} Roster (100% Free)`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          ) : (
            /* Joined Success Screen */
            <div className="p-8 sm:p-12 rounded-3xl bg-aws-card border-2 border-emerald-500/50 shadow-2xl space-y-8 animate-fadeIn text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Roster Confirmed • 100% Free Admission
                </span>
                <h2 className="text-3xl font-display font-black text-white">
                  You are on Team {targetTeam?.teamName}!
                </h2>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your profile and Meetup RSVP have been recorded. You can now access the Hacker Dashboard to view checkpoint schedules and claim your AWS sandbox credits.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors shadow-md"
                >
                  Go to Hacker Dashboard →
                </Link>
                <Link
                  href="/resources"
                  className="px-6 py-3 rounded-xl font-semibold text-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
                >
                  Explore AWS Learning Library
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

export default function JoinTeamPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aws-canvas text-white pt-32 text-center font-mono">Loading team invitation...</div>}>
      <JoinTeamContent />
    </Suspense>
  );
}
