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
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'youtube' | 'target' | 'database';
}
