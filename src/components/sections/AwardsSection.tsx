'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRIZE_POOL_CARDS } from '@/lib/config';
import { CheckCircle2, ArrowRight, Trophy } from 'lucide-react';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { KineticText } from '@/components/animation/KineticText';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { AnimatedCounter } from '@/components/animation/AnimatedCounter';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

interface AwardsSectionProps {
  prizePoolConfirmed?: boolean;
}

export const AwardsSection: React.FC<AwardsSectionProps> = () => {
  return (
    <section id="awards" className="relative py-16 lg:py-24 overflow-hidden bg-[#09090d] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" distance={16}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2.5 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300/90 block">
                ₹1,75,000 Cash Pool + $50,000+ AWS Cloud Credits
              </span>
              <KineticText
                text="Awards, Honors & Incentives"
                highlightWords={['Incentives']}
                highlightClassName="text-amber-300"
                className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight"
              />
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Direct awards to winning student builders, monolithic Kairos trophies, smart NFC arena credentials, and VC Demo Day fast-tracking.
              </p>
            </div>

            <Link
              href="/register"
              data-cursor-label="COMPETE"
              onClick={() => {
                sound?.playClick();
                haptics?.medium();
              }}
              className="min-h-[44px] text-xs font-mono font-semibold text-white hover:text-amber-200 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-amber-500/10 border border-white/15 hover:border-amber-400/50 transition-colors self-start md:self-auto shrink-0 active:scale-[0.96] shine-hover group"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Compete for Podium</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Studio Product Visual (5 cols) + Hairline Podium Breakdown (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Physical Trophy & NFC Credential Studio Photograph */}
          <ScrollReveal direction="left" distance={20} className="lg:col-span-5">
            <SpotlightCard
              enableTilt={true}
              maxTilt={5}
              spotlightColor="rgba(245, 158, 11, 0.22)"
              borderColor="rgba(251, 191, 36, 0.45)"
              cursorLabel="TROPHY"
              className="border border-white/15 bg-black group"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src="/assets/visuals/trophy-pass.jpg"
                  alt="Monolithic KAIROS Championship Trophy and Smart NFC Builder Credential"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              </div>
              <div className="p-5 bg-[#0d0d13] border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="font-display font-bold text-base sm:text-lg text-amber-300 block tabular-nums">
                    <AnimatedCounter value={175000} prefix="₹" duration={1.4} />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Cash Pool</span>
                </div>
                <div className="border-x border-white/10">
                  <span className="font-display font-bold text-base sm:text-lg text-white block tabular-nums">
                    <AnimatedCounter value={50} prefix="$" suffix="K+" duration={1.6} />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">AWS Credits</span>
                </div>
                <div>
                  <span className="font-display font-bold text-base sm:text-lg text-emerald-400 block tabular-nums">
                    <AnimatedCounter value={20} prefix="Top " duration={1.8} />
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Stage Pitch</span>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Right: Hairline Podium & Grants Rows */}
          <ScrollReveal direction="right" distance={20} delay={0.08} className="lg:col-span-7 space-y-6">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {PRIZE_POOL_CARDS.slice(0, 3).map((item, idx) => {
                const isFirst = idx === 0;
                return (
                  <div
                    key={item.position}
                    className={`py-5 px-4 rounded-xl transition-all duration-300 group/podium ${
                      isFirst
                        ? 'bg-gradient-to-r from-amber-500/[0.09] via-amber-500/[0.04] to-transparent border border-amber-400/35 hover:border-amber-300/60 shadow-lg shadow-amber-950/30 my-1.5 cyber-edge-card'
                        : 'hover:bg-white/[0.03] border border-transparent hover:border-white/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-transform duration-200 group-hover/podium:scale-110 ${
                            isFirst
                              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/35'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-lg text-white">
                          {item.position}
                        </h3>
                      </div>
                      <span
                        className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                          isFirst
                            ? 'border-amber-400/50 bg-amber-400/15 text-amber-300 shadow-sm shadow-amber-400/20'
                            : 'border-white/15 bg-white/5 text-slate-300'
                        }`}
                      >
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

            {/* Compact Additional Honors Row with Cyber Edge Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 hover:bg-[#12101c] cyber-edge-card space-y-1 group">
                <span className="font-mono text-purple-300 font-bold block group-hover:text-purple-200 transition-colors">Startup Fast-Track</span>
                <p className="text-slate-400 leading-relaxed">
                  VC &amp; angel Demo Day introductions for finalist prototypes ready to spin out.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 hover:bg-[#0c1613] cyber-edge-card space-y-1 group">
                <span className="font-mono text-emerald-400 font-bold block group-hover:text-emerald-300 transition-colors">Diversity &amp; Architecture</span>
                <p className="text-slate-400 leading-relaxed">
                  Special honors for Best All-Women Squad &amp; Most Scalable Serverless Design.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#0d0d13] border border-white/10 hover:bg-[#0c131a] cyber-edge-card space-y-1 group">
                <span className="font-mono text-sky-400 font-bold block group-hover:text-sky-300 transition-colors">All 100 Finalist Squads</span>
                <p className="text-slate-400 leading-relaxed">
                  $500–$5,000 in AWS Cloud Promotional Credits distributed to run Bedrock &amp; clusters.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
