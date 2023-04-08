const express = require('express');

const { blogController } = require('../controllers');

const router = express.Router();

router.get('/', blogController.fetchBloglist);

router.post('/', blogController.addEntry);

router.put('/:id', blogController.updateLikes);

router.delete('/:id', blogController.removeEntry);

module.exports = router;
