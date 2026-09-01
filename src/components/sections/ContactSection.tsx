import React from 'react';
import { Mail, MessageSquare, ShieldCheck, Clock, FileCheck, Lock, CheckCircle2 } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from '../forms/ContactForm';
import { SITE_CONFIG } from '../../config/siteConfig';
import { analytics } from '../../lib/analytics';
import { soundFX } from '../../lib/soundEffects';

interface ContactSectionProps {
  onFormSuccess: (data: { name: string; company: string; projectType: string; email: string }) => void;
  onOpenPrivacyModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onFormSuccess,
  onOpenPrivacyModal,
}) => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(
    'Olá! Gostaria de falar diretamente com o especialista da LNTechLab para um projeto.'
  )}`;

  return (
    <section id="contato" className="py-24 sm:py-32 relative bg-[#090D17] border-t border-[#1F2C4C]" aria-label="Briefing e Contato">
      {/* Background Circuit Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          tag="06. INICIAR UM PROJETO"
          title="Vamos Construir Algo Excepcional?"
          subtitle="Preencha o formulário para receber uma análise técnica preliminar e estimativa de cronograma sem compromisso."
          titleGradient="cyan-purple"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contacts & Guarantees (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111726]/90 border border-[#1F2C4C] space-y-5 backdrop-blur-md">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#00FFFF] uppercase tracking-wider">// CANAL DIRETO B2B</span>
                <h3 className="text-xl font-bold text-white font-sans">
                  Fale com Nosso Tech Lead
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sem intermediários comerciais: converse diretamente com engenheiros de software que entendem sua dor técnica e de negócio.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F2C4C] hover:border-[#00FFFF] text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-[#0052FF]/20 text-[#00FFFF] group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">E-MAIL OFICIAL</span>
                    <span className="block text-xs sm:text-sm font-bold font-mono text-white group-hover:text-[#00FFFF]">
                      {SITE_CONFIG.contactEmail}
                    </span>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    soundFX.playClick();
                    analytics.whatsappClick('contact_sidebar');
                  }}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0B0F19] border border-[#1F2C4C] hover:border-[#25D366] text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">WHATSAPP DIRETO</span>
                    <span className="block text-xs sm:text-sm font-bold font-mono text-[#25D366]">
                      {SITE_CONFIG.whatsappDisplay}
                    </span>
                  </div>
                </a>
              </div>

              {/* Engineering Guarantees */}
              <div className="space-y-3 pt-4 border-t border-[#1F2C4C]">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Garantias de Atendimento
                </h4>
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#00FFFF] shrink-0" />
                    <span>Retorno técnico em até <strong>4 horas úteis</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-[#FF00FF] shrink-0" />
                    <span>Acordo de Confidencialidade (NDA) sob demanda</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#27C93F] shrink-0" />
                    <span>100% de conformidade com a LGPD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Conversion B2B Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111726]/90 border border-[#1F2C4C] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <div className="mb-6 pb-4 border-b border-[#1F2C4C] flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#00FFFF] uppercase tracking-wider">// BRIEFING DE PROJETO</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-sans mt-0.5">
                    Formulário de Escopo Inicial
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#27C93F] bg-[#27C93F]/10 px-2.5 py-1 rounded border border-[#27C93F]/30">
                  <Lock className="w-3 h-3" />
                  <span>256-bit Encrypted</span>
                </div>
              </div>

              <ContactForm
                onSuccess={onFormSuccess}
                onOpenPrivacyModal={onOpenPrivacyModal}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
