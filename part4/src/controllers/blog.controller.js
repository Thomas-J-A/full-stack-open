const { blogService } = require('../services');

const fetchBloglist = async (req, res, next) => {
  try {
    const blogs = await blogService.fetchBloglist();
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

const addEntry = async (req, res, next) => {
  const { body } = req;

  try {
    const newBlog = await blogService.addEntry(body);
    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchBloglist,
  addEntry,
};
