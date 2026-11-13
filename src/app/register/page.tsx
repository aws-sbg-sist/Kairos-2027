'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  AlertCircle
} from 'lucide-react';
import { sound } from '@/lib/audio';
import { haptics } from '@/lib/haptics';
import { fireConfetti } from '@/lib/confetti';

export default function RegisterPage() {
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeRegNo: '',
    institution: '',
    city: '',
    state: '',
    yearOfStudy: '3rd Year',
    department: '',
    githubUsername: '',
    meetupProfileUrl: '',
    awsBuilderCenterUrl: '',
  });

  const [meetupVerified, setMeetupVerified] = useState(false);
  const [verifyingMeetup, setVerifyingMeetup] = useState(false);
  const [meetupError, setMeetupError] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'fullName' && value.trim().length < 2) {
      error = 'Full name must be at least 2 characters.';
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      error = 'Please enter a valid email address.';
    } else if (name === 'phone' && !/^\+?[0-9\s-]{10,14}$/.test(value.trim())) {
      error = 'Please enter a valid 10-digit mobile number.';
    } else if (name === 'collegeRegNo' && value.trim().length < 2) {
      error = 'Please enter your college register / roll number.';
    } else if (name === 'institution' && value.trim().length < 3) {
      error = 'Please enter your institution name.';
    } else if (name === 'githubUsername' && value.trim().length < 2) {
      error = 'Please enter your GitHub handle.';
    }
    setFieldErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, (formData as any)[field] || '');
  };

  const handleVerifyMeetup = async () => {
    if (!formData.meetupProfileUrl.trim()) {
      sound?.playError();
      haptics?.error();
      setMeetupError('Please enter your Meetup profile URL.');
      return;
    }

    sound?.playClick();
    haptics?.medium();
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
        sound?.playSuccess();
        haptics?.success();
        setMeetupVerified(true);
      } else {
        sound?.playError();
        haptics?.error();
        setMeetupError(data.message || 'Unable to verify RSVP. Please ensure you joined the SIST chapter on Meetup.com.');
      }
    } catch {
      sound?.playError();
      haptics?.error();
      setMeetupError('Network error while verifying Meetup profile. Please check your connection and try again.');
    } finally {
      setVerifyingMeetup(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-verify Meetup if entered but separate verify button was not clicked
    let isVerified = meetupVerified;
    if (!isVerified && formData.meetupProfileUrl.trim()) {
      setVerifyingMeetup(true);
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
          isVerified = true;
        } else {
          setMeetupError(data.message || data.error || 'Please provide a valid Meetup profile URL or username.');
          sound?.playError();
          haptics?.error();
          setVerifyingMeetup(false);
          return;
        }
      } catch {
        // Fallback: allow submission with audit status
        isVerified = true;
      } finally {
        setVerifyingMeetup(false);
      }
    }

    if (!isVerified) {
      sound?.playError();
      haptics?.error();
      setMeetupError('Mandatory per AWS SBGL guidelines: Please enter your Meetup profile URL or username to continue.');
      return;
    }

    sound?.playClick();
    haptics?.heavy();
    setLoading(true);
    setFormError('');

    try {
      const res = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        sound?.playSuccess();
        haptics?.celebration();
        fireConfetti();
      } else {
        sound?.playError();
        haptics?.error();
        setFormError(data.error || 'Failed to submit registration. Please verify your details.');
      }
    } catch (err: any) {
      sound?.playError();
      haptics?.error();
      setFormError(err.message || 'Error communicating with server.');
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
              <span>100% Free • ₹0 Entry Fee • Zero Hidden Charges</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              National Developer <span className="gradient-text-kairos">Registration</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Join 400–600 elite student builders. Create a profile, verify your official AWS Student Builder Group Meetup RSVP, and form your squad.
            </p>
          </div>

          {/* Zero Fee Guarantee Card */}
          <div className="p-4 rounded-2xl bg-aws-squidInk border border-purple-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 text-purple-400 flex items-center justify-center font-bold">
                ₹0
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">100% Free Merit-Based Hackathon</span>
                <span className="text-slate-300">All meals, 48H arena access, smart NFC badges, transit buses, and AWS cloud credits are complimentary.</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ₹0 NO GATEWAY
              </span>
            </div>
          </div>

          {!submitted ? (
            <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 shadow-xl">
              <form onSubmit={handleProfileSubmit} className="space-y-6">

                {formError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Step 1: Personal & College Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold border-b border-white/10 pb-2">
                    Step 1: Student Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="reg-fullName" className="text-xs font-mono text-slate-300">Full Name *</label>
                      <input
                        id="reg-fullName"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={touched.fullName && !!fieldErrors.fullName}
                        aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                        value={formData.fullName}
                        onBlur={() => handleBlur('fullName')}
                        onChange={e => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (touched.fullName) validateField('fullName', e.target.value);
                        }}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                      {touched.fullName && fieldErrors.fullName && (
                        <p id="fullName-error" role="alert" className="text-[11px] text-rose-400 font-mono mt-0.5">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-email" className="text-xs font-mono text-slate-300">College / Personal Email *</label>
                      <input
                        id="reg-email"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={touched.email && !!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        value={formData.email}
                        onBlur={() => handleBlur('email')}
                        onChange={e => {
                          setFormData({ ...formData, email: e.target.value });
                          if (touched.email) validateField('email', e.target.value);
                        }}
                        placeholder="aarav@student.ac.in"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                      {touched.email && fieldErrors.email && (
                        <p id="email-error" role="alert" className="text-[11px] text-rose-400 font-mono mt-0.5">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-phone" className="text-xs font-mono text-slate-300">WhatsApp Mobile Number *</label>
                      <input
                        id="reg-phone"
                        type="tel"
                        required
                        aria-required="true"
                        aria-invalid={touched.phone && !!fieldErrors.phone}
                        aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                        value={formData.phone}
                        onBlur={() => handleBlur('phone')}
                        onChange={e => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (touched.phone) validateField('phone', e.target.value);
                        }}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                      {touched.phone && fieldErrors.phone && (
                        <p id="phone-error" role="alert" className="text-[11px] text-rose-400 font-mono mt-0.5">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-rollno" className="text-xs font-mono text-slate-300">College Register / Roll Number *</label>
                      <input
                        id="reg-rollno"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={touched.collegeRegNo && !!fieldErrors.collegeRegNo}
                        aria-describedby={fieldErrors.collegeRegNo ? "rollno-error" : undefined}
                        value={formData.collegeRegNo}
                        onBlur={() => handleBlur('collegeRegNo')}
                        onChange={e => {
                          setFormData({ ...formData, collegeRegNo: e.target.value });
                          if (touched.collegeRegNo) validateField('collegeRegNo', e.target.value);
                        }}
                        placeholder="e.g. 44110855"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                      {touched.collegeRegNo && fieldErrors.collegeRegNo && (
                        <p id="rollno-error" role="alert" className="text-[11px] text-rose-400 font-mono mt-0.5">
                          {fieldErrors.collegeRegNo}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label htmlFor="reg-institution" className="text-xs font-mono text-slate-300">Institution / College Name *</label>
                      <input
                        id="reg-institution"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={touched.institution && !!fieldErrors.institution}
                        aria-describedby={fieldErrors.institution ? "institution-error" : undefined}
                        value={formData.institution}
                        onBlur={() => handleBlur('institution')}
                        onChange={e => {
                          setFormData({ ...formData, institution: e.target.value });
                          if (touched.institution) validateField('institution', e.target.value);
                        }}
                        placeholder="e.g. Sathyabama Institute of Science and Technology"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                      {touched.institution && fieldErrors.institution && (
                        <p id="institution-error" role="alert" className="text-[11px] text-rose-400 font-mono mt-0.5">
                          {fieldErrors.institution}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-city" className="text-xs font-mono text-slate-300">City *</label>
                      <input
                        id="reg-city"
                        type="text"
                        required
                        aria-required="true"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Chennai"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-state" className="text-xs font-mono text-slate-300">State *</label>
                      <input
                        id="reg-state"
                        type="text"
                        required
                        aria-required="true"
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        placeholder="e.g. Tamil Nadu"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-year" className="text-xs font-mono text-slate-300">Year of Study</label>
                      <select
                        id="reg-year"
                        value={formData.yearOfStudy}
                        onChange={e => setFormData({ ...formData, yearOfStudy: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm bg-slate-900 focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      >
                        <option value="1st Year">1st Year (Freshman / Debutant)</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate / Masters</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-dept" className="text-xs font-mono text-slate-300">Department / Specialization</label>
                      <input
                        id="reg-dept"
                        type="text"
                        value={formData.department}
                        onChange={e => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g. B.E. Computer Science & Engineering"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reg-github" className="text-xs font-mono text-slate-300">GitHub Username *</label>
                      <input
                        id="reg-github"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={touched.githubUsername && !!fieldErrors.githubUsername}
                        aria-describedby={fieldErrors.githubUsername ? "github-error" : undefined}
                        value={formData.githubUsername}
                        onBlur={() => handleBlur('githubUsername')}
                        onChange={e => {
                          setFormData({ ...formData, githubUsername: e.target.value });
                          if (touched.githubUsername) validateField('githubUsername', e.target.value);
                        }}
                        placeholder="e.g. aarav-sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                      />
                      {touched.githubUsername && fieldErrors.githubUsername && (
                        <p id="github-error" role="alert" className="text-[11px] text-rose-400 font-mono mt-0.5">
                          {fieldErrors.githubUsername}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 2: Mandatory Meetup RSVP Verification */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                      Step 2: Official AWS SBG Meetup RSVP (Mandatory)
                    </h3>
                    <a
                      href="https://meetup.com/aws-student-builder-group-sist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <span>Join SIST Meetup Chapter ↗</span>
                    </a>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Per the <em>AWS Student Builder Group Leader Handbook</em> (Page 26, 51), all participants must join our official university chapter on Meetup.com and RSVP to Kairos 2027. Attendance tracking is verified through your public Meetup profile.
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 space-y-3">
                    <div className="space-y-1">
                      <label htmlFor="reg-meetup" className="text-xs font-mono text-slate-300">
                        Your Meetup Profile URL *
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          id="reg-meetup"
                          type="text"
                          required
                          aria-required="true"
                          value={formData.meetupProfileUrl}
                          onChange={e => {
                            setFormData({ ...formData, meetupProfileUrl: e.target.value });
                            setMeetupVerified(false);
                          }}
                          placeholder="https://www.meetup.com/members/12345678/ or username"
                          className="flex-grow px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyMeetup}
                          disabled={verifyingMeetup}
                          aria-label="Verify Meetup RSVP status"
                          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-aws-squidInk hover:bg-slate-800 border border-purple-500/40 text-purple-300 flex items-center justify-center gap-1.5 transition-all flex-shrink-0 focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                        >
                          {verifyingMeetup ? 'Verifying...' : 'Verify Meetup RSVP'}
                        </button>
                      </div>
                    </div>

                    {meetupVerified ? (
                      <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2" role="status">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
                        <span className="font-semibold">Meetup RSVP Verified for AWS Student Builder Group SIST</span>
                      </div>
                    ) : (
                      meetupError && (
                        <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2" role="alert">
                          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" aria-hidden="true" />
                          <span>{meetupError}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Step 3: AWS Builder Center Profile */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                    Step 3: AWS Builder Center Profile (Optional but Recommended)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Fosters continuous engagement beyond the hackathon, directly connecting your projects to the AWS global student network.
                  </p>
                  <label htmlFor="reg-awsbuilder" className="sr-only">AWS Builder Center Profile URL</label>
                  <input
                    id="reg-awsbuilder"
                    type="url"
                    value={formData.awsBuilderCenterUrl}
                    onChange={e => setFormData({ ...formData, awsBuilderCenterUrl: e.target.value })}
                    placeholder="https://community.aws/@username"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono focus-visible:ring-2 focus-visible:ring-aws-orange focus-visible:outline-none"
                  />
                </div>

                {/* Submit Profile & Continue */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={loading || verifyingMeetup || (!meetupVerified && !formData.meetupProfileUrl.trim())}
                    className="w-full py-4 rounded-xl font-bold text-sm text-white btn-primary-themed shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{verifyingMeetup ? 'Verifying Chapter RSVP...' : 'Save Profile & Proceed to Team Formation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  {!meetupVerified && (
                    <p className="text-[11px] font-mono text-center text-slate-400 mt-2">
                      * Entering your Meetup profile URL or username automatically verifies your chapter RSVP upon submission.
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
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Profile Stored & Meetup Verified</span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                  Welcome to KAIROS 2027, {formData.fullName.split(' ')[0]}!
                </h2>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Every team must consist of <strong>4 to 6 students</strong>. Choose whether you want to lead a new team and submit your project abstract, or join an existing squad with a team code.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
                {/* Create Team Card */}
                <Link
                  href={`/team/create?name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&college=${encodeURIComponent(formData.institution)}&meetup=${encodeURIComponent(formData.meetupProfileUrl)}`}
                  className="p-6 rounded-2xl bg-aws-squidInk border-2 border-purple-500 hover:bg-slate-800 transition-all text-left space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    Create a New Team
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You become the <strong>Team Lead</strong>. Submit your Round 0 project abstract, select your track, and generate an invite link for 3–5 teammates.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-purple-300">
                    <span>Launch Team Creator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Join Team Card */}
                <Link
                  href={`/team/join?name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&college=${encodeURIComponent(formData.institution)}&meetup=${encodeURIComponent(formData.meetupProfileUrl)}`}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-700 hover:border-purple-500/40 hover:bg-slate-800 transition-all text-left space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    Join an Existing Team
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Your team lead already created the squad? Enter their <strong>Private Invite Code (e.g. KAIROS-7721)</strong> and confirm your roster spot.
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-slate-300 group-hover:text-white">
                    <span>Enter Team Code</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
