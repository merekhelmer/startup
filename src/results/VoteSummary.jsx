// src/results/VoteSummary.jsx
import React from 'react';

const VoteSummary = ({ results }) => (
  <section>
    <h2>Voting Results</h2>
    <ul>
      {results.map((result, index) => (
        <li key={index}>{result.title} - {result.votes} votes</li>
      ))}
    </ul>
  </section>
);

export default VoteSummary;
