import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuUser.module.scss';
import { ExpandMore, ExitToApp } from '@mui/icons-material/';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

const cx = classNames.bind(styles);

const MenuUser: React.FC = () => {
  const { info, setQuery, setProjectStatus, clearEditInfo } = useContext(GlobalContextProvider);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const removeAccessToken = () => {
    return localStorage.removeItem('user');
  };

  const handleLogOut = () => {
    removeAccessToken();
    setQuery('');
    setProjectStatus('');
    clearEditInfo();
    navigate('/login');
  };

  return (
    <React.Fragment>
      <div className={cx('sidebar__user')}>
        <div className={cx('sidebar__user-frames')}>
          <div className={cx('user-info')}>
            <div>
              <img className={cx('user-avatar')} alt="User" height="60" width="60" src={`http://training-api-timesheet.nccsoft.vn${info.avatarPath}`} />
            </div>
            <div className={cx('user-details')}>
              <div className={cx('name')}>{info.name + ' ' + info.surname}</div>
              <div className={cx('email')}>{info.emailAddress}</div>
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

export default MenuUser;
