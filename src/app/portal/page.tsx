'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, QrCode, ShieldCheck, ArrowLeft, CheckCircle2,
  AlertCircle, Copy, Check, ExternalLink, Github, Globe
} from 'lucide-react';
import { ParticipantTeam } from '@/types';
import { TECHNICAL_TRACKS, EVENT_CONFIG } from '@/lib/config';

export default function ParticipantPortalPage() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [team, setTeam] = useState<ParticipantTeam>({
    id: 'team-k75-01',
    teamName: 'Chronos Distributed',
    inviteCode: 'KAIROS-7721',
    trackId: 'cloud-native',
    leaderEmail: 'pooja.v@example.edu',
    status: 'shortlisted',
    members: [
      { id: 'm1', name: 'Pooja Venkatesh', email: 'pooja.v@example.edu', role: 'Leader', college: 'SIST Chennai', confirmed: true },
      { id: 'm2', name: 'Rohan Gupta', email: 'rohan.g@example.edu', role: 'Backend', college: 'SIST Chennai', confirmed: true },
      { id: 'm3', name: 'Swetha K', email: 'swetha.k@example.edu', role: 'AI / Cloud', college: 'SIST Chennai', confirmed: true },
      { id: 'm4', name: 'Aditya Nair', email: 'aditya.n@example.edu', role: 'UI/UX', college: 'SIST Chennai', confirmed: true }
    ],
    projectTitle: 'Chronos Stream: Sub-millisecond Event Mesh for Urban Telemetry',
    projectAbstract: 'A fault-tolerant stream processing engine handling 100k events/sec with distributed consensus and zero data loss.',
    githubUrl: 'https://github.com/kairos2027/chronos-stream',
    createdAt: '2026-10-25T08:00:00.000Z'
  });

  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Backend' as any });
  const [showAddMember, setShowAddMember] = useState(false);

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(team.inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (team.members.length >= 6) {
      alert('Maximum team size is 6 builders.');
      return;
    }
    const added = {
      id: `m-${Date.now()}`,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      college: 'SIST Chennai',
      confirmed: true
    };
    setTeam({ ...team, members: [...team.members, added] });
    setNewMember({ name: '', email: '', role: 'Backend' });
    setShowAddMember(false);
  };

  return (
    <div className="min-h-screen bg-kairos-darkest text-slate-100 flex flex-col">
      
      {/* Portal Top Bar */}
      <header className="border-b border-purple-500/20 bg-slate-950/80 px-6 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              title="Return to Main Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="font-display font-bold text-lg text-white">
                Builder Dashboard
              </span>
              <span className="text-[10px] font-mono text-purple-400 block">
                KAIROS 2027 · SATHYABAMA INDOOR STADIUM
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Sandbox Demo Mode Active</span>
            </span>
            <Link
              href="/portal/pass"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>View Stadium QR Pass</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow space-y-6">
        
        {/* Team Overview Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-purple-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                  TEAM ROSTER (4–6 BUILDERS)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/60 text-purple-200">
                  {team.status.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                {team.teamName}
              </h2>
              <span className="text-xs text-slate-300 font-medium mt-1 block">
                Selected Track: Cloud-Native Distributed Systems
              </span>
            </div>

            {/* Invite Code Box */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-purple-500/25 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Teammate Join Code</span>
                <span className="text-lg font-mono font-bold text-purple-300 tracking-wider">
                  {team.inviteCode}
                </span>
              </div>
              <button
                onClick={handleCopyInvite}
                className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800 text-purple-200 transition-colors"
                title="Copy Invite Code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Confirmed Members ({team.members.length}/6)</span>
              </h3>
              {team.members.length < 6 && (
                <button
                  onClick={() => setShowAddMember(!showAddMember)}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300"
                >
                  {showAddMember ? 'Cancel' : '+ Add Builder'}
                </button>
              )}
            </div>

            {/* Add Member Form */}
            {showAddMember && (
              <form onSubmit={handleAddMember} className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20 grid grid-cols-1 sm:grid-cols-4 gap-3 animate-fadeIn">
                <input
                  type="text"
                  required
                  placeholder="Builder Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="px-3 py-1.5 rounded-lg glass-input text-xs"
                />
                <input
                  type="email"
                  required
                  placeholder="Builder Email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="px-3 py-1.5 rounded-lg glass-input text-xs"
                />
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value as any })}
                  className="px-3 py-1.5 rounded-lg glass-input text-xs bg-slate-900"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI / Cloud">AI / Cloud</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-700 hover:bg-purple-600"
                >
                  Add to Roster
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {team.members.map((mem) => (
                <div
                  key={mem.id}
                  className="p-3.5 rounded-xl bg-slate-950/50 border border-purple-500/15 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white text-sm block">{mem.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono block">{mem.email}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-950/80 border border-purple-500/30 text-purple-300">
                    {mem.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details & Submission Readiness */}
          <div className="pt-4 border-t border-purple-500/15 space-y-4">
            <h3 className="text-sm font-bold text-white">Project Blueprint & Submission Links</h3>
            
            <div className="p-4 rounded-xl bg-slate-950/40 border border-purple-500/15 space-y-2">
              <span className="text-xs font-bold text-purple-300 block">{team.projectTitle}</span>
              <p className="text-xs text-slate-400 leading-relaxed">{team.projectAbstract}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/50 border border-purple-500/15 text-xs text-slate-300">
                <Github className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="truncate">{team.githubUrl}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/50 border border-purple-500/15 text-xs text-slate-300">
                <Globe className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Live deployment endpoint configured at freeze</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stadium Desk & Arena Allocation Card */}
        <div className="p-6 rounded-3xl glass-panel border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase">VENUE CHECK-IN READY</span>
            <h4 className="text-lg font-bold text-white">Sathyabama Indoor Stadium · Arena Bay B-14</h4>
            <p className="text-xs text-slate-400">
              Allocated 6 power outlets, surge suppressor board, and dual-band high-density Wi-Fi SSID.
            </p>
          </div>
          <Link
            href="/portal/pass"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-sky-500 hover:from-purple-500 shadow-md flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Digital Pass</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
