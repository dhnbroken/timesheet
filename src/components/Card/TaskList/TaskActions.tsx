import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';
import EditModal from 'src/components/Modal/Edit';
import ViewModal from 'src/components/Modal/View';
import { ListItemIcon, ListItemText, MenuItem, Menu, Button, Box, Modal } from '@mui/material';
import { Edit, ArrowDropDown, Visibility, Close, Delete, Check } from '@mui/icons-material';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { IProject } from 'src/store/interface/projectInterface';
import { ProjectStatus } from 'src/store/enum/Project';
import { swalOption } from 'src/store/swal';

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
interface Props {
  project: IProject
}
const TaskActions: React.FC<Props> = (props) => {
  const { project } = props;
  const {
    setProjectInfo, getEditTask, setTitle, deleteTask, activeProject, inactiveProject
  } = useContext(GlobalContextProvider);

  const [menuActions, setMenuActions] = useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [modalChildren, setModalChildren] = useState('');
  const [warning, setWarning] = useState('');

  const open = Boolean(menuActions);

  const handleOpenEdit = async (id: number) => {
    await getEditTask(id);
    setModalChildren('Edit');
    setOpenEdit(true);
    handleCloseActions();
    setTitle('Edit Project: ');
  };

  const handleOpenView = async (id: number) => {
    await getEditTask(id);
    setModalChildren('View');
    setOpenView(true);
    handleCloseActions();
  };

  const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuActions(event.currentTarget);
    setWarning(project.status === ProjectStatus.ACTIVE ? 'Deactive' : 'Active');
  };
  const handleCloseActions = () => {
    setMenuActions(null);
  };
  const handleWarning = () => {
    setMenuActions(null);
    Swal.fire({
      title: 'Are you sure?',
      text: `${warning} project: ${project.name}?`,
      ...swalOption
    }).then((result) => {
      if (result.isConfirmed) {
        project.status === ProjectStatus.ACTIVE ? inactiveProject(project.id) : activeProject(project.id);
      }
    });
  };
  const handleWarningDelete = () => {
    setMenuActions(null);
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete project: ${project.name}?`,
      ...swalOption
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(project.id);
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
        anchorEl={menuActions}
        open={open}
        onClose={handleCloseActions}
        disableScrollLock={true}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => {
          handleOpenEdit(project.id);
          setProjectInfo(project);
        }}>
          <div className='modal' >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </div>

        </MenuItem>
        <MenuItem>
          <div className='modal' onClick={async () => await handleOpenView(project.id)}>
            <ListItemIcon>
              <Visibility fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </div>
        </MenuItem>
        <MenuItem onClick={() => {
          handleWarning();
        }}>
          <ListItemIcon>
            {project.status === ProjectStatus.ACTIVE ? <Close fontSize="small" /> : <Check fontSize="small"/>}
          </ListItemIcon>
          <ListItemText>{project.status === ProjectStatus.ACTIVE ? 'Deactive' : 'Active'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
          handleWarningDelete();
        }}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: '#a94442' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Modal
        disableScrollLock={false}
        open={modalChildren === 'Edit' ? openEdit : openView}
        onClose={() => modalChildren === 'Edit' ? setOpenEdit(false) : setOpenView(false)}
      >
        {modalChildren === 'Edit'
          ? <Box sx={editStyle}>
            <EditModal setOpenEdit={setOpenEdit} />
          </Box>
          : <Box sx={viewStyle}>
            <ViewModal />
          </Box>
        }
      </Modal>
    </React.Fragment>
  );
};

export default TaskActions;
