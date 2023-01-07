import { ApiResponse } from '../interfaces';

export const createSuccessResponse = (
  { code, message }: Partial<ApiResponse>,
  data : any,
) => {
  const response : any = {
    code: code || 200,
    message: message || 'Fetch success',
    status: 'success',
  };

  if (data) response.data = data;
  return response;
};

export const createFailedResponse = ({ code, message }: Partial<ApiResponse> = {}) => ({
  code: code || 500,
  message: message || 'Fetch failed',
  status: 'fail',
});

export const wait = async (time:number) => new Promise((res) => setTimeout(res, time));
