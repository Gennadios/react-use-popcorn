import { useEffect, useState } from 'react';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
            { signal: controller.signal }
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
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
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

      return () => controller.abort();
    },
    [query]
  );

  return { movies, isLoading, error };
}
