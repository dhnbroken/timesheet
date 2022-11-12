import { ActionKind } from './enum/Action';
import { Get, Set, IProject, IProjectSave, GetInfo, Save } from './interface/projectInterface';

export const getProject = (payload: IProject[]): Get => ({
  type: ActionKind.GETPROJECT,
  payload
});
export const getProjectInfo = (payload: IProjectSave[]): GetInfo => ({
  type: ActionKind.GETPROJECTINFO,
  payload
});
export const setProject = (payload: IProjectSave): Set => ({
  type: ActionKind.SETPROJECT,
  payload
});
export const saveTask = (payload: IProjectSave): Save => ({
  type: ActionKind.SAVETASK,
  payload
});
