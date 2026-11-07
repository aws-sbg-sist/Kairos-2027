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
        className={`p-1.5 rounded-lg border transition-all duration-200 ease-onscreen active:scale-[0.97] flex items-center justify-center relative overflow-hidden ${
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
        className="relative z-10 flex items-center gap-1 px-2 py-1 rounded-md transition-transform duration-75 active:scale-[0.97] font-bold"
        title="Active Theme: Cyber Neon (Default Adobe Palette: #ee05f2, #7630d9, #0511f2, #edebf2, #0d0d0d)"
      >
        {isCyber && (
          <motion.div
            layoutId="activeThemeKnob"
            className="absolute inset-0 rounded-md bg-[#ee05f2] shadow-[0_0_12px_rgba(238,5,242,0.6)] z-[-1]"
            animate={{ scaleX: isTransitioning ? 1.12 : 1 }}
            transition={{
              type: 'tween',
              ease: [0.4, 0, 0.2, 1], // ease-in-out for onscreen movement, no spring bounce
              duration: 0.19, // 150-250ms range
            }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isCyber ? 'cyber-on' : 'cyber-off'}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(1.5px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(1.5px)' }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
            className="flex items-center gap-1"
          >
            <Sparkles className={`w-3 h-3 ${isCyber ? 'text-slate-950' : 'text-slate-400 group-hover:text-[#ee05f2]'}`} />
            <span className={isCyber ? 'text-slate-950' : 'text-slate-400 hover:text-white'}>CYBER</span>
          </motion.div>
        </AnimatePresence>
      </button>

      {/* AWS Classic Option */}
      <button
        onClick={() => handleSelect('aws')}
        onMouseEnter={() => sound?.playHover()}
        aria-pressed={!isCyber}
        className="relative z-10 flex items-center gap-1 px-2 py-1 rounded-md transition-transform duration-75 active:scale-[0.97] font-bold"
        title="Switch to: AWS Cloud Classic Palette (#a855f7, #232F3E, #0B0F19, #0073BB)"
      >
        {!isCyber && (
          <motion.div
            layoutId="activeThemeKnob"
            className="absolute inset-0 rounded-md bg-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.6)] z-[-1]"
            animate={{ scaleX: isTransitioning ? 1.12 : 1 }}
            transition={{
              type: 'tween',
              ease: [0.4, 0, 0.2, 1], // ease-in-out for onscreen movement, no spring bounce
              duration: 0.19, // 150-250ms range
            }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={!isCyber ? 'aws-on' : 'aws-off'}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(1.5px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(1.5px)' }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
            className="flex items-center gap-1"
          >
            <Flame className={`w-3 h-3 ${!isCyber ? 'text-slate-950' : 'text-[#a855f7]'}`} />
            <span className={!isCyber ? 'text-slate-950' : 'text-slate-400 hover:text-white'}>AWS</span>
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
};
