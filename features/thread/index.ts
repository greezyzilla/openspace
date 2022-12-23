import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWithToken, fetcWithoutToken } from '../../utils';
import {
  GetThread, GetThreadDetailResponse,
  GetThreadsResponse, PostComment,
  PostCommentResponse, PostThread,
  PostThreadResponse, PostVoteComment,
  PostVoteCommentResponse, PostVoteThread,
  PostVoteThreadResponse, ThreadState,
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
  async ({ threadId } : GetThread, { rejectWithValue }) => {
    const response = await fetcWithoutToken(`threads/${threadId}`, {});
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postThread = createAsyncThunk(
  'thread/post',
  async (thread : PostThread, { rejectWithValue }) => {
    const response = await fetchWithToken('threads', {
      method: 'POST',
      data: thread,
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteUp = createAsyncThunk(
  'thread/voteUp',
  async ({ threadId } : PostVoteThread, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/up-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteDown = createAsyncThunk(
  'thread/voteDown',
  async ({ threadId } : PostVoteThread, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/down-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteNeutral = createAsyncThunk(
  'thread/voteNeutral',
  async ({ threadId } : PostVoteThread, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/neutral-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postComment = createAsyncThunk(
  'thread/postComment',
  async ({ content, threadId } : PostComment, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/comments`, {
      method: 'POST',
      data: { content },
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteUpComment = createAsyncThunk(
  'thread/voteUpComment',
  async ({ threadId, commentId } : PostVoteComment, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteDownComment = createAsyncThunk(
  'thread/voteDownComment',
  async ({ threadId, commentId } : PostVoteComment, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
    });
    if (response.status === 'success') return response;
    return rejectWithValue(response);
  },
);

export const postVoteNeutralComment = createAsyncThunk(
  'thread/voteNeutralComment',
  async ({ threadId, commentId } : PostVoteComment, { rejectWithValue }) => {
    const response = await fetchWithToken(`threads/${threadId}/comments/${commentId}/neutral-vote`, {
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
  thread: undefined,
};

export const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    searchThread: (state, action: PayloadAction<{filter : string}>) => {
      state.filter = action.payload.filter.toLowerCase();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getThreads.pending, (state) => { state.loading = true; });
    builder.addCase(getThreads.rejected, (state) => { state.loading = false; });
    builder.addCase(getThreads.fulfilled, (state, action: PayloadAction<GetThreadsResponse>) => {
      state.threads = action.payload.data.threads
        .map((thread) => {
          if (thread.category) {
            if (thread.category.startsWith('#')) return { ...thread, category: thread.category.slice(1) };
            return thread;
          } return { ...thread, category: 'unknown' };
        });
      state.loading = false;
    });
    builder.addCase(postThread.pending, (state) => { state.loading = true; });
    builder.addCase(postThread.rejected, (state) => { state.loading = false; });
    builder.addCase(postThread.fulfilled, (state, action: PayloadAction<PostThreadResponse>) => {
      state.threads.unshift({
        ...action.payload.data.thread,
        category: action.payload.data.thread.category || 'unknown',
      });
      state.loading = false;
    });
    builder.addCase(postVoteUp.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteUp.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postVoteUp.fulfilled,
      (state, action: PayloadAction<PostVoteThreadResponse>) => {
        const { threadId, userId } = action.payload.data.vote;
        const threadIndex = state.threads.findIndex((thread) => thread.id === threadId);

        const thread = state.threads[threadIndex];
        const voteDownIndex = thread.downVotesBy?.findIndex((id) => userId === id);

        if (voteDownIndex! >= 0) {
          thread.downVotesBy?.splice(voteDownIndex!, 1);
          state.thread?.downVotesBy?.splice(voteDownIndex!, 1);
        }

        thread.upVotesBy?.push(userId);
        state.thread?.upVotesBy?.push(userId);

        state.loading = false;
      },
    );
    builder.addCase(postVoteDown.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteDown.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postVoteDown.fulfilled,
      (state, action: PayloadAction<PostVoteThreadResponse>) => {
        const { threadId, userId } = action.payload.data.vote;
        const threadIndex = state.threads.findIndex((thread) => thread.id === threadId);

        const thread = state.threads[threadIndex];
        const voteUpIndex = thread.upVotesBy?.findIndex((id) => userId === id)!;
        if (voteUpIndex >= 0) {
          thread.upVotesBy?.splice(voteUpIndex, 1);
          state.thread?.upVotesBy?.splice(voteUpIndex, 1);
        }

        thread.downVotesBy?.push(userId);
        state.thread?.downVotesBy?.push(userId);

        state.loading = false;
      },
    );
    builder.addCase(postVoteNeutral.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteNeutral.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postVoteNeutral.fulfilled,
      (state, action: PayloadAction<PostVoteThreadResponse>) => {
        const { threadId, userId } = action.payload.data.vote;
        const threadIndex = state.threads.findIndex((thread) => thread.id === threadId);

        const thread = state.threads[threadIndex];
        const voteUpIndex = thread.upVotesBy?.findIndex((id) => userId === id)!;
        if (voteUpIndex >= 0) {
          thread.upVotesBy?.splice(voteUpIndex, 1);
          state.thread?.upVotesBy?.splice(voteUpIndex, 1);
        }

        const voteDownIndex = thread.downVotesBy?.findIndex((id) => userId === id);
        if (voteDownIndex! >= 0) {
          thread.downVotesBy?.splice(voteDownIndex!, 1);
          state.thread?.downVotesBy?.splice(voteDownIndex!, 1);
        }

        state.loading = false;
      },
    );
    builder.addCase(postComment.pending, (state) => { state.loading = true; });
    builder.addCase(postComment.rejected, (state) => { state.loading = false; });
    builder.addCase(postComment.fulfilled, (state, action: PayloadAction<PostCommentResponse>) => {
      state.thread?.comments.unshift(action.payload.data.comment);
      state.loading = false;
    });
    builder.addCase(postVoteUpComment.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteUpComment.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postVoteUpComment.fulfilled,
      (state, action: PayloadAction<PostVoteCommentResponse>) => {
        if (state.thread) {
          const { commentId, userId } = action.payload.data.vote;

          const commentIndex = state.thread.comments.findIndex((comment) => (
            comment.id === commentId
          ));

          const comment = state.thread.comments[commentIndex];
          const voteDownIndex = comment.downVotesBy?.findIndex((id) => userId === id);
          if (voteDownIndex! >= 0) comment.downVotesBy?.splice(voteDownIndex!, 1);

          comment.upVotesBy.unshift(userId);
        }

        state.loading = false;
      },
    );
    builder.addCase(postVoteDownComment.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteDownComment.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postVoteDownComment.fulfilled,
      (state, action: PayloadAction<PostVoteCommentResponse>) => {
        if (state.thread) {
          const { commentId, userId } = action.payload.data.vote;

          const commentIndex = state.thread.comments.findIndex((comment) => (
            comment.id === commentId
          ));

          const comment = state.thread.comments[commentIndex];
          const voteUpIndex = comment.upVotesBy?.findIndex((id) => userId === id);
          if (voteUpIndex! >= 0) comment.upVotesBy?.splice(voteUpIndex!, 1);

          comment.downVotesBy.unshift(userId);
        }

        state.loading = false;
      },
    );
    builder.addCase(postVoteNeutralComment.pending, (state) => { state.loading = true; });
    builder.addCase(postVoteNeutralComment.rejected, (state) => { state.loading = false; });
    builder.addCase(
      postVoteNeutralComment.fulfilled,
      (state, action: PayloadAction<PostVoteCommentResponse>) => {
        if (state.thread) {
          const { commentId, userId } = action.payload.data.vote;

          const commentIndex = state.thread.comments.findIndex((comment) => (
            comment.id === commentId
          ));

          const comment = state.thread.comments[commentIndex];
          const voteDownIndex = comment.downVotesBy?.findIndex((id) => userId === id);
          if (voteDownIndex! >= 0) comment.downVotesBy?.splice(voteDownIndex!, 1);

          const voteUpIndex = comment.upVotesBy?.findIndex((id) => userId === id);
          if (voteUpIndex! >= 0) comment.upVotesBy?.splice(voteUpIndex!, 1);
        }
        state.loading = false;
      },
    );
    builder.addCase(getThreadById.pending, (state) => { state.loading = true; });
    builder.addCase(getThreadById.rejected, (state) => { state.loading = false; });
    builder.addCase(
      getThreadById.fulfilled,
      (state, action: PayloadAction<GetThreadDetailResponse>) => {
        state.thread = action.payload.data.detailThread;
        state.loading = false;
      },
    );
  },
});

export const { searchThread } = threadSlice.actions;
export default threadSlice.reducer;
