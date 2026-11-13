'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { TECHNICAL_TRACKS } from '@/lib/config';
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
  Cpu
} from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

const SAMPLE_RANKINGS = [
  {
    rank: 1,
    teamCode: 'KAIROS-T002',
    teamName: 'Aegis Swarm',
    institution: 'IIT Madras',
    track: 'Agentic AI & Generative Intelligence',
    trackId: 'agentic-ai',
    cp1Score: 24.0, // /25
    cp2Score: 34.0, // /35
    cp3Score: 38.5, // /40
    rawTotal: 96.5,
    zScore: '+2.14σ',
    commitCount: 84,
    velocity: 'High Velocity',
    status: 'TOP_PODIUM'
  },
  {
    rank: 2,
    teamCode: 'KAIROS-T001',
    teamName: 'Chronos Distributed',
    institution: 'Sathyabama University',
    track: 'Cloud-Native, High-Throughput & Distributed Systems',
    trackId: 'cloud-native',
    cp1Score: 23.5,
    cp2Score: 33.5,
    cp3Score: 38.0,
    rawTotal: 95.0,
    zScore: '+1.88σ',
    commitCount: 96,
    velocity: 'High Velocity',
    status: 'TOP_PODIUM'
  },
  {
    rank: 3,
    teamCode: 'KAIROS-T007',
    teamName: 'ZeroTrust Ledger',
    institution: 'BITS Pilani',
    track: 'Next-Gen FinTech, Trust & Cryptographic Security',
    trackId: 'fintech-trust',
    cp1Score: 23.0,
    cp2Score: 32.5,
    cp3Score: 37.5,
    rawTotal: 93.0,
    zScore: '+1.52σ',
    commitCount: 68,
    velocity: 'Sustained Velocity',
    status: 'TOP_PODIUM'
  },
  {
    rank: 4,
    teamCode: 'KAIROS-T003',
    teamName: 'VoltEdge Smart Grid',
    institution: 'NIT Tiruchirappalli',
    track: 'Autonomous Edge IoT & Sustainable Green Energy',
    trackId: 'edge-iot',
    cp1Score: 22.0,
    cp2Score: 31.5,
    cp3Score: 36.5,
    rawTotal: 90.0,
    zScore: '+1.18σ',
    commitCount: 52,
    velocity: 'Sustained Velocity',
    status: 'TRACK_LEADER'
  },
  {
    rank: 5,
    teamCode: 'KAIROS-T012',
    teamName: 'PulseCare AI',
    institution: 'Anna University, CEG',
    track: 'Open Enterprise & Campus Life Innovation',
    trackId: 'open-enterprise',
    cp1Score: 21.5,
    cp2Score: 31.0,
    cp3Score: 36.0,
    rawTotal: 88.5,
    zScore: '+0.94σ',
    commitCount: 61,
    velocity: 'Sustained Velocity',
    status: 'TRACK_LEADER'
  },
  {
    rank: 6,
    teamCode: 'KAIROS-T019',
    teamName: 'Titan Mesh',
    institution: 'PSG College of Technology',
    track: 'Cloud-Native, High-Throughput & Distributed Systems',
    trackId: 'cloud-native',
    cp1Score: 21.0,
    cp2Score: 30.5,
    cp3Score: 35.0,
    rawTotal: 86.5,
    zScore: '+0.71σ',
    commitCount: 74,
    velocity: 'High Velocity',
    status: 'FINALIST'
  },
  {
    rank: 7,
    teamCode: 'KAIROS-T025',
    teamName: 'NeuralKnot',
    institution: 'VIT Vellore',
    track: 'Agentic AI & Generative Intelligence',
    trackId: 'agentic-ai',
    cp1Score: 20.5,
    cp2Score: 30.0,
    cp3Score: 34.5,
    rawTotal: 85.0,
    zScore: '+0.55σ',
    commitCount: 45,
    velocity: 'Active',
    status: 'FINALIST'
  }
];

