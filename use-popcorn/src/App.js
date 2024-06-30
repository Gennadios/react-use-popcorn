import { tempMovieData, tempWatchedData } from './data/static';

function App() {
  return <NavBar />;
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

export default App;
