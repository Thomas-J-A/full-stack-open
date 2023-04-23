import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

import LoginForm from './LoginForm';

import loginServiceMock from '../../services/login.service';

import logger from '../../utils/logger.util';

jest.mock('../../services/blog.service');
jest.mock('../../services/login.service');
jest.mock('../../utils/logger.util');

beforeEach(() => {
  loginServiceMock.logIn.mockResolvedValue({ user: {}, token: '' });
  Storage.prototype.setItem = jest.fn(); // Mock localStorage
});

afterEach(() => jest.resetAllMocks());

const username = faker.internet.userName();
const password = faker.internet.password();

const logIn = async (user) => {
  await user.type(screen.getByLabelText(/Username/i), username);
  await user.type(screen.getByLabelText(/Password/i), password);
  await user.click(screen.getByRole('button', { name: /Log In/i }));
};

describe('<LoginForm />', () => {
  it('renders login form', () => {
    render(<LoginForm setUser={jest.fn()} setErrorMsg={jest.fn()} />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
  });

  it('makes API request to backend', async () => {
    const user = userEvent.setup();

    render(<LoginForm setUser={jest.fn()} setErrorMsg={jest.fn()} />);

    await logIn(user);

    expect(loginServiceMock.logIn).toHaveBeenCalledWith({ username, password });
  });

  it('persists user in localStorage', async () => {
    const user = userEvent.setup();

    render(<LoginForm setUser={jest.fn()} setErrorMsg={jest.fn()} />);

    await logIn(user);

    expect(Storage.prototype.setItem).toHaveBeenCalled();
  });

  it('logs an error message if wrong credentials', async () => {
    loginServiceMock.logIn.mockRejectedValue('Huge error');
    const user = userEvent.setup();

    render(<LoginForm setUser={jest.fn()} setErrorMsg={jest.fn()} />);

    await logIn(user);

    expect(logger.error).toHaveBeenCalled();
  });
});
