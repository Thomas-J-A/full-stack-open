const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const sum = blogs.reduce((acc, currentBlog) => (
    acc + currentBlog.likes
  ), 0);

  return sum;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const reducer = (prev, current) => (
    prev.likes > current.likes ? prev : current
  );

  const mostLikedBlog = blogs.reduce(reducer);

  return mostLikedBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // Group by author and display count of their blogs
  const authorAndCounts = _.countBy(blogs, 'author');

  // Find author with most blogs and format result
  const res = _.reduce(authorAndCounts, (acc, value, key) => {
    if (!acc.author) {
      return { author: key, blogs: value };
    }

    if (value > acc.blogs) {
      acc.author = key;
      acc.blogs = value;
    }

    return acc;
  }, {});

  return res;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // { author: [blogs] }
  const authorsAndBlogs = _.groupBy(blogs, 'author');

  // [{ author, likes }]
  const authorsAndLikes = _.reduce(authorsAndBlogs, (acc, value, key) => {
    const author = key;
    const likes = _.sumBy(value, 'likes');

    return [...acc, { author, likes }];
  }, []);

  // { author, likes }
  const res = authorsAndLikes.reduce((prev, cur) => (
    prev.likes > cur.likes ? prev : cur
  ));

  return res;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
