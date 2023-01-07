import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithoutToken } from '../../utils';
import { GetLeaderboardsResponse, GetUsersResponse, UserState } from './user.interface';

export const getUsers = createAsyncThunk(
  'user/getAll',
  async (_, { rejectWithValue }) => {
    const response = await fetchWithoutToken('users', {}) as GetUsersResponse;
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const getLeaderboards = createAsyncThunk(
  'user/leaderboards',
  async (_, { rejectWithValue }) => {
    const response = await fetchWithoutToken('leaderboards', {}) as GetLeaderboardsResponse;
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

const initialState : UserState = {
  users: [],
  leaderboards: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => { state.loading = true; });
    builder.addCase(getUsers.rejected, (state) => { state.loading = false; });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.users.reverse();
      state.loading = false;
    });
    builder.addCase(getLeaderboards.pending, (state) => { state.loading = true; });
    builder.addCase(getLeaderboards.rejected, (state) => { state.loading = false; });
    builder.addCase(getLeaderboards.fulfilled, (state, action) => {
      state.leaderboards = action.payload.data.leaderboards;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
