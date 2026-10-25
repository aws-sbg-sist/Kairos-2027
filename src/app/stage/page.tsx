'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  Clock, 
  Maximize, 
  Minimize, 
  GitCommit, 
  Trophy, 
  Radio, 
  Users, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function StageScreenMode() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  const [activeAnnouncement, setActiveAnnouncement] = useState(
    '★ CHECKPOINT 1 ACTIVE: Senior AWS Solutions Architects conducting table-side architecture evaluations across all 100 bays.'
  );

  useEffect(() => {
    const targetDate = new Date(EVENT_CONFIG.dates.codeFreezeDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const recentCommits = [
    { team: 'KAIROS-T001', msg: 'feat(eventbridge): add dlq retry mesh with exponential backoff', time: '1m ago' },
    { team: 'KAIROS-T002', msg: 'refactor(bedrock): implement streaming tool-calls with langchain', time: '3m ago' },
    { team: 'KAIROS-T007', msg: 'test(zkp): verify snark verification contract on testnet', time: '5m ago' },
    { team: 'KAIROS-T003', msg: 'fix(greengrass): resolve MQTT connection disconnects on ESP32', time: '6m ago' },
    { team: 'KAIROS-T012', msg: 'feat(textract): stream OCR key-value pairs directly to client', time: '8m ago' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10 flex flex-col justify-between font-sans selection:bg-aws-orange selection:text-black overflow-hidden relative">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-aws-orange/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/15 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image
              src="/assets/kairos-hourglass.png"
              alt="KAIROS 2027"
              fill
              className="object-contain filter drop-shadow-[0_0_20px_rgba(255,153,0,0.8)]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-widest text-white">
                KAIROS 2027
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-aws-orange text-black">
                GRAND FINALE
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>STAGE LIVE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              AWS Student Builder Group (SIST Chapter) • Sathyabama Central Library Complex
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">ARENA SCALE</span>
            <span className="text-sm font-mono font-bold text-amber-300 block">100 Teams • 450+ Builders • 100% Free</span>
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
          <Link
            href="/"
            className="text-xs font-mono text-slate-400 hover:text-white px-3 py-2 rounded-xl border border-white/10"
          >
            Exit Stage
          </Link>
        </div>
      </header>

      {/* Main Center Display: Mega Countdown & Status */}
      <main className="relative z-10 py-8 text-center space-y-8 flex-grow flex flex-col justify-center">
        
        {/* Stage Announcement Marquee */}
        <div className="max-w-4xl mx-auto w-full p-3.5 rounded-2xl bg-aws-squidInk/90 border border-aws-orange/40 text-amber-300 font-mono text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-aws-orange animate-ping" />
          <span className="font-bold tracking-wider">{activeAnnouncement}</span>
        </div>

        {/* Giant Countdown Clock */}
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-slate-400 block font-bold">
            COUNTDOWN TO HARD CODE FREEZE (08:30 AM IST)
          </span>

          <div className="flex items-center justify-center gap-3 sm:gap-6 font-mono font-black text-6xl sm:text-8xl lg:text-9xl text-white tracking-wider">
            <div className="p-4 sm:p-8 rounded-3xl bg-slate-950/90 border-2 border-aws-orange/40 shadow-2xl shadow-aws-orange/10 min-w-[130px] sm:min-w-[200px]">
              <span className="block text-aws-orange">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm text-slate-500 font-sans tracking-widest block font-bold mt-2">HOURS</span>
            </div>
            <span className="text-aws-orange/60 animate-pulse">:</span>
            <div className="p-4 sm:p-8 rounded-3xl bg-slate-950/90 border-2 border-aws-orange/40 shadow-2xl shadow-aws-orange/10 min-w-[130px] sm:min-w-[200px]">
              <span className="block text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm text-slate-500 font-sans tracking-widest block font-bold mt-2">MINUTES</span>
            </div>
            <span className="text-aws-orange/60 animate-pulse">:</span>
            <div className="p-4 sm:p-8 rounded-3xl bg-slate-950/90 border-2 border-aws-orange/40 shadow-2xl shadow-aws-orange/10 min-w-[130px] sm:min-w-[200px]">
              <span className="block text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs sm:text-sm text-slate-500 font-sans tracking-widest block font-bold mt-2">SECONDS</span>
            </div>
          </div>
        </div>

        {/* Active Bounties Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-4">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Grand National Champion: </span>
            <span className="text-amber-400 font-bold">₹60,000 Pure Cash</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">5 Track Winners: </span>
            <span className="text-emerald-400 font-bold">5 × ₹7,000 Cash</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400">Total Pure Cash Pool: </span>
            <span className="text-aws-orange font-bold">₹1,75,000 Cash</span>
          </div>
        </div>

      </main>

      {/* Bottom Footer: Live Git Commit Telemetry Ticker */}
      <footer className="relative z-10 border-t border-white/15 pt-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-sky-400">
            <GitCommit className="w-4 h-4" />
            <strong className="text-white">LIVE COMMIT TELEMETRY</strong> (Automated Webhook Ingestion)
          </span>
          <span>100 Teams Active on Arena 1Gbps Network</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {recentCommits.map((c, i) => (
            <div key={i} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono truncate">
              <span className="text-aws-orange font-bold mr-1.5">{c.team}:</span>
              <span className="text-slate-300">{c.msg}</span>
            </div>
          ))}
        </div>
      </footer>

    </div>
  );
}
