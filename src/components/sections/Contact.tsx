'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Star } from '@/components/ui/Star';
import { profile } from '@/lib/data';

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível (ex.: contexto não seguro) — o mailto continua funcionando
    }
  }

  return (
    <section
      id="contato"
      className="relative mx-auto max-w-6xl px-6 py-24"
      aria-label="Contato"
    >
      <SectionHeading
        code="06"
        title="Contato"
        subtitle="Bora tirar a próxima ideia do papel."
      />

      <div className="relative overflow-hidden border-4 border-ink bg-accent p-10 shadow-hard sm:p-16">
        <div aria-hidden className="halftone absolute inset-0 text-white opacity-15" />
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
          className="absolute -right-8 -top-8 text-white/30"
        >
          <Star className="h-32 w-32" />
        </motion.div>

        <div className="relative">
          <p className="max-w-2xl font-display text-4xl uppercase leading-tight text-white sm:text-6xl">
            Vamos construir algo
            <span className="text-ink"> memorável</span>?
          </p>
          <p className="mt-4 max-w-xl text-white/90">
            Aberto a colaborações, projetos e boas conversas sobre back-end, Android,
            algoritmos e computação quântica.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.06, rotate: -1.5 }}
              whileTap={{ scale: 0.94 }}
              className="clip-tag bg-ink px-8 py-3 font-display text-xl uppercase tracking-widest text-base"
            >
              Enviar e-mail
            </motion.a>
            <motion.button
              type="button"
              onClick={copyEmail}
              whileHover={{ scale: 1.06, rotate: 1.5 }}
              whileTap={{ scale: 0.94 }}
              aria-live="polite"
              className="clip-tag border-2 border-white px-8 py-3 font-display text-xl uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-accent"
            >
              {copied ? 'Copiado! ★' : profile.email}
            </motion.button>
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, rotate: -1.5 }}
              whileTap={{ scale: 0.94 }}
              className="clip-tag border-2 border-white px-8 py-3 font-display text-xl uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-accent"
            >
              GitHub ↗
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
