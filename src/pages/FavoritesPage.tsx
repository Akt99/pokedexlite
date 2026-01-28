import { useFavorites } from '../hooks/useFavorites';
import PokemonCard from '../components/pokemon/PokemonCard';

export default function FavouritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <h2>⭐ Favorite Pokémon</h2>

      {favorites.length === 0 && (
        <p style={{ color: '#666' }}>No favorites yet.</p>
      )}

      <div className="pokemon-grid">
        {favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            url={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`}
          />
        ))}
      </div>
    </div>
  );
}
