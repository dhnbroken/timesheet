/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import {
  Select, InputAdornment, Checkbox, TextField, Table,
  TableContainer, TableHead, TableRow, TableBody, TableCell,
  MenuItem, FormControl, InputLabel, SelectChangeEvent
} from '@mui/material';
import { Close, Search } from '@mui/icons-material/';

function createData (
  username: string,
  id: number,
  email: string
) {
  return { username, id, email };
}

const rows = [
  createData('Name', 1, 'abc@gmail.com'),
  createData('Name', 2, 'abc@gmail.com'),
  createData('Name', 3, 'abc@gmail.com')
];

const Team = () => {
  const [role, setRole] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  return (
    <React.Fragment>
      <div className='flex'>
        <div style={{ width: '60%' }}>
          <TableContainer>
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none', padding: '0' }}>Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ padding: '1', borderBottom: 'none' }}>
                    <Checkbox sx={{
                      padding: '0 5px 0 0',
                      fontSize: '12px',
                      '&.Mui-checked': {
                        color: '#ff4081'
                      }
                    }}/>
                    <b>Show deactive member</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <TextField
                      size='small'
                      fullWidth
                      id="input-with-icon-textfield"
                      label="Search by client or project name"
                      InputProps={{
                        sx: { padding: '5px 0' },
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search sx={{ marginLeft: '12px' }}/>
                          </InputAdornment>
                        )
                      }}
                      variant="standard"
                    />
                  </TableCell>
                </TableRow>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ padding: '1' }} component="th" scope="row">
                      <div className='flex-center gap-7'>
                        <button type='button'><Close /></button>
                        <div>
                          <Checkbox disabled sx={{ border: 'none', padding: '0' }} />
                          <p>Member</p>
                        </div>
                        <div>
                          <p>{row.username}</p>
                          <p>{row.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell sx={{ padding: '1' }} align="left">
                      <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">role</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={role}
                          onChange={handleChange}
                          label="Role"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={1}>Project Manager</MenuItem>
                          <MenuItem value={2}>Member</MenuItem>
                          <MenuItem value={3}>Shadow</MenuItem>
                          <MenuItem value={4}>Deactive</MenuItem>
                        </Select>
                      </FormControl>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>s</div>
      </div>
    </React.Fragment>
  );
};

export default Team;
