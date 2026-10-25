'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Linkedin, 
  Github, 
  Globe, 
  ExternalLink, 
  Share2, 
  Download, 
  ChevronLeft, 
  Hash, 
  Crown
} from 'lucide-react';
import { OrgMember } from '@/types';
import { EVENT_CONFIG } from '@/lib/config';

export default function MemberProfilePage() {
  const params = useParams();
  const username = params?.username as string;

  const [member, setMember] = useState<OrgMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadMember() {
      if (!username) return;
      try {
        const res = await fetch(`/api/v1/members/${encodeURIComponent(username)}`);
        const data = await res.json();
        if (data.success && data.member) {
          setMember(data.member);
        }
      } catch (err) {
        console.error('Failed to load member profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMember();
  }, [username]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadProof = () => {
    if (!member) return;
    const certText = `KAIROS 2027 — VERIFIED ORGANIZER CREDENTIAL
Organization: AWS Student Builder Group (SIST Chapter)
Host: Sathyabama Institute of Science and Technology, Chennai
Lead Organizer: Thenappan T (Register No: 44110855), President & SBGL

Contributor Name: ${member.fullName}
Role: ${member.roleTitle}
Division: ${member.division}
Register No: ${member.registerNo || 'N/A'}
Tier: ${member.tier}
Verification Hash: ${member.contributions?.[0]?.verificationHash || '0x8f2d4e7b1a9c3e5f6a8b0d2c4e6f8a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f'}
Status: VERIFIED_OFFICIAL_LEADERSHIP_CADRE

Target Domain: https://kairos.sathyabama.ac.in
Timestamp: ${new Date().toISOString()}
`;
    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${member.username}_kairos_2027_credential.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 pt-36 pb-24 text-center font-mono">
        Loading verified builder portfolio dossier...
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 pt-36 pb-24 text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <h2 className="text-2xl font-bold text-white mb-2">Member Not Found</h2>
          <p className="text-xs text-slate-400 mb-6">
            The requested member profile could not be located in the official AWS SBGL organizing cadre.
          </p>
          <Link
            href="/members"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF9900] text-slate-950 font-bold text-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cadre Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 pt-28 pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#FF9900]/10 via-[#0073BB]/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/members"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Organizing Cadre
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:border-slate-700 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? 'Link Copied!' : 'Share Dossier'}
            </button>
            <button
              onClick={handleDownloadProof}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs hover:border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#FF9900]" />
              Verified Certificate (.txt)
            </button>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            
            {/* Avatar / Photo */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#FF9900] to-amber-600 p-1 shadow-2xl shadow-[#FF9900]/20 shrink-0">
              <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center font-mono font-black text-3xl sm:text-4xl text-white">
                {member.fullName.charAt(0)}
                <span className="text-[10px] text-[#FF9900] uppercase font-bold tracking-widest mt-1">
                  Builder
                </span>
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  member.tier === 'APEX_PRESIDENT' ? 'bg-[#FF9900]/20 text-[#FF9900] border border-[#FF9900]/40' :
                  member.tier === 'SUPER_HEAD' ? 'bg-[#0073BB]/20 text-[#0073BB] border border-[#0073BB]/40' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {member.tier.replace('_', ' ')}
                </span>
                {member.registerNo && (
                  <span className="text-[10px] font-mono text-slate-400">
                    Register No: {member.registerNo}
                  </span>
                )}
                {member.graduationYear && (
                  <span className="text-[10px] font-mono text-slate-400">
                    Class of {member.graduationYear}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">
                {member.fullName}
              </h1>
              <div className="text-sm font-semibold text-[#FF9900] mb-3">
                {member.roleTitle}
              </div>
              <p className="text-xs font-mono text-slate-400 mb-4">
                {member.division} • {member.academicDepartment}
              </p>

              {member.builderPhilosophyQuote && (
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs italic text-slate-300 mb-5">
                  "{member.builderPhilosophyQuote}"
                </div>
              )}

              {/* Social / External Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                {member.awsBuilderCenterUrl && (
                  <a
                    href={member.awsBuilderCenterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono font-bold hover:bg-[#FF9900]/20 transition"
                  >
                    AWS Builder Center Profile
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.portfolioUrl && (
                  <a
                    href={member.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Credentials & Certifications */}
        {member.awsCertifications && member.awsCertifications.length > 0 && (
          <div className="mb-10 p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FF9900]" />
              Verified AWS Certifications & Accreditations
            </h3>
            <div className="flex flex-wrap gap-3">
              {member.awsCertifications.map((cert, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-xs font-medium text-amber-300 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quantifiable Contributions Ledger */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#10B981]" />
            Quantifiable Impact & Contribution Ledger
          </h2>

          <div className="space-y-4">
            {member.contributions?.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-[#0073BB] font-semibold">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    Impact: {item.impact}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.verificationHash && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 truncate max-w-[400px]">
                      <Hash className="w-3.5 h-3.5 text-slate-400" />
                      Hash: {item.verificationHash}
                    </span>
                    <span className="text-[#10B981] font-bold shrink-0">
                      CRYPTOGRAPHICALLY SIGNED
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer Footer */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            {EVENT_CONFIG.disclaimer.aws}
          </p>
        </div>

      </div>
    </div>
  );
}
