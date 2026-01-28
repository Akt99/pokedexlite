import { useParams, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import Loader from '../components/common/Loader';

export default function PokemonDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { pokemon, loading, error } = usePokemonDetail(name!);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!pokemon) return null;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)}>← Back to HomePage</button>

      {/* TITLE */}
      <h2 style={{ textTransform: 'capitalize', marginTop: 16 }}>
        {pokemon.name}
      </h2>

      {/* IMAGE */}
      <div className="detail-image">
        <img
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>

      {/* CONTENT */}
      <div className="detail-sections">
        {/* STATS */}
        <div className="detail-card">
          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((s) => (
              <li key={s.name}>
                <strong>{s.name}</strong>: {s.value}
              </li>
            ))}
          </ul>
        </div>

        {/* ABILITIES */}
        <div className="detail-card">
          <h3>Abilities</h3>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
