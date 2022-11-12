import React, { useContext, useState } from 'react';
import { IUser } from 'src/store/interface/User';
import { Close } from '@mui/icons-material';
import { FormControl, Select, TableCell, TableRow, MenuItem, SelectChangeEvent } from '@mui/material';
import { IProjectUser } from 'src/store/interface/projectInterface';
import { UserType } from 'src/store/enum/Project';
import { useFormContext } from 'react-hook-form';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

interface Props {
    user: IUser & IProjectUser
    teamMember: Array<IUser & IProjectUser>
    index: number
    handleUnselectMember: Function
}

const TeamInfo: React.FC<Props> = (props) => {
  const { register } = useFormContext();

  const { user, index, handleUnselectMember, teamMember } = props;
  const { editInfo } = useContext(GlobalContextProvider);

  const [role, setRole] = useState(user.type.toString());

  const handleChangeRole = (event: SelectChangeEvent, user) => {
    const index = teamMember.findIndex(team => team.id === user.id);
    user.type = event.target.value;
    editInfo.users[index].type = Number(event.target.value);
    setRole(user.type.toString());
  };

  const userTypes = (type: UserType) => {
    const newType = new Map([
      [0, 'Member'],
      [1, 'Project Manager'],
      [2, 'Shadow'],
      [3, 'Deactive']
    ]);
    return newType.get(type);
  };
  return (
    <TableRow
      {...register(`users.${index}.userId`)}
      key={user.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="td" scope="row" >
        <div className='flex-center gap-7'>
          <button type='button' className='hover-effect' onClick={() => handleUnselectMember(user)}>
            <Close />
          </button>
          <div className='flex-column'>
            <img alt='member' width='60' height='60'/>
          </div>
          <div>
            <p>{user.name}</p>
            <p>{user.emailAddress}</p>
          </div>
        </div>
      </TableCell>
      <TableCell sx={{ padding: '1' }} align="left">
        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="role"
            value={role}
            onChange={(e) => handleChangeRole(e, user)}
            defaultValue={userTypes(user.type)}
          >
            <MenuItem value={0}>{userTypes(0)}</MenuItem>
            <MenuItem value={1}>{userTypes(1)}</MenuItem>
            <MenuItem value={2}>{userTypes(2)}</MenuItem>
            <MenuItem value={3}>{userTypes(3)}</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};

export default TeamInfo;
