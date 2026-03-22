'use client';

import { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 180;
const TWO_PI = Math.PI * 2;

interface Particle {
  cx: number;
  cy: number;
  radius: number;
  angle: number;
  speed: number;
  drift: number;
  driftDir: number;
  minR: number;
  maxR: number;
  size: number;
  colorOffset: number;
  colorSpeed: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// Blue-teal-white particles for dark backgrounds
function particleColorDark(phase: number, opacity: number): string {
  const t = (Math.sin(phase * TWO_PI) * 0.5) + 0.5;
  let r: number, g: number, b: number;
  if (t < 0.5) {
    // white → teal
    const s = t / 0.5;
    r = Math.round(lerp(255, 0, s));
    g = Math.round(lerp(255, 210, s));
    b = Math.round(lerp(255, 220, s));
  } else {
    // teal → blue
    const s = (t - 0.5) / 0.5;
    r = Math.round(lerp(0, 30, s));
    g = Math.round(lerp(210, 130, s));
    b = Math.round(lerp(220, 255, s));
  }
  return `rgba(${r},${g},${b},${opacity.toFixed(3)})`;
}

// Dark particles for light backgrounds
function particleColorLight(phase: number, opacity: number): string {
  // Dark gray to charcoal
  const t = (Math.sin(phase * TWO_PI) * 0.5) + 0.5;
  const val = Math.round(lerp(60, 120, t));
  return `rgba(${val},${val},${val + 10},${opacity.toFixed(3)})`;
}

function makeParticle(W: number, H: number): Particle {
  const angle = Math.random() * TWO_PI;
  const minR  = 20 + Math.random() * 80;
  const maxR  = minR + 40 + Math.random() * 140;
  const radius = minR + Math.random() * (maxR - minR);
  return {
    cx:           Math.random(),
    cy:           Math.random(),
    radius,
    angle,
    speed:        (0.0002 + Math.random() * 0.0005) * (Math.random() < 0.5 ? 1 : -1),
    drift:        0.008 + Math.random() * 0.018,
    driftDir:     Math.random() < 0.5 ? 1 : -1,
    minR,
    maxR,
    size:         0.8 + Math.random() * 2.2,
    colorOffset:  Math.random(),
    colorSpeed:   0.00006 + Math.random() * 0.00012,
    opacity:      0.3 + Math.random() * 0.5,
    opacityTarget:0.3 + Math.random() * 0.5,
    opacitySpeed: 0.0004 + Math.random() * 0.0008,
  };
}

export function ParticleBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  // Detect theme
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const particles: Particle[] = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialise particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(makeParticle(W, H));
    }

    let running = true;
    let last = 0;

    // Handle visibility change for performance
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        running = false;
      } else {
        running = true;
        last = performance.now();
        requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      // Fill with appropriate background
      ctx.fillStyle = isDark ? '#0a0a0a' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        // Advance angle
        p.angle += p.speed * dt;

        // Pulsing orbit radius
        p.radius += p.drift * p.driftDir * dt * 0.04;
        if (p.radius > p.maxR) { p.driftDir = -1; }
        if (p.radius < p.minR) { p.driftDir =  1; }

        // Opacity breathing
        p.opacity += (p.opacityTarget - p.opacity) * p.opacitySpeed * dt;
        if (Math.abs(p.opacity - p.opacityTarget) < 0.02) {
          p.opacityTarget = 0.25 + Math.random() * 0.55;
        }

        // Colour phase advance
        p.colorOffset = (p.colorOffset + p.colorSpeed * dt) % 1;

        // World position
        const x = p.cx * W + Math.cos(p.angle) * p.radius;
        const y = p.cy * H + Math.sin(p.angle) * p.radius;

        // Skip if outside canvas
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;

        const color = isDark 
          ? particleColorDark(p.colorOffset, Math.max(0, Math.min(1, p.opacity)))
          : particleColorLight(p.colorOffset, Math.max(0, Math.min(1, p.opacity)));

        // Soft glow
        const glowR = p.size * 3.5;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        const baseAlpha = Math.max(0, Math.min(1, p.opacity)) * 0.3;
        grd.addColorStop(0, color.replace(/[\d.]+\)$/, `${baseAlpha})`));
        grd.addColorStop(1, isDark ? 'rgba(0,0,0,0)' : 'rgba(250,250,250,0)');
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, TWO_PI);
        ctx.fillStyle = grd;
        ctx.fill();

        // Solid dot core
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, TWO_PI);
        ctx.fillStyle = color;
        ctx.fill();
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame((now) => { last = now; requestAnimationFrame(tick); });

    return () => {
      running = false;
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
