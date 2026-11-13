/**
 * KAIROS 2027 — Comprehensive RAG Knowledge Base & Retrieval Engine
 * Contains all official information regarding the AWS Student Builder Group SIST flagship hackathon.
 */

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  keywords: string[];
  content: string;
}

export const KAIROS_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'overview',
    category: 'Overview',
    title: 'KAIROS 2027 General Overview & Vision',
    keywords: ['kairos', 'overview', 'about', 'what is', 'sist', 'aws', 'sbgl', 'hackathon'],
    content: `KAIROS 2027 (Grand Edition) is India's premier national flagship 48-hour continuous technical hackathon organized by the AWS Student Builder Group (AWS SBG) — SIST Chapter, hosted at Sathyabama Institute of Science and Technology, Chennai.
Tagline: "Where Architecture Meets Execution."
Scale: 100 elite national finalist teams (400–600 builders), selected from 2,000+ national applications across two competitive technical tiers.
Cost: 100% FREE — Zero Registration Fee for all students nationwide.
Prize Pool: ₹1,75,000 Total Prize Pool prize pool + $50,000+ in AWS Cloud Promotional Credits.
Dates: January 22–24, 2027 (48 hours non-stop hacking).
Venue: Central Library & Campus Bays, Sathyabama Institute of Science and Technology, Chennai, Tamil Nadu, India.`
  },
  {
    id: 'dates-and-deadlines',
    category: 'Timeline',
    title: 'Key Dates, Deadlines and Event Schedule',
    keywords: ['dates', 'deadline', 'when', 'schedule', 'timeline', 'registration close', 'freeze', 'january', 'hours'],
    content: `Key Timelines for KAIROS 2027:
- Round 0 Abstract Registration Closes: December 28, 2026 at 11:59 PM IST.
- Round 1 Online Technical Qualifier: January 02–04, 2027 (Top 250 semi-finalist teams submit GitHub POC & Loom video with 7-min virtual defense).
- Round 2 Finalist Announcement (Top 100 Teams): January 08, 2027.
- Grand Finale Check-In: Friday, January 22, 2027 at 09:30 AM IST (Red-carpet kit distribution, smart NFC badge, high-speed Wi-Fi onboarding).
- Inauguration & Plenary: Jan 22, 2027 at 10:45 AM – 12:00 PM IST (Keynote by AWS Leadership).
- CLOCK STARTS: Friday, January 22, 2027 at 12:15 PM IST (48-Hour Sprint commences with GitHub webhook lock).
- Checkpoint 1 (Architecture & Feasibility): Friday, Jan 22 at 04:00 PM – 06:30 PM (25 Points).
- Campus Night Lock-In: Jan 22 & Jan 23 at 10:00 PM IST (Perimeter secured, EV shuttles active).
- Checkpoint 2 (Code Velocity & APIs): Saturday, Jan 23 at 02:00 PM – 05:30 PM (35 Points).
- Midnight Energy Drops: Saturday night / Sunday 01:30 AM (Snacks, filter coffee, energy boosters).
- HARD CODE FREEZE: Sunday, January 24, 2027 at 12:15 PM IST (Zero extensions, GitHub commit freeze - Exactly 48.0 Hours from Friday 12:15 PM).
- Checkpoint 3 (Grand Finale Live Demos): Sunday, Jan 24 at 09:00 AM – 12:30 PM (40 Points; 4-min demo + 3-min jury Q&A).
- Grand Valedictory & Awards Ceremony: Sunday, Jan 24 at 02:30 PM – 04:30 PM IST.
- Return Bus Fleet Dispersal: Sunday, Jan 24 at 05:00 PM IST.`
  },
  {
    id: 'prizes-and-bounties',
    category: 'Prizes',
    title: '₹1,75,000 Total Prize Pool Prize Pool & AWS Promotional Credits',
    keywords: ['prize', 'cash', 'money', 'award', 'bounty', 'pool', 'credits', 'champion', 'winner', 'runner up'],
    content: `Total Prize Pool: ₹1,75,000 Total Prize Pool + $50,000+ AWS Cloud Promotional Credits.
Breakdown:
1. Overall Grand Champion (1st Place): ₹60,000 Payout
   - Grand Kairos Acrylic & Brass Champion Trophy
   - VC Angel Incubation Fast-Track Pitching
   - $5,000 in AWS Cloud Promotional Credits
   - Direct Tier-1 Tech Interview Fast-Track
   - Cyber Streetwear Swag Kit & Gold Certificates

2. First Runner-Up (2nd Place): ₹35,000 Payout
   - 1st Runner-Up Acrylic Trophy
   - $2,500 in AWS Cloud Promotional Credits
   - Priority Interview Opportunities with Enterprise Sponsors
   - Streetwear Swag Kit & Silver Certificates

3. Second Runner-Up (3rd Place): ₹20,000 Payout
   - 2nd Runner-Up Acrylic Trophy
   - $1,000 in AWS Cloud Promotional Credits
   - Streetwear Swag Kit & Bronze Certificates

4. 5 Dedicated Track Winners: ₹7,000 Each (Total ₹35,000 Payout)
   - Best in Agentic AI & Generative Intelligence: ₹7,000 Cash
   - Best in Cloud-Native & Distributed Systems: ₹7,000 Cash
   - Best in Autonomous Edge IoT: ₹7,000 Cash
   - Best in FinTech, Trust & Security: ₹7,000 Cash
   - Best in Open Enterprise & Campus Life: ₹7,000 Cash
   - Dedicated Track Winner Mementos & Sponsor accelerator consideration

5. Special Category Citations: ₹25,000 Payout Total
   - Best All-Women Team: ₹10,000 Payout
   - Best Freshman / Rookie Team: ₹7,500 Payout
   - Most Scalable AWS Architecture: ₹7,500 Payout`
  },
  {
    id: 'technical-tracks',
    category: 'Tracks',
    title: 'The 5 Grand Enterprise Technical Tracks',
    keywords: ['track', 'tracks', 'theme', 'problem', 'agentic ai', 'cloud native', 'iot', 'fintech', 'enterprise'],
    content: `KAIROS 2027 features 5 core technical engineering tracks:
Track 01: Agentic AI & Generative Intelligence
- Bounty: ₹7,000 Cash
- Focus: Multi-agent autonomous swarms, self-healing CI/CD agents, production hybrid RAG with reranking, multimodal intelligence.
- Recommended Stacks: Amazon Bedrock, Claude 3.5 Sonnet, AWS Lambda, Amazon OpenSearch, LangChain/LlamaIndex, FastAPI.

Track 02: Cloud-Native, High-Throughput & Distributed Systems
- Bounty: ₹7,000 Cash
- Focus: Sub-millisecond event meshes, distributed state idempotency, microVM runtimes (Firecracker), OpenTelemetry observability.
- Recommended Stacks: Amazon ECS/EKS, Amazon DynamoDB, AWS EventBridge, AWS Fargate, Go/Rust, PostgreSQL.

Track 03: Autonomous Edge IoT & Sustainable Green Energy
- Bounty: ₹7,000 Cash
- Focus: Smart microgrid demand balancing, municipal resource telemetry, precision agricultural logistics, microcontroller edge inference.
- Recommended Stacks: AWS IoT Core, AWS Greengrass, Amazon Timestream, ESP32/Raspberry Pi, MQTT, TimescaleDB.

Track 04: Next-Gen FinTech, Trust & Cryptographic Security
- Bounty: ₹7,000 Cash
- Focus: Algorithmic fraud recognition, double-entry ledger consistency, privacy-preserving KYC with ZK proofs & DID, digital settlement rails.
- Recommended Stacks: AWS KMS, Amazon Cognito, AWS GuardDuty, Amazon Aurora Serverless, Python/Polars, Redis.

Track 05: Open Enterprise & Campus Life Innovation
- Bounty: ₹7,000 Cash
- Focus: Intelligent document automation OCR, clinical report triage, automated student lifecycle logistics, multilingual civic platforms.
- Recommended Stacks: Amazon S3, Amazon Textract, Amazon SageMaker, API Gateway, Next.js, PyTorch.`
  },
  {
    id: 'qualification-pipeline',
    category: 'Process',
    title: 'Dual-Phase Merit Qualification Pipeline',
    keywords: ['qualifier', 'round 0', 'round 1', 'round 2', 'selection', 'how to join', 'steps', 'pipeline', 'loom'],
    content: `The KAIROS 2027 selection pipeline is 100% merit-based:
- Phase 0 (Free Registration): Submit project abstract and architecture blueprint online. Teams of 4–6 builders. Mandatory Meetup RSVP and AWS Builder Center profile.
- Round 1 (Online Technical Qualifier, Jan 02–04, 2027): Top 250 shortlisted teams submit a working GitHub repository prototype and a 3-minute Loom video demo, followed by a 7-minute virtual defense session with AWS Solutions Architects.
- Round 2 (On-Campus 48-Hour Grand Finale, Jan 22–24, 2027): The Top 100 elite teams receive official on-campus qualification passes to assemble at Sathyabama Central Library in Chennai for 48 hours of continuous building.`
  },
  {
    id: 'rules-and-eligibility',
    category: 'Rules',
    title: 'Rules, Eligibility, Team Size and Guidelines',
    keywords: ['rules', 'eligibility', 'team size', 'cost', 'fee', 'who can apply', 'college', 'students', 'guidelines'],
    content: `Rules & Eligibility for KAIROS 2027:
- Eligibility: All registered undergraduate and postgraduate engineering and technology students across accredited institutions in India.
- Team Size: Strictly 4 to 6 builders per team. Individual builders can register and find squad teammates using the on-site Builder Radar.
- Registration Fee: Exactly ₹0. Zero entry fee, zero hidden charges. 100% free qualification.
- Code Authenticity: All code must be authored during the 48-hour hackathon. Pre-existing codebases are disqualified. Open-source libraries, foundation models, and public APIs are fully allowed.
- Hardware & Devices: Contestants bring their own laptops and hardware peripherals. High-density spike-protected power drops and 1Gbps arena Wi-Fi are provided.
- Intellectual Property: Participants retain 100% ownership of their source code, models, and blueprints. Zero equity or IP claims are made by AWS, Sathyabama, or sponsors.`
  },
  {
    id: 'hospitality-and-logistics',
    category: 'Logistics',
    title: 'Complimentary Meals, Rest Facilities, Travel & Safety',
    keywords: ['food', 'meals', 'stay', 'accommodation', 'hostel', 'sleep', 'travel', 'bus', 'wifi', 'safety', 'security'],
    content: `Logistics & Builder Welfare at KAIROS 2027:
- Food & Sustenance: 100% complimentary hot meals (7 total services: Friday Lunch & Dinner, Saturday Breakfast, Lunch & Dinner, Sunday Breakfast & Celebration Luncheon) + 24/7 filter coffee/tea bars and midnight energy snack drops.
- Rest & Accommodation: Quiet air-conditioned resting bays and segregated male & female campus resting facilities.
- Campus Night Lock-In: Strictly enforced from 10:00 PM to 06:00 AM for participant safety. Security personnel and 24/7 medical room with on-campus ambulance.
- Sathyabama Bus Fleet: Complimentary chartered university transit buses running between Chennai transit hubs (Chennai Central Railway Station, Tambaram Station, Chennai International Airport, CMBT Koyambedu) and the campus.
- Power & Connectivity: 1Gbps redundant arena Wi-Fi mesh, dedicated spike-protected multi-socket power strips for every team bay.`
  },
  {
    id: 'judging-rubric',
    category: 'Judging',
    title: 'Evaluation Rubrics & Algorithmic Normalization',
    keywords: ['judging', 'criteria', 'rubric', 'points', 'evaluation', 'score', 'z-score'],
    content: `KAIROS 2027 uses a multilateral judging rubric with Z-score mathematical normalization to eliminate judge bias. Exact point weight distributions are classified and will be released live during the hackathon:
1. Technical Architecture, Reliability & Scalability (Weight Classified):
   - Modularity, cloud service selection (Bedrock, ECS, Lambda, DynamoDB), error resilience, IAM security hardening, clean code, enterprise scalability.
2. Originality & Quality of Problem-Solving (Weight Classified):
   - Depth of domain understanding, freshness of engineering insight, avoidance of shallow prompt wrappers or trivial clones.
3. Working Prototype & User Experience (Weight Classified):
   - Live functional demonstration during checkpoints and stage finals; responsive, intuitive frontend polish and operational backend endpoints.
4. Practical Value & Pitch Defense (Weight Classified):
   - Real-world deployment viability, clarity of presentation, defense rigor under jury grilling by VC partners and AWS Principal Architects.`
  },
  {
    id: 'rainmaker-referrals',
    category: 'Referrals',
    title: 'Rainmaker Corporate Sponsor Referral Program (Earn 10%–15% Cash)',
    keywords: ['referral', 'earn', 'rainmaker', 'sponsor', 'commission', 'payout', 'money', 'upi'],
    content: `The KAIROS Rainmaker Program lets students and builders earn direct payout by referring corporate sponsors:
- 21-Day Exclusive Lead Lock: Once submitted, the sponsor lead is locked to the referrer for 21 days.
- Instant UPI Cash Payout within 48 hours of sponsor invoice settlement.
- Payout Tiers:
  - Title Presenting Partner (₹2,00,000 deal): Earn 10%–15% = ₹20,000 – ₹30,000 Payout + National Rainmaker Trophy on stage + VIP Pass.
  - Co-Powered Partner (₹1,00,000 deal): Earn 10%–12% = ₹10,000 – ₹12,000 Payout + VIP Jury Lounge access.
  - Associate / Gold Partner (₹50,000 deal): Earn 10% = ₹5,000 Payout + Cyber Hoodie kit.
  - Technical Track Partner (₹25,000 deal): Earn 10% = ₹2,500 Payout.
  - In-Kind F&B / Fuel Partner (Red Bull, snacks, cloud credits): Fixed Bounty ₹3,000 – ₹5,000 Payout.`
  },
  {
    id: 'leadership-and-contacts',
    category: 'Contact',
    title: 'Organizing Leadership & Contact Information',
    keywords: ['organizers', 'thenappan', 'faculty', 'contact', 'email', 'phone', 'lead', 'ashok kumar', 'balapriya', 'sbgl'],
    content: `KAIROS 2027 Leadership Cadre:
- Apex Leader: Thenappan T (Register No: 44110855), President & Student Builder Group Leader (SBGL), SIST Chapter.
- Faculty Coordinators: Dr. K. Ashok Kumar & Dr. Balapriya .S (Department of Computer Science & Engineering, SIST).
- Chief Partnership & Finance Officer (CPFO): Nangaiyar M (Nikki) (Reg: 44612059) — Directing corporate relations & ₹3.5L treasury.
- Chief Technology & Infrastructure Officer (CTO): Shanmugapriyan (Reg: 44110756) — Directing portal, 1Gbps arena Wi-Fi, and Z-score pipeline.
- Chief Operating Officer (COO): Viswanathan Ashok (Reg: 44110907) — Directing Central Library venue setup & Sathyabama bus fleet.
- Chief Experience Officer (CXO): Hemavarshine S (Reg: 44110263) — Directing 7 meal buffets, midnight fuel drops & builder welfare.
- Chief Creative & Media Officers (CCMO): Rikish B (Reg: 44110664) & Caroline Mary McPherson (Reg: 44110124) — Visual direction & 4K stage media.
Contact Email: sistawscc@gmail.com
Meetup Chapter: https://meetup.com/aws-student-builder-group-sist
Location: Sathyabama Institute of Science and Technology, Jeppiaar Nagar, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu - 600119.`
  }
];

