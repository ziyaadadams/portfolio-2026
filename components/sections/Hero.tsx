'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3 });

      tl.from('.hero-heading span', {
        y: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      })
        .from(
          '.hero-cta',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          '.header__footer',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="header-wrapper">
      <header className="header">
        <div className="header__hero">
          <div className="hero-heading header__hero--heading">
            <span>architecting enterprise </span> <br />
            <span>Salesforce </span>
            <span className="header__hero--heading-gradient">solutions </span>
            <br />
            <span>is my calling.</span>
          </div>
          <a className="hero-cta header__hero--cta" href="#sectionProjects">
            VIEW PROJECTS
          </a>
        </div>
      </header>
      <div className="header__footer">
        <div className="header__footer--left">
          <span>BASED IN SOUTH AFRICA</span>
        </div>
        <div className="header__footer--right">
          <a href="https://github.com/ziyaadadams" rel="noopener" target="_blank">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/ziyaad-adams-8b0b001a2" rel="noopener" target="_blank">
            LINKEDIN
          </a>
          <a href="https://trailhead.salesforce.com" rel="noopener" target="_blank">
            TRAILHEAD
          </a>
        </div>
      </div>
    </div>
  );
}
