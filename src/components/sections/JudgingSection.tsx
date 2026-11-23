'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { JUDGING_CRITERIA } from '@/lib/config';
import { Scale, CheckSquare, Eye, Lock, Play, RotateCcw, Cpu, Sparkles, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { sound } from '@/lib/audio';

export const JudgingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const [simulationActive, setSimulationActive] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  // Simulated target weights for each rubric during the calibration sweep
  const targetWeights = [30, 25, 25, 20];

  useEffect(() => {
    if (isInView && !hasScanned) {
      setSimulationActive(true);
      setHasScanned(true);
      const timer = setTimeout(() => {
        setSimulationActive(false);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasScanned]);

  const handleTriggerManualSweep = () => {
    sound?.playClick();
    setSimulationActive(true);
    setTimeout(() => {
      sound?.playSuccess?.();
      setSimulationActive(false);
    }, 2200);
  };

  return (
    <section id="judging" className="relative py-16 lg:py-24 overflow-hidden bg-kairos-bg/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/judges.png"
                  alt="Jury Evaluation"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Merit-Driven Evaluation • Confidential Scoring Weights</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Official <span className="gradient-text-kairos">Judging Rubrics</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Rigorous, uncompromised evaluation pillars designed to reward authentic software craftsmanship, architecture scalability, and user empathy. Exact scoring weights and point distributions are kept sealed under jury embargo until officially unveiled at kickoff.
            </p>
          </ScrollReveal>

          {/* Interactive Scroll-Triggered Demo Control (Animation #9) */}
          <ScrollReveal direction="up" distance={16} delay={0.25}>
            <div className="pt-2 flex items-center justify-center">
              <button
                onClick={handleTriggerManualSweep}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-purple-950/70 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 hover:text-white transition-all shadow-md group active:scale-95 cursor-pointer"
                title="Trigger simulated live jury calibration telemetry"
              >
                <Cpu className={`w-3.5 h-3.5 text-purple-400 ${simulationActive ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`} />
                <span>
                  {simulationActive ? 'Running Jury Calibration Telemetry...' : 'Interactive Rubric Calibration Demo'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-800/80 text-purple-200 border border-purple-400/30">
                  {simulationActive ? 'ACTIVE' : 'REPLAY'}
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Rubric Cards with Mystery/Suspense Points & Scroll-Triggered Scanner */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {JUDGING_CRITERIA.map((criterion, idx) => {
            const isScanning = simulationActive;

            return (
              <ScrollReveal
                key={idx}
                direction="up"
                distance={20}
                delay={idx * 0.08}
                className="h-full"
              >
                <SpotlightCard
                  enableTilt={true}
                  maxTilt={6}
                  spotlightColor={isScanning ? 'rgba(255, 153, 0, 0.25)' : 'rgba(118, 48, 217, 0.2)'}
                  borderColor={isScanning ? 'rgba(255, 153, 0, 0.5)' : 'rgba(118, 48, 217, 0.4)'}
                  className="p-6 rounded-2xl glass-panel border border-purple-500/20 hover:border-purple-500/40 transition-colors flex flex-col justify-between space-y-5 group h-full hover:shadow-xl hover:shadow-purple-950/30"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-purple-400 font-bold">
                        CRITERION 0{idx + 1}
                      </span>

                      {/* Mystery Points Badge with Telemetry Animation */}
                      <motion.div
                        animate={
                          isScanning
                            ? {
                                scale: [1, 1.08, 1],
                                borderColor: ['rgba(168, 85, 247, 0.4)', 'rgba(249, 115, 22, 0.8)', 'rgba(168, 85, 247, 0.4)'],
                              }
                            : {}
                        }
                        transition={{ duration: 1.2, repeat: isScanning ? 1 : 0 }}
                        onMouseEnter={() => sound?.playHover()}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-950/90 text-purple-200 border border-purple-500/40 shadow-sm backdrop-blur-md group-hover:border-purple-500/50 group-hover:text-white transition-colors cursor-help"
                        title="Exact point weight is sealed under jury embargo until kickoff."
                      >
                        <Lock className={`w-3 h-3 ${isScanning ? 'text-aws-orange animate-spin' : 'text-purple-400 animate-pulse'}`} />
                        <span>{isScanning ? `~${targetWeights[idx]}%` : '?? PTS'}</span>
                        <span className="text-[10px] text-purple-300 font-semibold">
                          {isScanning ? 'TESTING' : 'Classified'}
                        </span>
                      </motion.div>
                    </div>

                    <h3 className="text-lg font-display font-bold text-white group-hover:text-purple-400 transition-colors">
                      {criterion.category}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {criterion.description}
                    </p>
                  </div>

                  {/* Scroll-Triggered Animated Scanner Bar */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="w-full h-1.5 rounded-full bg-slate-900/90 overflow-hidden relative border border-white/5">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{
                          width: isInView || isScanning || hasScanned ? `${targetWeights[idx]}%` : '0%',
                        }}
                        transition={{
                          duration: 1.4,
                          delay: idx * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-full rounded-full ${
                          isScanning
                            ? 'bg-gradient-to-r from-purple-500 via-aws-orange to-amber-400'
                            : 'bg-gradient-to-r from-purple-500/30 via-aws-orange/80 to-purple-500/30'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                      <span className="flex items-center gap-1 text-slate-400">
                        <Lock className="w-3 h-3 text-purple-400" />
                        <span>Weight Sealed</span>
                      </span>
                      <span className="text-purple-300 font-medium">
                        {isScanning ? `Calibrating ~${targetWeights[idx]}%` : 'Reveals at Kickoff'}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Evaluation Ethics & Checkpoints Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ScrollReveal direction="up" distance={16} delay={0.2} className="h-full">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2 h-full">
              <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                <Scale className="w-4 h-4 text-purple-400" />
                <span>Z-Score Normalization</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Raw scores across judges are mathematically adjusted using statistical Z-scores to completely eliminate individual judge bias or lenient/strict variances.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.3} className="h-full">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2 h-full">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>3 Mandatory Checkpoints</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Table-side progress checks at Hour 10, Hour 24, and Hour 36 ensure all code is authored live in the stadium, verifying organic commits.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.4} className="h-full">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-2 h-full">
              <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm">
                <Eye className="w-4 h-4 text-sky-400" />
                <span>Grand Stage Defense</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The Top 20 teams present their live running deployment on the main auditorium stage before enterprise leaders, alumni, and peers.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
