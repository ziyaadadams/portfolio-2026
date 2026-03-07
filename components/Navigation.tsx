'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#sectionProjects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to('.menu-overlay', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      duration: 0.8,
      ease: 'power4.inOut',
    })
      .from(
        '.menu-link',
        {
          y: 80,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .from(
        '.menu-footer',
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.out',
        },
        '-=0.3'
      );

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;

    if (isOpen) {
      tlRef.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tlRef.current.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    const scrollContainer = document.querySelector('.scroll-container');

    if (targetElement && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const offsetInContainer = targetRect.top - containerRect.top;
      window.scrollTo({ top: offsetInContainer, behavior: 'instant' as ScrollBehavior });
    }

    // Close mobile overlay if open
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Glassmorphic Island Navbar */}
      <nav className={`nav-island ${scrolled ? 'nav-island--scrolled' : ''}`}>
        <a href="#home" className="nav-island__logo" onClick={(e) => scrollToSection(e, '#home')}>
          Z<span>.</span>
        </a>

        <div className="nav-island__links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-island__link" onClick={(e) => scrollToSection(e, link.href)}>
              {link.name}
            </a>
          ))}
        </div>

        <button
          className="nav-island__menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
        </button>
      </nav>

      {/* Full screen overlay */}
      <div
        ref={overlayRef}
        className="menu-overlay"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      >
        <nav className="menu-nav">
          <ul className="menu-links">
            {navLinks.map((link) => (
              <li key={link.name} className="menu-link-wrapper">
                <a
                  href={link.href}
                  className="menu-link"
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-footer">
            <a href="https://github.com/ziyaadadams" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/ziyaad-adams-8b0b001a2" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:ziyaada22@gmail.com">
              Email
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
