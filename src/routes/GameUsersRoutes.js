const express = require('express');
const router = express.Router();
const controller = require('../controllers/GameUsersController');

router.post("/", controller.CreateGameUsers)
router.get("/", controller.GetAllGameUsers)
router.get("/:id", controller.GetGameUsersById)
router.put("/:id", controller.UpdateGameUsers)
router.post("/pvp", controller.ChallengePlayers)



module.exports = router;