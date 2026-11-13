'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Download, ShieldCheck, Play, Trophy, Users, Layers } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';
import { Logo25DAnimation } from './Logo25DAnimation';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';
import { CosmicBackground } from '@/components/animation/CosmicBackground';
import { KineticText } from '@/components/animation/KineticText';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

interface HeroSectionProps {
  onOpenWaitlist?: () => void;
  onOpenProspectus?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist, onOpenProspectus }) => {
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
    <section className="relative min-h-[92vh] pt-24 pb-16 lg:pt-28 lg:pb-24 flex flex-col justify-center overflow-hidden">
      {/* Cosmic Environment Background with Orbital Rings & Star Dust */}
      <CosmicBackground particleCount={50} interactive={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Hero Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Event Category Badge & Watch Logo Reveal Button */}
            <ScrollReveal direction="down" distance={20} delay={0.1}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aws-squidInk/90 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-mono shadow-md backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>AWS Student Builder Group SIST · National Flagship Hackathon</span>
                </div>

                <button
                  onClick={() => {
                    sound?.playClick();
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('kairos:replay-reveal'));
                    }
                  }}
                  aria-label="Watch KAIROS introduction video"
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full bg-gradient-to-r from-aws-orange/20 to-indigo-600/10 hover:from-aws-orange/30 hover:to-indigo-600/20 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 group shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                  title="Watch cinematic introduction video"
                >
                  <Play className="w-3 h-3 text-purple-400 fill-purple-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>Watch KAIROS Teaser (0:30)</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Wordmark Graphic + Kinetic Headline */}
            <div className="space-y-4">
              <ScrollReveal direction="none" delay={0.2}>
                <div className="relative w-full max-w-md sm:max-w-lg mx-auto lg:mx-0 h-14 sm:h-20">
                  <Image
                    src="/assets/kairos-wordmark.png"
                    alt="KAIROS 2027"
                    fill
                    priority
                    className="object-contain object-center lg:object-left filter drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={24} delay={0.25}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.1]">
                  Where Architecture <br />
                  <span className="gradient-text-kairos">Meets Execution.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" distance={20} delay={0.35}>
                <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  48 Hours of Non-Stop Cloud Engineering, Real-Time Architecture Reviews, and Prestigious Cloud Honors & Grants.
                </p>
              </ScrollReveal>
            </div>

            {/* Event Details Chip */}
            <ScrollReveal direction="up" distance={16} delay={0.4}>
              <div className="inline-flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-x-4 sm:gap-y-2 p-3 sm:px-4 sm:py-3 rounded-xl bg-slate-900/90 border border-purple-500/30 text-xs sm:text-sm text-slate-200 font-mono shadow-md backdrop-blur-md">
                <span className="inline-flex items-center gap-1.5 text-white font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>January 22–24, 2027</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-white text-center sm:text-left">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Sathyabama Institute of Science and Technology, Chennai</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span>100 Elite National Teams</span>
                </span>
              </div>
            </ScrollReveal>

            {/* 48-Hour Live Countdown Timer with Double-Bezel Hardware Enclosure HUD */}
            <ScrollReveal direction="up" distance={20} delay={0.45}>
              <div className="double-bezel max-w-xl mx-auto lg:mx-0 group">
                <div className="double-bezel-inner p-4 sm:p-5 relative overflow-hidden">
                  {/* Subtle top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-aws-orange to-transparent opacity-60" />

                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-purple-300">
                    <div className="flex items-center gap-2">
                      <div className="relative w-5 h-5 shrink-0">
                        <Image
                          src="/assets/duration.png"
                          alt="48 Hours Duration"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-semibold tracking-wider uppercase">
                        {countdownStatus === 'upcoming'
                          ? 'Countdown to Clock Start (IST)'
                          : countdownStatus === 'live'
                            ? 'LIVE: 48-Hour Clock Active'
                            : 'Competition Concluded'}
                      </span>
                    </div>
                    <span className="text-slate-400">Chennai · Asia/Kolkata</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                    <div className="bg-slate-950/80 rounded-xl p-2.5 sm:p-3.5 border border-white/10 group-hover:border-purple-500/20 transition-colors">
                      <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-400">Days</span>
                    </div>
                    <div className="bg-slate-950/80 rounded-xl p-2.5 sm:p-3.5 border border-white/10 group-hover:border-purple-500/20 transition-colors">
                      <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-400">Hours</span>
                    </div>
                    <div className="bg-slate-950/80 rounded-xl p-2.5 sm:p-3.5 border border-white/10 group-hover:border-purple-500/20 transition-colors">
                      <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-slate-400">Minutes</span>
                    </div>
                    <div className="bg-slate-950/80 rounded-xl p-2.5 sm:p-3.5 border border-purple-500/40 bg-purple-950/30">
                      <span className="font-display font-extrabold text-2xl sm:text-3xl text-purple-400 block animate-pulse">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-purple-300">Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Primary & Secondary Call-to-Action Buttons */}
            <ScrollReveal direction="up" distance={20} delay={0.5}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <MagneticButton pullStrength={10}>
                  <Link
                    href="/register"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.heavy();
                    }}
                    onMouseEnter={() => {
                      sound?.playHover();
                      haptics?.light();
                    }}
                    className="island-btn px-6 py-3 text-base font-bold text-white btn-primary-themed shadow-xl shadow-purple-900/40 group active:scale-[0.97] shine-hover focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                  >
                    <span>Register Team (100% Free)</span>
                    <span className="island-btn-icon w-8 h-8 rounded-full bg-white/20" aria-hidden="true">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </MagneticButton>

                <MagneticButton pullStrength={8}>
                  <Link
                    href="/tracks"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.medium();
                    }}
                    onMouseEnter={() => {
                      sound?.playHover();
                      haptics?.light();
                    }}
                    className="island-btn px-5 py-3 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-500/40 transition-all backdrop-blur-sm group active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                  >
                    <span className="island-btn-icon w-7 h-7 rounded-full bg-purple-500/20 text-purple-300" aria-hidden="true">
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                    <span>Explore 5 Tracks</span>
                  </Link>
                </MagneticButton>

                <MagneticButton pullStrength={6}>
                  <Link
                    href="/sponsors"
                    onClick={() => {
                      sound?.playClick();
                      haptics?.medium();
                    }}
                    onMouseEnter={() => {
                      sound?.playHover();
                      haptics?.light();
                    }}
                    className="island-btn px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 border border-white/10 hover:border-purple-500/30 transition-all backdrop-blur-sm group active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                  >
                    <span className="island-btn-icon w-6 h-6 rounded-full bg-white/10 text-slate-300" aria-hidden="true">
                      <Download className="w-3 h-3" />
                    </span>
                    <span>Prospectus (PDF)</span>
                  </Link>
                </MagneticButton>
              </div>

              {/* Friction-Elimination Guarantee Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 pt-3 text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> ₹0 Merit-Based Entry
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Free Meals & Accommodation
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> 100% Hacker IP Ownership
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> $100 AWS Cloud Credits/Squad
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 2.5D Holographic Logo & Parallax Astrolabe (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <ScrollReveal direction="left" distance={30} delay={0.3}>
              <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[480px]">
                <Logo25DAnimation />
              </div>

              {/* Status Indicator & Live Telemetry */}
              <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-200 shadow-md backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sathyabama Central Library</span>
                  </span>
                  <span className="text-slate-400">· 48H Non-Stop Arena</span>
                </div>

                {/* Aerospace Telemetry Mini Dock */}
                <div className="grid grid-cols-3 gap-2 w-full max-w-sm pt-1">
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-white/10 text-center font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase">PRIZE POOL</span>
                    <span className="text-xs font-bold text-emerald-400">₹1,75,000</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-white/10 text-center font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase">NATIONAL</span>
                    <span className="text-xs font-bold text-white">100 SQUADS</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-white/10 text-center font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase">FEE</span>
                    <span className="text-xs font-bold text-purple-300">₹0 MERIT</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
