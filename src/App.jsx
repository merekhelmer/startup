// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import PreferencesModal from './components/PreferencesModal'; // Optional, as needed
import './app.css';

function App() {
  return (
    <div className="body">
      <Header />
      <Home />
      <Footer />
      {/* Add PreferencesModal here if needed, with show/hide state */}
    </div>
  );
}

export default App;
