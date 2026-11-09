/**
 * KAIROS 2027 — Production RAG Knowledge Base & Retrieval Engine
 * Authoritative source of truth for the AWS Student Builder Group SIST flagship hackathon.
 */

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  keywords: string[];
  content: string;
}

export interface RetrievalResult {
  chunks: KnowledgeChunk[];
  confidence: 'HIGH' | 'PARTIAL' | 'LOW';
  score: number;
  matchedTopics: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const KAIROS_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'overview',
    category: 'Overview',
    title: 'KAIROS 2027 General Overview & Vision',
    keywords: ['kairos', 'overview', 'about', 'what is', 'sist', 'aws', 'sbgl', 'hackathon', 'mission', 'vision', 'scale', 'edition', 'venue', 'auditorium'],
    content: `KAIROS 2027 (Grand Edition) is India's premier national flagship 48-hour continuous technical hackathon organized by the AWS Student Builder Group (AWS SBG) — SIST Chapter, hosted at Sathyabama Institute of Science and Technology, Chennai.
Tagline: "Where Architecture Meets Execution."
Scale: 100 elite national finalist teams (400–600 builders), selected from 2,000+ national applications across two competitive technical tiers.
Cost: 100% FREE — Exactly ₹0 registration fee for all students nationwide.
Prize Pool: ₹1,75,000 Total Cash Prize Pool + $50,000+ in AWS Cloud Promotional Credits. (The individual prize split-ups are kept as a top secret and mystery to be revealed during the grand finale).
Dates: January 22–24, 2027 (48 hours non-stop hacking).
Venue: Indoor Auditorium, Sathyabama Institute of Science and Technology, Chennai, Tamil Nadu, India.`
  },
  {
    id: 'dates-and-deadlines',
    category: 'Timeline',
    title: 'Key Dates, Deadlines and Event Schedule',
    keywords: ['dates', 'deadline', 'when', 'schedule', 'timeline', 'registration close', 'freeze', 'january', 'hours', 'starts', 'ends', 'timetable'],
    content: `Key Timelines for KAIROS 2027:
- Round 0 Abstract Registration Closes: December 28, 2026 at 11:59 PM IST.
- Round 1 Online Technical Qualifier: January 02–04, 2027 (Top shortlisted semi-finalist teams submit GitHub repository prototype with virtual defense).
- Round 2 Finalist Announcement (Top 100 Teams): January 08, 2027.
- Grand Finale Check-In: Friday, January 22, 2027 at 09:30 AM IST (Kit distribution, smart NFC badge, onboarding).
- Inauguration & Plenary: Jan 22, 2027 at 10:45 AM – 12:00 PM IST (Keynote by AWS Leadership).
- 🚀 CLOCK STARTS: Friday, January 22, 2027 at 12:15 PM IST (48-Hour Sprint commences with GitHub webhook lock).
- Checkpoint 1 (Architecture & Feasibility): Friday, Jan 22 at 04:00 PM – 06:30 PM (25 Points).
- Campus Night Lock-In: Jan 22 & Jan 23 at 10:00 PM IST (Perimeter secured).
- Checkpoint 2 (Code Velocity & APIs): Saturday, Jan 23 at 02:00 PM – 05:30 PM (35 Points).
- Midnight Energy Drops: Saturday night / Sunday 01:30 AM (Snacks, filter coffee, energy boosters).
- 🛑 HARD CODE FREEZE: Sunday, January 24, 2027 at 08:30 AM IST (Zero extensions, GitHub commit freeze).
- Checkpoint 3 (Grand Finale Live Demos): Sunday, Jan 24 at 09:00 AM – 12:30 PM (40 Points; 4-min demo + 3-min jury Q&A).
- Grand Valedictory & Awards Ceremony: Sunday, Jan 24 at 02:30 PM – 04:30 PM IST.
- Return Bus Fleet Dispersal: Sunday, Jan 24 at 05:00 PM IST.
Venue: Indoor Auditorium, Sathyabama Institute of Science and Technology, Chennai.`
  },
  {
    id: 'prizes-and-bounties',
    category: 'Prizes',
    title: '₹1,75,000 Total Cash Prize Pool & AWS Promotional Credits (Secret Split-Ups)',
    keywords: ['prize', 'cash', 'money', 'award', 'bounty', 'pool', 'credits', 'champion', 'winner', 'runner up', 'first place', 'stipend', 'reward', 'split', 'breakdown', 'first', 'second'],
    content: `Total Prize Pool: ₹1,75,000 Total Cash Prize Pool + $50,000+ AWS Cloud Promotional Credits.
Prize Split-up & Distribution Policy:
The exact split-ups, category allocations, and track prize payouts are kept as an exciting SECRET and MYSTERY by the organizing committee. The exact cash split-ups will not be disclosed in advance and will be revealed exclusively on stage during the Grand Valedictory ceremony at the Indoor Auditorium!
All national finalists also receive custom cyber streetwear swag kits, smart NFC builder badges, and verified certificates.`
  },
  {
    id: 'technical-tracks',
    category: 'Tracks',
    title: 'The 5 Grand Enterprise Technical Tracks',
    keywords: ['track', 'tracks', 'theme', 'themes', 'problem', 'problem statement', 'agentic ai', 'cloud native', 'iot', 'fintech', 'enterprise', 'stacks', 'technologies', 'bedrock', 'ecs', 'topics'],
    content: `KAIROS 2027 features 5 core technical engineering tracks:
Track 01: Agentic AI & Generative Intelligence
- Focus: Multi-agent autonomous swarms, self-healing CI/CD agents, production hybrid RAG with reranking, multimodal intelligence.
- Recommended Stacks: Amazon Bedrock, Claude 3.5 Sonnet, AWS Lambda, Amazon OpenSearch, LangChain/LlamaIndex, FastAPI.

Track 02: Cloud-Native, High-Throughput & Distributed Systems
- Focus: Sub-millisecond event meshes, distributed state idempotency, microVM runtimes (Firecracker), OpenTelemetry observability.
- Recommended Stacks: Amazon ECS/EKS, Amazon DynamoDB, AWS EventBridge, AWS Fargate, Go/Rust, PostgreSQL.

Track 03: Autonomous Edge IoT & Sustainable Green Energy
- Focus: Smart microgrid demand balancing, municipal resource telemetry, precision agricultural logistics, microcontroller edge inference.
- Recommended Stacks: AWS IoT Core, AWS Greengrass, Amazon Timestream, ESP32/Raspberry Pi, MQTT, TimescaleDB.

Track 04: Next-Gen FinTech, Trust & Cryptographic Security
- Focus: Algorithmic fraud recognition, double-entry ledger consistency, privacy-preserving KYC with ZK proofs & DID, digital settlement rails.
- Recommended Stacks: AWS KMS, Amazon Cognito, AWS GuardDuty, Amazon Aurora Serverless, Python/Polars, Redis.

Track 05: Open Enterprise & Campus Life Innovation
- Focus: Intelligent document automation OCR, clinical report triage, automated student lifecycle logistics, multilingual civic platforms.
- Recommended Stacks: Amazon S3, Amazon Textract, Amazon SageMaker, API Gateway, Next.js, PyTorch.`
  },
  {
    id: 'qualification-pipeline',
    category: 'Process',
    title: 'Dual-Phase Merit Qualification Pipeline & Submission Guidelines',
    keywords: ['qualifier', 'round 0', 'round 1', 'round 2', 'selection', 'how to join', 'steps', 'pipeline', 'github', 'submission', 'apply', 'procedure', 'defense'],
    content: `The KAIROS 2027 selection pipeline is 100% merit-based across 2 competitive phases:
- Phase 0 (Free Online Registration): Submit project abstract and architecture blueprint online at the website before Dec 28, 2026. Teams of 4–6 builders. Mandatory Meetup RSVP and AWS Builder Center profile.
- Round 1 (Online Technical Qualifier, Jan 02–04, 2027): Shortlisted teams submit a working GitHub repository prototype with architecture documentation, followed by a virtual technical defense session with solutions architects. (No Loom video required).
- Round 2 (On-Campus 48-Hour Grand Finale, Jan 22–24, 2027): The Top 100 elite teams receive official on-campus qualification passes to assemble at the Indoor Auditorium, Sathyabama in Chennai for 48 hours of continuous building.
Submission Requirements:
- Repositories must include a clean README with architecture blueprints, deployment instructions, and active commit history during the 48-hour window.`
  },
  {
    id: 'rules-and-eligibility',
    category: 'Rules',
    title: 'Rules, Eligibility, Team Size, Code Authenticity & Intellectual Property',
    keywords: ['rules', 'eligibility', 'team size', 'cost', 'fee', 'free', 'who can apply', 'college', 'students', 'guidelines', 'members', 'solo', 'individual', 'code', 'ip', 'intellectual property', 'pre-existing'],
    content: `Rules & Eligibility for KAIROS 2027:
- Eligibility: All registered undergraduate and postgraduate engineering and technology students across accredited institutions in India.
- Team Size: Strictly 4 to 6 builders per team. Teams can be formed across different departments or across different colleges/universities (inter-college teams are fully permitted!).
- Solo Builders: Individual builders can register and find squad teammates using the on-site Builder Squad Radar before final team locking.
- Registration Fee: Exactly ₹0. Zero entry fee, zero hidden charges. 100% free qualification.
- Code Authenticity: All project code must be authored during the 48-hour hackathon. Pre-existing codebases or pre-built complete apps are strictly disqualified. Open-source libraries, foundation models, pre-trained weights, and public APIs are fully allowed.
- Hardware & Devices: Contestants bring their own laptops and hardware peripherals. Wi-Fi connectivity and power access are provided at team bays.
- Intellectual Property (IP): Participants retain 100% ownership of their source code, models, and blueprints. Zero equity or IP claims are made by AWS, Sathyabama, or sponsors.`
  },
  {
    id: 'hospitality-and-logistics',
    category: 'Logistics',
    title: 'Complimentary Meals, Designated Rest Areas, University Bus Transit & Campus Safety',
    keywords: ['food', 'meals', 'stay', 'accommodation', 'hostel', 'sleep', 'travel', 'bus', 'wifi', 'safety', 'security', 'transit', 'shuttle', 'power', 'amenities', 'reimbursement', 'flight', 'train', 'venue', 'auditorium'],
    content: `Logistics & Builder Welfare at KAIROS 2027:
- Venue: Indoor Auditorium, Sathyabama Institute of Science and Technology, Chennai.
- Food & Sustenance: 100% complimentary hot meals (7 total services across 48 hours: Friday Lunch & Dinner, Saturday Breakfast, Lunch & Dinner, Sunday Breakfast & Celebration Luncheon) + 24/7 filter coffee/tea bars and midnight energy snack drops (01:30 AM).
- Rest Arrangements: Designated resting areas and campus spaces are available for participants (dedicated AC resting bays are not guaranteed).
- Campus Night Lock-In: Strictly enforced from 10:00 PM to 06:00 AM for participant safety. Security personnel and 24/7 medical room with on-campus ambulance.
- Sathyabama Bus Fleet: Complimentary chartered university transit buses running between Chennai transit hubs (Chennai Central Railway Station, Tambaram Station, Chennai International Airport, CMBT Koyambedu) and the campus.
- Long-Distance Travel: Outstation flights and long-distance trains are self-arranged by participants; chartered bus shuttle transit within Chennai is free.
- Power & Connectivity: Arena Wi-Fi connectivity and multi-socket power strips are provided for team bays (specific network speeds such as 1Gbps are not guaranteed).`
  },
  {
    id: 'judging-rubric',
    category: 'Judging',
    title: 'Evaluation Rubrics, Z-Score Normalization & Live Demos',
    keywords: ['judging', 'criteria', 'rubric', 'points', 'evaluation', 'score', 'z-score', 'weight', 'presentation', 'pitch', 'jury', 'demo'],
    content: `KAIROS 2027 uses a multilateral judging rubric with Z-score mathematical normalization across juries to eliminate individual bias.
The 4 Core Evaluation Pillars:
1. Technical Architecture, Reliability & Scalability:
   - Modularity, cloud service selection (Bedrock, ECS, Lambda, DynamoDB), error resilience, IAM security hardening, clean code, enterprise scalability.
2. Originality & Quality of Problem-Solving:
   - Depth of domain understanding, freshness of engineering insight, avoidance of shallow prompt wrappers or trivial clones.
3. Working Prototype & User Experience:
   - Live functional demonstration during checkpoints and stage finals; responsive, intuitive frontend polish and operational backend endpoints.
4. Practical Viability & Pitch Defense:
   - Real-world deployment viability, clarity of presentation, defense rigor under jury grilling by VC partners and AWS Principal Architects.
Checkpoint Scoring System:
- Checkpoint 1 (Friday): Architecture & Feasibility (25 Points)
- Checkpoint 2 (Saturday): Code Velocity & APIs (35 Points)
- Checkpoint 3 (Sunday): Grand Finale Live Demos & Defense (40 Points) at the Indoor Auditorium.`
  },
  {
    id: 'leadership-and-contacts',
    category: 'Contact',
    title: 'Official Club Helpdesk & Social Channels',
    keywords: ['organizers', 'organizer', 'organizing', 'heading', 'head', 'who', 'leadership', 'lead', 'contact', 'email', 'phone', 'helpdesk', 'support', 'queries', 'location', 'address', 'reach out', 'social', 'linkedin', 'instagram', 'meetup', 'club'],
    content: `Official AWS Student Builder Group (SIST Chapter) Helpdesk & Social Links:
For all official queries, permissions, team updates, and event questions, please contact the club through our official communication channels:
- Official Support Email: sistawscc@gmail.com
- Club LinkedIn: https://www.linkedin.com/company/aws-student-builder-group-sist
- Club Instagram: https://instagram.com/awssbg_sist (@awssbg_sist)
- Official Meetup Chapter: https://www.meetup.com/aws-sbg-at-sathyabama-inst-science-and-tech-chennai-campus/
- Physical Venue: Indoor Auditorium, Sathyabama Institute of Science and Technology, Jeppiaar Nagar, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu - 600119.`
  },
  {
    id: 'faqs-and-special-policies',
    category: 'FAQ',
    title: 'Frequently Asked Questions, Team Modifications & Edge Case Policies',
    keywords: ['faq', 'faqs', 'questions', 'frequently asked', 'team change', 'replace member', 'inter college', 'different college', 'alone', 'hardware', 'laptop', 'certificate', 'attendance', 'venue'],
    content: `Frequently Asked Questions & Special Policies:
- Where is the venue? Indoor Auditorium, Sathyabama Institute of Science and Technology, Chennai.
- Can members be from different colleges? YES. Cross-college and cross-department teams are fully welcome!
- Can I participate alone / solo? The competition requires teams of 4 to 6 builders. However, you can register as an individual and match with teammates using the on-site Builder Squad Radar before the hackathon begins.
- Can team members be changed after registration? Any modifications to team rosters must be officially requested via email to sistawscc@gmail.com before the Round 0 registration deadline (Dec 28, 2026), subject to organizer approval.
- What should we bring? Every participant must bring their own laptop, charger, valid college ID card, government photo ID, and any specific IoT/microcontroller hardware needed for Track 3.
- Are attendance OD letters or participation certificates provided? YES. Official on-duty (OD) formal letters and verified digital credentials/certificates are issued to all verified attendees.`
  }
];

