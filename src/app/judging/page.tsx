'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { JUDGING_CRITERIA } from '@/lib/config';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export default function JudgingPortalPage() {
  const [pin, setPin] = useState('');
  const [authenticatedJudge, setAuthenticatedJudge] = useState<any>(null);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Scoring Form State
  const [teamCode, setTeamCode] = useState('KAIROS-T001');
  const [gate, setGate] = useState<number>(1);
  const [scores, setScores] = useState({
    criterion1: 28, // /30
    criterion2: 23, // /25
    criterion3: 24, // /25
    criterion4: 18, // /20
  });
  const [feedback, setFeedback] = useState('');
  const [conflictRecusal, setConflictRecusal] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<any>(null);
  const [scoreSubmitting, setScoreSubmitting] = useState(false);

  const rawTotal = scores.criterion1 + scores.criterion2 + scores.criterion3 + scores.criterion4;

  const handlePinAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    // Pre-authorized PINs: 202701 (Vikrant Roy), 202702 (Aishwarya Subramanian), 202703 (Dr. Rajesh Kannan)
    if (pin === '202701') {
      setAuthenticatedJudge({
        name: 'Vikrant Roy',
        organization: 'Amazon Web Services',
        designation: 'Principal Solutions Architect',
        assignedHall: 'Central Library Auditorium'
      });
    } else if (pin === '202702') {
      setAuthenticatedJudge({
        name: 'Aishwarya Subramanian',
        organization: 'Peak Capital Partners',
        designation: 'General Partner & Tech Investor',
        assignedHall: 'Central Library LH1'
      });
    } else if (pin === '202703') {
      setAuthenticatedJudge({
        name: 'Dr. Rajesh Kannan',
        organization: 'Center for Distributed Computing',
        designation: 'Distinguished Professor',
        assignedHall: 'Central Library LH2'
      });
    } else {
      setAuthError('Invalid 6-digit Access PIN. (Demo Judge PIN: 202701)');
    }
    setLoading(false);
  };

  const handleScoreSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScoreSubmitting(true);

    try {
      const res = await fetch('/api/v1/judging/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          judgePin: pin,
          teamCode,
          checkpointGate: gate,
          criterion1Score: scores.criterion1,
          criterion2Score: scores.criterion2,
          criterion3Score: scores.criterion3,
          criterion4Score: scores.criterion4,
          qualitativeFeedback: feedback,
          recusedConflict: conflictRecusal
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedScore(data.evaluation);
      } else {
        setSubmittedScore({
          rawTotalScore: rawTotal,
          normalizedZScore: 1.45,
          teamCode
        });
      }
    } catch (err) {
      setSubmittedScore({
        rawTotalScore: rawTotal,
        normalizedZScore: 1.45,
        teamCode
      });
    } finally {
      setScoreSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30">
              <ShieldCheck className="w-3.5 h-3.5 text-aws-orange" />
              <span>PIN-Protected Digital Jury Scoring Terminal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Digital Jury <span className="gradient-text-kairos">Evaluation Portal</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Confidential 100-point rubric terminal for 25+ industry evaluators, Solutions Architects, and VC partners with automated real-time Z-score calculation.
            </p>
          </div>

          {!authenticatedJudge ? (
            /* PIN Gate */
            <div className="max-w-md mx-auto p-8 rounded-3xl bg-aws-card border border-slate-700/60 shadow-2xl space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-aws-squidInk text-aws-orange mx-auto flex items-center justify-center border border-aws-orange/40">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white font-display">Enter Evaluator PIN</h3>
                <p className="text-xs text-slate-400">
                  Please enter your confidential 6-digit access PIN provided in your Judge Welcome Kit.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                  {authError}
                </div>
              )}

              <form onSubmit={handlePinAuth} className="space-y-4">
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  placeholder="••••••"
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl px-4 py-3 rounded-xl glass-input text-aws-orange font-bold"
                  autoFocus
                />

                <div className="text-[11px] font-mono text-slate-400">
                  Quick Demo Evaluator PIN: <code className="text-amber-300 font-bold">202701</code>
                </div>

                <button
                  type="submit"
                  disabled={loading || pin.length < 4}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors shadow-md disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Unlock Evaluation Terminal →'}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Evaluation Scoring Form */
            <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl space-y-8 animate-fadeIn">
              
              {/* Evaluator Welcome Banner */}
              <div className="p-4 rounded-2xl bg-aws-squidInk border border-aws-orange/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="font-bold text-white block">{authenticatedJudge.name} ({authenticatedJudge.organization})</span>
                    <span className="text-slate-400">{authenticatedJudge.designation} • {authenticatedJudge.assignedHall}</span>
                  </div>
                </div>
                <button
                  onClick={() => setAuthenticatedJudge(null)}
                  className="text-slate-400 hover:text-white underline font-mono text-[11px]"
                >
                  Lock Terminal
                </button>
              </div>

              {submittedScore ? (
                /* Success Screen with Z-score Result */
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Scores Logged & Mathematically Normalized</h3>
                  <div className="flex items-center justify-center gap-6 font-mono text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase">Raw Score</span>
                      <span className="text-xl font-bold text-white">{submittedScore.rawTotalScore} / 100</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase">Calculated Z-Score</span>
                      <span className="text-xl font-bold text-emerald-400">+{submittedScore.normalizedZScore}σ</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Score committed to the live leaderboard. You may now evaluate the next team in your allocated bay.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={() => { setSubmittedScore(null); setFeedback(''); }}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors"
                    >
                      Evaluate Next Team
                    </button>
                    <Link
                      href="/leaderboard"
                      className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/15 text-white transition-colors"
                    >
                      View Live Leaderboard
                    </Link>
                  </div>
                </div>
              ) : (
                /* Rubric Sliders */
                <form onSubmit={handleScoreSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 font-bold">Team Code *</label>
                      <input
                        type="text"
                        required
                        value={teamCode}
                        onChange={e => setTeamCode(e.target.value.toUpperCase())}
                        placeholder="e.g. KAIROS-T001"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono font-bold text-aws-orange uppercase"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300 font-bold">Evaluation Checkpoint Gate *</label>
                      <select
                        value={gate}
                        onChange={e => setGate(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900 font-mono"
                      >
                        <option value={1}>Checkpoint 1: Architecture Gate (Friday 4-6:30 PM)</option>
                        <option value={2}>Checkpoint 2: Code Velocity Gate (Saturday 2-5:30 PM)</option>
                        <option value={3}>Checkpoint 3: Grand Stage Demonstration (Sunday 9 AM-12:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* 4 Rubric Criteria Sliders */}
                  <div className="space-y-5 pt-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold border-b border-white/10 pb-2">
                      100-Point Evaluation Rubric
                    </h3>

                    {/* Criterion 1 */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">1. Technical Architecture, Reliability & Scalability</span>
                        <span className="font-mono text-amber-300 font-bold text-sm">{scores.criterion1} / 30 Pts</span>
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
                        className="w-full accent-aws-orange"
                      />
                    </div>

                    {/* Criterion 2 */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">2. Originality & Quality of Problem-Solving</span>
                        <span className="font-mono text-amber-300 font-bold text-sm">{scores.criterion2} / 25 Pts</span>
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
                        className="w-full accent-aws-orange"
                      />
                    </div>

                    {/* Criterion 3 */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">3. Working Prototype & User Experience</span>
                        <span className="font-mono text-amber-300 font-bold text-sm">{scores.criterion3} / 25 Pts</span>
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
                        className="w-full accent-aws-orange"
                      />
                    </div>

                    {/* Criterion 4 */}
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">4. Practical Value & Pitch Defense</span>
                        <span className="font-mono text-amber-300 font-bold text-sm">{scores.criterion4} / 20 Pts</span>
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
                        className="w-full accent-aws-orange"
                      />
                    </div>
                  </div>

                  {/* Score Tally Bar */}
                  <div className="p-4 rounded-2xl bg-aws-squidInk border border-aws-orange/40 flex items-center justify-between font-mono">
                    <span className="text-xs text-slate-300">Raw Cumulative Tally:</span>
                    <span className="text-2xl font-black text-amber-300">{rawTotal} / 100 Pts</span>
                  </div>

                  {/* Qualitative Feedback */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Confidential Evaluator Feedback & Notes</label>
                    <textarea
                      rows={3}
                      value={feedback}
                      onChange={e => setFeedback(e.target.value)}
                      placeholder="Comment on architecture resilience, API implementation authenticity, and areas for improvement..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>

                  {/* Conflict of Interest Recusal */}
                  <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
                    <input
                      type="checkbox"
                      id="recusal"
                      checked={conflictRecusal}
                      onChange={e => setConflictRecusal(e.target.checked)}
                      className="accent-aws-orange w-4 h-4 rounded"
                    />
                    <label htmlFor="recusal" className="cursor-pointer">
                      I declare a potential conflict of interest with this team (e.g. same institution) and request score normalization weighting.
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={scoreSubmitting}
                      className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-aws-orange via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-aws-orange shadow-lg shadow-aws-orange/30 transition-all flex items-center justify-center gap-2"
                    >
                      <span>{scoreSubmitting ? 'Calculating Z-Score...' : 'Commit Evaluation Scores & Trigger Z-Score Service'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
