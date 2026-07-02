'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  /** numeração decorativa da seção, ex: "02" */
  code: string;
  title: string;
  subtitle?: string;
  /** para seções de fundo sempre escuro, independente do tema */
  invert?: boolean;
}

/**
 * Título de seção no estilo "carimbo": bloco vermelho inclinado
 * com eco vazado atrás.
 */
export function SectionHeading({ code, title, subtitle, invert }: SectionHeadingProps) {
  return (
    <div className="relative mb-14">
      <span
        aria-hidden
        className={`${invert ? 'text-outline-light' : 'text-outline'} pointer-events-none absolute -top-8 left-0 select-none font-display text-7xl uppercase opacity-20 sm:text-8xl`}
      >
        {title}
      </span>
      <motion.div
        initial={{ opacity: 0, x: -60, skewX: 0 }}
        whileInView={{ opacity: 1, x: 0, skewX: -8 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="relative inline-block bg-accent px-6 py-2 shadow-hard"
      >
        <h2 className="skew-x-[8deg] font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
          <span aria-hidden className="mr-3 text-white/60">
            {code}
          </span>
          {title}
        </h2>
      </motion.div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`mt-4 max-w-2xl ${invert ? 'text-[#b8b2a7]' : 'text-soft'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
