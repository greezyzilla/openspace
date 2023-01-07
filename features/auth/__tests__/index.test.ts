import { PayloadAction, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import {
  removeAccessToken, fetchWithoutToken, fetchWithToken, putAccessToken,
} from '../../../utils';
import {
  AuthenticationState, GetAuthenticatedUserResponse, PostLoginResponse,
  PostRegisterResponse,
} from '../auth.interface';
import authReducer, {
  getAuthenticatedUser, postLoginUser, postSignOut, postRegisterUser,
} from '../index';
import { createUser } from '../../../tests/userHelpers';
import { createFailedResponse, createSuccessResponse } from '../../../tests/utilsHelpers';

jest.mock('../../../utils', () => ({
  removeAccessToken: jest.fn(),
  putAccessToken: jest.fn(),
  fetchWithoutToken: jest.fn(),
  fetchWithToken: jest.fn(),
}));

describe('Testing Authentication Feature', () => {
  afterAll(() => jest.clearAllMocks());

  const user = createUser();

  describe('Testing Reducers', () => {
    let state : AuthenticationState;
    const initialState = { user: undefined, loading: true };

    beforeEach(() => {
      state = initialState;
    });

    describe('Default', () => {
      it('Should return the initial state when given by unknown action', () => {
        const action = { type: 'UNKNOWN_ACTION' };

        const nextState = authReducer(state, action);

        expect(nextState).toStrictEqual(state);
      });
    });

    describe('postSignOut', () => {
      it('Should return auth state with the undefined user object when given by postSignOut action', () => {
        state.user = user;
        const action = { type: postSignOut.type };

        const nextState = authReducer(state, action);

        expect(removeAccessToken).toBeCalled();
        expect(nextState).not.toStrictEqual(state);
        expect(nextState.user).toStrictEqual(undefined);
      });
    });
  });

  describe('Testing Async Thunk', () => {
    describe('getAuthenticatedUser', () => {
      it('Should provide correct response when fetch authenticated user success', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createSuccessResponse({}, { user });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getAuthenticatedUser()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetAuthenticatedUserResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('users/me', {});
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data?.user).toStrictEqual(user);
      });

      it('Should provide correct response when fetch authenticated user failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getAuthenticatedUser()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetAuthenticatedUserResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('users/me', {});
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postRegisterUser', () => {
      const { id: _i, avatar: _a, ...payload } = { ...user, password: 'rahasia' };

      it('Should provide correct response when post register success', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createSuccessResponse({}, { user });
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postRegisterUser(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostRegisterResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('register', { method: 'POST', data: payload });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data?.user).toStrictEqual(user);
      });

      it('Should provide correct response when post register failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postRegisterUser(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostRegisterResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('register', { method: 'POST', data: payload });
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postLoginUser', () => {
      const {
        id: _i, avatar: _a, name: _n, ...payload
      } = { ...user, password: 'rahasia123' };

      it('Should provide correct response when post login success', async () => {
        const dispatch = jest.fn();
        const token = `dummy-token-${+new Date()}`;
        const mockedResponse = createSuccessResponse({}, { token });
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postLoginUser(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostLoginResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('login', { method: 'POST', data: payload });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data?.token).toStrictEqual(token);
      });

      it('Should provide correct response when post login failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postLoginUser(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostLoginResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('login', { method: 'POST', data: payload });
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });
  });

  describe('Testing Extra Reducers', () => {
    const store = configureStore({
      reducer: authReducer,
    });

    describe('getAuthenticatedUser', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: getAuthenticatedUser.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: getAuthenticatedUser.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false and change user state to authenticated user if case is fulfilled', async () => {
        const action = { type: getAuthenticatedUser.fulfilled.type, payload: { data: { user } } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().user).toStrictEqual(user);
      });
    });

    describe('postRegisterUser', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: postRegisterUser.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postRegisterUser.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false if case is fulfilled', async () => {
        const action = { type: postRegisterUser.fulfilled.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });
    });

    describe('postRegisterUser', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: postLoginUser.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postLoginUser.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false and remove the stored accessToken if case is fulfilled', async () => {
        const token = `dummy-token-${+new Date()}`;
        const action = { type: postLoginUser.fulfilled.type, payload: { data: { token } } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(putAccessToken).toBeCalledWith(token);
      });
    });
  });
});
