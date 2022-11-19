import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetcWithoutToken } from '../../utils';
import { GetThreadsResponse, ThreadState } from './thread.interface';

export const getThreads = createAsyncThunk(
  'thread/getAll',
  async () => {
    const payload = await fetcWithoutToken('threads', {});
    return payload;
  },
);

export const getThreadById = createAsyncThunk(
  'thread/getById',
  async (id : string) => {
    const payload = await fetcWithoutToken(`threads/${id}`, {});
    return payload;
  },
);

const initialState : ThreadState = {
  threads: [],
  filter: '',
  loading: true,
};

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    searchByTitle: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getThreads.pending, (state) => { state.loading = true; });
    builder.addCase(getThreads.rejected, (state) => { state.loading = false; });
    builder.addCase(getThreads.fulfilled, (state, action: PayloadAction<GetThreadsResponse>) => {
      if (action.payload.status === 'success') state.threads = action.payload.data.threads;
      state.loading = false;
    });
  },
});

export const { searchByTitle } = threadSlice.actions;
export default threadSlice.reducer;
