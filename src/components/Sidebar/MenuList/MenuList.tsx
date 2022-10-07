/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames/bind';
import styles from './MenuList.module.scss';
import { Link } from 'react-router-dom';
import { Home, GroupWork, Poll } from '@mui/icons-material/';

const cx = classNames.bind(styles);

const MenuList = () => {
  return (
    <React.Fragment>
      <div className={cx('sidebar__menu')}>
        <ul className={cx('menu-list')}>
          <li className={cx('menu-items')}>
            <Link className={cx('item')} to='/home'>
              <Home sx={{ color: '#747474' }}/>
              <span className={cx('item-title')}>Home page</span>
            </Link>
          </li>
          <li className={cx('menu-items')}>
            <Link className={cx('item')} to='/home'>
              <GroupWork sx={{ color: '#747474' }}/>
              <span className={cx('item-title')}>Admin</span>
            </Link>
          </li>
          <li className={cx('menu-items')}>
            <Link className={cx('item')} to='/project'>
              <Poll sx={{ color: '#747474' }}/>
              <span className={cx('item-title')}>Project</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MenuList;
