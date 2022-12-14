import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { apiCreateCCApplication } from '../../remote/banking-api/creditcard.api';
import AdminLoan from '../loans/adminLoan';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const CreditCardApplication = () => {
  const date = new Date();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleSubmit = async () => {
    if((!values.amount || !values.password)){
      setError('Fields cannot be empty!')
    }else if(Number(values.amount) <= 0){
      setError('Amount must be greater than 0!')
    }else if(values.amount.search(/\D/) !== -1){
      setError('Amount must be a number!')
    }else{
      if (user) {
        let token: string = sessionStorage.getItem('token') || '';
        const response = await apiCreateCCApplication(Number(values.amount), token);
        if(response.status >= 200 && response.status < 300) {
        navigate('/');
        } else {
          setError('Invalid entry!')
        }
      }
    }
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div style={{ width: '50%', margin: '12% auto' }}>
      {user?.type === 'CLIENT' ? (
        <>
          <Paper elevation={5}>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid item xs={6}>
                <Item style={{ width: '50%', margin: 'auto' }}>
                  {!user ? '' : 'Ready to apply for a credit card?'}
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item style={{ boxShadow: 'none' }}>
                <Typography style={{ fontWeight: 'bold' }} color="primary">
                    {error}
                  </Typography>
                  <div>
                    <TextField
                      label="Current Date"
                      disabled
                      id="filled-start-adornment"
                      sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {date.toLocaleDateString()}
                          </InputAdornment>
                        ),
                      }}
                      variant="filled"
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-amount">
                        Requested Amount*
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-amount"
                        value={values.amount}
                        onChange={handleChange('amount')}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        aria-describedby="filled-weight-helper-text"
                        inputProps={{
                          'aria-label': 'amount',
                        }}
                      />
                      <FormHelperText id="filled-weight-helper-text"></FormHelperText>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                      <InputLabel htmlFor="filled-adornment-password">
                        Password*
                      </InputLabel>
                      <FilledInput
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item>
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit()}
                    sx={{ marginRight: '90px' }}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Paper>
          <Paper />
          <Paper elevation={0} />
        </>
      ) : (
        <AdminLoan />
      )}
    </div>
  );
};

export default CreditCardApplication;
