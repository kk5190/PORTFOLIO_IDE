
import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [history, setHistory] = useState<string[]>([
    'Welcome to the Portfolio Terminal v1.0.0',
    'Type "help" to see available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: about, skills, contact, projects, clear, help';
        break;
      case 'about':
        response = 'Senior Software Engineer specializing in scalable web systems.';
        break;
      case 'skills':
        response = 'React, TypeScript, Node.js, Go, Kubernetes, AWS.';
        break;
      case 'projects':
        response = 'DevIDE-Portfolio, Fast-API-Starter, Real-time Analytics Dashboard.';
        break;
      case 'contact':
        response = 'Email: john.doe@example.com | GitHub: github.com/johndoe';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Command not found: ${cmd}. Type "help" for options.`;
    }

    setHistory([...history, `➜ ${input}`, response, '']);
    setInput('');
  };

  return (
    <div className="h-64 bg-background-dark border-t border-theme flex flex-col font-mono text-sm overflow-hidden z-10">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 h-9 border-b border-theme bg-sidebar-dark flex-shrink-0">
        <div className="flex items-center gap-4 h-full">
          <div className="flex items-center gap-2 h-full border-b-2 border-primary px-1">
            <span className="uppercase text-[11px] font-bold tracking-wider">Terminal</span>
          </div>
          <div className="flex items-center gap-2 opacity-40 hover:opacity-100 cursor-pointer px-1">
            <span className="uppercase text-[11px] font-bold tracking-wider">Output</span>
          </div>
          <div className="flex items-center gap-2 opacity-40 hover:opacity-100 cursor-pointer px-1">
            <span className="uppercase text-[11px] font-bold tracking-wider">Debug Console</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-icons-outlined text-sm opacity-60 hover:opacity-100 cursor-pointer">add</span>
          <span className="material-icons-outlined text-sm opacity-60 hover:opacity-100 cursor-pointer">delete_outline</span>
          <span 
            className="material-icons-outlined text-sm opacity-60 hover:opacity-100 cursor-pointer"
            onClick={onClose}
          >
            close
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 no-scrollbar"
        onClick={() => document.getElementById('terminal-input')?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('➜') ? 'text-primary' : 'opacity-80'}>
            {line}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center gap-2">
          <span className="text-primary">➜</span>
          <input
            id="terminal-input"
            type="text"
            autoComplete="off"
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
