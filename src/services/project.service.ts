import { ProjectStatus } from 'src/store/enum/Project';
import { IProjectReq, IProjectSave } from 'src/store/interface/projectInterface';
import { axiosInstance } from './axiosInstance';

export const getProjects = async (req: IProjectReq) => {
  try {
    if (req.status !== ProjectStatus.ALL) {
      const res = await axiosInstance.get('api/services/app/Project/GetAll', { params: { status: req.status, search: req.search } });
      return res.data.result;
    } else {
      const res = await axiosInstance.get('api/services/app/Project/GetAll', { params: { status: undefined, search: req.search || undefined } });
      return res.data.result;
    }
  } catch (error) {
    throw Error(String(error));
  }
};

export const getEditProject = async (id: number) => {
  try {
    const res = await axiosInstance.get(`api/services/app/Project/Get?input=${id}`);
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
};

export const saveProject = async (data: IProjectSave) => {
  try {
    const res = await axiosInstance.post('api/services/app/Project/Save', data);
    return res;
  } catch (error) {
    throw Error(String(error));
  }
};

export const getQuantityProject = async () => {
  try {
    const res = await axiosInstance.get('api/services/app/Project/GetQuantityProject');
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};

export const deleteProject = async (id: number) => {
  try {
    await axiosInstance.delete('api/services/app/Project/Delete', { params: { Id: id } });
    return id;
  } catch (error) {
    throw Error(String(error));
  }
};

export const activeProjects = async (id: number) => {
  try {
    await axiosInstance.post('api/services/app/Project/Active', { id });
    return { id };
  } catch (error) {
    throw new Error(String(error));
  }
};

export const inactiveProjects = async (id: number) => {
  try {
    await axiosInstance.post('api/services/app/Project/Inactive', { id });
    return { id };
  } catch (error) {
    throw new Error(String(error));
  }
};
