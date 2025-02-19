import { useEffect, useState } from 'react';
import { useLocalStorageState } from './hooks/use-local-storage-state';
import { useMovies } from './hooks/use-movies';
import Box from './components/Box';
import ErrorMessage from './components/ErrorMessage';
import Logo from './components/Logo';
import Loader from './components/Loader';
import Main from './components/main/Main';
import MovieDetails from './components/MovieDetails';
import MovieList from './components/main/movie-list/MovieList';
import NavBar from './components/nav-bar/NavBar';
import NumResults from './components/nav-bar/NumResults';
import Search from './components/Search';
import WatchedMoviesList from './components/main/watched-list/WatchedMoviesList';
import WatchedSummary from './components/main/watched-list/WatchedSummary';

function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovieDetails() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovieDetails={handleCloseMovieDetails}
              watched={watched}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
