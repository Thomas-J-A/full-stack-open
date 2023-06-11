const express = require('express');

const { blogController } = require('../controllers');
const { extractToken, extractUser } = require('../middlewares');

const router = express.Router();

router.get('/', blogController.fetchBloglist);

router.post('/', extractToken, extractUser, blogController.addEntry);

router.put('/:id', blogController.updateLikes);

router.delete('/:id', extractToken, extractUser, blogController.removeEntry);

router.post('/:id/comments', extractToken, blogController.addComment);

module.exports = router;
