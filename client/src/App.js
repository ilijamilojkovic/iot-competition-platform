import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Registracija</Link> |{' '}
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Dobrodošli na IoT Takmičenje Platformu</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
