import React, { useState, useMemo } from 'react';
import { FileNode, Theme, ActivityTab } from '../types';
import { THEMES } from '../constants';
import GitGraph from './organisms/GitGraph';
import Copilot from './organisms/Copilot';
import Icon from './atoms/Icon';

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
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root', 'src']));

  // Calculate activeFile from activeFileId to pass to components like Copilot
  const activeFile = useMemo(() => files.find(f => f.id === activeFileId), [files, activeFileId]);

  const toggleFolder = (id: string) => {
    const next = new Set(expandedFolders);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedFolders(next);
  };

  // Search logic: Search in names AND content
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    
    return files.map(file => {
      const nameMatch = file.name.toLowerCase().includes(q);
      const contentLines = file.content.split('\n');
      const matches = contentLines
        .map((line, idx) => ({ line, idx: idx + 1 }))
        .filter(item => item.line.toLowerCase().includes(q));
      
      if (nameMatch || matches.length > 0) {
        return { file, matches };
      }
      return null;
    }).filter(Boolean) as { file: FileNode; matches: { line: string, idx: number }[] }[];
  }, [files, searchQuery]);

  const renderExplorer = () => {
    const srcFiles = files.filter(f => f.path.includes('src'));
    const rootFiles = files.filter(f => !f.path.includes('src'));

    return (
      <div className="flex flex-col select-none">
        <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center">
          <span>Explorer</span>
          <Icon name="more_horiz" className="text-sm cursor-pointer" />
        </div>
        
        {/* Project Root */}
        <div 
          className="flex items-center px-2 py-1 gap-1 text-[11px] font-bold opacity-80 cursor-pointer hover:bg-white/5"
          onClick={() => toggleFolder('root')}
        >
          <Icon name={expandedFolders.has('root') ? "expand_more" : "chevron_right"} className="text-xs" />
          <span>PORTFOLIO</span>
        </div>

        {expandedFolders.has('root') && (
          <div className="flex flex-col">
            {/* src folder */}
            <div 
              className="flex items-center px-4 py-1 gap-1 text-xs opacity-80 cursor-pointer hover:bg-white/5"
              onClick={() => toggleFolder('src')}
            >
              <Icon name={expandedFolders.has('src') ? "expand_more" : "chevron_right"} className="text-xs" />
              <Icon name={expandedFolders.has('src') ? "folder_open" : "folder"} className="text-[16px] text-primary/80 mr-1" />
              <span className="font-medium">src</span>
            </div>
            
            {expandedFolders.has('src') && (
              <div className="ml-4 border-l border-theme/10">
                {srcFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => onFileSelect(file.id)}
                    className={`flex items-center pl-6 pr-4 py-1 gap-2 text-[13px] cursor-pointer transition-colors relative group ${
                      activeFileId === file.id ? 'bg-primary/10 text-primary' : 'opacity-70 hover:bg-white/5'
                    }`}
                  >
                    {activeFileId === file.id && <div className="absolute left-0 w-0.5 h-full bg-primary"></div>}
                    <Icon name={file.icon} className={`text-[16px] ${file.iconColor}`} />
                    <span className="truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* root level files */}
            {rootFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => onFileSelect(file.id)}
                className={`flex items-center px-8 py-1 gap-2 text-[13px] cursor-pointer transition-colors relative group ${
                  activeFileId === file.id ? 'bg-primary/10 text-primary' : 'opacity-70 hover:bg-white/5'
                }`}
              >
                {activeFileId === file.id && <div className="absolute left-0 w-0.5 h-full bg-primary"></div>}
                <Icon name={file.icon} className={`text-[16px] ${file.iconColor}`} />
                <span className="truncate">{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSearch = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50">Search</div>
      <div className="px-4 mb-4">
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across files..." 
            className="w-full bg-black/20 dark:bg-white/5 border border-theme/20 rounded px-2 py-1.5 text-xs outline-none focus:border-primary/50"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2 top-2 opacity-40 hover:opacity-100">
              <Icon name="close" className="text-xs" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {searchResults.map(({ file, matches }) => (
          <div key={file.id} className="mb-2">
            <div 
              className="flex items-center gap-2 px-4 py-1 bg-white/5 cursor-pointer hover:bg-white/10"
              onClick={() => onFileSelect(file.id)}
            >
              <Icon name="chevron_right" className="text-xs opacity-40" />
              <Icon name={file.icon} className={`text-sm ${file.iconColor}`} />
              <span className="text-xs font-bold truncate">{file.name}</span>
              <span className="ml-auto text-[10px] opacity-30">{matches.length}</span>
            </div>
            <div className="ml-8 mt-1 flex flex-col gap-1">
              {matches.slice(0, 3).map((match, i) => (
                <div 
                  key={i} 
                  className="text-[11px] opacity-50 hover:opacity-100 cursor-pointer py-0.5 pr-4 truncate font-mono"
                  onClick={() => onFileSelect(file.id)}
                >
                  <span className="text-primary/50 mr-2">{match.idx}</span>
                  {match.line.trim()}
                </div>
              ))}
              {matches.length > 3 && (
                <div className="text-[10px] opacity-20 ml-6 pb-2">...and {matches.length - 3} more matches</div>
              )}
            </div>
          </div>
        ))}
        {searchQuery && searchResults.length === 0 && (
          <div className="p-8 text-center text-xs opacity-30 italic">No matches found.</div>
        )}
      </div>
    </div>
  );

  return (
    <aside className="w-64 bg-sidebar-dark flex flex-col border-r border-theme select-none font-display flex-shrink-0 hidden lg:flex">
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeActivityTab === 'explorer' && renderExplorer()}
        {activeActivityTab === 'search' && renderSearch()}
        {activeActivityTab === 'git' && <GitGraph />}
        {activeActivityTab === 'copilot' && <Copilot activeFile={activeFile} />}
        {activeActivityTab === 'settings' && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50">Settings</div>
            <div className="px-4 py-2 text-sm font-bold opacity-80">Color Theme</div>
            <div className="flex flex-col gap-1 mt-2 overflow-y-auto">
              {THEMES.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => onThemeSelect(theme)}
                  className={`flex items-center px-4 py-2 gap-3 text-sm cursor-pointer transition-all ${
                    currentTheme.id === theme.id ? 'bg-primary/20 border-l-2 border-primary' : 'hover:bg-white/5 opacity-60'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                  <span>{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;