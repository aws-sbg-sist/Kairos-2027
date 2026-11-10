'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Users, QrCode, Search, Copy, Check, Github, Globe, UserPlus, AlertCircle, MapPin
} from 'lucide-react';
import { ParticipantTeam } from '@/types';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

const FALLBACK_TEAM: ParticipantTeam = {
  id: 'team-k100-01',
  teamCode: 'KAIROS-T001',
  teamName: 'Chronos Distributed',
  inviteCode: '',
  trackId: 'cloud-native',
  leaderEmail: 'po***@example.edu',
  selectionStage: 'ON_CAMPUS_QUALIFIED',
  deskBayAllocation: 'BAY-A12 (Central Library LH1)',
  members: [
    { id: 'm1', name: 'Pooja Venkatesh', email: 'po***@example.edu', role: 'Leader', college: 'SIST', confirmed: true },
    { id: 'm2', name: 'Rohan Gupta', email: 'ro***@example.edu', role: 'Backend', college: 'SIST', confirmed: true },
    { id: 'm3', name: 'Swetha K', email: 'sw***@example.edu', role: 'AI / Cloud', college: 'SIST', confirmed: true },
    { id: 'm4', name: 'Aditya Nair', email: 'ad***@example.edu', role: 'UI/UX', college: 'SIST', confirmed: true }
  ],
  problemTitle: 'Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry',
  problemAbstract: 'A fault-tolerant stream processing engine handling 100k events/sec with distributed consensus and zero data loss.',
  githubUrl: 'https://github.com/kairos2027/chronos-stream',
  createdAt: '2026-10-25T08:00:00.000Z'
};

function ParticipantPortalContent() {
  const searchParams = useSearchParams();
  const initialCode = (searchParams.get('code') || 'KAIROS-T001').toUpperCase();

  const [lookupCode, setLookupCode] = useState(initialCode);
  const [team, setTeam] = useState<ParticipantTeam>(FALLBACK_TEAM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const fetchTeam = useCallback(async (codeToFetch: string) => {
    const clean = codeToFetch.trim().toUpperCase();
    if (!clean) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/v1/team?code=${encodeURIComponent(clean)}`);
      const data = await res.json();
      if (res.ok && data.success && data.team) {
        setTeam(data.team);
      } else {
        setError(data.error || `No squad found matching "${clean}".`);
      }
    } catch {
      setError('Unable to reach team registry right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeam(initialCode);
  }, [initialCode, fetchTeam]);

  const activeTeamCode = team.teamCode || lookupCode || 'KAIROS-T001';
  const trackObj = TECHNICAL_TRACKS.find(t => t.id === team.trackId);

  const handleCopyTeamCode = () => {
    navigator.clipboard.writeText(activeTeamCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-24 w-full flex-grow space-y-6">
        {/* Header & Squad Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono text-purple-300 uppercase tracking-wider font-bold block mb-1">
              KAIROS 2027 · Central Library & Campus Bays
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
              Builder Portal & Roster Gateway
            </h1>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchTeam(lookupCode);
            }}
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <div className="relative flex-1 md:w-52">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="Enter Team Code"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value.toUpperCase())}
                placeholder="e.g. KAIROS-T001"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-mono uppercase text-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-colors shrink-0"
            >
              {loading ? 'Loading...' : 'Load Squad'}
            </button>
          </form>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Team Overview Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-purple-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/15">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase">
                  Team Roster (4–6 Builders)
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-purple-900/60 text-purple-200 border border-purple-500/30">
                  {(team.selectionStage || team.status || 'ROUND_0_APPLICANT').replace(/_/g, ' ')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {team.teamName}
              </h2>
              <span className="text-xs text-slate-300 font-medium mt-1 block">
                Track {trackObj?.number || '01'}: {trackObj?.title || team.trackId}
              </span>
            </div>

            {/* Team Code Box */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-purple-500/25 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block uppercase">Official Team Code</span>
                <span className="text-lg font-mono font-bold text-purple-300 tracking-wider">
                  {activeTeamCode}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyTeamCode}
                className="p-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800 text-purple-200 transition-colors"
                aria-label="Copy Team Code"
                title="Copy Team Code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Confirmed Members ({team.members?.length || 0}/6)</span>
              </h3>
              {(team.members?.length || 0) < 6 && (
                <Link
                  href="/team/join"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white border border-purple-500/30 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Builder via Invite Code</span>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {team.members?.map((mem) => (
                <div
                  key={mem.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-purple-500/15 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-white text-sm block truncate">{mem.name}</span>
                    <span className="text-xs text-slate-400 font-mono block truncate">
                      {mem.college || team.institutionName || 'SIST'} · {mem.email}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-purple-950/80 border border-purple-500/30 text-purple-300 shrink-0">
                    {mem.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details & Submission Readiness */}
          <div className="pt-4 border-t border-purple-500/15 space-y-4">
            <h3 className="text-sm font-bold text-white">Project Blueprint & Submission Links</h3>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-purple-500/15 space-y-2">
              <span className="text-xs font-bold text-purple-300 block">
                {team.problemTitle || team.projectTitle || 'Submitted Architecture Blueprint'}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {team.problemAbstract || team.projectAbstract || 'Architecture details pending Round 0 confirmation.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/50 border border-purple-500/15 text-xs text-slate-300">
                <Github className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="truncate">{team.githubUrl || 'GitHub repository linked during Round 1'}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/50 border border-purple-500/15 text-xs text-slate-300">
                <Globe className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Live deployment endpoint locked at code freeze</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desk & Arena Allocation Card */}
        <div className="p-6 rounded-3xl glass-panel border border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-purple-300 font-bold uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Venue Check-In Ready
            </span>
            <h4 className="text-lg font-bold text-white">
              {team.deskBayAllocation || 'Central Library & Campus Bays'}
            </h4>
            <p className="text-xs text-slate-300">
              Allocated 6 power outlets, surge suppressor board, and dual-band high-density Wi-Fi credentials.
            </p>
          </div>
          <Link
            href={`/portal/pass?code=${encodeURIComponent(activeTeamCode)}`}
            className="px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md flex items-center gap-2 shrink-0"
          >
            <QrCode className="w-4 h-4" />
            <span>Open Digital Arena Pass</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ParticipantPortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-aws-canvas text-white pt-32 text-center font-mono"><h1 className="sr-only">Builder Portal & Roster Gateway</h1>Loading builder portal...</div>}>
      <ParticipantPortalContent />
    </Suspense>
  );
}
