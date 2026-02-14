
import React from 'react';
import { FileNode } from '../types';

interface SidebarProps {
  files: FileNode[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ files, activeFileId, onFileSelect }) => {
  const srcFiles = files.filter(f => f.path.includes('src'));
  const rootFiles = files.filter(f => !f.path.includes('src'));

  return (
    <aside className="w-64 bg-sidebar-dark flex flex-col border-r border-white/5 select-none font-display flex-shrink-0 hidden md:flex">
      <div className="p-3 text-[11px] font-bold uppercase tracking-widest text-white/50 flex justify-between items-center">
        <span>Explorer</span>
        <span className="material-icons-outlined text-sm">more_horiz</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center px-4 py-1 gap-1 text-sm font-bold text-white/80">
          <span className="material-icons-outlined text-sm">expand_more</span>
          <span>PORTFOLIO_PROJECT</span>
        </div>

        <div className="pl-4">
          <div className="flex items-center px-4 py-1 gap-1 text-sm text-white/60">
            <span className="material-icons-outlined text-sm">expand_more</span>
            <span className="material-icons-outlined text-sm text-primary/70">folder</span>
            <span>src</span>
          </div>

          <div className="pl-6 border-l border-white/5">
            {srcFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => onFileSelect(file.id)}
                className={`flex items-center px-4 py-1 gap-2 text-sm cursor-pointer transition-colors ${
                  activeFileId === file.id
                    ? 'text-white bg-primary/20 border-r-2 border-primary'
                    : 'text-white/60 hover:bg-white/5'
                }`}
              >
                {file.type === 'markdown' && <span className="material-icons-outlined text-sm text-orange-400">description</span>}
                {file.type === 'json' && <span className="material-symbols-outlined text-sm text-yellow-400">code</span>}
                {file.type === 'yaml' && <span className="material-icons-outlined text-sm text-primary">list_alt</span>}
                {file.type === 'settings' && <span className="material-icons-outlined text-sm text-blue-400">terminal</span>}
                <span>{file.name}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center px-4 py-1 gap-1 text-sm text-white/40 mt-2">
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <span className="material-icons-outlined text-sm">folder</span>
            <span>config</span>
          </div>
          <div className="flex items-center px-4 py-1 gap-1 text-sm text-white/40">
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <span className="material-icons-outlined text-sm">folder</span>
            <span>dist</span>
          </div>
        </div>

        <div className="mt-4">
          {rootFiles.map((file) => (
             <div
                key={file.id}
                onClick={() => onFileSelect(file.id)}
                className={`flex items-center px-8 py-1 gap-2 text-sm cursor-pointer transition-colors ${
                  activeFileId === file.id
                    ? 'text-white bg-primary/20 border-r-2 border-primary'
                    : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <span className={`material-icons-outlined text-sm ${file.iconColor}`}>{file.icon}</span>
                <span>{file.name}</span>
              </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
