import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ArrowUp } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

// Other parts of the page (the command menu, the contact section) open the chat with this event.
export const OPEN_CHAT_EVENT = 'open-ai-chat';

const SUGGESTIONS = [
  'What security tools has Khalid built?',
  'Can he build a full-stack web app?',
  'How do his trading bots manage risk?',
];

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Hi, I'm Khalid's assistant. Ask me about his security work, the apps he's built, or his trading systems.",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, open);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, open);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isOpen) inputRef.current?.focus();
  }, [messages, isOpen]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(
        messages.map(m => m.text),
        userMsg.text
      );

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn border-tie bg-tie text-shirt shadow-[0_18px_40px_-18px_rgba(27,42,74,.8)] hover:border-brass hover:bg-brass hover:text-suit"
          aria-label="Ask Khalid's assistant"
        >
          <MessageCircle size={18} /> <span className="hidden sm:inline">Ask about Khalid</span>
        </button>
      )}

      {isOpen && (
        <div
          className="sheet rise flex h-[min(560px,80vh)] w-[calc(100vw-2rem)] flex-col overflow-hidden sm:w-[390px]"
          role="dialog"
          aria-label="Chat with Khalid's assistant"
        >
          <div className="flex items-center justify-between bg-tie px-5 py-4 text-shirt">
            <div>
              <p className="disp text-lg font-bold tracking-tight">Ask about Khalid</p>
              <p className="mono mt-0.5 text-[11px] text-[#A9B2C4]">AI assistant · answers from his bio</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="icon-btn h-9 w-9 border-[#A9B2C4]/40 hover:border-shirt hover:bg-shirt hover:text-tie" aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-[15px] leading-snug ${
                    msg.role === 'user' ? 'rounded-br-sm bg-tie text-shirt' : 'rounded-bl-sm bg-shirt text-tie'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-col items-start gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-mist px-3 py-1.5 text-left text-[14px] text-slate transition-colors hover:border-tie hover:text-tie">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex">
                <div className="flex h-10 items-center gap-1 rounded-lg rounded-bl-sm bg-shirt px-4" aria-label="Typing">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t border-mist bg-shirt p-3"
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question"
              aria-label="Your question"
              className="w-full bg-transparent px-2 py-2.5 text-tie outline-none placeholder:text-slate"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-tie text-shirt transition-colors hover:bg-brass hover:text-suit disabled:opacity-35"
              aria-label="Send question"
            >
              <ArrowUp size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat;
