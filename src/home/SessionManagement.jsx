// src/home/SessionManagement.jsx
import React, { useState } from 'react';

const SessionManagement = () => {
  const [sessionCode, setSessionCode] = useState('');

  const handleSessionCreate = () => {
    console.log("Creating a new session...");
  };

  const handleSessionJoin = (e) => {
    e.preventDefault();
    console.log(`Joining session with code: ${sessionCode}`);
  };

  return (
    <section>
      <h2>Start Your Movie Night</h2>
      <button onClick={handleSessionCreate}>Create New Session</button>
      <form onSubmit={handleSessionJoin}>
        <input
          type="text"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          placeholder="Enter Session Code"
          required
        />
        <button type="submit">Join Session</button>
      </form>
    </section>
  );
};

export default SessionManagement;
