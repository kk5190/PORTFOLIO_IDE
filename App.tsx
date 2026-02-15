
import React, { useState, useMemo, useEffect } from 'react';
import ActivityBar from './components/ActivityBar';
import Sidebar from './components/Sidebar';
import CodeRenderer from './components/CodeRenderer';
import Terminal from './components/Terminal';
import StatusBar from './components/organisms/StatusBar';
import TabItem from './components/molecules/TabItem';
import Breadcrumbs from './components/molecules/Breadcrumbs';
import IDELayout from './components/templates/IDELayout';
import Icon from './components/atoms/Icon';
import CommandPalette, { CommandAction } from './components/organisms/CommandPalette';
import { INITIAL_FILES, THEMES } from './constants';
import { FileNode, Theme, ActivityTab } from './types';
import { PORTFOLIO_CONFIG } from './portfolio.config';

const App: React.FC = () => {
  const [openFileIds, setOpenFileIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('openFileIds');
    return saved ? JSON.parse(saved) : ['readme', 'about', 'experience'];
  });
  const [activeFileId, setActiveFileId] = useState<string | null>(() => {
    return localStorage.getItem('activeFileId') || 'experience';
  });
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('themeId');
    return THEMES.find(t => t.id === saved) || THEMES[0]; 
  });

  const [activeActivityTab, setActiveActivityTab] = useState<ActivityTab>('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState('main');

  // Resizing State
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('sidebarWidth');
    return saved ? parseInt(saved, 10) : 260;
  });
  const [terminalHeight, setTerminalHeight] = useState(() => {
    const saved = localStorage.getItem('terminalHeight');
    return saved ? parseInt(saved, 10) : 240;
  });
  
  const [resizing, setResizing] = useState<'sidebar' | 'terminal' | null>(null);

  const activeFile = INITIAL_FILES.find(f => f.id === activeFileId);
  const branches = ['main', 'feature/atomic-design', 'hotfix/theme-flicker', 'release/v1.5.0'];

  // Global Resize Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing === 'sidebar') {
        const newWidth = e.clientX - 48; // Activity bar is 48px
        if (newWidth > 150 && newWidth < 600) {
          setSidebarWidth(newWidth);
        }
      } else if (resizing === 'terminal') {
        const newHeight = window.innerHeight - e.clientY - 24; // Status bar is 24px
        if (newHeight > 100 && newHeight < 600) {
          setTerminalHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setResizing(null);
      document.body.style.cursor = 'default';
    };

    if (resizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = resizing === 'sidebar' ? 'col-resize' : 'row-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  const actions = useMemo<CommandAction[]>(() => [
    {
      id: 'toggle-terminal',
      name: 'View: Toggle Terminal',
      icon: 'terminal',
      category: 'View',
      shortcut: 'Ctrl+J',
      execute: () => setIsTerminalOpen(prev => !prev)
    },
    {
      id: 'toggle-sidebar',
      name: 'View: Toggle Primary Sidebar',
      icon: 'side_navigation',
      category: 'View',
      shortcut: 'Ctrl+B',
      execute: () => setIsSidebarOpen(prev => !prev)
    },
    {
      id: 'toggle-preview',
      name: 'Editor: Toggle Markdown Preview',
      icon: 'visibility',
      category: 'Editor',
      execute: () => setIsPreviewMode(prev => !prev)
    },
    ...branches.map(b => ({
      id: `checkout-${b}`,
      name: `Git: Checkout to ${b}`,
      icon: 'account_tree',
      category: 'System' as const,
      execute: () => setCurrentBranch(b)
    }))
  ], [branches]);

  useEffect(() => {
    localStorage.setItem('openFileIds', JSON.stringify(openFileIds));
    if (activeFileId) localStorage.setItem('activeFileId', activeFileId);
    localStorage.setItem('themeId', currentTheme.id);
    localStorage.setItem('sidebarWidth', sidebarWidth.toString());
    localStorage.setItem('terminalHeight', terminalHeight.toString());
    
    if (currentTheme.isLight) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [openFileIds, activeFileId, currentTheme, sidebarWidth, terminalHeight]);

  const handleFileSelect = (id: string) => {
    if (!openFileIds.includes(id)) {
      setOpenFileIds(prev => [...prev, id]);
    }
    setActiveFileId(id);
    setIsPreviewMode(false);
  };

  const handleCloseTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newOpenIds = openFileIds.filter(fid => fid !== id);
    setOpenFileIds(newOpenIds);
    if (activeFileId === id) {
      setActiveFileId(newOpenIds.length > 0 ? newOpenIds[newOpenIds.length - 1] : null);
    }
  };

  const themeVariables = useMemo(() => ({
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
    '--scrollbar-thumb': currentTheme.isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
    '--scrollbar-thumb-hover': currentTheme.isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
  } as React.CSSProperties), [currentTheme]);

  const Header = (
    <header className="h-9 bg-sidebar-dark border-b border-theme flex items-center px-4 justify-between text-xs opacity-60 flex-shrink-0" style={{ backgroundColor: 'var(--theme-sidebar)' }}>
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
          <span key={m} className="hover:opacity-100 cursor-pointer">{m}</span>
        ))}
      </div>
      <Icon name="notifications" className="text-sm cursor-pointer opacity-60 hover:opacity-100" />
    </header>
  );

  const Editor = (
    <div className="flex-1 flex flex-col min-h-0" style={{ backgroundColor: 'var(--theme-editor-bg)' }}>
      <nav className="h-9 flex overflow-x-auto border-b border-theme no-scrollbar flex-shrink-0" style={{ backgroundColor: 'var(--theme-sidebar)' }}>
        {openFileIds.map(fid => {
          const file = INITIAL_FILES.find(f => f.id === fid);
          if (!file) return null;
          return (
            <TabItem 
              key={fid}
              file={file}
              isActive={activeFileId === fid}
              onClick={() => setActiveFileId(fid)}
              onClose={(e) => handleCloseTab(e, fid)}
            />
          );
        })}
      </nav>

      {activeFile && (
        <div className="h-7 px-4 flex items-center justify-between border-theme border-b flex-shrink-0" style={{ backgroundColor: 'var(--theme-editor-bg)' }}>
          <Breadcrumbs file={activeFile} onFileSelect={handleFileSelect} />
          {activeFile.type === 'markdown' && (
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${isPreviewMode ? 'bg-primary text-background-dark border-primary' : 'border-theme opacity-60 hover:opacity-100'}`}
              style={isPreviewMode ? { color: currentTheme.isLight ? '#fff' : 'var(--theme-bg)' } : {}}
            >
              <Icon name={isPreviewMode ? 'code' : 'visibility'} className="text-xs" />
              {isPreviewMode ? 'Code' : 'Preview'}
            </button>
          )}
        </div>
      )}

      <div className="flex-1 overflow-hidden relative">
        {activeFile ? (
          <CodeRenderer file={activeFile} isPreview={isPreviewMode} />
        ) : (
          <div className="flex-1 h-full flex flex-col items-center justify-center opacity-10">
              <Icon name="code" className="text-[120px]" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={themeVariables} className={`h-full overflow-hidden ${resizing ? 'select-none' : ''}`}>
      <IDELayout 
        header={Header}
        activityBar={<ActivityBar activeTab={activeActivityTab} setActiveTab={(tab) => {
          if (tab === 'terminal') {
            setIsTerminalOpen(prev => !prev);
            return;
          }
          if (activeActivityTab === tab && isSidebarOpen) setIsSidebarOpen(false);
          else { setActiveActivityTab(tab); setIsSidebarOpen(true); }
        }} />}
        sidebar={isSidebarOpen ? (
          <Sidebar 
            files={INITIAL_FILES} 
            activeFileId={activeFileId} 
            onFileSelect={handleFileSelect} 
            activeActivityTab={activeActivityTab}
            currentTheme={currentTheme}
            onThemeSelect={setCurrentTheme}
            currentBranch={currentBranch}
            onBranchChange={setCurrentBranch}
            width={sidebarWidth}
          />
        ) : undefined}
        editor={Editor}
        terminal={isTerminalOpen ? <Terminal onClose={() => setIsTerminalOpen(false)} height={terminalHeight} /> : undefined}
        statusBar={<StatusBar 
          activeFileType={activeFile?.type} 
          currentBranch={currentBranch}
          onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)} 
          isLight={currentTheme.isLight}
        />}
        // Resizing controls
        resizing={resizing}
        onResizeStart={setResizing}
        sidebarWidth={sidebarWidth}
        terminalHeight={terminalHeight}
        isSidebarOpen={isSidebarOpen}
        isTerminalOpen={isTerminalOpen}
      />

      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        files={INITIAL_FILES} 
        actions={actions}
        onFileSelect={handleFileSelect} 
      />

      {/* Capture overlay during resize to ensure mousemove isn't lost over other elements */}
      {resizing && <div className="fixed inset-0 z-[9999] bg-transparent" style={{ cursor: resizing === 'sidebar' ? 'col-resize' : 'row-resize' }} />}
    </div>
  );
};

export default App;
