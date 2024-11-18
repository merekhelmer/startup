import React, { useState } from 'react';
import SessionManagement from './SessionManagement';
import PreferenceSelection from './PreferenceSelection';
// import StatusDisplay from './StatusDisplay';
import '../app.css';

const Home = () => {
  const [sessionCode, setSessionCode] = useState('');

  return (
    <main>
      <SessionManagement setSessionCode={setSessionCode} />
      <PreferenceSelection sessionCode={sessionCode} />
    </main>
  );
};

export default Home;
