// client/src/pages/Register.js
import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'takmicar',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registracija uspešna!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Došlo je do greške.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Ime" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Lozinka" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="takmicar">Takmičar</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Registruj se</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
