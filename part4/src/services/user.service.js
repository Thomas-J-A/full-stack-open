const { ConflictError } = require('../lib/errors');
const { ERROR_CODES } = require('../data/constants');
const { User } = require('../models');

const fetchUsers = async () => {
  const users = await User.find({}).exec();
  return users;
};

const registerUser = async (username, name, password) => {
  const existingUser = await User.findOne({ username }).exec();

  if (existingUser) {
    throw new ConflictError(
      ERROR_CODES.USERNAME_TAKEN,
      `Username ${username} already exists`,
    );
  }

  const user = new User({
    username,
    name,
    password,
  });

  const newUser = await user.save();
  return newUser;
};

module.exports = {
  fetchUsers,
  registerUser,
};
