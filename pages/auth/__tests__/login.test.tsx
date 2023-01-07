import { render, screen } from '@testing-library/react';
import Login from '../login';

jest.mock('../../../components/templates/auth', () => jest.fn(({ children }: any) => <div>{children}</div>));
jest.mock('../../../components/molecules/form/login', () => jest.fn(() => <div>Login-Form</div>));

afterAll(() => jest.clearAllMocks());

test('Should render home page correctly', () => {
  render(<Login />);

  expect(screen.queryByText('Login-Form')).not.toBe(null);
  expect(screen.queryByText('Login')).not.toBe(null);
  expect(screen.queryByText('Register here')).not.toBe(null);
});
