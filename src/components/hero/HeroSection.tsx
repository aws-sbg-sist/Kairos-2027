'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Trophy, Layers, ChevronDown } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';
import { Logo25DAnimation } from './Logo25DAnimation';
import { CosmicBackground } from '@/components/animation/CosmicBackground';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

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
  const [hudSpot, setHudSpot] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const hudRef = useRef<HTMLDivElement>(null);

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

  const handleHudPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !hudRef.current) return;
    const rect = hudRef.current.getBoundingClientRect();
    setHudSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 flex flex-col justify-center overflow-hidden bg-[#09090d]">
      {/* Multi-Depth Ambient Spotlights & Starfield Constellation Canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 left-1/4 w-[620px] h-[420px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(118, 48, 217, 0.42) 0%, rgba(238, 5, 242, 0.14) 48%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-[520px] h-[520px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(238, 5, 242, 0.25) 0%, rgba(56, 189, 248, 0.12) 48%, transparent 72%)',
        }}
      />
      <CosmicBackground particleCount={42} interactive={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Official Co-Branded Institutional & Chapter Lockup */}
            <ScrollReveal direction="down" distance={14} delay={0.05} immediate={true}>
              <div className="shine-hover inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 px-3 py-1.5 rounded-2xl sm:rounded-full bg-white/[0.04] hover:bg-white/[0.07] border border-purple-500/30 hover:border-purple-400/60 text-[11px] sm:text-xs font-mono text-slate-200 backdrop-blur-md transition-colors shadow-lg shadow-purple-950/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-beacon shrink-0" />
                <div className="relative w-6 h-6 rounded-full bg-white p-0.5 shrink-0 overflow-hidden shadow-sm">
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
                <span className="text-purple-200 font-semibold">AWS SBG · Round 0 Live</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={16} delay={0.1} immediate={true}>
              <h1 className="text-3xl sm:text-5xl lg:text-[3.55rem] font-display font-black tracking-tight text-white leading-[1.06]">
                <span className="inline-block hover:text-purple-100 transition-colors duration-200">
                  Architect and Deploy
                </span>{' '}
                <br className="hidden sm:block" />
                <span className="gradient-text-kairos text-glow-kairos inline-block">
                  Live on AWS Cloud.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={14} delay={0.15} immediate={true}>
              <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                48 continuous hours of cloud systems engineering at Sathyabama Indoor Stadium, live architecture reviews, and{' '}
                <span className="text-white font-semibold border-b border-purple-500/40 pb-0.5">₹1,75,000 in cash prizes</span>{' '}
                plus <span className="text-sky-300 font-semibold">$50,000+ in AWS Credits</span>.
              </p>
            </ScrollReveal>

            {/* Hairline Interactive Metadata Strip */}
            <ScrollReveal direction="up" distance={12} delay={0.2} immediate={true}>
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11.5px] font-mono">
                <span className="group inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#0f0f15]/90 border border-white/10 hover:border-purple-400/50 text-white font-medium whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform shrink-0" />
                  Jan 22–24, 2027
                </span>
                <span className="group inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#0f0f15]/90 border border-white/10 hover:border-sky-400/50 text-slate-200 whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                  Indoor Stadium, SIST
                </span>
                <span className="group inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-emerald-950/30 border border-emerald-500/25 hover:border-emerald-400/60 text-emerald-300 font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5">
                  <Users className="w-3.5 h-3.5 group-hover:scale-110 transition-transform shrink-0" />
                  Free R0/R1 · 3–6
                </span>
                <span className="group inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-950/25 border border-amber-500/30 hover:border-amber-400/60 text-amber-300 font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5">
                  <Trophy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform shrink-0" />
                  ₹1,75,000 Pool
                </span>
              </div>
            </ScrollReveal>

            {/* Machined Cyber Countdown HUD with Live Telemetry & Flip Ticks */}
            <ScrollReveal direction="up" distance={14} delay={0.25} immediate={true}>
              <div
                ref={hudRef}
                onPointerMove={handleHudPointerMove}
                onPointerLeave={() => setHudSpot((prev) => ({ ...prev, active: false }))}
                className="p-3.5 sm:p-4 rounded-2xl border border-white/15 hover:border-purple-500/40 max-w-xl mx-auto lg:mx-0 bg-[#0d0d13]/90 relative overflow-hidden backdrop-blur-md shadow-2xl shadow-black/50 transition-colors duration-300 group/hud"
              >
                {/* Mouse-Tracked Radial Spotlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: hudSpot.active ? 1 : 0,
                    background: `radial-gradient(280px circle at ${hudSpot.x}px ${hudSpot.y}px, rgba(238, 5, 242, 0.16), transparent 70%)`,
                  }}
                />
                {/* Machined Corner Ticks */}
                <span aria-hidden="true" className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-purple-400/60" />
                <span aria-hidden="true" className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-sky-400/60" />
                <span aria-hidden="true" className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-sky-400/60" />
                <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-purple-400/60" />

                <div className="relative z-10 flex items-center justify-between mb-2.5 text-[11px] font-mono text-slate-400 gap-2">
                  <div className="flex items-center gap-2 text-left min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-beacon shrink-0" />
                    <span className="font-semibold text-slate-200 truncate">
                      {countdownStatus === 'upcoming' ? (
                        <>
                          <span className="hidden sm:inline">Countdown to 48-Hour Kickoff (IST)</span>
                          <span className="sm:hidden">48H Kickoff Countdown</span>
                        </>
                      ) : countdownStatus === 'live' ? (
                        'Live: 48-Hour Clock Active'
                      ) : (
                        'Competition Concluded'
                      )}
                    </span>
                  </div>
                  <span className="text-slate-400 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 shrink-0">Asia/Kolkata</span>
                </div>

                <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {[
                    { label: 'Days', val: String(timeLeft.days).padStart(2, '0'), highlight: false },
                    { label: 'Hours', val: String(timeLeft.hours).padStart(2, '0'), highlight: false },
                    { label: 'Minutes', val: String(timeLeft.minutes).padStart(2, '0'), highlight: false },
                    { label: 'Seconds', val: String(timeLeft.seconds).padStart(2, '0'), highlight: true },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className={`rounded-xl p-2 sm:p-2.5 border transition-all duration-200 ${
                        unit.highlight
                          ? 'bg-[#140e24] border-purple-500/45 shadow-inner shadow-purple-500/15 hover:border-purple-400/70'
                          : 'bg-[#09090d]/95 border-white/10 hover:border-purple-500/30 hover:bg-[#0e0c18]'
                      }`}
                    >
                      <div className="relative h-7 sm:h-8 flex items-center justify-center overflow-hidden">
                        {unit.highlight ? (
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={unit.val}
                              initial={{ y: -12, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 12, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                              className="font-display font-bold text-xl sm:text-2xl text-purple-300 block tabular-nums"
                            >
                              {unit.val}
                            </motion.span>
                          </AnimatePresence>
                        ) : (
                          <span className="font-display font-bold text-xl sm:text-2xl text-white block tabular-nums">
                            {unit.val}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[11px] font-mono ${
                          unit.highlight ? 'text-purple-300/90 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Primary & Secondary CTAs cleanly above the fold */}
            <ScrollReveal direction="up" distance={14} delay={0.3} immediate={true}>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 w-full">
                <MagneticButton pullStrength={6} className="w-full sm:w-auto">
                  <Link
                    href="/register"
                    data-cursor-label="APPLY"
                    className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white btn-primary-themed shadow-xl shadow-purple-900/40 transition-transform duration-200 flex items-center justify-center gap-2 group active:scale-[0.96] shine-hover"
                  >
                    <span>Submit Round 0 Abstract</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>
                </MagneticButton>

                <MagneticButton pullStrength={5} className="w-full sm:w-auto">
                  <Link
                    href="/tracks"
                    data-cursor-label="EXPLORE"
                    className="w-full sm:w-auto min-h-[48px] px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-purple-500/45 transition-colors flex items-center justify-center gap-2 active:scale-[0.96] shine-hover group"
                  >
                    <Layers className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Explore 15 Challenges</span>
                  </Link>
                </MagneticButton>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                <Link
                  href="/radar"
                  onClick={() => {
                    sound?.playClick();
                    haptics?.light();
                  }}
                  className="inline-flex items-center min-h-[44px] px-1 hover:text-white transition-colors link-underline-sweep"
                >
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
              <div className="mt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-purple-500/25 text-purple-200/90 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-magenta animate-pulse" />
                  <span>Tap or Click Hourglass to Invert · Move / Drag to Tilt</span>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Cue at bottom of Hero */}
        <div className="hidden lg:flex justify-center mt-8">
          <a
            href="#pipeline"
            onClick={() => {
              sound?.playClick();
              haptics?.light();
            }}
            className="inline-flex flex-col items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-purple-300 transition-colors group"
            aria-label="Scroll to competition pipeline"
          >
            <span>EXPLORE PIPELINE</span>
            <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
