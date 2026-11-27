'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Hourglass3DModelProps {
  className?: string;
}

export const Hourglass3DModel: React.FC<Hourglass3DModelProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to container center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, physics-based 3D response
  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform coordinates to 3D rotation angles
  const rotateX = useTransform(smoothY, [-180, 180], [22, -22]);
  const rotateY = useTransform(smoothX, [-180, 180], [-22, 22]);
  const ringRotateX = useTransform(smoothY, [-180, 180], [-18, 18]);
  const ringRotateY = useTransform(smoothX, [-180, 180], [18, -18]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Skip unnecessary updates when far offscreen
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = Math.max(-250, Math.min(250, e.clientX - centerX));
      const distY = Math.max(-250, Math.min(250, e.clientY - centerY));
      mouseX.set(distX);
      mouseY.set(distY);
    };

    const handleWindowBlur = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [mouseX, mouseY]);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const distX = Math.max(-220, Math.min(220, touch.clientX - (rect.left + rect.width / 2)));
    const distY = Math.max(-220, Math.min(220, touch.clientY - (rect.top + rect.height / 2)));
    mouseX.set(distX * 1.4);
    mouseY.set(distY * 1.4);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-cursor-label="3D TILT"
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* 3D Astrolabe Gimbal Rings (Opposing 3D Rotations) */}
      <motion.div
        style={{
          rotateX: ringRotateX,
          rotateY: ringRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="absolute w-44 h-44 sm:w-56 sm:h-56 pointer-events-none opacity-40 z-0"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-purple-400 animate-orbit-spin">
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <circle
            cx="100"
            cy="100"
            r="76"
            fill="none"
            stroke="rgba(249, 115, 22, 0.6)"
            strokeWidth="1"
            strokeDasharray="8 6"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="rgba(168, 85, 247, 0.4)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Main 3D Floating Hourglass Body with Mouse Tracking */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? -8 : [0, -6, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.2 }
            : { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative w-32 h-32 sm:w-40 sm:h-40 z-10 filter drop-shadow-2xl cursor-grab active:cursor-grabbing"
      >
        {/* Dynamic Specular Glare Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-950/70 blur-2xl animate-pulse pointer-events-none" />
        <div
          className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(249, 115, 22, 0.5), transparent 60%)',
          }}
        />

        {/* Central Hourglass Texture with isolated translateZ wrapper */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(30px)' }}>
          <Image
            src="/assets/kairos-hourglass.png"
            alt="KAIROS 3D Hourglass"
            fill
            className="object-contain filter drop-shadow-2xl"
          />
        </div>

        {/* Dynamic Specular Light Sweep */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 60%)',
            transform: 'translateZ(40px)',
          }}
        />
      </motion.div>

      {/* Dynamic Ground Shadow */}
      <motion.div
        animate={{
          scale: isHovered ? 1.15 : [1, 0.9, 1],
          opacity: isHovered ? 0.6 : [0.4, 0.25, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: isHovered ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-4 w-28 h-6 rounded-full bg-purple-950/80 blur-xl pointer-events-none z-0"
      />
    </div>
  );
};
