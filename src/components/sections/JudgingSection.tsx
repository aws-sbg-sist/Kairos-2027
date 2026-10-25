'use client';

import React from 'react';
import { JUDGING_CRITERIA } from '@/lib/config';
import { Award, ShieldCheck, Scale, CheckSquare, Eye, Users } from 'lucide-react';

export const JudgingSection: React.FC = () => {
  return (
    <section id="judging" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-bg/60">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span>Merit-Driven Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            100-Point <span className="gradient-text-kairos">Judging Rubric</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Transparent, uncompromised evaluation criteria designed to reward authentic software craftsmanship, architecture scalability, and user empathy.
          </p>
        </div>

        {/* 4 Rubric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {JUDGING_CRITERIA.map((criterion, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                    CRITERION 0{idx + 1}
                  </span>
                  <div className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-900/60 text-purple-200 border border-purple-500/40">
                    {criterion.points} PTS ({criterion.percentage})
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-purple-200 transition-colors">
                  {criterion.category}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {criterion.description}
                </p>
              </div>

              {/* Progress bar visual */}
              <div className="pt-2">
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-sky-400 rounded-full"
                    style={{ width: `${criterion.points * 3.33}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Evaluation Ethics & Checkpoints Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-5 rounded-xl bg-slate-950/60 border border-purple-500/15 space-y-2">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
              <CheckSquare className="w-4 h-4 text-purple-400" />
              <span>Two Mandatory Checkpoints</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Friday architecture review (Round 1) and Saturday 3:00 PM prototype verification ensure all projects are engineered live during the 48-hour event window.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/60 border border-purple-500/15 space-y-2">
            <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Human Jury Defense</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Top 20 teams present 10-minute live demonstrations on the main stadium stage, defending their technical choices before academic faculty and industry leaders.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/60 border border-purple-500/15 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conflict of Interest Recusal</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jury members and mentors must disclose any academic or institutional relationship with contestants, recusing themselves from evaluating affiliated student teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
