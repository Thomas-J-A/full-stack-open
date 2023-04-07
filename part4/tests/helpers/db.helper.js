const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

// Start in-memory database and connect with mongoose
const setUp = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  mongoose
    .connect(uri)
    .then(() => {
      console.log('Successfully connected to MongoDB test db');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB test db:', err);
    });
};

// Close mongoose connection and stop in-memory database
const close = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};

// Clear database after each test
const clear = async () => {
  const { collections } = mongoose.connection;

  /* eslint-disable */
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  /* eslint-enable */
};

module.exports = {
  setUp,
  close,
  clear,
};
