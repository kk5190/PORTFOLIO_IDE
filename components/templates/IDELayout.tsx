
import React from 'react';

interface IDELayoutProps {
  header: React.ReactNode;
  activityBar: React.ReactNode;
  sidebar?: React.ReactNode;
  editor: React.ReactNode;
  terminal?: React.ReactNode;
  statusBar: React.ReactNode;
  // Resizing Props
  sidebarWidth: number;
  terminalHeight: number;
  isSidebarOpen: boolean;
  isTerminalOpen: boolean;
  resizing: 'sidebar' | 'terminal' | null;
  onResizeStart: (type: 'sidebar' | 'terminal') => void;
}

const IDELayout: React.FC<IDELayoutProps> = ({
  header,
  activityBar,
  sidebar,
  editor,
  terminal,
  statusBar,
  sidebarWidth,
  terminalHeight,
  isSidebarOpen,
  isTerminalOpen,
  resizing,
  onResizeStart
}) => {
  return (
    <div className="h-screen flex flex-col select-none transition-colors duration-300 font-display overflow-hidden" 
         style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      {header}
      
      <div className="flex flex-1 overflow-hidden relative">
        {activityBar}
        
        {/* Sidebar Container */}
        {sidebar && (
          <div className="flex h-full shrink-0">
            <div style={{ width: `${sidebarWidth}px` }} className="h-full overflow-hidden">
              {sidebar}
            </div>
            {/* Sidebar Resizer (Vertical) */}
            <div 
              onMouseDown={(e) => {
                e.preventDefault();
                onResizeStart('sidebar');
              }}
              className="relative w-1 cursor-col-resize z-50 group flex-shrink-0"
            >
              {/* Invisible Hit Area */}
              <div className="absolute inset-y-0 -left-1 -right-1 z-10" />
              {/* Visible Line */}
              <div className={`absolute inset-y-0 left-[2px] w-[2px] transition-colors ${
                resizing === 'sidebar' ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/40'
              }`} />
            </div>
          </div>
        )}

        {/* Main Content (Editor + Terminal) */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {editor}
          </div>

          {/* Terminal Resizer (Horizontal) */}
          {terminal && (
            <div className="flex flex-col flex-shrink-0">
              <div 
                onMouseDown={(e) => {
                  e.preventDefault();
                  onResizeStart('terminal');
                }}
                className="relative h-1 cursor-row-resize z-50 group"
              >
                {/* Invisible Hit Area */}
                <div className="absolute -top-1 -bottom-1 inset-x-0 z-10" />
                {/* Visible Line */}
                <div className={`absolute inset-x-0 top-[2px] h-[2px] transition-colors ${
                  resizing === 'terminal' ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/40'
                }`} />
              </div>
              <div style={{ height: `${terminalHeight}px` }} className="shrink-0 overflow-hidden">
                {terminal}
              </div>
            </div>
          )}
        </main>
      </div>

      {statusBar}
    </div>
  );
};

export default IDELayout;
