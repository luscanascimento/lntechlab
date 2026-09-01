import React, { useState } from 'react';
import { Layers, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Terminal, Code } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { DeviceMockup } from '../ui/DeviceMockup';
import { Button } from '../ui/Button';
import { PORTFOLIO_PROJECTS } from '../../config/portfolioData';
import { soundFX } from '../../lib/soundEffects';
import { analytics } from '../../lib/analytics';
import { cn } from '../../lib/utils';

export const PortfolioSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>(PORTFOLIO_PROJECTS[0].id);

  const activeProject =
    PORTFOLIO_PROJECTS.find((p) => p.id === activeProjectId) || PORTFOLIO_PROJECTS[0];

  const handleSelectProject = (id: string) => {
    soundFX.playClick();
    setActiveProjectId(id);
    analytics.tabChange(`portfolio_project_${id}`);
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32 relative bg-[#090D17] border-t border-[#1F2C4C]/60" aria-label="Portfólio e Casos de Sucesso">
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          tag="04. PORTFÓLIO & CASOS DE ENGENHARIA"
          title="Sistemas em Produção e Alto Desempenho"
          subtitle="Veja como transformamos especificações técnicas e objetivos de negócio em aplicações velozes, seguras e com métricas de impacto comprovadas."
          titleGradient="cyan-purple"
        />

        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {PORTFOLIO_PROJECTS.map((proj) => {
            const isSelected = activeProjectId === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj.id)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer select-none',
                  isSelected
                    ? 'bg-[#0052FF] text-white shadow-[0_0_20px_rgba(0,82,255,0.4)] border border-[#00FFFF]'
                    : 'bg-[#111726] text-slate-400 border border-[#1F2C4C] hover:border-slate-600 hover:text-slate-200'
                )}
              >
                <span className={cn('w-2 h-2 rounded-full', isSelected ? 'bg-[#00FFFF] animate-ping' : 'bg-slate-600')} />
                <span className="font-semibold">{proj.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Project Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#00FFFF] uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#00FFFF]/10 border border-[#00FFFF]/30">
                  {activeProject.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeProject.clientSegment}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                {activeProject.title}
              </h3>
              <p className="text-sm font-medium text-slate-300">
                {activeProject.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Architecture Highlights */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FF00FF]" />
                Destaques de Arquitetura
              </h4>
              <ul className="space-y-2">
                {activeProject.architectureHighlights.map((hl, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFFF] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-slate-400 block">Stack Tecnológica:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.stack.map((stk, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded bg-[#111726] border border-[#1F2C4C] text-[11px] font-mono text-slate-300"
                  >
                    {stk}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button
                asAnchor
                href="#contato"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => analytics.ctaClick(`portfolio_cta_${activeProject.id}`, '#contato')}
              >
                Desenvolver Solução Semelhante
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Device Mockup (7 Cols) */}
          <div className="lg:col-span-7">
            <DeviceMockup
              title={activeProject.title}
              category={activeProject.category}
              codeSnippet={activeProject.mockupSnippet.codePreview}
              metrics={activeProject.metrics}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
