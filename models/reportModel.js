const pool = require('../config/db');

async function createReport(user_id, vulnerability_id) {
  const [rows] = await pool.query(
    'INSERT INTO Report (user_id, vulnerability_id) VALUES (?, ?)',
    [user_id, vulnerability_id]
  );
  return rows.insertId;
}

async function getReportById(id) {
  const [rows] = await pool.query('SELECT * FROM Report WHERE id = ?', [id]);
  return rows[0];
}

async function updateReport(id, status, user_id) {
  await pool.query('UPDATE Report SET status = ?, user_id = ? WHERE id = ?', [status, user_id, id]);
  return getReportById(id);
}

module.exports = {
  createReport,
  getReportById,
  updateReport,
};
