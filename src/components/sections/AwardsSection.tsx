'use client';

import React from 'react';
import { PROPOSED_AWARD_CATEGORIES } from '@/lib/config';
import { Trophy, Award, Shield, Clock, Lock } from 'lucide-react';

interface AwardsSectionProps {
  prizePoolConfirmed?: boolean;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ prizePoolConfirmed = false }) => {
  return (
    <section id="awards" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-darkest">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-purple-950/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Honors & Distinction</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Awards & <span className="gradient-text-kairos">Recognition</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Honoring exceptional engineering caliber, scalable architecture, and impactful problem-solving across national developer cohorts.
          </p>

          {/* Publication Rule Compliance Banner */}
          {!prizePoolConfirmed ? (
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm text-purple-200">
              <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>
                <strong>Official Notice:</strong> Specific prize pool valuations, corporate bounties, and trophy allocations will be released following institutional sponsor finalization.
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm text-emerald-200">
              <Trophy className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong>Confirmed Prize Pool:</strong> Verified ₹1,75,000 national cash prizes unlocked!
              </span>
            </div>
          )}
        </div>

        {/* Award Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PROPOSED_AWARD_CATEGORIES.map((award, idx) => {
            const isChampion = idx === 0;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
                  isChampion
                    ? 'glass-panel-glow border-2 border-amber-500/40 shadow-xl shadow-purple-950/60 bg-gradient-to-b from-purple-950/40 to-slate-950'
                    : 'glass-panel hover:border-purple-500/40'
                }`}
              >
                {isChampion && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500/20 border-b border-l border-amber-500/40 text-[10px] font-mono font-bold text-amber-300 rounded-bl-xl uppercase tracking-wider">
                    Apex Honor
                  </div>
                )}

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-900/40 text-purple-300 flex items-center justify-center border border-purple-500/25">
                    {isChampion ? (
                      <Trophy className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Award className="w-5 h-5 text-purple-300" />
                    )}
                  </div>

                  <h3 className="text-xl font-display font-bold text-white">
                    {award.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {award.desc}
                  </p>
                </div>

                {/* Amount / Announcement State */}
                <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Valuation</span>
                  {prizePoolConfirmed ? (
                    <span className="text-base font-display font-extrabold text-amber-300">
                      {award.proposedAmount}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-300 px-2.5 py-1 rounded bg-purple-950/60 border border-purple-500/20">
                      <Lock className="w-3 h-3 text-purple-400" />
                      <span>Announcing Soon</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
