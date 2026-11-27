'use client';

import React, { useEffect, useRef } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

const TRAIL_COLORS = ['#ee05f2', '#c084fc', '#38bdf8', '#7630d9'];
const POOL_SIZE = 72;

export function MagneticGlowCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerDotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resizeCanvas();

    // Fixed ring pool for zero-GC trail emissions
    const pool: TrailParticle[] = Array.from({ length: POOL_SIZE }, () => ({
      x: -200,
      y: -200,
      vx: 0,
      vy: 0,
      size: 1.5,
      alpha: 0,
      life: 0,
      maxLife: 1,
      color: '#ee05f2',
    }));
    let poolHead = 0;

    let targetX = -200;
    let targetY = -200;
    let dotX = -200;
    let dotY = -200;
    let ringX = -200;
    let ringY = -200;
    let lastEmitX = -200;
    let lastEmitY = -200;
    let currentScale = 1;
    let targetScale = 1;
    let activeCursorMode: 'default' | 'pointer' | 'text' | 'canvas' = 'default';
    let isPressed = false;
    let isVisible = false;
    let classApplied = false;
    let currentLabel = '';
    let rafId = 0;
    let lastFrameTime = performance.now();
    let hasActiveParticles = false;

    const spawnParticle = (px: number, py: number) => {
      const p = pool[poolHead];
      poolHead = (poolHead + 1) % POOL_SIZE;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.25 + Math.random() * 0.7;
      p.x = px + (Math.random() - 0.5) * 4;
      p.y = py + (Math.random() - 0.5) * 4;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed - 0.25;
      p.size = 1.2 + Math.random() * 1.9;
      p.life = 0;
      p.maxLife = 0.42 + Math.random() * 0.28;
      p.alpha = 0.85;
      p.color = TRAIL_COLORS[poolHead % TRAIL_COLORS.length];
      hasActiveParticles = true;
    };

    const resolveTargetContext = (el: EventTarget | null) => {
      if (!(el instanceof Element)) {
        activeCursorMode = 'default';
        currentLabel = '';
        return;
      }

      const customLabelEl = el.closest('[data-cursor-label]') as HTMLElement | null;
      const interactiveEl = el.closest('a, button, [role="button"], summary, [data-cursor="pointer"]');
      const textEl = el.closest('input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, select, [contenteditable="true"]');
      const canvasEl = el.closest('canvas, [data-cursor="canvas"]');

      if (textEl) {
        activeCursorMode = 'text';
        currentLabel = '';
        targetScale = 0.85;
      } else if (customLabelEl) {
        activeCursorMode = 'pointer';
        currentLabel = customLabelEl.getAttribute('data-cursor-label') || '';
        targetScale = 1.55;
      } else if (canvasEl && !interactiveEl) {
        activeCursorMode = 'canvas';
        currentLabel = '3D TILT';
        targetScale = 1.45;
      } else if (interactiveEl) {
        activeCursorMode = 'pointer';
        const tag = interactiveEl.tagName.toLowerCase();
        const aria = (interactiveEl.getAttribute('aria-label') || '').toLowerCase();
        const text = (interactiveEl.textContent || '').trim().toLowerCase();
        if (aria.includes('close') || text === 'x') currentLabel = 'CLOSE';
        else if (text.includes('register') || text.includes('apply') || text.includes('submit')) currentLabel = 'APPLY';
        else if (text.includes('spec') || text.includes('problem') || text.includes('tracks')) currentLabel = 'INSPECT';
        else if (tag === 'a' && interactiveEl.getAttribute('target') === '_blank') currentLabel = 'OPEN';
        else currentLabel = '';
        targetScale = 1.48;
      } else {
        activeCursorMode = 'default';
        currentLabel = '';
        targetScale = 1;
      }
    };

    const scheduleLoop = () => {
      if (!rafId && !document.hidden) {
        lastFrameTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const applyCursorModeVisuals = () => {
      if (!outerRingRef.current || !innerDotRef.current || !labelRef.current) return;

      const outer = outerRingRef.current;
      const inner = innerDotRef.current;
      const label = labelRef.current;

      outer.dataset.mode = activeCursorMode;
      outer.dataset.pressed = String(isPressed);
      inner.dataset.mode = activeCursorMode;
      inner.dataset.pressed = String(isPressed);

      if (currentLabel && isVisible && !isPressed) {
        if (label.textContent !== currentLabel) label.textContent = currentLabel;
        label.style.opacity = '1';
        label.style.transform = `translate3d(${(ringX + 20).toFixed(1)}px, ${(ringY + 20).toFixed(1)}px, 0) scale(1)`;
      } else {
        label.style.opacity = '0';
        label.style.transform = `translate3d(${(ringX + 16).toFixed(1)}px, ${(ringY + 16).toFixed(1)}px, 0) scale(0.85)`;
      }
    };

    const tick = (now: number) => {
      rafId = 0;
      const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      dotX += (targetX - dotX) * 0.85;
      dotY += (targetY - dotY) * 0.85;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      const pressedMul = isPressed ? 0.78 : 1;
      currentScale += (targetScale * pressedMul - currentScale) * 0.22;

      if (containerRef.current) {
        containerRef.current.style.opacity = isVisible ? '1' : '0';
      }
      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(${(ringX - 160).toFixed(1)}px, ${(ringY - 160).toFixed(1)}px, 0)`;
      }
      if (innerDotRef.current) {
        innerDotRef.current.style.transform = `translate3d(${(dotX - 5).toFixed(1)}px, ${(dotY - 5).toFixed(1)}px, 0)`;
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `translate3d(${(ringX - 18).toFixed(1)}px, ${(ringY - 18).toFixed(1)}px, 0) scale(${currentScale.toFixed(3)})`;
      }

      applyCursorModeVisuals();

      // Update distance particle trail canvas
      let stillAlive = false;
      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (hasActiveParticles) {
          for (let i = 0; i < POOL_SIZE; i++) {
            const p = pool[i];
            if (p.life < p.maxLife) {
              p.life += dt;
              if (p.life >= p.maxLife) continue;
              stillAlive = true;
              const progress = p.life / p.maxLife;
              p.x += p.vx;
              p.y += p.vy;
              const a = (1 - progress) * p.alpha;
              ctx.globalAlpha = a;
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * (1 - progress * 0.45), 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.globalAlpha = 1;
          hasActiveParticles = stillAlive;
        }
      }

      const unsettled =
        Math.abs(targetX - ringX) > 0.2 ||
        Math.abs(targetY - ringY) > 0.2 ||
        Math.abs(targetScale * pressedMul - currentScale) > 0.01 ||
        hasActiveParticles;

      if (unsettled && !document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') {
        return;
      }
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dotX = targetX;
        dotY = targetY;
        ringX = targetX;
        ringY = targetY;
        lastEmitX = targetX;
        lastEmitY = targetY;
      }

      if (!classApplied) {
        document.documentElement.classList.add('kairos-custom-cursor');
        classApplied = true;
      }

      // Distance-based particle emissions per segment (consistent spacing across gesture speeds)
      const dx = targetX - lastEmitX;
      const dy = targetY - lastEmitY;
      const dist = Math.hypot(dx, dy);
      if (dist >= 14) {
        const count = Math.min(6, Math.floor(dist / 14));
        for (let i = 1; i <= count; i++) {
          const t = i / count;
          spawnParticle(lastEmitX + dx * t, lastEmitY + dy * t);
        }
        lastEmitX = targetX;
        lastEmitY = targetY;
      }

      resolveTargetContext(e.target);
      scheduleLoop();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      isPressed = true;
      for (let i = 0; i < 8; i++) {
        spawnParticle(e.clientX, e.clientY);
      }
      if (rippleRef.current) {
        const rip = rippleRef.current;
        rip.style.left = `${e.clientX}px`;
        rip.style.top = `${e.clientY}px`;
        rip.classList.remove('kairos-cursor-ripple-active');
        // Force style restart for crisp consecutive click bursts
        void rip.offsetWidth;
        rip.classList.add('kairos-cursor-ripple-active');
      }
      scheduleLoop();
    };

    const handlePointerUp = () => {
      isPressed = false;
      scheduleLoop();
    };

    const handlePointerLeave = () => {
      isVisible = false;
      document.documentElement.classList.remove('kairos-custom-cursor');
      classApplied = false;
      scheduleLoop();
    };

    const handleVisibilityChange = () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const handleWindowScroll = () => {
      if (!isVisible || targetX < 0 || targetY < 0) return;
      resolveTargetContext(document.elementFromPoint(targetX, targetY));
      scheduleLoop();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.documentElement.classList.remove('kairos-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', handleWindowScroll);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0 transition-opacity duration-200 hidden md:block"
    >
      {/* Distance-emitted quantum plasma trail canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Subtle Ambient Magnetic Luminescence */}
      <div
        ref={ambientRef}
        className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-[0.14] blur-3xl will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(238, 5, 242, 0.5) 0%, rgba(118, 48, 217, 0.25) 45%, transparent 72%)',
        }}
      />

      {/* Click Pulse Shockwave */}
      <div
        ref={rippleRef}
        className="kairos-cursor-ripple"
      />

      {/* Spring-Lerped Chrono-Reticle Outer Ring */}
      <div
        ref={outerRingRef}
        data-mode="default"
        data-pressed="false"
        className="kairos-cursor-ring"
      >
        <span className="kairos-cursor-tick kairos-tick-n" />
        <span className="kairos-cursor-tick kairos-tick-s" />
        <span className="kairos-cursor-tick kairos-tick-e" />
        <span className="kairos-cursor-tick kairos-tick-w" />
      </div>

      {/* Zero-Lag Plasma Center Dot */}
      <div
        ref={innerDotRef}
        data-mode="default"
        data-pressed="false"
        className="kairos-cursor-dot"
      />

      {/* Context-Aware Micro-Label Pill */}
      <div
        ref={labelRef}
        className="kairos-cursor-label"
      />
    </div>
  );
}
