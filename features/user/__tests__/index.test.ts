import { PayloadAction, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { fetchWithoutToken } from '../../../utils';
import userReducer, { getLeaderboards, getUsers } from '../index';
import { GetLeaderboardsResponse, GetUsersResponse, UserState } from '../user.interface';
import { createUser } from '../../../tests/userHelpers';
import { createFailedResponse, createSuccessResponse } from '../../../tests/utilsHelpers';

jest.mock('../../../utils', () => ({ fetchWithoutToken: jest.fn() }));

describe('Testing Users Feature', () => {
  afterAll(() => jest.clearAllMocks());

  const users = [createUser({}, 1), createUser({}, 2), createUser({}, 3), createUser({}, 4)];
  const leaderboards = [
    { user: createUser({}, 4), score: 500 },
    { user: createUser({}, 1), score: 300 },
    { user: createUser({}, 3), score: 200 },
    { user: createUser({}, 2), score: 50 },
  ];

  describe('Testing Reducers', () => {
    let state : UserState;
    const initialState = { users: [], leaderboards: [], loading: true };

    beforeEach(() => {
      state = initialState;
    });

    describe('Default', () => {
      it('Should return the initial state when given by unknown action', () => {
        const action = { type: 'UNKNOWN_ACTION' };

        const nextState = userReducer(state, action);

        expect(nextState).toStrictEqual(state);
      });
    });
  });

  describe('Testing Async Thunk', () => {
    describe('getUsers', () => {
      it('Should provide correct response when fetch users success', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createSuccessResponse({}, { users });
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getUsers()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetUsersResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('users', {});
        expect(isRejectedWithValue(response)).toStrictEqual(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.users.length).toBe(4);
        expect(response.payload.data.users).toStrictEqual(users);
      });

      it('Should provide correct response when fetch users failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getUsers()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetUsersResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('users', {});
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('getLeaderboards', () => {
      it('Should provide correct response when fetch leaderboards success', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createSuccessResponse({}, { leaderboards });
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getLeaderboards()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetLeaderboardsResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('leaderboards', {});
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.leaderboards).toStrictEqual(leaderboards);
      });

      it('Should provide correct response when fetch leaderboards failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getLeaderboards()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetLeaderboardsResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('leaderboards', {});
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });
  });

  describe('Testing Extra Reducers', () => {
    const store = configureStore({
      reducer: userReducer,
    });

    describe('getUsers', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: getUsers.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: getUsers.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false and change the users state to the newest users if case is fulfilled', async () => {
        const action = { type: getUsers.fulfilled.type, payload: { data: { users } } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().users.length).toBe(4);
        expect(store.getState().users).toStrictEqual(users);
      });
    });

    describe('getLeaderboards', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: getLeaderboards.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: getLeaderboards.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false and change the leaderboards state to the newest leaderboards if case is fulfilled', async () => {
        const payload = { data: { leaderboards } };
        const action = { type: getLeaderboards.fulfilled.type, payload };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().leaderboards.length).toBe(4);
        expect(store.getState().leaderboards).toStrictEqual(leaderboards);
      });
    });
  });
});
