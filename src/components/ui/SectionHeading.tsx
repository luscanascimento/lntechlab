import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  titleGradient?: 'cyan-purple' | 'blue-cyan' | 'none';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  align = 'center',
  className = 'mb-12 sm:mb-16',
  titleGradient = 'blue-cyan',
}) => {
  const gradients = {
    'cyan-purple': 'bg-gradient-to-r from-[#00FFFF] via-[#FFFFFF] to-[#FF00FF] bg-clip-text text-transparent',
    'blue-cyan': 'bg-gradient-to-r from-white via-slate-100 to-[#00FFFF] bg-clip-text text-transparent',
    none: 'text-white',
  };

  return (
    <div
      className={cn(
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl',
        className
      )}
    >
      {/* Tag prefix */}
      <div className={cn('inline-flex items-center gap-2 mb-2 font-mono text-xs tracking-wider uppercase', align === 'center' ? 'justify-center' : 'justify-start')}>
        <span className="text-[#00FFFF]">//</span>
        <span className="text-slate-400 font-semibold">{tag}</span>
        <span className="w-8 h-[1px] bg-gradient-to-r from-[#00FFFF] to-transparent inline-block" />
      </div>

      {/* Main H2 Heading */}
      <h2 className={cn('text-fluid-h2 font-extrabold tracking-tight mb-2.5', gradients[titleGradient])}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed m-0 p-0">
          {subtitle}
        </p>
      )}
    </div>
  );
};
