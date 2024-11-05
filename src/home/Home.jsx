// src/components/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <main>
      {/* Session Creation/Joining */}
      <section id="session-management">
        <h2>Start Your Movie Night</h2>
        <form id="session-form" method="post" action="#">
          <div className="form-group">
            <button type="submit" formaction="/">Create New Session</button>
          </div>
          <div className="form-group">
            <label htmlFor="session-code">Or Join with a Session Code:</label>
            <input type="text" id="session-code" name="session-code" placeholder="e.g., ABC123" required />
            <button type="submit" formaction="/">Join Session</button>
          </div>
        </form>
      </section>

      {/* Preference Input */}
      <section id="preference-input">
        <h2>Select Your Preferences</h2>
        <form id="preferences-form" method="post" action="/recommendations">
          {/* Mood Selection */}
          <div>
            <h3>Your Mood:</h3>
            <div className="mood-options">
              <label>
                <input type="radio" name="mood" value="happy" required />
                <span className="emoji" role="img" aria-label="Happy">😊</span>
              </label>
              <label>
                <input type="radio" name="mood" value="romantic" />
                <span className="emoji" role="img" aria-label="Romantic">❤️</span>
              </label>
              <label>
                <input type="radio" name="mood" value="sad" />
                <span className="emoji" role="img" aria-label="Sad">😢</span>
              </label>
              <label>
                <input type="radio" name="mood" value="excited" />
                <span className="emoji" role="img" aria-label="Excited">🎉</span>
              </label>
              <label>
                <input type="radio" name="mood" value="scared" />
                <span className="emoji" role="img" aria-label="Scared">😱</span>
              </label>
              <label>
                <input type="radio" name="mood" value="funny" />
                <span className="emoji" role="img" aria-label="Funny">😂</span>
              </label>
            </div>
          </div>

          {/* Genre Selection */}
          <div className="form-group">
            <h3>Preferred Genres:</h3>
            <div className="genre-options">
              <label>
                <input type="checkbox" name="genre" value="action" />
                Action
              </label>
              <label>
                <input type="checkbox" name="genre" value="comedy" />
                Comedy
              </label>
              <label>
                <input type="checkbox" name="genre" value="drama" />
                Drama
              </label>
              <label>
                <input type="checkbox" name="genre" value="horror" />
                Horror
              </label>
              <label>
                <input type="checkbox" name="genre" value="romance" />
                Romance
              </label>
              <label>
                <input type="checkbox" name="genre" value="sci-fi" />
                Sci-Fi
              </label>
            </div>
          </div>
          <button type="submit">Submit Preferences</button>
        </form>
      </section>

      {/* WebSocket Data Placeholder */}
      <section id="group-status">
        <h2>Group Status</h2>
        <ul>
          <li>User1 - Submitted Preferences</li>
          <li>User2 - Waiting</li>
        </ul>
      </section>

      {/* Database Data Placeholder */}
      <section id="recent-sessions">
        <h2>Recent Sessions</h2>
        <ul>
          <li>Session ABC123 - Created by User1</li>
          <li>Session XYZ789 - Created by User2</li>
        </ul>
      </section>
    </main>
  );
};

export default Home;