import { useState } from 'react';
import { tempMovieData, tempWatchedData } from './data/static';
import NavBar from './components/nav-bar/NavBar';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/nav-bar/NumResults';
import Box from './components/Box';
import Main from './components/main/Main';
import MovieList from './components/main/movie-list/MovieList';
import WatchedSummary from './components/main/watched-list/WatchedSummary';
import WatchedMoviesList from './components/main/watched-list/WatchedMoviesList';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies} />
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
