'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Users,
  UserPlus,
  ExternalLink,
  Lock,
  AlertCircle,
  Download
} from 'lucide-react';
import { EVENT_CONFIG, TECHNICAL_TRACKS } from '@/lib/config';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    collegeRegNo: '',
    institution: '',
    city: '',
    state: '',
    yearOfStudy: '3rd Year',
    department: 'Computer Science & Engineering',
    preferredTrack: TECHNICAL_TRACKS[0].title,
    tShirtSize: 'L',
    githubUsername: '',
    meetupProfileUrl: '',
    awsBuilderCenterUrl: '',
  });

  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [meetupVerified, setMeetupVerified] = useState(false);
  const [verifyingMeetup, setVerifyingMeetup] = useState(false);
  const [meetupError, setMeetupError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [alreadyRegisteredConflict, setAlreadyRegisteredConflict] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/v1/student/me')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.success && data.student) {
          const s = data.student;
          setSessionEmail(s.email);
          setFormData(prev => ({
            ...prev,
            fullName: s.fullName || prev.fullName,
            email: s.email || prev.email,
            phone: s.phone || prev.phone,
            institution: s.institution || prev.institution,
            department: s.department || prev.department,
            yearOfStudy: s.yearOfStudy || prev.yearOfStudy,
            tShirtSize: s.tshirtSize || prev.tShirtSize,
            githubUsername: s.githubUrl || prev.githubUsername,
          }));
        }
      })
      .catch(() => {
        // Anonymous visitor stays in standard registration flow
      });
  }, []);

  const handleVerifyMeetup = async () => {
    if (!formData.meetupProfileUrl.trim()) {
      setMeetupError('Please enter your Meetup profile URL.');
      return;
    }

    setVerifyingMeetup(true);
    setMeetupError('');

    try {
      const res = await fetch('/api/v1/meetup/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetup_profile_url: formData.meetupProfileUrl,
          email: formData.email
        }),
      });

      const data = await res.json();
      if (res.ok && data.verified) {
        setMeetupVerified(true);
      } else {
        setMeetupError(data.message || data.error || 'Unable to verify RSVP. Please ensure you joined the SIST chapter on Meetup.com.');
      }
    } catch {
      setMeetupError('Network error reaching verification service. Please check your connection and try again.');
    } finally {
      setVerifyingMeetup(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setAlreadyRegisteredConflict(false);

    if (!meetupVerified) {
      setMeetupError('Mandatory per AWS SBGL guidelines: Please verify your Meetup RSVP before continuing.');
      return;
    }

    if (!sessionEmail) {
      if (formData.password.length < 8) {
        setSubmitError('Builder account password must be at least 8 characters long.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setSubmitError('Passwords do not match. Please re-enter carefully.');
        return;
      }
    }

    setLoading(true);

    try {
      const normalizedEmail = formData.email.trim().toLowerCase();

      // Step 1: Create/claim persistent builder account & set session cookie if not signed in
      if (!sessionEmail) {
        const authRes = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: normalizedEmail,
            password: formData.password,
            institution: formData.institution.trim(),
            phone: formData.phone.trim(),
            department: formData.department.trim(),
            yearOfStudy: formData.yearOfStudy,
            tshirtSize: formData.tShirtSize,
          }),
        });

        const authData = await authRes.json();
        if (!authRes.ok || !authData.success) {
          if (authRes.status === 409) {
            setAlreadyRegisteredConflict(true);
          }
          setSubmitError(authData.error || 'Unable to create your builder login account.');
          return;
        }
        setSessionEmail(normalizedEmail);
      }

      // Step 2: Persist full participant & Meetup intake record
      const cleanGithub = formData.githubUsername.trim();
      const githubUrl = cleanGithub
        ? (cleanGithub.startsWith('http://') || cleanGithub.startsWith('https://')
            ? cleanGithub
            : `https://github.com/${cleanGithub.replace(/^@/, '')}`)
        : '';

      const regRes = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: normalizedEmail,
          phone: formData.phone.trim(),
          collegeRegNo: formData.collegeRegNo.trim(),
          institution: formData.institution.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          yearOfStudy: formData.yearOfStudy,
          department: formData.department.trim(),
          preferredTrack: formData.preferredTrack,
          tShirtSize: formData.tShirtSize,
          githubUrl,
          meetupProfileUrl: formData.meetupProfileUrl.trim(),
          meetupVerified,
          awsBuilderCenterUrl: formData.awsBuilderCenterUrl.trim(),
        }),
      });

      const regData = await regRes.json();
      if (regRes.ok && regData.success) {
        setSubmitted(true);
      } else if (regRes.status === 409 && regData.code === 'EMAIL_ALREADY_REGISTERED') {
        // Account just authenticated or already on waitlist — still advance cleanly
        setSubmitted(true);
      } else {
        setSubmitError(regData.error || 'Failed to save your participant profile. Please review your details.');
      }
    } catch {
      setSubmitError('Network error while recording your registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 shadow-md">
              <div className="relative w-4 h-4 rounded overflow-hidden">
                <Image
                  src="/assets/register.png"
                  alt="Registration"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Phase 0 National Screening • Round 0 Live</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              National Developer <span className="gradient-text-kairos">Registration</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Create your unified Builder Account, verify your AWS Student Builder Group Meetup RSVP, and form your 3–6 member squad.
            </p>
          </div>

          {/* Registration Fee & Resources Clarity Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-aws-squidInk border border-purple-500/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-white block">Free Round 0 &amp; Round 1 Screening · Squads of 3 to 6 Builders</span>
                <span className="text-slate-300 block">Nominal confirmation fee applies only if shortlisted among the Top 100 finalists for Round 2 on campus.</span>
                <div className="flex flex-wrap items-center gap-3 pt-0.5 font-mono">
                  <Link href="/radar" className="text-purple-300 hover:text-white underline">
                    Need teammates? Open Builder Radar →
                  </Link>
                  <a
                    href={EVENT_CONFIG.downloads.pitchTemplatePptx}
                    download="KAIROS_2027_Round0_Pitch_Template.pptx"
                    className="text-sky-300 hover:text-white inline-flex items-center gap-1 underline"
                  >
                    <Download className="w-3 h-3" />
                    Round 0 Pitch Template (.pptx)
                  </a>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                R0 &amp; R1: FREE (₹0)
              </span>
            </div>
          </div>

          {!submitted ? (
            <div className="p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl">
              {sessionEmail && (
                <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex flex-wrap items-center justify-between gap-2">
                  <span>Signed in as <strong className="text-white font-mono">{sessionEmail}</strong></span>
                  <Link href="/dashboard" className="font-mono underline hover:text-white">
                    Open Dashboard →
                  </Link>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                  {alreadyRegisteredConflict && (
                    <Link href="/login" className="px-3 py-1 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-500">
                      Sign In Instead →
                    </Link>
                  )}
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-6">

                {/* Step 1: Personal, Account & College Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-purple-300 font-bold border-b border-white/10 pb-2">
                    Step 1: Builder Identity &amp; Academic Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">College / Personal Email *</label>
                      <input
                        type="email"
                        required
                        disabled={Boolean(sessionEmail)}
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aarav@student.ac.in"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm disabled:opacity-60"
                      />
                    </div>

                    {!sessionEmail && (
                      <>
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-purple-400" />
                            <span>Create Portal Password *</span>
                          </label>
                          <input
                            type="password"
                            required
                            minLength={8}
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Minimum 8 characters"
                            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-purple-400" />
                            <span>Confirm Password *</span>
                          </label>
                          <input
                            type="password"
                            required
                            minLength={8}
                            value={formData.confirmPassword}
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Re-enter password"
                            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">WhatsApp Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">College Register / Roll Number *</label>
                      <input
                        type="text"
                        required
                        value={formData.collegeRegNo}
                        onChange={e => setFormData({ ...formData, collegeRegNo: e.target.value })}
                        placeholder="e.g. 44110855"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-mono text-slate-300">Institution / College Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.institution}
                        onChange={e => setFormData({ ...formData, institution: e.target.value })}
                        placeholder="e.g. Sathyabama Institute of Science and Technology"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Department / Specialization *</label>
                      <input
                        type="text"
                        required
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g. Computer Science & Engineering"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Preferred Track</label>
                      <select
                        value={formData.preferredTrack}
                        onChange={e => setFormData({ ...formData, preferredTrack: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                      >
                        {TECHNICAL_TRACKS.map(track => (
                          <option key={track.id} value={track.title}>
                            {track.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Chennai"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">State *</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        placeholder="e.g. Tamil Nadu"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Year of Study</label>
                      <select
                        value={formData.yearOfStudy}
                        onChange={e => setFormData({ ...formData, yearOfStudy: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                      >
                        <option value="1st Year">1st Year (Freshman / Debutant)</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate / Masters</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">T-Shirt Size (Finalist Swag)</label>
                      <select
                        value={formData.tShirtSize}
                        onChange={e => setFormData({ ...formData, tShirtSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900"
                      >
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                        <option value="XXL">Double Extra Large (XXL)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-mono text-slate-300">GitHub Profile URL or Username *</label>
                      <input
                        type="text"
                        required
                        value={formData.githubUsername}
                        onChange={e => setFormData({ ...formData, githubUsername: e.target.value })}
                        placeholder="e.g. aarav-sharma or https://github.com/aarav-sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Mandatory Meetup RSVP Verification */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xs font-mono text-purple-300 font-bold">
                      Step 2: Official AWS SBG Meetup RSVP (Mandatory)
                    </h3>
                    <a
                      href={EVENT_CONFIG.socialHandles.meetup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>Join SIST Meetup Chapter ↗</span>
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Per the <em>AWS Student Builder Group Leader Handbook</em>, all participants must join our official university chapter on Meetup.com and RSVP to Kairos 2027.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">
                        Your Meetup Profile URL *
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="url"
                          required
                          value={formData.meetupProfileUrl}
                          onChange={e => {
                            setFormData({ ...formData, meetupProfileUrl: e.target.value });
                            setMeetupVerified(false);
                          }}
                          placeholder="https://www.meetup.com/members/12345678/"
                          className="flex-grow px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyMeetup}
                          disabled={verifyingMeetup}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-aws-squidInk hover:bg-slate-800 border border-purple-500/40 text-purple-300 flex items-center justify-center gap-1.5 transition-colors flex-shrink-0"
                        >
                          {verifyingMeetup ? 'Verifying...' : 'Verify Meetup RSVP'}
                        </button>
                      </div>
                    </div>

                    {meetupVerified ? (
                      <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="font-semibold">Meetup RSVP Verified for AWS Student Builder Group SIST</span>
                      </div>
                    ) : (
                      meetupError && (
                        <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                          <span>{meetupError}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Step 3: AWS Builder Center Profile */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h3 className="text-xs font-mono text-purple-300 font-bold">
                    Step 3: AWS Builder Center Profile (Optional)
                  </h3>
                  <input
                    type="url"
                    value={formData.awsBuilderCenterUrl}
                    onChange={e => setFormData({ ...formData, awsBuilderCenterUrl: e.target.value })}
                    placeholder="https://community.aws/@username"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                  />
                </div>

                {/* Submit Profile & Continue */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    type="submit"
                    disabled={loading || !meetupVerified}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white btn-primary-themed shadow-lg shadow-purple-900/40 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Creating Builder Account & Saving Profile...' : 'Register & Proceed to Team Formation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {!meetupVerified && (
                    <p className="text-[11px] font-mono text-center text-slate-400">
                      * Click &ldquo;Verify Meetup RSVP&rdquo; above to enable registration.
                    </p>
                  )}
                  {!sessionEmail && (
                    <p className="text-xs text-center text-slate-400">
                      Already have an account?{' '}
                      <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold underline">
                        Sign In to Builder Portal
                      </Link>
                    </p>
                  )}
                </div>

              </form>
            </div>
          ) : (
            /* Branching Step: Create vs Join Team */
            <div className="p-8 sm:p-12 rounded-3xl bg-aws-card border border-purple-500/40 shadow-2xl space-y-8 animate-fadeIn text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span role="status" className="text-xs font-mono text-emerald-400 font-medium">
                  Builder Account Active · Profile Stored &amp; Meetup Verified
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                  Welcome to KAIROS 2027, {formData.fullName.split(' ')[0]}!
                </h2>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Every squad must consist of <strong>3 to 6 builders</strong>. Create a new squad, join an existing team code, or access your Builder Dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
                <Link
                  href={`/team/create?name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&college=${encodeURIComponent(formData.institution)}&meetup=${encodeURIComponent(formData.meetupProfileUrl)}`}
                  className="p-6 rounded-2xl bg-aws-squidInk border-2 border-purple-500 hover:bg-slate-800 transition-colors text-left space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-700 to-purple-900 text-white flex items-center justify-center font-bold">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    Create a New Team
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Become the <strong>Team Lead</strong>, upload your Round 0 pitch deck or abstract, and invite 2 to 5 teammates.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-purple-300">
                    <span>Launch Team Creator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  href={`/team/join?name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&college=${encodeURIComponent(formData.institution)}&meetup=${encodeURIComponent(formData.meetupProfileUrl)}`}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-700 hover:border-purple-500/40 hover:bg-slate-800 transition-colors text-left space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    Join an Existing Team
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Have a <strong>Team Code (e.g. KAIROS-T042)</strong>? Enter it now and lock in your squad spot.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-slate-300 group-hover:text-white">
                    <span>Enter Team Code</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition-colors"
                >
                  Open Builder Dashboard &amp; Pass →
                </Link>
                <a
                  href={EVENT_CONFIG.downloads.pitchTemplatePptx}
                  download="KAIROS_2027_Round0_Pitch_Template.pptx"
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-slate-950 text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Round 0 PPT Template</span>
                </a>
                <a
                  href={EVENT_CONFIG.socialHandles.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono inline-flex items-center gap-1 transition-colors"
                >
                  <span>Instagram ({EVENT_CONFIG.socialHandles.instagram})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