/**
 * Retrieve the most relevant knowledge chunks matching a query using token-overlap scoring
 */
export function retrieveKairosKnowledge(query: string, maxResults = 3): KnowledgeChunk[] {
  const normalizedQuery = query.toLowerCase();
  const queryTokens = normalizedQuery
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);

  const scored = KAIROS_KNOWLEDGE_BASE.map(chunk => {
    let score = 0;

    // Check title match
    if (chunk.title.toLowerCase().includes(normalizedQuery)) {
      score += 15;
    }

    // Check keywords
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw)) {
        score += 8;
      }
      for (const token of queryTokens) {
        if (kw.includes(token) || token.includes(kw)) {
          score += 4;
        }
      }
    }

    // Check content token matches
    const contentLower = chunk.content.toLowerCase();
    for (const token of queryTokens) {
      if (contentLower.includes(token)) {
        score += 2;
      }
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // If top score is very low, return overview and dates as default context
  if (scored[0].score <= 2) {
    return [KAIROS_KNOWLEDGE_BASE[0], KAIROS_KNOWLEDGE_BASE[1]];
  }

  return scored.slice(0, maxResults).map(s => s.chunk);
}

/**
 * Deterministic local RAG synthesis engine used when Gemini API key is not configured or offline.
 * Produces structured, accurate, beautifully styled answers directly from retrieved knowledge!
 */
