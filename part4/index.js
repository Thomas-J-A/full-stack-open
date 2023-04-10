const app = require('./app');
const env = require('./src/configs/env.config');
const { logger } = require('./src/utils');

app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT}`);
});
