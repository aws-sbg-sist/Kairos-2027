'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { sound } from '@/lib/audio';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavbarProps {
  onOpenWaitlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (sound) {
      setSoundEnabled(sound.isEnabled());
      const unsub = sound.subscribe((en) => setSoundEnabled(en));
      return () => {
        window.removeEventListener('scroll', handleScroll);
        unsub();
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavLinks: NavLinkItem[] = [
    { label: 'Tracks', href: '/tracks' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'Qualifier', href: '/online-qualifier' },
    { label: 'Rainmaker', href: '/refer-sponsor', badge: 'Referral' },
    { label: 'Rules', href: '/rules' },
  ];

  const secondaryNavLinks: NavLinkItem[] = [
    { label: 'Resources', href: '/resources' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Leadership', href: '/members/leadership' },
    { label: 'On-Campus R2', href: '/on-campus' },
  ];

  const allNavLinks: NavLinkItem[] = [...primaryNavLinks, ...secondaryNavLinks];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[70] pointer-events-auto transition-colors duration-200 pt-[env(safe-area-inset-top,0px)] ${
        scrolled
          ? 'bg-[#090A0D]/95 backdrop-blur-md border-b border-white/10 py-2.5 shadow-lg shadow-black/80'
          : 'bg-[#090A0D]/80 backdrop-blur-sm border-b border-white/5 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Co-Branding Lockup */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange rounded-md p-1">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
              <Image
                src="/assets/kairos-hourglass.png"
                alt="KAIROS 2027 Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg tracking-wider text-white">
                  KAIROS
                </span>
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                  2027
                </span>
              </div>
              <span className="text-xs text-slate-400 font-normal hidden sm:inline-block whitespace-nowrap">
                AWS Student Builder Group SIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-300">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => sound?.playHover()}
                  onClick={() => sound?.playClick()}
                  className={`px-3 py-1.5 rounded-md transition-colors relative whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold border border-white/10'
                      : 'hover:text-white hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-white/10 text-slate-300 border border-white/10 font-medium">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}

            {/* "More" Dropdown */}
            <div className="relative" onMouseLeave={() => setMoreMenuOpen(false)}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                onMouseEnter={() => setMoreMenuOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:text-white hover:bg-white/5 text-slate-300 transition-colors"
                aria-expanded={moreMenuOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-48 py-2 rounded-md bg-[#12141A] border border-white/10 shadow-2xl z-50 origin-top-right">
                  {secondaryNavLinks.map((subLink) => (
                    <Link
                      key={subLink.label}
                      href={subLink.href}
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {subLink.label}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-white/10" />
                  <Link
                    href="/admin/login"
                    onClick={() => setMoreMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            {/* Audio Toggle */}
            <button
              onClick={() => sound?.toggle()}
              onMouseEnter={() => sound?.playHover()}
              className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
              title={soundEnabled ? "Mute Ambient FX" : "Enable Ambient FX"}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>

            <Link
              href="/dashboard"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 transition-colors"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/login"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-md border border-white/10 hover:border-white/20 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin</span>
            </Link>

            <Link
              href="/register"
              onMouseEnter={() => sound?.playHover()}
              onClick={() => sound?.playClick()}
              className="px-4 py-1.5 rounded-md text-xs font-semibold bg-[#FF9900] hover:bg-[#F59E0B] text-black transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Register</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/register"
              className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#FF9900] text-black hover:bg-[#F59E0B] transition-colors"
            >
              Register
            </Link>
            <button
              onClick={() => { sound?.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
              className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-md border border-white/10 space-y-2 animate-fadeIn bg-[#12141A] max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain">
            <div className="grid grid-cols-2 gap-1 pb-2 border-b border-white/10">
              {allNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => { sound?.playClick(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded-md text-xs text-slate-200 hover:text-white hover:bg-white/10 font-medium flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-slate-300 font-mono">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-center py-2.5 rounded-md font-semibold bg-[#FF9900] text-black hover:bg-[#F59E0B]"
              >
                Register your team
              </Link>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-md bg-[#181B23] border border-white/10 text-slate-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-md bg-[#181B23] border border-white/10 text-slate-300 flex items-center justify-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
