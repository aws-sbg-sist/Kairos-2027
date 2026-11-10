'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Sparkles, Flame } from 'lucide-react';
import { sound } from '@/lib/audio';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false, className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isCyber = theme === 'cyber';

  const handleSelect = (targetTheme: 'cyber' | 'aws') => {
    if (theme !== targetTheme) {
      sound?.playClick();
      setIsTransitioning(true);
      setTheme(targetTheme);
      setTimeout(() => setIsTransitioning(false), 220);
    }
  };

  if (compact) {
    return (
      <button
        onClick={() => {
          sound?.playClick();
          setIsTransitioning(true);
          setTheme(isCyber ? 'aws' : 'cyber');
          setTimeout(() => setIsTransitioning(false), 220);
        }}
        onMouseEnter={() => sound?.playHover()}
        aria-label={`Toggle theme. Current: ${isCyber ? 'Cyber Neon (Primary)' : 'AWS Classic'}`}
        title={`Active: ${isCyber ? 'Cyber Neon (Default Adobe Palette)' : 'AWS Classic'} · Click to switch`}
        className={`min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] p-2 sm:p-2.5 rounded-xl border transition-all duration-200 ease-onscreen active:scale-[0.97] flex items-center justify-center relative overflow-hidden focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none ${
          isCyber
            ? 'bg-[#181126] border-[#ee05f2]/50 text-[#ee05f2] shadow-[0_0_10px_rgba(238,5,242,0.3)]'
            : 'bg-[#161E2E] border-[#a855f7]/50 text-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.3)]'
        } ${className}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isCyber ? (
            <motion.div
              key="cyber-icon"
              initial={{ opacity: 0, scale: 0.75, filter: 'blur(2px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.75, filter: 'blur(2px)' }}
              transition={{ duration: 0.17, ease: [0.4, 0, 0.2, 1] }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
          ) : (
            <motion.div
              key="aws-icon"
              initial={{ opacity: 0, scale: 0.75, filter: 'blur(2px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.75, filter: 'blur(2px)' }}
              transition={{ duration: 0.17, ease: [0.4, 0, 0.2, 1] }}
            >
              <Flame className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className={`relative inline-flex items-center p-0.5 rounded-lg bg-slate-950/80 border border-white/10 shadow-inner select-none font-mono text-[11px] ${className}`}
    >
      {/* Cyber Neon Option (Primary Default) */}
      <button
        onClick={() => handleSelect('cyber')}
        onMouseEnter={() => sound?.playHover()}
        aria-pressed={isCyber}
        className={`relative z-10 flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-150 active:scale-[0.97] font-bold ${
          isCyber ? 'bg-[#a21caf] text-white shadow-[0_0_12px_rgba(238,5,242,0.5)]' : 'bg-slate-950 text-slate-300 hover:text-white'
        }`}
        title="Active Theme: Cyber Neon (Default Adobe Palette: #ee05f2, #7630d9, #0511f2, #edebf2, #0d0d0d)"
      >
        <Sparkles className={`w-3 h-3 ${isCyber ? 'text-white' : 'text-slate-300'}`} />
        <span>CYBER</span>
      </button>

      {/* AWS Classic Option */}
      <button
        onClick={() => handleSelect('aws')}
        onMouseEnter={() => sound?.playHover()}
        aria-pressed={!isCyber}
        className={`relative z-10 flex items-center gap-1 px-2.5 py-1 rounded-md transition-all duration-150 active:scale-[0.97] font-bold ${
          !isCyber ? 'bg-[#6d28d9] text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]' : 'bg-slate-950 text-slate-300 hover:text-white'
        }`}
        title="Switch to: AWS Cloud Classic Palette (#a855f7, #232F3E, #0B0F19, #0073BB)"
      >
        <Flame className={`w-3 h-3 ${!isCyber ? 'text-white' : 'text-purple-300'}`} />
        <span>AWS</span>
      </button>
    </div>
  );
};
