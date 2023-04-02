const { Blog } = require('../models');

exports.fetchBloglist = async () => {
  const blogs = await Blog.find({}).exec();
  return blogs;
};

exports.addEntry = async (fields) => {
  const blog = new Blog(fields);
  const savedBlog = await blog.save();
  return savedBlog;
};

// throw new NotFoundError if blogs.length === 0;
// throw custom errors (if predictable) and handle in controller's catch block
// No need for try/catch block, just throw any custom errors and they along with
// server errors will be caught in controller catch block
// Throw custom and uncaught exceptions in service, catch in controller