export function synthesizeLocalAnswer(query: string, retrieved: KnowledgeChunk[]): string {
  const q = query.toLowerCase();

  // 1. Referral & Sponsor Rainmaker
  if (q.includes('refer') || q.includes('rainmaker') || q.includes('commission') || (q.includes('sponsor') && (q.includes('earn') || q.includes('cash') || q.includes('money') || q.includes('lead')))) {
    return `**KAIROS Rainmaker Sponsor Referral Program (Earn 10%–15% Payout):**

Students can connect corporate sponsors to KAIROS 2027 and earn direct payouts sent via UPI within 48 hours of closing:
• **Title Presenting Partner (₹2,00,000):** You earn **₹20,000 – ₹30,000 Payout** + National Rainmaker Trophy on stage + VIP Pass!
• **Co-Powered By Partner (₹1,00,000):** You earn **₹10,000 – ₹12,000 Payout** + VIP Lounge Pass.
• **Associate / Gold Partner (₹50,000):** You earn **₹5,000 Payout** + Merch Kit.
• **Technical Track Partner (₹25,000):** You earn **₹2,500 Payout**.
• **In-Kind F&B / Fuel:** **₹3,000 – ₹5,000 Payout** fixed bounty.

*All referrals include an automated 21-day exclusive lead lock!* Head over to the **Rainmaker (₹)** tab to register your lead.`;
  }

  // 2. Payout Prize Pool
  if (q.includes('prize') || q.includes('cash') || q.includes('bounty') || q.includes('money') || q.includes('pool') || q.includes('champion')) {
    return `**KAIROS 2027 Prize Pool: ₹1,75,000 + $50,000+ AWS Credits**

• **1st Place (Grand Champion):** **₹60,000 Payout** + Brass Trophy + VC Incubation Fast-Track + $5,000 AWS Credits + Tier-1 Interview fast-track
• **2nd Place (1st Runner-Up):** **₹35,000 Payout** + Trophy + $2,500 AWS Credits + Sponsor Interviews
• **3rd Place (2nd Runner-Up):** **₹20,000 Payout** + Trophy + $1,000 AWS Credits
• **5 Dedicated Track Winners:** **₹7,000 Payout each** (Total ₹35,000)
• **Special Category Citations:**
  - Best All-Women Team: **₹10,000 Cash**
  - Best Freshman / Rookie Team: **₹7,500 Cash**
  - Most Scalable AWS Architecture: **₹7,500 Cash**

*Plus streetwear swag kits, NFC badges, and certificates for all finalists!*`;
  }

  // 3. 5 Technical Tracks
  if (q.includes('track') || q.includes('theme') || q.includes('topic') || q.includes('problem')) {
    return `**The 5 Grand Enterprise Technical Tracks at KAIROS 2027:**

1. **Track 01: Agentic AI & Generative Intelligence** (Bounty: ₹7,000 Cash)
   - Multi-agent collaborative workflows, self-healing DevOps, hybrid RAG with reranking, multimodal models. Powered by Amazon Bedrock & Claude 3.5 Sonnet.
2. **Track 02: Cloud-Native, High-Throughput & Distributed Systems** (Bounty: ₹7,000 Cash)
   - Sub-millisecond event streaming, zero-downtime microservices, microVMs (Firecracker), OpenTelemetry. (ECS/EKS, DynamoDB, EventBridge).
3. **Track 03: Autonomous Edge IoT & Sustainable Green Energy** (Bounty: ₹7,000 Cash)
   - Microgrid balancing, municipal resource telemetry, precision agri-tech, ESP32 edge inference. (AWS IoT Core, Greengrass, Timestream).
4. **Track 04: Next-Gen FinTech, Trust & Cryptographic Security** (Bounty: ₹7,000 Cash)
   - Sub-millisecond fraud pattern recognition, double-entry reconciliation, ZK proofs & DID. (AWS KMS, Cognito, Aurora Serverless).
5. **Track 05: Open Enterprise & Campus Life Innovation** (Bounty: ₹7,000 Cash)
   - Institutional document OCR pipelines, healthcare triage, campus logistics automation. (Textract, SageMaker, Next.js).`;
  }

  // 4. Free Registration
  if (q.includes('free') || q.includes('fee') || q.includes('cost') || q.includes('price')) {
    return `**Zero Registration Fee: 100% Free Nationwide**

KAIROS 2027 has **zero entry fee** for all students nationwide. Every qualified team receives:
• Free campus access and 48 hours of continuous hacking
• 7 complimentary hot meals, midnight fuel drops & 24/7 filter coffee
• Smart NFC builder badges & exclusive swag kits
• Complimentary Sathyabama bus fleet transit across Chennai transit hubs
• Zero equity or IP claims — participants own 100% of their intellectual property.`;
  }

  // 5. Dates & Schedule
  if (q.includes('date') || q.includes('when') || q.includes('schedule') || q.includes('time') || q.includes('timeline')) {
    return `**KAIROS 2027 Key Dates & Timetable:**

• **Round 0 Applications Close:** December 28, 2026 at 11:59 PM IST
• **Round 1 Online Qualifier (Semi-Finals):** January 02–04, 2027 (GitHub POC & Loom demo + 7-min virtual defense)
• **Finalist Announcement (Top 100 Teams):** January 08, 2027
• **On-Campus Grand Finale:** January 22–24, 2027 at Sathyabama Central Library, Chennai
• **Hackathon Clock Starts:** Friday, Jan 22, 2027 at 12:15 PM IST
• **Hard Code Freeze:** Sunday, Jan 24, 2027 at 12:15 PM IST (Exactly 48.0 Hours)
• **Grand Demos & Valedictory:** Sunday, Jan 24, 2027 (09:00 AM – 04:30 PM IST)`;
  }

  if (q.includes('food') || q.includes('meal') || q.includes('stay') || q.includes('accommodation') || q.includes('sleep') || q.includes('travel') || q.includes('bus')) {
    return `**Food, Accommodation, Travel & Builder Amenities:**

• **Complimentary Meals:** 7 complete hot meals (buffet style) served across the 48 hours + 24/7 filter coffee/tea bars and 01:30 AM midnight energy snack drops.
• **Rest & Safety:** AC resting zones with segregated male & female campus resting facilities. Strict 10:00 PM night lock-in for safety, with 24/7 on-campus medical supervision and ambulances.
• **Transit Bus Fleet:** Sathyabama operates chartered buses connecting Chennai Central, Tambaram, Airport, and CMBT Koyambedu directly to the venue.
• **Wi-Fi & Power:** 1Gbps high-density arena Wi-Fi mesh + individual spike-protected power strips for every team desk.`;
  }

  if (q.includes('team') || q.includes('member') || q.includes('size') || q.includes('join') || q.includes('alone') || q.includes('solo')) {
    return `**Team Composition & Squad Matching:**

• **Team Size:** Strictly **4 to 6 builders** per squad.
• **Solo Builders:** If you don't have a team yet, register and broadcast your skills on the **Builder Squad Radar** on the homepage to match with fellow frontend, backend, or cloud engineers!
• **All-Women Bounty:** Form an all-women team to compete for the dedicated **₹10,000 Payout bounty**!
• **Freshman Bounty:** 1st year engineering squads can win the **₹7,500 Rookie bounty**!`;
  }

  // General synthesized response using the top retrieved knowledge
  const topChunk = retrieved[0] || KAIROS_KNOWLEDGE_BASE[0];
  return `**KAIROS 2027 Information:**

${topChunk.content}

*To explore further details, you can query prizes, technical tracks, the 48-hour schedule, rules, campus facilities, or the sponsor referral program.*`;
}
