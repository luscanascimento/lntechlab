import React from 'react';
import { ArrowRight, Terminal, Sparkles, ShieldCheck, Code, Zap, Cpu, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Container } from '../layout/Container';
import { BackgroundCanvas } from '../webgl/BackgroundCanvas';
import { HERO_METRICS } from '../../config/siteConfig';
import { analytics } from '../../lib/analytics';
import { useTypewriter } from '../../hooks/useTypewriter';

export const HeroSection: React.FC = () => {
  const dynamicCommand = useTypewriter({
    words: [
      'deploy --target=production --fast',
      'agent.orchestrate({ mode: "autonomous" })',
      'audit.coreWebVitals({ score: 99 })',
      'build.cleanArchitecture({ solid: true })',
    ],
    typingSpeed: 60,
    deletingSpeed: 30,
    pauseTime: 2000,
  });

  return (
    <section
      id="hero"
      aria-label="Introdução LNTechLab"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* 3D WebGL Background Scene */}
      <BackgroundCanvas />

      {/* Subtle Background Radial Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#0B0F19]/40 to-[#0B0F19]" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Status Badge & Profile Link */}
          <div className="flex flex-wrap items-center justify-center gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <Badge variant="cyan" showPulse>
              ENGINERING LAB // V2.4 PROD
            </Badge>
            <a
              href="https://github.com/luscanascimento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#111726]/80 border border-[#1F2C4C] hover:border-[#00FFFF] text-slate-300 hover:text-[#00FFFF] transition-all"
            >
              <span>👨‍💻 Lucas Nascimento (Pleno)</span>
              <span className="text-[#00FFFF]">&gt;</span>
            </a>
          </div>

          {/* Semantic H1 with Split Neon Gradients */}
          <h1 className="text-fluid-h1 font-extrabold text-white tracking-tight leading-[1.08] animate-in fade-in slide-in-from-bottom-3 duration-700">
            Engenharia de Software,{' '}
            <span className="bg-gradient-to-r from-[#00FFFF] via-white to-[#0052FF] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]">
              Interfaces de Alto Impacto
            </span>{' '}
            e <span className="text-[#FF00FF] drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]">Agentes Inteligentes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Transformamos desafios complexos em sistemas escaláveis, código limpo e experiências digitais memoráveis com foco rigoroso em conversão B2B e performance extrema.
          </p>

          {/* Dual CTAs with Magnetic Effect */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
            <Button
              asAnchor
              href="#contato"
              variant="primary"
              size="lg"
              isMagnetic
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => analytics.ctaClick('hero_iniciar_projeto', '#contato')}
              className="w-full sm:w-auto shadow-[0_0_30px_rgba(0,82,255,0.5)] hover:shadow-[0_0_40px_rgba(0,255,255,0.7)]"
            >
              Iniciar um Projeto
            </Button>

            <Button
              asAnchor
              href="#stack"
              variant="purple"
              size="lg"
              isMagnetic
              leftIcon={<Code className="w-4 h-4 text-[#FF00FF]" />}
              onClick={() => analytics.ctaClick('hero_ver_tecnologias', '#stack')}
              className="w-full sm:w-auto"
            >
              Ver Tecnologias & Stack
            </Button>
          </div>

          {/* Live Mini Terminal Runner Pill */}
          <div className="pt-4 flex items-center justify-center w-full">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#111726]/80 border border-[#1F2C4C] backdrop-blur-md font-mono text-xs text-slate-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-ping" />
              <span className="text-[#00FFFF] font-bold">lntechlab $</span>
              <span className="text-white font-medium">{dynamicCommand}</span>
              <span className="inline-block w-1.5 h-3.5 bg-[#FF00FF] animate-pulse" />
            </div>
          </div>

          {/* Metrics HUD Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full pt-8 sm:pt-12">
            {HERO_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#111726]/70 border border-[#1F2C4C] backdrop-blur-md text-center group hover:border-[#00FFFF]/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl font-extrabold text-[#00FFFF] font-mono mb-1 group-hover:scale-105 transition-transform">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white font-sans">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
