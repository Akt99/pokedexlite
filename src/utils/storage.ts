export type FavoritePokemon = {
  id: number;
  name: string;
};

const KEY = 'favorite-pokemon';

export function getFavorites(): FavoritePokemon[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveFavorites(favs: FavoritePokemon[]) {
  localStorage.setItem(KEY, JSON.stringify(favs));
}
