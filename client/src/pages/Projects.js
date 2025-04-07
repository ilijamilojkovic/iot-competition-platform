// client/src/pages/Projects.js
import React, { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Greška pri učitavanju:', err));
  }, []);

  return (
    <div>
      <h2>Svi prijavljeni IoT projekti</h2>
      {projects.length === 0 ? (
        <p>Nema još prijavljenih projekata.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
              <h3>{proj.title}</h3>
              <p><strong>Autor:</strong> {proj.author_name}</p>
              <p>{proj.description}</p>
              {proj.github_link && (
                <p>
                  <a href={proj.github_link.trim()} target="_blank" rel="noreferrer">
                    GitHub Link
                  </a>
                </p>
              )}
              {proj.file_path && (
                <img
                  src={`http://localhost:5000${proj.file_path}`}
                  alt="Preview"
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
