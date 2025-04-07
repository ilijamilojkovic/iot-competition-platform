const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/authMiddleware');

// Dodavanje komentara
router.post('/', verifyToken, async (req, res) => {
  const { project_id, content } = req.body;
  const user_id = req.user.id;

  if (!content || !project_id) {
    return res.status(400).json({ message: 'Nedostaju podaci.' });
  }

  try {
    await db.execute(
      'INSERT INTO comments (user_id, project_id, content) VALUES (?, ?, ?)',
      [user_id, project_id, content]
    );
    res.status(201).json({ message: 'Komentar dodat.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri dodavanju komentara.' });
  }
});

// Dobavljanje komentara za projekat
router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;

  try {
    const [comments] = await db.execute(
      `SELECT c.*, u.name AS author_name
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.project_id = ?
       ORDER BY c.created_at DESC`,
      [projectId]
    );
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri učitavanju komentara.' });
  }
});

module.exports = router;
