import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  pokemon: {
    name: string;
    image: string;
    types: string[];
    stats: { name: string; value: number }[];
  } | null;
};

export default function PokemonDetailModal({ open, onClose, pokemon }: Props) {
  if (!open || !pokemon) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <img src={pokemon.image} alt={pokemon.name} />

        <h2 style={{ textTransform: 'capitalize' }}>
          {pokemon.name}
        </h2>

        <div className="modal-types">
          {pokemon.types.map((t) => (
            <span key={t} className={`type-badge ${t}`}>
              {t}
            </span>
          ))}
        </div>

        <ul className="modal-stats">
          {pokemon.stats.map((s) => (
            <li key={s.name}>
              {s.name}: {s.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
