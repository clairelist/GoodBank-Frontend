import React from 'react';
import {
  ListItemText,
  ListItemIcon,
  MenuItem,
  IconButton,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { apiLogout } from '../../../remote/banking-api/auth.api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logout } from '../../../features/user/userSlice';
import { setNotificationTimer } from '../../../features/notification/notificationSlice';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const ProfileMenu = () => {
    const user = useAppSelector((state) => state.user.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  function handleSignOut() {

    apiLogout();
    dispatch(logout());
    navigate('/login');
    dispatch(setNotificationTimer(undefined));

  }

  const userExists = user !== undefined
  return (
    <div>
      <IconButton color="inherit" size="large" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={() => navigate('/loan')}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={(userExists && (user.type) === 'CLIENT') ? "Apply for a loan" : "Admin Dashboard"} />
        </MenuItem>
        <MenuItem onClick={() => handleSignOut()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu