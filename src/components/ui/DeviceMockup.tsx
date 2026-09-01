import React, { useState } from 'react';
import { Laptop, Smartphone, Activity, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { soundFX } from '../../lib/soundEffects';

export interface DeviceMockupProps {
  title: string;
  category: string;
  codeSnippet: string;
  metrics: { label: string; value: string }[];
  className?: string;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  title,
  category,
  codeSnippet,
  metrics,
  className,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleToggle = (mode: 'desktop' | 'mobile') => {
    soundFX.playClick();
    setDeviceMode(mode);
  };

  return (
    <div className={cn('flex flex-col items-center w-full', className)}>
      {/* Device Mode Switcher */}
      <div className="flex items-center gap-2 mb-4 bg-[#111726] p-1.5 rounded-lg border border-[#1F2C4C]">
        <button
          onClick={() => handleToggle('desktop')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all',
            deviceMode === 'desktop'
              ? 'bg-[#0052FF] text-white shadow-[0_0_10px_rgba(0,82,255,0.4)]'
              : 'text-slate-400 hover:text-slate-200'
          )}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Desktop View</span>
        </button>
        <button
          onClick={() => handleToggle('mobile')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all',
            deviceMode === 'mobile'
              ? 'bg-[#FF00FF] text-white shadow-[0_0_10px_rgba(255,0,255,0.4)]'
              : 'text-slate-400 hover:text-slate-200'
          )}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile View</span>
        </button>
      </div>

      {/* Mockup Frame */}
      {deviceMode === 'desktop' ? (
        // Desktop Frame
        <div className="w-full max-w-2xl rounded-xl border border-[#1F2C4C] bg-[#0E1422] shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-300">
          {/* Laptop Screen Top */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#141C30] border-b border-[#1F2C4C]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-[#0B0F19] px-3 py-1 rounded border border-slate-700/50">
              <Shield className="w-3 h-3 text-[#00FFFF]" />
              <span className="truncate max-w-[200px]">{title.toLowerCase().replace(/\s+/g, '-')}.lntechlab.app</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#00FFFF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] animate-ping" />
              <span>LIVE</span>
            </div>
          </div>

          {/* Laptop Content Inner */}
          <div className="p-5 sm:p-6 bg-[#0B0F19] space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1F2C4C]">
              <div>
                <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-wider">{category}</span>
                <h4 className="text-base font-bold text-white">{title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0052FF]/20 border border-[#0052FF]/40 text-[#00FFFF] text-xs font-mono">
                  TLS 1.3
                </span>
                <span className="px-2.5 py-1 rounded bg-[#FF00FF]/20 border border-[#FF00FF]/40 text-[#FF00FF] text-xs font-mono">
                  PROD-READY
                </span>
              </div>
            </div>

            {/* Live Code / Architecture box */}
            <div className="p-4 rounded-lg bg-[#111726] border border-[#1F2C4C] font-mono text-xs text-slate-300 overflow-x-auto">
              <pre className="text-slate-300 leading-relaxed">{codeSnippet}</pre>
            </div>

            {/* Metrics HUD */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded bg-[#141C30]/80 border border-slate-700/40 text-center">
                  <span className="block text-xs sm:text-sm font-bold text-[#00FFFF] font-mono">{m.value}</span>
                  <span className="block text-[10px] sm:text-xs text-slate-400 font-sans truncate">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Mobile Frame
        <div className="w-[280px] sm:w-[320px] rounded-3xl border-4 border-[#1F2C4C] bg-[#0E1422] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
          {/* Dynamic Island / Speaker */}
          <div className="flex items-center justify-center py-2 bg-[#141C30] border-b border-[#1F2C4C]">
            <div className="w-16 h-3.5 bg-black rounded-full flex items-center justify-end px-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]" />
            </div>
          </div>

          {/* Mobile Screen Content */}
          <div className="p-4 bg-[#0B0F19] space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#FF00FF] uppercase">{category}</span>
              <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
            </div>

            <h4 className="text-sm font-bold text-white leading-snug">{title}</h4>

            {/* Mobile Code block */}
            <div className="p-3 rounded-lg bg-[#111726] border border-[#1F2C4C] font-mono text-[10px] text-slate-300 overflow-x-auto max-h-36">
              <pre>{codeSnippet}</pre>
            </div>

            {/* Mobile Metrics */}
            <div className="space-y-1.5 pt-1">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#141C30] text-xs">
                  <span className="text-[11px] text-slate-400">{m.label}</span>
                  <span className="font-bold text-[#00FFFF] font-mono text-xs">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
