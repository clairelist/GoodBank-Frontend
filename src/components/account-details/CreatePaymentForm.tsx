import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentCreditCard } from '../../features/credit/creditCardSlice';
import { CreditCardTransaction } from '../../models/CreditCardTransaction';
import { apiMakeCreditCardPayment } from '../../remote/banking-api/creditcard.api';

export default function CreatePaymentForm(props: any) {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.account.userAccounts);
  const currentCCAccount = useAppSelector(
    (state) => state.creditCard.currentCreditCard
  );
  const [, setCCTransactions] = useState([]);
  const [account, setAccount] = React.useState('Select an Account');
  const [amount, setAmount] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) <= 0) {
      setErrorMessage('Amount must be greater than 0');
      setAmount('');
    } else {
      setAmount(event.target.value);
      setErrorMessage('');
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let token: string = sessionStorage.getItem('token') || '';
    const response = await apiMakeCreditCardPayment(
      new CreditCardTransaction(
        0,
        Number(data.get('payment')) || 0,
        '',
        '',
        currentCCAccount.id,
        Number(data.get('account')) || 0
        //this will be an accountid selected from the drop down menu
      ),
      Number(user?.id),
      token
    );
    setCCTransactions(response.payload);
    dispatch(
      setCurrentCreditCard({
        id: currentCCAccount.id,
        cardNumber: currentCCAccount.cardNumber,
        ccv: currentCCAccount.ccv,
        expirationDate: currentCCAccount.expirationDate,
        totalLimit: currentCCAccount.totalLimit,
        availableBalance:
          currentCCAccount.availableBalance + Number(data.get('payment')),
      })
    );
    props.handleClose();
  };

  return (
    <React.Fragment>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item>
            <TextField
              required
              type="number"
              id="filled-multiline-static"
              name="payment"
              label="Amount to Pay"
              fullWidth
              size="small"
              value={amount}
              onChange={handleChangeAmount}
            />
            {errorMessage === '' ? (
              ''
            ) : (
              <Alert severity="error">{errorMessage}</Alert>
            )}
          </Grid>
          <Grid item>
            <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
              <InputLabel id="account">Payment From:</InputLabel>
              <Select
                id="account"
                name="account"
                label="From Account"
                fullWidth
                value={account}
                onChange={handleChangeAccount}
              >
                {accounts.map((accountz) => (
                  <MenuItem key={accountz.id} value={accountz.id}>
                    {accountz.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
              color="secondary"
            >
              Submit Payment?
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
