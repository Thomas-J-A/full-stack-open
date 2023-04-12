const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const { Blog } = require('../../src/models');
const { getRandomNumber } = require('../../src/utils');

const seedBlog = async (data = {}) => {
  const blog = new Blog({
    title: data.title || faker.lorem.words(3),
    author: data.author || faker.name.fullName(),
    url: data.url || faker.internet.url(),
    likes: data.likes || getRandomNumber(100),
    user: data.user || new mongoose.Types.ObjectId(),
  });

  await blog.save();

  return blog;
};

module.exports = seedBlog;
