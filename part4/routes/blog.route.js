const express = require('express');

const { blogController } = require('../controllers');

const router = express.Router();

router.get('/', blogController.fetchBloglist);

router.post('/', blogController.addEntry);

module.exports = router;
