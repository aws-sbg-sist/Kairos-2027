'use client';

import React, { useState } from 'react';
import { X, Radio, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { TeamRadarSignal } from '@/types';
import { sound } from '@/lib/audio';

interface BroadcastRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (signal: TeamRadarSignal) => void;
}

export function BroadcastRadarModal({ isOpen, onClose, onSuccess }: BroadcastRadarModalProps) {
  const [formData, setFormData] = useState({
    builderName: '',
    role: 'Fullstack Engineer' as TeamRadarSignal['role'],
    trackId: TECHNICAL_TRACKS[0]?.id || 'agentic-ai',
    college: '',
    skills: '',
    seeking: '',
    contactUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound?.playClick();
    setLoading(true);
    setError(null);

    const skillsArray = formData.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (skillsArray.length === 0) {
      setError('Please list at least one skill or technology.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/radar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          builderName: formData.builderName.trim(),
          role: formData.role,
          trackId: formData.trackId,
          college: formData.college.trim(),
          skills: skillsArray,
          seeking: formData.seeking.trim(),
          contactUrl: formData.contactUrl.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to pulse beacon to radar.');
      }

      setSubmitted(true);
      sound?.playSuccess();
      onSuccess(data.signal);

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err: unknown) {
      sound?.playError();
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-slate-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-popover-in origin-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => { sound?.playClick(); onClose(); }}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors active:scale-[0.97]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-success-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Beacon Broadcasted Live!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your signal is now pulsing on the KAIROS 2027 Builder Radar. Fellow builders can now connect and invite you to form a squad!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
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
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 ">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Siddharth Menon"
                    value={formData.builderName}
                    onChange={(e) => setFormData({ ...formData, builderName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 ">
                    Primary Discipline *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as TeamRadarSignal['role'] })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-sm transition-colors"
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
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 ">
                    Target Track *
                  </label>
                  <select
                    value={formData.trackId}
                    onChange={(e) => setFormData({ ...formData, trackId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-purple-500 text-sm transition-colors"
                  >
                    {TECHNICAL_TRACKS.map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 ">
                    College / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sathyabama Institute"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 ">
                  Core Tech Stack (Comma Separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch, LangChain, Next.js, Redis, Docker"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 ">
                  What are you looking for? (Seeking Squad) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Looking for a backend systems architect and frontend UI builder to tackle Agentic workflows."
                  value={formData.seeking}
                  onChange={(e) => setFormData({ ...formData, seeking: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm resize-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 ">
                  Contact Handle / URL (GitHub, LinkedIn, Discord) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://github.com/yourhandle or Discord: builder#1234"
                  value={formData.contactUrl}
                  onChange={(e) => setFormData({ ...formData, contactUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => sound?.playHover()}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white btn-primary-themed shadow-lg shadow-purple-900/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Radio className="w-4 h-4 animate-pulse" /> Broadcasting...
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
