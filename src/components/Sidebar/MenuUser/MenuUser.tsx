/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames/bind';
import styles from './MenuUser.module.scss';
import { ExpandMore, ExitToApp } from '@mui/icons-material/';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { logout } from 'src/services/auth.service';

const cx = classNames.bind(styles);

const MenuList = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    logout();
  };

  return (
    <React.Fragment>
      <div className={cx('sidebar__user')}>
        <div className={cx('sidebar__user-frames')}>
          <div className={cx('user-info')}>
            <div className={cx('user-avatar')}>
              <img alt="User" height="60" width="60" src="http://training-api-timesheet.nccsoft.vn/avatars/1661561956762_admin_image.jpg" />
            </div>
            <div className={cx('user-details')}>
              <div className={cx('name')}>admin</div>
              <div className={cx('email')}>email@gmail.com</div>
            </div>
          </div>
          <div className={cx('user-dropdown-btn')}>
            <span onClick={handleClick}><ExpandMore sx={{ lineHeight: '24px', cursor: 'pointer' }}/></span>
            <Menu
              anchorEl={anchorEl}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 128, left: 225 }}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <Link to='/' className={cx('link')}>
                <MenuItem sx={{ fontSize: '14px', px: '18px', py: '7px', width: '150px' }} onClick={handleLogOut}>
                  <ExitToApp fontSize='small' sx={{ mr: '7px', mt: '2px' }} />
                  <span className={cx('flex-1')}>Log out</span>
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MenuList;
