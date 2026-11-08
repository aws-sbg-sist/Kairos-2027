export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * PRODUCTION AI GUARDRAILS & INPUT VALIDATION ENGINE
 * Provides layered prompt injection protection, token estimation,
 * request validation, scope enforcement, and output data leakage defense.
 */

// Basic token estimation heuristic (~4 chars per token in English + token boundary weight)
export function estimateTokens(text: string): number {
  if (!text) return 0;
  // Count words and characters
  const trimmed = text.trim();
  const wordCount = trimmed.split(/\s+/).length;
  const charEstimate = Math.ceil(trimmed.length / 4);
  return Math.max(wordCount, charEstimate);
}

/**
 * Sanitize untrusted input to defend against control character exploits & null byte injections
 */
export function sanitizeInput(text: string): string {
  return text
    .replace(/\0/g, '') // remove null bytes
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '') // non-printable control chars
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, '') // Unicode bidirectional overrides
    .trim();
}

/**
 * Validate incoming chat request payload
 */
export interface ValidationResult {
  valid: boolean;
  statusCode?: number;
  error?: string;
  cleanMessage?: string;
  cleanHistory?: ChatMessage[];
}

export function validateChatPayload(body: any, maxMessageLength = 1500): ValidationResult {
  if (!body || typeof body !== 'object') {
    return {
      valid: false,
      statusCode: 400,
      error: 'Invalid request format. Expected JSON object with a message field.'
    };
  }

  const { message, history } = body;

  if (typeof message !== 'string' || !message) {
    return {
      valid: false,
      statusCode: 400,
      error: 'Message cannot be empty.'
    };
  }

  if (!message.trim()) {
    return {
      valid: false,
      statusCode: 400,
      error: 'Message cannot be empty or solely whitespace.'
    };
  }

  const cleanMessage = sanitizeInput(message);

  if (cleanMessage.length === 0) {
    return {
      valid: false,
      statusCode: 400,
      error: 'Message cannot be empty or solely whitespace.'
    };
  }

  if (cleanMessage.length > maxMessageLength) {
    return {
      valid: false,
      statusCode: 413,
      error: `Message exceeds maximum allowed length of ${maxMessageLength} characters.`
    };
  }

  // Validate conversation history array (cap at 6 turns to bound context window)
  let cleanHistory: ChatMessage[] = [];
  if (history !== undefined) {
    if (!Array.isArray(history)) {
      return {
        valid: false,
        statusCode: 400,
        error: 'History must be an array of messages.'
      };
    }

    const sanitizedHistory = history
      .filter(item => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
      .slice(-6)
      .map(item => ({
        role: item.role as 'user' | 'assistant',
        content: sanitizeInput(item.content).slice(0, 1000)
      }));

    cleanHistory = sanitizedHistory;
  }

  return {
    valid: true,
    cleanMessage,
    cleanHistory
  };
}

/**
 * Layered Prompt Injection and System Override Detection
 * Avoids false positives on legitimate queries containing words like 'system' or 'ignore'.
 */
export interface ThreatAssessment {
  isThreat: boolean;
  threatType?: string;
}

export function detectPromptInjection(text: string): ThreatAssessment {
  const normalized = text.toLowerCase();

  const injectionRules: Array<{ pattern: RegExp; type: string }> = [
    {
      pattern: /ignore\s+(all\s+)?(previous|prior|above|existing|system)\s+(instructions|directives|prompts|rules)/i,
      type: 'INSTRUCTION_OVERRIDE'
    },
    {
      pattern: /disregard\s+(the\s+)?(system|prompt|instructions|rules|guidelines)/i,
      type: 'DISREGARD_SYSTEM'
    },
    {
      pattern: /forget\s+(all\s+)?(previous|prior|system)\s+(instructions|rules|prompts)/i,
      type: 'FORGET_INSTRUCTIONS'
    },
    {
      pattern: /bypass\s+(all\s+)?(rules|safety|guardrails|filters|restrictions)/i,
      type: 'BYPASS_RESTRICTIONS'
    },
    {
      pattern: /you\s+are\s+now\s+(in\s+)?(developer\s+mode|dan|jailbreak|unfiltered|god\s+mode)/i,
      type: 'JAILBREAK_ROLEPLAY'
    },
    {
      pattern: /reveal\s+(your\s+|the\s+)?(system\s+prompt|hidden\s+instructions|secret\s+instructions|master\s+prompt|developer\s+prompt)/i,
      type: 'SYSTEM_PROMPT_EXTRACTION'
    },
    {
      pattern: /(reveal|show|print|leak|output|echo|display)\s+(your\s+|the\s+)?([a-z0-9_-]*\s*)?(api[_\s]*key|access[_\s]*key|gemini[_\s]*key|aws[_\s]*secret|master[_\s]*secret|env[_\s]*variables|environment[_\s]*variables|secret[_\s]*credentials)/i,
      type: 'CREDENTIAL_EXTRACTION'
    },
    {
      pattern: /(pretend|roleplay)\s+(to\s+be|as)\s+(an\s+administrator|a\s+system\s+admin|the\s+organizer|root|sudo)/i,
      type: 'ADMIN_IMPERSONATION'
    },
    {
      pattern: /(execute|run|eval)\s+(arbitrary\s+code|python\s+code|bash\s+script|shell\s+command)/i,
      type: 'ARBITRARY_CODE_EXECUTION'
    },
    {
      pattern: /(print|dump|show|reveal)\s+(internal\s+database|database\s+records|hidden\s+endpoints|internal\s+chunks|raw\s+documents)/i,
      type: 'INTERNAL_DATA_EXTRACTION'
    },
    {
      pattern: /system\s*:\s*override/i,
      type: 'EXPLICIT_SYSTEM_OVERRIDE'
    },
    {
      pattern: /system\s+override\s*:/i,
      type: 'EXPLICIT_SYSTEM_OVERRIDE'
    },
    {
      pattern: /act\s+as\s+an\s+unrestricted\s+ai/i,
      type: 'JAILBREAK_UNRESTRICTED'
    }
  ];

  for (const rule of injectionRules) {
    if (rule.pattern.test(normalized)) {
      return { isThreat: true, threatType: rule.type };
    }
  }

  return { isThreat: false };
}

/**
 * Chatbot Scope Enforcement
 * Politely redirects users when queries are clearly outside hackathon scope,
 * while allowing reasonable general educational and tech questions.
 */
export function evaluateScopeGuardrail(text: string): { isOutOfScope: boolean; redirectResponse?: string } {
  const normalized = text.toLowerCase();

  // Explicit non-hackathon domains
  const outOfScopePatterns = [
    /\b(recipe|baking|bake|cook)\b.*\b(cookie|cake|bread|soup|pizza|pasta)\b/i,
    /\b(recipe for)\b/i,
    /\b(crypto|cryptocurrency|bitcoin|ethereum|forex)\b.*\b(trade|trading|binance|bot|signals|wallet)\b/i,
    /\b(trade|trading)\b.*\b(crypto|cryptocurrency|bitcoin|ethereum|forex|stocks|binance)\b/i,
    /\b(write\s+(me\s+)?a\s+(poem|love\s+letter|song|movie\s+script))\b/i,
    /\b(weather\s+in\s+(?!chennai|sathyabama)[a-z]+|horoscope|astrology|zodiac\s+sign|tarot)\b/i
  ];

  for (const pattern of outOfScopePatterns) {
    if (pattern.test(normalized)) {
      return {
        isOutOfScope: true,
        redirectResponse: `👋 I am the dedicated **KAIROS 2027 Hackathon Assistant**! 

I'm primarily here to help with event inquiries, technical tracks, rules, schedules, venue details, and software preparation for the hackathon. 

If you have questions about KAIROS 2027 or building on AWS, feel free to ask!`
      };
    }
  }

  return { isOutOfScope: false };
}

/**
 * Post-Generation Output Guardrail
 * Verifies model output does not accidentally leak secrets, API keys, or raw system prompts.
 */
export function inspectAndSanitizeModelOutput(outputText: string): string {
  let cleaned = outputText;

  // Mask any accidental API key leaks (Gemini, AWS, or generic hex tokens)
  cleaned = cleaned.replace(/AIza[0-9A-Za-z-_]{35}/g, '[REDACTED_API_KEY]');
  cleaned = cleaned.replace(/AQ\.[0-9A-Za-z-_]{40,}/g, '[REDACTED_KEY]');
  cleaned = cleaned.replace(/AKIA[0-9A-Z]{16}/g, '[REDACTED_AWS_KEY]');
  cleaned = cleaned.replace(/ADMIN_MASTER_SECRET\s*=\s*[^\s]+/gi, 'ADMIN_MASTER_SECRET=[REDACTED]');

  // Check for verbatim system prompt leaks
  if (cleaned.includes('CORE PRINCIPLES & ANTI-HALLUCINATION POLICY:') && cleaned.includes('SPECIFIC EVENT CONSTRAINTS & POLICIES (MANDATORY):')) {
    return `### ℹ️ KAIROS 2027 Information
I am the official **KAIROS 2027 AI Assistant**. How can I help you with the hackathon tracks, schedule, rules, or venue at the Indoor Auditorium today?`;
  }

  return cleaned;
}
