import { useEffect, useState } from 'react';
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

const API_KEY = 'API_KEY';

function App() {
  const [query, setQuery] = useState('inception');
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
          );
          if (!res.ok) {
            throw new Error('Something went wrong with fetching movies.');
          }

          const data = await res.json();
          if (data.Response === 'False') {
            throw new Error('No movies found');
          }

          setMovies(data.Search);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();
    },
    [query]
  );

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovieDetails() {
    setSelectedId(null);
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
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
