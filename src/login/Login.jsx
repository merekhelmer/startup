// src/login/Login.jsx
import React from 'react';
import './login.css';

const Login = () => {
  return (
    <main>
      <section id="authentication">
        <h2>Login to Your Account</h2>
        <form method="post" action="/">
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="password" required />
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? <a href="/signup">Sign up here</a>.</p>
        </form>
      </section>

      <section id="login-status">
        <p>Please enter your credentials to log in.</p>
      </section>
    </main>
  );
};

export default Login;

