import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AddProject from './pages/AddProject';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Početna</Link> |{' '}
        <Link to="/register">Registracija</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/add-project">Prijava Projekta</Link> |{' '}
        <Link to="/projects">Svi Projekti</Link> |{' '}

      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Dobrodošli na IoT Takmičenje Platformu</h1>} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
