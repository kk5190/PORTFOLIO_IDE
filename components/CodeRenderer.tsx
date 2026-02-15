
import React from 'react';
import { FileNode } from '../types';
import Icon from './atoms/Icon';

interface CodeRendererProps {
  file: FileNode;
  isPreview?: boolean;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ file, isPreview }) => {
  const lines = file.content.split('\n');

  const highlightLine = (line: string) => {
    if (!line.trim()) return '&nbsp;';

    if (file.type === 'json') {
      return line
        .replace(/("[^"]+"):/g, '<span style="color: var(--theme-variable)">$1</span>:')
        .replace(/: ("[^"]+")/g, ': <span style="color: var(--theme-string)">$1</span>')
        .replace(/: (\[|\]|\{|\})/g, ': <span style="opacity: 0.3">$1</span>')
        .replace(/(\/\/.*)/g, '<span style="color: var(--theme-comment)">$1</span>');
    }

    if (file.type === 'yaml') {
      return line
        .replace(/^(\s*)([^#:\s]+):/g, '$1<span style="color: var(--theme-variable)">$2</span>:')
        .replace(/: ("[^"]+")/g, ': <span style="color: var(--theme-string)">$1</span>')
        .replace(/(- )("[^"]+")/g, '$1<span style="color: var(--theme-string)">$2</span>')
        .replace(/^(#.*)/g, '<span style="color: var(--theme-comment)">$1</span>')
        .replace(/^([A-Z].*):/g, '<span style="color: var(--theme-keyword)">$1</span>:');
    }

    if (file.type === 'markdown') {
      return line
        // Headers (Pink)
        .replace(/^(\s*)(#+ .*)/g, '$1<span style="color: var(--theme-keyword); font-weight: bold">$2</span>')
        // Horizontal Rules (Comment gray)
        .replace(/^(\s*)(---)/g, '$1<span style="color: var(--theme-comment)">$2</span>')
        // Links and Emails (Green)
        .replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, '<span style="color: var(--theme-type)">$1</span>')
        .replace(/(github\.com\/[^\s]+|linkedin\.com\/in\/[^\s]+)/g, '<span style="color: var(--theme-type)">$1</span>')
        // Lists
        .replace(/^(\s*)(- .*)/g, '$1<span style="opacity: 1">$2</span>');
    }

    return line;
  };

  if (isPreview && file.type === 'markdown') {
    const previewContent = file.content
      .split('\n')
      .map((line, i) => {
        const trimmed = line.trim();
        const indent = line.search(/\S/);
        const indentStyle = indent > 0 ? `style="margin-left: ${indent * 0.5}rem"` : '';

        if (trimmed.startsWith('# ')) return `<h1 key=${i} class="text-3xl font-bold mb-4 mt-8 pb-2 border-b border-theme">${trimmed.replace('# ', '')}</h1>`;
        if (trimmed.startsWith('## ')) return `<h2 key=${i} class="text-2xl font-bold mb-3 mt-6">${trimmed.replace('## ', '')}</h2>`;
        if (trimmed.startsWith('### ')) return `<h3 key=${i} class="text-xl font-semibold mb-2 mt-4 text-primary">${trimmed.replace('### ', '')}</h3>`;
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return `<li key=${i} class="mb-1 opacity-90 list-none flex gap-2" ${indentStyle}><span class="text-primary">•</span> <span>${trimmed.substring(2)}</span></li>`;
        }
        if (/^[0-9]+\. /.test(trimmed)) {
          const parts = trimmed.split('. ');
          return `<li key=${i} class="mb-1 opacity-90 list-none flex gap-2" ${indentStyle}><span class="text-primary font-bold">${parts[0]}.</span> <span>${parts.slice(1).join('. ')}</span></li>`;
        }
        if (trimmed === '---') return `<hr key=${i} class="my-8 border-theme" />`;
        if (!trimmed) return '<div class="h-4"></div>';
        
        return `<p key=${i} class="mb-4 leading-relaxed opacity-80" ${indentStyle}>${trimmed}</p>`;
      })
      .join('');

    return (
      <div className="flex-1 overflow-y-auto bg-background-dark p-8 md:p-12 font-display scroll-smooth transition-colors duration-300">
        <div 
          className="max-w-3xl mx-auto prose dark:prose-invert"
          style={{ color: 'var(--theme-text)' }}
          dangerouslySetInnerHTML={{ __html: previewContent }}
        />
      </div>
    );
  }

  return (
    <div 
      className="flex-1 overflow-y-auto flex relative scroll-smooth" 
      style={{ backgroundColor: 'var(--theme-editor-bg)', color: 'var(--theme-text)' }}
    >
      <div className="flex-1 py-4 font-mono text-[13px] md:text-sm leading-6 min-w-0">
        {lines.map((line, idx) => (
          <div key={idx} className="flex w-full code-line group items-start relative hover:bg-white/[0.03]">
            {/* Simple Gutter with line numbers */}
            <div 
              className="w-14 md:w-16 flex justify-end items-center pr-3 select-none shrink-0 sticky left-0 z-10" 
              style={{ color: 'var(--theme-comment)', backgroundColor: 'var(--theme-editor-bg)' }}
            >
              <div className="flex items-center justify-center w-full h-full">
                 <span className="opacity-30 text-[11px] font-mono group-hover:opacity-60 transition-opacity">
                    {idx + 1}
                 </span>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 flex flex-col min-w-0 relative">
              <div 
                className="whitespace-pre-wrap break-words pr-4"
                dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
              />
            </div>

            {/* Git Blame Hover */}
            <div className="absolute right-4 text-[10px] italic opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity select-none hidden md:block">
              Krishna Kumar Singh • 2 days ago • Initial setup
            </div>
          </div>
        ))}
      </div>
      
      {/* Mini-map */}
      <div className="w-24 border-l border-theme/20 opacity-20 hidden lg:block select-none overflow-hidden flex-shrink-0 sticky top-0 h-full">
        <div className="h-full w-full py-4 px-1 flex flex-col gap-1 pointer-events-none">
          {lines.slice(0, 150).map((_, i) => (
            <div 
              key={i} 
              className={`h-[1px] rounded-sm mb-[1px] ${i % 5 === 0 ? 'opacity-40' : 'opacity-10'}`}
              style={{ 
                width: `${Math.random() * 60 + 40}%`,
                backgroundColor: i % 5 === 0 ? 'var(--theme-primary)' : 'var(--theme-text)'
              }}
            />
          ))}
        </div>
        <div className="absolute top-4 right-0 w-full h-32 bg-primary/5 border-y border-theme/40 pointer-events-none shadow-sm"></div>
      </div>
    </div>
  );
};

export default CodeRenderer;
