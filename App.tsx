
import React, { useState, useEffect, useMemo } from 'react';
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import CodeRenderer from './components/CodeRenderer';
import { INITIAL_FILES, THEMES } from './constants';
import { FileNode, Theme } from './types';

const App: React.FC = () => {
  const [openFileIds, setOpenFileIds] = useState<string[]>(['about', 'experience']);
  const [activeFileId, setActiveFileId] = useState<string | null>('experience');
  const [activeActivityTab, setActiveActivityTab] = useState('explorer');
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);

  const activeFile = INITIAL_FILES.find(f => f.id === activeFileId) || INITIAL_FILES[0];

  const handleFileSelect = (id: string) => {
    if (!openFileIds.includes(id)) {
      setOpenFileIds(prev => [...prev, id]);
    }
    setActiveFileId(id);
    setActiveActivityTab('explorer');
  };

  const handleCloseTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newOpenIds = openFileIds.filter(fid => fid !== id);
    setOpenFileIds(newOpenIds);
    if (activeFileId === id) {
      setActiveFileId(newOpenIds.length > 0 ? newOpenIds[newOpenIds.length - 1] : null);
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
    } as React.CSSProperties;
  }, [currentTheme]);

  return (
    <div className="h-screen flex flex-col select-none transition-all duration-300" style={{ ...themeVariables, backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      <style>{`
        .bg-background-dark { background-color: var(--theme-bg) !important; }
        .bg-sidebar-dark { background-color: var(--theme-sidebar) !important; }
        .bg-activity-bar { background-color: var(--theme-activity-bar) !important; }
        .bg-primary { background-color: var(--theme-primary) !important; }
        .text-primary { color: var(--theme-primary) !important; }
        .border-primary { border-color: var(--theme-primary) !important; }
        /* Ensure status bar text contrast */
        .text-background-dark { color: var(--theme-bg) !important; }
        /* Generic border color based on theme brightness */
        .border-theme { border-color: rgba(0,0,0,0.1); }
        .dark .border-theme { border-color: rgba(255,255,255,0.05); }
      `}</style>
      
      {/* OS-like Header */}
      <header className="h-8 bg-sidebar-dark border-b border-black/5 dark:border-white/5 flex items-center px-4 justify-between text-xs opacity-60">
        <div className="flex items-center gap-2">
          <img 
            alt="Logo" 
            className="w-4 h-4 rounded-sm" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOxkNdTew5TLrCZfIyRsqT0LL_I5Cp4HvR2aOxoAbud07X0E_WFrZ0rrrH16OjC02bGymdhXN76HBBgrnaVSdNhdaluu78L-W2bszgDLGSmVVXZa9VpOHXAfxLcNOAejTx7TSMlvrMfF5h4fh5tmn-UpnEfEIr0r7sgJU4bFgwPRFQlmcqZc0TtV6IVq7ANcFg4z8YaBVdOkGIF2SQBMRiMJC330jLgWp3g1ZTBqRId07jgjIpr3E6s71pDZ-phwv-Bhsd9xGP"
          />
          <span className="hidden sm:inline">JohnDoe_Portfolio_v2 — Visual Studio Code</span>
          <span className="sm:hidden">Portfolio IDE</span>
        </div>
        <div className="hidden lg:flex gap-4">
          <span>File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <span>Go</span>
          <span>Run</span>
          <span>Terminal</span>
          <span>Help</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar activeTab={activeActivityTab} setActiveTab={setActiveActivityTab} />
        
        <Sidebar 
          files={INITIAL_FILES} 
          activeFileId={activeFileId} 
          onFileSelect={handleFileSelect} 
          activeActivityTab={activeActivityTab}
          currentTheme={currentTheme}
          onThemeSelect={setCurrentTheme}
        />

        {/* Editor Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <nav className="h-9 bg-sidebar-dark flex overflow-x-auto border-b border-black/10 dark:border-white/5 no-scrollbar flex-shrink-0">
            {openFileIds.map(fid => {
              const file = INITIAL_FILES.find(f => f.id === fid);
              if (!file) return null;
              const isActive = activeFileId === fid;
              return (
                <div
                  key={fid}
                  onClick={() => handleFileSelect(fid)}
                  className={`flex items-center px-4 gap-2 h-full text-sm cursor-pointer border-r border-black/10 dark:border-white/5 transition-all whitespace-nowrap ${
                    isActive ? 'bg-background-dark border-t-2 border-primary' : 'opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  style={{ color: isActive ? 'var(--theme-text)' : undefined }}
                >
                  {file.type === 'markdown' && <span className="material-icons-outlined text-xs text-orange-400">description</span>}
                  {file.type === 'json' && <span className="material-symbols-outlined text-xs text-yellow-400">code</span>}
                  {file.type === 'yaml' && <span className="material-icons-outlined text-xs text-primary">list_alt</span>}
                  {file.type === 'settings' && <span className="material-icons-outlined text-xs text-blue-400">terminal</span>}
                  <span>{file.name}</span>
                  <span 
                    onClick={(e) => handleCloseTab(e, fid)}
                    className="material-icons-outlined text-[10px] ml-2 opacity-30 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 p-0.5 rounded"
                  >
                    close
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Breadcrumbs */}
          {activeFile && (
            <div className="h-6 bg-background-dark px-4 flex items-center gap-1 text-[11px] opacity-40 border-b border-black/5 dark:border-white/5 flex-shrink-0">
              <span className="hover:underline cursor-pointer">PORTFOLIO_PROJECT</span>
              <span className="material-icons-outlined text-[10px]">chevron_right</span>
              <span className="hover:underline cursor-pointer">src</span>
              <span className="material-icons-outlined text-[10px]">chevron_right</span>
              <div className="flex items-center gap-1 opacity-100" style={{ color: 'var(--theme-text)' }}>
                <span className={`material-icons-outlined text-[10px] ${activeFile.iconColor}`}>{activeFile.icon}</span>
                {activeFile.name}
              </div>
            </div>
          )}

          {/* Editor Content */}
          {activeFile ? (
            <CodeRenderer file={activeFile} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-10 pointer-events-none">
                <span className="material-icons-outlined text-9xl">code</span>
                <p className="text-xl font-display mt-4">Select a file to view content</p>
            </div>
          )}
        </main>
      </div>

      {/* Status Bar */}
      <footer className="h-6 bg-primary text-background-dark flex items-center justify-between px-3 text-[11px] font-bold flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:bg-black/10 px-2 h-full cursor-pointer transition-colors">
            <span className="material-icons-outlined text-sm">account_tree</span>
            <span>main*</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-black/10 px-2 h-full cursor-pointer transition-colors">
            <span className="material-icons-outlined text-sm">sync</span>
            <span>0</span>
            <span className="material-icons-outlined text-sm">error_outline</span>
            <span>0</span>
            <span className="material-icons-outlined text-sm">warning_amber</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block hover:bg-black/10 px-2 h-full cursor-pointer transition-colors uppercase">Theme: {currentTheme.name}</div>
          <div className="hidden sm:block hover:bg-black/10 px-2 h-full cursor-pointer transition-colors uppercase">UTF-8</div>
          <div className="hover:bg-black/10 px-2 h-full cursor-pointer transition-colors uppercase">{activeFile?.type || 'plain'}</div>
          <div className="flex items-center gap-1 hover:bg-black/10 px-2 h-full cursor-pointer transition-colors">
            <span className="material-icons-outlined text-sm">notifications</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
