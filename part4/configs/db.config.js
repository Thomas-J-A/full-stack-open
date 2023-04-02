const mongoose = require('mongoose');

const env = require('./env.config');
const { logger } = require('../utils');

logger.info(`Connecting to ${env.MONGODB_URI}`);

mongoose
  .connect(env.MONGODB_URI)
  .then(() => {
    logger.info('Successfully connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB:', err);
  });
