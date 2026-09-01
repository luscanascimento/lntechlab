import React, { useState } from 'react';
import { Layers, Box, Server, Bot, Cloud, CheckCircle2, Code2, Terminal as TerminalIcon } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TerminalWindow } from '../ui/TerminalWindow';
import { ArchitectureGraphBackground } from '../ui/ArchitectureGraphBackground';
import { TECH_STACK, TERMINAL_SNIPPETS } from '../../config/stackData';
import { soundFX } from '../../lib/soundEffects';
import { analytics } from '../../lib/analytics';
import { cn } from '../../lib/utils';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todas as Tecnologias', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'frontend', label: 'Frontend & UI', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'webgl_3d', label: 'WebGL & 3D', icon: <Box className="w-3.5 h-3.5" /> },
    { id: 'backend', label: 'Backend & APIs', icon: <Server className="w-3.5 h-3.5" /> },
    { id: 'ai', label: 'IA & Automação', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'cloud_devops', label: 'Cloud & DevOps', icon: <Cloud className="w-3.5 h-3.5" /> },
  ];

  const filteredStack =
    selectedCategory === 'all'
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === selectedCategory);

  const handleCategoryChange = (id: string) => {
    soundFX.playClick();
    setSelectedCategory(id);
    analytics.tabChange(`stack_filter_${id}`);
  };

  const terminalTabs = [
    {
      id: 'ts',
      label: TERMINAL_SNIPPETS.typescript.title,
      language: TERMINAL_SNIPPETS.typescript.lang,
      code: TERMINAL_SNIPPETS.typescript.code,
    },
    {
      id: 'ai',
      label: TERMINAL_SNIPPETS.ai_agent.title,
      language: TERMINAL_SNIPPETS.ai_agent.lang,
      code: TERMINAL_SNIPPETS.ai_agent.code,
    },
    {
      id: 'cicd',
      label: TERMINAL_SNIPPETS.ci_cd.title,
      language: TERMINAL_SNIPPETS.ci_cd.lang,
      code: TERMINAL_SNIPPETS.ci_cd.code,
    },
    {
      id: 'telemetry',
      label: TERMINAL_SNIPPETS.telemetry.title,
      language: TERMINAL_SNIPPETS.telemetry.lang,
      code: TERMINAL_SNIPPETS.telemetry.code,
    },
  ];

  return (
    <section id="stack" className="py-24 sm:py-32 relative bg-[#090D17] border-y border-[#1F2C4C]" aria-label="Tecnologias e Arquitetura">
      {/* Interactive Tech Architecture Constellation Graph */}
      <ArchitectureGraphBackground />

      {/* Background Dot Matrix */}
      <div className="absolute inset-0 bg-tech-dots opacity-15 pointer-events-none" />

      <Container className="relative z-10">
        {/* Glassmorphic Contrast Shield for Section Heading */}
        <div className="relative max-w-3xl mx-auto mb-8 sm:mb-10 px-6 py-5 sm:px-8 sm:py-6 rounded-3xl bg-[#090D17]/90 backdrop-blur-xl border border-[#1F2C4C]/80 shadow-[0_15px_45px_rgba(0,0,0,0.8)] text-center">
          <SectionHeading
            tag="02. STACK & ENGENHARIA MODERNA"
            title="Ferramentas e Arquiteturas de Ponta"
            subtitle="Não reinventamos a roda: selecionamos o estado da arte em tecnologia para entregar sistemas performáticos, seguros e sustentáveis a longo prazo."
            titleGradient="cyan-purple"
            className="m-0 p-0"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer select-none',
                selectedCategory === cat.id
                  ? 'bg-[#0052FF] text-white shadow-[0_0_15px_rgba(0,82,255,0.5)] border border-[#00FFFF]'
                  : 'bg-[#111726] text-slate-400 border border-[#1F2C4C] hover:border-slate-600 hover:text-slate-200'
              )}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* 2-Column Grid: Left is Tech Cards, Right is Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tech Cards Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredStack.map((tech, idx) => {
              const borderAccent =
                tech.accentColor === 'cyan'
                  ? 'hover:border-[#00FFFF]/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.12)]'
                  : tech.accentColor === 'purple'
                  ? 'hover:border-[#FF00FF]/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.12)]'
                  : 'hover:border-[#0052FF]/60 hover:shadow-[0_0_20px_rgba(0,82,255,0.18)]';

              return (
                <div
                  key={idx}
                  className={cn(
                    'p-4 rounded-xl bg-[#111726]/80 border border-[#1F2C4C] backdrop-blur-md transition-all duration-300 space-y-2 group',
                    borderAccent
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white font-mono group-hover:text-[#00FFFF] transition-colors">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0F19] text-slate-400 border border-slate-700/50">
                      {tech.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Terminal Window (5 Cols) - Aligned to full height of cards */}
          <div className="lg:col-span-5 flex flex-col h-full space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1.5 text-[#00FFFF]">
                <TerminalIcon className="w-3.5 h-3.5" />
                // LIVE_CODE_PREVIEW
              </span>
              <span>Clique nas abas para navegar</span>
            </div>

            <TerminalWindow
              title="lntechlab-kernel // architecture"
              tabs={terminalTabs}
              defaultActiveTab="ts"
              statusText="Clean Architecture & Type Safety"
              className="flex-1 flex flex-col h-full min-h-[460px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
