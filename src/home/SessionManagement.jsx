// startup/src/home/SessionManagement.jsx

import React, { useState } from 'react';
import { createWebSocketNotifier } from '../webSocketNotifier';

const SessionManagement = ({ setSessionCode }) => {
  const [sessionCodeInput, setSessionCodeInput] = useState('');
  const [userToken] = useState(localStorage.getItem('userToken') || '');
  const [webSocket, setWebSocket] = useState(null);

  const handleSessionCreate = async () => {
    try {
      const response = await fetch('/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionCode(data.sessionCode);
        alert(`Session created! Your code is: ${data.sessionCode}`);
        initializeWebSocket(data.sessionCode);
      } else {
        alert('Failed to create session. Please try again.');
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSessionJoin = async (e) => {
    e.preventDefault();

    if (!sessionCodeInput) {
      alert('Please enter a valid session code.');
      return;
    }

    try {
      const response = await fetch('/api/session/join', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode: sessionCodeInput }),
      });

      if (response.ok) {
        setSessionCode(sessionCodeInput);
        alert(`Successfully joined session: ${sessionCodeInput}`);
        initializeWebSocket(sessionCodeInput);
      } else {
        const errorData = await response.json();
        alert(`Failed to join session: ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error joining session:', error);
      alert('An error occurred while trying to join the session.');
    }
  };

  const initializeWebSocket = (sessionCode) => {
    const ws = createWebSocketNotifier(sessionCode);
    setWebSocket(ws);
  };

  return (
    <section>
      <h2>Start Your Movie Night</h2>
      <button onClick={handleSessionCreate}>Create New Session</button>

      <form onSubmit={handleSessionJoin}>
        <input
          type="text"
          value={sessionCodeInput}
          onChange={(e) => setSessionCodeInput(e.target.value)}
          placeholder="Enter Session Code"
          required
        />
        <button type="submit">Join Session</button>
      </form>
    </section>
  );
};

export default SessionManagement;