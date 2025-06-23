const express = require('express');
const router = express.Router();

// Section A
const userRoutes = require("./userRoutes");
const reportRoutes = require("./reportRoutes");
const vulnerabilityRoutes = require("./vulnerabilityRoutes");


router.use("/users", userRoutes);
router.use("/vulnerabilities", vulnerabilityRoutes);
router.use("/reports", reportRoutes);



// Section B
const GameUsersRoutes = require("./GameUsersRoutes")
const QuestsRoutes = require("./QuestsRoutes")

router.use("/gameusers", GameUsersRoutes)
router.use("/quests", QuestsRoutes)


module.exports = router;