import { render } from '@testing-library/react';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import App from '../_app';
import { getAccessToken } from '../../utils';
import { getThreads } from '../../features/thread';
import { getUsers } from '../../features/user';
import { getAuthenticatedUser } from '../../features/auth';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('../../utils', () => ({ getAccessToken: jest.fn(), removeAccessToken: jest.fn() }));
jest.mock('@reduxjs/toolkit', () => ({ isRejectedWithValue: jest.fn(), configureStore: jest.fn() }));
jest.mock('react-redux-loading-bar', () => jest.fn(() => <div>Loading-Bar</div>));
jest.mock('react-toastify', () => ({ ToastContainer: () => <div>Toast-Container</div> }));
jest.mock('react-redux', () => ({ Provider: jest.fn(({ children }: any) => <div>{children}</div>) }));
jest.mock('../../features/auth', () => ({ getAuthenticatedUser: jest.fn() }));
jest.mock('../../features/thread', () => ({ getThreads: jest.fn() }));
jest.mock('../../features/user', () => ({ getUsers: jest.fn() }));
jest.mock('../../hooks', () => ({
  useAppDispatch: () => (cb: () => {}) => new Promise((res: any) => res(cb)),
}));

test('Should do nothing if path is guest path and has no access token', () => {
  const mockedRouter = {
    asPath: '/', isReady: true, replace: jest.fn(), pathName: '/',
  } as any;
  jest.mocked(getThreads).mockReset();
  jest.mocked(getUsers).mockReset();
  jest.mocked(useRouter).mockReset().mockReturnValue(mockedRouter);
  jest.mocked(getAccessToken).mockReset().mockReturnValue(undefined);

  render(<App
    Component={() => <div>Hello</div>}
    pageProps={{ }}
    router={{} as any}
  />);

  expect(getThreads).toBeCalled();
  expect(getUsers).toBeCalled();
});

test('Should do nothing if path is guest path and has access token', () => {
  const mockedRouter = { asPath: '/', isReady: true, replace: jest.fn() } as any;
  jest.mocked(getThreads).mockReset();
  jest.mocked(getUsers).mockReset();
  jest.mocked(useRouter).mockReset().mockReturnValue(mockedRouter);
  jest.mocked(getAccessToken).mockReset().mockReturnValue('dummy token');
  jest.mocked(getAuthenticatedUser).mockReset().mockReturnValue('authenticated-user' as any);
  jest.mocked(isRejectedWithValue).mockReset().mockReturnValue(false);

  render(<App
    Component={() => <div>Hello</div>}
    pageProps={{ }}
    router={{} as any}
  />);

  expect(getThreads).toBeCalled();
  expect(getUsers).toBeCalled();
  expect(getAuthenticatedUser).toBeCalled();
});

test('Should do nothing if path is guest path and has access token (rejected)', () => {
  const mockedRouter = { asPath: '/', isReady: true, replace: jest.fn() } as any;
  jest.mocked(getThreads).mockReset();
  jest.mocked(getUsers).mockReset();
  jest.mocked(useRouter).mockReset().mockReturnValue(mockedRouter);
  jest.mocked(getAccessToken).mockReset().mockReturnValue('dummy token');
  jest.mocked(getAuthenticatedUser).mockReset().mockReturnValue('authenticated-user' as any);
  jest.mocked(isRejectedWithValue).mockReset().mockImplementation(jest.fn(() => true));

  render(<App
    Component={() => <div>Hello</div>}
    pageProps={{ }}
    router={{} as any}
  />);

  expect(getThreads).toBeCalled();
  expect(getUsers).toBeCalled();
});

test('Should do nothing if path is not guest path and has access token', () => {
  const mockedReplace = jest.fn();
  const mockedRouter = { asPath: '/login', isReady: true, replace: mockedReplace } as any;
  jest.mocked(getThreads).mockReset();
  jest.mocked(getUsers).mockReset();
  jest.mocked(useRouter).mockReset().mockReturnValue(mockedRouter);
  jest.mocked(getAccessToken).mockReset().mockReturnValue('dummy token');
  jest.mocked(getAuthenticatedUser).mockReset().mockReturnValue('authenticated-user' as any);
  jest.mocked(isRejectedWithValue).mockReset().mockReturnValue(false);

  render(<App
    Component={() => <div>Hello</div>}
    pageProps={{ }}
    router={{} as any}
  />);

  expect(getThreads).not.toBeCalled();
  expect(getUsers).not.toBeCalled();
  expect(getAuthenticatedUser).not.toBeCalled();
  expect(mockedReplace).toBeCalledWith('/');
});
