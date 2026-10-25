'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, User, Mail, School, BookOpen, Layers } from 'lucide-react';
import { TECHNICAL_TRACKS } from '@/lib/config';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTrack?: string;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, preselectedTrack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    yearOfStudy: '3rd Year',
    department: 'Computer Science & Engineering',
    preferredTrack: preselectedTrack || TECHNICAL_TRACKS[0].title,
    portfolioUrl: '',
    motivation: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit registration.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-glow border border-purple-500/40 p-6 sm:p-8 my-8 text-left space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-purple-300 bg-purple-950/80 border border-purple-500/30 mb-2">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Early-Interest Priority</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            Join the KAIROS 2027 Waitlist
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Reserve priority notification for your 4–6 builder team. ₹0 admission fee.
          </p>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Priority Recorded!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              We have reserved your early-interest spot under <strong>{formData.email}</strong>. When national team applications unlock, you will receive primary notification.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                <User className="w-3 h-3 text-purple-400" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Priyadarshini Sundaram"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                <Mail className="w-3 h-3 text-purple-400" />
                <span>Academic / Personal Email *</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="priya@college.edu"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                  <School className="w-3 h-3 text-purple-400" />
                  <span>College / University *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. Sathyabama Institute"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-purple-400" />
                  <span>Year of Study</span>
                </label>
                <select
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                <Layers className="w-3 h-3 text-purple-400" />
                <span>Preferred Track *</span>
              </label>
              <select
                value={formData.preferredTrack}
                onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
              >
                {TECHNICAL_TRACKS.map(t => (
                  <option key={t.id} value={t.title}>
                    Track {t.number}: {t.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 shadow-md shadow-purple-950 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Registering...</span>
              ) : (
                <>
                  <span>Confirm Priority Spot</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
