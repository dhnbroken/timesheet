import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TaskHeader.module.scss';
import { MoreVert, Add, Refresh, Search } from '@mui/icons-material';
import { Grid, Button, Menu, MenuItem, InputAdornment, TextField, Box, SelectChangeEvent, FormControl, Select, Modal } from '@mui/material';
import EditModal from 'src/components/Modal/Edit/EditModal';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { ProjectStatus } from 'src/store/enum/Project';

const cx = classNames.bind(styles);

const editStyle = {
  height: '680px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '80vw',
  width: '1200px',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '4px',
  boxShadow: 24,
  p: 3
};

const TaskHeader: React.FC = () => {
  const {
    projectStatus, setProjectStatus, getMemberProject, getTasks, setQuery,
    quantity, editInfo, setIsChange, isChange, setTitle, clearEditInfo
  } = useContext(GlobalContextProvider);

  const allProject = useMemo(() => quantity.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0), [quantity]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const open = Boolean(anchorEl);

  const handleOpenEdit = (): void => {
    setOpenEdit(true);
    getMemberProject();
    getTasks();
    clearEditInfo();
    setTitle('Create Project: ');
    delete editInfo.id;
  };

  const handleChange = (event: SelectChangeEvent): void => {
    setProjectStatus(event.target.value);
  };
  const handleRefresh = (): void => {
    setAnchorEl(null);
    setQuery('');
    setInputValue('');
    setIsChange(!isChange);
  };
  const handleSearchEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter') {
      setQuery(inputValue);
    }
  };
  return (
    <React.Fragment>
      <div className={cx('card__header')}>
        <h2 className={cx('card__header-title')}>Manage Projects</h2>
        <div className={cx('card__header-btn')} onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </div>
        <Menu
          anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 150, left: 1400 }}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <MenuItem sx={{ fontSize: '14px', px: '18px', py: '7px', width: '120px', bgcolor: 'inherit' }} onClick={handleRefresh}>
            <Refresh sx={{ mr: '16px' }}/>
            <span>Refresh</span>
          </MenuItem>
        </Menu>
      </div>
      <div className={cx('card__header-actions')}>
        <Grid container className={cx('header-actions')} spacing={2}>
          <Grid lg={3} md={12} item={true}>
            <div className={cx('add-project')}>
              <Button variant="contained" className={cx('add-project-btn')} size='large'>
                <div className='modal flex-center' onClick={handleOpenEdit}>
                  <Add />
                  New Project
                </div>
                <Modal
                  disableScrollLock={false}
                  open={openEdit}
                  onClose={() => {
                    setOpenEdit(false);
                    clearEditInfo();
                  }}
                >
                  <Box sx={editStyle}>
                    <EditModal setOpenEdit={setOpenEdit} />
                  </Box>
                </Modal>
              </Button>
            </div>
          </Grid>
          <Grid lg={3} md={12} item={true}>
            <div className={cx('select-project')}>
              <FormControl fullWidth>
                <Select
                  sx={{ fontSize: '14px', height: '50px' }}
                  displayEmpty
                  value={projectStatus.toString()}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {quantity.map((value, index) => (
                    value.status === ProjectStatus.ACTIVE
                      ? <MenuItem sx={{ fontSize: '14px' }} value="" key={index} >Active Projects ({value.quantity})</MenuItem>
                      : <MenuItem sx={{ fontSize: '14px' }} value={ProjectStatus.DEACTIVE} key={index} >Deactive Projects ({value.quantity})</MenuItem>
                  ))}
                  <MenuItem sx={{ fontSize: '14px' }} value={ProjectStatus.ALL}>All Projects ({allProject})</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid lg={6} md={12} item={true}>
            <div className={cx('search-project')}>
              <Box width='100%'>
                <TextField
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyUp={handleSearchEnter}
                  value={inputValue}
                  size='small'
                  fullWidth
                  label="Search by client or project name"
                  InputProps={{
                    label: 'Search by client or project name',
                    sx: { padding: '5px 0' },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ marginLeft: '12px' }}/>
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                />
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default TaskHeader;
