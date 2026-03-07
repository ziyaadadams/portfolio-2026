'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set('.section-contact .heading-1', { y: 40, autoAlpha: 0 });
    gsap.set('.section-contact__h2', { y: 30, autoAlpha: 0 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.to('.section-contact .heading-1', {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'power3.out',
          }).to(
            '.section-contact__h2',
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.4'
          );
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-contact">
      <span className="section-label">04 // CONTACT</span>
      <h1 className="heading-1">
        <span>Sounds interesting? </span> <small>🤝</small>
      </h1>
      <h2 className="section-contact__h2">
        Feel free to reach out if you want to collaborate with me, or simply have a
        chat. You can reach me at{' '}
        <a href="mailto:ziyaada22@gmail.com">ziyaada22@gmail.com</a>
      </h2>
    </section>
  );
}
