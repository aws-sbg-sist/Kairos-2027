'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, ShieldCheck, Trophy, Calendar, MapPin } from 'lucide-react';
import { sound } from '@/lib/audio';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-aws-canvas via-[#0d091a] to-aws-canvas select-none">
      {/* Relativistic Radial Glows & Concentric Astrolabe Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-aws-orange/20 via-purple-900/30 to-aws-blue/20 blur-[180px] pointer-events-none rounded-full" />
      
      {/* Astrolabe Background SVG Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-20">
        <svg viewBox="0 0 700 700" className="w-full h-full text-purple-400 animate-orbit-spin">
          <circle cx="350" cy="350" r="330" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="350" cy="350" r="260" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="12 12" />
          <circle cx="350" cy="350" r="190" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Top Floating Badge */}
        <ScrollReveal direction="down" distance={20}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk/90 border border-purple-500/40 shadow-xl">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>KAIROS 2027 · Sathyabama Institute of Science and Technology</span>
          </div>
        </ScrollReveal>

        {/* Animated 3D/2.5D Cosmic Hourglass Emblem */}
        <ScrollReveal direction="none" delay={0.1}>
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto animate-float-slow">
            <div className="absolute inset-0 rounded-full bg-purple-950/70 blur-2xl" />
            <Image
              src="/assets/kairos-hourglass.png"
              alt="KAIROS Hourglass"
              fill
              className="object-contain filter drop-shadow-[0_12px_35px_rgba(168,85,247,0.4)]"
            />
          </div>
        </ScrollReveal>

        {/* Closing Headline */}
        <div className="space-y-4">
          <ScrollReveal direction="up" distance={24} delay={0.2}>
            <h2 className="text-3xl sm:text-6xl font-display font-black text-white tracking-tight leading-[1.1]">
              The Hourglass Is Turned. <br />
              <span className="gradient-text-kairos">48 Hours to Build What Endures.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.3}>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Join 100 elite student teams in Chennai. No entry fees. Verified distributed architectures. ₹1,75,000 total prize pool waiting on the grand auditorium stage.
            </p>
          </ScrollReveal>
        </div>

        {/* Live Key Metrics Badges */}
        <ScrollReveal direction="up" distance={16} delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-slate-300">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>January 22–24, 2027</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Sathyabama Campus, Chennai</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Free Entry (₹0 Fee)</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>₹1,75,000 Prize Pool</span>
            </span>
          </div>
        </ScrollReveal>

        {/* Magnetic Primary & Secondary CTAs */}
        <ScrollReveal direction="up" distance={20} delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton pullStrength={12}>
              <Link
                href="/register"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="px-8 py-4 rounded-2xl text-base font-bold text-white btn-primary-themed shadow-2xl shadow-purple-900/40 flex items-center gap-2.5 group active:scale-[0.97]"
              >
                <span>Submit Round 0 Project Abstract (Free)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </MagneticButton>

            <MagneticButton pullStrength={8}>
              <Link
                href="/tracks"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="px-6 py-4 rounded-2xl text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-500/40 transition-all backdrop-blur-md"
              >
                <span>Inspect Technical Tracks</span>
              </Link>
            </MagneticButton>

            <MagneticButton pullStrength={8}>
              <a
                href="/docs/KAIROS_2027_Sponsorship_Prospectus.pdf"
                download="KAIROS_2027_Sponsorship_Prospectus.pdf"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="px-5 py-4 rounded-2xl text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Partner Prospectus</span>
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
