import React, { useState } from 'react';
import { Cpu, Zap, Bot, Terminal, CheckCircle2, ArrowRight, Code2, Layers, ShieldCheck, ChevronRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { HudCard } from '../ui/HudCard';
import { Button } from '../ui/Button';
import { CodeStreamsBackground } from '../ui/CodeStreamsBackground';
import { SOLUTIONS_DATA } from '../../config/solutionsData';
import { SolutionItem } from '../../types';
import { TerminalWindow } from '../ui/TerminalWindow';
import { soundFX } from '../../lib/soundEffects';
import { analytics } from '../../lib/analytics';
import { cn } from '../../lib/utils';

export const SolutionsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem>(SOLUTIONS_DATA[0]);
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#00FFFF]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#FF00FF]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#0052FF]" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-[#00FFFF]" />;
      default:
        return <Code2 className="w-6 h-6 text-[#00FFFF]" />;
    }
  };

  const handleSelectSolution = (sol: SolutionItem) => {
    soundFX.playClick();
    setSelectedSolution(sol);
    analytics.tabChange(`solution_${sol.id}`);
  };

  const toggleCodeDrawer = (sol: SolutionItem) => {
    soundFX.playBeep(700, 0.05);
    setSelectedSolution(sol);
    setShowCodeDrawer(true);
  };

  return (
    <section id="solucoes" className="py-24 sm:py-32 relative bg-[#0B0F19] overflow-hidden border-b border-[#1F2C4C]" aria-label="Soluções e Serviços">
      {/* Dynamic Colorful Code Typing & Streaming Background */}
      <CodeStreamsBackground />

      {/* Background Circuit Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <Container className="relative z-10">
        {/* Glassmorphic Contrast Shield for Section Heading */}
        <div className="relative max-w-3xl mx-auto mb-10 sm:mb-12 px-6 py-5 sm:px-8 sm:py-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-[#1F2C4C]/80 shadow-[0_15px_45px_rgba(0,0,0,0.8)] text-center">
          <SectionHeading
            tag="01. SOLUÇÕES EM ENGENHARIA"
            title="O Que Desenvolvemos na LNTechLab"
            subtitle="Projetamos sistemas robustos, interfaces de conversão extrema e inteligência artificial aplicadas diretamente às necessidades do seu negócio."
            titleGradient="blue-cyan"
            className="m-0 p-0"
          />
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SOLUTIONS_DATA.map((item, idx) => {
            const isAccentCyan = idx % 2 === 0;
            return (
              <HudCard
                key={item.id}
                accent={isAccentCyan ? 'cyan' : 'purple'}
                className="flex flex-col justify-between h-full bg-[#111726]/80 hover:bg-[#151D30] transition-all duration-300"
              >
                <div className="space-y-5">
                  {/* Card Header with Icon & Category */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F2C4C]">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#0B0F19] border border-[#1F2C4C] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        {getIcon(item.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-[#00FFFF] uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white font-sans mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Tagline & Description */}
                  <p className="text-sm font-medium text-slate-200 leading-snug">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Architecture & Engineering Features */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#0052FF]" />
                      Diferenciais Técnicos
                    </span>
                    <ul className="space-y-2">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFFF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metric Pill */}
                  <div className="p-3 rounded-lg bg-[#0E1422] border border-[#1F2C4C] flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400">{item.metricHighlight.label}:</span>
                    <span className="text-[#00FFFF] font-bold">{item.metricHighlight.value}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-[#1F2C4C] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => toggleCodeDrawer(item)}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-[#00FFFF] transition-colors cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#FF00FF]" />
                    <span>Inspecionar Arquitetura</span>
                  </button>

                  <Button
                    asAnchor
                    href="#contato"
                    variant="outline"
                    size="sm"
                    rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                    onClick={() => analytics.ctaClick(`solucao_${item.id}`, '#contato')}
                  >
                    Solicitar Escopo
                  </Button>
                </div>
              </HudCard>
            );
          })}
        </div>

        {/* Code Drawer Modal */}
        {showCodeDrawer && selectedSolution && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          >
            <div className="w-full max-w-2xl rounded-2xl bg-[#0F1524] border border-[#00FFFF]/40 shadow-[0_0_50px_rgba(0,255,255,0.2)] p-6 space-y-4 font-sans">
              <div className="flex items-center justify-between pb-3 border-b border-[#1F2C4C]">
                <div>
                  <span className="text-xs font-mono text-[#00FFFF] uppercase tracking-wider">// ARQUITETURA & CÓDIGO LIMPO</span>
                  <h4 className="text-lg font-bold text-white">{selectedSolution.title}</h4>
                </div>
                <button
                  onClick={() => setShowCodeDrawer(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#141C30] hover:bg-[#1F2C4C] text-xs font-mono text-slate-300 hover:text-white"
                >
                  Fechar [ESC]
                </button>
              </div>

              <TerminalWindow
                title={`src/core/${selectedSolution.sampleCode.filename}`}
                tabs={[
                  {
                    id: 'code',
                    label: selectedSolution.sampleCode.filename,
                    language: selectedSolution.sampleCode.language,
                    code: selectedSolution.sampleCode.code,
                  },
                ]}
                statusText={`LNTechLab Architecture • ${selectedSolution.category}`}
              />

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Padrões aplicados: Clean Code, SOLID & Zero Debt
                </span>
                <Button
                  asAnchor
                  href="#contato"
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setShowCodeDrawer(false);
                    analytics.ctaClick('drawer_orcamento', '#contato');
                  }}
                >
                  Iniciar com essa Arquitetura
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
