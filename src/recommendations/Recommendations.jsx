import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './recommendations.css';

const Recommendations = () => {
  const location = useLocation();
  const sessionCode = location.state?.sessionCode;

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState('');

  const handleVote = async () => {
    if (!selectedMovie) {
      alert('Please select a movie before voting!');
      return;
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode, movieId: selectedMovie }),
      });

      if (response.ok) {
        alert('Vote submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to submit vote: ${errorData.msg}`);
      }
    } catch (err) {
      console.error('Error submitting vote:', err);
      alert('An error occurred while submitting your vote.');
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!sessionCode) {
        setError('Session code is missing.');
        setLoading(false);
        return;
      }

      try {
        // Mock API call to fetch session preferences
        const response = await fetch(`/api/session/preferences/${sessionCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session preferences.');
        }

        const data = await response.json();
        setRecommendations(data.movies || []); // use mock movies array
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [sessionCode]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="container">
      <h2>Movie Recommendations</h2>
      <div className="recommendations">
        <form>
          {recommendations.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <p><strong>Rating:</strong> {movie.vote_average}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <label>
                <input
                  type="radio"
                  name="vote"
                  value={movie.id}
                  onChange={() => setSelectedMovie(movie.id)}
                />{' '}
                Select this movie
              </label>
            </div>
          ))}
        </form>
        <button onClick={handleVote}>Submit Vote</button>
      </div>
    </main>
  );
};

export default Recommendations;
