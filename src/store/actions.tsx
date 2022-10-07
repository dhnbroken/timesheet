import { ActionKind } from './enum';
import { Get, IProject } from './interface';

export const getTask = (payload: IProject[]): Get => ({
  type: ActionKind.GETTASK,
  payload
});
