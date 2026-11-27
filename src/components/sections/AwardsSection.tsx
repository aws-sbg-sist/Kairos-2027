'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRIZE_POOL_CARDS } from '@/lib/config';
import { CheckCircle2, ArrowRight, Trophy } from 'lucide-react';

interface AwardsSectionProps {
  prizePoolConfirmed?: boolean;
}

export const AwardsSection: React.FC<AwardsSectionProps> = () => {
  return (
    <section id="awards" className="relative py-16 lg:py-24 overflow-hidden bg-[#09090d] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300/90 block">
              ₹1,75,000 Cash Pool + $50,000+ AWS Cloud Credits
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Awards, Honors &amp; <span className="text-amber-300">Incentives</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Direct awards to winning student builders, monolithic Kairos trophies, smart NFC arena credentials, and VC Demo Day fast-tracking.
            </p>
          </div>

          <Link
            href="/register"
            className="min-h-[44px] text-xs font-mono font-semibold text-white hover:text-amber-200 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/15 hover:border-amber-400/40 transition-colors self-start md:self-auto shrink-0"
          >
            <span>Compete for Podium</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Studio Product Visual (5 cols) + Hairline Podium Breakdown (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Physical Trophy & NFC Credential Studio Photograph */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black group">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/assets/visuals/trophy-pass.jpg"
                  alt="Monolithic KAIROS Championship Trophy and Smart NFC Builder Credential"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5 bg-[#0d0d13] border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="font-display font-bold text-base sm:text-lg text-amber-300 block">₹1.75L</span>
                  <span className="text-[11px] font-mono text-slate-400">Cash Pool</span>
                </div>
                <div className="border-x border-white/10">
                  <span className="font-display font-bold text-base sm:text-lg text-white block">$50K+</span>
                  <span className="text-[11px] font-mono text-slate-400">AWS Credits</span>
                </div>
                <div>
                  <span className="font-display font-bold text-base sm:text-lg text-emerald-400 block">Top 20</span>
                  <span className="text-[11px] font-mono text-slate-400">Stage Pitch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Hairline Podium & Grants Rows */}
          <div className="lg:col-span-7 space-y-6">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {PRIZE_POOL_CARDS.slice(0, 3).map((item, idx) => {
                const isFirst = idx === 0;
                return (
                  <div
                    key={item.position}
                    className={`py-5 px-3 transition-colors ${isFirst ? 'bg-amber-500/[0.04]' : ''}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                            isFirst
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-lg text-white">
                          {item.position}
                        </h3>
                      </div>
                      <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                        isFirst
                          ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                          : 'border-white/15 bg-white/5 text-slate-300'
                      }`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.perks.map((perk) => (
                        <div key={perk} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isFirst ? 'text-amber-400' : 'text-emerald-400'}`} />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compact Additional Honors Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 space-y-1">
                <span className="font-mono text-purple-300 font-bold block">Startup Fast-Track</span>
                <p className="text-slate-400 leading-relaxed">
                  VC &amp; angel Demo Day introductions for finalist prototypes ready to spin out.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block">Diversity &amp; Architecture</span>
                <p className="text-slate-400 leading-relaxed">
                  Special honors for Best All-Women Squad &amp; Most Scalable Serverless Design.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 space-y-1">
                <span className="font-mono text-sky-400 font-bold block">All 100 Finalist Squads</span>
                <p className="text-slate-400 leading-relaxed">
                  $500–$5,000 in AWS Cloud Promotional Credits distributed to run Bedrock &amp; clusters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
