'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command, X, Moon, Volume2, Layers, Trophy, Calendar, FileText, ArrowRight } from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export const KeyboardShortcutsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        sound?.playClick();
        haptics?.light();
      }
      return next;
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable;

      if (isInput) return;

      // '?' opens shortcuts modal
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        handleToggle();
        return;
      }

      // If modal is open, Escape closes it
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      // Quick key actions if no modal is trapping
      if (!isOpen && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() === 't') {
          e.preventDefault();
          sound?.playClick();
          haptics?.medium();
          // Dispatch custom event for theme toggle
          window.dispatchEvent(new CustomEvent('kairos:toggle-theme'));
        } else if (e.key.toLowerCase() === 'm') {
          e.preventDefault();
          sound?.toggle();
          haptics?.medium();
        } else if (e.key.toLowerCase() === 'r') {
          e.preventDefault();
          router.push('/register');
        } else if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          router.push('/#schedule');
        } else if (e.key.toLowerCase() === 'k') {
          e.preventDefault();
          router.push('/tracks');
        } else if (e.key.toLowerCase() === 'l') {
          e.preventDefault();
          router.push('/leaderboard');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleToggle, close, router]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: '?', label: 'Open / Close Shortcuts HUD', icon: Command },
    { key: 'T', label: 'Toggle Cyber / AWS Theme', icon: Moon },
    { key: 'M', label: 'Toggle Audio Synthesizer & Haptics', icon: Volume2 },
    { key: 'R', label: 'Quick Jump: Registration (100% Free)', icon: ArrowRight },
    { key: 'K', label: 'Quick Jump: 5 Technical Tracks', icon: Layers },
    { key: 'S', label: 'Quick Jump: 48-Hour Event Schedule', icon: Calendar },
    { key: 'L', label: 'Quick Jump: Live Leaderboard & Z-Score', icon: Trophy },
    { key: 'Esc', label: 'Dismiss Active Dialog / Modal', icon: X },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-dialog-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={close}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-aws-card border border-purple-500/40 p-6 shadow-2xl shadow-purple-950/60 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Command className="w-4 h-4" />
            </div>
            <div>
              <h2 id="shortcuts-dialog-title" className="text-base font-bold font-display text-white">
                KAIROS 2027 Command Center
              </h2>
              <p className="text-[11px] font-mono text-purple-300">
                Keyboard Navigation & Telemetry Shortcuts
              </p>
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Close shortcuts dialog"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {shortcuts.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/5 hover:border-purple-500/30 transition text-xs font-mono"
            >
              <div className="flex items-center gap-2 text-slate-300 truncate">
                <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">{label}</span>
              </div>
              <kbd className="px-2 py-0.5 rounded bg-purple-950/70 border border-purple-500/40 text-purple-300 font-bold text-[11px] shadow-sm shrink-0 ml-2">
                {key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center text-[11px] font-mono text-slate-400 border-t border-white/5 flex items-center justify-between">
          <span>Press any key above to trigger instantly</span>
          <span className="text-purple-400">Esc to Exit</span>
        </div>
      </div>
    </div>
  );
};

