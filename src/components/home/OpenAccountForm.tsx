import { Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Account } from '../../models/Account';
import { apiCreateAccount } from '../../remote/banking-api/account.api';
import { useNavigate } from 'react-router-dom';
import { setCurrentAccount } from '../../features/account/accountSlice';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function OpenAccount(prop: any) {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const currentDate = new Date();
  const dispatch = useAppDispatch();
  const [type, setType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
      setType(event.target.value);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (user) {
      event.preventDefault();
      let token: string = sessionStorage.getItem('token') || '';
      const result = new FormData(event.currentTarget);
      const account = await apiCreateAccount(
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
      prop.setChecked(false);
      dispatch(setCurrentAccount(account.payload));
      navigate("/details");
    }
  };

  return (
    <Slide direction="up" in={prop.checked} mountOnEnter unmountOnExit>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ maxWidth: 1, p: 2, mt: 1 }}
      >
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" fullWidth required name="name" type="text" />

      <FormControl required sx={{mt: 2, mb: 2, minWidth: 120 }}>
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
        <Input id="balance" fullWidth required name="balance" type="text" />
        <Button type="submit">Submit</Button>
      </Paper>
    </Slide>
  );
}