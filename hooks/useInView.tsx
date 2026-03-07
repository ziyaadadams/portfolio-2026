'use client';

import { useEffect, useState } from 'react';

export function useInView(options: {
  threshold?: number | number[];
  triggerOnce?: boolean;
}) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce) {
          observer.unobserve(ref);
        }
      }
    }, {
      threshold: options.threshold || 0.1,
    });

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.triggerOnce, options.threshold]);

  return { ref, inView };
}

export default useInView;
