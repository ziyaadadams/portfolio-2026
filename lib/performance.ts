// Performance monitoring and optimization utilities

export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
  label: string;
  delta?: number;
}) {
  // Send to analytics
  if (typeof window !== 'undefined') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value.toFixed(0),
      rating: getRating(metric.name, metric.value),
    });
  }
}

function getRating(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  // Web Vitals thresholds (https://web.dev/vitals/)
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 600, poor: 1200 },
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return 'needs-improvement';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

// Disable animations on reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

// Detect WebGL support
export function supportsWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('webgl2'))
    );
  } catch (e) {
    return false;
  }
}

// Check device capabilities
export function getDeviceCapabilities() {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      supportsWebGL: false,
      hasTouch: false,
      cores: 4,
      memory: 8,
    };
  }

  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone/.test(ua);
  const isTablet = /iPad|Android/.test(ua) && !/Mobile/.test(ua);
  const hasTouch = 'ontouchstart' in window;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 8;

  return {
    isMobile,
    isTablet,
    supportsWebGL: supportsWebGL(),
    hasTouch,
    cores,
    memory,
  };
}

// Optimize 3D scene based on device
export function get3DOptimization() {
  const capabilities = getDeviceCapabilities();
  
  return {
    // Particle count based on memory
    particleCount: capabilities.memory > 6 ? 500 : 200,
    
    // Geometry detail based on cores
    geometryDetail: capabilities.cores > 4 ? 32 : 16,
    
    // Disable effects on mobile
    enablePostProcessing: !capabilities.isMobile,
    
    // Reduce shadow rendering on low-end devices
    enableShadows: capabilities.memory > 4,
    
    // Animation frame rate
    targetFPS: capabilities.isMobile ? 30 : 60,
  };
}
