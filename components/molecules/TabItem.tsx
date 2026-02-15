
import React from 'react';
import Icon from '../atoms/Icon';
import { FileNode } from '../../types';

interface TabItemProps {
  file: FileNode;
  isActive: boolean;
  onClick: () => void;
  onClose: (e: React.MouseEvent) => void;
}

const TabItem: React.FC<TabItemProps> = ({ file, isActive, onClick, onClose }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-4 gap-2 h-full text-xs md:text-sm cursor-pointer border-r border-theme transition-all whitespace-nowrap group ${
        isActive ? 'border-t-2 border-primary' : 'opacity-40 hover:opacity-100 hover:bg-black/5'
      }`}
      style={{ 
        color: isActive ? 'var(--theme-text)' : undefined,
        backgroundColor: isActive ? 'var(--theme-editor-bg)' : 'transparent'
      }}
    >
      <Icon name={file.icon} className={`text-xs md:text-sm ${file.iconColor}`} />
      <span>{file.name}</span>
      <span 
        onClick={onClose}
        className={`material-icons-outlined text-[10px] ml-2 p-0.5 rounded transition-all ${isActive ? 'opacity-40 hover:opacity-100 hover:bg-white/10' : 'opacity-0 group-hover:opacity-40 hover:bg-white/5'}`}
      >
        close
      </span>
    </div>
  );
};

export default TabItem;
