'use client';

import React, { useRef, useEffect } from 'react';

interface HourglassLiveSandProps {
  isFlipped?: boolean;
  onCycleComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

const PARTICLE_COLORS = ['#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#38bdf8'];

export const HourglassLiveSand: React.FC<HourglassLiveSandProps> = ({
  isFlipped = false,
  onCycleComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(performance.now());
  const particlesRef = useRef<Particle[]>([]);
  const splashesRef = useRef<SplashParticle[]>([]);
  const hasTriggeredCompleteRef = useRef<boolean>(false);
  const onCycleCompleteRef = useRef(onCycleComplete);
  onCycleCompleteRef.current = onCycleComplete;

  // 24-second sand cycle: soothing, hypnotic pace where sand visibly drops every second
  const CYCLE_DURATION = 24000;

  useEffect(() => {
    // Reset timer and completion flag on flip
    startTimeRef.current = performance.now();
    hasTriggeredCompleteRef.current = false;
    // Reset particles to throat orifice
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((p) => {
        p.y = 246 + Math.random() * 8;
        p.vy = 1.2 + Math.random() * 1.5;
      });
    }
    splashesRef.current = [];
  }, [isFlipped]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize stream particles
    const particles: Particle[] = [];
    const NUM_PARTICLES = 50;
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push({
        x: 250 + (Math.random() - 0.5) * 4,
        y: 246 + Math.random() * 120,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 1.8 + Math.random() * 1.5,
        size: 1.2 + Math.random() * 1.8,
        alpha: 0.6 + Math.random() * 0.4,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      });
    }
    particlesRef.current = particles;

    let prevTime = performance.now();

    const render = (time: number) => {
      prevTime = time;

      // Calculate progress (0.0 to 1.0)
      const rawElapsed = time - startTimeRef.current;
      const progress = Math.min(1.0, rawElapsed / CYCLE_DURATION);
      // Flip warm-up factor: smoothly fade in the stream over first 650ms while glass rotates 180°
      const flipWarmup = Math.min(1.0, Math.max(0.05, rawElapsed / 650));

      // Trigger cycle flip when sand finishes
      if (progress >= 1.0 && !hasTriggeredCompleteRef.current) {
        hasTriggeredCompleteRef.current = true;
        if (onCycleCompleteRef.current) {
          onCycleCompleteRef.current();
        }
      }

      ctx.clearRect(0, 0, 500, 500);

      // Geometry Constants
      // Upper Bulb: Top sand Y ranges from 192 (full) to 244 (empty)
      const sandTopY = 192 + progress * (244 - 192);

      // Lower Bulb: Apex Y ranges from 394 (empty) to 320 (full)
      const moundApexY = 394 - progress * (394 - 320);
      const moundBaseHalfWidth = 76 * Math.min(1.0, Math.sqrt(progress * 1.2));

      // -------------------------------------------------------------
      // 1. RENDER UPPER BULB SAND
      // -------------------------------------------------------------
      if (progress < 0.985) {
        ctx.save();
        ctx.beginPath();

        // Sample upper glass wall curve from sandTopY down to throat (y=246)
        const steps = 16;
        const leftWallPts: { x: number; y: number }[] = [];
        const rightWallPts: { x: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
          const y = sandTopY + (i / steps) * (246 - sandTopY);
          const t = Math.max(0, (y - 135) / 113.0);
          const hw = 85 * (1 - Math.pow(t, 1.4)) + 12;
          leftWallPts.push({ x: 250 - hw, y });
          rightWallPts.push({ x: 250 + hw, y });
        }

        // Trace left wall down
        ctx.moveTo(leftWallPts[0].x, leftWallPts[0].y);
        for (let i = 1; i < leftWallPts.length; i++) {
          ctx.lineTo(leftWallPts[i].x, leftWallPts[i].y);
        }

        // Connect through throat orifice
        ctx.lineTo(248, 246);
        ctx.lineTo(252, 246);

        // Trace right wall up
        for (let i = rightWallPts.length - 1; i >= 0; i--) {
          ctx.lineTo(rightWallPts[i].x, rightWallPts[i].y);
        }

        // Trace curved funnel surface from right wall to left wall
        const surfaceSteps = 24;
        const topHw = leftWallPts[0].x ? 250 - leftWallPts[0].x : 70;
        for (let i = 0; i <= surfaceSteps; i++) {
          const u = i / surfaceSteps; // 0 to 1 (right to left)
          const x = (250 + topHw) - u * (topHw * 2);
          const distFromCenter = Math.abs(x - 250) / Math.max(1, topHw);
          // Central funnel depression
          const dip = 6 * (1 - Math.pow(distFromCenter, 2));
          const y = sandTopY + dip;
          ctx.lineTo(x, y);
        }

        ctx.closePath();

        // Shading Gradient for Upper Sand
        const upperGrad = ctx.createLinearGradient(250, sandTopY, 250, 246);
        upperGrad.addColorStop(0.0, '#e9d5ff'); // Light amethyst highlight rim
        upperGrad.addColorStop(0.2, '#c084fc'); // Vibrant lilac
        upperGrad.addColorStop(0.65, '#9333ea'); // Electric purple core
        upperGrad.addColorStop(1.0, '#581c87'); // Deep violet shadow at throat

        ctx.fillStyle = upperGrad;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Subtle sliding grain texture along upper funnel
        ctx.save();
        for (let g = 0; g < 6; g++) {
          const grainT = ((time * 0.0008 + g * 0.16) % 1.0);
          const grainY = sandTopY + grainT * (244 - sandTopY);
          const side = g % 2 === 0 ? 1 : -1;
          const grainX = 250 + side * (1 - grainT) * (topHw * 0.6);
          ctx.beginPath();
          ctx.arc(grainX, grainY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#f3e8ff';
          ctx.globalAlpha = 0.7;
          ctx.fill();
        }
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 2. RENDER LOWER BULB SAND MOUND (PYRAMID DUNE)
      // -------------------------------------------------------------
      if (progress > 0.015) {
        ctx.save();
        ctx.beginPath();

        // Peak apex
        ctx.moveTo(250, moundApexY);

        // Right slope with gentle natural sand drape
        const baseRightX = 250 + moundBaseHalfWidth;
        const baseLeftX = 250 - moundBaseHalfWidth;

        // Quadratic curve from apex to right base
        ctx.quadraticCurveTo(
          250 + moundBaseHalfWidth * 0.55,
          moundApexY + (394 - moundApexY) * 0.45,
          baseRightX,
          394
        );

        // Base line resting on bottom glass floor
        ctx.lineTo(baseLeftX, 394);

        // Quadratic curve from left base back to apex
        ctx.quadraticCurveTo(
          250 - moundBaseHalfWidth * 0.55,
          moundApexY + (394 - moundApexY) * 0.45,
          250,
          moundApexY
        );

        ctx.closePath();

        // Multi-stop Radiant Gradient matching original artwork
        const moundGrad = ctx.createLinearGradient(250, moundApexY, 250, 394);
        moundGrad.addColorStop(0.0, '#f5d0fe'); // Radiant peak highlight
        moundGrad.addColorStop(0.2, '#d8b4fe'); // Light violet
        moundGrad.addColorStop(0.55, '#9333ea'); // Primary neon purple
        moundGrad.addColorStop(1.0, '#4c1d95'); // Deep foundation violet

        ctx.fillStyle = moundGrad;
        ctx.shadowColor = 'rgba(192, 132, 252, 0.5)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();

        // Glowing Apex Core Bead (like in the original logo)
        ctx.save();
        ctx.beginPath();
        ctx.arc(250, moundApexY + 2, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // -------------------------------------------------------------
      // 3. RENDER FALLING SAND STREAM & PARTICLES
      // -------------------------------------------------------------
      if (progress < 0.995) {
        // Continuous Central Laser Stream Core
        ctx.save();
        ctx.globalAlpha = flipWarmup;
        const streamGrad = ctx.createLinearGradient(250, 246, 250, moundApexY);
        streamGrad.addColorStop(0.0, 'rgba(233, 213, 255, 0.95)');
        streamGrad.addColorStop(0.3, 'rgba(192, 132, 252, 0.85)');
        streamGrad.addColorStop(0.8, 'rgba(168, 85, 247, 0.9)');
        streamGrad.addColorStop(1.0, 'rgba(56, 189, 248, 1.0)');

        ctx.beginPath();
        ctx.moveTo(249, 246);
        ctx.lineTo(251, 246);
        ctx.lineTo(250.8, moundApexY);
        ctx.lineTo(249.2, moundApexY);
        ctx.closePath();

        ctx.fillStyle = streamGrad;
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Update & Render Discrete Granular Sand Particles
        const currentParticles = particlesRef.current;
        for (let i = 0; i < currentParticles.length; i++) {
          const p = currentParticles[i];

          // Gravity acceleration (ALWAYS DOWNWARDS +Y)
          p.vy += 0.22;
          p.y += p.vy;
          p.x += p.vx + Math.sin(time * 0.005 + i) * 0.15;

          // Impact with bottom sand mound
          if (p.y >= moundApexY) {
            // Spawn splash micro-particles at apex
            if (splashesRef.current.length < 24) {
              const angle = (Math.random() - 0.5) * Math.PI * 0.7 - Math.PI / 2;
              const speed = 0.8 + Math.random() * 1.8;
              splashesRef.current.push({
                x: 250 + (Math.random() - 0.5) * 4,
                y: moundApexY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 1.0 + Math.random() * 1.4,
                life: 0,
                maxLife: 15 + Math.random() * 15,
                color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
              });
            }

            // Reset particle back to throat
            p.y = 246 + Math.random() * 4;
            p.x = 250 + (Math.random() - 0.5) * 3;
            p.vy = 1.2 + Math.random() * 1.5;
            p.vx = (Math.random() - 0.5) * 0.4;
          }

          // Draw Particle (Always flows from UP to DOWN)
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * flipWarmup;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.restore();
        }

        // Render Impact Splash & Rolling Avalanche Grains
        const activeSplashes = splashesRef.current;
        for (let i = activeSplashes.length - 1; i >= 0; i--) {
          const s = activeSplashes[i];
          s.life++;
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.15; // Gravity on splash

          if (s.life >= s.maxLife || s.y > 394) {
            activeSplashes.splice(i, 1);
            continue;
          }

          const splashAlpha = (1 - s.life / s.maxLife) * flipWarmup;
          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = splashAlpha;
          ctx.fill();
          ctx.restore();
        }
      }

      // -------------------------------------------------------------
      // 4. CENTRAL QUANTUM WAIST GLOW
      // -------------------------------------------------------------
      ctx.save();
      const waistPulse = Math.sin(time * 0.004) * 0.2 + 0.8;
      const waistGrad = ctx.createRadialGradient(250, 246, 1, 250, 246, 14);
      waistGrad.addColorStop(0.0, 'rgba(56, 189, 248, 0.9)');
      waistGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.5)');
      waistGrad.addColorStop(1.0, 'rgba(168, 85, 247, 0)');

      ctx.fillStyle = waistGrad;
      ctx.globalAlpha = waistPulse;
      ctx.beginPath();
      ctx.arc(250, 246, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
      style={{
        imageRendering: 'auto',
      }}
    />
  );
};
