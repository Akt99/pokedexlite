import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../services/pokeApi';

export type PokemonListItem = {
  name: string;
  url: string;
  types: string[];
};

export function usePokemonList(pageSize = 20) {
  const [page, setPage] = useState(0);
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const offset = page * pageSize;
        const data = await fetchPokemonList(pageSize, offset);

        if (!active) return;

        // 🔥 FETCH TYPES FOR EACH POKÉMON (page-sized only)
        const detailedPokemon: PokemonListItem[] = await Promise.all(
          data.results.map(async (p: any) => {
            const res = await fetch(p.url);
            const detail = await res.json();

            return {
              name: p.name,
              url: p.url,
              types: detail.types.map(
                (t: any) => t.type.name
              ),
            };
          })
        );

        if (!active) return;

        setPokemon(detailedPokemon);
        setTotal(data.count);
      } catch (err) {
        if (!active) return;
        setError('Failed to load Pokémon');
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [page, pageSize]);

  return {
    pokemon,
    page,
    setPage,
    total,
    pageSize,
    loading,
    error,
    nextPage: () => setPage((p) => p + 1),
    prevPage: () => setPage((p) => Math.max(0, p - 1)),
  };
}
