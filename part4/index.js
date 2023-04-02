const app = require('./app');
const { env } = require('./configs');
const { logger } = require('./utils');

app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});
