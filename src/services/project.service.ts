import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://training-api-timesheet.nccsoft.vn/api/services/app/Project';

export const getProject = async () => {
  try {
    const res = await axios.get(API_URL + '/GetAll', { headers: authHeader() });
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};

export const getQuantityProject = async () => {
  try {
    const res = await axios.get(API_URL + '/GetQuantityProject', { headers: authHeader() });
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};
