// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import './app.css';

export default function App() {
  return (
    <div className="body">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
