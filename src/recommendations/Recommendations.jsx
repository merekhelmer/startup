// Recommendations.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionCode = location.state?.sessionCode;
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const fetchSessionMovies = async () => {
      try {
        const response = await fetch(`/api/session/${sessionCode}/movies`);
        const data = await response.json();
        const uniqueMovies = Array.from(new Set(data.movies.map(movie => movie.imdbID)))
          .map(id => data.movies.find(movie => movie.imdbID === id));
        setMovies(uniqueMovies);

        // Fetch details for each movie
        const details = {};
        for (const movie of uniqueMovies) {
          const movieDetailsResponse = await fetch(
            `http://www.omdbapi.com/?apikey=cf0fa3b1&i=${movie.imdbID}`
          );
          const movieDetails = await movieDetailsResponse.json();
          details[movie.imdbID] = movieDetails;
        }
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchSessionMovies();
  }, [sessionCode]);

  const handleVote = async () => {
    if (!selectedMovieId) {
      alert('Please select a movie to vote for.');
      return;
    }
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode, movieId: selectedMovieId }),
      });
      if (response.ok) {
        alert('Your vote has been recorded!');
        navigate('/results', { state: { sessionCode } });
      } else {
        console.error('Error submitting vote.');
        alert('Failed to submit your vote.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your vote.');
    }
  };

  return (
    <section id="movie-recommendations">
      <h2>Movies for Voting</h2>
      {movies.length === 0 && <p>No movies available for voting.</p>}
      <form id="voting-form">
        {movies.map((movie) => {
          const details = movieDetails[movie.imdbID];
          return (
            <div key={movie.imdbID} className="movie-item">
              <input
                type="radio"
                name="vote"
                value={movie.imdbID}
                id={`vote-${movie.imdbID}`}
                onChange={() => setSelectedMovieId(movie.imdbID)}
              />
              <label htmlFor={`vote-${movie.imdbID}`}>
                <h3>{movie.Title} ({movie.Year})</h3>
                {details && (
                  <>
                    <img src={details.Poster} alt={details.Title} style={{ width: '100px' }} />
                    <p><strong>Genre:</strong> {details.Genre}</p>
                    <p><strong>Plot:</strong> {details.Plot}</p>
                  </>
                )}
              </label>
            </div>
          );
        })}
        <button type="button" onClick={handleVote}>Submit Vote</button>
      </form>
    </section>
  );
};

export default Recommendations;