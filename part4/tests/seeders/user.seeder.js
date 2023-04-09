const { faker } = require('@faker-js/faker');

const { User } = require('../../src/models');

const seedUser = async (data = {}) => {
  const user = new User({
    username: data.username || faker.internet.userName(),
    name: data.name || faker.name.fullName(),
    password: data.password || faker.internet.password(10),
  });

  await user.save();

  return user;
};

module.exports = seedUser;
