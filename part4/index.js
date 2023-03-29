const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Import and setup environment variables
require('dotenv').config();

const app = express();

// Create custom body token for logger
const logFormatStr = (
  ':method :url :status :res[content-length] - :response-time ms :body'
);
logger.token('body', (req) => JSON.stringify(req.body));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(process.env.MONGODB_URI);

app.use(logger(logFormatStr));
app.use(cors());
app.use(express.json());

app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then((blogs) => {
      res.json(blogs);
    });
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((newBlog) => {
      res.status(201).json(newBlog);
    });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
