import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Alert, Card, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import vacation from '../../images/vacation-piggy.png';
import { apiRegister } from '../../remote/banking-api/auth.api';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await apiRegister(
      `${data.get('email')}`,
      `${data.get('password')}`,
      `${data.get('firstName')}`,
      `${data.get('lastName')}`
    );
    const passLength = String(data.get('password')).length;
    if (response.status >= 200 && response.status < 300) {
      navigate('/login');
    } else if (
      data.get('email') === '' ||
      data.get('password') === '' ||
      data.get('firstName') === null ||
      data.get('lastName') === null
    ) {
      setError('Please check missing fields');
    } else if (passLength <= 3) {
      setError('Password must be greater than 3 characters');
    } else {
      setError('Email already in use');
    }
  };

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <div id="register">
        <Card className="overlay" sx={{ maxWidth: 555 }}>
          <CardContent
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
                <MonetizationOnIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="firstName"
                  label="First Name"
                  type="text"
                  id="firstName"
                  autoComplete="first name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="text"
                  id="lastName"
                  autoComplete="last Name"
                />
                {error === '' ? '' : <Alert severity="error">{error}</Alert>}
                <Button
                  type="submit"
                  color="secondary"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <div className="vacation-image">
          <h1>&#160;&#160;&#160;Need a Vacation? Start saving today.</h1>
          <img className="vacation" src={vacation} alt="vacation piggy" />
        </div>
      </div>
    </Container>
  );
}
