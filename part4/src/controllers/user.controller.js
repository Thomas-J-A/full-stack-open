const { userService } = require('../services');

const fetchUsers = async (req, res, next) => {
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  const {
    username,
    name,
    password,
  } = req.body;

  try {
    const newUser = await userService.registerUser(username, name, password);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchUsers,
  registerUser,
};