/**
 * Domain Synonym Map for Semantic Retrieval & Query Expansion
 */
const SYNONYM_MAP: Record<string, string[]> = {
  prize: ['cash', 'money', 'bounty', 'pool', 'award', 'reward', 'champion', 'winner', 'payout', 'split', 'mystery', 'secret'],
  date: ['deadline', 'when', 'schedule', 'time', 'timeline', 'january', 'freeze', 'start', 'end', 'close', 'calendar'],
  food: ['meal', 'meals', 'eat', 'dinner', 'lunch', 'breakfast', 'refreshment', 'coffee', 'tea', 'snacks', 'drink'],
  stay: ['accommodation', 'hotel', 'hostel', 'rest', 'sleep', 'night', 'dorm', 'bay'],
  travel: ['bus', 'transit', 'shuttle', 'reach', 'transport', 'flight', 'train', 'ticket', 'reimbursement'],
  rule: ['eligibility', 'eligible', 'team', 'size', 'limit', 'cost', 'fee', 'free', 'charge', 'solo', 'alone', 'students', 'college', 'ip', 'intellectual', 'code'],
  track: ['theme', 'themes', 'problem', 'statements', 'agentic', 'ai', 'cloud', 'iot', 'fintech', 'enterprise', 'stack', 'bedrock', 'tech'],
  qualifier: ['round', 'pipeline', 'github', 'poc', 'submission', 'apply', 'procedure', 'defense'],
  judge: ['judging', 'rubric', 'criteria', 'evaluation', 'score', 'points', 'z-score', 'jury', 'pitch'],
  contact: ['organizers', 'organizer', 'organizing', 'heading', 'head', 'who', 'leadership', 'lead', 'email', 'helpdesk', 'reach', 'social', 'instagram', 'linkedin', 'meetup', 'mail', 'support'],
  venue: ['auditorium', 'where', 'location', 'place', 'sathyabama', 'indoor', 'hall', 'chennai']
};

