import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetcWithoutToken } from '../../utils';
import { GetLeaderboardsResponse, GetUsersResponse, UserState } from './user.interface';

export const getUsers = createAsyncThunk(
  'user/getAll',
  async (_, { rejectWithValue }) => {
    const response = await fetcWithoutToken('users', {});
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const getLeaderboards = createAsyncThunk(
  'user/leaderboards',
  async (_, { rejectWithValue }) => {
    const response = await fetcWithoutToken('leaderboards', {});
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

const initialState : UserState = {
  users: [],
  leaderboards: [],
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => { state.loading = true; });
    builder.addCase(getUsers.rejected, (state) => { state.loading = false; });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<GetUsersResponse>) => {
      state.users = action.payload.data.users;
      state.loading = false;
    });
    builder.addCase(getLeaderboards.pending, (state) => { state.loading = true; });
    builder.addCase(getLeaderboards.rejected, (state) => { state.loading = false; });
    builder.addCase(
      getLeaderboards.fulfilled,
      (state, action: PayloadAction<GetLeaderboardsResponse>) => {
        state.leaderboards = action.payload.data.leaderboards;
        state.loading = false;
      },
    );
  },
});

export default userSlice.reducer;
