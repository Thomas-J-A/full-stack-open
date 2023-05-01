const express = require('express');

const testController = require('../controllers/test.controller');

const router = express.Router();

router.post('/reset', testController.resetDb);

module.exports = router;
