import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp, faEllipsisVertical, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { srcImg, flagImg, docsHref, usageHref } from 'src/assets/link/link';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  return (
    <React.Fragment>
      <div className={cx('wrapper')}>
        <Grid container>
          <Grid item xs={12}>
            <div className={cx('header__container')}>
              <div className={cx('header-left')}>
                <Link to='/home' className='logo flex-center'>
                  <img src={srcImg} alt="Logo" height='20' width='20'/>
                    &nbsp;Timesheet
                </Link>
              </div>
              <div className={cx('header-right')}>
                <ul className={cx('header-selection')}>
                  <div className={cx('header-selection-icons')}>
                    <div className={cx('header-icon')}>
                      <div className={cx('icon')}>
                        <a href={docsHref} target='_blank' rel="noreferrer">
                          <FontAwesomeIcon color='white' icon={faFileArrowUp} fontSize='20px' />
                        </a>
                      </div>
                      <div className={cx('icon')}>
                        <a href={usageHref} target='_blank' rel="noreferrer">
                          <FontAwesomeIcon color='white' icon={faFileLines} fontSize='20px' />
                        </a>
                      </div>
                    </div>
                    <li className={cx('dropdown')}>
                      <a className={cx('dropdown-toggle')} href="#">
                        <img alt="Great Britain Flag" src={flagImg} width="16" height="11" />
                        <span>English</span>
                        <b><FontAwesomeIcon icon={faCaretDown} fontSize='14px'/></b>
                      </a>
                    </li>
                  </div>
                  <li className={cx('pull-right')}>
                    <a className={cx('right-sidebar')} href="#">
                      <button className={cx('pull-right-btn')}>
                        <FontAwesomeIcon color='white' icon={faEllipsisVertical} height='24px' width='24px' fontSize='24px'/>
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Header;
