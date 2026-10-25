'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, Play, RotateCcw } from 'lucide-react';

interface EntranceVideoRevealProps {
  onComplete?: () => void;
  forceOpen?: boolean;
  onClose?: () => void;
}

export const EntranceVideoReveal: React.FC<EntranceVideoRevealProps> = ({
  onComplete,
  forceOpen = false,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const hasSeen = typeof window !== 'undefined' ? sessionStorage.getItem('kairos_logo_reveal_seen') : null;

    if (!hasSeen || forceOpen) {
      setIsVisible(true);
      setIsFadingOut(false);
      setProgress(0);

      // Listen for custom trigger to replay reveal anywhere in the app
      const handleReplay = () => {
        setIsVisible(true);
        setIsFadingOut(false);
        setProgress(0);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      };

      window.addEventListener('kairos:replay-reveal', handleReplay);
      return () => window.removeEventListener('kairos:replay-reveal', handleReplay);
    }
  }, [forceOpen]);

  useEffect(() => {
    // Keyboard listener for Escape or Space to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsFadingOut(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('kairos_logo_reveal_seen', 'true');
    }
    setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false);
      if (onClose) onClose();
      if (onComplete) onComplete();
    }, 600);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#05070D] flex flex-col items-center justify-center transition-all duration-700 ease-out overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#FF9900]/20 via-[#0073BB]/20 to-purple-600/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#05070D_95%)]" />
      </div>

      {/* Top Header Bar inside reveal */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#FF9900] animate-ping" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-300 uppercase">
            AWS SBGL · KAIROS 2027 Logo Reveal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute / Unmute Button */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 text-xs font-mono transition backdrop-blur-md group"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition" />
                <span className="hidden sm:inline">Unmute Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#10B981] group-hover:scale-110 transition" />
                <span className="hidden sm:inline">Sound On</span>
              </>
            )}
          </button>

          {/* Skip Intro Button */}
          <button
            onClick={handleDismiss}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF9900] hover:bg-amber-400 text-slate-950 text-xs font-bold font-mono transition shadow-lg shadow-[#FF9900]/20 group"
          >
            <span>Skip Intro</span>
            <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {/* Central Video Frame */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center">
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#FF9900]/40 shadow-[0_0_80px_rgba(255,153,0,0.25)] bg-slate-950/90 aspect-video w-full flex items-center justify-center">
          <video
            ref={videoRef}
            src="/assets/kairos-logo-reveal.mp4"
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleDismiss}
            className="w-full h-full object-contain"
          />

          {/* Bottom subtle progress line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#FF9900] via-amber-300 to-[#0073BB] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Subtitle / Press Esc notification */}
        <div className="mt-6 flex items-center justify-between w-full text-[11px] font-mono text-slate-400 px-2">
          <span className="flex items-center gap-2 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
            National Grand Technical Hackathon · Sathyabama Institute of Science and Technology
          </span>
          <span className="hidden sm:inline-block text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">Esc</kbd> to enter site
          </span>
        </div>
      </div>
    </div>
  );
};
