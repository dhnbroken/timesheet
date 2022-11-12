import React, { useContext, useState } from 'react';
import { Grid, Box, FormControl, MenuItem, Select, Button, SelectChangeEvent, TextField, Stack, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Add } from '@mui/icons-material';
import classNames from 'classnames/bind';
import styles from './Tabs.module.scss';

import { Controller, useFormContext } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { IProjectSave } from 'src/store/interface/projectInterface';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import moment, { Moment } from 'moment';

const cx = classNames.bind(styles);

const General: React.FC = () => {
  const { state, projectInfo, customer, editInfo } = useContext(GlobalContextProvider);
  const [checked, setChecked] = useState(true);

  const handleSelectAllUser = () => {
    setChecked(!checked);
    checked ? editInfo.isAllUserBelongTo = true : editInfo.isAllUserBelongTo = false;
  };

  const [client, setClient] = useState(projectInfo.customerName);
  const [type, setType] = useState(state.projectInfo.projectType.toString());

  const { register } = useFormContext();
  const methods = useFormContext<IProjectSave>();

  const [timeStart, setTimeStart] = React.useState<Date | null | Moment>(moment(editInfo.timeStart));
  const [timeEnd, setTimeEnd] = React.useState<Date | null | Moment>(moment(editInfo.timeEnd));

  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
    editInfo.projectType = Number(event.target.value);
  };

  const [clientId, setClientId] = React.useState(editInfo.customerId || 1);

  const handleChangeOptions = (event: SelectChangeEvent) => {
    setClient(event.target.value);
    editInfo.customerId = Number(event.target.value);
    setClientId(editInfo.customerId);
  };

  const projectTypes = [
    { id: 0, name: 'Time & Materials' },
    { id: 1, name: 'Fixed Fee' },
    { id: 2, name: 'Non-Billable' },
    { id: 3, name: 'ODC' },
    { id: 4, name: 'Product' },
    { id: 5, name: 'Training' }
  ];
  return (
    <React.Fragment>
      <div className={cx('general__form')}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Client*</label>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <FormControl
                fullWidth>
                <Select
                  {...register('customerId', { required: 'Client must be specified' })}
                  defaultValue={'1'}
                  value={clientId.toString()}
                  label={client}
                  onChange={handleChangeOptions}
                  MenuProps={{ PaperProps: { sx: { height: '250px' } } }}
                >
                  {customer.map((client, index) => (
                    <MenuItem key={index} value={client.id}>{client.name}</MenuItem>
                  ))}
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
            <p className='valid-error'>{methods.formState.errors.name?.message}</p>
            <TextField
              error={!!methods.formState.errors.name?.message}
              placeholder='Project name'
              defaultValue={editInfo.name}
              {...register('name')}
              onChange={(e) => {
                editInfo.name = e.target.value;
              }}
              variant="outlined" fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Project Code*</label>
          </Grid>
          <Grid item xs={6}>
            <p className='valid-error'>{methods.formState.errors.code?.message}</p>
            <TextField error={!!methods.formState.errors.code?.message}
              placeholder='Project code'
              {...register('code')} defaultValue={editInfo.code} variant="outlined"
              onChange={(e) => {
                editInfo.code = e.target.value;
              }}/>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Date*</label>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <Controller
                  name='timeStart'
                  control={methods.control}
                  defaultValue={new Date().toString()}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        label='Start at...'
                        value={timeStart?.toString()}
                        onChange={(event) => {
                          onChange(event);
                          setTimeStart(moment(event));
                          if (event) editInfo.timeStart = moment(event).format();
                        }}
                        {...field}
                        renderInput={(params) => (
                          <TextField variant="outlined" color="primary" {...params} />
                        )}
                      />
                    );
                  }}
                />
                <Controller
                  name='timeEnd'
                  control={methods.control}
                  defaultValue={new Date().toString()}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        label='End at...'
                        value={timeEnd?.toString()}
                        onChange={(event) => {
                          onChange(event);
                          setTimeEnd(moment(event));
                          if (event) editInfo.timeEnd = moment(event).format();
                        }}
                        {...field}
                        renderInput={(params) => (
                          <TextField variant="outlined" color="primary" {...params} />
                        )}
                      />
                    );
                  }}
                />
              </Stack>
            </LocalizationProvider>
            <p className='valid-error'>{methods.formState.errors.timeStart?.message ?? ''}</p>
            <p className='valid-error'>{methods.formState.errors.timeEnd?.message ?? ''}</p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Note</label>
          </Grid>
          <Grid item xs={10}>
            <TextField {...register('note')} placeholder='Add some notes' defaultValue={editInfo.note} variant="outlined" fullWidth
              onChange={(e) => {
                editInfo.note = e.target.value;
              }}/>
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
            }}
            checked={editInfo.isAllUserBelongTo}
            onChange={() => handleSelectAllUser()}
            />
            <span>Auto add user as a member of this project when creating new user</span>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <label>Project Type*</label>
          </Grid>
          <Grid item xs={10}>
            <FormControl >
              <RadioGroup
                value={type}
                onChange={handleChangeType}
              >
                <Grid container spacing={2.5}>
                  {projectTypes.map((types) => (
                    <Grid item xs={3} key={types.id}>
                      <FormControlLabel
                        {...register('projectType')}
                        className={type === types.id.toString() ? 'btn btn-active' : 'btn'}
                        value={types.id}
                        control={<Radio className={cx('radio-btn')} />}
                        label={types.name}/>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default General;
