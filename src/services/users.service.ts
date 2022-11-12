import { axiosInstance } from './axiosInstance';

import { authHeader } from './auth-header';

export const getUserNotPagging = async () => {
  try {
    const res = await axiosInstance.get('/api/services/app/User/GetUserNotPagging', { headers: authHeader() });
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
};
