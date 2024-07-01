import { tempMovieData, tempWatchedData } from './data/static';

function App() {
  return (
    <>
      <NavBar />;
      <Main />
    </>
  );
}

function NavBar() {
  return (
    <nav className='nav-bar'>
      <div className='logo'>
        <span role='img'>🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input className='search' type='text' placeholder='Search movies...' />
      <p className='num-results'>
        Found <strong>[NUM]</strong> results
      </p>
    </nav>
  );
}

function Main() {
  return (
    <main className='main'>
      <div className='box'>
        <button className='btn-toggle'>+/-</button>
        <ul className='list'>
          {tempMovieData?.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className='box'>
        <button className='btn-toggle'>+/-</button>
        <>
          <div className='summary'>
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>NUM movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>RATING</span>
              </p>
              <p>
                <span>🌟</span>
                <span>AVG_RATING</span>
              </p>
              <p>
                <span>⏳</span>
                <span>AVG_RUN_TIME min</span>
              </p>
            </div>
          </div>

          <ul className='list'>
            {tempWatchedData.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      </div>
    </main>
  );
}

export default App;
