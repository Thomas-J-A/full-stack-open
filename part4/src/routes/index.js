const express = require('express');

const blogRouter = require('./blog.route');
const loginRouter = require('./login.route');
const userRouter = require('./user.route');

const router = express.Router();

router.use('/blogs', blogRouter);
router.use('/login', loginRouter);
router.use('/users', userRouter);

module.exports = router;
