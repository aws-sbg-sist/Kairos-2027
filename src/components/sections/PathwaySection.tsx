'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, Send, User, Mail, School, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { TECHNICAL_TRACKS } from '@/lib/config';

interface PathwaySectionProps {
  initialTrack?: string;
  registrationOpen?: boolean;
}

export const PathwaySection: React.FC<PathwaySectionProps> = ({ initialTrack, registrationOpen = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    yearOfStudy: '3rd Year',
    department: 'Computer Science & Engineering',
    preferredTrack: initialTrack || TECHNICAL_TRACKS[0].title,
    portfolioUrl: '',
    motivation: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        throw new Error(data.error || 'Failed to submit early interest.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: '01', title: 'Early Interest', desc: 'Reserve your priority notification spot now. No fees, instant confirmation.', status: 'ACTIVE NOW', current: true },
    { number: '02', title: 'National Applications', desc: 'Submit abstract, proposed system architecture, and 4–6 builder team roster.', status: 'OPENS SOON' },
    { number: '03', title: 'Technical Screening', desc: 'Evaluation of abstracts by faculty & engineers to shortlist up to 75 teams.', status: 'PLANNED' },
    { number: '04', title: 'On-Campus 48H Finale', desc: 'Build live in Chennai at Sathyabama Indoor Stadium with power, Wi-Fi & meals.', status: '22-24 JAN 2027' },
    { number: '05', title: 'Grand Stage Demos', desc: 'Top 20 teams demonstrate before the Grand Jury on the main auditorium stage.', status: 'VALEDICTORY' },
  ];

  return (
    <section id="pathway" className="relative py-20 lg:py-28 overflow-hidden bg-kairos-bg">
      
      {/* Background illumination */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>The Builder Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Participant <span className="gradient-text-kairos">Pathway</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            From initial waitlist reservation to stage finals in Chennai. Transparent progression with zero hidden prerequisites.
          </p>
        </div>

        {/* 5-Step Roadmap Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {steps.map((st, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl relative flex flex-col justify-between space-y-3 transition-all ${
                st.current
                  ? 'bg-purple-950/50 border-2 border-purple-500 shadow-lg shadow-purple-950/60'
                  : 'glass-panel opacity-85'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-purple-400">STEP {st.number}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    st.current ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {st.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{st.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Inline Early-Interest Waitlist Card (Interactive) */}
        <div id="waitlist" className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl glass-panel-glow border border-purple-500/30 relative">
          
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Reserve Your Early-Interest Priority
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Admission is 100% free (₹0). Submitting early interest guarantees that your team receives the application prompt before general national outreach.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white">
                You're on the KAIROS 2027 Priority List!
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                We have registered <strong>{formData.email}</strong> for the <em>{formData.preferredTrack}</em> track. A confirmation notice has been logged. We will notify you the moment 4–6 builder team applications open.
              </p>
              <div className="pt-2">
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40 transition-all"
                >
                  <span>Preview Participant Portal & Team Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ananditha Ramesh"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    <span>Academic / Personal Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananditha@college.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                {/* College / Institution */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-purple-400" />
                    <span>Institution / University *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Sathyabama Institute / IIT Madras"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                {/* Year of Study */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span>Year of Study</span>
                  </label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                  >
                    <option value="1st Year">1st Year (Debutant eligible)</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year (Final Year)</option>
                    <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                  </select>
                </div>
              </div>

              {/* Preferred Technical Track */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Preferred Technical Track *</span>
                </label>
                <select
                  required
                  value={formData.preferredTrack}
                  onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                >
                  {TECHNICAL_TRACKS.map(t => (
                    <option key={t.id} value={t.title}>
                      Track {t.number}: {t.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Portfolio / GitHub (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">
                  GitHub Profile or Portfolio Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://github.com/your-handle"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              {/* Motivation */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">
                  What idea or challenge do you want to build? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Briefly describe what your team aims to engineer over the 48 hours..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 hover:from-purple-500 hover:to-sky-400 shadow-lg shadow-purple-950 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-60"
                >
                  {submitting ? (
                    <span>Confirming Priority...</span>
                  ) : (
                    <>
                      <span>Submit Early-Interest Reservation</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-purple-500/15">
                <span>Free Entry · Zero Spam · Privacy Guaranteed</span>
                <Link href="/portal" className="text-purple-400 hover:text-purple-300 underline">
                  Participant Portal Preview →
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
