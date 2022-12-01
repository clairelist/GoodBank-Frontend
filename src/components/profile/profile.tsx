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
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

interface State {
    email: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    firstName: string;
    lastName: string;
    showPassword: boolean;
}

// Still working on fleshing it out

/*const Profile = () => {
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();

    const [values, setValues] = React.useState<State>({
        email: '',
        address: '',
        city: '',
        state: '',
        weightRange: '',
        showPassword: false,
      });
} */


export default function Profile() {
return;
}