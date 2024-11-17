import React, { useState } from 'react';
import './login.css';

export function Unauthenticated({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleLogin(endpoint) {
    try {
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.token);
        onLogin(email); // parent component in login
      } else {
        const errorData = await response.json();
        setError(`⚠️ ${errorData.msg}`);
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    }
  }

  return (
    <div id="authentication">
      <h2>Login or Create an Account</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={() => handleLogin('login')}>Login</button>
      <button onClick={() => handleLogin('create')}>Create Account</button>
    </div>
  );
}
