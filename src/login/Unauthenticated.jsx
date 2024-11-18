import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import './login.css';


export function Unauthenticated({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userName, password }),
    });

    if (response.status === 200) {
      const { token } = await response.json();
      localStorage.setItem('userToken', token); // save token for authenticated requests
      onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
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
