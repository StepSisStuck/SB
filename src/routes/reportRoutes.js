const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportController');

router.post("/", controller.CheckUserId, controller.CheckVulnerabilityId, controller.CreateNewReport, controller.UpdateUserReputation) // Verify if the UserId exists, followed by vulnID. Then create report record and link users and vuln


router.put("/:id", controller.CheckReport, controller.CheckCloser, controller.FinishReport)


module.exports = router;