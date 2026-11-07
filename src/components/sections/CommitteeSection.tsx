'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HIGHER_MANAGEMENT } from '@/lib/config';
import { Users, GraduationCap, ShieldCheck, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const CommitteeSection: React.FC = () => {
  const apex = HIGHER_MANAGEMENT.apexLeader;
  const faculty = HIGHER_MANAGEMENT.facultyCoordinators;
  const superHeads = HIGHER_MANAGEMENT.superHeads;

  return (
    <section id="committee" className="relative py-24 lg:py-32 overflow-hidden bg-aws-canvas">
      {/* Background illumination */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-aws-orange/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk/90 border border-aws-orange/30 shadow-md backdrop-blur-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/mentors.png"
                  alt="Mentors & Leadership"
                  fill
                  className="object-contain"
                />
              </div>
              <span>AWS SBGL Governance • Batch of 2026–2027</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Higher Management & <span className="gradient-text-kairos">Leadership</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Governed by the AWS Student Builder Group (SIST Chapter) under the Department of Computer Science & Engineering, School of Computing.
            </p>
          </ScrollReveal>
        </div>

        {/* Apex President Showcase */}
        <ScrollReveal direction="up" distance={24} delay={0.15}>
          <SpotlightCard
            enableTilt={true}
            maxTilt={5}
            spotlightColor="rgba(238, 5, 242, 0.25)"
            borderColor="rgba(238, 5, 242, 0.5)"
            className="max-w-4xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-aws-squidInk to-slate-950 border-2 border-aws-orange/40 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-aws-orange/20 border-2 border-aws-orange text-aws-orange flex items-center justify-center font-display font-black text-3xl shadow-lg shrink-0">
                TT
              </div>
              <div className="space-y-2 text-center md:text-left flex-grow">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-aws-orange text-slate-950">
                    APEX LEADER
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    Reg No: {apex.registerNo}
                  </span>
                  <span className="text-xs font-mono text-amber-300">
                    AWS Solutions Architect – Associate
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                  {apex.name}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300 font-semibold font-mono">
                  {apex.role} · {apex.chapter}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 italic pt-1">
                  &ldquo;{apex.quote}&rdquo;
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href="/members/thenappan-t"
                  onClick={() => sound?.playClick()}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/15 flex items-center gap-1.5 transition-colors"
                >
                  <span>View Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* Faculty Coordinators (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
          {faculty.map((fc, idx) => (
            <ScrollReveal
              key={fc.name}
              direction="up"
              distance={20}
              delay={0.2 + idx * 0.1}
              className="h-full"
            >
              <div className="p-6 rounded-2xl bg-aws-card/80 border border-slate-700/60 hover:border-purple-500/40 transition-all flex items-start gap-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider block">
                    Faculty Coordinator
                  </span>
                  <h4 className="text-lg font-display font-bold text-white">
                    {fc.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {fc.role} · {fc.department}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Leadership Directory CTA */}
        <ScrollReveal direction="up" distance={16} delay={0.3}>
          <div className="text-center pt-4">
            <Link
              href="/members/leadership"
              onClick={() => sound?.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-aws-card hover:bg-slate-900 border border-purple-500/30 text-purple-200 hover:text-white transition-all shadow-md group"
            >
              <span>Explore Complete 106-Member Student Cadre & Super Heads Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
