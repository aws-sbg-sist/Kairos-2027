'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EVENT_SCHEDULE } from '@/lib/config';
import { Calendar, Clock, Download, CheckCircle, AlertCircle, Shield } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0); // Day 1 default

  const activeDay = EVENT_SCHEDULE[selectedDayIdx];

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'HACK LIVE':
      case 'DEADLINE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
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
    <section id="schedule" className="relative py-20 lg:py-28 overflow-hidden bg-aws-canvas">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-aws-orange/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30 shadow-md">
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
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            The 48-Hour <span className="gradient-text-kairos">Experience</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Every milestone calibrated in Indian Standard Time (IST). Continuous coding, 3 table-side architecture checkpoints, AWS clinic walkabouts, and fully catered meals.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="/api/calendar"
              download="KAIROS_2027_Schedule.ics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-aws-squidInk hover:bg-slate-800 border border-aws-orange/30 text-amber-300 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-aws-orange" />
              <span>Add to Apple / Google / Outlook Calendar (.ics)</span>
            </a>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10 max-w-4xl mx-auto">
          {EVENT_SCHEDULE.map((day, idx) => {
            const isActive = idx === selectedDayIdx;
            return (
              <button
                key={day.day}
                onClick={() => setSelectedDayIdx(idx)}
                className={`p-4 rounded-2xl text-left transition-all ${
                  isActive
                    ? 'bg-aws-squidInk border-2 border-aws-orange shadow-lg shadow-aws-orange/20 scale-[1.02]'
                    : 'bg-aws-card border border-slate-700/60 hover:border-aws-orange/40 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-aws-orange block uppercase font-bold">
                    DAY {day.day}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {day.tag}
                  </span>
                </div>
                <span className="text-sm font-bold text-white block">
                  {day.dayName.split(':')[1]?.trim() || day.dayName}
                </span>
                <span className="text-xs text-slate-300 block truncate mt-0.5">
                  {day.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Event List */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-2">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-aws-orange/30 p-1.5 shrink-0 shadow-md">
                <Image
                  src="/assets/time.png"
                  alt="Schedule Time Matrix"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-mono text-aws-orange font-semibold uppercase tracking-wider">
                  {activeDay.dayName}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                  {activeDay.title}
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-medium text-amber-300 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 self-start sm:self-auto">
              {activeDay.tag}
            </span>
          </div>

          <div className="space-y-6 relative before:absolute before:left-3.5 sm:before:left-[118px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-aws-orange/50 before:via-sky-500/30 before:to-transparent">
            {activeDay.events.map((ev, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 relative group p-3.5 rounded-xl transition-all ${
                  ev.highlight
                    ? 'bg-aws-squidInk border border-aws-orange/40 shadow-md shadow-aws-orange/10'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Time Indicator */}
                <div className="sm:w-28 flex-shrink-0 text-left sm:text-right pl-8 sm:pl-0">
                  <span className="text-xs font-mono font-bold text-amber-300 block">
                    {ev.time.split('–')[0]}
                  </span>
                  {ev.time.includes('–') && (
                    <span className="text-[10px] font-mono text-slate-400 block">
                      to {ev.time.split('–')[1]}
                    </span>
                  )}
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-2.5 sm:left-[113px] top-4.5 sm:top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-aws-orange border-2 border-slate-950 shadow-[0_0_8px_#ff9900] group-hover:scale-125 transition-transform" />

                {/* Event Card Content */}
                <div className="flex-grow pl-8 sm:pl-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider ${getCategoryBadgeClass(ev.category)}`}>
                      {ev.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {ev.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
