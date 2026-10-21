export enum Page {
  HOME = 'HOME',
  OPS = 'OPS',
  LOGS = 'LOGS',
  LAB = 'LAB',
  INITIATE = 'INITIATE',
}

export interface NavItem {
  id: Page;
  label: string;
  path: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  tag: string;
  result: string;
  bottleneck: string;
  solution: string;
  metrics: string[];
  category: string;
  status: 'AUDITED' | 'ONGOING' | 'SCALED';
  quarter: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}
