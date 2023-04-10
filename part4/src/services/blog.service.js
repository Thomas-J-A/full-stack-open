const { Blog, User } = require('../models');
const { NotFoundError } = require('../lib/errors');
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
}) => {
  const user = await User.findOne({}).exec();

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
