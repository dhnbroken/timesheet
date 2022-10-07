import axios from 'axios';
import { authHeader } from './auth-header';

const API_URL = 'http://training-api-timesheet.nccsoft.vn/api/services/app/Session/GetCurrentLoginInformations';

export const getUser = async () => {
  try {
    const res = await axios.get(API_URL, { headers: authHeader() });
    return res.data.result.user;
  } catch (error) {
    throw Error(String(error));
  }
};
