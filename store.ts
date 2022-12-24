import { configureStore } from '@reduxjs/toolkit';
import { loadingBarMiddleware, loadingBarReducer } from 'react-redux-loading-bar';
import undoable from 'redux-undo';
import { authReducer, threadReducer, userReducer } from './features';

const undoableThreadReducer = undoable(threadReducer, { limit: 10 });

export const store = configureStore({
  reducer: {
    thread: undoableThreadReducer,
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
