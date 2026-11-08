'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface CosmicBackgroundProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  className = '',
  particleCount = 45,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#ee05f2' : Math.random() > 0.5 ? '#7630d9' : '#38bdf8',
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital rings
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(118, 48, 217, 0.08)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, width * 0.38, height * 0.28, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(238, 5, 242, 0.05)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, width * 0.48, height * 0.36, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render cosmic particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Parallax nudge near mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (1 - dist / 150) * 0.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(t * 3 + i));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, interactive, prefersReducedMotion]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Aurora Radial Spotlights */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[550px] h-[550px] bg-aws-orange/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-aws-blue/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Tech Grid Pattern overlay */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      {/* Canvas for dynamic particles */}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};
