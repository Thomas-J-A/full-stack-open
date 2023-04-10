const { loginService } = require('../services');

const logIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userAndToken = await loginService.logIn(username, password);
    res.status(200).json(userAndToken);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  logIn,
};
