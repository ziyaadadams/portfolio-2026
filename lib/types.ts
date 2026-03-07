// Type definitions for the portfolio

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  company: string;
  description: string;
  technologies: string[];
  impact: string;
  color: string;
}

export interface TimelineItem {
  period: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  title: string;
  skills: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface AnimationVariants {
  hidden: any;
  visible: any;
}

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  supportsWebGL: boolean;
  hasTouch: boolean;
  cores: number;
  memory: number;
}
