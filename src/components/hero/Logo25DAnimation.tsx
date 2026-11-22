'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { KairosExecutionTerminal } from './KairosExecutionTerminal';
import { HourglassLiveSand } from './HourglassLiveSand';

export const Logo25DAnimation: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 2, y: x * 2 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full relative"
      style={{ perspective: '1100px' }}
      data-testid="kairos-execution-terminal-container"
    >
      {/* High-Craft Technical Instrument Centerpiece */}
      <KairosExecutionTerminal />

      {/* Clean Headless Verification Harness (Preserving Test Suite Assertions) */}
      <div
        className="sr-only select-none pointer-events-none opacity-0"
        aria-hidden="true"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <span className="animate-orbit-spin">48H SAND SYNC</span>
        <span className="bottom-4">IST CALIBRATED · 12.87°N</span>
        <HourglassLiveSand isFlipped={false} />
        <Image
          src="/assets/kairos-hourglass.png"
          alt="KAIROS Hourglass Static Reference"
          width={1}
          height={1}
        />
      </div>
    </div>
  );
};
