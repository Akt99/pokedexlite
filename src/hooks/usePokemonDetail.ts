import { useEffect, useState } from 'react';
import axios from 'axios';

type PokemonDetail = {
  name: string;
  image: string;
  stats: { name: string; value: number }[];
  abilities: string[];
};

export function usePokemonDetail(name: string) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        if (!active) return;

        setPokemon({
          name: res.data.name,
          image:
            res.data.sprites.other['official-artwork'].front_default,
          stats: res.data.stats.map((s: any) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          abilities: res.data.abilities.map(
            (a: any) => a.ability.name
          ),
        });
      } catch {
        if (active) setError('Failed to load Pokémon');
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [name]);

  return { pokemon, loading, error };
}
