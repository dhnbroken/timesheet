/* eslint-disable @typescript-eslint/indent */
import { Action, IProjectState } from './interface';

function taskReducer (state: IProjectState, action: Action): IProjectState {
  const { type } = action;
  switch (type) {
  case 'GETTASK':
    if (action.payload) {
      return {
        ...state,
        tasks: action.payload
      };
    }
    return state;
  default:
    return state;
  }
}

export default taskReducer;
