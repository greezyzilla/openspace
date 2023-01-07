import { isRejectedWithValue } from '@reduxjs/toolkit';
import { renderHook } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { createUser } from '../../tests/userHelpers';
import { capitalize, getAccessToken, removeAccessToken } from '../../utils';
import { useAppSelector } from '../redux';
import { useRequest } from '..';
import { createFailedResponse, createSuccessResponse } from '../../tests/utilsHelpers';

jest.mock('../redux', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('next/router', () => ({ useRouter: jest.fn() }));
jest.mock('@reduxjs/toolkit', () => ({ isRejectedWithValue: jest.fn() }));
jest.mock('react-toastify', () => ({ toast: { error: jest.fn(), success: jest.fn() } }));
jest.mock('../../utils', () => ({
  getAccessToken: jest.fn(),
  capitalize: jest.fn((text: string) => text),
  removeAccessToken: jest.fn(),
}));

afterAll(() => jest.clearAllMocks());

test('Should make useRequest work correctly if callback resolved', async () => {
  const user = createUser();
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(getAccessToken).mockReturnValue('test-token');
  jest.mocked(isRejectedWithValue).mockReturnValue(false);

  const { result } = renderHook(() => useRequest());
  const request = result.current;

  const mockReturnValue = { type: 'test_type', payload: createSuccessResponse({}, {}) };
  const mockDispatch : any = jest.fn().mockResolvedValue(mockReturnValue);
  const returnValue = await request(mockDispatch);

  expect(isRejectedWithValue).toBeCalledWith(mockReturnValue);
  expect(capitalize).toBeCalledWith('Fetch success');
  expect(toast.success).toBeCalledWith('Fetch success');
  expect(returnValue).toStrictEqual(mockReturnValue);
});

test('Should make useRequest work correctly if callback rejected for 401 error', async () => {
  const user = createUser();
  const mockState = { auth: { user } } as any;
  const mockedPush = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(getAccessToken).mockReturnValue('test-token');
  jest.mocked(isRejectedWithValue).mockReturnValue(true);
  jest.mocked(useRouter).mockReturnValue({ push: mockedPush } as any);

  const { result } = renderHook(() => useRequest());
  const request = result.current;

  const mockReturnValue = { type: 'test_type', payload: createFailedResponse({ code: 401 }) };
  const mockDispatch : any = jest.fn().mockResolvedValue(mockReturnValue);
  const returnValue = await request(mockDispatch);

  expect(isRejectedWithValue).toBeCalledWith(mockReturnValue);
  expect(capitalize).toBeCalledWith('Fetch failed');
  expect(toast.error).toBeCalledWith('Fetch failed');
  expect(removeAccessToken).toBeCalled();
  expect(mockedPush).toBeCalledWith('/auth/login');
  expect(returnValue).toStrictEqual(mockReturnValue);
});

test('Should make useRequest work correctly if have no token or not authenticated', async () => {
  const mockedPush = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb({ auth: { user: undefined } } as any));
  jest.mocked(getAccessToken).mockReturnValue(null);
  jest.mocked(useRouter).mockReturnValue({ push: mockedPush } as any);

  const { result } = renderHook(() => useRequest());
  const request = result.current;

  const mockReturnValue = { type: 'test_type' };
  const mockDispatch : any = jest.fn().mockResolvedValue(mockReturnValue);
  await request(mockDispatch);

  expect(toast.error).toBeCalledWith('Please Login To Continue');
  expect(mockedPush).toBeCalledWith('/auth/login');
});

test('Should make useRequest work correctly if have no payload to return', async () => {
  const user = createUser();
  const mockState = { auth: { user } } as any;
  const mockedPush = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(getAccessToken).mockReturnValue('test-token');
  jest.mocked(useRouter).mockReturnValue({ push: mockedPush } as any);

  const { result } = renderHook(() => useRequest());
  const request = result.current;

  const mockReturnValue = { type: 'test_type' };
  const mockDispatch : any = jest.fn().mockResolvedValue(mockReturnValue);
  const returnValue = await request(mockDispatch);

  expect(returnValue).toBe(null);
});
