const userModel = require('../models/userModel');

async function createUser(req, res, next) {
  try {
    const { username } = req.body;
    const existing = await userModel.getUserByUsername(username);
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    const user = await userModel.createUser(username);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function listUsers(req, res, next) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { username, reputation } = req.body;
    const id = req.params.id;
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const existing = await userModel.getUserByUsername(username);
    if (existing && existing.id != id) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    const updated = await userModel.updateUser(id, username, reputation);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
};
