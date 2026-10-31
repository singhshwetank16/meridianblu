import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  Calendar,
  MapPin,
  Eye,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { ChatMessage } from '../types';

interface ConciergeChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenBooking: () => void;
  onOpenTrailMap: () => void;
  onOpenVirtualTour: () => void;
}

export const ConciergeChatbot: React.FC<ConciergeChatbotProps> = ({
  isOpen,
  onToggle,
  onOpenBooking,
  onOpenTrailMap,
  onOpenVirtualTour,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      text: `Greetings and welcome. I am Pari, Head Concierge at Meridian Blu Mussoorie (7,120 feet elevation).\n\nConnected directly to our reservation system, I am prepared to assist you with real-time suite availability, Winterline twilight briefings, guided Sir George Everest ascents, or private fireside dining arrangements.`,
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "Winterline observation window & terrace timing",
    "Real-time suite availability & rates",
    "Which residences feature a stone fireplace?",
    "Airport transfer from Dehradun in luxury SUV",
    "Sir George Everest Peak naturalist excursion"
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      let replyText = data.reply || "I remain at your service. How else may I curate your mountain residence?";
      // Ensure zero emoji
      replyText = replyText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');

      let actionPayload: ChatMessage['actionPayload'] | undefined;
      const lower = textToSend.toLowerCase();
      if (lower.includes('book') || lower.includes('reserve') || lower.includes('rate') || lower.includes('suite') || lower.includes('room') || lower.includes('fireplace') || lower.includes('inventory') || lower.includes('sold out')) {
        actionPayload = {
          type: 'open_booking',
          buttonText: 'Open Online Booking Engine',
        };
      } else if (lower.includes('trail') || lower.includes('hike') || lower.includes('everest') || lower.includes('trek') || lower.includes('walk')) {
        actionPayload = {
          type: 'view_trail',
          buttonText: 'Inspect Topographical Trail Map',
        };
      } else if (lower.includes('tour') || lower.includes('view') || lower.includes('look') || lower.includes('360')) {
        actionPayload = {
          type: 'view_tour',
          buttonText: 'Launch 360° Panoramic Tour',
        };
      }

      const assistantMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPayload,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Concierge fetch error, using royal fallback:', err);
      let fallbackText = `It is my distinct honor to assist you. Our Booking Engine provides real-time residence inventory across our suites. For mountain excursions, our naturalists conduct daily ascents to Sir George Everest Peak.`;
      
      const lower = textToSend.toLowerCase();
      if (lower.includes('winterline') || lower.includes('sunset')) {
        fallbackText = "The Mussoorie Winterline is visible directly from our Sunset Terrace between 17:15 and 17:45. A rare, razor-sharp horizon of crimson and violet manifests over the Doon Valley. We serve hot Kashmiri kahwa and roasted Himalayan chestnuts during this hour.";
      } else if (lower.includes('hike') || lower.includes('trail')) {
        fallbackText = "We commend the Sir George Everest Peak Trail (3.5 kilometers, elevation 6,750 feet) for an unobstructed 360-degree panorama of the snow peaks, or the Landour Heritage Walk through historic deodar groves.";
      } else if (lower.includes('suite') || lower.includes('fireplace') || lower.includes('sold out') || lower.includes('inventory') || lower.includes('wooden') || lower.includes('maharaja')) {
        fallbackText = `Our maharaja suit, WOODEN COTTAGES, SUPER DELUXE, and TENT COTTAGES feature authentic Himalayan mountain architecture with guaranteed direct best rates.`;
      }

      const assistantMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPayload: {
          type: 'open_booking',
          buttonText: 'Verify Real-Time Suite Inventory',
        },
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: ChatMessage['actionPayload']) => {
    if (!action) return;
    if (action.type === 'open_booking') onOpenBooking();
    else if (action.type === 'view_trail') onOpenTrailMap();
    else if (action.type === 'view_tour') onOpenVirtualTour();
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          
          const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
          const isNumbered = /^\d+\.\s/.test(line.trim());
          const cleanLine = isBullet ? line.trim().substring(2) : isNumbered ? line.trim().replace(/^\d+\.\s/, '') : line;

          const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

          const content = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="text-slate-900 font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-blue-600 mt-1 shrink-0 font-bold">•</span>
                <span className="leading-relaxed">{content}</span>
              </div>
            );
          }

          if (isNumbered) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-blue-600 font-bold shrink-0">{line.trim().match(/^\d+\./)?.[0]}</span>
                <span className="leading-relaxed">{content}</span>
              </div>
            );
          }

          return <p key={idx} className="leading-relaxed">{content}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#0b1c33] to-[#1e3a5f] hover:from-[#0d223f] hover:to-[#254877] text-white shadow-2xl flex items-center gap-3 transition-all duration-300 group hover:scale-105 active:scale-95 cursor-pointer border border-sky-300/30"
          aria-label="Consult Head Concierge Pari"
        >
          <div className="relative">
            <Compass className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform duration-500" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
          </div>
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider text-white">
            Head Concierge Pari
          </span>
        </button>
      )}

      {/* Concierge Drawer / Modal - Frosted Glass Alpine */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl flex flex-col overflow-hidden animate-fade-in text-slate-800">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0b1c33] via-[#0f2847] to-[#1e3a5f] text-white p-4 flex items-center justify-between border-b border-sky-300/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base font-bold text-white">Head Concierge Pari</h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-medium">
                    Active · 7,120 ft
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-sky-200">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Live Concierge Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Reset Dialogue"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Dismiss Concierge"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/60">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-800 shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed ${
                        isAssistant
                          ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                          : 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium rounded-tr-sm shadow-md'
                      }`}
                    >
                      {isAssistant ? renderFormattedText(msg.text) : <p>{msg.text}</p>}
                    </div>

                    {isAssistant && msg.actionPayload && (
                      <button
                        onClick={() => handleActionClick(msg.actionPayload)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-[11px] font-semibold transition-colors shadow-sm cursor-pointer"
                      >
                        {msg.actionPayload.type === 'open_booking' && <Calendar className="w-3.5 h-3.5 text-blue-700" />}
                        {msg.actionPayload.type === 'view_trail' && <MapPin className="w-3.5 h-3.5 text-blue-700" />}
                        {msg.actionPayload.type === 'view_tour' && <Eye className="w-3.5 h-3.5 text-blue-700" />}
                        <span>{msg.actionPayload.buttonText}</span>
                        <ArrowRight className="w-3 h-3 text-blue-700" />
                      </button>
                    )}

                    <div className={`text-[10px] text-slate-400 ${isAssistant ? 'text-left pl-1' : 'text-right pr-1'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-full bg-blue-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Checking live reservations & availability...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3.5 py-2 border-t border-slate-200 bg-white overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-[11px] text-slate-600 hover:text-blue-900 transition-colors shrink-0 cursor-pointer font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Inquire regarding suites, inventory, dining, or trails..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white transition-all disabled:opacity-40 cursor-pointer shadow-sm"
              aria-label="Transmit inquiry"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
