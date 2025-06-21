const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

(async () => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, '../migrations/schema.sql'), 'utf8');
    const statements = schema.split(';').map(s => s.trim()).filter(Boolean);
    for (const stmt of statements) {
      await pool.query(stmt);
    }
    console.log('Database initialized.');
    process.exit(0);
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
})();
