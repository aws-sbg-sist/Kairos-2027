'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { AWS_RESOURCE_LIBRARY } from '@/lib/config';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Code2, 
  Trophy, 
  Terminal, 
  CheckCircle2,
  FileCode,
  Github
} from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-aws-canvas text-aws-snow">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-amber-300 bg-aws-squidInk border border-aws-orange/30">
              <BookOpen className="w-3.5 h-3.5 text-aws-orange" />
              <span>Official AWS Student Builder Group Leader Library</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Student Content & <span className="gradient-text-kairos">Learning Hub</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Derived directly from the official AWS SBGL Event Toolkit. Turnkey hands-on workshops, Foundation Model starter templates, and career storytelling frameworks.
            </p>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWS_RESOURCE_LIBRARY.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-3xl bg-aws-card border border-slate-700/60 flex flex-col justify-between hover:border-aws-orange/40 transition-all space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-aws-orange uppercase font-bold px-2 py-0.5 rounded bg-aws-orange/10 border border-aws-orange/20">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.source}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] font-mono text-amber-300 uppercase font-semibold block">
                      Curriculum Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-aws-orange flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  {item.externalUrl ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-aws-squidInk hover:bg-slate-800 text-amber-300 border border-aws-orange/30 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Launch Interactive Quest</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : item.repoUrl ? (
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View GitHub Template</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => alert(`Starting download for ${item.title}... Module package will be saved.`)}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-aws-orange text-slate-950 hover:bg-amber-400 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Starter Assets (Zip)</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* AWS Bedrock Code Snippet Preview */}
          <div className="p-6 sm:p-10 rounded-3xl bg-aws-squidInk border border-aws-orange/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-aws-orange" />
                <h3 className="text-lg font-bold text-white font-display">
                  Quickstart: Invoking Claude 3.5 Sonnet on Amazon Bedrock (TypeScript / Python)
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Turnkey Model ID: anthropic.claude-3-5-sonnet-20241022-v2:0
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <pre>{`// AWS Bedrock Claude 3.5 Sonnet Starter for KAIROS 2027 Hackers
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ region: "us-east-1" });

export async function askKairosAgent(prompt: string) {
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 2048,
    temperature: 0.2,
    messages: [
      { role: "user", content: prompt }
    ]
  };

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-5-sonnet-20241022-v2:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload)
  });

  const response = await client.send(command);
  const responseData = JSON.parse(new TextDecoder().decode(response.body));
  return responseData.content[0].text;
}`}</pre>
            </div>
            <p className="text-xs text-slate-400">
              Use your assigned AWS promotional credits voucher from the <Link href="/dashboard" className="text-amber-300 underline">Hacker Dashboard</Link> to run this starter code with zero infrastructure costs.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
