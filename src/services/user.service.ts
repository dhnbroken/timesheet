import { TUserInfo } from 'src/store/interface/LoginType';
import { axiosInstance } from './axiosInstance';

export const getUser = async () => {
  try {
    const response = await axiosInstance.get('api/services/app/Session/GetCurrentLoginInformations');
    const userData = response.data.result?.user;
    const user: TUserInfo = {
      id: userData.id,
      name: userData.name,
      surname: userData.surname,
      userName: userData.userName,
      avatarPath: userData.avatarPath,
      emailAddress: userData.emailAddress
    };
    return user;
  } catch (err) {
  }
};
