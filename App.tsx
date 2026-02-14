
import React, { useState, useMemo, useEffect } from 'react';
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import CodeRenderer from './components/CodeRenderer';
import Terminal from './components/Terminal';
import { INITIAL_FILES, THEMES } from './constants';
import { FileNode, Theme, ActivityTab } from './types';
import { PORTFOLIO_CONFIG } from './portfolio.config';

const App: React.FC = () => {
  // Persistence Loading
  const [openFileIds, setOpenFileIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('openFileIds');
    return saved ? JSON.parse(saved) : ['readme', 'about'];
  });
  const [activeFileId, setActiveFileId] = useState<string | null>(() => {
    return localStorage.getItem('activeFileId') || 'readme';
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('themeId');
    return THEMES.find(t => t.id === saved) || THEMES[0];
  });

  const [activeActivityTab, setActiveActivityTab] = useState<ActivityTab>('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const activeFile = INITIAL_FILES.find(f => f.id === activeFileId);

  // Persistence Saving
  useEffect(() => {
    localStorage.setItem('openFileIds', JSON.stringify(openFileIds));
    if (activeFileId) localStorage.setItem('activeFileId', activeFileId);
    localStorage.setItem('themeId', currentTheme.id);
  }, [openFileIds, activeFileId, currentTheme]);

  const handleFileSelect = (id: string) => {
    if (!openFileIds.includes(id)) {
      setOpenFileIds(prev => [...prev, id]);
    }
    setActiveFileId(id);
    setIsPreviewMode(false); // Reset preview when switching files
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleCloseTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newOpenIds = openFileIds.filter(fid => fid !== id);
    setOpenFileIds(newOpenIds);
    if (activeFileId === id) {
      setActiveFileId(newOpenIds.length > 0 ? newOpenIds[newOpenIds.length - 1] : null);
    }
  };

  const handleActivityTabChange = (tab: ActivityTab) => {
    if (tab === 'terminal') {
      setIsTerminalOpen(!isTerminalOpen);
      return;
    }
    
    if (activeActivityTab === tab && isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setActiveActivityTab(tab);
      setIsSidebarOpen(true);
    }
  };

  const themeVariables = useMemo(() => {
    return {
      '--theme-bg': currentTheme.colors.background,
      '--theme-sidebar': currentTheme.colors.sidebar,
      '--theme-activity-bar': currentTheme.colors.activityBar,
      '--theme-primary': currentTheme.colors.primary,
      '--theme-editor-bg': currentTheme.colors.editorBg,
      '--theme-text': currentTheme.colors.text,
      '--theme-comment': currentTheme.colors.comment,
      '--theme-string': currentTheme.colors.string,
      '--theme-keyword': currentTheme.colors.keyword,
      '--theme-variable': currentTheme.colors.variable,
      '--theme-type': currentTheme.colors.type,
      '--theme-border': currentTheme.colors.border,
    } as React.CSSProperties;
  }, [currentTheme]);

  return (
    <div className="h-screen flex flex-col select-none transition-all duration-300 font-display overflow-hidden" 
         style={{ ...themeVariables, backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      <style>{`
        .bg-background-dark { background-color: var(--theme-bg) !important; }
        .bg-sidebar-dark { background-color: var(--theme-sidebar) !important; }
        .bg-activity-bar { background-color: var(--theme-activity-bar) !important; }
        .bg-primary { background-color: var(--theme-primary) !important; }
        .border-theme { border-color: var(--theme-border) !important; }
        .text-primary { color: var(--theme-primary) !important; }
        .border-primary { border-color: var(--theme-primary) !important; }
        .text-background-dark { color: var(--theme-bg) !important; }
      `}</style>
      
      <header className="h-9 bg-sidebar-dark border-b border-theme flex items-center px-4 justify-between text-xs opacity-60 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/20"></div>
          </div>
          <span className="hidden md:inline font-medium tracking-wide">
            {PORTFOLIO_CONFIG.name} — Visual Studio Code
          </span>
        </div>
        <div className="hidden lg:flex gap-4 opacity-80">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(m => (
            <span key={m} className="hover:opacity-100 cursor-pointer transition-opacity">{m}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
           <span className="material-icons-outlined text-sm cursor-pointer hover:opacity-100 transition-opacity">notifications</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar activeTab={activeActivityTab} setActiveTab={handleActivityTabChange} />
        
        {isSidebarOpen && (
          <Sidebar 
            files={INITIAL_FILES} 
            activeFileId={activeFileId} 
            onFileSelect={handleFileSelect} 
            activeActivityTab={activeActivityTab}
            currentTheme={currentTheme}
            onThemeSelect={setCurrentTheme}
          />
        )}

        <main className="flex-1 flex flex-col min-w-0 bg-editor-bg overflow-hidden relative">
          <div className="flex-1 flex flex-col min-h-0">
            <nav className="h-9 bg-sidebar-dark flex overflow-x-auto border-b border-theme no-scrollbar flex-shrink-0">
              {openFileIds.map(fid => {
                const file = INITIAL_FILES.find(f => f.id === fid);
                if (!file) return null;
                const isActive = activeFileId === fid;
                return (
                  <div
                    key={fid}
                    onClick={() => setActiveFileId(fid)}
                    className={`flex items-center px-4 gap-2 h-full text-xs md:text-sm cursor-pointer border-r border-theme transition-all whitespace-nowrap group ${
                      isActive ? 'bg-background-dark border-t-2 border-primary' : 'opacity-40 hover:opacity-100 hover:bg-black/5'
                    }`}
                    style={{ color: isActive ? 'var(--theme-text)' : undefined }}
                  >
                    <span className={`material-icons-outlined text-xs md:text-sm ${file.iconColor}`}>{file.icon}</span>
                    <span>{file.name}</span>
                    <span 
                      onClick={(e) => handleCloseTab(e, fid)}
                      className={`material-icons-outlined text-[10px] ml-2 p-0.5 rounded transition-all ${isActive ? 'opacity-40 hover:opacity-100 hover:bg-white/10' : 'opacity-0 group-hover:opacity-40 hover:bg-white/5'}`}
                    >
                      close
                    </span>
                  </div>
                );
              })}
            </nav>

            {activeFile && (
              <div className="h-7 bg-background-dark px-4 flex items-center justify-between border-theme border-b flex-shrink-0">
                <div className="flex items-center gap-1 text-[11px] opacity-40">
                  <span className="hover:underline cursor-pointer">PORTFOLIO</span>
                  <span className="material-icons-outlined text-[10px]">chevron_right</span>
                  <span className="hover:underline cursor-pointer">src</span>
                  <span className="material-icons-outlined text-[10px]">chevron_right</span>
                  <div className="flex items-center gap-1 opacity-100" style={{ color: 'var(--theme-text)' }}>
                    <span className={`material-icons-outlined text-[10px] ${activeFile.iconColor}`}>{activeFile.icon}</span>
                    {activeFile.name}
                  </div>
                </div>
                
                {activeFile.type === 'markdown' && (
                  <button 
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold transition-all border ${isPreviewMode ? 'bg-primary text-background-dark border-primary' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                  >
                    <span className="material-icons-outlined text-xs">{isPreviewMode ? 'code' : 'visibility'}</span>
                    {isPreviewMode ? 'View Code' : 'Preview'}
                  </button>
                )}
              </div>
            )}

            <div className="flex-1 overflow-hidden relative">
              {activeFile ? (
                <CodeRenderer file={activeFile} isPreview={isPreviewMode} />
              ) : (
                <div className="flex-1 h-full flex flex-col items-center justify-center opacity-10 pointer-events-none">
                    <span className="material-icons-outlined text-[120px]">code</span>
                    <p className="text-2xl font-display mt-4">Select a file to begin</p>
                </div>
              )}
            </div>
          </div>

          {isTerminalOpen && (
            <Terminal onClose={() => setIsTerminalOpen(false)} />
          )}
        </main>
      </div>

      <footer className="h-6 bg-primary text-background-dark flex items-center justify-between px-3 text-[11px] font-bold flex-shrink-0 z-20">
        <div className="flex items-center gap-3 h-full">
          <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors">
            <span className="material-icons-outlined text-sm">account_tree</span>
            <span>main*</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-sm">sync</span>
            <div className="flex items-center gap-0.5">
              <span className="material-icons-outlined text-sm">error_outline</span>
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 h-full">
          <div className="hidden sm:block uppercase">UTF-8</div>
          <div className="hidden sm:block uppercase">{activeFile?.type || 'txt'}</div>
          <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
            <span className="material-icons-outlined text-sm">terminal</span>
            <span>Terminal</span>
          </div>
          <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors">
            <span className="material-icons-outlined text-sm">wifi</span>
            <span>Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
