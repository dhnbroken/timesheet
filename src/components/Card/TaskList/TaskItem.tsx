import React from 'react';
import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import TaskActions from './TaskActions';
import { IProject } from 'src/store/interface';
import moment from 'moment';
import { ProjectType } from 'src/store/enum';

const cx = classNames.bind(styles);

interface Props {
  project: IProject
}

const projectTypes = (type: ProjectType) => {
  const newType = new Map([
    [0, 'T&M'],
    [1, 'FF'],
    [2, 'NB'],
    [3, 'ODC']
  ]);
  return newType.get(type);
};

const TaskItem: React.FC<Props> = (Props) => {
  const { project } = Props;

  return (
    <React.Fragment>
      <tr >
        <td className={cx('project-item')}>
          <span className={cx('project')}>{project.name}</span>
          <span className={cx('pm')}>{project.pms.join(', ')}</span>
          <span className={cx('member')}>{project.activeMember} members</span>
          {project.projectType !== 5
            ? <span className={cx('status')}>{projectTypes(project.projectType)}</span>
            : null
          }
          <span className={cx('time')}>
            { (project.timeEnd)
              ? moment(project.timeStart).format('DD/MM/YYYY') + ' - ' + moment(project.timeEnd).format('DD/MM/YYYY')
              : moment(project.timeStart).format('DD/MM/YYYY')
            }
          </span>
          <div className={cx('action-btn')}>
            {project.status === 0
              ? <span className={cx('project-status', 'active')}>Active</span>
              : <span className={cx('project-status', 'deactive')}>Deactive</span>
            }
            <TaskActions />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TaskItem;
