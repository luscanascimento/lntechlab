import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, Cpu } from 'lucide-react';
import { soundFX } from '../../lib/soundEffects';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const terminalSteps = [
    { text: 'lntechlab init --env=production', delay: 200 },
    { text: '>> Loading core WebGL 3D renderer & shaders...', delay: 500 },
    { text: '>> Validating security headers [CSP, HSTS, TLS 1.3]... OK', delay: 850 },
    { text: '>> Initializing autonomous AI agents & vector runtime... OK', delay: 1200 },
    { text: '>> LNTechLab v2.4.0 Engine ONLINE. Ready for deployment.', delay: 1550 },
  ];

  useEffect(() => {
    // Check if user has already seen preloader in this session
    const hasSeen = sessionStorage.getItem('lntech_preloader_seen');
    if (hasSeen === 'true') {
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    terminalSteps.forEach((step, idx) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
        setProgress(Math.round(((idx + 1) / terminalSteps.length) * 100));
        soundFX.playBeep(400 + idx * 150, 0.04, 'triangle');

        if (idx === terminalSteps.length - 1) {
          setTimeout(() => {
            sessionStorage.setItem('lntech_preloader_seen', 'true');
            onComplete();
          }, 450);
        }
      }, step.delay);
      timers.push(t);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [onComplete]);

  const handleSkip = () => {
    soundFX.playClick();
    sessionStorage.setItem('lntech_preloader_seen', 'true');
    onComplete();
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-label="Inicializando ecossistema LNTechLab"
      className="fixed inset-0 z-50 bg-[#0B0F19] flex flex-col items-center justify-center p-4 select-none font-mono"
    >
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#0F1524] border border-[#1F2C4C] shadow-[0_0_50px_rgba(0,82,255,0.3)] space-y-6">
        {/* Animated Neon LN Emblem */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="relative w-16 h-16 rounded-2xl bg-[#111726] border-2 border-[#00FFFF] flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.5)] animate-pulse">
            <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-[0_0_8px_#00FFFF]">
              <path d="M14 20L6 32L14 44" stroke="#00FFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M50 20L58 32L50 44" stroke="#FF00FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 22V42H32" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 42V22L46 42V22" stroke="#00FFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider">
              LN<span className="text-[#00FFFF]">Tech</span><span className="text-[#FF00FF]">Lab</span>
            </h1>
            <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">
              Boot Sequence // Production
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#00FFFF]" />
              <span>COMPILING ASSETS</span>
            </span>
            <span className="text-[#00FFFF] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#141C30] rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#0052FF] via-[#00FFFF] to-[#FF00FF] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Boot Logs */}
        <div className="p-3.5 rounded-lg bg-[#080C14] border border-[#1F2C4C] min-h-[120px] text-[11px] leading-relaxed text-slate-300 space-y-1 overflow-hidden">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-1.5 text-slate-300">
              <span className="text-[#00FFFF] select-none">&gt;</span>
              <span className={i === logs.length - 1 ? 'text-white font-semibold' : 'text-slate-400'}>
                {log}
              </span>
            </div>
          ))}
          {logs.length < terminalSteps.length && (
            <div className="flex items-center gap-1 text-[#00FFFF] animate-pulse">
              <span className="inline-block w-2 h-3.5 bg-[#00FFFF]" />
            </div>
          )}
        </div>

        {/* Skip button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#0052FF]" />
            TLS 1.3 Verified
          </span>
          <button
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-[#00FFFF] underline cursor-pointer"
          >
            Pular boot [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
