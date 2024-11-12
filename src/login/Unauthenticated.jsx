// src/login/Unauthenticated.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Importing login-specific CSS

function Unauthenticated({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'user@example.com' && password === 'password') {
      onLogin(email); // Calls onLogin with email as the userName
      navigate('/home'); // Redirect to Home page after successful login
    } else {
      setError('Invalid credentials'); // Simple validation for demo
    }
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
          placeholder="you@example.com"
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
          placeholder="password"
          required
        />
      </div>
      <button onClick={handleLogin} disabled={!email || !password}>
        Login
      </button>
      {error && <p id="login-status">{error}</p>}
      <p>
        Don’t have an account? <a href="/signup">Sign up here</a>.
      </p>
    </div>
  );
}

export default Unauthenticated;
