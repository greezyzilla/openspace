import { render, screen } from '@testing-library/react';
import UserItem from '../userItem';
import { createUser } from '../../../../tests/userHelpers';

test('Should render user item correctly', () => {
  const user = createUser();

  render(<UserItem user={user} />);
  const image = screen.getByRole('img');

  expect(image).toBeDefined();
  expect(image.getAttribute('alt')).toBe('User ke-1');
  expect(screen.queryByText('User ke-1')).not.toBe(null);
  expect(screen.queryByText('user1@mail.test')).not.toBe(null);
});

test('Should render user item skeleton correctly', () => {
  const { container } = render(<UserItem.Skeleton />);

  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});
