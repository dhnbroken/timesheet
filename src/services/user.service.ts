import { axiosInstance } from './axiosInstance';

export const getUser = async () => {
  try {
    const res = await axiosInstance.get('api/services/app/Session/GetCurrentLoginInformations');
    return res.data.result.user;
  } catch (error) {
    throw Error(String(error));
  }
};
