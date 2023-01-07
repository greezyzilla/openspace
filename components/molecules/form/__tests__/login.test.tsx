import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import LoginForm from '../login';
import { capitalize, fetchWithoutToken } from '../../../../utils';
import { createFailedResponse, createSuccessResponse, wait } from '../../../../tests/utilsHelpers';
import { authReducer } from '../../../../features';

jest.mock('next/router', () => ({ useRouter: (jest.fn()) }));
jest.mock('react-toastify');
jest.mock('../../../../utils', () => ({
  fetchWithoutToken: jest.fn(),
  putAccessToken: jest.fn(),
  capitalize: jest.fn((text: string) => text),
}));

afterAll(() => jest.clearAllMocks());

test('Should provide correct behavior when changing and submitting login form', async () => {
  const mockedReplace = jest.fn();
  const store = configureStore({ reducer: { auth: authReducer } });
  jest.mocked(fetchWithoutToken).mockResolvedValue(createSuccessResponse({}, { token: 'test-token' }));
  jest.mocked(useRouter).mockReturnValue({ replace: mockedReplace } as any);
  jest.mocked(toast.success).mockReset();
  jest.mocked(toast.error).mockReset();

  render(<Provider store={store}><LoginForm /></Provider>);
  const inputEmail = screen.getByPlaceholderText('email@example.com');
  const inputPassword = screen.getByPlaceholderText('*********');
  const button = screen.getByRole('button');
  await userEvent.type(inputEmail, 'test@mail.com');
  await userEvent.type(inputPassword, 'password');
  await userEvent.click(button);
  await wait(600);

  expect(mockedReplace).toBeCalledWith('/');
  expect(toast.success).toBeCalledWith('Login success');
});

test('Should provide correct behavior when changing and submitting login form (Fetch Failed)', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  jest.mocked(fetchWithoutToken).mockResolvedValue(createFailedResponse());
  jest.mocked(toast.success).mockReset();
  jest.mocked(toast.error).mockReset();

  render(<Provider store={store}><LoginForm /></Provider>);
  const inputEmail = screen.getByPlaceholderText('email@example.com');
  const inputPassword = screen.getByPlaceholderText('*********');
  const button = screen.getByRole('button');
  await userEvent.type(inputEmail, 'test@mail.com');
  await userEvent.type(inputPassword, 'password');
  await userEvent.click(button);

  expect(toast.success).not.toBeCalled();
  expect(capitalize).toBeCalledWith('Fetch failed');
  expect(toast.error).toBeCalledWith('Fetch failed');
});
