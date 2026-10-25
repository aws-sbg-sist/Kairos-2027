'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Download, ShieldCheck, Play, Eye, EyeOff, CheckCircle2, Trophy, Users } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';
import { Hourglass3D } from './Hourglass3D';
import { HourglassFallback } from './HourglassFallback';
import { sound } from '@/lib/audio';

interface HeroSectionProps {
  onOpenWaitlist?: () => void;
  onOpenProspectus?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist, onOpenProspectus }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownStatus, setCountdownStatus] = useState<'upcoming' | 'live' | 'ended'>('upcoming');
  const [use3D, setUse3D] = useState(true);
  const [showNotificationBar, setShowNotificationBar] = useState(true);

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
    <section className="relative min-h-[95vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-aws-orange/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-aws-blue/15 blur-[130px] pointer-events-none rounded-full" />
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none" />

      {/* Top Banner Notice */}
      {showNotificationBar && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6 relative z-20">
          <div className="glass-panel py-2.5 px-4 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm border border-aws-orange/30 bg-aws-squidInk/80">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse flex-shrink-0" />
              <span className="font-bold text-aws-orange uppercase tracking-wider font-mono text-[11px]">National Applications Open:</span>
              <span className="text-slate-200 hidden md:inline font-medium">
                100% FREE (Zero Entry Fee) • ₹1,75,000 Pure Cash Prize Pool • Top 100 National Teams
              </span>
              <span className="text-slate-200 md:hidden font-medium">
                100% Free · ₹1.75L Cash Pool
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/register"
                className="text-[11px] font-bold text-slate-950 bg-aws-orange px-2.5 py-1 rounded hover:bg-amber-400 transition-colors"
              >
                Register Now →
              </Link>
              <button
                onClick={() => setShowNotificationBar(false)}
                className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded text-xs hover:bg-white/10 transition-colors"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Event Category Badge & Watch Logo Reveal Button */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aws-squidInk border border-aws-orange/30 text-amber-300 text-xs sm:text-sm font-mono shadow-sm">
                <ShieldCheck className="w-4 h-4 text-aws-orange" />
                <span>AWS Student Builder Group SIST · National Flagship Hackathon</span>
              </div>

              <button
                onClick={() => {
                  sound?.playClick();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('kairos:replay-reveal'));
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-aws-orange/20 to-amber-500/10 hover:from-aws-orange/30 hover:to-amber-500/20 border border-aws-orange/40 text-amber-300 text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 group shadow-sm cursor-pointer"
                title="Replay cinematic entrance logo animation"
              >
                <Play className="w-3 h-3 text-aws-orange fill-aws-orange group-hover:scale-110 transition-transform" />
                <span>Watch Logo Reveal</span>
              </button>
            </div>

            {/* Main Wordmark Graphic + Grand Headline */}
            <div className="space-y-4">
              <div className="relative w-full max-w-md sm:max-w-lg mx-auto lg:mx-0 h-14 sm:h-18">
                <Image
                  src="/assets/kairos-wordmark.png"
                  alt="KAIROS 2027"
                  fill
                  priority
                  className="object-contain object-center lg:object-left filter drop-shadow-[0_0_25px_rgba(255,153,0,0.35)]"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.1]">
                Where Architecture <br />
                <span className="gradient-text-kairos">Meets Execution.</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                48 Hours of Non-Stop Cloud Engineering, Real-Time Architecture Reviews, and High-Stakes Cash Bounties.
              </p>
            </div>

            {/* Event Details Chip */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs sm:text-sm text-slate-300 font-mono">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <Calendar className="w-3.5 h-3.5 text-aws-orange" />
                January 22–24, 2027
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Sathyabama Institute of Science and Technology, Chennai
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Users className="w-3.5 h-3.5" />
                100 Elite National Teams
              </span>
            </div>

            {/* 48-Hour Live Countdown Timer */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-aws-orange/25 max-w-xl mx-auto lg:mx-0 bg-aws-squidInk/60">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-amber-300">
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 rounded-md overflow-hidden bg-slate-900 border border-aws-orange/40 flex-shrink-0">
                    <Image
                      src="/assets/duration.png"
                      alt="48 Hours Duration"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <span className="font-semibold tracking-wider uppercase">
                    {countdownStatus === 'upcoming' ? 'Countdown to Clock Start (IST)' : countdownStatus === 'live' ? '⚡ 48-Hour Clock Active!' : 'Competition Concluded'}
                  </span>
                </div>
                <span className="text-slate-400">Chennai · Asia/Kolkata</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-slate-950/80 rounded-xl p-2 sm:p-3 border border-white/10">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Days</span>
                </div>
                <div className="bg-slate-950/80 rounded-xl p-2 sm:p-3 border border-white/10">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Hours</span>
                </div>
                <div className="bg-slate-950/80 rounded-xl p-2 sm:p-3 border border-white/10">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Minutes</span>
                </div>
                <div className="bg-slate-950/80 rounded-xl p-2 sm:p-3 border border-white/10">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-aws-orange block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Seconds</span>
                </div>
              </div>
            </div>

            {/* Primary & Secondary Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/register"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="px-6 py-3.5 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-aws-orange via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-aws-orange shadow-lg shadow-aws-orange/30 transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>&gt; Submit Round 0 Project Abstract (Free)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/sponsors"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-aws-orange/40 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-aws-orange" />
                <span>View Sponsorship Prospectus (PDF)</span>
              </Link>

              <Link
                href="/refer-sponsor"
                onClick={() => sound?.playClick()}
                onMouseEnter={() => sound?.playHover()}
                className="px-4 py-3.5 rounded-xl text-xs font-semibold text-emerald-400 hover:text-white bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex items-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Earn 10%–15% Referral Cash</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D / SVG Hourglass Motif (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Visual Viewport Container */}
            <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[480px]">
              {use3D ? (
                <Hourglass3D onFallback={() => setUse3D(false)} />
              ) : (
                <HourglassFallback />
              )}
            </div>

            {/* Toggle 3D / Vector Control */}
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <button
                onClick={() => setUse3D(!use3D)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-slate-700 text-slate-300 transition-colors"
                title="Toggle between interactive Three.js 3D and lightweight vector fallback"
              >
                {use3D ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-aws-orange" />
                    <span>3D Canvas Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>Vector Mode Active</span>
                  </>
                )}
              </button>
              <span className="hidden sm:inline text-slate-400">· Interactive AWS SBGL Motif</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
