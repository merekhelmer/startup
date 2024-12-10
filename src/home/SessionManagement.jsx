import React, { useState, useEffect } from 'react';
import WebSocketNotifier from '../webSocketNotifier';
import SessionMessages from './SessionMessages.jsx'; 

const SessionManagement = ({ setSessionCode }) => {
  const [sessionCodeInput, setSessionCodeInput] = useState('');
  const [activeSessions, setActiveSessions] = useState([]);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    fetch('/api/sessions/active', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setActiveSessions(data);
        } else {
          setActiveSessions([]);
        }
      })
      .catch((error) => console.error('Error fetching active sessions:', error));
  }, []);

  const handleSessionCreate = async () => {
    try {
      const response = await fetch('/api/session/create', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
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

  const handleSessionJoin = async (sessionCode) => {
    try {
      const response = await fetch('/api/session/join', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode }),
      });

      if (response.ok) {
        setSessionCode(sessionCode);
        alert(`Successfully joined session: ${sessionCode}`);
        initializeWebSocket(sessionCode);
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
    const ws = new WebSocketNotifier(sessionCode);
    setWebSocket(ws);
  };

  return (
    <section>
      <h2>Start Your Movie Night</h2>
      <button onClick={handleSessionCreate}>Create New Session</button>

      <h2>Join an Active Session</h2>
      <ul>
        {activeSessions.map((session) => (
          <li key={session.sessionCode}>
            Session Code: {session.sessionCode}{' '}
            <button onClick={() => handleSessionJoin(session.sessionCode)}>Join</button>
          </li>
        ))}
      </ul>

      <h2>Join a Session by Code</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSessionJoin(sessionCodeInput);
        }}
      >
        <input
          type="text"
          value={sessionCodeInput}
          onChange={(e) => setSessionCodeInput(e.target.value)}
          placeholder="Enter Session Code"
          required
        />
        <button type="submit">Join Session</button>
      </form>

      {webSocket && <SessionMessages webSocket={webSocket} />} {/* Render the SessionMessages component */}
    </section>
  );
};

export default SessionManagement;