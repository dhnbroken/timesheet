/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Select, TextField, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, FormControlLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import { Close } from '@mui/icons-material/';

function createData (
  task: string,
  roleName: string,
  id: number
) {
  return { task, roleName, id };
}

const rows = [
  createData('Test', 'Name', 1),
  createData('Corner', 'Name', 2),
  createData('Test1', 'Name', 3)
];

const TargetUser = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
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
            {rows.map((row) => (
              <TableRow
                key={row.task}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ padding: '1' }} component="th" scope="row">
                  <div className='flex-center'>
                    <button type='button'><Close /></button>
                    {row.task}
                  </div>
                </TableCell>
                <TableCell sx={{ padding: '1' }} align="left">
                  <TextField id="standard-basic" label={row.roleName} variant="standard" fullWidth size='small'/>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <Select
        value={age}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        fullWidth
      >
        <MenuItem value="">
          Select Task
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </React.Fragment>
  );
};

export default TargetUser;
