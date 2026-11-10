'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, ShieldCheck, Send, User, Mail, School, BookOpen, Layers, ExternalLink, Sparkles } from 'lucide-react';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { sound } from '@/lib/audio';
import { SpotlightCard } from '@/components/animation/SpotlightCard';
import { ScrollReveal } from '@/components/animation/ScrollReveal';

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
      sound?.playSuccess?.();
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: '01', title: 'Early Interest', desc: 'Reserve your priority notification spot now. No fees, instant confirmation.', status: 'ACTIVE NOW', current: true },
    { number: '02', title: 'National Applications', desc: 'Submit abstract, proposed system architecture, and 4–6 builder team roster.', status: 'OPENS SOON' },
    { number: '03', title: 'Technical Screening', desc: 'Evaluation of abstracts and Round 1 prototypes to shortlist up to 100 finalist teams.', status: 'PLANNED' },
    { number: '04', title: 'On-Campus 48H Finale', desc: 'Build live in Chennai at Central Library & Campus Bays with power, Wi-Fi & meals.', status: '22-24 JAN 2027' },
    { number: '05', title: 'Grand Stage Demos', desc: 'Top finalist squads demonstrate before the Grand Jury on the main stage.', status: 'VALEDICTORY' },
  ];

  return (
    <section id="pathway" className="relative py-16 lg:py-24 overflow-hidden bg-kairos-bg">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[350px] bg-purple-900/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal direction="down" distance={16}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/30 shadow-md backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>The Builder Journey</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Participant <span className="gradient-text-kairos">Pathway</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              From initial waitlist reservation to stage finals in Chennai. Transparent progression with zero hidden prerequisites.
            </p>
          </ScrollReveal>
        </div>

        {/* 5-Step Roadmap Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {steps.map((st, i) => (
            <ScrollReveal
              key={i}
              direction="up"
              distance={20}
              delay={i * 0.08}
              className="h-full"
            >
              <div
                className={`p-5 rounded-2xl relative flex flex-col justify-between space-y-3 transition-all h-full ${
                  st.current
                    ? 'bg-purple-950/50 border-2 border-purple-500 shadow-xl shadow-purple-950/60 scale-[1.02]'
                    : 'glass-panel opacity-85 hover:opacity-100 hover:border-purple-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-purple-400">STEP {st.number}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        st.current
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                          : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      {st.status}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-bold text-white mb-1">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-purple-300">
                  <span>Milestone</span>
                  <span className="text-slate-400">0{i + 1}/05</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Priority Interest Reservation & Quick Application Drawer */}
        <ScrollReveal direction="up" distance={24} delay={0.2}>
          <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-aws-card/90 border border-purple-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-950/40 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-purple-300 font-bold block uppercase tracking-wider mb-1">
                    Direct Priority Reservation
                  </span>
                  <h3 className="text-2xl font-display font-black text-white">
                    Reserve Your Priority Builder Slot
                  </h3>
                </div>
                <Link
                  href="/register"
                  onClick={() => sound?.playClick()}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold btn-primary-themed text-white flex items-center gap-2 shadow-lg shadow-purple-900/30"
                >
                  <span>Go to Full Portal Application</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                Early applicants receive direct access to AWS Bedrock workshops, sample architecture templates, and automated qualifier guidance.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
