// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './home/Home';
import Login from './login/Login';
import Recommendations from './recommendations/Recommendations';
import Results from './results/Results';
import AuthState from './auth/authState';
import './app.css';

function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = useState(userName ? AuthState.Authenticated : AuthState.Unauthenticated);

  const handleAuthChange = (newUserName, newAuthState) => {
    setUserName(newUserName);
    setAuthState(newAuthState);
    if (newAuthState === AuthState.Authenticated) {
      localStorage.setItem('userName', newUserName);
    } else {
      localStorage.removeItem('userName');
    }
  };

  return (
    <BrowserRouter>
      <div className="body">
        <Header />
        <Routes>
          {/* Default redirection */}
          <Route path="/" element={<Navigate to={authState === AuthState.Authenticated ? "/home" : "/login"} replace />} />
          
          {/* Login Route */}
          <Route
            path="/login"
            element={<Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />}
          />

          {/* Protected Routes with inline checks */}
          <Route
            path="/home"
            element={authState === AuthState.Authenticated ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/recommendations"
            element={authState === AuthState.Authenticated ? <Recommendations /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/results"
            element={authState === AuthState.Authenticated ? <Results /> : <Navigate to="/login" replace />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
