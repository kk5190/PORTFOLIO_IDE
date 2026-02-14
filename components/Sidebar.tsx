
import React, { useState } from 'react';
import { FileNode, Theme, ActivityTab } from '../types';
import { THEMES } from '../constants';

interface SidebarProps {
  files: FileNode[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
  activeActivityTab: ActivityTab;
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeActivityTab) {
      case 'settings':
        return (
          <>
            <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50">Settings</div>
            <div className="px-4 py-2 text-sm font-bold opacity-80">Color Theme</div>
            <div className="flex flex-col gap-1 mt-2">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => onThemeSelect(theme)}
                  className={`flex items-center px-4 py-2 gap-3 text-sm cursor-pointer transition-all ${
                    currentTheme.id === theme.id
                      ? 'bg-primary/20 border-l-2 border-primary'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 border-l-2 border-transparent opacity-60'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: theme.colors.primary }}></div>
                  <span>{theme.name}</span>
                </div>
              ))}
            </div>
          </>
        );

      case 'git':
        return (
          <>
            <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50">Source Control</div>
            <div className="px-4 py-2 text-sm">
              <div className="flex items-center justify-between opacity-80 mb-4">
                <span className="font-bold">Changes</span>
                <span className="bg-primary/20 px-2 py-0.5 rounded text-[10px]">3</span>
              </div>
              <div className="flex flex-col gap-2">
                {['Modified: portfolio.config.ts', 'Added: new-project.png', 'Deleted: old-bio.txt'].map(change => (
                  <div key={change} className="flex items-center gap-2 text-xs opacity-60">
                    <span className="material-icons-outlined text-xs">edit</span>
                    <span>{change}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'search':
        return (
          <>
            <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50">Search</div>
            <div className="px-4 mb-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files by name..." 
                  className="w-full bg-black/10 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded px-2 py-1 text-sm outline-none focus:border-primary pr-8"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1.5 opacity-40 hover:opacity-100"
                  >
                    <span className="material-icons-outlined text-xs">close</span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {searchQuery && (
                <div className="px-4 py-1 text-[10px] uppercase opacity-40 font-bold mb-1">
                  {filteredFiles.length} Results
                </div>
              )}
              <div className="flex flex-col">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => onFileSelect(file.id)}
                    className={`flex items-center px-4 py-2 gap-3 text-sm cursor-pointer transition-colors ${
                      activeFileId === file.id ? 'bg-primary/20 border-r-2 border-primary' : 'opacity-70 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg ${file.iconColor}`}>{file.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate font-medium">{file.name}</span>
                      <span className="text-[10px] opacity-40 truncate">{file.path.replace('PORTFOLIO > ', '')}</span>
                    </div>
                  </div>
                ))}
                {searchQuery && filteredFiles.length === 0 && (
                  <div className="px-4 py-8 text-center text-xs opacity-40">
                    No files found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </>
        );

      default:
        const srcFiles = files.filter(f => f.path.includes('src'));
        const rootFiles = files.filter(f => !f.path.includes('src'));
        return (
          <>
            <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center">
              <span>Explorer</span>
              <span className="material-icons-outlined text-sm">more_horiz</span>
            </div>
            
            <div className="flex items-center px-3 py-1 gap-1 text-[11px] font-bold opacity-80 cursor-default">
              <span className="material-icons-outlined text-xs">expand_more</span>
              <span>PORTFOLIO</span>
            </div>

            <div className="flex flex-col">
              {/* src folder */}
              <div className="flex items-center px-5 py-1 gap-1.5 text-xs opacity-80 cursor-default">
                <span className="material-icons-outlined text-[14px]">expand_more</span>
                <span className="material-symbols-outlined text-[16px] text-primary/80">folder_open</span>
                <span className="font-medium">src</span>
              </div>
              
              <div className="ml-[23px] border-l border-theme/20">
                {srcFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => onFileSelect(file.id)}
                    className={`flex items-center pl-6 pr-4 py-1 gap-2.5 text-[13px] cursor-pointer transition-colors relative group ${
                      activeFileId === file.id ? 'bg-primary/10 text-primary' : 'opacity-70 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {activeFileId === file.id && (
                      <div className="absolute left-0 w-0.5 h-full bg-primary"></div>
                    )}
                    <span className={`material-symbols-outlined text-[16px] ${file.iconColor}`}>{file.icon}</span>
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>

              {/* root files */}
              <div className="mt-0.5">
                {rootFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => onFileSelect(file.id)}
                    className={`flex items-center px-9 py-1 gap-2.5 text-[13px] cursor-pointer transition-colors relative group ${
                      activeFileId === file.id ? 'bg-primary/10 text-primary' : 'opacity-70 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {activeFileId === file.id && (
                      <div className="absolute left-0 w-0.5 h-full bg-primary"></div>
                    )}
                    <span className={`material-symbols-outlined text-[16px] ${file.iconColor}`}>{file.icon}</span>
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <aside className="w-64 bg-sidebar-dark flex flex-col border-r border-theme select-none font-display flex-shrink-0 hidden lg:flex">
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
        {renderContent()}
      </div>
    </aside>
  );
};

export default Sidebar;
