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
      customValue: 'Indoor Auditorium',
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
    <section className="relative z-20 border-y border-white/10 bg-[#090A0D] select-none">
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
                  className="group relative p-4 sm:p-5 lg:p-6 transition-colors duration-150 hover:bg-white/[0.03] flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Segment Telemetry Header */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400 mb-3 gap-1">
                      <span className="flex items-center gap-1 font-semibold group-hover:text-white transition-colors truncate">
                        <span className="text-[10px] text-slate-500 font-normal">[{item.id}]</span>
                        <span className="truncate">{item.tag}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 shrink-0">
                        {item.badge}
                      </span>
                    </div>

                    {/* Visual Asset Emblem - frameless */}
                    <div className="mb-3 relative w-7 h-7">
                      <Image
                        src={item.image}
                        alt={item.tag}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Metric Display with Animated Counter */}
                    <div className="space-y-1 mb-2">
                      <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
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
                      <div className="text-xs font-medium text-slate-300 leading-snug">
                        {item.label}
                      </div>
                    </div>
                  </div>

                  {/* Micro Detail Technical Footnote */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] font-mono text-slate-400 truncate">
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
