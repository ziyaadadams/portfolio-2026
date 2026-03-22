// Animation constants for consistent motion throughout the app
export const ANIMATION = {
  // Durations (in seconds)
  duration: {
    fast: 0.2,
    normal: 0.5,
    slow: 0.85,
  },
  // Easing curves
  easing: {
    smooth: [0.16, 1, 0.3, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    linear: [0, 0, 1, 1] as const,
  },
  // Stagger delays
  stagger: {
    fast: 0.03,
    normal: 0.055,
    slow: 0.08,
  },
  // Common transition presets
  transition: {
    fadeInUp: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
    scaleIn: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
} as const;

// Email obfuscation helper
export function getObfuscatedEmail(): string {
  const parts = ['ziyaada22', 'gmail.com'];
  return parts.join('@');
}

// Email as HTML entities for additional protection
export function getEncodedEmail(): string {
  return '&#122;&#105;&#121;&#97;&#97;&#100;&#97;&#50;&#50;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';
}
