import React, { useContext, useMemo, useState } from 'react';
import {
  Checkbox, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, FormControlLabel,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { AddCircleOutline, Close, ExpandMore } from '@mui/icons-material/';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';
import { ITask } from 'src/store/interface/Task';

const cx = classNames.bind(styles);

const Task = () => {
  const { tasks, editInfo } = useContext(GlobalContextProvider);

  const tasksId = editInfo.tasks.map((task) => task.taskId);

  const taskId = useMemo(() => tasks.filter((task) => tasksId.includes(task.id)), []);
  const userRoleTest = taskId.map((user, index) => Object.assign({}, user, editInfo.tasks[index]));
  const tasksFilter = useMemo(() => tasks.filter((task) => !taskId.map((tasks) => tasks.id).includes(task.id)), []);

  const [projectTask, setProjectTask] = useState(userRoleTest);
  const [selectTask, setSelectTask] = useState(tasksFilter);

  const handleSelectTask = (task) => {
    const index = selectTask.findIndex(team => team.id === task.id);
    selectTask.splice(index, 1);
    task.billable = true;
    setProjectTask([...projectTask, task]);
    editInfo.tasks.push({
      taskId: task.id,
      billable: true
    });
  };

  const handleUnselectTask = (task: ITask) => {
    const index = projectTask.findIndex(team => team.id === task.id);
    projectTask.splice(index, 1);
    editInfo.tasks.splice(index, 1);
    setSelectTask([...selectTask, task]);
  };

  const checkAllTask = projectTask.every((task) => !!task.billable);
  const checkSomeTask = projectTask.some((task) => task.billable);

  const [checkAll, setCheckAll] = useState(checkAllTask);

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckAll(!checkAll);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>, index) => {
    projectTask[index].billable = !projectTask[index].billable;
    editInfo.tasks[index].billable = event.target.checked;
  };

  return (
    <React.Fragment>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: '0' }}>Tasks </TableCell>
              <TableCell sx={{ padding: '0' }} align="left">
                  Billable
                <br />
                <FormControlLabel
                  label=''
                  control={
                    <Checkbox
                      checked={checkAll}
                      indeterminate={!checkAllTask && checkSomeTask !== checkAllTask}
                      onChange={handleChangeAll}
                    />
                  }
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!projectTask.length && projectTask.map((task, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ padding: '0' }} component="th" scope="row" onClick={() => { handleUnselectTask(task); }}>
                  <div className={cx('task-list')}>
                    <button type='button'><Close /></button>
                    {task.name}
                  </div>
                </TableCell>
                <TableCell sx={{ padding: '0' }} align="left">
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox defaultChecked={task.billable} onChange={(e) => handleChange3(e, index)} />
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <b>Select Tasks</b>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableBody className='w100'>
              {selectTask.length && selectTask.map((task, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell sx={{ padding: '16px 0px', width: '50%' }} component="td" scope="row" onClick={() => handleSelectTask(task)}>
                    <div className='flex-center gap-7'>
                      <AddCircleOutline />
                      <span>{task.name}</span>
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: '16px 0px' }} component="td" scope="row">
                    <span>Other Task</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default Task;
