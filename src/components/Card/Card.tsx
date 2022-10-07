import React from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode
}

const CardComponent: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <div className={cx('container-fluid')}>
        <div className={cx('card')}>
          {children}
        </div>
      </div>
    </React.Fragment>

  );
};

export default CardComponent;
