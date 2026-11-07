'use client';

import React from 'react';
import Image from 'next/image';
import { JUDGING_CRITERIA } from '@/lib/config';
import { Award, ShieldCheck, Scale, CheckSquare, Eye, Users } from 'lucide-react';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const JudgingSection: React.FC = () => {
  return (
    <section id="judging" className="relative py-24 lg:py-32 overflow-hidden bg-kairos-bg/60">
      {/* Background illumination */}
      <div className="absolute top-1/2 right-10 w-[600px] h-[350px] bg-indigo-950/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-md backdrop-blur-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/judges.png"
                  alt="Jury Evaluation"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Merit-Driven Evaluation • 100-Point Scoring</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              100-Point <span className="gradient-text-kairos">Judging Rubric</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Transparent, uncompromised evaluation criteria designed to reward authentic software craftsmanship, architecture scalability, and user empathy.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Rubric Cards with Spotlight Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {JUDGING_CRITERIA.map((criterion, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              distance={20}
              delay={idx * 0.08}
              className="h-full"
            >
              <SpotlightCard
                enableTilt={true}
                maxTilt={6}
                spotlightColor="rgba(118, 48, 217, 0.2)"
                borderColor="rgba(118, 48, 217, 0.4)"
                className="p-6 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-4 group h-full"
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
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Evaluation Ethics & Checkpoints Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ScrollReveal direction="up" distance={16} delay={0.2} className="h-full">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2 h-full">
              <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                <Scale className="w-4 h-4 text-purple-400" />
                <span>Z-Score Normalization</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Raw scores across judges are mathematically adjusted using statistical Z-scores to completely eliminate individual judge bias or lenient/strict variances.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.3} className="h-full">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2 h-full">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>3 Mandatory Checkpoints</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Table-side progress checks at Hour 10, Hour 24, and Hour 36 ensure all code is authored live in the stadium, verifying organic commits.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.4} className="h-full">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2 h-full">
              <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm">
                <Eye className="w-4 h-4 text-sky-400" />
                <span>Grand Stage Defense</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The Top 20 teams present their live running deployment on the main auditorium stage before enterprise leaders, alumni, and peers.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
