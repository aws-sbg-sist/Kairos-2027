import React from 'react';

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#07070b] text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
          Loading KAIROS 2027...
        </span>
      </div>
    </div>
  );
}
