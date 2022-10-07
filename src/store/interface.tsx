import { ActionKind } from './enum';

export interface IProject {
  customerName: string
  name: string
  code: string
  status: number
  pms: string[]
  activeMember: number
  projectType: number
  timeStart: Date
  timeEnd: Date
  id: number
}

export interface IProjectState {
  task: IProject
  tasks: IProject[]
}

export interface IProjectList {
  customerName: string
  list: IProject[]
}

export interface IQuantityProject {
  status: number
  quantity: number
}

export type Action =
| Get;

export interface Get {
  type: ActionKind.GETTASK
  payload: IProject[]
}
