const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API radi!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});



app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/projects', projectRoutes);
