// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';             // Placeholder for login component
import Recommendations from './components/Recommendations'; // Placeholder
import Results from './components/Results';         // Placeholder
import './app.css';

function App() {
  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

