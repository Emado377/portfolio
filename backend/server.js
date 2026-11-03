require('dotenv').config();   // ← MUST be line 1

const express = require('express');
const cors = require('cors');

const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);

app.get('/', (req, res) => {
  res.send('Portfolio API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});