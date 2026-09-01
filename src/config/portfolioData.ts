import { PortfolioProject } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'core-platform-fintech',
    title: 'Plataforma SaaS & Gateway de Liquidação',
    tagline: 'Sistema financeiro de alta concorrência com arquitetura orientada a eventos.',
    clientSegment: 'Fintech & B2B SaaS [DADOS LNTECHLAB]',
    category: 'Software Sob Medida',
    description: 'Arquitetura resiliente para processamento de transações em tempo real com idempotência garantida, conciliação bancária automática e painel analítico com WebSockets.',
    architectureHighlights: [
      'Event Sourcing e CQRS para trilha de auditoria contábil imutável',
      'Filas assíncronas com RabbitMQ e Redis para amortecer picos de tráfego',
      'Isolamento multi-tenant com criptografia por cliente',
      'Dashboards em tempo real com sub-segundo de latência'
    ],
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'React'],
    metrics: [
      { label: 'Throughput', value: '15k+ req/seg' },
      { label: 'Disponibilidade', value: '99.99%' },
      { label: 'Tempo de Resposta P99', value: '45ms' }
    ],
    mockupSnippet: {
      terminalCommand: 'lntechlab bench --target=payment-cluster --concurrency=1000',
      codePreview: `// High-concurrency event transaction handler
const transaction = await db.transaction(async (trx) => {
  const account = await trx.accounts.lockForUpdate(accountId);
  account.validateBalance(amount);
  account.debit(amount);
  await trx.ledger.recordEntry({ accountId, amount, type: 'DEBIT' });
});`
    }
  },
  {
    id: 'interactive-3d-experience',
    title: 'Landing Page Imersiva WebGL & Conversão B2B',
    tagline: 'Experiência 3D cinematográfica e pontuação 99/100 no Google PageSpeed.',
    clientSegment: 'Empresas Tech & Inovação [DADOS LNTECHLAB]',
    category: 'Website de Alta Performance',
    description: 'Landing page ultra-rápida combinando Three.js, shaders GLSL customizados e Lenis Smooth Scroll com carregamento assíncrono progressivo e retenção de leads qualificados.',
    architectureHighlights: [
      'Progressive WebGL enhancement com fallback automático em CSS',
      'Dynamic chunk splitting reduzindo bundle inicial para < 60KB gzipped',
      'Otimização cirúrgica de Core Web Vitals (LCP 1.1s | CLS 0)',
      'Integração de formulário com Zod, Honeypot e disparo de webhook'
    ],
    stack: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind CSS', 'Vite'],
    metrics: [
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'LCP (Largest Contentful Paint)', value: '1.1s' },
      { label: 'Taxa de Conversão B2B', value: '+42% [DADOS LNTECHLAB]' }
    ],
    mockupSnippet: {
      terminalCommand: 'lighthouse https://lntechlab.com.br --preset=desktop --view',
      codePreview: `// Zero-overhead WebGL rendering loop with viewport visibility culling
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) startAnimationLoop();
  else pauseAnimationLoop();
}, { threshold: 0.1 });`
    }
  },
  {
    id: 'enterprise-ai-agents',
    title: 'Agente Inteligente de Triagem & Automação',
    tagline: 'Orquestração de LLMs e execução autônoma de fluxos de suporte e vendas.',
    clientSegment: 'Operações B2B & Atendimento [DADOS LNTECHLAB]',
    category: 'Agentes de IA & Automações',
    description: 'Agente cognitivo com RAG sobre bases de conhecimento privadas, integrado a canais de mensageria e ERPs para resolução automática de chamados e qualificação de oportunidades.',
    architectureHighlights: [
      'Busca semântica híbrida (Vector Search + Keyword Matching)',
      'Guardrails anti-alucinação e validação estrita de esquemas JSON',
      'Integração bidirecional com CRM, ERP e ferramentas de mensageria',
      'Dashboard com métricas de assertividade e intervenção humana'
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'Pinecone', 'Docker'],
    metrics: [
      { label: 'Resolução Autônoma', value: '78% dos chamados' },
      { label: 'Tempo Médio de Atendimento', value: '< 15 seg' },
      { label: 'Disponibilidade Operacional', value: '24/7' }
    ],
    mockupSnippet: {
      terminalCommand: 'python -m agents.orchestrator --mode=eval --guardrails=strict',
      codePreview: `// Safe tool invocation with strict schema validation
const executionResult = await agent.invokeTool({
  toolName: "verifyContractStatus",
  parameters: { contractId: "CT-8924", tenantId: ctx.tenantId },
  guardrails: { timeoutMs: 3000, enforceTypes: true }
});`
    }
  }
];
