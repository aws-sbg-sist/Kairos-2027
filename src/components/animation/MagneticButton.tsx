'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  pullStrength?: number; // max pixels button shifts toward mouse
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  pullStrength = 12,
  onClick,
  onMouseEnter,
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

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 18,
        mass: 0.5,
      }}
      className={`inline-block cursor-pointer select-none ${className}`}
    >
      {children}
    </motion.div>
  );
};
