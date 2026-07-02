'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { navLinks, profile } from '@/lib/data';

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Evita divergência de hidratação: só renderiza o ícone no cliente
  if (!mounted) {
    return <div aria-hidden className="h-10 w-10" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileHover={{ rotate: 15, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className="clip-tag flex h-10 w-10 items-center justify-center bg-accent text-white"
    >
      {isDark ? (
        <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14l-1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </motion.button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Navegação principal"
        className="flex items-center justify-between border-b-4 border-ink bg-base/90 px-4 py-3 backdrop-blur-md sm:px-8"
      >
        <motion.a
          href="#inicio"
          whileHover={{ rotate: -4, scale: 1.05 }}
          className="clip-tag -skew-x-6 bg-ink px-4 py-1 font-display text-2xl tracking-widest text-base"
          aria-label="Voltar ao início"
        >
          DH<span className="text-accent">.</span>
        </motion.a>

        {/* Links — desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                whileHover={{ skewX: -12, scale: 1.08 }}
                className="inline-block px-3 py-1 font-display text-lg uppercase tracking-widest transition-colors hover:text-accent"
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Hamburguer — mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border-2 border-ink lg:hidden"
          >
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-6 bg-ink" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block h-0.5 w-6 bg-ink" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block h-0.5 w-6 bg-ink" />
          </button>
        </div>
      </nav>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[64px] z-40 bg-accent lg:hidden"
          >
            <ul className="flex h-full flex-col items-start justify-center gap-2 px-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl uppercase tracking-wider text-white transition-transform hover:translate-x-3 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="border-b-4 border-white font-display text-2xl uppercase tracking-widest text-white"
                >
                  github.com/{profile.username}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
