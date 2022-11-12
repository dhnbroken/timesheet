import React from 'react';
import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import TaskActions from './TaskActions';
import { IProject } from 'src/store/interface/projectInterface';
import moment from 'moment';
import { ProjectStatus, ProjectType } from 'src/store/enum/Project';

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
          {project.projectType !== ProjectType.Product && project.projectType !== ProjectType.Training
            ? <span className={cx('status')}>{projectTypes(project.projectType)}</span>
            : null
          }
          <span className={cx('time')}>
            { (project.timeEnd)
              ? `${moment(project.timeStart).format('DD/MM/YYYY')} - ${moment(project.timeEnd).format('DD/MM/YYYY')}`
              : moment(project.timeStart).format('DD/MM/YYYY')
            }
          </span>
          <div className={cx('action-btn')}>
            <span className={cx('project-status', project.status === ProjectStatus.ACTIVE ? 'active' : 'deactive')}>{project.status === ProjectStatus.ACTIVE ? 'Active' : 'Deactive'}</span>
            <TaskActions project={project} />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TaskItem;
