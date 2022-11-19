import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWithToken } from '../../utils';
import { AuthenticatedUserResponse, AuthenticationState } from './auth.interface';

export const getAuthenticatedUser = createAsyncThunk(
  'auth/me',
  async (_args, { rejectWithValue }) => {
    const response = await fetchWithToken('users/me', {});
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

const initialState : AuthenticationState = {
  user: undefined,
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
    builder.addCase(getAuthenticatedUser.pending, (state) => { state.loading = true; });
    builder.addCase(getAuthenticatedUser.rejected, (state) => { state.loading = false; });
    builder.addCase(
      getAuthenticatedUser.fulfilled,
      (state, action: PayloadAction<AuthenticatedUserResponse>) => {
        state.user = action.payload.data!.user;
        state.loading = false;
      },
    );
  },
});

export const { searchByTitle } = userSlice.actions;
export default userSlice.reducer;
