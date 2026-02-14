
import React from 'react';
import { FileNode } from '../types';

interface CodeRendererProps {
  file: FileNode;
  isPreview?: boolean;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ file, isPreview }) => {
  const lines = file.content.split('\n');

  const highlightLine = (line: string) => {
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
        .replace(/^(\s*)(#+ .*)/g, '$1<span style="color: var(--theme-keyword); font-weight: bold">$2</span>')
        .replace(/^(\s*)(\* .*)/g, '$1<span style="color: var(--theme-variable)">$2</span>')
        .replace(/^(\s*)(- .*)/g, '$1<span style="color: var(--theme-type)">$2</span>')
        .replace(/^(\s*)([0-9]+\. .*)/g, '$1<span style="color: var(--theme-type)">$2</span>')
        .replace(/^(\s*)(### .*)/g, '$1<span style="color: var(--theme-type); font-weight: 600">$2</span>')
        .replace(/^(\s*)(---)/g, '$1<span style="color: var(--theme-comment)">$2</span>')
        .replace(/^(\s*)(# .*)/g, '$1<span style="color: var(--theme-keyword); font-size: 1.1em">$2</span>')
        .replace(/^(\/\/.*)/g, '<span style="color: var(--theme-comment)">$1</span>');
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
    <div className="flex-1 overflow-hidden flex relative" style={{ backgroundColor: 'var(--theme-editor-bg)', color: 'var(--theme-text)' }}>
      <div className="flex-1 overflow-y-auto code-container py-4 font-mono no-scrollbar text-[13px] md:text-sm leading-6">
        {lines.map((line, idx) => (
          <div key={idx} className="flex w-full code-line group">
            <div className="w-14 md:w-16 text-right pr-6 select-none opacity-30 shrink-0" style={{ color: 'var(--theme-comment)' }}>
              {idx + 1}
            </div>
            <div 
              className="flex-1 whitespace-pre pr-4"
              dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }}
            />
          </div>
        ))}
      </div>
      
      <div className="w-24 border-l border-theme opacity-20 hidden lg:block select-none overflow-hidden flex-shrink-0">
        <div className="h-full w-full py-4 px-1 flex flex-col gap-1 pointer-events-none">
          {lines.slice(0, 40).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-sm ${i % 5 === 0 ? 'opacity-40 w-3/4' : 'opacity-10 w-full'}`}
              style={{ 
                width: `${Math.random() * 50 + 50}%`,
                backgroundColor: i % 5 === 0 ? 'var(--theme-primary)' : 'var(--theme-text)'
              }}
            />
          ))}
        </div>
        <div className="absolute top-4 right-0 w-24 h-48 bg-black/5 dark:bg-white/5 border-y border-theme"></div>
      </div>
    </div>
  );
};

export default CodeRenderer;
