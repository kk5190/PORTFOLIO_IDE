
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { FileNode } from '../../types';
import Icon from '../atoms/Icon';

interface CopilotProps {
  activeFile: FileNode | undefined;
}

const Copilot: React.FC<CopilotProps> = ({ activeFile }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hi! I'm your AI Copilot. I can answer questions about Krishna's experience, skills, or specific details in the open files. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are an AI assistant for Krishna Kumar Singh's developer portfolio. 
        Context of currently open file (${activeFile?.name || 'none'}):
        ${activeFile?.content || 'No file open.'}

        User Question: ${userText}

        Guidelines:
        1. Be professional, concise, and helpful.
        2. Answer based on the provided context if possible.
        3. If you don't know, suggest they check the Experience.json or AboutMe.md files.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setMessages(prev => [...prev, { role: 'ai', text: result.text || "I couldn't process that request." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI service. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar-dark overflow-hidden font-display">
      <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center border-b border-theme/10">
        <span>Copilot Chat</span>
        <Icon name="bolt" className="text-primary text-xs" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-xs leading-relaxed">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-2.5 rounded-lg ${
              m.role === 'user' 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'bg-black/20 dark:bg-white/5 border border-theme/10 opacity-90'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-1 items-center opacity-40 italic">
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
            <span>AI is thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-theme/10">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="w-full bg-black/20 dark:bg-white/5 border border-theme/20 rounded-md py-2 px-3 pr-10 outline-none focus:border-primary/50 text-xs transition-colors"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1.5 p-1 hover:text-primary transition-colors disabled:opacity-20"
          >
            <Icon name="send" className="text-sm" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Copilot;
