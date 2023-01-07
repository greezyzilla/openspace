import { toast } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { createFailedResponse, createSuccessResponse } from '../../../../tests/utilsHelpers';
import { capitalize, fetchWithoutToken } from '../../../../utils';
import { createUser } from '../../../../tests/userHelpers';
import { authReducer } from '../../../../features';
import RegisterForm from '../register';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('react-toastify');
jest.mock('../../../../utils', () => ({
  fetchWithoutToken: jest.fn(),
  putAccessToken: jest.fn(),
  capitalize: jest.fn((text: string) => text),
}));

afterAll(() => jest.clearAllMocks());

test('Should provide correct behavior when changing and submitting register form', async () => {
  const user = createUser({ email: 'test@mail', name: 'test user' });
  const mockedReplace = jest.fn();
  const store = configureStore({ reducer: { auth: authReducer } });
  jest.mocked(fetchWithoutToken).mockResolvedValue(createSuccessResponse({}, { user }));
  jest.mocked(toast.success).mockReset();
  jest.mocked(toast.error).mockReset();
  jest.mocked(useRouter).mockReturnValue({ replace: mockedReplace } as any);

  render(<Provider store={store}><RegisterForm /></Provider>);
  const inputName = screen.getByPlaceholderText('Alexander Scotch, etc..');
  const inputEmail = screen.getByPlaceholderText('email@example.com');
  const inputPassword = screen.getAllByPlaceholderText('*********')[0];
  const inputPassword2 = screen.getAllByPlaceholderText('*********')[1];
  const button = screen.getByRole('button');
  await userEvent.type(inputName, 'test user');
  await userEvent.type(inputEmail, 'test@mail.com');
  await userEvent.type(inputPassword, 'password');
  await userEvent.type(inputPassword2, 'password');
  await userEvent.click(button);

  expect(mockedReplace).toBeCalledWith('/auth/login');
  expect(toast.success).toBeCalledWith('Register success');
});

test('Should provide correct behavior when changing and submitting register form (Password not match)', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  jest.mocked(toast.success).mockReset();
  jest.mocked(toast.error).mockReset();

  render(<Provider store={store}><RegisterForm /></Provider>);
  const inputName = screen.getByPlaceholderText('Alexander Scotch, etc..');
  const inputEmail = screen.getByPlaceholderText('email@example.com');
  const inputPassword = screen.getAllByPlaceholderText('*********')[0];
  const inputPassword2 = screen.getAllByPlaceholderText('*********')[1];
  const button = screen.getByRole('button');
  await userEvent.type(inputName, 'test user');
  await userEvent.type(inputEmail, 'test@mail.com');
  await userEvent.type(inputPassword, 'password');
  await userEvent.type(inputPassword2, 'passwords');
  await userEvent.click(button);

  expect(toast.success).not.toBeCalled();
  expect(toast.error).toBeCalledWith('Password doesn\'t match');
});

test('Should provide correct behavior when changing and submitting register form', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  jest.mocked(fetchWithoutToken).mockResolvedValue(createFailedResponse());
  jest.mocked(toast.success).mockReset();
  jest.mocked(toast.error).mockReset();

  render(<Provider store={store}><RegisterForm /></Provider>);
  const inputName = screen.getByPlaceholderText('Alexander Scotch, etc..');
  const inputEmail = screen.getByPlaceholderText('email@example.com');
  const inputPassword = screen.getAllByPlaceholderText('*********')[0];
  const inputPassword2 = screen.getAllByPlaceholderText('*********')[1];
  const button = screen.getByRole('button');
  await userEvent.type(inputName, 'test user');
  await userEvent.type(inputEmail, 'test@mail.com');
  await userEvent.type(inputPassword, 'password');
  await userEvent.type(inputPassword2, 'password');
  await userEvent.click(button);

  expect(toast.success).not.toBeCalled();
  expect(capitalize).toBeCalledWith('Fetch failed');
  expect(toast.error).toBeCalledWith('Fetch failed');
});
