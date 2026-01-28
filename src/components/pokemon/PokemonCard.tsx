import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import FavoriteButton from './FavoriteButton';

type Props = {
  name: string;
  url: string;
};

function getIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export default function PokemonCard({ name, url }: Props) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const id = getIdFromUrl(url);

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div
      className="pokemon-card"
      onClick={() => navigate(`/pokemon/${name}`)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <FavoriteButton
        active={isFavorite(id)}
        onClick={() => toggleFavorite({ id, name })}
      />

      <img
      src={image}
      alt={name}
      onError={(e) => {
      const img = e.currentTarget as HTMLImageElement;
    // replace with a small placeholder shipped with your app (put placeholder.png in /public)
      img.src = '/placeholder.png';
      img.style.objectFit = 'contain';
  }}
/>

      <p style={{ textTransform: 'capitalize' }}>{name}</p>
    </div>
  );
}
