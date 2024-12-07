// startup/src/recommendations/MovieList.jsx

import React, { useEffect } from 'react';
import { createWebSocketNotifier } from '../webSocketNotifier';

const MovieList = ({ movies, sessionCode, onVote }) => {
  const [webSocket, setWebSocket] = React.useState(null);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    const ws = createWebSocketNotifier(sessionCode);
    ws.addHandler(handleWebSocketEvent);
    setWebSocket(ws);

    return () => {
      ws.removeHandler(handleWebSocketEvent);
    };
  }, [sessionCode]);

  const handleWebSocketEvent = (event) => {
    if (event.type === 'voteUpdated') {
      const { movieId, votes } = event.data;
      setVoteCounts((prev) => ({ ...prev, [movieId]: votes }));
      console.log('Vote Updated:', event.data);
    }
    // add more event handlers here
  };

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
      webSocket.broadcastEvent('castVote', { movieId });
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
            <button onClick={() => handleVote(movie.id)}>Vote</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MovieList;