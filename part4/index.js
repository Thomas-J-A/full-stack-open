const app = require('./app');
const { env } = require('./src/configs');
const { logger } = require('./src/utils');

app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});
