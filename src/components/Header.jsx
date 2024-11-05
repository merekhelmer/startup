// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        {/* Logo on the Left */}
        <div className="logo-container">
          <img src="/Logo.jpg" alt="StreamSync Logo" className="logo" />
        </div>
        
        {/* Site Title */}
        <h1 className="site-title">StreamSync</h1>
        
        {/* Navigation Links on the Right */}
        <nav>
          <ul className="navigation">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;