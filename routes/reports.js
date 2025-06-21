const express = require('express');
const router = express.Router();
const reportCtrl = require('../controllers/reportController');
const validate = require('../middleware/validate');

router.post('/', validate(['user_id', 'vulnerability_id']), reportCtrl.createReport);
router.put('/:report_id', validate(['status', 'user_id']), reportCtrl.updateReport);

module.exports = router;
