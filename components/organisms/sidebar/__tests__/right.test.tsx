import { render, screen } from '@testing-library/react';
import RightSidebar from '../right';
import { useAppSelector } from '../../../../hooks';
import { createUser } from '../../../../tests/userHelpers';

jest.mock('../../../../hooks', () => ({ useAppSelector: jest.fn() }));

afterAll(() => jest.clearAllMocks());

test('Should render right right sidebar correctly', () => {
  const user1 = createUser({}, 1);
  const user2 = createUser({}, 2);
  const users = [user1, user2];
  const mockState = { user: { users, loading: false } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  const { container } = render(<RightSidebar />);

  expect(container.querySelector('.mr-3.flex.flex-col.gap-1')?.children.length).toBe(2);
  expect(screen.queryByText(user1.name)).not.toBe(null);
  expect(screen.queryByText(user1.email)).not.toBe(null);
  expect(screen.queryByAltText(user1.name)).not.toBe(null);
  expect(screen.queryByText(user2.name)).not.toBe(null);
  expect(screen.queryByText(user2.email)).not.toBe(null);
  expect(screen.queryByAltText(user2.name)).not.toBe(null);
});

test('Should render right right sidebar skeleton correctly', () => {
  const mockState = { user: { users: [], loading: true } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  const { container } = render(<RightSidebar />);

  expect(container.querySelector('.mr-3.flex.flex-col.gap-1')?.children.length).toBe(8);
  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});
