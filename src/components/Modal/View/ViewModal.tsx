/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import classNames from 'classnames/bind';
import { Tab, Tabs, Typography, Box, SelectChangeEvent, FormControl, Select, InputLabel, MenuItem, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from './ViewModal.module.scss';

const cx = classNames.bind(styles);

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

const ViewModal: React.FC = () => {
  const [time, setTime] = React.useState('');
  const [value, setValue] = React.useState(0);

  const handleSelectTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <div className={cx('view')}>
        <div className='flex-between'>
          <div>
            <button className={cx('view-btn')}>
              <ChevronLeft />
            </button>
            <button className={cx('view-btn')}>
              <ChevronRight />
            </button>
            <span className={cx('view-title')}><b>Week: 3 - 9 Oct 2022</b></span>
          </div>
          <div className='flex-between'>
            <Box sx={{ minWidth: 120, width: 200, mr: '30px' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Week</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="Week"
                  onChange={handleSelectTime}
                >
                  <MenuItem value={1}>Week</MenuItem>
                  <MenuItem value={2}>Month</MenuItem>
                  <MenuItem value={3}>Quarter</MenuItem>
                  <MenuItem value={4}>Year</MenuItem>
                  <MenuItem value={5}>All Time</MenuItem>
                  <MenuItem value={6}>Custom Time</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button sx={{
              mr: '30px',
              bgcolor: '#f24b50',
              textTransform: 'none',
              color: '#fff',
              ':hover': { bgcolor: '#f24b50' },
              boxShadow: '0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'
            }}>Export</Button>
          </div>
        </div>
        <hr />
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', maxHeight: '70vh' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Task" {...a11yProps(0)} />
              <Tab label="Team" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
              Task
          </TabPanel>
          <TabPanel value={value} index={1}>
              Team
          </TabPanel>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default ViewModal;
