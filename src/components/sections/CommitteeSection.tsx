'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HIGHER_MANAGEMENT } from '@/lib/config';
import { Users, GraduationCap, ShieldCheck, Award, ArrowRight, ExternalLink } from 'lucide-react';

export const CommitteeSection: React.FC = () => {
  const apex = HIGHER_MANAGEMENT.apexLeader;
  const faculty = HIGHER_MANAGEMENT.facultyCoordinators;
  const superHeads = HIGHER_MANAGEMENT.superHeads;

  return (
    <section id="committee" className="relative py-20 lg:py-28 overflow-hidden bg-aws-canvas">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-aws-orange/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30 shadow-md">
            <div className="relative w-5 h-5 rounded overflow-hidden">
              <Image
                src="/assets/mentors.png"
                alt="Mentors & Leadership"
                fill
                className="object-contain"
              />
            </div>
            <span>AWS SBGL Governance • Batch of 2026–2027</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Higher Management & <span className="gradient-text-kairos">Leadership</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Governed by the AWS Student Builder Group (SIST Chapter) under the Department of Computer Science & Engineering, School of Computing.
          </p>
        </div>

        {/* Apex President Showcase */}
        <div className="max-w-4xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-aws-squidInk to-slate-950 border-2 border-aws-orange/40 shadow-xl shadow-aws-orange/10">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-aws-orange/20 border-2 border-aws-orange text-aws-orange flex items-center justify-center font-display font-black text-3xl shadow-lg flex-shrink-0">
              TT
            </div>
            <div className="space-y-2 text-center md:text-left flex-grow">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-aws-orange text-slate-950">
                  APEX LEADER
                </span>
                <span className="text-xs font-mono text-slate-300">
                  Reg No: {apex.registerNo}
                </span>
                <span className="text-xs font-mono text-amber-300">
                  AWS Solutions Architect – Associate
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                {apex.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-300 font-semibold font-mono">
                {apex.role} · {apex.chapter}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 italic pt-1">
                "{apex.quote}"
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/members/thenappan-t"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/15 flex items-center gap-1.5 transition-colors"
              >
                <span>View Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Faculty Leadership & Institutional Patrons */}
        <div className="mb-14">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-6 flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4 text-aws-orange" />
            <span>Faculty Coordinators & Institutional Leadership</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {faculty.map((fac, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-aws-card border border-slate-700/60 text-center space-y-2 hover:border-aws-orange/40 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-aws-blue/20 text-sky-400 mx-auto flex items-center justify-center border border-aws-blue/30 font-display font-bold text-sm">
                  {fac.name.split(' ')[1]?.[0] || 'D'}
                </div>
                <h4 className="text-sm font-display font-bold text-white">
                  {fac.name}
                </h4>
                <div className="text-xs font-mono text-amber-300">
                  {fac.role}
                </div>
                <p className="text-[11px] text-slate-300">
                  {fac.department}
                </p>
              </div>
            ))}
            <div className="p-5 rounded-2xl bg-aws-card border border-slate-700/60 text-center space-y-2 hover:border-aws-orange/40 transition-all">
              <div className="w-10 h-10 rounded-full bg-purple-900/40 text-purple-300 mx-auto flex items-center justify-center border border-purple-500/30 font-display font-bold text-sm">
                L
              </div>
              <h4 className="text-sm font-display font-bold text-white">
                Dr. L. Lakshmanan
              </h4>
              <div className="text-xs font-mono text-amber-300">
                Dean, School of Computing
              </div>
              <p className="text-[11px] text-slate-300">
                Sathyabama Institute of Science and Technology
              </p>
            </div>
          </div>
        </div>

        {/* The 6 Super Heads Gallery Preview */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-aws-orange" />
            <span>The 6 Super Heads — Operational Directorate</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {superHeads.map((head) => (
              <div
                key={head.code}
                className="p-5 rounded-xl bg-aws-card border border-slate-700/60 hover:border-aws-orange/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-aws-orange px-2 py-0.5 rounded bg-aws-orange/10 border border-aws-orange/20 font-bold">
                    {head.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-300">
                    Reg: {head.registerNo}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  {head.leadName}
                </h4>
                <p className="text-xs text-amber-300 font-medium leading-snug">
                  {head.title}
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  {head.mandate}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/members/leadership"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 shadow-md shadow-aws-orange/20"
            >
              <Award className="w-4 h-4" />
              <span>Explore Higher Management Gallery & Full Mandates</span>
            </Link>
            <Link
              href="/members"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors inline-flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>View All 106 Student Organizers & Volunteers</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
