'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { PROBLEM_STATEMENTS } from '@/lib/problem-statements';
import { Cpu, Server, ShieldCheck, Leaf, ArrowRight, Layers, Radio, Terminal } from 'lucide-react';

interface TracksSectionProps {
  onSelectTrack?: (trackTitle: string) => void;
}

const ARCH_DIAGRAMS: Record<string, { ingress: string; core: string[]; storage: string; output: string }> = {
  'agentic-ai': {
    ingress: 'Multimodal Input',
    core: ['Amazon Bedrock', 'Agent Router (Lambda)'],
    storage: 'OpenSearch Vector + DynamoDB',
    output: 'Verified Action & Audit',
  },
  'cloud-native': {
    ingress: 'High-Concurrency Traffic',
    core: ['EventBridge / SQS', 'ECS Fargate Workers'],
    storage: 'DynamoDB Global + Aurora',
    output: 'SLO Telemetry (OTel)',
  },
  'edge-iot': {
    ingress: 'ESP32 / Greengrass Edge',
    core: ['AWS IoT Core MQTT', 'Anomaly Inference'],
    storage: 'Amazon Timestream DB',
    output: 'Grid Dispatch & Alerts',
  },
  'fintech-trust': {
    ingress: 'Encrypted Ledger Payload',
    core: ['WAF + Cognito Auth', 'AWS KMS / Fraud ML'],
    storage: 'Aurora Serverless v2',
    output: 'Sub-ms Risk Score',
  },
  'open-enterprise': {
    ingress: 'Institutional Requests',
    core: ['API Gateway + Textract', 'SageMaker Pipeline'],
    storage: 'S3 Vault + Relational DB',
    output: 'Automated Routing Hub',
  },
};

export const TracksSection: React.FC<TracksSectionProps> = () => {
  const [activeId, setActiveId] = useState(TECHNICAL_TRACKS[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Server': return Server;
      case 'ShieldCheck': return ShieldCheck;
      case 'Leaf': return Leaf;
      case 'Layers': return Layers;
      default: return Layers;
    }
  };

  const activeTrack = TECHNICAL_TRACKS.find((t) => t.id === activeId) || TECHNICAL_TRACKS[0];
  const activeStatements = PROBLEM_STATEMENTS.filter((ps) => ps.trackId === activeTrack.id);
  const diagram = ARCH_DIAGRAMS[activeTrack.id] || ARCH_DIAGRAMS['agentic-ai'];

  return (
    <section id="tracks" className="relative py-16 lg:py-24 overflow-hidden bg-[#07070b] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2.5 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
              5 Enterprise Tracks · 15 Official Challenges
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              The Five Innovation <span className="gradient-text-kairos">Tracks</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Select a domain below to inspect its reference cloud flow and official problem statements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/tracks"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white btn-primary-themed shadow-lg shadow-purple-900/30 flex items-center gap-2"
            >
              <span>Browse All 15 Challenges</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/radar"
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 flex items-center gap-1.5 transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-purple-400" />
              <span>Need Teammates?</span>
            </Link>
          </div>
        </div>

        {/* Clean 2-Pane Developer Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Hairline Track Selector List (5 cols) */}
          <div className="lg:col-span-5 divide-y divide-white/10 border-y border-white/10">
            {TECHNICAL_TRACKS.map((track) => {
              const Icon = getIcon(track.iconName);
              const isSelected = track.id === activeId;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveId(track.id)}
                  className={`w-full py-4 px-3 text-left flex items-center justify-between gap-4 transition-colors group ${
                    isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? 'bg-white text-slate-950 border-white'
                          : 'bg-[#0f0f15] text-slate-400 border-white/10 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-mono text-slate-400 block">
                        TRACK {track.number}
                      </span>
                      <span className={`font-display font-bold text-sm sm:text-base block truncate ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {track.shortTitle}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-purple-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Reference AWS Architecture Blueprint + Official Problem Statements (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#0d0d13] p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-purple-300 font-semibold">
                  TRACK {activeTrack.number} · {activeTrack.recommendedStacks.slice(0, 3).join(' · ')}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  3 Problems Published
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white">
                {activeTrack.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTrack.shortDescription}
              </p>
            </div>

            {/* Minimalist Live Reference Architecture Diagram */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Reference Cloud Flow</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-stretch text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#07070b] border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500">01 INGRESS</span>
                  <span className="text-white font-semibold mt-1">{diagram.ingress}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#12101c] border border-purple-500/35 flex flex-col justify-between sm:col-span-2">
                  <span className="text-[10px] text-purple-300">02 COMPUTE &amp; ORCHESTRATION</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {diagram.core.map((node) => (
                      <span key={node} className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-white text-[11px]">
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#07070b] border border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] text-emerald-400">03 STATE / OUTPUT</span>
                  <span className="text-slate-200 font-medium mt-1 text-[11px] leading-snug">
                    {diagram.storage} → {diagram.output}
                  </span>
                </div>
              </div>
            </div>

            {/* Clickable List of Official Problem Statements for this Track */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Official Challenges in This Track
              </span>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {activeStatements.map((ps) => (
                  <Link
                    key={ps.id}
                    href={`/tracks/${ps.id.toLowerCase()}`}
                    className="py-3 px-2 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono font-bold text-purple-300 shrink-0">
                        {ps.id}
                      </span>
                      <span className="text-sm font-medium text-white group-hover:text-purple-200 truncate">
                        {ps.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-white shrink-0 inline-flex items-center gap-1">
                      <span>Spec</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
