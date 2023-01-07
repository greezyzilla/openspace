import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserNavigation } from '..';
import { useAppSelector } from '../../../hooks';
import { createUser } from '../../../tests/userHelpers';
import { postSignOut } from '../../../features/auth';

jest.mock('../../../hooks/redux', () => ({ useAppDispatch: () => (cb: () => {}) => cb, useAppSelector: jest.fn() }));
jest.mock('../../../features/auth', () => ({ postSignOut: jest.fn() }));

afterAll(() => jest.clearAllMocks());

test('Should render user navigation correctly when user logged in', async () => {
  const user = createUser();
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<UserNavigation />);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  const logoutButton = screen.getByText('Logout');
  await userEvent.click(logoutButton);

  expect(postSignOut).toBeCalled();
});

test('Should render user navigation for not authenticated user correctly', () => {
  render(<UserNavigation.NotAuthenticated />);

  expect(screen.queryByRole('link')?.getAttribute('href')).toBe('/auth/login');
  expect(screen.queryByText('Come Here to Sign In.')).not.toBe(null);
});
