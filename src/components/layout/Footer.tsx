import React from 'react';
import { Terminal, Shield, Mail, ArrowUp } from 'lucide-react';
import { SITE_CONFIG, NAV_ITEMS } from '../../config/siteConfig';
import { Container } from './Container';
import { soundFX } from '../../lib/soundEffects';
import { analytics } from '../../lib/analytics';

interface FooterProps {
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080B12] border-t border-[#1F2C4C] pt-16 pb-12 overflow-hidden text-slate-400 font-sans">
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1F2C4C]/60 relative z-10">
          {/* Column 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#111726] border border-[#0052FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,82,255,0.4)]">
                <span className="font-mono font-bold text-xs text-white">
                  <span className="text-[#00FFFF]">&lt;</span>
                  <span className="text-white">LN</span>
                  <span className="text-[#FF00FF]">&gt;</span>
                </span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                LN<span className="text-[#00FFFF]">Tech</span><span className="text-[#FF00FF]">Lab</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Engenharia de software sob medida, desenvolvimento de landing pages de alta conversão, automações inteligentes e orquestração de agentes de IA para empresas orientadas ao futuro.
            </p>

            {/* System Telemetry Widget */}
            <div className="p-3 rounded-lg bg-[#0F1524] border border-[#1F2C4C] font-mono text-xs space-y-1.5 max-w-sm">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
                  <span>CLUSTER STATUS</span>
                </span>
                <span className="text-[#00FFFF] font-semibold">{SITE_CONFIG.systemStatus.status}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>UPTIME: {SITE_CONFIG.systemStatus.uptime}</span>
                <span>LATENCY: {SITE_CONFIG.systemStatus.latency}</span>
                <span className="text-[#FF00FF]">{SITE_CONFIG.systemStatus.version}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00FFFF]" />
              Navegação
            </h4>
            <ul className="space-y-2 text-sm font-mono text-slate-400">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => {
                      soundFX.playClick();
                      analytics.ctaClick(`footer_${item.label.toLowerCase()}`, item.href);
                    }}
                    className="hover:text-[#00FFFF] transition-colors flex items-center gap-1 text-xs"
                  >
                    <span className="text-slate-600">&gt;</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Serviços */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#FF00FF]" />
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="hover:text-slate-200">Softwares Sob Medida</li>
              <li className="hover:text-slate-200">Websites de Alta Performance</li>
              <li className="hover:text-slate-200">Agentes de IA & LLM RAG</li>
              <li className="hover:text-slate-200">Consultoria & Refatoração</li>
              <li className="hover:text-slate-200">DevOps & Cloud Edge</li>
            </ul>
          </div>

          {/* Column 5: Contato & Social */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
              Contato Direto
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="text-slate-300 hover:text-[#00FFFF] flex items-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0052FF]" />
                <span>{SITE_CONFIG.contactEmail}</span>
              </a>
              <p className="text-slate-500 text-[11px]">
                Atendimento B2B nacional e global
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Lucas Nascimento"
                title="GitHub: luscanascimento"
                className="p-2 rounded-lg bg-[#111726] border border-[#1F2C4C] hover:border-[#00FFFF] text-slate-300 hover:text-[#00FFFF] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Lucas Nascimento"
                title="LinkedIn: lucas-nascimento"
                className="p-2 rounded-lg bg-[#111726] border border-[#1F2C4C] hover:border-[#00FFFF] text-slate-300 hover:text-[#00FFFF] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.resumeUrl}
                download="Lucas_Nascimento_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Baixar Currículo de Lucas Nascimento (PDF)"
                title="Baixar Currículo (PDF)"
                className="px-2.5 py-1.5 rounded-lg bg-[#111726] border border-[#FF00FF]/40 hover:border-[#FF00FF] text-slate-300 hover:text-[#FF00FF] transition-all text-xs font-mono flex items-center gap-1"
              >
                <span>📄 CV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os direitos reservados.</span>
            <span>•</span>
            <button
              onClick={onOpenPrivacyModal}
              className="text-slate-400 hover:text-[#00FFFF] underline cursor-pointer transition-colors"
            >
              Política de Privacidade & LGPD
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">
              Engenharia de precisão com React 19, Three.js & TypeScript
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo da página"
              className="p-2 rounded-md bg-[#111726] border border-[#1F2C4C] hover:border-[#00FFFF] text-slate-300 hover:text-[#00FFFF] transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
