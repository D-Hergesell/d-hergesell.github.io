'use client';

import { useEffect, useState } from 'react';
import { countStars, fetchLanguages, fetchRepos, fetchUser } from '@/lib/github';
import type { GitHubData } from '@/lib/types';

const initialState: GitHubData = {
  user: null,
  repos: [],
  languages: {},
  totalStars: 0,
  loading: true,
  error: false,
};

/**
 * Busca os dados públicos do GitHub no cliente.
 * Em caso de falha (offline, rate limit), o site continua funcional
 * com os dados estáticos de fallback definidos em lib/data.ts.
 */
export function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const [user, repos] = await Promise.all([
          fetchUser(controller.signal),
          fetchRepos(controller.signal),
        ]);
        const languages = await fetchLanguages(repos, controller.signal);
        setData({
          user,
          repos,
          languages,
          totalStars: countStars(repos),
          loading: false,
          error: false,
        });
      } catch {
        if (!controller.signal.aborted) {
          setData((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    })();

    return () => controller.abort();
  }, []);

  return data;
}
