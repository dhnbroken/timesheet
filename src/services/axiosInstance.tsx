import axios from 'axios';
import { authHeader } from './auth-header';

export const axiosInstance = axios.create({
  baseURL: 'http://training-api-timesheet.nccsoft.vn/',
  timeout: 99999999,
  headers: authHeader(),
  withCredentials: true
});
