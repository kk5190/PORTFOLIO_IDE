import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'outlined' | 'filled';
  // Optional click handler to support interactive icons
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Icon: React.FC<IconProps> = ({ name, className = '', style, variant = 'outlined', onClick }) => {
  const baseClass = variant === 'filled' ? 'material-symbols' : 'material-symbols-outlined';
  return (
    <span 
      className={`${baseClass} select-none ${className}`} 
      style={{ fontSize: 'inherit', ...style }}
      onClick={onClick}
    >
      {name}
    </span>
  );
};

export default Icon;