import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';
import { Button } from '../ui/Button';
import { soundFX } from '../../lib/soundEffects';

interface CookieConsentProps {
  onOpenPrivacyModal: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacyModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lntech_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    soundFX.playClick();
    localStorage.setItem('lntech_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    soundFX.playClick();
    localStorage.setItem('lntech_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Consentimento de Cookies e Privacidade LGPD"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 p-5 rounded-xl bg-[#111726]/95 border border-[#1F2C4C] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#0052FF]/20 border border-[#0052FF]/40 text-[#00FFFF] shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
            <span>Privacidade & LGPD</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Utilizamos cookies técnicos e telemetria anônima para aprimorar sua experiência e garantir a segurança do sistema conforme as diretrizes da LGPD (Lei nº 13.709/2018).
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <Button size="sm" variant="primary" onClick={handleAcceptAll}>
              Aceitar Todos
            </Button>
            <Button size="sm" variant="outline" onClick={handleEssentialOnly}>
              Apenas Essenciais
            </Button>
            <button
              onClick={() => {
                soundFX.playClick();
                onOpenPrivacyModal();
              }}
              className="text-xs text-[#00FFFF] hover:underline font-mono ml-1"
            >
              Ler Termos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
