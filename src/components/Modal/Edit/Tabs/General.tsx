/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Grid, Box, FormControl, InputLabel, MenuItem, Select, Button, SelectChangeEvent, TextField, Stack, Checkbox } from '@mui/material';
import { Add } from '@mui/icons-material';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const cx = classNames.bind(styles);

const General = () => {
  const [client, setClient] = React.useState('');
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54')
  );

  const handleChangeOptions = (event: SelectChangeEvent) => {
    setClient(event.target.value);
  };
  const handleChangeDate = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <div className={cx('general-tab')}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Client*</label>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={client}
                  label="Client"
                  onChange={handleChangeOptions}
                >
                  <MenuItem value={1}>Client 1</MenuItem>
                  <MenuItem value={2}>Client 2</MenuItem>
                  <MenuItem value={3}>Client 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ bgcolor: '#f24b50', ':hover': { bgcolor: '#f24b50' } }}
              variant="contained">
              <Add />
                        New Client
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Project Name*</label>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Project" variant="outlined" fullWidth/>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Project Code*</label>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Project code" variant="outlined"/>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Date*</label>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <DesktopDatePicker
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                To
                <DesktopDatePicker
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Note</label>
          </Grid>
          <Grid item xs={10}>
            <TextField label="Add some notes" variant="outlined" fullWidth/>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>All User</label>
          </Grid>
          <Grid item xs={10}>
            <Checkbox sx={{
              padding: '0 5px 0 0',
              fontSize: '12px',
              '&.Mui-checked': {
                color: '#ff4081'
              }
            }}/>
            <span>Auto add user as a member of this project when creating new user</span>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Project Type*</label>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={2.5}>
              <Grid item xs={3}>
                <button type='button' className='btn'>Time&amp;Materials</button></Grid>
              <Grid item xs={3}>
                <button type='button' className='btn'>Fixed Fee</button>
              </Grid>
              <Grid item xs={3}>
                <button type='button' className='btn btn-active'>Non-Billable</button>
              </Grid>
              <Grid item xs={3}>
                <button type='button' className='btn'>ODC</button>
              </Grid>
              <Grid item xs={3}>
                <button type='button' className='btn'>Product</button>
              </Grid>
              <Grid item xs={3}>
                <button type='button' className='btn'>Training</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default General;
