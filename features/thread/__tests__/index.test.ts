import { PayloadAction, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { ActionCreators } from 'redux-undo';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { fetchWithoutToken, fetchWithToken } from '../../../utils';
import threadReducer, {
  getThreadById, getThreads, postComment, postThread,
  postVoteDown, postVoteDownComment, postVoteNeutral,
  postVoteNeutralComment, postVoteUp, postVoteUpComment,
  searchThread,
} from '../index';
import {
  GetThreadDetailResponse, GetThreadsResponse, PostCommentResponse,
  PostThreadResponse, PostVoteCommentResponse, PostVoteThreadResponse, ThreadState,
} from '../thread.interface';
import {
  createComment, createThread, createThreadDetail, createVoteComment, createVoteThread,
} from '../../../tests/threadHelpers';
import { createFailedResponse, createSuccessResponse } from '../../../tests/utilsHelpers';
import { createUser, createOwner } from '../../../tests/userHelpers';

jest.mock('../../../utils', () => ({ fetchWithoutToken: jest.fn(), fetchWithToken: jest.fn() }));

const initialState = {
  filter: '',
  loading: false,
  threads: [],
  thread: undefined,
};

describe('Testing Thread Feature', () => {
  afterAll(() => jest.clearAllMocks());

  describe('Testing Reducers', () => {
    let state : ThreadState;

    beforeEach(() => {
      state = initialState;
    });

    describe('Default', () => {
      it('Should return the initial state when given by unknown action', () => {
        const action = { type: 'UNKNOWN_ACTION' };

        const nextState = threadReducer(state, action);

        expect(nextState).toStrictEqual(state);
      });
    });

    describe('searchThread', () => {
      it('Should return thread state with newest filter', () => {
        const filter = 'test';
        const action = { type: searchThread.type, payload: { filter } };

        const nextState = threadReducer(state, action);

        expect(nextState).not.toStrictEqual(state);
        expect(nextState.filter).toBe('test');
      });
    });
  });

  describe('Testing Async Thunk', () => {
    describe('getThreads', () => {
      it('Should provide correct response when fetch threads success', async () => {
        const dispatch = jest.fn();
        const user = createUser();
        const threads = [
          createThread({ ownerId: user.id }, 1),
          createThread({ ownerId: user.id }, 2),
        ];
        const mockedResponse = createSuccessResponse({}, { threads });
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getThreads()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetThreadsResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('threads', {});
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.threads).toStrictEqual(threads);
      });

      it('Should provide correct response when fetch threads failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse({});
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getThreads()(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetThreadsResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('threads', {});
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('getThreadById', () => {
      const owner = createOwner();
      const detailThread = createThreadDetail({ owner });
      const payload = { threadId: detailThread.id };

      it('Should provide correct response when fetch thread success', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createSuccessResponse({}, { detailThread });
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getThreadById(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetThreadDetailResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('threads/thread-1', {});
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.detailThread).toStrictEqual(detailThread);
      });

      it('Should provide correct response when fetch thread failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse({});
        jest.mocked(fetchWithoutToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await getThreadById(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<GetThreadDetailResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithoutToken).toBeCalledWith('threads/thread-1', {});
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postThread', () => {
      const user = createUser();
      const payload = {
        title: 'Test Post Thread',
        body: 'Ini body thread',
        category: 'test-post',
        ownerId: user.id,
      };

      it('Should provide correct response when post thread success', async () => {
        const dispatch = jest.fn();
        const thread = createThread(payload);
        const mockedResponse = createSuccessResponse({}, { thread });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postThread(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostThreadResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads', {
          method: 'POST',
          data: payload,
        });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.thread).toStrictEqual(thread);
      });

      it('Should provide correct response when post thread failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postThread(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostThreadResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads', {
          method: 'POST',
          data: payload,
        });
        expect(isRejectedWithValue(response)).toStrictEqual(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postVoteUp', () => {
      const user = createUser();
      const thread = createThread({ ownerId: user.id });
      const payload = { threadId: thread.id, userId: user.id };

      it('Should provide correct response when vote up thread success', async () => {
        const dispatch = jest.fn();
        const vote = createVoteThread({
          threadId: thread.id,
          userId: user.id,
          voteType: 1,
        });
        const mockedResponse = createSuccessResponse({}, { vote });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteUp(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteThreadResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/up-vote', { method: 'POST' });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.vote).toStrictEqual(vote);
      });

      it('Should provide correct response when vote up thread failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteUp(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteThreadResponse>;

        expect(dispatch).toBeCalledTimes(3);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/up-vote', { method: 'POST' });
        expect(dispatch).toBeCalledWith(ActionCreators.undo());
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postVoteDown', () => {
      const user = createUser();
      const thread = createThread({ ownerId: user.id });
      const payload = { threadId: thread.id, userId: user.id };

      it('Should provide correct response when vote down thread success', async () => {
        const dispatch = jest.fn();
        const vote = createVoteThread({
          threadId: thread.id,
          userId: user.id,
          voteType: -1,
        });
        const mockedResponse = createSuccessResponse({}, { vote });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteDown(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteThreadResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/down-vote', { method: 'POST' });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.vote).toStrictEqual(vote);
      });

      it('Should provide correct response when vote down thread failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteDown(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteThreadResponse>;

        expect(dispatch).toBeCalledTimes(3);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/down-vote', { method: 'POST' });
        expect(dispatch).toBeCalledWith(ActionCreators.undo());
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postVoteNeutral', () => {
      const user = createUser();
      const thread = createThread({ ownerId: user.id });
      const payload = { threadId: thread.id, userId: user.id };

      it('Should provide correct response when vote neutral thread success', async () => {
        const dispatch = jest.fn();
        const vote = createVoteThread({
          threadId: thread.id,
          userId: user.id,
          voteType: 0,
        });
        const mockedResponse = createSuccessResponse({}, { vote });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteNeutral(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteThreadResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/neutral-vote', { method: 'POST' });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.vote).toStrictEqual(vote);
      });

      it('Should provide correct response when vote neutral thread failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteNeutral(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteThreadResponse>;

        expect(dispatch).toBeCalledTimes(3);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/neutral-vote', { method: 'POST' });
        expect(dispatch).toBeCalledWith(ActionCreators.undo());
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postComment', () => {
      const user = createUser();
      const thread = createThread({ ownerId: user.id });
      const payload = { threadId: thread.id, content: 'test-comment' };

      it('Should provide correct response when post comment success', async () => {
        const dispatch = jest.fn();
        const comment = createComment({ owner: user, content: payload.content });
        const mockedResponse = createSuccessResponse({}, { comment, threadId: thread.id });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostCommentResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments', {
          method: 'POST',
          data: { content: payload.content },
        });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.comment).toStrictEqual(comment);
        expect(response.payload.data.threadId).toBe(thread.id);
      });

      it('Should provide correct response when post comment failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostCommentResponse>;

        expect(dispatch).toBeCalledTimes(3);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments', {
          method: 'POST',
          data: { content: payload.content },
        });
        expect(dispatch).toBeCalledWith(ActionCreators.undo());
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postVoteUpComment', () => {
      const owner = createOwner();
      const comment = createComment({ owner });
      const detailThread = createThreadDetail({ owner, comments: [comment] });
      const payload = {
        threadId: detailThread.id,
        userId: owner.id,
        commentId: comment.id,
      };

      it('Should provide correct response when vote up comment success', async () => {
        const dispatch = jest.fn();
        const vote = createVoteComment({
          userId: owner.id,
          commentId: comment.id,
          voteType: 1,
        });
        const mockedResponse = createSuccessResponse({}, { vote });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteUpComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteCommentResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments/comment-1/up-vote', { method: 'POST' });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.vote).toStrictEqual(vote);
      });

      it('Should provide correct response when vote up comment failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteUpComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteCommentResponse>;

        expect(dispatch).toBeCalledTimes(3);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments/comment-1/up-vote', { method: 'POST' });
        expect(dispatch).toBeCalledWith(ActionCreators.undo());
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postVoteDownComment', () => {
      const owner = createOwner();
      const comment = createComment({ owner });
      const detailThread = createThreadDetail({ owner, comments: [comment] });
      const payload = {
        threadId: detailThread.id,
        userId: owner.id,
        commentId: comment.id,
      };

      it('Should provide correct response when vote down comment success', async () => {
        const dispatch = jest.fn();
        const vote = createVoteComment({
          userId: owner.id,
          commentId: comment.id,
          voteType: -1,
        });
        const mockedResponse = createSuccessResponse({}, { vote });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteDownComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteCommentResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments/comment-1/down-vote', { method: 'POST' });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.vote).toStrictEqual(vote);
      });

      it('Should provide correct response when vote down comment failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteDownComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteCommentResponse>;

        expect(dispatch).toBeCalledTimes(3);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments/comment-1/down-vote', { method: 'POST' });
        expect(dispatch).toBeCalledWith(ActionCreators.undo());
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });

    describe('postVoteNeutralComment', () => {
      const owner = createOwner();
      const comment = createComment({ owner });
      const detailThread = createThreadDetail({ owner, comments: [comment] });
      const payload = {
        threadId: detailThread.id,
        userId: owner.id,
        commentId: comment.id,
      };

      it('Should provide correct response when vote neutral comment success', async () => {
        const dispatch = jest.fn();
        const vote = createVoteComment({
          userId: owner.id,
          commentId: comment.id,
          voteType: 0,
        });
        const mockedResponse = createSuccessResponse({}, { vote });
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteNeutralComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteCommentResponse>;

        expect(dispatch).toBeCalledTimes(2);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments/comment-1/neutral-vote', { method: 'POST' });
        expect(isRejectedWithValue(response)).toBe(false);
        expect(response.payload.status).toBe('success');
        expect(response.payload.data.vote).toStrictEqual(vote);
      });

      it('Should provide correct response when vote neutral comment failed', async () => {
        const dispatch = jest.fn();
        const mockedResponse = createFailedResponse();
        jest.mocked(fetchWithToken).mockReset().mockResolvedValue(mockedResponse);

        const response = await postVoteNeutralComment(payload)(
          dispatch,
          () => {},
          null,
        ) as PayloadAction<PostVoteCommentResponse>;

        expect(dispatch).toBeCalledTimes(3);
        expect(fetchWithToken).toBeCalledWith('threads/thread-1/comments/comment-1/neutral-vote', { method: 'POST' });
        expect(dispatch).toBeCalledWith(ActionCreators.undo());
        expect(isRejectedWithValue(response)).toBe(true);
        expect(response.payload.status).toBe('fail');
        expect(response.payload).not.toHaveProperty('data');
      });
    });
  });

  describe('Testing Extra Reducers', () => {
    let store : ToolkitStore<ThreadState>;

    const owner1 = createOwner();
    const owner2 = createOwner();

    const thread = createThread({ ownerId: owner1.id });
    const comment = createComment({ owner: owner2 });
    const detailThread = createThreadDetail({ owner: owner1, comments: [comment] });
    beforeEach(() => {
      store = configureStore({ reducer: threadReducer });
      store.dispatch({ type: postThread.fulfilled.type, payload: { data: { thread } } });
      store.dispatch({ type: getThreads.fulfilled.type, payload: { data: { threads: [thread] } } });
      store.dispatch({ type: getThreadById.fulfilled.type, payload: { data: { detailThread } } });
    });

    describe('getThreads', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: getThreads.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: getThreads.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false and threads to newest threads if case is fulfilled', async () => {
        const threads = [
          createThread({ ownerId: owner1.id }, 1),
          createThread({ ownerId: owner1.id }, 2),
        ];
        const action = { type: getThreads.fulfilled.type, payload: { data: { threads } } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().threads.length).toBe(2);
        expect(store.getState().threads).toStrictEqual(threads);
      });

      it('Should change loading to false and threads to newest threads if case is fulfilled (category started with #)', async () => {
        const threads = [createThread({ ownerId: owner1.id, category: '#test' })];
        const action = { type: getThreads.fulfilled.type, payload: { data: { threads } } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].category).toBe('test');
      });

      it('Should change loading to false and threads to newest threads if case is fulfilled (category is undefined)', async () => {
        const threads = [{ ...createThread({ ownerId: owner1.id }), category: undefined }];

        const action = { type: getThreads.fulfilled.type, payload: { data: { threads } } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].category).toBe('unknown');
      });
    });

    describe('postThread', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: postThread.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postThread.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false and insert the new thread into the beginning of the threads if case is fulfilled', async () => {
        const newThread = createThread({ ownerId: owner1.id }, 2);
        const action = {
          type: postThread.fulfilled.type,
          payload: { data: { thread: newThread } },
        };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().threads.length).toBe(2);
        expect(store.getState().threads[0]).toStrictEqual(newThread);
      });

      it('Should change loading to false and insert the new thread into the beginning of the threads if case is fulfilled (category is undefined)', async () => {
        const newThread = { ...createThread({ ownerId: owner1.id }, 2), category: undefined };
        const action = {
          type: postThread.fulfilled.type,
          payload: { data: { thread: newThread } },
        };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().threads.length).toBe(2);
        expect(store.getState().threads[0].category).toBe('unknown');
      });
    });

    describe('postVoteUp', () => {
      const params = { threadId: thread.id, userId: owner1.id };

      it('Should change loading to true and immidiately update the vote if case is pending', () => {
        const action = { type: postVoteUp.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].upVotesBy.length).toBe(1);
        expect(store.getState().threads[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to true and immidiately update the vote if case is pending (already voting down)', () => {
        const voteDownAction = { type: postVoteDown.pending.type, meta: { arg: params } };

        store.dispatch(voteDownAction);

        const action = { type: postVoteUp.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].upVotesBy.length).toBe(1);
        expect(store.getState().threads[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postVoteUp.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false if case is fulfilled', async () => {
        const action = { type: postVoteUp.fulfilled.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });
    });

    describe('postVoteDown', () => {
      const params = { threadId: thread.id, userId: owner1.id };

      it('Should change loading to true and immidiately update the vote if case is pending', () => {
        const action = { type: postVoteDown.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].upVotesBy.length).toBe(0);
        expect(store.getState().threads[0].downVotesBy.length).toBe(1);
      });

      it('Should change loading to true and immidiately update the vote if case is pending (already voting up)', () => {
        const voteUpAction = { type: postVoteUp.pending.type, meta: { arg: params } };

        store.dispatch(voteUpAction);

        const action = { type: postVoteDown.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].upVotesBy.length).toBe(0);
        expect(store.getState().threads[0].downVotesBy.length).toBe(1);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postVoteDown.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false if case is fulfilled', async () => {
        const action = { type: postVoteDown.fulfilled.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });
    });

    describe('postVoteNeutral', () => {
      const params = { threadId: thread.id, userId: owner1.id };

      it('Should change loading to true and immidiately update the vote if case is pending', () => {
        const action = { type: postVoteNeutral.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].upVotesBy.length).toBe(0);
        expect(store.getState().threads[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to true and immidiately update the vote if case is pending (already voting up)', () => {
        const voteUpAction = { type: postVoteUp.pending.type, meta: { arg: params } };

        store.dispatch(voteUpAction);

        const action = { type: postVoteNeutral.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].upVotesBy.length).toBe(0);
        expect(store.getState().threads[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to true and immidiately update the vote if case is pending (already voting down)', () => {
        const voteDownAction = { type: postVoteDown.pending.type, meta: { arg: params } };

        store.dispatch(voteDownAction);

        const action = { type: postVoteNeutral.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().threads.length).toBe(1);
        expect(store.getState().threads[0].upVotesBy.length).toBe(0);
        expect(store.getState().threads[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postVoteNeutral.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false if case is fulfilled', async () => {
        const action = { type: postVoteNeutral.fulfilled.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });
    });

    describe('postComment', () => {
      it('Should change loading to true if case is pending', () => {
        const action = { type: postComment.pending.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postComment.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false and add the new comment to the beginning of the thread comments if case is fulfilled', async () => {
        const newComment = createComment({ owner: owner1 }, 2);
        const payload = { data: { comment: newComment } };
        const action = { type: postComment.fulfilled.type, payload };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
        expect(store.getState().thread?.comments.length).toBe(2);
        expect(store.getState().thread?.comments[0]).toStrictEqual(newComment);
      });
    });

    describe('postVoteUpComment', () => {
      const params = { commentId: comment.id, userId: owner1.id };

      it('Should change loading to true and immidiately update the comment vote if case is pending', () => {
        const action = { type: postVoteUpComment.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().thread?.comments[0].upVotesBy.length).toBe(1);
        expect(store.getState().thread?.comments[0].downVotesBy.length).toBe(0);
        expect(store.getState().thread?.comments[0].upVotesBy.includes(owner1.id)).toBe(true);
      });

      it('Should change loading to true and immidiately update the comment vote if case is pending (already voting down)', () => {
        const voteDownAction = { type: postVoteDownComment.pending.type, meta: { arg: params } };

        store.dispatch(voteDownAction);

        const action = { type: postVoteUpComment.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().thread?.comments[0].upVotesBy.length).toBe(1);
        expect(store.getState().thread?.comments[0].downVotesBy.length).toBe(0);
        expect(store.getState().thread?.comments[0].upVotesBy.includes(owner1.id)).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postVoteUpComment.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false if case is fulfilled', async () => {
        const action = { type: postVoteUpComment.fulfilled.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });
    });

    describe('postVoteDownComment', () => {
      const params = { commentId: comment.id, userId: owner1.id };

      it('Should change loading to true and immidiately update the comment vote if case is pending', () => {
        const action = { type: postVoteDownComment.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().thread?.comments[0].upVotesBy.length).toBe(0);
        expect(store.getState().thread?.comments[0].downVotesBy.length).toBe(1);
        expect(store.getState().thread?.comments[0].downVotesBy.includes(owner1.id)).toBe(true);
      });

      it('Should change loading to true and immidiately update the comment vote if case is pending (already voting up)', () => {
        const voteUpAction = { type: postVoteUpComment.pending.type, meta: { arg: params } };

        store.dispatch(voteUpAction);

        const action = { type: postVoteDownComment.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().thread?.comments[0].upVotesBy.length).toBe(0);
        expect(store.getState().thread?.comments[0].downVotesBy.length).toBe(1);
        expect(store.getState().thread?.comments[0].downVotesBy.includes(owner1.id)).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postVoteDownComment.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false if case is fulfilled', async () => {
        const action = { type: postVoteDownComment.fulfilled.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });
    });

    describe('postVoteNeutralComment', () => {
      const params = { commentId: comment.id, userId: owner1.id };

      it('Should change loading to true and immidiately update the comment vote if case is pending', () => {
        const action = { type: postVoteNeutralComment.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().thread?.comments[0].upVotesBy.length).toBe(0);
        expect(store.getState().thread?.comments[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to true and immidiately update the comment vote if case is pending (already voting up)', () => {
        const voteUpAction = { type: postVoteUpComment.pending.type, meta: { arg: params } };

        store.dispatch(voteUpAction);

        const action = { type: postVoteNeutralComment.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().thread?.comments[0].upVotesBy.length).toBe(0);
        expect(store.getState().thread?.comments[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to true and immidiately update the comment vote if case is pending (already voting down)', () => {
        const voteDownAction = { type: postVoteDownComment.pending.type, meta: { arg: params } };

        store.dispatch(voteDownAction);

        const action = { type: postVoteNeutralComment.pending.type, meta: { arg: params } };

        store.dispatch(action);

        expect(store.getState().loading).toBe(true);
        expect(store.getState().thread?.comments[0].upVotesBy.length).toBe(0);
        expect(store.getState().thread?.comments[0].downVotesBy.length).toBe(0);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: postVoteNeutralComment.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading to false if case is fulfilled', async () => {
        const action = { type: postVoteNeutralComment.fulfilled.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });
    });

    describe('getThreadById', () => {
      it('Should change loading to true and thread detail to undefined if case is pending', () => {
        const action = { type: getThreadById.pending.type };

        store.dispatch(action);

        expect(store.getState().thread).toBe(undefined);
        expect(store.getState().loading).toBe(true);
      });

      it('Should change loading to false if case is rejected', async () => {
        const action = { type: getThreadById.rejected.type };

        store.dispatch(action);

        expect(store.getState().loading).toBe(false);
      });

      it('Should change loading state to false if case is fulfilled', async () => {
        const action = { type: getThreadById.fulfilled.type, payload: { data: { detailThread } } };

        store.dispatch(action);

        expect(store.getState().thread).toBe(detailThread);
        expect(store.getState().loading).toBe(false);
      });
    });
  });
});
