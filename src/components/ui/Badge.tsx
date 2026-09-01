import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'purple' | 'blue' | 'slate';
  showPulse?: boolean;
  pulseColor?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'cyan',
  showPulse = true,
  ...props
}) => {
  const variantStyles = {
    cyan: 'bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/30 shadow-[0_0_10px_rgba(0,255,255,0.15)]',
    purple: 'bg-[#FF00FF]/10 text-[#FF00FF] border-[#FF00FF]/30 shadow-[0_0_10px_rgba(255,0,255,0.15)]',
    blue: 'bg-[#0052FF]/15 text-[#3B82F6] border-[#0052FF]/40 shadow-[0_0_10px_rgba(0,82,255,0.2)]',
    slate: 'bg-slate-800/60 text-slate-300 border-slate-700',
  };

  const dotColors = {
    cyan: 'bg-[#00FFFF]',
    purple: 'bg-[#FF00FF]',
    blue: 'bg-[#0052FF]',
    slate: 'bg-slate-400',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border backdrop-blur-md select-none',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {showPulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              dotColors[variant]
            )}
          />
          <span
            className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])}
          />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};
