const express = require('express');

const blogRouter = require('./blog.route');

const router = express.Router();

router.use('/blogs', blogRouter);

module.exports = router;
