// src/login/Login.jsx
import React from 'react';
import Authenticated from './Authenticated';
import Unauthenticated from './Unauthenticated';
// import AuthState from '../auth/authState';
// import '../app.css'; // Import the main CSS for shared styles
import './login.css'

function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="login-container">
      <h1 className="login-title">Welcome to StreamSync</h1>
      {authState === AuthState.Authenticated ? (
        <Authenticated userName={userName} onLogout={() => onAuthChange('', AuthState.Unauthenticated)} />
      ) : (
        <Unauthenticated onLogin={(newUserName) => onAuthChange(newUserName, AuthState.Authenticated)} />
      )}
    </main>
  );
}

export default Login;


