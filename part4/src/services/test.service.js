const mongoose = require('mongoose');

const resetDb = async () => {
  const { collections } = mongoose.connection;

  /* eslint-disable */
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  /* eslint-disable */
};

module.exports = {
  resetDb,
};
