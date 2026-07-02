'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { P5Button } from '@/components/ui/P5Button';
import { Marquee } from '@/components/ui/Marquee';
import { Star } from '@/components/ui/Star';
import { marqueeWords, profile } from '@/lib/data';
import type { GitHubUser } from '@/lib/types';

interface HeroProps {
  user: GitHubUser | null;
}

/** Estilhaços angulares vermelhos que compõem o fundo do hero */
function Shards() {
  const reduce = useReducedMotion();
  const shards = [
    { clip: 'polygon(0 0, 100% 20%, 60% 100%)', className: 'hidden sm:block left-[-8%] top-[10%] h-72 w-72 bg-accent/90' },
    { clip: 'polygon(20% 0, 100% 40%, 0 100%)', className: 'right-[-6%] top-[18%] h-96 w-96 bg-ink/85 dark:bg-white/5' },
    { clip: 'polygon(50% 0, 100% 100%, 0 80%)', className: 'bottom-[8%] left-[12%] h-52 w-52 bg-accent/70' },
    { clip: 'polygon(0 30%, 100% 0, 70% 100%)', className: 'bottom-[20%] right-[16%] h-40 w-40 bg-accent' },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {shards.map((s, i) => (
        <motion.div
          key={i}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.15 * i, type: 'spring', stiffness: 120, damping: 14 }}
          style={{ clipPath: s.clip }}
          className={`absolute ${s.className}`}
        />
      ))}
      <div className="halftone absolute inset-y-0 right-0 w-1/3 text-ink opacity-[0.14] dark:opacity-[0.08]" />
    </div>
  );
}

export function Hero({ user }: HeroProps) {
  const avatar = user?.avatar_url ?? profile.avatarUrl;
  const name = user?.name ?? profile.name;
  const [firstName, ...rest] = name.split(' ');

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      <Shards />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="clip-tag mb-4 inline-block bg-ink px-4 py-1 font-display text-lg uppercase tracking-[0.25em] text-base"
          >
            ★ {profile.role}
          </motion.p>

          <h1 className="font-display uppercase leading-[0.9]">
            <motion.span
              initial={{ opacity: 0, y: 60, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 140, damping: 16 }}
              className="block text-7xl tracking-wide sm:text-8xl lg:text-9xl"
            >
              {firstName}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ delay: 0.45, type: 'spring', stiffness: 140, damping: 16 }}
              className="text-outline-accent block text-7xl tracking-wide sm:text-8xl lg:text-9xl"
            >
              {rest.join(' ') || 'Dev'}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-xl text-lg text-soft"
          >
            {profile.tagline}. Construo APIs robustas, apps Android e experiências
            que prendem a atenção — sempre com código limpo e intenção.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <P5Button href="#projetos">Ver projetos</P5Button>
            <P5Button href="#contato" variant="outline">
              Contato
            </P5Button>
          </motion.div>
        </div>

        {/* Avatar em moldura irregular estilo colagem */}
        <motion.div
          initial={{ opacity: 0, rotate: 8, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 14 }}
          className="relative mx-auto w-64 sm:w-80"
        >
          <div aria-hidden className="clip-shard absolute inset-0 translate-x-4 translate-y-4 bg-accent" />
          <div className="clip-shard relative border-4 border-ink bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt={`Avatar de ${name} no GitHub`}
              width={460}
              height={460}
              className="h-auto w-full grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
            className="absolute -right-6 -top-6 text-accent"
          >
            <Star className="h-14 w-14" />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-16">
        <Marquee words={marqueeWords} />
      </div>
    </section>
  );
}
