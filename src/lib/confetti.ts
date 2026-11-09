'use client';

import confetti from 'canvas-confetti';
import { haptics } from './haptics';
import { sound } from './audio';

// High-impact multi-stage celebratory confetti effects
// Uses Kairos Cyber Neon + AWS Cloud Gold luxury color palette

const KAIROS_COLORS = ['#00F0FF', '#7000FF', '#FF007A', '#00FF66', '#FFB800', '#FFFFFF'];
const GOLD_COLORS = ['#FFD700', '#FFA500', '#FF8C00', '#FFE4B5', '#FFF8DC'];

export function fireConfetti(customColors?: string[]) {
  if (typeof window === 'undefined') return;

  try {
    haptics?.celebration();
    sound?.playSuccess();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: customColors || KAIROS_COLORS,
      disableForReducedMotion: true,
      zIndex: 9999,
    });
  } catch {
    // Graceful fallback
  }
}

export function fireSchoolPride() {
  if (typeof window === 'undefined') return;

  try {
    haptics?.celebration();
    sound?.playSuccess();

    const end = Date.now() + 1200;
    const colors = KAIROS_COLORS;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        zIndex: 9999,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        zIndex: 9999,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // Graceful fallback
  }
}

export function fireGoldMilestone() {
  if (typeof window === 'undefined') return;

  try {
    haptics?.celebration();
    sound?.playSuccess();

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: GOLD_COLORS,
      shapes: ['star', 'circle'],
      scalar: 1.2,
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback
  }
}
