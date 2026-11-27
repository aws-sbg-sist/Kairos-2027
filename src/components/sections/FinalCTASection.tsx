'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, ShieldCheck, Trophy } from 'lucide-react';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { Hourglass3DModel } from '@/components/animation/Hourglass3DModel';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#07070b] select-none border-t border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] bg-gradient-to-r from-aws-orange/15 via-purple-900/25 to-aws-blue/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <ScrollReveal direction="none" delay={0.05}>
          <div className="relative flex items-center justify-center scale-90">
            <Hourglass3DModel />
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          <ScrollReveal direction="up" distance={16} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-[1.1]">
              The Hourglass Is Turned. <br />
              <span className="gradient-text-kairos">48 Hours to Build What Endures.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={14} delay={0.15}>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Form your squad of 3 to 6 builders, choose from 15 official problem statements, and apply free for Round 0 &amp; Round 1 in Chennai.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-white/10 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Jan 22–24, 2027</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-white/10 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Sathyabama Campus, Chennai</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Student IP</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>₹1,75,000 Pool</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <MagneticButton pullStrength={10}>
            <Link
              href="/register"
              className="px-7 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white btn-primary-themed shadow-2xl shadow-purple-900/40 flex items-center gap-2 group active:scale-[0.97]"
            >
              <span>Submit Round 0 Abstract</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>

          <Link
            href="/schedule"
            className="px-5 py-3.5 rounded-2xl text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-500/40 transition-colors backdrop-blur-md"
          >
            48-Hour Schedule
          </Link>

          <Link
            href="/members/leadership"
            className="px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-colors backdrop-blur-md"
          >
            Organizing Leadership
          </Link>
        </div>
      </div>
    </section>
  );
};
