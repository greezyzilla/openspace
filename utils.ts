import axios, { AxiosRequestConfig } from 'axios';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Thread } from './features/thread/thread.interface';
import { ApiResponse } from './interfaces';

dayjs.extend(relativeTime);

export function getAccessToken() {
  if (typeof window === 'undefined') return null;

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

export async function fetchWithToken(
  url : string,
  options : AxiosRequestConfig<any>,
): Promise<ApiResponse> {
  try {
    const response = await axios({
      baseURL: baseURL + url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return { ...response.data, code: response.status };
  } catch (e : any) {
    if (e.response?.status === 401) removeAccessToken();
    return ({ status: 'fail', message: e.response?.data?.message || 'Bad request', code: e.response?.status || 400 });
  }
}

export async function fetcWithoutToken(
  url : string,
  options : AxiosRequestConfig<any>,
) : Promise<ApiResponse> {
  try {
    const response = await axios({
      baseURL: baseURL + url,
      ...options,
    });

    return { ...response.data, code: response.status };
  } catch (e : any) {
    return ({ status: 'fail', message: e.response?.data?.message || 'Bad request', code: e.response?.status || 400 });
  }
}

export function getTrendingCategoriesFromThreads(threads: Thread[]) {
  const categories = threads.map((thread) => (thread.category).toLocaleLowerCase());
  const groupedCategories = categories
    .reduce((acc : any, category) => ({ ...acc, [category]: (+acc[category] || 0) + 1 }), {});
  const sortedCategories = Object.keys(groupedCategories)
    .map((category) => ({ category, total: groupedCategories[category] }))
    .sort((a, b) => b.total - a.total);
  return sortedCategories.slice(0, 5);
}

export const capitalize = (text: string) => text.split(' ').map((t) => t[0].toUpperCase() + t.slice(1)).join(' ');

export const getRelativeDate = (dateString: string) => dayjs(dateString).fromNow();

export const getFilteredThread = (filter:string, threads:Thread[]) => threads.filter((thread) => {
  const regressingTitle = thread.title.toLowerCase().includes(filter);
  const regressingCategory = thread.category.toLocaleLowerCase().includes(filter);
  return regressingTitle || regressingCategory;
});
