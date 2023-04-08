const supertest = require('supertest');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const app = require('../../app');
const { db, seedMultiple } = require('../helpers');
const { seedBlog } = require('../seeders');
const { getRandomNumber } = require('../../src/utils');

const api = supertest(app);

/* eslint-disable no-return-await */
beforeAll(async () => await db.setUp());
afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('GET /api/blogs', () => {
  it('should return data in JSON', async () => {
    await seedBlog();

    const res = await api
      .get('/api/blogs');

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });

  it('should return correct amount of blog posts', async () => {
    await seedMultiple(seedBlog, 2);

    const res = await api
      .get('/api/blogs');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('should return blogs with an id field', async () => {
    await seedBlog();

    const res = await api
      .get('/api/blogs');

    expect(res.body[0].id).toBeDefined();
  });

  it('should remove _id and __v fields', async () => {
    await seedBlog();

    const res = await api
      .get('/api/blogs');

    expect(res.body[0]._id).not.toBeDefined();
    expect(res.body[0].__v).not.toBeDefined();
  });
});

describe('POST /api/blogs', () => {
  it('should create a new blog', async () => {
    const data = {
      title: faker.lorem.words(3),
      author: faker.name.fullName(),
      url: faker.internet.url(),
      likes: getRandomNumber(100),
    };

    const res = await api
      .post('/api/blogs')
      .send(data);

    expect(res.statusCode).toBe(201);

    const blogs = await api
      .get('/api/blogs');

    expect(blogs.body).toHaveLength(1);
    expect(blogs.body[0].title).toBe(data.title);
    expect(blogs.body[0].author).toBe(data.author);
    expect(blogs.body[0].url).toBe(data.url);
    expect(blogs.body[0].likes).toBe(data.likes);
  });

  it('should default likes to 0 if property is missing', async () => {
    const dataWithoutLikes = {
      title: faker.lorem.words(3),
      author: faker.name.fullName(),
      url: faker.internet.url(),
    };

    const res = await api
      .post('/api/blogs')
      .send(dataWithoutLikes);

    expect(res.statusCode).toBe(201);

    const blogs = await api
      .get('/api/blogs');

    expect(blogs.body[0].likes).toBe(0);
  });

  it('should return 400 if \'title\' field is missing', async () => {
    const dataWithoutTitle = {
      author: faker.name.fullName(),
      url: faker.internet.url(),
    };

    const res = await api
      .post('/api/blogs')
      .send(dataWithoutTitle);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
  });

  it('should return 400 if \'author\' field is missing', async () => {
    const dataWithoutAuthor = {
      title: faker.lorem.words(3),
      url: faker.internet.url(),
    };

    const res = await api
      .post('/api/blogs')
      .send(dataWithoutAuthor);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
  });

  it('should return 400 if \'url\' field is missing', async () => {
    const dataWithoutUrl = {
      title: faker.lorem.words(3),
      author: faker.name.fullName(),
    };

    const res = await api
      .post('/api/blogs')
      .send(dataWithoutUrl);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('VALIDATION_FAILURE');
  });
});

describe('PUT /api/blogs/:id', () => {
  it('should update number of likes', async () => {
    const blog = await seedBlog({ likes: 50 });

    const res = await api
      .put(`/api/blogs/${blog._id}`);

    expect(res.statusCode).toBe(200);

    const blogs = await api
      .get('/api/blogs');

    expect(blogs.body[0].likes).toBe(51);
  });

  it('should return 404 if blog doesn\'t exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();

    const res = await api
      .put(`/api/blogs/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.code).toBe('RESOURCE_NOT_FOUND');
  });

  it('should return 400 if \'id\' is invalid', async () => {
    const invalidId = getRandomNumber(1000);

    const res = await api
      .put(`/api/blogs/${invalidId}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('CASTING_FAILURE');
  });
});

describe('DELETE /api/blogs/:id', () => {
  it('should return 204', async () => {
    const blog = await seedBlog();

    const res = await api
      .delete(`/api/blogs/${blog._id}`);

    expect(res.statusCode).toBe(204);
  });

  it('should remove blog from database', async () => {
    const blog = await seedBlog();

    const res = await api
      .delete(`/api/blogs/${blog._id}`);

    expect(res.statusCode).toBe(204);

    const blogs = await api
      .get('/api/blogs');

    expect(blogs.body).toHaveLength(0);
  });

  it('should return 204 if blog doesn\'t exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();

    const res = await api
      .delete(`/api/blogs/${fakeId}`);

    expect(res.statusCode).toBe(204);
  });

  it('should return 400 if \'id\' is invalid', async () => {
    const invalidId = getRandomNumber(1000);

    const res = await api
      .delete(`/api/blogs/${invalidId}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('CASTING_FAILURE');
  });
});