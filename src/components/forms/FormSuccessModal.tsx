import React, { useEffect } from 'react';
import { CheckCircle, Terminal, ArrowRight, X, Calendar, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { soundFX } from '../../lib/soundEffects';

interface FormSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData: {
    name: string;
    company: string;
    projectType: string;
    email: string;
  } | null;
}

export const FormSuccessModal: React.FC<FormSuccessModalProps> = ({
  isOpen,
  onClose,
  leadData,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundFX.playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00FFFF', '#FF00FF', '#0052FF', '#FFFFFF'],
        });
      } catch {
        // Safe catch
      }
    }
  }, [isOpen]);

  if (!isOpen || !leadData) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0F1524] border border-[#00FFFF]/50 shadow-[0_0_50px_rgba(0,255,255,0.25)] p-6 sm:p-8 overflow-hidden font-sans">
        {/* Neon top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0052FF] via-[#00FFFF] to-[#FF00FF]" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#141C30] hover:bg-[#1F2C4C] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#00FFFF]/15 border border-[#00FFFF]/40 text-[#00FFFF]">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <span className="font-mono text-xs text-[#00FFFF] uppercase tracking-wider">// BRIEFING RECEBIDO COM SUCESSO</span>
            <h3 id="success-modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
              Pronto, {leadData.name.split(' ')[0]}!
            </h3>
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-4 text-sm text-slate-300">
          <p className="leading-relaxed">
            Seu projeto para a <strong className="text-white font-mono">{leadData.company}</strong> foi registrado em nosso pipeline de engenharia com prioridade.
          </p>

          {/* Terminal Step Summary */}
          <div className="p-4 rounded-xl bg-[#080C14] border border-[#1F2C4C] font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-[#00FFFF]">
                <Terminal className="w-3.5 h-3.5" />
                <span>TASK STATUS</span>
              </span>
              <span className="text-[#27C93F] font-bold">200 OK • QUEUED</span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-500">TIPO: </span>
              <span className="text-[#FF00FF] font-semibold">{leadData.projectType}</span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-500">CONTATO: </span>
              <span>{leadData.email}</span>
            </div>
            <div className="text-slate-300">
              <span className="text-slate-500">SLA DE RESPOSTA: </span>
              <span className="text-[#00FFFF]">&lt; 4 horas úteis</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#0052FF]" />
              Próximos Passos
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-[#00FFFF] font-mono">1.</span>
                <span>Análise técnica dos requisitos e viabilidade arquitetural por nosso Tech Lead.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FFFF] font-mono">2.</span>
                <span>Contato direto via WhatsApp / E-mail para alinhamento e agendamento de briefing técnico.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00FFFF] font-mono">3.</span>
                <span>Apresentação de proposta com escopo detalhado, cronograma e stack recomendada.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#1F2C4C] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FFFF]" />
            Dados protegidos (LGPD)
          </span>
          <Button variant="primary" size="md" onClick={onClose}>
            Entendido
          </Button>
        </div>
      </div>
    </div>
  );
};
