# LNTechLab — Landing Page Comercial & Institucional de Alta Performance

> **Engenharia de Software Sob Medida, Websites de Alto Impacto e Agentes Inteligentes de IA.**  
> Arquitetura moderna com **React 19**, **TypeScript**, **Three.js (WebGL 3D)**, **GSAP**, **Lenis Smooth Scroll**, **Tailwind CSS v4**, e validação com **Zod / React Hook Form**.

---

## 🚀 1. Visão Geral e Posicionamento de Marca

A **LNTechLab** é uma operação de engenharia de software de alta precisão e tecnologia criativa focada em resolver desafios digitais complexos para empresas B2B. A experiência digital foi desenvolvida com base em 5 pilares fundamentais:

1. **Alta Conversão B2B (CRO):** Proposta de valor explícita no primeiro viewport, briefing técnico direto sem fricção de formulários longos e canais diretos integrados.
2. **Performance Extrema (Core Web Vitals):** Arquitetura desenhada para obter pontuações máximas (LCP < 1.0s, INP < 30ms, CLS 0, Lighthouse 99+).
3. **Estética Geek / Cyberpunk Sofisticada:** Dark mode nativo com paleta oficial (`#0B0F19`, `#0052FF`, `#00FFFF`, `#FF00FF`), processador quântico 3D (Cyber Kernel), grafos de arquitetura vivos e varredura laser de segurança.
4. **Acessibilidade (WCAG 2.2 AA):** Estrutura semântica HTML5 estrita, alto contraste, suporte total a navegação por teclado e respeito a `prefers-reduced-motion`.
5. **Segurança & LGPD:** Validação client-side com Zod, proteção Honeypot anti-bot e conformidade rigorosa com privacidade.

---

## 🎨 2. Paleta de Cores e Tokens Oficiais

| Token | Nome Oficial | HEX | Função no Design System |
| :--- | :--- | :--- | :--- |
| `--color-ln-bg` | **Azul Noturno** | `#0B0F19` | Background base da aplicação e superfícies escuras |
| `--color-ln-surface` | **Superfície Escura** | `#111726` | Cards de interface, modais e containers HUD |
| `--color-ln-blue` | **Azul Elétrico** | `#0052FF` | Identidade principal, botões de ação primária |
| `--color-ln-cyan` | **Ciano Neon** | `#00FFFF` | Acento de destaque, nós ativos e glows de sucesso |
| `--color-ln-purple` | **Roxo Neon** | `#FF00FF` | Badges especiais, realces e interações secundárias |

### Tipografia
- **Inter (`font-sans`):** Textos institucionais, botões e elementos de leitura rápida.
- **Fira Code (`font-mono`):** Blocos de código, terminais interativos, identificadores e métricas de telemetria.

---

## 🛠️ 3. Recursos & Animações Exclusivas

### 💻 3D Cyber Kernel (Hero Section)
- Processador 3D de silício em camadas com o emblema `<LN>` gravado a laser.
- 4 placas holográficas flutuantes com código real (`async/await`, `<LNTechLab />`, `AES-256`, `Telemetry`) orbitando o núcleo.
- Anéis de barramento de dados neon e partículas atmosféricas que reagem à paralaxe do mouse em 60fps.

### 📜 Live Code Streams (01. Soluções)
- Múltiplas colunas de código (TypeScript, AI Agent, Rust, Shaders) sendo digitadas caractere a caractere com cursor neon e subindo suavemente ao longo de toda a altura da seção.

### 🌐 Architecture Graph Constellation (02. Stack)
- Constelação viva de nós representando a stack (`TypeScript`, `React 19`, `Fastify`, `PostgreSQL`, `Redis`, `Docker`, `AI`), com pacotes de dados luminosos percorrendo as conexões em tempo real.
- Terminal interativo multilinguagem (`LIVE_CODE_PREVIEW`) com cópia em 1 clique e abas de arquitetura.

### 🛡️ Security Laser Scan (03. Metodologia)
- Feixe de laser neon varrendo a seção continuamente, ativando verificações de qualidade e auditoria (`>95% Test Coverage`, `AES-256-GCM`, `Zero Downtime`, `Strict RBAC`).

### 📱 Hardware Mockups Interativos (04. Portfólio)
- Estruturas de MacBook Pro e iPhone renderizadas em CSS com alternância dinâmica de projetos e métricas de performance comprovadas.

---

## 📂 4. Estrutura de Pastas

```text
src/
├── components/
│   ├── forms/            # Formulário Zod, Modal de Sucesso com Confete, Termos LGPD
│   │   ├── ContactForm.tsx
│   │   ├── FormSuccessModal.tsx
│   │   └── PrivacyModal.tsx
│   ├── layout/           # Navbar, Footer institucional, WhatsApp flutuante, Cookies
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   ├── WhatsAppFloat.tsx
│   │   └── CookieConsent.tsx
│   ├── sections/         # Dobras da Landing Page
│   │   ├── Preloader.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SolutionsSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── MethodologySection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/               # Botões magnéticos, Badges, Terminais, Mockups e Backgrounds
│   │   ├── ArchitectureGraphBackground.tsx
│   │   ├── CodeStreamsBackground.tsx
│   │   ├── QualityScanBackground.tsx
│   │   ├── TerminalWindow.tsx
│   │   ├── HudCard.tsx
│   │   ├── SectionHeading.tsx
│   │   └── DeviceMockup.tsx
│   └── webgl/            # Cena 3D Three.js do Cyber Kernel com Fallback SVG
│       ├── BackgroundCanvas.tsx
│       ├── PolyhedralScene.ts
│       └── FallbackScene.tsx
├── config/               # Configurações centralizadas, dados do portfólio e snippets
├── hooks/                # useLenis, useMediaQuery, useTypewriter
├── lib/                  # Utilitários cn, analytics, sintetizador Web Audio API
├── styles/               # globals.css (Tailwind v4 @theme, scanlines, glow effects)
├── types/                # Interfaces TypeScript estritas
├── App.tsx               # Orquestrador da aplicação
└── main.tsx              # Ponto de entrada React 19
```

---

## ⚡ 5. Como Executar Localmente

### Pré-requisitos
- **Node.js:** Versão 18+ (recomendado Node 20 LTS ou 24).
- **Gerenciador de Pacotes:** `npm`, `pnpm` ou `yarn`.

### Comandos

```bash
# 1. Instalar as dependências
npm install

# 2. Executar o servidor de desenvolvimento
npm run dev

# 3. Compilar para produção (TypeCheck + Build Vite)
npm run build

# 4. Pré-visualizar o build de produção
npm run preview

# 5. Regerar o currículo oficial em PDF (se necessário)
npm run generate:resume
```

---

## 👨‍💻 6. Autor & Contato

- **Desenvolvedor:** Lucas Nascimento — *Software Engineer (Pleno) | Full Stack & Backend*
- **GitHub:** [https://github.com/luscanascimento](https://github.com/luscanascimento)
- **LinkedIn:** [linkedin.com/in/lucas-nascimento-0b773a16a](https://linkedin.com/in/lucas-nascimento-0b773a16a)
- **E-mail:** [lucasnascimentocontato@gmail.com](mailto:lucasnascimentocontato@gmail.com)
- **Repositório:** `git@github.com:luscanascimento/lntechlab.git`

---

© 2026 **LNTechLab** — *Engenharia de Software, Interfaces de Alto Impacto & Agentes Inteligentes.*
