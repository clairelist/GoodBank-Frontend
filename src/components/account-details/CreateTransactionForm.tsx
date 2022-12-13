import {
  Alert,
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
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setAccountTransactions,
  setCurrentAccount,
} from '../../features/account/accountSlice';
import { Transaction } from '../../models/Transaction';
import { apiUpsertTransaction } from '../../remote/banking-api/account.api';
import './AccountDetails.css';

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
  const [errorMessage, setErrorMessage] = React.useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let token: string = sessionStorage.getItem('token') || '';
    let transaction = new Transaction(
      0,
      Number(data.get('amount')) || 0,
      data.get('description')?.toString() || '',
      data.get('type')?.toString() || 'INCOME' || 'EXPENSE'
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
      //create getAccount api call
      props.onClose();
      dispatch(
        setCurrentAccount({
          id: currentAccount.id,
          name: currentAccount.name,
          balance:
            transaction.type === 'INCOME'
              ? currentAccount.balance + transaction.amount
              : currentAccount.balance - transaction.amount,
          accountType: currentAccount.accountType,
          creationDate: currentAccount.creationDate,
        })
      );
    }
  };
  const handleType = (event: SelectChangeEvent): void => {
    setType(event.target.value);
  };
  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    if (Number(event.target.value) <= 0) {
      setErrorMessage('Amount must be greater than 0');
    } else {
      setAmount(event.target.value);
      setErrorMessage('');
    }
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, mt: 4 }} style={{ display: 'flex' }}>
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
        {errorMessage === '' ? (
          ''
        ) : (
          <Alert severity="error">{errorMessage}</Alert>
        )}
        <FormControl sx={{ m: 1, minWidth: 120, mt: 4 }} variant="outlined">
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
        <div style={{ display: 'flex' }}>
        <Button variant="contained" 
        type="submit"
        sx={{ mt: 1 }}
        color="secondary"
        style={{ marginRight: 'auto' }}>
          Add Transaction
        </Button>
        </div>
      </Box>
    </>
  );
}
