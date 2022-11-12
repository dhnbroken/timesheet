import { ITimeSheetReq } from 'src/store/interface/TimeSheet';
import { axiosInstance } from './axiosInstance';

export const getTimeSheetTask = async (req: ITimeSheetReq) => {
  try {
    const res = await axiosInstance.get('api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks',
      { params: { projectId: req.projectId, startDate: req.startDate, endDate: req.endDate } });
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
};

export const getTimeSheetTeam = async (req: ITimeSheetReq) => {
  try {
    const res = await axiosInstance.get('api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams',
      { params: { projectId: req.projectId, startDate: req.startDate, endDate: req.endDate } });
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
};
