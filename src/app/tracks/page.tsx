'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { TECHNICAL_TRACKS } from '@/lib/config';
import { 
  Cpu, 
  Server, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Trophy, 
  FileText, 
  Download,
  Terminal,
  Database,
  Cloud
} from 'lucide-react';

export default function TracksPage() {
  const [selectedTrack, setSelectedTrack] = useState(TECHNICAL_TRACKS[0]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Server': return Server;
      case 'ShieldCheck': return ShieldCheck;
      case 'Leaf': return Leaf;
      case 'Layers': return Layers;
      default: return Layers;
    }
  };

  const getArchitectureBlueprint = (id: string) => {
    switch (id) {
      case 'agentic-ai':
        return {
          title: 'Autonomous Multi-Agent Bedrock Architecture',
          components: [
            { name: 'Amazon Bedrock', role: 'Claude 3.5 Sonnet & Titan Foundation Models with tool-calling' },
            { name: 'Amazon OpenSearch Serverless', role: 'Vector index for dense semantic document embeddings' },
            { name: 'AWS Lambda (Python 3.12)', role: 'Stateless tool execution sandbox with deterministic guardrails' },
            { name: 'Amazon DynamoDB', role: 'Persistent session memory & multi-turn dialog checkpointing' },
          ],
          sampleChallenge: 'Build a self-healing CI/CD agent swarm that intercepts failing GitHub Action runs, analyzes CloudWatch stack traces, performs root-cause analysis, and opens an automated PR fixing the code.'
        };
      case 'cloud-native':
        return {
          title: 'Ultra-High-Throughput Distributed Event Mesh',
          components: [
            { name: 'Amazon EventBridge', role: 'Central bus routing 100k+ events/sec with schema registry' },
            { name: 'Amazon ECS on AWS Fargate', role: 'Containerized Go/Rust microservices auto-scaling on queue depth' },
            { name: 'Amazon DynamoDB Global Tables', role: 'Multi-region active-active store with sub-10ms p99 latency' },
            { name: 'AWS CloudWatch & OpenTelemetry', role: 'Distributed tracing across asynchronous microservice hops' },
          ],
          sampleChallenge: 'Design a resilient flash-sale inventory reservation engine capable of resolving 50,000 concurrent lock attempts per second with idempotency guarantees and zero inventory overselling.'
        };
      case 'edge-iot':
        return {
          title: 'Decentralized Microgrid IoT Telemetry Pipeline',
          components: [
            { name: 'AWS IoT Core & Greengrass', role: 'MQTT broker handling telemetry from ESP32 & Raspberry Pi edge nodes' },
            { name: 'Amazon Timestream', role: 'Purpose-built time-series database for solar generation and load data' },
            { name: 'AWS Lambda', role: 'Real-time threshold anomaly detection and automated circuit tripping' },
            { name: 'Amazon Managed Grafana', role: 'Live engineering operational dashboard for battery storage metrics' },
          ],
          sampleChallenge: 'Deploy microcontrollers that monitor local solar panels and battery storage, predicting peak demand curves and dynamically throttling non-critical loads.'
        };
      case 'fintech-trust':
        return {
          title: 'Zero-Knowledge Cryptographic Transaction Rail',
          components: [
            { name: 'AWS Key Management Service (KMS)', role: 'Hardware-backed cryptographic key generation and envelope encryption' },
            { name: 'Amazon Aurora Serverless v2', role: 'ACID-compliant relational ledger with automated point-in-time recovery' },
            { name: 'Amazon Cognito & AWS WAF', role: 'Zero-trust JWT authentication and layer-7 bot mitigation' },
            { name: 'AWS Lambda (Rust runtime)', role: 'Ultra-fast mathematical verification of zk-SNARK cryptographic proofs' },
          ],
          sampleChallenge: 'Construct a sub-millisecond fraud evaluation engine that validates financial transactions against privacy-preserving zero-knowledge credentials without decrypting user PII.'
        };
      case 'open-enterprise':
      default:
        return {
          title: 'Intelligent Institutional Document & Workflow Mesh',
          components: [
            { name: 'Amazon Textract', role: 'Multilingual OCR extracting key-value pairs and tabular medical/academic data' },
            { name: 'Amazon S3 Intelligent-Tiering', role: 'Encrypted document vault with lifecycle archiving' },
            { name: 'Amazon SageMaker', role: 'Domain-specific classification models fine-tuned on institutional records' },
            { name: 'Amazon API Gateway', role: 'Managed REST & WebSocket interface connecting mobile clients' },
          ],
          sampleChallenge: 'Build an automated university administrative assistant that digests unstructured handwritten course applications, verifies prerequisite compliance, and routes dossiers to academic boards.'
        };
    }
  };

  const blueprint = getArchitectureBlueprint(selectedTrack.id);

  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header Hero */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30 mb-4 shadow-md">
            <div className="relative w-5 h-5 rounded overflow-hidden">
              <Image
                src="/assets/tracks.png"
                alt="Tracks"
                fill
                className="object-contain"
              />
            </div>
            <span>₹7,000 Pure Cash Bounty per Track • Total ₹35,000</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
            Enterprise Tracks & <span className="gradient-text-kairos">Cloud Blueprints</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Review detailed problem statements, recommended AWS services, architectural blueprints, and evaluation rubrics across all 5 engineering challenges.
          </p>
        </section>

        {/* Track Pills */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {TECHNICAL_TRACKS.map((t) => {
              const Icon = getIcon(t.iconName);
              const isSelected = t.id === selectedTrack.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t)}
                  className={`p-4 rounded-2xl text-left transition-all ${
                    isSelected
                      ? 'bg-aws-squidInk border-2 border-aws-orange shadow-lg shadow-aws-orange/20 scale-[1.02]'
                      : 'bg-aws-card border border-slate-700/60 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-aws-orange font-bold uppercase">
                      TRACK {t.number}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      ₹7K
                    </span>
                  </div>
                  <Icon className="w-5 h-5 text-amber-300 mb-2" />
                  <h3 className="text-sm font-bold text-white line-clamp-2">
                    {t.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </section>

        {/* Detailed Active Track Dossier */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-10 rounded-3xl bg-aws-card border border-slate-700/60 space-y-10">
            
            {/* Top Bar with Title & Bounty Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-aws-orange text-slate-950">
                    TRACK {selectedTrack.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Dedicated Bounty: ₹7,000 Pure Cash
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
                  {selectedTrack.title}
                </h2>
                <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
                  {selectedTrack.shortDescription}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href={`/team/create?track=${selectedTrack.id}`}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-aws-orange via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-aws-orange shadow-lg shadow-aws-orange/30 transition-all flex items-center gap-2"
                >
                  <span>Submit Abstract for Track {selectedTrack.number}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Architectural Blueprint Card */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-aws-orange" />
                <h3 className="text-lg font-bold text-white font-display">
                  Recommended AWS Cloud Reference Blueprint
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                {blueprint.title} — Suggested architecture for maximum scoring across Technical Architecture (30 pts).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {blueprint.components.map((comp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 space-y-2">
                    <span className="text-[10px] font-mono text-aws-orange uppercase font-bold block">
                      Component {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {comp.name}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {comp.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Challenge Problem Statement */}
            <div className="p-6 rounded-2xl bg-aws-squidInk border border-aws-orange/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider font-bold">
                <Terminal className="w-4 h-4 text-aws-orange" />
                <span>Sample Challenge Problem Statement</span>
              </div>
              <p className="text-sm sm:text-base text-white leading-relaxed font-medium">
                "{blueprint.sampleChallenge}"
              </p>
            </div>

            {/* Themes & Stacks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Focus Themes */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  Core Evaluation Focus Themes
                </h4>
                <div className="space-y-2">
                  {selectedTrack.themes.map((theme, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-aws-orange flex-shrink-0 mt-0.5" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stacks & Rubrics */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  Recommended Stacks & Toolchains
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.recommendedStacks.map((stack, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-2 rounded-xl text-xs font-mono bg-slate-900 border border-slate-700 text-slate-200"
                    >
                      {stack}
                    </span>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-2 mt-4">
                  <span className="text-xs font-bold text-white block">Jury Evaluation Criteria for this Track:</span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Modularity of cloud architecture and avoidance of hardcoded credentials</li>
                    <li>Live demonstrable endpoints during Checkpoint 2 and Checkpoint 3</li>
                    <li>Clear mathematical or algorithmic defense during the 7-minute jury pitch</li>
                    <li>100% student code authenticity verified via commit telemetry</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Zero registration fee. Free sandbox AWS credits provided to all shortlisted teams.
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/register"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 transition-colors"
                >
                  Register Team Free →
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
