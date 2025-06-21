const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const validate = require('../middleware/validate');

router.post('/', validate(['username']), userCtrl.createUser);
router.get('/', userCtrl.listUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', validate(['username', 'reputation']), userCtrl.updateUser);

module.exports = router;
