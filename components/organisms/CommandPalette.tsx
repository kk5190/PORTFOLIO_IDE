
import React, { useState, useEffect, useRef } from 'react';
import { FileNode } from '../../types';
import Icon from '../atoms/Icon';

export interface CommandAction {
  id: string;
  name: string;
  icon: string;
  shortcut?: string;
  category: 'View' | 'System' | 'Editor';
  execute: () => void;
}

interface CommandPaletteProps {
  files: FileNode[];
  actions: CommandAction[];
  onFileSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ files, actions, onFileSelect, isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileItems = files.map(f => ({
    id: f.id,
    name: f.name,
    icon: f.icon,
    iconColor: f.iconColor,
    category: 'Files',
    subtext: f.path.replace('PORTFOLIO > ', ''),
    type: 'file' as const
  }));

  const actionItems = actions.map(a => ({
    id: a.id,
    name: a.name,
    icon: a.icon,
    iconColor: 'text-primary',
    category: a.category,
    subtext: a.shortcut || '',
    type: 'action' as const,
    execute: a.execute
  }));

  const allItems = [...actionItems, ...fileItems];

  const filtered = allItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const handleExecute = (item: typeof allItems[0]) => {
    if (item.type === 'file') {
      onFileSelect(item.id);
    } else if (item.execute) {
      item.execute();
    }
    onClose();
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        handleExecute(filtered[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isOpen, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center pt-20 px-4 pointer-events-none">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      <div className="w-full max-w-xl bg-sidebar-dark border border-theme shadow-2xl rounded-lg overflow-hidden flex flex-col pointer-events-auto h-fit max-h-[450px]">
        <div className="p-3 border-b border-theme/20 flex items-center gap-3">
          <Icon name="search" className="text-primary opacity-60" />
          <input 
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:opacity-30 text-white"
            placeholder="Search files or type commands (e.g., 'terminal', 'sidebar')..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="text-[10px] opacity-20 font-bold bg-white/5 px-1.5 py-0.5 rounded border border-white/10">ESC</div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <div 
                key={`${item.type}-${item.id}`}
                onClick={() => handleExecute(item)}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
                  i === selectedIndex ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 opacity-70'
                }`}
              >
                <Icon name={item.icon} className={`text-sm ${item.iconColor}`} />
                <div className="flex flex-col">
                   <span className="text-sm font-medium">{item.name}</span>
                   <span className="text-[10px] opacity-40 font-mono">{item.category}</span>
                </div>
                <span className="ml-auto text-[10px] opacity-30 truncate max-w-[150px]">{item.subtext}</span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center opacity-40 text-sm italic">No matching results found</div>
          )}
        </div>

        <div className="p-2 border-t border-theme/10 bg-black/10 flex items-center gap-4 text-[10px] opacity-30 px-4">
           <div className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">↑↓</span> to navigate</div>
           <div className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">↵</span> to select</div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
