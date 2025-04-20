import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NetflixHome from './pages/Home/NetflixHome';
import NetflixShow from './pages/NetflixShow/NetflixShow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NetflixHome />} />
        <Route path="/netflix-show" element={<NetflixShow />} />
      </Routes>
    </Router>
  );
}

export default App;