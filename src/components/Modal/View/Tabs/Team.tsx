import React, { useContext, useMemo } from 'react';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');
momentDurationFormatSetup(moment);

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
  }
}));

const Team: React.FC = () => {
  const { viewTeam } = useContext(GlobalContextProvider);
  const changeTime = (seconds: number) => {
    const totalTime = moment.duration(seconds, 'seconds').format('mm:ss').toString();
    return totalTime.replace(/,/g, '');
  };
  const totalWorkingTime = useMemo(() => viewTeam.reduce((previousValue, currentValue) => previousValue + currentValue.totalWorkingTime, 0), [viewTeam]);
  const totalBillableTime = useMemo(() => viewTeam.reduce((previousValue, currentValue) => previousValue + currentValue.billableWorkingTime, 0), [viewTeam]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Hour</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Billable Hour</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell align="left">{changeTime(totalWorkingTime)}</TableCell>
            <TableCell align="left">
              <BorderLinearProgress variant="determinate" value={totalBillableTime / totalWorkingTime * 100} />
            </TableCell>
            <TableCell align="left">{changeTime(totalBillableTime)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viewTeam.map((team, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {team.userName}
              </TableCell>
              <TableCell align="left">{team.totalWorkingTime && changeTime(team.totalWorkingTime)}</TableCell>
              <TableCell sx={{ minWidth: '100px' }} align="left">
                <BorderLinearProgress variant="determinate" value={team.totalWorkingTime ? team.totalWorkingTime / team.totalWorkingTime * 100 : 0} />
              </TableCell>
              <TableCell align="left">{team.billableWorkingTime ? changeTime(team.billableWorkingTime) : '0%'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Team;
