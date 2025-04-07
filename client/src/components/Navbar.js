// client/src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // reaguj na promenu rute (osvežava navbar)

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Početna</Link> |{' '}
      <Link to="/projects">Svi Projekti</Link> |{' '}
      {!isLoggedIn && (
        <>
          <Link to="/register">Registracija</Link> |{' '}
          <Link to="/login">Login</Link> |{' '}
        </>
      )}
      {isLoggedIn && (
        <>
          <Link to="/add-project">Prijava Projekta</Link> |{' '}
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
