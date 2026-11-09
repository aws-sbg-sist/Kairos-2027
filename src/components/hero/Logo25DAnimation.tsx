'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, Compass } from 'lucide-react';

export const Logo25DAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [idleAngle, setIdleAngle] = useState(0);

  // Smooth idle floating & orbital rotation loop
  useEffect(() => {
    let frameId: number;
    let t = 0;

    const animateIdle = () => {
      t += 0.02;
      setIdleAngle(t);
      frameId = requestAnimationFrame(animateIdle);
    };

    frameId = requestAnimationFrame(animateIdle);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Mouse Parallax movement handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Inverted Y for natural tilt
    setTilt({
      x: -y * 24, // Max tilt deg
      y: x * 24,
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Compute composite rotation: idle float + mouse tilt
  const currentRotX = isHovered ? tilt.x : Math.sin(idleAngle * 0.8) * 8;
  const currentRotY = isHovered ? tilt.y : Math.cos(idleAngle * 0.6) * 10;
  const currentTranslateY = Math.sin(idleAngle * 1.2) * 6;

  // Calculate dynamic shadow offset based on tilt
  const shadowX = -currentRotY * 1.5;
  const shadowY = currentRotX * 1.5 + 20;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[420px] sm:max-w-[480px] mx-auto flex items-center justify-center cursor-crosshair select-none"
      style={{ perspective: '1100px' }}
      title="Interactive 2.5D Hologram — Move cursor to tilt perspective"
    >
      {/* 2.5D Rotating & Tilting Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out reticle-frame"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) translateY(${currentTranslateY}px)`,
        }}
      >
        {/* Subtle Horizontal Laser Scan Beam */}
        <div className="laser-scan-beam" />
        {/* =================================================================
            LAYER 0: Deep Ambient Glow & Radial Diffusion (Z: -60px)
            ================================================================= */}
        <div
          className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full blur-[80px] opacity-45 pointer-events-none transition-all duration-500"
          style={{
            transform: 'translateZ(-60px)',
            background: 'radial-gradient(circle, var(--aws-orange) 0%, #7630d9 45%, #0511f2 80%, transparent 100%)',
          }}
        />

        {/* =================================================================
            LAYER 1: Astrolabe Degree Dial & Technical Caliper Grid (Z: -30px)
            ================================================================= */}
        <div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 pointer-events-none transition-transform duration-1000"
          style={{
            transform: `translateZ(-30px) rotateZ(${idleAngle * 8}deg)`,
          }}
        >
          {/* Circular SVG Caliper with Technical Tick Marks */}
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-35 text-[#7630d9]">
            <circle
              cx="200"
              cy="200"
              r="190"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />
            <circle
              cx="200"
              cy="200"
              r="165"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="135"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="16 32"
            />
            {/* Cardinal Degree Markers */}
            <text x="200" y="24" fill="currentColor" fontSize="10" fontFamily="monospace" textAnchor="middle">000°</text>
            <text x="382" y="204" fill="currentColor" fontSize="10" fontFamily="monospace" textAnchor="middle">090°</text>
            <text x="200" y="386" fill="currentColor" fontSize="10" fontFamily="monospace" textAnchor="middle">180°</text>
            <text x="18" y="204" fill="currentColor" fontSize="10" fontFamily="monospace" textAnchor="middle">270°</text>
          </svg>
        </div>

        {/* =================================================================
            LAYER 2: 2.5D Planetary Celestial Orbit Ring (Z: 0px)
            Angled at 68 degrees to generate true isometric perspective
            ================================================================= */}
        <div
          className="absolute w-80 h-80 sm:w-96 sm:h-96 pointer-events-none"
          style={{
            transform: 'translateZ(5px) rotateX(68deg) rotateY(-16deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* The Glowing Elliptical Track */}
          <div className="w-full h-full rounded-full border border-purple-500/40 shadow-[0_0_20px_rgba(118,48,217,0.35)] relative animate-orbit-spin">
            {/* Satellite 1: Neon Magenta Node */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_14px_var(--aws-orange)] flex items-center justify-center animate-pulse"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Satellite 2: Electric Cobalt Blue Node */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0511f2] shadow-[0_0_14px_#0511f2] flex items-center justify-center"
            >
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>

            {/* Satellite 3: Cyan Micro Photon */}
            <div
              className="absolute top-1/2 -left-2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]"
            />
          </div>
        </div>

        {/* =================================================================
            LAYER 3: Center Kairos Emblem (Elevated at Z: 45px)
            The official KAIROS Hourglass emblem with dynamic reactive lighting
            ================================================================= */}
        <div
          className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
          style={{
            transform: 'translateZ(45px)',
          }}
        >
          {/* Logo Drop Shadow Projected Behind */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-50 transition-all duration-200 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--aws-orange) 0%, #7630d9 60%, transparent 100%)',
              transform: `translate(${shadowX}px, ${shadowY}px) scale(0.9)`,
            }}
          />

          {/* Core Official Kairos Logo Asset */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/kairos-hourglass.png"
              alt="KAIROS 2027 Hourglass Official Emblem"
              fill
              priority
              sizes="(max-width: 768px) 256px, 320px"
              className="object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Central Quantum Constriction Ring (The Waist of Time) */}
          <div
            className="absolute w-12 h-3 rounded-full border border-sky-400 bg-sky-400/20 blur-[1px] shadow-[0_0_12px_#38bdf8] pointer-events-none animate-pulse"
            style={{ transform: 'translateZ(20px)' }}
          />

          {/* Dynamic Light Sheen Glare across Glass Surface */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transition-opacity duration-300"
            style={{
              transform: `rotate(${currentRotY * 2}deg)`,
              opacity: isHovered ? 0.35 : 0.15,
            }}
          />
        </div>

        {/* =================================================================
            LAYER 4: Foreground Holographic Telemetry HUD (Elevated at Z: 75px)
            Floating technical data chips in true 2.5D space
            ================================================================= */}
        {/* Top-Right Telemetry Chip */}
        <div
          className="absolute top-2 right-4 sm:right-6 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-950/90 border border-purple-500/40 text-purple-200 shadow-lg shadow-black/60 backdrop-blur-md flex items-center gap-1.5 pointer-events-none"
          style={{ transform: 'translateZ(75px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-ping" />
          <span className="font-bold tracking-wider text-white">48H SAND SYNC</span>
        </div>

        {/* Bottom-Left Coordinates Chip */}
        <div
          className="absolute bottom-4 left-5 sm:left-7 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-950/90 border border-sky-500/40 text-sky-200 shadow-lg shadow-black/60 backdrop-blur-md flex items-center gap-1.5 pointer-events-none"
          style={{ transform: 'translateZ(75px)' }}
        >
          <Compass className="w-3 h-3 text-sky-400" />
          <span>IST CALIBRATED · 12.87°N</span>
        </div>

        {/* Center Waist Active Particle Flux */}
        <div
          className="absolute pointer-events-none"
          style={{ transform: 'translateZ(60px)' }}
        >
          <Sparkles className="w-4 h-4 text-purple-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>
    </div>
  );
};
