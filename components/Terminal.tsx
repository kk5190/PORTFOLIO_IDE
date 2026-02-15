import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_CONFIG } from '../portfolio.config';
import Icon from './atoms/Icon';

interface TerminalProps {
  onClose: () => void;
  height: number;
}

type TerminalTab = 'problems' | 'output' | 'debug' | 'terminal';

const Terminal: React.FC<TerminalProps> = ({ onClose, height }) => {
  const [activeTab, setActiveTab] = useState<TerminalTab>('terminal');
  const [history, setHistory] = useState<string[]>([
    'Welcome to the Portfolio Terminal v1.1.0',
    'System ready. Type "help" to list available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, activeTab]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const cmd = input.trim().toLowerCase();
    setHistory(prev => [...prev, `➜ ${input}`]);
    setInput('');

    let responseLines: string[] = [];
    switch (cmd) {
      case 'help':
        responseLines = ['about, projects, contact, skills, exp, neofetch, theme, clear, exit'];
        break;
      case 'neofetch':
        responseLines = [
          'OS: PortfolioOS v1.5.0',
          'Kernel: Krishna-Core',
          'Shell: portfolio-sh',
          'Uptime: 10 Years Exp',
          'Status: Open for opportunities'
        ];
        break;
      case 'clear':
        setHistory(['Terminal cleared.']);
        return;
      case 'exit':
        onClose();
        return;
      default:
        responseLines = [`Command not found: ${cmd}`];
    }

    setIsTyping(true);
    await new Promise(r => setTimeout(r, 100));
    setHistory(prev => [...prev, ...responseLines, '']);
    setIsTyping(false);
  };

  const renderTerminal = () => (
    <div 
      className="flex-1 overflow-y-auto p-4 font-mono custom-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className={`mb-0.5 whitespace-pre ${line.startsWith('➜') ? 'text-primary font-bold' : 'opacity-80'}`}>
          {line}
        </div>
      ))}
      <form onSubmit={handleCommand} className="flex items-center gap-2">
        <span className="text-primary font-bold">➜</span>
        <input
          ref={inputRef}
          type="text"
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white caret-primary"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );

  const renderProblems = () => (
    <div className="flex-1 p-4 overflow-y-auto text-xs opacity-60 custom-scrollbar">
      <div className="flex items-center gap-2 mb-2 text-red-400 font-bold">
        <Icon name="error" className="text-sm" />
        <span>0 Errors</span>
      </div>
      <div className="flex items-center gap-2 mb-2 text-yellow-400 font-bold">
        <Icon name="warning" className="text-sm" />
        <span>0 Warnings</span>
      </div>
      <div className="italic mt-4">No problems have been detected in the workspace.</div>
    </div>
  );

  return (
    <div style={{ height: `${height}px` }} className="bg-background-dark border-t border-theme flex flex-col z-10 overflow-hidden">
      <div className="flex items-center justify-between px-4 h-9 border-b border-theme bg-sidebar-dark transition-colors" style={{ backgroundColor: 'var(--theme-sidebar)' }}>
        <div className="flex items-center gap-4 h-full">
          {(['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL'] as const).map(tab => {
            const tabId = tab.toLowerCase().split(' ')[0] as TerminalTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tabId)}
                className={`h-full px-2 text-[10px] md:text-[11px] font-bold tracking-wider transition-all border-b-2 ${
                  activeTab === tabId ? 'border-primary text-primary opacity-100' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <Icon name="close" className="text-sm opacity-60 hover:opacity-100 cursor-pointer" onClick={onClose} />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--theme-editor-bg)' }}>
        {activeTab === 'terminal' && renderTerminal()}
        {activeTab === 'problems' && renderProblems()}
        {activeTab === 'output' && <div className="p-4 text-xs opacity-40 font-mono custom-scrollbar overflow-y-auto">No output to display.</div>}
        {activeTab === 'debug' && <div className="p-4 text-xs opacity-40 font-mono italic custom-scrollbar overflow-y-auto">Debug Console is inactive.</div>}
      </div>
    </div>
  );
};

export default Terminal;