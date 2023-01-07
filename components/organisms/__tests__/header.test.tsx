import { render, screen } from '@testing-library/react';
import Header from '../header';
import { useAppSelector } from '../../../hooks';
import { createUser } from '../../../tests/userHelpers';

jest.mock('../../molecules/search', () => jest.fn(() => <div>Search</div>));
jest.mock('../../molecules/userNavigation', () => {
  const fn = () => <div>User Navigation</div>;
  fn.NotAuthenticated = function UserNavigationNotAuthenticated() {
    return <div>Not Authenticated</div>;
  };
  return fn;
});
jest.mock('../../../hooks', () => ({ useAppSelector: jest.fn() }));

afterAll(() => jest.clearAllMocks());

test('Should render header correctly when user authenticated', () => {
  const user = createUser({});
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<Header />);

  expect(screen.queryByText('OpenSpace')).not.toBe(null);
  expect(screen.queryByText('Search')).not.toBe(null);
  expect(screen.queryByText('User Navigation')).not.toBe(null);
});

test('Should render header correctly when user not authenticated', () => {
  const mockState = { auth: { user: undefined } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<Header />);

  expect(screen.queryByText('OpenSpace')).not.toBe(null);
  expect(screen.queryByText('Search')).not.toBe(null);
  expect(screen.queryByText('Not Authenticated')).not.toBe(null);
});
