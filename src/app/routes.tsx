import { createBrowserRouter, Outlet, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FavouritesPage from '../pages/FavoritesPage';
import PokemonDetailPage from '../pages/PokemonDetailPage';

function RootLayout() {
  return (
    <>
      <header
        style={{
          padding: '12px 24px',
          borderBottom: '1px solid #ddd',
          background: '#fff',
        }}
      >
        <nav style={{ display: 'flex', gap: 16 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/favorites" style={{ textDecoration: 'none' }}>
            ⭐ Favorites
          </Link>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'favorites', element: <FavouritesPage /> },
      { path: 'pokemon/:name', element: <PokemonDetailPage /> },
    ],
  },
]);
