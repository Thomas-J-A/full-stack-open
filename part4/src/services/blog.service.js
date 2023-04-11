const jwt = require('jsonwebtoken');

const env = require('../configs/env.config');
const { Blog, User } = require('../models');
const {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError
} = require('../lib/errors');
const { ERROR_CODES } = require('../data/constants');

const fetchBloglist = async () => {
  const blogs = await Blog
    .find({})
    .populate('user', 'username name')
    .exec();
  return blogs;
};

const addEntry = async ({
  title, author, url, likes,
}, token) => {
  const payload = jwt.verify(token, env.AUTH_TOKEN_SECRET);

  if (!payload.sub) {
    throw new UnauthorizedError(
      ERROR_CODES.AUTH_TOKEN_MISSING_CLAIM,
      'Auth token requires the sub claim',
    );
  }

  const user = await User.findById(payload.sub).exec();

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  // Add blog to user document
  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();

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

const removeEntry = async (token, id) => {
  const payload = jwt.verify(token, env.AUTH_TOKEN_SECRET);

  if (!payload.sub) {
    throw new UnauthorizedError(
      ERROR_CODES.AUTH_TOKEN_MISSING_CLAIM,
      'Auth token requires the sub claim',
    );
  }

  const user = await User.findById(payload.sub).exec();
  const blog = await Blog.findById(id).exec();

  if (!blog.user.equals(user._id)) {
    throw new ForbiddenError(
      ERROR_CODES.NOT_AUTHORIZED,
      'Only the creater of this blog may delete it',
    );
  }

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
