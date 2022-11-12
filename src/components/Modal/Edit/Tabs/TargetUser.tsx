import React, { useContext, useMemo, useState } from 'react';
import {
  TextField, Table, TableContainer, TableHead, TableRow, TableBody, TableCell,
  Accordion, AccordionSummary, AccordionDetails, InputAdornment
} from '@mui/material';
import { AddCircleOutline, Close, ExpandMore, Search } from '@mui/icons-material/';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { IUser } from 'src/store/interface/User';
import { IProjectTargetUsers } from 'src/store/interface/projectInterface';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';
const cx = classNames.bind(styles);

const TargetUser: React.FC = () => {
  const [query, setQuery] = useState('');
  const { users, editInfo } = useContext(GlobalContextProvider);

  const usersId = editInfo.projectTargetUsers.map((user) => user.userId);
  const userId = users.filter((user) => usersId.includes(user.id));

  const userRoleTest = userId.map((user, index) => Object.assign({}, user, editInfo.projectTargetUsers[index]));

  const [targetUser, setTargetUser] = useState(userRoleTest);
  const userSelectFilter = useMemo(() =>
    users.filter((user) => !targetUser.map((users) => users.userId).includes(user.id))
  , [targetUser]);
  const [selectTargetUser, setSelectTargetUser] = useState(userSelectFilter);

  const handleSelectTargetUser = (user) => {
    const index = selectTargetUser.findIndex(team => team.id === user.id);
    selectTargetUser.splice(index, 1);
    setTargetUser([...targetUser, user]);
    editInfo.projectTargetUsers.push({
      userId: user.id,
      roleName: user.roleName || ''
    });
  };

  const handleUnselectTargetUser = (user: IUser & IProjectTargetUsers) => {
    const index = targetUser.findIndex(team => team.id === user.id);
    targetUser.splice(index, 1);
    setSelectTargetUser([...selectTargetUser, user]);
    editInfo.projectTargetUsers.splice(index, 1);
  };

  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    editInfo.projectTargetUsers[index].roleName = event.target.value;
  };

  return (
    <React.Fragment>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: '1' }}>Target User Name </TableCell>
              <TableCell sx={{ padding: '1' }} align="left">
                  Role Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {targetUser.map((user, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ padding: '1' }} component="th" scope="row" className='flex-center' onClick={() => handleUnselectTargetUser(user)}>
                  <div className={cx('task-list')}>
                    <button type='button'><Close /></button>
                    {user.name}
                  </div>
                </TableCell>
                <TableCell sx={{ padding: '1' }} align="left">
                  <TextField
                    id="standard-basic"
                    label='Role Name'
                    defaultValue={user?.roleName}
                    variant="standard"
                    fullWidth
                    size='small'
                    onChange={(e) => handleChangeRole(e, index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <b>Team</b>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableBody className='w100'>
              <TextField
                size='small'
                fullWidth
                id="target-user-search"
                label="Search by name"
                variant='standard'
                InputProps={{
                  sx: { padding: '5px 0' },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ marginLeft: '12px' }}/>
                    </InputAdornment>
                  )
                }}
                onChange={(e) => setQuery(e.target.value)}
              />
              {selectTargetUser.filter((user) =>
                user.name.toLowerCase().includes(query)).map((user, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell className='flex-center gap-7' sx={{ padding: '16px 0px', width: '50%' }} component="td" scope="row"
                    onClick={() => handleSelectTargetUser(user)}
                  >
                    <div className={cx('task-list')}>
                      <AddCircleOutline />
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default TargetUser;
