// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './home/Home';
import Login from './login/Login';
import Recommendations from './recommendations/Recommendations';
import Results from './results/Results';
import './app.css';


function App() {
  return (
    <BrowserRouter>
      <div className="body">
        <Header />
        {/* <Home /> */}
        <Routes>
          <Route path="/home" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/results" element={<Results />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

// function NotFound() {
//   return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
// }