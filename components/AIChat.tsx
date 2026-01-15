import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Hello! I'm Khalid's AI Assistant. Ask me anything about his skills in Cybersecurity, Python, or his projects!",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
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

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-cyber-green text-cyber-dark p-4 rounded-full shadow-lg shadow-cyber-green/20 hover:scale-110 transition-transform duration-200 flex items-center justify-center"
          aria-label="Open AI Chat"
        >
          <Cpu size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-[90vw] md:w-[350px] h-[500px] glass-panel rounded-xl flex flex-col overflow-hidden shadow-2xl border-cyber-green/30 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-cyber-gray/90 p-4 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></div>
              <h3 className="font-mono text-cyber-green font-bold text-sm">KHALID_AI_CORE</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cyber-dark/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-cyber-blue/20 text-cyan-100 border border-cyber-blue/30 rounded-tr-none'
                      : 'bg-gray-800/80 text-gray-200 border border-gray-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 rounded-tl-none flex space-x-1 items-center h-10">
                  <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-cyber-gray border-t border-gray-700">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about my Python skills..."
                className="w-full bg-black/30 border border-gray-600 text-gray-200 text-sm rounded-md pl-3 pr-10 py-2.5 focus:outline-none focus:border-cyber-green focus:ring-1 focus:ring-cyber-green transition-all placeholder:text-gray-600"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 text-cyber-green hover:text-white disabled:opacity-30 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;