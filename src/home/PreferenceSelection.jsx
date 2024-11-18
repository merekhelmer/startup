import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreferenceSelection = ({ sessionCode }) => {
  const [mood, setMood] = useState('');
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    setGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleSubmitPreferences = async (e) => {
    e.preventDefault();

    if (!sessionCode) {
      alert('No session code found. Please create or join a session.');
      return;
    }

    try {
      const response = await fetch('/api/session/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionCode,
          mood,
          genres,
        }),
      });

      if (response.ok) {
        alert('Preferences submitted successfully!');
        navigate(`/recommendations?sessionCode=${sessionCode}`); // Redirect to Recommendations
      } else {
        const errorData = await response.json();
        console.error('Error submitting preferences:', errorData);
        alert('Failed to submit preferences.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <h2>Select Your Preferences</h2>
      <form onSubmit={handleSubmitPreferences}>
        {/* Mood Selection */}
        <h3>Your Mood:</h3>
        <label>
          <input type="radio" name="mood" value="happy" onChange={(e) => setMood(e.target.value)} /> 😊 Happy
        </label>
        <label>
          <input type="radio" name="mood" value="romantic" onChange={(e) => setMood(e.target.value)} /> ❤️ Romantic
        </label>
        <label>
          <input type="radio" name="mood" value="sad" onChange={(e) => setMood(e.target.value)} /> 😢 Sad
        </label>
        <label>
          <input type="radio" name="mood" value="excited" onChange={(e) => setMood(e.target.value)} /> 🎉 Excited
        </label>
        <label>
          <input type="radio" name="mood" value="scared" onChange={(e) => setMood(e.target.value)} /> 😱 Scared
        </label>
        <label>
          <input type="radio" name="mood" value="funny" onChange={(e) => setMood(e.target.value)} /> 😂 Funny
        </label>

        {/* Genre Selection */}
        <h3>Preferred Genres:</h3>
        <label>
          <input type="checkbox" value="action" onChange={() => toggleGenre('action')} /> Action
        </label>
        <label>
          <input type="checkbox" value="comedy" onChange={() => toggleGenre('comedy')} /> Comedy
        </label>
        <label>
          <input type="checkbox" value="drama" onChange={() => toggleGenre('drama')} /> Drama
        </label>
        <label>
          <input type="checkbox" value="horror" onChange={() => toggleGenre('horror')} /> Horror
        </label>
        <label>
          <input type="checkbox" value="romance" onChange={() => toggleGenre('romance')} /> Romance
        </label>
        <label>
          <input type="checkbox" value="sci-fi" onChange={() => toggleGenre('sci-fi')} /> Sci-Fi
        </label>

        <button type="submit">Submit Preferences</button>
      </form>
    </section>
  );
};

export default PreferenceSelection;
