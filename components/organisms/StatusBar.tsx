
import React from 'react';
import Icon from '../atoms/Icon';

interface StatusBarProps {
  activeFileType?: string;
  currentBranch?: string;
  onTerminalToggle: () => void;
  isLight?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ activeFileType, currentBranch = 'main', onTerminalToggle, isLight }) => {
  return (
    <footer 
      className="h-6 flex items-center justify-between px-3 text-[11px] font-medium flex-shrink-0 z-20 transition-all duration-300"
      style={{ 
        backgroundColor: isLight ? 'var(--theme-sidebar)' : 'var(--theme-primary)', 
        color: isLight ? 'var(--theme-text)' : '#1e1f29',
        borderTop: isLight ? '1px solid var(--theme-border)' : 'none'
      }}
    >
      <div className="flex items-center gap-3 h-full">
        <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors font-bold">
          <Icon name="account_tree" className="text-sm" />
          <span>{currentBranch}*</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="sync" className="text-sm" />
          <div className="flex items-center gap-0.5">
            <Icon name="error_outline" className="text-sm" />
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 h-full">
        <div className="hidden sm:block uppercase opacity-70">UTF-8</div>
        <div className="hidden sm:block uppercase font-bold">{activeFileType || 'markdown'}</div>
        <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors" onClick={onTerminalToggle}>
          <Icon name="terminal" className="text-sm" />
          <span>Terminal</span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
