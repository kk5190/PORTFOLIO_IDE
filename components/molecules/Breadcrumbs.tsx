
import React from 'react';
import Icon from '../atoms/Icon';
import { FileNode } from '../../types';

interface BreadcrumbsProps {
  file: FileNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ file }) => {
  const parts = file.path.split(' > ');
  
  return (
    <div className="flex items-center gap-1 text-[11px] opacity-40">
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Icon name="chevron_right" className="text-[10px]" />}
          <span className={i === parts.length - 1 ? "opacity-100 flex items-center gap-1" : "hover:underline cursor-pointer"}>
            {i === parts.length - 1 && <Icon name={file.icon} className={`text-[10px] ${file.iconColor}`} />}
            {part}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
