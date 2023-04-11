const express = require('express');

const { blogController } = require('../controllers');
const { extractToken } = require('../middlewares');

const router = express.Router();

router.get('/', blogController.fetchBloglist);

router.post(
  '/',
  extractToken,
  blogController.addEntry,
);

router.put('/:id', blogController.updateLikes);

router.delete('/:id', blogController.removeEntry);

module.exports = router;
