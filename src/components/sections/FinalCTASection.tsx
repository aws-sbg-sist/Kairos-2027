'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, ShieldCheck, Trophy } from 'lucide-react';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { KineticText } from '@/components/animation/KineticText';
import { Hourglass3DModel } from '@/components/animation/Hourglass3DModel';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#07070b] select-none border-t border-white/10">
      {/* Radial Championship Stage Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(238, 5, 242, 0.25) 0%, rgba(118, 48, 217, 0.14) 45%, transparent 72%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <ScrollReveal direction="none" delay={0.05}>
          <div className="relative flex items-center justify-center scale-90 sm:scale-100 transition-transform">
            <Hourglass3DModel />
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-[1.1]">
            <KineticText
              as="span"
              text="The Hourglass Is Turned."
              className="block justify-center"
            />
            <span className="gradient-text-kairos text-glow-kairos block mt-1">
              48 Hours to Build What Endures.
            </span>
          </h2>

          <ScrollReveal direction="up" distance={14} delay={0.12}>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Form your squad of 3 to 6 builders, choose from 15 official problem statements, and apply free for Round 0 &amp; Round 1 in Chennai.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-slate-300">
          <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 hover:border-purple-400/50 transition-all hover:-translate-y-0.5 flex items-center gap-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Jan 22–24, 2027</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 hover:border-sky-400/50 transition-all hover:-translate-y-0.5 flex items-center gap-1.5 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Sathyabama Campus, Chennai</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 hover:border-purple-400/70 text-purple-300 font-bold flex items-center gap-1.5 shadow-sm transition-all hover:-translate-y-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Student IP</span>
          </span>
          <span className="px-3 py-1.5 rounded-full bg-amber-950/35 border border-amber-500/40 hover:border-amber-400/70 text-amber-300 font-bold flex items-center gap-1.5 shadow-sm transition-all hover:-translate-y-0.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>₹1,75,000 Pool</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <MagneticButton pullStrength={8}>
            <Link
              href="/register"
              data-cursor-label="APPLY"
              onClick={() => {
                sound?.playClick();
                haptics?.heavy();
              }}
              className="min-h-[48px] px-8 py-3.5 rounded-2xl text-sm sm:text-base font-bold text-white btn-primary-themed shadow-2xl shadow-purple-900/45 flex items-center gap-2 group active:scale-[0.96] shine-hover"
            >
              <span>Submit Round 0 Abstract</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </MagneticButton>

          <Link
            href="/schedule"
            data-cursor-label="SCHEDULE"
            onClick={() => {
              sound?.playClick();
              haptics?.light();
            }}
            className="min-h-[48px] px-5 py-3.5 rounded-2xl text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-500/45 transition-colors backdrop-blur-md active:scale-[0.96] flex items-center justify-center shine-hover"
          >
            48-Hour Schedule
          </Link>

          <Link
            href="/members/leadership"
            data-cursor-label="CADRE"
            onClick={() => {
              sound?.playClick();
              haptics?.light();
            }}
            className="min-h-[48px] px-5 py-3.5 rounded-2xl text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/45 transition-colors backdrop-blur-md active:scale-[0.96] flex items-center justify-center shine-hover"
          >
            Organizing Leadership
          </Link>
        </div>
      </div>
    </section>
  );
};
