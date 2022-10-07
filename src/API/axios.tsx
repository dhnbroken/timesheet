import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'http://training-api-timesheet.nccsoft.vn/',
  timeout: 5000,
  headers: { 'content-type': 'application/json' },
  withCredentials: true
});
