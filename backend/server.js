const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import the database pool
const pool = require('./db');

const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);

app.get('/', (req, res) => res.send('Portfolio API is running 🚀'));

// 👇 ADD THIS DATABASE INITIALIZATION BLOCK 👇
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profile (
          id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, bio TEXT, github_url VARCHAR(300), linkedin_url VARCHAR(300), email VARCHAR(200), photo_url VARCHAR(500)
      );
      CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY, title VARCHAR(200) NOT NULL, description TEXT, tech_stack TEXT[], image_url VARCHAR(500), live_url VARCHAR(500), repo_url VARCHAR(500), created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS skills (
          id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, category VARCHAR(100)
      );
      
      INSERT INTO profile (name, bio, github_url, linkedin_url, email, photo_url) 
      SELECT 'Emado', 'Full-stack developer.', 'https://github.com/Emado377', 'https://linkedin.com/in/emado', 'emado@example.com', '/profile.jpg'
      WHERE NOT EXISTS (SELECT 1 FROM profile);

      INSERT INTO projects (title, description, tech_stack, live_url, repo_url)
      SELECT 'Portfolio Website', 'Personal portfolio.', ARRAY['React', 'Node.js'], 'https://myportfolio.com', 'https://github.com/Emado377/portfolio'
      WHERE NOT EXISTS (SELECT 1 FROM projects);
      
      INSERT INTO skills (name, category) SELECT 'React', 'Frontend' WHERE NOT EXISTS (SELECT 1 FROM skills);
      INSERT INTO skills (name, category) SELECT 'Node.js', 'Backend' WHERE NOT EXISTS (SELECT 1 FROM skills);
      INSERT INTO skills (name, category) SELECT 'PostgreSQL', 'Database' WHERE NOT EXISTS (SELECT 1 FROM skills);
    `);
    console.log('✅ Database tables initialized successfully');
  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
  }
};
// 👆 END OF DATABASE INITIALIZATION BLOCK 👆

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  // Run the initialization when the server starts
  initDB(); 
});