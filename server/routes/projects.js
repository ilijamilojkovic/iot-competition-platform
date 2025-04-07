// server/routes/projects.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

// Konfiguracija za upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// Dodavanje projekta
router.post('/', upload.single('file'), async (req, res) => {
  const { title, description, github_link, user_id } = req.body;
  const file_path = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await db.execute(
      'INSERT INTO projects (user_id, title, description, github_link, file_path) VALUES (?, ?, ?, ?, ?)',
      [user_id, title, description, github_link, file_path]
    );
    res.status(201).json({ message: 'Projekat uspešno dodat!', projectId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri dodavanju projekta.' });
  }
});

// Dobavljanje svih projekata
router.get('/', async (req, res) => {
  try {
    const [projects] = await db.execute(`
      SELECT p.*, u.name as author_name FROM projects p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri čitanju projekata.' });
  }
});

module.exports = router;
