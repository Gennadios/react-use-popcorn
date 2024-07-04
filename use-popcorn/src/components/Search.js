function Search({ query, setQuery }) {
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
