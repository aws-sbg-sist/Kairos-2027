'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  pullStrength?: number; // max pixels button shifts toward mouse
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  hapticFeedback?: boolean;
  soundFeedback?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  pullStrength = 10,
  onClick,
  onMouseEnter,
  hapticFeedback = true,
  soundFeedback = true,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      setPosition({
        x: (distanceX / (rect.width / 2)) * pullStrength,
        y: (distanceY / (rect.height / 2)) * pullStrength,
      });
    },
    [pullStrength, prefersReducedMotion]
  );

  const handleMouseEnter = () => {
    if (soundFeedback) {
      sound?.playHover();
    }
    if (hapticFeedback) {
      haptics?.light();
    }
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (soundFeedback) {
      sound?.playClick();
    }
    if (hapticFeedback) {
      haptics?.medium();
    }
    onClick?.(e);
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.4,
      }}
      className={`inline-block cursor-pointer select-none ${className}`}
    >
      {children}
    </motion.div>
  );
};
