import React, { useContext, useState, useMemo } from 'react';
import {
  Select, InputAdornment, Checkbox, TextField, Table,
  TableRow, TableBody, TableCell,
  MenuItem, FormControl, InputLabel, SelectChangeEvent,
  Accordion, AccordionSummary, AccordionDetails, Grid, Box
} from '@mui/material';
import { Search, ExpandMore, ArrowBackIos } from '@mui/icons-material/';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { IUser } from 'src/store/interface/User';
import { UserType } from 'src/store/enum/Project';
import TeamInfo from './TeamInfo';

const Team: React.FC = () => {
  const { editInfo, users } = useContext(GlobalContextProvider);
  const [branch, setBranch] = useState('');
  const [type, setType] = useState('');
  const [memberQuery, setMemberQuery] = useState('');

  const keys = ['name', 'emailAddress'];
  const handleChangeBrand = (event: SelectChangeEvent) => {
    setBranch(event.target.value);
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const membersId = editInfo.users.map((user) => user.userId);
  const usersId = useMemo(() => users.filter((user) => membersId.includes(user.id)), [editInfo.users]);
  const usersIdTest = usersId.map((user, index) => Object.assign({}, user, editInfo.users[index]));

  const [teamMember, setTeamMember] = useState(usersIdTest);
  const userSelect = useMemo(() => users.filter((user) => !teamMember.map((users) => users.id).includes(user.id)), [teamMember]);
  const [teamSelect, setTeamSelect] = useState(userSelect);

  const handleSelectMember = (user) => {
    const index = teamSelect.findIndex(team => team.id === user.id);
    teamSelect.splice(index, 1);
    if (!teamMember.length && !activeFilter.length) {
      user.type = UserType.PROJECTMANAGER;
    }
    setTeamMember([...teamMember, user]);
    editInfo.users.push({
      userId: user.id,
      type: user.type
    });
  };
  const handleUnselectMember = (user: IUser) => {
    const index = teamMember.findIndex(team => team.id === user.id);
    teamMember.splice(index, 1);
    editInfo.users.splice(index, 1);
    setTeamSelect([...teamSelect, user]);
  };

  const [showDeactive, setShowDeactive] = useState(false);

  const activeFilter = teamMember.filter((user) => user.type !== UserType.DEACTIVE);
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item lg={7} md={12}>
            <Table className='expansion-panel' aria-label="team table">
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="team-content"
                >
                  <b>Team</b>
                </AccordionSummary>
                <AccordionDetails>
                  <TableBody >
                    <TableRow>
                      <TableCell sx={{ padding: '1', borderBottom: 'none' }}>
                        <Checkbox sx={{
                          padding: '0 5px 0 0',
                          fontSize: '12px',
                          '&.Mui-checked': {
                            color: '#ff4081'
                          }
                        }}
                        checked={showDeactive}
                        onChange={() => setShowDeactive(!showDeactive)}
                        />
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
                    {showDeactive
                      ? !!teamMember.length && teamMember.map((user, index) => (
                        <TeamInfo key={index} user={user} index={index}
                          handleUnselectMember={handleUnselectMember}
                          teamMember={teamMember}
                        />
                      ))
                      : !!activeFilter.length && activeFilter.map((user, index) => (
                        <TeamInfo key={index} user={user} index={index}
                          handleUnselectMember={handleUnselectMember}
                          teamMember={teamMember}
                        />
                      ))}
                  </TableBody>
                </AccordionDetails>
              </Accordion>
            </Table>
          </Grid>
          <Grid item lg={5} md={12}>
            <Table className='expansion-panel' sx={{ ml: '8px' }} aria-label="member table">
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="member-content"
                >
                  <b>Select Team Member</b>
                </AccordionSummary>
                <AccordionDetails sx={{ maxHeight: '500px' }} className='overflow-x'>
                  <TableBody>
                    <TableRow >
                      <TableCell colSpan={2}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                          <InputLabel id="branch">All</InputLabel>
                          <Select
                            labelId="branch"
                            value={branch}
                            onChange={handleChangeBrand}
                            label="All"
                          >
                            <MenuItem value={10}>Ha Noi</MenuItem>
                            <MenuItem value={20}>SG</MenuItem>
                            <MenuItem value={30}>DN</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                          <InputLabel id="type">All</InputLabel>
                          <Select
                            labelId="type"
                            value={type}
                            onChange={handleChangeType}
                            label="All"
                          >
                            <MenuItem value={10}>Staff</MenuItem>
                            <MenuItem value={20}>Intern</MenuItem>
                            <MenuItem value={30}>Collab</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          size='small'
                          id="input-with-icon-textfield"
                          label="Search by name, email"
                          InputProps={{
                            sx: { padding: '5px 0', maxWidth: '150px' },
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search sx={{ marginLeft: '12px' }}/>
                              </InputAdornment>
                            )
                          }}
                          onChange={e => setMemberQuery(e.target.value)}
                          variant="standard"
                        />
                      </TableCell>
                    </TableRow>
                    {teamSelect.length && teamSelect.filter((user) =>
                      keys.some(key => user[key].toLowerCase().includes(memberQuery))
                    ).map((user, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell className='pointer' component="td" scope="row" onClick={() => handleSelectMember(user)}>
                          <div className='flex-center gap-7'>
                            <button type='button'><ArrowBackIos /></button>
                            <div className='flex-column'>
                              <img alt='member' src='' width='60' height='60'/>
                            </div>
                            <div>
                              <p>{user.name}</p>
                              <p>{user.emailAddress}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </AccordionDetails>
              </Accordion>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Team;
