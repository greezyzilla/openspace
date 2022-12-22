import { configureStore } from '@reduxjs/toolkit';
import { loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar';
import { authReducer, threadReducer, userReducer } from '../features';

export const store = configureStore({
  reducer: {
    thread: threadReducer,
    user: userReducer,
    auth: authReducer,
    loadingBar: loadingBarReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(loadingBarMiddleware({
      promiseTypeSuffixes: ['pending', 'fulfilled', 'rejected'],
    }));
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
