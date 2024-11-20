import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './recommendations.css';

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const sessionCode = location.state?.sessionCode;

  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!sessionCode) {
        setError('Session code is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/recommendations/${sessionCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations.');
        }

        const data = await response.json();
        setRecommendations(data.movies || []);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [sessionCode]);

  const handleVote = async () => {
    if (!selectedMovie) {
      alert('Please select a movie to vote for.');
      return;
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode, movieId: selectedMovie }),
      });

      if (response.ok) {
        alert('Your vote has been recorded!');
        navigate('/results', { state: { sessionCode } }); // redirect to Results page
      } else {
        const errorData = await response.json();
        console.error('Error submitting vote:', errorData);
        alert('Failed to submit your vote.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="container">
      <h2>Movie Recommendations</h2>
      <div className="recommendations">
        {recommendations.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="movie-details">
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
                Vote for this movie
              </label>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleVote}>Submit Vote</button>
    </main>
  );
};

export default Recommendations;
