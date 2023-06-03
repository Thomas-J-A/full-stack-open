import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

import Blog from './Blog';

import blogServiceMock from '../../services/blog.service';

// All exported functions are auto-mocked (each property === Jest.fn())
jest.mock('../../services/blog.service');

// Mocks module to return just the 'like' mock function and implementation
// jest.mock('../../services/blog.service', () => ({
//   like: jest.fn().mockResolvedValue({}),
// }));

const setup = () => {
  const setBlogs = jest.fn();
  const setErrorMsg = jest.fn();

  const blog = {
    title: faker.lorem.words(3),
    author: faker.name.fullName(),
    url: faker.internet.url(),
    user: { name: faker.name.fullName() },
  };

  const user = {
    user: { name: faker.name.fullName() },
    token: '',
  };

  render(
    <Blog
      blog={blog}
      setBlogs={setBlogs}
      setErrorMsg={setErrorMsg}
      user={user}
    />,
  );

  return {
    setBlogs,
    setErrorMsg,
    blog,
    user,
  };
};

afterEach(() => jest.resetAllMocks());

describe('<Blog />', () => {
  it('displays title and author', () => {
    const { blog } = setup();

    expect(screen.getByText(new RegExp(blog.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(blog.author, 'i'))).toBeInTheDocument();
  });

  it('does not display URL and likes by default', () => {
    const { blog } = setup();

    expect(
      screen.queryByText(new RegExp(blog.url, 'i')),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Likes/)).not.toBeInTheDocument();
  });

  it('displays URL and likes after clicking button', async () => {
    const { blog } = setup();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /View/i }));

    expect(screen.getByText(new RegExp(blog.url, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Likes/)).toBeInTheDocument();
  });

  it('calls event handler twice if button clicked twice', async () => {
    blogServiceMock.like.mockResolvedValue({});

    const { setBlogs } = setup();

    const user = userEvent.setup();

    // Expand blog info
    await user.click(screen.getByRole('button', { name: /View/i }));

    // Like blog
    const likeButton = screen.getByRole('button', { name: /Like/i });
    await user.click(likeButton);
    await user.click(likeButton);

    expect(setBlogs).toHaveBeenCalledTimes(2);
  });
});
