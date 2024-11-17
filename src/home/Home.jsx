import React, { useState } from 'react';
import '../app.css';

export default function Home() {
  const [sessionCode, setSessionCode] = useState('');
  const [message, setMessage] = useState('');

  async function createSession() {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) return setMessage('You must log in first.');

    try {
      const response = await fetch('/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setSessionCode(data.sessionCode);
        setMessage(`🎉 Session Created! Code: ${data.sessionCode}`);
      } else {
        setMessage('Unable to create session.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error.');
    }
  }

  return (
    <div>
      <h2>Start Your Movie Night</h2>
      <button onClick={createSession}>Create New Session</button>
      {message && <p>{message}</p>}
      {sessionCode && <p>Session Code: {sessionCode}</p>}
    </div>
  );
}
