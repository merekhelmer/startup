import React from 'react';

const MovieList = ({ movies, sessionCode, onVote }) => {
  const handleVote = async (movieId) => {
    try {
      const response = await fetch(`/api/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode, movieId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      onVote(movieId);
      alert('Vote submitted successfully!');
    } catch (err) {
      console.error('Error submitting vote:', err);
      alert('Failed to submit vote. Please try again.');
    }
  };

  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <button onClick={() => handleVote(movie.id)}>Vote</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MovieList;
