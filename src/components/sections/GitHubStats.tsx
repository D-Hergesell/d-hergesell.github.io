'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { fallbackStats, languageColors } from '@/lib/data';
import { GITHUB_USERNAME } from '@/lib/github';
import type { GitHubData } from '@/lib/types';

interface GitHubStatsProps {
  data: GitHubData;
}

/*
  Esta seção tem fundo sempre escuro, independente do tema —
  um painel de contraste no estilo de menu de jogo. Por isso as
  cores aqui são fixas em vez de usar os tokens que invertem.
*/

function StatCard({ label, value, index }: { label: string; value: string | number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ rotate: index % 2 === 0 ? -2 : 2, scale: 1.05 }}
      className="clip-slant border-4 border-[#f2efe9] bg-[#141414] p-6 text-center shadow-[6px_6px_0_0_#e60023]"
    >
      <p className="font-display text-6xl leading-none text-[#ff2740]">{value}</p>
      <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#b8b2a7]">{label}</p>
    </motion.div>
  );
}

export function GitHubStats({ data }: GitHubStatsProps) {
  const { user, languages, totalStars, loading, error } = data;

  const useFallback = error || (!loading && !user);
  const stats = [
    {
      label: 'Repositórios',
      value: user?.public_repos ?? fallbackStats.publicRepos,
    },
    { label: 'Seguidores', value: user?.followers ?? fallbackStats.followers },
    { label: 'Estrelas', value: useFallback ? fallbackStats.stars : totalStars },
    {
      label: 'No GitHub desde',
      value: user ? new Date(user.created_at).getFullYear() : fallbackStats.memberSince,
    },
  ];

  const langTotals =
    Object.keys(languages).length > 0 ? languages : fallbackStats.languages;
  const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0) || 1;
  const topLanguages = Object.entries(langTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, bytes]) => ({
      name,
      percent: (bytes / totalBytes) * 100,
      color: languageColors[name] ?? '#e60023',
    }));

  return (
    <section
      id="github"
      className="relative overflow-hidden bg-[#0d0d0d] py-24 text-[#f2efe9]"
      aria-label="Estatísticas do GitHub"
    >
      <div aria-hidden className="halftone absolute inset-0 text-[#e60023] opacity-10" />
      <div
        aria-hidden
        className="stripes absolute -top-3 left-0 h-6 w-full -skew-y-1"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          code="05"
          title="GitHub"
          invert
          subtitle={
            loading
              ? 'Consultando a API pública do GitHub…'
              : useFallback
                ? 'API do GitHub indisponível no momento — exibindo os últimos dados conhecidos.'
                : 'Números ao vivo, direto da API pública do GitHub.'
          }
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} label={s.label} value={s.value} index={i} />
          ))}
        </div>

        {/* Linguagens mais usadas */}
        <Reveal className="mt-16">
          <h3 className="mb-6 font-display text-3xl uppercase tracking-wider">
            Linguagens mais usadas
          </h3>
          <ul className="space-y-4">
            {topLanguages.map((lang, i) => (
              <li key={lang.name}>
                <div className="mb-1 flex items-baseline justify-between font-bold">
                  <span className="uppercase tracking-wider">{lang.name}</span>
                  <span className="text-[#ff2740]">{lang.percent.toFixed(1)}%</span>
                </div>
                <div
                  className="h-4 -skew-x-12 border-2 border-white/25 bg-white/10"
                  role="progressbar"
                  aria-valuenow={Math.round(lang.percent)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${lang.name}: ${lang.percent.toFixed(1)}% do código`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                    style={{ backgroundColor: lang.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Gráfico de contribuições (serviço externo ghchart) */}
        <Reveal className="mt-16">
          <h3 className="mb-6 font-display text-3xl uppercase tracking-wider">
            Contribuições no último ano
          </h3>
          <div className="clip-slant overflow-x-auto border-4 border-white/20 bg-white/5 p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/e60023/${GITHUB_USERNAME}`}
              alt={`Gráfico de contribuições de ${GITHUB_USERNAME} no GitHub no último ano`}
              loading="lazy"
              className="min-w-[640px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
