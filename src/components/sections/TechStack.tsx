'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { skillGroups } from '@/lib/data';

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: i * 0.12, type: 'spring' as const, stiffness: 160, damping: 18 },
  }),
};

export function TechStack() {
  return (
    <section
      id="tecnologias"
      className="relative mx-auto max-w-6xl px-6 py-24"
      aria-label="Tecnologias e habilidades"
    >
      <div aria-hidden className="stripes absolute right-0 top-10 h-24 w-40 opacity-30" />
      <SectionHeading
        code="02"
        title="Tecnologias"
        subtitle="O arsenal de cada dia — do servidor ao aparelho."
      />

      <div className="grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <motion.article
            key={group.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ rotate: i % 2 === 0 ? -1 : 1, scale: 1.02 }}
            className={`clip-slant${i % 2 === 1 ? '-alt' : ''} border-4 border-ink bg-card p-8 shadow-hard transition-shadow hover:shadow-hard-accent`}
          >
            <header className="mb-6 flex items-center gap-4">
              <span
                aria-hidden
                className="clip-tag bg-accent px-3 py-1 font-display text-2xl text-white"
              >
                {group.code}
              </span>
              <h3 className="font-display text-3xl uppercase tracking-wider">{group.title}</h3>
            </header>
            <ul className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    className="clip-tag inline-block cursor-default border-2 border-ink bg-base px-3 py-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-accent hover:bg-accent hover:text-white"
                  >
                    {skill}
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
