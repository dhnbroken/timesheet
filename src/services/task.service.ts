import { axiosInstance } from './axiosInstance';

export const getAllTask = async () => {
  try {
    const res = await axiosInstance.get('/api/services/app/Task/GetAll');
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
};
