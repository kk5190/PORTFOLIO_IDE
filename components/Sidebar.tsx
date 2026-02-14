
import React from 'react';
import { FileNode, Theme } from '../types';
import { THEMES } from '../constants';

interface SidebarProps {
  files: FileNode[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
  activeActivityTab: string;
  currentTheme: Theme;
  onThemeSelect: (theme: Theme) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  files, 
  activeFileId, 
  onFileSelect, 
  activeActivityTab,
  currentTheme,
  onThemeSelect
}) => {
  if (activeActivityTab === 'settings') {
    return (
      <aside className="w-64 bg-sidebar-dark flex flex-col border-r border-black/10 select-none font-display flex-shrink-0 hidden md:flex">
        <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center">
          <span>Settings</span>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="px-4 py-2 text-sm font-bold opacity-80">Theme Selection</div>
          <div className="flex flex-col gap-1 mt-2">
            {THEMES.map((theme) => {
              const isActive = currentTheme.id === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => onThemeSelect(theme)}
                  className={`flex items-center px-4 py-2 gap-3 text-sm cursor-pointer transition-all ${
                    isActive
                      ? 'bg-primary/20 border-l-2 border-primary'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 border-l-2 border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{ color: isActive ? 'var(--theme-text)' : undefined }}
                >
                  <div 
                    className="w-4 h-4 rounded-full border border-black/10 shadow-sm" 
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <span className="font-medium">{theme.name}</span>
                </div>
              );
            })}
          </div>
          <div className="px-4 py-4 text-xs opacity-40 border-t border-black/5 mt-4">
            Changing the theme updates all UI elements and syntax highlighting variables.
          </div>
        </div>
      </aside>
    );
  }

  const srcFiles = files.filter(f => f.path.includes('src'));
  const rootFiles = files.filter(f => !f.path.includes('src'));

  return (
    <aside className="w-64 bg-sidebar-dark flex flex-col border-r border-black/10 select-none font-display flex-shrink-0 hidden md:flex">
      <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center">
        <span>Explorer</span>
        <span className="material-icons-outlined text-sm">more_horiz</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center px-4 py-1 gap-1 text-sm font-bold opacity-80">
          <span className="material-icons-outlined text-sm">expand_more</span>
          <span>PORTFOLIO_PROJECT</span>
        </div>

        <div className="pl-4">
          <div className="flex items-center px-4 py-1 gap-1 text-sm opacity-60">
            <span className="material-icons-outlined text-sm">expand_more</span>
            <span className="material-icons-outlined text-sm text-primary/70">folder</span>
            <span>src</span>
          </div>

          <div className="pl-6 border-l border-black/5 dark:border-white/5">
            {srcFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => onFileSelect(file.id)}
                className={`flex items-center px-4 py-1 gap-2 text-sm cursor-pointer transition-colors ${
                  activeFileId === file.id
                    ? 'bg-primary/20 border-r-2 border-primary'
                    : 'opacity-70 hover:bg-black/5 dark:hover:bg-white/5'
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

          <div className="flex items-center px-4 py-1 gap-1 text-sm opacity-40 mt-2">
            <span className="material-icons-outlined text-sm">chevron_right</span>
            <span className="material-icons-outlined text-sm">folder</span>
            <span>config</span>
          </div>
          <div className="flex items-center px-4 py-1 gap-1 text-sm opacity-40">
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
                    ? 'bg-primary/20 border-r-2 border-primary'
                    : 'opacity-70 hover:bg-black/5 dark:hover:bg-white/5'
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
