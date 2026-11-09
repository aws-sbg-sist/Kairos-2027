import { NextRequest, NextResponse } from 'next/server';
import { retrieveKairosKnowledge, synthesizeLocalAnswer } from '@/lib/kairos-rag';
import { checkRateLimit, createRateLimitResponse } from '@/lib/ratelimit';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  // Rate limit: 25 requests per minute per IP
  const rateLimitResult = checkRateLimit(req, { limit: 25, windowMs: 60_000 });
  if (!rateLimitResult.allowed) {
    return createRateLimitResponse(rateLimitResult.resetAt, rateLimitResult.limit);
  }

  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message cannot be empty.' }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ success: false, error: 'Message exceeds maximum length of 1000 characters.' }, { status: 400 });
    }

    const cleanQuery = message.trim();
    const retrievedChunks = retrieveKairosKnowledge(cleanQuery, 3);
    const contextText = retrievedChunks.map((c, i) => `[Source ${i + 1}: ${c.title}]\n${c.content}`).join('\n\n');

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // If Gemini API key is configured, call Gemini with grounding context
    if (apiKey) {
      try {
        const systemInstruction = `You are the official AI Assistant for KAIROS 2027, the flagship 48-hour national hackathon hosted by AWS Student Builder Group SIST at Sathyabama Institute of Science and Technology, Chennai.
Your goal is to answer participants' questions accurately, enthusiastically, and concisely.
Always refer to the following authoritative Kairos knowledge context to answer questions. If asked about prizes, tracks, dates, rules, food, accommodation, buses, or referrals, provide the exact details.
Format your answer using markdown with clear bullet points. Keep it engaging, professional, and helpful.

AUTHORITATIVE KAIROS CONTEXT:
${contextText}`;

        // Format recent conversation history for Gemini
        const contents: any[] = [];
        if (Array.isArray(history)) {
          const recentHistory: ChatMessage[] = history.slice(-4);
          for (const msg of recentHistory) {
            contents.push({
              role: msg.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: msg.content }]
            });
          }
        }
        contents.push({
          role: 'user',
          parts: [{ text: cleanQuery }]
        });

        // Call Gemini with API key in secure HTTP header
        const modelEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        const geminiRes = await fetch(modelEndpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey 
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            contents,
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 600,
            }
          }),
          // 8 second timeout so frontend is never left hanging
          signal: AbortSignal.timeout(8000),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              success: true,
              reply: generatedText,
              source: 'gemini',
              matchedTopics: retrievedChunks.map(c => c.title)
            });
          }
        } else {
          console.warn('[Gemini API response not ok]:', geminiRes.status, await geminiRes.text());
        }
      } catch (geminiError) {
        console.warn('[Gemini API call failed, falling back to local RAG engine]:', geminiError);
      }
    }

    // High-quality local RAG fallback engine: instant, robust, and 100% truthful
    const fallbackAnswer = synthesizeLocalAnswer(cleanQuery, retrievedChunks);

    return NextResponse.json({
      success: true,
      reply: fallbackAnswer,
      source: 'rag_engine',
      matchedTopics: retrievedChunks.map(c => c.title)
    });
  } catch (err: any) {
    console.error('[API Chatbot Error]:', err);
    return NextResponse.json({
      success: false,
      error: 'Sorry, I encountered an issue processing your query. Please try again.'
    }, { status: 500 });
  }
}
