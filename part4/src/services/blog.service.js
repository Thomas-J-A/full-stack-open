const { Blog } = require('../models');
const { NotFoundError } = require('../lib/errors');
const { ERROR_CODES } = require('../data/constants');

const fetchBloglist = async () => {
  const blogs = await Blog.find({}).exec();
  return blogs;
};

const addEntry = async (fields) => {
  const blog = new Blog(fields);
  const savedBlog = await blog.save();
  return savedBlog;
};

const updateLikes = async (id) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true },
  );

  if (updatedBlog === null) {
    throw new NotFoundError(
      ERROR_CODES.RESOURCE_NOT_FOUND,
      `Blog with id ${id} not found`,
    );
  }

  return updatedBlog;
};

const removeEntry = async (id) => {
  await Blog.findByIdAndRemove(id).exec();
};

module.exports = {
  fetchBloglist,
  addEntry,
  updateLikes,
  removeEntry,
};

// throw custom errors (if predictable) and handle in controller's catch block
// No need for try/catch block, just throw any custom errors and they along with
// server errors will be caught in controller catch block
