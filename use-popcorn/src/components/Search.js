import { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');

  return (
    <input
      className='search'
      type='text'
      value={query}
      placeholder='Search movies...'
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
