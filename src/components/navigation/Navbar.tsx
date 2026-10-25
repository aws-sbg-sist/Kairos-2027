'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Shield, Sparkles, Clock, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tracks', href: '#tracks' },
    { label: '48h Schedule', href: '#schedule' },
    { label: 'Judging', href: '#judging' },
    { label: 'Awards', href: '#awards' },
    { label: 'Sponsorship', href: '#sponsors' },
    { label: 'Roadmap', href: '#pathway' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-kairos-darkest/85 backdrop-blur-md border-b border-purple-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Organizer Badge */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg p-1">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/assets/kairos-hourglass.png"
                alt="KAIROS 2027 Logo"
                fill
                sizes="40px"
                className="object-contain filter drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1.5">
                KAIROS <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">2027</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-tight font-medium hidden sm:inline-block">
                AWS Student Builder Group · SIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-md hover:text-white hover:bg-purple-500/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/admin/login"
              className="text-xs text-slate-400 hover:text-purple-300 px-2.5 py-1.5 rounded border border-transparent hover:border-purple-500/20 transition-all flex items-center gap-1"
              title="Organizing Committee Portal"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </Link>

            <button
              onClick={onOpenWaitlist}
              className="relative group px-4 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden shadow-md shadow-purple-950/40 transition-all duration-300 hover:shadow-purple-700/30 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 group-hover:opacity-90 transition-opacity" />
              <div className="relative flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
                <span>Join Waitlist</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenWaitlist}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm"
            >
              Waitlist
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-xl glass-panel border border-purple-500/20 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-purple-600/20"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-purple-500/15 flex flex-col gap-2">
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-center py-2 rounded-lg bg-slate-900 border border-purple-500/20 text-purple-300"
              >
                Participant Portal Preview
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-center py-2 rounded-lg text-slate-400 hover:text-white flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Organizers Admin</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