/**
 * Contextual Query Rewriter
 * Resolves pronouns ("it", "they", "this"), ellipsis, and follow-ups using recent chat history
 */
export function expandQueryWithHistory(currentQuery: string, history?: ChatMessage[]): string {
  const clean = currentQuery.trim();
  if (!history || history.length === 0) return clean;

  const lowerQuery = clean.toLowerCase();
  
  // Follow-up / pronoun / ambiguous indicator detection
  const hasPronounOrFollowUp =
    /\b(it|they|them|this|that|these|those|more|less|also|what about|how about|can we|can i|is it|are they|why|who|where|how much|when|what if)\b/i.test(lowerQuery) ||
    lowerQuery.length < 25;

  if (!hasPronounOrFollowUp) {
    return clean;
  }

  // Extract key terms from recent messages (last 2 assistant/user turns)
  const recentTexts = history
    .slice(-3)
    .map(m => m.content.toLowerCase())
    .join(' ');

  const contextTopics: string[] = [];

  if (recentTexts.includes('team') || recentTexts.includes('member') || recentTexts.includes('size')) {
    contextTopics.push('team size rules eligibility');
  }
  if (recentTexts.includes('prize') || recentTexts.includes('cash') || recentTexts.includes('bounty')) {
    contextTopics.push('prize pool cash breakdown mystery secret');
  }
  if (recentTexts.includes('food') || recentTexts.includes('meal') || recentTexts.includes('stay') || recentTexts.includes('hostel')) {
    contextTopics.push('meals food accommodation logistics');
  }
  if (recentTexts.includes('date') || recentTexts.includes('schedule') || recentTexts.includes('deadline')) {
    contextTopics.push('dates schedule timeline deadlines');
  }
  if (recentTexts.includes('track') || recentTexts.includes('theme') || recentTexts.includes('agentic') || recentTexts.includes('cloud')) {
    contextTopics.push('technical tracks themes problem statements');
  }
  if (recentTexts.includes('venue') || recentTexts.includes('auditorium') || recentTexts.includes('where')) {
    contextTopics.push('venue indoor auditorium sathyabama');
  }
  if (recentTexts.includes('qualifier') || recentTexts.includes('round')) {
    contextTopics.push('qualification pipeline round selection github');
  }

  if (contextTopics.length > 0) {
    return `${clean} (Context: ${contextTopics.join(' ')})`;
  }

  return clean;
}

