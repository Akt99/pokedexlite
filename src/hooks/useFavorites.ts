import { useEffect, useState } from 'react';
import { getFavorites, saveFavorites } from '../utils/storage';
import type { FavoritePokemon } from '../utils/storage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function toggleFavorite(pokemon: FavoritePokemon) {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === pokemon.id);

      const updated = exists
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon];

      saveFavorites(updated);
      return updated;
    });
  }

  function isFavorite(id: number) {
    return favorites.some((p) => p.id === id);
  }

  return { favorites, toggleFavorite, isFavorite };
}
