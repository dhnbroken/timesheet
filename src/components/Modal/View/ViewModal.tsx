import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Tab, Tabs, Typography, Box, SelectChangeEvent, FormControl, Select, MenuItem, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from './ViewModal.module.scss';
import Team from './Tabs/Team';
import Task from './Tabs/Task';
import moment, { unitOfTime } from 'moment';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { ITimeSheetReq } from '@/store/interface/TimeSheet';

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

const ViewModal: React.FC = () => {
  const [time, setTime] = useState(1);
  const [value, setValue] = useState(0);
  const { startDate, endDate, setStartDate, setEndDate, state, editInfo, getTimeSheetTasks, getTimeSheetTeams } = useContext(GlobalContextProvider);

  const getTimeSheetAPI = () => {
    const req: ITimeSheetReq = {
      projectId: Number(state.projectInfo.id),
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD')
    };
    getTimeSheetTasks(req);
    getTimeSheetTeams(req);
  };
  const [timeUnit, setTimeUnit] = useState<unitOfTime.DurationConstructor>('weeks');

  const handleSelectTime = (event: SelectChangeEvent) => {
    setTime(Number(event.target.value));
    switch (Number(event.target.value)) {
    case 1: {
      setStartDate(moment().startOf('isoWeek').format('DD MMM YYYY'));
      setEndDate(moment().endOf('isoWeek').format('D MMM YYYY'));
      setTimeUnit('weeks');
    }
      break;
    case 2: {
      setStartDate(moment().startOf('month').format('DD MMM YYYY'));
      setEndDate(moment().endOf('month').format('D MMM YYYY'));
      setTimeUnit('months');
    }
      break;
    case 3: {
      setStartDate(moment().startOf('quarter').format('DD MMM YYYY'));
      setEndDate(moment().endOf('quarter').format('D MMM YYYY'));
      setTimeUnit('quarters');
    }
      break;
    case 4: {
      setStartDate(moment().startOf('year').format('DD MMM YYYY'));
      setEndDate(moment().endOf('year').format('D MMM YYYY'));
      setTimeUnit('years');
    }
      break;
    case 5: {
      const startDay = moment(editInfo.timeStart);
      const endDay = moment(editInfo.timeEnd);
      setStartDate(moment(startDay).format('DD MMM YYYY'));
      setEndDate(moment(endDay).format('D MMM YYYY'));
      const req: ITimeSheetReq = {
        projectId: Number(state.projectInfo.id),
        startDate: '',
        endDate: ''
      };
      getTimeSheetTasks(req);
      getTimeSheetTeams(req);
    }
      break;
    default: break;
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeTime = (amount: number) => {
    setStartDate(moment(startDate).add(amount, timeUnit).startOf(timeUnit).format('DD MMM YYYY'));
    setEndDate(moment(endDate).add(amount, timeUnit).endOf(timeUnit).format('D MMM YYYY'));
  };

  useEffect(() => {
    getTimeSheetAPI();
  }, [startDate, endDate]);
  return (
    <React.Fragment>
      <div className={cx('view')}>
        <div className='flex-between'>
          <div>
            <button className={cx('view-btn')} onClick={() => handleChangeTime(-1)}>
              <ChevronLeft />
            </button>
            <button className={cx('view-btn')} onClick={() => handleChangeTime(1)}>
              <ChevronRight />
            </button>
            <span className={cx('view-title')}><b>{`Week: ${startDate} - ${endDate}`}</b></span>
          </div>
          <div className='flex-between'>
            <Box sx={{ minWidth: 120, width: 200, mr: '30px' }}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={time.toString()}
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
            <Task />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Team />
          </TabPanel>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default ViewModal;
