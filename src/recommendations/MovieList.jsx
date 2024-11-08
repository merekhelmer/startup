// src/recommendations/MovieList.jsx
import React from 'react';

const MovieList = ({ onVote }) => {
  return (
    <section>
      <h2>Recommended Movies</h2>
      <form>
        <label><input type="radio" name="vote" value="movie1" onChange={() => onVote('movie1')} /> Movie 1</label>
        <label><input type="radio" name="vote" value="movie2" onChange={() => onVote('movie2')} /> Movie 2</label>
        {/* Add more movie options */}
      </form>
    </section>
  );
};

export default MovieList;
