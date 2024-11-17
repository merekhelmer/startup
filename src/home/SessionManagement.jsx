import React, { useState } from 'react';

const SessionManagement = () => {
  const [sessionCode, setSessionCode] = useState('');
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || '');

  const handleSessionCreate = async () => {
    try {
      const response = await fetch('/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userToken }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Session created! Your code is: ${data.sessionCode}`);
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
  
    try {
      const response = await fetch('/api/session/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionCode, userToken }),
      });
  
      if (response.ok) {
        alert(`Successfully joined session: ${sessionCode}`);
      } else {
        const errorData = await response.json();
        alert(`Failed to join session: ${errorData.msg}`);
      }
    } catch (error) {
      console.error('Error joining session:', error);
      alert('An error occurred while trying to join the session.');
    }
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
