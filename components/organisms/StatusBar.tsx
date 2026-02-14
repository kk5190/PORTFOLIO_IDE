
import React from 'react';
import Icon from '../atoms/Icon';

interface StatusBarProps {
  activeFileType?: string;
  onTerminalToggle: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ activeFileType, onTerminalToggle }) => {
  return (
    <footer className="h-6 bg-primary text-background-dark flex items-center justify-between px-3 text-[11px] font-bold flex-shrink-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-3 h-full">
        <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors">
          <Icon name="account_tree" className="text-sm" />
          <span>main*</span>
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
        <div className="hidden sm:block uppercase">UTF-8</div>
        <div className="hidden sm:block uppercase">{activeFileType || 'txt'}</div>
        <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors" onClick={onTerminalToggle}>
          <Icon name="terminal" className="text-sm" />
          <span>Terminal</span>
        </div>
        <div className="flex items-center gap-1 px-2 hover:bg-black/10 cursor-pointer h-full transition-colors">
          <Icon name="wifi" className="text-sm" />
          <span>Online</span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
