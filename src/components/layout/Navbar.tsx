import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '../../config/siteConfig';
import { Button } from '../ui/Button';
import { Container } from './Container';
import { soundFX } from '../../lib/soundEffects';
import { analytics } from '../../lib/analytics';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile menu & focus trapping
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    soundFX.playClick();
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavLinkClick = (label: string, href: string) => {
    soundFX.playClick();
    analytics.ctaClick(`nav_${label.toLowerCase()}`, href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0B0F19]/85 backdrop-blur-xl border-b border-[#1F2C4C] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => handleNavLinkClick('home', '#')}
            className="flex items-center gap-2.5 group select-none"
            aria-label="LNTechLab Início"
          >
            {/* SVG Logo Emblem */}
            <div className="relative w-9 h-9 rounded-lg bg-[#111726] border border-[#0052FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,82,255,0.4)] group-hover:border-[#00FFFF] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all">
              <span className="font-mono font-bold text-xs text-white">
                <span className="text-[#00FFFF]">&lt;</span>
                <span className="text-white">LN</span>
                <span className="text-[#FF00FF]">&gt;</span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg text-white tracking-tight flex items-center">
                LN<span className="text-[#00FFFF]">Tech</span><span className="text-[#FF00FF]">Lab</span>
              </span>
              <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase -mt-1 hidden sm:block">
                Software & AI Systems
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#111726]/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#1F2C4C]" aria-label="Navegação Principal">
            {NAV_ITEMS.filter((item) => !item.isCTA).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavLinkClick(item.label, item.href)}
                className="px-3.5 py-1.5 text-xs font-mono text-slate-300 hover:text-[#00FFFF] hover:bg-[#1A243D]/60 rounded-full transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Right Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* GitHub Link */}
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.ctaClick('nav_github', SITE_CONFIG.social.github)}
              aria-label="Acessar GitHub de Lucas Nascimento"
              title="GitHub / luscanascimento"
              className="p-2 rounded-lg bg-[#111726]/80 hover:bg-[#1A243D] border border-[#1F2C4C] hover:border-[#00FFFF] text-slate-300 hover:text-[#00FFFF] transition-all flex items-center gap-1 text-xs font-mono select-none"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="hidden xl:inline text-[11px]">GitHub</span>
            </a>

            {/* Resume Download Link */}
            <a
              href={SITE_CONFIG.resumeUrl}
              download="Lucas_Nascimento_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.ctaClick('nav_resume_download', SITE_CONFIG.resumeUrl)}
              aria-label="Baixar Currículo de Lucas Nascimento (PDF)"
              title="Baixar Currículo (PDF)"
              className="px-3 py-2 rounded-lg bg-[#111726]/80 hover:bg-[#1A243D] border border-[#FF00FF]/40 hover:border-[#FF00FF] text-slate-200 hover:text-[#FF00FF] transition-all flex items-center gap-1.5 text-xs font-mono select-none"
            >
              <span className="text-[#FF00FF]">📄</span>
              <span>Currículo</span>
            </a>

            {/* CTA Button */}
            <Button
              asAnchor
              href="#contato"
              variant="primary"
              size="sm"
              isMagnetic
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => analytics.ctaClick('nav_iniciar_projeto', '#contato')}
            >
              Iniciar Projeto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={SITE_CONFIG.resumeUrl}
              download="Lucas_Nascimento_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Baixar Currículo"
              className="p-2 rounded-lg bg-[#111726] border border-[#FF00FF]/40 text-[#FF00FF] text-xs font-mono"
            >
              📄 CV
            </a>
            <button
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-lg bg-[#111726] border border-[#1F2C4C] text-slate-300 hover:text-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu móvel LNTechLab"
          className="fixed inset-0 top-[60px] bg-[#0B0F19]/95 backdrop-blur-2xl z-50 lg:hidden flex flex-col p-6 border-t border-[#1F2C4C] animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#1F2C4C] text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00FFFF]" />
              // MENU_NAVEGACAO
            </span>
            <span className="text-[#00FFFF]">{SITE_CONFIG.systemStatus.version}</span>
          </div>

          <nav className="flex flex-col gap-2 py-6 flex-1">
            {NAV_ITEMS.filter((item) => !item.isCTA).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavLinkClick(item.label, item.href)}
                className="px-4 py-3 rounded-lg text-base font-mono text-slate-200 hover:text-[#00FFFF] hover:bg-[#111726] border border-transparent hover:border-[#1F2C4C] transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-slate-600 text-xs">&gt;</span>
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#1F2C4C] space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#111726] border border-[#1F2C4C] text-xs font-mono text-slate-200"
              >
                <span>GitHub</span>
              </a>
              <a
                href={SITE_CONFIG.resumeUrl}
                download="Lucas_Nascimento_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#111726] border border-[#FF00FF]/50 text-xs font-mono text-[#FF00FF]"
              >
                <span>📄 Baixar CV</span>
              </a>
            </div>

            <Button
              asAnchor
              href="#contato"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => handleNavLinkClick('iniciar_projeto_mobile', '#contato')}
            >
              Iniciar um Projeto
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FFFF]" />
              <span>Contrato Seguro & LGPD Compliant</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
