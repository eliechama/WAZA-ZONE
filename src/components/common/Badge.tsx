import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lime' | 'violet' | 'cyan' | 'carbon' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'lime', className = '' }) => {
  const variantStyles = {
    lime: 'bg-[#D8FF65]/10 text-[#D8FF65] border-[#D8FF65]/30',
    violet: 'bg-[#9D78FF]/10 text-[#9D78FF] border-[#9D78FF]/30',
    cyan: 'bg-[#68E7FF]/10 text-[#68E7FF] border-[#68E7FF]/30',
    carbon: 'bg-[#11131A] text-slate-300 border-slate-800',
    danger: 'bg-red-500/10 text-red-400 border-red-500/30'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
