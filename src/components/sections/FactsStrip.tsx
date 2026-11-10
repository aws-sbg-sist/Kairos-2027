'use client';

import React from 'react';
import Image from 'next/image';
import { sound } from '@/lib/audio';
import { AnimatedCounter } from '@/components/animation/AnimatedCounter';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const FactsStrip: React.FC = () => {
  const facts = [
    {
      id: '01',
      tag: 'DURATION',
      image: '/assets/duration.png',
      imageGlow: 'rgba(238,5,242,0.35)',
      numericValue: 48,
      suffix: ' Hours',
      label: 'Continuous Offline Hackathon',
      detail: '22 Jan 09:30 AM – 24 Jan 05:00 PM IST',
      badge: 'Live Hack Clock',
    },
    {
      id: '02',
      tag: 'CAPACITY',
      image: '/assets/teams.png',
      imageGlow: 'rgba(118,48,217,0.35)',
      numericValue: 100,
      suffix: ' Teams',
      label: '4 to 6 Builders Per Team',
      detail: '400–600 Shortlisted National Hackers',
      badge: 'National Cohort',
    },
    {
      id: '03',
      tag: 'ADMISSION',
      image: '/assets/register.png',
      imageGlow: 'rgba(5,17,242,0.35)',
      numericValue: 0,
      prefix: '₹',
      suffix: ' Entry Fee',
      label: '100% Free for Shortlisted Teams',
      detail: 'Meals, Stay, Swag & AWS Credits Free',
      badge: 'Zero Hidden Fees',
    },
    {
      id: '04',
      tag: 'BOUNTIES',
      image: '/assets/prizes.png',
      imageGlow: 'rgba(238,5,242,0.4)',
      numericValue: 175000,
      prefix: '₹',
      suffix: '',
      label: 'National Cash Prize Pool',
      detail: 'Comprehensive Hackathon Prize Pool & Grants',
      badge: 'Total Pool',
    },
    {
      id: '05',
      tag: 'LOCATION',
      image: '/assets/venue.png',
      imageGlow: 'rgba(56,189,248,0.35)',
      customValue: 'Central Library',
      label: 'Sathyabama University, Chennai',
      detail: '1Gbps Wi-Fi Mesh & Power Drops',
      badge: 'OMR Campus',
    },
    {
      id: '06',
      tag: 'SELECTION',
      image: '/assets/challenges.png',
      imageGlow: 'rgba(118,48,217,0.35)',
      customValue: 'Dual-Phase',
      label: 'Round 1 Qualifier → Round 2 Finale',
      detail: 'Top 250 Online → Top 100 On-Campus',
      badge: 'Two-Tier Filter',
    },
  ];

  return (
    <section className="relative z-20 border-y border-white/10 bg-[#0a0a0f]/95 backdrop-blur-2xl overflow-hidden select-none">
      {/* Top Ambient Neon Guide Hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aws-orange/40 to-transparent pointer-events-none" />

      {/* Background Subtle Tech Grid Motif */}
      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Monolithic Architectural Telemetry Console */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/5 border-x border-white/5">
          {facts.map((item, idx) => {
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                distance={15}
                delay={idx * 0.06}
                className="h-full"
              >
                <div
                  onMouseEnter={() => sound?.playHover()}
                  className="group relative p-4 sm:p-5 lg:p-6 transition-all duration-200 ease-entrance hover:bg-white/[0.035] flex flex-col justify-between h-full overflow-hidden"
                >
                  {/* Top Glowing Beam on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-aws-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Subtle Ambient Bloom on Hover */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-purple-950/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Segment Telemetry Header */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5 font-bold tracking-wider group-hover:text-purple-400 transition-colors">
                        <span className="text-[11px] text-slate-400 font-normal">[{item.id}]</span>
                        <span>{item.tag}</span>
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">
                        {item.badge}
                      </span>
                    </div>

                    {/* Visual Asset Emblem with Animated Scale */}
                    <div className="mb-4 relative w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={item.image}
                        alt={item.tag}
                        fill
                        className="object-contain filter drop-shadow-[0_4px_12px_rgba(238,5,242,0.3)]"
                      />
                    </div>

                    {/* Metric Display with Animated Counter */}
                    <div className="space-y-1">
                      <div className="text-xl sm:text-2xl font-display font-black text-white tracking-tight group-hover:text-purple-200 transition-colors">
                        {item.numericValue !== undefined ? (
                          <AnimatedCounter
                            value={item.numericValue}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            duration={1.5 + idx * 0.15}
                          />
                        ) : (
                          <span>{item.customValue}</span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-slate-300 leading-snug">
                        {item.label}
                      </div>
                    </div>
                  </div>

                  {/* Micro Detail Technical Footnote */}
                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400 leading-snug line-clamp-2">
                    {item.detail}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
