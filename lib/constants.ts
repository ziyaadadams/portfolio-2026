// Constants for the portfolio

export const SITE_CONFIG = {
  title: 'Ziyaad Adams - Senior Salesforce Engineer',
  description: 'Enterprise developer specializing in Salesforce architecture, system integrations, and full-stack development',
  author: 'Ziyaad Adams',
  url: 'https://ziyaad-portfolio.com',
  socialLinks: {
    github: 'https://github.com/ziyaad',
    linkedin: 'https://linkedin.com/in/ziyaad-adams',
    email: 'ziyaad@example.com',
  },
};

export const NAV_ITEMS = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export const ANIMATION_CONFIG = {
  // Framer Motion transition durations (ms)
  duration: {
    instant: 0.2,
    fast: 0.5,
    normal: 0.8,
    slow: 1.2,
  },
  // Stagger delays
  stagger: {
    container: 0.15,
    item: 0.1,
  },
  // Ease functions
  ease: {
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  },
};

export const COLORS = {
  background: '#0a0e27',
  card: '#1a1f3a',
  accentBlue: '#00d9ff',
  accentPurple: '#a78bfa',
  textPrimary: '#f0f9ff',
  textSecondary: '#a0aec0',
};

// 3D Scene optimization settings
export const THREE_D_CONFIG = {
  maxParticles: 500,
  geometrySegments: 32,
  cameraFov: 75,
  antialiasing: true,
  pixelRatio: 1,
};

// Responsive breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Assertion messages
export const MESSAGES = {
  formSuccess: 'Thank you! I will get back to you soon.',
  formError: 'Something went wrong. Please try again.',
  loadingScene: 'Loading 3D experience...',
};
