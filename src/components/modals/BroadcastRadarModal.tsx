'use client';

import React, { useState } from 'react';
import { X, Radio, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { TeamRadarSignal } from '@/types';
import { sound } from '@/lib/audio';

interface BroadcastRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSignal: TeamRadarSignal) => void;
}

export function BroadcastRadarModal({ isOpen, onClose, onSuccess }: BroadcastRadarModalProps) {
  const [formData, setFormData] = useState({
    builderName: '',
    role: 'AI / ML Specialist' as TeamRadarSignal['role'],
    trackId: 'agentic-ai',
    skills: '',
    college: 'Sathyabama Institute of Science and Technology',
    seeking: '',
    contactUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    sound?.playClick();

    try {
      const res = await fetch('/api/radar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to broadcast beacon');
      }

      sound?.playSuccess();
      setSubmitted(true);
      onSuccess(data.signal);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-surface-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => { sound?.playClick(); onClose(); }}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">Beacon Broadcasted Live!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your signal is now pulsing on the KAIROS 2027 Builder Radar. Fellow builders can now connect and invite you to form a squad!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-celestial/20 border border-celestial/40 text-celestial-light">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  Broadcast Builder Signal
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Transmit your skills and track interest to match with complementary builders.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Menon"
                    value={formData.builderName}
                    onChange={(e) => setFormData({ ...formData, builderName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-celestial text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Primary Discipline *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as TeamRadarSignal['role'] })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-card border border-white/10 text-white focus:outline-none focus:border-celestial text-sm"
                  >
                    <option value="AI / ML Specialist">AI / ML Specialist</option>
                    <option value="Fullstack Engineer">Fullstack Engineer</option>
                    <option value="Systems & DevOps">Systems & DevOps</option>
                    <option value="Web3 & Security">Web3 & Security</option>
                    <option value="UI/UX & Frontend">UI/UX & Frontend</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    Target Track *
                  </label>
                  <select
                    value={formData.trackId}
                    onChange={(e) => setFormData({ ...formData, trackId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-card border border-white/10 text-white focus:outline-none focus:border-celestial text-sm"
                  >
                    {TECHNICAL_TRACKS.map(t => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                    College / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sathyabama Institute"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-celestial text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Core Tech Stack (Comma Separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch, LangChain, Next.js, Redis, Docker"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-celestial text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  What are you looking for? (Seeking Squad) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Looking for a backend systems architect and frontend UI builder to tackle Agentic workflows."
                  value={formData.seeking}
                  onChange={(e) => setFormData({ ...formData, seeking: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-celestial text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                  Contact Handle / URL (GitHub, LinkedIn, Discord) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://github.com/yourhandle or Discord: builder#1234"
                  value={formData.contactUrl}
                  onChange={(e) => setFormData({ ...formData, contactUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-celestial text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => sound?.playHover()}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-celestial to-violet-600 hover:from-celestial-light hover:to-violet-500 transition-all shadow-lg shadow-celestial/25 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin" /> Broadcasting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Pulse Beacon on Radar
                    </span>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
