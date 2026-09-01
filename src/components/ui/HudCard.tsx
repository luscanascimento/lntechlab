import React from 'react';
import { cn } from '../../lib/utils';

export interface HudCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: 'cyan' | 'purple' | 'blue' | 'none';
  showCorners?: boolean;
  glowOnHover?: boolean;
}

export const HudCard: React.FC<HudCardProps> = ({
  children,
  className,
  accent = 'cyan',
  showCorners = true,
  glowOnHover = true,
  ...props
}) => {
  const accentGlow = {
    cyan: 'hover:border-[#00FFFF]/50 hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]',
    purple: 'hover:border-[#FF00FF]/50 hover:shadow-[0_0_25px_rgba(255,0,255,0.15)]',
    blue: 'hover:border-[#0052FF]/60 hover:shadow-[0_0_25px_rgba(0,82,255,0.25)]',
    none: '',
  };

  const cornerColor = {
    cyan: 'border-[#00FFFF]/60',
    purple: 'border-[#FF00FF]/60',
    blue: 'border-[#0052FF]/80',
    none: 'border-slate-600',
  };

  return (
    <div
      className={cn(
        'relative rounded-xl bg-[#111726]/80 backdrop-blur-md border border-[#1F2C4C] p-6 transition-all duration-300 group',
        glowOnHover && accentGlow[accent],
        className
      )}
      {...props}
    >
      {/* HUD Corner Tech Brackets */}
      {showCorners && (
        <>
          <span
            className={cn(
              'absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm transition-colors group-hover:w-4 group-hover:h-4',
              cornerColor[accent]
            )}
          />
          <span
            className={cn(
              'absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm transition-colors group-hover:w-4 group-hover:h-4',
              cornerColor[accent]
            )}
          />
          <span
            className={cn(
              'absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm transition-colors group-hover:w-4 group-hover:h-4',
              cornerColor[accent]
            )}
          />
          <span
            className={cn(
              'absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-sm transition-colors group-hover:w-4 group-hover:h-4',
              cornerColor[accent]
            )}
          />
        </>
      )}

      {children}
    </div>
  );
};
