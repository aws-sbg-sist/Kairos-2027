'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  UserCheck,
  ExternalLink,
  Github,
  Video,
  MapPin,
  RefreshCw,
  Edit3,
  Users,
  Search,
  FileText
} from 'lucide-react';

interface AssignedTeam {
  id: string;
  teamCode?: string;
  teamName: string;
  institutionName?: string;
  trackId: string;
  deskBayAllocation?: string;
  githubUrl?: string;
  loomUrl?: string;
  proposal?: {
    title?: string;
    summary?: string;
    problemStatement?: string;
    architectureOverview?: string;
  };
  members?: any[];
  evaluations?: any[];
}

export default function JudgingPortalPage() {
  const [pin, setPin] = useState('');
  const [authenticatedJudge, setAuthenticatedJudge] = useState<any>(null);
  const [assignedTeams, setAssignedTeams] = useState<AssignedTeam[]>([]);
  const [selectedTeamCode, setSelectedTeamCode] = useState<string>('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Scoring Form State
  const [gate, setGate] = useState<number>(1);
  const [scores, setScores] = useState({
    criterion1: 25, // /30
    criterion2: 20, // /25
    criterion3: 20, // /25
    criterion4: 16, // /20
  });
  const [feedback, setFeedback] = useState('');
  const [conflictRecusal, setConflictRecusal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editReason, setEditReason] = useState('');
  const [existingEvaluation, setExistingEvaluation] = useState<any>(null);

  const [submittedScore, setSubmittedScore] = useState<any>(null);
  const [scoreSubmitting, setScoreSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [searchTeam, setSearchTeam] = useState('');

  const rawTotal = scores.criterion1 + scores.criterion2 + scores.criterion3 + scores.criterion4;

  // Check existing session on mount
  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    setInitialLoading(true);
    try {
      const res = await fetch('/api/v1/judging/auth');
      const data = await res.json();
      if (res.ok && data.success && data.judge) {
        setAuthenticatedJudge(data.judge);
        setAssignedTeams(data.assignedTeams || []);
        if (data.assignedTeams && data.assignedTeams.length > 0) {
          const firstCode = data.assignedTeams[0].teamCode || data.assignedTeams[0].id;
          setSelectedTeamCode(firstCode);
        }
      }
    } catch {
      // Not authenticated, stay on PIN gate
    } finally {
      setInitialLoading(false);
    }
  };

  const handlePinAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/v1/judging/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessPin: pin }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAuthenticatedJudge(data.judge);
        setAssignedTeams(data.assignedTeams || []);
        if (data.assignedTeams && data.assignedTeams.length > 0) {
          const firstCode = data.assignedTeams[0].teamCode || data.assignedTeams[0].id;
          setSelectedTeamCode(firstCode);
        }
      } else {
        setAuthError(data.error || 'Authentication failed. Please check your PIN.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLockTerminal = async () => {
    try {
      await fetch('/api/v1/judging/auth', { method: 'DELETE' });
    } catch {
      // Ignore
    }
    setAuthenticatedJudge(null);
    setAssignedTeams([]);
    setSelectedTeamCode('');
    setPin('');
    setSubmittedScore(null);
  };

  // Find currently selected team object
  const currentTeam = assignedTeams.find(t => 
    (t.teamCode && t.teamCode.toLowerCase() === selectedTeamCode.toLowerCase()) ||
    t.id.toLowerCase() === selectedTeamCode.toLowerCase()
  );

  // Check if current team already has evaluation for selected gate
  useEffect(() => {
    if (!currentTeam || !currentTeam.evaluations) {
      setExistingEvaluation(null);
      setIsEditMode(false);
      return;
    }

    const evalForGate = currentTeam.evaluations.find(e => e.checkpointGate === gate);
    if (evalForGate) {
      setExistingEvaluation(evalForGate);
      setIsEditMode(true);
      setScores({
        criterion1: evalForGate.criterion1Score,
        criterion2: evalForGate.criterion2Score,
        criterion3: evalForGate.criterion3Score,
        criterion4: evalForGate.criterion4Score,
      });
      setFeedback(evalForGate.qualitativeFeedback || '');
      setEditReason('');
    } else {
      setExistingEvaluation(null);
      setIsEditMode(false);
      setScores({ criterion1: 25, criterion2: 20, criterion3: 20, criterion4: 16 });
      setFeedback('');
      setEditReason('');
    }
  }, [selectedTeamCode, gate, currentTeam]);

  const handleScoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScoreSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/v1/judging/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode: selectedTeamCode,
          checkpointGate: gate,
          criterion1Score: scores.criterion1,
          criterion2Score: scores.criterion2,
          criterion3Score: scores.criterion3,
          criterion4Score: scores.criterion4,
          qualitativeFeedback: feedback,
          recusedConflict: conflictRecusal,
          isEdit: isEditMode,
          editReason: isEditMode ? (editReason || 'Score calibration') : undefined
        }),
      });

      const data = await res.json();
      if ((res.ok || res.status === 201) && data.success) {
        setSubmittedScore(data.evaluation);
        // Refresh assigned teams
        checkActiveSession();
      } else if (res.status === 409) {
        setSubmitError(data.error || 'Team already evaluated for this checkpoint gate. Switch to Edit Mode to recalibrate.');
        setIsEditMode(true);
      } else {
        setSubmitError(data.error || 'Failed to record evaluation score.');
      }
    } catch {
      setSubmitError('Network failure communicating with evaluation service.');
    } finally {
      setScoreSubmitting(false);
    }
  };

  const filteredTeams = assignedTeams.filter(t => 
    t.teamName.toLowerCase().includes(searchTeam.toLowerCase()) ||
    (t.teamCode && t.teamCode.toLowerCase().includes(searchTeam.toLowerCase())) ||
    (t.institutionName && t.institutionName.toLowerCase().includes(searchTeam.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk border border-purple-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>PIN-Protected Digital Jury Scoring Terminal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Digital Jury <span className="gradient-text-kairos">Evaluation Portal</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Confidential 100-point rubric terminal for industry evaluators, Solutions Architects, and VC partners with automated real-time Z-score calibration.
            </p>
          </div>

          {initialLoading ? (
            <div className="p-16 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
              <span>Initializing secure evaluator terminal...</span>
            </div>
          ) : !authenticatedJudge ? (
            /* PIN Gate */
            <div className="max-w-md mx-auto p-8 rounded-3xl bg-aws-card border border-slate-700/60 shadow-2xl space-y-6 text-center animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-aws-squidInk text-purple-400 mx-auto flex items-center justify-center border border-purple-500/40">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-display">Enter Evaluator PIN</h3>
                <p className="text-xs text-slate-400">
                  Please enter your confidential 6-digit access PIN provided in your Judge Welcome Kit.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handlePinAuth} className="space-y-4">
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  placeholder="••••••"
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl px-4 py-3 rounded-xl glass-input text-purple-400 font-bold"
                  autoFocus
                />

                <div className="text-[11px] font-mono text-slate-400">
                  Official Demo PINs: <code className="text-purple-300 font-bold">202701</code> (Vikrant Roy), <code className="text-purple-300 font-bold">202702</code> (Peak Capital)
                </div>

                <button
                  type="submit"
                  disabled={authLoading || pin.length < 4}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-700 to-purple-900 text-white hover:opacity-90 transition-opacity shadow-md disabled:opacity-50"
                >
                  {authLoading ? 'Authenticating...' : 'Unlock Evaluation Terminal →'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Evaluation Scoring Terminal */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Evaluator Welcome Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-aws-squidInk border border-purple-500/40 flex flex-wrap items-center justify-between gap-4 text-xs shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">{authenticatedJudge.fullName}</span>
                    <span className="text-slate-400 text-xs">
                      {authenticatedJudge.organization} • {authenticatedJudge.designation} • <span className="text-purple-300 font-mono">{authenticatedJudge.assignedHall || 'Auditorium'}</span>
                    </span>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/50 text-purple-300 border border-purple-500/30">
                      Track: {authenticatedJudge.trackSpecialization || 'All Tracks'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/leaderboard"
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                  >
                    Live Leaderboard ↗
                  </Link>
                  <button
                    onClick={handleLockTerminal}
                    className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-rose-300 bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900/50 transition-colors"
                  >
                    Lock Terminal
                  </button>
                </div>
              </div>

              {submittedScore ? (
                /* Success Screen with Z-score Result */
                <div className="p-8 sm:p-12 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-6 shadow-2xl animate-fadeIn">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white font-display">Evaluation Committed & Z-Score Calibrated</h3>
                    <p className="text-xs text-slate-300 max-w-lg mx-auto">
                      Score successfully recorded in tournament ledger for team <strong className="text-purple-300">{submittedScore.teamId}</strong> (Checkpoint Gate {submittedScore.checkpointGate}).
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-8 font-mono text-xs p-6 rounded-2xl bg-black/40 border border-emerald-500/30 max-w-md mx-auto">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Raw Evaluation</span>
                      <span className="text-3xl font-black text-white">{submittedScore.rawTotalScore} <span className="text-xs text-slate-400">/ 100</span></span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">Gaussian Z-Score</span>
                      <span className="text-3xl font-black text-emerald-400">
                        {submittedScore.normalizedZScore >= 0 ? '+' : ''}{submittedScore.normalizedZScore}σ
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => { setSubmittedScore(null); }}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-700 to-purple-900 text-white hover:opacity-90 transition-opacity shadow-lg"
                    >
                      Evaluate Next Team →
                    </button>
                    <Link
                      href="/leaderboard"
                      className="px-6 py-3 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/15 text-white transition-colors"
                    >
                      View Live Standings
                    </Link>
                  </div>
                </div>
              ) : (
                /* Scoring Workspace: Assigned Teams Sidebar + Rubric */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Assigned Teams Selector (4 Cols) */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="p-4 rounded-2xl bg-aws-card border border-slate-700/60 shadow-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>Assigned Teams ({assignedTeams.length})</span>
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">Your Track</span>
                      </div>

                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={searchTeam}
                          onChange={e => setSearchTeam(e.target.value)}
                          placeholder="Search assigned team..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl glass-input font-mono"
                        />
                      </div>

                      <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1">
                        {filteredTeams.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-500 font-mono">
                            No matching teams found.
                          </div>
                        ) : (
                          filteredTeams.map(t => {
                            const isSelected = (t.teamCode && t.teamCode.toLowerCase() === selectedTeamCode.toLowerCase()) || t.id.toLowerCase() === selectedTeamCode.toLowerCase();
                            const evalsCount = t.evaluations ? t.evaluations.length : 0;
                            const hasEvaluatedCurrentGate = t.evaluations && t.evaluations.some(e => e.checkpointGate === gate);

                            return (
                              <button
                                key={t.id}
                                onClick={() => setSelectedTeamCode(t.teamCode || t.id)}
                                className={`w-full text-left p-3 rounded-xl transition-all border ${
                                  isSelected 
                                    ? 'bg-purple-950/60 border-purple-500 shadow-md' 
                                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-xs font-bold text-purple-400">
                                    {t.teamCode || t.id}
                                  </span>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                    evalsCount >= 3 
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                      : (hasEvaluatedCurrentGate ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-slate-800 text-slate-400')
                                  }`}>
                                    {hasEvaluatedCurrentGate ? `Gate ${gate} Done` : `${evalsCount}/3 Done`}
                                  </span>
                                </div>
                                <div className="font-bold text-white text-xs mt-1 truncate">
                                  {t.teamName}
                                </div>
                                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                                  {t.institutionName || 'SIST'}
                                </div>
                                {t.deskBayAllocation && (
                                  <div className="text-[10px] font-mono text-amber-300/80 mt-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{t.deskBayAllocation}</span>
                                  </div>
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Submission Review & Rubric Sliders (8 Cols) */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Submission Review Card */}
                    {currentTeam && (
                      <div className="p-5 rounded-2xl bg-aws-card border border-slate-700/60 shadow-lg space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-bold text-white font-display">
                                {currentTeam.teamName}
                              </h3>
                              <span className="text-xs font-mono text-purple-400 font-bold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
                                {currentTeam.teamCode || currentTeam.id}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {currentTeam.institutionName} • Track: <strong className="text-slate-300">{currentTeam.trackId}</strong>
                              {currentTeam.deskBayAllocation && ` • Allocation: ${currentTeam.deskBayAllocation}`}
                            </p>
                          </div>

                          {/* Submission Links */}
                          <div className="flex items-center gap-2">
                            {currentTeam.githubUrl && (
                              <a
                                href={currentTeam.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-500 text-slate-200 transition-colors"
                              >
                                <Github className="w-3.5 h-3.5 text-purple-400" />
                                <span>Code Repo</span>
                                <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                              </a>
                            )}
                            {currentTeam.loomUrl && (
                              <a
                                href={currentTeam.loomUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-purple-500 text-slate-200 transition-colors"
                              >
                                <Video className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Loom Demo</span>
                                <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Proposal / Abstract Snippet */}
                        {currentTeam.proposal && (
                          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5">
                            <div className="flex items-center gap-1.5 font-bold text-purple-300 font-mono text-[11px]">
                              <FileText className="w-3.5 h-3.5" />
                              <span>Project Abstract: {currentTeam.proposal.title || currentTeam.teamName}</span>
                            </div>
                            <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-3">
                              {currentTeam.proposal.summary || currentTeam.proposal.problemStatement || currentTeam.proposal.architectureOverview || 'Abstract submitted during qualifier stage.'}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Rubric Card */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-6">
                      
                      {submitError && (
                        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      {/* Gate & Edit Status Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-aws-squidInk border border-purple-500/30">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-purple-300 font-bold block">
                            Active Checkpoint Gate
                          </label>
                          <select
                            value={gate}
                            onChange={e => setGate(Number(e.target.value))}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none"
                          >
                            <option value={1}>Checkpoint Gate 1: Architecture & Reliability (Friday)</option>
                            <option value={2}>Checkpoint Gate 2: Code Velocity & Middleware (Saturday)</option>
                            <option value={3}>Checkpoint Gate 3: Grand Stage Live Defense (Sunday)</option>
                          </select>
                        </div>

                        {existingEvaluation && (
                          <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Mode Active (Prev: {existingEvaluation.rawTotalScore}/100)</span>
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                              Submitting will recalibrate this score
                            </span>
                          </div>
                        )}
                      </div>

                      {/* 4 Rubric Criteria Sliders */}
                      <form onSubmit={handleScoreSubmit} className="space-y-6">
                        <div className="space-y-5">
                          {/* Criterion 1 */}
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">1. Technical Architecture, Reliability & Scalability</span>
                              <span className="font-mono text-purple-300 font-bold text-sm">{scores.criterion1} / 30 Pts</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              Modularity, clean code practices, security considerations, appropriate database/cloud selection, error resilience, and capacity to handle scale.
                            </p>
                            <input
                              type="range"
                              min={0}
                              max={30}
                              step={1}
                              value={scores.criterion1}
                              onChange={e => setScores({ ...scores, criterion1: Number(e.target.value) })}
                              className="w-full accent-purple-500"
                            />
                          </div>

                          {/* Criterion 2 */}
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">2. Originality & Quality of Problem-Solving</span>
                              <span className="font-mono text-purple-300 font-bold text-sm">{scores.criterion2} / 25 Pts</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              Depth of domain understanding, freshness of perspective, non-trivial engineering insights, and avoidance of shallow AI wrappers.
                            </p>
                            <input
                              type="range"
                              min={0}
                              max={25}
                              step={1}
                              value={scores.criterion2}
                              onChange={e => setScores({ ...scores, criterion2: Number(e.target.value) })}
                              className="w-full accent-purple-500"
                            />
                          </div>

                          {/* Criterion 3 */}
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">3. Working Prototype & User Experience</span>
                              <span className="font-mono text-purple-300 font-bold text-sm">{scores.criterion3} / 25 Pts</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              A genuine, functional live implementation demonstrated during checkpoints; intuitive interface, responsive polish, and frictionless workflows.
                            </p>
                            <input
                              type="range"
                              min={0}
                              max={25}
                              step={1}
                              value={scores.criterion3}
                              onChange={e => setScores({ ...scores, criterion3: Number(e.target.value) })}
                              className="w-full accent-purple-500"
                            />
                          </div>

                          {/* Criterion 4 */}
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-white">4. Practical Value & Pitch Defense</span>
                              <span className="font-mono text-purple-300 font-bold text-sm">{scores.criterion4} / 20 Pts</span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              Viability in real-world deployment, clarity of the 48-hour presentation, technical rigor in answering tough jury questions, and team collaboration.
                            </p>
                            <input
                              type="range"
                              min={0}
                              max={20}
                              step={1}
                              value={scores.criterion4}
                              onChange={e => setScores({ ...scores, criterion4: Number(e.target.value) })}
                              className="w-full accent-purple-500"
                            />
                          </div>
                        </div>

                        {/* Raw Cumulative Tally Bar */}
                        <div className="p-4 rounded-2xl bg-aws-squidInk border border-purple-500/40 flex items-center justify-between font-mono shadow-md">
                          <span className="text-xs text-slate-300 font-bold">Raw Cumulative Evaluation Tally:</span>
                          <span className="text-2xl font-black text-purple-300">{rawTotal} / 100 Pts</span>
                        </div>

                        {/* If Edit Mode, provide reason */}
                        {isEditMode && (
                          <div className="space-y-1">
                            <label className="text-xs font-mono text-purple-300 font-bold">
                              Reason for Score Calibration / Update (Mandatory for Audit Trail)
                            </label>
                            <input
                              type="text"
                              value={editReason}
                              onChange={e => setEditReason(e.target.value)}
                              placeholder="e.g. Revised architecture assessment following table-side demo"
                              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                            />
                          </div>
                        )}

                        {/* Qualitative Feedback */}
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Confidential Evaluator Feedback & Notes</label>
                          <textarea
                            rows={3}
                            value={feedback}
                            onChange={e => setFeedback(e.target.value)}
                            placeholder="Comment on architecture resilience, API implementation authenticity, and areas for improvement..."
                            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                          />
                        </div>

                        {/* Conflict of Interest Recusal */}
                        <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
                          <input
                            type="checkbox"
                            id="recusal"
                            checked={conflictRecusal}
                            onChange={e => setConflictRecusal(e.target.checked)}
                            className="accent-purple-500 w-4 h-4 rounded"
                          />
                          <label htmlFor="recusal" className="cursor-pointer text-[11px]">
                            I declare a potential conflict of interest with this team (e.g. same institution) and request score normalization weighting.
                          </label>
                        </div>

                        {/* Submit */}
                        <div className="pt-4 border-t border-white/10">
                          <button
                            type="submit"
                            disabled={scoreSubmitting || !selectedTeamCode}
                            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-700 to-purple-900 hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <span>
                              {scoreSubmitting 
                                ? 'Calculating Z-Score...' 
                                : (isEditMode ? 'Update Evaluation & Recalibrate Z-Score' : 'Commit Evaluation Scores & Compute Z-Score')}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>

                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
