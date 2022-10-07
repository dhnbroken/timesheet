/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames/bind';
import { Tab, Tabs, Typography, Box, Checkbox, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './EditModal.module.scss';
import General from './Tabs/General';
import Task from './Tabs/Task';
import TargetUser from './Tabs/TargetUser';
import Team from './Tabs/Team';

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
      className='tab-view'
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

const EditModal: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { setOpenEdit } = props;
  return (
    <React.Fragment>
      <div className={cx('action__form')}>
        <form className={cx('form-edit')}>
          <h2 className={cx('header-title')}>Edit Project: Project</h2>
          <Close sx={{ position: 'absolute', top: 0, right: 0 }} onClick={() => setOpenEdit(false)}/>
          <hr />
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', maxHeight: '70vh' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="General" {...a11yProps(0)} />
                <Tab label="Team" {...a11yProps(1)} />
                <Tab label="Task" {...a11yProps(2)} />
                <Tab label="Target User" {...a11yProps(3)} />
                <Tab label="Notification" {...a11yProps(4)} />
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
                }}/>
                <span>Gửi thông báo đến Komu</span>
              </div>
              <TextField id="standard-basic" label="Komu Channel Id" variant="standard" color='error' fullWidth/>
            </TabPanel>
          </Box>
          <div className='flex-end gap-7'>
            <button className={cx('cancel-btn')} onClick={() => setOpenEdit(false)}>Cancel</button>
            <button className={cx('save-btn')} disabled>Save</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EditModal;
