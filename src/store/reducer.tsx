import { Action, IProjectSave, IProjectState } from './interface/projectInterface';

function taskReducer (state: IProjectState, action: Action): IProjectState {
  const { type } = action;
  switch (type) {
  case 'GETPROJECT':
    if (action.payload) {
      return {
        ...state,
        projects: action.payload
      };
    }
    return state;
  case 'GETPROJECTINFO':
    if (action.payload) {
      return {
        ...state,
        projectsInfo: action.payload
      };
    }
    return state;
  case 'SETPROJECT':
    return {
      ...state,
      projectInfo: {
        name: action.payload.name,
        code: action.payload.code,
        status: action.payload.status,
        timeStart: action.payload.timeStart,
        timeEnd: action.payload.timeEnd,
        note: action.payload.note,
        projectType: action.payload.projectType,
        customerId: action.payload.customerId,
        tasks: action.payload.tasks,
        users: action.payload.users,
        projectTargetUsers: action.payload.projectTargetUsers,
        komuChannelId: action.payload.komuChannelId,
        isNotifyToKomu: action.payload.isNotifyToKomu,
        isAllUserBelongTo: action.payload.isAllUserBelongTo,
        id: action.payload.id
      }
    };
  case 'SAVETASK': {
    const updateTask = state.projectsInfo.map((project: IProjectSave) => {
      return project.id === action.payload.id
        ? { ...action.payload }
        : project;
    });
    return {
      ...state,
      projectsInfo: updateTask
    };
  }
  default:
    return state;
  }
}

export default taskReducer;