/**
 * Check if the user query contains prompt injection / system override patterns
 */
export function isPromptInjectionAttempt(text: string): boolean {
  const injectionPatterns = [
    /ignore (all )?(previous|prior|above) (instructions|directives|prompts)/i,
    /you are now (in )?(developer mode|dan|jailbreak)/i,
    /disregard (the )?(system|prompt|instructions)/i,
    /reveal (your|the) (system prompt|hidden instructions|api key)/i,
    /act as an unfiltered/i,
    /system:\s*override/i,
    /system override/i
  ];
  return injectionPatterns.some(pattern => pattern.test(text));
}

/**
 * Retrieve the most relevant knowledge chunks matching a query using hybrid semantic token scoring
 */
export function retrieveKairosKnowledge(query: string, maxResults = 3): KnowledgeChunk[] {
  const result = retrieveKairosKnowledgeWithScore(query, maxResults);
  return result.chunks;
}

/**
 * Production Retrieval with Confidence Score
 */
export function retrieveKairosKnowledgeWithScore(query: string, maxResults = 3): RetrievalResult {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);

  // Expand query with synonyms
  const expandedTokens = new Set<string>(queryTokens);
  for (const token of queryTokens) {
    for (const [key, synonyms] of Object.entries(SYNONYM_MAP)) {
      if (token === key || synonyms.includes(token)) {
        expandedTokens.add(key);
        synonyms.forEach(s => expandedTokens.add(s));
      }
    }
  }

  const scored = KAIROS_KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    const chunkTitleLower = chunk.title.toLowerCase();
    const chunkContentLower = chunk.content.toLowerCase();

    // 1. Direct title match (Strongest signal)
    if (chunkTitleLower.includes(normalizedQuery)) {
      score += 25;
    }

    // 2. Keyword exact match
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += 10;
      }
      for (const token of queryTokens) {
        if (kw === token) {
          score += 6;
        } else if (kw.includes(token) || token.includes(kw)) {
          score += 3;
        }
      }
    }

    // 3. Synonym matches against title & keywords
    const synList = Array.from(expandedTokens);
    for (let i = 0; i < synList.length; i++) {
      const syn = synList[i];
      if (chunkTitleLower.includes(syn)) {
        score += 4;
      }
      for (const kw of chunk.keywords) {
        if (kw === syn) {
          score += 3;
        }
      }
    }

    // 4. Content token frequency
    for (const token of queryTokens) {
      if (chunkContentLower.includes(token)) {
        score += 2;
      }
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const topScore = scored[0]?.score || 0;
  let confidence: 'HIGH' | 'PARTIAL' | 'LOW' = 'HIGH';

  if (topScore >= 16) {
    confidence = 'HIGH';
  } else if (topScore >= 6) {
    confidence = 'PARTIAL';
  } else {
    confidence = 'LOW';
  }

  // If top score is very low, return overview and dates as general context with LOW confidence
  if (topScore <= 3) {
    return {
      chunks: [KAIROS_KNOWLEDGE_BASE[0], KAIROS_KNOWLEDGE_BASE[1]],
      confidence: 'LOW',
      score: topScore,
      matchedTopics: ['Overview', 'Timeline']
    };
  }

  const selectedChunks = scored.slice(0, maxResults).map(s => s.chunk);

  return {
    chunks: selectedChunks,
    confidence,
    score: topScore,
    matchedTopics: selectedChunks.map(c => c.title)
  };
}

