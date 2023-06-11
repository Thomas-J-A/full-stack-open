const blogModel = require('./blog.model');
const commentModel = require('./comment.model');
const userModel = require('./user.model');

module.exports = {
  Blog: blogModel,
  Comment: commentModel,
  User: userModel,
};
