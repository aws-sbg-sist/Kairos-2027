'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Award, 
  Crown, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { OrgMember } from '@/types';
import { EVENT_CONFIG } from '@/lib/config';

export default function MembersPage() {
  const [members, setMembers] = useState<OrgMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [divisionFilter, setDivisionFilter] = useState('all');

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch('/api/v1/members');
        const data = await res.json();
        if (data.success && data.members) {
          setMembers(data.members);
        }
      } catch (err) {
        console.error('Failed to load members:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(m => {
    const matchesSearch = search === '' || 
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.roleTitle.toLowerCase().includes(search.toLowerCase()) ||
      m.division.toLowerCase().includes(search.toLowerCase());

    const matchesTier = tierFilter === 'all' || 
      (tierFilter === 'HIGHER_MANAGEMENT' ? m.isHigherManagement : m.tier === tierFilter);

    const matchesDivision = divisionFilter === 'all' || 
      m.division.toLowerCase().includes(divisionFilter.toLowerCase());

    return matchesSearch && matchesTier && matchesDivision;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 pt-28 pb-24">
      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#FF9900]/10 via-[#0073BB]/5 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200">Home</Link>
          <span>/</span>
          <span className="text-[#FF9900] font-mono">Organizing Cadre</span>
        </div>

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-xs font-mono font-bold tracking-wider uppercase mb-4">
              <Users className="w-3.5 h-3.5" />
              106 Student Organizers, Leads & Volunteers
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              The Builders Behind <br />
              <span className="bg-gradient-to-r from-[#FF9900] via-amber-300 to-[#0073BB] bg-clip-text text-transparent">
                KAIROS 2027
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Every system, high-density Wi-Fi mesh, 48-hour catering corridor, and Z-score judging engine is engineered by our passionate student community at Sathyabama Institute of Science and Technology.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/members/leadership"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF9900] to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-[#FF9900]/20"
            >
              <Crown className="w-4 h-4" />
              View Higher Management Roster (Batch of 26–27)
            </Link>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl mb-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input (5 cols) */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search member name, role, or division..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-sm text-white placeholder-slate-400 outline-none transition"
              />
            </div>

            {/* Tier Filter (4 cols) */}
            <div className="md:col-span-4">
              <select
                value={tierFilter}
                onChange={e => setTierFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-xs font-mono text-slate-200 outline-none transition"
              >
                <option value="all">All Leadership Tiers</option>
                <option value="HIGHER_MANAGEMENT">Higher Management (Super Heads & Apex)</option>
                <option value="APEX_PRESIDENT">President & SBGL</option>
                <option value="SUPER_HEAD">Super Heads (Divisional Chiefs)</option>
                <option value="CORE_HEAD">Core Heads & Leads</option>
                <option value="FACULTY_ADVISOR">Faculty Advisors</option>
                <option value="VOLUNTEER">Volunteers & Cadre</option>
              </select>
            </div>

            {/* Division Filter (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={divisionFilter}
                onChange={e => setDivisionFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-[#FF9900] text-xs font-mono text-slate-200 outline-none transition"
              >
                <option value="all">All 6 Divisions</option>
                <option value="Division 1">Division 1: Capital & Sponsors</option>
                <option value="Division 2">Division 2: Cloud & Systems</option>
                <option value="Division 3">Division 3: Operations & Venue</option>
                <option value="Division 4">Division 4: Hospitality & Dining</option>
                <option value="Division 5">Division 5: Media & Creative</option>
                <option value="Division 6">Division 6: Safety & Compliance</option>
              </select>
            </div>

          </div>
        </div>

        {/* Members Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-mono text-sm">
            Loading organizing cadre directory...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Members Found</h3>
            <p className="text-xs text-slate-400 mb-4">No organizing member matches the selected filters.</p>
            <button
              onClick={() => { setSearch(''); setTierFilter('all'); setDivisionFilter('all'); }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredMembers.map((member) => (
              <Link
                key={member.id}
                href={`/members/${member.username}`}
                className="group p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#FF9900]/50 transition shadow-lg hover:shadow-2xl hover:shadow-[#FF9900]/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9900]/20 to-[#0073BB]/20 border border-slate-700 flex items-center justify-center font-bold text-lg text-white font-mono shrink-0 group-hover:scale-105 transition">
                      {member.fullName.charAt(0)}
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        member.tier === 'APEX_PRESIDENT' ? 'bg-[#FF9900]/20 text-[#FF9900] border border-[#FF9900]/40' :
                        member.tier === 'SUPER_HEAD' ? 'bg-[#0073BB]/20 text-[#0073BB] border border-[#0073BB]/40' :
                        member.tier === 'FACULTY_ADVISOR' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {member.tier.replace('_', ' ')}
                      </span>
                      {member.registerNo && (
                        <span className="text-[10px] font-mono text-slate-400 mt-1">
                          Reg: {member.registerNo}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF9900] transition mb-1 flex items-center gap-1.5">
                    {member.fullName}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF9900] group-hover:translate-x-1 transition" />
                  </h3>

                  <div className="text-xs text-[#0073BB] font-medium mb-3">
                    {member.roleTitle}
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[180px] font-mono">{member.division}</span>
                  <span className="text-[#FF9900] font-semibold group-hover:underline">View Portfolio →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Disclaimer */}
        <div className="text-center max-w-3xl mx-auto pt-8 border-t border-slate-800/60">
          <p className="text-xs text-slate-400">
            {EVENT_CONFIG.disclaimer.aws}
          </p>
        </div>

      </div>
    </div>
  );
}
