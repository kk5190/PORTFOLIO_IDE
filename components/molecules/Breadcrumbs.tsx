
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../atoms/Icon';
import { FileNode } from '../../types';
import { INITIAL_FILES } from '../../constants';

interface BreadcrumbsProps {
  file: FileNode;
  onFileSelect: (id: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ file, onFileSelect }) => {
  const parts = file.path.split(' > ');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSiblingsForPart = (partIndex: number) => {
    // If it's the root part (PORTFOLIO)
    if (partIndex === 0) return [];

    // Get the directory path up to this part
    const currentPathArray = parts.slice(0, partIndex);
    const targetPath = currentPathArray.join(' > ');

    // Find all files that share the same parent path
    return INITIAL_FILES.filter(f => {
      const fParts = f.path.split(' > ');
      const fParentPath = fParts.slice(0, partIndex).join(' > ');
      // We want files that are in the same folder as the current part
      return fParentPath === targetPath && f.id !== file.id;
    });
  };

  return (
    <div className="flex items-center gap-1 text-[11px] opacity-60 font-display relative" ref={dropdownRef}>
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        const siblings = getSiblingsForPart(i);
        const hasSiblings = siblings.length > 0;

        return (
          <React.Fragment key={i}>
            {i > 0 && <Icon name="chevron_right" className="text-[12px] opacity-40 mt-0.5" />}
            
            <div className="relative group/crumb">
              <div 
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                  activeDropdown === i ? 'bg-white/10 opacity-100' : 'hover:bg-white/5 hover:opacity-100'
                } ${isLast ? 'opacity-100' : ''}`}
                onClick={(e) => {
                  if (hasSiblings) {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === i ? null : i);
                  }
                }}
              >
                {isLast && <Icon name={file.icon} className={`text-[12px] ${file.iconColor}`} />}
                <span className={isLast ? 'font-medium' : ''}>{part}</span>
              </div>

              {activeDropdown === i && hasSiblings && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-sidebar-dark border border-theme shadow-2xl rounded-sm py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {siblings.map(sibling => (
                    <div
                      key={sibling.id}
                      onClick={() => {
                        onFileSelect(sibling.id);
                        setActiveDropdown(null);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-primary/20 cursor-pointer text-[11px] transition-colors"
                    >
                      <Icon name={sibling.icon} className={`text-[13px] ${sibling.iconColor}`} />
                      <span className="truncate">{sibling.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
