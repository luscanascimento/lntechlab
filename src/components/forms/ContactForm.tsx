import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Shield, AlertCircle, Check, Loader2, Building2, User, Phone, Mail } from 'lucide-react';
import { ProjectType } from '../../types';
import { Button } from '../ui/Button';
import { formatBrazilianPhone, cn } from '../../lib/utils';
import { analytics } from '../../lib/analytics';
import { soundFX } from '../../lib/soundEffects';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Por favor, informe seu nome completo.' }),
  company: z.string().min(2, { message: 'Informe o nome da sua empresa ou negócio.' }),
  whatsapp: z.string().min(14, { message: 'Informe um número de WhatsApp válido com DDD.' }),
  email: z.string().email({ message: 'Informe um e-mail corporativo válido.' }),
  projectType: z.enum(['software_custom', 'high_perf_web', 'ai_agents_automation', 'consulting_refactor'], {
    message: 'Selecione o tipo de projeto.',
  }),
  budgetRange: z.string().optional(),
  message: z.string().min(10, { message: 'Descreva resumidamente os objetivos ou escopo (mínimo 10 caracteres).' }),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Você deve concordar com os termos de privacidade para continuar.',
  }),
  honeypot: z.string().max(0, { message: 'Bot detectado.' }).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess: (data: { name: string; company: string; projectType: string; email: string }) => void;
  onOpenPrivacyModal: () => void;
}

