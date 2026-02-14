
import React from 'react';
import { FileNode } from '../types';

interface CodeRendererProps {
  file: FileNode;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ file }) => {
  const lines = file.content.split('\n');

  const highlightLine = (line: string) => {
    if (file.type === 'json') {
      return line
        .replace(/("[^"]+"):/g, '<span class="text-dracula-cyan">$1</span>:')
        .replace(/: ("[^"]+")/g, ': <span class="text-dracula-yellow">$1</span>')
        .replace(/: (\[|\]|\{|\})/g, ': <span class="text-white/30">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="text-dracula-comment">$1</span>');
    }

    if (file.type === 'yaml') {
      return line
        .replace(/^(\s*)([^#:\s]+):/g, '$1<span class="text-dracula-cyan">$2</span>:')
        .replace(/: ("[^"]+")/g, ': <span class="text-dracula-yellow">$1</span>')
        .replace(/(- )("[^"]+")/g, '$1<span class="text-dracula-yellow">$2</span>')
        .replace(/^(#.*)/g, '<span class="text-dracula-comment">$1</span>')
        .replace(/^([A-Z].*):/g, '<span class="text-dracula-pink">$1</span>:');
    }

    if (file.type === 'markdown') {
      return line
        .replace(/^(#+ .*)/g, '<span class="text-dracula-pink font-bold">$1</span>')
        .replace(/^(\* .*)/g, '<span class="text-dracula-orange">$1</span>')
        .replace(/^(- .*)/g, '<span class="text-dracula-cyan">$1</span>')
        .replace(/^(### .*)/g, '<span class="text-dracula-cyan font-semibold">$1</span>')
        .replace(/^(---)/g, '<span class="text-dracula-comment">$1</span>')
        .replace(/^(# .*)/g, '<span class="text-dracula-pink text-xl">$1</span>')
        .replace(/^(\/\/.*)/g, '<span class="text-dracula-comment">$1</span>');
    }

    return line;
  };

  return (
    <div className="flex-1 overflow-hidden flex relative">
      <div className="flex-1 overflow-y-auto code-container text-sm md:text-base py-4 font-mono no-scrollbar">
        {lines.map((line, idx) => (
          <div key={idx} className="flex w-full code-line group">
            <div className="w-12 md:w-16 text-right pr-4 text-xs md:text-sm text-dracula-comment select-none opacity-50">
              {idx + 1}
            </div>
            <div 
              className="flex-1 whitespace-pre px-2"
              dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }}
            />
          </div>
        ))}
      </div>
      
      {/* Mini Map simulation */}
      <div className="w-24 border-l border-white/5 opacity-20 hidden lg:block select-none overflow-hidden flex-shrink-0">
        <div className="h-full w-full py-4 px-1 flex flex-col gap-1 pointer-events-none">
          {lines.slice(0, 40).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-sm ${i % 5 === 0 ? 'bg-primary/40 w-3/4' : 'bg-white/10 w-full'}`}
              style={{ width: `${Math.random() * 50 + 50}%` }}
            />
          ))}
        </div>
        <div className="absolute top-4 right-0 w-24 h-48 bg-white/5 border-y border-white/10"></div>
      </div>
    </div>
  );
};

export default CodeRenderer;
