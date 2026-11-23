'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  enableTilt?: boolean;
  maxTilt?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(238, 5, 242, 0.15)',
  borderColor = 'rgba(238, 5, 242, 0.35)',
  enableTilt = true,
  maxTilt = 7,
  onClick,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      if (enableTilt && !prefersReducedMotion) {
        const normX = (x / rect.width - 0.5) * 2; // -1 to 1
        const normY = (y / rect.height - 0.5) * 2;
        setTilt({
          x: -normY * maxTilt,
          y: normX * maxTilt,
        });
      }
    },
    [enableTilt, maxTilt, prefersReducedMotion]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transformStyle: isHovered && enableTilt && !prefersReducedMotion ? 'preserve-3d' : undefined,
      }}
      animate={
        enableTilt && !prefersReducedMotion
          ? {
              rotateX: isHovered ? tilt.x : 0,
              rotateY: isHovered ? tilt.y : 0,
              transformPerspective: 1000,
            }
          : undefined
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
        isHovered ? 'shadow-2xl shadow-black/80' : 'shadow-lg'
      } ${className}`}
    >
      {/* Radial Mouse Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />

      {/* Reactive Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${borderColor}`,
          boxShadow: `inset 0 0 20px 0 ${spotlightColor}`,
        }}
      />

      {/* Card Body Content */}
      <div className="relative z-20 h-full">{children}</div>
    </motion.div>
  );
};
