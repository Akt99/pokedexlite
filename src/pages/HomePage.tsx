import React, { useState } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import PokemonCard from '../components/pokemon/PokemonCard';
import { useDebounce } from '../hooks/useDebounce';
import { POKEMON_TYPES } from '../utils/constants';
import Loader from '../components/common/Loader';

export default function HomePage() {
  const {
    pokemon,
    loading,
    error,
    page,
    setPage,
    nextPage,
    prevPage,
  } = usePokemonList(20);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [selectedType, setSelectedType] = useState<string>('');

  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesType = selectedType
      ? p.types.includes(selectedType)
      : true;

    return matchesSearch && matchesType;
  });

  return (
    <div className="container">
        <div style={{ marginBottom: 20 }}>

      <h1 className="pokedex-title">Pokédex Lite</h1>
      <h5 className="pokedex-subtitle"> (Page {page + 1}) </h5>
    </div>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px 12px',
          marginBottom: 16,
          width: '100%',
          maxWidth: 300,
        }}
      />

      {/* TYPE FILTER */}
      <select
        value={selectedType}
        
        onChange={(e) => {
          setSelectedType(e.target.value);
          setPage(0); // UX FIX: reset pagination on filter change
        }}
        style={{
          padding: 8,
          marginBottom: 16,
          marginLeft: 8,
        }}
      >
        <option value="">All Types</option>
        {POKEMON_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {loading && <Loader / >}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="pokemon-grid">
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>

      {/* EMPTY STATE MESSAGE */}
      {!loading && filteredPokemon.length === 0 && (
      <p style={{ marginTop: 16, color: '#666' }}>
       No Pokémon of this type on the current page.
       Try the next page.
       (It happens because filter works on current page data only. Keep clicking next till you find the pokemons)
     </p>
       )}

      {/* PAGINATION */}
      <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
        <button onClick={prevPage} disabled={page === 0}>
          Prev
        </button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
