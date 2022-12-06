import * as React from 'react';
import {
  Box,
  Button,
  InputAdornment,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Transaction } from '../../models/Transaction';
import { apiUpsertTransaction } from '../../remote/banking-api/account.api';
import './AccountDetails.css';
import { setAccountTransactions } from '../../features/account/accountSlice';
import { useNavigate } from 'react-router-dom';


export default function CreateTransactionForm(props: any) {
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );
  const dispatch = useAppDispatch();
  const types = [
    {
      value: 'EXPENSE',
      label: '-',
    },
    {
      value: 'INCOME',
      label: '+',
    },
  ];
  const [type, setType] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let token: string = sessionStorage.getItem('token') || '';
    let transaction = new Transaction(
      0,
      Number(data.get('amount')) || 0,
      data.get('description')?.toString() || '',
      data.get('type')?.toString() || 'INCOME' || 'EXPENSE',
    );
    const response = await apiUpsertTransaction(
      currentAccount.id,
      transaction,
      token
    );
    console.log('response', response);
    console.log('transaction', transaction);
    if (response.status >= 200 && response.status < 300) {
      dispatch(setAccountTransactions(response.payload));
      props.onClose();
    }
    navigate('/details')
  };
  const handleType = (event: SelectChangeEvent): void => {
    setType(event.target.value);
  };
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
          id="outlined-textarea"
          name="description"
          label="Transaction Description"
          placeholder="Transaction Description"
          fullWidth
          size="small"
        ></TextField>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type">Type of Transaction</InputLabel>
          <Select
            labelId="type"
            id="type"
            name="type"
            label="Expense(-) or Income(+)?"
            fullWidth
            value={type}
            onChange={handleType}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <Input
            required
            id="amount"
            name="amount"
            type="number"
            placeholder="$0.00"
            onChange={handleAmount}
            value={amount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <InputLabel htmlFor="amount">Amount</InputLabel>
        </FormControl>
        <Button variant="contained" type="submit">
          Add Transaction
        </Button>
        <Button variant="contained" type="button" onClick={props.onClose}>
          Close
        </Button>
      </Box>
    </>
  );
}
