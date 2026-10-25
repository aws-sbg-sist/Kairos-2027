'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  GitCommit, 
  Users, 
  Lock, 
  Scale, 
  AlertTriangle, 
  HeartHandshake, 
  FileCode, 
  Clock, 
  CheckCircle2, 
  FileText,
  Building
} from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 pt-28 pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[500px] bg-gradient-to-b from-[#0073BB]/10 via-[#FF9900]/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200">Home</Link>
          <span>/</span>
          <span className="text-[#FF9900] font-mono">Rules & Governance</span>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono font-bold tracking-wider uppercase mb-5 shadow-md">
            <div className="relative w-4 h-4 rounded overflow-hidden">
              <Image
                src="/assets/rules.png"
                alt="Governance Rules"
                fill
                className="object-contain"
              />
            </div>
            <span>Official Governance & Participant Charter</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
            Hackathon Rules, Code Integrity & <br />
            <span className="bg-gradient-to-r from-[#FF9900] via-amber-300 to-[#0073BB] bg-clip-text text-transparent">
              100% Student IP Ownership
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            KAIROS 2027 operates on uncompromising standards of technical merit, hacker safety, and absolute student ownership. Review our full governance framework below.
          </p>
        </div>

        {/* 100% IP Ownership Highlight Callout */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border-2 border-[#FF9900]/40 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="p-3 rounded-2xl bg-[#FF9900]/20 text-[#FF9900] border border-[#FF9900]/40 shrink-0 relative w-16 h-16 flex items-center justify-center">
                <Image
                  src="/assets/rules.png"
                  alt="Student IP Protection Charter"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FF9900]/20 text-[#FF9900] uppercase tracking-wider">
                  Universal IP Guarantee
                </span>
                <h3 className="text-2xl font-black text-white mt-2 mb-2">
                  You Own 100% of Your Code, Blueprints & Inventions
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {EVENT_CONFIG.disclaimer.ip} Neither AWS Student Builder Group SIST, Sathyabama Institute of Science and Technology, nor any corporate sponsor holds any equity claim, licensing stake, or intellectual property rights over code developed during the hackathon.
                </p>
              </div>
            </div>
            <div className="shrink-0 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center font-mono">
              <div className="text-3xl font-black text-[#10B981]">0%</div>
              <div className="text-xs text-slate-400">Equity Claimed</div>
            </div>
          </div>
        </div>

        {/* Comprehensive Rules Sections */}
        <div className="space-y-12 mb-20">

          {/* Rule 1: Fresh Code & Commit Telemetry */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#0073BB]/15 text-[#0073BB]">
                <GitCommit className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">1. Fresh Code Standard & Real-Time Commit Telemetry</h2>
                <p className="text-xs text-slate-400">Enforcing genuine engineering inside the 48-hour clock</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>Hacking Window:</strong> The official 48-hour sprint commences at <strong>12:15 PM IST on Friday, January 22, 2027</strong> and terminates strictly at <strong>08:30 AM IST on Sunday, January 24, 2027 (Hard Code Freeze)</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
                  <div className="font-bold text-emerald-400 uppercase font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Permitted & Encouraged
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>Public open-source libraries, frameworks (React, Next.js, PyTorch)</li>
                    <li>Official AWS SDKs and foundation models via Amazon Bedrock</li>
                    <li>Pre-trained open weights (Llama 3, Mistral, Whisper)</li>
                    <li>Public boilerplate generators initialized after the starting bell</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-2">
                  <div className="font-bold text-rose-400 uppercase font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Strictly Prohibited & Disqualifying
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>Pre-written proprietary business logic authored before the event</li>
                    <li>Finished applications with cosmetic frontend changes</li>
                    <li>Commits pushed after the 08:30 AM Sunday hard freeze</li>
                    <li>Plagiarized codebases or clone wrappers with zero novel logic</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                * Note: All finalist repositories are registered with the Kairos Webhook Telemetry Engine. Diffs, commit frequency, and author signatures are monitored by our technical audit committee.
              </p>
            </div>
          </div>

          {/* Rule 2: Eligibility & Dual Registration */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#FF9900]/15 text-[#FF9900]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">2. Team Formation, Dual Registration & Zero Fees</h2>
                <p className="text-xs text-slate-400">Merit-based admission with mandatory AWS SBGL community compliance</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">Roster Size</div>
                  <div className="text-lg font-bold text-white">4 to 6 Builders</div>
                  <div className="text-[11px] text-slate-400 mt-1">Cross-institutional teams permitted</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">Entry Fee</div>
                  <div className="text-lg font-bold text-[#10B981]">₹0 (100% Free)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Meals, stay, swag & transit free</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">AWS Verification</div>
                  <div className="text-lg font-bold text-[#FF9900]">Meetup RSVP</div>
                  <div className="text-[11px] text-slate-400 mt-1">SIST chapter verification mandatory</div>
                </div>
              </div>

              <p>
                <strong>College Identification:</strong> Every team member must present a valid physical college ID card issued by their accredited institution during red-carpet check-in on Friday, January 22, 2027.
              </p>
              <p>
                <strong>Dual Registration Protocol:</strong> Every team leader and member must RSVP on the official <Link href="https://meetup.com/aws-student-builder-group-sist" target="_blank" className="text-[#FF9900] underline font-semibold">AWS Student Builder Group SIST Meetup</Link> page. This ensures compliance with global AWS Student Builder Group community tracking standards.
              </p>
            </div>
          </div>

          {/* Rule 3: Night Lock-in, Safety & Medical Welfare */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/15 text-purple-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">3. Campus Night Lock-In & Welfare Protocol</h2>
                <p className="text-xs text-slate-400">Comprehensive safety and security standards during the 48-hour stay</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>10:00 PM Night Lock-In:</strong> To guarantee absolute security, all campus perimeter access gates are secured at 10:00 PM each night. No unauthorized entry or exit is permitted between 10:00 PM and 06:00 AM without express authorization from President Thenappan T and Institutional Security.
              </p>
              <p>
                <strong>Rest Facilities:</strong> Dedicated, segregated air-conditioned resting bays for male and female participants are maintained with continuous student volunteer marshals and 24/7 security escorts.
              </p>
              <p>
                <strong>Medical Emergency:</strong> Sathyabama Hospital and on-campus 24/7 medical ambulances are stationed on site with paramedics and doctor supervision throughout the 48-hour event.
              </p>
            </div>
          </div>

          {/* Rule 4: Judging Ethics & Recusal */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#10B981]/15 text-[#10B981]">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">4. Objective Evaluation & Mathematical Z-Score Normalization</h2>
                <p className="text-xs text-slate-400">Eliminating judge bias, favoritism, and subjective variances</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>Multi-Checkpoint Rubric:</strong> Evaluation is conducted across 3 rigorous gates:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
                <li>Checkpoint 1: Architecture & Feasibility Gate (Friday 04:00 PM – 25 Pts)</li>
                <li>Checkpoint 2: Mid-Point Prototype & Security Audit (Saturday 11:30 AM – 35 Pts)</li>
                <li>Checkpoint 3: Final Code Review & Working Demo (Saturday 09:30 PM – 40 Pts)</li>
              </ul>
              <p>
                <strong>Gaussian Normalization:</strong> Scores across all 25+ industry evaluators are normalized using standard Gaussian Z-scores (<span className="font-mono text-white">Z = (X - μ) / σ</span>) to eliminate deviations between lenient and strict judges.
              </p>
              <p>
                <strong>Conflict of Interest Recusal:</strong> Any judge who shares an institutional affiliation, mentor relationship, or personal connection with a team is required to declare a recusal, whereupon an independent evaluator evaluates that team.
              </p>
            </div>
          </div>

          {/* Rule 5: Code of Conduct & Anti-Harassment */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-rose-500/15 text-rose-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">5. Anti-Harassment & Professional Code of Conduct</h2>
                <p className="text-xs text-slate-400">Fostering a welcoming, inclusive, and high-performance environment</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                KAIROS 2027 is dedicated to providing a harassment-free experience for everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion.
              </p>
              <p>
                Harassment includes offensive verbal comments, deliberate intimidation, stalking, following, harassing photography or recording, sustained disruption of talks or checkpoint reviews, inappropriate physical contact, and unwelcome sexual attention.
              </p>
              <p className="text-xs text-slate-400">
                Participants asked to stop any harassing behavior are expected to comply immediately. Violators are subject to immediate expulsion from the hackathon and disqualification of their entire team, with zero eligibility for prizes, refunds, or certificates.
              </p>
            </div>
          </div>

        </div>

        {/* Committee Contact Note */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center max-w-3xl mx-auto">
          <p className="text-xs text-slate-400 leading-relaxed mb-2">
            Have questions regarding rule interpretations or accommodations? Contact Lead Organizer <strong>Thenappan T (Register No: 44110855)</strong> at <a href="mailto:sistawscc@gmail.com" className="text-[#FF9900] underline">sistawscc@gmail.com</a> or phone +91 6381801640.
          </p>
          <div className="text-[11px] text-slate-400">
            {EVENT_CONFIG.disclaimer.aws}
          </div>
        </div>

      </div>
    </div>
  );
}
