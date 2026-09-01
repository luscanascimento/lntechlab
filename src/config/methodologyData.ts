import { MethodologyPillar } from '../types';

export const METHODOLOGY_PILLARS: MethodologyPillar[] = [
  {
    number: '01',
    title: 'Clean Code & SOLID',
    subtitle: 'Arquitetura desacoplada e manutenibilidade a longo prazo.',
    description: 'Escrevemos código legível, modular e auto-documentado. Aplicamos Domain-Driven Design (DDD) e princípios SOLID para garantir que seu sistema evolua com velocidade sem acumular débito técnico.',
    principles: [
      'Single Responsibility & Inversão de Dependências',
      'Funções puras e imutabilidade de estado',
      'Modularidade estrita orientada a domínio',
      'Zero duplicação de regras de negócio (DRY)'
    ],
    terminalLog: '[SOLID] Dependency injection container initialized. Modules: 14 | Invariants: 100% OK',
    iconName: 'Code',
  },
  {
    number: '02',
    title: 'Testes Automatizados',
    subtitle: 'Confiança matemática para cada deploy em produção.',
    description: 'Pirâmide de testes rigorosa com testes unitários, de integração e ponta a ponta (E2E). Cada pull request passa por validações automatizadas antes de qualquer merge.',
    principles: [
      'Testes Unitários com alta cobertura de regras críticas',
      'Testes de Integração de APIs e banco de dados',
      'Testes E2E com simulação de fluxo real do usuário',
      'Testes de mutação e regressão visual'
    ],
    terminalLog: '[TEST] PASS src/__tests__/CheckoutFlow.spec.ts (18 tests, 0 failed, coverage 98.4%)',
    iconName: 'ShieldCheck',
  },
  {
    number: '03',
    title: 'Segurança por Design & LGPD',
    subtitle: 'Zero Trust, proteção de dados e criptografia de ponta a ponta.',
    description: 'Segurança não é um adendo, é a fundação. Protegemos suas APIs contra ataques (OWASP Top 10), implementamos rate limiting, criptografia de dados em trânsito/repouso e conformidade estrita com a LGPD.',
    principles: [
      'Zero-Trust Architecture & RBAC (Role-Based Access Control)',
      'Sanitização estrita de inputs e proteção contra SQLi/XSS/CSRF',
      'Criptografia AES-256 e TLS 1.3 obrigatório',
      'Auditoria de dependências (CVE scanning no CI/CD)'
    ],
    terminalLog: '[SECURITY] CSP & HSTS active. Zero vulnerabilities detected in audit scan.',
    iconName: 'Lock',
  },
  {
    number: '04',
    title: 'CI/CD & Observabilidade',
    subtitle: 'Deploys contínuos sem downtime e telemetria em tempo real.',
    description: 'Infraestrutura moderna e automatizada com pipelines de entrega contínua. Monitoramento em tempo real de latência, taxa de erros e métricas de negócio para agir preventivamente.',
    principles: [
      'Deploy automatizado com Canary / Blue-Green releases',
      'Infraestrutura como Código (IaC) auditável',
      'Métricas e traces distribuídos com OpenTelemetry',
      'Alertas preditivos de consumo e anomalias de tráfego'
    ],
    terminalLog: '[DEPLOY] Release v2.4.0 deployed to Edge in 14.2s. Status: 200 OK | Health: 100%',
    iconName: 'Cpu',
  }
];

export const PIPELINE_STEPS = [
  { step: '01', name: 'Discovery & Arquitetura', desc: 'Mapeamento de regras de negócio, modelagem de dados e escolha da stack ideal.' },
  { step: '02', name: 'Design & Prototipação UI/UX', desc: 'Interfaces de alto impacto, testes de usabilidade e fluxos de alta conversão.' },
  { step: '03', name: 'Engenharia & Desenvolvimento', desc: 'Sprints ágeis, código tipado, clean code e revisões contínuas em pares.' },
  { step: '04', name: 'Quality Assurance & Hardening', desc: 'Auditorias de segurança, testes de carga, SEO e Core Web Vitals.' },
  { step: '05', name: 'Deploy em Produção & Suporte', desc: 'Lançamento com zero downtime, monitoramento 24/7 e garantia de evolução.' },
];
