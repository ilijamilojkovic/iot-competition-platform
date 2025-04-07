import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AddProject from './pages/AddProject';
import Projects from './pages/Projects';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h1>Dobrodošli na IoT Takmičenje Platformu</h1>} />
        <Route
          path="/add-project"
          element={
            <PrivateRoute>
              <AddProject />
            </PrivateRoute>
          }
        />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
