import { isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { capitalize, getAccessToken, removeAccessToken } from '../utils';
import { useAppSelector } from './redux';

export default function useAppRequest() {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state);

  const hasAuthenticatedUser = auth.user;
  const hasAccessToken = getAccessToken();

  const request = async (callback : () => Promise<PayloadAction<any>>) => {
    if (!hasAuthenticatedUser || !hasAccessToken) {
      toast.error('Please Login To Continue');
      return router.push('/auth/login');
    }

    const response = await callback();

    if (response.payload) {
      const { code, message } = response.payload;
      if (isRejectedWithValue(response)) toast.error(capitalize(message));
      else toast.success(capitalize(message));

      if (code && code === 401) {
        removeAccessToken();
        router.push('/auth/login');
      }

      return response;
    }

    return null;
  };

  return request;
}
