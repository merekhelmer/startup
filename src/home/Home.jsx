// src/home/Home.jsx
import React from 'react';
import SessionManagement from './SessionManagement';
import PreferenceSelection from './PreferenceSelection';
import StatusDisplay from './StatusDisplay';
import '../app.css';

const Home = () => {
  return (
    <main>
      <SessionManagement />
      <PreferenceSelection />
      <StatusDisplay />
    </main>
  );
};

export default Home;
