import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import BlogList from './BlogList';
import Blog from '../Blog/Blog';

jest.mock('../Blog/Blog');

afterEach(() => jest.resetAllMocks());

describe('<BlogList />', () => {
  it('renders a list of blogs', () => {
    const blogs = [
      {
        id: 1,
        title: faker.lorem.words(3),
        author: faker.name.fullName(),
        url: faker.internet.url(),
        user: {},
        likes: 100,
      },
      {
        id: 2,
        title: faker.lorem.words(3),
        author: faker.name.fullName(),
        url: faker.internet.url(),
        user: {},
        likes: 10,
      },
    ];

    const user = {
      user: {},
      token: '',
    };

    render(
      <BlogList
        blogs={blogs}
        setBlogs={jest.fn()}
        setErrorMsg={jest.fn()}
        user={user}
      />,
    );

    expect(Blog).toHaveBeenCalledTimes(2);
  });

  it('handles an empty list', () => {
    const user = {
      user: {},
      token: '',
    };

    render(
      <BlogList
        blogs={[]}
        setBlogs={jest.fn()}
        setErrorMsg={jest.fn()}
        user={user}
      />,
    );

    expect(Blog).not.toHaveBeenCalled();
  });
});
