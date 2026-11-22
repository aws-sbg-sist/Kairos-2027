'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HourglassLiveSand } from './HourglassLiveSand';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';
import { EVENT_CONFIG } from '@/lib/config';
import { RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';

export const KairosExecutionTerminal: React.FC = () => {
  const [flipAngle, setFlipAngle] = useState(0);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'spec'>('telemetry');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [countdownStatus, setCountdownStatus] = useState<'upcoming' | 'live' | 'ended'>('upcoming');

  const isFlipped = (flipAngle / 180) % 2 !== 0;

  const handleFlip = useCallback(() => {
    setFlipAngle((prev) => prev + 180);
    sound?.playClick();
    if (haptics) {
      haptics.light();
    }
  }, []);

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
    <div className="w-full bg-[#101216] border border-[#23252E] rounded-lg overflow-hidden shadow-2xl">
      {/* Instrument Bar Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B0D11] border-b border-[#23252E] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-slate-200">KAIROS CHRONOMETER</span>
          <span className="text-slate-500 hidden sm:inline">// ASIA-SOUTH-1</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>IST 12.87°N</span>
          <button
            onClick={handleFlip}
            className="flex items-center gap-1 px-2 py-0.5 rounded border border-[#2E323D] hover:border-slate-400 text-slate-300 hover:text-white transition-colors text-[11px]"
            title="Invert sand flow"
          >
            <RefreshCw className="w-3 h-3" />
            <span>FLIP</span>
          </button>
        </div>
      </div>

      {/* Main Instrument Body */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Real-Time Telemetry & Status (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 text-xs font-mono border-b border-[#23252E] pb-2">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'telemetry'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              [COUNTDOWN]
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeTab === 'spec'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              [SYSTEM SPECS]
            </button>
          </div>

          {activeTab === 'telemetry' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-[#0B0D11] border border-[#23252E] rounded p-2.5 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Days</div>
                </div>
                <div className="bg-[#0B0D11] border border-[#23252E] rounded p-2.5 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Hours</div>
                </div>
                <div className="bg-[#0B0D11] border border-[#23252E] rounded p-2.5 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Mins</div>
                </div>
                <div className="bg-[#0B0D11] border border-[#FF9900]/40 rounded p-2.5 text-center">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#FF9900] tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-[#FF9900] uppercase tracking-wide">Secs</div>
                </div>
              </div>

              {/* Status Feed */}
              <div className="bg-[#0B0D11] border border-[#23252E] rounded p-3 font-mono text-xs space-y-1 text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>ONLINE QUALIFIER ROUND 1 ACTIVE</span>
                </div>
                <div className="text-slate-400 text-[11px] leading-relaxed">
                  Phase 1 abstract screening accepts verified teams until 15 Jan 2027. Top 100 teams qualify for 48-hour Chennai finale.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0B0D11] border border-[#23252E] rounded p-3 font-mono text-xs space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-[#23252E] pb-1">
                <span className="text-slate-500">EVENT WINDOW:</span>
                <span className="text-white">22–24 JAN 2027</span>
              </div>
              <div className="flex justify-between border-b border-[#23252E] pb-1">
                <span className="text-slate-500">FORMAT:</span>
                <span className="text-white">48 HOURS CONTINUOUS</span>
              </div>
              <div className="flex justify-between border-b border-[#23252E] pb-1">
                <span className="text-slate-500">COHORT:</span>
                <span className="text-white">100 TEAMS (4–6 BUILDERS)</span>
              </div>
              <div className="flex justify-between border-b border-[#23252E] pb-1">
                <span className="text-slate-500">REGISTRATION FEE:</span>
                <span className="text-emerald-400 font-bold">₹0 (ZERO FEE)</span>
              </div>
              <div className="flex justify-between border-b border-[#23252E] pb-1">
                <span className="text-slate-500">TOTAL PRIZE POOL:</span>
                <span className="text-[#FF9900] font-bold">₹1,75,000 INR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">VENUE:</span>
                <span className="text-white">SATHYABAMA AUDITORIUM</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Physical Sand Gravity Chronometer (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div
            onClick={handleFlip}
            className="relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer select-none group"
            title="Click to flip the sand chronometer"
          >
            {/* Live Physical Canvas Sand Simulation */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <HourglassLiveSand isFlipped={isFlipped} onCycleComplete={handleFlip} />
            </div>

            {/* Crisp Glass Frame */}
            <div
              className="relative w-full h-full pointer-events-none"
              style={{
                transform: `rotateZ(${flipAngle}deg)`,
                transition: 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              <Image
                src="/assets/kairos-hourglass-glass.png"
                alt="Kairos Chronometer Glass Frame"
                fill
                priority
                sizes="224px"
                className="object-contain filter drop-shadow-lg"
              />
              <Image
                src="/assets/kairos-hourglass.png"
                alt="Kairos Hourglass"
                width={1}
                height={1}
                className="hidden opacity-0 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-2 text-center text-[10px] font-mono text-slate-500">
            CLICK TO INVERT CHRONOMETER
          </div>
        </div>
      </div>
    </div>
  );
};
