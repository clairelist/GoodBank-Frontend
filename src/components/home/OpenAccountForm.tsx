import { Alert, Card, Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentAccount, setUserAccounts } from '../../features/account/accountSlice';
import { Account } from '../../models/Account';
import { apiCreateAccount, apiGetAccounts } from '../../remote/banking-api/account.api';

export default function OpenAccount(prop: any) {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const currentDate = new Date();
  const dispatch = useAppDispatch();
  const [type, setType] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (user) {
      event.preventDefault();
      let token: string = sessionStorage.getItem('token') || '';
      const result = new FormData(event.currentTarget);
      const response = await apiCreateAccount(
        new Account(
          0,
          result.get('name')?.toString() || '',
          Number(result.get('balance')) || 0,
          result.get('type')?.toString() || 'CHECKING',
          currentDate.toISOString()
        ),
        user.id.toString(),
        token
      );
      if (response.status >= 200 && response.status < 300) {
        prop.setChecked(false);
        dispatch(setCurrentAccount(response.payload));
        let token: string = sessionStorage.getItem('token') || '';
        const result = await apiGetAccounts(user?.id, token);
        dispatch(setUserAccounts(result.payload));
        navigate('/details');
      } else {
        setError('Please check the above information!');
      }
    }
  };

  return (
    <Slide direction="up" in={prop.checked} mountOnEnter unmountOnExit>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ 
          margin: '0 auto',
          padding: '1em',
          width: '24vw',
          minWidth: '400px',
          borderRadius: '16px'
        }}
      >
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" fullWidth required name="name" type="text" />

        <FormControl required sx={{ mt: 2, mb: 2, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="type"
            value={type}
            label="type"
            onChange={handleChange}
          >
            <MenuItem value={'CHECKING'}>CHECKING</MenuItem>
            <MenuItem value={'SAVINGS'}>SAVINGS</MenuItem>
          </Select>
        </FormControl>
        <InputLabel htmlFor="name">Balance</InputLabel>
        <Input
          id="balance"
          fullWidth
          required
          name="balance"
          type="text"
          />
        <Button variant="contained" type="submit" style={{ marginTop: 5 }}>
          Submit
        </Button>
        {error === '' ? (
          ''
        ) : (
          <Alert severity="error" style={{ marginTop: 5 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Slide>
  );
}
