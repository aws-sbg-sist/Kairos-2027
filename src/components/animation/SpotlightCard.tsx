'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  spotlightColor?: string;
  borderColor?: string;
  enableTilt?: boolean;
  maxTilt?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
  cursorLabel?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  contentClassName = '',
  spotlightColor = 'rgba(238, 5, 242, 0.16)',
  borderColor = 'rgba(238, 5, 242, 0.38)',
  enableTilt = true,
  maxTilt = 6,
  onClick,
  style = {},
  cursorLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const canHoverPointer = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse' || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      if (enableTilt && !prefersReducedMotion) {
        const normX = (x / rect.width - 0.5) * 2;
        const normY = (y / rect.height - 0.5) * 2;
        setTilt({
          x: -normY * maxTilt,
          y: normX * maxTilt,
        });
      }
    },
    [enableTilt, maxTilt, prefersReducedMotion]
  );

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && canHoverPointer()) {
      setIsHovered(true);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onClick={onClick}
      data-cursor-label={cursorLabel}
      style={{
        ...style,
        transformStyle: isHovered && enableTilt && !prefersReducedMotion ? 'preserve-3d' : undefined,
      }}
      animate={
        enableTilt && !prefersReducedMotion
          ? {
              rotateX: isHovered ? tilt.x : 0,
              rotateY: isHovered ? tilt.y : 0,
              y: isHovered ? -2 : 0,
              transformPerspective: 1000,
            }
          : undefined
      }
      whileTap={onClick && !prefersReducedMotion ? { scale: 0.985 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 26,
      }}
      className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
        isHovered ? 'shadow-2xl shadow-black/80' : 'shadow-lg'
      } ${className}`}
    >
      {/* Top Laser Edge Sweep on Hover */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[1.5px] z-30 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0.35)',
          background: 'linear-gradient(90deg, transparent 0%, #ee05f2 45%, #38bdf8 55%, transparent 100%)',
        }}
      />

      {/* Radial Mouse Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 74%)`,
        }}
      />

      {/* Reactive Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${borderColor}`,
          boxShadow: `inset 0 0 24px 0 ${spotlightColor}`,
        }}
      />

      {/* Card Body Content */}
      <div className={`relative z-20 h-full ${contentClassName}`}>{children}</div>
    </motion.div>
  );
};
