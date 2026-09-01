import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { soundFX } from '../../lib/soundEffects';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'purple' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isMagnetic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isMagnetic = false,
  leftIcon,
  rightIcon,
  asAnchor = false,
  href,
  onClick,
  onMouseEnter,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isMagnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (!isMagnetic) return;
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    soundFX.playClick();
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    soundFX.playBeep(800, 0.05);
    if (onClick) onClick(e);
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium font-sans tracking-wide transition-all duration-300 rounded-lg cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:ring-offset-2 focus:ring-offset-[#0B0F19] disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-3 gap-2',
    lg: 'text-base px-7 py-4 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#0052FF] text-white hover:bg-[#0040CC] border border-[#0052FF] shadow-[0_0_20px_rgba(0,82,255,0.4)] hover:shadow-[0_0_28px_rgba(0,255,255,0.6)] hover:border-[#00FFFF]',
    secondary: 'bg-[#111726] text-white border border-[#1F2C4C] hover:border-[#00FFFF] hover:shadow-[0_0_18px_rgba(0,255,255,0.25)] hover:text-[#00FFFF]',
    purple: 'bg-[#111726] text-white border border-[#FF00FF]/50 hover:border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.25)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)] hover:text-[#FF00FF]',
    outline: 'bg-transparent text-slate-200 border border-slate-700 hover:border-[#00FFFF] hover:text-white hover:bg-[#111726]/60',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/50',
  };

  const style = isMagnetic
    ? { transform: `translate3d(${position.x}px, ${position.y}px, 0)` }
    : undefined;

  const content = (
    <>
      {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0 items-center transition-transform group-hover:translate-x-1">{rightIcon}</span>}
    </>
  );

  if (asAnchor && href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], 'group', className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], 'group', className)}
      {...props}
    >
      {content}
    </button>
  );
};
