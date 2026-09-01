import { FAQItem } from '../types';

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Como a LNTechLab garante a qualidade e performance dos projetos?',
    answer: 'Trabalhamos com princípios rigorosos de engenharia de software: arquitetura desacoplada (SOLID/DDD), TypeScript estrito, testes automatizados e medições contínuas de Core Web Vitals (Google PageSpeed 95+). Cada entrega passa por auditorias de segurança e performance.',
    category: 'Engenharia & Qualidade'
  },
  {
    question: 'Qual é o prazo médio para desenvolvimento de um projeto?',
    answer: 'O cronograma varia conforme o escopo: Landing Pages de alta performance costumam ser entregues em 1 a 2 semanas. Softwares sob medida e Agentes de IA são estruturados em sprints de 2 semanas com entregas contínuas funcionais e transparentes.',
    category: 'Prazos & Entregas'
  },
  {
    question: 'Os efeitos visuais 3D e animações deixam o site lento?',
    answer: 'Não. Utilizamos dynamic import e progressive enhancement: a cena Three.js só carrega após os elementos críticos do DOM estarem renderizados. Em dispositivos móveis ou com preferência de movimento reduzido, aplicamos renderização otimizada ou fallback CSS leve.',
    category: 'Performance & 3D'
  },
  {
    question: 'Como funcionam os Agentes de IA e automações na prática?',
    answer: 'Desenvolvemos agentes treinados com base nas regras do seu negócio e dados internos protegidos (RAG). Eles se conectam aos seus sistemas existentes (CRM, WhatsApp, ERP, banco de dados) para executar tarefas repetitivas e atender clientes de forma autônoma 24/7.',
    category: 'Inteligência Artificial'
  },
  {
    question: 'O código-fonte desenvolvido pertence à minha empresa?',
    answer: 'Sim, 100%. Todo o código-fonte, arquitetura, documentação e infraestrutura desenvolvidos pela LNTechLab são de propriedade exclusiva do cliente, sem taxas ocultas ou dependências proprietárias travadas.',
    category: 'Comercial & Propriedade'
  }
];
