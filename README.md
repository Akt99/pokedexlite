# Pokédex Lite

Pokédex Lite is a modern, responsive web application built using React and TypeScript that allows users to explore Pokémon data fetched from the public PokéAPI.  
Users can browse Pokémon with pagination, search and filter them by type, mark favorites, and view detailed Pokémon information.

---



## Challenges Faced & Solutions

### Client-Side Routing in Production

**Problem:**
Refreshing routes such as `/pokemon/pikachu` resulted in **404 errors** after deployment because the hosting platform attempted to resolve routes on the server instead of the client.

**Solution:**
Configured platform-specific **rewrite rules** to redirect all requests to `index.html`, allowing **React Router** to correctly handle client-side navigation.

---

### Pokémon Image Resolution Issues

**Problem:**
Pokémon image URLs differed based on whether data was fetched using a Pokémon **name** or **ID**, leading to inconsistent or broken images.

**Solution:**
Extracted the Pokémon ID from the API URL and dynamically constructed the **official artwork image URL**, with proper fallback handling to ensure images always render correctly.

---

### Performance During Search

**Problem:**
Filtering the Pokémon list on every keystroke caused unnecessary re-renders and reduced performance.

**Solution:**
Implemented a **debounced search mechanism** using a custom `useDebounce` hook to limit state updates and improve UI responsiveness.

---

### Persisting Favorites

**Problem:**
Favorite Pokémon selections were lost on page refresh.

**Solution:**
Stored favorites in **localStorage** and synchronized them across the app using a dedicated `useFavorites` custom hook.

---

## Possible Enhancements

* Server-side pagination with caching
* Type badges and themed Pokémon cards
* Skeleton loaders for improved user experience
* Accessibility improvements (ARIA roles, keyboard navigation)
* Unit and integration tests


## Features

- Fetches Pokémon data from PokéAPI
- Paginated Pokémon listing
- Search Pokémon by name (debounced)
- Filter Pokémon by type
- Mark Pokémon as favorites
- Persist favorites using localStorage
- Dedicated Favorites page
- Pokémon detail view including:
  - Official artwork
  - Base stats
  - Abilities
- Global loading indicator
- Fully responsive UI (mobile, tablet, desktop)

---

## Tech Stack & Libraries

### Frontend
- **React 18** – Component-based UI with hooks
- **TypeScript** – Type safety and better developer experience
- **Vite** – Fast development server and optimized production builds

### Routing
- **react-router-dom** – Client-side routing for page navigation

### State & Utilities
- **Custom React Hooks**
  - `usePokemonList`
  - `usePokemonDetail`
  - `useFavorites`
  - `useDebounce`
- **localStorage** – Persist favorite Pokémon across sessions

### UI & Styling
- **CSS (Global styles)** – Lightweight styling without external frameworks
- **Lucide React** – Icon set for UI elements
- **JetBrains Mono** – Monospace font for a niche, developer-centric look

### API
- **PokéAPI** – Public REST API for Pokémon data

---

## Installation & Running Locally
1. Clone the repository
`git clone https://github.com/Akt99/Pokedex-Lite.git`
`cd Pokedex-Lite`
2. Install dependencies
`npm install`
3. Start the development server
`npm run dev`

The app will be available at:

http://localhost:5173
