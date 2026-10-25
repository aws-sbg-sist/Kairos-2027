'use client';

import React, { useState } from 'react';
import { EVENT_SCHEDULE } from '@/lib/config';
import { Calendar, Clock, Download, CheckCircle, AlertCircle } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(1); // Default to Day 1 (Friday kickoff)

  const activeDay = EVENT_SCHEDULE[selectedDayIdx];

  return (
    <section id="schedule" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-darkest">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-purple-950/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>48-Hour Competition Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            The 48-Hour <span className="gradient-text-kairos">Experience</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Every milestone calibrated in Indian Standard Time (IST). Designed for sustained peak engineering, structured mentorship, and healthy rest rotations.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="/api/calendar"
              download="KAIROS_2027_Schedule.ics"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-900/40 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-purple-300" />
              <span>Add to Apple / Google / Outlook Calendar (.ics)</span>
            </a>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-10 max-w-4xl mx-auto">
          {EVENT_SCHEDULE.map((day, idx) => {
            const isActive = idx === selectedDayIdx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDayIdx(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-purple-900/60 to-slate-900 border-2 border-purple-500/80 shadow-lg shadow-purple-950/60 scale-[1.02]'
                    : 'glass-panel hover:bg-slate-900/80'
                }`}
              >
                <span className="text-[10px] font-mono text-purple-400 block uppercase font-bold">
                  {day.badge}
                </span>
                <span className="text-sm font-bold text-white block mt-0.5">
                  {day.day.split('·')[0].trim()}
                </span>
                <span className="text-xs text-slate-400 block truncate">
                  {day.day.split('·')[1]?.trim() || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Event List */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl glass-panel border border-purple-500/20 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-purple-500/15 gap-2">
            <div>
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase">{activeDay.badge}</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                {activeDay.day}
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-400 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 self-start sm:self-auto">
              {activeDay.label}
            </span>
          </div>

          <div className="space-y-6 relative before:absolute before:left-3.5 sm:before:left-[108px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-purple-500/40 before:via-sky-500/30 before:to-transparent">
            {activeDay.events.map((ev, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 relative group p-3 rounded-xl transition-all ${
                  ev.highlight
                    ? 'bg-purple-950/40 border border-purple-500/40 shadow-md shadow-purple-950/50'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Time Indicator */}
                <div className="sm:w-24 flex-shrink-0 text-left sm:text-right pl-8 sm:pl-0">
                  <span className="text-xs font-mono font-semibold text-purple-300 block">
                    {ev.time.split('–')[0].trim()}
                  </span>
                  {ev.time.includes('–') && (
                    <span className="text-[10px] font-mono text-slate-400 block">
                      to {ev.time.split('–')[1].trim()}
                    </span>
                  )}
                </div>

                {/* Node Dot on Timeline Line */}
                <div className={`absolute left-2.5 sm:left-[103px] w-3 h-3 rounded-full flex-shrink-0 border-2 ${
                  ev.highlight
                    ? 'bg-purple-400 border-white shadow-[0_0_10px_#a855f7]'
                    : 'bg-slate-900 border-purple-500/60 group-hover:border-purple-300'
                }`} />

                {/* Event Details */}
                <div className="flex-grow pl-8 sm:pl-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-base font-bold ${ev.highlight ? 'text-white' : 'text-slate-200'}`}>
                      {ev.title}
                    </h4>
                    {ev.highlight && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-800 text-purple-200">
                        KEY ANCHOR
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {ev.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Welfare & Sleep Rotation Ethos Callout */}
        <div className="max-w-4xl mx-auto mt-8 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-purple-500/20 flex items-start gap-3.5 text-xs text-slate-300">
          <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white">Builder Health & Welfare Standard:</strong> While the competition clock runs without interruption for 48 hours, student builders are explicitly empowered to rotate sleep and rest shifts without penalty. On-campus supervised quiet resting quarters, hot showers, and medical response teams are on standby 24/7.
          </div>
        </div>
      </div>
    </section>
  );
};
