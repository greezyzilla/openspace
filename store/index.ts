import { configureStore } from '@reduxjs/toolkit';
import { loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar';
import threadReducer from '../features/thread';
import userReducer from '../features/user';
import authenticationReducer from '../features/auth';

export const store = configureStore({
  reducer: {
    thread: threadReducer,
    user: userReducer,
    auth: authenticationReducer,
    loadingBar: loadingBarReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(loadingBarMiddleware({
      promiseTypeSuffixes: ['pending', 'fulfilled', 'rejected'],
    }));
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
