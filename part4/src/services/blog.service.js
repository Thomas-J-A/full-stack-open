const { Blog } = require('../models');
const {
  ForbiddenError,
  NotFoundError,
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
}, user) => {
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  // Save new blog document
  const savedBlog = await blog.save();

  // Add blog to user document
  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();

  // Frontend needs to display user's name
  // By default, user only holds an ObjectId
  await savedBlog.populate('user', 'name');

  return savedBlog;
};

// await post.populate({
//   path: 'postedBy',
//   select: 'fullName avatarUrl',
// });

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

const removeEntry = async (user, id) => {
  const blog = await Blog.findById(id).exec();

  if (blog === null) {
    throw new NotFoundError(
      ERROR_CODES.RESOURCE_NOT_FOUND,
      `Blog with id ${id} not found`,
    );
  }

  if (!blog.user.equals(user._id)) {
    throw new ForbiddenError(
      ERROR_CODES.NOT_AUTHORIZED,
      'Only the creater of this blog may delete it',
    );
  }

  // Remove blog from collection
  await Blog.findByIdAndRemove(id).exec();

  // Remove blog reference in user document
  user.blogs = user.blogs.filter((blogRef) => !blogRef.equals(id));
  await user.save();
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
