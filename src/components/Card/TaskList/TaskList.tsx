import React from 'react';
import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import TaskItem from './TaskItem';
import { IProjectList } from 'src/store/interface/projectInterface';

const cx = classNames.bind(styles);

interface Props {
  projects: IProjectList
  loading: boolean
}

const TaskList: React.FC<Props> = (Props) => {
  const { projects } = Props;
  return (
    <React.Fragment>
      <div className={cx('task-list')}><div >
        <table className={cx('task-table')}>
          <thead>
            <tr><th className={cx('table-header')}><span>{projects.customerName}</span></th></tr>
          </thead>
          <tbody className={cx('table-body')}>
            {projects.list.length && projects.list.map((project, index) => (
              <TaskItem key={index} project={project} />
            ))}
          </tbody>
        </table>
      </div>

      </div>
    </React.Fragment>
  );
};

export default TaskList;
