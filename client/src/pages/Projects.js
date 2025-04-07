// client/src/pages/Projects.js
import React, { useEffect, useState } from 'react';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        data.forEach(project => {
          fetchComments(project.id);
        });
      });
  }, []);

  const fetchComments = async (projectId) => {
    const res = await fetch(`http://localhost:5000/api/comments/${projectId}`);
    const data = await res.json();
    setComments(prev => ({ ...prev, [projectId]: data }));
  };

  const handleCommentChange = (e, projectId) => {
    setNewComments({ ...newComments, [projectId]: e.target.value });
  };

  const handleCommentSubmit = async (e, projectId) => {
    e.preventDefault();
    const content = newComments[projectId];
    if (!content) return;

    const res = await fetch('http://localhost:5000/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project_id: projectId, content }),
    });

    if (res.ok) {
      setNewComments({ ...newComments, [projectId]: '' });
      fetchComments(projectId);
    }
  };

  return (
    <div>
      <h2>Svi prijavljeni IoT projekti</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {projects.map(proj => (
          <div key={proj.id} style={{ border: '1px solid #ccc', padding: '10px', width: '400px' }}>
            <h3>{proj.title}</h3>
            <p><strong>Autor:</strong> {proj.author_name}</p>
            <p>{proj.description}</p>
            {proj.github_link && (
              <p><a href={proj.github_link.trim()} target="_blank" rel="noreferrer">GitHub Link</a></p>
            )}
            {proj.file_path && (
              <img src={`http://localhost:5000${proj.file_path}`} alt="Preview" style={{ width: '100%' }} />
            )}

            {/* Komentari */}
            <div style={{ marginTop: '10px' }}>
              <h4>Komentari</h4>
              {comments[proj.id]?.length > 0 ? (
                comments[proj.id].map(comment => (
                  <p key={comment.id}><strong>{comment.author_name}:</strong> {comment.content}</p>
                ))
              ) : (
                <p>Nema komentara još.</p>
              )}

              {/* Forma za komentar */}
              {token && (
                <form onSubmit={(e) => handleCommentSubmit(e, proj.id)}>
                  <input
                    type="text"
                    placeholder="Dodaj komentar..."
                    value={newComments[proj.id] || ''}
                    onChange={(e) => handleCommentChange(e, proj.id)}
                    style={{ width: '100%', marginTop: '5px' }}
                  />
                  <button type="submit">Pošalji</button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
