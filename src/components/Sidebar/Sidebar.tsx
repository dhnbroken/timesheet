/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuList from './MenuList/MenuList';
import MenuUser from './MenuUser/MenuUser';

const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <React.Fragment>
      <aside className={cx('sidebar')}>
        <MenuUser />
        <MenuList />
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
