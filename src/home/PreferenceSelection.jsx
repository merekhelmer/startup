// PreferenceSelection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreferenceSelection = ({ sessionCode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=cf0fa3b1&s=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
        alert('No movies found.');
      }
    } catch (error) {
      console.error('Error fetching data from OMDb API:', error);
    }
  };

  const submitMovie = async () => {
    if (!selectedMovie) {
      alert('Please select a movie to submit.');
      return;
    }
    try {
      const response = await fetch(`/api/session/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode, movie: selectedMovie }),
      });
      if (response.ok) {
        // Navigate to the recommendations or voting page
        navigate('/recommendations', { state: { sessionCode } });
      } else {
        console.error('Error submitting movie.');
        alert('Error submitting movie.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the movie.');
    }
  };

  return (
    <section>
      <h2>Search for a Movie</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter movie title"
          required
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Search Results</h3>
        {searchResults.length === 0 && <p>No results to display.</p>}
        {searchResults.map((movie) => (
          <div key={movie.imdbID}>
            <input
              type="radio"
              name="selectedMovie"
              value={movie.imdbID}
              onChange={() => setSelectedMovie(movie)}
            />
            <label>
              {movie.Title} ({movie.Year})
            </label>
          </div>
        ))}
      </div>

      <button onClick={submitMovie}>Submit Movie for Voting</button>
    </section>
  );
};

export default PreferenceSelection;