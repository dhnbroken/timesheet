import { ActionKind } from '../enum/Action';
import { ProjectStatus } from '../enum/Project';

export type Action =
| Get
| GetInfo
| Set
| Save

export interface Get {
  type: ActionKind.GETPROJECT
  payload: IProject[]
}
export interface GetInfo {
  type: ActionKind.GETPROJECTINFO
  payload: IProjectSave[]
}
export interface Set {
  type: ActionKind.SETPROJECT
  payload: IProjectSave
}
export interface Save {
  type: ActionKind.SAVETASK
  payload: IProjectSave
}

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

export interface IProjectReq {
  status: ProjectStatus
  search: string
}

export interface IProjectState {
  project: IProject
  projects: IProject[]
  projectInfo: IProjectSave
  projectsInfo: IProjectSave[]
}

export interface IProjectList {
  customerName: string
  list: IProject[]
}

export interface IProjectTargetUsers {
  userId: number
  roleName: string
}

export interface IProjectUser {
  userId: number
  type: number
}

interface ITask {
  taskId: number
  billable: boolean
}

export interface IProjectSave {
  name: string
  code: string
  status?: number
  timeStart: string
  timeEnd: string
  note: string
  projectType: number
  customerId: number
  tasks: ITask[]
  users: IProjectUser[]
  projectTargetUsers: IProjectTargetUsers[]
  komuChannelId?: string | null
  isNotifyToKomu?: boolean
  isAllUserBelongTo?: boolean
  id?: number
}

export interface IQuantityProject {
  status: ProjectStatus
  quantity: number
}
