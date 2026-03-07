'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface HexCell {
  id: number;
  x: number;
  y: number;
  glow: number; // 0–1, fades out over time
}

const HEX_SIZE = 40;        // flat-to-flat width in px
const GAP = 2;              // gap between hexagons
const FADE_SPEED = 0.025;   // per frame fade rate
const GLOW_COLOR = '0, 255, 200'; // cyan-ish glow in RGB

function buildGrid(w: number, h: number) {
  const cells: HexCell[] = [];
  // Pointy-top hexagonal grid
  const hexW = HEX_SIZE + GAP;
  const hexH = (HEX_SIZE * Math.sqrt(3)) / 2 + GAP;
  const cols = Math.ceil(w / hexW) + 2;
  const rows = Math.ceil(h / hexH) + 2;

  let id = 0;
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const offset = col % 2 === 0 ? 0 : hexH / 2;
      cells.push({
        id: id++,
        x: col * hexW,
        y: row * hexH + offset,
        glow: 0,
      });
    }
  }
  return cells;
}

function hexClipPath(size: number): string {
  const r = size / 2;
  const h = (size * Math.sqrt(3)) / 4;
  // Flat-top hex: 6 points
  return `polygon(${r}px 0%, ${size}px ${h}px, ${size}px ${h * 3}px, ${r}px ${size * 0.866}px, 0% ${h * 3}px, 0% ${h}px)`;
}

export function HexagonBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HexCell[]>([]);
  const rafRef = useRef<number>(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    });
    obs.observe(el);
    setDims({ w: el.offsetWidth, h: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (dims.w && dims.h) {
      cellsRef.current = buildGrid(dims.w, dims.h);
    }
  }, [dims]);

  // Animate fade-out loop
  useEffect(() => {
    let active = true;
    const tick = () => {
      if (!active) return;
      let changed = false;
      cellsRef.current = cellsRef.current.map((c) => {
        if (c.glow > 0) {
          changed = true;
          return { ...c, glow: Math.max(0, c.glow - FADE_SPEED) };
        }
        return c;
      });
      if (changed) forceUpdate((n) => n + 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hexW = HEX_SIZE + GAP;
    const hexH = (HEX_SIZE * Math.sqrt(3)) / 2 + GAP;

    // Find the closest cell
    let closest = -1;
    let closestDist = Infinity;
    cellsRef.current.forEach((c, i) => {
      const cx = c.x + HEX_SIZE / 2;
      const cy = c.y + (HEX_SIZE * Math.sqrt(3)) / 4;
      const dist = Math.hypot(mx - cx, my - cy);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    if (closest !== -1 && closestDist < Math.max(hexW, hexH)) {
      cellsRef.current = cellsRef.current.map((c, i) =>
        i === closest ? { ...c, glow: 1 } : c
      );
    }
  }, []);

  const clipPath = hexClipPath(HEX_SIZE);

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLDivElement>}
      style={{ pointerEvents: 'auto' }}
    >
      {cellsRef.current.map((cell) => (
        <div
          key={cell.id}
          style={{
            position: 'absolute',
            left: cell.x,
            top: cell.y,
            width: HEX_SIZE,
            height: (HEX_SIZE * Math.sqrt(3)) / 2,
            clipPath,
            backgroundColor:
              cell.glow > 0
                ? `rgba(${GLOW_COLOR}, ${cell.glow * 0.35})`
                : 'rgba(255,255,255,0.03)',
            boxShadow:
              cell.glow > 0
                ? `0 0 ${12 * cell.glow}px rgba(${GLOW_COLOR}, ${cell.glow * 0.8})`
                : 'none',
            transition: 'background-color 0.08s ease',
            willChange: 'background-color, box-shadow',
          }}
        />
      ))}
    </div>
  );
}
