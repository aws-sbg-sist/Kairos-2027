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

    let animationFrameId = 0;
    let isInView = true;
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
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.32,
      speedY: (Math.random() - 0.5) * 0.32,
      opacity: Math.random() * 0.6 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '#ee05f2' : Math.random() > 0.5 ? '#7630d9' : '#38bdf8',
    }));

    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let t = 0;
    const render = () => {
      animationFrameId = 0;
      if (!isInView || document.hidden) return;
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital rings
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(118, 48, 217, 0.09)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, width * 0.38, height * 0.28, Math.PI / 6 + t * 0.05, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(238, 5, 242, 0.06)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, width * 0.48, height * 0.36, -Math.PI / 8 - t * 0.04, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render cosmic particles + constellation filaments
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Parallax nudge & glowing pointer tether near cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 165) {
          const force = (1 - dist / 165) * 0.55;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(238, 5, 242, ${(1 - dist / 165) * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Constellation lines between nearby motes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ndx = p2.x - p.x;
          const ndy = p2.y - p.y;
          const nDistSq = ndx * ndx + ndy * ndy;
          if (nDistSq < 115 * 115) {
            const lineAlpha = (1 - Math.sqrt(nDistSq) / 115) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(118, 48, 217, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(t * 3 + i));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView && !animationFrameId && !document.hidden) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const handleVisibilityChange = () => {
      if (!document.hidden && isInView && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    render();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, interactive, prefersReducedMotion]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Tech Grid Pattern overlay */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />

      {/* Canvas for dynamic particles */}
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};
