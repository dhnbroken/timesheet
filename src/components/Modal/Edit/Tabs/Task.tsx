/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Select, Checkbox, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, FormControlLabel, SelectChangeEvent, MenuItem } from '@mui/material';
import { Close } from '@mui/icons-material/';

function createData (
  task: string,
  billable: boolean,
  id: number
) {
  return { task, billable, id };
}

const rows = [
  createData('Test', false, 1),
  createData('Corner', true, 2),
  createData('Test1', true, 3),
  createData('Task3', false, 4),
  createData('Task4', false, 5)
];

const Task = () => {
  const [age, setAge] = React.useState('');
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };
  return (
    <React.Fragment>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: '0' }}>Tasks </TableCell>
              <TableCell sx={{ padding: '0' }} align="left">
                  Billable
                <div>
                  <FormControlLabel
                    label
                    control={
                      <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                      />
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.task}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ padding: '0' }} component="th" scope="row">
                  <div className='flex-center'>
                    <button type='button'><Close /></button>
                    {row.task}
                  </div>
                </TableCell>
                <TableCell sx={{ padding: '0' }} align="left">
                  {row.billable
                    ? <FormControlLabel
                      label
                      control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                    />
                    : <FormControlLabel
                      label
                      control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
                    />
                  }

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

export default Task;
