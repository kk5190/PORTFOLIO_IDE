
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
  currentBranch: string;
  onBranchChange: (branch: string) => void;
  width: number;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  files, 
  activeFileId, 
  onFileSelect, 
  activeActivityTab,
  currentTheme,
  onThemeSelect,
  currentBranch,
  onBranchChange,
  width
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root', 'src']));

  const activeFile = useMemo(() => files.find(f => f.id === activeFileId), [files, activeFileId]);

  const toggleFolder = (id: string) => {
    const next = new Set(expandedFolders);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedFolders(next);
  };

  const getStatusInfo = (status?: string) => {
    switch (status) {
      case 'modified': return { color: 'text-yellow-500', char: 'M', label: 'Modified' };
      case 'added': return { color: 'text-green-500', char: 'U', label: 'Untracked' };
      case 'deleted': return { color: 'text-red-500', char: 'D', label: 'Deleted' };
      default: return null;
    }
  };

  const renderExplorer = () => {
    const srcFiles = files.filter(f => f.path.includes('src'));
    const rootFiles = files.filter(f => !f.path.includes('src'));

    const renderFileItem = (file: FileNode, paddingClass: string) => {
      const status = getStatusInfo(file.gitStatus);
      return (
        <div
          key={file.id}
          onClick={() => onFileSelect(file.id)}
          className={`flex items-center ${paddingClass} py-1 gap-2 text-[13px] cursor-pointer transition-colors relative group ${
            activeFileId === file.id ? 'bg-primary/10 text-primary' : 'opacity-70 hover:bg-white/5'
          }`}
        >
          {activeFileId === file.id && <div className="absolute left-0 w-0.5 h-full bg-primary"></div>}
          <Icon name={file.icon} className={`text-[16px] flex-shrink-0 ${file.iconColor}`} />
          <span className={`truncate flex-1 ${status ? status.color : ''}`}>{file.name}</span>
          
          {/* Git Status Marker */}
          {status && (
            <div className="flex items-center gap-1.5 pr-2 opacity-60">
              <span className={`text-[10px] font-bold ${status.color}`}>{status.char}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${status.color.replace('text', 'bg')}`}></div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col select-none overflow-hidden h-full">
        <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 flex justify-between items-center shrink-0">
          <span>Explorer</span>
          <Icon name="more_horiz" className="text-sm cursor-pointer" />
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div 
            className="flex items-center px-2 py-1 gap-1 text-[11px] font-bold opacity-80 cursor-pointer hover:bg-white/5"
            onClick={() => toggleFolder('root')}
          >
            <Icon name={expandedFolders.has('root') ? "expand_more" : "chevron_right"} className="text-xs" />
            <span className="truncate">PORTFOLIO</span>
          </div>

          {expandedFolders.has('root') && (
            <div className="flex flex-col">
              <div 
                className="flex items-center px-4 py-1 gap-1 text-xs opacity-80 cursor-pointer hover:bg-white/5"
                onClick={() => toggleFolder('src')}
              >
                <Icon name={expandedFolders.has('src') ? "expand_more" : "chevron_right"} className="text-xs" />
                <Icon name={expandedFolders.has('src') ? "folder_open" : "folder"} className="text-[16px] text-primary/80 mr-1" />
                <span className="font-medium truncate">src</span>
              </div>
              
              {expandedFolders.has('src') && (
                <div className="ml-4 border-l border-theme/10">
                  {srcFiles.map(file => renderFileItem(file, 'pl-6 pr-4'))}
                </div>
              )}

              {rootFiles.map(file => renderFileItem(file, 'px-8'))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSearch = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-3 text-[11px] font-bold uppercase tracking-widest opacity-50 shrink-0">Search</div>
      <div className="px-4 mb-4 shrink-0">
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across files..." 
            className="w-full bg-black/20 dark:bg-white/5 border border-theme/20 rounded px-2 py-1.5 text-xs outline-none focus:border-primary/50"
            autoFocus
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar px-1">
        {/* Results logic remains same */}
      </div>
    </div>
  );

  return (
    <aside className="h-full bg-sidebar-dark flex flex-col border-r border-theme select-none font-display shrink-0 overflow-hidden w-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeActivityTab === 'explorer' && renderExplorer()}
        {activeActivityTab === 'search' && renderSearch()}
        {activeActivityTab === 'git' && (
          <GitGraph 
            currentBranch={currentBranch} 
            onBranchChange={onBranchChange} 
          />
        )}
        {activeActivityTab === 'copilot' && <Copilot activeFile={activeFile} />}
        {activeActivityTab === 'settings' && (
          <div className="flex flex-col h-full overflow-hidden">
             {/* Settings logic */}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
