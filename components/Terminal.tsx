
import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [history, setHistory] = useState<string[]>([
    'Welcome to the Portfolio Terminal v1.1.0',
    'System ready. Type "help" to list available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addLineWithTyping = async (line: string) => {
    setIsTyping(true);
    setHistory(prev => [...prev, line]);
    setIsTyping(false);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const cmd = input.trim().toLowerCase();
    const userPrompt = `➜ ${input}`;
    setHistory(prev => [...prev, userPrompt]);
    setInput('');

    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: about, skills, contact, projects, clear, help, theme, exit';
        break;
      case 'about':
        response = 'Senior Software Engineer specializing in scalable web systems and modern frontend architectures.';
        break;
      case 'skills':
        response = 'Primary Stack: React, TypeScript, Node.js, Go, Kubernetes, AWS.';
        break;
      case 'projects':
        response = 'Founding projects: DevIDE-Portfolio, Fast-API-Starter, Real-time Analytics Dashboard.';
        break;
      case 'contact':
        response = 'Direct reach: john.doe@example.com | GitHub: github.com/johndoe';
        break;
      case 'theme':
        response = 'Theme management is available via the Settings (⚙️) tab in the Sidebar.';
        break;
      case 'exit':
        onClose();
        return;
      case 'clear':
        setHistory(['Terminal cleared. System ready.', '']);
        return;
      default:
        response = `Command not found: "${cmd}". Type "help" for a list of valid commands.`;
    }

    setIsTyping(true);
    // Simulate thinking/processing time
    await new Promise(r => setTimeout(r, 150));
    setHistory(prev => [...prev, response, '']);
    setIsTyping(false);
  };

  return (
    <div className="h-64 bg-background-dark border-t border-theme flex flex-col font-mono text-xs md:text-sm overflow-hidden z-10 transition-all">
      <div className="flex items-center justify-between px-4 h-9 border-b border-theme bg-sidebar-dark flex-shrink-0">
        <div className="flex items-center gap-4 h-full">
          <div className="flex items-center gap-2 h-full border-b-2 border-primary px-1">
            <span className="uppercase text-[10px] md:text-[11px] font-bold tracking-wider">Terminal</span>
          </div>
          <div className="hidden md:flex items-center gap-2 opacity-40 hover:opacity-100 cursor-pointer px-1 transition-opacity">
            <span className="uppercase text-[11px] font-bold tracking-wider">Output</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 opacity-40 hover:opacity-100 cursor-pointer px-1 transition-opacity">
            <span className="uppercase text-[11px] font-bold tracking-wider">Debug Console</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-icons-outlined text-sm opacity-60 hover:opacity-100 cursor-pointer transition-opacity">add</span>
          <span className="material-icons-outlined text-sm opacity-60 hover:opacity-100 cursor-pointer transition-opacity">delete_outline</span>
          <span 
            className="material-icons-outlined text-sm opacity-60 hover:opacity-100 cursor-pointer transition-all hover:rotate-90"
            onClick={onClose}
          >
            close
          </span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 no-scrollbar bg-[#0c0c0d]/50"
        onClick={() => document.getElementById('terminal-input')?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-0.5 ${line.startsWith('➜') ? 'text-primary' : 'opacity-80'}`}>
            {line}
          </div>
        ))}
        {!isTyping && (
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-primary font-bold">➜</span>
            <input
              id="terminal-input"
              type="text"
              autoComplete="off"
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-white selection:bg-primary/30"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        )}
        {isTyping && (
          <div className="flex items-center gap-2 opacity-40">
            <span className="text-primary font-bold">➜</span>
            <div className="w-1.5 h-3 bg-white/40 animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
