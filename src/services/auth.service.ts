import { axiosInstance } from './axiosInstance';
import { TLoginData } from 'src/store/interface/LoginType';

export const login = async ({ userNameOrEmailAddress, password, rememberClient }: TLoginData) => {
  return await axiosInstance
    .post('/api/TokenAuth/Authenticate', {
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
