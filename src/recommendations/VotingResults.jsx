// src/recommendations/VotingResults.jsx
import React from 'react';

const VotingResults = ({ results }) => {
  return (
    <section>
      <h2>Voting Results</h2>
      <p>Movie 1: {results.movie1 || 0} votes</p>
      <p>Movie 2: {results.movie2 || 0} votes</p>
      {/* Add more results as needed */}
    </section>
  );
};

export default VotingResults;
