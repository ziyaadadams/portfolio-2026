'use client';

import { useTheme } from '@/components/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const currentOption = options.find(o => o.value === theme) || options[0];
  const Icon = currentOption.icon;

  // Prevent hydration mismatch - don't render until mounted
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-[var(--color-muted)]/50 border border-[var(--color-border)]" />
    );
  }

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-muted)]/50 hover:bg-[var(--color-muted)] transition-colors border border-[var(--color-border)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTheme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-5 h-5 text-[var(--color-foreground)]" />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] shadow-xl backdrop-blur-xl p-1 z-50"
          >
            {options.map((option) => {
              const OptionIcon = option.icon;
              const isActive = theme === option.value;
              
              return (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]' 
                      : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <OptionIcon className="w-4 h-4" />
                  {option.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTheme"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-current"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
