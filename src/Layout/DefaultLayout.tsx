/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from 'src/components/Header/Header';
import Sidebar from 'src/components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout ({ children }: any) {
  return (
    <React.Fragment>
      <div className={cx('wrapper')}>
        <Header />
        <div className={cx('container')}>
          <Sidebar />
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DefaultLayout;
