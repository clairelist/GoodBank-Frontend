import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';

import { apiLoginToken, apiLogout } from '../../remote/banking-api/auth.api';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import NotificationToggle from './notifications/NotificationToggle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, signIn } from '../../features/user/userSlice';
import SavingsIcon from '@mui/icons-material/Savings';

import { setNotificationTimer } from '../../features/notification/notificationSlice';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import { useEffect } from 'react';
import { User } from '../../context/user.context';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleTokenLogin = async (token: string) => {
    const result = await apiLoginToken(token);
    dispatch(signIn(result.payload));
    navigate('/');
  }
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    if (!user && token) {
      handleTokenLogin(token);
    }
  }, []);

  function handleAuth(user: User | undefined) {
    if (user?.id) {
      apiLogout();
      dispatch(logout());
      dispatch(setNotificationTimer(undefined));
    }
    navigate('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <div
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', display: 'flex', marginRight: 'auto' }}
          >
            <SavingsIcon sx={{ mr: 1 }} fontSize="large" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Good&#8482; Banking
            </Typography>
          </div>

          <div>
            {/* notifications button */}
            {user ? <NotificationToggle /> : ''}

            {/* user profile button */}

            {/* authenticate button */}
            {user ? (
              ''
            ) : (
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
                  onClick={() => handleAuth(user)}
                  color="inherit"
                >
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
          {user ? <ProfileMenu /> : ''}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
