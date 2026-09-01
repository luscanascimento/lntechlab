export type ProjectType = 
  | 'software_custom' 
  | 'high_perf_web' 
  | 'ai_agents_automation' 
  | 'consulting_refactor';

export interface NavMenuItem {
  label: string;
  href: string;
  badge?: string;
  isCTA?: boolean;
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  category: string;
  features: string[];
  deliverables: string[];
  metricHighlight: {
    value: string;
    label: string;
  };
  sampleCode: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface TechStackItem {
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'cloud_devops' | 'webgl_3d';
  icon: string;
  tag: string;
  description: string;
  accentColor: 'cyan' | 'purple' | 'blue';
}

export interface MethodologyPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  principles: string[];
  terminalLog: string;
  iconName: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  tagline: string;
  clientSegment: string;
  category: string;
  description: string;
  architectureHighlights: string[];
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  mockupSnippet: {
    terminalCommand?: string;
    codePreview: string;
  };
}

export interface ContactFormData {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  projectType: ProjectType;
  budgetRange?: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
