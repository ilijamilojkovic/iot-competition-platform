// client/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Početna</Link> |{' '}
      <Link to="/register">Registracija</Link> |{' '}
      <Link to="/login">Login</Link> |{' '}
      <Link to="/add-project">Prijava Projekta</Link> |{' '}
      <Link to="/projects">Svi Projekti</Link> |{' '}
      {isLoggedIn && (
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
