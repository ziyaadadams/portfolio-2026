'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const words = [
  'SALESFORCE', 'APEX', 'LWC', 'FLOWS', 'MARKETING CLOUD',
  'DATA CLOUD', 'OMNISTUDIO', 'MULESOFT', 'SERVICE CLOUD',
  'CPQ', 'NEXT.JS', 'TYPESCRIPT', 'REACT', 'NODE.JS',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate content for seamless loop
    const content = track.innerHTML;
    track.innerHTML = content + content;

    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div className="marquee">
      <div className="marquee__track" ref={trackRef}>
        {words.map((word, i) => (
          <span key={i} className="marquee__word">
            {word}
            <span className="marquee__separator">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
