'use client';

import React from 'react';
import { X, ShieldCheck, FileText, Lock, Users } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-glow border border-purple-500/40 p-6 sm:p-8 my-8 text-left space-y-6 max-h-[85vh] overflow-y-auto">
        
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
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <span>Governance & Rules</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            KAIROS 2027 Official Policy & Code of Conduct
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Standard guidelines established by the AWS Student Builder Group (SIST Chapter).
          </p>
        </div>

        {/* Section 1: Competition Rules */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-500/15 pt-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>1. 48-Hour Competition Rules</span>
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Teams must consist of 4 to 6 eligible student members enrolled in an accredited higher-education institution.</li>
            <li>All application code must be authored between Friday, 22 January 2027 at 11:30 AM IST and Sunday, 24 January 2027 at 11:30 AM IST.</li>
            <li>Open-source libraries, frameworks, cloud primitives, and foundation models are fully permitted. Pre-built proprietary applications or unfinished projects authored prior to the clock start are strictly prohibited.</li>
            <li>Repository commit history must reflect steady, authentic development across the 48-hour timeline and will be audited during mandatory checkpoints.</li>
          </ul>
        </div>

        {/* Section 2: Code of Conduct & Welfare */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-500/15 pt-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span>2. Code of Conduct & Participant Welfare</span>
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>KAIROS is dedicated to a harassment-free, collaborative, and inclusive experience for every participant regardless of gender, identity, disability, or background.</li>
            <li>Builder welfare is paramount: sleep deprivation is neither required nor rewarded. Teams are encouraged to utilize voluntary rest shifts in supervised quiet quarters.</li>
            <li>Zero tolerance for intellectual property theft, academic dishonesty, or unsportsmanlike conduct. Violations will result in immediate disqualification.</li>
          </ul>
        </div>

        {/* Section 3: Privacy & Data Retention */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-500/15 pt-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span>3. Privacy & Data Handling</span>
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Personal contact information collected via the early-interest waitlist and team application portal is used strictly for event coordination, screening, and logistics.</li>
            <li>Participant résumés and portfolios are shared with prospective corporate partners solely on an opt-in basis with explicit applicant consent.</li>
            <li>Student contact data is never sold, publicly leaked, or shared with unauthorized third-party marketers.</li>
          </ul>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between text-[11px] text-slate-400">
          <span>Sathyabama Institute of Science and Technology · Chennai</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-purple-900/60 text-purple-200 hover:bg-purple-800"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
