import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggleable from './Toggleable';

describe('<Toggleable />', () => {
  it('renders create new blog button by default', () => {
    render(
      <Toggleable buttonLabel="Create New Blog">
        Inner content
      </Toggleable>,
    );

    expect(screen.getByTestId('hideWhenVisible')).toBeVisible();
    expect(screen.getByTestId('showWhenVisible')).not.toBeVisible();
  });

  it('renders a new blog form when button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Toggleable buttonLabel="Create New Blog">
        Inner content
      </Toggleable>,
    );

    await user.click(screen.getByRole('button', { name: /create new blog/i }));

    expect(screen.getByTestId('showWhenVisible')).toBeVisible();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeVisible();

    expect(screen.getByTestId('hideWhenVisible')).not.toBeVisible();
    expect(screen.queryByRole('button', { name: /create new blog/i })).not.toBeInTheDocument();
  });

  it('hides new blog form when cancel button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Toggleable buttonLabel="Create New Blog">
        Inner content
      </Toggleable>,
    );

    await user.click(screen.getByRole('button', { name: /create new blog/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(screen.getByTestId('showWhenVisible')).not.toBeVisible();
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();

    expect(screen.getByTestId('hideWhenVisible')).toBeVisible();
    expect(screen.getByRole('button', { name: /create new blog/i })).toBeVisible();
  });
});
