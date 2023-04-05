const listHelper = require('../../../src/utils/list-helper.util');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('dummy', () => {
  test('returns one', () => {
    const emptyBlogList = [];

    const res = listHelper.dummy(emptyBlogList);

    expect(res).toBe(1);
  });
});

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const res = listHelper.totalLikes([]);

    expect(res).toBe(0);
  });

  test('equals the likes value of a single blog that is passed', () => {
    const singleBlogList = [blogs[0]];

    const res = listHelper.totalLikes(singleBlogList);

    expect(res).toBe(7);
  });

  test('of a bigger list is calculated correctly', () => {
    const res = listHelper.totalLikes(blogs);

    expect(res).toBe(36);
  });
});

describe('favouriteBlog', () => {
  test('returns null if empty list', () => {
    const res = listHelper.favouriteBlog([]);

    expect(res).toBe(null);
  });

  test('returns only blog in list if list of one', () => {
    const singleBlogList = [blogs[0]];

    const res = listHelper.favouriteBlog(singleBlogList);

    expect(res).toEqual(blogs[0]);
  });

  test('returns most liked blog in list of multiple blogs', () => {
    const res = listHelper.favouriteBlog(blogs);

    expect(res).toEqual(blogs[2]);
  });
});

describe('mostBlogs', () => {
  test('returns null if empty list', () => {
    const res = listHelper.mostBlogs([]);

    expect(res).toBe(null);
  });

  test('returns only author in list if list of one', () => {
    const singleBlogList = [blogs[0]];

    const res = listHelper.mostBlogs(singleBlogList);

    expect(res).toEqual({
      author: blogs[0].author,
      blogs: 1,
    });
  });

  test('returns object representing author with most blogs', () => {
    const res = listHelper.mostBlogs(blogs);

    expect(res).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('mostLikes', () => {
  test('returns null if empty list', () => {
    const res = listHelper.mostLikes([]);

    expect(res).toBe(null);
  });

  test('returns only author in list if list of one', () => {
    const singleBlogList = [blogs[0]];

    const res = listHelper.mostLikes(singleBlogList);

    expect(res).toEqual({
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('returns object representing author with most likes', () => {
    const res = listHelper.mostLikes(blogs);

    expect(res).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
