const express = require('express');

const blogRouter = require('./blog.route');
const userRouter = require('./user.route');

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/users', userRouter);

module.exports = router;
