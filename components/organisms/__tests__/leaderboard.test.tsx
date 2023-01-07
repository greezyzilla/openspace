import { render } from '@testing-library/react';
import { getLeaderboards } from '../../../features/user';
import Leaderboard from '../leaderboards';
import { useAppSelector } from '../../../hooks';
import { createUser } from '../../../tests/userHelpers';

jest.mock('../../../hooks', () => ({
  useAppDispatch: () => (cb:() => {}) => cb,
  useAppSelector: jest.fn(),
}));

jest.mock('../../../features/user', () => ({ getLeaderboards: jest.fn() }));

afterAll(() => jest.clearAllMocks());

test('Should render leaderboard correctly when isLoading is false', () => {
  const user1 = createUser({}, 1);
  const user2 = createUser({}, 2);
  const leaderboards = [{ user: user1, score: 500 }, { user: user2, score: 300 }];
  const mockState = { user: { leaderboards, loading: false } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  const { container } = render(<Leaderboard />);

  expect(getLeaderboards).toBeCalled();
  expect(container.querySelector('.flex.flex-col.gap-4')?.children.length).toBe(2);
});

test('Should render leaderboard correctly when isLoading is true', () => {
  const mockState = { user: { leaderboards: [], loading: true } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  const { container } = render(<Leaderboard />);

  expect(getLeaderboards).toBeCalled();
  expect(container.querySelector('.flex.flex-col.gap-4')?.children.length).toBe(10);
  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});
