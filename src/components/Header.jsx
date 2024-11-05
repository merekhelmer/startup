// src/components/Header.js
// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="logo-container">
          <img src="/Logo.jpg" alt="StreamSync Logo" className="logo" />
        </div>
        <h1 className="site-title">StreamSync</h1>
        <nav>
          <ul className="navigation">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recommendations">Recommendations</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/results">Results</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
