// src/recommendations/MovieList.jsx
import React, { useEffect, useState } from 'react';
import WebSocketNotifier from '../webSocketNotifier';

const MovieList = ({ movies, sessionCode, onVote }) => {
  const [webSocket, setWebSocket] = useState(null);
  const [voteCounts, setVoteCounts] = useState({});

  useEffect(() => {
    const webSocketNotifier = new WebSocketNotifier(sessionCode);
    webSocketNotifier.addHandler(handleWebSocketEvent);
    setWebSocket(webSocketNotifier);

    return () => {
      webSocketNotifier.removeHandler(handleWebSocketEvent);
    };
  }, [sessionCode]);

  const handleWebSocketEvent = (event) => {
    if (event.type === 'voteUpdated') {
      const { movieId, votes } = event.data;
      setVoteCounts((prev) => ({ ...prev, [movieId]: votes }));
      console.log('Vote Updated:', event.data);
    }
  };

  const handleVote = (movieId) => {
    if (webSocket) {
      webSocket.broadcastEvent('castVote', { movieId });
    }
    onVote(movieId);
  };

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <button onClick={() => handleVote(movie.id)}>Vote</button>
          <p>Votes: {voteCounts[movie.id] || 0}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;