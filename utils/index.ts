import axios, { AxiosRequestConfig } from 'axios';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
}

export function putAccessToken(accessToken : string) {
  return localStorage.setItem('accessToken', accessToken);
}

export function removeAccessToken() {
  return localStorage.removeItem('accessToken');
}

const baseURL = 'https://forum-api.dicoding.dev/v1/';

export async function fetchWithToken(url : string, options : AxiosRequestConfig<any>) {
  try {
    const response = await axios({
      baseURL: baseURL + url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data;
  } catch (e : any) {
    // if(e.response.status === 401) removeAccessToken();
    return { status: 'fail', message: e.response.data.message, code: e.response.status };
  }
}

export async function fetcWithoutToken(url : string, options : AxiosRequestConfig<any>) {
  try {
    const response = await axios({
      baseURL: baseURL + url,
      ...options,
    });

    return response.data;
  } catch (e : any) {
    return { status: 'fail', message: e.response.data.message };
  }
}

export const getRelativeDate = (dateString: string) => dayjs(dateString).fromNow();
