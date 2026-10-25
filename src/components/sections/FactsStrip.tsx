'use client';

import React from 'react';
import { Clock, Users, IndianRupee, MapPin, Coffee, Shield } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export const FactsStrip: React.FC = () => {
  const facts = [
    {
      icon: Clock,
      value: '48 Hours',
      label: 'Continuous Offline Hackathon',
      detail: '22 Jan 11:30 AM – 24 Jan 11:30 AM IST',
    },
    {
      icon: Users,
      value: '75 Elite Teams',
      label: '4 to 6 Builders Per Team',
      detail: 'Up to 450 National Contestants',
    },
    {
      icon: IndianRupee,
      value: '₹0 Fee',
      label: '100% Free Merit Admission',
      detail: 'Zero Cost for All Shortlisted Finalists',
    },
    {
      icon: MapPin,
      value: 'Indoor Stadium',
      label: 'Sathyabama University, Chennai',
      detail: 'Air-Conditioned Arena & Power Mesh',
    },
    {
      icon: Coffee,
      value: '7 Principal Meals',
      label: 'Full Participant Sustenance',
      detail: 'Wholesome Food, Midnight Snacks & Water',
    },
    {
      icon: Shield,
      value: '100 Cadre',
      label: 'Supervised Safety & Rest',
      detail: 'Dedicated Welfare & Rest Rotations',
    },
  ];

  return (
    <section className="relative py-12 border-y border-purple-500/15 bg-kairos-darkest/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {facts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/15 hover:border-purple-500/35 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-900/40 text-purple-300 flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:bg-purple-800/50 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-tight font-mono">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
