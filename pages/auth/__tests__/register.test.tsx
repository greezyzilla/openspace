import { render, screen } from '@testing-library/react';
import Register from '../register.page';

jest.mock('../../../components/templates/auth', () => jest.fn(({ children }: any) => <div>{children}</div>));
jest.mock('../../../components/molecules/form/register', () => jest.fn(() => <div>Register-Form</div>));

afterAll(() => jest.clearAllMocks());

test('Should render home page correctly', () => {
  render(<Register />);

  expect(screen.queryByText('Register-Form')).not.toBe(null);
  expect(screen.queryByText('Register')).not.toBe(null);
  expect(screen.queryByText('Login here')).not.toBe(null);
});
