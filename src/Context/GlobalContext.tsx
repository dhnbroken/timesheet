import { IProject, IProjectState } from '@/store/interface';
import taskReducer from 'src/store/reducer';
import React from 'react';
import { TaskContext } from './TaskContext';
import * as actions from 'src/store/actions';
import { initProjectState } from 'src/store/constants';

interface GlobalContext {
    state: IProjectState
    getTask: (task: IProject[]) => void
}

interface PropsProvider {
    children: React.ReactNode
}

export const GlobalContextProvider = React.createContext<GlobalContext>(TaskContext);
export const GlobalStoreContext = ({ children }: PropsProvider) => {
  const [state, dispatch] = React.useReducer(taskReducer, initProjectState);

  const getTask = (task: IProject[]) => dispatch(actions.getTask(task));

  const valueContext = {
    state,
    getTask
  };
  return <GlobalContextProvider.Provider value={valueContext}>
    {children}
  </GlobalContextProvider.Provider>;
};
