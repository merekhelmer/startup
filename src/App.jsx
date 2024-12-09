import React, { useState, useEffect, useRef } from 'react';
import WebSocketNotifier from './webSocketNotifier';
import MovieList from './recommendations/MovieList';
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
  const [sessionCode, setSessionCode] = useState(''); 

  const webSocketNotifierRef = useRef(null);

  const handleAuthChange = (newUserName, newAuthState) => {
    setUserName(newUserName);
    setAuthState(newAuthState);
    if (newAuthState === AuthState.Authenticated) {
      localStorage.setItem('userName', newUserName);
    } else {
      localStorage.removeItem('userName');
      setSessionCode('') // reset sessionCode on logout
    }
  };

  useEffect(() => {
    if (sessionCode) { 
      webSocketNotifierRef.current = new WebSocketNotifier(sessionCode);

      const handleEvent = (event) => {
        // incoming WebSocket events
        console.log('Received event:', event);
        // update state or UI based on the event
      };

      webSocketNotifierRef.current.addHandler(handleEvent);

      return () => {
        if (webSocketNotifierRef.current) {
          webSocketNotifierRef.current.removeHandler(handleEvent);
          webSocketNotifierRef.current.close(); // ensure WebSocket is closed on cleanup
          webSocketNotifierRef.current = null;
        }
      };
    }
  }, [sessionCode]); // re-run effect if sessionCode changes

  const sendMessage = () => {
    if (webSocketNotifierRef.current) {
      webSocketNotifierRef.current.broadcastEvent('User', 'Message', { msg: 'Hello WebSocket!' });
    } else {
      console.warn('WebSocketNotifier is not initialized.');
    }
  };

  const handleVote = (movieId) => {
    console.log(`User voted for movie ID: ${movieId}`)
  };

  return (
    <BrowserRouter>
      <div className="body">
        <Header />
        <Routes>
          {/* default redirection based on authentication */}
          <Route
            path="/"
            element={<Navigate to={authState === AuthState.Authenticated ? "/home" : "/login"} replace />}
          />
          
          {/* Login Route */}
          <Route
            path="/login"
            element={<Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />}
          />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={authState === AuthState.Authenticated ? <Home setSessionCode={setSessionCode} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/recommendations"
            element={authState === AuthState.Authenticated ? <Recommendations /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/results"
            element={authState === AuthState.Authenticated ? <Results /> : <Navigate to="/login" replace />}
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;