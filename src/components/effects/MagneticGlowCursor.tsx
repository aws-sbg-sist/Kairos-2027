'use client';

import React, { useEffect, useState } from 'react';

export function MagneticGlowCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only mount on devices that have fine pointer (desktop mice/trackpads)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setMounted(true);

    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive-glow');
        setHovered(!!isInteractive);
      }
    };

    const updatePhysics = () => {
      // Smooth linear interpolation (lerp)
      const ease = 0.18;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      setPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed pointer-events-none z-40 transition-transform duration-75 hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Outer ambient glow */}
      <div
        className={`rounded-full transition-all duration-300 blur-2xl ${
          hovered
            ? 'w-36 h-36 bg-celestial/30 scale-125'
            : 'w-24 h-24 bg-celestial/15 scale-100'
        }`}
      />
      {/* Precision core dot */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
          hovered
            ? 'w-4 h-4 bg-white/40 ring-2 ring-celestial-light/60'
            : 'w-2 h-2 bg-celestial/60'
        }`}
      />
    </div>
  );
}
