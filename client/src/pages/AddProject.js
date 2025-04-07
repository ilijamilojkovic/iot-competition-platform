// client/src/pages/AddProject.js
import React, { useState } from 'react';

function AddProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_link: '',
    user_id: 1, // Za sada fiksno
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append('file', file);
    }

    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Projekat uspešno dodat!');
      } else {
        setMessage(result.message || 'Greška prilikom dodavanja.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Došlo je do greške.');
    }
  };

  return (
    <div>
      <h2>Prijavi IoT Projekat</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Naziv projekta" onChange={handleChange} required /><br />
        <textarea name="description" placeholder="Opis projekta" onChange={handleChange} required /><br />
        <input type="text" name="github_link" placeholder="GitHub link" onChange={handleChange} /><br />
        <input type="file" onChange={handleFileChange} /><br />
        <button type="submit">Pošalji</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProject;
