import { axiosInstance } from './axiosInstance';

export const getAllCustomer = async () => {
  try {
    const res = await axiosInstance.get('/api/services/app/Customer/GetAll');
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
};
