import { Box, Button, InputAdornment, Select, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { apiTransferTransaction } from '../../remote/banking-api/account.api';
import { Transfer } from '../../models/Transfer';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setAccountTransactions } from '../../features/account/accountSlice';
import '../transfer-money/';


export default function TransferMoney(props: any) {

  const currentAccount = useAppSelector(
    (state) => state.account.currentAccount
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const accounts = useAppSelector((state) => state.account.userAccounts);

  const [amount, setAmount] = React.useState('');
  const [account, setAccount] = React.useState('');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const update = new FormData(event.currentTarget);

      //making new transaction 
      let transfer: Transfer = {
       amount: parseFloat(update.get('amount')?.toString() || '0'),
       account: currentAccount, 
       type: update.get('type')?.toString() || 'TRANSFER', 
       toAccountId: Number(update.get('account') || account)
      };
       
    const response = await apiTransferTransaction(currentAccount.id, transfer);
    console.log('response', response);
    console.log('transfer', transfer);
    if (response.status >= 200 && response.status < 300){
        dispatch(setAccountTransactions(response.payload));
    } 
  };

  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };
  console.log('Handle change Account', account);

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  console.log('Handle change', amount);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          id="content1"
          label="From"
          value={currentAccount.id}
          helperText="Current Account"
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
        ></TextField>

        <FormControl id="content2"variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="account">To</InputLabel>
        <Select
          labelId="account"
          id="account"
          name="account"
          label="To"
          fullWidth
          value={account}
          onChange={handleChangeAccount}
        >
          {accounts.map(
            ({ id, name }, index) => (
              console.log('CHECKING ACCOUNT', id, name, index),
              (
                <MenuItem key={index} value={id}>
                  {name}
                </MenuItem>
              )
            )
          )}
        </Select>
      </FormControl>

        <FormControl id="content3" sx={{ m: 1, width: '25ch' }} variant="outlined">
          <Input
            required
            id="amount"
            name="amount"
            type="number"
            placeholder="0.00"
            onChange={handleChangeAmount}
            value={amount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <InputLabel htmlFor="amount">Amount</InputLabel>
        </FormControl>
        <Button type="submit">Submit</Button>
        <Button autoFocus type="button" onClick={props.onClose}>Close</Button>
      </Box>
    </>
  );
}
