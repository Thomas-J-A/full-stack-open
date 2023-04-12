const supertest = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../../app');
const { seedUser } = require('../seeders');

const api = supertest(app);

const createAuthedUser = () => {
  const user = {};

  const userInfo = {
    username: faker.internet.userName(),
    name: faker.name.fullName(),
    password: faker.internet.password(10),
  };

  // Seed a new user and log them in
  beforeEach(async () => {
    await seedUser(userInfo);

    const res = await api
      .post('/api/login')
      .send({
        username: userInfo.username,
        password: userInfo.password,
      });

    user.data = res.body.user;
    user.token = res.body.token;
  });

  return user;
};

module.exports = createAuthedUser;
