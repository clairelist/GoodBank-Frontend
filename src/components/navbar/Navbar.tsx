import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { apiLogout } from '../../remote/banking-api/auth.api';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NotificationToggle from './notifications/NotificationToggle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {logout} from '../../features/user/userSlice';
import SavingsIcon from '@mui/icons-material/Savings';
import { setNotificationTimer } from '../../features/notification/notificationSlice';



export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);

  function handleAuth() {
    if (user) {
      apiLogout();
      dispatch(logout());
      navigate('/login');
      dispatch(setNotificationTimer(undefined));
    } else {
      navigate('/login');
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <SavingsIcon
            sx={{ mr: 1 }}
            cursor="pointer"
            fontSize="large"
            onClick={() => navigate('/')}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Good&#8482; Banking
          </Typography>
          <div>
            {/* notifications button */}
            {user ? <NotificationToggle /> : ''}

            {/* authenticate button */}
            <Tooltip
              disableFocusListener
              disableTouchListener
              title={user ? 'Logout' : 'Login'}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleAuth()}
                color="inherit"
              >
                {user ? <LogoutIcon /> : <LoginIcon />}
              </IconButton>
            </Tooltip>
            <button onClick={() => navigate('/loan')}>Loan</button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}