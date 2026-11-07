'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT_SCHEDULE } from '@/lib/config';
import { Calendar, Clock, Download, CheckCircle, AlertCircle, Shield, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export const ScheduleSection: React.FC = () => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0); // Day 1 default
  const activeDay = EVENT_SCHEDULE[selectedDayIdx];

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'HACK LIVE':
      case 'DEADLINE':
        return 'bg-purple-950/60 text-purple-300 border-purple-500/40';
      case 'EVALUATION':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'MEALS':
      case 'ENERGY DROP':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'CEREMONY':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'SECURITY':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="schedule" className="relative py-24 lg:py-32 overflow-hidden bg-aws-canvas">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-950/40 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-aws-squidInk/90 border border-purple-500/30 shadow-md backdrop-blur-md">
              <div className="relative w-5 h-5 rounded overflow-hidden">
                <Image
                  src="/assets/schedule.png"
                  alt="Schedule"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Interactive 48-Hour Participant Agenda</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              The 48-Hour <span className="gradient-text-kairos">Experience</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Every milestone calibrated in Indian Standard Time (IST). Continuous coding, 3 table-side architecture checkpoints, AWS clinic walkabouts, and fully catered meals.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.25}>
            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href="/api/calendar"
                download="KAIROS_2027_Schedule.ics"
                onClick={() => sound?.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-aws-squidInk hover:bg-slate-800 border border-purple-500/30 text-purple-300 transition-all shadow-md group"
              >
                <Download className="w-3.5 h-3.5 text-purple-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Add to Apple / Google / Outlook Calendar (.ics)</span>
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Day Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto">
          {EVENT_SCHEDULE.map((day, idx) => {
            const isActive = idx === selectedDayIdx;
            return (
              <button
                key={day.day}
                onClick={() => {
                  sound?.playClick();
                  setSelectedDayIdx(idx);
                }}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 relative select-none ${
                  isActive
                    ? 'bg-aws-squidInk border-2 border-purple-500 shadow-xl shadow-purple-900/30 scale-[1.02]'
                    : 'bg-aws-card/80 border border-slate-700/60 hover:border-purple-500/40 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-purple-400 block uppercase font-bold tracking-wider">
                    DAY {day.day}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 text-slate-400 border border-white/5">
                    {day.tag}
                  </span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white block">
                  {day.dayName.split(':')[1]?.trim() || day.dayName}
                </span>
                <span className="text-xs text-slate-400 block truncate mt-0.5">
                  {day.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Event Journey Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.day}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Timeline Progress Bar / Header Banner */}
            <div className="p-4 rounded-2xl bg-aws-card/60 border border-purple-500/20 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-200">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white">{activeDay.dayName}</span>
                <span className="text-slate-500">•</span>
                <span className="text-purple-300">{activeDay.title}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{activeDay.events.length} Calibrated Milestones</span>
              </div>
            </div>

            {/* Horizontal Timeline Track */}
            <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
              <div className="flex gap-4 min-w-max">
                {activeDay.events.map((milestone, idx) => {
                  const badgeClass = getCategoryBadgeClass(milestone.category);
                  const isCheckpoint = milestone.title.toLowerCase().includes('checkpoint');
                  const isFreeze = milestone.title.toLowerCase().includes('freeze') || milestone.title.toLowerCase().includes('commences');

                  return (
                    <SpotlightCard
                      key={idx}
                      enableTilt={true}
                      maxTilt={5}
                      spotlightColor="rgba(238, 5, 242, 0.15)"
                      borderColor={isFreeze ? 'rgba(238, 5, 242, 0.5)' : isCheckpoint ? 'rgba(118, 48, 217, 0.4)' : 'rgba(255, 255, 255, 0.1)'}
                      className={`w-[290px] sm:w-[320px] p-5 rounded-2xl border transition-all flex flex-col justify-between shrink-0 ${
                        isFreeze
                          ? 'bg-gradient-to-b from-purple-950/60 to-slate-950 border-purple-500/50 shadow-lg shadow-purple-900/30'
                          : isCheckpoint
                          ? 'bg-aws-card/90 border-purple-500/30'
                          : 'bg-aws-card/70 border-slate-700/60'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            <span>{milestone.time}</span>
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase font-semibold ${badgeClass}`}>
                            {milestone.category}
                          </span>
                        </div>

                        <h4 className="text-base font-display font-bold text-white leading-snug">
                          {milestone.title}
                        </h4>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {milestone.desc}
                        </p>
                      </div>

                      <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Milestone 0{idx + 1}</span>
                        {isCheckpoint && (
                          <span className="text-purple-300 font-bold flex items-center gap-1">
                            <Shield className="w-3 h-3 text-purple-400" />
                            Scored Checkpoint
                          </span>
                        )}
                        {isFreeze && (
                          <span className="text-purple-300 font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-purple-400" />
                            Critical Milestone
                          </span>
                        )}
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
