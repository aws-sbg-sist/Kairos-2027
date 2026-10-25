'use client';

import React, { useState } from 'react';
import { X, Download, Briefcase, Printer, CheckCircle, ShieldAlert } from 'lucide-react';
import { PROPOSED_SPONSOR_TIERS, EVENT_CONFIG } from '@/lib/config';
import { sound } from '@/lib/audio';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({ isOpen, onClose }) => {
  const [selectedTierId, setSelectedTierId] = useState('title');
  const [companyName, setCompanyName] = useState('');

  if (!isOpen) return null;

  const currentTier = PROPOSED_SPONSOR_TIERS.find(t => t.id === selectedTierId) || PROPOSED_SPONSOR_TIERS[0];

  const handlePrint = () => {
    sound?.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-glow border border-purple-500/40 p-6 sm:p-8 my-8 text-left space-y-6">
        
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
            <Briefcase className="w-3 h-3 text-purple-400" />
            <span>Executive Partnership Scope</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            KAIROS 2027 Sponsorship Prospectus
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Generate and review tailored partnership packages for your corporate developer relations, recruitment, or technology platform goals.
          </p>
        </div>

        {/* Interactive Customizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Target Organization Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Google Cloud / Anthropic"
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-300">Select Partnership Tier</label>
            <select
              value={selectedTierId}
              onChange={(e) => setSelectedTierId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-slate-900"
            >
              {PROPOSED_SPONSOR_TIERS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.amount})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Prospectus Preview Box */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/25 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/15">
            <div>
              <span className="text-[10px] font-mono text-purple-400 block uppercase font-bold">
                PROPOSAL SPECIFICATION
              </span>
              <h4 className="text-lg font-bold text-white">
                {companyName ? `${companyName} · ` : ''}{currentTier.name}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Proposed Support</span>
              <span className="text-lg font-display font-bold text-amber-400">
                {currentTier.amount}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <p className="font-medium text-slate-200">{currentTier.description}</p>
            <div className="space-y-1.5 pt-1">
              {currentTier.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[10px] text-purple-200">
            <strong>Target Fit:</strong> {currentTier.recommendedFor}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <a
              href="/docs/KAIROS_2027_Sponsorship_Prospectus.pdf"
              download="KAIROS_2027_Sponsorship_Prospectus.pdf"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-purple-500/20 text-slate-300 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-purple-400" />
              <span>Print Specification</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-400 font-mono">
            Contact: sistawscc@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
};
