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

const API_KEY = 'API_KEY';

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = 'fountain';

  useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
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
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>
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