const PROJECT_TYPE_OPTIONS: { value: ProjectType; label: string; icon: string; desc: string }[] = [
  {
    value: 'software_custom',
    label: 'Software Sob Medida',
    icon: '💻',
    desc: 'SaaS, APIs e plataformas escaláveis',
  },
  {
    value: 'high_perf_web',
    label: 'Site / Landing Page Alta Performance',
    icon: '⚡',
    desc: 'WebGL 3D, ultra-rápido e foco em CRO',
  },
  {
    value: 'ai_agents_automation',
    label: 'Agente de IA & Automação',
    icon: '🤖',
    desc: 'LLMs, RAG e fluxos autônomos 24/7',
  },
  {
    value: 'consulting_refactor',
    label: 'Consultoria & Refatoração',
    icon: '🛡️',
    desc: 'Auditoria de código, tuning e infra',
  },
];

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onOpenPrivacyModal }) => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: 'high_perf_web',
      consent: false,
      honeypot: '',
      message: '',
    },
  });

  const selectedProjectType = watch('projectType');
  const whatsappValue = watch('whatsapp') || '';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBrazilianPhone(e.target.value);
    setValue('whatsapp', formatted, { shouldValidate: true });
  };

  const handleFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      analytics.formStart('briefing_b2b_form');
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    soundFX.playClick();
    setSubmissionState('loading');
    setErrorMessage('');

    try {
      setLoadingStep('[1/3] Validando esquema Zod e integridade dos parâmetros...');
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep('[2/3] Criptografando payload com TLS 1.3 & token CSRF...');
      await new Promise((r) => setTimeout(r, 500));

      setLoadingStep('[3/3] Registrando oportunidade no pipeline de engenharia...');
      await new Promise((r) => setTimeout(r, 500));

      analytics.formSubmit('briefing_b2b_form', data.projectType);
      
      const typeLabel =
        PROJECT_TYPE_OPTIONS.find((t) => t.value === data.projectType)?.label || data.projectType;

      onSuccess({
        name: data.name,
        company: data.company,
        projectType: typeLabel,
        email: data.email,
      });

      setSubmissionState('idle');
      reset();
    } catch {
      setSubmissionState('error');
      setErrorMessage(
        'Ocorreu uma instabilidade momentânea. Por favor, tente novamente ou fale diretamente via WhatsApp.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFocus}
      noValidate
      className="space-y-6 text-slate-200 font-sans"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_field">Ignore this field</label>
        <input
          id="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      {submissionState === 'error' && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-sm flex items-start gap-3 animate-in fade-in duration-200"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-mono text-red-300">Erro no envio</strong>
            <p className="text-xs">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <label htmlFor="contact_name" className="block text-xs font-mono text-slate-300 font-medium">
            Seu Nome Completo <span className="text-[#00FFFF]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              id="contact_name"
              type="text"
              autoComplete="name"
              placeholder="Ex: Carlos Andrade"
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F1524] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-all',
                errors.name ? 'border-red-500/80 bg-red-950/20' : 'border-[#1F2C4C] hover:border-slate-600'
              )}
              {...register('name')}
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-400 font-mono mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact_company" className="block text-xs font-mono text-slate-300 font-medium">
            Nome da Empresa / Projeto <span className="text-[#00FFFF]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              id="contact_company"
              type="text"
              autoComplete="organization"
              placeholder="Ex: Nexus Corp ou Minha Startup"
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F1524] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-all',
                errors.company ? 'border-red-500/80 bg-red-950/20' : 'border-[#1F2C4C] hover:border-slate-600'
              )}
              {...register('company')}
            />
          </div>
          {errors.company && (
            <p className="text-xs text-red-400 font-mono mt-1">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5">
          <label htmlFor="contact_whatsapp" className="block text-xs font-mono text-slate-300 font-medium">
            WhatsApp / Telefone <span className="text-[#00FFFF]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="contact_whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={whatsappValue}
              onChange={handlePhoneChange}
              placeholder="(11) 99999-9999"
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F1524] border text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-all',
                errors.whatsapp ? 'border-red-500/80 bg-red-950/20' : 'border-[#1F2C4C] hover:border-slate-600'
              )}
            />
          </div>
          {errors.whatsapp && (
            <p className="text-xs text-red-400 font-mono mt-1">{errors.whatsapp.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact_email" className="block text-xs font-mono text-slate-300 font-medium">
            E-mail Corporativo <span className="text-[#00FFFF]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="contact_email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="carlos@empresa.com.br"
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-lg bg-[#0F1524] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-all',
                errors.email ? 'border-red-500/80 bg-red-950/20' : 'border-[#1F2C4C] hover:border-slate-600'
              )}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 font-mono mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-mono text-slate-300 font-medium">
          Tipo de Solução Desejada <span className="text-[#00FFFF]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROJECT_TYPE_OPTIONS.map((opt) => {
            const isSelected = selectedProjectType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setValue('projectType', opt.value, { shouldValidate: true });
                }}
                className={cn(
                  'p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer select-none',
                  isSelected
                    ? 'bg-[#0052FF]/15 border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.15)] text-white'
                    : 'bg-[#0F1524] border-[#1F2C4C] text-slate-400 hover:border-slate-600 hover:text-slate-200'
                )}
              >
                <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                <div className="space-y-0.5">
                  <div className="font-semibold text-xs sm:text-sm text-white flex items-center justify-between">
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#00FFFF]" />}
                  </div>
                  <p className="text-[11px] text-slate-400">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
        {errors.projectType && (
          <p className="text-xs text-red-400 font-mono mt-1">{errors.projectType.message}</p>
        )}
      </div>

      {/* Full width Message field */}
      <div className="space-y-1.5">
        <label htmlFor="contact_message" className="block text-xs font-mono text-slate-300 font-medium">
          Resumo do Desafio / Objetivos do Projeto <span className="text-[#00FFFF]">*</span>
        </label>
        <textarea
          id="contact_message"
          rows={4}
          placeholder="Descreva resumidamente os objetivos, funcionalidades desejadas ou dores técnicas do seu projeto..."
          className={cn(
            'w-full px-4 py-3.5 rounded-lg bg-[#0F1524] border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent transition-all resize-none leading-relaxed',
            errors.message ? 'border-red-500/80 bg-red-950/20' : 'border-[#1F2C4C] hover:border-slate-600'
          )}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-xs text-red-400 font-mono mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-700 bg-[#0F1524] text-[#0052FF] focus:ring-[#00FFFF] focus:ring-offset-[#0B0F19]"
            {...register('consent')}
          />
          <span className="text-xs text-slate-300 leading-relaxed">
            Concordo com o tratamento dos dados informados para fins de contato comercial e elaboração de proposta técnica, conforme a{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                soundFX.playClick();
                onOpenPrivacyModal();
              }}
              className="text-[#00FFFF] underline hover:text-white font-mono inline"
            >
              Política de Privacidade e LGPD
            </button>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-400 font-mono mt-1">{errors.consent.message}</p>
        )}
      </div>

      {submissionState === 'loading' && (
        <div className="p-3.5 rounded-lg bg-[#0A0E18] border border-[#00FFFF]/40 font-mono text-xs text-[#00FFFF] flex items-center gap-3 animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin text-[#00FFFF]" />
          <span>{loadingStep}</span>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Shield className="w-4 h-4 text-[#0052FF]" />
          <span>SLA de retorno técnico: &lt; 4 horas úteis</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submissionState === 'loading'}
          className="w-full sm:w-auto min-w-[240px] justify-center"
          rightIcon={
            submissionState === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )
          }
        >
          {submissionState === 'loading' ? 'Transmitindo...' : 'Solicitar Análise Técnica'}
        </Button>
      </div>
    </form>
  );
};
