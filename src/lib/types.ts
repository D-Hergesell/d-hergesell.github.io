export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
  pushed_at: string;
}

/** Total de bytes por linguagem, agregado entre repositórios */
export type LanguageTotals = Record<string, number>;

export interface GitHubData {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  languages: LanguageTotals;
  totalStars: number;
  loading: boolean;
  error: boolean;
}
