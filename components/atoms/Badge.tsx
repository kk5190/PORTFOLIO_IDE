
import React from 'react';

interface BadgeProps {
  count: number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ count, className = '' }) => {
  if (count <= 0) return null;
  return (
    <span className={`absolute -top-1 -right-1 bg-primary text-background-dark text-[9px] font-bold px-1 min-w-[14px] h-[14px] flex items-center justify-center rounded-full border border-black/10 ${className}`}>
      {count}
    </span>
  );
};

export default Badge;
