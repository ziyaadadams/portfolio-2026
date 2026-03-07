'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const techWords = [
  'APEX', 'LWC', 'FLOWS', 'SALESFORCE', 'MARKETING CLOUD',
  'DATA CLOUD', 'OMNISTUDIO', 'MULESOFT', 'SERVICE CLOUD',
  'CPQ', 'B2B COMMERCE', 'NPSP', 'NEXT.JS', 'TYPESCRIPT',
];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    // Animate the scrolling text
    tl.to('.preloader__text-track', {
      y: '-60%',
      duration: 2,
      ease: 'power2.inOut',
    })
      // Animate the split reveal
      .to(
        '.preloader__left',
        {
          xPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
        },
        '+=0.3'
      )
      .to(
        '.preloader__right',
        {
          xPercent: 100,
          duration: 0.8,
          ease: 'power4.inOut',
        },
        '<'
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader__wrapper">
        <div className="preloader__left">
          <div className="preloader__logo">
            Ziyaad<span>.</span>
          </div>
        </div>
        <div className="preloader__right">
          <div className="preloader__text">
            <div className="preloader__text-track">
              {techWords.map((word, i) => (
                <div key={i} className="preloader__text-item">
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
