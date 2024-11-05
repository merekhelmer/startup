// src/recommendations/Recommendations.jsx
import React from 'react';
import './recommendations.css';

const Recommendations = () => {
  return (
    <main>
      <section id="movie-recommendations">
        <h2>Recommended Movies</h2>
        <form id="voting-form" method="post" action="#">
          <div className="movie-item">
            <h3>Movie Title 1</h3>
            <label>
              <input type="radio" name="vote" value="movie1" required />
              Select this movie
            </label>
          </div>
          <div className="movie-item">
            <h3>Movie Title 2</h3>
            <label>
              <input type="radio" name="vote" value="movie2" />
              Select this movie
            </label>
          </div>
          <button type="submit">Submit Vote</button>
        </form>
      </section>

      <section id="voting-results">
        <h2>Voting Results</h2>
        <div id="selected-movie">
          {/* Placeholder for the selected movie */}
        </div>
      </section>
    </main>
  );
};

export default Recommendations;
