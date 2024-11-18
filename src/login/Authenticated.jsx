import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch(`/api/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('userToken') }),
    })
      .catch(() => {
        console.error('Logout failed. Assuming offline.');
      })
      .finally(() => {
        localStorage.removeItem('userToken'); // Clear token
        onLogout(); // Notify parent about logout
      });
  }

  return (
    <div>
      <div className="authenticated">
        <h3>Welcome, {userName}!</h3>
        <Button variant="primary" onClick={() => navigate('/home')}>
          Go to Home
        </Button>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Authenticated;