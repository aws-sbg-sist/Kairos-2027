'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { LeaderboardEntry } from '@/types';
import { 
  Trophy, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  GitCommit,
  CheckCircle2,
  TrendingUp,
  Cpu,
  RefreshCw,
  Lock,
  Radio,
  Award
} from 'lucide-react';

export default function LeaderboardPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [standings, setStandings] = useState<LeaderboardEntry[]>([]);
  const [published, setPublished] = useState<boolean>(true);
  const [publicationMessage, setPublicationMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchLeaderboard = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const url = selectedTrack && selectedTrack !== 'all' 
        ? `/api/v1/leaderboard?track=${encodeURIComponent(selectedTrack)}`
        : '/api/v1/leaderboard';

      const res = await fetch(url, { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.success) {
        setPublished(data.published);
        setPublicationMessage(data.message || '');
        setStandings(data.standings || []);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch live leaderboard:', err);
    } finally {
      setLoading(false);
      if (isManual) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Poll every 15 seconds for live evaluation updates
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 15000);
    return () => clearInterval(interval);
  }, [selectedTrack]);

  const filteredRankings = standings.filter(r => {
    const matchesSearch = 
      r.teamName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.teamCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk border border-purple-500/30">
              <Trophy className="w-3.5 h-3.5 text-purple-400" />
              <span>Live Checkpoint Telemetry & Mathematical Normalization</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Real-Time Live <span className="gradient-text-kairos">Leaderboard</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Dynamic tournament standings computed across Checkpoints 1, 2, and 3. Normalized via Gaussian Z-scores to completely neutralize evaluator grading variance.
            </p>
          </div>

          {/* Mathematical Z-Score Explanation Box */}
          <div className="p-6 rounded-3xl bg-aws-squidInk border border-purple-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Algorithmic Fairness: The Z-Score Formula
                </h3>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Because some judges grade strictly and others grade leniently, Kairos 2027 uses standard deviation normalization: Each team&apos;s raw score X from judge j is mathematically transformed to <code className="text-purple-300 font-bold font-mono">Z = (X - &mu;) / &sigma;</code>. This guarantees every team competes on an exact, mathematically fair playing field.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 font-mono text-sm text-purple-400 border border-slate-800 flex-shrink-0 text-center font-bold">
              Z = (Score - μ) / σ
            </div>
          </div>

          {/* If Leaderboard is Unpublished / Deliberation Mode */}
          {!published ? (
            <div className="p-10 sm:p-14 rounded-3xl bg-aws-card border border-purple-500/30 text-center space-y-6 shadow-2xl animate-fadeIn max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-aws-squidInk text-purple-400 mx-auto flex items-center justify-center border border-purple-500/40">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display">Standings Withheld During Jury Deliberation</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {publicationMessage || 'Official tournament standings are currently confidential while the Grand Jury finalizes checkpoint score calibrations.'}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/stage"
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-700 to-purple-900 text-white hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>Switch to Auditorium Stage Mode</span>
                </Link>
                <button
                  onClick={() => fetchLeaderboard(true)}
                  disabled={isRefreshing}
                  className="px-5 py-3 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Check Status</span>
                </button>
              </div>
            </div>
          ) : (
            /* Live Leaderboard Display */
            <div className="space-y-6">
              
              {/* Telemetry Bar & Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Track selector */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedTrack('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      selectedTrack === 'all'
                        ? 'bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold shadow-md'
                        : 'bg-aws-card text-slate-300 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    All 5 Tracks
                  </button>
                  {TECHNICAL_TRACKS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTrack(t.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        selectedTrack === t.id
                          ? 'bg-gradient-to-r from-purple-700 to-purple-900 text-white font-bold shadow-md'
                          : 'bg-aws-card text-slate-300 hover:text-white border border-slate-700/60'
                      }`}
                    >
                      Track {t.number}
                    </button>
                  ))}
                </div>

                {/* Search & Refresh */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search team, code, college..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs font-mono"
                    />
                  </div>

                  <button
                    onClick={() => fetchLeaderboard(true)}
                    disabled={isRefreshing}
                    title="Refresh live scores"
                    className="p-2.5 rounded-xl bg-aws-card border border-slate-700/60 hover:border-purple-500 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-purple-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                <span>
                  Showing <strong className="text-white">{filteredRankings.length}</strong> evaluated teams in arena
                </span>
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Telemetry • Updated {lastRefreshed.toLocaleTimeString()}</span>
                </span>
              </div>

              {/* Leaderboard Table Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl overflow-x-auto">
                {loading ? (
                  <div className="p-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                    <span>Computing real-time Gaussian Z-scores across all tournament gates...</span>
                  </div>
                ) : filteredRankings.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 font-mono text-xs">
                    No teams found matching the selected filter.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-[11px] font-mono text-purple-300">
                        <th className="py-3 px-3">Rank</th>
                        <th className="py-3 px-3">Team Code</th>
                        <th className="py-3 px-3">Team & Institution</th>
                        <th className="py-3 px-3">Track</th>
                        <th className="py-3 px-3 text-center">CP1 (30)</th>
                        <th className="py-3 px-3 text-center">CP2 (25)</th>
                        <th className="py-3 px-3 text-center">CP3 (25)</th>
                        <th className="py-3 px-3 text-center">Raw (100)</th>
                        <th className="py-3 px-3 text-right">Z-Score</th>
                        <th className="py-3 px-3 text-center">Evaluations</th>
                        <th className="py-3 px-3 text-right">Git Commits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRankings.map((r) => {
                        const isTop3 = r.rank <= 3 && r.rawTotal > 0;
                        return (
                          <tr
                            key={r.teamCode}
                            className={`hover:bg-white/[0.02] transition-colors ${
                              isTop3 ? 'bg-purple-950/20' : ''
                            }`}
                          >
                            <td className="py-4 px-3 font-mono font-bold">
                              <div className="flex items-center gap-1.5">
                                {r.rank === 1 && r.rawTotal > 0 && (
                                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-xs flex items-center gap-1">
                                    <Trophy className="w-3 h-3 text-amber-400" />
                                    <span>#1</span>
                                  </span>
                                )}
                                {r.rank === 2 && r.rawTotal > 0 && (
                                  <span className="px-2 py-0.5 rounded bg-slate-400/20 text-slate-200 font-bold border border-slate-400/30 text-xs">
                                    #2
                                  </span>
                                )}
                                {r.rank === 3 && r.rawTotal > 0 && (
                                  <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30 text-xs">
                                    #3
                                  </span>
                                )}
                                {(r.rank > 3 || r.rawTotal === 0) && (
                                  <span className="text-slate-400">#{r.rank}</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-3 font-mono font-bold text-purple-400">
                              {r.teamCode}
                            </td>
                            <td className="py-4 px-3 space-y-0.5">
                              <span className="font-bold text-white text-sm block">
                                {r.teamName}
                              </span>
                              <span className="text-[11px] text-slate-400 block font-mono">
                                {r.institution} {r.deskBayAllocation && `• ${r.deskBayAllocation}`}
                              </span>
                            </td>
                            <td className="py-4 px-3 text-slate-300 max-w-[200px] truncate">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                                {r.track}
                              </span>
                            </td>
                            <td className="py-4 px-3 text-center font-mono text-slate-300">
                              {r.cp1Score > 0 ? r.cp1Score.toFixed(1) : '—'}
                            </td>
                            <td className="py-4 px-3 text-center font-mono text-slate-300">
                              {r.cp2Score > 0 ? r.cp2Score.toFixed(1) : '—'}
                            </td>
                            <td className="py-4 px-3 text-center font-mono text-slate-300">
                              {r.cp3Score > 0 ? r.cp3Score.toFixed(1) : '—'}
                            </td>
                            <td className="py-4 px-3 text-center font-mono font-bold text-white">
                              {r.rawTotal > 0 ? (
                                <span className="text-purple-300 font-bold">{r.rawTotal.toFixed(1)}</span>
                              ) : (
                                <span className="text-slate-500">0.0</span>
                              )}
                            </td>
                            <td className="py-4 px-3 text-right font-mono font-bold">
                              {r.rawTotal > 0 ? (
                                <span className={r.zScore.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'}>
                                  {r.zScore}
                                </span>
                              ) : (
                                <span className="text-slate-500">—</span>
                              )}
                            </td>
                            <td className="py-4 px-3 text-center font-mono">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                                r.evaluationsCount >= 3 
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : (r.evaluationsCount > 0 
                                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                      : 'bg-slate-800 text-slate-400')
                              }`}>
                                {r.evaluationStatus}
                              </span>
                            </td>
                            <td className="py-4 px-3 text-right font-mono">
                              <span className="text-sky-400 inline-flex items-center justify-end gap-1">
                                <GitCommit className="w-3.5 h-3.5" />
                                <span>{r.commitCount}</span>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Bottom Stage Screen Link */}
              <div className="text-center pt-2">
                <Link
                  href="/stage"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-300 hover:text-white px-5 py-2.5 rounded-xl bg-aws-squidInk border border-purple-500/30 hover:border-purple-500 transition-colors shadow-lg"
                >
                  <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>Switch to Auditorium 20x10ft Stage Display Mode →</span>
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
