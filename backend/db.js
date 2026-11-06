const { Pool } = require('pg');

// NOTE: dotenv is loaded in server.js — do NOT load it again here

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // 👈 THIS IS THE FIX FOR RENDER
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => {
    console.error('❌ DB connection error:');
    console.error('   code:', err.code);
    console.error('   message:', err.message);
    console.error('   detail:', err.detail);
    console.error('   host:', process.env.DB_HOST);
    console.error('   db:', process.env.DB_NAME);
    console.error('   user:', process.env.DB_USER);
    console.error('   password length:', process.env.DB_PASSWORD?.length);
  });

module.exports = pool;