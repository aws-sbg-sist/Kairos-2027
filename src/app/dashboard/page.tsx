'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { useHaptics } from '@/lib/haptics';
import { useSound } from '@/lib/audio';
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
  Check,
  Search,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || searchParams.get('team') || 'KAIROS-T001';
  
  const [activeCode, setActiveCode] = useState(initialCode);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const haptics = useHaptics();
  const sound = useSound();

  const fetchTeam = (codeToFetch: string) => {
    setLoading(true);
    fetch(`/api/v1/team?code=${encodeURIComponent(codeToFetch.trim().toUpperCase())}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.team) {
          setSelectedTeam(data.team);
          setActiveCode(data.team.teamCode || codeToFetch);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTeam(initialCode);
  }, [initialCode]);

  const copyVoucher = (code: string) => {
    sound?.playClick();
    haptics?.success();
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
          badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-500/40'
        };
    }
  };

  const team = selectedTeam || {
    teamCode: activeCode,
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
          
          {/* Team Switcher & Status Bar */}
          <div className="hud-frame flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-purple-400 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                Roster Switcher:
              </span>
              <button 
                onClick={() => {
                  sound?.playClick();
                  haptics?.selection();
                  fetchTeam('KAIROS-T001');
                }} 
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-mono transition active:scale-[0.97] ${activeCode === 'KAIROS-T001' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-900/40' : 'bg-slate-800/80 text-slate-300 hover:text-white border border-white/5'}`}
              >
                KAIROS-T001 (Finalist)
              </button>
              <button 
                onClick={() => {
                  sound?.playClick();
                  haptics?.selection();
                  fetchTeam('KAIROS-T002');
                }} 
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-mono transition active:scale-[0.97] ${activeCode === 'KAIROS-T002' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-900/40' : 'bg-slate-800/80 text-slate-300 hover:text-white border border-white/5'}`}
              >
                KAIROS-T002 (Finalist)
              </button>
              <button 
                onClick={() => {
                  sound?.playClick();
                  haptics?.selection();
                  fetchTeam('KAIROS-T003');
                }} 
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-mono transition active:scale-[0.97] ${activeCode === 'KAIROS-T003' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-900/40' : 'bg-slate-800/80 text-slate-300 hover:text-white border border-white/5'}`}
              >
                KAIROS-T003 (Semi-Finalist)
              </button>
            </div>

            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                if (inputCode.trim()) {
                  sound?.playClick();
                  haptics?.medium();
                  fetchTeam(inputCode);
                }
              }}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <input
                type="text"
                aria-label="Lookup Team Code"
                placeholder="Lookup code (e.g. KAIROS-T001)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                className="flex-1 sm:flex-initial min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-950 border border-white/15 text-xs font-mono text-purple-300 placeholder:text-slate-400 uppercase focus:outline-none focus:border-purple-500"
              />
              <button 
                type="submit" 
                className="island-btn min-h-[40px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center gap-1.5 active:scale-[0.97]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-mono text-purple-400 font-bold tracking-wider">AEROSPACE TELEMETRY CENTRAL</span>
                <span className="text-xs text-slate-400" aria-hidden="true">•</span>
                <span className="text-xs font-mono text-slate-300">Team Code: {team.teamCode}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-white">
                {team.teamName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/portal/pass?code=${encodeURIComponent(team.teamCode || activeCode)}`}
                onClick={() => { sound?.playClick(); haptics?.light(); }}
                className="island-btn px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center gap-2 transition-all active:scale-[0.97]"
              >
                <QrCode className="w-4 h-4 text-purple-300" />
                <span>Smart NFC Badge Pass</span>
                <span className="island-btn-icon">→</span>
              </Link>
              <Link
                href="/online-qualifier"
                onClick={() => { sound?.playClick(); haptics?.light(); }}
                className="island-btn px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity shadow-md flex items-center gap-1.5 active:scale-[0.97]"
              >
                <Video className="w-4 h-4" />
                <span>Round 1 Qualifier Bay</span>
                <span className="island-btn-icon">→</span>
              </Link>
            </div>
          </div>

          {/* Dynamic Stage Banner Double-Bezel */}
          <div className="double-bezel shadow-2xl">
            <div className="double-bezel-inner p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase tracking-wider ${stage.badgeClass}`}>
                    {stage.title}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {stage.desc}
                  </h3>
                  {team.deskBayAllocation && (
                    <p className="text-xs font-mono text-purple-300 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>Assigned Physical Hacking Station: <strong className="text-white">{team.deskBayAllocation}</strong></span>
                    </p>
                  )}
                </div>

                {team.selectionStage === 'ONLINE_SEMI_FINALIST' && (
                  <Link
                    href="/online-qualifier"
                    onClick={() => { sound?.playClick(); haptics?.medium(); }}
                    className="island-btn px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-colors shadow-lg flex items-center gap-2 shrink-0 self-start md:self-auto active:scale-[0.97]"
                  >
                    <span>Upload Round 1 Deliverables</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Checkpoint Telemetry Progress Bay */}
          <div className="double-bezel shadow-xl">
            <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <div>
                    <h3 className="text-base font-bold text-white font-display">Live Checkpoint Evaluation Telemetry</h3>
                    <p className="text-xs text-slate-400 font-mono">Real-time jury evaluation status across all 3 audit rounds</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30">
                  Total Weight: 100 PTS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CP1 */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">CP1: Architecture Blueprint</span>
                    <span className="text-xs font-mono font-bold text-purple-400">23.5 / 25</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000" style={{ width: '94%' }} />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 block">✓ Evaluator Consensus Reached</span>
                </div>

                {/* CP2 */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">CP2: Core MVP & Contracts</span>
                    <span className="text-xs font-mono font-bold text-indigo-400">32.0 / 35</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-1000" style={{ width: '91.4%' }} />
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 block">✓ Evaluator Consensus Reached</span>
                </div>

                {/* CP3 */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">CP3: Load Defense & Polish</span>
                    <span className="text-xs font-mono font-bold text-sky-400">37.5 / 40</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full transition-all duration-1000" style={{ width: '93.75%' }} />
                  </div>
                  <span className="text-[11px] font-mono text-purple-300 block">● Scheduled for Final Stage Defense</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Project Abstract & Hardware/Cloud Credentials */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Project Card */}
              <div className="double-bezel shadow-xl">
                <div className="double-bezel-inner p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white font-display">Submitted Problem & Solution</h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-slate-700 uppercase">
                      {team.trackId}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      {team.problemTitle || 'Urban Telemetry Event Mesh'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {team.problemAbstract || 'Distributed low-latency stream processing pipeline handling 100k events/sec with consensus and telemetry streaming.'}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {team.githubUrl && (
                      <a
                        href={team.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>GitHub Repo</span>
                      </a>
                    )}
                    {team.loomVideoUrl && (
                      <a
                        href={team.loomVideoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Loom Defense Walkthrough</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* AWS Cloud Credits & Sandbox Infrastructure */}
              <div className="double-bezel shadow-xl">
                <div className="double-bezel-inner p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white font-display">AWS Cloud Builder Credits</h3>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">100% SUBSIDIZED</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Every shortlisted finalist team receives an AWS promotional credit voucher for spinning up EC2, Bedrock Claude models, and DynamoDB sandboxes during the 48-hour build cycle.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block uppercase">Promotional Credit Voucher</span>
                      <span className="text-base font-mono font-bold text-white tracking-wider">
                        {team.awsCreditVoucher || 'Unlocked via Organizer / Team Lead Portal'}
                      </span>
                    </div>

                    {team.awsCreditVoucher && (
                      <button
                        onClick={() => copyVoucher(team.awsCreditVoucher)}
                        className="island-btn px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors active:scale-[0.97]"
                      >
                        {copiedVoucher ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedVoucher ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Verified Roster */}
            <div className="space-y-6">
              <div className="double-bezel shadow-xl">
                <div className="double-bezel-inner p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white font-display">Verified Team Roster</h3>
                    </div>
                    <span className="text-xs font-mono text-purple-300">
                      {team.members?.length || 4}/6 Members
                    </span>
                  </div>

                  <div className="space-y-3">
                    {team.members?.map((member: any, idx: number) => (
                      <div 
                        key={member.id || idx}
                        className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{member.name}</span>
                            {member.role === 'Leader' && (
                              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                                Lead
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 block font-mono">
                            {member.college || 'Sathyabama'} • {member.role}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Meetup RSVP</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <Link
                      href={`/portal/pass?code=${team.teamCode}`}
                      onClick={() => { sound?.playClick(); haptics?.light(); }}
                      className="island-btn w-full py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
                    >
                      <span>View Digital Security Badges</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
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

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-aws-canvas text-white">
        <div className="text-xs font-mono text-purple-400 animate-pulse">Loading Builder Command Central...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
