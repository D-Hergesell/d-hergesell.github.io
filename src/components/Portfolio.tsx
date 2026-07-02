'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { TechStack } from '@/components/sections/TechStack';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { GitHubStats } from '@/components/sections/GitHubStats';
import { Contact } from '@/components/sections/Contact';
import { useGitHub } from '@/hooks/useGitHub';

/** Faixa diagonal listrada usada como divisor entre seções */
function SlantDivider() {
  return <div aria-hidden className="stripes h-5 w-full -skew-y-1 opacity-90" />;
}

/**
 * Composição do portfólio. Busca os dados do GitHub uma única vez
 * e distribui para as seções que dependem deles.
 */
export function Portfolio() {
  const github = useGitHub();

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      {/* Textura de meio-tom fixa, bem sutil, dá acabamento de impresso */}
      <div
        aria-hidden
        className="halftone pointer-events-none fixed inset-0 -z-10 text-ink opacity-[0.05]"
      />
      <Navbar />
      <main id="conteudo">
        <Hero user={github.user} />
        <About user={github.user} />
        <SlantDivider />
        <TechStack />
        <SlantDivider />
        <Projects repos={github.repos} />
        <Experience />
        <GitHubStats data={github} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
