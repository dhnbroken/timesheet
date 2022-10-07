import React from 'react';
import classNames from 'classnames/bind';
import styles from './TaskHeader.module.scss';
import { MoreVert, Add, Refresh, Search } from '@mui/icons-material';
import { Grid, Button, Menu, MenuItem, InputAdornment, TextField, Box, SelectChangeEvent, FormControl, Select, Modal } from '@mui/material';
import EditModal from 'src/components/Modal/Edit/EditModal';
import { IQuantityProject } from 'src/store/interface';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

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

interface Props {
  quantity: IQuantityProject[]
}

const TaskHeader: React.FC<Props> = (props) => {
  const { quantity } = props;
  const { state } = React.useContext(GlobalContextProvider);

  const allProjects = state.tasks.length;

  const [projectStatus, setProjectStatus] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleOpenEdit = (): void => setOpenEdit(true);
  const handleCloseEdit = (): void => setOpenEdit(false);

  const handleChange = (event: SelectChangeEvent): void => {
    setProjectStatus(event.target.value);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <div className={cx('card__header')}>
        <h2 className={cx('card__header-title')}>Manage Projects</h2>
        <div className={cx('card__header-btn')} onClick={handleClick}>
          <MoreVert />
        </div>
        <Menu
          anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 150, left: 1400 }}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <MenuItem sx={{ fontSize: '14px', px: '18px', py: '7px', width: '120px', bgcolor: 'inherit' }} onClick={handleClose}>
            <Refresh sx={{ mr: '16px' }}/>
            <span>Refresh</span>
          </MenuItem>
        </Menu>
      </div>
      <div className={cx('card__header-actions')}>
        <Grid container className={cx('header-actions')}>
          <Grid xs={2} md={3} item={true}>
            <div className={cx('add-project')}>
              <Button variant="contained" className={cx('add-project-btn')} size='large'>
                <div className='modal flex-center' onClick={handleOpenEdit}>
                  <Add />
                  New Project
                </div>
                <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                >
                  <Box sx={editStyle}>
                    <EditModal setOpenEdit={setOpenEdit}/>
                  </Box>
                </Modal>
              </Button>
            </div>
          </Grid>
          <Grid xs={2} md={3} item={true}>
            <div className={cx('select-project')}>
              <FormControl fullWidth>
                <Select
                  sx={{ fontSize: '14px', height: '50px' }}
                  defaultValue= {`Active Project (${allProjects})`}
                  value={projectStatus}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {quantity.map((value, index) => (
                    value.status === 1
                      ? <MenuItem sx={{ fontSize: '14px' }} key={index} value={index}>Active Projects ({value.quantity})</MenuItem>
                      : <MenuItem sx={{ fontSize: '14px' }} key={index} value={index}>Deactive Projects ({value.quantity})</MenuItem>
                  ))}
                  <MenuItem sx={{ fontSize: '14px' }} value={3}>All Projects ({allProjects})</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid xs={8} md={6} item={true}>
            <div className={cx('search-project')}>
              <Box width='100%'>
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
