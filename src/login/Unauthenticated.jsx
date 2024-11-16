// src/login/Unauthenticated.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Unauthenticated({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin(email); 
    navigate('/home'); // redirect to Home page after login
  };

  return (
    <div id="authentication">
      <h2 className="login-subtitle">Login to Your Account</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter any email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter any password"
          required
        />
      </div>
      <button onClick={handleLogin} disabled={!email || !password}>
        Login
      </button>
      <p>
        Don’t have an account? <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
}

export default Unauthenticated;
