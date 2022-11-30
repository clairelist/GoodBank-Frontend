import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { apiLogout } from '../../remote/banking-api/auth.api';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  function handleAuth() {
    if (user) {
      apiLogout();
      setUser();
    } else {
      navigate('/login');
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <AccountBalanceIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Revature Banking
          </Typography>
          <div>
            {/* notifications button */}
            {user ? <Tooltip
              disableFocusListener
              disableTouchListener
              title={'Notifications'}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
            </Tooltip> : ''}
            
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
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
