'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Cloud, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Clock, 
  Award,
  Video,
  FileCode,
  QrCode,
  Copy,
  Check
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  useEffect(() => {
    // Fetch default demo team or logged in team from API
    fetch('/api/v1/team?code=KAIROS-T001')
      .then(res => res.json())
      .then(data => {
        if (data.team) {
          setSelectedTeam(data.team);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const copyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'ON_CAMPUS_QUALIFIED':
        return {
          title: 'STAGE 2: ON-CAMPUS FINALIST (JAN 22–24)',
          desc: 'Qualified for Physical Grand Finale at Sathyabama Central Library, Chennai.',
          badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      case 'ONLINE_SEMI_FINALIST':
        return {
          title: 'STAGE 1: ONLINE QUALIFIER QUALIFIED (JAN 02–04)',
          desc: 'Shortlisted among the Top 250 Semi-Finalists. Complete your Loom video and code defense.',
          badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
        };
      default:
        return {
          title: 'STAGE 0: ROUND 0 APPLICANT',
          desc: 'Abstract under initial technical review. Ensure your team has 4–6 verified Meetup members.',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
    }
  };

  const team = selectedTeam || {
    teamCode: 'KAIROS-T001',
    teamName: 'Chronos Distributed',
    trackId: 'cloud-native',
    selectionStage: 'ON_CAMPUS_QUALIFIED',
    problemTitle: 'Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry',
    deskBayAllocation: 'BAY-A12 (Central Library LH1)',
    awsCreditVoucher: 'AWS-KAIROS-100-CHRONOS',
    members: [
      { id: '1', name: 'Pooja Venkatesh', role: 'Leader', college: 'SIST', meetupRsvpVerified: true, email: 'pooja.v@example.edu' },
      { id: '2', name: 'Rohan Gupta', role: 'Backend', college: 'SIST', meetupRsvpVerified: true, email: 'rohan.g@example.edu' },
      { id: '3', name: 'Swetha K', role: 'AI / Cloud', college: 'SIST', meetupRsvpVerified: true, email: 'swetha.k@example.edu' },
      { id: '4', name: 'Aditya Nair', role: 'UI/UX', college: 'SIST', meetupRsvpVerified: true, email: 'aditya.n@example.edu' },
    ]
  };

  const stage = getStageBadge(team.selectionStage);

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-aws-orange font-bold">BUILDER CENTRAL COMMAND</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-mono text-slate-400">Team Code: {team.teamCode}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
                {team.teamName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/portal/pass"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center gap-2 transition-colors"
              >
                <QrCode className="w-4 h-4 text-amber-300" />
                <span>Smart NFC Badge Pass</span>
              </Link>
              <Link
                href="/online-qualifier"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors shadow-md flex items-center gap-1.5"
              >
                <Video className="w-4 h-4" />
                <span>Round 1 Qualifier Bay</span>
              </Link>
            </div>
          </div>

          {/* Dynamic Stage Banner */}
          <div className="p-6 rounded-3xl bg-aws-squidInk border border-aws-orange/40 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase tracking-wider ${stage.badgeClass}`}>
                  {stage.title}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {stage.desc}
                </h3>
                {team.deskBayAllocation && (
                  <p className="text-xs font-mono text-amber-300 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-aws-orange" />
                    <span>Allocated Bay: <strong>{team.deskBayAllocation}</strong></span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <Link
                  href="/on-campus"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-aws-orange" />
                  <span>Venue & Bus Fleet</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (8 cols): Roster & Checkpoints */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Team Roster Card */}
              <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-aws-orange" />
                    <h3 className="text-base font-bold text-white font-display">
                      Verified Team Roster ({team.members?.length || 0} / 6 Builders)
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    100% Free • All Meals Included
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {team.members?.map((m: any, i: number) => (
                    <div key={m.id || i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{m.name}</h4>
                          {m.role === 'Leader' && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-aws-orange/20 text-aws-orange">
                              LEAD
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-amber-300 font-mono">{m.role} • {m.college}</p>
                        <p className="text-[11px] text-slate-400 font-mono truncate">{m.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          🟢 RSVP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkpoint Gates Progress Tracker */}
              <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-aws-orange" />
                    <h3 className="text-base font-bold text-white font-display">
                      Evaluation Gates & Normalized Z-Scores
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Max 100 Pts
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Checkpoint 1 */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-300 font-bold">GATE 1</span>
                      <span className="text-slate-400">25 Pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Architecture & Cloud Feasibility</h4>
                    <p className="text-xs text-slate-400">Friday, Jan 22 (04:00 PM – 06:30 PM)</p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Score: 24.5 / 25</span>
                    </div>
                  </div>

                  {/* Checkpoint 2 */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-300 font-bold">GATE 2</span>
                      <span className="text-slate-400">35 Pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Code Velocity & API Integrations</h4>
                    <p className="text-xs text-slate-400">Saturday, Jan 23 (02:00 PM – 05:30 PM)</p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-300 font-mono">
                      <Clock className="w-4 h-4" />
                      <span>Pending Evaluation</span>
                    </div>
                  </div>

                  {/* Checkpoint 3 */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-300 font-bold">GATE 3</span>
                      <span className="text-slate-400">40 Pts</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Grand Stage Live Demos</h4>
                    <p className="text-xs text-slate-400">Sunday, Jan 24 (09:00 AM – 12:30 PM)</p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock className="w-4 h-4" />
                      <span>7-Min Live Defense</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): AWS Sandbox & Resources */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* AWS Sandbox Credits Card */}
              <div className="p-6 rounded-3xl bg-aws-squidInk border border-aws-orange/40 space-y-4">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-aws-orange" />
                  <h3 className="text-base font-bold text-white font-display">
                    AWS Cloud Sandbox
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Complimentary promotional credit voucher allocated for deploying Bedrock models, serverless functions, and database instances.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Promotional Voucher</span>
                  <div className="flex items-center justify-between font-mono font-bold text-sm text-aws-orange">
                    <span>{team.awsCreditVoucher || 'AWS-KAIROS-PENDING'}</span>
                    <button
                      onClick={() => copyVoucher(team.awsCreditVoucher || '')}
                      className="text-slate-400 hover:text-white"
                      title="Copy Voucher Code"
                    >
                      {copiedVoucher ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  <p>• Access to Amazon Bedrock (Claude 3.5 Sonnet, Titan)</p>
                  <p>• OpenSearch Serverless Vector Store</p>
                  <p>• Amazon Aurora Serverless v2</p>
                </div>
              </div>

              {/* Turnkey Student Resources */}
              <div className="p-6 rounded-3xl bg-aws-card border border-slate-700/60 space-y-3">
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <Award className="w-4 h-4 text-aws-orange" />
                  <span>AWS SBG Learning Library</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Pre-event starter kits, Bedrock code templates, and interview storytelling modules.
                </p>
                <div className="space-y-2 pt-1 text-xs">
                  <Link
                    href="/resources"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-aws-orange/40 text-slate-200 block transition-colors"
                  >
                    🚀 Bedrock Foundation Model Starter Kit
                  </Link>
                  <Link
                    href="/resources"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-aws-orange/40 text-slate-200 block transition-colors"
                  >
                    🏆 AWS Cloud Quest: Cloud Practitioner
                  </Link>
                  <Link
                    href="/resources"
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-aws-orange/40 text-slate-200 block transition-colors"
                  >
                    📖 Storytelling for Career Readiness
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
