import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { profile } from '@/lib/data';
import './globals.css';

const display = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = 'https://d-hergesell.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Portfólio`,
    template: `%s | ${profile.name}`,
  },
  description: `Portfólio de ${profile.name}, ${profile.role.toLowerCase()} — ${profile.tagline}. Projetos, tecnologias e estatísticas do GitHub.`,
  keywords: ['Diego Hergesell', 'desenvolvedor', 'Java', 'Spring Boot', 'Android', 'portfólio', 'back-end'],
  authors: [{ name: profile.name, url: profile.githubUrl }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: `${profile.name} — Portfólio`,
    description: `Projetos e habilidades de ${profile.name}: ${profile.tagline}.`,
    images: [{ url: profile.avatarUrl, width: 460, height: 460, alt: profile.name }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} — Portfólio`,
    description: `Projetos e habilidades de ${profile.name}: ${profile.tagline}.`,
    images: [profile.avatarUrl],
  },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f4f1ea' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl,
  image: profile.avatarUrl,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  sameAs: [profile.githubUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} bg-base font-body text-ink antialiased transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
