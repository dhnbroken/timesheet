import axios from 'axios';
import { toast } from 'react-toastify';
import { authHeader } from './auth-header';
import { toastMsg } from 'src/store/toast';

export const axiosInstance = axios.create({
  baseURL: 'http://training-api-timesheet.nccsoft.vn/',
  timeout: 15000,
  headers: authHeader(),
  withCredentials: true
});

export const axiosInstanceAction = axios.create({
  baseURL: 'http://training-api-timesheet.nccsoft.vn/',
  timeout: 15000,
  headers: authHeader(),
  withCredentials: true
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  toast.error(error.message, toastMsg);
  return error.message;
});

axiosInstanceAction.interceptors.response.use((response) => {
  response.status === 200 && toast.success('Success', toastMsg);
  return response;
}, (error) => {
  toast.error(error.message, toastMsg);
  return error.message;
});
