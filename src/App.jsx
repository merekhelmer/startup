// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './home/Home';
import { Login } from './login/Login';
import { Recommendations } from './recommendations/Recommendations';
import { Results } from './results/Results';
import './app.css';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
