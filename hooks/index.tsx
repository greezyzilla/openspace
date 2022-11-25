import { isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getAccessToken, removeAccessToken } from '../utils';
import { useAppSelector } from './redux';

export default function useAppRequest() {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state);

  const hasAuthenticatedUser = auth.user;
  const hasAccessToken = getAccessToken();

  const request = async (callback : () => Promise<PayloadAction<any>>) => {
    if (!hasAuthenticatedUser || !hasAccessToken) {
      toast.error('Please login to continue');
      router.push('/auth/login');
    } else {
      const response = await callback();

      const { code, message } = response.payload;
      if (isRejectedWithValue(response)) toast.error(message);
      else toast.success(message);

      if (code === 401) {
        removeAccessToken();
        router.replace('/auth/login');
      }
    }
  };

  return request;
}
