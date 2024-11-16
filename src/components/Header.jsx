// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <img src="/Logo.jpg" alt="StreamSync Logo" className="logo" />
        </div>
        <h1 className="site-title">StreamSync</h1>
        <nav>
          <ul className="navigation">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/recommendations">Recommendations</NavLink>
            </li>
            <li>
              <NavLink to="/results">Results</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
