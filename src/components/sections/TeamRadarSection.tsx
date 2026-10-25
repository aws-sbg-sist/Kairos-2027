'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Users, Filter, Sparkles, ExternalLink, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { TeamRadarSignal } from '@/types';
import { BroadcastRadarModal } from '@/components/modals/BroadcastRadarModal';
import { sound } from '@/lib/audio';

export function TeamRadarSection() {
  const [signals, setSignals] = useState<TeamRadarSignal[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/radar')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.signals)) {
          setSignals(data.signals);
        }
      })
      .catch(err => console.error('Failed to load radar signals:', err));
  }, []);

  const handleSignalAdded = (newSignal: TeamRadarSignal) => {
    setSignals(prev => [newSignal, ...prev]);
  };

  const filteredSignals = signals.filter(sig => {
    const matchTrack = selectedTrack === 'all' || sig.trackId === selectedTrack;
    const matchRole = selectedRole === 'all' || sig.role === selectedRole;
    return matchTrack && matchRole;
  });

  const handleConnect = (sig: TeamRadarSignal) => {
    sound?.playClick();
    if (sig.contactUrl.startsWith('http')) {
      window.open(sig.contactUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigator.clipboard.writeText(sig.contactUrl);
      setCopiedId(sig.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="radar" className="py-24 relative overflow-hidden bg-void">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-celestial/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-celestial/15 border border-celestial/30 text-celestial-light text-xs font-mono mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-celestial opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-celestial"></span>
            </span>
            <span>BUILDER RADAR & MATCHING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-4">
            Assemble Your <span className="bg-gradient-to-r from-celestial-light via-electric-cyan to-white bg-clip-text text-transparent">Elite Squad</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            KAIROS 2027 requires <strong className="text-white">4 to 6 builders</strong> per team. Looking for a systems engineer, smart contract auditor, or AI researcher? Find complementary builders or broadcast your beacon.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => { sound?.playModalOpen(); setIsModalOpen(true); }}
              onMouseEnter={() => sound?.playHover()}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-celestial to-violet-600 hover:from-celestial-light hover:to-violet-500 shadow-lg shadow-celestial/25 hover:shadow-celestial/40 transition-all flex items-center gap-2 group text-sm"
            >
              <Radio className="w-4 h-4 text-white animate-pulse" />
              <span>Broadcast Your Beacon</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strictly ₹0 Merit Entry • 75 Teams Total</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-10 space-y-4">
          {/* Track Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1 shrink-0 mr-2">
              <Filter className="w-3.5 h-3.5" /> Track:
            </span>
            <button
              onClick={() => { sound?.playClick(); setSelectedTrack('all'); }}
              onMouseEnter={() => sound?.playHover()}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedTrack === 'all'
                  ? 'bg-celestial text-white shadow-md shadow-celestial/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
            >
              All Tracks
            </button>
            {TECHNICAL_TRACKS.map(t => (
              <button
                key={t.id}
                onClick={() => { sound?.playClick(); setSelectedTrack(t.id); }}
                onMouseEnter={() => sound?.playHover()}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedTrack === t.id
                    ? 'bg-celestial text-white shadow-md shadow-celestial/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400'
                }`}
              >
                {t.title.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Role Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono text-slate-500 uppercase flex items-center gap-1 shrink-0 mr-2">
              <Users className="w-3.5 h-3.5" /> Role:
            </span>
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'AI / ML Specialist', label: 'AI / ML' },
              { id: 'Fullstack Engineer', label: 'Fullstack' },
              { id: 'Systems & DevOps', label: 'Systems & DevOps' },
              { id: 'Web3 & Security', label: 'Web3 & Security' },
              { id: 'UI/UX & Frontend', label: 'UI/UX & Frontend' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => { sound?.playClick(); setSelectedRole(r.id); }}
                onMouseEnter={() => sound?.playHover()}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-all shrink-0 ${
                  selectedRole === r.id
                    ? 'bg-white/20 text-white font-bold border border-white/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Radar Beacons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map(sig => {
            const track = TECHNICAL_TRACKS.find(t => t.id === sig.trackId);
            return (
              <div
                key={sig.id}
                onMouseEnter={() => sound?.playHover()}
                className="group p-6 rounded-2xl bg-surface-card border border-white/10 hover:border-celestial/40 transition-all duration-300 relative flex flex-col justify-between hover:shadow-xl hover:shadow-celestial/10"
              >
                <div>
                  {/* Top Badge & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-celestial/20 border border-celestial/30 text-celestial-light text-xs font-mono font-semibold">
                      {sig.role}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {track?.title.split('&')[0]}
                    </span>
                  </div>

                  {/* Builder Name & College */}
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-celestial-light transition-colors">
                    {sig.builderName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{sig.college}</span>
                  </div>

                  {/* Seeking Statement */}
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed line-clamp-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    &ldquo;{sig.seeking}&rdquo;
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {sig.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connect Action */}
                <button
                  onClick={() => handleConnect(sig)}
                  onMouseEnter={() => sound?.playHover()}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-celestial/20 border border-white/10 hover:border-celestial/40 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                >
                  {copiedId === sig.id ? (
                    <span className="text-emerald-400 font-mono">Contact Copied to Clipboard!</span>
                  ) : (
                    <>
                      <span>Connect with Builder</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white transition-colors" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {filteredSignals.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
            <Radio className="w-10 h-10 text-slate-600 mx-auto mb-3 animate-pulse" />
            <h4 className="text-base font-semibold text-white mb-1">No Beacons in This Filter</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Be the first builder to transmit a beacon for this track and role!
            </p>
            <button
              onClick={() => { sound?.playModalOpen(); setIsModalOpen(true); }}
              className="px-4 py-2 rounded-lg bg-celestial text-white text-xs font-semibold"
            >
              Broadcast Beacon
            </button>
          </div>
        )}
      </div>

      <BroadcastRadarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSignalAdded}
      />
    </section>
  );
}
