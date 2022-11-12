import React, { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import MenuList from './MenuList/MenuList';
import MenuUser from './MenuUser/MenuUser';
import { getUser } from 'src/services/user.service';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const { setInfo } = useContext(GlobalContextProvider);

  const getUserInfo = async () => {
    try {
      const res = await getUser();
      setInfo(res);
    } catch (error) {}
  };
  useEffect(() => {
    if (localStorage.getItem('user')) {
      getUserInfo();
    }
  }, [localStorage.getItem('user')]);
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