/**
 * Deterministic local RAG synthesis engine used when Gemini API is offline or throttled.
 * Follows the Master Prompt's structured format and user constraints.
 */
export function synthesizeLocalAnswer(query: string, retrieved: KnowledgeChunk[]): string {
  const q = query.toLowerCase();

  // Guardrail against prompt injection / jailbreak attempts
  if (isPromptInjectionAttempt(query)) {
    return `🛡️ I am the official **KAIROS 2027 AI Assistant**. I am dedicated strictly to helping participants with hackathon inquiries, technical tracks, rules, schedules, and builder logistics.

How can I assist you with KAIROS 2027 today?`;
  }

  // 0. Referral & Rainmaker Crowdsourced Sponsorship Program
  if (q.includes('referral') || q.includes('rainmaker') || q.includes('commission') || (q.includes('sponsor') && (q.includes('earn') || q.includes('refer')))) {
    return `### 💼 Rainmaker Crowdsourced Sponsorship Program

• **Earn Referral Commission:** Earn a direct **10% to 15% cash commission** for every verified corporate sponsor you connect to KAIROS 2027!
• **Payout:** Direct UPI cash payout transferred straight to your bank account within 21 days of sponsorship deal closure.
• **How to Submit:** Visit the **/refer-sponsor** page on the portal and submit your corporate sponsor lead details.`;
  }

  // 1. Cash Prize Pool & Secret Split-Ups
  if (q.includes('prize') || q.includes('cash') || q.includes('bounty') || q.includes('money') || q.includes('pool') || q.includes('champion') || q.includes('stipend') || q.includes('first place') || q.includes('second place') || q.includes('split') || q.includes('moolah')) {
    return `### 🏆 KAIROS 2027 Prize Pool: ₹1,75,000 Cash + $50,000+ AWS Credits

• **Total Cash Prize Pool:** **₹1,75,000** in direct cash prizes + **$50,000+** in AWS Cloud Promotional Credits!
• **Prize Split-up & Distribution:** The exact split-ups and category distributions are kept as an exciting **secret and mystery** by the organizers! We won't disclose individual amounts—they will be revealed live on stage during the grand finale.
• **All Finalists:** Receive custom cyber streetwear swag kits, smart NFC builder badges, and verified credentials.`;
  }

  // 2. Venue Inquiry
  if (q.includes('venue') || q.includes('location') || q.includes('where is') || q.includes('place') || q.includes('auditorium') || q.includes('address')) {
    return `### 📍 KAIROS 2027 Venue

The grand on-campus 48-hour finale is hosted at:
• **Venue:** **Indoor Auditorium**, Sathyabama Institute of Science and Technology
• **Address:** Jeppiaar Nagar, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu - 600119
• **Complimentary Transit:** Free university chartered transit buses will connect Chennai Central, Tambaram Station, Airport, and CMBT Koyambedu directly to the venue.`;
  }

  // 3. 5 Technical Tracks
  if (q.includes('track') || q.includes('theme') || q.includes('topic') || q.includes('problem')) {
    return `### ⚡ The 5 Grand Enterprise Technical Tracks

KAIROS 2027 features 5 core technical tracks:

1. **Track 01: Agentic AI & Generative Intelligence**
   • Focus: Multi-agent autonomous swarms, self-healing CI/CD agents, production hybrid RAG, multimodal intelligence.
   • Stack: Amazon Bedrock, Claude 3.5 Sonnet, AWS Lambda, Amazon OpenSearch, FastAPI.
2. **Track 02: Cloud-Native, High-Throughput & Distributed Systems**
   • Focus: Sub-millisecond event streaming, distributed state idempotency, microVMs (Firecracker), OpenTelemetry.
   • Stack: Amazon ECS/EKS, Amazon DynamoDB, AWS EventBridge, AWS Fargate, Go/Rust.
3. **Track 03: Autonomous Edge IoT & Sustainable Green Energy**
   • Focus: Microgrid demand balancing, municipal resource telemetry, precision agri-tech, microcontroller inference.
   • Stack: AWS IoT Core, AWS Greengrass, Amazon Timestream, ESP32/Raspberry Pi.
4. **Track 04: Next-Gen FinTech, Trust & Cryptographic Security**
   • Focus: Algorithmic fraud recognition, double-entry ledgers, privacy-preserving KYC with ZK proofs & DID.
   • Stack: AWS KMS, Amazon Cognito, AWS GuardDuty, Aurora Serverless.
5. **Track 05: Open Enterprise & Campus Life Innovation**
   • Focus: Document OCR pipelines, clinical triage, automated student lifecycle logistics.
   • Stack: Amazon S3, Amazon Textract, Amazon SageMaker, Next.js.`;
  }

  // 4. Dates, Timetable, Deadlines & Hard Freeze
  if (q.includes('date') || q.includes('when') || q.includes('schedule') || q.includes('time') || q.includes('timeline') || q.includes('deadline') || q.includes('freeze')) {
    return `### 📅 KAIROS 2027 Key Dates & Timetable

• **Round 0 Applications Close:** December 28, 2026 at 11:59 PM IST
• **Round 1 Online Qualifier (Top Shortlisted Teams):** January 02–04, 2027 (GitHub POC submission + virtual defense)
• **Finalist Announcement (Top 100 Teams):** January 08, 2027
• **On-Campus Grand Finale:** January 22–24, 2027 at **Indoor Auditorium, Sathyabama, Chennai**
• **Hackathon Clock Starts:** Friday, Jan 22, 2027 at 12:15 PM IST
• **Hard Code Freeze:** Sunday, Jan 24, 2027 at 08:30 AM IST (Zero extensions)
• **Grand Demos & Valedictory:** Sunday, Jan 24, 2027 (09:00 AM – 04:30 PM IST)`;
  }

  // 5. Registration Cost & Zero Fee
  if ((/\bfree\b/i.test(q) && !q.includes('freeze')) || q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('charge')) {
    return `### ✨ Registration Fee: 100% Free (₹0 Entry Fee)

KAIROS 2027 has **zero registration fee** for all students nationwide. Every qualified finalist team receives:
• Full campus access for 48 hours of continuous building at the Indoor Auditorium
• 7 complimentary hot buffet meals, 24/7 filter coffee & midnight snack drops
• Smart NFC builder badges & exclusive swag kits
• Complimentary Sathyabama chartered bus fleet transit within Chennai
• 100% intellectual property ownership — participants retain all rights to their code and blueprints.`;
  }

  // 6. Leadership, Organizers & Official Support Contacts (No personal names)
  if (q.includes('organizer') || q.includes('organizing') || q.includes('president') || q.includes('who is') || q.includes('heading') || q.includes('contact') || q.includes('email') || q.includes('faculty') || q.includes('helpdesk') || q.includes('social') || q.includes('instagram') || q.includes('linkedin') || q.includes('meetup')) {
    return `### 📬 Official Club Contact & Community Channels

For all inquiries, please reach out directly through the official club channels:

• **Official Support Email:** [sistawscc@gmail.com](mailto:sistawscc@gmail.com)
• **LinkedIn:** [AWS Student Builder Group — SIST Chapter](https://www.linkedin.com/company/aws-student-builder-group-sist)
• **Instagram:** [@awssbg_sist](https://instagram.com/awssbg_sist)
• **Meetup:** [AWS SBG SIST Chapter](https://www.meetup.com/aws-sbg-at-sathyabama-inst-science-and-tech-chennai-campus/)
• **Venue:** Indoor Auditorium, Sathyabama Institute of Science and Technology, Chennai`;
  }

  // 7. Food, Stay, Travel & Logistics (No guaranteed resting bays or net speed)
  if (q.includes('food') || q.includes('meal') || q.includes('stay') || q.includes('accommodation') || q.includes('sleep') || q.includes('travel') || q.includes('bus') || q.includes('shuttle') || q.includes('wifi') || q.includes('internet') || q.includes('speed')) {
    return `### 🏨 Food, Accommodation, Travel & Builder Logistics

• **Complimentary Meals:** 100% free hot meals (7 total services across the 48 hours) + 24/7 filter coffee/tea bars and 01:30 AM midnight energy snack drops.
• **Rest Facilities:** Designated resting spaces are provided on campus for builders (dedicated AC resting bays are not guaranteed).
• **Transit Bus Fleet:** Free chartered Sathyabama buses connecting Chennai Central, Tambaram, Airport, and CMBT Koyambedu directly to the Indoor Auditorium.
• **Power & Wi-Fi:** Wi-Fi connectivity and multi-socket power strips are provided at team bays (specific network speeds are not guaranteed).
• **Safety:** Campus night lock-in strictly enforced from 10:00 PM to 06:00 AM with campus security and 24/7 first aid.`;
  }

  // 8. Unverified / Missing Policy: Team Roster Modification
  if (q.includes('change') && (q.includes('member') || q.includes('team') || q.includes('roster'))) {
    return `**What I can confirm:**
Team sizes must remain strictly between 4 and 6 members, and Round 0 registration closes on December 28, 2026.

**What needs confirmation:**
Team roster modifications after initial submission are not automatically approved via the portal and must be vetted by the organizing committee.

**Next step:**
Please email **sistawscc@gmail.com** with your Team Code and registration details to request organizer approval.`;
  }

  // 9. Team Size, Eligibility & Solo Matching
  if (q.includes('team') || q.includes('member') || q.includes('size') || q.includes('alone') || q.includes('solo') || q.includes('college') || q.includes('cross') || q.includes('inter')) {
    return `### 👥 Team Composition & Eligibility

• **Team Size:** Strictly **4 to 6 builders** per squad.
• **Cross-College Teams:** Fully allowed! Students from different colleges and departments can team up freely.
• **Solo Builders:** Individual builders can register and find squad teammates using the **Builder Squad Radar** on the homepage before final team freezing.
• **Eligibility:** Registered undergraduate and postgraduate engineering and technology students across India.`;
  }

  // 10. Unverified / Missing Policy: Pets & Animals
  if (q.includes('pet') || q.includes('dog') || q.includes('animal')) {
    return `**What I can confirm:**
KAIROS 2027 is hosted at the Indoor Auditorium of Sathyabama Institute of Science and Technology with strict safety and campus security.

**What needs confirmation:**
Auditorium and campus policies regarding pets or animals are not explicitly listed in standard hackathon guidelines.

**Next step:**
Please contact the club at **sistawscc@gmail.com** for confirmation on animal access before traveling to the campus.`;
  }

  // 11. Unverified / Missing Policy: Flight / Travel Reimbursement
  if ((q.includes('flight') || q.includes('ticket') || q.includes('reimburse')) && (q.includes('delhi') || q.includes('travel') || q.includes('train') || q.includes('flight'))) {
    return `**What I can confirm:**
Sathyabama provides complimentary chartered university bus shuttles across Chennai transit hubs (Central, Airport, Tambaram, CMBT) and 100% free hot meals during the 48 hours.

**What needs confirmation:**
Long-distance outstation travel expenses (such as domestic flights or train fares) are not automatically covered in the standard free registration package.

**Next step:**
Please contact **sistawscc@gmail.com** if your institution requires special travel grant documentation or on-duty approval.`;
  }

  // 12. General educational query handler
  if (q.includes('what is aws') || q.includes('what is a hackathon') || q.includes('how to prepare') || q.includes('what is bedrock')) {
    return `### 💡 Hackathon Guidance

• **About KAIROS 2027:** It is an intense 48-hour continuous technical hackathon where teams architect, build, and deploy production-grade software prototypes on AWS.
• **How to Prepare:** Review the 5 technical tracks, familiarize your squad with Amazon Bedrock, ECS, Lambda, and DynamoDB, and draft your architecture diagram before the Round 0 deadline.
• **Need Help?** For any specific queries, contact the club at **sistawscc@gmail.com** or connect with us on Instagram ([@awssbg_sist](https://instagram.com/awssbg_sist)) or [LinkedIn](https://www.linkedin.com/company/aws-student-builder-group-sist).`;
  }

  // 13. General synthesized response from top retrieved knowledge
  const topChunk = retrieved[0] || KAIROS_KNOWLEDGE_BASE[0];
  return `### ℹ️ ${topChunk.title}

${topChunk.content}

---
💡 *Need more specific details? You can ask about tracks, the 48-hour schedule, rules, free food, or email the club at **sistawscc@gmail.com**.*`;
}
