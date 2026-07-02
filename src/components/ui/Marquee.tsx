'use client';

interface MarqueeProps {
  words: readonly string[];
  className?: string;
}

/**
 * Faixa de texto em loop contínuo, lembrando os letreiros
 * de transição de P5R. Decorativa — escondida de leitores de tela
 * e pausada quando o usuário prefere menos movimento.
 */
export function Marquee({ words, className = '' }: MarqueeProps) {
  const content = words.map((w) => `${w} ★ `).join('');

  return (
    <div
      aria-hidden
      className={`relative -skew-y-1 overflow-hidden border-y-4 border-ink bg-accent py-3 ${className}`}
    >
      <div className="flex w-max animate-marquee whitespace-nowrap font-display text-2xl tracking-[0.3em] text-white">
        <span className="px-4">{content}</span>
        <span className="px-4">{content}</span>
      </div>
    </div>
  );
}
