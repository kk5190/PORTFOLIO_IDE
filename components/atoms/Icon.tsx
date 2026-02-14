
import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'outlined' | 'filled';
}

const Icon: React.FC<IconProps> = ({ name, className = '', style, variant = 'outlined' }) => {
  const baseClass = variant === 'filled' ? 'material-symbols' : 'material-symbols-outlined';
  return (
    <span 
      className={`${baseClass} select-none ${className}`} 
      style={{ fontSize: 'inherit', ...style }}
    >
      {name}
    </span>
  );
};

export default Icon;
