'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Star, 
  CheckCircle2, 
  Send, 
  Download, 
  Award, 
  Cloud, 
  MessageSquare,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export default function CSATPage() {
  const [satisfaction, setSatisfaction] = useState<number>(5);
  const [npsScore, setNpsScore] = useState<number>(10);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Amazon Bedrock',
    'AWS Lambda'
  ]);
  const [certificationIntent, setCertificationIntent] = useState<'YES' | 'NO' | 'ALREADY_CERTIFIED'>('YES');
  const [feedback, setFeedback] = useState('');
  const [testimonial, setTestimonial] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Live Metrics for Organizers
  const [stats, setStats] = useState<any>(null);

  const availableServices = [
    'Amazon Bedrock',
    'AWS Lambda',
    'Amazon ECS / Fargate',
    'Amazon DynamoDB',
    'Amazon OpenSearch Serverless',
    'Amazon Aurora Serverless',
    'AWS IoT Core & Greengrass',
    'Amazon EventBridge & SQS',
    'Amazon Cognito',
    'AWS App Runner'
  ];

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      setSelectedServices(selectedServices.filter(s => s !== svc));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/v1/csat');
        const data = await res.json();
        if (data.success && data.metrics) {
          setStats(data.metrics);
        }
      } catch (err) {
        // non-blocking
      }
    }
    loadStats();
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/v1/csat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          overallSatisfaction: satisfaction,
          npsScore: npsScore,
          cloudServicesUsed: selectedServices,
          pursuingAwsCertification: certificationIntent,
          eventFeedback: feedback,
          testimonialQuote: testimonial
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit feedback.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 pt-28 pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#10B981]/10 via-[#FF9900]/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-200">Home</Link>
            <span>/</span>
            <span className="text-[#10B981] font-mono">Post-Event CSAT Survey</span>
          </div>

          <a
            href="/api/v1/csat/export"
            download="kairos_2027_csat_export.csv"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-[#10B981] transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#10B981]" />
            Export AWS SBG CSV
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-xs font-mono font-bold tracking-wider uppercase mb-5">
            <Heart className="w-3.5 h-3.5" />
            Official AWS Student Builder Group CSAT
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Participant Experience & <br />
            <span className="bg-gradient-to-r from-[#10B981] via-emerald-400 to-[#FF9900] bg-clip-text text-transparent">
              Net Promoter Score (NPS)
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Your honest evaluation helps our AWS Student Builder Group chapter continuously elevate standards for zero-fee builder events across India.
          </p>
        </div>

        {/* Live Metrics Ribbon if Available */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-10 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div>
              <div className="text-2xl font-black text-[#10B981] font-mono">{stats.netPromoterScore}</div>
              <div className="text-[11px] text-slate-400 uppercase font-mono mt-0.5">Net Promoter Score</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#FF9900] font-mono">{stats.averageSatisfactionScore} / 5.0</div>
              <div className="text-[11px] text-slate-400 uppercase font-mono mt-0.5">Avg CSAT Rating</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white font-mono">{stats.promoterPercentage}%</div>
              <div className="text-[11px] text-slate-400 uppercase font-mono mt-0.5">Promoters (9-10 Rating)</div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <div className="p-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Feedback Recorded!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-8">
                Thank you for contributing to KAIROS 2027. Your feedback has been logged in our official AWS Student Builder Group global chapter compliance repository.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                >
                  Return to Homepage
                </Link>
                <Link
                  href="/resources"
                  className="px-6 py-2.5 rounded-xl bg-[#FF9900] text-slate-950 text-xs font-bold hover:bg-amber-400 transition"
                >
                  Explore AWS Cloud Quests →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* 1. Overall Satisfaction (1-5 Stars) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3">
                  1. Overall Event Satisfaction Rating *
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSatisfaction(star)}
                      className={`p-3 rounded-2xl border transition flex items-center gap-1.5 ${
                        satisfaction >= star
                          ? 'bg-[#FF9900]/20 border-[#FF9900] text-[#FF9900]'
                          : 'bg-slate-950 border-slate-800 text-slate-600 hover:border-slate-700'
                      }`}
                    >
                      <Star className={`w-6 h-6 ${satisfaction >= star ? 'fill-[#FF9900]' : ''}`} />
                      <span className="text-xs font-mono font-bold">{star}</span>
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-mono">
                    {satisfaction === 5 ? '★ World-Class Experience' : satisfaction === 4 ? 'Very Good' : 'Needs Optimization'}
                  </span>
                </div>
              </div>

              {/* 2. NPS (0 to 10 Scale) */}
              <div className="pt-6 border-t border-slate-800">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                  2. Net Promoter Score (NPS) *
                </label>
                <p className="text-xs text-slate-400 mb-4">
                  How likely are you to recommend KAIROS & the AWS Student Builder Group to a friend or fellow builder? (0 = Not likely, 10 = Extremely likely)
                </p>

                <div className="grid grid-cols-11 gap-1.5 sm:gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNpsScore(num)}
                      className={`py-3 rounded-xl font-mono text-xs font-bold border transition ${
                        npsScore === num
                          ? num >= 9 ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-105' :
                            num >= 7 ? 'bg-amber-500 border-amber-400 text-slate-950 scale-105' :
                            'bg-rose-500 border-rose-400 text-white scale-105'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
                  <span>0 (Detractor)</span>
                  <span>7-8 (Passive)</span>
                  <span>9-10 (Promoter)</span>
                </div>
              </div>

              {/* 3. Cloud Services Multi-Select */}
              <div className="pt-6 border-t border-slate-800">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3">
                  3. Which AWS Cloud Services Did Your Team Leverage?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableServices.map((service) => {
                    const isChecked = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`p-3 rounded-xl border text-left text-xs font-mono flex items-center justify-between transition ${
                          isChecked
                            ? 'bg-[#0073BB]/20 border-[#0073BB] text-blue-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{service}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-[#0073BB]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Certification Intent */}
              <div className="pt-6 border-t border-slate-800">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3">
                  4. Are you planning to pursue an official AWS Certification within the next 6 months?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'YES', label: 'Yes, actively preparing' },
                    { val: 'NO', label: 'Not at this moment' },
                    { val: 'ALREADY_CERTIFIED', label: 'Already AWS Certified' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setCertificationIntent(opt.val as any)}
                      className={`p-3 rounded-xl border text-xs font-mono font-semibold transition ${
                        certificationIntent === opt.val
                          ? 'bg-[#FF9900]/20 border-[#FF9900] text-[#FF9900]'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Qualitative Feedback */}
              <div className="pt-6 border-t border-slate-800">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                  5. Qualitative Feedback, Logistics & Technical Highlights
                </label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Share what worked exceptionally well (mentors, Wi-Fi mesh, food) or what could be improved for next edition..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#10B981] text-sm text-white placeholder-slate-400 outline-none transition"
                />
              </div>

              {/* 6. Testimonial Quote */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                  6. Public Testimonial / Builder Quote (Optional)
                </label>
                <textarea
                  rows={2}
                  value={testimonial}
                  onChange={e => setTestimonial(e.target.value)}
                  placeholder="e.g. 'KAIROS 2027 showed us what real cloud engineering at scale feels like — the zero-fee merit model was unforgettable.'"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#10B981] text-sm text-white placeholder-slate-400 outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#10B981] to-emerald-600 text-slate-950 font-bold text-sm hover:brightness-110 transition shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2"
              >
                {submitting ? 'Recording CSAT Submission...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Post-Event CSAT Survey
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                {EVENT_CONFIG.disclaimer.aws}
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
