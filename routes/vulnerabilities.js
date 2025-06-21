const express = require('express');
const router = express.Router();
const vulnCtrl = require('../controllers/vulnerabilityController');
const validate = require('../middleware/validate');

router.post('/', validate(['type', 'description', 'points']), vulnCtrl.createVulnerability);
router.get('/', vulnCtrl.listVulnerabilities);

module.exports = router;
