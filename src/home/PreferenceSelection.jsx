// src/home/PreferenceSelection.jsx
import React, { useState } from 'react';

const PreferenceSelection = () => {
  const [mood, setMood] = useState('');
  const [genres, setGenres] = useState([]);

  const handleSubmitPreferences = (e) => {
    e.preventDefault();
    console.log("Preferences submitted:", { mood, genres });
  };

  return (
    <section>
      <h2>Select Your Preferences</h2>
      <form onSubmit={handleSubmitPreferences}>
        {/* Mood Selection */}
        <h3>Your Mood:</h3>
        <label><input type="radio" name="mood" value="happy" onChange={(e) => setMood(e.target.value)} /> 😊 Happy</label>
        <label><input type="radio" name="mood" value="romantic" onChange={(e) => setMood(e.target.value)} /> ❤️ Romantic</label>
        <label><input type="radio" name="mood" value="sad" onChange={(e) => setMood(e.target.value)} /> 😢 Sad</label>
        <label><input type="radio" name="mood" value="excited" onChange={(e) => setMood(e.target.value)} /> 🎉 Excited</label>
        <label><input type="radio" name="mood" value="scared" onChange={(e) => setMood(e.target.value)} /> 😱 Scared</label>
        <label><input type="radio" name="mood" value="funny" onChange={(e) => setMood(e.target.value)} /> 😂 Funny</label>

        {/* Additional mood options */}

        {/* Genre Selection */}
        <h3>Preferred Genres:</h3>
        <label><input type="checkbox" value="action" onChange={() => setGenres([...genres, 'action'])} /> Action</label>
        <label><input type="checkbox" value="comedy" onChange={() => setGenres([...genres, 'action'])} /> Comedy</label>
        <label><input type="checkbox" value="drama" onChange={() => setGenres([...genres, 'action'])} /> Drama</label>
        <label><input type="checkbox" value="horror" onChange={() => setGenres([...genres, 'action'])} /> Horror</label>
        <label><input type="checkbox" value="romance" onChange={() => setGenres([...genres, 'action'])} /> Romance</label>
        <label><input type="checkbox" value="sci-fi" onChange={() => setGenres([...genres, 'action'])} /> Sci-Fi</label>

        {/* Additional genre options */}
        <button type="submit">Submit Preferences</button>
      </form>
    </section>
  );
};

export default PreferenceSelection;