'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Users, Trophy, Layers } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';
import { Logo25DAnimation } from './Logo25DAnimation';
import { CosmicBackground } from '@/components/animation/CosmicBackground';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface HeroSectionProps {
  onOpenWaitlist?: () => void;
  onOpenProspectus?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownStatus, setCountdownStatus] = useState<'upcoming' | 'live' | 'ended'>('upcoming');

  useEffect(() => {
    const targetDate = new Date(EVENT_CONFIG.dates.startDate).getTime();
    const endDate = new Date(EVENT_CONFIG.dates.codeFreezeDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();

      if (now < targetDate) {
        setCountdownStatus('upcoming');
        const diff = targetDate - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else if (now >= targetDate && now <= endDate) {
        setCountdownStatus('live');
        const diff = endDate - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setCountdownStatus('ended');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-28 pb-14 sm:pb-16 lg:pb-20 flex flex-col justify-center overflow-hidden bg-[#09090d]">
      <CosmicBackground particleCount={35} interactive={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Official Co-Branded Institutional & Chapter Lockup */}
            <ScrollReveal direction="down" distance={14} delay={0.05} immediate={true}>
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 backdrop-blur-md">
                <div className="relative w-6 h-6 rounded-full bg-white p-0.5 shrink-0 overflow-hidden">
                  <Image
                    src="/assets/sist-logo.png"
                    alt="Sathyabama Institute of Science and Technology"
                    fill
                    sizes="24px"
                    className="object-contain p-0.5"
                    priority
                  />
                </div>
                <span className="text-white font-semibold">Sathyabama IST</span>
                <span className="text-slate-500">×</span>
                <div className="relative w-5 h-5 rounded overflow-hidden shrink-0">
                  <Image
                    src="/assets/aws-sbg-logo.png"
                    alt="AWS Student Builder Group"
                    fill
                    sizes="20px"
                    className="object-cover"
                    priority
                  />
                </div>
                <span className="text-slate-300">AWS SBG · Round 0 Live</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={16} delay={0.1} immediate={true}>
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-display font-black tracking-tight text-white leading-[1.07]">
                Architect and Deploy <br />
                <span className="gradient-text-kairos">Live on AWS Cloud.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={14} delay={0.15} immediate={true}>
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                48 continuous hours of cloud systems engineering at Sathyabama Indoor Stadium, live architecture reviews, and ₹1,75,000 in cash prizes plus $50,000+ in AWS Credits.
              </p>
            </ScrollReveal>

            {/* Hairline Metadata Strip */}
            <ScrollReveal direction="up" distance={12} delay={0.2} immediate={true}>
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 py-2 px-3.5 rounded-xl bg-[#0f0f15]/90 border border-white/10 text-[11.5px] text-slate-200 font-mono">
                <span className="flex items-center gap-1.5 text-white font-medium whitespace-nowrap">
                  <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  Jan 22–24, 2027
                </span>
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5 text-slate-200 whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  Indoor Stadium, SIST
                </span>
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold whitespace-nowrap">
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  Free R0/R1 · 3–6
                </span>
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5 text-amber-300 font-semibold whitespace-nowrap">
                  <Trophy className="w-3.5 h-3.5 shrink-0" />
                  ₹1,75,000 Pool
                </span>
              </div>
            </ScrollReveal>

            {/* Minimalist Monochrome Countdown HUD */}
            <ScrollReveal direction="up" distance={14} delay={0.25} immediate={true}>
              <div className="p-3.5 sm:p-4 rounded-2xl border border-white/10 max-w-xl mx-auto lg:mx-0 bg-[#0d0d13]/90 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2.5 text-[11px] font-mono text-slate-400">
                  <span className="font-semibold text-slate-200">
                    {countdownStatus === 'upcoming'
                      ? 'Countdown to 48-Hour Kickoff (IST)'
                      : countdownStatus === 'live'
                        ? 'Live: 48-Hour Clock Active'
                        : 'Competition Concluded'}
                  </span>
                  <span>Asia/Kolkata</span>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  <div className="bg-[#09090d] rounded-xl p-2 sm:p-2.5 border border-white/10">
                    <span className="font-display font-bold text-xl sm:text-2xl text-white block">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Days</span>
                  </div>
                  <div className="bg-[#09090d] rounded-xl p-2 sm:p-2.5 border border-white/10">
                    <span className="font-display font-bold text-xl sm:text-2xl text-white block">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Hours</span>
                  </div>
                  <div className="bg-[#09090d] rounded-xl p-2 sm:p-2.5 border border-white/10">
                    <span className="font-display font-bold text-xl sm:text-2xl text-white block">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Minutes</span>
                  </div>
                  <div className="bg-[#12101c] rounded-xl p-2 sm:p-2.5 border border-purple-500/35">
                    <span className="font-display font-bold text-xl sm:text-2xl text-purple-300 block animate-pulse">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-mono text-purple-300/80">Seconds</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Primary & Secondary CTAs cleanly above the fold */}
            <ScrollReveal direction="up" distance={14} delay={0.3} immediate={true}>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 w-full">
                <MagneticButton pullStrength={6} className="w-full sm:w-auto">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white btn-primary-themed shadow-xl shadow-purple-900/30 transition-colors duration-200 flex items-center justify-center gap-2 group active:scale-[0.97]"
                  >
                    <span>Submit Round 0 Abstract</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>

                <MagneticButton pullStrength={5} className="w-full sm:w-auto">
                  <Link
                    href="/tracks"
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span>Explore 15 Challenges</span>
                  </Link>
                </MagneticButton>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                <Link href="/radar" className="inline-flex items-center min-h-[44px] px-1 hover:text-white underline decoration-white/20 underline-offset-4 transition-colors">
                  Solo or 2 builders? Find teammates on Builder Radar →
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive 2.5D Centerpiece (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <ScrollReveal direction="left" distance={24} delay={0.2} immediate={true}>
              <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[390px] lg:max-w-[420px]">
                <Logo25DAnimation />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
