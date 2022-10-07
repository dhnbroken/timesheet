import React from 'react';
import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import EditModal from 'src/components/Modal/Edit';
import ViewModal from 'src/components/Modal/View';
import { ListItemIcon, ListItemText, MenuItem, Menu, Button, Box, Modal } from '@mui/material';
import { Edit, ArrowDropDown, Visibility, Close, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

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
const viewStyle = {
  height: '680px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '80vw',
  minWidth: '450px',
  width: '800px',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '4px',
  boxShadow: 24,
  p: 3
};

const TaskActions: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const open = Boolean(anchorEl);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleWarning = () => {
    setAnchorEl(null);
    Swal.fire({
      title: 'Are you sure?',
      text: `${status} project: 'Project'?`,
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#7cd1f9',
      cancelButtonColor: '#efefef',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          `${status}!`,
          `Your file has been ${status}!.`,
          'success'
        );
      }
    });
  };

  return (
    <React.Fragment>
      <Button
        size='small'
        className={cx('btn')}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpenActions}
      >
          Actions
        <span><ArrowDropDown sx={{ mt: '8px' }} fontSize='small'/></span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseActions}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem>
          <div className='modal' onClick={handleOpenEdit}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </div>
          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
          >
            <Box sx={editStyle}>
              <EditModal setOpenEdit={setOpenEdit}/>
            </Box>
          </Modal>
        </MenuItem>
        <MenuItem>
          <div className='modal' onClick={handleOpenView}>
            <ListItemIcon>
              <Visibility fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </div>
          <Modal
            open={openView}
            onClose={handleCloseView}
          >
            <Box sx={viewStyle}>
              <ViewModal />
            </Box>
          </Modal>
        </MenuItem>
        <MenuItem onClick={() => {
          setStatus('Deactive');
          handleWarning();
        }}>
          <ListItemIcon>
            <Close fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deactive</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          setStatus('Delete');
          handleWarning();
        }}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: '#a94442' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default TaskActions;
