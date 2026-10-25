'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Calendar, MapPin, Download, ShieldCheck, Play, Eye, EyeOff } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';
import { Hourglass3D } from './Hourglass3D';
import { HourglassFallback } from './HourglassFallback';

interface HeroSectionProps {
  onOpenWaitlist: () => void;
  onOpenProspectus: () => void;
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
  const [showCinematicIntro, setShowCinematicIntro] = useState(true);

  useEffect(() => {
    const targetDate = new Date(EVENT_CONFIG.dates.startDate).getTime();
    const endDate = new Date(EVENT_CONFIG.dates.endDate).getTime();

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
    <section className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-900/18 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-sky-900/15 blur-[120px] pointer-events-none rounded-full" />
      
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none" />

      {/* Skippable Cinematic Intro Announcement */}
      {showCinematicIntro && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6 relative z-20">
          <div className="glass-panel py-2 px-4 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-200">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white">Official Announcement:</span>
              <span className="text-slate-300 hidden md:inline">
                KAIROS 2027 is an approved National Technical Hackathon by AWS SBG (SIST Chapter). Early-Interest Waitlist is open!
              </span>
              <span className="text-slate-300 md:hidden">
                Waitlist is live for 22–24 Jan 2027!
              </span>
            </div>
            <button
              onClick={() => setShowCinematicIntro(false)}
              className="text-slate-400 hover:text-white px-2 py-0.5 rounded text-xs hover:bg-white/10 transition-colors"
              title="Dismiss announcement banner"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Event Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-mono shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>National Technical Hackathon · 48 Hours Offline</span>
            </div>

            {/* Main Wordmark Graphic + Grand Headline */}
            <div className="space-y-4">
              <div className="relative w-full max-w-md sm:max-w-lg mx-auto lg:mx-0 h-16 sm:h-20">
                <Image
                  src="/assets/kairos-wordmark.png"
                  alt="KAIROS 2027"
                  fill
                  priority
                  className="object-contain object-center lg:object-left filter drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                />
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
                Where Innovation <br />
                <span className="gradient-text-kairos">Meets Its Moment.</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {EVENT_CONFIG.subtitle}
              </p>
            </div>

            {/* Event Metadata Strip (Date, Venue, Fee) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                <span className="text-[11px] font-mono text-purple-300 block mb-0.5">DATES</span>
                <span className="text-sm font-semibold text-white block">{EVENT_CONFIG.dates.displayRange}</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                <span className="text-[11px] font-mono text-purple-300 block mb-0.5">VENUE</span>
                <span className="text-sm font-semibold text-white block">Sathyabama Indoor Stadium</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                <span className="text-[11px] font-mono text-purple-300 block mb-0.5">REGISTRATION</span>
                <span className="text-sm font-semibold text-emerald-400 block">{EVENT_CONFIG.scale.registrationFee.split(' ')[0]} Free Entry</span>
              </div>
            </div>

            {/* 48-Hour Live Countdown Timer */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-purple-500/25 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-purple-300">
                <span className="flex items-center gap-1.5 font-semibold tracking-wider uppercase">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  {countdownStatus === 'upcoming' ? 'Competition Begins In (IST)' : countdownStatus === 'live' ? '⚡ 48-Hour Clock Active!' : 'Competition Concluded'}
                </span>
                <span className="text-slate-400">Chennai · Asia/Kolkata</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-slate-950/60 rounded-xl p-2 sm:p-3 border border-purple-500/15">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Days</span>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-2 sm:p-3 border border-purple-500/15">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Hours</span>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-2 sm:p-3 border border-purple-500/15">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Minutes</span>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-2 sm:p-3 border border-purple-500/15">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-purple-300 block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">Seconds</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenWaitlist}
                className="px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all flex items-center gap-2 group active:scale-95"
              >
                <span>Join Early-Interest Waitlist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#tracks"
                className="px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-purple-500/25 hover:border-purple-500/50 transition-all flex items-center gap-2"
              >
                <span>Explore 5 Tracks</span>
              </a>

              <button
                onClick={onOpenProspectus}
                className="px-4 py-3.5 rounded-xl text-xs font-semibold text-purple-300 hover:text-white border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
                title="Download or preview partnership prospectus"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Prospectus</span>
              </button>
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
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                    <span>3D Canvas Active</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>Vector Mode Active</span>
                  </>
                )}
              </button>
              <span className="hidden sm:inline text-slate-400">· Drag to interact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
