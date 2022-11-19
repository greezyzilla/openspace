import axios, { AxiosRequestConfig } from 'axios';

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

export const getRelativeDate = (dateString: string) => {
  const delta = Math.round((+new Date() - +new Date(dateString)) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  let result;

  if (delta < 30) result = 'just then.';
  else if (delta < minute) result = `${delta} seconds ago.`;
  else if (delta < 2 * minute) result = 'a minute ago.';
  else if (delta < hour) result = `${Math.floor(delta / minute)} minutes ago.`;
  else if (Math.floor(delta / hour) === 1) result = '1 hour ago.';
  else if (delta < day) result = `${Math.floor(delta / hour)} hours ago.`;
  else if (delta < day * 2) result = 'yesterday';

  return result;
};
