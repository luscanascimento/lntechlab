import { TechStackItem } from '../types';

export const TECH_STACK: TechStackItem[] = [
  // Frontend & UI
  {
    name: 'React 19 & Next.js',
    category: 'frontend',
    icon: 'Layers',
    tag: 'UI Framework',
    description: 'Componentes reativos, Server Components, SSR e renderização otimizada.',
    accentColor: 'cyan',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: 'Code2',
    tag: 'Type Safety',
    description: 'Tipagem estrita estática de ponta a ponta eliminando 98% dos bugs de runtime.',
    accentColor: 'blue',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: 'Palette',
    tag: 'Styling',
    description: 'Design system atômico de zero runtime e utilitários de alta velocidade.',
    accentColor: 'cyan',
  },
  {
    name: 'GSAP & Lenis',
    category: 'frontend',
    icon: 'Activity',
    tag: 'Motion',
    description: 'Animações fluidas a 60/120fps com ScrollTrigger e inércia suave.',
    accentColor: 'purple',
  },

  // WebGL & 3D
  {
    name: 'Three.js & WebGL',
    category: 'webgl_3d',
    icon: 'Box',
    tag: '3D Graphics',
    description: 'Cenas 3D interativas, shaders customizados e poliedros com iluminação realista.',
    accentColor: 'cyan',
  },
  {
    name: 'GLSL Shaders',
    category: 'webgl_3d',
    icon: 'Sparkles',
    tag: 'GPU Shaders',
    description: 'Efeitos visuais procedurais calculados diretamente na placa gráfica.',
    accentColor: 'purple',
  },

  // Backend & APIs
  {
    name: 'Node.js & Fastify',
    category: 'backend',
    icon: 'Server',
    tag: 'API Engine',
    description: 'Serviços assíncronos de ultra-baixa latência e alto throughput.',
    accentColor: 'blue',
  },
  {
    name: 'Python',
    category: 'backend',
    icon: 'Terminal',
    tag: 'Data & AI',
    description: 'Engenharia de dados, automações assíncronas e orquestração de LLMs.',
    accentColor: 'cyan',
  },
  {
    name: 'PostgreSQL & Redis',
    category: 'backend',
    icon: 'Database',
    tag: 'Storage & Cache',
    description: 'Persistência relacional ACID com cache in-memory em microssegundos.',
    accentColor: 'purple',
  },

  // AI & Automation
  {
    name: 'LangChain & LlamaIndex',
    category: 'ai',
    icon: 'Cpu',
    tag: 'AI Framework',
    description: 'Cadeias de execução RAG, busca semântica vetorial e agentes de decisão.',
    accentColor: 'purple',
  },
  {
    name: 'OpenAI / Anthropic / Gemini',
    category: 'ai',
    icon: 'Bot',
    tag: 'LLM Engines',
    description: 'Integração com os modelos de linguagem mais avançados do mundo.',
    accentColor: 'cyan',
  },

  // DevOps & Cloud
  {
    name: 'Docker & Kubernetes',
    category: 'cloud_devops',
    icon: 'Container',
    tag: 'Containers',
    description: 'Ambientes padronizados, isolamento de microsserviços e escalabilidade elástica.',
    accentColor: 'blue',
  },
  {
    name: 'AWS / Cloudflare',
    category: 'cloud_devops',
    icon: 'Cloud',
    tag: 'Edge & Cloud',
    description: 'Deploy em borda global (Edge Network), proteção DDoS e CDN de alta velocidade.',
    accentColor: 'cyan',
  },
  {
    name: 'CI/CD GitHub Actions',
    category: 'cloud_devops',
    icon: 'GitBranch',
    tag: 'Automation',
    description: 'Testes automatizados, linting estrito e deploys contínuos sem fricção.',
    accentColor: 'purple',
  }
];

export const TERMINAL_SNIPPETS = {
  typescript: {
    title: 'domain-model.ts',
    lang: 'TypeScript',
    code: `// Domain Entity with Invariant Protection
export class DigitalProduct {
  private constructor(
    public readonly id: ProductId,
    private title: string,
    private price: Money,
    private status: ProductStatus
  ) {}

  public static create(props: CreateProductDTO): Result<DigitalProduct> {
    if (!props.title || props.title.length < 3) {
      return Result.fail("Título inválido: mínimo de 3 caracteres.");
    }
    return Result.ok(new DigitalProduct(
      ProductId.generate(),
      props.title,
      Money.fromBRL(props.amountInCents),
      ProductStatus.DRAFT
    ));
  }
}`
  },
  ai_agent: {
    title: 'ai-agent-pipeline.py',
    lang: 'Python',
    code: `# Autonomous Agent Execution Loop
from lntech_ai import Agent, ToolRegistry, MemoryEngine

agent = Agent(
    role="Lead Qualification & Tech Architect",
    memory=MemoryEngine(retrieval_k=5),
    tools=ToolRegistry.load(["calendar_sync", "crm_pipeline", "spec_generator"])
)

async def handle_enterprise_lead(briefing_payload: dict):
    analysis = await agent.run_chain(
        prompt="Analyze architectural requirements & estimate sprint roadmap",
        context=briefing_payload
    )
    return agent.generate_b2b_proposal(analysis)
`
  },
  ci_cd: {
    title: 'quality-gate.yml',
    lang: 'YAML',
    code: `name: LNTechLab Quality Gate
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Strict Typecheck
        run: npm run typecheck
      - name: Unit & Integration Tests
        run: npm run test:coverage -- --threshold=95
      - name: Core Web Vitals Audit
        run: npx lhci autorun --upload.target=temporary-public-storage
`
  },
  telemetry: {
    title: 'system-telemetry.json',
    lang: 'JSON',
    code: `{
  "system": "LNTechLab Production Cluster",
  "status": "HEALTHY",
  "metrics": {
    "api_p99_latency": "22.4ms",
    "cache_hit_ratio": "98.7%",
    "lighthouse_performance": 99,
    "security_headers": "A+",
    "uptime_30d": "99.992%"
  }
}`
  }
};
