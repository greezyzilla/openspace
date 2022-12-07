import '../styles/globals.css';
import '../styles/quill.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { store } from '../store';
import { getAccessToken, removeAccessToken } from '../utils';
import { useAppDispatch } from '../hooks/redux';
import { getAuthenticatedUser } from '../features/auth';
import 'react-toastify/dist/ReactToastify.css';
import { getThreads } from '../features/thread';
import { getUsers } from '../features/user';

function Middleware({ children } : {children : ReactElement}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      const pathName = router.asPath.split('/')[1];
      const hasAccessToken = !!getAccessToken();
      const guestPath = ['', 'leaderboard', 'categories', 'details'].includes(pathName);

      if (guestPath) {
        dispatch(getThreads());
        dispatch(getUsers());
      }

      if (hasAccessToken) {
        if (guestPath) {
          dispatch(getAuthenticatedUser())
            .then((response) => isRejectedWithValue(response) && removeAccessToken());
        } else router.replace('/');
      }
    }
  }, [router]);

  return children;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className="flex h-screen w-screen flex-col font-poppins">
        <Middleware>
          <Component {...pageProps} />
        </Middleware>
        <ToastContainer />
      </main>
    </Provider>
  );
}
