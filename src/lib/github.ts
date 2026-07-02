import type { GitHubRepo, GitHubUser, LanguageTotals } from './types';

const API = 'https://api.github.com';

export const GITHUB_USERNAME = 'D-Hergesell';

async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

export function fetchUser(signal?: AbortSignal): Promise<GitHubUser> {
  return getJSON<GitHubUser>(`${API}/users/${GITHUB_USERNAME}`, signal);
}

export function fetchRepos(signal?: AbortSignal): Promise<GitHubRepo[]> {
  return getJSON<GitHubRepo[]>(
    `${API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    signal,
  );
}

/**
 * Agrega bytes por linguagem dos repositórios próprios (não-forks).
 * Limitado a poucos repositórios para respeitar o rate limit anônimo da API.
 */
export async function fetchLanguages(
  repos: GitHubRepo[],
  signal?: AbortSignal,
): Promise<LanguageTotals> {
  const own = repos.filter((r) => !r.fork).slice(0, 10);
  const results = await Promise.allSettled(
    own.map((r) => getJSON<LanguageTotals>(r.languages_url, signal)),
  );

  const totals: LanguageTotals = {};
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    for (const [lang, bytes] of Object.entries(result.value)) {
      totals[lang] = (totals[lang] ?? 0) + bytes;
    }
  }
  return totals;
}

export function countStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, r) => sum + r.stargazers_count, 0);
}
