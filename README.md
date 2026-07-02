# Diego Hergesell — Portfólio

Portfólio pessoal com design autoral inspirado na energia visual de **Persona 5 Royal**: paleta vermelho/preto/branco, tipografia de impacto, formas angulares, halftone e animações fluidas — sem usar nenhum recurso protegido do jogo.

**Site:** https://d-hergesell.github.io

## Stack

- **Next.js 15** (App Router, export estático para GitHub Pages)
- **TypeScript**
- **Tailwind CSS** (design tokens via CSS variables, modo claro/escuro com `next-themes`)
- **Framer Motion** (transições de seção, microinterações, menu animado)
- **API pública do GitHub** — avatar, bio, repositórios, estrelas e linguagens carregados em tempo real no cliente, com fallback estático se a API estiver indisponível

## Rodando localmente

Pré-requisito: Node.js 20+.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Build de produção

```bash
npm run build
```

O site estático é gerado na pasta `out/`.

## Deploy (GitHub Pages)

O workflow em `.github/workflows/deploy.yml` publica automaticamente a cada push na branch `main`.

Configuração única necessária: em **Settings → Pages** do repositório, defina **Source** como **GitHub Actions**.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # metadata/SEO, fontes, JSON-LD, ThemeProvider
│   ├── page.tsx          # página única
│   └── globals.css       # tokens de tema + utilitários (clip-paths, halftone...)
├── components/
│   ├── Portfolio.tsx     # composição + fetch único do GitHub
│   ├── layout/           # Navbar (menu mobile animado, toggle de tema), Footer
│   ├── sections/         # Hero, About, TechStack, Projects, Experience,
│   │                     # GitHubStats, Contact
│   ├── ui/               # SectionHeading, P5Button, Marquee, Reveal, Star
│   └── providers/        # ThemeProvider (next-themes)
├── hooks/
│   └── useGitHub.ts      # fetch client-side da API do GitHub com AbortController
└── lib/
    ├── data.ts           # todo o conteúdo editável (bio, projetos, skills, contato)
    ├── github.ts         # cliente da API do GitHub
    └── types.ts          # tipos compartilhados
```

## Personalização

Quase todo o conteúdo (bio, projetos em destaque, grupos de habilidades, linha do tempo, e-mail de contato) fica em [`src/lib/data.ts`](src/lib/data.ts). As cores do tema ficam em [`src/app/globals.css`](src/app/globals.css).

O gráfico de contribuições usa o serviço externo [ghchart.rshah.org](https://ghchart.rshah.org); os demais números vêm direto da API oficial do GitHub.

## Acessibilidade & performance

- Navegação por teclado com foco visível, skip link e landmarks semânticos
- `prefers-reduced-motion` respeitado (animações e marquee desativados)
- Contraste alto nos dois temas, `aria-label`s e textos alternativos
- Export 100% estático — sem servidor, carregamento rápido no GitHub Pages
