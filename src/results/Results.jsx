// src/results/Results.jsx
import React from 'react';
import './results.css';

const Results = () => {
  return (
    <main>
      <section id="final-selection">
        <h2>Your Group's Movie Choice</h2>
        <h3>Movie Title Selected</h3>
        <img src="/images/selected_movie_poster.jpg" alt="Selected Movie Poster" className="movie-poster" />
        <p>Detailed synopsis of the selected movie...</p>
        <p><strong>Genre:</strong> Action, Adventure</p>
        <p><strong>Rating:</strong> 8.5/10</p>
        <p><strong>Streaming On:</strong> Netflix</p>
      </section>

      <section id="vote-results">
        <h2>Voting Results</h2>
        <ul>
          <li>Movie Title 1 - 2 votes</li>
          <li>Movie Title 2 - 3 votes</li>
        </ul>
      </section>
    </main>
  );
};

export default Results;
