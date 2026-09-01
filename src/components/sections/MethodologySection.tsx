import React from 'react';
import { ShieldCheck, Code, Lock, Cpu, CheckCircle2, ArrowRight, GitPullRequest, Terminal } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { HudCard } from '../ui/HudCard';
import { QualityScanBackground } from '../ui/QualityScanBackground';
import { METHODOLOGY_PILLARS, PIPELINE_STEPS } from '../../config/methodologyData';

export const MethodologySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#00FFFF]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#27C93F]" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-[#FF00FF]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#0052FF]" />;
      default:
        return <Terminal className="w-5 h-5 text-[#00FFFF]" />;
    }
  };

  return (
    <section id="metodologia" className="py-24 sm:py-32 relative bg-[#0B0F19] overflow-hidden border-b border-[#1F2C4C]" aria-label="Metodologia e Arquitetura">
      {/* Security Laser Scan & Quality Gate Grid Background */}
      <QualityScanBackground />

      {/* Background Circuit Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <Container className="relative z-10">
        {/* Glassmorphic Contrast Shield for Section Heading */}
        <div className="relative max-w-3xl mx-auto mb-10 sm:mb-12 px-6 py-5 sm:px-8 sm:py-6 rounded-3xl bg-[#0B0F19]/90 backdrop-blur-xl border border-[#1F2C4C]/80 shadow-[0_15px_45px_rgba(0,0,0,0.8)] text-center">
          <SectionHeading
            tag="03. METODOLOGIA & QUALIDADE"
            title="Engenharia Rigorosa, Zero Amadorismo"
            subtitle="Não entregamos apenas código que funciona na nossa máquina: construímos sistemas auditáveis, protegidos contra vulnerabilidades e preparados para escalar."
            titleGradient="blue-cyan"
            className="m-0 p-0"
          />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {METHODOLOGY_PILLARS.map((pillar) => (
            <HudCard
              key={pillar.number}
              accent="cyan"
              className="flex flex-col justify-between h-full bg-[#111726]/80 hover:bg-[#141C30] transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1F2C4C]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#0B0F19] border border-[#1F2C4C]">
                      {getIcon(pillar.iconName)}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#00FFFF] font-semibold">
                        // PILAR {pillar.number}
                      </span>
                      <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {pillar.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-2 pt-2">
                  {pillar.principles.map((pr, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFFF] shrink-0 mt-0.5" />
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terminal Log Pill */}
              <div className="mt-6 pt-4 border-t border-[#1F2C4C]">
                <div className="p-2.5 rounded-lg bg-[#080C14] border border-[#1F2C4C] font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-nowrap">
                  <span className="text-[#00FFFF]">&gt;</span> {pillar.terminalLog}
                </div>
              </div>
            </HudCard>
          ))}
        </div>

        {/* Development Lifecycle Pipeline Steps */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1524] border border-[#1F2C4C] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F2C4C] pb-4">
            <div>
              <span className="text-xs font-mono text-[#FF00FF] uppercase tracking-wider">// PIPELINE DE PRODUÇÃO</span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                Como Conduzimos Seu Projeto do Início ao Deploy
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <GitPullRequest className="w-4 h-4 text-[#00FFFF]" />
              <span>Continuous Delivery</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PIPELINE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#111726] border border-[#1F2C4C] hover:border-[#00FFFF]/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#00FFFF] font-bold">ETAPA {step.step}</span>
                  <span className="text-slate-600 group-hover:text-[#FF00FF] transition-colors">&gt;</span>
                </div>
                <h4 className="text-sm font-bold text-white font-sans">{step.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
