'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function ParticipantPortalRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-aws-canvas text-slate-100 flex flex-col justify-center items-center px-4 text-center space-y-4">
      <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
      <p className="text-sm font-mono text-slate-300">
        Opening Unified Builder Dashboard...
      </p>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold transition-colors"
      >
        <span>Continue to Dashboard</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
