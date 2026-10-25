'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRIZE_POOL_CARDS } from '@/lib/config';
import { Trophy, Award, Shield, CheckCircle2, ArrowRight, Gift } from 'lucide-react';

interface AwardsSectionProps {
  prizePoolConfirmed?: boolean;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ prizePoolConfirmed = true }) => {
  return (
    <section id="awards" className="relative py-20 lg:py-28 overflow-hidden bg-aws-canvas">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-aws-orange/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30 shadow-md">
            <div className="relative w-5 h-5 rounded overflow-hidden">
              <Image
                src="/assets/prizes.png"
                alt="Prizes Badge"
                fill
                className="object-contain"
              />
            </div>
            <span>₹1,75,000 Pure Cash Prize Pool</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Awards, Honors & <span className="gradient-text-kairos">Cash Bounties</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            100% verified pure cash prizes deposited directly to winning student accounts, alongside VC pitch fast-tracking and $50,000+ in AWS Cloud Promotional Credits.
          </p>

          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs sm:text-sm text-emerald-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>Zero Deduction Guarantee:</strong> 100% Free Entry • ₹1,75,000 Pure Cash Pool • No Tokenomics / Real INR Wire Transfers
            </span>
          </div>
        </div>

        {/* Podium 3 Cards (Champion, 1st Runner Up, 2nd Runner Up) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8 items-stretch">
          {PRIZE_POOL_CARDS.slice(0, 3).map((item, idx) => {
            const isGrand = idx === 0;
            return (
              <div
                key={item.position}
                className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all relative overflow-hidden ${
                  isGrand
                    ? 'bg-gradient-to-b from-aws-squidInk to-slate-950 border-2 border-aws-orange shadow-2xl shadow-aws-orange/20 lg:-translate-y-2'
                    : 'bg-aws-card border border-slate-700/60 hover:border-aws-orange/40'
                }`}
              >
                {isGrand && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-aws-orange text-slate-950 font-mono font-black text-xs rounded-bl-xl uppercase tracking-wider">
                    Apex Champion
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden ${
                      isGrand ? 'bg-aws-orange/20 text-aws-orange border border-aws-orange/40 p-1.5' : 'bg-white/5 text-slate-300 border border-white/10'
                    }`}>
                      {isGrand ? (
                        <Image
                          src="/assets/achievement.png"
                          alt="Apex Achievement"
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <Trophy className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-amber-300 font-semibold block uppercase">
                        {item.badge}
                      </span>
                      <h3 className="text-lg font-display font-bold text-white">
                        {item.position.split('—')[0]}
                      </h3>
                    </div>
                  </div>

                  {/* Cash Amount Banner */}
                  <div className={`p-4 rounded-xl border ${
                    isGrand ? 'bg-aws-orange/15 border-aws-orange/30' : 'bg-slate-900/80 border-slate-700/60'
                  }`}>
                    <span className="text-[11px] font-mono text-slate-400 block uppercase">Cash Bounty</span>
                    <span className="text-3xl font-display font-black text-white block">
                      {item.cashPrize}
                    </span>
                  </div>

                  {/* Perks list */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Winner Honors:</span>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {item.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-aws-orange flex-shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    href="/register"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isGrand
                        ? 'bg-aws-orange text-slate-950 hover:bg-amber-400 shadow-md'
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span>Compete for this Title</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track Category & Special Bounties Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* 5 Enterprise Track Category Winners */}
          <div className="p-6 rounded-2xl bg-aws-card border border-slate-700/60 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-aws-blue/20 text-sky-400 flex items-center justify-center border border-aws-blue/30">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-sky-400 font-semibold block uppercase">5 Enterprise Tracks</span>
                <h3 className="text-lg font-display font-bold text-white">5 Dedicated Track Winner Bounties</h3>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-between">
              <span className="text-xs text-slate-300">₹7,000 per Track Winner</span>
              <span className="text-xl font-display font-black text-amber-300">₹35,000 Total Cash</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Agentic AI • Cloud-Native Systems • Edge IoT • FinTech • Open Enterprise</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Dedicated Track Winner Mementos & Direct API Partner Bounties</span>
              </li>
            </ul>
          </div>

          {/* Special Category Bounties */}
          <div className="p-6 rounded-2xl bg-aws-card border border-slate-700/60 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/30 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-purple-300 font-semibold block uppercase">Diversity & Innovation Citations</span>
                <h3 className="text-lg font-display font-bold text-white">Special Category Cash Bounties</h3>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-between">
              <span className="text-xs text-slate-300">3 Specialized Citations</span>
              <span className="text-xl font-display font-black text-purple-300">₹25,000 Total Cash</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center justify-between">
                <span>• Best All-Women Developer Team</span>
                <strong className="text-amber-300 font-mono">₹10,000 Cash</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>• Best Freshman / Rookie Debutant Team</span>
                <strong className="text-amber-300 font-mono">₹7,500 Cash</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>• Most Scalable AWS Architecture</span>
                <strong className="text-amber-300 font-mono">₹7,500 Cash</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
