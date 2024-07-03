import { useEffect, useState } from 'react';
import NavBar from './components/nav-bar/NavBar';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/nav-bar/NumResults';
import Box from './components/Box';
import Main from './components/main/Main';
import MovieList from './components/main/movie-list/MovieList';
import WatchedSummary from './components/main/watched-list/WatchedSummary';
import WatchedMoviesList from './components/main/watched-list/WatchedMoviesList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const API_KEY = 'API_KEY';

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const query = 'asdfa';

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
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
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} />}
        </Box>
        <Box>
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        </Box>
      </Main>
    </>
  );
}

export default App;
