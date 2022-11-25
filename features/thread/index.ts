import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWithToken, fetcWithoutToken } from '../../utils';
import {
  AddThread, AddThreadResponse, GetThreadsResponse, PostVoteResponse, ThreadState,
} from './thread.interface';

export const getThreads = createAsyncThunk(
  'thread/getAll',
  async (_, { rejectWithValue }) => {
    const response = await fetcWithoutToken('threads', {});
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const getThreadById = createAsyncThunk(
  'thread/getById',
  async (id : string, { rejectWithValue }) => {
    const response = await fetcWithoutToken(`threads/${id}`, {});
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postThread = createAsyncThunk(
  'thread/post',
  async (thread : AddThread, { rejectWithValue }) => {
    const response = await fetchWithToken('threads', {
      method: 'POST',
      data: thread,
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteUp = createAsyncThunk(
  'thread/vote-up',
  async (threadId : string, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/up-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteDown = createAsyncThunk(
  'thread/vote-down',
  async (threadId : string, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/down-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteNeutral = createAsyncThunk(
  'thread/vote-neutral',
  async (threadId : string, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
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
      state.threads = action.payload.data.threads
        .map((thread) => (thread.category ? thread : ({ ...thread, category: 'unknown' })));
      state.loading = false;
    });
    builder.addCase(postThread.pending, (state) => { state.loading = true; });
    builder.addCase(postThread.rejected, (state) => { state.loading = false; });
    builder.addCase(postThread.fulfilled, (state, action: PayloadAction<AddThreadResponse>) => {
      state.threads.unshift({
        ...action.payload.data.thread,
        category: action.payload.data.thread.category || 'unknown',
      });
      state.loading = false;
    });
    builder.addCase(postVoteUp.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteUp.rejected, (state) => { state.loading = false; });
    builder.addCase(postVoteUp.fulfilled, (state, action: PayloadAction<PostVoteResponse>) => {
      const { threadId, userId } = action.payload.data.vote;
      const threadIndex = state.threads.findIndex((thread) => thread.id === threadId);

      const thread = state.threads[threadIndex];
      const voteDownIndex = thread.downVotesBy?.findIndex((id) => userId === id);
      if (voteDownIndex! >= 0) thread.downVotesBy?.splice(voteDownIndex!, 1);

      thread.upVotesBy?.push(userId);
      state.loading = false;
    });
    builder.addCase(postVoteDown.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteDown.rejected, (state) => { state.loading = false; });
    builder.addCase(postVoteDown.fulfilled, (state, action: PayloadAction<PostVoteResponse>) => {
      const { threadId, userId } = action.payload.data.vote;
      const threadIndex = state.threads.findIndex((thread) => thread.id === threadId);

      const thread = state.threads[threadIndex];
      const voteUpIndex = thread.upVotesBy?.findIndex((id) => userId === id)!;
      if (voteUpIndex >= 0) thread.upVotesBy?.splice(voteUpIndex, 1);

      thread.downVotesBy?.push(userId);
      state.loading = false;
    });
    builder.addCase(postVoteNeutral.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteNeutral.rejected, (state) => { state.loading = false; });
    builder.addCase(postVoteNeutral.fulfilled, (state, action: PayloadAction<PostVoteResponse>) => {
      const { threadId, userId } = action.payload.data.vote;
      const threadIndex = state.threads.findIndex((thread) => thread.id === threadId);

      const thread = state.threads[threadIndex];
      const voteUpIndex = thread.upVotesBy?.findIndex((id) => userId === id)!;
      if (voteUpIndex >= 0) thread.upVotesBy?.splice(voteUpIndex, 1);

      const voteDownIndex = thread.downVotesBy?.findIndex((id) => userId === id);
      if (voteDownIndex! >= 0) thread.downVotesBy?.splice(voteDownIndex!, 1);

      state.loading = false;
    });
  },
});

export const { searchByTitle } = threadSlice.actions;
export default threadSlice.reducer;
