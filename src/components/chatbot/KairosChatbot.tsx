'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, X, Send, Sparkles, RotateCcw, Bot, User } from 'lucide-react';
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
    content: `👋 **Welcome to KAIROS 2027!**

I am the official AWS Student Builder Group AI Assistant. Ask me anything about:
• **₹1,75,000** Total Prize Pool & AWS cloud credits
• **5 Technical Tracks** (Agentic AI, Cloud-Native, IoT, FinTech, Open Enterprise)
• **Dual-Phase Selection** & Free Round 0 Registration
• **Complimentary Meals, Transit Bus Fleet & 48H Venue**
• **Rainmaker Program** (Earn 10%–15% cash referring sponsors)

What would you like to know?`,
    time: 'Just now',
  },
];

const SUGGESTED_PROMPTS = [
  '🏆 Cash prizes breakdown?',
  '⚡ What are the 5 tracks?',
  '🆓 Is registration 100% free?',
  '📅 Full 48-hour schedule?',
  '💰 How does referral cash work?',
  '🏨 Meals, stay & transit buses?',
];

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
        content: `⚠️ Sorry, I could not complete that request right now. You can check the **FAQ** or **Rules** page, or email us at **sistawscc@gmail.com**.`,
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
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            sound?.playClick();
            setIsOpen(true);
          }}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-aws-orange via-fuchsia-400 to-yellow-500 hover:from-purple-500 hover:to-aws-orange text-slate-950 font-bold shadow-xl shadow-purple-900/40 hover:scale-105 active:scale-[0.97] transition-all duration-200 ease-entrance border border-purple-500/40"
          aria-label="Open Kairos AI Chatbot"
        >
          <div className="relative w-6 h-6 flex-shrink-0 animate-pulse">
            <Image
              src="/assets/kairos-hourglass.png"
              alt="Kairos AI"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs sm:text-sm font-sans tracking-wide">Ask Kairos AI</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>

          {/* Micro Tooltip */}
          {!hasInteracted && (
            <span className="absolute -top-10 right-0 bg-aws-canvas/95 border border-purple-500/40 text-purple-300 text-[10px] font-mono px-2.5 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap">
              ⚡ Instant RAG answers about Kairos 2027
            </span>
          )}
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="relative w-[92vw] sm:w-[390px] h-[580px] max-h-[85vh] rounded-2xl glass-panel-glow border border-purple-500/30 shadow-2xl shadow-black/80 flex flex-col overflow-hidden bg-aws-squidInk/95 origin-bottom-right animate-popover-in backdrop-blur-xl">
          {/* Header */}
          <div className="p-3.5 border-b border-purple-500/20 bg-aws-canvas/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-aws-canvas border border-purple-500/40 flex-shrink-0 p-0.5">
                <Image
                  src="/assets/kairos-hourglass.png"
                  alt="Kairos Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-xs sm:text-sm text-aws-snow tracking-wide">
                    Kairos Assistant
                  </span>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-400 border border-purple-500/40">
                    RAG
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AWS SBGL Knowledge Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-950/40 transition"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sound?.playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-950/40 transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs bg-aws-canvas/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-purple-950/60 border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-purple-400">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-3 leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-aws-orange/25 to-indigo-600/20 border border-purple-500/40 text-purple-200 font-medium'
                      : 'bg-aws-card/95 border border-purple-500/20 text-aws-snow shadow-sm'
                  }`}
                >
                  <div className="text-[11.5px] leading-relaxed select-text">
                    {msg.content}
                  </div>
                  <div className="mt-1 text-[9px] font-mono text-slate-400 text-right">
                    {msg.time}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-aws-squidInk border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-300">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs italic p-2">
                <div className="w-6 h-6 rounded-md bg-purple-950/60 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-purple-300">
                  <span>Searching Kairos knowledge base</span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-bounce" />
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 border-t border-purple-500/15 bg-aws-canvas/80">
            <div className="text-[10px] font-mono text-slate-400 mb-1.5 px-1 flex items-center gap-1">
              <span>Quick Topics:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-aws-squidInk/80 hover:bg-purple-950/60 border border-purple-500/20 hover:border-purple-500/60 text-slate-300 hover:text-white transition whitespace-nowrap flex-shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-purple-500/20 bg-aws-canvas/95 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about prizes, tracks, schedule..."
              disabled={isLoading}
              maxLength={1000}
              className="flex-1 bg-aws-card border border-purple-500/25 focus:border-purple-500 rounded-xl px-3 py-2 text-xs text-aws-snow placeholder-slate-400 outline-none focus:ring-1 focus:ring-aws-orange transition"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-2 rounded-xl bg-gradient-to-r from-aws-orange via-fuchsia-400 to-yellow-500 hover:from-purple-500 hover:to-aws-orange text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold shadow-md shadow-purple-900/30 flex-shrink-0"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
