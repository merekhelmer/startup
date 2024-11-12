// src/login/Authenticated.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userName');
    onLogout();
  };

  return (
    <div className="authenticated">
      <p className="welcome-message">Welcome, {userName}</p>
      <div className="button-group">
        <button className="btn primary-btn" onClick={() => navigate('/home')}>Go to Home</button>
        <button className="btn secondary-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Authenticated;
