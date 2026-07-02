import { Marquee } from '@/components/ui/Marquee';
import { marqueeWords, profile } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24">
      <Marquee words={marqueeWords} />
      {/* Faixa final sempre escura, fechando a página com contraste */}
      <div className="flex flex-col items-center justify-between gap-4 bg-[#0d0d0d] px-6 py-8 text-[#f2efe9] sm:flex-row sm:px-12">
        <p className="font-display text-xl tracking-widest">
          {profile.name.toUpperCase()} <span className="text-[#ff2740]">★</span> {year}
        </p>
        <p className="text-sm text-[#b8b2a7]">
          Feito com Next.js, TypeScript, Tailwind CSS e Framer Motion.
        </p>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-lg uppercase tracking-widest text-[#ff2740] hover:underline"
        >
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