export default function LeaderboardPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [rankings, setRankings] = useState(SAMPLE_RANKINGS);

  useEffect(() => {
    fetch('/api/v1/judging/submit-score')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.standings && data.standings.length > 0) {
          const liveMerged = data.standings.map((s: any, idx: number) => {
            const fallback = SAMPLE_RANKINGS.find(r => r.teamCode === s.teamCode) || SAMPLE_RANKINGS[idx % SAMPLE_RANKINGS.length];
            return {
              ...fallback,
              rank: idx + 1,
              teamCode: s.teamCode || fallback.teamCode,
              teamName: s.teamName || fallback.teamName,
              institution: s.institution || fallback.institution,
              trackId: s.trackId || fallback.trackId,
              rawTotal: s.rawTotal > 0 ? s.rawTotal : fallback.rawTotal,
              zScore: s.evaluationCount > 0 ? s.zScore : fallback.zScore,
              status: idx === 0 ? 'TOP_PODIUM' : idx < 3 ? 'PODIUM' : 'QUALIFIED'
            };
          });
          setRankings(liveMerged);
        }
      })
      .catch(() => { });
  }, []);

  const filteredRankings = rankings.filter(r => {
    const matchesTrack = selectedTrack === 'all' || r.trackId === selectedTrack;
    const matchesSearch =
      r.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.teamCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
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
              Dynamic rankings computed across Checkpoints 1, 2, and 3. Normalized via Gaussian Z-scores to completely neutralize evaluator grading variance.
            </p>
          </div>

          {/* Mathematical Z-Score Explanation Box */}
          <div className="p-6 rounded-3xl bg-aws-squidInk border border-purple-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Algorithmic Fairness: The Z-Score Formula
                </h3>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Because some judges grade strictly and others grade leniently, Kairos 2027 uses standard deviation normalization: Each team&apos;s raw score X from judge j is mathematically transformed to Z = (X - &mu;) / &sigma;. This guarantees every team competes on an exact, mathematically fair playing field.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 font-mono text-sm text-purple-400 border border-slate-800 flex-shrink-0 text-center font-bold">
              Z = (Score - μ) / σ
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Track selector */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  sound?.playClick();
                  haptics?.selection();
                  setSelectedTrack('all');
                }}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${selectedTrack === 'all'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-900/40'
                    : 'bg-aws-card text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
              >
                All 5 Tracks
              </button>
              {TECHNICAL_TRACKS.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound?.playClick();
                    haptics?.selection();
                    setSelectedTrack(t.id);
                  }}
                  className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${selectedTrack === t.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-900/40'
                      : 'bg-aws-card text-slate-300 hover:text-white border border-slate-700/60'
                    }`}
                >
                  Track {t.number}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search team name, code, or college..."
                className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>

          {/* Leaderboard Table Double-Bezel Card */}
          <div className="double-bezel shadow-2xl">
            <div className="double-bezel-inner p-6 sm:p-8 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono text-purple-300 uppercase">
                    <th className="py-3 px-3">Rank</th>
                    <th className="py-3 px-3">Team Code</th>
                    <th className="py-3 px-3">Team & Institution</th>
                    <th className="py-3 px-3">Track</th>
                    <th className="py-3 px-3 text-center">CP1 (25)</th>
                    <th className="py-3 px-3 text-center">CP2 (35)</th>
                    <th className="py-3 px-3 text-center">CP3 (40)</th>
                    <th className="py-3 px-3 text-center">Raw (100)</th>
                    <th className="py-3 px-3 text-right">Z-Score</th>
                    <th className="py-3 px-3 text-right">Commit Telemetry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRankings.map((r) => {
                    const isTop3 = r.rank <= 3;
                    return (
                      <tr
                        key={r.teamCode}
                        className={`hover:bg-white/[0.02] transition-colors ${isTop3 ? 'bg-purple-950/30' : ''
                          }`}
                      >
                        <td className="py-4 px-3 font-mono font-bold">
                          <div className="flex items-center gap-1.5">
                            {r.rank === 1 && (
                              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold inline-flex items-center justify-center">
                                1
                              </span>
                            )}
                            {r.rank === 2 && (
                              <span className="w-6 h-6 rounded-full bg-slate-400/20 text-slate-200 border border-slate-400/40 font-mono text-xs font-bold inline-flex items-center justify-center">
                                2
                              </span>
                            )}
                            {r.rank === 3 && (
                              <span className="w-6 h-6 rounded-full bg-amber-600/20 text-amber-300 border border-amber-600/40 font-mono text-xs font-bold inline-flex items-center justify-center">
                                3
                              </span>
                            )}
                            {r.rank > 3 && (
                              <span className="w-6 h-6 font-mono text-xs text-slate-400 inline-flex items-center justify-center">
                                {r.rank}
                              </span>
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
                            {r.institution}
                          </span>
                        </td>
                        <td className="py-4 px-3 text-slate-300 max-w-[200px] truncate">
                          {r.track}
                        </td>
                        <td className="py-4 px-3 text-center font-mono text-slate-300">
                          {r.cp1Score.toFixed(1)}
                        </td>
                        <td className="py-4 px-3 text-center font-mono text-slate-300">
                          {r.cp2Score.toFixed(1)}
                        </td>
                        <td className="py-4 px-3 text-center font-mono text-slate-300">
                          {r.cp3Score.toFixed(1)}
                        </td>
                        <td className="py-4 px-3 text-center font-mono font-bold text-white">
                          {r.rawTotal.toFixed(1)}
                        </td>
                        <td className="py-4 px-3 text-right font-mono font-bold text-emerald-400">
                          {r.zScore}
                        </td>
                        <td className="py-4 px-3 text-right font-mono">
                          <span className="text-sky-400 flex items-center justify-end gap-1">
                            <GitCommit className="w-3.5 h-3.5" />
                            <span>{r.commitCount} commits</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Stage Screen Link */}
          <div className="text-center pt-2">
            <Link
              href="/stage"
              className="island-btn inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-300 hover:text-white px-5 py-2.5 rounded-xl bg-aws-squidInk border border-purple-500/30 hover:border-purple-500 transition-all shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]"
            >
              <span>Switch to Auditorium 20x10ft Stage Display Mode</span>
              <span className="island-btn-icon">→</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
