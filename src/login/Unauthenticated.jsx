import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import './login.css';


function Unauthenticated({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  // Unauthenticated.jsx
async function loginOrCreate(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userName, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('userToken', data.token);
      onLogin(userName);
    } else {
      // parse error message from server
      const errorData = await response.json();
      setDisplayError(`Error: ${errorData.msg}`);
    }
  } catch (err) {
    console.error('Error during login:', err);
    setDisplayError('Error: Unable to login. Please try again later.');
  }
}
  return (
    <div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
      <Button
        variant="primary"
        onClick={() => loginOrCreate('/api/auth/login')}
        disabled={!userName || !password}
      >
        Login
      </Button>
      <Button
        variant="secondary"
        onClick={() => loginOrCreate('/api/auth/create')}
        disabled={!userName || !password}
      >
        Create Account
      </Button>

      {displayError && <div className="error">{displayError}</div>}
    </div>
  );
}

export default Unauthenticated;