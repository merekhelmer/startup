// src/recommendations/Recommendations.jsx
import React, { useState } from 'react';
import MovieList from './MovieList';
import VotingResults from './VotingResults';
import './recommendations.css';

const Recommendations = () => {
  const [votingResults, setVotingResults] = useState({});

  const handleVoteSubmit = (movieId) => {
    console.log("Vote submitted for:", movieId);
    setVotingResults({ movie1: 5, movie2: 3 }); // Mock results
  };

  return (
    <main>
      <MovieList onVote={handleVoteSubmit} />
      <VotingResults results={votingResults} />
    </main>
  );
};

export default Recommendations;
