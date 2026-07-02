'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { featuredProjects } from '@/lib/data';
import { GITHUB_USERNAME } from '@/lib/github';
import type { GitHubRepo } from '@/lib/types';

interface ProjectsProps {
  repos: GitHubRepo[];
}

export function Projects({ repos }: ProjectsProps) {
  // Enriquece os projetos em destaque com dados ao vivo da API
  const projects = featuredProjects.map((p) => {
    const live = repos.find((r) => r.name.toLowerCase() === p.repo.toLowerCase());
    return {
      ...p,
      stars: live?.stargazers_count ?? 0,
      forks: live?.forks_count ?? 0,
      url: live?.html_url ?? `https://github.com/${GITHUB_USERNAME}/${p.repo}`,
      homepage: live?.homepage || null,
    };
  });

  return (
    <section
      id="projetos"
      className="relative mx-auto max-w-6xl px-6 py-24"
      aria-label="Projetos em destaque"
    >
      <SectionHeading
        code="03"
        title="Projetos"
        subtitle="Seleção em destaque, direto do GitHub."
      />

      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.repo}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: (i % 2) * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
            className="group relative border-4 border-ink bg-card shadow-hard transition-shadow hover:shadow-hard-accent"
          >
            {/* Etiqueta de categoria rotacionada, estilo fita adesiva */}
            <span
              aria-hidden
              className="clip-tag absolute -top-4 left-6 z-10 -rotate-3 bg-accent px-4 py-1 font-display text-lg uppercase tracking-widest text-white"
            >
              {project.highlight}
            </span>

            <div className="p-8 pt-10">
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="font-display text-3xl uppercase leading-none tracking-wide transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <span className="whitespace-nowrap text-sm font-bold text-soft" aria-label={`${project.stars} estrelas`}>
                  ★ {project.stars}
                </span>
              </div>

              <p className="mb-6 leading-relaxed text-soft">{project.description}</p>

              <ul className="mb-8 flex flex-wrap gap-2" aria-label="Tecnologias do projeto">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="clip-tag border-2 border-soft/40 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-soft"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, skewX: -6 }}
                  whileTap={{ scale: 0.95 }}
                  className="clip-tag bg-ink px-5 py-2 font-display text-lg uppercase tracking-widest text-base transition-colors hover:bg-accent hover:text-white"
                >
                  Repositório ↗
                </motion.a>
                {project.homepage && (
                  <motion.a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06, skewX: -6 }}
                    whileTap={{ scale: 0.95 }}
                    className="clip-tag border-2 border-ink px-5 py-2 font-display text-lg uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
                  >
                    Demo ↗
                  </motion.a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <a
          href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-2xl uppercase tracking-widest text-accent underline decoration-4 underline-offset-8 transition-colors hover:text-ink"
        >
          Ver todos os repositórios →
        </a>
      </motion.p>
    </section>
  );
}
