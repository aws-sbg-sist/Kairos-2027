'use client';

import React from 'react';
import { ORGANIZING_ROSTER, FACULTY_LEADERSHIP } from '@/lib/config';
import { Users, GraduationCap, ShieldCheck, Clock } from 'lucide-react';

export const CommitteeSection: React.FC = () => {
  return (
    <section id="committee" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-bg/40">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-950/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Leadership & Governance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Organizing <span className="gradient-text-kairos">Cadre</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Led by the AWS Student Builder Group (SIST Chapter) under the Department of Computer Science & Engineering, School of Computing.
          </p>
        </div>

        {/* Faculty Leadership Row */}
        <div className="mb-14">
          <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mb-6 flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>Academic & Institutional Guidance</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {FACULTY_LEADERSHIP.map((fac, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-purple-500/20 text-center space-y-2 hover:border-purple-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-purple-900/40 text-purple-300 mx-auto flex items-center justify-center border border-purple-500/30 font-display font-bold text-lg">
                  {fac.name.split(' ')[1]?.[0] || 'D'}
                </div>
                <h4 className="text-base font-display font-bold text-white">
                  {fac.name}
                </h4>
                <div className="text-xs font-mono text-purple-300">
                  {fac.role}
                </div>
                <p className="text-[11px] text-slate-400">
                  {fac.department}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Student Organizing Leads (From Proposal) */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold mb-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Core AWS SBG Committee Leads</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {ORGANIZING_ROSTER.map((lead) => (
              <div
                key={lead.id}
                className="p-5 rounded-xl glass-panel border border-purple-500/15 hover:border-purple-500/35 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/20">
                    {lead.department}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Lead
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {lead.name}
                </h4>
                <p className="text-xs text-slate-300 leading-snug">
                  {lead.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Mentors & Judges Announcement State (Complying with Master Prompt Rule) */}
        <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl glass-panel-glow border border-purple-500/25 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-900/40 text-purple-300 mx-auto flex items-center justify-center border border-purple-500/30">
            <Clock className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            Grand Jury & Industry Mentors
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Distinguished cloud architects, AI researchers, and engineering leaders from across India are currently undergoing confirmation. The full panel will be unveiled in upcoming announcements.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>Jury Panel Announcements Coming Soon</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
