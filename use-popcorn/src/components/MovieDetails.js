function MovieDetails({ selectedId, onCloseMovieDetails }) {
  return (
    <div className='detail'>
      <button class='btn-back' onClick={onCloseMovieDetails}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
}

export default MovieDetails;
