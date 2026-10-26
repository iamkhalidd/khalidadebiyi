// The three things Khalid does. The whole site is tinted by the active one.
export type Mode = 'break' | 'build' | 'trade';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  category?: 'project' | 'product' | 'wip';
  modes: Mode[];
  // New fields for enhanced project display
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  longDescription?: string;
  techStack?: string[];
  challenge?: string;
  solution?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // We will map string names to Lucide icons in the component
  mode: Mode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum SkillCategory {
  CYBERSECURITY = 'Cybersecurity',
  DEVELOPMENT = 'Development',
  CLOUD = 'Cloud',
  TRADING = 'Forex & Trading',
  DESIGN = 'Design'
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  badgeUrl?: string;
  category: 'cybersecurity' | 'cloud' | 'development' | 'other';
}