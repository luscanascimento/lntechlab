import { SolutionItem } from '../types';

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'software-sob-medida',
    title: 'Softwares & Aplicações Web Sob Medida',
    tagline: 'Arquitetura modular, APIs robustas e plataformas corporativas de alto tráfego.',
    description: 'Projetamos e desenvolvemos ecossistemas de software escaláveis, desde painéis analíticos complexos (SaaS) até plataformas corporativas com alta tolerância a falhas e desacoplamento de serviços.',
    category: 'Full-Stack & Cloud Architecture',
    iconName: 'Cpu',
    features: [
      'Arquitetura Hexagonal (Ports & Adapters) e Domain-Driven Design (DDD)',
      'APIs RESTful e GraphQL com documentação OpenAPI / Swagger automatizada',
      'Modelagem relacional e NoSQL resiliente com migrations controladas',
      'Autenticação segura (OAuth2, JWT, RBAC) e auditoria de logs'
    ],
    deliverables: [
      'Código-fonte tipado e documentado',
      'Pipeline de CI/CD automatizado',
      'Infraestrutura como Código (Terraform/Docker)',
      'Painel de telemetria e métricas de desempenho'
    ],
    metricHighlight: {
      value: '< 80ms',
      label: 'Latência média de processamento de API'
    },
    sampleCode: {
      filename: 'OrderProcessor.service.ts',
      language: 'typescript',
      code: `// Clean Architecture / Domain Driven
export class ProcessOrderUseCase implements IUseCase<OrderInput, OrderResult> {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly paymentGateway: IPaymentGateway,
    private readonly eventBus: IEventBus
  ) {}

  async execute(input: OrderInput): Promise<OrderResult> {
    const order = Order.create(input);
    await this.orderRepo.save(order);
    
    const payment = await this.paymentGateway.authorize(order);
    if (!payment.isApproved) {
      throw new PaymentDeclinedException(payment.reason);
    }
    
    await this.eventBus.publish(new OrderConfirmedEvent(order.id));
    return { success: true, orderId: order.id.value };
  }
}`
    }
  },
  {
    id: 'websites-performance',
    title: 'Websites & Landing Pages de Alta Performance',
    tagline: 'Experiências visuais interativas, carregamento ultrarrápido e foco total em conversão B2B.',
    description: 'Transformamos visitantes em clientes com interfaces modernas, WebGL/3D cinematográfico e pontuação máxima no Google PageSpeed (Core Web Vitals LCP < 1.2s, INP < 50ms, CLS 0).',
    category: 'Creative Tech & CRO',
    iconName: 'Zap',
    features: [
      'Otimização cirúrgica de Core Web Vitals (LCP, INP, CLS)',
      'WebGL 3D interativo com Three.js e progressive enhancement',
      'Animações micro-interativas com GSAP e Lenis Smooth Scroll',
      'Estrutura de SEO técnico avançada com Schema.org JSON-LD'
    ],
    deliverables: [
      'Landing Page responsiva de 320px a 4K ultrawide',
      'Setup de GA4 / GTM com disparo de eventos e UTMs',
      'Formulários de alta conversão com validação instantânea',
      'Relatório de auditoria Lighthouse 95+'
    ],
    metricHighlight: {
      value: '99/100',
      label: 'Lighthouse Performance Score'
    },
    sampleCode: {
      filename: 'WebGLProgressiveLoader.ts',
      language: 'typescript',
      code: `// Dynamic progressive 3D enhancement with resource cleanup
export const initDynamicWebGL = async (container: HTMLElement) => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion || !window.WebGLRenderingContext) {
    return renderCssFallback(container);
  }

  const { SceneManager } = await import('./webgl/SceneManager');
  const scene = new SceneManager(container, {
    maxDPR: Math.min(window.devicePixelRatio, 2),
    enablePostProcessing: true,
  });

  scene.startRenderLoop();
  return () => scene.dispose();
};`
    }
  },
  {
    id: 'ia-automacoes',
    title: 'Agentes de IA & Automações Inteligentes',
    tagline: 'Orquestração de LLMs e fluxos operacionais autônomos para escalar seu negócio.',
    description: 'Desenvolvemos agentes autônomos e pipelines de automação inteligentes capazes de interpretar dados, integrar sistemas legados, qualificar leads em tempo real e executar tarefas complexas.',
    category: 'AI & Workflow Automation',
    iconName: 'Bot',
    features: [
      'Agentes autônomos com RAG (Retrieval-Augmented Generation) sobre seus dados',
      'Integrações com OpenAI, Anthropic Claude, Google Gemini e modelos locais',
      'Pipelines de automação de processos internos (ETL, WhatsApp, ERP, CRM)',
      'Guardrails de segurança para prevenir alucinações e vazamento de dados'
    ],
    deliverables: [
      'Agente inteligente customizado integrado à sua operação',
      'Painel de controle com logs e auditoria de respostas de IA',
      'Base vetorial indexada com busca semântica em tempo real',
      'Treinamento e documentação técnica para sua equipe'
    ],
    metricHighlight: {
      value: '24/7',
      label: 'Operação autônoma contínua'
    },
    sampleCode: {
      filename: 'AgentOrchestrator.ts',
      language: 'typescript',
      code: `// Multi-agent workflow execution engine
export class CustomerSupportAgent extends BaseAIAgent {
  async handleIncomingQuery(prompt: string, context: ClientContext): Promise<AgentAction> {
    const memory = await this.vectorStore.similaritySearch(prompt, { topK: 3 });
    const plan = await this.llm.generateExecutionPlan({
      systemRole: "LNTechLab Technical Orchestrator",
      userQuery: prompt,
      retrievedContext: memory,
      allowedTools: ["queryDatabase", "scheduleDemo", "triggerWebhook"]
    });

    return this.executeWithGuardrails(plan);
  }
}`
    }
  },
  {
    id: 'consultoria-refatoracao',
    title: 'Consultoria Técnica & Refatoração',
    tagline: 'Modernização de código legado, auditorias de segurança e tuning de infraestrutura.',
    description: 'Avaliamos a saúde técnica do seu sistema, eliminamos gargalos de performance, implementamos testes automatizados e guiamos sua equipe na adoção das melhores práticas de engenharia de software.',
    category: 'Code Quality & DevOps',
    iconName: 'Terminal',
    features: [
      'Auditoria de arquitetura, segurança e conformidade LGPD',
      'Refatoração guiada por testes (TDD) para desacoplamento de monólitos',
      'Otimização de consultas em bancos de dados e estratégias de cache Redis',
      'Setup de observabilidade com Prometheus, Grafana e OpenTelemetry'
    ],
    deliverables: [
      'Diagnóstico arquitetural e matriz de débito técnico',
      'Plano de ação prioritário com estimativas de ROI',
      'Refatoração de módulos críticos com garantia de zero downtime',
      'Workshops de capacitação em Clean Code e TypeScript'
    ],
    metricHighlight: {
      value: '0 Downtime',
      label: 'Migrações seguras com rollback automático'
    },
    sampleCode: {
      filename: 'BenchmarkAuditor.ts',
      language: 'typescript',
      code: `// Performance profiling & memory leak detection
export async function auditEndpointLatency(endpoint: string, iterations: number = 1000) {
  const metrics = new ExecutionMetrics();
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const res = await fetch(endpoint);
    const duration = performance.now() - start;
    metrics.record({ status: res.status, latencyMs: duration });
  }

  return {
    p95: metrics.calculatePercentile(95),
    p99: metrics.calculatePercentile(99),
    errorRate: metrics.getErrorRate(),
  };
}`
    }
  }
];
