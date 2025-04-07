const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const commentRoutes = require('./routes/comments');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API radi!');
});

app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/projects', projectRoutes);
app.use('/api/comments', commentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});



