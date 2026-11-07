'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRIZE_POOL_CARDS } from '@/lib/config';
import { Trophy, Award, Shield, CheckCircle2, ArrowRight, Gift, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface AwardsSectionProps {
  prizePoolConfirmed?: boolean;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ prizePoolConfirmed = true }) => {
  return (
    <section id="awards" className="relative py-24 lg:py-32 overflow-hidden bg-aws-canvas">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-purple-950/40 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-purple-950/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk/90 border border-purple-500/30 shadow-md backdrop-blur-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/prizes.png"
                  alt="Prizes Badge"
                  fill
                  className="object-contain"
                />
              </div>
              <span>₹1,75,000 Total Prize Pool</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Awards, Honors & <span className="gradient-text-kairos">Recognition</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Total prize pool awarded directly to winning student teams, alongside VC pitch fast-tracking and $50,000+ in AWS Cloud Promotional Credits.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.25}>
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 max-w-2xl mx-auto flex items-center justify-center gap-2.5 text-xs sm:text-sm text-emerald-300 font-medium shadow-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Zero Entry Fee:</strong> 100% Free Participation • ₹1,75,000 Total Prize Pool • Fast-Track Incubation & Credits
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Podium 3 Cards (Champion, 1st Runner Up, 2nd Runner Up) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 items-stretch">
          {PRIZE_POOL_CARDS.slice(0, 3).map((item, idx) => {
            const isGrand = idx === 0;

            return (
              <ScrollReveal
                key={item.position}
                direction="up"
                distance={24}
                delay={idx * 0.1}
                className="h-full"
              >
                <SpotlightCard
                  enableTilt={true}
                  maxTilt={7}
                  spotlightColor={isGrand ? 'rgba(238, 5, 242, 0.3)' : 'rgba(118, 48, 217, 0.2)'}
                  borderColor={isGrand ? 'rgba(238, 5, 242, 0.7)' : 'rgba(118, 48, 217, 0.35)'}
                  className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all relative overflow-hidden h-full ${
                    isGrand
                      ? 'bg-gradient-to-b from-aws-squidInk via-slate-950 to-slate-950 border-2 border-purple-500 shadow-2xl shadow-purple-900/30 lg:-translate-y-3'
                      : 'bg-aws-card/85 border border-slate-700/60 hover:border-purple-500/40'
                  }`}
                >
                  {isGrand && (
                    <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-slate-950 font-mono font-black text-xs rounded-bl-2xl uppercase tracking-wider shadow-md">
                      Apex Champion
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                          isGrand
                            ? 'bg-purple-950/60 text-purple-400 border border-purple-500/40 p-2 shadow-lg shadow-purple-900/30'
                            : 'bg-white/5 text-slate-300 border border-white/10'
                        }`}
                      >
                        {isGrand ? (
                          <Image
                            src="/assets/achievement.png"
                            alt="Apex Achievement"
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <Trophy className="w-7 h-7 text-purple-300" />
                        )}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-purple-300 font-semibold block uppercase">
                          {item.badge}
                        </span>
                        <h3 className="text-xl font-display font-bold text-white">
                          {item.position.split('—')[0]}
                        </h3>
                      </div>
                    </div>

                    

                    {/* Perks & Benefits Checklist */}
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 pt-1">
                      {item.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isGrand ? 'text-purple-400' : 'text-emerald-400'
                            }`}
                          />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Tag */}
                  <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Rank 0{idx + 1}</span>
                    <span className="text-emerald-400 font-semibold">Official Award Conferral</span>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Extended Honors & Opportunities Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: VC Incubation & Angel Pitching */}
          <ScrollReveal direction="up" distance={20} delay={0.2} className="h-full">
            <div className="p-6 rounded-2xl bg-aws-card/75 border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-300 font-bold uppercase">
                    Startup Accelerator
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                    Top Teams
                  </span>
                </div>
                <h4 className="text-lg font-display font-bold text-white">
                  VC Incubation & Angel Pitching
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Direct fast-track pitching sessions with angel networks, venture capitalists, and institutional accelerators to transition hackathon prototypes into production startups.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-white/5 font-mono text-xs text-purple-300 font-bold">
                Demo Day Fast-Track
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Special Innovation & Diversity Honors */}
          <ScrollReveal direction="up" distance={20} delay={0.3} className="h-full">
            <div className="p-6 rounded-2xl bg-aws-card/75 border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-300 font-bold uppercase">
                    Special Category Honors
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                    Excellence
                  </span>
                </div>
                <h4 className="text-lg font-display font-bold text-white">
                  Special Innovation & Diversity
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Dedicated citations for Best All-Women Engineering Team, Most Scalable Serverless Architecture, and Audience Favorite Project.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-white/5 font-mono text-xs text-purple-300 font-bold">
                Special Category Mementos
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: AWS Promotional Cloud Credits */}
          <ScrollReveal direction="up" distance={20} delay={0.4} className="h-full">
            <div className="p-6 rounded-2xl bg-aws-card/75 border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-sky-400 font-bold uppercase">
                    Cloud Infrastructure
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                    All Finalists
                  </span>
                </div>
                <h4 className="text-lg font-display font-bold text-white">
                  $50,000+ AWS Cloud Credits
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  All 100 on-campus finalist teams receive direct AWS Cloud Promotional credits to operate large language models, clusters, and databases.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-white/5 font-mono text-xs text-sky-400 font-bold">
                $500 to $5,000 Per Team
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
