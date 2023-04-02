const models = require('../models');

const attachModels = (req, res, next) => {
  req.models = models;

  next();
};

module.exports = attachModels;
