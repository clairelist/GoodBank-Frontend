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
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setAccountTransactions,
  setCurrentAccount,
} from '../../features/account/accountSlice';
import { Transfer } from '../../models/Transfer';
import { apiTransferTransaction } from '../../remote/banking-api/account.api';

export default function TransferMoney(props: any) {
  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.account.userAccounts);
  const transferType = useAppSelector((state) => state.account.transferType);
  const [amount, setAmount] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(''); 
  const [otherAccount, setOtherAccount] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const update = new FormData(event.currentTarget);
    let transfer: Transfer;
    if (transferType === 'betweenAccounts') {
      transfer = {
        amount: parseFloat(update.get('amount')?.toString() || '0'),
        account: currentAccount,
        type: update.get('type')?.toString() || 'TRANSFER',
        toAccountId: Number(update.get('account') || account),
      };
    } else {
      transfer = {
        amount: parseFloat(update.get('amount')?.toString() || '0'),
        account: currentAccount,
        type: update.get('type')?.toString() || 'TRANSFER',
        toAccountId: Number(update.get('otherAccount') || otherAccount),
      };
    }

    const response = await apiTransferTransaction(currentAccount.id, transfer);
    if (response.status >= 200 && response.status < 300) {
      dispatch(setAccountTransactions(response.payload));
      props.onClose();
      dispatch(
        setCurrentAccount({
          id: currentAccount.id,
          name: currentAccount.name,
          balance: currentAccount.balance - transfer.amount,
          accountType: currentAccount.accountType,
          creationDate: currentAccount.creationDate,
        })
      );
    }
  };

  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };

  const setOtherUserAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherAccount(event.target.value);
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) <= 0){
      setErrorMessage('Amount must be greater than 0');
      setAmount('');
    } else {
      setAmount(event.target.value);
      setErrorMessage('');
    }
  };

  function renderTransactionType() {
    if (transferType === 'betweenAccounts') {
      return (
        <FormControl
          id="content2"
          variant="standard"
          fullWidth
          sx={{ mt: 1, minWidth: 120 }}
        >
          <InputLabel id="account">To</InputLabel>
          <Select
            labelId="account"
            id="account"
            name="account"
            label="To"
            value={account}
            onChange={handleChangeAccount}
          >
            {accounts.map(({ id, name }) => {
              if(id != currentAccount.id){
                return (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      );
    }
    return (
      <TextField
        id="content2"
        label="To"
        value={otherAccount}
        helperText="Receiving Account"
        variant="standard"
        fullWidth
        placeholder=" Enter Account number"
        onChange={setOtherUserAccount}
      ></TextField>
    );
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          id="content1"
          label="From"
          value={currentAccount.name}
          helperText="Current Account"
          variant="standard"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        ></TextField>
        {renderTransactionType()}
        <FormControl
          id="content3"
          sx={{ m: 1, minWidth: 120, mt: 4 }}
          variant="outlined"
        >
          <Input
            required
            id="amount"
            name="amount"
            type="number"
            placeholder="0.00"
            onChange={handleChangeAmount}
            value={amount}
            fullWidth
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <InputLabel htmlFor="amount">Amount</InputLabel>
        </FormControl>
        {errorMessage === '' ? '' : <Alert severity="error">{errorMessage}</Alert>}
        <div style={{ display: 'flex' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
            color="secondary"
            style={{ marginRight: 'auto' }}
          >
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
}
