'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

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

// Subtle neutral particles that work in both light and dark modes
function particleColor(phase: number, opacity: number, isDark: boolean): string {
  // Neutral gray particles - subtle in both modes
  const t = (Math.sin(phase * TWO_PI) * 0.5) + 0.5;
  
  // Dark mode: lighter particles on dark bg
  // Light mode: darker particles on light bg
  const minVal = isDark ? 120 : 80;
  const maxVal = isDark ? 200 : 140;
  
  const val = Math.round(lerp(minVal, maxVal, t));
  return `rgba(${val}, ${val}, ${val}, ${opacity.toFixed(3)})`;
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
    opacity:      0.15 + Math.random() * 0.45,
    opacityTarget:0.15 + Math.random() * 0.45,
    opacitySpeed: 0.0004 + Math.random() * 0.0008,
  };
}

export function ParticleBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();
  
  // Determine if dark mode is active
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

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

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(now - last, 50);
      last = now;

      // Clear canvas - transparent (shows body background)
      ctx.clearRect(0, 0, W, H);

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
          p.opacityTarget = 0.08 + Math.random() * 0.45;
        }

        // Colour phase advance
        p.colorOffset = (p.colorOffset + p.colorSpeed * dt) % 1;

        // World position
        const x = p.cx * W + Math.cos(p.angle) * p.radius;
        const y = p.cy * H + Math.sin(p.angle) * p.radius;

        // Skip if outside canvas
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;

        const color = particleColor(p.colorOffset, Math.max(0, Math.min(1, p.opacity)), isDark);

        // Soft glow
        const glowR = p.size * 3.5;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        const baseAlpha = Math.max(0, Math.min(1, p.opacity)) * 0.25;
        grd.addColorStop(0, color.replace(/[\d.]+\)$/, `${baseAlpha})`));
        grd.addColorStop(1, 'rgba(0,0,0,0)');
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
