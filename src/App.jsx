// // src/App.jsx
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './home/Home';
// import Login from './login/Login';
// import Recommendations from './recommendations/Recommendations';
// import Results from './results/Results';
// import './app.css';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="body">
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} exact />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/recommendations" element={<Recommendations />} />
//           <Route path="/results" element={<Results />} />
//           {/* Uncomment below for a 404 page */}
//           {/* <Route path="*" element={<NotFound />} /> */}
//         </Routes>
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './home/Home';
import Login from './login/Login';
import Recommendations from './recommendations/Recommendations';
import Results from './results/Results';
import AuthState from './login/authState';
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
          {/* If not authenticated, redirect to login by default */}
          <Route path="/" element={authState === AuthState.Authenticated ? <Navigate to="/home" /> : <Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />} />
          <Route path="/home" element={authState === AuthState.Authenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/login" element={<Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />} />
          <Route path="/recommendations" element={authState === AuthState.Authenticated ? <Recommendations /> : <Navigate to="/" />} />
          <Route path="/results" element={authState === AuthState.Authenticated ? <Results /> : <Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
