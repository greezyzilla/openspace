import { render, screen } from '@testing-library/react';
import LeaderboardItem from '../leaderboardItem';
import { createUser } from '../../../../tests/userHelpers';

test('Should render leaderboard item correctly', () => {
  const user = createUser();

  render(<LeaderboardItem no={1} score={1200} user={user} />);

  expect(screen.queryByText('1.')).not.toBe(null);
  expect(screen.queryByText('User ke-1')).not.toBe(null);
  expect(screen.queryByText('1200')).not.toBe(null);
  expect(screen.queryByText('user1@mail.test')).not.toBe(null);
});

test('Should render leaderboard item skeleton correctly', () => {
  const { container } = render(<LeaderboardItem.Skeleton />);

  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});
