const express = require('express');
const router = express.Router();
const controller = require('../controllers/questsController');


router.post("/", controller.CreateQuests)
router.get("/", controller.GetAllQuest)
router.post("/:id/start", controller.LoadXp, controller.StartQuest)
router.post("/:id/complete", controller.LoadXp, controller.CompleteQuest)
// router.get("/:id", controller.GetAvailableQuests)


module.exports = router;