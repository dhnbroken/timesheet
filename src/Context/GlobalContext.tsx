import React, { useState, useReducer } from 'react';
import { IProject, IProjectReq, IProjectSave, IProjectState, IQuantityProject } from 'src/store/interface/projectInterface';
import taskReducer from 'src/store/reducer';
import { ProjectContext } from './ProjectContext';
import * as actions from 'src/store/actions';
import { initEditState, initProject, initProjectState, initUserState } from 'src/store/constants';
import { TUserInfo } from 'src/store/interface/LoginType';
import { IUser } from 'src/store/interface/User';
import { ITask } from 'src/store/interface/Task';
import { ITimeSheetReq, ITimeSheetTasks, ITimeSheetTeams } from 'src/store/interface/TimeSheet';
import { getUserNotPagging } from 'src/services/users.service';
import { getAllTask } from 'src/services/task.service';
import { activeProjects, deleteProject, getEditProject, getProjects, getQuantityProject, inactiveProjects } from 'src/services/project.service';
import { getAllCustomer } from 'src/services/customer.service';
import { ICustomer } from 'src/store/interface/Customer';
import moment from 'moment';
import { getTimeSheetTask, getTimeSheetTeam } from 'src/services/timesheet.service';

interface GlobalContext {
    state: IProjectState
    projects: IProject[]
    setProjects: (projects: IProject[]) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    getProject: (task: IProject[]) => void
    getProjectInfo: (task: IProjectSave[]) => void
    setProject: (task: IProjectSave) => void
    saveTask: (task: IProjectSave) => void
    info: TUserInfo
    setInfo: (info: TUserInfo) => void
    editId: number
    setEditId: (input: number) => void
    editInfo: IProjectSave
    setEditInfo: (info: IProjectSave) => void
    projectStatus: string
    setProjectStatus: (status: string) => void
    query: string
    setQuery: (q: string) => void
    users: IUser[]
    setUsers: (users: IUser[]) => void
    viewTask: ITimeSheetTasks[]
    setViewTask: (task: ITimeSheetTasks[]) => void
    viewTeam: ITimeSheetTeams[]
    setViewTeam: (team: ITimeSheetTeams[]) => void
    tasks: ITask[]
    setTasks: (tasks: ITask[]) => void
    quantity: IQuantityProject[]
    setQuantity: (quantity: IQuantityProject[]) => void
    getMemberProject: () => void
    getTasks: () => void
    projectInfo: IProject
    setProjectInfo: (projectInfo: IProject) => void
    getProjectAll: (req: IProjectReq) => void
    getQuantityProjects: () => void
    isChange: boolean
    setIsChange: (isSave: boolean) => void
    customer: ICustomer[]
    getCustomer: () => void
    startDate: string
    setStartDate: (startDate: string) => void
    endDate: string
    setEndDate: (endDate: string) => void
    title: string
    setTitle: (title: string) => void
    activeProject: (id: number) => void
    inactiveProject: (id: number) => void
    deleteTask: (id: number) => void
    getEditTask: (id: number) => void
    getTimeSheetTasks: (req: ITimeSheetReq) => void
    getTimeSheetTeams: (req: ITimeSheetReq) => void
}

interface PropsProvider {
    children: React.ReactNode
}

export const GlobalContextProvider = React.createContext<GlobalContext>(ProjectContext);
export const GlobalStoreContext = ({ children }: PropsProvider) => {
  const [state, dispatch] = useReducer(taskReducer, initProjectState);

  const getProject = (project: IProject[]) => dispatch(actions.getProject(project));
  const getProjectInfo = (project: IProjectSave[]) => dispatch(actions.getProjectInfo(project));
  const setProject = (project: IProjectSave) => dispatch(actions.setProject(project));
  const saveTask = (project: IProjectSave) => dispatch(actions.saveTask(project));

  const [isChange, setIsChange] = useState(false);

  const [info, setInfo] = useState<TUserInfo>(initUserState);
  const [editId, setEditId] = useState(0);
  const [editInfo, setEditInfo] = useState<IProjectSave>(initEditState);
  const [projectStatus, setProjectStatus] = useState('');
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState<IQuantityProject[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [title, setTitle] = useState('');

  const [viewTask, setViewTask] = useState<ITimeSheetTasks[]>([]);
  const [viewTeam, setViewTeam] = useState<ITimeSheetTeams[]>([]);
  const [projectInfo, setProjectInfo] = useState<IProject>(initProject);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [customer, setCustomer] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(moment().startOf('isoWeek').format('DD MMM YYYY'));
  const [endDate, setEndDate] = useState(moment().endOf('isoWeek').format('D MMM YYYY'));

  const getMemberProject = async () => {
    try {
      const res = await getUserNotPagging();
      setUsers(res);
    } catch (error) {}
  };

  const getTasks = async () => {
    try {
      const res = await getAllTask();
      setTasks(res);
    } catch (error) {}
  };

  const getProjectAll = async (req: IProjectReq) => {
    try {
      const res = await getProjects(req);
      setProjects(res);
      setLoading(true);
    } catch (error) {}
  };

  const getCustomer = async () => {
    try {
      const res = await getAllCustomer();
      setCustomer(res);
    } catch (error) {}
  };

  const getQuantityProjects = async () => {
    try {
      const res = await getQuantityProject();
      setQuantity(res.result);
    } catch (err) {}
  };

  const activeProject = async (id: number) => {
    try {
      await activeProjects(id);
      setIsChange(!isChange);
    } catch (error) {}
  };

  const inactiveProject = async (id: number) => {
    try {
      await inactiveProjects(id);
      setIsChange(!isChange);
    } catch (error) {}
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteProject(id);
      setIsChange(!isChange);
    } catch (error) {}
  };
  const getEditTask = async (id: number) => {
    try {
      const res = await getEditProject(id);
      setEditInfo(res);
      setProject(res);
      return res;
    } catch (error) {}
  };

  const getTimeSheetTasks = async (req: ITimeSheetReq) => {
    try {
      const res = await getTimeSheetTask(req);
      setViewTask(res);
    } catch (err) {}
  };

  const getTimeSheetTeams = async (req: ITimeSheetReq) => {
    try {
      const res = await getTimeSheetTeam(req);
      setViewTeam(res);
    } catch (err) {}
  };

  const valueContext = {
    state,
    projects,
    setProjects,
    loading,
    setLoading,
    getProject,
    getProjectInfo,
    setProject,
    saveTask,
    info,
    setInfo,
    editId,
    setEditId,
    editInfo,
    setEditInfo,
    projectStatus,
    setProjectStatus,
    query,
    setQuery,
    viewTask,
    setViewTask,
    viewTeam,
    setViewTeam,
    users,
    setUsers,
    tasks,
    setTasks,
    quantity,
    setQuantity,
    getMemberProject,
    getTasks,
    projectInfo,
    setProjectInfo,
    getProjectAll,
    getQuantityProjects,
    isChange,
    setIsChange,
    customer,
    getCustomer,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setTitle,
    title,
    activeProject,
    inactiveProject,
    deleteTask,
    getEditTask,
    getTimeSheetTasks,
    getTimeSheetTeams
  };
  return <GlobalContextProvider.Provider value={valueContext}>
    {children}
  </GlobalContextProvider.Provider>;
};
