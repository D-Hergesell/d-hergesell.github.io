'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface P5ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  external?: boolean;
}

/** Botão em paralelogramo com deslocamento de sombra na interação */
export function P5Button({ href, children, variant = 'solid', external }: P5ButtonProps) {
  const base =
    'clip-tag inline-block px-8 py-3 font-display text-xl uppercase tracking-widest transition-colors';
  const styles =
    variant === 'solid'
      ? 'bg-accent text-white hover:bg-ink hover:text-base'
      : 'border-2 border-ink bg-card text-ink hover:border-accent hover:text-accent';

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.06, rotate: -1.5 }}
      whileTap={{ scale: 0.94 }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}
