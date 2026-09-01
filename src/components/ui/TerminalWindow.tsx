import React, { useState } from 'react';
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';
import { soundFX } from '../../lib/soundEffects';

export interface TabItem {
  id: string;
  label: string;
  language: string;
  code: string;
}

export interface TerminalWindowProps {
  title?: string;
  tabs?: TabItem[];
  defaultActiveTab?: string;
  showLineNumbers?: boolean;
  className?: string;
  statusText?: string;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'lntechlab-core // prod-main',
  tabs,
  defaultActiveTab,
  showLineNumbers = true,
  className,
  statusText = 'LNTechLab Engine v2.4.0 • Ready',
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultActiveTab || (tabs && tabs.length > 0 ? tabs[0].id : '')
  );
  const [copied, setCopied] = useState(false);

  const activeTab = tabs?.find((t) => t.id === activeTabId) || tabs?.[0];
  const currentCode = activeTab?.code || '';

  const handleCopy = async () => {
    soundFX.playBeep(900, 0.05);
    const success = await copyToClipboard(currentCode);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTabClick = (id: string) => {
    soundFX.playClick();
    setActiveTabId(id);
  };

  const lines = currentCode.split('\n');

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden border border-[#1F2C4C] bg-[#0B0F19]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col font-mono text-xs sm:text-sm',
        className
      )}
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111726] border-b border-[#1F2C4C] select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs">
            <TerminalIcon className="w-3.5 h-3.5 text-[#00FFFF]" />
            <span className="font-mono text-slate-300 truncate max-w-[200px] sm:max-w-none">{title}</span>
          </div>
        </div>

        {/* Action buttons (Copy) */}
        <button
          onClick={handleCopy}
          aria-label="Copiar código do terminal"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A233A] hover:bg-[#233152] text-slate-300 hover:text-[#00FFFF] transition-colors border border-slate-700/50"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#00FFFF]" />
              <span className="text-[11px] text-[#00FFFF]">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs Navigation (if provided) */}
      {tabs && tabs.length > 1 && (
        <div className="flex items-center gap-1 px-2 pt-2 bg-[#0E1422] border-b border-[#1F2C4C] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-t-md text-xs font-mono transition-all border-t border-x cursor-pointer flex items-center gap-2 whitespace-nowrap',
                activeTabId === tab.id
                  ? 'bg-[#0B0F19] text-[#00FFFF] border-[#1F2C4C] border-b-transparent shadow-[0_-2px_10px_rgba(0,255,255,0.08)]'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-[#141C30]'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full', activeTabId === tab.id ? 'bg-[#00FFFF]' : 'bg-slate-600')} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Terminal Code Body */}
      <div className="p-4 sm:p-5 overflow-x-auto overflow-y-auto flex-1 leading-relaxed text-slate-300 bg-[#0B0F19]">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 text-slate-600 text-right border-r border-[#1F2C4C]/60 flex flex-col shrink-0">
              {lines.map((_, i) => (
                <span key={i} className="leading-6 text-[11px] sm:text-xs">
                  {i + 1}
                </span>
              ))}
            </div>
          )}
          <div className={cn('flex-1 font-mono text-xs sm:text-sm', showLineNumbers ? 'pl-4' : '')}>
            {lines.map((line, idx) => {
              // Highlight comments
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('#');
              const isKey = line.includes(':') && !isComment;
              const isKeyword = /\b(export|class|async|await|const|let|import|from|return|public|private|readonly|new|function|def|name|runs-on|steps)\b/.test(line);

              return (
                <div key={idx} className="leading-6 whitespace-pre hover:bg-[#141C30]/40 px-1 rounded transition-colors">
                  {isComment ? (
                    <span className="text-[#64748B] italic">{line}</span>
                  ) : (
                    <span>
                      {line.split(/(\b(?:export|class|async|await|const|let|import|from|return|public|private|readonly|new|function|def|true|false)\b|"[^"]*"|'[^']*')/g).map((part, pIdx) => {
                        if (/\b(export|class|async|await|const|let|import|from|return|public|private|readonly|new|function|def)\b/.test(part)) {
                          return <span key={pIdx} className="text-[#FF00FF] font-semibold">{part}</span>;
                        }
                        if (part.startsWith('"') || part.startsWith("'")) {
                          return <span key={pIdx} className="text-[#00FFFF]">{part}</span>;
                        }
                        if (/\b(true|false|null|undefined)\b/.test(part)) {
                          return <span key={pIdx} className="text-[#F59E0B]">{part}</span>;
                        }
                        return <span key={pIdx}>{part}</span>;
                      })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </pre>
      </div>

      {/* Terminal Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0E1422] border-t border-[#1F2C4C] text-[11px] text-slate-500 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
          <span className="font-mono">{statusText}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>UTF-8</span>
          <span className="text-[#0052FF] font-semibold">LN-TS-ENGINE</span>
        </div>
      </div>
    </div>
  );
};
