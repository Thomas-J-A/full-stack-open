const testService = require('../services/test.service');

const resetDb = async (req, res, next) => {
  try {
    await testService.resetDb();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  resetDb,
};
