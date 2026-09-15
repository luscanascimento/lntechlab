import { NavMenuItem } from '../types';

export const SITE_CONFIG = {
  name: 'LNTechLab',
  legalName: 'LNTechLab Soluções Digitais & Engenharia de Software',
  tagline: 'Engenharia de Software, Interfaces de Alto Impacto e Agentes Inteligentes',
  description: 'Transformamos desafios complexos em sistemas escaláveis, código limpo e experiências digitais memoráveis com alta conversão B2B.',
  url: 'https://lntechlab.com.br',
  domain: 'lntechlab.com.br',
  contactEmail: 'lucasnascimentocontato@gmail.com',
  whatsappNumber: '5511999999999',
  whatsappDisplay: '+55 (11) 99999-9999',
  resumeUrl: `${import.meta.env.BASE_URL}Lucas_Nascimento_Resume.pdf`,
  author: 'Lucas Nascimento',
  social: {
    github: 'https://github.com/luscanascimento',
    linkedin: 'https://linkedin.com/in/lucas-nascimento-0b773a16a',
    instagram: 'https://instagram.com/lntechlab',
  },
  meta: {
    themeColor: '#0B0F19',
    brandBlue: '#0052FF',
    accentCyan: '#00FFFF',
    accentPurple: '#FF00FF',
  },
  systemStatus: {
    version: 'v2.4.0-prod',
    status: 'SYSTEM_OPERATIONAL',
    uptime: '99.98%',
    latency: '14ms',
  },
};

export const NAV_ITEMS: NavMenuItem[] = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Stack & Terminal', href: '#stack' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Projetos', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Iniciar Projeto', href: '#contato', isCTA: true },
];

export const HERO_METRICS = [
  { label: 'Lighthouse Score', value: '99/100', detail: 'Core Web Vitals Impecáveis' },
  { label: 'Clean Code & SOLID', value: '100%', detail: 'Arquitetura Desacoplada' },
  { label: 'Agentes de IA', value: '24/7', detail: 'Autonomia & Produtividade' },
  { label: 'Segurança & LGPD', value: 'Zero Trust', detail: 'Conformidade Rigorosa' },
];
