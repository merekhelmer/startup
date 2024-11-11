// src/results/Results.jsx
import React from 'react';
import FinalSelection from './FinalSelection';
import VoteSummary from './VoteSummary';
import './results.css';

const Results = () => {
  const finalSelection = { title: "Selected Movie", genre: "Action, Adventure", rating: "8.5/10", streamingOn: "Netflix" };
  const votingResults = [{ title: "Movie 1", votes: 5 }, { title: "Movie 2", votes: 3 }];

  return (
    <main>
      <FinalSelection selection={finalSelection} />
      <VoteSummary results={votingResults} />
    </main>
  );
};

export default Results;
