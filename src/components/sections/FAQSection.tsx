import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { FAQ_ITEMS } from '../../config/faqData';
import { soundFX } from '../../lib/soundEffects';
import { cn } from '../../lib/utils';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    soundFX.playClick();
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative bg-[#0B0F19]" aria-label="Perguntas Frequentes">
      {/* Background Dot Matrix */}
      <div className="absolute inset-0 bg-tech-dots opacity-15 pointer-events-none" />

      <Container className="relative z-10 max-w-4xl">
        <SectionHeading
          tag="05. PERGUNTAS FREQUENTES"
          title="Dúvidas Técnicas & Comerciais"
          subtitle="Transparência total sobre nosso processo de desenvolvimento, prazos, propriedade intelectual e padrões de engenharia."
          titleGradient="blue-cyan"
        />

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  'rounded-xl border transition-all duration-300 overflow-hidden font-sans',
                  isOpen
                    ? 'bg-[#111726] border-[#00FFFF]/40 shadow-[0_0_20px_rgba(0,255,255,0.1)]'
                    : 'bg-[#0E1422]/80 border-[#1F2C4C] hover:border-slate-600'
                )}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00FFFF]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#00FFFF] font-bold">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-[#00FFFF] shrink-0 transition-transform duration-300',
                      isOpen ? 'rotate-180 text-[#FF00FF]' : ''
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1F2C4C]/60 pt-4 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                      <span className="text-[#0052FF]">TAG:</span>
                      <span>{item.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
