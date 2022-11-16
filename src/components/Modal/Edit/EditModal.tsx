import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Tab, Tabs, Typography, Box, Checkbox, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './EditModal.module.scss';
import General from './Tabs/General';
import Task from './Tabs/Task';
import TargetUser from './Tabs/TargetUser';
import Team from './Tabs/Team';
import { IProjectSave } from 'src/store/interface/projectInterface';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { saveProject } from 'src/services/project.service';
import Swal from 'sweetalert2';
import { UserType } from 'src/store/enum/Project';

const cx = classNames.bind(styles);

interface Props {
  setOpenEdit: Function
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      className='overflow-x'
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: '18px' }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const schema = yup.object({
  customerId: yup.number().required('Client is required'),
  name: yup.string().required('Project name is required!'),
  code: yup.string().required('Project code is required!'),
  timeStart: yup
    .date()
    .required('Project time start is required!')
    .nullable(),
  timeEnd: yup
    .date()
    .required('Project time end is required!')
    .nullable()
    .min(yup.ref('timeStart'), 'Time end must be after Time start')
}).required();

const EditModal: React.FC<Props> = (props) => {
  const { setOpenEdit } = props;
  const { editInfo, title, isChange, setIsChange, getMemberProject, getTasks, clearEditInfo } = useContext(GlobalContextProvider);
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(editInfo.isNotifyToKomu);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const methods = useForm<IProjectSave>({
    resolver: yupResolver(schema),
    mode: 'all'
  });

  const handleCancel = () => {
    setOpenEdit(false);
    clearEditInfo();
  };

  useEffect(() => {
    getMemberProject();
    getTasks();
  }, []);

  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const errors = methods.formState.errors;
    const isNotError = !Object.keys(errors).length && errors.constructor === Object;
    !isNotError ? setIsDisable(true) : setIsDisable(false);
  }, [methods.formState]);

  const PMFilter = editInfo.users.filter((user) => user.type === UserType.PROJECTMANAGER);

  const onSubmit = () => {
    if (!editInfo.users.length || !PMFilter.length) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Project must have at least one member or one PM',
        showConfirmButton: true
      });
    } else if (!editInfo.tasks.length) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Project must have at least one task!',
        showConfirmButton: true
      });
    } else {
      setOpenEdit(false);
      if (!editInfo.isNotifyToKomu || editInfo.komuChannelId === '') editInfo.komuChannelId = null;
      saveProject(editInfo)
        .then((res) => {
          res && res.status === 200 && setIsChange(!isChange);
        }
        );
    }
  };

  const handleKomuChannel = () => {
    !checked ? editInfo.isNotifyToKomu = true : editInfo.isNotifyToKomu = false;
    setChecked(!checked);
  };

  const handleKomuIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    editInfo.komuChannelId = e.target.value;
  };

  return (
    <React.Fragment>
      <div className={cx('action__form')}>
        <FormProvider {...methods}>
          <form className={cx('form-edit')} onSubmit={methods.handleSubmit(onSubmit)}>
            <h2 className={cx('header-title')}>{`${title} ${editInfo.name}`}</h2>
            <Close sx={{ position: 'absolute', top: 0, right: 0 }} onClick={() => setOpenEdit(false)}/>
            <hr />
            <Box className={cx('form-content')} sx={{ width: '100%', display: 'flex', flexDirection: 'column', maxHeight: '70vh' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="General" {...a11yProps(0)} />
                  <Tab label="Team" {...a11yProps(1)} />
                  <Tab label="Task" {...a11yProps(2)} />
                  {editInfo.users.find((user) => user.type === 2) ? <Tab label="Target User" {...a11yProps(3)}/> : null}
                  <Tab label="Notification" {...a11yProps(4)} value={4} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <General />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Team />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Task />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <TargetUser />
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className='flex-center'>
                  <Checkbox sx={{
                    padding: '0 5px 0 0',
                    fontSize: '12px',
                    '&.Mui-checked': {
                      color: '#ff4081'
                    }
                  }}
                  checked={checked}
                  onChange={() => handleKomuChannel() }/>
                  <span>Gửi thông báo đến Komu</span>
                </div>
                <TextField disabled={!checked} id="standard-basic" placeholder="Komu Channel Id" variant="standard" color='error' fullWidth
                  onChange={handleKomuIdInput} defaultValue={editInfo.komuChannelId}
                />
              </TabPanel>
            </Box>
            <div className={`flex-end gap-7 ${cx('form-btn')}`}>
              <button className={cx('cancel-btn')} onClick={handleCancel}>Cancel</button>
              <button type='submit' disabled={isDisable} className={cx('save-btn')}>Save</button>
            </div>
          </form>
        </FormProvider>
      </div>
    </React.Fragment>
  );
};

export default EditModal;
