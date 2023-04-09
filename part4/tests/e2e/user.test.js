const supertest = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../../app');
const { db, fetchCollection } = require('../helpers');
const { seedUser } = require('../seeders');

const api = supertest(app);

/* eslint-disable no-return-await */
beforeAll(async () => await db.setUp());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const data = {
      username: faker.internet.userName(),
      name: faker.name.fullName(),
      password: faker.internet.password(10),
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(201);

    const users = await fetchCollection('User');

    expect(users).toHaveLength(1);
    expect(users[0].username).toBe(data.username);
  });

  it('should return 409 if username already exists', async () => {
    const popularUsername = faker.internet.userName();

    await seedUser({ username: popularUsername });

    const data = {
      username: popularUsername,
      name: faker.name.fullName(),
      password: faker.internet.password(10),
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(409);
    expect(res.body.code).toBe('USERNAME_TAKEN');
    expect(res.body.message).toBe(`Username ${popularUsername} already exists`);

    const users = await fetchCollection('User');
    expect(users).toHaveLength(1);
  });

  it('should return 400 if username is missing', async () => {
    const data = {
      name: faker.name.fullName(),
      password: faker.internet.password(10),
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
    expect(res.body.message).toBe('Username is required');

    const users = await fetchCollection('User');
    expect(users).toHaveLength(0);
  });

  it('should return 400 if username is less than 3 characters', async () => {
    const data = {
      username: 'fo',
      name: faker.name.fullName(),
      password: faker.internet.password(10),
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
    expect(res.body.message).toBe('Username must be at least 3 characters');

    const users = await fetchCollection('User');
    expect(users).toHaveLength(0);
  });

  it('should return 400 if name is missing', async () => {
    const data = {
      username: faker.internet.userName(),
      password: faker.internet.password(10),
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
    expect(res.body.message).toBe('Name is required');

    const users = await fetchCollection('User');
    expect(users).toHaveLength(0);
  });

  it('should return 400 if name is empty', async () => {
    const data = {
      username: faker.internet.userName(),
      name: '',
      password: faker.internet.password(10),
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
    expect(res.body.message).toBe('Name must not be empty');

    const users = await fetchCollection('User');
    expect(users).toHaveLength(0);
  });

  it('should return 400 if password is missing', async () => {
    const data = {
      username: faker.internet.userName(),
      name: faker.name.fullName(),
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
    expect(res.body.message).toBe('Password is required');

    const users = await fetchCollection('User');
    expect(users).toHaveLength(0);
  });

  it('should return 400 if password is less than 3 characters', async () => {
    const data = {
      username: faker.internet.userName(),
      name: faker.name.fullName(),
      password: 'fo',
    };

    const res = await api
      .post('/api/users')
      .send(data);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
    expect(res.body.message).toBe('Password must be at least 3 characters');

    const users = await fetchCollection('User');
    expect(users).toHaveLength(0);
  });
});
