/**
 * Conteúdo estático do portfólio.
 * Serve de fallback quando a API do GitHub não responde
 * e concentra os textos editáveis do site em um único lugar.
 */

export const profile = {
  name: 'Diego Hergesell',
  username: 'D-Hergesell',
  role: 'Desenvolvedor Back-end & Mobile',
  tagline: 'Java · Spring Boot · Android',
  avatarUrl: 'https://avatars.githubusercontent.com/u/182292507?v=4',
  githubUrl: 'https://github.com/D-Hergesell',
  email: 'diegohergesell2@gmail.com',
  location: 'Brasil',
  bio: [
    'Sou um desenvolvedor brasileiro focado em back-end com Java e Spring Boot e em desenvolvimento Android nativo. Gosto de construir sistemas completos — da modelagem do banco à experiência no aplicativo.',
    'Meu principal projeto é o ecossistema Lista Smart: uma API REST com autenticação JWT, gamificação e ingestão de notas fiscais (NFC-e), acompanhada de um app Android que lê QR Codes e sincroniza dados offline/online.',
    'Fora do trabalho com aplicações, estudo algoritmos e estruturas de dados e exploro computação quântica com Qiskit — porque todo bom truque merece ser entendido por dentro.',
  ],
} as const;

export const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#tecnologias', label: 'Tecnologias' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#experiencia', label: 'Jornada' },
  { href: '#github', label: 'GitHub' },
  { href: '#contato', label: 'Contato' },
] as const;

export interface SkillGroup {
  title: string;
  code: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Back-end',
    code: '01',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'JWT / Auth', 'PostgreSQL', 'NeonDB', 'Docker'],
  },
  {
    title: 'Mobile',
    code: '02',
    skills: ['Android nativo', 'Java (Android SDK)', 'Leitura de QR Code', 'Sincronização offline-first'],
  },
  {
    title: 'Web',
    code: '03',
    skills: ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'React'],
  },
  {
    title: 'Fundamentos & Pesquisa',
    code: '04',
    skills: ['Algoritmos e grafos', 'Estruturas de dados', 'Dijkstra / Min-Heap', 'Computação quântica', 'Qiskit', 'Git & GitHub'],
  },
];

export interface FeaturedProject {
  /** nome exato do repositório no GitHub, usado para enriquecer com dados da API */
  repo: string;
  title: string;
  description: string;
  tags: string[];
  highlight: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    repo: 'lista-smart-api',
    title: 'Lista Smart API',
    description:
      'Backend REST do app Lista Smart com Spring Boot e PostgreSQL/NeonDB: autenticação JWT, gamificação com pontos e ranks, e ingestão de NFC-e com resolução plug-and-play (mock/SEFAZ) e anti-duplicidade por chave de acesso.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Docker'],
    highlight: 'Back-end',
  },
  {
    repo: 'ListaSmartScanner',
    title: 'Lista Smart Scanner',
    description:
      'App Android para registro colaborativo de preços via leitura de QR Code de NFC-e, com login JWT, gamificação (pontos e ranking) e sincronização offline/online.',
    tags: ['Android', 'Java', 'QR Code', 'Offline-first'],
    highlight: 'Mobile',
  },
  {
    repo: 'dijkstra-capitais-brasil',
    title: 'Dijkstra — Capitais do Brasil',
    description:
      'Caminho mais barato entre capitais do Brasil usando Dijkstra com Min-Heap, considerando custo de combustível e pedágios, com interface pixel-art.',
    tags: ['JavaScript', 'Algoritmos', 'Grafos', 'Min-Heap'],
    highlight: 'Algoritmos',
  },
  {
    repo: 'studying-quantum-computing',
    title: 'Estudos de Computação Quântica',
    description:
      'Repositório pessoal de estudos sobre computação quântica — algoritmos, fundamentos matemáticos e implementações com Qiskit.',
    tags: ['Qiskit', 'Python', 'Pesquisa'],
    highlight: 'Pesquisa',
  },
];

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

/** Jornada inferida a partir da atividade pública no GitHub */
export const timeline: TimelineEntry[] = [
  {
    period: '2024',
    title: 'Início da jornada pública',
    description:
      'Criação do perfil no GitHub e primeiros passos com projetos próprios, consolidando fundamentos de programação e versionamento com Git.',
  },
  {
    period: '2025 — 2026',
    title: 'Ecossistema Lista Smart',
    description:
      'Desenvolvimento full-cycle do Lista Smart: API REST em Spring Boot com JWT, gamificação e ingestão de NFC-e, junto de um app Android com leitura de QR Code e sincronização offline/online.',
  },
  {
    period: '2026',
    title: 'Algoritmos & Computação Quântica',
    description:
      'Aprofundamento em grafos e estruturas de dados (Dijkstra com Min-Heap aplicado às capitais do Brasil) e estudos de computação quântica com Qiskit.',
  },
];

export const marqueeWords = [
  'JAVA',
  'SPRING BOOT',
  'ANDROID',
  'POSTGRESQL',
  'ALGORITMOS',
  'QISKIT',
  'REST APIs',
  'TYPESCRIPT',
] as const;

/** Cores aproximadas do GitHub para as linguagens mais comuns do perfil */
export const languageColors: Record<string, string> = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  CSS: '#663399',
  HTML: '#e34c26',
  Dockerfile: '#384d54',
  'Jupyter Notebook': '#DA5B0B',
};

/** Fallback dos números exibidos quando a API do GitHub está indisponível */
export const fallbackStats = {
  publicRepos: 5,
  followers: 3,
  stars: 0,
  memberSince: 2024,
  languages: {
    Java: 173699,
    CSS: 14384,
    JavaScript: 10540,
    HTML: 3228,
  } satisfies Record<string, number>,
};
