const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post("/", controller.CreateNewUser);
router.get("/", controller.ReadAllUser)
router.get("/:id", controller.ReadUserById)
router.put("/:id", controller.UpdateUserById)


module.exports = router;