'use client';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile } from '@/lib/data';
import type { GitHubUser } from '@/lib/types';

interface AboutProps {
  user: GitHubUser | null;
}

export function About({ user }: AboutProps) {
  // Se o usuário adicionar uma bio no GitHub, ela substitui o primeiro parágrafo
  const paragraphs: string[] = user?.bio
    ? [user.bio, ...profile.bio.slice(1)]
    : [...profile.bio];

  const facts = [
    { label: 'Base', value: user?.location ?? profile.location },
    { label: 'Foco', value: 'Back-end & Mobile' },
    { label: 'Stack principal', value: 'Java · Spring · Android' },
    { label: 'Explorando', value: 'Computação quântica' },
  ];

  return (
    <section id="sobre" className="relative mx-auto max-w-6xl px-6 py-24" aria-label="Sobre mim">
      <SectionHeading code="01" title="Sobre" subtitle="Quem eu sou, direto ao ponto." />

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {paragraphs.map((text, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className="border-l-4 border-accent pl-5 text-lg leading-relaxed text-soft">
                {text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <dl className="clip-slant space-y-5 border-4 border-ink bg-card p-8 shadow-hard-accent">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-soft/40 pb-3">
                <dt className="font-display text-lg uppercase tracking-widest text-accent">
                  {fact.label}
                </dt>
                <dd className="text-right font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
