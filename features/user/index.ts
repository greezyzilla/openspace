import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetcWithoutToken } from '../../utils';
import { GetUsersResponse, UserState } from './user.interface';

export const getUsers = createAsyncThunk(
  'user/get',
  async () => {
    const payload = await fetcWithoutToken('users', {});
    return payload;
  },
);

const initialState : UserState = {
  users: [],
  filter: '',
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    searchByTitle: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => { state.loading = true; });
    builder.addCase(getUsers.rejected, (state) => { state.loading = false; });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<GetUsersResponse>) => {
      if (action.payload.status === 'success') state.users = action.payload.data.users;
      state.loading = false;
    });
  },
});

export const { searchByTitle } = userSlice.actions;
export default userSlice.reducer;
