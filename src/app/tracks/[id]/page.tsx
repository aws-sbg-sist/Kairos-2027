import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { PROBLEM_STATEMENTS } from '@/lib/problem-statements';

export function generateStaticParams() {
  return PROBLEM_STATEMENTS.map((item) => ({ id: item.id.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = PROBLEM_STATEMENTS.find((statement) => statement.id.toLowerCase() === id.toLowerCase());
  return { title: item ? `${item.id}: ${item.title} | KAIROS 2027` : 'Problem Statement | KAIROS 2027', description: item?.challenge };
}

export default async function ProblemStatementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = PROBLEM_STATEMENTS.find((statement) => statement.id.toLowerCase() === id.toLowerCase());
  if (!item) notFound();
  const track = TECHNICAL_TRACKS.find((entry) => entry.id === item.trackId)!;
  return <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow"><Navbar /><main className="flex-grow pt-32 pb-24 px-4 sm:px-6"><div className="max-w-4xl mx-auto">
    <Link href="/tracks" className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white"><ArrowLeft className="w-4 h-4" /> All problem statements</Link>
    <article className="mt-9 rounded-3xl border border-slate-700/70 bg-aws-card p-6 sm:p-10">
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-purple-300"><span className="rounded bg-purple-500/15 px-3 py-1.5 font-bold">{item.id}</span><span>TRACK {track.number} · {track.title}</span></div>
      <h1 className="mt-5 text-3xl sm:text-5xl font-display font-black text-white leading-tight">{item.title}</h1>
      <div className="flex flex-wrap gap-2 mt-6 text-xs"><span className="rounded-full border border-slate-600 px-3 py-1.5 text-slate-200">{item.category}</span><span className="rounded-full border border-slate-600 px-3 py-1.5 text-slate-200">{item.domain}</span></div>
      <div className="mt-9 space-y-8 text-slate-200 leading-relaxed">
        <section><h2 className="text-lg font-bold text-white mb-2">Problem description</h2><p>{item.description}</p></section>
        <section className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 sm:p-6"><h2 className="text-lg font-bold text-white mb-2">Your challenge</h2><p>{item.challenge}</p></section>
        <section><h2 className="text-lg font-bold text-white mb-3">Expected solution</h2><ul className="space-y-3">{item.expected.map((requirement) => <li key={requirement} className="flex gap-3"><CheckCircle2 className="w-5 h-5 shrink-0 text-purple-400 mt-0.5" /><span>{requirement}</span></li>)}</ul></section>
        <section><h2 className="text-lg font-bold text-white mb-2">Target users</h2><p>{item.users}.</p></section>
      </div>
      <div className="mt-10 pt-7 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between"><Link href="/tracks" className="text-sm text-slate-300 hover:text-white">Browse other statements</Link><Link href={`/team/create?track=${track.id}`} className="inline-flex items-center gap-2 rounded-xl btn-primary-themed px-5 py-3 text-sm font-bold text-white">Submit abstract for this track <ArrowRight className="w-4 h-4" /></Link></div>
    </article>
  </div></main><Footer /></div>;
}
