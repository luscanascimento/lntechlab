import React from 'react';
import { X, ShieldCheck, Lock, Database, EyeOff, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { SITE_CONFIG } from '../../config/siteConfig';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#0F1524] border border-[#1F2C4C] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1F2C4C] bg-[#111726]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0052FF]/20 border border-[#0052FF]/40 text-[#00FFFF]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs text-[#00FFFF] uppercase tracking-wider">// SEGURANÇA & PRIVACIDADE</span>
              <h3 id="privacy-modal-title" className="text-lg sm:text-xl font-bold text-white">
                Diretrizes de Segurança & LGPD
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar termos de privacidade"
            className="p-2 rounded-lg bg-[#141C30] hover:bg-[#1F2C4C] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00FFFF]" />
              1. Compromisso com a Lei Geral de Proteção de Dados (LGPD)
            </h4>
            <p>
              A <strong>{SITE_CONFIG.legalName}</strong> atua em estrita conformidade com a Lei nº 13.709/2018 (LGPD). Os dados informados em nossos formulários de contato (nome, empresa, e-mail e telefone) são utilizados única e exclusivamente para fins de qualificação comercial, elaboração de propostas técnicas e contato direto entre nossos especialistas e sua empresa.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#FF00FF]" />
              2. Padrões de Segurança e Criptografia
            </h4>
            <p>
              Todas as comunicações transitam sob protocolo seguro <strong>TLS 1.3</strong> com criptografia de ponta a ponta. Não armazenamos senhas ou dados sensíveis em texto plano. Nossos bancos de dados e canais de mensageria utilizam criptografia AES-256 em repouso.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#0052FF]" />
              3. Não Compartilhamento e Zero Spam
            </h4>
            <p>
              Garantimos a não comercialização, cessão ou compartilhamento de dados cadastrais com terceiros não autorizados. Seus dados corporativos permanecem restritos aos nossos engenheiros e consultores durante o ciclo de atendimento.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-[#00FFFF]" />
              4. Direitos do Titular de Dados
            </h4>
            <p>
              A qualquer momento, o titular dos dados pode solicitar a confirmação, correção, anonimização ou exclusão definitiva de suas informações de nossa base através do e-mail de contato oficial: <code className="text-[#00FFFF] font-mono bg-[#141C30] px-1.5 py-0.5 rounded">{SITE_CONFIG.contactEmail}</code>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F2C4C] bg-[#111726] flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Última atualização: Setembro / 2026
          </span>
          <Button size="sm" variant="primary" onClick={onClose}>
            Fechar e Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};
