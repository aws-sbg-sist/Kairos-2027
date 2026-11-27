import { NextRequest, NextResponse } from 'next/server';
import { AWS_RESOURCE_LIBRARY } from '@/lib/config';

const STARTER_CONTENT: Record<string, { filename: string; content: string }> = {
  'career-storytelling': {
    filename: 'KAIROS_2027_Career_Storytelling_Starter_Kit.md',
    content: `# KAIROS 2027 — Storytelling for Career Readiness Starter Kit
**AWS Student Builder Group (SIST Chapter)**

## 1. STAR Architecture Framework for Hackathon Defense & Interviews
- **Situation:** Define the high-stakes engineering bottleneck and target user SLA.
- **Task:** Clarify your 48-hour scope, non-functional constraints (latency, cost, security).
- **Action:** Explain your AWS architectural tradeoffs (e.g., Amazon Bedrock vs. custom fine-tuning, DynamoDB single-table design vs. RDS Postgres, EventBridge vs. SQS).
- **Result:** Quantify impact with real benchmarks (p95 latency, cost per 1k requests, accuracy).

## 2. 7-Minute Jury Defense Structure (4 Min Demo + 3 Min Q&A)
1. **0:00–0:45** Problem & real user bottleneck (1 slide max)
2. **0:45–2:30** Live running system walkthrough (end-to-end flow)
3. **2:30–3:30** AWS Architecture diagram + failure/cost tradeoffs
4. **3:30–4:00** Commit telemetry & post-hackathon roadmap
`,
  },
  'open-source-101': {
    filename: 'KAIROS_2027_Open_Source_AWS_Starter_Kit.md',
    content: `# KAIROS 2027 — Open Source 101 & CI/CD Starter Kit
**AWS Student Builder Group (SIST Chapter)**

## 1. Repository Hygiene Checklist
- Add \`LICENSE\` (MIT / Apache-2.0) — **100% Student IP belongs to you**
- Add clean \`README.md\` with Architecture Diagram & local setup steps
- Never commit \`.env\`, AWS access keys, or Supabase service-role secrets

## 2. GitHub Actions CI Starter (.github/workflows/ci.yml)
\`\`\`yaml
name: CI
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci && npm run build
\`\`\`
`,
  },
  'bedrock-starter': {
    filename: 'KAIROS_2027_AWS_Bedrock_Starter_Kit.md',
    content: `# KAIROS 2027 — Amazon Bedrock & Hybrid RAG Starter Kit
**AWS Student Builder Group (SIST Chapter)**

## 1. Prerequisites
\`\`\`bash
npm install @aws-sdk/client-bedrock-runtime
\`\`\`

## 2. TypeScript InvokeModel Quickstart (Claude 3.5 Sonnet)
\`\`\`typescript
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION || 'us-east-1' });

export async function runAgentPrompt(prompt: string): Promise<string> {
  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 2048,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const res = await client.send(command);
  const parsed = JSON.parse(new TextDecoder().decode(res.body));
  return parsed.content?.[0]?.text || '';
}
\`\`\`

## 3. Hallucination Guardrails Checklist
- Ground answers strictly against retrieved context chunks with citations.
- Add input length limits and timeout budgets on every model invocation.
`,
  },
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const starter = STARTER_CONTENT[id];
  const catalogItem = AWS_RESOURCE_LIBRARY.find((item) => item.id === id);

  if (!starter && !catalogItem) {
    return NextResponse.json({ success: false, error: 'Resource starter kit not found.' }, { status: 404 });
  }

  const filename = starter?.filename || `KAIROS_2027_${id.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
  const body =
    starter?.content ||
    `# ${catalogItem?.title}\n\n${catalogItem?.description}\n\n## Highlights\n${(catalogItem?.features || []).map((f) => `- ${f}`).join('\n')}\n`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
