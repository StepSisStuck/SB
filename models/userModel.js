const pool = require('../config/db');

async function createUser(username) {
  const [rows] = await pool.query('INSERT INTO User (username) VALUES (?)', [username]);
  return { id: rows.insertId, username, reputation: 0 };
}

async function getAllUsers() {
  const [rows] = await pool.query('SELECT id, username, reputation FROM User');
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query('SELECT id, username, reputation FROM User WHERE id = ?', [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const [rows] = await pool.query('SELECT id, username, reputation FROM User WHERE username = ?', [username]);
  return rows[0];
}

async function updateUser(id, username, reputation) {
  await pool.query('UPDATE User SET username = ?, reputation = ? WHERE id = ?', [username, reputation, id]);
  return getUserById(id);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
};
