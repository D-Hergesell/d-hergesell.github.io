'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { timeline } from '@/lib/data';

export function Experience() {
  return (
    <section
      id="experiencia"
      className="relative mx-auto max-w-6xl px-6 py-24"
      aria-label="Experiência e jornada"
    >
      <SectionHeading
        code="04"
        title="Jornada"
        subtitle="Linha do tempo inferida da atividade pública no GitHub."
      />

      <ol className="relative ml-4 border-l-4 border-ink pl-10">
        {timeline.map((entry, i) => (
          <li key={entry.period} className="relative mb-14 last:mb-0">
            {/* Nó angular sobre a linha */}
            <motion.span
              aria-hidden
              initial={{ scale: 0, rotate: 45 }}
              whileInView={{ scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="absolute -left-[3.35rem] top-1 block h-5 w-5 border-4 border-ink bg-accent"
            />
            <Reveal delay={i * 0.1}>
              <span className="clip-tag inline-block bg-ink px-3 py-0.5 font-display text-lg tracking-[0.2em] text-base">
                {entry.period}
              </span>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-wide">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-soft">{entry.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
