import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWithToken, putAccessToken, removeAccessToken } from '../../utils';
import {
  AuthenticatedUserResponse, AuthenticationState, UserLogin,
  UserLoginResponse, UserRegister, UserRegisterResponse,
} from './auth.interface';

export const getAuthenticatedUser = createAsyncThunk(
  'auth/me',
  async (_args, { rejectWithValue }) => {
    const response = await fetchWithToken('users/me', {});
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postRegisterUser = createAsyncThunk(
  'auth/register',
  async (user : UserRegister, { rejectWithValue }) => {
    const response = await fetchWithToken('register', {
      method: 'POST',
      data: user,
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postLoginUser = createAsyncThunk(
  'auth/login',
  async (user : UserLogin, { rejectWithValue }) => {
    const response = await fetchWithToken('login', {
      method: 'POST',
      data: user,
    });

    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

const initialState : AuthenticationState = {
  user: undefined,
  loading: true,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    postSignOut: (state) => {
      state.user = undefined;
      removeAccessToken();
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
    builder.addCase(postRegisterUser.pending, (state) => { state.loading = true; });
    builder.addCase(postRegisterUser.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postRegisterUser.fulfilled,
      (state, action: PayloadAction<UserRegisterResponse>) => {
        state.user = action.payload.data!.user;
        state.loading = false;
      },
    );
    builder.addCase(postLoginUser.pending, (state) => { state.loading = true; });
    builder.addCase(postLoginUser.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postLoginUser.fulfilled,
      (state, action: PayloadAction<UserLoginResponse>) => {
        putAccessToken(action.payload.data?.token!);
        state.loading = false;
      },
    );
  },
});

export const { postSignOut } = userSlice.actions;
export default userSlice.reducer;
