import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  it('calls event handler with correct arguments on submit', async () => {
    const createBlog = jest.fn();

    const inputData = {
      title: faker.lorem.words(3),
      author: faker.name.fullName(),
      url: faker.internet.email(),
    };

    render(<NewBlogForm createBlog={createBlog} />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Meditations'), inputData.title);
    await user.type(screen.getByPlaceholderText('Marcus Aurelius'), inputData.author);
    await user.type(screen.getByPlaceholderText('meditations-book.co.uk'), inputData.url);

    await user.click(screen.getByRole('button', { name: /Create/i }));

    expect(createBlog).toHaveBeenCalledWith(inputData);
  });
});
