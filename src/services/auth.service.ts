import { TLoginData } from './../pages/Login/type/LoginType';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

const API_URL = 'http://training-api-timesheet.nccsoft.vn/api/TokenAuth/Authenticate';

export const login = async ({ userNameOrEmailAddress, password, rememberClient }: TLoginData) => {
  return await axios
    .post(API_URL, {
      userNameOrEmailAddress,
      password,
      rememberClient
    })
    .then((res) => {
      if (res.data.result.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
