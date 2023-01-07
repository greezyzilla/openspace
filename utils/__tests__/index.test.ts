import axios from 'axios';
import {
  getAccessToken, putAccessToken, removeAccessToken,
  baseURL, fetchWithoutToken, fetchWithToken,
  getTrendingCategoriesFromThreads, getFilteredThread,
  capitalize, getRelativeDate, importReactQuill,
} from '..';
import { createThread, getDateISO } from '../../tests/threadHelpers';
import { createUser } from '../../tests/userHelpers';

jest.mock('react-quill', () => ({ __esModule: true, default: jest.fn() }));

const mockLocalStorage : any = {
  getItem: jest.fn().mockReturnValue('dummy-token'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

const localStorageSpy = jest.spyOn(window, 'localStorage', 'get').mockImplementation(() => mockLocalStorage);
jest.mock('axios');

describe('Testing Utils Function', () => {
  afterAll(() => jest.clearAllMocks());

  describe('getAccessToken', () => {
    it('Should return stored token correctly', () => {
      const token = getAccessToken();

      expect(localStorage.getItem).toBeCalledWith('accessToken');
      expect(token).toStrictEqual('dummy-token');
    });

    it('Should return stored token correctly (empty)', () => {
      localStorageSpy.mockReturnValueOnce(undefined as any);

      const token = getAccessToken();

      expect(token).toStrictEqual(undefined);
    });
  });

  describe('putAccessToken', () => {
    it('Should call putAccessToken correctly', () => {
      const newToken = 'new-token';

      putAccessToken(newToken);

      expect(localStorage.setItem).toBeCalledWith('accessToken', newToken);
    });
  });

  describe('removeAccessToken', () => {
    it('Should call removeAccessToken correctly', () => {
      removeAccessToken();

      expect(localStorage.removeItem).toBeCalledWith('accessToken');
    });
  });

  describe('fetchWithoutToken', () => {
    it('Should return fetchWithoutToken response correctly (resolved)', async () => {
      const options = {};
      const mockedResponse = { status: 200, data: { status: 'success', message: 'Fetch Success', data: null } };
      jest.mocked(axios).mockReset().mockResolvedValue(mockedResponse);

      const response = await fetchWithoutToken('/', options);

      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, ...options });
      expect(response).toStrictEqual({
        code: mockedResponse.status,
        message: mockedResponse.data.message,
        status: mockedResponse.data.status,
        data: null,
      });
    });

    it('Should return fetchWithoutToken response correctly (rejected)', async () => {
      const options = {};
      const mockedResponse = { status: 500, data: { message: 'Fetch Failed', data: null } };
      jest.mocked(axios).mockReset().mockRejectedValue({ response: mockedResponse });

      const response = await fetchWithoutToken('/', options);

      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, ...options });
      expect(response).toStrictEqual({
        code: mockedResponse.status,
        message: mockedResponse.data.message,
        status: 'fail',
      });
    });

    it('Should return error 400 Bad request if no internet connection', async () => {
      const options = {};
      const mockedResponse = {};
      jest.mocked(axios).mockReset().mockRejectedValue({ response: mockedResponse });

      const response = await fetchWithoutToken('/', options);

      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, ...options });
      expect(response).toStrictEqual({
        code: 400,
        message: 'Bad request',
        status: 'fail',
      });
    });
  });

  describe('fetchWithToken', () => {
    it('Should return fetchWithToken response correctly (resolved)', async () => {
      const options = {};
      const mockedResponse = { status: 200, data: { status: 'success', message: 'Fetch Success', data: null } };
      jest.mocked(axios).mockReset().mockResolvedValue(mockedResponse);

      const response = await fetchWithToken('/', options);

      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, headers: { Authorization: 'Bearer dummy-token' } });
      expect(response).toStrictEqual({
        code: mockedResponse.status,
        message: mockedResponse.data.message,
        status: mockedResponse.data.status,
        data: null,
      });
    });

    it('Should return fetchWithToken response correctly (rejected)', async () => {
      const options = {};
      const mockedResponse = { status: 500, data: { message: 'Fetch Failed', data: null } };
      jest.mocked(axios).mockReset().mockRejectedValue({ response: mockedResponse });

      const response = await fetchWithToken('/', options);

      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, headers: { Authorization: 'Bearer dummy-token' } });
      expect(response).toStrictEqual({
        code: mockedResponse.status,
        message: mockedResponse.data.message,
        status: 'fail',
      });
    });

    it('Should call fetchWithToken response correctly with custom options', async () => {
      const options = { method: 'POST' };
      const mockedResponse = { status: 200, data: { status: 'success', message: 'Post Success', data: null } };
      jest.mocked(axios).mockReset().mockResolvedValue(mockedResponse);

      const response = await fetchWithToken('/', options);

      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, ...options, headers: { Authorization: 'Bearer dummy-token' } });
      expect(response).toStrictEqual({
        code: mockedResponse.status,
        message: mockedResponse.data.message,
        status: mockedResponse.data.status,
        data: null,
      });
    });

    it('Should return error 400 Bad request if no internet connection', async () => {
      const options = {};
      const mockedResponse = {};
      jest.mocked(axios).mockReset().mockRejectedValue({ response: mockedResponse });

      const response = await fetchWithToken('/', options);

      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, headers: { Authorization: 'Bearer dummy-token' } });
      expect(response).toStrictEqual({
        code: 400,
        message: 'Bad request',
        status: 'fail',
      });
    });

    it('Should remove stored accessToken if resolved with 401 not authorized', async () => {
      const options = {};
      const mockedResponse = { status: 401, data: { message: 'Fetch Failed', data: null } };
      jest.mocked(axios).mockReset().mockRejectedValue({ response: mockedResponse });

      const response = await fetchWithToken('/', options);

      expect(localStorage.removeItem).toBeCalledWith('accessToken');
      expect(axios).toBeCalledWith({ baseURL: `${baseURL}/`, headers: { Authorization: 'Bearer dummy-token' } });
      expect(response).toStrictEqual({
        code: mockedResponse.status,
        message: mockedResponse.data.message,
        status: 'fail',
      });
    });
  });

  describe('getTrendingCategoriesFromThreads', () => {
    it('Should return valid categories if called with valid threads', () => {
      const user = createUser();
      const threads = [
        createThread({ ownerId: user.id, category: 'react' }, 1),
        createThread({ ownerId: user.id, category: 'vue' }, 2),
        createThread({ ownerId: user.id, category: 'react' }, 3),
        createThread({ ownerId: user.id, category: 'angular' }, 4),
      ];

      const categories = getTrendingCategoriesFromThreads(threads);

      expect(categories.length).toStrictEqual(3);
      expect(categories[0]).toHaveProperty('category');
      expect(categories[0]).toHaveProperty('total');
    });
  });

  describe('capitalize', () => {
    it('Should return correct capitalized text (camel case))', () => {
      const payload = 'dummyText';

      const result = capitalize(payload);

      expect(result).toBe('DummyText');
    });

    it('Should return correct capitalized text (start with number)', () => {
      const payload = '123dummyText';

      const result = capitalize(payload);

      expect(result).toBe('123dummyText');
    });

    it('Should return correct capitalized text (general)', () => {
      const payload = 'dummy text';

      const result = capitalize(payload);

      expect(result).toBe('Dummy Text');
    });
  });

  describe('getRelativeDate', () => {
    beforeAll(() => jest.useFakeTimers({ now: new Date(2023, 1, 1, 1, 1, 1, 1) }));
    afterAll(() => jest.useRealTimers());

    it('Should return correct relative date (now))', () => {
      const date = getDateISO('second', 0);

      const result = getRelativeDate(date);

      expect(result).toBe('a few seconds ago');
    });

    it('Should return correct relative date (1 minute ago)', () => {
      const date = getDateISO('minute', 0);

      const result = getRelativeDate(date);

      expect(result).toBe('a minute ago');
    });

    it('Should return correct relative date (more than 1 minutes)', () => {
      const date = getDateISO('minute', -1);

      const result = getRelativeDate(date);

      expect(result).toBe('2 minutes ago');
    });

    it('Should return correct relative date (1 month ago)', () => {
      const date = getDateISO('month', 0);

      const result = getRelativeDate(date);

      expect(result).toBe('a month ago');
    });

    it('Should return correct relative date (more than 1 months)', () => {
      const date = getDateISO('month', -1);

      const result = getRelativeDate(date);

      expect(result).toBe('2 months ago');
    });

    it('Should return correct relative date (1 year ago)', () => {
      const date = getDateISO('year', 2022);

      const result = getRelativeDate(date);

      expect(result).toBe('a year ago');
    });

    it('Should return correct relative date (more than 1 years)', () => {
      const date = getDateISO('year', 2021);

      const result = getRelativeDate(date);

      expect(result).toBe('2 years ago');
    });
  });

  describe('getFilteredThread', () => {
    it('Should return valid categories if getFilteredThread called with valid filter and threads', () => {
      const filter = 'react';
      const user = createUser({});
      const threads = [
        createThread({ ownerId: user.id, category: 'react' }, 1),
        createThread({ ownerId: user.id, category: 'angular' }, 2),
        createThread({ ownerId: user.id, category: 'react' }, 3),
        createThread({ ownerId: user.id, category: 'vue' }, 4),
      ];

      const filteredThreads = getFilteredThread(filter, threads as any);

      expect(filteredThreads.length).toStrictEqual(2);
      expect(filteredThreads[0].category).toStrictEqual(filter);
      expect(filteredThreads[1].category).toStrictEqual(filter);
    });
  });

  describe('importReactQuill', () => {
    test('importReactQuill should return imported module', async () => {
      const importedModule = await importReactQuill();

      expect(importedModule).toEqual({
        __esModule: true,
        default: expect.any(Function),
      });
    });
  });
});
