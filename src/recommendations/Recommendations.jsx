import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import './recommendations.css';

const Recommendations = ({ sessionCode }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votedMovie, setVotedMovie] = useState(null); // track the user's vote

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // fetch session preferences from the backend
        const preferencesResponse = await fetch(`/api/session/preferences/${sessionCode}`);
        if (!preferencesResponse.ok) {
          throw new Error('Failed to fetch session preferences.');
        }

        const preferences = await preferencesResponse.json();
        const { mood, genres } = preferences;

        // query parameters based on preferences
        const genreQuery = genres?.join(',') || '';
        const moodQuery = mood || '';

        // third-party API using preferences
        const thirdPartyResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreQuery}&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: `Bearer YOUR_TMDB_API_KEY`, // replace with real API key
            },
          }
        );

        if (!thirdPartyResponse.ok) {
          throw new Error('Failed to fetch movie recommendations.');
        }

        const data = await thirdPartyResponse.json();
        setRecommendations(data.results || []);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [sessionCode]);

  const handleVote = (movieId) => {
    setVotedMovie(movieId);
  };

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="container">
      <h2>Movie Recommendations</h2>
      <MovieList movies={recommendations} sessionCode={sessionCode} onVote={handleVote} />
      {votedMovie && (
        <p className="vote-confirmation">
          You voted for movie ID: {votedMovie}
        </p>
      )}
    </main>
  );
};

export default Recommendations;
