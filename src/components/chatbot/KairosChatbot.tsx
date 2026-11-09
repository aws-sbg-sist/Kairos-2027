'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, X, Send, Sparkles, RotateCcw, Bot, User, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: `**Welcome to KAIROS 2027!**

I am the official AWS Student Builder Group AI Assistant. Ask me anything about:
• **₹1,75,000** Total Cash Prize Pool & AWS Promotional Credits (Secret Split-Ups!)
• **5 Technical Tracks** (Agentic AI, Cloud-Native, IoT, FinTech, Open Enterprise)
• **Dual-Phase Selection** & 100% Free Registration
• **Complimentary Meals & Transit Bus Fleet**
• **Venue:** Indoor Auditorium, Sathyabama, Chennai

What would you like to know?`,
    time: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  'Cash prize pool?',
  'What are the 5 tracks?',
  'Is registration 100% free?',
  'Full 48-hour schedule?',
  'Where is the venue?',
  'Meals & transit buses?',
];

function renderFormattedMessage(content: string) {
  const lines = content.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={idx} className="h-2" />;
    }

    if (line.startsWith('### ')) {
      return (
        <div key={idx} className="font-bold text-purple-300 text-sm sm:text-base mt-3 mb-1.5 font-ai tracking-normal">
          {line.replace('### ', '')}
        </div>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <div key={idx} className="font-bold text-white text-base sm:text-lg mt-3.5 mb-2 font-ai tracking-normal">
          {line.replace('## ', '')}
        </div>
      );
    }

    const isBullet = trimmed.startsWith('•') || trimmed.startsWith('* ') || trimmed.startsWith('- ');
    const cleanLine = isBullet ? trimmed.replace(/^[•*-]\s*/, '') : line;

    // Format bold segments
    const parts = cleanLine.split(/(\?\?\?[^*]+\?\?\?|\*\*[^*]+\*\*)/g);
    const renderedParts = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} className="font-bold text-white font-ai">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={idx} className="flex gap-2.5 pl-1 my-1.5 items-start font-ai">
          <span className="text-purple-400 select-none leading-relaxed font-bold text-base">•</span>
          <span className="flex-1 leading-relaxed text-[15px] sm:text-base text-slate-100 font-ai">{renderedParts}</span>
        </div>
      );
    }

    return (
      <div key={idx} className="my-2 leading-relaxed text-[15px] sm:text-base text-slate-100 font-ai">
        {renderedParts}
      </div>
    );
  });
}

export const KairosChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-kairos-chatbot', handleOpenEvent);
    return () => window.removeEventListener('open-kairos-chatbot', handleOpenEvent);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    sound?.playClick();
    setHasInteracted(true);
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('[Chatbot error]:', err);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Sorry, I could not complete that request right now. You can check the **FAQ** or **Rules** page, or email us at **sistawscc@gmail.com**.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    sound?.playClick();
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none font-ai">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            sound?.playClick();
            setIsOpen(true);
          }}
          className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full btn-primary-themed text-white font-bold shadow-xl shadow-purple-900/50 hover:scale-105 active:scale-[0.97] transition-colors duration-200 ease-entrance border border-purple-400/40 font-ai"
          aria-label="Open Kairos AI Chatbot"
        >
          <div className="relative w-7 h-7 flex-shrink-0 motion-safe:animate-pulse">
            <Image
              src="/assets/kairos-hourglass.png"
              alt="Kairos AI"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm sm:text-base font-bold font-ai tracking-normal">Ask Kairos AI</span>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          {/* Micro Tooltip */}
          {!hasInteracted && (
            <span className="absolute -top-11 right-0 bg-aws-canvas/95 border border-purple-500/40 text-purple-300 text-xs font-ai font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap">
              Instant RAG answers about Kairos 2027
            </span>
          )}
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="relative w-[94vw] sm:w-[480px] md:w-[500px] h-[660px] max-h-[88vh] rounded-3xl glass-panel-glow border border-purple-500/30 shadow-2xl shadow-black/80 flex flex-col overflow-hidden bg-aws-squidInk/95 origin-bottom-right animate-popover-in backdrop-blur-xl font-ai">
          {/* Header */}
          <div className="p-4 border-b border-purple-500/20 bg-aws-canvas/90 flex items-center justify-between font-ai">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-aws-canvas border border-purple-500/40 flex-shrink-0 p-1">
                <Image
                  src="/assets/kairos-hourglass.png"
                  alt="Kairos Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base sm:text-lg text-white font-ai tracking-normal">
                    Kairos Assistant
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/40 font-ai">
                    RAG
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium font-ai">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                  <span>AWS SBGL Knowledge Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearHistory}
                className="p-2 rounded-xl text-slate-300 hover:text-purple-300 hover:bg-purple-950/50 transition-colors"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  sound?.playClick();
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl text-slate-300 hover:text-purple-300 hover:bg-purple-950/50 transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-aws-canvas/30 font-ai text-[15px] sm:text-base">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-purple-950/70 border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-purple-300">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-4 leading-relaxed font-ai text-[15px] sm:text-base ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple-900/60 to-purple-950/70 border border-purple-500/50 text-white font-medium shadow-md'
                      : 'bg-aws-card/95 border border-purple-500/25 text-slate-100 shadow-md'
                  }`}
                >
                  <div className="leading-relaxed select-text font-ai">
                    {msg.role === 'assistant' ? renderFormattedMessage(msg.content) : msg.content}
                  </div>
                  <div className="mt-2 text-xs font-ai text-slate-400 text-right">
                    {msg.time}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-aws-squidInk border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-200">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 items-center text-slate-300 p-3 font-ai">
                <div className="w-7 h-7 rounded-lg bg-purple-950/70 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-400 motion-safe:animate-spin" />
                </div>
                <div className="flex items-center gap-2 font-ai text-sm text-purple-300 font-medium">
                  <span>Searching Kairos knowledge base</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 motion-safe:animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 motion-safe:animate-pulse [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 motion-safe:animate-pulse [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-3 border-t border-purple-500/15 bg-aws-canvas/80 font-ai">
            <div className="text-xs sm:text-sm font-ai font-semibold text-slate-300 mb-2 px-1 flex items-center gap-1.5">
              <span>Quick Topics:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-ai">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="px-3.5 py-1.5 rounded-full bg-aws-squidInk/90 hover:bg-purple-950/70 border border-purple-500/30 hover:border-purple-500/70 text-slate-200 hover:text-white transition-colors whitespace-nowrap flex-shrink-0 disabled:opacity-50 text-xs sm:text-sm font-medium font-ai"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3.5 border-t border-purple-500/20 bg-aws-canvas/95 flex items-center gap-2.5 font-ai">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about prizes, tracks, schedule..."
              disabled={isLoading}
              maxLength={1000}
              className="flex-1 bg-aws-card border border-purple-500/30 focus:border-purple-400 rounded-xl px-4 py-3 text-sm sm:text-base font-ai text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-purple-400 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-xl btn-primary-themed text-white hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold shadow-md shadow-purple-900/40 flex-shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
