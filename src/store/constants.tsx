
export const initUserState = {
  id: 0,
  name: '',
  surname: '',
  userName: '',
  emailAddress: '',
  avatarPath: ''
};

export const initEditState = {
  name: '',
  code: '',
  status: 0,
  timeStart: '',
  timeEnd: '',
  note: '',
  projectType: 0,
  customerId: 0,
  tasks: [],
  users: [],
  projectTargetUsers: [],
  komuChannelId: '',
  isNotifyToKomu: false,
  isAllUserBelongTo: false,
  id: 0
};

export const initProjectState = {
  project: {
    customerName: '',
    name: '',
    code: '',
    status: 0,
    pms: [],
    activeMember: 0,
    projectType: 0,
    timeStart: new Date(''),
    timeEnd: new Date(''),
    id: 0
  },
  projects: [],
  projectInfo: {
    name: '',
    code: '',
    status: 0,
    timeStart: '',
    timeEnd: '',
    note: '',
    projectType: 0,
    customerId: 0,
    tasks: [],
    users: [],
    projectTargetUsers: [],
    komuChannelId: '',
    isNotifyToKomu: false,
    isAllUserBelongTo: false,
    id: 0
  },
  projectsInfo: []
};
export const initUsersState = {
  name: '',
  emailAddress: '',
  isActive: false,
  type: 0,
  level: 0,
  avatarPath: '',
  avatarFullPath: '',
  branch: 0
};

export const initProject = {
  customerName: '',
  name: '',
  code: '',
  status: 0,
  pms: [],
  activeMember: 0,
  projectType: 0,
  timeStart: new Date(''),
  timeEnd: new Date(''),
  id: 0
};
