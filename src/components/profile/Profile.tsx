import * as React from 'react';
import { useAppSelector } from '../../app/hooks';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Navbar from '../navbar/Navbar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { apiUpdate } from '../../remote/banking-api/update.api';

const theme = createTheme();

//functions for taking the first + last and making it into an avatar with a color based on hash value

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

interface State {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    showPassword: boolean;
}

export default function Profile() {

    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await apiUpdate(
          `${data.get('email')}`,
          `${data.get('firstName')}`,
          `${data.get('lastName')}`,
          `${data.get('address')}`,
          `${data.get('city')}`,
          `${data.get('state')}`,
          Number(`${data.get(('zip'))}`)
        );
        if (response.status >= 200 && response.status < 300) navigate('/');
      };

    const [values, setValues] = React.useState<State>({
        firstName: user!.firstName,
        lastName: user!.lastName,
        email: user!.email,
        address: user!.address,
        city: user!.city,
        state: user!.state,
        zip: user!.zip,
        showPassword: false,
      });

return (
<>
    <Navbar />
    <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" marginTop={7}>
                    <Item>
                        <Avatar {...stringAvatar(user!.firstName + ' ' + user!.lastName)} />
                    </Item>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" marginTop={1}>
            <Box component="form" onSubmit={handleSubmit} justifyContent="center">
                <Item>
                    {!user ? '' : 'Hello ' + user!.firstName + ', welcome to your profile page.'}
                </Item>
                <Item>
                    <TextField
                      id="outlined-helperText"
                      label="First Name"
                      defaultValue={user!.firstName}
                      helperText={user!.firstName}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Last Name"
                      defaultValue={user!.lastName}
                      helperText={user!.lastName}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Email Address"
                      defaultValue={user!.email}
                      helperText={user!.email}
                    />
                </Item>
                <Item>
                    <TextField
                      id="outlined-helperText"
                      label="Street Address"
                      defaultValue={user!.address}
                      helperText={user!.address}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="City"
                      defaultValue={user!.city}
                      helperText={user!.city}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="State"
                      defaultValue={user!.state}
                      helperText={user!.state}
                    />
                    <TextField
                      id="outlined-helperText"
                      label="Zip Code"
                      defaultValue={user!.zip}
                      helperText={user!.zip}
                    />
                </Item>
                <Item>
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mb: 3, ml: 2, mr: 2, bgcolor:'secondary.main' }}
                    > Submit Changes
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/')}
                      sx={{ mt: 1, mb: 3, bgcolor:'secondary.main' }}
                    >
                    Cancel
                    </Button>
                </Item>
            </Box>
        </Grid>
    </ThemeProvider>
</>

);
}